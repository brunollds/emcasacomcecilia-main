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
assert.deepEqual(
  discovery.featured.map(({ category }) => category),
  categoryValues,
  'destaques devem seguir a ordem canônica das categorias'
);

for (const featured of discovery.featured) {
  const newest = listed
    .filter(({ category }) => category === featured.category)
    .sort(
      (left, right) =>
        right.publishedAtISO.localeCompare(left.publishedAtISO) ||
        right.id - left.id
    )[0];
  assert.equal(featured.id, newest.id, `${featured.category}: destaque incorreto`);
}

const featuredIds = new Set(discovery.featured.map(({ id }) => id));
const firstCard = toHomeReviewCard(discovery.featured[0]);
assert.equal(firstCard.category, discovery.featured[0].category);
assert.equal(firstCard.slug, discovery.featured[0].slug);
assert.ok(firstCard.readingMinutes >= 2);
assert.equal(discovery.recent.length, Math.min(8, listed.length - featuredIds.size));
assert.equal(
  discovery.recent.some(({ id }) => featuredIds.has(id)),
  false,
  'recentes não podem repetir destaques'
);
for (let index = 1; index < discovery.recent.length; index += 1) {
  const previous = discovery.recent[index - 1];
  const current = discovery.recent[index];
  const order =
    previous.publishedAtISO.localeCompare(current.publishedAtISO) ||
    previous.id - current.id;
  assert.ok(order >= 0, 'recentes devem estar em ordem cronológica decrescente');
}

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

const synthetic = categoryValues.flatMap((category, index) => [
  fixture(index * 10 + 1, category, '2026-08-01'),
  fixture(index * 10 + 2, category, '2026-08-01'),
]);
const tieDiscovery = selectHomeReviewDiscovery(synthetic, 20);
assert.deepEqual(
  tieDiscovery.featured.map(({ id }) => id),
  [2, 12, 22, 32],
  'empate de data deve favorecer maior id'
);

const rotated = selectHomeReviewDiscovery([
  ...synthetic,
  fixture(99, 'guias-praticos-utilidade', '2026-08-02'),
]);
assert.equal(rotated.featured[0].id, 99, 'artigo mais novo deve rotacionar sua vaga');
assert.deepEqual(
  rotated.featured.slice(1).map(({ id }) => id),
  [12, 22, 32],
  'rotação de uma categoria não pode alterar as demais'
);

assert.throws(
  () =>
    selectHomeReviewDiscovery([
      ...synthetic,
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
      ...synthetic,
      fixture(101, 'guias-praticos-utilidade', '2026-02-30'),
    ]),
  /publishedAtISO ausente ou inválida/,
  'data impossível deve falhar antes da seleção'
);

console.log(
  `✅ reviewDiscovery: ${listed.length} artigos PT; ` +
    categoryValues.map((value) => `${value}=${counts[value]}`).join(', ')
);
