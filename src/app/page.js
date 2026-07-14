import { Hero } from '@/components/sections/Hero';
import { MainCategories } from '@/components/sections/MainCategories';
import { Categories } from '@/components/sections/Categories';
import { CouponStrip } from '@/components/sections/CouponStrip';
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
        {/* 1. Cupons ativos em faixa compacta */}
        <CouponStrip />

        {/* 2. 4 Cards Retangulares de Categorias Principais */}
        <MainCategories />

        {/* 3. Categorias Minimalistas em linha horizontal */}
        <Categories />

        {/* 4. Hero - Apresentação principal */}
        <Hero />
      </div>

      {/* 5. Reviews & Análises */}
      <ReviewsShowcase />

      {/* 6. Receitas Populares */}
      <PopularRecipes popularSlugs={popularRecipeSlugs} />

      {/* 7. Universo da Cecília */}
      <MyLinks />

      {/* 8. Ofertas */}
      <Offers items={featuredOffers} />

      {/* 9. CTA YouTube */}
      <CTA />
    </div>
  );
}
