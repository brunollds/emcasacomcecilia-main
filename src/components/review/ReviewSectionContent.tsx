'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import ReviewInlineImage from '@/components/ReviewInlineImage';
import { DropCapParagraph, EditorialReveal, PretextShrinkwrap, TopTenList } from '@/components/editorial';
import { COUPON_HIGHLIGHT_TERMS, HighlightCoupon } from './HighlightCoupon';
import { CopyButton, CouponStoreLink } from '@/components/CouponComponents';
import type { ContentSection } from '@/lib/content';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { getFaqItems, isFaqHeading } from '@/lib/faq';
import type { Locale } from '@/lib/i18n/locales';
import { isCouponPageLink, isInternalLink } from '@/lib/internalLinks';
import { ReputacaoMetricas, PadroesReclamacao } from './ReputacaoMetricas';
import { ReviewSectionVideo } from './ReviewSectionVideo';
import { TrackedCouponPageLink } from './TrackedCouponPageLink';

export interface ReviewSectionContentProps {
  section: ContentSection;
  reviewTitle: string;
  isFirst?: boolean;
  kind?: 'editorial' | 'guia' | 'produto';
  reviewSlug?: string;
  coupon?: string;
  affiliate?: string;
  locale?: Locale;
}

function parseProsConsBullet(item: string): { type: 'pro' | 'con'; text: string } | null {
  const match = item.match(/^(Prós|Contras):\s*(.+)$/i);
  if (!match) return null;
  return {
    type: match[1].toLowerCase() === 'prós' ? 'pro' : 'con',
    text: match[2],
  };
}

function shouldRenderTopTenList(section: ContentSection): boolean {
  if (!section.bullets || section.bullets.length < 5) return false;
  const allNumbered = section.bullets.every((item) => /^\d+\.\s*/.test(item));
  const headingMatches = /\b10\b|fatos?|top\s*10|curiosidades/i.test(section.heading || '');
  return allNumbered && (section.bullets.length >= 10 || headingMatches);
}

// Nas células da tabela, "R$ 419" não quebra entre o R$ e o número (espaço não separável).
function keepCurrencyTogether(text: string): string {
  return text.replace(/R\$ (?=\d)/g, 'R$\u00a0');
}

// Tabela comparativa: de sm para cima é tabela com a primeira coluna fixa; abaixo disso, uma lista de
// cartões (um por linha) feita com os mesmos th/td, e o rótulo de cada campo sai do data-label.
// Sombra de "tem mais à direita": a camada fixa (scroll) fica na borda visível e a branca (local) corre
// com o conteúdo e a cobre quando a rolagem chega ao fim. Passa por baixo das células, por isso as que
// rolam têm fundo translúcido (as listras em marinho/4 sobre o contêiner branco); só a coluna fixa é opaca.
const COMPARISON_WRAPPER = [
  'mt-6 overflow-x-auto rounded-2xl border-2 border-marinho bg-white',
  'sm:[background-image:linear-gradient(to_left,#fff_35%,transparent),radial-gradient(farthest-side_at_100%_50%,rgb(15_29_58/0.22),transparent)]',
  'sm:[background-position:right_center] sm:[background-size:2.5rem_100%,0.9rem_100%]',
  'sm:[background-repeat:no-repeat] sm:[background-attachment:local,scroll]',
].join(' ');

// Cada coluna tem piso de largura próprio (a tabela em si só tem w-full): 7 colunas de células curtas
// cabem na coluna do artigo e só a tabela mais larga que ela rola. No papel o piso sai, para não cortar.
const COMPARISON_CELL = 'align-top border-marinho/15 sm:border-r sm:last:border-r-0';

const COMPARISON_COLUMN_MIN_WIDTH = 'sm:min-w-[6rem] print:min-w-0';

// A listra da coluna fixa: o marinho/4 das linhas sobre o branco, opaco.
const STRIPE_OPAQUE = 'sm:bg-[#f5f6f7]';

const COMPARISON_STICKY_CELL =
  'sm:sticky sm:left-0 sm:z-10 sm:min-w-[7.5rem] sm:max-w-[12rem] print:min-w-0 sm:shadow-[4px_0_6px_-4px_rgb(15_29_58/0.16)]';

const COMPARISON_HEAD_CELL = `${COMPARISON_CELL} text-left font-heading text-[0.68rem] font-black uppercase leading-snug tracking-[0.08em] text-marinho-suave sm:border-b-2 sm:border-b-marinho`;

const COMPARISON_ROW_HEAD_CELL = `${COMPARISON_CELL} ${COMPARISON_STICKY_CELL} text-left font-bold text-marinho sm:border-b max-sm:block max-sm:pb-2 max-sm:text-base max-sm:leading-snug`;

const COMPARISON_DATA_CELL = `${COMPARISON_CELL} ${COMPARISON_COLUMN_MIN_WIDTH} text-marinho sm:border-b max-sm:block max-sm:border-t max-sm:py-2 max-sm:before:mb-0.5 max-sm:before:block max-sm:before:font-heading max-sm:before:text-[0.68rem] max-sm:before:font-bold max-sm:before:uppercase max-sm:before:leading-snug max-sm:before:tracking-[0.1em] max-sm:before:text-marinho-suave max-sm:before:content-[attr(data-label)]`;

// Padding e altura de linha de sm para cima; a tabela de 6 colunas ou mais é compacta. O celular (cartões) não muda.
const COMPARISON_SPACING = {
  roomy: { head: 'sm:px-4 sm:py-3', body: 'leading-6 sm:px-4 sm:py-3.5' },
  compact: { head: 'sm:px-3 sm:py-2.5', body: 'leading-6 sm:px-3 sm:py-3 sm:leading-5' },
} as const;

// Prós e contras: o título de cada coluna (verde e amarelo) e a célula de cada item.
const PROS_HEADING = 'border-marinho bg-verde-claro px-5 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-verde-escuro';
const CONS_HEADING = 'border-marinho bg-amarelo-cupom/40 px-5 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-marinho';
const PROS_CONS_CELL = 'flex items-start gap-2 px-5 py-4 font-editorial text-base leading-7 text-marinho';

// O acordeão do FAQ e o da seção (accordionBlock): pergunta em negrito e o + que vira x ao abrir.
const ACCORDION_SUMMARY = `flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 font-extrabold text-marinho [&::-webkit-details-marker]:hidden ${FOCUS_RING}`;
const ACCORDION_ICON =
  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-marinho bg-white text-xl font-bold text-marinho transition-transform group-open:rotate-45 group-open:bg-amarelo-cupom motion-reduce:transition-none';

// Botão dos links da seção (loja, página de cupom, link externo).
const SECTION_LINK = `inline-flex min-h-11 items-center gap-1.5 rounded-[10px] border-2 border-marinho bg-white px-5 py-2 text-sm font-extrabold text-marinho wrap-anywhere transition-colors hover:bg-amarelo-cupom ${FOCUS_RING}`;

// Tabela de 6 colunas ou mais pode rolar (no tablet ou com célula longa); o contêiner vira região com foco de teclado.
const COMPARISON_SCROLL_MIN_COLUMNS = 6;

export function ReviewSectionContent({
  section,
  reviewTitle,
  isFirst = false,
  kind = 'editorial',
  reviewSlug,
  coupon,
  affiliate,
  locale = 'pt',
}: ReviewSectionContentProps): React.ReactElement {
  const showDropCap = isFirst && Boolean(kind);
  const { comparisonTable } = section;
  const comparisonCaption = comparisonTable?.caption || section.heading || `Tabela comparativa de ${reviewTitle}`;
  const comparisonScrolls = (comparisonTable?.headers.length ?? 0) >= COMPARISON_SCROLL_MIN_COLUMNS;
  const comparisonSpacing = COMPARISON_SPACING[comparisonScrolls ? 'compact' : 'roomy'];
  // O título de FAQ decide: os bullets viram o acordeão, com os mesmos itens do FAQPage do schema,
  // e nunca a tabela de prós e contras nem a lista numerada.
  const isFaq = isFaqHeading(section.heading);
  const faqItems = isFaq ? getFaqItems(section.bullets) : [];
  const prosConsItems = section.bullets
    ?.map(parseProsConsBullet)
    .filter((item): item is { type: 'pro' | 'con'; text: string } => Boolean(item));
  const shouldRenderProsConsTable = Boolean(
    !isFaq && prosConsItems?.length && prosConsItems.length === section.bullets?.length
  );
  const shouldRenderTopTen = !isFaq && shouldRenderTopTenList(section);
  const prosItems = prosConsItems?.filter((item) => item.type === 'pro') ?? [];
  const consItems = prosConsItems?.filter((item) => item.type === 'con') ?? [];
  const prosConsRows = Array.from(
    { length: Math.max(prosItems.length, consItems.length) },
    (_, rowIndex) => ({
      pro: prosItems[rowIndex]?.text,
      con: consItems[rowIndex]?.text,
    })
  );

  const renderEmphasisBlock = (withImage: boolean = true) => (
    <div className={withImage && section.image ? 'my-6 grid grid-cols-1 gap-6 md:grid-cols-[1fr_200px] items-center' : 'my-6'}>
      <div>
        <PretextShrinkwrap
          text={section.emphasis}
          font="italic 400 18px Lora, Georgia, serif"
          lineHeight={30}
          minWidth={260}
          maxWidthRatio={0.9}
          className="rounded-r-xl border-l-[6px] border-marinho bg-amarelo-cupom/25 px-5 py-4"
        >
          <blockquote className="m-0 font-editorial text-lg italic leading-relaxed text-marinho">
            &quot;<HighlightCoupon text={section.emphasis} />&quot;
          </blockquote>
          <cite className="mt-3 block text-sm font-bold not-italic text-marinho-suave">Cecília Mauad</cite>
        </PretextShrinkwrap>
      </div>
      {withImage && section.image && (
        <div className="max-w-[200px] mx-auto md:mx-0 w-full">
          <ReviewInlineImage
            section={{ image: section.image, imageFit: section.imageFit || 'portrait', imageAlt: section.imageAlt || reviewTitle }}
            reviewTitle={reviewTitle}
            locale={locale}
          />
        </div>
      )}
    </div>
  );

  return (
    <>
      {section.paragraphs?.map((paragraph, paragraphIndex) => {
        const isFirstParagraph = showDropCap && paragraphIndex === 0;
        const shouldRenderEmphasisAfter = section.emphasisAfterParagraph === paragraphIndex + 1;

        if (isFirstParagraph) {
          return (
            <React.Fragment key={`p-${paragraphIndex}`}>
              <EditorialReveal
                delay={0}
                distance={14}
              >
                <DropCapParagraph text={paragraph} highlightTerms={COUPON_HIGHLIGHT_TERMS} variant="d2" />
              </EditorialReveal>
              {shouldRenderEmphasisAfter && section.emphasis && renderEmphasisBlock(false)}
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={`p-${paragraphIndex}`}>
            <EditorialReveal
              as="p"
              delay={Math.min(paragraphIndex * 0.05, 0.25)}
              distance={14}
              className="mb-4 font-editorial text-lg leading-8 text-marinho last:mb-0"
            >
              <HighlightCoupon text={paragraph} />
            </EditorialReveal>
            {shouldRenderEmphasisAfter && section.emphasis && renderEmphasisBlock(false)}
          </React.Fragment>
        );
      })}

      {section.emphasis && !section.emphasisAfterParagraph && renderEmphasisBlock(true)}

      {(section.image || (section.images && section.images.length > 0)) && (!section.emphasis || section.emphasisAfterParagraph != null) && (
        <ReviewInlineImage section={section} reviewTitle={reviewTitle} locale={locale} />
      )}

      {comparisonTable && (
        <div
          className={comparisonScrolls ? `${COMPARISON_WRAPPER} ${FOCUS_RING}` : COMPARISON_WRAPPER}
          tabIndex={comparisonScrolls ? 0 : undefined}
          role={comparisonScrolls ? 'region' : undefined}
          aria-label={comparisonScrolls ? comparisonCaption : undefined}
        >
          <table role="table" className="border-separate border-spacing-0 text-left text-sm max-sm:block sm:w-full">
            <caption className="sr-only">{comparisonCaption}</caption>
            <thead role="rowgroup" className="max-sm:sr-only">
              <tr role="row" className="bg-white">
                {comparisonTable.headers.map((header, headerIndex) => (
                  <th
                    key={header}
                    role="columnheader"
                    scope="col"
                    className={headerIndex === 0
                      ? `${COMPARISON_HEAD_CELL} ${comparisonSpacing.head} ${COMPARISON_STICKY_CELL} sm:bg-white`
                      : `${COMPARISON_HEAD_CELL} ${comparisonSpacing.head} ${COMPARISON_COLUMN_MIN_WIDTH}`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody
              role="rowgroup"
              className="max-sm:block max-sm:divide-y max-sm:divide-marinho/15 sm:[&>tr:last-child>*]:border-b-0"
            >
              {comparisonTable.rows.map((row, rowIndex) => {
                const isStriped = rowIndex % 2 !== 0;
                return (
                  <tr
                    key={`${row[0]}-${rowIndex}`}
                    role="row"
                    className={`max-sm:block max-sm:px-4 max-sm:py-4 ${isStriped ? 'bg-marinho/4' : ''}`}
                  >
                    {row.map((cell, cellIndex) => cellIndex === 0 ? (
                      <th
                        key={`${cell}-${cellIndex}`}
                        role="rowheader"
                        scope="row"
                        className={`${COMPARISON_ROW_HEAD_CELL} ${comparisonSpacing.body} ${isStriped ? STRIPE_OPAQUE : 'sm:bg-white'}`}
                      >
                        <HighlightCoupon text={keepCurrencyTogether(cell)} />
                      </th>
                    ) : (
                      <td
                        key={`${cell}-${cellIndex}`}
                        role="cell"
                        data-label={comparisonTable.headers[cellIndex]}
                        className={`${COMPARISON_DATA_CELL} ${comparisonSpacing.body}`}
                      >
                        <HighlightCoupon text={keepCurrencyTogether(cell)} />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Sem EditorialReveal: advertência legal precisa estar visível desde o primeiro render. */}
      {section.notice && (
        <p
          role="note"
          className="mt-6 rounded-xl border-2 border-marinho bg-white px-5 py-4 font-heading text-sm font-bold uppercase leading-6 tracking-wide text-marinho"
        >
          {section.notice}
        </p>
      )}

      {section.video && <ReviewSectionVideo video={section.video} title={section.heading || reviewTitle} locale={locale} />}

      {shouldRenderProsConsTable && (
        <div className="mt-6 overflow-hidden rounded-2xl border-2 border-marinho bg-white">
          <div className="grid gap-0 md:hidden">
            <div className={`border-b-2 ${PROS_HEADING}`}>
              Prós
            </div>
            <div className="divide-y divide-marinho/15">
              {prosItems.map((item, itemIndex) => (
                <EditorialReveal
                  key={`mobile-pro-${itemIndex}-${item.text}`}
                  delay={Math.min(itemIndex * 0.04, 0.28)}
                  className={PROS_CONS_CELL}
                >
                  <span className="font-bold text-verde-escuro">+</span>
                  <span className="min-w-0"><HighlightCoupon text={item.text} /></span>
                </EditorialReveal>
              ))}
            </div>
            <div className={`border-y-2 ${CONS_HEADING}`}>
              Contras
            </div>
            <div className="divide-y divide-marinho/15">
              {consItems.map((item, itemIndex) => (
                <EditorialReveal
                  key={`mobile-con-${itemIndex}-${item.text}`}
                  delay={Math.min(itemIndex * 0.04, 0.28)}
                  className={PROS_CONS_CELL}
                >
                  <span className="font-bold text-marinho">−</span>
                  <span className="min-w-0"><HighlightCoupon text={item.text} /></span>
                </EditorialReveal>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="grid grid-cols-2 border-b-2 border-marinho">
              <div className={`border-r-2 ${PROS_HEADING}`}>
                Prós
              </div>
              <div className={CONS_HEADING}>
                Contras
              </div>
            </div>
            <div className="divide-y divide-marinho/15">
              {prosConsRows.map((row, rowIndex) => (
                <EditorialReveal
                  key={`pros-cons-row-${rowIndex}`}
                  delay={Math.min(rowIndex * 0.04, 0.28)}
                  className="grid md:grid-cols-2"
                >
                  <div className={`min-h-14 md:border-r-2 md:border-marinho ${PROS_CONS_CELL}`}>
                    {row.pro ? (
                      <>
                        <span className="font-bold text-verde-escuro">+</span>
                        <span className="min-w-0"><HighlightCoupon text={row.pro} /></span>
                      </>
                    ) : (
                      <span className="text-marinho/35">—</span>
                    )}
                  </div>
                  <div className={`min-h-14 ${PROS_CONS_CELL}`}>
                    {row.con ? (
                      <>
                        <span className="font-bold text-marinho">−</span>
                        <span className="min-w-0"><HighlightCoupon text={row.con} /></span>
                      </>
                    ) : (
                      <span className="text-marinho/35">—</span>
                    )}
                  </div>
                </EditorialReveal>
              ))}
            </div>
          </div>
        </div>
      )}

      {faqItems.length > 0 && (
        <div className="mt-5 border-t-2 border-marinho">
          {faqItems.map((faq, faqIndex) => (
            <EditorialReveal
              key={`faq-${faqIndex}`}
              delay={Math.min(faqIndex * 0.06, 0.3)}
              distance={12}
            >
              <details className="group border-b-2 border-marinho">
                <summary className={ACCORDION_SUMMARY}>
                  <span className="min-w-0"><HighlightCoupon text={faq.question} /></span>
                  <span className={ACCORDION_ICON}>+</span>
                </summary>
                <div className="faq-answer pb-4">
                  <p className="font-editorial text-base leading-relaxed text-marinho">
                    <HighlightCoupon text={faq.answer} />
                  </p>
                </div>
              </details>
            </EditorialReveal>
          ))}
        </div>
      )}

      {!isFaq && section.bullets && section.bullets.length > 0 && !shouldRenderProsConsTable && !shouldRenderTopTen && (
        <ul className="mt-5 space-y-3">
          {section.bullets.map((item, bulletIndex) => (
            <EditorialReveal
              as="li"
              key={`b-${bulletIndex}`}
              delay={Math.min(bulletIndex * 0.06, 0.3)}
              distance={12}
              className="flex items-start gap-3 font-editorial text-lg leading-8 text-marinho"
            >
              <span aria-hidden="true" className="mt-2.5 h-3 w-3 shrink-0 rounded-full border-2 border-marinho bg-amarelo-cupom" />
              <span className="min-w-0">
                <HighlightCoupon text={item} />
              </span>
            </EditorialReveal>
          ))}
        </ul>
      )}

      {shouldRenderTopTen && <TopTenList items={section.bullets} />}

      {section.couponTiers && section.couponTiers.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-2xl border-2 border-marinho bg-white">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <caption className="sr-only">Faixas de cupom: código, desconto e compra mínima</caption>
            <thead>
              <tr className="border-b-2 border-marinho">
                <th scope="col" className="px-4 py-3 font-heading text-xs font-black uppercase tracking-[0.14em] text-marinho-suave">
                  Cupom (clique para copiar)
                </th>
                <th scope="col" className="px-4 py-3 font-heading text-xs font-black uppercase tracking-[0.14em] text-marinho-suave">
                  Desconto
                </th>
                <th scope="col" className="px-4 py-3 font-heading text-xs font-black uppercase tracking-[0.14em] text-marinho-suave">
                  Compra mínima
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-marinho/15">
              {section.couponTiers.map((tier) => (
                <tr key={tier.code}>
                  <td className="px-4 py-3">
                    <CopyButton
                      code={tier.code}
                      label={tier.code}
                      copiedLabel="Copiado!"
                      variant="outline"
                      placement="review_inline"
                      className="font-mono text-xs font-black"
                    />
                  </td>
                  <td className="px-4 py-3 font-bold text-marinho">{tier.discount}</td>
                  <td className="px-4 py-3 text-marinho-suave">{tier.minPurchase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section.links && section.links.length > 0 && (
        <div className={`mt-4 flex flex-wrap gap-4 ${Boolean(section.image || (section.images && section.images.length > 0)) ? 'justify-center w-full' : ''}`}>
          {section.links.map((link) => {
            const internal = isInternalLink(link.href);
            const couponPage = internal && isCouponPageLink(link.href);
            const className = SECTION_LINK;

            if (couponPage) {
              return (
                <TrackedCouponPageLink
                  key={link.href}
                  href={link.href}
                  contentSlug={reviewSlug}
                  linkLabel={link.label}
                  placement="review_inline"
                  className={className}
                >
                  {link.label}
                </TrackedCouponPageLink>
              );
            }

            if (!internal && link.sponsored) {
              return (
                <CouponStoreLink
                  key={link.href}
                  href={link.href}
                  couponCode={coupon}
                  brand={affiliate}
                  contentSlug={reviewSlug}
                  sponsored
                  placement="review_inline"
                  className={className}
                >
                  {link.label}
                  <ArrowUpRight size={16} />
                </CouponStoreLink>
              );
            }

            return (
              <a
                key={link.href}
                href={link.href}
                target={internal ? undefined : '_blank'}
                rel={internal ? undefined : 'noopener noreferrer'}
                className={className}
              >
                {link.label}
                {!internal && <ArrowUpRight size={16} />}
              </a>
            );
          })}
        </div>
      )}

      {section.widget === 'ReputacaoMetricas' && (
        <div className="mt-6">
          <ReputacaoMetricas />
        </div>
      )}

      {section.widget === 'PadroesReclamacao' && (
        <div className="mt-6">
          <PadroesReclamacao />
        </div>
      )}

      {section.accordionBlock && (
        <div className="mt-6">
          <details className="group rounded-2xl border-2 border-marinho bg-white px-5">
            <summary className={ACCORDION_SUMMARY}>
              <span className="min-w-0">{section.accordionBlock.heading}</span>
              <span className={ACCORDION_ICON}>+</span>
            </summary>
            <div className="faq-answer space-y-3 border-t-2 border-marinho/15 py-4">
              {section.accordionBlock.paragraphs.map((p, idx) => (
                <p key={idx} className="font-editorial text-base leading-relaxed text-marinho">
                  <HighlightCoupon text={p} />
                </p>
              ))}
            </div>
          </details>
        </div>
      )}

      {section.postParagraphs?.map((paragraph, paragraphIndex) => (
        <EditorialReveal
          as="p"
          key={`post-p-${paragraphIndex}`}
          delay={Math.min(paragraphIndex * 0.05, 0.25)}
          distance={14}
          className="mt-6 font-editorial text-lg leading-8 text-marinho last:mb-0"
        >
          <HighlightCoupon text={paragraph} />
        </EditorialReveal>
      ))}
    </>
  );
}
