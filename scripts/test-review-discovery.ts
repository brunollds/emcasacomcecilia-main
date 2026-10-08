import assert from 'node:assert/strict';

import { reviews } from '@/lib/data';
import {
  REVIEW_CATEGORIES,
  getListedPortugueseReviews,
  isReviewCategory,
  isListedInPortuguese,
  isValidReviewPublishedAtISO,
  parseReviewCategory,
  sortReviewsByPublishedAt,
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
assert.equal(isListedInPortuguese({ locale: 'pt' }), true);
assert.equal(isListedInPortuguese({ locale: 'en' }), false, 'versão em inglês fica fora da vitrine PT mesmo sem a flag');

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

// Cada categoria tem artigo: nenhum filtro de /reviews fica vazio.
const counts = Object.fromEntries(
  categoryValues.map((value) => [value, listed.filter(({ category }) => category === value).length])
) as Record<ReviewCategory, number>;
for (const value of categoryValues) {
  assert.ok(counts[value] > 0, `${value}: categoria sem artigo`);
}

const firstCard = toHomeReviewCard(listed[0]);
assert.equal(firstCard.category, listed[0].category);
assert.equal(firstCard.slug, listed[0].slug);
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
    description: 'Conteúdo sintético para validar a listagem.',
    publishedAt: publishedAtISO,
    publishedAtISO,
    category,
    pros: [],
    cons: [],
    ...extras,
  };
}

// Do mais novo ao mais antigo; no empate de data, o maior id primeiro.
assert.deepEqual(
  sortReviewsByPublishedAt(
    getListedPortugueseReviews([
      fixture(18, 'produtos-experiencias', '2026-08-09'),
      fixture(19, 'guias-praticos-utilidade', '2026-08-10'),
      fixture(20, 'guias-praticos-utilidade', '2026-08-10'),
    ])
  ).map(({ id }) => id),
  [20, 19, 18]
);

// Artigo sem category ou com data impossível derruba o build com o slug dele.
assert.throws(
  () =>
    getListedPortugueseReviews([
      fixture(100, undefined, '2026-08-03', {
        pros: ['pros não classificam'],
        cons: ['cons não classificam'],
      }),
    ]),
  /fixture-100: category ausente ou inválida/,
  'pros/cons não podem inferir category'
);
assert.throws(
  () => getListedPortugueseReviews([fixture(101, 'guias-praticos-utilidade', '2026-02-30')]),
  /fixture-101: publishedAtISO ausente ou inválida/,
  'data impossível deve falhar'
);

console.log(
  `✅ reviewDiscovery: ${listed.length} artigos PT; ` +
    categoryValues.map((value) => `${value}=${counts[value]}`).join(', ')
);
