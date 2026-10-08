'use client';

import { Suspense, useEffect, useState, useSyncExternalStore } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, Leaf } from 'lucide-react';
import { REVIEW_CATEGORIES, parseReviewCategory } from '@/lib/reviewDiscovery';
import { ReviewHubCard } from '@/components/review/ReviewHubCard';

const INITIAL_COUNT = 8;
const LOAD_MORE_COUNT = 4;

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
            {visibleReviews.map((review, index) => (
              <ReviewHubCard key={review.id} review={review} index={index} />
            ))}
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
