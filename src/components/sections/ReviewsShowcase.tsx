'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BadgeCheck } from 'lucide-react';
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
    const newnessOrder = Number(Boolean(b.isNew)) - Number(Boolean(a.isNew));
    const dateA = a.publishedAtISO ? Date.parse(a.publishedAtISO) : 0;
    const dateB = b.publishedAtISO ? Date.parse(b.publishedAtISO) : 0;
    return newnessOrder || dateB - dateA || b.id - a.id;
  });

const COUPON_TO_AFFILIATE: Record<string, string> = {
  CECILIA12: 'damie',
  CECIEMCASA: 'i-wanna-sleep',
  CECILIA010: 'yesstyle',
};

type ShowcaseReview = (typeof publishedReviews)[number];

const getAffiliate = (review: ShowcaseReview): string | undefined =>
  review.affiliate ?? (review.coupon ? COUPON_TO_AFFILIATE[review.coupon] : undefined);

const SHOWCASE_SIZE = 8;

function selectShowcaseReviews(all: typeof publishedReviews): ShowcaseReview[] {
  const listed = sortReviewsByDateDesc(all.filter((review) => !review.hideFromListings));
  const selected: ShowcaseReview[] = [];
  const usedIds = new Set<number>();
  const coveredAffiliates = new Set<string>();

  const push = (review: ShowcaseReview) => {
    if (selected.length >= SHOWCASE_SIZE || usedIds.has(review.id)) return;
    selected.push(review);
    usedIds.add(review.id);
    const affiliate = getAffiliate(review);
    if (affiliate) coveredAffiliates.add(affiliate);
  };

  // 1. Fixadas manualmente
  listed.filter((review) => review.homeFeatured).forEach(push);

  // 2. Um artigo (o mais recente) por afiliado ainda não representado
  for (const review of listed) {
    const affiliate = getAffiliate(review);
    if (affiliate && !coveredAffiliates.has(affiliate)) push(review);
  }

  // 3. Completa com as mais recentes
  listed.forEach(push);

  return selected;
}

export function ReviewsShowcase() {
  const featuredReviews = selectShowcaseReviews(publishedReviews);

  return (
    <section className="bg-white pb-16 pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 text-left md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <BadgeCheck className="h-5 w-5 text-[#ff6b35]" />
              <span className="text-sm font-semibold uppercase tracking-wide text-[#ff6b35]">
                Testado em Casa
              </span>
            </div>
            <h2 className="font-editorial text-2xl font-bold text-[#0f1d3a] sm:text-3xl">
              Análises Sinceras
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

        <div className="-mx-4 grid grid-flow-col grid-rows-2 snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid-flow-row md:grid-rows-none md:grid-cols-4 md:overflow-visible md:px-0 md:pb-0 lg:gap-6 [&::-webkit-scrollbar]:hidden">
          {featuredReviews.map((review, index) => {
            const accent = accentByType[review.type] ?? '#ff6b35';
            const icon = iconByType[review.type] ?? '📝';
            const readingTime = estimateReadingTime(review);
            const isProductReview = Boolean(review.rating);
            const imageClassName =
              review.imageFit === 'cover'
                ? 'object-cover'
                : review.imageFit === 'contain'
                  ? 'object-contain bg-white p-3'
                  : isProductReview
                    ? 'object-contain bg-white p-3'
                    : 'object-cover';
            const objectPosition =
              review.imagePosition && (review.imageFit === 'cover' || (!review.imageFit && !isProductReview))
                ? review.imagePosition === 'top'
                  ? '50% 10%'
                  : review.imagePosition === 'bottom'
                    ? '50% 90%'
                    : review.imagePosition === 'left'
                      ? '20% 50%'
                      : review.imagePosition === 'right'
                        ? '80% 50%'
                        : review.imagePosition
                : undefined;

            return (
              <Link
                key={review.id}
                href={`/reviews/${getReviewSlug(review)}`}
                className="group block w-[230px] flex-shrink-0 snap-start animate-slide-up sm:w-[250px] md:w-auto"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <article className="transition-all duration-500 group-hover:-translate-y-2">
                  <div className="relative mb-4 overflow-hidden rounded-[1.35rem] shadow-soft transition-all duration-500 group-hover:shadow-large md:rounded-[1.6rem] lg:rounded-[2rem] aspect-[5/6]">
                    {/* Imagem ou Gradiente */}
                    {review.image ? (
                      <Image
                        src={review.image}
                        alt={review.imageAlt || review.title}
                        fill
                        className={`transition-transform duration-700 ease-out group-hover:scale-110 ${imageClassName}`}
                        style={objectPosition ? { objectPosition } : undefined}
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
                    <h3 className="font-heading font-bold leading-tight text-[#0f1419] transition-colors duration-300 group-hover:text-[#1a4d2e] text-lg lg:text-xl">
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
