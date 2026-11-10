'use client';

import { ArrowRight, Check, Copy, ExternalLink } from 'lucide-react';
import { CouponStoreLink } from '@/components/CouponComponents';
import { CopyCodeButton } from '@/components/coupons/CouponActions';
import { PRIMARY_ACTION_COMPACT } from '@/components/coupons/couponActionStyles';
import { FOCUS_RING } from '@/components/ui/focusRing';
import type { ArticleStoreBlock } from '@/lib/articleStore';
import { getArticleCopy } from '../articleCopy';
import { ARTICLE_CUTOUT_ID } from '../articleAnchors';
import { getCouponCopyLabels, type CouponCopyLocale } from '../couponCopyLocale';
import { TrackedCouponPageLink } from '../TrackedCouponPageLink';
import { ArticleLimitedCodeLines } from './ArticleLimitedCodeLines';

type Variant = 'top' | 'end' | 'sidebar' | 'drawer';

const PLACEMENT = { top: 'review_top', end: 'review_end', sidebar: 'review_sidebar', drawer: 'review_mobile_drawer' } as const;

const FRAME: Record<Variant, string> = {
  top: 'rounded-2xl border-2 border-marinho bg-creme p-3.5 text-marinho print:hidden md:p-4',
  sidebar: 'rounded-2xl border-2 border-marinho bg-creme p-3.5 text-marinho print:hidden md:p-4',
  end: 'text-marinho print:hidden',
  drawer: 'mx-4 mt-3.5 scroll-mt-3 text-marinho',
};

const ROW_LINK = `inline-flex min-h-11 items-center gap-1.5 text-sm font-extrabold underline underline-offset-[3px] hover:text-marinho-suave ${FOCUS_RING}`;

export type ArticleStoreCodesProps = {
  variant: Variant;
  blocks: readonly ArticleStoreBlock[];
  locale: CouponCopyLocale;
  reviewSlug: string;
  storeLabel: string;
};

// O artigo de várias lojas: uma linha por loja, todas com o mesmo peso e na ordem do artigo (nenhuma é a principal).
// Cada linha é um .recorte (globals.css): fica verde ao copiar o código dela. No topo, a lista leva o id do recorte
// (#cupom-artigo), que o dock do celular observa; no fim, o título e o #loja vêm do ArticleEnd. Na gaveta do celular, fica
// dentro do <dialog>: com ele aberto, o resto da página é inerte, e o fallback de cópia vai para o dialog do botão.
export function ArticleStoreCodes({ variant, blocks, locale, reviewSlug, storeLabel }: ArticleStoreCodesProps) {
  const copy = getArticleCopy(locale);
  const labels = getCouponCopyLabels(locale);
  const placement = PLACEMENT[variant];
  const wide = variant === 'top' || variant === 'end';

  return (
    <section
      id={variant === 'top' ? ARTICLE_CUTOUT_ID : undefined}
      data-store-codes={variant}
      // No fim, o h2 do ArticleEnd já dá o nome.
      aria-label={variant === 'end' ? undefined : copy.storeCodesTitle}
      className={FRAME[variant]}
    >
      {variant !== 'end' && (
        <p className="mb-3 text-[13px] font-bold leading-[18px] tracking-[0.04em] text-marinho-suave uppercase">
          {copy.storeCodesTitle}
        </p>
      )}
      <ul className={`grid gap-3 ${wide && blocks.length > 1 ? 'md:grid-cols-2' : ''}`}>
        {blocks.map((block) => {
          const { code, codeKind, brand, discount, storeHref, storeSponsored, slug, couponPageHref } = block;
          const copiedHint = copy.copiedHint({ slug, brand }, codeKind);
          return (
            <li
              key={slug}
              data-store-code={slug}
              className={`group/recorte relative min-w-0 rounded-xl border-2 border-dashed border-marinho bg-white px-3.5 pt-3 pb-1.5 ${code ? 'recorte' : ''}`}
            >
              <p className="text-[15px] leading-5 font-extrabold">{brand}</p>
              {discount && <p className="mt-0.5 text-[13px] leading-[18px] font-semibold text-marinho-suave text-balance">{discount}</p>}
              {code && (
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <code className="min-w-0 flex-1 font-codigo text-base leading-6 font-extrabold break-all text-balance">{code}</code>
                  <CopyCodeButton
                    code={code}
                    brand={slug}
                    contentSlug={reviewSlug}
                    placement={placement}
                    ariaLabel={labels.copyCoupon(code)}
                    copiedStatus={copiedHint}
                    className={`${PRIMARY_ACTION_COMPACT} shrink-0`}
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
                </div>
              )}
              <div className="mt-1 flex flex-wrap items-center gap-x-4">
                {storeHref && (
                  <CouponStoreLink
                    href={storeHref}
                    couponCode={code}
                    brand={slug}
                    contentSlug={reviewSlug}
                    linkLabel={`${storeLabel}: ${brand}`}
                    sponsored={storeSponsored}
                    placement={placement}
                    className={ROW_LINK}
                  >
                    {storeLabel}
                    <ExternalLink aria-hidden="true" className="size-4 shrink-0" />
                  </CouponStoreLink>
                )}
                {/* Na lateral, a linha fica curta: com 4 lojas ela já passa da tela, e as regras estão no topo e no fim. */}
                {couponPageHref && variant !== 'sidebar' && (
                  <TrackedCouponPageLink
                    href={couponPageHref}
                    contentSlug={reviewSlug}
                    linkLabel={copy.storeRulesOf(block)}
                    placement={placement}
                    className={ROW_LINK}
                  >
                    {copy.storeRulesOf(block)}
                    <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
                  </TrackedCouponPageLink>
                )}
              </div>
              {block.limitedCodes && (
                <ArticleLimitedCodeLines
                  items={block.limitedCodes}
                  locale={locale}
                  brand={slug}
                  reviewSlug={reviewSlug}
                  placement={placement}
                  className="mb-1.5"
                />
              )}
              {/* O leitor de tela ouve a mesma frase pelo status do botão de copiar. */}
              {code && (
                <p
                  aria-hidden="true"
                  className="mb-1.5 hidden items-center gap-2 text-[13px] font-bold leading-[18px] text-verde-escuro group-has-[[data-copied=true]]/recorte:flex"
                >
                  <Check className="h-[18px] w-[18px] shrink-0" />
                  {copiedHint}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
