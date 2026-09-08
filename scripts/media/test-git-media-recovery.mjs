import { execFileSync, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { closeSync, mkdirSync, mkdtempSync, openSync, readFileSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const root = process.cwd();
const map = JSON.parse(readFileSync(path.join(root, 'src/lib/generated/media-delivery-map.json'), 'utf8'));
const manifest = JSON.parse(readFileSync(path.join(root, 'data/media-manifest.json'), 'utf8'));
const revision = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
const destination = mkdtempSync(path.join(tmpdir(), 'emcasa-media-git-recovery-'));
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
let totalBytes = 0;
for (const url of Object.keys(map)) {
  if (!/^\/(images|videos)\//.test(url) || /[\\?#]/.test(url) || url.split('/').includes('..')) {
    throw new Error(`Unsafe media path: ${url}`);
  }
  const matches = manifest.assets.filter((asset) => asset.local_url === url);
  if (matches.length !== 1) throw new Error(`Ambiguous manifest: ${url}`);
  const asset = matches[0];
  const source = `public${url}`;
  if (asset.source_path !== source) throw new Error(`Source mismatch: ${url}`);
  const target = path.resolve(destination, source);
  if (!target.startsWith(`${destination}${path.sep}`)) throw new Error('Recovery escaped destination');
  mkdirSync(path.dirname(target), { recursive: true });
  const fd = openSync(target, 'wx');
  let result;
  try {
    result = spawnSync('git', ['show', `${revision}:${source}`], { cwd: root, stdio: ['ignore', fd, 'pipe'] });
  } finally {
    closeSync(fd);
  }
  if (result.error || result.status !== 0) throw new Error(`Git recovery source missing: ${url}`);
  if (statSync(target).size !== asset.bytes || digest(readFileSync(target)) !== asset.sha256) throw new Error(`Git recovery mismatch: ${url}`);
  if (digest(readFileSync(target)) !== asset.sha256) throw new Error(`Restored bytes mismatch: ${url}`);
  totalBytes += asset.bytes;
}
console.log(JSON.stringify({ revision, destination, files: Object.keys(map).length, totalBytes, status: 'verified', limitation: 'Local Git recovery, not independent Hostinger backup or remote CDN restore' }, null, 2));
