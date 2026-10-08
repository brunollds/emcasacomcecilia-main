import Link from 'next/link';
import Image from 'next/image';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { brandLinks } from '@/lib/brandLinks';
import { getCouponBySlug } from '@/lib/couponsData';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

// "Explore a casa": a DAMIE, o Dicas & Ofertas e o E-book Air Fryer, que segue em preparação (o
// card abre o e-mail do "Avise-me").

const CARD = `group flex flex-1 flex-col overflow-hidden rounded-xl border-2 border-marinho motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1 md:rounded-[14px] ${FOCUS_RING}`;

export function MyLinks() {
  // O código sai da loja em couponsData.ts; sem cupom ativo, a legenda fica só com a loja.
  const damie = getCouponBySlug('damie');
  const damieCode = damie?.offerMode === 'discount-code' ? damie.code : undefined;

  return (
    <section aria-labelledby="titulo-explore-a-casa" className="bg-white pb-8 md:pb-10">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3 px-4 md:gap-6 md:px-10">
        <h2
          id="titulo-explore-a-casa"
          className="font-condensada text-[32px] leading-none font-black text-marinho font-stretch-extra-condensed md:text-5xl"
        >
          Explore a casa
        </h2>
        <ul className="grid gap-3 md:grid-cols-3 md:gap-5">
          <li className="flex">
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
          <li className="flex">
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
                Cupons, promoções e oportunidades que valem acompanhar.
              </p>
              <span className="mt-1 hidden min-h-11 items-center self-start rounded-[10px] border-2 border-marinho bg-white px-5 text-sm font-extrabold md:inline-flex">
                Ver ofertas
              </span>
            </Link>
          </li>
          <li className="flex">
            <a
              href={brandLinks.airFryerEbook}
              className={`${CARD} min-h-[120px] justify-center gap-2.5 bg-marinho p-4 text-white md:min-h-[200px] md:gap-3 md:p-6`}
            >
              <span className="text-xs font-bold text-amarelo-cupom">Em preparação</span>
              <h3 className="font-condensada text-2xl leading-none font-black text-amarelo-cupom font-stretch-extra-condensed md:text-[32px]">
                E-book Air Fryer
              </h3>
              <p className="text-[13px] leading-[19px] font-semibold md:text-[15px] md:leading-[22px] md:font-medium">
                Guia com receitas práticas para a air fryer.
              </p>
              <span className="flex min-h-11 items-center justify-center rounded-lg border-2 border-amarelo-cupom bg-amarelo-cupom px-5 text-[13px] font-extrabold text-marinho md:self-start md:rounded-[10px] md:text-sm">
                Avise-me
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
