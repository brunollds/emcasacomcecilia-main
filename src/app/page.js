import { Hero } from '@/components/sections/Hero';
import { MainCategories } from '@/components/sections/MainCategories';
import { Categories } from '@/components/sections/Categories';
import { PopularRecipes } from '@/components/sections/PopularRecipes';
import { MyLinks } from '@/components/sections/MyLinks';
import { ReviewsShowcase } from '@/components/sections/ReviewsShowcase';
import { Offers } from '@/components/sections/Offers';
import { CTA } from '@/components/sections/CTA';
import { getFeaturedOffers } from '@/lib/dicasOffers';
import { getPopularRecipeSlugs } from '@/lib/popularRecipeStats';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Em Casa com Cecília - Receitas Práticas e Deliciosas',
  description: 'Receitas fáceis que dão certo, reviews sinceros, dicas de casa e vídeos da Cecília para deixar a rotina mais prática e gostosa.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Em Casa com Cecília - Receitas Práticas e Deliciosas',
    description: 'Receitas fáceis que dão certo, reviews sinceros e dicas para a rotina da casa.',
    url: '/',
    type: 'website',
    images: [
      {
        url: '/images/logos/logo-em-casa-com-cecilia.png',
        alt: 'Logo Em Casa com Cecília',
      },
    ],
  },
};

export default async function Home() {
  const [featuredOffers, popularRecipeSlugs] = await Promise.all([
    getFeaturedOffers(),
    getPopularRecipeSlugs(),
  ]);

  return (
    <div className="min-h-screen bg-[#fef9f3]">
      <div className="bg-[#0f1d3a]">
        {/* 1. 4 Cards Retangulares de Categorias Principais */}
        <MainCategories />

        {/* 2. Categorias Minimalistas em linha horizontal */}
        <Categories />

        {/* 3. Hero - Apresentação principal */}
        <Hero />
      </div>

      {/* 4. Receitas Populares e Novas */}
      <PopularRecipes popularSlugs={popularRecipeSlugs} />

      {/* 5. Reviews & Análises */}
      <ReviewsShowcase />

      {/* 6. Universo da Cecília */}
      <MyLinks />

      {/* 7. Ofertas */}
      <Offers items={featuredOffers} />

      {/* 8. CTA YouTube */}
      <CTA />
    </div>
  );
}
