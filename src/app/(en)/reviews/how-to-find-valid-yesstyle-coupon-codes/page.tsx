import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

export function generateMetadata() {
  return generateReviewMetadataBySlug('how-to-find-valid-yesstyle-coupon-codes');
}

export default function GuideArticlePage() {
  return renderReviewPageBySlug('how-to-find-valid-yesstyle-coupon-codes');
}
