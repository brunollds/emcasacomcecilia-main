import CouponBrandPage, { generateMetadata as generateBrandMetadata } from '../[brand]/page';

const params = Promise.resolve({ brand: 'damie' });

export function generateMetadata() {
  return generateBrandMetadata({ params });
}

export default function DamieCouponPage() {
  return <CouponBrandPage params={params} />;
}
