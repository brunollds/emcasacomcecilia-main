import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

export function generateMetadata() {
  return generateReviewMetadataBySlug('gueltige-yesstyle-gutscheincodes-finden');
}

export default function GuideArticlePage() {
  return renderReviewPageBySlug('gueltige-yesstyle-gutscheincodes-finden');
}
