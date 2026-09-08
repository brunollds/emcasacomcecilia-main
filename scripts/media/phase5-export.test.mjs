import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import test from 'node:test';
import { formatReport, gitAttributesPattern, validatePhase5 } from './phase5-export.mjs';

const execFileAsync = promisify(execFile);

const repoRoot = process.cwd();

test('validates the committed Phase 5 allowlist and CDN proofs', async () => {
  const result = await validatePhase5({ repoRoot });
  assert.equal(result.counts.assets, result.checked.length);
  assert.equal(result.counts.images + result.counts.videos, result.counts.assets);
  assert.ok(result.counts.assets > 0);
  assert.equal(result.checked.every((entry) => entry.remoteUrl.startsWith('https://cdn.emcasacomcecilia.com/')), true);
  assert.equal(formatReport(result).ok, true);
});

test('check mode has no write effect and the managed block is exact', async () => {
  const before = await readFile(`${repoRoot}/.gitattributes`, 'utf8');
  const result = await validatePhase5({ repoRoot });
  assert.equal(result.attributesChanged, false);
  const crlfResult = await validatePhase5({
    repoRoot,
    attributesValue: before.replaceAll('\r\n', '\n').replaceAll('\n', '\r\n'),
  });
  assert.equal(crlfResult.attributesChanged, false, 'Line-ending conversion must not change the allowlist semantics');
  assert.equal(await readFile(`${repoRoot}/.gitattributes`, 'utf8'), before);
  assert.match(result.block, /public\/images\/about\/cecilia\/cecilia-6\.jpg -text export-ignore/);
  assert.doesNotMatch(result.block, /public\/(?:\*|images\/\*|videos\/\*)/);
});

test('fails closed when the delivery map is mutated', async () => {
  const result = await validatePhase5({ repoRoot });
  const mutated = { ...result.map, '/images/about/cecilia/cecilia-6.jpg': 'https://cdn.emcasacomcecilia.com/v1/image/' + 'b'.repeat(64) + '/cecilia-6.jpg' };
  await assert.rejects(validatePhase5({ repoRoot, mapValue: mutated }), /previously exported mapping changed/);
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
    await assert.rejects(validatePhase5({ repoRoot, manifestValue }), /(?:previously exported hash changed|previously exported byte count changed|verification digest mismatch|local SHA-256 mismatch|local byte count mismatch)/);
  }
});

function fixtureAsset({ sourcePath, bytes, mediaKind = 'image', verified = true }) {
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  const filename = path.posix.basename(sourcePath);
  const localUrl = `/${sourcePath.slice('public/'.length)}`;
  const remoteKey = `v1/${mediaKind}/${sha256}/${filename}`;
  return {
    source_path: sourcePath,
    local_url: localUrl,
    media_kind: mediaKind,
    mime: 'image/png',
    bytes: bytes.length,
    sha256,
    original_filename: filename,
    storage_filename: filename,
    remote_key: remoteKey,
    remote_url: `https://cdn.emcasacomcecilia.com/${remoteKey}`,
    verification_status: verified ? 'verified' : 'unverified',
    verification_etag_or_digest: verified ? sha256 : null,
    verified_at: verified ? '2026-09-07T00:00:00.000Z' : null,
  };
}

async function makeFixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), 'phase5-incremental-'));
  const firstBytes = Buffer.from('first fixture image');
  const first = fixtureAsset({ sourcePath: 'public/images/first.png', bytes: firstBytes });
  const manifest = { manifest_version: 1, origin: 'https://cdn.emcasacomcecilia.com', assets: [first] };
  const map = { [first.local_url]: first.remote_url };
  await mkdir(path.join(root, 'data'), { recursive: true });
  await mkdir(path.join(root, 'src/lib/generated'), { recursive: true });
  await mkdir(path.join(root, 'public/images'), { recursive: true });
  await writeFile(path.join(root, 'data/media-manifest.json'), JSON.stringify(manifest));
  await writeFile(path.join(root, 'src/lib/generated/media-delivery-map.json'), JSON.stringify(map));
  await writeFile(path.join(root, 'public/images/first.png'), firstBytes);
  await writeFile(path.join(root, '.gitattributes'), '');
  await execFileAsync('git', ['init', '--quiet'], { cwd: root });
  await execFileAsync('git', ['config', 'user.email', 'phase5@example.test'], { cwd: root });
  await execFileAsync('git', ['config', 'user.name', 'Phase 5 Test'], { cwd: root });
  await execFileAsync('git', ['add', '.'], { cwd: root });
  await execFileAsync('git', ['commit', '--quiet', '-m', 'baseline'], { cwd: root });
  return { root, manifest, map, first };
}

async function writeFixtureState(fixture, manifest, map, { localFiles = [] } = {}) {
  await writeFile(path.join(fixture.root, 'data/media-manifest.json'), JSON.stringify(manifest));
  await writeFile(path.join(fixture.root, 'src/lib/generated/media-delivery-map.json'), JSON.stringify(map));
  for (const [relative, bytes] of localFiles) {
    await mkdir(path.dirname(path.join(fixture.root, relative)), { recursive: true });
    await writeFile(path.join(fixture.root, relative), bytes);
  }
}

test('allows monotonic growth only with recovery originals retained', async () => {
  const fixture = await makeFixture();
  try {
    const second = fixtureAsset({ sourcePath: 'public/images/remote-only.png', bytes: Buffer.from('remote-only') });
    const manifest = { ...fixture.manifest, assets: [...fixture.manifest.assets, second] };
    const map = { ...fixture.map, [second.local_url]: second.remote_url };
    await writeFixtureState(fixture, manifest, map);
    await assert.rejects(validatePhase5({ repoRoot: fixture.root }), /recovery original missing/);
    await writeFile(path.join(fixture.root, second.source_path), Buffer.from('remote-only'));
    const result = await validatePhase5({ repoRoot: fixture.root });
    assert.equal(result.counts.assets, 2);
    assert.equal(result.checked.find((entry) => entry.localUrl === second.local_url).localPresent, true);
    assert.match(result.block, /public\/images\/remote-only\.png -text export-ignore/);

    await writeFile(path.join(fixture.root, '.gitattributes'), result.expectedAttributes);
    await execFileAsync('git', ['add', 'data/media-manifest.json', 'src/lib/generated/media-delivery-map.json', '.gitattributes', second.source_path], { cwd: fixture.root });
    await execFileAsync('git', ['commit', '--quiet', '-m', 'record CDN-delivered asset'], { cwd: fixture.root });

    const repeated = await validatePhase5({ repoRoot: fixture.root });
    assert.equal(repeated.counts.assets, 2);
    assert.equal(repeated.checked.find((entry) => entry.localUrl === second.local_url).localPresent, true);

    const third = fixtureAsset({ sourcePath: 'public/images/next-remote-only.png', bytes: Buffer.from('next remote-only') });
    await writeFixtureState(fixture, {
      ...manifest,
      assets: [...manifest.assets, third],
    }, { ...map, [third.local_url]: third.remote_url });
    await writeFile(path.join(fixture.root, third.source_path), Buffer.from('next remote-only'));
    const appended = await validatePhase5({ repoRoot: fixture.root });
    assert.equal(appended.counts.assets, 3);
  } finally {
    await rm(fixture.root, { recursive: true, force: true });
  }
});

test('rejects removal of a previously exported entry', async () => {
  const fixture = await makeFixture();
  try {
    await writeFixtureState(fixture, { ...fixture.manifest, assets: [] }, {});
    await assert.rejects(validatePhase5({ repoRoot: fixture.root }), /previously exported (?:manifest )?entry removed/);
  } finally {
    await rm(fixture.root, { recursive: true, force: true });
  }
});

test('allows a mapped asset to return local only through explicit path and hash policy', async () => {
  const fixture = await makeFixture();
  try {
    await writeFixtureState(fixture, fixture.manifest, {});
    const fallback = { [fixture.first.source_path]: fixture.first.sha256 };
    const result = await validatePhase5({ repoRoot: fixture.root, fallbackValue: fallback });
    assert.doesNotMatch(result.block, /public\/images\/first\.png/);
    await assert.rejects(validatePhase5({ repoRoot: fixture.root, fallbackValue: { [fixture.first.source_path]: '0'.repeat(64) } }), /previously exported entry removed/);
  } finally {
    await rm(fixture.root, { recursive: true, force: true });
  }
});

test('rejects remapping a previously exported entry', async () => {
  const fixture = await makeFixture();
  try {
    await writeFixtureState(fixture, fixture.manifest, {
      [fixture.first.local_url]: `https://cdn.emcasacomcecilia.com/v1/image/${'a'.repeat(64)}/first.png`,
    });
    await assert.rejects(validatePhase5({ repoRoot: fixture.root }), /previously exported mapping changed/);
  } finally {
    await rm(fixture.root, { recursive: true, force: true });
  }
});

test('rejects an unverified new entry even when its local bytes are absent', async () => {
  const fixture = await makeFixture();
  try {
    const second = fixtureAsset({ sourcePath: 'public/images/unverified.png', bytes: Buffer.from('unverified'), verified: false });
    await writeFixtureState(fixture, {
      ...fixture.manifest,
      assets: [...fixture.manifest.assets, second],
    }, { ...fixture.map, [second.local_url]: second.remote_url });
    await assert.rejects(validatePhase5({ repoRoot: fixture.root }), /not independently verified/);
  } finally {
    await rm(fixture.root, { recursive: true, force: true });
  }
});

test('rejects duplicate managed markers', async () => {
  const fixture = await makeFixture();
  try {
    const duplicate = '# BEGIN MANAGED PHASE5 CDN EXPORT ALLOWLIST\n# END MANAGED PHASE5 CDN EXPORT ALLOWLIST\n'
      + '# BEGIN MANAGED PHASE5 CDN EXPORT ALLOWLIST\n# END MANAGED PHASE5 CDN EXPORT ALLOWLIST\n';
    await writeFile(path.join(fixture.root, '.gitattributes'), duplicate);
    await assert.rejects(validatePhase5({ repoRoot: fixture.root }), /Duplicate Phase 5 managed markers/);
  } finally {
    await rm(fixture.root, { recursive: true, force: true });
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
