import { createHash } from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';
import { closeSync, existsSync, mkdtempSync, mkdirSync, openSync, readFileSync, rmSync, statSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

function git(args, cwd) {
  return execFileSync('git', args, { cwd, encoding: 'utf8' }).trim();
}

function stagedJson(root, relativePath) {
  return JSON.parse(git(['show', `:${relativePath}`], root));
}

function stagedDigest(root, relativePath, temp) {
  const output = path.join(temp, `${createHash('sha256').update(relativePath).digest('hex')}.blob`);
  const fd = openSync(output, 'wx');
  let result;
  try {
    result = spawnSync('git', ['show', `:${relativePath}`], { cwd: root, stdio: ['ignore', fd, 'pipe'] });
  } finally {
    closeSync(fd);
  }
  if (result.error || result.status !== 0) throw new Error(`Staged media blob unavailable: ${relativePath}`);
  return { bytes: statSync(output).size, sha256: createHash('sha256').update(readFileSync(output)).digest('hex') };
}

function stagedAttributes(root, relativePath) {
  const output = execFileSync('git', ['check-attr', '--cached', '-z', 'export-ignore', 'text', '--', relativePath], { cwd: root });
  const fields = output.toString('utf8').split('\0');
  return { exportIgnore: fields[2], text: fields[5] };
}

export function validateStagedMediaDelta({ root = repoRoot } = {}) {
  const staged = git(['diff', '--cached', '--name-only', '--diff-filter=ACMR'], root).split(/\r?\n/).filter(Boolean);
  const deleted = git(['diff', '--cached', '--name-only', '--diff-filter=D'], root).split(/\r?\n/).filter((entry) => /^public\/(images|videos)\//.test(entry));
  if (deleted.length) throw new Error(`Staged media deletion is forbidden: ${deleted.join(', ')}`);
  const media = staged.filter((entry) => /^public\/(images|videos)\//.test(entry));
  if (!media.length) return { mode: 'delta', staged, assets: 0 };
  const manifest = stagedJson(root, 'data/media-manifest.json');
  const map = stagedJson(root, 'src/lib/generated/media-delivery-map.json');
  let fallback = {};
  try { fallback = stagedJson(root, 'scripts/media/local-fallback-media.json'); } catch { /* Optional policy. */ }
  const temp = mkdtempSync(path.join(os.tmpdir(), 'cdn-media-delta-'));
  try {
    for (const sourcePath of media) {
      const matches = manifest.assets.filter((entry) => entry.source_path === sourcePath);
      if (matches.length !== 1) throw new Error(`Staged media needs one manifest identity: ${sourcePath}`);
      const asset = matches[0];
      const digest = stagedDigest(root, sourcePath, temp);
      if (digest.bytes !== asset.bytes || digest.sha256 !== asset.sha256) throw new Error(`Staged media digest mismatch: ${sourcePath}`);
      const remote = map[asset.local_url];
      const localFallback = fallback[sourcePath] === asset.sha256 && !remote;
      if (!localFallback) {
        if (remote !== asset.remote_url || asset.verification_status !== 'verified' || asset.verification_etag_or_digest !== asset.sha256 || !asset.verified_at) {
          throw new Error(`Staged media lacks verified CDN mapping: ${sourcePath}`);
        }
        const attrs = stagedAttributes(root, sourcePath);
        if (attrs.exportIgnore !== 'set' || attrs.text !== 'unset') throw new Error(`Staged media lacks -text export-ignore: ${sourcePath}`);
      }
    }
    return { mode: 'delta', staged, assets: media.length };
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
}

export async function validateStagedMediaCandidate({ root = repoRoot, delta = false } = {}) {
  if (delta) return validateStagedMediaDelta({ root });
  const staged = git(['diff', '--cached', '--name-only'], root);
  if (!staged) throw new Error('No staged candidate to validate');
  const tree = git(['write-tree'], root);
  const temp = mkdtempSync(path.join(os.tmpdir(), 'cdn-media-candidate-'));
  const tarPath = path.join(temp, 'candidate.tar');
  const extracted = path.join(temp, 'candidate');
  mkdirSync(extracted);
  try {
    execFileSync('git', ['archive', '--format=tar', `--output=${tarPath}`, tree], { cwd: root, stdio: 'inherit' });
    // Run from the temp directory so Windows drive-letter paths cannot be parsed as host:path.
    execFileSync('tar', ['-xf', path.basename(tarPath), '-C', path.basename(extracted)], { cwd: temp, stdio: 'inherit' });
    const manifest = JSON.parse(readFileSync(path.join(extracted, 'data/media-manifest.json'), 'utf8'));
    const map = JSON.parse(readFileSync(path.join(extracted, 'src/lib/generated/media-delivery-map.json'), 'utf8'));
    const attributes = readFileSync(path.join(extracted, '.gitattributes'), 'utf8').replaceAll('\r\n', '\n');
    const fallbackPath = path.join(extracted, 'scripts/media/local-fallback-media.json');
    const fallback = existsSync(fallbackPath) ? JSON.parse(readFileSync(fallbackPath, 'utf8')) : {};
    const phase5Module = await import(`${pathToFileURL(path.join(extracted, 'scripts/media/phase5-export.mjs')).href}?tree=${tree}`);
    const archiveModule = await import(`${pathToFileURL(path.join(extracted, 'scripts/media/archive-proof.mjs')).href}?tree=${tree}`);
    const { validatePhase5 } = phase5Module;
    const { assertArchiveMedia, assertGitMediaRecovery } = archiveModule;
    const phase5 = await validatePhase5({ repoRoot: root, manifestValue: manifest, mapValue: map, attributesValue: attributes, fallbackValue: fallback });
    if (phase5.attributesChanged) throw new Error('Staged .gitattributes does not match the staged media map');
    assertArchiveMedia(extracted);
    assertGitMediaRecovery(extracted, root, tree);
    return { tree, staged: staged.split(/\r?\n/).filter(Boolean), assets: phase5.counts.assets };
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  validateStagedMediaCandidate({ delta: process.argv.includes('--delta') }).then((result) => {
    console.log(`Staged media ${result.mode ?? 'candidate'} verified: ${result.assets} assets${result.tree ? ` in tree ${result.tree}` : ''}`);
  }).catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
