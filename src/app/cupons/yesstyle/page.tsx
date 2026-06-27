import CouponBrandPage, { generateMetadata as generateBrandMetadata } from '../[brand]/page';

const params = Promise.resolve({ brand: 'yesstyle' });

export function generateMetadata() {
  return generateBrandMetadata({ params });
}

export default function YesStyleCouponPage() {
  return <CouponBrandPage params={params} />;
}
