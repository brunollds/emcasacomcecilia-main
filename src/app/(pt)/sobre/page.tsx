import type { Metadata } from 'next';
import { AboutView } from '@/components/about/AboutView';
import { couponFontVariables } from '@/components/coupons/CouponBlocks';
import { ABOUT_META, getAboutContent } from '@/lib/aboutPage';
import { publishedReviews, recipes } from '@/lib/data';
import { LOCALES } from '@/lib/i18n/locales';
import { SITE_NAME } from '@/lib/pageSeo';

export const metadata: Metadata = {
  title: ABOUT_META.title,
  description: ABOUT_META.description,
  alternates: { canonical: '/sobre' },
  openGraph: {
    title: ABOUT_META.title,
    description: ABOUT_META.description,
    url: '/sobre',
    siteName: SITE_NAME,
    locale: LOCALES.pt.openGraphLocale,
    type: 'profile',
    images: [ABOUT_META.image],
  },
  // O layout já define título e descrição genéricos no twitter, e o Next não os troca pelos do Open Graph.
  twitter: { card: 'summary_large_image', title: ABOUT_META.title, description: ABOUT_META.description, images: [ABOUT_META.image.url] },
};

export default function SobrePage() {
  return <AboutView content={getAboutContent({ reviews: publishedReviews, recipes })} className={couponFontVariables} />;
}
