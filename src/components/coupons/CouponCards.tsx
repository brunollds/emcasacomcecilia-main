import Link from 'next/link';
import { Check, ChevronRight, Copy, ExternalLink, Scissors } from 'lucide-react';
import { CouponStoreLink } from '@/components/CouponComponents';
import type { Coupon } from '@/lib/couponsData';
import { CopyCodeButton } from './CouponActions';
import { BrandWatermark, DiscountFigure, asSentence, parseDiscount } from './CouponBlocks';

// Cards que levam à página de uma loja: os do hub e os de "Outros cupons" no fim das páginas de loja.

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

type HubCardVariant = keyof typeof HUB_CARDS;

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
