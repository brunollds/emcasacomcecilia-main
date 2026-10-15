import { Suspense } from 'react';
import { couponFontVariables } from '@/components/coupons/CouponBlocks';
import { PageHeader } from '@/components/ui/PageHeader';
import { recipes } from '@/lib/data';
import { toListedRecipe } from '@/lib/recipeList';
import ReceitasClientPage from './ReceitasClientPage';

const RECIPES_TRAIL = [
  { name: 'Início', path: '/' },
  { name: 'Receitas', path: '/receitas' },
];

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

// O topo (trilha, título e introdução) é servidor e fica fora do Suspense: o HTML estático já o traz.
export default function ReceitasPage() {
  return (
    <main className={`${couponFontVariables} min-h-screen bg-creme text-marinho`}>
      <PageHeader
        trail={RECIPES_TRAIL}
        title="Receitas"
        intro="Receitas de casa, com passo a passo e ingredientes fáceis de achar."
      />
      <Suspense fallback={<div className="min-h-screen" />}>
        <ReceitasClientPage recipes={recipes.map(toListedRecipe)} />
      </Suspense>
    </main>
  );
}
