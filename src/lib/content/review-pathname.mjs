import { LOCALE_KEYS } from '../i18n/locale-keys.mjs';

export function resolveReviewPathLocale(locale) {
  const resolvedLocale = locale === undefined ? 'pt' : locale;
  if (!LOCALE_KEYS.includes(resolvedLocale)) {
    throw new Error(`locale inválido para review: "${resolvedLocale}"`);
  }
  return resolvedLocale;
}

export function getReviewCanonicalPathname({ slug, locale }) {
  const resolvedLocale = resolveReviewPathLocale(locale);
  return resolvedLocale === 'pt'
    ? `/reviews/${slug}`
    : `/${resolvedLocale}/reviews/${slug}`;
}

export function detectDuplicateReviewPathnames(reviews) {
  const reviewsByPathname = new Map();

  for (const review of reviews) {
    const pathname = getReviewCanonicalPathname(review);
    const slugs = reviewsByPathname.get(pathname) ?? [];
    slugs.push(review.slug);
    reviewsByPathname.set(pathname, slugs);
  }

  return Array.from(reviewsByPathname, ([pathname, slugs]) => ({ pathname, slugs }))
    .filter(({ slugs }) => slugs.length > 1);
}
