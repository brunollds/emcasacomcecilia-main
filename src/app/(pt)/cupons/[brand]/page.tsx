import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CouponStorePage, getCouponStoreMetadata } from '@/components/coupons/CouponStorePage';
import { COUPONS, getAllActiveCouponSlugs, getCouponBySlug } from '@/lib/couponsData';

export function generateStaticParams() {
  return getAllActiveCouponSlugs().map((brand) => ({ brand }));
}

export const dynamicParams = true;

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
