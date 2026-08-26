import assert from 'node:assert/strict';

import { reviews } from '@/lib/data';
import {
  REVIEW_CATEGORIES,
  getListedPortugueseReviews,
  getReviewCategoryCounts,
  isReviewCategory,
  isListedInPortuguese,
  isValidReviewPublishedAtISO,
  parseReviewCategory,
  selectHomeReviewDiscovery,
  toHomeReviewCard,
  type ReviewCategory,
  type ReviewDiscoveryItem,
} from '@/lib/reviewDiscovery';

const categoryValues = REVIEW_CATEGORIES.map(({ value }) => value);

assert.equal(new Set(categoryValues).size, 4, 'categorias devem ser únicas');
for (const value of categoryValues) {
  assert.equal(parseReviewCategory(value), value);
  assert.equal(isReviewCategory(value), true);
}
assert.equal(parseReviewCategory(null), null);
assert.equal(parseReviewCategory(undefined), null);
assert.equal(parseReviewCategory('editorial'), null);
assert.equal(isReviewCategory('Móveis & Conforto'), false);
assert.equal(isValidReviewPublishedAtISO('2026-02-28'), true);
assert.equal(isValidReviewPublishedAtISO('2026-02-30'), false);
assert.equal(isValidReviewPublishedAtISO('13/08/2026'), false);
assert.equal(isListedInPortuguese({}), true);
assert.equal(isListedInPortuguese({ draft: true }), false);
assert.equal(isListedInPortuguese({ hideFromListings: true }), false);
assert.equal(isListedInPortuguese({ hideFromPortugueseListings: true }), false);

const listed = getListedPortugueseReviews(reviews);
assert.ok(listed.length > 0, 'vitrine PT não pode estar vazia');
for (const review of listed) {
  assert.equal(isReviewCategory(review.category), true, `${review.slug}: category`);
  assert.equal(
    isValidReviewPublishedAtISO(review.publishedAtISO),
    true,
    `${review.slug}: publishedAtISO`
  );
}

const counts = getReviewCategoryCounts(reviews);
assert.equal(
  Object.values(counts).reduce((total, count) => total + count, 0),
  listed.length,
  'contagens devem cobrir toda a vitrine PT'
);
for (const value of categoryValues) {
  assert.ok(counts[value] > 0, `${value}: categoria sem artigo`);
}

const discovery = selectHomeReviewDiscovery(reviews);
assert.equal(discovery.featured.length, 4);
assert.equal(new Set(discovery.featured.map(({ id }) => id)).size, 4);
for (const featured of discovery.featured) {
  assert.ok(
    discovery.featured.filter((item) => item.category === featured.category).length <=
      2,
    'limite de dois destaques por categoria'
  );
}

const featuredIds = new Set(discovery.featured.map(({ id }) => id));
assert.equal(discovery.featured.length, 4);
assert.equal(
  discovery.recent.some(({ id }) => featuredIds.has(id)),
  false,
  'recentes não podem repetir destaques'
);
assert.equal(
  discovery.recent.length,
  Math.min(8, listed.length - featuredIds.size)
);
for (let index = 1; index < discovery.recent.length; index += 1) {
  const previous = discovery.recent[index - 1];
  const current = discovery.recent[index];
  const order =
    previous.publishedAtISO.localeCompare(current.publishedAtISO) ||
    previous.id - current.id;
  assert.ok(order >= 0, 'recentes devem estar em ordem cronológica decrescente');
}

const firstCard = toHomeReviewCard(discovery.featured[0]);
assert.equal(firstCard.category, discovery.featured[0].category);
assert.equal(firstCard.slug, discovery.featured[0].slug);
assert.ok(firstCard.readingMinutes >= 2);

function fixture(
  id: number,
  category: ReviewCategory | undefined,
  publishedAtISO: string,
  extras: Partial<ReviewDiscoveryItem> = {}
): ReviewDiscoveryItem {
  return {
    id,
    slug: `fixture-${id}`,
    title: `Fixture ${id}`,
    type: 'Fixture',
    description: 'Conteúdo sintético para validar seleção.',
    publishedAt: publishedAtISO,
    publishedAtISO,
    category,
    pros: [],
    cons: [],
    ...extras,
  };
}

const fourDominance = [
  fixture(40, 'guias-praticos-utilidade', '2026-08-12'),
  fixture(39, 'guias-praticos-utilidade', '2026-08-11'),
  fixture(38, 'guias-praticos-utilidade', '2026-08-10'),
  fixture(37, 'guias-praticos-utilidade', '2026-08-09'),
  fixture(36, 'produtos-experiencias', '2026-08-08'),
  fixture(35, 'cupons-como-usar', '2026-08-07'),
  fixture(34, 'confianca-reputacao', '2026-08-06'),
];

const dominanceDiscovery = selectHomeReviewDiscovery(fourDominance);
assert.deepEqual(
  dominanceDiscovery.featured.map(({ id }) => id),
  [40, 39, 36, 35],
  'quatro mais recentes da mesma categoria não ocupam as quatro vagas'
);
assert.equal(
  dominanceDiscovery.featured.filter(({ category }) => category === 'guias-praticos-utilidade')
    .length,
  2,
  'máximo de 2 destaques por categoria'
);
assert.deepEqual(
  dominanceDiscovery.featured.map(({ category }) => category),
  [
    'guias-praticos-utilidade',
    'guias-praticos-utilidade',
    'produtos-experiencias',
    'cupons-como-usar',
  ],
  'preenchimento deve seguir ordem cronológica com teto por categoria'
);

const tieInput = [
  fixture(20, 'guias-praticos-utilidade', '2026-08-10'),
  fixture(19, 'guias-praticos-utilidade', '2026-08-10'),
  fixture(18, 'produtos-experiencias', '2026-08-09'),
  fixture(17, 'cupons-como-usar', '2026-08-08'),
  fixture(16, 'confianca-reputacao', '2026-08-07'),
  fixture(15, 'cupons-como-usar', '2026-08-06'),
];
const tieDiscovery = selectHomeReviewDiscovery(tieInput, {
  recentLimit: 20,
});
assert.deepEqual(
  tieDiscovery.featured.slice(0, 2).map(({ id }) => id),
  [20, 19],
  'empate por data favorece maior id na mesma categoria'
);

const rotated = selectHomeReviewDiscovery([
  ...fourDominance,
  fixture(99, 'guias-praticos-utilidade', '2026-08-13'),
], {
  recentLimit: 10,
});
assert.equal(rotated.featured[0].id, 99, 'artigo mais novo deve entrar no destaque');
assert.equal(rotated.featured.length, 4, 'preenchimento sempre com 4 cards');
assert.deepEqual(
  rotated.featured.slice(1).map(({ id }) => id),
  [40, 36, 35],
  'a entrada de novo artigo altera apenas o necessário'
);

const excludedDiscovery = selectHomeReviewDiscovery(fourDominance, {
  recentLimit: 10,
  excludedIds: [40],
});
assert.ok(
  excludedDiscovery.featured.every(({ id }) => id !== 40),
  'featured não pode conter excludedIds'
);
assert.equal(
  excludedDiscovery.recent.some(({ id }) => id === 40),
  false,
  'recent não pode conter excludedIds'
);
assert.deepEqual(
  excludedDiscovery.featured.map(({ id }) => id),
  [39, 38, 36, 35],
  'exclusão deve puxar o próximo candidato cronológico'
);

const limitedRecentDiscovery = selectHomeReviewDiscovery(fourDominance, {
  recentLimit: 2,
});
assert.equal(limitedRecentDiscovery.recent.length, 2, 'recentLimit preservado no objeto');

const backwardCompatibleRecentLimitDiscovery = selectHomeReviewDiscovery(
  fourDominance,
  2
);
assert.equal(backwardCompatibleRecentLimitDiscovery.recent.length, 2);

const countsWithExclusions = selectHomeReviewDiscovery(fourDominance, {
  recentLimit: 8,
  excludedIds: [40, 36],
}).counts;
assert.deepEqual(
  countsWithExclusions,
  getReviewCategoryCounts(fourDominance),
  'counts não devem mudar por exclusões'
);

assert.throws(
  () =>
    selectHomeReviewDiscovery([
      ...fourDominance,
      fixture(100, undefined, '2026-08-03', {
        pros: ['pros não classificam'],
        cons: ['cons não classificam'],
      }),
    ]),
  /category ausente ou inválida/,
  'pros/cons não podem inferir category'
);

assert.throws(
  () =>
    selectHomeReviewDiscovery([
      fixture(101, 'guias-praticos-utilidade', '2026-02-30'),
      fixture(102, 'produtos-experiencias', '2026-02-29'),
      fixture(103, 'cupons-como-usar', '2026-02-28'),
      fixture(104, 'confianca-reputacao', '2026-02-27'),
    ]),
  /publishedAtISO ausente ou inválida/,
  'data impossível deve falhar antes da seleção'
);

assert.throws(
  () =>
    selectHomeReviewDiscovery([
      fixture(200, 'guias-praticos-utilidade', '2026-08-01'),
      fixture(199, 'guias-praticos-utilidade', '2026-08-02'),
      fixture(198, 'guias-praticos-utilidade', '2026-08-03'),
      fixture(197, 'guias-praticos-utilidade', '2026-08-04'),
    ]),
  /home_featured_selection_failed: unable to fill 4 highlights/,
  'deve falhar com mensagem nomeada quando teto impede quatro destaques'
);

console.log(
  `✅ reviewDiscovery: ${listed.length} artigos PT; ` +
    categoryValues.map((value) => `${value}=${counts[value]}`).join(', ')
);
