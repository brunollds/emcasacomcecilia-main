import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

export function generateMetadata() {
  return generateReviewMetadataBySlug('es-yesstyle-de-fiar-y-seguro');
}

export default function TrustArticlePage() {
  return renderReviewPageBySlug('es-yesstyle-de-fiar-y-seguro');
}
