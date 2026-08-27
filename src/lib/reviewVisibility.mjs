export function isListedInPortuguese(review) {
  return (
    !review.draft &&
    !review.hideFromListings &&
    !review.hideFromPortugueseListings
  );
}
