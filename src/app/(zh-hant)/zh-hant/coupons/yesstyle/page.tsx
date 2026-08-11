import { YesStyleCouponPage, getYesStyleMetadata } from '@/components/YesStyleCouponPage';

export function generateMetadata() {
  return getYesStyleMetadata('zh-hant');
}

export default function HubPage() {
  return <YesStyleCouponPage locale="zh-hant" />;
}
