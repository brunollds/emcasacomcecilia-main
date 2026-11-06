// A ordem do topo dos relacionados do fim do artigo (pickRelatedReviews): os da mesma loja primeiro; logo depois, os
// do relatedArticles, na ordem do JSON. Usada pelo test:article-d2 e pelo test:build-output.
export function relatedOrderProblem(
  review: { slug: string; affiliate?: string; relatedArticles?: ReadonlyArray<{ slug: string }> },
  related: ReadonlyArray<{ slug: string; affiliate?: string }>
): string | null {
  const isSameStore = (r: { affiliate?: string }) => Boolean(review.affiliate) && r.affiliate === review.affiliate;
  const storeCount = related.findIndex((r) => !isSameStore(r));
  const rest = storeCount === -1 ? [] : related.slice(storeCount);
  if (rest.some(isSameStore)) return `${review.slug}: mesma loja não veio primeiro`;

  const listed = (review.relatedArticles ?? []).map(({ slug }) => slug);
  const firstUnlisted = rest.findIndex((r) => !listed.includes(r.slug));
  const head = firstUnlisted === -1 ? rest : rest.slice(0, firstUnlisted);
  if (rest.slice(head.length).some((r) => listed.includes(r.slug))) {
    return `${review.slug}: relatedArticles fora do topo, logo depois da loja`;
  }
  const ranks = head.map((r) => listed.indexOf(r.slug));
  if (ranks.some((rank, i) => i > 0 && rank < ranks[i - 1])) return `${review.slug}: relatedArticles fora da ordem do JSON`;
  return null;
}
