import type { Metadata } from 'next';
import { couponFontVariables } from '@/components/coupons/CouponBlocks';
import { SHELF_CONTAINER } from '@/components/reviews/shelfClasses';
import { PageTrail } from '@/components/ui/PageTrail';
import { VideoChannelRow } from '@/components/videos/VideoChannelRow';
import { VideoFeatured } from '@/components/videos/VideoFeatured';
import { VideosBrowser } from '@/components/videos/VideosBrowser';
import { publishedReviews, recipes } from '@/lib/data';
import { LOCALES } from '@/lib/i18n/locales';
import { serializeJsonLd } from '@/lib/jsonLd';
import { SITE_NAME, getCollectionPageJsonLd } from '@/lib/pageSeo';
import { VIDEOS_TRAIL, getVideosHubContent } from '@/lib/videosHub';
import { getYoutubeHighlights } from '@/lib/youtube';

// Os vídeos do site em duas camadas: em cima os que têm página própria (o destaque e a grade com os chips das
// lojas), que levam ao guia e à loja; embaixo os últimos do canal, com o "Inscrever-se no canal". Os dados
// saem prontos do servidor (videosHub.ts); o canal vem da API do YouTube, renovada a cada hora, e some sem ela.

const TITLE = 'Vídeos - Em Casa com Cecília';
const DESCRIPTION = 'Assista aos vídeos de receitas, reviews e demonstrações publicados pelo Em Casa com Cecília.';
const SHARE_DESCRIPTION = 'Receitas, reviews e demonstrações em vídeo.';

const content = getVideosHubContent({ reviews: publishedReviews, recipes });

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/videos' },
  openGraph: {
    title: TITLE,
    description: SHARE_DESCRIPTION,
    url: '/videos',
    siteName: SITE_NAME,
    locale: LOCALES.pt.openGraphLocale,
    type: 'website',
    images: [content.socialImage],
  },
  // O layout já define título e descrição genéricos no twitter, e o Next não os troca pelos do Open Graph.
  twitter: { card: 'summary_large_image', title: TITLE, description: SHARE_DESCRIPTION, images: [content.socialImage.url] },
};

export default async function VideosPage() {
  const highlights = await getYoutubeHighlights();
  const page = VIDEOS_TRAIL[VIDEOS_TRAIL.length - 1];
  const jsonLd = getCollectionPageJsonLd({
    name: page.name,
    description: DESCRIPTION,
    path: page.path,
    items: content.videos.map((video) => ({ name: video.title, path: video.href })),
    breadcrumb: VIDEOS_TRAIL.slice(0, -1),
  });

  return (
    <main className={`${couponFontVariables} min-h-screen bg-white text-marinho`}>
      {jsonLd.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      ))}
      <header className={`${SHELF_CONTAINER} pt-8 pb-6 md:pt-12 md:pb-10`}>
        <PageTrail trail={VIDEOS_TRAIL} />
        <h1 className="font-condensada text-[44px] leading-none font-black text-marinho font-stretch-extra-condensed md:text-7xl">
          <span className="marca-texto marca-texto-entra">Vídeos</span>
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed font-medium text-marinho-suave md:text-lg">{content.intro}</p>
      </header>
      <VideoFeatured video={content.featured} />
      <VideosBrowser videos={content.videos} stores={content.stores} />
      <VideoChannelRow highlights={highlights} />
    </main>
  );
}
