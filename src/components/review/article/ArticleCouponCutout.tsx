'use client';

import { Check, Copy, ExternalLink, Scissors } from 'lucide-react';
import { CouponStoreLink } from '@/components/CouponComponents';
import { CodeSeasonNotice } from '@/components/coupons/CodeSeasonNotice';
import { CopyAndOpenStoreLink, CopyCodeButton } from '@/components/coupons/CouponActions';
import {
  PRIMARY_ACTION,
  PRIMARY_ACTION_COMPACT,
  SECONDARY_ACTION,
  SECONDARY_ACTION_COMPACT,
} from '@/components/coupons/CouponBlocks';
import { CutoutCode } from '@/components/coupons/StoreLayout';
import type { ArticleStoreBlock } from '@/lib/articleStore';
import { getArticleCopy } from '../articleCopy';
import { getCouponCopyLabels, type CouponCopyLocale } from '../couponCopyLocale';
import { ARTICLE_CUTOUT_ID } from '../articleAnchors';
import { getCodeTitle, getSidebarCopy } from '../sidebarCopy';
import { ArticleLimitedCodeLines } from './ArticleLimitedCodeLines';

type Variant = 'top' | 'end' | 'sidebar';

export type ArticleCouponCutoutProps = {
  variant: Variant;
  block: ArticleStoreBlock;
  locale: CouponCopyLocale;
  reviewSlug: string;
  storeLabel: string;
};

type VariantStyle = {
  box: string;
  layout: string;
  actions: string;
  primary: string;
  secondary: string;
  placement: 'review_top' | 'review_end' | 'review_sidebar';
};

// A marcação é a mesma nas três posições; muda só o tamanho. No topo, o recorte assenta ao abrir a página e, no
// celular, fica mais baixo (botões compactos) para não empurrar a Resposta rápida; a lateral usa os mesmos botões.
const TOP_PRIMARY_COMPACT = `${PRIMARY_ACTION_COMPACT} max-md:min-h-10 max-md:px-3 max-md:text-[13px] max-md:leading-4`;
const TOP_SECONDARY_COMPACT = `${SECONDARY_ACTION_COMPACT} max-md:min-h-10 max-md:px-2.5 max-md:text-[13px] max-md:leading-4`;

const VARIANTS: Record<Variant, VariantStyle> = {
  top: {
    box: 'recorte-entra px-3.5 pt-3.5 pb-3 md:px-6 md:pt-6 md:pb-[18px]',
    layout: 'md:grid md:grid-cols-[minmax(0,1fr)_260px] md:items-center md:gap-6',
    actions: 'mt-2.5 gap-1.5 md:mt-0 md:gap-2.5',
    primary: TOP_PRIMARY_COMPACT,
    secondary: TOP_SECONDARY_COMPACT,
    placement: 'review_top',
  },
  end: {
    box: 'px-[18px] pt-7 pb-5 md:px-8 md:pt-9 md:pb-7',
    layout: 'md:grid md:grid-cols-[minmax(0,1fr)_280px] md:items-center md:gap-8',
    actions: 'mt-3.5 gap-2.5 md:mt-0',
    primary: PRIMARY_ACTION,
    secondary: SECONDARY_ACTION,
    placement: 'review_end',
  },
  sidebar: {
    box: 'px-4 pt-6 pb-4',
    layout: '',
    actions: 'mt-3.5 gap-2.5 md:mt-0',
    primary: PRIMARY_ACTION_COMPACT,
    secondary: SECONDARY_ACTION_COMPACT,
    placement: 'review_sidebar',
  },
};

// Recorte do código no artigo, no visual das páginas de loja: com código, é um .recorte (globals.css), que
// fica verde ao copiar enquanto a tesoura corre, mostra onde colar e destaca o link da loja. Sem código
// (Lejour), só o link da loja.
export function ArticleCouponCutout({ variant, block, locale, reviewSlug, storeLabel }: ArticleCouponCutoutProps) {
  const { box, layout, actions, primary, secondary, placement } = VARIANTS[variant];
  const { code, codeKind, brand, discount, storeHref, storeSponsored, slug } = block;
  const sidebarCopy = getSidebarCopy(locale);
  const labels = getCouponCopyLabels(locale);
  const title = code ? getCodeTitle(sidebarCopy, codeKind, brand) : brand;
  const copiedHint = getArticleCopy(locale).copiedHint({ slug, brand }, codeKind);
  // Com código e link da loja, o botão principal copia e abre a loja em nova aba (na SHEIN, abre já com koc_id e 4CW5Y).
  const copyAndGo = code && storeHref ? { code, storeHref } : undefined;

  return (
    <section
      id={variant === 'top' ? ARTICLE_CUTOUT_ID : undefined}
      data-recorte={variant}
      aria-label={title}
      className={`group/recorte relative rounded-2xl border-[2.5px] border-dashed border-marinho bg-white text-marinho print:hidden ${code ? 'recorte' : ''} ${box}`}
    >
      <span
        aria-hidden="true"
        className={`absolute start-3.5 flex items-center justify-center rounded-full bg-amarelo-cupom ${
          variant === 'top' ? '-top-3 h-6 w-6 md:-top-[15px] md:start-4 md:h-7 md:w-7' : '-top-[15px] start-4 h-7 w-7'
        } ${code ? 'recorte-tesoura' : ''}`}
      >
        <Scissors className={variant === 'top' ? 'h-4 w-4 md:h-5 md:w-5' : 'h-5 w-5'} />
      </span>

      <div className={layout}>
        <div
          className={
            variant === 'top'
              ? 'flex min-w-0 flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5 text-start md:flex-col md:items-center md:text-center'
              : 'min-w-0 text-center'
          }
        >
          <p
            className={`font-bold tracking-[0.04em] text-marinho-suave uppercase ${
              variant === 'top' ? 'text-xs leading-4 md:text-[13px] md:leading-[18px]' : 'text-[13px] leading-[18px]'
            }`}
          >
            {title}
          </p>
          {discount && (
            <p
              className={`font-extrabold text-balance ${
                variant === 'top'
                  ? 'text-[13px] leading-[18px] md:order-3 md:mt-1 md:text-[15px] md:leading-[22px]'
                  : 'mt-1 text-[15px] leading-[22px]'
              }`}
            >
              {discount}
            </p>
          )}
          {code && (
            <div className={variant === 'top' ? 'mt-1 basis-full md:order-2 md:mt-1.5' : 'mt-1.5'}>
              <CutoutCode code={code} compactMobile={variant === 'top'} />
            </div>
          )}
          {!code && block.cutoutNote && (
            <p
              className={`text-[13.5px] leading-[19px] font-semibold text-balance text-marinho-suave ${
                variant === 'top' ? 'mt-1 basis-full' : 'mt-1.5'
              }`}
            >
              {block.cutoutNote}
            </p>
          )}
        </div>

        <div className={`flex flex-col ${actions}`}>
          {copyAndGo ? (
            <>
              <div className={variant === 'top' ? 'flex flex-wrap gap-2 md:flex-col md:gap-2.5' : 'flex flex-col gap-2.5'}>
                <CopyAndOpenStoreLink
                  code={copyAndGo.code}
                  href={copyAndGo.storeHref}
                  brand={slug}
                  contentSlug={reviewSlug}
                  placement={placement}
                  sponsored={storeSponsored}
                  copiedStatus={copiedHint}
                  returnNotice={{ text: copiedHint, closeLabel: labels.closeNotice }}
                  className={`${primary} ${variant === 'top' ? 'max-md:flex-[1.35_1_11.5rem]' : ''}`}
                  copiedChildren={
                    <>
                      <Check aria-hidden="true" className="h-4 w-4 shrink-0 md:h-5 md:w-5" />
                      {labels.copied}
                    </>
                  }
                >
                  {labels.copyAndGo}
                  <ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0 md:h-[18px] md:w-[18px]" />
                </CopyAndOpenStoreLink>
                <CopyCodeButton
                  code={copyAndGo.code}
                  brand={slug}
                  contentSlug={reviewSlug}
                  placement={placement}
                  copiedStatus={copiedHint}
                  className={`${secondary} ${variant === 'top' ? 'max-md:flex-[1_1_9rem] max-md:w-auto' : ''}`}
                  copiedChildren={
                    <>
                      <Check aria-hidden="true" className="h-4 w-4 shrink-0 md:h-5 md:w-5" />
                      {labels.copied}
                    </>
                  }
                >
                  <Copy aria-hidden="true" className="h-4 w-4 shrink-0 md:h-[18px] md:w-[18px]" />
                  {labels.copyOnly}
                </CopyCodeButton>
              </div>
              <p
                className={`text-center font-semibold text-marinho-suave group-has-[[data-copied=true]]/recorte:hidden ${
                  variant === 'top' ? 'text-xs leading-4 md:text-[12.5px] md:leading-[17px]' : 'text-[12.5px] leading-[17px]'
                }`}
              >
                {labels.goHint(codeKind)}
              </p>
            </>
          ) : (
            <>
              {code && (
                <CopyCodeButton
                  code={code}
                  brand={slug}
                  contentSlug={reviewSlug}
                  placement={placement}
                  ariaLabel={labels.copyCoupon(code)}
                  copiedStatus={copiedHint}
                  className={primary}
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
                  sponsored={storeSponsored}
                  placement={placement}
                  className={
                    code
                      ? `${secondary} group-has-[[data-copied=true]]/recorte:bg-laranja group-has-[[data-copied=true]]/recorte:hover:bg-laranja/85`
                      : primary
                  }
                >
                  {storeLabel}
                  <ExternalLink aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
                </CouponStoreLink>
              )}
            </>
          )}
        </div>
      </div>

      {/* No fim do recorte: a faixa monta depois da hidratação sem mexer no código nem nos botões; no topo, a foto abaixo desce. */}
      {block.limitedCodes && (
        <ArticleLimitedCodeLines
          items={block.limitedCodes}
          locale={locale}
          brand={slug}
          reviewSlug={reviewSlug}
          placement={placement}
          className="mt-3"
        />
      )}

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

      {/* Na lateral não cabe: quem está no computador vê o aviso no recorte do topo e no do fim. */}
      {block.codeNotice && variant !== 'sidebar' && (
        <CodeSeasonNotice notice={block.codeNotice} className={variant === 'top' ? 'mt-2 md:mt-3' : 'mt-3'} />
      )}
    </section>
  );
}
