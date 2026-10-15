import { resolveReviewLocale } from '@/lib/content/review-i18n';

export type RelatedCandidate = {
  id: number | string;
  slug: string;
  locale?: string;
  affiliate?: string;
  category?: string;
  type?: string;
  publishedAtISO?: string;
  draft?: boolean;
  hideFromPortugueseListings?: boolean;
};

// Sem importar '@/lib/data': quem chama passa o corpus.
export function pickRelatedReviews<T extends RelatedCandidate>(current: T, corpus: readonly T[], limit = 6): T[] {
  const locale = resolveReviewLocale(current.locale);
  const same = (value: string | undefined, other: string | undefined) => Number(Boolean(value) && value === other);
  const score = (item: T) => [
    same(current.affiliate, item.affiliate),
    same(current.category, item.category),
    same(current.type, item.type),
  ];

  return corpus
    .filter((item) => item.id !== current.id && !item.draft && resolveReviewLocale(item.locale) === locale)
    .filter((item) => locale !== 'pt' || !item.hideFromPortugueseListings)
    .sort((a, b) => {
      const sa = score(a);
      const sb = score(b);
      for (let i = 0; i < sa.length; i += 1) {
        if (sa[i] !== sb[i]) return sb[i] - sa[i];
      }
      return (b.publishedAtISO ?? '').localeCompare(a.publishedAtISO ?? '') || Number(b.id) - Number(a.id);
    })
    .slice(0, limit);
}
