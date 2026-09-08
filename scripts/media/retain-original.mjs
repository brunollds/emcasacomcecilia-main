import { createHash } from 'node:crypto';
import { lstat, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertExternalStagingRoot, detectMimeFromBuffer, parseCliArgs, resolveInside } from './library.mjs';
import { validateMediaAssetAvailability } from './video-asset-proof.mjs';

async function safePath(root, relative, createParents = false) {
  const target = resolveInside(root, relative);
  let cursor = root;
  const parts = relative.split('/');
  for (let index = 0; index < parts.length; index += 1) {
    cursor = path.join(cursor, parts[index]);
    if (createParents && index < parts.length - 1) await mkdir(cursor).catch((error) => {
      if (error.code !== 'EEXIST') throw error;
    });
    const info = await lstat(cursor).catch((error) => {
      if (error.code === 'ENOENT') return null;
      throw error;
    });
    if (info?.isSymbolicLink()) throw new Error(`Symlink not allowed: ${relative}`);
  }
  return target;
}

export async function retainOriginals({ repoRoot, stagingRoot, manifest, assetPaths, write = false }) {
  const root = await assertExternalStagingRoot(stagingRoot, repoRoot);
  if (!assetPaths?.length || new Set(assetPaths).size !== assetPaths.length) throw new Error('Select unique --asset paths');
  const prepared = [];
  for (const source of assetPaths) {
    const matches = manifest.assets.filter((asset) => asset.source_path === source);
    if (matches.length !== 1) throw new Error(`Missing/ambiguous asset: ${source}`);
    const asset = matches[0];
    const proof = validateMediaAssetAvailability({ assetUrl: asset.local_url, repoRoot, manifest,
      map: { [asset.local_url]: asset.remote_url }, requireRemote: true });
    if (!proof.ok) throw new Error(`Verified CDN proof required: ${proof.reason}`);
    const from = await safePath(root, source.slice('public/'.length));
    const bytes = await readFile(from);
    if (bytes.length !== asset.bytes || createHash('sha256').update(bytes).digest('hex') !== asset.sha256
      || detectMimeFromBuffer(bytes) !== asset.mime) throw new Error(`Staging identity mismatch: ${source}`);
    const to = await safePath(repoRoot, source);
    const existing = await readFile(to).catch((error) => {
      if (error.code === 'ENOENT') return null;
      throw error;
    });
    if (existing && !existing.equals(bytes)) throw new Error(`Refusing to overwrite original: ${source}`);
    prepared.push({ source, to, bytes, exists: Boolean(existing) });
  }
  for (const item of prepared) {
    if (write && !item.exists) {
      await safePath(repoRoot, item.source, true);
      await writeFile(item.to, item.bytes, { flag: 'wx' });
    }
  }
  return prepared.map(({ source, exists }) => ({ source, status: exists ? 'identical' : write ? 'retained' : 'planned' }));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const options = parseCliArgs(process.argv.slice(2));
  const repoRoot = path.resolve(options.repo_root ?? process.cwd());
  const manifest = JSON.parse(await readFile(path.resolve(repoRoot, options.manifest ?? 'data/media-manifest.json'), 'utf8'));
  retainOriginals({ repoRoot, stagingRoot: options.staging_root, manifest, assetPaths: options.asset, write: Boolean(options.write) })
    .then((result) => console.log(JSON.stringify(result)))
    .catch((error) => { console.error(error.message); process.exitCode = 1; });
}
