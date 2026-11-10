'use client';

import { useState } from 'react';
import { ArrowRight, Check, Copy, ExternalLink } from 'lucide-react';
import { CouponStoreLink } from '@/components/CouponComponents';
import { CopyCodeButton } from '@/components/coupons/CouponActions';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { ScrollRow } from '@/components/ui/ScrollRow';
import type { ArticleStoreBlock } from '@/lib/articleStore';
import { getArticleCopy } from '../articleCopy';
import { ARTICLE_CUTOUT_ID } from '../articleAnchors';
import { getCouponCopyLabels, type CouponCopyLocale } from '../couponCopyLocale';
import { TrackedCouponPageLink } from '../TrackedCouponPageLink';
import { ArticleLimitedCodeLines } from './ArticleLimitedCodeLines';

type Variant = 'top' | 'end' | 'sidebar' | 'drawer';

const PLACEMENT = { top: 'review_top', end: 'review_end', sidebar: 'review_sidebar', drawer: 'review_mobile_drawer' } as const;

const FRAME: Record<Variant, string> = {
  // Com uma loja só (as outras pausadas); com duas ou mais, a moldura vai para cada cartão (CARDS_FRAME).
  top: 'rounded-2xl border-2 border-marinho bg-creme px-3.5 pt-3 pb-1 text-marinho print:hidden md:px-4',
  sidebar: 'rounded-2xl border-2 border-marinho bg-creme px-3.5 pt-3 pb-1 text-marinho print:hidden',
  end: 'text-marinho print:hidden',
  drawer: 'mx-4 mt-3.5 scroll-mt-3 text-marinho',
};

const ROW_LINK = `inline-flex min-h-11 items-center gap-1 text-sm font-extrabold underline underline-offset-[3px] hover:text-marinho-suave ${FOCUS_RING}`;

// O código é o próprio botão de copiar, em largura total: o código longo (MAX10EMCASACOMCECILIA) cabe numa linha sem
// disputar espaço com um botão ao lado, e todas as lojas usam o mesmo tamanho de letra. Tracejado como o recorte; ao
// copiar, fica verde (data-copied, porque o botão é ele mesmo o tracejado e o :has() do .recorte não casa com ele).
const CODE_BUTTON = `flex min-h-11 w-full items-center justify-between gap-2 rounded-lg border-2 border-dashed border-marinho bg-white px-3 py-1.5 text-left font-codigo text-[15px] leading-5 font-extrabold tracking-[0.02em] hover:bg-amarelo-cupom/40 data-[copied=true]:border-solid data-[copied=true]:border-verde-escuro data-[copied=true]:bg-verde-claro data-[copied=true]:text-verde-escuro ${FOCUS_RING}`;

export type ArticleStoreCodesProps = {
  variant: Variant;
  blocks: readonly ArticleStoreBlock[];
  locale: CouponCopyLocale;
  reviewSlug: string;
};

const SEPARATOR = 'border-t-2 border-dashed border-marinho/25';
// O topo com duas lojas ou mais: um cartão em pé por loja, com o código embaixo (mt-auto), alinhado entre os cartões; o
// código longo quebra em duas linhas, com a mesma altura em todos. No celular, uma fila que rola para o lado, com boa parte
// do próximo à vista. No computador, a grade: 2 colunas e 4 quando a largura do topo passa de 64rem (256 px por cartão),
// sempre com 4 trilhas: com 2 ou 3 lojas, os cartões têm a largura dos de 4 e ficam à esquerda.
// O relative segura os textos sr-only (position: absolute) dos cartões fora da tela: sem ele, eles escapam da rolagem da
// fila, a página fica mais larga que o celular e, ao abrir a gaveta, a tela corre para a direita.
const CARDS_FRAME = '@container text-marinho print:hidden';
const CAROUSEL_ROW = 'hide-scrollbar relative -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-1 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 @min-[64rem]:grid-cols-4';
const CAROUSEL_CARD = 'flex w-[75%] max-w-80 shrink-0 snap-start flex-col rounded-2xl border-2 border-marinho bg-creme px-3 pt-2 pb-3 md:w-auto md:max-w-none';

// O artigo de várias lojas: uma loja por linha (ou por cartão, no topo), todas com o mesmo peso e na ordem do artigo
// (nenhuma é a principal); na lateral, no fim e na gaveta, separadas por um traço. Na linha, o nome e o desconto à esquerda, "Ir à loja" e "Regras" à
// direita (descem quando o nome é longo) e, embaixo, o código, que copia ao toque. No topo, a lista leva o id do recorte
// (#cupom-artigo), que o dock do celular observa; no fim, o título e o #loja vêm do ArticleEnd. Na gaveta do celular,
// fica dentro do <dialog>: com ele aberto, o resto da página é inerte, e o fallback de cópia vai para o dialog do botão.
export function ArticleStoreCodes({ variant, blocks, locale, reviewSlug }: ArticleStoreCodesProps) {
  const copy = getArticleCopy(locale);
  const labels = getCouponCopyLabels(locale);
  const placement = PLACEMENT[variant];
  // Duas colunas no fim do computador, com 2 lojas ou mais; o topo usa os cartões.
  const columns = variant === 'end' && blocks.length > 1;
  const carousel = variant === 'top' && blocks.length > 1;
  const [current, setCurrent] = useState(0);

  return (
    <section
      id={variant === 'top' ? ARTICLE_CUTOUT_ID : undefined}
      data-store-codes={variant}
      // No fim, o h2 do ArticleEnd já dá o nome.
      aria-label={variant === 'end' ? undefined : copy.storeCodesTitle}
      className={carousel ? CARDS_FRAME : FRAME[variant]}
    >
      {variant !== 'end' && (
        <p className="mb-1 text-[13px] font-bold leading-[18px] tracking-[0.04em] text-marinho-suave uppercase">
          {copy.storeCodesTitle}
        </p>
      )}
      {carousel ? (
        <ScrollRow
          className={CAROUSEL_ROW}
          onScroll={(event) => {
            const row = event.currentTarget;
            const first = row.firstElementChild;
            if (!first) return;
            const step = first.getBoundingClientRect().width + 12;
            const atEnd = row.scrollLeft >= row.scrollWidth - row.clientWidth - 2;
            setCurrent(atEnd ? blocks.length - 1 : Math.round(row.scrollLeft / step));
          }}
        >
          {rows()}
        </ScrollRow>
      ) : (
        <ul className={columns ? 'md:grid md:grid-cols-2 md:gap-x-6' : undefined}>{rows()}</ul>
      )}
      {/* Quantos cartões há e em qual se está; o leitor de tela já ouve a lista com o número de itens. */}
      {carousel && (
        <div aria-hidden="true" className="mt-2 flex justify-center gap-1.5 md:hidden">
          {blocks.map(({ slug }, index) => (
            <span key={slug} className={`size-2 rounded-full ${index === current ? 'bg-marinho' : 'bg-marinho/25'}`} />
          ))}
        </div>
      )}
    </section>
  );

  function rows() {
    return blocks.map((block, index) => {
      const { code, codeKind, brand, discount, storeHref, storeSponsored, slug, couponPageHref } = block;
      const copiedHint = copy.copiedHint({ slug, brand }, codeKind);
      // O traço separa as lojas; nas duas colunas, a segunda loja abre a coluna da direita e também fica sem ele.
      const separator = index === 0 || carousel ? '' : `${SEPARATOR} ${columns && index === 1 ? 'md:border-t-0' : ''}`;
      return (
        <li key={slug} data-store-code={slug} className={`group/linha min-w-0 ${carousel ? CAROUSEL_CARD : 'pt-1.5 pb-2.5'} ${separator}`}>
          <div className="flex flex-wrap items-center gap-x-3.5">
            {/* No cartão estreito (o carrossel do celular e as 4 colunas), o nome ocupa a linha e os links descem; nas 2
                colunas, o cartão é largo e eles ficam ao lado do nome. */}
            <p className={`mr-auto min-w-0 py-1 ${carousel ? 'max-md:basis-full @min-[64rem]:basis-full' : ''}`}>
              <span className="block text-[15px] leading-5 font-extrabold">{brand}</span>
              {discount && <span className="block text-[13px] leading-[18px] font-semibold text-marinho-suave">{discount}</span>}
            </p>
            {/* Os dois links quebram juntos: em tela estreita (320 px) com nome longo, descem para a linha de baixo. */}
            <div className="flex items-center gap-x-3">
              {storeHref && (
                <CouponStoreLink
                  href={storeHref}
                  couponCode={code}
                  brand={slug}
                  contentSlug={reviewSlug}
                  linkLabel={`${copy.storeGoShort}: ${brand}`}
                  ariaLabel={`${copy.storeGoShort}: ${brand}`}
                  sponsored={storeSponsored}
                  placement={placement}
                  className={ROW_LINK}
                >
                  {copy.storeGoShort}
                  <ExternalLink aria-hidden="true" className="size-3.5 shrink-0" />
                </CouponStoreLink>
              )}
              {/* Na lateral, a linha fica curta: as regras estão no topo, no fim e na gaveta. */}
              {couponPageHref && variant !== 'sidebar' && (
                <TrackedCouponPageLink
                  href={couponPageHref}
                  contentSlug={reviewSlug}
                  linkLabel={copy.storeRulesOf(block)}
                  placement={placement}
                  className={ROW_LINK}
                >
                  {/* O texto curto na tela; o leitor de tela ouve "Regras da <loja>", que começa pelo que se vê. */}
                  <span aria-hidden="true">{copy.storeRulesShort}</span>
                  <span className="sr-only">{copy.storeRulesOf(block)}</span>
                  <ArrowRight aria-hidden="true" className="size-3.5 shrink-0" />
                </TrackedCouponPageLink>
              )}
            </div>
          </div>
          {code && (
            <CopyCodeButton
              code={code}
              brand={slug}
              contentSlug={reviewSlug}
              placement={placement}
              ariaLabel={`${labels.copyCoupon(code)} (${brand})`}
              copiedStatus={copiedHint}
              className={`${carousel ? 'mt-auto' : 'mt-0.5'} ${CODE_BUTTON}`}
              // Copiado, só o ✓, da largura do ícone de copiar: o código longo não quebra. A frase vem embaixo.
              copiedChildren={
                <>
                  <span className="min-w-0 break-all text-balance">{code}</span>
                  <Check aria-hidden="true" className="size-[18px] shrink-0" />
                </>
              }
            >
              <span className="min-w-0 break-all text-balance">{code}</span>
              <Copy aria-hidden="true" className="size-[18px] shrink-0" />
            </CopyCodeButton>
          )}
          {block.limitedCodes && (
            <ArticleLimitedCodeLines
              items={block.limitedCodes}
              locale={locale}
              brand={slug}
              reviewSlug={reviewSlug}
              placement={placement}
              className="mt-1.5"
            />
          )}
          {/* O leitor de tela ouve a mesma frase pelo status do botão de copiar. */}
          {code && (
            <p
              aria-hidden="true"
              className="mt-1.5 hidden items-center gap-2 text-[13px] font-bold leading-[18px] text-verde-escuro group-has-[[data-copied=true]]/linha:flex"
            >
              <Check className="h-[18px] w-[18px] shrink-0" />
              {copiedHint}
            </p>
          )}
        </li>
      );
    });
  }
}
