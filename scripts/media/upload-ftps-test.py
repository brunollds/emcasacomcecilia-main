"""Offline tests for upload-ftps.py; no sockets or credentials are used."""
import hashlib
import importlib.util
import ftplib
import tempfile
import unittest
from pathlib import Path


HERE = Path(__file__).resolve().parent
SPEC = importlib.util.spec_from_file_location('upload_ftps', HERE / 'upload-ftps.py')
upload = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(upload)


class FakeFTP:
    def __init__(self, files=None):
        self.dirs = {'.'}
        self.files = dict(files or {})
        self.cwd_name = '.'
        self.mlst_replies = {}

    def _full(self, name):
        return name if self.cwd_name == '.' else self.cwd_name + '/' + name

    def sendcmd(self, command):
        verb, name = command.split(' ', 1)
        if verb != 'MLST':
            raise AssertionError('unexpected command: ' + command)
        full = self._full(name)
        if full in self.mlst_replies:
            reply = self.mlst_replies[full]
            if isinstance(reply, Exception):
                raise reply
            return reply
        if full in self.dirs:
            facts = 'type=dir;size=0;'
        elif full in self.files:
            facts = 'type=file;size=' + str(len(self.files[full])) + ';'
        else:
            raise ftplib.error_perm('550 Not found')
        return '250-Listing ' + name + '\n ' + facts + ' ' + name + '\n250 End'

    def mlsd(self, parent='.'):
        parent = self.cwd_name if parent == '.' else parent
        prefix = '' if parent == '.' else parent.rstrip('/') + '/'
        result = {}
        for name in self.dirs:
            if name != '.' and name.startswith(prefix) and '/' not in name[len(prefix):]:
                result[name[len(prefix):]] = {'type': 'dir'}
        for name in self.files:
            if name.startswith(prefix) and '/' not in name[len(prefix):]:
                result[name[len(prefix):]] = {'type': 'file'}
        return list(result.items())

    def mkd(self, name):
        full = self._full(name)
        if full in self.dirs or full in self.files:
            raise RuntimeError('exists')
        self.dirs.add(full)

    def cwd(self, name):
        if name == '/':
            self.cwd_name = '.'
        elif name.startswith('/'):
            self.cwd_name = name.strip('/') or '.'
        else:
            self.cwd_name = name if self.cwd_name == '.' else self.cwd_name + '/' + name

    def rmd(self, name):
        base = '' if self.cwd_name == '.' else self.cwd_name + '/'
        self.dirs.remove(base + name)

    def storbinary(self, command, stream):
        name = command.split(' ', 1)[1]
        full = self._full(name)
        self.files[full] = stream.read()

    def retrbinary(self, command, callback):
        name = command.split(' ', 1)[1]
        full = self._full(name)
        callback(self.files[full])

    def rename(self, old, new):
        base = '' if self.cwd_name == '.' else self.cwd_name + '/'
        self.files[base + new] = self.files.pop(base + old)

    def delete(self, name):
        del self.files[self._full(name)]


def item(tmp, data=b'asset'):
    path = tmp / 'public' / 'images' / 'x.png'
    path.parent.mkdir(parents=True)
    path.write_bytes(data)
    digest = hashlib.sha256(data).hexdigest()
    asset = {'source_path': 'public/images/x.png', 'media_kind': 'image', 'mime': 'image/png',
             'mime_extension_match': True, 'bytes': len(data), 'sha256': digest,
             'remote_key': 'v1/image/' + digest + '/x.png',
             'remote_url': upload.CDN + '/v1/image/' + digest + '/x.png'}
    return asset


class UploadTests(unittest.TestCase):
    def test_stat_missing_returns_none_without_passive_listing(self):
        ftp = FakeFTP()
        self.assertIsNone(upload._stat(ftp, 'missing'))

    def test_stat_malformed_facts_fail_closed(self):
        ftp = FakeFTP()
        ftp.mlst_replies['broken'] = '250-Listing broken\n malformed facts\n250 End'
        with self.assertRaises(ValueError):
            upload._stat(ftp, 'broken')

    def test_stat_symlink_is_not_a_directory(self):
        ftp = FakeFTP()
        ftp.mlst_replies['link'] = '250-Listing link\n type=symlink;size=0; link\n250 End'
        with self.assertRaises(ValueError):
            upload._ensure_dir(ftp, 'link')

    def test_malformed_remote_key_fails_closed(self):
        with tempfile.TemporaryDirectory() as directory:
            tmp = Path(directory)
            asset = item(tmp)
            asset['remote_key'] = 'v1/image'
            with self.assertRaises(ValueError):
                upload._check_asset(asset)

    def test_storage_filename_allows_truthful_jpeg_extension_and_checks_magic(self):
        with tempfile.TemporaryDirectory() as directory:
            tmp = Path(directory)
            data = b'\xff\xd8\xff' + b'jpeg'
            path = tmp / 'public' / 'images' / 'photo.webp'
            path.parent.mkdir(parents=True)
            path.write_bytes(data)
            digest = hashlib.sha256(data).hexdigest()
            asset = {'source_path': 'public/images/photo.webp', 'original_filename': 'photo.webp',
                     'storage_filename': 'photo.jpg', 'media_kind': 'image', 'mime': 'image/jpeg',
                     'mime_extension_match': False, 'bytes': len(data), 'sha256': digest,
                     'remote_key': 'v1/image/' + digest + '/photo.jpg',
                     'remote_url': upload.CDN + '/v1/image/' + digest + '/photo.jpg'}
            previous_root = upload.ROOT
            upload.ROOT = tmp
            checked = upload._check_asset(asset)
            upload.ROOT = previous_root
            self.assertEqual(checked['name'], 'photo.jpg')
            asset['remote_key'] = 'v1/image/' + digest + '/photo.webp'
            with self.assertRaises(ValueError):
                upload._check_asset(asset)

    def test_magic_rejects_false_jpeg_metadata(self):
        with tempfile.TemporaryDirectory() as directory:
            tmp = Path(directory)
            asset = item(tmp, b'not-jpeg')
            asset['mime'] = 'image/jpeg'
            asset['mime_extension_match'] = False
            asset['storage_filename'] = 'x.jpg'
            digest = hashlib.sha256(b'not-jpeg').hexdigest()
            asset['sha256'] = digest
            asset['remote_key'] = 'v1/image/' + digest + '/x.jpg'
            asset['remote_url'] = upload.CDN + '/' + asset['remote_key']
            previous_root = upload.ROOT
            upload.ROOT = tmp
            with self.assertRaises(ValueError):
                upload._check_asset(asset)
            upload.ROOT = previous_root

    def test_preflight_rejects_traversal(self):
        with tempfile.TemporaryDirectory() as directory:
            tmp = Path(directory)
            asset = item(tmp)
            asset['source_path'] = 'public/../secret.bin'
            with self.assertRaises(ValueError):
                upload._check_asset(asset)

    def test_preflight_rejects_hash_mismatch(self):
        with tempfile.TemporaryDirectory() as directory:
            tmp = Path(directory)
            asset = item(tmp)
            asset['sha256'] = '0' * 64
            with self.assertRaises(ValueError):
                upload._check_asset(asset)

    def test_existing_identical_skips_and_divergent_aborts(self):
        with tempfile.TemporaryDirectory() as directory:
            tmp = Path(directory)
            asset = item(tmp, b'\x89PNG\r\n\x1a\none')
            previous_root = upload.ROOT
            upload.ROOT = tmp
            checked = upload._check_asset(asset)
            upload.ROOT = previous_root
            ftp = FakeFTP()
            ftp.dirs.update(('v1', 'v1/image', 'v1/image/' + checked['sha256']))
            ftp.cwd('/')
            ftp.cwd('v1')
            ftp.cwd('image')
            ftp.cwd(checked['sha256'])
            ftp.files[ftp.cwd_name + '/' + checked['name']] = b'\x89PNG\r\n\x1a\none'
            self.assertEqual(upload._upload_one(ftp, checked)['status'], 'skipped')
            ftp.files['v1/image/' + checked['sha256'] + '/' + checked['name']] = b'two'
            with self.assertRaises(ValueError):
                upload._upload_one(ftp, checked)

    def test_success_stages_verifies_and_renames(self):
        with tempfile.TemporaryDirectory() as directory:
            tmp = Path(directory)
            previous_root = upload.ROOT
            upload.ROOT = tmp
            checked = upload._check_asset(item(tmp, b'\x89PNG\r\n\x1a\npayload'))
            upload.ROOT = previous_root
            ftp = FakeFTP()
            result = upload._upload_one(ftp, checked)
            self.assertEqual(result['status'], 'uploaded')
            self.assertEqual(ftp.files['v1/image/' + checked['sha256'] + '/' + checked['name']], b'\x89PNG\r\n\x1a\npayload')
            self.assertFalse(any(name.startswith('.upload-') for name in ftp.files))


if __name__ == '__main__':
    unittest.main()
