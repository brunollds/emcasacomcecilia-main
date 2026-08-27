import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocalizedReviewHub } from '@/components/review/LocalizedReviewHub';
import { publishedReviews } from '@/lib/data';
import { LOCALES, type Locale } from '@/lib/i18n/locales';
import {
  REVIEW_HUB_LOCALES,
  type ReviewHubLocale,
  getPublishedReviewsForLocale,
  getReviewHubCopy,
  getReviewHubPath,
} from '@/lib/review-hubs';

type ReviewHubPageProps = {
  params: Promise<{ locale: string }>;
};

export const dynamicParams = false;

function getRouteLocale(locale: string): ReviewHubLocale {
  if (!REVIEW_HUB_LOCALES.includes(locale as ReviewHubLocale)) notFound();
  return locale as ReviewHubLocale;
}

export function generateStaticParams() {
  return REVIEW_HUB_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: ReviewHubPageProps): Promise<Metadata> {
  const locale = getRouteLocale((await params).locale);
  const copy = getReviewHubCopy(locale);
  const pathname = getReviewHubPath(locale);
  const title = `${copy.title} | Em Casa com Cecília`;

  return {
    title,
    description: copy.description,
    alternates: { canonical: pathname },
    openGraph: {
      title,
      description: copy.description,
      url: pathname,
      locale: LOCALES[locale].openGraphLocale,
      type: 'website',
    },
  };
}

export default async function LocalizedReviewHubPage({ params }: ReviewHubPageProps) {
  const locale = getRouteLocale((await params).locale);

  return (
    <LocalizedReviewHub
      locale={locale}
      reviews={getPublishedReviewsForLocale(locale, publishedReviews)}
    />
  );
}
