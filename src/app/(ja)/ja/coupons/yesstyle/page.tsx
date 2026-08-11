import { YesStyleCouponPage, getYesStyleMetadata } from '@/components/YesStyleCouponPage';

export function generateMetadata() {
  return getYesStyleMetadata('ja');
}

export default function HubPage() {
  return <YesStyleCouponPage locale="ja" />;
}
