import { Hero } from '@/components/sections/Hero';
import { CouponStrip } from '@/components/sections/CouponStrip';
import { FeaturedReviewGuides } from '@/components/sections/FeaturedReviewGuides';
import { PopularRecipes } from '@/components/sections/PopularRecipes';
import { MyLinks } from '@/components/sections/MyLinks';
import { ReviewsShowcase } from '@/components/sections/ReviewsShowcase';
import { Offers } from '@/components/sections/Offers';
import { CTA } from '@/components/sections/CTA';
import { getFeaturedOffers } from '@/lib/dicasOffers';
import { getPopularRecipeSlugs } from '@/lib/popularRecipeStats';
import { publishedReviews } from '@/lib/data';
import {
  getListedPortugueseReviews,
  selectHomeReviewDiscovery,
  sortReviewsByPublishedAt,
  toHomeReviewCard,
} from '@/lib/reviewDiscovery';

export const revalidate = 300;

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
  const discovery = selectHomeReviewDiscovery(publishedReviews);
  const featuredReviewGuides = discovery.featured.map(toHomeReviewCard);
  const featuredIds = new Set(discovery.featured.map(({ id }) => id));
  const carouselReviewGuides = sortReviewsByPublishedAt(
    getListedPortugueseReviews(publishedReviews)
  )
    .filter(({ id }) => !featuredIds.has(id))
    .map(toHomeReviewCard);
  const [featuredOffers, popularRecipeSlugs] = await Promise.all([
    getFeaturedOffers(),
    getPopularRecipeSlugs(),
  ]);

  return (
    <div className="min-h-screen bg-[#fef9f3]">
      <div className="bg-[#0f1d3a]">
        {/* 1. Cupons ativos em faixa compacta */}
        <CouponStrip />

        {/* 2. Hero - Apresentação principal */}
        <Hero />

        {/* 3. Destaques de Guias & Análises */}
        <FeaturedReviewGuides items={featuredReviewGuides} />
      </div>

      {/* 4. Atalhos por categoria e publicações recentes */}
      <ReviewsShowcase items={carouselReviewGuides} />

      {/* 5. Receitas Populares */}
      <PopularRecipes popularSlugs={popularRecipeSlugs} />

      {/* 6. Universo da Cecília */}
      <MyLinks />

      {/* 7. Ofertas */}
      <Offers items={featuredOffers} />

      {/* 8. CTA YouTube */}
      <CTA />
    </div>
  );
}
