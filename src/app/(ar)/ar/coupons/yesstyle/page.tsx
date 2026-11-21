import { YesStyleCouponPage, getYesStyleMetadata } from '@/components/YesStyleCouponPage';

export function generateMetadata() {
  return getYesStyleMetadata('ar');
}

export default function HubPage() {
  return <YesStyleCouponPage locale="ar" />;
}
