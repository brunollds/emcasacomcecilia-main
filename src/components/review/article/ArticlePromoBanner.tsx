import { ArrowUpRight } from 'lucide-react';
import { CouponStoreLink } from '@/components/CouponComponents';
import { FOCUS_RING } from '@/components/ui/focusRing';
import type { StoreBanner } from '@/lib/storeBanners';
import { getArticleCopy } from '../articleCopy';
import type { CouponCopyLocale } from '../couponCopyLocale';
import { HideAfter } from './HideAfter';

export type ArticlePromoBannerProps = {
  banner: StoreBanner;
  locale: CouponCopyLocale;
  storeBrand: string;
  reviewSlug: string;
};

// Banner de campanha da loja entre as seções do artigo (storeBanners.ts). O cartão inteiro é o link de afiliado,
// medido como coupon_store_click com o lugar do banner e sem o código da loja, que não é dele.
export function ArticlePromoBanner({ banner, locale, storeBrand, reviewSlug }: ArticlePromoBannerProps) {
  const label = getArticleCopy(locale).adLabel;
  const { headline, text, action } = banner.copy[locale];

  const aside = (
    <aside aria-label={label} data-promo-banner={banner.slot} className="text-marinho print:hidden">
      <p className="mb-2 flex items-center gap-2 text-[11px] font-extrabold tracking-[0.14em] text-marinho-suave uppercase after:h-px after:flex-1 after:bg-marinho/15">
        {label}
      </p>
      <CouponStoreLink
        href={banner.href}
        brand={storeBrand}
        contentSlug={reviewSlug}
        sponsored
        placement={banner.slot === 'top' ? 'review_banner_top' : 'review_banner_mid'}
        className={`grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-2xl border-2 border-marinho bg-creme p-4 shadow-[4px_4px_0_var(--color-marinho)] md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-6 md:px-6 md:py-5 motion-safe:transition-[translate,box-shadow] motion-safe:hover:-translate-px motion-safe:hover:shadow-[5px_5px_0_var(--color-marinho)] ${FOCUS_RING}`}
      >
        <BannerArt art={banner.art} />
        <span className="min-w-0">
          <span className="block text-[13px] font-black tracking-[0.22em]">{storeBrand}</span>
          <span className="mt-1 block font-condensada text-[22px] leading-tight font-black font-stretch-extra-condensed md:text-[26px]">
            {headline}
          </span>
          <span className="mt-1.5 block text-sm leading-5 font-semibold text-marinho-suave">{text}</span>
        </span>
        <span className="col-span-2 flex min-h-[52px] items-center justify-center gap-2 rounded-[10px] border-2 border-marinho bg-laranja px-4 text-[15px] font-extrabold md:col-span-1 md:whitespace-nowrap">
          {action}
          <ArrowUpRight aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
        </span>
      </CouponStoreLink>
    </aside>
  );

  return banner.endsAt ? <HideAfter until={banner.endsAt}>{aside}</HideAfter> : aside;
}

// Arte nossa, sem foto de produto: a etiqueta amarela com o número da campanha ou a sacola com a etiqueta de preço.
function BannerArt({ art }: { art: StoreBanner['art'] }) {
  if (art.kind === 'tag') {
    return (
      <span
        aria-hidden="true"
        className="relative grid size-[76px] shrink-0 -rotate-[4deg] place-items-center rounded-[11px] border-2 border-marinho bg-amarelo-cupom md:size-[108px] md:rounded-[14px]"
      >
        <span className="absolute top-[7px] left-1/2 size-[9px] -translate-x-1/2 rounded-full border-2 border-marinho bg-creme md:top-[9px] md:size-3" />
        <span className="mt-3 text-center font-condensada leading-none font-black font-stretch-extra-condensed md:mt-4">
          <span className="block text-[26px] md:text-[40px]">{art.value}</span>
          <span className="block text-[10px] tracking-[0.06em] md:text-[13px]">{art.unit}</span>
        </span>
      </span>
    );
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 108 108" className="size-[76px] shrink-0 md:size-[108px]">
      <rect x="2" y="2" width="104" height="104" rx="14" fill="var(--color-verde-claro)" stroke="var(--color-marinho)" strokeWidth="2" />
      <path d="M30 40h48l-5 46H35z" fill="var(--color-creme)" stroke="var(--color-marinho)" strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M42 46V35a12 12 0 0 1 24 0v11" fill="none" stroke="var(--color-marinho)" strokeWidth="2.6" strokeLinecap="round" />
      <g transform="rotate(-14 70 66)">
        <path d="M56 56h26l8 10-8 10H56z" fill="var(--color-laranja)" stroke="var(--color-marinho)" strokeWidth="2.4" strokeLinejoin="round" />
        <circle cx="82" cy="66" r="2.6" fill="var(--color-creme)" stroke="var(--color-marinho)" strokeWidth="1.6" />
        <path d="M62 71l9-10" stroke="var(--color-marinho)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="63.5" cy="62.5" r="2" fill="none" stroke="var(--color-marinho)" strokeWidth="1.6" />
        <circle cx="69.5" cy="69.5" r="2" fill="none" stroke="var(--color-marinho)" strokeWidth="1.6" />
      </g>
    </svg>
  );
}
