import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

export function generateMetadata() {
  return generateReviewMetadataBySlug('k-beauty-trend-explained-where-to-buy');
}

export default function KBeautyArticlePage() {
  return renderReviewPageBySlug('k-beauty-trend-explained-where-to-buy');
}
