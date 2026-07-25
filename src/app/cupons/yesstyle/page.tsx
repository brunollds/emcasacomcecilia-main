import { YesStyleCouponPage, getYesStyleMetadata } from '@/components/YesStyleCouponPage';

export function generateMetadata() {
  return getYesStyleMetadata('pt');
}

export default function YesStylePortugueseCouponPage() {
  return <YesStyleCouponPage locale="pt" />;
}
