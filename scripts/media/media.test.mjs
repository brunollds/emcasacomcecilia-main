import { after, before, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { execFile } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import {
  assertManifestNoCollisions,
  assertSafeRelativePath,
  buildRemoteKey,
  collectInventory,
  mergeInventory,
  parseRasterDimensions,
  storageFilenameFor,
} from './library.mjs';
import { verifyAsset } from './verify-remote.mjs';

const execFileAsync = promisify(execFile);

const png1x1 = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=', 'base64');
let temporaryRoot;
let server;
let serverOrigin;

function mediaServer(bytes) {
  return createServer((request, response) => {
    const servedBytes = bytes.slice();
    if (new URL(request.url, 'http://localhost').search === '?bad=1') servedBytes[servedBytes.length - 1] ^= 9;
    if (request.headers.range) {
      const match = request.headers.range.match(/^bytes=(\d+)-(\d+)$/);
      if (!match || Number(match[1]) >= servedBytes.length) {
        response.writeHead(416, { 'Content-Range': `bytes */${servedBytes.length}`, 'Cache-Control': 'no-store, no-transform' });
        response.end();
        return;
      }
      const start = Number(match[1]);
      const end = Math.min(Number(match[2]), servedBytes.length - 1);
      response.writeHead(206, {
        'Content-Length': end - start + 1,
        'Content-Range': `bytes ${start}-${end}/${servedBytes.length}`,
        'Content-Type': 'video/mp4',
      });
      response.end(servedBytes.subarray(start, end + 1));
      return;
    }
    response.writeHead(200, { 'Accept-Ranges': 'bytes', 'Content-Length': servedBytes.length, 'Content-Type': 'video/mp4' });
    response.end(servedBytes);
  });
}

before(async () => {
  temporaryRoot = await mkdtemp(path.join(os.tmpdir(), 'media-library-'));
  await mkdir(path.join(temporaryRoot, 'public', 'images', 'drafts'), { recursive: true });
  await mkdir(path.join(temporaryRoot, 'content'), { recursive: true });
  await writeFile(path.join(temporaryRoot, 'public', 'images', 'hero.png'), png1x1);
  await writeFile(path.join(temporaryRoot, 'public', 'images', 'drafts', 'Hero Final.png'), png1x1);
  await writeFile(path.join(temporaryRoot, 'content', 'page.json'), '{"image":"/images/hero.png"}\n');

  const remoteBytes = Buffer.concat([Buffer.from([0, 0, 0, 24, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x6d]), Buffer.alloc(116, 7)]);
  await mkdir(path.join(temporaryRoot, 'public', 'videos'), { recursive: true });
  await writeFile(path.join(temporaryRoot, 'public', 'videos', 'loop.mp4'), remoteBytes);
  server = mediaServer(remoteBytes);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  serverOrigin = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  await rm(temporaryRoot, { recursive: true, force: true });
});

describe('media inventory contract', () => {
  it('reads asymmetric VP8X dimensions as little-endian 24-bit values', () => {
    const buffer = Buffer.alloc(30);
    buffer.write('RIFF', 0, 'ascii');
    buffer.write('WEBP', 8, 'ascii');
    buffer.write('VP8X', 12, 'ascii');
    buffer.writeUIntLE(123456 - 1, 24, 3);
    buffer.writeUIntLE(321 - 1, 27, 3);
    assert.deepEqual(parseRasterDimensions(buffer, 'image/webp'), { width: 123456, height: 321 });
  });

  it('matches sharp dimensions for the real GenioTouch hero', async (t) => {
    const fixturePath = path.join(process.cwd(), 'public', 'images', 'reviews', 'dolcegusto', 'genio-s-touch-hero.webp');
    let sharp;
    try {
      ({ default: sharp } = await import('sharp'));
    } catch {
      t.skip('sharp is not installed');
      return;
    }
    const bytes = await readFile(fixturePath);
    const expected = await sharp(bytes).metadata();
    assert.deepEqual(parseRasterDimensions(bytes, 'image/webp'), {
      width: expected.width,
      height: expected.height,
    });
  });

  it('uses a truthful JPEG remote suffix without renaming the legacy source', () => {
    assert.equal(storageFilenameFor('legacy.webp', 'image/jpeg'), 'legacy.jpg');
    assert.equal(storageFilenameFor('Photo.JPG', 'image/jpeg'), 'photo.jpg');
    assert.throws(() => storageFilenameFor('unknown.webp', 'application/octet-stream'), /Unsupported/);
  });
  it('is deterministic and includes draft assets and references', async () => {
    const first = await collectInventory({ publicRoot: path.join(temporaryRoot, 'public'), repoRoot: temporaryRoot, origin: 'https://cdn.emcasacomcecilia.com' });
    const second = await collectInventory({ publicRoot: path.join(temporaryRoot, 'public'), repoRoot: temporaryRoot, origin: 'https://cdn.emcasacomcecilia.com' });
    assert.deepEqual(first, second);
    assert.equal(first.assets.length, 3);
    const draft = first.assets.find((asset) => asset.source_path.endsWith('Hero Final.png'));
    assert.equal(draft.status, 'candidate');
    assert.equal(draft.reference_status, 'unknown');
    assert.equal(draft.remote_url.startsWith('https://cdn.emcasacomcecilia.com/v1/image/'), true);
    assert.deepEqual(first.assets.find((asset) => asset.source_path.endsWith('hero.png')).owners, ['content/page.json']);
    assert.equal(first.assets.every((asset) => asset.status !== 'published'), true);
  });

  it('merge preserves evidence only when the complete asset identity is unchanged', async () => {
    const generated = await collectInventory({ publicRoot: path.join(temporaryRoot, 'public'), repoRoot: temporaryRoot });
    const previous = structuredClone(generated);
    previous.assets[0].uploaded_at = '2026-09-06T01:00:00.000Z';
    previous.assets[0].verified_at = '2026-09-06T01:01:00.000Z';
    previous.assets[0].verification_etag_or_digest = previous.assets[0].sha256;
    previous.assets[0].verification_status = 'verified';

    const merged = mergeInventory(previous, generated);
    assert.equal(merged.assets[0].verification_status, 'verified');
    assert.equal(merged.assets[0].uploaded_at, previous.assets[0].uploaded_at);

    const changed = structuredClone(generated);
    changed.assets[0].sha256 = 'b'.repeat(64);
    const reset = mergeInventory(previous, changed);
    assert.equal(reset.assets[0].verification_status, 'unverified');
    assert.equal(reset.assets[0].verified_at, null);
  });

  it('merge fails closed for a malformed existing manifest', async () => {
    const generated = await collectInventory({ publicRoot: path.join(temporaryRoot, 'public'), repoRoot: temporaryRoot });
    assert.throws(() => mergeInventory({ assets: [] }, generated), /existing manifest is invalid/);
  });

  it('inventory CLI accepts --merge and preserves evidence in stdout mode', async () => {
    const manifestPath = path.join(temporaryRoot, 'data', 'media-manifest.json');
    await mkdir(path.dirname(manifestPath), { recursive: true });
    const previous = await collectInventory({ publicRoot: path.join(temporaryRoot, 'public'), repoRoot: temporaryRoot });
    previous.assets[0].verification_status = 'verified';
    previous.assets[0].verification_etag_or_digest = previous.assets[0].sha256;
    previous.assets[0].verified_at = '2026-09-06T02:00:00.000Z';
    await writeFile(manifestPath, JSON.stringify(previous));

    const { stdout } = await execFileAsync(process.execPath, [
      'scripts/media/inventory.mjs', '--merge', '--stdout', '--repo-root', temporaryRoot, '--out', 'data/media-manifest.json',
    ], { cwd: process.cwd() });
    const result = JSON.parse(stdout);
    assert.equal(result.assets[0].verification_status, 'verified');
    assert.equal(result.assets[0].verified_at, '2026-09-06T02:00:00.000Z');
  });

  it('rejects traversal in local and remote paths', () => {
    assert.throws(() => assertSafeRelativePath('../outside.png'), /traversal/);
    assert.throws(() => assertSafeRelativePath('images/../outside.png'), /traversal/);
    assert.throws(() => buildRemoteKey({ mediaKind: 'image', sha256: 'a'.repeat(64), originalFilename: '../outside.png' }), /basename cannot contain a path/);
  });

  it('fails closed on immutable key collisions', () => {
    assert.throws(() => assertManifestNoCollisions([
      { remote_key: 'v1/image/a/hero.png', sha256: 'a'.repeat(64), media_kind: 'image' },
      { remote_key: 'v1/image/a/hero.png', sha256: 'b'.repeat(64), media_kind: 'image' },
    ]), /collision/);
  });
});

describe('remote verification contract', () => {
  it('rejects immutable caching on a 416 even with correct range metadata', async () => {
    const manifest = await collectInventory({ publicRoot: path.join(temporaryRoot, 'public'), repoRoot: temporaryRoot });
    const asset = manifest.assets.find((candidate) => candidate.source_path === 'public/videos/loop.mp4');
    const result = await verifyAsset(asset, {
      repoRoot: temporaryRoot,
      fetchImpl: async (url, options) => {
        const response = await fetch(`${serverOrigin}${new URL(url).pathname}`, options);
        if (response.status !== 416) return response;
        const headers = new Headers(response.headers);
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        return new Response(response.body, { status: 416, headers });
      },
    });
    assert.equal(result.ok, false);
    assert.equal(result.errors.includes('range-verification-failed'), true);
  });
  it('requires GET digest, MIME, and exact media ranges before success', async () => {
    const manifest = await collectInventory({ publicRoot: path.join(temporaryRoot, 'public'), repoRoot: temporaryRoot, origin: 'https://cdn.emcasacomcecilia.com' });
    const asset = manifest.assets.find((candidate) => candidate.source_path === 'public/videos/loop.mp4');
    asset.remote_url = `https://cdn.emcasacomcecilia.com/${asset.remote_key}`;
    const result = await verifyAsset(asset, {
      repoRoot: temporaryRoot,
      fetchImpl: (url, options) => {
        const parsed = new URL(url);
        return fetch(`${serverOrigin}${parsed.pathname}${parsed.search}`, options);
      },
    });
    assert.equal(result.ok, true);
    assert.equal(result.checks.get.sha256, asset.sha256);
    assert.equal(result.checks.ranges.filter((check) => check.ok).length, 4);
  });

  it('does not mark a bad remote body as verified', async () => {
    const manifest = await collectInventory({ publicRoot: path.join(temporaryRoot, 'public'), repoRoot: temporaryRoot, origin: 'https://cdn.emcasacomcecilia.com' });
    const asset = manifest.assets.find((candidate) => candidate.source_path === 'public/videos/loop.mp4');
    asset.remote_url = `https://cdn.emcasacomcecilia.com/${asset.remote_key}`;
    const result = await verifyAsset(asset, {
      repoRoot: temporaryRoot,
      fetchImpl: (url, options) => {
        const parsed = new URL(url);
        return fetch(`${serverOrigin}${parsed.pathname}?bad=1`, options);
      },
    });
    assert.equal(result.ok, false);
    assert.equal(result.errors.includes('get-integrity-or-mime-mismatch'), true);
  });
});
