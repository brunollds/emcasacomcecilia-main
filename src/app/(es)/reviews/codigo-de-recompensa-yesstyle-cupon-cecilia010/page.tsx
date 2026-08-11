import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

export function generateMetadata() {
  return generateReviewMetadataBySlug('codigo-de-recompensa-yesstyle-cupon-cecilia010');
}

export default function RewardArticlePage() {
  return renderReviewPageBySlug('codigo-de-recompensa-yesstyle-cupon-cecilia010');
}
