import type { CSSProperties } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HomeSection } from '@/components/sections/HomeSection';
import { OfferCarousel } from '@/components/sections/OfferCarousel';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { brandLinks } from '@/lib/brandLinks';
import { getCouponBySlug } from '@/lib/couponsData';
import { getCarouselOffers, type Offer } from '@/lib/dicasOffers';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

// "Explore a casa": a DAMIE e o Dicas & Ofertas, com as ofertas do dia do feed num carrossel dentro do
// card amarelo. Um link não pode ter links dentro: com ofertas, o card amarelo é uma caixa com o
// carrossel e o "Ver todas as ofertas"; sem oferta com foto, volta a ser o link de antes.

const CARD = `group flex flex-1 flex-col overflow-hidden rounded-xl border-2 border-marinho motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1 md:rounded-[14px] ${FOCUS_RING}`;
const DICAS_TEXT = 'Cupons, promoções e oportunidades que valem acompanhar.';

export function MyLinks({ offers }: { offers: Offer[] }) {
  // O código sai da loja em couponsData.ts; sem cupom ativo, a legenda fica só com a loja.
  const damie = getCouponBySlug('damie');
  const damieCode = damie?.offerMode === 'discount-code' ? damie.code : undefined;
  const carousel = getCarouselOffers(offers);

  return (
    <HomeSection id="titulo-explore-a-casa" title="Explore a casa">
      <ul className="grid gap-3 md:grid-cols-3 md:gap-5">
        <li className="revela flex" style={{ '--i': 0 } as CSSProperties}>
          <Link
            href={brandLinks.damie}
            target="_blank"
            rel="noopener noreferrer"
            className={`${CARD} bg-white text-marinho`}
          >
            <span className="relative block h-[150px] overflow-hidden bg-creme md:h-auto md:min-h-[160px] md:flex-1">
              <Image
                src={resolveMediaUrl('/images/universe/damie-hero-cecilia.webp')}
                alt="Cecília debruçada sobre a caixa de entrega da DAMIE"
                fill
                sizes="(min-width: 1200px) 360px, (min-width: 768px) 33vw, 100vw"
                className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"
              />
            </span>
            <span className="border-t-2 border-marinho bg-creme p-3.5 text-[13px] leading-[19px] font-bold md:px-4 md:text-sm md:leading-5">
              DAMIE: móveis, poltronas e sofás
              {damieCode ? (
                <>
                  {' '}
                  com cupom <strong className="font-extrabold">{damieCode}</strong>
                </>
              ) : null}
            </span>
          </Link>
        </li>
        <li className="revela flex min-w-0 md:col-span-2" style={{ '--i': 1 } as CSSProperties}>
          {carousel.length > 0 ? (
            <div className="flex min-w-0 flex-1 flex-col gap-3 rounded-xl border-2 border-marinho bg-amarelo-cupom py-4 text-marinho md:gap-4 md:rounded-[14px] md:py-6">
              <OfferCarousel
                items={carousel}
                heading={
                  <div className="flex min-w-0 flex-col gap-1.5 md:gap-2">
                    <h3 className="font-condensada text-2xl leading-none font-black font-stretch-extra-condensed md:text-[32px]">
                      Dicas & Ofertas
                    </h3>
                    <p className="text-[13px] leading-[19px] font-semibold md:text-[15px] md:leading-[22px] md:font-medium">
                      {DICAS_TEXT}
                    </p>
                  </div>
                }
              />
              <Link
                href={brandLinks.dicas}
                target="_blank"
                rel="noopener noreferrer"
                className={`mx-4 flex min-h-11 items-center justify-center rounded-[10px] border-2 border-marinho bg-white px-5 text-sm font-extrabold hover:bg-marinho hover:text-white motion-safe:transition-colors md:mx-6 md:self-start ${FOCUS_RING}`}
              >
                Ver todas as ofertas
              </Link>
            </div>
          ) : (
            <Link
              href={brandLinks.dicas}
              target="_blank"
              rel="noopener noreferrer"
              className={`${CARD} min-h-[120px] justify-center gap-1.5 bg-amarelo-cupom p-4 text-marinho md:min-h-[200px] md:gap-3 md:p-6`}
            >
              <h3 className="font-condensada text-2xl leading-none font-black font-stretch-extra-condensed md:text-[32px]">
                Dicas & Ofertas
              </h3>
              <p className="text-[13px] leading-[19px] font-semibold md:text-[15px] md:leading-[22px] md:font-medium">
                {DICAS_TEXT}
              </p>
              <span className="mt-1 hidden min-h-11 items-center self-start rounded-[10px] border-2 border-marinho bg-white px-5 text-sm font-extrabold md:inline-flex">
                Ver ofertas
              </span>
            </Link>
          )}
        </li>
      </ul>
    </HomeSection>
  );
}
