// As lojas de um artigo. O `affiliate` é o slug de uma loja ou, no artigo de várias lojas, a lista delas, na ordem de
// apresentação (nunca de preferência: o artigo com lista não tem loja principal). Todo código que pergunta de que loja
// é um artigo passa por aqui, e nenhum compara `affiliate` direto. Só importa o internalLinks, que não importa nada:
// serve ao servidor, aos scripts e ao cliente.

import { isInternalLink } from './internalLinks';

export type ReviewAffiliate = string | readonly string[];
type WithAffiliate = { affiliate?: ReviewAffiliate };
type StoreName = { slug: string; brand: string };

// As lojas do artigo de várias lojas, por slug, para o `store` dos links, das fotos e do card de estilo: a marca (o
// "Ver na <loja>") e o código (a medição do clique). Montado no servidor e passado ao cliente.
export type MultiStores = Record<string, { brand: string; code?: string }>;

// No artigo de várias lojas (`stores` definido, mesmo vazio), só o `store` de uma loja ativa leva o link comercial: o da
// loja pausada perde o link, e o texto, a foto e a peça ficam. Fora dele, vale o de sempre.
export function canLinkStore(stores: MultiStores | undefined, store: string | undefined): boolean {
  return !stores || Boolean(store && stores[store]);
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
// a marca dela, como sempre; no artigo de várias lojas, "A e B" ou "N lojas parceiras", contando só as ativas. O
// artigo de várias lojas só existe em português: em outro idioma, o cartão fica sem o nome.
export function getReviewStoreLabel(
  review: WithAffiliate,
  stores: readonly StoreName[],
  locale = 'pt'
): string | undefined {
  const brands = getReviewStores(review, stores).map(({ brand }) => brand);
  if (!isMultiStoreReview(review)) return brands[0];
  if (locale !== 'pt' || brands.length === 0) return undefined;
  if (brands.length === 1) return brands[0];
  if (brands.length === 2) return `${brands[0]} e ${brands[1]}`;
  return `${brands.length} lojas parceiras`;
}
