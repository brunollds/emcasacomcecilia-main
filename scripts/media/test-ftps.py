"""Opt-in, one-connection FTPS fixture test. Never prints credentials."""
import argparse
import base64
import ftplib
import hashlib
import io
import json
import ssl
import uuid
from pathlib import Path

from dotenv import dotenv_values

IP = '46.202.145.2'
TLS_NAME = 'hostinger.com'
USER = 'u150185510.cdnupload'
PARENT = '/home/u150185510/domains/cdn.emcasacomcecilia.com'


def emit(event, **values):
    print(json.dumps({'event': event, **values}), flush=True)


class VerifiedFTP(ftplib.FTP_TLS):
    def makepasv(self):
        host, port = super().makepasv()
        if host != IP:
            raise RuntimeError('Unexpected passive destination')
        return host, port

    def ntransfercmd(self, cmd, rest=None):
        if not self._prot_p:
            raise RuntimeError('Data protection not enabled')
        raw, size = ftplib.FTP.ntransfercmd(self, cmd, rest)
        try:
            secure = self.context.wrap_socket(
                raw, server_hostname=TLS_NAME, session=self.sock.session)
        except Exception:
            raw.close()
            raise
        emit('data_tls', version=secure.version(), cipher=secure.cipher()[0],
             verified=True)
        return secure, size


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--execute', action='store_true', required=True)
    parser.parse_args()
    ftp = VerifiedFTP(context=ssl.create_default_context(), timeout=15)
    stage = 'connect'
    try:
        ftp.connect(IP, 21)
        # Keep the known destination IP; authenticate the provider certificate name.
        ftp.host = TLS_NAME
        stage = 'control_tls'
        ftp.auth()
        emit('control_tls', version=ftp.sock.version(), verified=True,
             destination=IP, certificate_name=TLS_NAME)
        stage = 'login'
        env_path = Path(__file__).resolve().parents[2] / '.env.local'
        password = dotenv_values(env_path).get('FTP_CDNUPLOAD')
        if not password:
            raise RuntimeError('Credential unavailable')
        response = ftp.login(USER, password)
        password = None
        emit('login', code=response[:3])
        stage = 'protection'
        response = ftp.prot_p()  # Sends PBSZ 0 then PROT P; both must succeed.
        emit('pbsz_prot_p', accepted=True, code=response[:3])
        root = ftp.pwd()
        emit('pwd', path=root)
        stage = 'negative_cwd'
        try:
            ftp.cwd(PARENT)
        except ftplib.error_perm as error:
            emit('outside_cwd', denied=True, code=str(error)[:3])
        else:
            emit('outside_cwd', denied=False, path=ftp.pwd())
            raise RuntimeError('Outside directory accepted')
        ftp.cwd(root)
        stage = 'negative_write'
        outside = PARENT + '/cdn-negative-' + uuid.uuid4().hex + '.txt'
        try:
            ftp.storbinary('STOR ' + outside, io.BytesIO(b'CDN isolation test\n'))
        except ftplib.error_perm as error:
            emit('outside_stor', denied=True, code=str(error)[:3])
        else:
            emit('outside_stor', denied=False, path=outside)
            ftp.delete(outside)
            emit('outside_fixture_cleanup', complete=True)
            raise RuntimeError('Outside write accepted')
        stage = 'fixture'
        payload = base64.b64decode(
            'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aM3sAAAAASUVORK5CYII=')
        digest = hashlib.sha256(payload).hexdigest()
        relative = 'v1/image/' + digest
        for segment in relative.split('/'):
            try:
                ftp.cwd(segment)
            except ftplib.error_perm:
                ftp.mkd(segment)
                ftp.cwd(segment)
        filename = 'ftps-g0-' + uuid.uuid4().hex + '.png'
        response = ftp.storbinary('STOR ' + filename, io.BytesIO(payload))
        emit('fixture_upload', code=response[:3])
        output = io.BytesIO()
        ftp.retrbinary('RETR ' + filename, output.write)
        actual = output.getvalue()
        if actual != payload:
            raise RuntimeError('Fixture mismatch')
        emit('fixture_verified', bytes=len(actual), sha256=digest,
             url='https://cdn.emcasacomcecilia.com/' + relative + '/' + filename)
        ftp.quit()
    except Exception as error:
        # Server reply bodies and credential values are deliberately not logged.
        emit('failed', stage=stage, error=type(error).__name__,
             code=str(error)[:3] if isinstance(error, ftplib.error_perm) else None)
        raise SystemExit(1)
    finally:
        ftp.close()


if __name__ == '__main__':
    main()
