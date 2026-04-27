'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import type { SocialHighlight } from '@/lib/data';

type VideoCarouselProps = {
  items: SocialHighlight[];
};

export function VideoCarousel({ items }: VideoCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollTrack = (direction: 'left' | 'right') => {
    const track = trackRef.current;
    if (!track) return;

    const amount = Math.max(track.clientWidth * 0.8, 280);
    track.scrollBy({
      left: direction === 'right' ? amount : -amount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-[#0f1d3a] to-transparent lg:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-16 bg-gradient-to-l from-[#0f1d3a] to-transparent lg:block" />

      <button
        type="button"
        onClick={() => scrollTrack('left')}
        className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-[#132247]/90 text-white shadow-lg transition-all hover:border-[#ff6b35]/45 hover:text-[#ff6b35] lg:inline-flex"
        aria-label="Ver vídeos anteriores"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={() => scrollTrack('right')}
        className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-[#132247]/90 text-white shadow-lg transition-all hover:border-[#ff6b35]/45 hover:text-[#ff6b35] lg:inline-flex"
        aria-label="Ver próximos vídeos"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div
        ref={trackRef}
        className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden py-1 lg:px-8"
      >
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-[250px] flex-shrink-0 snap-start sm:w-[270px] lg:w-[285px]"
          >
            <article className="transition-transform duration-300 group-hover:-translate-y-1">
              <div className="relative mb-3 overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-[#20315d] to-[#0f1d3a] shadow-soft transition-shadow duration-300 group-hover:shadow-large">
                <div
                  className="aspect-[9/14] bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.02)_30%,rgba(15,29,58,0.55)_100%)] bg-cover bg-center"
                  style={
                    item.thumbnailUrl
                      ? {
                          backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(15,29,58,0.18) 35%, rgba(15,29,58,0.72) 100%), url('${item.thumbnailUrl}')${item.fallbackThumbnailUrl ? `, url('${item.fallbackThumbnailUrl}')` : ''}`,
                          backgroundPosition: 'center center',
                          backgroundSize: `cover${item.fallbackThumbnailUrl ? ', cover' : ''}`,
                          backgroundRepeat: 'no-repeat',
                        }
                      : undefined
                  }
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/12 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                    <Play className="ml-1 h-6 w-6 fill-current" />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0f1d3a] via-[#0f1d3a]/35 to-transparent transition-all duration-300 group-hover:from-[#0f1d3a]/95" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0f1419]"
                      style={{ backgroundColor: item.accent || '#ff6b35' }}
                    >
                      Short
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-white/68">
                      YouTube
                    </span>
                  </div>
                </div>
              </div>

              <h4 className="px-2 text-center font-heading text-[1.24rem] font-semibold leading-[1.08] text-white transition-colors group-hover:text-[#ffd700]">
                {item.title}
              </h4>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
