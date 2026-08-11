import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

export function generateMetadata() {
  return generateReviewMetadataBySlug('ist-yesstyle-serioes-und-sicher');
}

export default function TrustArticlePage() {
  return renderReviewPageBySlug('ist-yesstyle-serioes-und-sicher');
}
