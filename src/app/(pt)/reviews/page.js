import { Suspense } from 'react';
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
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fef9f3]" />}>
      <ReviewsClientPage />
    </Suspense>
  );
}
