import type { Metadata } from 'next';
import CouponBrandPage, { generateMetadata as generateBrandMetadata } from '../[brand]/page';

export const metadata: Metadata = generateBrandMetadata({ params: { brand: 'kopenhagen' } });

export default function KopenhagenCouponPage() {
  return <CouponBrandPage params={{ brand: 'kopenhagen' }} />;
}
