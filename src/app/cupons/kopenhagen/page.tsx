import CouponBrandPage, { generateMetadata as generateBrandMetadata } from '../[brand]/page';

const params = Promise.resolve({ brand: 'kopenhagen' });

export function generateMetadata() {
  return generateBrandMetadata({ params });
}

export default function KopenhagenCouponPage() {
  return <CouponBrandPage params={params} />;
}
