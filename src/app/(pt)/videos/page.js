import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { videoPages } from '@/lib/video-pages';

export const metadata = {
  title: 'Vídeos - Em Casa com Cecília',
  description: 'Assista aos vídeos de receitas, reviews e demonstrações publicados pelo Em Casa com Cecília.',
  alternates: {
    canonical: 'https://emcasacomcecilia.com/videos',
  },
  openGraph: {
    title: 'Vídeos - Em Casa com Cecília',
    description: 'Receitas, reviews e demonstrações em vídeo.',
    url: 'https://emcasacomcecilia.com/videos',
    type: 'website',
  },
};

export default function VideosPage() {
  return (
    <main className="min-h-screen bg-[#faf8f3] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#ff6b35]">
            Em Casa com Cecília
          </p>
          <h1 className="font-editorial text-4xl font-bold text-[#1a4d2e] sm:text-5xl">
            Vídeos
          </h1>
          <p className="mt-4 font-editorial text-lg leading-8 text-[#4a5568]">
            Receitas, testes e demonstrações para assistir em uma página dedicada ao conteúdo.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videoPages.map((video) => (
            <article
              key={video.slug}
              className="overflow-hidden rounded-2xl border border-[#1a4d2e]/10 bg-white shadow-soft"
            >
              <Link href={`/videos/${video.slug}`} className="group block">
                <div className="relative aspect-video overflow-hidden bg-[#0f1d3a]">
                  <Image
                    src={video.thumbnailUrl}
                    alt={`Miniatura: ${video.title}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/20">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ff6b35] text-white shadow-lg">
                      <PlayCircle size={30} aria-hidden="true" />
                    </span>
                  </span>
                </div>
                <div className="p-5">
                  <h2 className="font-editorial text-xl font-bold leading-snug text-[#1a4d2e]">
                    {video.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#4a5568]">
                    {video.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#ff6b35]">
                    Assistir ao vídeo <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
