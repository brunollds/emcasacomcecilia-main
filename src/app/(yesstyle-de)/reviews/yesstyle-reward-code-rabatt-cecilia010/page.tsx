import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

export function generateMetadata() {
  return generateReviewMetadataBySlug('yesstyle-reward-code-rabatt-cecilia010');
}

export default function RewardArticlePage() {
  return renderReviewPageBySlug('yesstyle-reward-code-rabatt-cecilia010');
}
