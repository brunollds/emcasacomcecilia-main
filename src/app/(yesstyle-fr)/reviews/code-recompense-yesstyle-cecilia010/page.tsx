import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

export function generateMetadata() {
  return generateReviewMetadataBySlug('code-recompense-yesstyle-cecilia010');
}

export default function RewardArticlePage() {
  return renderReviewPageBySlug('code-recompense-yesstyle-cecilia010');
}
