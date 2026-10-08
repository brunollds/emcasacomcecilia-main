import { getActiveCoupons, getStoreCodeKind, type Coupon } from '@/lib/couponsData';
import { getCodeHints, getCodeTitle, getSidebarCopy } from '@/components/review/sidebarCopy';
import type { HomeStoreTab } from '@/lib/homeStoreTabs';
import {
  getListedPortugueseReviews,
  sortReviewsByPublishedAt,
  type ReviewDiscoveryItem,
} from '@/lib/reviewDiscovery';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

// Dados da vitrine da home e da subpágina /reviews/loja/{slug}. Recebe as reviews por parâmetro e
// não importa '@/lib/data': quem chama é o servidor, e o componente cliente recebe só o resultado.

export type StoreReview = ReviewDiscoveryItem & { affiliate?: string };
export type StorePagePlacement = 'home' | 'reviews-loja';

const VISIBLE_ARTICLES = 3;

// O site escreve "do Magalu" e "da" para as outras lojas.
const MASCULINE_STORES = new Set(['magalu']);

function ofStore(store: Pick<Coupon, 'slug' | 'brand'>): string {
  return `${MASCULINE_STORES.has(store.slug) ? 'do' : 'da'} ${store.brand}`;
}

function theStore(store: Pick<Coupon, 'slug' | 'brand'>): string {
  return `${MASCULINE_STORES.has(store.slug) ? 'o' : 'a'} ${store.brand}`;
}

function listedNewestFirst<T extends StoreReview>(reviews: readonly T[]) {
  return sortReviewsByPublishedAt(getListedPortugueseReviews(reviews));
}

export function getStorePageUrl(
  store: Pick<Coupon, 'slug' | 'storePageUrl'>,
  placement: StorePagePlacement
): string {
  if (!store.storePageUrl) return `/cupons/${store.slug}`;
  const url = new URL(store.storePageUrl);
  url.searchParams.set('utm_content', placement);
  return url.toString();
}

export function getStoreArticlesPath(slug: string): string {
  return `/reviews/loja/${slug}`;
}

export function getHomeStoreTabs<T extends StoreReview>(
  reviews: readonly T[],
  stores: readonly Coupon[] = getActiveCoupons()
): HomeStoreTab[] {
  const listed = listedNewestFirst(reviews);
  const copy = getSidebarCopy('pt');

  return stores.map((store) => {
    const code = store.offerMode === 'discount-code' ? store.code : store.referral?.code;
    const kind = getStoreCodeKind(store, code);
    const articles = listed.filter((review) => review.affiliate === store.slug);

    return {
      slug: store.slug,
      brand: store.brand,
      logo: store.brandLogo ? resolveMediaUrl(store.brandLogo) : undefined,
      initials: store.brandIcon,
      label: code ? getCodeTitle(copy, kind, store.brand) : store.brand,
      code,
      discount: store.discount,
      description: store.shortDescription,
      hints: getCodeHints(copy, kind, store.brand),
      storeUrl: store.offerUrl,
      storeLinkLabel: `Ir para ${theStore(store)}`,
      storePageUrl: getStorePageUrl(store, 'home'),
      listTitle: `Artigos ${ofStore(store)}`,
      articles: articles.slice(0, VISIBLE_ARTICLES).map((review) => ({
        slug: review.slug,
        href: `/reviews/${review.slug}`,
        title: review.title,
        type: review.type,
        image: review.image ? resolveMediaUrl(review.image) : undefined,
      })),
      total: articles.length,
      allArticles:
        articles.length > VISIBLE_ARTICLES
          ? { href: getStoreArticlesPath(store.slug), label: `Ver os ${articles.length} artigos ${ofStore(store)}` }
          : undefined,
      emptyText: `Ainda não há artigo ${ofStore(store)} por aqui. As campanhas vigentes ficam na página da loja.`,
    };
  });
}

// Tudo o que a Cecília escreveu sobre uma loja ativa; sem artigo, a loja não tem subpágina.
export function getStoreArticlesPage<T extends StoreReview>(
  reviews: readonly T[],
  slug: string,
  stores: readonly Coupon[] = getActiveCoupons()
) {
  const store = stores.find((item) => item.slug === slug);
  if (!store) return null;
  const articles = listedNewestFirst(reviews).filter((review) => review.affiliate === store.slug);
  if (articles.length === 0) return null;

  const countLabel = `${articles.length} ${articles.length === 1 ? 'artigo' : 'artigos'} da Cecília sobre ${theStore(store)}`;
  return {
    slug: store.slug,
    brand: store.brand,
    title: `Artigos ${ofStore(store)}`,
    metaTitle: `${store.brand}: guias e análises - Em Casa com Cecília`,
    description: `${countLabel}: guias e análises, do mais novo para o mais antigo.`,
    countLabel,
    codeLinkLabel: `Ver o código ${ofStore(store)}`,
    storePageUrl: getStorePageUrl(store, 'reviews-loja'),
    articles,
  };
}

export function getStoreArticlePageSlugs<T extends StoreReview>(
  reviews: readonly T[],
  stores: readonly Coupon[] = getActiveCoupons()
): string[] {
  const listed = getListedPortugueseReviews(reviews);
  return stores
    .filter((store) => listed.some((review) => review.affiliate === store.slug))
    .map((store) => store.slug);
}
