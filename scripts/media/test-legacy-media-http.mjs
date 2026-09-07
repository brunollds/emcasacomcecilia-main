import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const origin = new URL(process.env.MEDIA_TEST_ORIGIN || 'http://localhost:3100');
assert.ok(['localhost', '127.0.0.1'].includes(origin.hostname), 'Local rehearsal only');
const mappings = JSON.parse(await readFile('src/lib/generated/media-delivery-map.json', 'utf8'));

async function request(path, options = {}) {
  return fetch(new URL(path, origin), {
    redirect: 'manual', signal: AbortSignal.timeout(15000), ...options,
  });
}

for (const [local, remote] of Object.entries(mappings)) {
  const response = await request(local, { method: 'HEAD' });
  if (remote.includes('/v1/image/')) {
    assert.equal(response.status, 200, local);
    assert.equal(response.headers.get('location'), null, local);
    assert.match(response.headers.get('content-type') || '', /^image\//, local);
    assert.match(response.headers.get('cache-control') || '', /no-store/, local);
  } else {
    assert.equal(response.status, 307, local);
    assert.equal(response.headers.get('location'), remote, local);
  }
}

const imageSamples = [
  '/images/about/partners/carolina-baby.webp',
  '/images/reviews/dolcegusto/genio-s-touch-cecilia-1.webp',
];
for (const local of imageSamples) {
  assert.ok(mappings[local]);
  const direct = await request(local);
  assert.equal(direct.status, 200);
  assert.equal(createHash('sha256').update(Buffer.from(await direct.arrayBuffer())).digest('hex'),
    createHash('sha256').update(await readFile(`public${local}`)).digest('hex'));
  const optimized = await request(`/_next/image?url=${encodeURIComponent(local)}&w=750&q=75`);
  assert.equal(optimized.status, 200, `legacy optimizer: ${local}`);
  assert.match(optimized.headers.get('content-type') || '', /^image\//);
  const metadata = await sharp(Buffer.from(await optimized.arrayBuffer())).metadata();
  assert.ok(metadata.width > 0 && metadata.height > 0);
}

const video = Object.keys(mappings).find((key) => key.endsWith('.mp4'));
assert.ok(video);
const range = await request(video, { headers: { Range: 'bytes=0-15' } });
assert.equal(range.status, 307);
assert.equal(range.headers.get('location'), mappings[video]);
await range.body?.cancel();

const untouched = '/file.svg';
assert.equal(mappings[untouched], undefined);
const localResponse = await request(untouched);
assert.equal(localResponse.status, 200);
const received = Buffer.from(await localResponse.arrayBuffer());
const expected = await readFile(`public${untouched}`);
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
assert.equal(digest(received), digest(expected));

const missing = await request('/images/cdn-test-definitely-missing-file.webp');
assert.equal(missing.status, 404);
await missing.body?.cancel();
console.log(`${Object.keys(mappings).length} compatibility routes passed; legacy image optimizer, source hashes, Range redirect, local bytes and missing URL passed.`);
