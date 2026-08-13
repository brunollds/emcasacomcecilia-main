'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpenText } from 'lucide-react';
import type { HomeReviewCard } from '@/lib/reviewDiscovery';

const accentByType: Record<string, string> = {
  Eletrodoméstico: '#ff6b35',
  Alimento: '#1a4d2e',
  Utensílio: '#0f1d3a',
  Ingrediente: '#ffd700',
};

function getObjectPosition(position: HomeReviewCard['imagePosition']) {
  if (position === 'top') return '50% 10%';
  if (position === 'bottom') return '50% 90%';
  if (position === 'left') return '20% 50%';
  if (position === 'right') return '80% 50%';
  return position;
}

export function ReviewsShowcase({ items }: { items: HomeReviewCard[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ atStart: true, atEnd: false });

  const updatePosition = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    setPosition({
      atStart: carousel.scrollLeft <= 2,
      atEnd: carousel.scrollLeft >= maxScroll - 2,
    });
  };

  const scrollPage = (direction: -1 | 1) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.scrollBy({
      left: direction * carousel.clientWidth,
      behavior: 'smooth',
    });
  };

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4 md:mb-10">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <BookOpenText className="h-5 w-5 text-[#ff6b35]" />
              <span className="text-sm font-semibold uppercase tracking-wide text-[#ff6b35]">
                Publicados recentemente
              </span>
            </div>
            <h2 className="font-editorial text-2xl font-bold text-[#0f1d3a] sm:text-3xl">
              Mais em Guias & Análises
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollPage(-1)}
              disabled={position.atStart}
              aria-label="Ver guias anteriores"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#0f1d3a]/15 text-[#0f1d3a] transition-all hover:border-[#0f1d3a] hover:bg-[#0f1d3a] hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-[#0f1d3a]/15 disabled:hover:bg-transparent disabled:hover:text-[#0f1d3a]"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollPage(1)}
              disabled={position.atEnd}
              aria-label="Ver mais guias"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#0f1d3a]/15 text-[#0f1d3a] transition-all hover:border-[#0f1d3a] hover:bg-[#0f1d3a] hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-[#0f1d3a]/15 disabled:hover:bg-transparent disabled:hover:text-[#0f1d3a]"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          onScroll={updatePosition}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => {
            const accent = accentByType[item.type] ?? '#ff6b35';
            const imageClassName =
              item.imageFit === 'contain'
                ? 'object-contain bg-white p-3'
                : 'object-cover';

            return (
              <Link
                key={item.id}
                href={`/reviews/${item.slug}`}
                className="group block flex-none basis-[calc((100%_-_1rem)/2)] snap-start md:basis-[calc((100%_-_3rem)/4)]"
              >
                <article className="transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="relative mb-4 aspect-[5/6] overflow-hidden rounded-[1.35rem] shadow-soft transition-shadow duration-500 group-hover:shadow-large md:rounded-[1.6rem] lg:rounded-[2rem]">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.imageAlt || item.title}
                        fill
                        className={`transition-transform duration-700 ease-out group-hover:scale-105 ${imageClassName}`}
                        style={
                          item.imageFit !== 'contain' && item.imagePosition
                            ? { objectPosition: getObjectPosition(item.imagePosition) }
                            : undefined
                        }
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(160deg, ${accent}24 0%, ${accent}42 42%, #0f1d3a 100%)`,
                        }}
                      />
                    )}

                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                    <div className="absolute left-3 top-3 flex flex-wrap gap-2 sm:left-4 sm:top-4">
                      {item.isNew && (
                        <span className="inline-flex items-center rounded-full bg-[#ff6b35] px-2.5 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-white shadow-lg sm:px-3 sm:text-[10px] sm:tracking-[0.2em]">
                          Novo
                        </span>
                      )}
                      <span className="inline-flex items-center rounded-full bg-white/95 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#0f1419] shadow-lg backdrop-blur-md sm:px-3 sm:text-[10px] sm:tracking-[0.2em]">
                        {item.type}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-[10px] font-bold uppercase tracking-wider text-white sm:bottom-5 sm:left-5 sm:right-5 sm:text-xs sm:tracking-widest">
                      <span className="text-white/80">
                        {item.publishedAt} · {item.readingMinutes} min de leitura
                      </span>
                    </div>
                  </div>

                  <div className="px-1 sm:px-2">
                    <h3 className="font-heading text-base font-bold leading-tight text-[#0f1419] transition-colors duration-300 group-hover:text-[#1a4d2e] sm:text-lg lg:text-xl">
                      {item.title}
                    </h3>
                    <div className="mt-2 h-0.5 w-0 bg-[#ff6b35] transition-all duration-500 group-hover:w-12" />
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#0f1d3a] px-7 py-3.5 font-semibold text-[#0f1d3a] transition-all hover:bg-[#0f1d3a] hover:text-white"
          >
            Ver todos os guias
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
