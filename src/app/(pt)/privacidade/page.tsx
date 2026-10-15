import type { Metadata } from 'next';
import { couponFontVariables } from '@/components/coupons/CouponBlocks';
import { PrivacyView } from '@/components/privacy/PrivacyView';
import { LOCALES } from '@/lib/i18n/locales';
import { SITE_NAME } from '@/lib/pageSeo';
import { PRIVACY_META, PRIVACY_SECTIONS } from '@/lib/privacyPage';

export const metadata: Metadata = {
  title: PRIVACY_META.title,
  description: PRIVACY_META.description,
  alternates: { canonical: '/privacidade' },
  openGraph: {
    title: PRIVACY_META.title,
    description: PRIVACY_META.description,
    url: '/privacidade',
    siteName: SITE_NAME,
    locale: LOCALES.pt.openGraphLocale,
    type: 'website',
  },
  // O layout já define título e descrição genéricos no twitter, e o Next não os troca pelos do Open Graph.
  twitter: { title: PRIVACY_META.title, description: PRIVACY_META.description },
};

export default function PrivacidadePage() {
  return <PrivacyView sections={PRIVACY_SECTIONS} className={couponFontVariables} />;
}
