import assert from 'node:assert/strict';

import { getYesStylePage } from '../src/components/coupons/yesstyleCopy';
import { getCodeTitle, getSidebarCopy } from '../src/components/review/sidebarCopy';
import { getCouponBySlug, getStoreCodeKind, type CouponCodeKind } from '../src/lib/couponsData';
import { getLocalizedCoupon } from '../src/lib/couponTranslations';
import { LOCALE_HOME_LOCALES, getLocaleHomeStores } from '../src/lib/localeHome';
import { YESSTYLE_COUPONS_FACTUAL } from '../src/lib/yesstyleCoupons';

// O que o test-locale-home.ts e o test-build-output.ts conferem do mesmo jeito na home de cada idioma:
// o que é link de loja, o que é um código chamado de cupom e quais textos de loja são do português.

// Os slugs das lojas que aparecem na home de algum idioma.
const getHomeStoreSlugs = (): string[] => [
  ...new Set(LOCALE_HOME_LOCALES.flatMap((locale) => getLocaleHomeStores(locale).map((store) => store.slug))),
];

// As palavras de cupom, uma lista só: as do sidebarCopy.ts (couponLabel) e os compostos do alemão. As
// palavras de código em geral (code, código, codice, 코드, コード) ficam de fora: o CECILIA010 é um código.
export const COUPON_WORD_LIST =
  'cupo[mn]s?|cup[oó]n(?:es)?|coupons?|gutschein\\w*|discount|descuento|desconto|promo|rabatt\\w*|sconto|쿠폰|クーポン|優惠[碼券]|优惠[码券]';

export const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// "cupom CECILIA010", "CECILIA010 coupon"… Sem código nenhum não há o que conferir: uma alternância vazia
// casaria qualquer palavra de cupom.
export function codeAsCouponRegExp(codes: readonly string[]): RegExp | undefined {
  if (codes.length === 0) return undefined;
  const alternatives = codes.map(escapeRegExp).join('|');
  return new RegExp(
    `(?:${COUPON_WORD_LIST})(?: de \\S+)?[:：]? ?(?:${alternatives})|(?:${alternatives})[ -]?(?:${COUPON_WORD_LIST})`,
    'iu'
  );
}

// Os hosts de loja que ficam sempre, mesmo que o dado mude. O resto sai do dado das lojas da home.
const STATIC_STORE_HOSTS = ['yesstyle.com', 'shein.com', 'ystyle.co'];
const SITE_HOST = 'emcasacomcecilia.com';

// O encurtador da YesStyle e o onelink da SHEIN são os links de afiliado dessas lojas: com a loja numa home,
// têm de sair do dado dela, e se a derivação não os achar, ela quebrou. Loja pausada sai da home e, com ela,
// da conferência.
const SENTINEL_HOSTS = [
  { host: 'ystyle.co', slug: 'yesstyle' },
  { host: 'onelink.shein.com', slug: 'shein' },
];

const EMBEDDED_URL = /https?:\/\/[^\s"'<>]+/gi;
const TRAILING_PUNCTUATION = /[.,;:!?)\]}]+$/;

// O host de toda URL http(s) nos textos do valor, inteira ou no meio de uma frase, em qualquer nível. A
// pontuação do fim da frase não faz parte do endereço.
export function urlHostsIn(value: unknown): string[] {
  if (typeof value === 'string') {
    return [...value.matchAll(EMBEDDED_URL)].flatMap(([url]) => {
      try {
        return [new URL(url.replace(TRAILING_PUNCTUATION, '')).hostname.toLowerCase()];
      } catch {
        return [];
      }
    });
  }
  return value && typeof value === 'object' ? Object.values(value).flatMap(urlHostsIn) : [];
}

// Os registros de uma loja que podem trazer link: o em português, o do idioma onde há tradução e, na
// YesStyle, o JSON de cupons.
const storeRecords = (slug: string): unknown[] => [
  getCouponBySlug(slug),
  ...LOCALE_HOME_LOCALES.map((locale) => getLocalizedCoupon(slug, locale)),
  ...(slug === 'yesstyle' ? [YESSTYLE_COUPONS_FACTUAL] : []),
];

// Os hosts de toda URL no dado das lojas dadas. Fica de fora o próprio site e o CDN dele.
export function deriveStoreHosts(slugs: readonly string[], recordsOf: (slug: string) => unknown[] = storeRecords): string[] {
  const derived = new Set(slugs.flatMap(recordsOf).flatMap(urlHostsIn).filter((host) => !host.endsWith(SITE_HOST)));
  for (const { host, slug } of SENTINEL_HOSTS) {
    if (!slugs.includes(slug)) continue;
    assert.ok(derived.has(host), `hosts de loja tirados dos dados sem ${host}: a derivação quebrou (${[...derived].join(', ')})`);
  }
  return [...derived];
}

let storeHosts: string[] | undefined;

// Os hosts de loja: os derivados do dado das lojas que aparecem na home de algum idioma, mais a base fixa.
// Loja da home com link novo entra sozinha; link de loja que não está em nenhuma home só pela base fixa.
export function getStoreHosts(): string[] {
  storeHosts ??= [...new Set([...deriveStoreHosts(getHomeStoreSlugs()), ...STATIC_STORE_HOSTS])];
  return storeHosts;
}

// O endereço é de uma loja quando o host é um dos hosts de loja ou um subdomínio dele. Endereço relativo,
// mailto: e tel: não têm host de loja.
export function isStoreLink(href: string): boolean {
  let host: string;
  try {
    host = new URL(href, `https://${SITE_HOST}`).hostname.toLowerCase();
  } catch {
    return false;
  }
  return getStoreHosts().some((store) => host === store || host.endsWith(`.${store}`));
}

// O host de loja citado em qualquer texto, com ou sem https://, no começo de uma palavra e sem virar parte
// de outro domínio ("ystyle.co" não casa em "ystyle.com").
export function getStoreHostMention(): RegExp {
  return new RegExp(`(?<![\\w.-])(?:[\\w-]+\\.)*(?:${getStoreHosts().map(escapeRegExp).join('|')})(?![\\w-])`, 'i');
}

export type PtStoreTexts = {
  categories: string[];
  codeTitles: Array<{ kind: CouponCodeKind | undefined; title: string }>;
};

// A categoria e o título do código, em português, de cada loja que aparece na home de algum idioma: o que
// as homes dos outros idiomas não podem repetir.
export function getPtStoreTexts(): PtStoreTexts {
  const stores = LOCALE_HOME_LOCALES.flatMap((locale) => getLocaleHomeStores(locale));
  const slugs = getHomeStoreSlugs();
  const ptCopy = getSidebarCopy('pt');

  const categories = [
    ...slugs.map((slug) => getCouponBySlug(slug)?.category),
    ...(slugs.includes('yesstyle') ? [getYesStylePage('pt')?.category] : []),
  ].filter((category): category is string => Boolean(category));

  const codeTitles = new Map<string, PtStoreTexts['codeTitles'][number]>();
  for (const store of stores) {
    const pt = getCouponBySlug(store.slug);
    if (!pt || !store.code) continue;
    const kind = getStoreCodeKind(pt, store.code);
    const title = getCodeTitle(ptCopy, kind, pt.brand);
    codeTitles.set(`${kind}:${title}`, { kind, title });
  }
  return { categories: [...new Set(categories)], codeTitles: [...codeTitles.values()] };
}
