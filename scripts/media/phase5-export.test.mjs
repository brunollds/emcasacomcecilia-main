import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import test from 'node:test';
import { formatReport, gitAttributesPattern, validatePhase5 } from './phase5-export.mjs';

const execFileAsync = promisify(execFile);

const repoRoot = process.cwd();

test('validates the exact 304-entry Phase 5 allowlist and CDN proofs', async () => {
  const result = await validatePhase5({ repoRoot });
  assert.deepEqual(result.counts, { assets: 304, images: 294, videos: 10, rawBytes: 44729059 });
  assert.equal(result.checked.length, 304);
  assert.equal(result.checked.every((entry) => entry.remoteUrl.startsWith('https://cdn.emcasacomcecilia.com/')), true);
  assert.equal(formatReport(result).ok, true);
});

test('check mode has no write effect and the managed block is exact', async () => {
  const before = await readFile(`${repoRoot}/.gitattributes`, 'utf8');
  const result = await validatePhase5({ repoRoot });
  assert.equal(result.attributesChanged, false);
  assert.equal(await readFile(`${repoRoot}/.gitattributes`, 'utf8'), before);
  assert.match(result.block, /public\/images\/about\/cecilia\/cecilia-6\.jpg export-ignore/);
  assert.doesNotMatch(result.block, /public\/(?:\*|images\/\*|videos\/\*)/);
});

test('fails closed when the delivery map is mutated', async () => {
  const result = await validatePhase5({ repoRoot });
  const mutated = { ...result.map, '/images/about/cecilia/cecilia-6.jpg': 'https://cdn.emcasacomcecilia.com/v1/image/' + 'b'.repeat(64) + '/cecilia-6.jpg' };
  await assert.rejects(validatePhase5({ repoRoot, mapValue: mutated }), /map remote_url mismatch/);
});

test('fails closed for proof, local hash, and local size mutations', async () => {
  const result = await validatePhase5({ repoRoot });
  const localUrl = result.checked[0].localUrl;
  for (const mutation of [
    (asset) => ({ ...asset, verification_etag_or_digest: '0'.repeat(64) }),
    (asset) => ({ ...asset, sha256: '0'.repeat(64) }),
    (asset) => ({ ...asset, bytes: asset.bytes + 1 }),
  ]) {
    const manifestValue = {
      ...result.manifest,
      assets: result.manifest.assets.map((asset) => asset.local_url === localUrl ? mutation(asset) : asset),
    };
    await assert.rejects(validatePhase5({ repoRoot, manifestValue }), /(?:verification digest mismatch|local SHA-256 mismatch|local byte count mismatch)/);
  }
});

test('quotes Git attributes paths with spaces and brackets', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'phase5-gitattributes-'));
  try {
    const relative = 'public/images/space [x].jpg';
    await mkdir(path.dirname(path.join(root, relative)), { recursive: true });
    await writeFile(path.join(root, relative), 'fixture');
    await writeFile(path.join(root, '.gitattributes'), `${gitAttributesPattern(relative)} export-ignore\n`);
    await execFileAsync('git', ['init', '--quiet'], { cwd: root });
    const { stdout } = await execFileAsync('git', ['check-attr', 'export-ignore', '--', relative], { cwd: root });
    assert.match(stdout, /export-ignore: set/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
