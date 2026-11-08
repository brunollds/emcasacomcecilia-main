import type { Metadata } from 'next';
import { couponFontVariables } from '@/components/coupons/CouponBlocks';
import { FaqView } from '@/components/faqs/FaqView';
import { FAQ_CATEGORIES, FAQ_META, getFaqAlternates, getFaqPath } from '@/lib/faqPage';
import { LOCALES } from '@/lib/i18n/locales';
import { SITE_NAME } from '@/lib/pageSeo';

export const metadata: Metadata = {
  title: FAQ_META.title,
  description: FAQ_META.description,
  alternates: getFaqAlternates('pt'),
  openGraph: {
    title: FAQ_META.title,
    description: FAQ_META.description,
    url: getFaqPath('pt'),
    siteName: SITE_NAME,
    locale: LOCALES.pt.openGraphLocale,
    type: 'website',
  },
  // O layout já define título e descrição genéricos no twitter, e o Next não os troca pelos do Open Graph.
  twitter: { title: FAQ_META.title, description: FAQ_META.description },
};

export default function FaqsPage() {
  return <FaqView categories={FAQ_CATEGORIES} className={couponFontVariables} />;
}
