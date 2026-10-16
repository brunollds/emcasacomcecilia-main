import { COUPON_STORE_COPY } from '@/components/coupons/couponStoreCopy';
import type { CouponCopyLocale } from '@/components/review/couponCopyLocale';
import { cardImageFit } from '@/lib/cardImage';
import { getReviewCanonicalPathname } from '@/lib/content/review-i18n';
import { getActiveCoupons, type Coupon } from '@/lib/couponsData';
import {
  getStoreArticlePageSlugs,
  getStoreArticlesPage,
  getStoreArticlesPath,
  hasArticlesPage,
  type StoreReview,
} from '@/lib/homeStores';
import { SITE_SOCIAL_IMAGE, absoluteMediaUrl, type PageLink, type SocialImage } from '@/lib/pageSeo';
import {
  REVIEW_CATEGORIES,
  getListedPortugueseReviews,
  sortReviewsByPublishedAt,
  type ReviewCategory,
} from '@/lib/reviewDiscovery';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';
import {
  GRID_PAGE_SIZE,
  countLabel,
  foldSearchText,
  type ShelfArticle,
  type ShelfCardArticle,
  type ShelfCategory,
  type ShelfSearch,
  type ShelfStore,
} from '@/lib/reviewsShelf';
import { ofStore } from '@/lib/storeNames';

// Dados de /reviews e das subpáginas /reviews/loja/{slug}, montados no servidor. Recebe as reviews por
// parâmetro e não importa '@/lib/data', como o homeStores.ts; o componente cliente recebe só o resultado.

// Os campos da busca do site (siteSearch.mjs) que o StoreReview não traz.
export type HubReview = StoreReview & {
  productName?: string;
  brand?: string;
  tags?: string[];
  collections?: string[];
};

type ListedReview = HubReview & { category: ReviewCategory; publishedAtISO: string };

// O começo da trilha das páginas de lista; o JSON-LD acrescenta a própria página.
export const REVIEWS_TRAIL_ROOT: PageLink = { name: 'Início', path: '/' };
const REVIEWS_TRAIL: PageLink[] = [REVIEWS_TRAIL_ROOT, { name: 'Guias & Análises', path: '/reviews' }];

// Os artigos que não são de nenhuma loja ativa (sem affiliate, ou de loja pausada) têm a página
// /reviews/outros e a bolinha "Outros", a última de todas.
export const OTHERS_SLUG = 'outros';
export const OTHERS_SHELF_PATH = '/reviews/outros';

// A subpágina só ganha a busca quando a loja passa de uma página de cartões.
export const STORE_SEARCH_THRESHOLD = GRID_PAGE_SIZE;

// A frase de sempre do topo de /reviews, que não promete experiência própria em todo artigo.
const REVIEWS_INTRO =
  'Guias práticos, experiências reais quando existem e análises baseadas em dados e fontes declaradas.';

// Formatos que o cartão do X mostra (a mesma regra do assertShareImage do test:build-output).
const SHARE_IMAGE_FORMAT = /\.(?:jpe?g|png|webp|gif)$/i;

const CATEGORY_LABELS = new Map<string, string>(REVIEW_CATEGORIES.map(({ value, label }) => [value, label]));

function formatDates(publishedAtISO: string) {
  const [year, month, day] = publishedAtISO.slice(0, 10).split('-');
  return { dayMonth: `${day}/${month}`, fullDate: `${day}/${month}/${year}` };
}

// Os campos da busca do site (siteSearch.mjs), com o rótulo da categoria e o nome da loja.
function searchTextOf(review: ListedReview, store: string | undefined): string {
  return foldSearchText(
    [
      review.title,
      review.description,
      review.type,
      CATEGORY_LABELS.get(review.category),
      review.productName,
      review.brand,
      store,
      ...(review.tags ?? []),
      ...(review.collections ?? []),
    ]
      .filter(Boolean)
      .join(' ')
  );
}

// O que o cartão mostra, com o endereço e as datas de quem chama.
function toShelfCard(
  review: HubReview,
  stores: readonly Coupon[],
  href: string,
  dates: Pick<ShelfCardArticle, 'dayMonth' | 'fullDate'>
): ShelfCardArticle {
  return {
    slug: review.slug,
    href,
    title: review.title,
    type: review.type,
    ...dates,
    store: stores.find(({ slug }) => slug === review.affiliate)?.brand,
    image: review.image ? resolveMediaUrl(review.image) : undefined,
    imageFit: cardImageFit(review),
    imagePosition: review.imagePosition,
    isNew: Boolean(review.isNew),
  };
}

function toShelfArticle(review: ListedReview, stores: readonly Coupon[]): ShelfArticle {
  const card = toShelfCard(review, stores, `/reviews/${review.slug}`, formatDates(review.publishedAtISO));
  return {
    ...card,
    id: review.id,
    category: review.category,
    publishedAtISO: review.publishedAtISO,
    searchText: searchTextOf(review, card.store),
  };
}

// Os relacionados do fim do artigo nos cartões da estante: o endereço de cada artigo no idioma dele e a data no
// formato do idioma (a estante de /reviews, só em português, segue com DD/MM/AAAA).
export function getRelatedShelfCards(
  reviews: ReadonlyArray<HubReview & { locale?: string }>,
  locale: CouponCopyLocale
): ShelfCardArticle[] {
  const stores = getActiveCoupons();
  const { dateLocale } = COUPON_STORE_COPY[locale];
  const dayMonth = new Intl.DateTimeFormat(dateLocale, { day: '2-digit', month: '2-digit', timeZone: 'UTC' });
  const fullDate = new Intl.DateTimeFormat(dateLocale, { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' });
  return reviews.map((review) => {
    if (!review.publishedAtISO) throw new Error(`[reviewsHub] ${review.slug}: relacionado sem publishedAtISO`);
    const date = new Date(`${review.publishedAtISO.slice(0, 10)}T00:00:00Z`);
    return toShelfCard(review, stores, getReviewCanonicalPathname(review), {
      dayMonth: dayMonth.format(date),
      fullDate: fullDate.format(date),
    });
  });
}

function getPresentCategories(articles: readonly ShelfArticle[]): ShelfCategory[] {
  return REVIEW_CATEGORIES.filter(({ value }) => articles.some((article) => article.category === value)).map(
    ({ value, label }) => ({ value, label })
  );
}

function toShelfStore(store: Coupon, total: number): ShelfStore {
  return {
    slug: store.slug,
    brand: store.brand,
    logo: store.brandLogo ? resolveMediaUrl(store.brandLogo) : undefined,
    initials: store.brandIcon,
    total,
    href: getStoreArticlesPath(store.slug),
    countLabel: countLabel(total),
  };
}

// As lojas com subpágina, na ordem das lojas (a da vitrine da home), com o total de artigos de cada uma.
function getShelfStores(reviews: readonly HubReview[], stores: readonly Coupon[]): ShelfStore[] {
  const listed = getListedPortugueseReviews(reviews);
  const withPage = new Set(getStoreArticlePageSlugs(reviews, stores));
  return stores
    .filter(({ slug }) => withPage.has(slug))
    .map((store) => toShelfStore(store, listed.filter(({ affiliate }) => affiliate === store.slug).length));
}

// Os artigos listados em português cujo affiliate não é uma loja ativa, do mais novo ao mais antigo.
function getOthersReviews(reviews: readonly HubReview[], stores: readonly Coupon[]): ListedReview[] {
  const active = new Set(stores.map(({ slug }) => slug));
  return sortReviewsByPublishedAt(getListedPortugueseReviews(reviews)).filter(
    ({ affiliate }) => !affiliate || !active.has(affiliate)
  );
}

function toOthersBubble(total: number): ShelfStore {
  return {
    slug: OTHERS_SLUG,
    brand: 'Outros',
    initials: 'Outros',
    icon: 'house',
    total,
    href: OTHERS_SHELF_PATH,
    countLabel: countLabel(total),
  };
}

// As bolinhas de /reviews e de "Outras lojas" nas subpáginas: as lojas com subpágina e, por último, a
// "Outros" quando há 3 artigos ou mais fora das lojas.
function getShelfBubbles(reviews: readonly HubReview[], stores: readonly Coupon[]): ShelfStore[] {
  const others = getOthersReviews(reviews, stores);
  return [...getShelfStores(reviews, stores), ...(hasArticlesPage(others.length) ? [toOthersBubble(others.length)] : [])];
}

// A capa do artigo mais novo num formato que o cartão do X mostra; sem nenhuma, o logo do site.
function getShareImage(listed: readonly ListedReview[]): SocialImage {
  for (const review of listed) {
    if (!review.image) continue;
    const url = absoluteMediaUrl(review.image);
    if (SHARE_IMAGE_FORMAT.test(new URL(url).pathname)) return { url, alt: review.title };
  }
  return SITE_SOCIAL_IMAGE;
}

export type ReviewsHubContent = {
  intro: string;
  articles: ShelfArticle[];
  newArticles: ShelfArticle[];
  stores: ShelfStore[];
  categories: ShelfCategory[];
  socialImage: SocialImage;
};

export function getReviewsHubContent(
  reviews: readonly HubReview[],
  stores: readonly Coupon[] = getActiveCoupons()
): ReviewsHubContent {
  const listed = sortReviewsByPublishedAt(getListedPortugueseReviews(reviews));
  const articles = listed.map((review) => toShelfArticle(review, stores));
  return {
    intro: `${articles.length} guias e análises. ${REVIEWS_INTRO}`,
    articles,
    newArticles: articles.filter(({ isNew }) => isNew),
    stores: getShelfBubbles(reviews, stores),
    categories: getPresentCategories(articles),
    socialImage: getShareImage(listed),
  };
}

export type StoreShelfContent = {
  slug: string;
  brand: string;
  title: string;
  metaTitle: string;
  description: string;
  countLabel: string;
  codeLinkLabel: string;
  storePageUrl: string;
  path: string;
  store: ShelfStore;
  articles: ShelfArticle[];
  categories: ShelfCategory[];
  search: ShelfSearch | null;
  otherStores: ShelfStore[];
  // A trilha visível, da mesma lista que o BreadcrumbList (o JSON-LD recebe tudo menos o último item).
  trail: PageLink[];
};

// A subpágina de uma loja ativa com 3 artigos ou mais (a regra de getStoreArticlesPage); as outras dão null.
export function getStoreShelfContent(
  reviews: readonly HubReview[],
  slug: string,
  stores: readonly Coupon[] = getActiveCoupons()
): StoreShelfContent | null {
  const page = getStoreArticlesPage(reviews, slug, stores);
  const store = stores.find((item) => item.slug === slug);
  if (!page || !store) return null;

  const { articles: storeReviews, ...texts } = page;
  const path = getStoreArticlesPath(page.slug);
  const articles = storeReviews.map((review) => toShelfArticle(review, stores));
  const searchText = `Buscar nos artigos ${ofStore(store)}`;

  return {
    ...texts,
    path,
    store: toShelfStore(store, articles.length),
    articles,
    categories: getPresentCategories(articles),
    search:
      articles.length > STORE_SEARCH_THRESHOLD ? { label: searchText, placeholder: searchText, scope: 'reviews' } : null,
    otherStores: getShelfBubbles(reviews, stores).filter((item) => item.slug !== page.slug),
    trail: [...REVIEWS_TRAIL, { name: page.title, path }],
  };
}

export type OthersShelfContent = Omit<StoreShelfContent, 'slug' | 'brand' | 'codeLinkLabel' | 'storePageUrl'> & {
  socialImage: SocialImage;
};

// A página dos artigos fora das lojas ativas, com 3 ou mais (como as lojas); com menos, null. O "Outras
// lojas" dela traz só as lojas, sem a própria bolinha.
export function getOthersShelfContent(
  reviews: readonly HubReview[],
  stores: readonly Coupon[] = getActiveCoupons()
): OthersShelfContent | null {
  const others = getOthersReviews(reviews, stores);
  if (!hasArticlesPage(others.length)) return null;

  const articles = others.map((review) => toShelfArticle(review, stores));
  const searchText = 'Buscar nos outros artigos';
  const title = 'Outros artigos';

  return {
    title,
    metaTitle: 'Outros guias e análises - Em Casa com Cecília',
    description: `${articles.length} artigos da Cecília fora das lojas parceiras: guias e análises, do mais novo para o mais antigo.`,
    countLabel: countLabel(articles.length),
    path: OTHERS_SHELF_PATH,
    store: toOthersBubble(articles.length),
    articles,
    categories: getPresentCategories(articles),
    search:
      articles.length > STORE_SEARCH_THRESHOLD ? { label: searchText, placeholder: searchText, scope: 'reviews' } : null,
    otherStores: getShelfStores(reviews, stores),
    trail: [...REVIEWS_TRAIL, { name: 'Outros', path: OTHERS_SHELF_PATH }],
    socialImage: getShareImage(others),
  };
}
