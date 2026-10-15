'use client';

import { Check, Copy, ExternalLink, Scissors } from 'lucide-react';
import { CouponStoreLink } from '@/components/CouponComponents';
import { CopyCodeButton } from '@/components/coupons/CouponActions';
import { PRIMARY_ACTION, SECONDARY_ACTION } from '@/components/coupons/CouponBlocks';
import { CutoutCode } from '@/components/coupons/StoreLayout';
import type { ArticleStoreBlock } from '@/lib/articleStore';
import { getArticleCopy } from '../articleCopy';
import { getCouponCopyLabels, type CouponCopyLocale } from '../couponCopyLocale';
import { ARTICLE_CUTOUT_ID } from '../dockVisibility';
import { getCodeTitle, getSidebarCopy } from '../sidebarCopy';

type Variant = 'top' | 'end' | 'sidebar';

export type ArticleCouponCutoutProps = {
  variant: Variant;
  block: ArticleStoreBlock;
  locale: CouponCopyLocale;
  reviewSlug: string;
  storeLabel: string;
  sponsored: boolean;
};

// A marcação é a mesma nas três posições; muda só o tamanho. No topo, o recorte assenta ao abrir a página.
const VARIANTS: Record<Variant, { box: string; layout: string; placement: 'review_top' | 'review_end' | 'review_sidebar' }> = {
  top: {
    box: 'recorte-entra px-[18px] pt-6 pb-[18px] md:px-6',
    layout: 'md:grid md:grid-cols-[minmax(0,1fr)_260px] md:items-center md:gap-6',
    placement: 'review_top',
  },
  end: {
    box: 'px-[18px] pt-7 pb-5 md:px-8 md:pt-9 md:pb-7',
    layout: 'md:grid md:grid-cols-[minmax(0,1fr)_280px] md:items-center md:gap-8',
    placement: 'review_end',
  },
  sidebar: {
    box: 'px-4 pt-6 pb-4',
    layout: '',
    placement: 'review_sidebar',
  },
};

// Recorte do código no artigo, no visual das páginas de loja: com código, é um .recorte (globals.css), que
// fica verde ao copiar enquanto a tesoura corre, mostra onde colar e destaca o link da loja. Sem código
// (Lejour), só o link da loja.
export function ArticleCouponCutout({ variant, block, locale, reviewSlug, storeLabel, sponsored }: ArticleCouponCutoutProps) {
  const { box, layout, placement } = VARIANTS[variant];
  const { code, codeKind, brand, discount, storeHref, slug } = block;
  const sidebarCopy = getSidebarCopy(locale);
  const labels = getCouponCopyLabels(locale);
  const title = code ? getCodeTitle(sidebarCopy, codeKind, brand) : brand;
  const copiedHint = getArticleCopy(locale).copiedHint(brand, codeKind);

  return (
    <section
      id={variant === 'top' ? ARTICLE_CUTOUT_ID : undefined}
      data-recorte={variant}
      aria-label={title}
      className={`group/recorte relative rounded-2xl border-[2.5px] border-dashed border-marinho bg-white text-marinho print:hidden ${code ? 'recorte' : ''} ${box}`}
    >
      <span
        aria-hidden="true"
        className={`absolute -top-[15px] left-4 flex h-7 w-7 items-center justify-center rounded-full bg-amarelo-cupom ${code ? 'recorte-tesoura' : ''}`}
      >
        <Scissors className="h-5 w-5" />
      </span>

      <div className={layout}>
        <div className="min-w-0 text-center">
          <p className="text-[13px] font-bold leading-[18px] tracking-[0.04em] text-marinho-suave uppercase">{title}</p>
          {code && (
            <div className="mt-1.5">
              <CutoutCode code={code} />
            </div>
          )}
          {discount && <p className="mt-1 text-[15px] font-extrabold leading-[22px] text-balance">{discount}</p>}
        </div>

        <div className="mt-3.5 flex flex-col gap-2.5 md:mt-0">
          {code && (
            <CopyCodeButton
              code={code}
              brand={slug}
              contentSlug={reviewSlug}
              placement={placement}
              ariaLabel={labels.copyCoupon(code)}
              copiedStatus={copiedHint}
              className={PRIMARY_ACTION}
              copiedChildren={
                <>
                  <Check aria-hidden="true" className="h-5 w-5 shrink-0" />
                  {labels.copied}
                </>
              }
            >
              <Copy aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
              {labels.copy}
            </CopyCodeButton>
          )}
          {storeHref && (
            <CouponStoreLink
              href={storeHref}
              couponCode={code}
              brand={slug}
              contentSlug={reviewSlug}
              linkLabel={storeLabel}
              sponsored={sponsored}
              placement={placement}
              className={
                code
                  ? `${SECONDARY_ACTION} group-has-[[data-copied=true]]/recorte:bg-laranja group-has-[[data-copied=true]]/recorte:hover:bg-laranja/85`
                  : PRIMARY_ACTION
              }
            >
              {storeLabel}
              <ExternalLink aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
            </CouponStoreLink>
          )}
        </div>
      </div>

      {/* O leitor de tela ouve a mesma frase pelo status do botão de copiar. */}
      {code && (
        <p
          aria-hidden="true"
          className="mt-3 hidden items-center justify-center gap-2 text-center text-[13px] font-bold leading-[18px] text-verde-escuro group-has-[[data-copied=true]]/recorte:flex"
        >
          <Check className="h-[18px] w-[18px] shrink-0" />
          {copiedHint}
        </p>
      )}
    </section>
  );
}
