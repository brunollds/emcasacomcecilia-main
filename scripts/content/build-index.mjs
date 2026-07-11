// content/ + manifestos -> src/lib/generated/content-index.ts
// TS gerado com anotação `unknown[]` (NÃO `as const`, NÃO json import):
// evita a inferência de tipo literal de ~4MB no tsc e funciona em client
// components (bundler embute como módulo, igual ao literal de hoje).
// Roda em TODO build (self-healing: drift entre content/ e índice é impossível).
// Uso: node scripts/content/build-index.mjs
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

function loadOrdered(dir) {
  const manifest = JSON.parse(readFileSync(path.join(dir, '_manifest.json'), 'utf8'));
  return manifest.map((slug) => {
    const file = path.join(dir, `${slug}.json`);
    try {
      return JSON.parse(readFileSync(file, 'utf8'));
    } catch (err) {
      throw new Error(`manifesto aponta pra arquivo ilegível: ${file} (${err.message})`);
    }
  });
}

const recipes = loadOrdered(path.join('content', 'receitas'));
const reviews = loadOrdered(path.join('content', 'reviews'));

const banner =
  '/* eslint-disable */\n' +
  '// GERADO por scripts/content/build-index.mjs a partir de content/ — NÃO EDITAR.\n' +
  '// Regenerado em todo build (npm run build). A fonte da verdade é content/.\n';

const body =
  `export const recipesData: unknown[] = ${JSON.stringify(recipes, null, 2)};\n\n` +
  `export const reviewsData: unknown[] = ${JSON.stringify(reviews, null, 2)};\n`;

mkdirSync(path.join('src', 'lib', 'generated'), { recursive: true });
writeFileSync(path.join('src', 'lib', 'generated', 'content-index.ts'), banner + body);
console.log(`ok content-index.ts (${recipes.length} receitas, ${reviews.length} reviews)`);
