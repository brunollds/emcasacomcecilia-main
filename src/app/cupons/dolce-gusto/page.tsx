import type { Metadata } from 'next';
import CouponBrandPage, { generateMetadata as generateBrandMetadata } from '../[brand]/page';

export const metadata: Metadata = generateBrandMetadata({ params: { brand: 'dolce-gusto' } });

export default function DolceGustoCouponPage() {
  return <CouponBrandPage params={{ brand: 'dolce-gusto' }} />;
}
