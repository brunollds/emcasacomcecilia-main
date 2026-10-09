import assert from 'node:assert/strict';

import { getCouponBySlug } from '../src/lib/couponsData';
import { getLocalizedCoupon } from '../src/lib/couponTranslations';
import { LOCALE_HOME_LOCALES, getLocaleHomeStores } from '../src/lib/localeHome';
import { YESSTYLE_COUPONS_FACTUAL } from '../src/lib/yesstyleCoupons';

// O que o test-locale-home.ts e o test-build-output.ts conferem do mesmo jeito na home de cada idioma:
// o que é link de loja e o que é um código chamado de cupom.

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

const urlHostsIn = (value: unknown): string[] => {
  if (typeof value === 'string') {
    if (!/^https?:\/\//i.test(value)) return [];
    try {
      return [new URL(value).hostname.toLowerCase()];
    } catch {
      return [];
    }
  }
  return value && typeof value === 'object' ? Object.values(value).flatMap(urlHostsIn) : [];
};

let storeHosts: string[] | undefined;

// Os hosts de toda URL (http ou https) no dado das lojas que aparecem na home de algum idioma: o registro
// em português, o do idioma onde há tradução e, na YesStyle, o JSON de cupons. Fica de fora o próprio site
// e o CDN dele. Loja nova com link novo entra sozinha.
export function getStoreHosts(): string[] {
  if (storeHosts) return storeHosts;
  const slugs = [...new Set(LOCALE_HOME_LOCALES.flatMap((locale) => getLocaleHomeStores(locale).map((store) => store.slug)))];
  const records: unknown[] = slugs.flatMap((slug) => [
    getCouponBySlug(slug),
    ...LOCALE_HOME_LOCALES.map((locale) => getLocalizedCoupon(slug, locale)),
  ]);
  if (slugs.includes('yesstyle')) records.push(YESSTYLE_COUPONS_FACTUAL);

  const derived = new Set(records.flatMap(urlHostsIn).filter((host) => !host.endsWith(SITE_HOST)));
  // O encurtador da YesStyle e o onelink da SHEIN são os links de afiliado dessas lojas: têm de sair do dado,
  // e se a derivação não os achar, ela quebrou.
  for (const host of ['ystyle.co', 'onelink.shein.com']) {
    assert.ok(derived.has(host), `hosts de loja tirados dos dados sem ${host}: a derivação quebrou (${[...derived].join(', ')})`);
  }
  storeHosts = [...new Set([...derived, ...STATIC_STORE_HOSTS])];
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
