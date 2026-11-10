import { resolveReviewLocale } from '@/lib/content/review-i18n';
import { reviewsShareStore, type ReviewAffiliate } from '@/lib/reviewStores';

export type RelatedCandidate = {
  id: number | string;
  slug: string;
  locale?: string;
  affiliate?: ReviewAffiliate;
  category?: string;
  type?: string;
  publishedAtISO?: string;
  draft?: boolean;
  hideFromPortugueseListings?: boolean;
  relatedArticles?: ReadonlyArray<{ slug: string }>;
};

// Sem importar '@/lib/data': quem chama passa o corpus.
// Ordem: mesma loja (alguma em comum, no artigo de várias lojas); depois os do relatedArticles do artigo, na ordem do JSON (o mesmo slug, no mesmo idioma, que o
// resolveRelatedArticleLinks usa na sidebar); depois categoria, tipo e data.
export function pickRelatedReviews<T extends RelatedCandidate>(current: T, corpus: readonly T[], limit = 6): T[] {
  const locale = resolveReviewLocale(current.locale);
  const listed = (current.relatedArticles ?? []).map(({ slug }) => slug);
  const listedRank = (item: T) => {
    const index = listed.indexOf(item.slug);
    return index === -1 ? listed.length : index;
  };
  const same = (value: string | undefined, other: string | undefined) => Number(Boolean(value) && value === other);
  // Dentro da mesma loja, a ordem segue a de sempre; a lista só passa à frente da regra fora dela.
  const score = (item: T) => {
    const sameStore = Number(reviewsShareStore(current, item));
    return [
      sameStore,
      sameStore ? 0 : listed.length - listedRank(item),
      same(current.category, item.category),
      same(current.type, item.type),
    ];
  };

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
