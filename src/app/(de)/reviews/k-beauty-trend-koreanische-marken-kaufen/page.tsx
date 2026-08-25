import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

export function generateMetadata() {
  return generateReviewMetadataBySlug('k-beauty-trend-koreanische-marken-kaufen');
}

export default function KBeautyArticlePage() {
  return renderReviewPageBySlug('k-beauty-trend-koreanische-marken-kaufen');
}
