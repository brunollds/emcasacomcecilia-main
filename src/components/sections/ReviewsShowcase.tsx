'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getReviewSlug, publishedReviews } from '@/lib/data';

const accentByType: Record<string, string> = {
  Eletrodoméstico: '#ff6b35',
  Alimento: '#1a4d2e',
  Utensílio: '#0f1d3a',
  Ingrediente: '#ffd700',
};

const iconByType: Record<string, string> = {
  Eletrodoméstico: '🔌',
  Alimento: '🥄',
  Utensílio: '🍴',
  Ingrediente: '🧂',
};

const estimateReadingTime = (review: (typeof publishedReviews)[number]) => {
  const words = [
    review.title,
    review.description,
    ...(review.pros || []),
    ...(review.cons || []),
    ...(review.contentSections || []).flatMap((section) => [
      section.heading,
      ...(section.paragraphs || []),
      ...(section.bullets || []),
    ]),
  ]
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(2, Math.ceil(words / 180));
};

const sortReviewsByDateDesc = (items: typeof publishedReviews) =>
  [...items].sort((a, b) => {
    const dateA = a.publishedAtISO ? Date.parse(a.publishedAtISO) : 0;
    const dateB = b.publishedAtISO ? Date.parse(b.publishedAtISO) : 0;
    return dateB - dateA || b.id - a.id;
  });

export function ReviewsShowcase() {
  const featuredReviews = sortReviewsByDateDesc(publishedReviews).slice(0, 4);

  return (
    <section className="bg-white pb-16 pt-6 md:pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 text-left md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold text-[#0f1419] sm:text-3xl">
              Reviews & análises sinceras
            </h2>
          </div>
          <Link
            href="/reviews"
            className="hidden items-center gap-2 rounded-full border border-[#0f1d3a]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#0f1d3a] transition-all hover:border-[#0f1d3a] hover:bg-[#0f1d3a] hover:text-white md:inline-flex"
          >
            Ver todas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-[1.35fr_1fr_1fr_1fr] lg:gap-6 [&::-webkit-scrollbar]:hidden">
          {featuredReviews.map((review, index) => {
            const accent = accentByType[review.type] ?? '#ff6b35';
            const icon = iconByType[review.type] ?? '📝';
            const readingTime = estimateReadingTime(review);
            const isFeatured = index === 0;
            const isProductReview = Boolean(review.rating);

            return (
              <Link
                key={review.id}
                href={`/reviews/${getReviewSlug(review)}`}
                className="group block w-[230px] flex-shrink-0 snap-start animate-slide-up sm:w-[250px] md:w-auto"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <article className="transition-all duration-500 group-hover:-translate-y-2">
                  <div className={`relative mb-4 overflow-hidden rounded-[1.35rem] shadow-soft transition-all duration-500 group-hover:shadow-large md:rounded-[1.6rem] lg:rounded-[2rem] ${
                    isFeatured ? 'aspect-[9/10] lg:aspect-[10/11]' : 'aspect-[5/6]'
                  }`}>
                    {/* Imagem ou Gradiente */}
                    {review.image ? (
                      <Image
                        src={review.image}
                        alt={review.imageAlt || review.title}
                        fill
                        className={`transition-transform duration-700 ease-out group-hover:scale-110 ${
                          isProductReview ? 'object-contain bg-white p-3' : 'object-cover'
                        }`}
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                        style={{
                          background: `linear-gradient(160deg, ${accent}18 0%, ${accent}30 42%, #0f1d3a 100%)`,
                        }}
                      />
                    )}

                    {/* Overlay Dinâmico */}
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                    {/* Tag de Tipo */}
                    <div className="absolute left-4 top-4">
                      <div className="flex flex-wrap gap-2">
                        {review.isNew && (
                          <span className="inline-flex items-center rounded-full bg-[#ff6b35] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg">
                            Novo
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0f1419] shadow-lg backdrop-blur-md">
                          {review.type}
                        </span>
                      </div>
                    </div>

                    {/* Ícone Central (se não houver imagem) */}
                    {!review.image && (
                      <div className="absolute inset-0 flex items-center justify-center text-[4.5rem] transition-transform duration-700 group-hover:scale-110">
                        {icon}
                      </div>
                    )}

                    <div className="absolute bottom-5 left-5 right-5 text-xs font-bold uppercase tracking-widest text-white">
                      <span className="text-white/78">
                        {review.publishedAt} · {readingTime} min de leitura
                      </span>
                    </div>
                  </div>

                  <div className="px-2">
                    <h3 className={`font-heading font-bold leading-tight text-[#0f1419] transition-colors duration-300 group-hover:text-[#1a4d2e] ${
                      isFeatured ? 'text-lg lg:text-2xl' : 'text-lg lg:text-xl'
                    }`}>
                      {review.title}
                    </h3>
                    <div className="mt-2 h-0.5 w-0 bg-[#ff6b35] transition-all duration-500 group-hover:w-12" />
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#0f1d3a] px-8 py-4 font-semibold text-[#0f1d3a] transition-all hover:bg-[#0f1d3a] hover:text-white"
          >
            Ver todas as análises
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
