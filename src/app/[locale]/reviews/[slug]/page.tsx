import { notFound } from 'next/navigation';
import { getReviewSlug, publishedReviews } from '@/lib/data';
import { resolveReviewLocale } from '@/lib/content/review-i18n';
import { LOCALE_KEYS, type Locale } from '@/lib/i18n/locales';
import { generateReviewMetadataBySlug, renderReviewPageBySlug } from '@/components/review/ReviewPageContainer';

type ReviewPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamicParams = false;

function getRouteLocale(locale: string): Locale {
  if (!LOCALE_KEYS.includes(locale as Locale) || locale === 'pt') notFound();
  return locale as Locale;
}

export async function generateMetadata({ params }: ReviewPageProps) {
  const { locale, slug } = await params;
  return generateReviewMetadataBySlug(slug, getRouteLocale(locale));
}

export default async function LocalizedReviewPage({ params }: ReviewPageProps) {
  const { locale, slug } = await params;
  return renderReviewPageBySlug(slug, getRouteLocale(locale));
}

export function generateStaticParams() {
  return publishedReviews.flatMap((review) => {
    const locale = resolveReviewLocale(review.locale);
    return locale === 'pt' ? [] : [{ locale, slug: getReviewSlug(review) }];
  });
}
