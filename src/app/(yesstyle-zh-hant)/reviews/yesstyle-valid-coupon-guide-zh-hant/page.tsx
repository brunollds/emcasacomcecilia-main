import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

export function generateMetadata() {
  return generateReviewMetadataBySlug('yesstyle-valid-coupon-guide-zh-hant');
}

export default function GuideArticlePage() {
  return renderReviewPageBySlug('yesstyle-valid-coupon-guide-zh-hant');
}
