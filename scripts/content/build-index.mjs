// content/ + manifestos -> src/lib/generated/content-index.ts
// TS gerado com anotação `unknown[]` (NÃO `as const`, NÃO json import):
// evita a inferência de tipo literal de ~4MB no tsc e funciona em client
// components (bundler embute como módulo, igual ao literal de hoje).
// Roda em TODO build (self-healing: drift entre content/ e índice é impossível).
// Uso: node scripts/content/build-index.mjs
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { createLocaleSearchIndex, createSearchIndex, getSearchIndexPath } from '../../src/lib/siteSearch.mjs';
import { loadLocaleSearchStores } from './locale-search-stores.mjs';

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
const searchIndex = createSearchIndex({ recipes, reviews });
const recipeCount = searchIndex.filter(({ contentType }) => contentType === 'recipe').length;
const reviewCount = searchIndex.length - recipeCount;

mkdirSync('public', { recursive: true });
writeFileSync(path.join('public', 'search-index.json'), JSON.stringify(searchIndex));
console.log(`ok public/search-index.json (${recipeCount} receitas, ${reviewCount} guias e análises)`);

// Um índice por idioma fora do PT (public/search-index-<locale>.json): os artigos da lista do idioma e
// as páginas de loja dele, só com texto do idioma.
const storesByLocale = loadLocaleSearchStores();
for (const [locale, stores] of Object.entries(storesByLocale)) {
  const localeIndex = createLocaleSearchIndex(locale, { reviews, stores });
  const file = path.join('public', getSearchIndexPath(locale));
  writeFileSync(file, JSON.stringify(localeIndex));
  console.log(`ok ${file.replaceAll(path.sep, '/')} (${stores.length} lojas, ${localeIndex.length - stores.length} artigos)`);
}
