import type { Metadata } from 'next';
import CouponBrandPage, { generateMetadata as generateBrandMetadata } from '../[brand]/page';

export const metadata: Metadata = generateBrandMetadata({ params: { brand: 'yesstyle' } });

export default function YesStyleCouponPage() {
  return <CouponBrandPage params={{ brand: 'yesstyle' }} />;
}
