import Image from 'next/image';
import Link from 'next/link';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import { Check, ChevronDown, ChevronRight, Copy, ExternalLink, Scissors } from 'lucide-react';
import { CouponStoreLink } from '@/components/CouponComponents';
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

// "12% OFF" vira número grande. A faixa do Magalu só é resumida ("até R$ 100") nos cards:
// no H1 o texto do desconto fica exatamente como está nos dados.
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
    // Em japonês e chinês cada caractere ocupa a largura cheia: a 64px só cabem 5 no celular e
    // "活动" se partia. A 48px cabem 6 até numa tela de 320px.
    words:
      'text-[64px] leading-[0.92] tracking-[-0.01em] md:text-[96px] max-md:[&:lang(ja)]:text-[48px] max-md:[&:lang(zh)]:text-[48px]',
  },
  // Primeiro card dos Destaques no hub; cresce no desktop, onde o card passa de 550px.
  lead: {
    prefix: 'text-[15px] leading-5 lg:text-[17px] lg:leading-6',
    currency: 'pt-2 text-[44px] leading-none lg:text-[56px]',
    value: 'text-[120px] leading-[0.85] tracking-[-0.03em] lg:text-[150px]',
    unitColumn: 'pt-1.5 lg:pt-2',
    unit: 'text-[52px] leading-[0.9] lg:text-[64px]',
    off: 'text-[34px] leading-none lg:text-[42px]',
    words: 'text-[56px] leading-[0.92] tracking-[-0.01em] lg:text-[72px]',
  },
  featured: {
    prefix: 'text-sm leading-[18px]',
    currency: 'pt-2 text-[36px] leading-none',
    value: 'text-[96px] leading-[0.85] tracking-[-0.03em]',
    unitColumn: 'pt-1.5',
    unit: 'text-[42px] leading-[0.9]',
    off: 'text-[28px] leading-none',
    words: 'text-[48px] leading-[0.92] tracking-[-0.01em]',
  },
  // Cards das prateleiras do hub.
  card: {
    prefix: 'text-[13px] leading-4',
    currency: 'pt-1.5 text-[26px] leading-none',
    value: 'text-[68px] leading-[0.85] tracking-[-0.02em]',
    unitColumn: 'pt-1',
    unit: 'text-[30px] leading-[0.9]',
    off: 'text-[20px] leading-none',
    words: 'text-[40px] leading-[38px] tracking-[-0.01em]',
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
  // Canhoto do cupom na gaveta do sumário dos artigos, com 92px de largura.
  stub: {
    prefix: 'text-xs leading-4',
    currency: 'pt-1 text-[22px] leading-none',
    value: 'text-[52px] leading-[0.88] tracking-[-0.02em]',
    unitColumn: 'pt-1',
    unit: 'text-[22px] leading-[0.9]',
    off: 'text-[15px] leading-none',
    words: 'text-[24px] leading-[0.95]',
  },
} as const;

export function DiscountFigure({ discount, size }: { discount: string; size: keyof typeof FIGURE_SIZES }) {
  const parts = parseDiscount(discount, size !== 'hero');
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

// "right-inset" deixa o logo perto da borda direita sem cortar quando a caixa vaza o card.
const WATERMARK_POSITION = {
  right: 'object-right',
  'right-inset': 'object-[88%_center]',
  center: 'object-center',
} as const;

// Fica entre o fundo do bloco (sem posição) e o conteúdo, que vai em z-10. No topo da página
// ela é a maior imagem visível e conta como LCP, por isso entra sem lazy loading.
// A moldura inset-0 recorta o que vaza: sem ela o card com overflow-hidden fica rolável na
// horizontal, e selecionar o código arrastando o mouse empurra o conteúdo para o lado.
export function BrandWatermark({
  src,
  className,
  align = 'right',
  aboveTheFold = false,
}: {
  src?: string;
  className: string;
  align?: keyof typeof WATERMARK_POSITION;
  aboveTheFold?: boolean;
}) {
  if (!src) return null;

  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <span className={`absolute opacity-[0.14] ${className}`}>
        <Image
          src={resolveMediaUrl(src)}
          alt=""
          fill
          sizes="(min-width: 1024px) 400px, 320px"
          loading={aboveTheFold ? 'eager' : 'lazy'}
          className={`object-contain ${WATERMARK_POSITION[align]}`}
        />
      </span>
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
          <code className={`min-w-0 flex-1 break-all text-balance font-codigo font-extrabold leading-5 text-marinho ${otherCodeSize(code)}`}>
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

// Desconto em palavras, código longo, faixas ou oferta por link não cabem em meia linha no celular.
function needsWideCard(coupon: Coupon) {
  if (coupon.offerMode === 'affiliate-link' || coupon.tiers?.length) return true;
  return parseDiscount(coupon.discount, true).kind === 'words' || coupon.code.length > 10;
}

// Cada card ocupa uma ou duas colunas da prateleira. Um card estreito sem par logo ao lado
// ocupa a linha inteira, para não deixar buraco na grade do celular.
export function layoutShelf(coupons: Coupon[]) {
  const wide = coupons.map(needsWideCard);
  let waitingForPartner = false;

  return coupons.map((coupon, index) => {
    if (wide[index]) return { coupon, wide: true };
    if (waitingForPartner) {
      waitingForPartner = false;
      return { coupon, wide: false };
    }
    waitingForPartner = index + 1 < coupons.length && !wide[index + 1];
    return { coupon, wide: !waitingForPartner };
  });
}

export const asSentence = (text: string) => {
  const trimmed = text.trim();
  return `${trimmed.charAt(0).toUpperCase()}${trimmed.slice(1)}${/[.!?]$/.test(trimmed) ? '' : '.'}`;
};

const HUB_ACTION =
  'flex items-center justify-center gap-2 rounded-lg bg-laranja font-extrabold text-marinho transition-colors hover:bg-laranja/85 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-marinho data-[copied=true]:bg-verde-escuro data-[copied=true]:text-white';

const FEATURED_CUTOUT = {
  cutout: 'mx-3 mt-3.5 mb-3 rounded-[10px]',
  codeLayout: 'flex items-center gap-2.5 pt-3 pr-2 pb-2.5 pl-3.5',
  code: 'min-w-0 flex-1 text-[22px] leading-7 tracking-[0.04em]',
  action: 'min-h-12 shrink-0 border-2 border-marinho px-[18px] text-[15px] data-[copied=true]:border-verde-escuro',
} as const;

const HUB_CARDS = {
  lead: {
    article: 'rounded-[14px] border-[3px]',
    price: 'bg-laranja px-4 pt-3.5 pb-3',
    figure: 'lead',
    body: 'px-4 pt-2.5',
    brand: 'text-[22px] leading-[26px]',
    chevron: 'h-[22px] w-[22px]',
    note: 'text-[13px] leading-[18px]',
    watermark: '-right-9 top-[18px] h-[110px] w-[270px] lg:top-6 lg:right-4 lg:h-[130px] lg:w-[360px]',
    watermarkAlign: 'right',
    ...FEATURED_CUTOUT,
  },
  featured: {
    article: 'rounded-[14px] border-2',
    price: 'bg-amarelo-cupom px-4 pt-3.5 pb-3',
    figure: 'featured',
    body: 'px-4 pt-2.5',
    brand: 'text-[19px] leading-[26px]',
    chevron: 'h-[22px] w-[22px]',
    note: 'text-[13px] leading-[18px]',
    watermark: '-right-6 top-2.5 h-[150px] w-[150px]',
    watermarkAlign: 'right',
    ...FEATURED_CUTOUT,
  },
  wide: {
    article: 'rounded-xl border-2',
    price: 'bg-amarelo-cupom px-3.5 pt-2.5 pb-2',
    figure: 'card',
    body: 'px-3.5 pt-2',
    brand: 'text-[17px] leading-5',
    chevron: 'h-[18px] w-[18px]',
    note: 'text-[13px] leading-[18px]',
    watermark: '-left-[6%] top-1.5 h-[150px] w-[112%]',
    watermarkAlign: 'right-inset',
    cutout: 'mx-2.5 mt-3.5 mb-2.5 rounded-lg',
    codeLayout: 'flex items-center gap-2.5 pt-3 pr-2 pb-2.5 pl-3',
    code: 'min-w-0 flex-1 text-lg leading-6',
    action: 'min-h-11 shrink-0 px-3.5 text-sm',
  },
  narrow: {
    article: 'rounded-xl border-2',
    price: 'bg-amarelo-cupom px-3 pt-2.5 pb-2',
    figure: 'card',
    body: 'px-3 pt-2',
    brand: 'text-[15px] leading-5',
    chevron: 'h-[18px] w-[18px]',
    note: 'text-[12.5px] leading-[17px]',
    watermark: '-left-[8%] top-1.5 h-[150px] w-[116%]',
    watermarkAlign: 'center',
    cutout: 'mx-2.5 mt-3.5 mb-2.5 rounded-lg',
    codeLayout: 'flex flex-col gap-2 px-2 pt-3 pb-2',
    code: 'text-center text-base leading-[22px] tracking-[0.02em]',
    action: 'min-h-11 w-full px-3.5 text-sm',
  },
} as const;

export type HubCardVariant = keyof typeof HUB_CARDS;

// O card inteiro leva à página da loja; só o recorte com o código ou a ação fica fora do link.
export function HubCouponCard({
  coupon,
  variant,
  className = '',
}: {
  coupon: Coupon;
  variant: HubCardVariant;
  className?: string;
}) {
  const v = HUB_CARDS[variant];
  const featured = variant === 'lead' || variant === 'featured';
  const placement = featured ? 'coupon_hub_featured' : 'coupon_hub';
  const tiers = coupon.offerMode === 'discount-code' && coupon.tiers?.length ? coupon.tiers : null;
  const code = coupon.offerMode === 'discount-code' && !tiers ? coupon.code : null;

  return (
    <article
      aria-label={`${coupon.offerMode === 'affiliate-link' ? 'Ofertas' : 'Cupom'} ${coupon.brand}`}
      className={`relative isolate flex flex-col overflow-hidden border-marinho bg-white ${v.article} ${className}`}
    >
      <BrandWatermark
        src={coupon.brandWatermark}
        align={v.watermarkAlign}
        aboveTheFold={featured}
        className={v.watermark}
      />
      <Link
        href={`/cupons/${coupon.slug}`}
        className="group/card flex flex-1 flex-col text-marinho focus-visible:outline-3 focus-visible:-outline-offset-6 focus-visible:outline-marinho"
      >
        <div className={`border-b-2 border-marinho ${v.price}`}>
          <div className="relative z-10">
            <DiscountFigure discount={coupon.discount} size={v.figure} />
          </div>
        </div>
        <div className={`relative z-10 flex flex-col gap-1 ${v.body}`}>
          <div className="flex min-h-11 items-center justify-between gap-2">
            <h3 className={`min-w-0 font-extrabold underline-offset-[3px] group-hover/card:underline ${v.brand}`}>
              {coupon.brand}
            </h3>
            <ChevronRight aria-hidden="true" className={`shrink-0 ${v.chevron}`} />
          </div>
          {variant === 'lead' && coupon.featuredPitch && (
            <p className="text-[15px] font-bold leading-[22px]">{coupon.featuredPitch}</p>
          )}
          <p className={`font-medium text-marinho-suave ${v.note}`}>{asSentence(coupon.shortDescription)}</p>
        </div>
      </Link>
      <div
        className={`relative z-10 border-2 border-dashed border-marinho bg-white has-[[data-copied=true]]:border-solid has-[[data-copied=true]]:border-verde-escuro has-[[data-copied=true]]:bg-verde-claro ${v.cutout} ${
          code ? v.codeLayout : 'flex flex-col gap-2 px-2.5 pt-3 pb-2.5'
        }`}
      >
        <span aria-hidden="true" className="absolute -top-[11px] left-2 flex bg-white px-[3px]">
          <Scissors className="h-4 w-4" />
        </span>
        {code ? (
          <>
            <code className={`font-codigo font-extrabold text-marinho break-all text-balance ${v.code}`}>{code}</code>
            <CopyCodeButton
              code={code}
              brand={coupon.brand}
              placement={placement}
              ariaLabel={`Copiar o código ${code} da ${coupon.brand}`}
              className={`${HUB_ACTION} ${v.action}`}
              copiedChildren={
                <>
                  <Check aria-hidden="true" className="h-[18px] w-[18px]" />
                  Copiado
                </>
              }
            >
              <Copy aria-hidden="true" className="h-[18px] w-[18px]" />
              Copiar
            </CopyCodeButton>
          </>
        ) : tiers ? (
          <>
            <p className="text-[13px] font-semibold leading-[19px]">
              {tiers.length} códigos, de <span className="whitespace-nowrap">{tiers[0].discount}</span> a{' '}
              <span className="whitespace-nowrap">{tiers[tiers.length - 1].discount}</span>, um para cada faixa de valor.
            </p>
            <Link href={`/cupons/${coupon.slug}#faixas-de-desconto`} className={`${HUB_ACTION} ${v.action}`}>
              Escolher minha faixa
            </Link>
          </>
        ) : (
          <>
            <p className="text-[13px] font-bold leading-[18px]">Sem código: a oferta vem pelo link.</p>
            <CouponStoreLink
              href={coupon.offerUrl}
              brand={coupon.brand}
              placement={placement}
              className={`${HUB_ACTION} ${v.action}`}
            >
              {coupon.offerActionLabel || 'Ver oferta'}
              <ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" />
            </CouponStoreLink>
          </>
        )}
      </div>
    </article>
  );
}
