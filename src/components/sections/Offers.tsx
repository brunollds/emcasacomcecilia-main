'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ExternalLink, Tag } from 'lucide-react';
import { brandLinks, offers, formatPrice, type Offer } from '@/lib/data';
import { trackEvent } from '@/lib/analytics';

type OffersProps = {
  items?: Offer[];
};

export function Offers({ items = offers }: OffersProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollTrack = (direction: 'left' | 'right') => {
    const track = trackRef.current;
    if (!track) return;

    const amount = Math.max(track.clientWidth * 0.8, 280);
    track.scrollBy({
      left: direction === 'right' ? amount : -amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="bg-[#fef9f3] pb-10 pt-0 md:pb-16">
      <div className="mx-auto max-w-7xl border-t border-[#1a4d2e]/10 px-4 pt-6 sm:px-6 md:pt-16 lg:px-8">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-14 bg-gradient-to-r from-[#fef9f3] to-transparent lg:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-14 bg-gradient-to-l from-[#fef9f3] to-transparent lg:block" />

          <button
            type="button"
            onClick={() => scrollTrack('left')}
            className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/8 bg-white/95 text-[#0f1419] shadow-lg transition-all hover:border-[#ff6b35]/35 hover:text-[#ff6b35] lg:inline-flex"
            aria-label="Ver ofertas anteriores"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => scrollTrack('right')}
            className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/8 bg-white/95 text-[#0f1419] shadow-lg transition-all hover:border-[#ff6b35]/35 hover:text-[#ff6b35] lg:inline-flex"
            aria-label="Ver próximas ofertas"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={trackRef}
            className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden py-1 lg:px-8"
          >
            {items.map((offer, index) => (
              <Link
                key={offer.id}
                href={offer.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('click_offer', {
                  offer_id: offer.id,
                  offer_title: offer.title,
                  offer_store: offer.store,
                })}
                className="group block w-[230px] flex-shrink-0 snap-start animate-slide-up sm:w-[250px] lg:w-[270px]"
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <article className="transition-all duration-500 group-hover:-translate-y-2">
                  <div className="relative mb-4 aspect-[5/6] overflow-hidden rounded-[2rem] bg-white shadow-soft transition-all duration-500 group-hover:shadow-large">
                    {offer.image ? (
                      <Image
                        src={offer.image}
                        alt={offer.title}
                        fill
                        className="object-contain p-5 transition-transform duration-700 ease-out group-hover:scale-110"
                        sizes="270px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20 transition-transform duration-700 group-hover:scale-110">
                        🛍️
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0f2236]/90 via-[#0f2236]/35 to-transparent" />

                    {offer.discount > 0 && (
                      <div className="absolute left-4 top-4">
                        <span className="inline-flex rounded-full bg-[#ff6b35] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white shadow-lg">
                          -{offer.discount}%
                        </span>
                      </div>
                    )}

                    {offer.coupon && (
                      <div className="absolute right-4 top-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[#1a4d2e] shadow-lg backdrop-blur-md">
                          <Tag className="h-3 w-3" />
                          Cupom
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
                      <span className="text-[#ffd700]">
                        {formatPrice(offer.discountPrice)}
                      </span>
                      <div className="h-3 w-px bg-white/30" />
                      <span className="truncate">{offer.store}</span>
                    </div>
                  </div>

                  <div className="px-2">
                    <h3 className="font-heading text-lg font-bold leading-tight text-[#0f1419] transition-colors duration-300 group-hover:text-[#1a4d2e] md:text-xl line-clamp-2">
                      {offer.title}
                    </h3>
                    <div className="mt-2 h-0.5 w-0 bg-[#ff6b35] transition-all duration-500 group-hover:w-12" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 text-center md:mt-10">
          <Link
            href={brandLinks.dicas}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-[#ff6b35] px-8 py-3.5 font-bold text-white shadow-lg shadow-[#ff6b35]/25 transition-all hover:scale-105 hover:bg-[#ff5722] active:scale-95 md:px-10 md:py-4"
          >
            Acessar Ofertas & Cupons
            <ExternalLink className="w-5 h-5" />
          </Link>
          <p className="text-sm font-medium text-gray-500">
            Quer ver mais? Acesse nosso site de promos & cupons.
          </p>
        </div>
      </div>
    </section>
  );
}
