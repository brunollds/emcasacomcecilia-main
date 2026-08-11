import { YesStyleCouponPage, getYesStyleMetadata } from '@/components/YesStyleCouponPage';

export function generateMetadata() {
  return getYesStyleMetadata('es');
}

export default function HubPage() {
  return <YesStyleCouponPage locale="es" />;
}
