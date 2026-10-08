import { HomeStoreStories } from '@/components/sections/HomeStoreStories';
import { HomeCeciliaPanel } from '@/components/sections/HomeCeciliaPanel';
import { couponFontVariables } from '@/components/coupons/CouponBlocks';
import { FeaturedReviewGuides } from '@/components/sections/FeaturedReviewGuides';
import { PopularRecipes } from '@/components/sections/PopularRecipes';
import { MyLinks } from '@/components/sections/MyLinks';
import { HomeEditorialPick } from '@/components/sections/HomeEditorialPick';
import { ReviewsShowcase } from '@/components/sections/ReviewsShowcase';
import { Offers } from '@/components/sections/Offers';
import { CTA } from '@/components/sections/CTA';
import homeCurationConfig from '@/../content/home-curation.json';
import { getHomeStoreTabs } from '@/lib/homeStores';
import { getFeaturedOffers } from '@/lib/dicasOffers';
import { getPopularRecipeSlugs } from '@/lib/popularRecipeStats';
import { publishedReviews } from '@/lib/data';
import {
  getListedPortugueseReviews,
  selectHomeReviewDiscovery,
  sortReviewsByPublishedAt,
  toHomeReviewCard,
} from '@/lib/reviewDiscovery';
import { resolveActiveHomeCuration } from '@/lib/homeCuration';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

const HOME_LOGO_URL = new URL(
  resolveMediaUrl('/images/logos/logo-em-casa-com-cecilia.png'),
  'https://emcasacomcecilia.com'
).toString();

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
        url: HOME_LOGO_URL,
        alt: 'Logo Em Casa com Cecília',
      },
    ],
  },
};

export default async function Home() {
  const activeCuration = resolveActiveHomeCuration(
    homeCurationConfig,
    publishedReviews,
    new Date()
  );
  const discovery = activeCuration
    ? selectHomeReviewDiscovery(publishedReviews, {
        excludedIds: [activeCuration.article.id],
      })
    : selectHomeReviewDiscovery(publishedReviews);
  const featuredReviewGuides = discovery.featured.map(toHomeReviewCard);
  const featuredIds = new Set(discovery.featured.map(({ id }) => id));
  if (activeCuration) {
    featuredIds.add(activeCuration.article.id);
  }
  const carouselReviewGuides = sortReviewsByPublishedAt(
    getListedPortugueseReviews(publishedReviews)
  )
    .filter(({ id }) => !featuredIds.has(id))
    .map(toHomeReviewCard);
  const [featuredOffers, popularRecipeSlugs] = await Promise.all([
    getFeaturedOffers(),
    getPopularRecipeSlugs(),
  ]);
  const activeHomePick = activeCuration
    ? {
        eyebrow: activeCuration.eyebrow,
        article: {
          slug: activeCuration.article.slug,
          title: activeCuration.article.title,
          description: activeCuration.article.description,
          publishedAt: activeCuration.article.publishedAt,
          type: activeCuration.article.type,
          image: activeCuration.article.image,
          imageAlt: activeCuration.article.imageAlt,
          imageFit: activeCuration.article.imageFit,
          imagePosition: activeCuration.article.imagePosition,
        },
      }
    : null;

  return (
    <div className={`${couponFontVariables} min-h-screen bg-[#fef9f3]`}>
      <h1 className="sr-only">Em Casa com Cecília: guias, códigos de desconto e receitas</h1>

      {/* 1. Vitrine: a Cecília e as lojas parceiras */}
      <div className="bg-white pb-8 md:pb-10">
        <HomeStoreStories
          tabs={getHomeStoreTabs(publishedReviews)}
          ceciliaPanel={<HomeCeciliaPanel />}
          ceciliaPhoto={resolveMediaUrl('/images/photos/BRU-1.jpg')}
        />
      </div>

      <div className="bg-[#0f1d3a]">
        {/* 2. Destaques de Guias & Análises (sai na Fase 3, com o Acabou de sair) */}
        <FeaturedReviewGuides items={featuredReviewGuides} />
      </div>

      {/* 3. Atalhos por categoria e publicações recentes */}
      <ReviewsShowcase items={carouselReviewGuides} />

      {activeHomePick ? (
        <HomeEditorialPick item={activeHomePick} />
      ) : null}

      {/* 4. Receitas Populares */}
      <PopularRecipes popularSlugs={popularRecipeSlugs} />

      {/* 5. Universo da Cecília */}
      <MyLinks />

      {/* 6. Ofertas */}
      <Offers items={featuredOffers} />

      {/* 7. CTA YouTube */}
      <CTA />
    </div>
  );
}
