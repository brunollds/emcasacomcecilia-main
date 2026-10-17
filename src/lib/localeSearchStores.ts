import { resolveYesStylePage } from '@/components/coupons/yesstylePage';
import { getCouponBySlug } from '@/lib/couponsData';
import { getCouponStorePath, getLocalizedCoupon, getTranslatedCouponRoutes, type TranslatedLocale } from '@/lib/couponTranslations';
import { getYesStyleLocaleConfig } from '@/lib/i18n/clusters/yesstyle';

export interface LocaleSearchStore {
  slug: string;
  name: string;
  href: string;
  title: string;
  description: string;
}

// As páginas de loja de um idioma, para o índice de busca dele: as traduzidas de couponTranslations e a
// da YesStyle. Título e descrição são os do <title> e da description de cada página, no idioma.
// Só o build (scripts/content/build-index.mjs) usa: nada 'use client' importa este módulo.
export function getLocaleSearchStores(locale: TranslatedLocale): LocaleSearchStore[] {
  const translated = getTranslatedCouponRoutes()
    .filter((route) => route.locale === locale)
    .map(({ slug }): LocaleSearchStore => {
      const coupon = getLocalizedCoupon(slug, locale);
      return {
        slug,
        name: coupon.brand,
        href: getCouponStorePath(slug, locale),
        title: coupon.metaTitle,
        description: coupon.metaDescription,
      };
    });

  const yesStyle = resolveYesStylePage(locale);
  if (!yesStyle) return translated;

  return [
    ...translated,
    {
      slug: 'yesstyle',
      name: getCouponBySlug('yesstyle')?.brand ?? 'YesStyle',
      href: getYesStyleLocaleConfig(locale).hubPath,
      title: yesStyle.title,
      description: yesStyle.description,
    },
  ];
}
