// Regras da vitrine da home que valem no servidor e no navegador. O componente cliente importa
// daqui; os dados das lojas chegam prontos de homeStores.ts, que fica no servidor.

export const CECILIA_TAB_ID = 'cecilia';
// Loja aberta ao entrar na home (decisão de 07/10).
const DEFAULT_STORE_SLUG = 'damie';

export type HomeStoreArticle = {
  slug: string;
  href: string;
  title: string;
  type: string;
  // URL de entrega, já resolvida.
  image?: string;
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

export function getDefaultTabId(storeSlugs: readonly string[]): string {
  if (storeSlugs.includes(DEFAULT_STORE_SLUG)) return DEFAULT_STORE_SLUG;
  return storeSlugs[0] ?? CECILIA_TAB_ID;
}

export function getTabOrder(storeSlugs: readonly string[]): string[] {
  return [CECILIA_TAB_ID, ...storeSlugs];
}

export function getHomeStoreSelectParameters(tabId: string) {
  return { store: tabId, placement: 'home_store_tabs' as const };
}
