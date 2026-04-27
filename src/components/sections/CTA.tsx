import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getYoutubeHighlights } from '@/lib/youtube';
import { VideoCarousel } from '@/components/sections/VideoCarousel';
import { brandLinks } from '@/lib/data';

export async function CTA() {
  const youtubeShorts = await getYoutubeHighlights();

  return (
    <section className="bg-[#0f1d3a] pt-16 pb-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-[2.25rem]">
            Últimos vídeos em destaque
          </h2>
          <Link
            href={brandLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:border-[#ff6b35]/45 hover:text-[#ff6b35] md:inline-flex"
          >
            Ver canal
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <VideoCarousel items={youtubeShorts} />
        <div className="mt-8 text-center md:hidden">
          <Link
            href={brandLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 px-6 py-3 text-sm font-medium text-white transition-all hover:border-[#ff6b35]/45 hover:text-[#ff6b35]"
          >
            Ver canal
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
