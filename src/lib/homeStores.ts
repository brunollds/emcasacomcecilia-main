import { socialMedias } from '@/lib/brandLinks';
import { getActiveCoupons, getStoreCodeKind, type Coupon } from '@/lib/couponsData';
import { getCouponStorePath } from '@/lib/couponTranslations';
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

const VISIBLE_ARTICLES = 3;
const LATEST_LIMIT = 5;
const CECILIA_STAT_NETWORKS = ['Instagram', 'TikTok', 'YouTube', 'Facebook'] as const;
// Foto da Cecília: bolinha e painel da vitrine.
export const CECILIA_PHOTO = resolveMediaUrl('/images/photos/BRU-1.jpg');

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

function articlesOfStore<T extends StoreReview>(listed: readonly T[], slug: string): T[] {
  return listed.filter((review) => review.affiliate === slug);
}

// Com até 3 artigos a vitrine já mostra todos: a loja só ganha o "Ver os N artigos" e a
// subpágina /reviews/loja/{slug} quando passa disso (Bruno, 08/10).
function hasArticlesPage(articleCount: number): boolean {
  return articleCount > VISIBLE_ARTICLES;
}

export function getStoreArticlesPath(slug: string): string {
  return `/reviews/loja/${slug}`;
}

export function getHomeStoreTabs(
  reviews: readonly StoreReview[],
  stores: readonly Coupon[] = getActiveCoupons()
): HomeStoreTab[] {
  const listed = listedNewestFirst(reviews);
  const copy = getSidebarCopy('pt');

  return stores.map((store) => {
    const code = store.offerMode === 'discount-code' ? store.code : store.referral?.code;
    const kind = getStoreCodeKind(store, code);
    const articles = articlesOfStore(listed, store.slug);

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
      storePageUrl: getCouponStorePath(store.slug, 'pt'),
      listTitle: `Artigos ${ofStore(store)}`,
      articles: articles.slice(0, VISIBLE_ARTICLES).map((review) => ({
        slug: review.slug,
        href: `/reviews/${review.slug}`,
        title: review.title,
        type: review.type,
        image: review.image ? resolveMediaUrl(review.image) : undefined,
      })),
      total: articles.length,
      allArticles: hasArticlesPage(articles.length)
        ? { href: getStoreArticlesPath(store.slug), label: `Ver os ${articles.length} artigos ${ofStore(store)}` }
        : undefined,
      emptyText: `Ainda não há artigo ${ofStore(store)} por aqui. As campanhas vigentes ficam na página da loja.`,
    };
  });
}

// Tudo o que a Cecília escreveu sobre uma loja ativa com mais de 3 artigos; as outras não têm subpágina.
export function getStoreArticlesPage<T extends StoreReview>(
  reviews: readonly T[],
  slug: string,
  stores: readonly Coupon[] = getActiveCoupons()
) {
  const store = stores.find((item) => item.slug === slug);
  if (!store) return null;
  const articles = articlesOfStore(listedNewestFirst(reviews), store.slug);
  if (!hasArticlesPage(articles.length)) return null;

  const countLabel = `${articles.length} artigos da Cecília sobre ${theStore(store)}`;
  return {
    slug: store.slug,
    brand: store.brand,
    title: `Artigos ${ofStore(store)}`,
    metaTitle: `${store.brand}: guias e análises - Em Casa com Cecília`,
    description: `${countLabel}: guias e análises, do mais novo para o mais antigo.`,
    countLabel,
    codeLinkLabel: `Ver o código ${ofStore(store)}`,
    storePageUrl: getCouponStorePath(store.slug, 'pt'),
    articles,
  };
}

export function getStoreArticlePageSlugs(
  reviews: readonly StoreReview[],
  stores: readonly Coupon[] = getActiveCoupons()
): string[] {
  const listed = getListedPortugueseReviews(reviews);
  return stores
    .filter((store) => hasArticlesPage(articlesOfStore(listed, store.slug).length))
    .map((store) => store.slug);
}

export type HomeLatestArticle = {
  slug: string;
  href: string;
  title: string;
  type: string;
  dateLabel: string;
  image?: string;
  store?: string;
};

// publishedAtISO começa por AAAA-MM-DD; o card mostra DD/MM.
function formatDayMonth(publishedAtISO: string): string {
  const [, month, day] = publishedAtISO.slice(0, 10).split('-');
  return `${day}/${month}`;
}

export function getHomeLatest<T extends StoreReview>(
  reviews: readonly T[],
  stores: readonly Coupon[] = getActiveCoupons()
): HomeLatestArticle[] {
  return listedNewestFirst(reviews)
    .slice(0, LATEST_LIMIT)
    .map((review) => ({
      slug: review.slug,
      href: `/reviews/${review.slug}`,
      title: review.title,
      type: review.type,
      dateLabel: formatDayMonth(review.publishedAtISO),
      image: review.image ? resolveMediaUrl(review.image) : undefined,
      store: stores.find((store) => store.slug === review.affiliate)?.brand,
    }));
}

// Seguidores em milhares, como o topo da home sempre mostrou: "443.5K" vira "444k".
export function formatFollowerCount(value?: string): string | undefined {
  const thousands = Number.parseFloat(value ?? '');
  return Number.isFinite(thousands) ? `${Math.round(thousands)}k` : undefined;
}

export function getCeciliaSocialStats() {
  return CECILIA_STAT_NETWORKS.map((name) => ({
    name,
    followers: formatFollowerCount(socialMedias.find((social) => social.name === name)?.followers),
  }));
}
