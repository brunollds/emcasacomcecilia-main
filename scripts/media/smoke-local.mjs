import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const mappings = JSON.parse(await readFile('src/lib/generated/media-delivery-map.json', 'utf8'));
const mp4 = mappings['/videos/reviews/dolcegusto/genio-s-touch-loop-1.mp4'];
assert.ok(mp4, 'Pilot MP4 must be activated');
for (const pathname of ['/videos/primeiro-preparo-dolce-gusto-genio-s-touch', '/sitemap.xml', '/llms.txt']) {
  const response = await fetch(`http://localhost:3100${pathname}`, { signal: AbortSignal.timeout(15000) });
  const html = await response.text();
  assert.equal(response.status, 200, pathname);
  if (pathname !== '/llms.txt') assert.ok(html.includes(mp4), `${pathname}: CDN video missing`);
  if (pathname.startsWith('/videos/')) {
    assert.ok(html.includes(`https://emcasacomcecilia.com${pathname}`), 'Editorial canonical missing');
    assert.ok(html.includes(`<source src="${mp4}"`), 'Player does not use CDN');
  }
  console.log(`${pathname}: HTTP 200 and delivery checks passed`);
}
