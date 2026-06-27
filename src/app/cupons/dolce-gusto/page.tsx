import CouponBrandPage, { generateMetadata as generateBrandMetadata } from '../[brand]/page';

const params = Promise.resolve({ brand: 'dolce-gusto' });

export function generateMetadata() {
  return generateBrandMetadata({ params });
}

export default function DolceGustoCouponPage() {
  return <CouponBrandPage params={params} />;
}
