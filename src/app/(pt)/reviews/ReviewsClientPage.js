'use client';

import { Suspense, useEffect, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, Leaf } from 'lucide-react';
import { REVIEW_CATEGORIES, parseReviewCategory } from '@/lib/reviewDiscovery';
import { sanitizeViewTransitionName } from '@/lib/viewTransition';
import { ViewTransitionLink } from '@/components/ViewTransitionLink';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

const INITIAL_COUNT = 8;
const LOAD_MORE_COUNT = 4;

const accentByType = {
  'Eletrodoméstico': '#ff6b35',
  'Alimento': '#1a4d2e',
  'Utensílio': '#0f1d3a',
  'Ingrediente': '#ffd700',
  'Teste de Cozinha': '#ff6b35',
};

const iconByType = {
  'Eletrodoméstico': '🔌',
  'Alimento': '🥄',
  'Utensílio': '🍴',
  'Ingrediente': '🧂',
  'Teste de Cozinha': '🧪',
};

const categoryFilters = [
  { value: null, label: 'Todos' },
  ...REVIEW_CATEGORIES,
];

// A categoria sai da URL só no navegador. Com useSearchParams na página inteira, o prerender
// parava no Suspense e o HTML estático ia sem nenhum card; agora o servidor (e a hidratação)
// renderiza "Todos", e o useSearchParams fica isolado no CategoryUrlListener, que só avisa quando
// a categoria da URL muda: filtro, voltar/avançar ou link para /reviews.
const CATEGORY_CHANGE_EVENT = 'reviews-category-change';

function subscribeToCategory(onChange) {
  window.addEventListener(CATEGORY_CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CATEGORY_CHANGE_EVENT, onChange);
}

const getUrlCategory = () => new URLSearchParams(window.location.search).get('categoria');
const getServerCategory = () => null;

function CategoryUrlListener() {
  const category = useSearchParams().get('categoria');

  useEffect(() => {
    window.dispatchEvent(new Event(CATEGORY_CHANGE_EVENT));
  }, [category]);

  return null;
}

export default function ReviewsClientPage({ reviews }) {
  const activeCategory = parseReviewCategory(
    useSyncExternalStore(subscribeToCategory, getUrlCategory, getServerCategory)
  );
  const [pagination, setPagination] = useState({
    category: activeCategory,
    visible: INITIAL_COUNT,
  });
  const visible =
    pagination.category === activeCategory
      ? pagination.visible
      : INITIAL_COUNT;

  const filtered = activeCategory
    ? reviews.filter((review) => review.category === activeCategory)
    : reviews;

  const visibleReviews = filtered.slice(0, visible);
  const hasMore = filtered.length > visible;

  const handleCategoryChange = (category) => {
    const params = new URLSearchParams(window.location.search);

    if (category) {
      params.set('categoria', category);
    } else {
      params.delete('categoria');
    }

    const query = params.toString();
    // pushState atualiza o useSearchParams sem buscar de novo o payload com todos os cards.
    window.history.pushState(null, '', query ? `/reviews?${query}` : '/reviews');
    setPagination({ category, visible: INITIAL_COUNT });
  };

  return (
    <main className="min-h-screen bg-[#fef9f3]">
      <Suspense fallback={null}>
        <CategoryUrlListener />
      </Suspense>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-black/5 bg-[#0f1d3a] px-6 py-14 text-white md:py-16">
        <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
          <Leaf className="absolute left-[7%] top-[18%] h-28 w-28 text-white/5 animate-float-slow" strokeWidth={1} />
          <Leaf className="absolute right-[9%] top-[24%] h-20 w-20 rotate-12 text-white/5 animate-float" strokeWidth={1} />
          <Leaf className="absolute bottom-[10%] left-[20%] h-24 w-24 -rotate-12 text-white/5 animate-float" strokeWidth={0.9} />
          <Leaf className="absolute bottom-[14%] right-[18%] h-32 w-32 rotate-45 text-white/6 animate-float-slow" strokeWidth={0.85} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl animate-slide-up text-center">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">
            Guias & Análises
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Guias práticos, experiências reais quando existem e análises baseadas em dados e fontes declaradas.
          </p>
        </div>
      </section>

      <section className="px-6 py-8 md:py-10">
        <div className="mx-auto max-w-7xl">
          {/* Filtros */}
          <div className="mb-8 flex flex-wrap items-center gap-2">
            {categoryFilters.map(({ value, label }) => (
              <button
                key={value || 'todos'}
                type="button"
                onClick={() => handleCategoryChange(value)}
                aria-pressed={activeCategory === value}
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all ${
                  activeCategory === value
                    ? 'border-[#1a4d2e] bg-[#1a4d2e] text-white shadow-sm'
                    : 'border-black/10 bg-white text-[#0f1419] hover:border-[#ff6b35]/35 hover:text-[#ff6b35]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Contagem */}
          <p className="mb-6 text-sm font-medium text-gray-500">
            {filtered.length} {filtered.length === 1 ? 'conteúdo encontrado' : 'conteúdos encontrados'}
          </p>

          {/* Grid */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4">
            {visibleReviews.map((review, index) => {
              const accent = accentByType[review.type] ?? '#ff6b35';
              const icon = iconByType[review.type] ?? '📝';
              const isProductReview = Boolean(review.rating);

              return (
                <ViewTransitionLink
                  key={review.id}
                  href={`/reviews/${review.slug}`}
                  className="group block animate-slide-up"
                  style={{ animationDelay: `${(index % 8) * 0.05}s` }}
                >
                  <article className="transition-all duration-500 group-hover:-translate-y-2">
                    <div
                      className="relative mb-4 aspect-[5/6] overflow-hidden rounded-[2rem] shadow-soft transition-all duration-500 group-hover:shadow-large"
                      style={{ viewTransitionName: `review-hero-${sanitizeViewTransitionName(review.slug)}` }}
                    >
                      {review.image ? (
                        <Image
                          src={resolveMediaUrl(review.image)}
                          alt={review.imageAlt || review.title}
                          fill
                          className={`transition-transform duration-700 ease-out group-hover:scale-110 ${
                            review.imageFit === 'cover'
                              ? 'object-cover'
                              : review.imageFit === 'contain'
                                ? 'object-contain bg-white p-4'
                                : isProductReview
                                  ? 'object-contain bg-white p-4'
                                  : 'object-cover'
                          }`}
                          style={
                            review.imagePosition && (review.imageFit === 'cover' || (!review.imageFit && !isProductReview))
                              ? {
                                  objectPosition:
                                    review.imagePosition === 'top'
                                      ? '50% 10%'
                                      : review.imagePosition === 'bottom'
                                        ? '50% 90%'
                                        : review.imagePosition === 'left'
                                          ? '20% 50%'
                                          : review.imagePosition === 'right'
                                            ? '80% 50%'
                                        : review.imagePosition,
                                }
                              : undefined
                          }
                          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        />
                      ) : (
                        <div
                          className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                          style={{
                            background: `linear-gradient(160deg, ${accent}18 0%, ${accent}30 42%, #0f1d3a 100%)`,
                          }}
                        />
                      )}

                      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                      {/* Tag tipo */}
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

                      {/* Ícone central quando sem imagem */}
                      {!review.image && (
                        <div className="absolute inset-0 flex items-center justify-center text-5xl transition-transform duration-700 group-hover:scale-110">
                          {icon}
                        </div>
                      )}

                      <div className="absolute bottom-5 left-5 right-5 text-xs font-bold uppercase tracking-widest text-white/78">
                        {review.publishedAt} · {review.readingMinutes} min de leitura
                      </div>
                    </div>

                    <div className="px-2">
                      <h3 className="font-heading text-lg font-bold leading-tight text-[#0f1419] transition-colors duration-300 group-hover:text-[#1a4d2e] md:text-xl">
                        {review.title}
                      </h3>
                      <div className="mt-2 h-0.5 w-0 bg-[#ff6b35] transition-all duration-500 group-hover:w-12" />
                    </div>
                  </article>
                </ViewTransitionLink>
              );
            })}
          </div>

          {/* Load more */}
          {hasMore && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() =>
                  setPagination({
                    category: activeCategory,
                    visible: visible + LOAD_MORE_COUNT,
                  })
                }
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#1a4d2e] px-8 py-4 font-semibold text-[#1a4d2e] transition-all hover:bg-[#1a4d2e] hover:text-white"
              >
                Carregar mais guias e análises
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Disclaimer */}
          {filtered.length > 0 && (
            <p className="mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-gray-400">
              Cada conteúdo informa sua base: experiência própria, dados públicos ou fontes declaradas.
              Parcerias comerciais são identificadas explicitamente.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
