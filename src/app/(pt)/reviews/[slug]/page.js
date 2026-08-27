import { publishedReviews, getReviewSlug } from '@/lib/data';
import { resolveReviewLocale } from '@/lib/content/review-i18n';
import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return generateReviewMetadataBySlug(slug, 'pt');
}

export default async function PtReviewPage({ params }) {
  const { slug } = await params;
  return renderReviewPageBySlug(slug, 'pt');
}

export function generateStaticParams() {
  return publishedReviews
    .filter((review) => resolveReviewLocale(review.locale) === 'pt')
    .map((review) => ({
      slug: getReviewSlug(review),
    }));
}
