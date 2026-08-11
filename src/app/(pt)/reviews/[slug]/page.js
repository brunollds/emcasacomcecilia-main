import { publishedReviews, getReviewSlug } from '@/lib/data';
import { YESSTYLE_LOCALES } from '@/lib/i18n/clusters/yesstyle';
import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return generateReviewMetadataBySlug(slug);
}

export default async function PtReviewPage({ params }) {
  const { slug } = await params;
  return renderReviewPageBySlug(slug);
}

export function generateStaticParams() {
  const internationalSlugs = new Set(
    Object.values(YESSTYLE_LOCALES)
      .filter((cfg) => cfg.locale !== 'pt')
      .flatMap((cfg) => cfg.articles
        .filter((article) => article.key === 'reward' || article.key === 'guide')
        .map((article) => article.slug))
  );

  return publishedReviews
    .filter((review) => !internationalSlugs.has(getReviewSlug(review)))
    .map((review) => ({
      slug: getReviewSlug(review),
    }));
}
