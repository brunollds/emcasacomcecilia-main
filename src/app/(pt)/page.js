import { HomeStoreStories } from '@/components/sections/HomeStoreStories';
import { HomeCeciliaPanel } from '@/components/sections/HomeCeciliaPanel';
import { HomeLatest } from '@/components/sections/HomeLatest';
import { HomeEvent } from '@/components/sections/HomeEvent';
import { couponFontVariables } from '@/components/coupons/CouponBlocks';
import { PopularRecipes } from '@/components/sections/PopularRecipes';
import { MyLinks } from '@/components/sections/MyLinks';
import { CTA } from '@/components/sections/CTA';
import homeEventsConfig from '@/../content/home-events.json';
import { CECILIA_PHOTO, getHomeLatest, getHomeStoreTabs } from '@/lib/homeStores';
import { getFeaturedOffers } from '@/lib/dicasOffers';
import { getPopularRecipeSlugs } from '@/lib/popularRecipeStats';
import { publishedReviews } from '@/lib/data';
import { resolveActiveHomeEvent } from '@/lib/homeEvents';
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
  const activeEvent = resolveActiveHomeEvent(homeEventsConfig, publishedReviews, new Date());
  const [featuredOffers, popularRecipeSlugs] = await Promise.all([
    getFeaturedOffers(),
    getPopularRecipeSlugs(),
  ]);

  // As seções de cima ganham aqui o espaço de baixo; as de baixo trazem o delas.
  return (
    <div className={`${couponFontVariables} min-h-screen bg-white`}>
      <h1 className="sr-only">Em Casa com Cecília: guias, códigos de desconto e receitas</h1>

      {/* Vitrine: a Cecília e as lojas parceiras */}
      <div className="pb-8 md:pb-10">
        <HomeStoreStories
          tabs={getHomeStoreTabs(publishedReviews)}
          ceciliaPanel={<HomeCeciliaPanel />}
          ceciliaPhoto={CECILIA_PHOTO}
        />
      </div>

      {/* Acabou de sair: os 5 artigos mais novos */}
      <div className="pb-8 md:pb-10">
        <HomeLatest articles={getHomeLatest(publishedReviews)} />
      </div>

      {/* Data comercial: só durante uma campanha (content/home-events.json) */}
      {activeEvent ? (
        <div className="pb-8 md:pb-10">
          <HomeEvent event={activeEvent} />
        </div>
      ) : null}

      {/* Receitas da Cecília */}
      <PopularRecipes popularSlugs={popularRecipeSlugs} />

      {/* Explore a casa, com as ofertas do dia no card do Dicas & Ofertas */}
      <MyLinks offers={featuredOffers} />

      {/* Últimos vídeos: só aparece com vídeo */}
      <CTA />
    </div>
  );
}
