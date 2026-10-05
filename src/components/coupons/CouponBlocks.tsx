import Image from 'next/image';
import Link from 'next/link';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import { Check, ChevronDown, ChevronRight, Copy } from 'lucide-react';
import type { Coupon, CouponFAQ } from '@/lib/couponsData';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';
import { CopyCodeButton } from './CouponActions';

// Archivo entra condensada (eixo wdth) nos números e títulos; a JetBrains Mono separa O de 0 nos códigos.
const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['800'],
  display: 'swap',
});

export const couponFontVariables = `${archivo.variable} ${jetbrainsMono.variable}`;

type DiscountParts =
  | { kind: 'amount'; value: string; unit?: '%'; prefix?: string; currency?: string }
  | { kind: 'words'; text: string };

// "12% OFF" vira número grande. A faixa do Magalu só é resumida ("até R$ 100") nos cards
// compactos: no H1 o texto do desconto fica exatamente como está nos dados.
function parseDiscount(discount: string, compact: boolean): DiscountParts {
  const percent = discount.match(/^(Até )?(\d+)% OFF$/i);
  if (percent) {
    return { kind: 'amount', value: percent[2], unit: '%', ...(percent[1] ? { prefix: 'até' } : {}) };
  }
  const range = compact ? discount.match(/^R\$ ?\d+ a R\$ ?(\d+) OFF$/) : null;
  if (range) return { kind: 'amount', value: range[1], prefix: 'até', currency: 'R$' };
  return { kind: 'words', text: discount };
}

const FIGURE_SIZES = {
  hero: {
    prefix: 'text-[17px] leading-6',
    currency: 'pt-2 text-[64px] leading-none md:text-[86px]',
    value: 'text-[150px] leading-[0.82] tracking-[-0.03em] md:text-[200px]',
    unitColumn: 'pt-2.5 md:pt-3.5',
    unit: 'text-[64px] leading-[0.88] md:text-[86px]',
    off: 'text-[44px] leading-[0.9] md:text-[58px]',
    words: 'text-[64px] leading-[0.92] tracking-[-0.01em] md:text-[96px]',
  },
  tag: {
    prefix: 'text-[11px] leading-[14px]',
    currency: 'pt-1 text-[20px] leading-none',
    value: 'text-[44px] leading-[0.85] tracking-[-0.02em]',
    unitColumn: 'pt-0.5',
    unit: 'text-[20px] leading-[0.9]',
    off: 'text-[14px] leading-none',
    words: 'text-[26px] leading-[0.95]',
  },
} as const;

export function DiscountFigure({ discount, size }: { discount: string; size: keyof typeof FIGURE_SIZES }) {
  const parts = parseDiscount(discount, size === 'tag');
  const s = FIGURE_SIZES[size];

  if (parts.kind === 'words') {
    return <span className={`block font-condensada font-black font-stretch-extra-condensed ${s.words}`}>{parts.text}</span>;
  }

  return (
    <span className="flex flex-col">
      {parts.prefix && (
        <>
          <span className={`font-extrabold ${s.prefix}`}>{parts.prefix}</span>{' '}
        </>
      )}
      <span className="flex items-start gap-[3px] font-condensada font-black font-stretch-extra-condensed">
        {parts.currency && (
          <>
            <span className={s.currency}>{parts.currency}</span>{' '}
          </>
        )}
        <span className={s.value}>{parts.value}</span>
        {parts.unit ? (
          <span className={`flex flex-col ${s.unitColumn}`}>
            <span className={s.unit}>{parts.unit}</span>{' '}
            <span className={s.off}>OFF</span>
          </span>
        ) : (
          <>
            {' '}
            <span className={`${s.unitColumn} ${s.off}`}>OFF</span>
          </>
        )}
      </span>
    </span>
  );
}

// Fica entre o fundo do bloco (sem posição) e o conteúdo, que vai em z-10. No topo da página
// ela é a maior imagem visível e conta como LCP, por isso entra sem lazy loading.
export function BrandWatermark({
  src,
  className,
  align = 'right',
  aboveTheFold = false,
}: {
  src?: string;
  className: string;
  align?: 'right' | 'center';
  aboveTheFold?: boolean;
}) {
  if (!src) return null;

  return (
    <span aria-hidden="true" className={`pointer-events-none absolute z-0 opacity-[0.14] ${className}`}>
      <Image
        src={resolveMediaUrl(src)}
        alt=""
        fill
        sizes="(min-width: 1024px) 400px, 320px"
        loading={aboveTheFold ? 'eager' : 'lazy'}
        className={`object-contain ${align === 'right' ? 'object-right' : 'object-center'}`}
      />
    </span>
  );
}

export function SectionHeading({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="scroll-mt-40 font-condensada text-[34px] font-black leading-[0.95] tracking-[-0.01em] text-marinho font-stretch-extra-condensed md:text-[44px]"
    >
      {children}
    </h2>
  );
}

export function CouponFaq({ items }: { items: CouponFAQ[] }) {
  return (
    <div className="border-t-2 border-marinho">
      {items.map((item, index) => (
        <details key={item.question} open={index === 0} className="group border-b-2 border-marinho">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 py-3 text-[15px] font-extrabold leading-[22px] text-marinho focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-marinho md:text-base [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <ChevronDown
              aria-hidden="true"
              className="h-[22px] w-[22px] shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
            />
          </summary>
          <p className="max-w-[68ch] pb-4 text-sm font-medium leading-[22px] text-marinho-suave md:text-[15px] md:leading-6">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

const otherCodeSize = (code: string) =>
  code.length <= 10 ? 'text-sm' : code.length <= 13 ? 'text-[13px]' : 'text-xs';

// O card inteiro leva à página da loja; só o recorte com o código fica fora do link.
export function OtherCouponCard({ coupon }: { coupon: Coupon }) {
  const tiers = coupon.offerMode === 'discount-code' ? coupon.tiers : undefined;
  const code = coupon.offerMode === 'discount-code' && !tiers?.length ? coupon.code : null;
  const note = tiers?.length
    ? `${tiers.length} códigos por faixa de valor`
    : coupon.offerMode === 'affiliate-link'
      ? 'Sem código: a oferta vem pelo link'
      : null;

  return (
    <article
      aria-label={`${coupon.offerMode === 'affiliate-link' ? 'Ofertas' : 'Cupom'} ${coupon.brand}`}
      className="relative isolate flex w-[200px] shrink-0 snap-start flex-col overflow-hidden rounded-xl border-2 border-marinho bg-white md:w-auto"
    >
      <BrandWatermark src={coupon.brandWatermark} align="center" className="-left-[10%] top-1 h-24 w-[120%]" />
      <Link
        href={`/cupons/${coupon.slug}`}
        className="flex flex-1 flex-col text-marinho focus-visible:outline-3 focus-visible:-outline-offset-6 focus-visible:outline-marinho"
      >
        <span className="block border-b-2 border-marinho bg-amarelo-cupom px-2.5 pt-2 pb-1.5">
          <span className="relative z-10 block">
            <DiscountFigure discount={coupon.discount} size="tag" />
          </span>
        </span>
        <span className="relative z-10 flex min-h-11 items-center justify-between gap-2 px-2.5 py-0.5">
          <span className="text-sm font-extrabold leading-[18px]">{coupon.brand}</span>
          <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0" />
        </span>
        {note && (
          <span className="relative z-10 mx-2.5 mt-auto mb-2.5 rounded-lg border-2 border-dashed border-marinho bg-white px-2.5 py-2 text-xs font-bold leading-4">
            {note}
          </span>
        )}
      </Link>
      {code && (
        <div className="relative z-10 mx-2.5 mb-2.5 flex items-center gap-1.5 rounded-lg border-2 border-dashed border-marinho bg-white pl-2.5">
          <code className={`min-w-0 flex-1 break-all font-codigo font-extrabold leading-5 text-marinho ${otherCodeSize(code)}`}>
            {code}
          </code>
          <CopyCodeButton
            code={code}
            brand={coupon.brand}
            placement="coupon_page_others"
            ariaLabel={`Copiar o código ${code} da ${coupon.brand}`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-r-md bg-laranja text-marinho focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-marinho data-[copied=true]:bg-verde-escuro data-[copied=true]:text-white"
            copiedChildren={<Check aria-hidden="true" className="h-[18px] w-[18px]" />}
          >
            <Copy aria-hidden="true" className="h-[18px] w-[18px]" />
          </CopyCodeButton>
        </div>
      )}
    </article>
  );
}
