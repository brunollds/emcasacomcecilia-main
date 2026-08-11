import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

export function generateMetadata() {
  return generateReviewMetadataBySlug('comment-trouver-des-codes-promo-yesstyle-valides');
}

export default function GuideArticlePage() {
  return renderReviewPageBySlug('comment-trouver-des-codes-promo-yesstyle-valides');
}
