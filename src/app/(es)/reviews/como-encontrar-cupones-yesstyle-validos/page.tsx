import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

export function generateMetadata() {
  return generateReviewMetadataBySlug('como-encontrar-cupones-yesstyle-validos');
}

export default function GuideArticlePage() {
  return renderReviewPageBySlug('como-encontrar-cupones-yesstyle-validos');
}
