'use client';

import { useRef, type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { ScrollRow } from '@/components/ui/ScrollRow';
import { trackEvent } from '@/lib/analytics';
import { getOfferDiscountPercent, type OfferWithImage } from '@/lib/dicasOffers';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

// As ofertas do dia dentro do card do Dicas & Ofertas, numa fila que rola na horizontal; a partir de
// 768 px, as setas ao lado do título passam a fila. O card mostra só a foto e o preço: o nome do
// produto vai no alt da foto, que dá nome ao link.

const ARROW = `flex size-11 items-center justify-center rounded-full border-2 border-marinho bg-white text-marinho hover:bg-marinho hover:text-amarelo-cupom motion-safe:transition-colors ${FOCUS_RING}`;

function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

type OfferCarouselProps = {
  items: OfferWithImage[];
  // O título e a descrição do card, à esquerda das setas.
  heading: ReactNode;
};

export function OfferCarousel({ items, heading }: OfferCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollTrack = (direction: 'left' | 'right') => {
    const track = trackRef.current;
    if (!track) return;

    const amount = Math.max(track.clientWidth * 0.8, 280);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({
      left: direction === 'right' ? amount : -amount,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <>
      <div className="flex items-end justify-between gap-4 px-4 md:px-6">
        {heading}
        <div className="hidden shrink-0 gap-2 md:flex">
          <button type="button" onClick={() => scrollTrack('left')} className={ARROW} aria-label="Ver ofertas anteriores">
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>
          <button type="button" onClick={() => scrollTrack('right')} className={ARROW} aria-label="Ver próximas ofertas">
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>
      {/* O py-1.5 dá espaço ao anel de foco, que fica fora do card. */}
      <ScrollRow
        ref={trackRef}
        className="hide-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-2.5 overflow-x-auto px-4 py-1.5 md:scroll-px-6 md:gap-3 md:px-6"
      >
        {items.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </ScrollRow>
    </>
  );
}

function OfferCard({ offer }: { offer: OfferWithImage }) {
  const percent = getOfferDiscountPercent(offer);
  const hasOldPrice = offer.discountPrice > 0 && offer.originalPrice > offer.discountPrice;

  return (
    <li className="flex w-[132px] shrink-0 snap-start md:w-[148px]">
      <Link
        href={offer.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackEvent('click_offer', {
            offer_id: offer.id,
            offer_title: offer.title,
            offer_store: offer.store,
          })
        }
        className={`group relative flex flex-1 flex-col overflow-hidden rounded-[10px] border-2 border-marinho bg-white text-marinho motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1 ${FOCUS_RING}`}
      >
        <span className="relative block h-[112px] border-b-2 border-marinho bg-white md:h-[128px]">
          <Image
            src={resolveMediaUrl(offer.image)}
            alt={offer.title}
            fill
            sizes="148px"
            className="object-contain p-2.5 motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"
          />
        </span>
        {percent > 0 ? (
          <span
            aria-hidden="true"
            className="absolute top-1.5 left-1.5 flex size-11 -rotate-10 items-center justify-center rounded-full border-2 border-marinho bg-laranja text-xs font-extrabold text-marinho"
          >
            {`−${percent}%`}
          </span>
        ) : null}
        <span className="flex flex-1 flex-col justify-end px-2.5 pt-1.5 pb-2.5">
          {offer.discountPrice > 0 ? (
            <>
              {hasOldPrice ? (
                <span className="text-[11px] font-semibold text-marinho-suave">
                  <span className="sr-only">de </span>
                  <s>{formatPrice(offer.originalPrice)}</s>
                </span>
              ) : null}
              <span className="text-[17px] leading-tight font-extrabold">
                {hasOldPrice ? <span className="sr-only">por </span> : null}
                {formatPrice(offer.discountPrice)}
              </span>
            </>
          ) : (
            <span className="text-[13px] font-extrabold underline underline-offset-[3px]">Ver oferta</span>
          )}
        </span>
      </Link>
    </li>
  );
}
