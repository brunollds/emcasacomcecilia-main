import { YesStyleCouponPage, getYesStyleMetadata } from '@/components/YesStyleCouponPage';

export function generateMetadata() {
  return getYesStyleMetadata('zh-hans');
}

export default function HubPage() {
  return <YesStyleCouponPage locale="zh-hans" />;
}
