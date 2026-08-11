import { YesStyleCouponPage, getYesStyleMetadata } from '@/components/YesStyleCouponPage';

export function generateMetadata() {
  return getYesStyleMetadata('fr');
}

export default function HubPage() {
  return <YesStyleCouponPage locale="fr" />;
}
