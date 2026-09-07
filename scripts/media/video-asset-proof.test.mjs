import assert from 'node:assert/strict';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { buildRemoteKey, buildRemoteUrl, DEFAULT_ORIGIN } from './library.mjs';
import { validateMediaAssetAvailability } from './video-asset-proof.mjs';

const sha256 = 'a'.repeat(64);
test('rejects traversal, encoded separators and non-canonical local paths', () => {
  for (const assetUrl of ['/videos/../loop.mp4', '/videos/a\\loop.mp4', '/videos/a%2floop.mp4', '/videos/loop.mp4?x=1']) {
    assert.equal(validateMediaAssetAvailability({ assetUrl, repoRoot: process.cwd(), manifest: {}, map: {} }).ok, false);
  }
});

const asset = {
  source_path: 'public/videos/loop.mp4',
  local_url: '/videos/loop.mp4',
  media_kind: 'video',
  mime: 'video/mp4',
  original_filename: 'loop.mp4',
  storage_filename: 'loop.mp4',
  bytes: 7,
  sha256,
  verification_status: 'verified',
  verification_etag_or_digest: sha256,
  verified_at: '2026-09-06T00:00:00.000Z',
};
asset.remote_key = buildRemoteKey({ mediaKind: asset.media_kind, sha256, originalFilename: asset.original_filename });
asset.remote_url = buildRemoteUrl(DEFAULT_ORIGIN, asset.remote_key);

test('accepts an existing local file without manifest proof', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'video-proof-'));
  try {
    await mkdir(path.join(root, 'public', 'videos'), { recursive: true });
    await writeFile(path.join(root, 'public', 'videos', 'loop.mp4'), 'fixture');
    const result = validateMediaAssetAvailability({ assetUrl: asset.local_url, repoRoot: root, manifest: { assets: [] }, map: {} });
    assert.equal(result.ok, true);
    assert.equal(result.mode, 'local');
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('accepts a missing local file only with complete verified CDN proof', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'video-proof-'));
  try {
    const result = validateMediaAssetAvailability({
      assetUrl: asset.local_url,
      repoRoot: root,
      manifest: { assets: [asset] },
      map: { [asset.local_url]: asset.remote_url },
    });
    assert.equal(result.ok, true);
    assert.equal(result.mode, 'cdn');
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('fails closed when a missing asset lacks or has invalid proof', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'video-proof-'));
  try {
    const incomplete = { ...asset, verification_status: 'unverified' };
    assert.equal(validateMediaAssetAvailability({ assetUrl: asset.local_url, repoRoot: root, manifest: { assets: [incomplete] }, map: { [asset.local_url]: asset.remote_url } }).ok, false);
    const divergent = { ...asset, remote_url: buildRemoteUrl(DEFAULT_ORIGIN, `v1/video/${'b'.repeat(64)}/loop.mp4`) };
    assert.equal(validateMediaAssetAvailability({ assetUrl: asset.local_url, repoRoot: root, manifest: { assets: [divergent] }, map: { [asset.local_url]: divergent.remote_url } }).ok, false);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
