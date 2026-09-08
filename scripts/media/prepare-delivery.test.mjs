import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { buildRemoteKey, buildRemoteUrl, DEFAULT_ORIGIN } from './library.mjs';
import { prepareDelivery } from './prepare-delivery.mjs';

const execFileAsync = promisify(execFile);

const PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

test('remote-proof append works before Git retention and rejects invalid proof', async () => {
  const { repoRoot, manifest } = await fixture();
  try {
    const asset = manifest.assets[0];
    await rm(path.join(repoRoot, asset.source_path));
    const outputPath = path.join(repoRoot, 'map.json');
    await writeFile(outputPath, '{}');
    const options = { manifest, repoRoot, assetPaths: [asset.source_path], outputPath, append: true, write: true };
    await prepareDelivery(options);
    const second = await prepareDelivery(options);
    assert.deepEqual(second.map, { [asset.local_url]: asset.remote_url });
    asset.verified_at = 'not-a-date';
    await assert.rejects(prepareDelivery(options), /proof failed/);
  } finally {
    await rm(repoRoot, { recursive: true, force: true });
  }
});

async function fixture({ verified = true } = {}) {
  const repoRoot = await mkdtemp(path.join(os.tmpdir(), 'prepare-delivery-'));
  const sourcePath = 'public/images/pilot.png';
  const localUrl = '/images/pilot.png';
  const bytes = Buffer.concat([PNG, Buffer.from('pilot')]);
  const source = path.join(repoRoot, sourcePath.split('/').join(path.sep));
  await writeFile(source, bytes, { recursive: false }).catch(async (error) => {
    if (error.code !== 'ENOENT') throw error;
    const { mkdir } = await import('node:fs/promises');
    await mkdir(path.dirname(source), { recursive: true });
    await writeFile(source, bytes);
  });
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  const storageFilename = 'pilot.png';
  const remoteKey = buildRemoteKey({ mediaKind: 'image', sha256, originalFilename: storageFilename });
  return {
    repoRoot,
    manifest: {
      manifest_version: 1,
      origin: DEFAULT_ORIGIN,
      assets: [{
        source_path: sourcePath,
        local_url: localUrl,
        media_kind: 'image',
        mime: 'image/png',
        original_filename: 'pilot.png',
        storage_filename: storageFilename,
        bytes: bytes.length,
        sha256,
        remote_key: remoteKey,
        remote_url: buildRemoteUrl(DEFAULT_ORIGIN, remoteKey),
        verification_status: verified ? 'verified' : 'unverified',
        verification_etag_or_digest: verified ? sha256 : null,
        verified_at: verified ? '2026-09-06T00:00:00.000Z' : null,
      }],
    },
  };
}

test('dry-run validates all gates without creating the output map', async () => {
  const { repoRoot, manifest } = await fixture();
  try {
    const outputPath = path.join(repoRoot, 'src/lib/generated/media-delivery-map.json');
    const result = await prepareDelivery({ manifest, repoRoot, assetPaths: [manifest.assets[0].source_path], outputPath });
    assert.equal(result.wrote, false);
    await assert.rejects(readFile(outputPath));
  } finally {
    await rm(repoRoot, { recursive: true, force: true });
  }
});

test('write creates only the selected local-to-remote map atomically', async () => {
  const { repoRoot, manifest } = await fixture();
  try {
    const outputPath = path.join(repoRoot, 'src/lib/generated/media-delivery-map.json');
    const result = await prepareDelivery({ manifest, repoRoot, assetPaths: [manifest.assets[0].source_path], outputPath, write: true });
    assert.equal(result.wrote, true);
    assert.deepEqual(JSON.parse(await readFile(outputPath, 'utf8')), { [manifest.assets[0].local_url]: manifest.assets[0].remote_url });
  } finally {
    await rm(repoRoot, { recursive: true, force: true });
  }
});

test('requires every scoped asset to be verified before selection can write', async () => {
  const { repoRoot, manifest } = await fixture({ verified: false });
  try {
    await assert.rejects(
      prepareDelivery({ manifest, repoRoot, assetPaths: [manifest.assets[0].source_path], write: true }),
      /not independently verified/
    );
  } finally {
    await rm(repoRoot, { recursive: true, force: true });
  }
});

test('rejects selected local byte changes and invalid remote identity', async () => {
  const { repoRoot, manifest } = await fixture();
  try {
    const source = path.join(repoRoot, 'public/images/pilot.png');
    await writeFile(source, Buffer.concat([PNG, Buffer.from('changed')]));
    await assert.rejects(
      prepareDelivery({ manifest, repoRoot, assetPaths: [manifest.assets[0].source_path] }),
      /Local bytes mismatch/
    );
  } finally {
    await rm(repoRoot, { recursive: true, force: true });
  }
});

test('rejects unrelated local_url and original_filename mappings', async () => {
  for (const [field, value, message] of [
    ['local_url', '/unrelated/pilot.png', /Local URL mismatch/],
    ['original_filename', 'other.png', /Original filename mismatch/],
  ]) {
    const { repoRoot, manifest } = await fixture();
    try {
      manifest.assets[0][field] = value;
      await assert.rejects(
        prepareDelivery({ manifest, repoRoot, assetPaths: [manifest.assets[0].source_path] }),
        message
      );
    } finally {
      await rm(repoRoot, { recursive: true, force: true });
    }
  }
});

test('rejects bytes whose detected MIME differs from the manifest', async () => {
  const { repoRoot, manifest } = await fixture();
  try {
    manifest.assets[0].mime = 'image/jpeg';
    manifest.assets[0].storage_filename = 'pilot.jpg';
    manifest.assets[0].remote_key = buildRemoteKey({
      mediaKind: 'image',
      sha256: manifest.assets[0].sha256,
      originalFilename: 'pilot.jpg',
    });
    manifest.assets[0].remote_url = buildRemoteUrl(DEFAULT_ORIGIN, manifest.assets[0].remote_key);
    await assert.rejects(
      prepareDelivery({ manifest, repoRoot, assetPaths: [manifest.assets[0].source_path] }),
      /Local MIME mismatch/
    );
  } finally {
    await rm(repoRoot, { recursive: true, force: true });
  }
});

test('append unions an existing map and ignores an unselected unverified candidate', async () => {
  const { repoRoot, manifest } = await fixture();
  try {
    const first = manifest.assets[0];
    const secondBytes = Buffer.concat([PNG, Buffer.from('second')]);
    const secondSourcePath = 'public/images/second.png';
    await writeFile(path.join(repoRoot, secondSourcePath), secondBytes);
    const secondSha = createHash('sha256').update(secondBytes).digest('hex');
    const secondKey = buildRemoteKey({ mediaKind: 'image', sha256: secondSha, originalFilename: 'second.png' });
    manifest.assets.push({
      ...first,
      source_path: secondSourcePath,
      local_url: '/images/second.png',
      original_filename: 'second.png',
      storage_filename: 'second.png',
      bytes: secondBytes.length,
      sha256: secondSha,
      remote_key: secondKey,
      remote_url: buildRemoteUrl(DEFAULT_ORIGIN, secondKey),
      verification_etag_or_digest: secondSha,
    });
    manifest.assets.push({ ...first, source_path: 'public/images/unselected.png', local_url: '/images/unselected.png', verification_status: 'unverified', verification_etag_or_digest: null, verified_at: null });
    const outputPath = path.join(repoRoot, 'media-map.json');
    await writeFile(outputPath, JSON.stringify({ [first.local_url]: first.remote_url }));

    const result = await prepareDelivery({ manifest, repoRoot, assetPaths: [secondSourcePath], outputPath, append: true, write: true });
    assert.deepEqual(JSON.parse(await readFile(outputPath, 'utf8')), {
      [first.local_url]: first.remote_url,
      '/images/second.png': manifest.assets[1].remote_url,
    });
    assert.equal(result.map['/images/unselected.png'], undefined);
  } finally {
    await rm(repoRoot, { recursive: true, force: true });
  }
});

test('append rejects a conflicting mapping and leaves a malformed map unchanged', async () => {
  const { repoRoot, manifest } = await fixture();
  try {
    const asset = manifest.assets[0];
    const conflictKey = buildRemoteKey({ mediaKind: 'image', sha256: 'b'.repeat(64), originalFilename: 'other.png' });
    const outputPath = path.join(repoRoot, 'media-map.json');
    const conflict = JSON.stringify({ [asset.local_url]: buildRemoteUrl(DEFAULT_ORIGIN, conflictKey) });
    await writeFile(outputPath, conflict);
    await assert.rejects(
      prepareDelivery({ manifest, repoRoot, assetPaths: [asset.source_path], outputPath, append: true, write: true }),
      /remote mapping conflict/
    );

    const malformed = '{"/images/not-in-manifest.png":"https://cdn.emcasacomcecilia.com/v1/image/' + 'a'.repeat(64) + '/x.png"}';
    await writeFile(outputPath, malformed);
    await assert.rejects(
      prepareDelivery({ manifest, repoRoot, assetPaths: [asset.source_path], outputPath, append: true, write: true }),
      /absent from manifest/
    );
    assert.equal(await readFile(outputPath, 'utf8'), malformed);
  } finally {
    await rm(repoRoot, { recursive: true, force: true });
  }
});

test('prepare CLI parses --append and stays dry-run without writing', async () => {
  const { repoRoot, manifest } = await fixture();
  try {
    const manifestPath = path.join(repoRoot, 'manifest.json');
    const outputPath = path.join(repoRoot, 'map.json');
    await writeFile(manifestPath, JSON.stringify(manifest));
    await writeFile(outputPath, JSON.stringify({ [manifest.assets[0].local_url]: manifest.assets[0].remote_url }));

    const { stdout } = await execFileAsync(process.execPath, [
      'scripts/media/prepare-delivery.mjs',
      '--repo-root', repoRoot,
      '--manifest', 'manifest.json',
      '--out', 'map.json',
      '--append',
      '--asset', manifest.assets[0].source_path,
    ], { cwd: process.cwd() });
    const result = JSON.parse(stdout);
    assert.equal(result.ok, true);
    assert.equal(result.dryrun, true);
    assert.equal(JSON.parse(await readFile(outputPath, 'utf8'))[manifest.assets[0].local_url], manifest.assets[0].remote_url);
  } finally {
    await rm(repoRoot, { recursive: true, force: true });
  }
});
