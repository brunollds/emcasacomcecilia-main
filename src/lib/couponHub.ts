import type { CouponCardLabels } from '@/components/coupons/CouponCards';
import { COUPON_STORE_COPY } from '@/components/coupons/couponStoreCopy';
import { COUPON_HUB_COPY, PT_COUPON_HUB_TEXT, type CouponHubText } from '@/components/coupons/couponHubCopy';
import { getYesStylePage } from '@/components/coupons/yesstyleCopy';
import { getCouponBySlug, type Coupon } from '@/lib/couponsData';
import { getCouponStorePath, getLocalizedCoupon, getTranslatedCouponSlugs, type TranslatedLocale } from '@/lib/couponTranslations';
import { getYesStyleLocaleConfig } from '@/lib/i18n/clusters/yesstyle';
import { LOCALES, LOCALE_KEYS, type Locale } from '@/lib/i18n/locales';
import { absoluteUrl, SITE_URL } from '@/lib/pageSeo';
import { getPrimaryRewardCode } from '@/lib/yesstyleCoupons';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

// O hub de cada idioma e o /cupons em PT: o mesmo endereço, a mesma lista de lojas e as mesmas alternativas
// de idioma. Sem next/font nem React aqui, para os testes (tsx) lerem este arquivo direto.

export const COUPON_HUB_LOGO_URL = new URL(
  resolveMediaUrl('/images/logos/logo-em-casa-com-cecilia.png'),
  SITE_URL
).toString();

export function getCouponHubPath(locale: Locale) {
  return locale === 'pt' ? '/cupons' : `/${locale}/coupons`;
}

// Canonical e hreflang dos 10 idiomas, com x-default no inglês. Usado pelo /cupons e pelo hub de cada idioma.
export function getCouponHubAlternates(locale: Locale) {
  const languages: Record<string, string> = {};
  for (const key of LOCALE_KEYS) {
    languages[LOCALES[key].hreflang] = absoluteUrl(getCouponHubPath(key));
  }
  languages['x-default'] = absoluteUrl(getCouponHubPath('en'));
  return { canonical: getCouponHubPath(locale), languages };
}

export function getCouponHubText(locale: Locale): CouponHubText {
  return locale === 'pt' ? PT_COUPON_HUB_TEXT : COUPON_HUB_COPY[locale];
}

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

// Nome do cartão e textos dos botões nos idiomas de fora; os do PT ficam no CouponCards (PT_CARD_LABELS).
export function getCouponCardLabels(locale: TranslatedLocale): CouponCardLabels {
  const copy = COUPON_STORE_COPY[locale];
  return {
    offerPlural: capitalize(copy.offerTypePlural.link),
    couponType: copy.offerType.code,
    copy: copy.copy,
    copied: copy.copied,
    copyCodeAria: (code) => copy.copyCodeAria(code),
    noCode: copy.noCodeToCopy,
    viewOffer: copy.viewOffer,
    chooseTier: copy.chooseMyTier,
    upTo: COUPON_HUB_COPY[locale].upTo,
    tiersNote: (tiers) => copy.tiersSummary(tiers.length, tiers[0], tiers[tiers.length - 1]),
  };
}

// A YesStyle no hub: o desconto e o código de recompensa vêm da mesma fonte da página da YesStyle. O código
// nunca é chamado de cupom: o tipo dele é o rótulo de recompensa do idioma.
function getYesStyleHubCoupon(locale: TranslatedLocale): Coupon {
  const base = getCouponBySlug('yesstyle');
  const page = getYesStylePage(locale);
  if (!base || !page) throw new Error(`[couponHub] YesStyle sem cupom em PT ou sem textos em "${locale}".`);
  const { newCustomerDiscount } = getPrimaryRewardCode();
  return {
    ...base,
    discount: `${newCustomerDiscount}% OFF`,
    offerTypeLabel: page.rewardCodeLabel,
    shortDescription: COUPON_HUB_COPY[locale].yesstyleNote.replace('{percent}', String(newCustomerDiscount)),
    offerActionLabel: undefined,
    featuredPitch: undefined,
  };
}

// `upTo`: o número do cartão é um teto ("até 5%": a YesStyle dá 5% na 1ª compra e menos nas seguintes). O
// desconto do cupom fica sem a palavra, que o cartão e o nome do item escrevem no idioma da página.
export type CouponHubEntry = { coupon: Coupon; href: string; upTo: boolean };

// A YesStyle primeiro (destaque), depois as lojas traduzidas na ordem de COUPON_TRANSLATIONS.
export function getCouponHubEntries(locale: TranslatedLocale): CouponHubEntry[] {
  const stores = getTranslatedCouponSlugs().flatMap((slug) => {
    const coupon = getLocalizedCoupon(slug, locale);
    return coupon ? [{ coupon, href: getCouponStorePath(slug, locale), upTo: false }] : [];
  });
  return [{ coupon: getYesStyleHubCoupon(locale), href: getYesStyleLocaleConfig(locale).hubPath, upTo: true }, ...stores];
}

export function getCouponHubShelves(locale: TranslatedLocale) {
  const [featured, ...shelf] = getCouponHubEntries(locale);
  return { featured: featured ? [featured] : [], shelf };
}

// A data do mês da oferta é a conferência mais recente entre as lojas que o hub mostra.
export function getCouponHubLastVerified(entries: CouponHubEntry[]): string | undefined {
  return entries
    .map((entry) => entry.coupon.lastVerified)
    .sort()
    .pop();
}

export function getCouponHubItemName({ coupon, upTo }: CouponHubEntry, locale: TranslatedLocale) {
  const copy = COUPON_STORE_COPY[locale];
  const discount = upTo ? `${COUPON_HUB_COPY[locale].upTo} ${coupon.discount}` : coupon.discount;
  if (coupon.offerMode === 'affiliate-link') return copy.offerName.link(discount, coupon.brand);
  return copy.offerName.code({
    discount,
    brand: coupon.brand,
    offerType: coupon.offerTypeLabel ?? copy.offerType.code,
    code: coupon.offerMode === 'discount-code' ? coupon.code : '',
  });
}
