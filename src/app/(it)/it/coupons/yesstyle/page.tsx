import { YesStyleCouponPage, getYesStyleMetadata } from '@/components/YesStyleCouponPage';

export function generateMetadata() {
  return getYesStyleMetadata('it');
}

export default function HubPage() {
  return <YesStyleCouponPage locale="it" />;
}
