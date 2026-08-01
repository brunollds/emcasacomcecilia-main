import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { buildLocalVideoObject, buildYoutubeVideoObject } from '@/lib/video-schema';
import { getVideoPageBySlug, videoPages } from '@/lib/video-pages';

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const video = getVideoPageBySlug(slug);
  if (!video) return { title: 'Vídeo não encontrado' };

  return {
    title: `${video.title} - Em Casa com Cecília`,
    description: video.description,
    alternates: {
      canonical: video.canonicalUrl,
    },
    openGraph: {
      title: video.title,
      description: video.description,
      url: video.canonicalUrl,
      type: 'video.other',
      images: [{ url: video.thumbnailUrl, alt: video.title }],
      videos: video.kind === 'local' ? [{ url: video.contentUrl }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: video.title,
      description: video.description,
      images: [video.thumbnailUrl],
    },
  };
}

export default async function VideoPage({ params }) {
  const { slug } = await params;
  const video = getVideoPageBySlug(slug);
  if (!video) notFound();

  const videoObject = video.kind === 'youtube'
    ? buildYoutubeVideoObject({ url: video.youtubeUrl })
    : buildLocalVideoObject(video);
  const jsonLd = {
    '@context': 'https://schema.org',
    ...videoObject,
    '@id': `${video.canonicalUrl}#video`,
    mainEntityOfPage: video.canonicalUrl,
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://emcasacomcecilia.com' },
      { '@type': 'ListItem', position: 2, name: 'Vídeos', item: 'https://emcasacomcecilia.com/videos' },
      { '@type': 'ListItem', position: 3, name: video.title, item: video.canonicalUrl },
    ],
  };

  return (
    <main className="min-h-screen bg-[#faf8f3] px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="mx-auto max-w-6xl">
        <Link
          href="/videos"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#1a4d2e] hover:text-[#ff6b35]"
        >
          <ArrowLeft size={17} aria-hidden="true" /> Todos os vídeos
        </Link>

        <header className="mb-6 max-w-5xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#ff6b35]">
            Vídeo
          </p>
          <h1 className="font-editorial text-3xl font-bold leading-tight text-[#1a4d2e] sm:text-4xl lg:text-5xl">
            {video.title}
          </h1>
        </header>

        <section aria-label={`Player do vídeo: ${video.title}`}>
          <div
            className={`overflow-hidden rounded-2xl bg-black shadow-xl ring-1 ring-black/10 ${
              video.kind === 'local' ? 'mx-auto aspect-square max-w-3xl' : 'aspect-video w-full'
            }`}
          >
            {video.kind === 'youtube' ? (
              <iframe
                src={video.embedUrl}
                title={video.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <video
                controls
                preload="metadata"
                poster={video.thumbnailUrl}
                className="h-full w-full object-contain"
              >
                <source src={video.contentUrl} type="video/mp4" />
                Seu navegador não suporta a reprodução deste vídeo.
              </video>
            )}
          </div>
        </section>

        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-[#1a4d2e]/10 bg-white p-6 shadow-soft sm:p-8">
          <h2 className="font-editorial text-2xl font-bold text-[#1a4d2e]">Sobre este vídeo</h2>
          <p className="mt-4 font-editorial text-lg leading-8 text-[#24313d]">
            {video.description}
          </p>
          <Link
            href={video.sourcePath}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1a4d2e] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#ff6b35]"
          >
            Leia também: {video.sourceTitle} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </article>
    </main>
  );
}

export function generateStaticParams() {
  return videoPages.map((video) => ({ slug: video.slug }));
}
