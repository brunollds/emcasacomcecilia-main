import { resolveReviewPathLocale } from './content/review-pathname.mjs';

// Versão em outro idioma fica fora da vitrine em português pelo locale, com ou sem a flag.
export function isListedInPortuguese(review) {
  return (
    (!review.locale || review.locale === 'pt') &&
    !review.draft &&
    !review.hideFromListings &&
    !review.hideFromPortugueseListings
  );
}

// Na lista de artigos de um idioma (/<locale>/reviews) e na busca dele: daquele idioma, publicado e listado.
export function isListedInLocale(review, locale) {
  return resolveReviewPathLocale(review.locale) === locale && !review.draft && !review.hideFromListings;
}

// Do mais novo para o mais antigo; na mesma data, o id maior primeiro.
export function compareReviewsNewestFirst(left, right) {
  return (right.publishedAtISO ?? '').localeCompare(left.publishedAtISO ?? '') || right.id - left.id;
}
