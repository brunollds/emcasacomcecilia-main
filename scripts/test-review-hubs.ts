import assert from 'node:assert/strict';
import type { Review } from '@/lib/content/types';
import { getReviewCanonicalPathname, resolveReviewLocale } from '@/lib/content/review-i18n';
import { publishedReviews } from '@/lib/data';
import { buildReviewTemplateProps } from '@/lib/review-template-props';
import {
  REVIEW_HUB_LOCALES,
  getInternationalReviewHub,
  getPublishedReviewsForLocale,
  getReviewHubPath,
} from '@/lib/review-hubs';

for (const locale of REVIEW_HUB_LOCALES) {
  const reviews = getPublishedReviewsForLocale(locale, publishedReviews);
  const eligibleReviewCount = publishedReviews.filter(
    (review) =>
      !review.hideFromListings && resolveReviewLocale(review.locale) === locale
  ).length;

  assert.equal(getReviewHubPath(locale), `/${locale}/reviews`);
  assert.ok(reviews.length > 0, `O hub ${locale} deve ter ao menos um review publicado.`);
  assert.equal(reviews.length, eligibleReviewCount);

  for (const review of reviews) {
    assert.equal(resolveReviewLocale(review.locale), locale);
    assert.notEqual(resolveReviewLocale(review.locale), 'pt');
    assert.equal(
      getReviewCanonicalPathname(review).startsWith(`/${locale}/reviews/`),
      true
    );
  }
}

const selectionFixture = [
  {
    id: 1,
    slug: 'older',
    locale: 'en',
    type: 'guide',
    title: 'Older',
    description: 'Older review',
    publishedAt: 'January 1, 2026',
    publishedAtISO: '2026-01-01',
    pros: [],
    cons: [],
  },
  {
    id: 9,
    slug: 'same-day-later-id',
    locale: 'en',
    type: 'guide',
    title: 'Same day later id',
    description: 'Tie breaker review',
    publishedAt: 'January 1, 2026',
    publishedAtISO: '2026-01-01',
    pros: [],
    cons: [],
  },
  {
    id: 11,
    slug: 'newer',
    locale: 'en',
    type: 'guide',
    title: 'Newer',
    description: 'Newer review',
    publishedAt: 'February 1, 2026',
    publishedAtISO: '2026-02-01',
    pros: [],
    cons: [],
  },
  {
    id: 12,
    slug: 'draft',
    locale: 'en',
    type: 'guide',
    title: 'Draft',
    description: 'Draft review',
    publishedAt: 'March 1, 2026',
    publishedAtISO: '2026-03-01',
    pros: [],
    cons: [],
    draft: true,
  },
  {
    id: 13,
    slug: 'hidden',
    locale: 'en',
    type: 'guide',
    title: 'Hidden',
    description: 'Hidden review',
    publishedAt: 'March 2, 2026',
    publishedAtISO: '2026-03-02',
    pros: [],
    cons: [],
    hideFromListings: true,
  },
  {
    id: 14,
    slug: 'spanish',
    locale: 'es',
    type: 'guide',
    title: 'Spanish',
    description: 'Spanish review',
    publishedAt: 'March 3, 2026',
    publishedAtISO: '2026-03-03',
    pros: [],
    cons: [],
  },
] satisfies Array<Review & { draft?: boolean }>;

assert.deepEqual(
  getPublishedReviewsForLocale('en', selectionFixture).map((review) => review.id),
  [11, 9, 1],
  'O helper deve excluir drafts/hidden e desempatar por id decrescente.'
);

const englishReview = publishedReviews.find(
  (review) => resolveReviewLocale(review.locale) === 'en'
);
assert.ok(englishReview, 'O corpus deve conter um review EN para validar a navegação internacional.');

const englishHub = getInternationalReviewHub('en');
assert.deepEqual(englishHub, { href: '/en/reviews', label: 'Guides & Reviews' });

const { breadcrumbJsonLd } = buildReviewTemplateProps(englishReview);
const breadcrumbItems = Reflect.get(breadcrumbJsonLd, 'itemListElement');
assert.ok(Array.isArray(breadcrumbItems));
assert.equal(Reflect.get(breadcrumbItems[0], 'item'), 'https://emcasacomcecilia.com/en/reviews');
assert.equal(String(Reflect.get(breadcrumbItems[0], 'item')).includes('/coupons/'), false);

console.log(`Review hubs validados: ${REVIEW_HUB_LOCALES.join(', ')}.`);
