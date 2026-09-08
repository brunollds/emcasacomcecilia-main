import { closeSync, existsSync, mkdtempSync, openSync, readFileSync, readSync, readdirSync, rmSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { createMediaResolver } from '../../src/lib/media-delivery.mjs';
import { validateMediaAssetAvailability } from './video-asset-proof.mjs';

// Unmapped leftovers from 9cd4f16, not a growable exception for future articles.
const legacy = JSON.parse(readFileSync(new URL('./legacy-archive-media.json', import.meta.url), 'utf8'));

function hashFileSync(filename) {
  const hash = createHash('sha256');
  const buffer = Buffer.allocUnsafe(1024 * 1024);
  const fd = openSync(filename, 'r');
  try {
    for (let count = readSync(fd, buffer, 0, buffer.length, null); count > 0; count = readSync(fd, buffer, 0, buffer.length, null)) {
      hash.update(buffer.subarray(0, count));
    }
  } finally {
    closeSync(fd);
  }
  return hash.digest('hex');
}

function readPolicy(root, filename, fallback = {}) {
  const candidate = path.join(root, 'scripts/media', filename);
  return existsSync(candidate) ? JSON.parse(readFileSync(candidate, 'utf8')) : fallback;
}

function readGitJson(repoDir, revision, relativePath, fallback) {
  try {
    return JSON.parse(execFileSync('git', ['show', `${revision}:${relativePath}`], {
      cwd: repoDir, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024,
    }));
  } catch (error) {
    if (fallback !== undefined) return fallback;
    throw new Error(`Cannot read media policy ${relativePath} at ${revision}: ${error.message}`);
  }
}

export function assertGitMediaTransition(repoDir, baselineRevision, targetRevision) {
  const baselineMap = readGitJson(repoDir, baselineRevision, 'src/lib/generated/media-delivery-map.json');
  const baselineManifest = readGitJson(repoDir, baselineRevision, 'data/media-manifest.json');
  const targetMap = readGitJson(repoDir, targetRevision, 'src/lib/generated/media-delivery-map.json');
  const targetManifest = readGitJson(repoDir, targetRevision, 'data/media-manifest.json');
  const fallback = readGitJson(repoDir, targetRevision, 'scripts/media/local-fallback-media.json', {});
  const baselineAssets = new Map(baselineManifest.assets.map((entry) => [entry.local_url, entry]));
  const targetAssets = new Map(targetManifest.assets.map((entry) => [entry.local_url, entry]));
  for (const [localUrl, remoteUrl] of Object.entries(baselineMap)) {
    const before = baselineAssets.get(localUrl);
    const after = targetAssets.get(localUrl);
    if (targetMap[localUrl] === remoteUrl && before && after && before.sha256 === after.sha256) continue;
    if (before && after && before.sha256 === after.sha256 && fallback[after.source_path] === after.sha256 && !targetMap[localUrl]) continue;
    throw new Error(`Media transition removed or changed a deployed identity without explicit fallback: ${localUrl}`);
  }
}

export function assertGitMediaRecovery(root, repoDir, revision) {
  const mapPath = path.join(root, 'src/lib/generated/media-delivery-map.json');
  if (!existsSync(mapPath)) return;
  const map = JSON.parse(readFileSync(mapPath, 'utf8'));
  const manifest = JSON.parse(readFileSync(path.join(root, 'data/media-manifest.json'), 'utf8'));
  const temp = mkdtempSync(path.join(os.tmpdir(), 'cdn-git-recovery-'));
  try {
    for (const [index, localUrl] of Object.keys(map).entries()) {
      const asset = manifest.assets.find((entry) => entry.local_url === localUrl);
      if (!asset) throw new Error(`Git recovery manifest entry missing: ${localUrl}`);
      const output = path.join(temp, `${index}.blob`);
      const fd = openSync(output, 'wx');
      let result;
      try {
        result = spawnSync('git', ['show', `${revision}:${asset.source_path}`], {
          cwd: repoDir, stdio: ['ignore', fd, 'pipe'], encoding: 'utf8',
        });
      } finally {
        closeSync(fd);
      }
      if (result.error || result.status !== 0) {
        throw new Error(`Git recovery original not committed: ${localUrl}`);
      }
      if (statSync(output).size !== asset.bytes || hashFileSync(output) !== asset.sha256) {
        throw new Error(`Git recovery digest mismatch: ${localUrl}`);
      }
    }
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
}

function assertOnlyApprovedBytes(root, directory, approved) {
  const absolute = path.join(root, directory);
  if (!existsSync(absolute)) return;
  for (const entry of readdirSync(absolute, { withFileTypes: true })) {
    const relative = `${directory}/${entry.name}`;
    if (entry.isDirectory()) { assertOnlyApprovedBytes(root, relative, approved); continue; }
    if (!entry.isFile()) throw new Error(`Unexpected archive media entry: ${relative}`);
    const bytes = readFileSync(path.join(root, relative));
    if (entry.name === '.gitkeep' && bytes.length === 0) continue;
    // Git's core.autocrlf can convert text during archive export on Windows.
    const canonical = entry.name === '.gitkeep' || entry.name.endsWith('.svg')
      ? Buffer.from(bytes.toString('utf8').replaceAll('\r\n', '\n')) : bytes;
    if (approved[relative] !== createHash('sha256').update(canonical).digest('hex')) {
      throw new Error(`New/unrecognized media bytes in archive: ${relative}. Use external staging and CDN.`);
    }
  }
}

// Inspect the extracted target commit, never the operator's working-tree map.
export function assertArchiveMedia(root) {
  const mapPath = path.join(root, 'src/lib/generated/media-delivery-map.json');
  const manifestPath = path.join(root, 'data/media-manifest.json');
  if (!existsSync(mapPath) && !existsSync(manifestPath)) {
    assertOnlyApprovedBytes(root, 'public/images', legacy);
    assertOnlyApprovedBytes(root, 'public/videos', legacy);
    return;
  }
  const map = JSON.parse(readFileSync(mapPath, 'utf8'));
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const historical = readPolicy(root, 'legacy-archive-media.json', legacy);
  const fallback = readPolicy(root, 'local-fallback-media.json');
  const approved = { ...historical };
  for (const [sourcePath, sha256] of Object.entries(fallback)) {
    const asset = manifest.assets.find((entry) => entry.source_path === sourcePath);
    if (!asset || asset.sha256 !== sha256 || map[asset.local_url]) {
      throw new Error(`Invalid explicit local fallback policy: ${sourcePath}`);
    }
    const local = path.join(root, sourcePath);
    if (!existsSync(local)) throw new Error(`Explicit local fallback bytes missing from archive: ${sourcePath}`);
    approved[sourcePath] = sha256;
  }
  createMediaResolver(map);
  for (const localUrl of Object.keys(map)) {
    const proof = validateMediaAssetAvailability({ assetUrl: localUrl, repoRoot: root, manifest, map, requireRemote: true });
    if (!proof.ok) throw new Error(`Archive CDN proof failed: ${proof.reason}`);
    if (existsSync(path.join(root, `public${localUrl}`))) {
      throw new Error(`Mapped media bytes entered the archive: ${localUrl}. Run phase5-export.mjs --write before committing.`);
    }
  }
  assertOnlyApprovedBytes(root, 'public/images', approved);
  assertOnlyApprovedBytes(root, 'public/videos', approved);
}
