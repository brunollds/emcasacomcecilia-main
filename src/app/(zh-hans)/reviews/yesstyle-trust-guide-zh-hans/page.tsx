import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

export function generateMetadata() {
  return generateReviewMetadataBySlug('yesstyle-trust-guide-zh-hans');
}

export default function TrustArticlePage() {
  return renderReviewPageBySlug('yesstyle-trust-guide-zh-hans');
}
