import { Suspense } from 'react';
import ReceitasClientPage from './ReceitasClientPage';

export const metadata = {
  title: 'Receitas - Em Casa com Cecília',
  description: 'Explore receitas por categoria, dificuldade, tempo de preparo e descubra novas ideias para o dia a dia.',
  alternates: {
    canonical: '/receitas',
  },
  openGraph: {
    title: 'Receitas - Em Casa com Cecília',
    description: 'Receitas fáceis que dão certo para café da manhã, almoço, jantar, sobremesas e ocasiões especiais.',
    url: '/receitas',
    type: 'website',
  },
};

export default function ReceitasPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fef9f3]" />}>
      <ReceitasClientPage />
    </Suspense>
  );
}
