import { YesStyleCouponPage, getYesStyleMetadata } from '@/components/YesStyleCouponPage';

export function generateMetadata() {
  return getYesStyleMetadata('de');
}

export default function HubPage() {
  return <YesStyleCouponPage locale="de" />;
}
