import { publishedReviews } from '@/lib/data';
import {
  getListedPortugueseReviews,
  sortReviewsByPublishedAt,
  toHomeReviewCard,
} from '@/lib/reviewDiscovery';
import ReviewsClientPage from './ReviewsClientPage';

export const metadata = {
  title: 'Guias & Análises - Em Casa com Cecília',
  description: 'Guias práticos, análises de produtos, reputação de marcas e instruções de compra para ajudar você a decidir com mais contexto.',
  alternates: {
    canonical: '/reviews',
  },
  openGraph: {
    title: 'Guias & Análises - Em Casa com Cecília',
    description: 'Guias práticos, análises de produtos, reputação de marcas e instruções de compra para decisões com mais contexto.',
    url: '/reviews',
    type: 'website',
  },
};

export default function ReviewsPage() {
  const listed = sortReviewsByPublishedAt(
    getListedPortugueseReviews(publishedReviews)
  ).map(toHomeReviewCard);
  // Os marcados como "Novo" vêm primeiro; dentro de cada grupo vale a data.
  const reviews = [
    ...listed.filter((review) => review.isNew),
    ...listed.filter((review) => !review.isNew),
  ];

  return <ReviewsClientPage reviews={reviews} />;
}
