import { YesStyleCouponPage, getYesStyleMetadata } from '@/components/YesStyleCouponPage';

export function generateMetadata() {
  return getYesStyleMetadata('ko');
}

export default function HubPage() {
  return <YesStyleCouponPage locale="ko" />;
}
