import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { LOCALE_KEYS } from '../src/lib/i18n/locale-keys.mjs';
import { isListedInLocale, isListedInPortuguese } from '../src/lib/reviewVisibility.mjs';
import {
  SEARCH_ACTION_URL_TEMPLATE,
  SEARCH_PAGE_METADATA,
  createLocaleSearchIndex,
  createSearchIndex,
  foldSearchText,
  getRankedSearchResults,
  getSearchIndexPath,
} from '../src/lib/siteSearch.mjs';
import { loadLocaleSearchStores } from './content/locale-search-stores.mjs';

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
assert.deepEqual(getRankedSearchResults(rankingFixture, 'RAPIDA').map(({ id }) => id), [1], 'sem acento e sem caixa');
assert.deepEqual(getRankedSearchResults([{ id: 4, title: 'Sofá', terms: 'sofa' }], 'sofá').map(({ id }) => id), [4]);
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
const searchCopySource = readFileSync(path.join('src', 'components', 'search', 'searchCopy.ts'), 'utf8');
assert.match(omniSearchSource, /aria-label=\{copy\.inputLabel\}/);
assert.match(searchCopySource, /inputLabel: 'Buscar no site'/);
assert.match(searchCopySource, /seeAllLabel: 'Ver todos os resultados'/);
// Fora do PT, sem o /buscar: o link para ele e o Enter que leva a ele só valem no PT.
assert.match(omniSearchSource, /\{copy\.seeAllLabel && \(/);
assert.match(omniSearchSource, /if \(isPt && query\.trim\(\)\) \{\s*window\.location\.href = `\$\{SITE_SEARCH_PATH\}/);
assert.match(omniSearchSource, /loadSearchIndex\(locale\)/);

// Índice de cada idioma fora do PT, com dados sintéticos: só os artigos listados do idioma, do mais novo
// para o mais antigo, depois das lojas; endereço canônico do idioma.
assert.equal(getSearchIndexPath('pt'), '/search-index.json');
assert.equal(getSearchIndexPath('zh-hans'), '/search-index-zh-hans.json');
assert.equal(isListedInLocale({ locale: 'en' }, 'en'), true);
assert.equal(isListedInLocale({}, 'en'), false);
assert.equal(isListedInLocale({ locale: 'en', draft: true }, 'en'), false);
assert.equal(isListedInLocale({ locale: 'en', hideFromListings: true }, 'en'), false);
assert.equal(isListedInLocale({ locale: 'en', hideFromPortugueseListings: true }, 'en'), true);
assert.throws(() => isListedInLocale({ locale: 'xx' }, 'en'), /locale inválido/);

const localeFixture = createLocaleSearchIndex('es', {
  reviews: [
    { id: 10, slug: 'guia-pt', title: 'Guia em português', description: 'PT', type: 'Guia' },
    { id: 11, slug: 'guia-viejo', locale: 'es', title: 'Guía de tamaño', description: 'Medidas', type: 'Guía', publishedAtISO: '2026-01-01' },
    { id: 12, slug: 'guia-nuevo', locale: 'es', title: 'Guía nueva', description: 'Nueva', type: 'Guía', publishedAtISO: '2026-05-01', tags: ['Envíos'] },
    { id: 13, slug: 'borrador', locale: 'es', title: 'Borrador', description: 'No', type: 'Guía', draft: true },
    { id: 14, slug: 'oculto', locale: 'es', title: 'Oculto', description: 'No', type: 'Guía', hideFromListings: true },
    { id: 15, slug: 'english', locale: 'en', title: 'English', description: 'No', type: 'Guide' },
  ],
  stores: [{ slug: 'shein', name: 'SHEIN', href: '/es/coupons/shein', title: 'SHEIN: código de referido', description: 'Campañas' }],
});
assert.deepEqual(
  localeFixture.map(({ contentType, href, category }) => ({ contentType, href, category })),
  [
    { contentType: 'store', href: '/es/coupons/shein', category: undefined },
    { contentType: 'review', href: '/es/reviews/guia-nuevo', category: 'Guía' },
    { contentType: 'review', href: '/es/reviews/guia-viejo', category: 'Guía' },
  ]
);
assert.deepEqual(getRankedSearchResults(localeFixture, 'tamano').map(({ id }) => id), [11], 'sem acento: tamano acha tamaño');
assert.deepEqual(getRankedSearchResults(localeFixture, 'ENVIOS').map(({ id }) => id), [12], 'tag sem acento e sem caixa');
assert.deepEqual(getRankedSearchResults(localeFixture, 'codigo').map(({ id }) => id), ['shein']);

// CJK: a dobra junta de novo o que o NFD separou, então a sílaba coreana e o kana com dakuten seguem
// inteiros, e a busca por pedaço continua sem espaço.
assert.equal(foldSearchText('가방'), '가방');
assert.equal(foldSearchText('가방').length, 2);
assert.equal(foldSearchText('ガイド'), 'ガイド');
assert.equal(foldSearchText('指南與評測'), '指南與評測');
const cjkFixture = [
  { id: 'ko', title: '한국 배송 가이드', terms: foldSearchText('한국 배송 가이드') },
  { id: 'ja', title: '日本への配送ガイド', terms: foldSearchText('日本への配送ガイド') },
];
assert.deepEqual(getRankedSearchResults(cjkFixture, '배송').map(({ id }) => id), ['ko']);
assert.deepEqual(getRankedSearchResults(cjkFixture, '가').map(({ id }) => id), ['ko']);
assert.deepEqual(getRankedSearchResults(cjkFixture, '각').map(({ id }) => id), [], 'sílaba com final não acha a sem final');
assert.deepEqual(getRankedSearchResults(cjkFixture, '配送').map(({ id }) => id), ['ja']);
assert.deepEqual(getRankedSearchResults(cjkFixture, 'カ').map(({ id }) => id), [], 'か não acha が');

// O índice gerado de cada idioma é o calculado com os dados reais: as páginas de loja do idioma e os
// artigos da lista dele, e nada de outro idioma.
const storesByLocale = loadLocaleSearchStores();
const translatedLocales = LOCALE_KEYS.filter((locale) => locale !== 'pt');
assert.deepEqual(Object.keys(storesByLocale).sort(), [...translatedLocales].sort());
const ptTexts = new Set(reviews.filter(isListedInPortuguese).flatMap(({ title, description }) => [title, description]));
const localeCounts = [];
for (const locale of translatedLocales) {
  const stores = storesByLocale[locale];
  const expected = createLocaleSearchIndex(locale, { reviews, stores });
  const generated = JSON.parse(readFileSync(path.join('public', getSearchIndexPath(locale)), 'utf8'));
  assert.deepEqual(generated, expected, `${locale}: public${getSearchIndexPath(locale)} desatualizado`);

  const listed = reviews.filter((review) => isListedInLocale(review, locale));
  assert.ok(listed.length > 0, `${locale}: sem artigos`);
  assert.deepEqual(
    generated.filter(({ contentType }) => contentType === 'review').map(({ href }) => href).sort(),
    listed.map(({ slug }) => `/${locale}/reviews/${slug}`).sort(),
    `${locale}: artigos do índice`
  );
  const storeHrefs = generated.filter(({ contentType }) => contentType === 'store').map(({ href }) => href);
  assert.ok(storeHrefs.includes(`/${locale}/coupons/yesstyle`), `${locale}: sem a página da YesStyle`);
  assert.ok(storeHrefs.includes(`/${locale}/coupons/shein`), `${locale}: sem a página da SHEIN`);
  assert.ok(generated.every(({ href }) => href.startsWith(`/${locale}/`)), `${locale}: endereço de outro idioma`);
  assert.ok(generated.every(({ title, terms }) => title && terms), `${locale}: item sem título ou termos`);
  // Nenhum texto de página em português: título e descrição não repetem os do PT.
  assert.deepEqual(generated.filter(({ title, description }) => ptTexts.has(title) || ptTexts.has(description)), [], `${locale}: texto do PT`);
  assert.doesNotMatch(JSON.stringify(generated), /br\.shein\.com/, `${locale}: link da SHEIN Brasil`);

  const yesstyle = getRankedSearchResults(generated, 'yesstyle');
  assert.equal(yesstyle[0]?.href, `/${locale}/coupons/yesstyle`, `${locale}: "yesstyle" sem a página da loja na frente`);
  localeCounts.push(`${locale} ${generated.length}`);
}

// Termos reais dos títulos de hoje: um latino sem acento, um japonês e um coreano.
const realCases = [
  ['es', 'envios'],
  ['ja', '配送'],
  ['ko', '배송'],
];
for (const [locale, query] of realCases) {
  const found = getRankedSearchResults(JSON.parse(readFileSync(path.join('public', getSearchIndexPath(locale)), 'utf8')), query);
  assert.ok(found.length > 0, `${locale}: "${query}" sem resultado`);
  assert.ok(found[0].href.startsWith(`/${locale}/reviews/`), `${locale}: "${query}" não trouxe um artigo`);
  assert.ok(foldSearchText(found[0].title).includes(foldSearchText(query)), `${locale}: "${query}" não casou no título`);
}

console.log(
  `✅ busca do site: ${recipes.length} receitas + ${expectedReviewCount} guias e análises; por idioma: ${localeCounts.join(', ')}`
);
