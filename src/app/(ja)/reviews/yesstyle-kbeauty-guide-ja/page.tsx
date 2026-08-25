import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

export function generateMetadata() {
  return generateReviewMetadataBySlug('yesstyle-kbeauty-guide-ja');
}

export default function KBeautyArticlePage() {
  return renderReviewPageBySlug('yesstyle-kbeauty-guide-ja');
}
