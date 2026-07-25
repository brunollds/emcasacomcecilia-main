import { YesStyleCouponPage, getYesStyleMetadata } from '@/components/YesStyleCouponPage';

export function generateMetadata() {
  return getYesStyleMetadata('en');
}

export default function HubPage() {
  return <YesStyleCouponPage locale="en" />;
}
