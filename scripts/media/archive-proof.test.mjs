import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { assertArchiveMedia } from './archive-proof.mjs';

test('extracted archive accepts CDN-delivered Git-backed media, rejects included bytes and bad proof', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'cdn-archive-proof-'));
  try {
    const original = JSON.parse(await readFile(new URL('../../data/media-manifest.json', import.meta.url)));
    const asset = original.assets.find((entry) => entry.verification_status === 'verified');
    const manifest = { ...original, assets: [asset] };
    await mkdir(path.join(root, 'data'), { recursive: true });
    await mkdir(path.join(root, 'src/lib/generated'), { recursive: true });
    const manifestPath = path.join(root, 'data/media-manifest.json');
    await writeFile(manifestPath, JSON.stringify(manifest));
    await writeFile(path.join(root, 'src/lib/generated/media-delivery-map.json'), JSON.stringify({ [asset.local_url]: asset.remote_url }));
    assert.doesNotThrow(() => assertArchiveMedia(root));
    const local = path.join(root, asset.source_path);
    await mkdir(path.dirname(local), { recursive: true });
    await writeFile(local, 'must not be packaged');
    assert.throws(() => assertArchiveMedia(root), /bytes entered the archive/);
    await rm(local);
    const unmapped = path.join(root, 'public/images/new-unmapped.webp');
    await mkdir(path.dirname(unmapped), { recursive: true });
    await writeFile(unmapped, 'unmapped bytes');
    assert.throws(() => assertArchiveMedia(root), /New\/unrecognized media/);
    const fallbackBytes = Buffer.from('unmapped bytes');
    const fallbackAsset = {
      ...asset,
      source_path: 'public/images/new-unmapped.webp',
      local_url: '/images/new-unmapped.webp',
      sha256: createHash('sha256').update(fallbackBytes).digest('hex'),
      bytes: fallbackBytes.length,
    };
    manifest.assets.push(fallbackAsset);
    await mkdir(path.join(root, 'scripts/media'), { recursive: true });
    await writeFile(path.join(root, 'scripts/media/local-fallback-media.json'), JSON.stringify({
      [fallbackAsset.source_path]: fallbackAsset.sha256,
    }));
    await writeFile(manifestPath, JSON.stringify(manifest));
    assert.doesNotThrow(() => assertArchiveMedia(root));
    await rm(unmapped);
    assert.throws(() => assertArchiveMedia(root), /fallback bytes missing/);
    manifest.assets.pop();
    await writeFile(path.join(root, 'scripts/media/local-fallback-media.json'), '{}');
    asset.verification_status = 'unverified';
    await writeFile(manifestPath, JSON.stringify(manifest));
    assert.throws(() => assertArchiveMedia(root), /proof failed/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
