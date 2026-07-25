import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

export function generateMetadata() {
  return generateReviewMetadataBySlug('yesstyle-valid-coupon-guide-ja');
}

export default function GuideArticlePage() {
  return renderReviewPageBySlug('yesstyle-valid-coupon-guide-ja');
}
