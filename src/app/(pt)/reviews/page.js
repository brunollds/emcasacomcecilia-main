import { Suspense } from 'react';
import ReviewsClientPage from './ReviewsClientPage';

export const metadata = {
  title: 'Reviews & Análises - Em Casa com Cecília',
  description: 'Reviews sinceros de produtos, eletrodomésticos e ingredientes testados na cozinha. Descubra o que realmente vale a pena!',
  alternates: {
    canonical: '/reviews',
  },
  openGraph: {
    title: 'Reviews & Análises - Em Casa com Cecília',
    description: 'Produtos testados de verdade, análises sinceras e guias úteis para casa e cozinha.',
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
