import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

export function generateMetadata() {
  return generateReviewMetadataBySlug('k-beauty-tendance-beaute-coreenne');
}

export default function KBeautyArticlePage() {
  return renderReviewPageBySlug('k-beauty-tendance-beaute-coreenne');
}
