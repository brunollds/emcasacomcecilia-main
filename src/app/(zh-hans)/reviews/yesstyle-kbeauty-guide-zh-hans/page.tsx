import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

export function generateMetadata() {
  return generateReviewMetadataBySlug('yesstyle-kbeauty-guide-zh-hans');
}

export default function KBeautyArticlePage() {
  return renderReviewPageBySlug('yesstyle-kbeauty-guide-zh-hans');
}
