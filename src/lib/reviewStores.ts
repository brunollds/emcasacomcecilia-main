// As lojas de um artigo. O `affiliate` é o slug de uma loja ou, no artigo de várias lojas, a lista delas, na ordem de
// apresentação (nunca de preferência: o artigo com lista não tem loja principal). Todo código que pergunta de que loja
// é um artigo passa por aqui, e nenhum compara `affiliate` direto. Só importa o internalLinks, que não importa nada:
// serve ao servidor, aos scripts e ao cliente. Do locales.ts vem só o tipo, que some na compilação.

import type { Locale } from './i18n/locales';
import { isInternalLink } from './internalLinks';

export type ReviewAffiliate = string | readonly string[];
type WithAffiliate = { affiliate?: ReviewAffiliate };
type StoreName = { slug: string; brand: string };

// As lojas do artigo de várias lojas, por slug, para o `store` dos links, das fotos e do card de estilo: a marca (o
// "Ver na <loja>") e o código (a medição do clique; a loja só de link não tem). Montado no servidor, a partir dos blocos
// do artigo, e passado ao cliente: traz as lojas ativas de couponsData.ts e o afiliado sem página.
export type MultiStores = Record<string, { brand: string; code?: string }>;

// No artigo de várias lojas (`stores` definido, mesmo vazio), só o `store` de uma loja ativa leva o link comercial: o da
// loja pausada perde o link, e o texto, a foto e a peça ficam. Fora dele, vale o de sempre.
export function canLinkStore(stores: MultiStores | undefined, store: string | undefined): boolean {
  return !stores || Boolean(store && stores[store]);
}

// As linhas do artigo de várias lojas falam de "códigos" só quando toda loja tem o dela; com uma loja só de link na
// lista, o título e o botão do dock falam de "lojas". É a única regra, lida pelo articleCopy e pelo sidebarCopy.
export function everyStoreHasCode(stores: readonly { code?: string }[]): boolean {
  return stores.every(({ code }) => Boolean(code));
}

// Os links da seção sem o botão de loja pausada. O link de loja é o externo e patrocinado, o que pede `store`
// (multi-store-checks); o interno e o externo sem patrocínio ficam sempre.
export function withoutPausedStoreLinks<T extends { href: string; sponsored?: boolean; store?: string }>(
  links: readonly T[] | undefined,
  stores: MultiStores | undefined
): T[] {
  return (links ?? []).filter((link) => isInternalLink(link.href) || !link.sponsored || canLinkStore(stores, link.store));
}

// A foto de produto de loja pausada fica sem o link: volta a ser só o botão que amplia.
export function withoutPausedHref<T extends { href?: string; store?: string }>(image: T, stores: MultiStores | undefined): T {
  return image.href && !canLinkStore(stores, image.store) ? { ...image, href: undefined } : image;
}

export function getReviewStoreSlugs(review: WithAffiliate): string[] {
  const { affiliate } = review;
  if (!affiliate) return [];
  return typeof affiliate === 'string' ? [affiliate] : [...affiliate];
}

// Lista é o modo de várias lojas para sempre: mesmo com uma só loja ativa, o artigo não volta ao de uma loja.
export function isMultiStoreReview(review: WithAffiliate): boolean {
  return Array.isArray(review.affiliate);
}

// A loja do artigo de uma loja; o de várias lojas (e o sem loja) dá undefined. É o que lê quem só sabe mostrar uma loja
// (o recorte, o bloco da loja, o dock): o artigo de várias lojas nunca cai na primeira da lista.
export function getSingleStoreSlug(review: WithAffiliate): string | undefined {
  return typeof review.affiliate === 'string' && review.affiliate ? review.affiliate : undefined;
}

export function reviewHasStore(review: WithAffiliate, slug: string): boolean {
  return getReviewStoreSlugs(review).includes(slug);
}

export function reviewsShareStore(a: WithAffiliate, b: WithAffiliate): boolean {
  const slugs = getReviewStoreSlugs(a);
  return getReviewStoreSlugs(b).some((slug) => slugs.includes(slug));
}

// As lojas do artigo que estão em `stores` (as ativas, para quem chama), na ordem do artigo.
export function getReviewStores<S extends StoreName>(review: WithAffiliate, stores: readonly S[]): S[] {
  return getReviewStoreSlugs(review).flatMap((slug) => stores.filter((store) => store.slug === slug));
}

// O nome da loja no cartão de um lugar neutro (a estante de /reviews, o "Acabou de sair", os relacionados). Uma loja,
// a marca dela, como sempre; no artigo de várias lojas, "A e B" ou "N lojas parceiras", contando só as ativas, no
// idioma do cartão. Idioma que não está na tabela fica sem o nome: melhor que uma frase em português na página dele.
const STORE_LABELS: Record<Locale, { pair: (a: string, b: string) => string; many: (count: number) => string }> = {
  pt: { pair: (a, b) => `${a} e ${b}`, many: (n) => `${n} lojas parceiras` },
  en: { pair: (a, b) => `${a} and ${b}`, many: (n) => `${n} partner stores` },
  es: { pair: (a, b) => `${a} y ${b}`, many: (n) => `${n} tiendas asociadas` },
  fr: { pair: (a, b) => `${a} et ${b}`, many: (n) => `${n} boutiques partenaires` },
  de: { pair: (a, b) => `${a} und ${b}`, many: (n) => `${n} Partner-Shops` },
  it: { pair: (a, b) => `${a} e ${b}`, many: (n) => `${n} negozi partner` },
  ko: { pair: (a, b) => `${a}, ${b}`, many: (n) => `파트너 스토어 ${n}곳` },
  ja: { pair: (a, b) => `${a} と ${b}`, many: (n) => `提携ストア ${n} 店` },
  'zh-hant': { pair: (a, b) => `${a} 和 ${b}`, many: (n) => `${n} 家合作商店` },
  'zh-hans': { pair: (a, b) => `${a} 和 ${b}`, many: (n) => `${n} 家合作商店` },
  ar: { pair: (a, b) => `${a} و ${b}`, many: (n) => `${n} من المتاجر الشريكة` },
};

export function getReviewStoreLabel(
  review: WithAffiliate,
  stores: readonly StoreName[],
  locale = 'pt'
): string | undefined {
  const brands = getReviewStores(review, stores).map(({ brand }) => brand);
  if (!isMultiStoreReview(review) || brands.length <= 1) return brands[0];
  if (!Object.prototype.hasOwnProperty.call(STORE_LABELS, locale)) return undefined;
  const labels = STORE_LABELS[locale as Locale];
  return brands.length === 2 ? labels.pair(brands[0], brands[1]) : labels.many(brands.length);
}
