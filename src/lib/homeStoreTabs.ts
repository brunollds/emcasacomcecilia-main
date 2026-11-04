import type { CardImageFit, CardImagePosition } from '@/lib/cardImage';

// Regras da vitrine da home que valem no servidor e no navegador. O componente cliente importa
// daqui; os dados das lojas chegam prontos de homeStores.ts, que fica no servidor.

export const CECILIA_TAB_ID = 'cecilia';
// No celular a lista de artigos da loja mostra só os primeiros; os outros ficam para o computador.
export const MOBILE_VISIBLE_ARTICLES = 4;

export type HomeStoreArticle = {
  slug: string;
  href: string;
  title: string;
  type: string;
  // URL de entrega, já resolvida.
  image?: string;
  // A capa pela regra dos cartões (src/lib/cardImage.ts).
  imageFit: CardImageFit;
  imagePosition?: CardImagePosition;
};

// O código com prazo da loja (o CECIEMCASA15 da I Wanna Sleep): dentro do prazo, o recorte da vitrine mostra ele e o
// desconto dele no lugar do código de sempre, com o fim do prazo.
export type HomeLimitedCode = {
  code: string;
  discount: string;
  startsAt: string;
  endsAt: string;
  // Já tinha começado no build: sai no HTML.
  inHtml: boolean;
  // "Por tempo limitado: até 8 de novembro".
  deadline: string;
};

export type HomeStoreTab = {
  slug: string;
  brand: string;
  // URL de entrega do logo; sem ele, a bolinha e o recorte mostram as iniciais (brandIcon).
  logo?: string;
  initials: string;
  label: string;
  // Falta só em loja de link sem código de indicação.
  code?: string;
  discount: string;
  // Só em loja com código com prazo que ainda não venceu.
  limitedCodes?: HomeLimitedCode[];
  description: string;
  hints: { copy: string; copied: string };
  storeUrl: string;
  storeLinkLabel: string;
  storePageUrl: string;
  listTitle: string;
  articles: HomeStoreArticle[];
  total: number;
  allArticles?: { href: string; label: string };
  emptyText: string;
};

// O id da bolinha é o próprio hash: o navegador rola até a vitrine ao seguir /#loja-yesstyle.
export function getTabAnchor(tabId: string): string {
  return tabId === CECILIA_TAB_ID ? CECILIA_TAB_ID : `loja-${tabId}`;
}

// Hash desconhecido não muda nada: a vitrine segue na aba padrão.
export function parseTabHash(hash: string, storeSlugs: readonly string[]): string | null {
  const anchor = hash.replace(/^#/, '');
  if (anchor === CECILIA_TAB_ID) return CECILIA_TAB_ID;
  const slug = anchor.startsWith('loja-') ? anchor.slice('loja-'.length) : '';
  return storeSlugs.includes(slug) ? slug : null;
}

// A home abre na primeira loja da faixa, a do artigo mais novo (Bruno, 16/10; de 07/10 até então, a DAMIE).
export function getDefaultTabId(storeSlugs: readonly string[]): string {
  return storeSlugs[0] ?? CECILIA_TAB_ID;
}

export function getTabOrder(storeSlugs: readonly string[]): string[] {
  return [CECILIA_TAB_ID, ...storeSlugs];
}

export function getHomeStoreSelectParameters(tabId: string) {
  return { store: tabId, placement: 'home_store_tabs' as const };
}
