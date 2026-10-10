'use client';

import type { CSSProperties } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReviewShelfCard } from '@/components/reviews/ReviewShelfCard';
import { SHELF_CONTAINER, SHELF_TITLE } from '@/components/reviews/shelfClasses';
import { cardDecorAt } from '@/components/ui/cardDecor';
import { RevealSection } from '@/components/ui/RevealSection';
import { ScrollRow } from '@/components/ui/ScrollRow';
import { ROW_ARROW, useRowScroll } from '@/components/ui/useRowScroll';
import type { ShelfArticle } from '@/lib/reviewsShelf';

// As Novidades de /reviews: os artigos com o selo "Novo", como cartões de geladeira (ímã e inclinação
// pela posição), numa fila que rola na horizontal. As setas só aparecem no computador quando a fila não
// cabe; no celular, o degradê da borda direita some no fim. Os cartões entram em cascata quando a seção
// chega à tela (RevealSection, .revela com --i), e as duas primeiras fotos carregam sem atraso.
export function ReviewsNewRow({ articles }: { articles: ShelfArticle[] }) {
  const { trackRef, overflows, moreToTheRight, scrollTrack } = useRowScroll<HTMLUListElement>(articles);

  return (
    <RevealSection aria-labelledby="titulo-novidades" className="pb-8 md:pb-12">
      <div className={`${SHELF_CONTAINER} flex flex-col gap-2 md:gap-4`}>
        <div className="flex items-end justify-between gap-4">
          <h2 id="titulo-novidades" className={SHELF_TITLE}>
            <span className="marca-texto">Novidades</span>
          </h2>
          <div className={`hidden shrink-0 gap-2${overflows ? ' md:flex' : ''}`}>
            <button type="button" onClick={() => scrollTrack('left')} className={ROW_ARROW} aria-label="Ver novidades anteriores">
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button type="button" onClick={() => scrollTrack('right')} className={ROW_ARROW} aria-label="Ver próximas novidades">
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>
        {/* O pt-4 dá lugar aos ímãs, que saem do cartão, e o px-3 do computador, à inclinação. */}
        <div className="relative -mx-4 md:-mx-3">
          <ScrollRow
            ref={trackRef}
            className="hide-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pt-4 pb-3 md:scroll-px-3 md:px-3"
          >
            {articles.map((article, index) => (
              <li
                key={article.slug}
                className="revela flex w-[200px] shrink-0 snap-start md:w-[220px]"
                style={{ '--i': index } as CSSProperties}
              >
                <ReviewShelfCard
                  article={article}
                  placement="reviews_new"
                  dateFormat="dayMonth"
                  showStore
                  decor={cardDecorAt(index)}
                  eager={index < 2}
                  showNewBadge={false}
                  imageSizes="220px"
                />
              </li>
            ))}
          </ScrollRow>
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-white to-transparent motion-safe:transition-opacity motion-safe:duration-200 md:hidden ${
              moreToTheRight ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      </div>
    </RevealSection>
  );
}
