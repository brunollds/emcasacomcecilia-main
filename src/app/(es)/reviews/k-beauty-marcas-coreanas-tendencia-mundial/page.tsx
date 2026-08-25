import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

export function generateMetadata() {
  return generateReviewMetadataBySlug('k-beauty-marcas-coreanas-tendencia-mundial');
}

export default function KBeautyArticlePage() {
  return renderReviewPageBySlug('k-beauty-marcas-coreanas-tendencia-mundial');
}
