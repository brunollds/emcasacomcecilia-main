import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

export function generateMetadata() {
  return generateReviewMetadataBySlug('yesstyle-est-il-fiable-et-sur');
}

export default function TrustArticlePage() {
  return renderReviewPageBySlug('yesstyle-est-il-fiable-et-sur');
}
