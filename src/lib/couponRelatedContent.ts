import { getReviewCanonicalPathname } from '@/lib/content/review-i18n';
import type { Coupon } from '@/lib/couponsData';
import { publishedReviews, type Review } from '@/lib/data';
import { getStoreArticlesPath, hasArticlesPage } from '@/lib/homeStores';
import type { Locale } from '@/lib/i18n/locales';
import { isValidReviewPublishedAtISO } from '@/lib/reviewDiscovery';
import { getSingleStoreSlug, reviewHasStore } from '@/lib/reviewStores';
import { compareReviewsNewestFirst, isListedInLocale, isListedInPortuguese } from '@/lib/reviewVisibility.mjs';

// Server-only: resolve a seção "Leia antes de comprar" (#leia-antes) das páginas /cupons/<loja> e /<locale>/coupons/<loja>.
// Preserva o relatedContent curado manualmente quando existe; sem ele, busca até 6 artigos publicados da loja no idioma da
// página (artigos exclusivos da loja antes dos comparativos de várias lojas, do mais novo para o mais antigo). Em PT, quando
// a loja tem subpágina (/reviews/loja/<marca>, a partir de 3 artigos), devolve também o endereço e o total para o "Ver todos".

export const MAX_AUTO_STORE_RELATED = 6;

export type StoreRelatedItem = NonNullable<Coupon['relatedContent']>[number];

export type ResolvedStoreRelatedContent = {
  items: StoreRelatedItem[];
  articleCount: number;
  articlesHref?: string;
};

export function resolveStoreRelatedContent(
  coupon: Pick<Coupon, 'slug' | 'relatedContent'>,
  locale: Locale,
  reviews: readonly Review[] = publishedReviews
): ResolvedStoreRelatedContent {
  const storeReviews = reviews
    .filter((review) => {
      if (!reviewHasStore(review, coupon.slug)) return false;
      if (!isValidReviewPublishedAtISO(review.publishedAtISO)) return false;
      return locale === 'pt' ? isListedInPortuguese(review) : isListedInLocale(review, locale);
    })
    .sort((left, right) => {
      const leftDedicated = getSingleStoreSlug(left) === coupon.slug ? 0 : 1;
      const rightDedicated = getSingleStoreSlug(right) === coupon.slug ? 0 : 1;
      return leftDedicated - rightDedicated || compareReviewsNewestFirst(left, right);
    });

  const manual = coupon.relatedContent;
  const items: StoreRelatedItem[] =
    manual && manual.length > 0
      ? manual
      : storeReviews.slice(0, MAX_AUTO_STORE_RELATED).map((review) => ({
          title: review.title,
          url: getReviewCanonicalPathname(review),
          type: 'review' as const,
          publishedAt: review.publishedAtISO!,
        }));

  const articleCount = storeReviews.length;
  const articlesHref =
    locale === 'pt' && hasArticlesPage(articleCount) ? getStoreArticlesPath(coupon.slug) : undefined;

  return {
    items,
    articleCount,
    ...(articlesHref && { articlesHref }),
  };
}
