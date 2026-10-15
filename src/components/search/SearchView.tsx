import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SHELF_CONTAINER } from '@/components/reviews/shelfClasses';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { PageHeader } from '@/components/ui/PageHeader';
import { cardImageLook } from '@/lib/cardImage';
import { SEARCH_COPY, SEARCH_TRAIL, type SearchCard } from '@/lib/searchPage';

// O /buscar: o campo de busca dentro da página (o mesmo do topo, como no 404), a contagem e os cartões com a
// capa, ou o aviso de nada encontrado. O test:institutional desenha a página fora do Next: a fonte condensada
// (couponFontVariables, de next/font) e o campo (OmniSearch, em .js) vêm da rota.

const IMAGE_SIZES = '(min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw';

function ResultCard({ card }: { card: SearchCard }) {
  const look = card.image ? cardImageLook(card.image.fit, card.image.position, 'p-3') : null;
  return (
    <Link
      href={card.href}
      className={`group flex flex-1 flex-col rounded-[10px] border-2 border-marinho bg-white text-marinho motion-safe:transition-[translate,box-shadow] motion-safe:duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_8px_18px_rgb(15_29_58/0.15)] ${FOCUS_RING}`}
    >
      <span className="relative block aspect-[16/10] overflow-hidden rounded-t-lg border-b-2 border-marinho bg-creme">
        {card.image && look ? (
          <Image src={card.image.src} alt="" fill sizes={IMAGE_SIZES} className={look.className} style={look.style} />
        ) : null}
      </span>
      <span className="flex flex-1 flex-col gap-1.5 p-4">
        <span className="flex min-w-0 flex-wrap items-center gap-x-2 text-xs font-bold text-marinho-suave">
          <span className="rounded-full border-2 border-marinho bg-amarelo-cupom px-2 py-0.5 text-marinho">{card.typeLabel}</span>
          {card.category ? <span className="min-w-0 truncate">{card.category}</span> : null}
        </span>
        <span className="text-lg leading-6 font-extrabold group-hover:underline group-hover:underline-offset-[3px]">{card.title}</span>
        <span className="line-clamp-3 text-[15px] leading-6 font-medium text-marinho-suave">{card.description}</span>
      </span>
    </Link>
  );
}

type SearchViewProps = { query: string; results: readonly SearchCard[]; search: ReactNode; className?: string };

export function SearchView({ query, results, search, className = '' }: SearchViewProps) {
  return (
    <main className={`${className} min-h-screen bg-white text-marinho`}>
      <PageHeader trail={SEARCH_TRAIL} title={SEARCH_COPY.title} intro={query ? undefined : SEARCH_COPY.intro}>
        <div role="search" className="w-full max-w-xl">
          {search}
        </div>
      </PageHeader>

      {query ? (
        <section aria-labelledby="titulo-resultados" className={`${SHELF_CONTAINER} pb-16 md:pb-24`}>
          {results.length > 0 ? (
            <>
              <h2 id="titulo-resultados" className="text-lg font-extrabold" data-search-count="">
                {SEARCH_COPY.count(results.length, query)}
              </h2>
              <ul className="mt-5 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
                {results.map((card) => (
                  <li key={card.key} className="flex">
                    <ResultCard card={card} />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="flex flex-col gap-2 rounded-[14px] border-2 border-marinho bg-creme p-5 md:p-8" data-search-empty="">
              <h2 id="titulo-resultados" className="text-xl font-extrabold md:text-2xl">
                {SEARCH_COPY.emptyTitle(query)}
              </h2>
              <p className="max-w-[60ch] text-base leading-7 font-medium text-marinho-suave">
                {SEARCH_COPY.emptyHint}{' '}
                <Link href="/cupons" className={`font-extrabold text-marinho underline underline-offset-[3px] ${FOCUS_RING}`}>
                  /cupons
                </Link>
                .
              </p>
            </div>
          )}
        </section>
      ) : null}
    </main>
  );
}
