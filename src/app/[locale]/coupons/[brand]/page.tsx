import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CouponStorePage, getCouponStoreMetadata } from '@/components/coupons/CouponStorePage';
import { getLocalizedCoupon, getTranslatedCouponRoutes, isTranslatedLocale } from '@/lib/couponTranslations';

type LocalizedCouponPageProps = {
  params: Promise<{ locale: string; brand: string }>;
};

// /en/coupons/yesstyle e as outras páginas da YesStyle vêm das rotas estáticas dos grupos (en),
// (es)..., que vencem esta rota dinâmica; aqui só entram as lojas de couponTranslations.
export const dynamicParams = false;

export function generateStaticParams() {
  return getTranslatedCouponRoutes().map(({ locale, slug }) => ({ locale, brand: slug }));
}

async function findCoupon(params: LocalizedCouponPageProps['params']) {
  const { locale, brand } = await params;
  if (!isTranslatedLocale(locale)) return null;
  const coupon = getLocalizedCoupon(brand, locale);
  return coupon ? { coupon, locale } : null;
}

export async function generateMetadata({ params }: LocalizedCouponPageProps): Promise<Metadata> {
  const found = await findCoupon(params);
  return found ? getCouponStoreMetadata(found.coupon, found.locale) : {};
}

export default async function LocalizedCouponPage({ params }: LocalizedCouponPageProps) {
  const found = await findCoupon(params);
  if (!found) notFound();

  return <CouponStorePage coupon={found.coupon} locale={found.locale} />;
}
