import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

export function generateMetadata() {
  return generateReviewMetadataBySlug('is-yesstyle-legit-and-safe-review');
}

export default function TrustArticlePage() {
  return renderReviewPageBySlug('is-yesstyle-legit-and-safe-review');
}
