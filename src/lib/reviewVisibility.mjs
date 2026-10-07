// Versão em outro idioma fica fora da vitrine em português pelo locale, com ou sem a flag.
export function isListedInPortuguese(review) {
  return (
    (!review.locale || review.locale === 'pt') &&
    !review.draft &&
    !review.hideFromListings &&
    !review.hideFromPortugueseListings
  );
}
