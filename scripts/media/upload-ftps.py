"""Opt-in, verified FTPS uploader for media-manifest.json."""
import argparse
import ftplib
import hashlib
import io
import importlib.util
import json
import os
import re
import ssl
import time
import uuid
from pathlib import Path

from dotenv import dotenv_values

ROOT = Path(__file__).resolve().parents[2]
MANIFEST = ROOT / 'data' / 'media-manifest.json'
CDN = 'https://cdn.emcasacomcecilia.com'
PARENT = '/home/u150185510/domains/cdn.emcasacomcecilia.com'
IP = '46.202.145.2'
TLS_NAME = 'hostinger.com'
USER = 'u150185510.cdnupload'
LOCK = '.editorial-upload-lock'
HEX = re.compile(r'^[0-9a-f]{64}$')
SAFE_NAME = re.compile(r'^[A-Za-z0-9][A-Za-z0-9._-]{0,254}$')
MIME_EXTENSIONS = {
    'image/jpeg': {'.jpg', '.jpeg'},
    'image/png': {'.png'},
    'image/webp': {'.webp'},
    'image/avif': {'.avif'},
    'image/svg+xml': {'.svg'},
    'video/mp4': {'.mp4'},
    'video/webm': {'.webm'},
}


def _verified_ftp():
    spec = importlib.util.spec_from_file_location('test_ftps', Path(__file__).with_name('test-ftps.py'))
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module.VerifiedFTP


VerifiedFTP = _verified_ftp()


def emit(event, **values):
    print(json.dumps({'event': event, **values}, sort_keys=True), flush=True)


def _fail(message):
    raise ValueError(message)


def _magic_matches(data, mime):
    if mime == 'image/jpeg':
        return data.startswith(b'\xff\xd8\xff')
    if mime == 'image/png':
        return data.startswith(b'\x89PNG\r\n\x1a\n')
    if mime == 'image/webp':
        return len(data) >= 12 and data[:4] == b'RIFF' and data[8:12] == b'WEBP'
    return True


def _write_report(path, records):
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name('.' + path.name + '.' + uuid.uuid4().hex + '.tmp')
    try:
        temporary.write_text(json.dumps(records, indent=2, sort_keys=True) + '\n', encoding='utf-8')
        os.replace(temporary, path)
    finally:
        if temporary.exists():
            temporary.unlink()


def _asset_id(asset):
    return asset.get('source_path', '')


def _validated_staging_root(staging_root):
    if staging_root is None:
        return None
    root = Path(staging_root)
    if not root.is_absolute():
        _fail('staging root must be absolute')
    if root.is_symlink() or not root.is_dir():
        _fail('staging root must be a non-symlink directory')
    try:
        repo_real = Path(os.path.realpath(ROOT))
        root_real = Path(os.path.realpath(root))
        root_real.relative_to(repo_real)
    except ValueError:
        pass
    else:
        _fail('staging root must be outside the repository')
    return root


def _check_asset(asset, staging_root=None):
    source = asset.get('source_path')
    kind = asset.get('media_kind')
    key = asset.get('remote_key')
    digest = asset.get('sha256')
    if not isinstance(source, str) or '\\' in source or source.startswith('/'):
        _fail('source outside public')
    source_parts = source.split('/')
    if len(source_parts) < 3 or source_parts[0] != 'public' or source_parts[1] not in ('images', 'videos') or any(part in ('', '.', '..') for part in source_parts):
        _fail('source outside media scope')
    if kind not in ('image', 'video'):
        _fail('invalid media metadata')
    if not isinstance(digest, str) or not HEX.fullmatch(digest):
        _fail('invalid sha256')
    parts = key.split('/') if isinstance(key, str) else []
    if len(parts) != 4 or parts[:2] != ['v1', kind] or parts[2] != digest:
        _fail('invalid remote_key')
    storage_name = asset.get('storage_filename') or parts[3]
    if not SAFE_NAME.fullmatch(storage_name or ''):
        _fail('invalid storage_filename')
    if parts[3] != storage_name:
        _fail('invalid remote_key')
    expected_exts = MIME_EXTENSIONS.get(asset.get('mime'))
    if not expected_exts:
        _fail('unsupported mime')
    if Path(storage_name).suffix.lower() not in expected_exts:
        _fail('storage filename extension mismatch')
    if not asset.get('mime_extension_match') and not asset.get('storage_filename'):
        _fail('storage_filename required for extension mismatch')
    if asset.get('remote_url') != CDN + '/' + key:
        _fail('remote_url mismatch')
    use_staging = asset.get('staged') and staging_root is not None
    if use_staging:
        staging_root = _validated_staging_root(staging_root)
        relative_parts = source_parts[1:]
        lexical = staging_root.joinpath(*relative_parts)
        cursor = staging_root
        path_scope = staging_root
    else:
        lexical = ROOT.joinpath(*source_parts)
        cursor = ROOT
        path_scope = ROOT / 'public' / source_parts[1]
    for part in (source_parts[1:] if use_staging else source_parts):
        cursor = cursor / part
        if cursor.is_symlink():
            _fail('source contains symlink')
    path = lexical.resolve(strict=False)
    scope = path_scope.resolve()
    if path != scope and scope not in path.parents:
        _fail('source traversal')
    if lexical.is_symlink() or not path.is_file():
        _fail('source missing or symlink')
    if asset.get('mime_extension_match') and path.suffix.lower() not in expected_exts:
        _fail('source extension mismatch')
    data = path.read_bytes()
    actual = hashlib.sha256(data).hexdigest()
    if actual != digest or len(data) != asset.get('bytes'):
        _fail('source hash or size mismatch')
    if not _magic_matches(data, asset.get('mime')):
        _fail('source magic mismatch')
    return {'asset': asset, 'path': path, 'data': data, 'sha256': digest, 'key': key,
            'kind': kind, 'name': storage_name}


def select_assets(manifest, assets, requested, scopes, staging_root=None):
    if not requested and not scopes:
        _fail('selection required; use --asset or --all')
    chosen = []
    for asset in assets:
        source = asset.get('source_path', '')
        if source in requested or asset.get('remote_key') in requested or (scopes and (source.startswith('public/images/') or source.startswith('public/videos/'))):
            chosen.append(asset)
    wanted = set(requested)
    found = {asset.get('source_path') for asset in chosen} | {asset.get('remote_key') for asset in chosen}
    if not wanted.issubset(found):
        _fail('asset selector matched no manifest asset')
    return [_check_asset(asset, staging_root=staging_root) for asset in chosen]


def _mlsd(ftp, parent='.'):
    return {name: facts for name, facts in ftp.mlsd(parent)}


def _stat(ftp, name):
    if not (SAFE_NAME.fullmatch(name) or name == LOCK or re.fullmatch(r'\.upload-[0-9a-f]{32}\.part', name)):
        _fail('invalid stat basename')
    try:
        response = ftp.sendcmd('MLST ' + name)
    except ftplib.error_perm as error:
        if str(error).startswith('550'):
            return None
        raise
    rows = [line.strip().split(' ', 1)[0] for line in response.splitlines()
            if line.startswith(' ') and 'type=' in line.lower()]
    if len(rows) != 1:
        _fail('ambiguous MLST response')
    facts = dict(part.split('=', 1) for part in rows[0].split(';') if part)
    return {key.lower(): value for key, value in facts.items()}


def _ensure_dir(ftp, name):
    facts = _stat(ftp, name)
    if facts:
        if facts.get('type') != 'dir':
            _fail('remote path is not a directory')
        return
    ftp.mkd(name)
    facts = _stat(ftp, name)
    if not facts or facts.get('type') != 'dir':
        _fail('created directory not confirmed')


def _retrieve_hash(ftp, name, expected_bytes):
    digest = hashlib.sha256()
    received = 0
    def consume(chunk):
        nonlocal received
        received += len(chunk)
        if received > expected_bytes:
            _fail('remote file exceeds expected size')
        digest.update(chunk)
    ftp.retrbinary('RETR ' + name, consume)
    if received != expected_bytes:
        _fail('remote size mismatch')
    return digest.hexdigest()


def _upload_one(ftp, item):
    key_parts = item['key'].split('/')
    ftp.cwd('/')
    for part in key_parts[:3]:
        _ensure_dir(ftp, part)
        ftp.cwd(part)
    final = key_parts[3]
    facts = _stat(ftp, final)
    if facts:
        if facts.get('type') != 'file':
            _fail('final path is not a file')
        actual = _retrieve_hash(ftp, final, len(item['data']))
        if actual == item['sha256']:
            return {'status': 'skipped', 'key': item['key'], 'sha256': item['sha256']}
        _fail('divergent remote file')
    temp = '.upload-' + uuid.uuid4().hex + '.part'
    try:
        ftp.storbinary('STOR ' + temp, io.BytesIO(item['data']))
        if _retrieve_hash(ftp, temp, len(item['data'])) != item['sha256']:
            _fail('staged upload hash mismatch')
        if _stat(ftp, final):
            _fail('final path appeared during upload')
        ftp.rename(temp, final)
        if _retrieve_hash(ftp, final, len(item['data'])) != item['sha256']:
            _fail('final upload hash mismatch')
        return {'status': 'uploaded', 'key': item['key'], 'sha256': item['sha256']}
    finally:
        try:
            if _stat(ftp, temp):
                ftp.delete(temp)
        except Exception:
            emit('cleanup_pending', temporary=temp)


def upload(items, on_result=None):
    password = dotenv_values(ROOT / '.env.local').get('FTP_CDNUPLOAD')
    if not password:
        _fail('credential unavailable')
    ftp = VerifiedFTP(context=ssl.create_default_context(), timeout=15)
    owned_lock = False
    try:
        ftp.connect(IP, 21)
        ftp.host = TLS_NAME
        ftp.auth()
        ftp.login(USER, password)
        password = None
        ftp.prot_p()
        ftp.cwd('/')
        if ftp.pwd() != '/':
            _fail('unexpected FTP virtual root')
        if _stat(ftp, LOCK):
            _fail('upload lock already exists')
        ftp.mkd(LOCK)
        owned_lock = True
        if (_stat(ftp, LOCK) or {}).get('type') != 'dir':
            _fail('upload lock not confirmed')
        results = []
        for item in items:
            result = _upload_one(ftp, item)
            results.append(result)
            emit('progress', source_path=item['asset']['source_path'], **result)
            if on_result:
                on_result(item, result)
        return results
    finally:
        if owned_lock:
            try:
                ftp.cwd('/')
                ftp.rmd(LOCK)
            except Exception:
                emit('cleanup_pending', lock=LOCK)
        ftp.close()


def main(argv=None):
    parser = argparse.ArgumentParser()
    parser.add_argument('--manifest', type=Path, default=MANIFEST)
    parser.add_argument('--staging-root', type=Path)
    parser.add_argument('--asset', action='append', default=[])
    parser.add_argument('--all', action='store_true')
    parser.add_argument('--execute', action='store_true')
    parser.add_argument('--report', type=Path)
    parser.add_argument('--batch-size', type=int, default=10)
    args = parser.parse_args(argv)
    if args.batch_size < 1 or args.batch_size > 10:
        _fail('batch-size must be between 1 and 10')
    manifest = json.loads(args.manifest.read_text(encoding='utf-8'))
    if manifest.get('manifest_version') != 1 or manifest.get('origin') != CDN:
        _fail('unsupported manifest')
    items = select_assets(manifest, manifest.get('assets', []), args.asset, args.all, staging_root=args.staging_root)
    records = []
    if args.report:
        _write_report(args.report, records)
    if args.execute:
        def checkpoint(item, result):
            records.append({'status': result['status'], 'source_path': item['asset']['source_path'],
                            'key': result['key'], 'sha256': result['sha256']})
            if args.report:
                _write_report(args.report, records)
        # Bound session lifetime without concurrent connections or automatic retries.
        for start in range(0, len(items), args.batch_size):
            if start:
                time.sleep(2)
            upload(items[start:start + args.batch_size], checkpoint)
    else:
        records = [{'status': 'dryrun', 'source_path': item['asset']['source_path'], 'key': item['key'], 'sha256': item['sha256']} for item in items]
        if args.report:
            _write_report(args.report, records)
    for record in records:
        emit('asset', **record)


if __name__ == '__main__':
    main()
