import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

export function generateMetadata() {
  return generateReviewMetadataBySlug('yesstyle-reward-code-cecilia010-ja');
}

export default function RewardArticlePage() {
  return renderReviewPageBySlug('yesstyle-reward-code-cecilia010-ja');
}
