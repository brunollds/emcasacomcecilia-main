import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { collectInventory, mergeInventory } from './library.mjs';
import { verifyAsset } from './verify-remote.mjs';
import { prepareDelivery } from './prepare-delivery.mjs';
import { validatePhase5 } from './phase5-export.mjs';
import { createAttestedArchive } from '../deploy/prepare.mjs';
import { retainOriginals } from './retain-original.mjs';

test('staging -> CDN proof -> Git original -> archive without media -> Git recovery', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'cdn-only-lifecycle-'));
  const repoRoot = path.join(root, 'repo');
  const staging = path.join(root, 'staging');
  const git = (...args) => execFileSync('git', args, { cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  const persist = (file, value) => writeFile(path.join(repoRoot, file), JSON.stringify(value));
  try {
    await mkdir(path.join(repoRoot, 'public'), { recursive: true });
    await mkdir(path.join(repoRoot, 'data'), { recursive: true });
    await mkdir(path.join(repoRoot, 'src/lib/generated'), { recursive: true });
    await mkdir(path.join(staging, 'images'), { recursive: true });
    const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=', 'base64');
    const previous = await collectInventory({ repoRoot, publicRoot: path.join(repoRoot, 'public') });
    await persist('data/media-manifest.json', previous);
    await persist('src/lib/generated/media-delivery-map.json', {});
    await persist('package.json', { name: 'fixture' });
    await writeFile(path.join(repoRoot, '.gitattributes'), '');
    git('init', '--quiet');
    const commit = () => {
      git('add', '--', '.gitattributes', 'data/media-manifest.json', 'src/lib/generated/media-delivery-map.json', 'package.json');
      git('-c', 'user.name=Test', '-c', 'user.email=test@example.invalid', 'commit', '--quiet', '-m', 'fixture');
    };
    commit();
    await writeFile(path.join(staging, 'images/hero.png'), png);
    const manifest = mergeInventory(previous, await collectInventory({ repoRoot, publicRoot: path.join(repoRoot, 'public'), stagingRoot: staging }));
    const asset = manifest.assets[0];
    // Exercise the actual Python CLI preflight, without credentials or network writes.
    const uploadScript = new URL('./upload-ftps.py', import.meta.url);
    const { fileURLToPath } = await import('node:url');
    await persist('data/media-manifest.json', manifest);
    execFileSync('python', [fileURLToPath(uploadScript), '--manifest', path.join(repoRoot, 'data/media-manifest.json'),
      '--staging-root', staging, '--asset', asset.source_path], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    const verification = await verifyAsset(asset, {
      repoRoot,
      fetchImpl: async () => new Response(png, { status: 200, headers: { 'Content-Type': 'image/png', 'Content-Length': String(png.length) } }),
    });
    assert.equal(verification.ok, true);
    Object.assign(asset, { verification_status: 'verified', verified_at: new Date().toISOString(), verification_etag_or_digest: verification.checks.get.sha256 });
    await persist('data/media-manifest.json', manifest);
    const retention = { repoRoot, stagingRoot: staging, manifest, assetPaths: [asset.source_path] };
    assert.equal((await retainOriginals(retention))[0].status, 'planned');
    await assert.rejects(readFile(path.join(repoRoot, asset.source_path)), { code: 'ENOENT' });
    await retainOriginals({ ...retention, write: true });
    assert.equal((await retainOriginals({ ...retention, write: true }))[0].status, 'identical');
    await prepareDelivery({ manifest, repoRoot, assetPaths: [asset.source_path], append: true, write: true });
    const exported = await validatePhase5({ repoRoot });
    await writeFile(path.join(repoRoot, '.gitattributes'), exported.expectedAttributes);
    commit();
    assert.throws(() => createAttestedArchive({ repoDir: repoRoot, targetSha: git('rev-parse', 'HEAD'), deployUuid: '00000000-0000-4000-8000-000000000001' }), /original not committed/);
    git('add', '--', asset.source_path);
    git('-c', 'user.name=Test', '-c', 'user.email=test@example.invalid', 'commit', '--quiet', '-m', 'retain original');
    assert.equal((await validatePhase5({ repoRoot })).attributesChanged, false);
    assert.equal(git('ls-files', '--', asset.source_path), asset.source_path);
    assert.deepEqual(execFileSync('git', ['show', `HEAD:${asset.source_path}`], { cwd: repoRoot }), png);
    await writeFile(path.join(repoRoot, asset.source_path), 'different bytes');
    await assert.rejects(retainOriginals({ ...retention, write: true }), /Refusing to overwrite/);
    await writeFile(path.join(repoRoot, asset.source_path), png);
    const archive = createAttestedArchive({ repoDir: repoRoot, targetSha: git('rev-parse', 'HEAD'), deployUuid: '00000000-0000-4000-8000-000000000001' });
    const listing = execFileSync('tar', ['-tzf', archive.archive], { encoding: 'utf8' });
    assert.ok(listing.includes('data/media-manifest.json'));
    assert.ok(!listing.includes('public/images/hero.png'));
    const nextInventory = mergeInventory(manifest, await collectInventory({ repoRoot, publicRoot: path.join(repoRoot, 'public') }));
    assert.equal(nextInventory.assets[0].verification_status, 'verified');
    assert.equal(nextInventory.assets[0].staged, true);
    const repeatedInventory = mergeInventory(manifest, await collectInventory({ repoRoot,
      publicRoot: path.join(repoRoot, 'public'), stagingRoot: staging }));
    assert.equal(repeatedInventory.assets.length, 1);
    assert.equal(repeatedInventory.assets[0].verification_status, 'verified');
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
