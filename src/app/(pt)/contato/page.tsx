import type { Metadata } from 'next';
import { ContactView } from '@/components/contact/ContactView';
import { couponFontVariables } from '@/components/coupons/CouponBlocks';
import { CONTACT_META } from '@/lib/contactPage';
import { LOCALES } from '@/lib/i18n/locales';
import { SITE_NAME } from '@/lib/pageSeo';

export const metadata: Metadata = {
  title: CONTACT_META.title,
  description: CONTACT_META.description,
  alternates: { canonical: '/contato' },
  openGraph: {
    title: CONTACT_META.title,
    description: CONTACT_META.description,
    url: '/contato',
    siteName: SITE_NAME,
    locale: LOCALES.pt.openGraphLocale,
    type: 'website',
  },
  // O layout já define título e descrição genéricos no twitter, e o Next não os troca pelos do Open Graph.
  twitter: { title: CONTACT_META.title, description: CONTACT_META.description },
};

export default function ContatoPage() {
  return <ContactView className={couponFontVariables} />;
}
