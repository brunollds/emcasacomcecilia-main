// Afiliado sem página: a loja de que temos só o link de afiliado. Não tem página em /cupons, bolinha na home nem
// código; no site ela é só um botão "Ir à loja" dentro do artigo de várias lojas. Só o caminho do artigo lê este
// módulo, e por isso a loja fica fora da home, de /reviews, de /cupons, do sitemap, do llms.txt e da busca. Loja que
// ganha página sai daqui e vai para couponsData.ts: o mesmo slug nunca fica nos dois (test:affiliate-stores).
// Só importa o tipo do idioma: serve ao servidor, aos scripts e ao cliente.

import type { Locale } from './i18n/locales';

export type AffiliateStore = {
  slug: string;
  brand: string;
  // O link de afiliado, sempre https e patrocinado.
  offerUrl: string;
  // Os idiomas em que a loja vale. O link de um país só fica no idioma dele; 'all' é o link que vale em qualquer um.
  locales: 'all' | readonly Locale[];
};

export const AFFILIATE_STORES: readonly AffiliateStore[] = [
  { slug: 'shopee', brand: 'Shopee', offerUrl: 'https://s.shopee.com.br/2LZ1KQ3brC', locales: ['pt'] },
];

export function getAffiliateStore(slug: string): AffiliateStore | undefined {
  return AFFILIATE_STORES.find((store) => store.slug === slug);
}

export function affiliateStoreServesLocale(store: AffiliateStore, locale: string): boolean {
  return store.locales === 'all' || store.locales.some((served) => served === locale);
}
