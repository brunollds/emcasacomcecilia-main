import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { couponFontVariables } from '@/components/coupons/CouponBlocks';
import { LocaleHomePage } from '@/components/sections/LocaleHomePage';
import { publishedReviews } from '@/lib/data';
import { LOCALES } from '@/lib/i18n/locales';
import {
  LOCALE_HOME_LOCALES,
  getHomeLanguageLinks,
  getLocaleHomeContent,
  type LocaleHomeLocale,
} from '@/lib/localeHome';
import { SITE_NAME } from '@/lib/pageSeo';

type LocaleHomeRouteProps = {
  params: Promise<{ locale: string }>;
};

export const dynamicParams = false;

function getRouteLocale(locale: string): LocaleHomeLocale {
  if (!LOCALE_HOME_LOCALES.includes(locale as LocaleHomeLocale)) notFound();
  return locale as LocaleHomeLocale;
}

export function generateStaticParams() {
  return LOCALE_HOME_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleHomeRouteProps): Promise<Metadata> {
  const locale = getRouteLocale((await params).locale);
  const { path, meta, hero } = getLocaleHomeContent(locale, publishedReviews);

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: path, languages: getHomeLanguageLinks() },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: path,
      locale: LOCALES[locale].openGraphLocale,
      siteName: SITE_NAME,
      type: 'website',
      images: [{ url: hero.photoUrl, alt: hero.photo.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [hero.photoUrl],
    },
  };
}

export default async function LocaleHomeRoute({ params }: LocaleHomeRouteProps) {
  const locale = getRouteLocale((await params).locale);
  return <LocaleHomePage content={getLocaleHomeContent(locale, publishedReviews)} className={couponFontVariables} />;
}
