import { after, before, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { collectInventory, mergeInventory } from './library.mjs';

const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=', 'base64');
let repo;
let staging;

before(async () => {
  repo = await mkdtemp(path.join(os.tmpdir(), 'media-repo-'));
  staging = await mkdtemp(path.join(os.tmpdir(), 'media-staging-'));
  await mkdir(path.join(repo, 'public', 'images'), { recursive: true });
  await mkdir(path.join(staging, 'images', 'optimized'), { recursive: true });
  await writeFile(path.join(staging, 'images', 'optimized', 'hero.png'), png);
});

after(async () => {
  await rm(repo, { recursive: true, force: true });
  await rm(staging, { recursive: true, force: true });
});

describe('external staged media inventory', () => {
  it('registers logical paths without copying bytes into public', async () => {
    const manifest = await collectInventory({ repoRoot: repo, publicRoot: path.join(repo, 'public'), stagingRoot: staging });
    const asset = manifest.assets.find((candidate) => candidate.staged);
    assert.equal(asset.source_path, 'public/images/optimized/hero.png');
    assert.equal(asset.local_url, '/images/optimized/hero.png');
    assert.equal(asset.staged, true);
    assert.deepEqual(await readFile(path.join(staging, 'images', 'optimized', 'hero.png')), png);
    await assert.rejects(readFile(path.join(repo, 'public', 'images', 'optimized', 'hero.png')));
    assert.equal(JSON.stringify(manifest).includes(staging), false);
  });

  it('is repeatable and merge preserves absent prior CDN evidence', async () => {
    const current = await collectInventory({ repoRoot: repo, publicRoot: path.join(repo, 'public'), stagingRoot: staging });
    const prior = structuredClone(current);
    prior.assets[0].verification_status = 'verified';
    prior.assets[0].verified_at = '2026-09-07T00:00:00.000Z';
    prior.assets.push({ ...prior.assets[0], source_path: 'public/images/legacy.png', local_url: '/images/legacy.png', staged: undefined });
    const merged = mergeInventory(prior, current);
    assert.equal(merged.assets.some((asset) => asset.source_path === 'public/images/legacy.png'), true);
    assert.equal(merged.assets.find((asset) => asset.staged).verification_status, 'verified');
    assert.deepEqual(current, await collectInventory({ repoRoot: repo, publicRoot: path.join(repo, 'public'), stagingRoot: staging }));
  });

  it('rejects same-name staged mutation and unsafe roots', async () => {
    const current = await collectInventory({ repoRoot: repo, publicRoot: path.join(repo, 'public'), stagingRoot: staging });
    await writeFile(path.join(staging, 'images', 'optimized', 'hero.png'), Buffer.concat([png, Buffer.from('changed')]));
    const changed = await collectInventory({ repoRoot: repo, publicRoot: path.join(repo, 'public'), stagingRoot: staging });
    assert.throws(() => mergeInventory(current, changed), /new filename/);
    await mkdir(path.join(repo, 'staging'));
    await assert.rejects(collectInventory({ repoRoot: repo, publicRoot: path.join(repo, 'public'), stagingRoot: path.join(repo, 'staging') }), /outside the repository/);
    await assert.rejects(collectInventory({ repoRoot: repo, publicRoot: path.join(repo, 'public'), stagingRoot: 'relative-staging' }), /absolute/);
  });

  it('rejects symlinked staged paths when the platform permits symlinks', async (t) => {
    const link = path.join(staging, 'images', 'optimized', 'escape.png');
    try {
      await symlink(path.join(repo, 'public', 'images'), link);
    } catch (error) {
      t.skip(`symlink unavailable: ${error.code}`);
      return;
    }
    await assert.rejects(collectInventory({ repoRoot: repo, publicRoot: path.join(repo, 'public'), stagingRoot: staging }), /symlinks/);
  });
});
