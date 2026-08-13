import assert from 'node:assert/strict';
import { isAllowedImageHost } from '../src/lib/imageHosts.mjs';

const cases = [
  ['https://dicas.emcasacomcecilia.com/oferta.jpg', true],
  ['https://img.kwcdn.com/oferta.jpg', true],
  ['https://a.b.kwcdn.com/oferta.jpg', true],
  ['https://kwcdn.com/oferta.jpg', false],
  ['http://img.kwcdn.com/oferta.jpg', false],
  ['https://divulgadorinteligente.com/oferta.jpg', false],
  ['/imagem-local.jpg', false],
  [undefined, false],
];

for (const [url, expected] of cases) {
  assert.equal(isAllowedImageHost(url), expected, String(url));
}

console.log(`✅ imageHosts: ${cases.length} casos passaram.`);
