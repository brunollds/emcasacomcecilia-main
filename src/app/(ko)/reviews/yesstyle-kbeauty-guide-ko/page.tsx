import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

export function generateMetadata() {
  return generateReviewMetadataBySlug('yesstyle-kbeauty-guide-ko');
}

export default function KBeautyArticlePage() {
  return renderReviewPageBySlug('yesstyle-kbeauty-guide-ko');
}
