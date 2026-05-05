import type { Metadata } from 'next';
import CouponBrandPage, { generateMetadata as generateBrandMetadata } from '../[brand]/page';

export const metadata: Metadata = generateBrandMetadata({ params: { brand: 'damie' } });

export default function DamieCouponPage() {
  return <CouponBrandPage params={{ brand: 'damie' }} />;
}
