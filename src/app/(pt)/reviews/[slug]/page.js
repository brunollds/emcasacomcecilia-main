import { publishedReviews, getReviewSlug } from '@/lib/data';
import { YESSTYLE_LOCALES } from '@/lib/i18n/yesstyleCluster';
import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

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
      .flatMap((cfg) => [cfg.rewardArticleSlug, cfg.guideSlug])
  );

  return publishedReviews
    .filter((review) => !internationalSlugs.has(getReviewSlug(review)))
    .map((review) => ({
      slug: getReviewSlug(review),
    }));
}
