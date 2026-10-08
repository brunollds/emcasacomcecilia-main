'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { brandLinks } from '@/lib/brandLinks';
import type { Offer } from '@/lib/data';
import { trackEvent } from '@/lib/analytics';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

// "Ofertas do dia": o feed do Dicas & Ofertas (até 10 ofertas) numa fila que rola na horizontal.
// A partir de 768 px, as setas ao lado do título passam a fila.

type OffersProps = {
  items: Offer[];
};

const ARROW = `flex size-11 items-center justify-center rounded-full border-2 border-marinho bg-white text-marinho hover:bg-amarelo-cupom motion-safe:transition-colors ${FOCUS_RING}`;

function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function Offers({ items }: OffersProps) {
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
    <section aria-labelledby="titulo-ofertas-do-dia" className="bg-white pb-8 md:pb-10">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3 px-4 md:gap-6 md:px-10">
        <div className="flex items-end justify-between gap-4">
          <h2
            id="titulo-ofertas-do-dia"
            className="font-condensada text-[32px] leading-none font-black text-marinho font-stretch-extra-condensed md:text-5xl"
          >
            Ofertas do dia
          </h2>
          <div className="hidden gap-2 md:flex">
            <button type="button" onClick={() => scrollTrack('left')} className={ARROW} aria-label="Ver ofertas anteriores">
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button type="button" onClick={() => scrollTrack('right')} className={ARROW} aria-label="Ver próximas ofertas">
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>

        {/* O py-1.5 e o recuo de 1,5 nas laterais dão espaço ao anel de foco, que fica fora do card. */}
        <ul
          ref={trackRef}
          className="hide-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 py-1.5 md:-mx-1.5 md:scroll-px-1.5 md:gap-4 md:px-1.5"
        >
          {items.map((offer, index) => (
            <li
              key={offer.id}
              className="flex w-[220px] shrink-0 snap-start motion-safe:animate-[slide-up_0.5s_ease-out_backwards] md:w-60"
              style={{ animationDelay: `${index * 0.06}s` }}
            >
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
                className={`group flex flex-1 flex-col overflow-hidden rounded-xl border-2 border-marinho bg-white text-marinho motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1 ${FOCUS_RING}`}
              >
                <span
                  className={`relative block h-[130px] overflow-hidden border-b-2 border-marinho md:h-[150px] ${offer.image ? 'bg-white' : 'bg-creme'}`}
                >
                  {offer.image ? (
                    <Image
                      src={resolveMediaUrl(offer.image)}
                      alt=""
                      fill
                      sizes="240px"
                      className="object-contain p-3 motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"
                    />
                  ) : null}
                </span>
                <span className="line-clamp-2 px-3 pt-3 text-[13px] leading-[19px] font-extrabold">{offer.title}</span>
                <span className="flex-1 px-3 pt-1 pb-3 text-xs text-marinho-suave">
                  {offer.discountPrice > 0 ? (
                    <>
                      {offer.originalPrice > offer.discountPrice ? (
                        <>
                          de <s>{formatPrice(offer.originalPrice)}</s> por{' '}
                        </>
                      ) : null}
                      <strong className="font-extrabold text-marinho">{formatPrice(offer.discountPrice)}</strong>
                    </>
                  ) : null}
                </span>
                <span className="flex items-center justify-between gap-2 border-t-2 border-dashed border-marinho bg-creme px-3 py-2 text-xs font-bold">
                  <span className="truncate">{offer.store}</span>
                  {offer.coupon ? <span className="shrink-0">com cupom</span> : null}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href={brandLinks.dicas}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex min-h-11 items-center self-start text-[13px] font-extrabold text-marinho underline underline-offset-[3px] md:text-[15px] ${FOCUS_RING}`}
        >
          Acessar Dicas & Ofertas
        </Link>
      </div>
    </section>
  );
}
