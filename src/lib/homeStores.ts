import { socialMedias } from '@/lib/brandLinks';
import { cardImageFit, type CardImageFit, type CardImagePosition } from '@/lib/cardImage';
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
import { ofStore, theStore } from '@/lib/storeNames';

// Dados da vitrine da home e da subpágina /reviews/loja/{slug}. Recebe as reviews por parâmetro e
// não importa '@/lib/data': quem chama é o servidor, e o componente cliente recebe só o resultado.

export type StoreReview = ReviewDiscoveryItem & { affiliate?: string };

// A vitrine traz até 6 artigos da loja: no computador a lista fica da altura do card de destaque; no
// celular, sem o destaque, a lista mostra os 4 primeiros (MOBILE_VISIBLE_ARTICLES, em homeStoreTabs.ts).
const VISIBLE_ARTICLES = 6;
const MIN_ARTICLES_FOR_PAGE = 3;
const LATEST_LIMIT = 5;
const CECILIA_STAT_NETWORKS = ['Instagram', 'TikTok', 'YouTube', 'Facebook'] as const;
// Foto da Cecília: bolinha e painel da vitrine.
export const CECILIA_PHOTO = resolveMediaUrl('/images/photos/BRU-1.jpg');

// O botão que leva ao código da loja: subpágina de loja, datas comerciais e página do vídeo.
export function codeLinkLabel(store: Pick<Coupon, 'slug' | 'brand'>): string {
  return `Ver o código ${ofStore(store)}`;
}

// O código que a vitrine mostra: o de desconto ou, na loja de link, o de indicação.
export function getStoreCode(store: Coupon): string | undefined {
  return store.offerMode === 'discount-code' ? store.code : store.referral?.code;
}

function listedNewestFirst<T extends StoreReview>(reviews: readonly T[]) {
  return sortReviewsByPublishedAt(getListedPortugueseReviews(reviews));
}

function articlesOfStore<T extends StoreReview>(listed: readonly T[], slug: string): T[] {
  return listed.filter((review) => review.affiliate === slug);
}

// As lojas do artigo PT listado mais novo para o mais antigo (a ordem das bolinhas da home e de /reviews).
// Segue a ordem de listedNewestFirst, que desempata a data pelo id; assim a primeira bolinha é a loja do
// artigo que abre a lista. Loja sem artigo vai para o fim, na ordem recebida.
export function sortStoresByNewestArticle<S extends Pick<Coupon, 'slug'>>(
  stores: readonly S[],
  reviews: readonly StoreReview[]
): S[] {
  const rank = new Map<string, number>();
  listedNewestFirst(reviews).forEach(({ affiliate }, index) => {
    if (affiliate && !rank.has(affiliate)) rank.set(affiliate, index);
  });
  const rankOf = (store: S) => rank.get(store.slug) ?? Infinity;
  return stores
    .map((store, position) => ({ store, position }))
    .sort((a, b) => rankOf(a.store) - rankOf(b.store) || a.position - b.position)
    .map(({ store }) => store);
}

// A loja ganha o "Ver os N artigos", a subpágina /reviews/loja/{slug} e a bolinha de /reviews a partir de 3
// artigos (Bruno, 14/10; de 08/10 até então, só acima de 3, quando a vitrine já não mostrava todos).
export function hasArticlesPage(articleCount: number): boolean {
  return articleCount >= MIN_ARTICLES_FOR_PAGE;
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

  return sortStoresByNewestArticle(stores, reviews).map((store) => {
    const code = getStoreCode(store);
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
        imageFit: cardImageFit(review),
        imagePosition: review.imagePosition,
      })),
      total: articles.length,
      allArticles: hasArticlesPage(articles.length)
        ? { href: getStoreArticlesPath(store.slug), label: `Ver os ${articles.length} artigos ${ofStore(store)}` }
        : undefined,
      emptyText: `Ainda não há artigo ${ofStore(store)} por aqui. As campanhas vigentes ficam na página da loja.`,
    };
  });
}

// Tudo o que a Cecília escreveu sobre uma loja ativa com 3 artigos ou mais; as outras não têm subpágina.
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
    codeLinkLabel: codeLinkLabel(store),
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
  // A capa pela regra dos cartões (src/lib/cardImage.ts).
  imageFit: CardImageFit;
  imagePosition?: CardImagePosition;
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
      imageFit: cardImageFit(review),
      imagePosition: review.imagePosition,
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
