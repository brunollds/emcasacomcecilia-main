import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { couponFontVariables } from '@/components/coupons/CouponBlocks';
import { SHELF_CONTAINER } from '@/components/reviews/shelfClasses';
import { HomeSection } from '@/components/sections/HomeSection';
import { PageTrail } from '@/components/ui/PageTrail';
import { VideoChannelStrip } from '@/components/videos/VideoChannelRow';
import { VideoPlayer } from '@/components/videos/VideoPlayer';
import { VideoRow } from '@/components/videos/VideoRow';
import { VideoSourceCard } from '@/components/videos/VideoSourceCard';
import { publishedReviews, recipes } from '@/lib/data';
import { serializeJsonLd } from '@/lib/jsonLd';
import { absoluteUrl, getBreadcrumbListJsonLd } from '@/lib/pageSeo';
import { buildLocalVideoObject, buildYoutubeVideoObject } from '@/lib/video-schema';
import { getVideoPageBySlug, videoPages } from '@/lib/video-pages';
import { getVideoPageContent } from '@/lib/videosHub';
import { toVideoCard } from '@/lib/videosShelf';

// A página de exibição de um vídeo (docs/GUIA-EDITORIAL-VIDEOS.md, seção 6): a trilha, o h1 igual ao name do
// VideoObject, o player no formato do vídeo logo depois do h1, o painel (Sobre este vídeo, a origem com o
// botão da loja e o canal) e "Mais vídeos". Existe para o Google indexar o vídeo: o VideoObject, o canonical e
// o sitemap de vídeo não mudam.

export const dynamicParams = false;

type VideoPageProps = {
  params: Promise<{ slug: string }>;
};

const sources = { reviews: publishedReviews, recipes };

export function generateStaticParams() {
  return videoPages.map((video) => ({ slug: video.slug }));
}

export async function generateMetadata({ params }: VideoPageProps): Promise<Metadata> {
  const content = getVideoPageContent(sources, (await params).slug);
  if (!content) return { title: 'Vídeo não encontrado' };
  const { video } = content;
  const canonical = absoluteUrl(video.href);

  return {
    title: `${video.title} - Em Casa com Cecília`,
    description: video.description,
    alternates: { canonical },
    openGraph: {
      title: video.title,
      description: video.description,
      url: canonical,
      type: 'video.other',
      images: [{ url: video.thumbnail, alt: video.title }],
      videos: video.player.kind === 'local' ? [{ url: video.player.contentUrl }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: video.title,
      description: video.description,
      images: [video.thumbnail],
    },
  };
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { slug } = await params;
  const content = getVideoPageContent(sources, slug);
  const record = getVideoPageBySlug(slug);
  if (!content || !record) notFound();
  const { video, trail, more } = content;

  const videoObject =
    record.kind === 'youtube'
      ? buildYoutubeVideoObject({
          url: record.youtubeUrl,
          title: record.title,
          description: record.description,
          thumbnailUrl: record.thumbnailUrl,
          uploadDate: record.uploadDate,
          duration: record.duration,
        })
      : buildLocalVideoObject(record);
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      ...videoObject,
      '@id': `${record.canonicalUrl}#video`,
      mainEntityOfPage: record.canonicalUrl,
    },
    getBreadcrumbListJsonLd(trail),
  ];

  return (
    <main className={`${couponFontVariables} min-h-screen bg-white text-marinho`}>
      {jsonLd.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      ))}
      <article className={`${SHELF_CONTAINER} pt-8 pb-10 md:pt-12 md:pb-14`}>
        <PageTrail trail={trail} />
        <h1 className="mb-6 font-condensada text-[32px] leading-[1.05] font-black text-marinho font-stretch-extra-condensed md:mb-8 md:text-5xl">
          <span className="marca-texto marca-texto-entra">{video.title}</span>
        </h1>
        <div
          className={
            video.aspect === 'horizontal'
              ? 'flex flex-col gap-6 md:gap-8'
              : 'flex flex-col gap-6 md:gap-8 lg:grid lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start lg:gap-10'
          }
        >
          <VideoPlayer video={video} />
          <div className={`flex min-w-0 flex-col gap-5 ${video.aspect === 'horizontal' ? 'max-w-3xl' : ''}`}>
            <section aria-labelledby="titulo-sobre">
              <h2 id="titulo-sobre" className="text-xl font-extrabold text-marinho">
                Sobre este vídeo
              </h2>
              <p className="mt-1 flex flex-wrap gap-x-4 text-sm font-bold text-marinho-suave">
                <span>
                  Publicado em <time dateTime={video.uploadDate}>{video.dateLabel}</time>
                </span>
                {video.duration ? <span>{`Duração: ${video.duration.text}`}</span> : null}
              </p>
              <p className="mt-3 text-base leading-relaxed whitespace-pre-line text-marinho">{video.description}</p>
            </section>
            <VideoSourceCard video={video} />
            <VideoChannelStrip context="video" />
          </div>
        </div>
      </article>
      {more.videos.length > 0 ? (
        <HomeSection id="titulo-mais-videos" title={more.title} className="pb-12 md:pb-16">
          <VideoRow videos={more.videos.map(toVideoCard)} placement="video_more" desktopGrid={false} />
        </HomeSection>
      ) : null}
    </main>
  );
}
