import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { isListedInPortuguese } from '../src/lib/reviewVisibility.mjs';
import {
  SEARCH_ACTION_URL_TEMPLATE,
  SEARCH_PAGE_METADATA,
  createSearchIndex,
  getRankedSearchResults,
} from '../src/lib/siteSearch.mjs';

function loadOrdered(dir) {
  const manifest = JSON.parse(readFileSync(path.join(dir, '_manifest.json'), 'utf8'));
  return manifest.map((slug) =>
    JSON.parse(readFileSync(path.join(dir, `${slug}.json`), 'utf8'))
  );
}

assert.equal(isListedInPortuguese({}), true);
assert.equal(isListedInPortuguese({ draft: true }), false);
assert.equal(isListedInPortuguese({ hideFromListings: true }), false);
assert.equal(isListedInPortuguese({ hideFromPortugueseListings: true }), false);

const fixtureIndex = createSearchIndex({
  recipes: [
    {
      id: 1,
      slug: 'bolo-de-cenoura',
      title: 'Bolo de cenoura',
      description: 'Receita com cobertura de chocolate',
      primaryCategory: 'Bolos',
      difficulty: 'Fácil',
      totalTime: '45 min',
    },
  ],
  reviews: [
    {
      id: 2,
      slug: 'guia-dolce-gusto',
      title: 'Guia Dolce Gusto',
      description: 'Como escolher sua máquina',
      type: 'Guia',
    },
    {
      id: 3,
      slug: 'rascunho',
      title: 'Rascunho',
      description: 'Não publicar',
      type: 'Guia',
      draft: true,
    },
    {
      id: 4,
      slug: 'oculto',
      title: 'Oculto',
      description: 'Não listar',
      type: 'Guia',
      hideFromListings: true,
    },
    {
      id: 5,
      slug: 'oculto-pt',
      title: 'Oculto em português',
      description: 'Não listar em português',
      type: 'Guia',
      hideFromPortugueseListings: true,
    },
    {
      id: 6,
      slug: 'english-guide',
      locale: 'en',
      title: 'English guide',
      description: 'International content',
      type: 'Guide',
    },
  ],
});

assert.deepEqual(
  fixtureIndex.map(({ contentType, href }) => ({ contentType, href })),
  [
    { contentType: 'recipe', href: '/receitas/bolo-de-cenoura' },
    { contentType: 'review', href: '/reviews/guia-dolce-gusto' },
  ]
);
assert.ok(fixtureIndex.every((item) => !('slug' in item)));

const rankingFixture = [
  {
    id: 1,
    title: 'Sobremesa rápida',
    terms: 'sobremesa rápida chocolate',
  },
  {
    id: 2,
    title: 'Chocolate quente',
    terms: 'chocolate quente bebida',
  },
  {
    id: 3,
    title: 'Guia de chocolate',
    terms: 'guia de chocolate',
  },
];
assert.deepEqual(
  getRankedSearchResults(rankingFixture, 'chocolate').map(({ id }) => id),
  [2, 3, 1]
);
assert.deepEqual(getRankedSearchResults(rankingFixture, '   '), []);
assert.deepEqual(
  getRankedSearchResults(rankingFixture, 'chocolate', 2).map(({ id }) => id),
  [2, 3]
);

const recipes = loadOrdered(path.join('content', 'receitas'));
const reviews = loadOrdered(path.join('content', 'reviews'));
const expectedIndex = createSearchIndex({ recipes, reviews });
const generatedIndex = JSON.parse(readFileSync(path.join('public', 'search-index.json'), 'utf8'));
assert.deepEqual(generatedIndex, expectedIndex);

const expectedReviewCount = reviews.filter(
  (review) => (!review.locale || review.locale === 'pt') && isListedInPortuguese(review)
).length;
assert.equal(
  generatedIndex.filter(({ contentType }) => contentType === 'review').length,
  expectedReviewCount
);
assert.equal(
  generatedIndex.filter(({ contentType }) => contentType === 'recipe').length,
  recipes.length
);
assert.ok(generatedIndex.every(({ href }) => /^\/(receitas|reviews)\//.test(href)));

assert.deepEqual(SEARCH_PAGE_METADATA.robots, { index: false, follow: true });
assert.equal(SEARCH_PAGE_METADATA.alternates.canonical, '/buscar');
assert.equal(
  SEARCH_ACTION_URL_TEMPLATE,
  'https://emcasacomcecilia.com/buscar?q={search_term_string}'
);

const omniSearchSource = readFileSync(path.join('src', 'components', 'OmniSearch.js'), 'utf8');
assert.doesNotMatch(omniSearchSource, /\/receitas\/\$\{/);
assert.doesNotMatch(omniSearchSource, /\/receitas\?q=/);
assert.match(omniSearchSource, /aria-label="Buscar no site"/);
assert.match(omniSearchSource, /Ver todos os resultados/);

console.log(
  `✅ busca do site: ${recipes.length} receitas + ${expectedReviewCount} guias e análises`
);
