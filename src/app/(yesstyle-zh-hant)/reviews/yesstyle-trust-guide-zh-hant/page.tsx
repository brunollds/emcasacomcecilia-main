import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

export function generateMetadata() {
  return generateReviewMetadataBySlug('yesstyle-trust-guide-zh-hant');
}

export default function TrustArticlePage() {
  return renderReviewPageBySlug('yesstyle-trust-guide-zh-hant');
}
