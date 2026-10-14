import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CouponStorePage, getCouponStoreMetadata } from '@/components/coupons/CouponStorePage';
import { COUPONS, getAllActiveCouponSlugs, getCouponBySlug } from '@/lib/couponsData';

// Loja fora da lista cai no 404 do site (src/app/global-not-found.js), que sai com o HTML completo. Em dev,
// a lista leva também as lojas pausadas, que continuam abrindo para revisão.
export function generateStaticParams() {
  const slugs =
    process.env.NODE_ENV === 'development' ? COUPONS.map((coupon) => coupon.slug) : getAllActiveCouponSlugs();
  return slugs.map((brand) => ({ brand }));
}

export const dynamicParams = false;

type CouponBrandPageProps = {
  params: Promise<{ brand: string }>;
};

// Em dev, cupons pausados continuam abrindo para revisão.
function findCoupon(slug: string) {
  return (
    getCouponBySlug(slug) ??
    (process.env.NODE_ENV === 'development' ? COUPONS.find((item) => item.slug === slug) : undefined)
  );
}

export async function generateMetadata({ params }: CouponBrandPageProps): Promise<Metadata> {
  const coupon = findCoupon((await params).brand);
  return coupon ? getCouponStoreMetadata(coupon, 'pt') : {};
}

export default async function CouponBrandPage({ params }: CouponBrandPageProps) {
  const coupon = findCoupon((await params).brand);
  if (!coupon) notFound();

  return <CouponStorePage coupon={coupon} locale="pt" />;
}
