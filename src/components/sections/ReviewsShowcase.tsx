'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, BookOpenText } from 'lucide-react';
import { TrackedHomeLink } from '@/components/TrackedHomeLink';
import { ReviewCategoryLinks } from '@/components/sections/ReviewCategoryLinks';
import {
  REVIEW_CATEGORIES,
  type HomeReviewCard,
  type ReviewCategory,
} from '@/lib/reviewDiscovery';

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
  const [activeCategory, setActiveCategory] = useState<ReviewCategory | null>(null);
  const visibleItems = (
    activeCategory
      ? items.filter(({ category }) => category === activeCategory)
      : items
  ).slice(0, 8);
  const activeLabel = REVIEW_CATEGORIES.find(
    ({ value }) => value === activeCategory
  )?.label;
  const viewAllHref = activeCategory
    ? `/reviews?categoria=${activeCategory}`
    : '/reviews';
  const viewAllLabel = activeCategory
    ? {
        'guias-praticos-utilidade': 'Ver todos os guias',
        'produtos-experiencias': 'Ver todos os produtos',
        'cupons-como-usar': 'Ver todos os cupons',
        'confianca-reputacao': 'Ver todas as análises',
      }[activeCategory]
    : 'Ver todos os guias';

  return (
    <>
      <ReviewCategoryLinks
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      <section id="home-review-carousel" className="bg-white pb-10 pt-7 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-end justify-between gap-3 md:mb-8 md:gap-6">
          <div>
            <div className="mb-2 flex items-center gap-2 md:mb-3">
              <BookOpenText className="h-5 w-5 text-[#ff6b35]" />
              <span className="text-sm font-semibold uppercase tracking-wide text-[#ff6b35]">
                {activeLabel || 'Publicados recentemente'}
              </span>
            </div>
            <h2 className="font-editorial text-2xl font-bold text-[#0f1d3a] sm:text-3xl">
              Guias & Análises
            </h2>
          </div>

          <TrackedHomeLink
            href={viewAllHref}
            placement="home_reviews_carousel"
            linkLabel={viewAllLabel}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#0f1d3a]/15 px-3.5 py-2 text-xs font-semibold text-[#0f1d3a] transition-all hover:border-[#0f1d3a] hover:bg-[#0f1d3a] hover:text-white sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            {viewAllLabel}
            <ArrowRight className="h-4 w-4" />
          </TrackedHomeLink>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-y-10">
          {visibleItems.map((item, index) => {
            const accent = accentByType[item.type] ?? '#ff6b35';
            const imageClassName =
              item.imageFit === 'contain'
                ? 'object-contain bg-white p-3'
                : 'object-cover';

            return (
              <TrackedHomeLink
                key={item.id}
                href={`/reviews/${item.slug}`}
                placement="home_reviews_carousel"
                linkLabel={item.title}
                className={`group block ${index >= 6 ? 'hidden md:block' : ''}`}
              >
                <article className="transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-[1.35rem] shadow-soft transition-shadow duration-500 group-hover:shadow-large md:rounded-[1.6rem] lg:rounded-[2rem]">
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

                    <div className="absolute left-3 top-3 flex flex-wrap gap-1.5 sm:left-4 sm:top-4 sm:gap-2">
                      {item.isNew && (
                        <span className="inline-flex items-center rounded-full bg-[#ff6b35] px-2 py-1 text-[8px] font-black uppercase leading-none tracking-[0.1em] text-white shadow-lg sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-[0.2em]">
                          Novo
                        </span>
                      )}
                      <span className="inline-flex items-center rounded-full bg-white/95 px-2 py-1 text-[8px] font-bold uppercase leading-none tracking-[0.08em] text-[#0f1419] shadow-lg backdrop-blur-md sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-[0.2em]">
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
              </TrackedHomeLink>
            );
          })}
        </div>
        </div>
      </section>
    </>
  );
}
