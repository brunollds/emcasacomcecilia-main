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

// Índice slim de busca para o header (carregado sob demanda no cliente).
// `terms` já vem em minúsculas e concatenado para o filtro ser um includes() barato.
const searchIndex = recipes.map((r) => {
  const categorias = [
    ...(r.categories || []),
    r.primaryCategory,
    ...(r.subCategory || []),
    ...(r.mealTime || []),
    ...(r.cuisine || []),
    ...(r.method || []),
    ...(r.collections || []),
  ].filter(Boolean);

  const terms = [r.title, r.description, ...categorias, ...(r.searchTerms || []), ...(r.tags || []), r.difficulty]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    description: r.description,
    category: r.primaryCategory || r.categories?.[0] || 'Geral',
    difficulty: r.difficulty,
    totalTime: r.totalTime,
    terms,
  };
});

mkdirSync('public', { recursive: true });
writeFileSync(path.join('public', 'search-index.json'), JSON.stringify(searchIndex));
console.log(`ok public/search-index.json (${searchIndex.length} receitas)`);
