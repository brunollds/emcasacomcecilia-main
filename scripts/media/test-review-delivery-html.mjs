import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const map = JSON.parse(await readFile('src/lib/generated/media-delivery-map.json', 'utf8'));
const pages = [
  'index',
  'en/reviews',
  'reviews/dolce-gusto-genio-s-touch-vale-a-pena',
  'reviews/i-wanna-sleep-e-confiavel',
  'reviews/sofa-na-caixa-crise-reclamacoes-procon-sp',
  'sobre',
  'cupons',
  'cupons/yesstyle',
  'cupons/nutren',
  'receitas/bolo-de-cenoura-com-cobertura-de-chocolate',
];

for (const page of pages) {
  const html = await readFile(`.next/server/app/${page}.html`, 'utf8');
  let delivered = 0;
  for (const match of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) {
    const src = match[1].replaceAll('&amp;', '&');
    const parsed = new URL(src, 'https://emcasacomcecilia.com');
    const original = parsed.pathname === '/_next/image' ? parsed.searchParams.get('url') : src;
    assert.ok(original, `${page}: image source is empty`);
    assert.ok(!Object.hasOwn(map, original), `${page}: selected image still served locally: ${original}`);
    if (original.startsWith('https://cdn.emcasacomcecilia.com/')) delivered++;
  }
  assert.ok(delivered > 0, `${page}: no CDN image rendered`);
  console.log(`${page}: ${delivered} CDN image elements, no selected local image leaked`);
}
