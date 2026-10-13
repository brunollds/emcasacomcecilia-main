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
// rolam têm fundo translúcido (o branco e o creme de sempre sobre o contêiner branco); só a coluna fixa é opaca.
const COMPARISON_WRAPPER = [
  'mt-6 overflow-x-auto rounded-2xl border border-[#1a4d2e]/10 bg-white shadow-soft',
  'sm:[background-image:linear-gradient(to_left,#fff_35%,transparent),radial-gradient(farthest-side_at_100%_50%,rgb(26_77_46/0.22),transparent)]',
  'sm:[background-position:right_center] sm:[background-size:2.5rem_100%,0.9rem_100%]',
  'sm:[background-repeat:no-repeat] sm:[background-attachment:local,scroll]',
].join(' ');

// Cada coluna tem piso de largura próprio (a tabela em si só tem w-full): 7 colunas de células curtas
// cabem na coluna do artigo e só a tabela mais larga que ela rola. No papel o piso sai, para não cortar.
const COMPARISON_CELL = 'align-top border-[#1a4d2e]/10 sm:border-r sm:last:border-r-0';

const COMPARISON_COLUMN_MIN_WIDTH = 'sm:min-w-[6rem] print:min-w-0';

const COMPARISON_STICKY_CELL =
  'sm:sticky sm:left-0 sm:z-10 sm:min-w-[7.5rem] sm:max-w-[12rem] print:min-w-0 sm:shadow-[4px_0_6px_-4px_rgb(26_77_46/0.16)]';

const COMPARISON_HEAD_CELL = `${COMPARISON_CELL} text-left font-heading text-[0.68rem] font-black uppercase leading-snug tracking-[0.08em] text-[#0f1419]/70 sm:border-b-2 sm:border-b-[#1a4d2e]/20`;

const COMPARISON_ROW_HEAD_CELL = `${COMPARISON_CELL} ${COMPARISON_STICKY_CELL} text-left font-semibold text-[#1a4d2e] sm:border-b max-sm:block max-sm:pb-2 max-sm:text-base max-sm:leading-snug`;

const COMPARISON_DATA_CELL = `${COMPARISON_CELL} ${COMPARISON_COLUMN_MIN_WIDTH} text-[#24313d] sm:border-b max-sm:block max-sm:border-t max-sm:py-2 max-sm:before:mb-0.5 max-sm:before:block max-sm:before:font-heading max-sm:before:text-[0.68rem] max-sm:before:font-bold max-sm:before:uppercase max-sm:before:leading-snug max-sm:before:tracking-[0.1em] max-sm:before:text-[#0f1419]/55 max-sm:before:content-[attr(data-label)]`;

// Padding e altura de linha de sm para cima; a tabela de 6 colunas ou mais é compacta. O celular (cartões) não muda.
const COMPARISON_SPACING = {
  roomy: { head: 'sm:px-4 sm:py-3', body: 'leading-6 sm:px-4 sm:py-3.5' },
  compact: { head: 'sm:px-3 sm:py-2.5', body: 'leading-6 sm:px-3 sm:py-3 sm:leading-5' },
} as const;

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
      <div className="group">
        <PretextShrinkwrap
          text={section.emphasis}
          font="italic 400 18px Lora, Georgia, serif"
          lineHeight={30}
          minWidth={260}
          maxWidthRatio={0.9}
          className="rounded-r-xl border-l-[3px] border-[#ff6b35] bg-[#ff6b35]/5 px-5 py-4 transition-colors duration-300 group-hover:border-[#1a4d2e] group-hover:bg-[#ff6b35]/10"
        >
          <blockquote className="m-0 font-editorial text-lg italic leading-relaxed text-[#4a5568]">
            &quot;<HighlightCoupon text={section.emphasis} />&quot;
          </blockquote>
          <cite className="mt-3 block text-sm not-italic opacity-70">Cecília Mauad</cite>
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
                <DropCapParagraph text={paragraph} highlightTerms={COUPON_HIGHLIGHT_TERMS} />
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
              className="mb-4 font-editorial text-lg leading-8 text-[#24313d] last:mb-0"
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
              <tr role="row" className="bg-[rgb(238_155_55/0.06)]">
                {comparisonTable.headers.map((header, headerIndex) => (
                  <th
                    key={header}
                    role="columnheader"
                    scope="col"
                    className={headerIndex === 0
                      ? `${COMPARISON_HEAD_CELL} ${comparisonSpacing.head} ${COMPARISON_STICKY_CELL} sm:bg-[#fef9f3]`
                      : `${COMPARISON_HEAD_CELL} ${comparisonSpacing.head} ${COMPARISON_COLUMN_MIN_WIDTH}`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody
              role="rowgroup"
              className="max-sm:block max-sm:divide-y max-sm:divide-[#1a4d2e]/10 sm:[&>tr:last-child>*]:border-b-0"
            >
              {comparisonTable.rows.map((row, rowIndex) => {
                const isStriped = rowIndex % 2 !== 0;
                return (
                  <tr
                    key={`${row[0]}-${rowIndex}`}
                    role="row"
                    className={`max-sm:block max-sm:px-4 max-sm:py-4 ${isStriped ? 'bg-[rgb(172_138_55/0.06)]' : ''}`}
                  >
                    {row.map((cell, cellIndex) => cellIndex === 0 ? (
                      <th
                        key={`${cell}-${cellIndex}`}
                        role="rowheader"
                        scope="row"
                        className={`${COMPARISON_ROW_HEAD_CELL} ${comparisonSpacing.body} ${isStriped ? 'sm:bg-[#faf8f3]' : 'sm:bg-white'}`}
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
          className="mt-6 rounded-xl border-2 border-[#1a4d2e] bg-white px-5 py-4 font-heading text-sm font-bold uppercase leading-6 tracking-wide text-[#1a4d2e]"
        >
          {section.notice}
        </p>
      )}

      {section.video && <ReviewSectionVideo video={section.video} title={section.heading || reviewTitle} locale={locale} />}

      {shouldRenderProsConsTable && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-[#1a4d2e]/10 bg-white shadow-soft">
          <div className="grid gap-0 md:hidden">
            <div className="border-b border-[#1a4d2e]/10 bg-[#eef7f1] px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[#1a4d2e]">
              Prós
            </div>
            <div className="divide-y divide-[#1a4d2e]/10">
              {prosItems.map((item, itemIndex) => (
                <EditorialReveal
                  key={`mobile-pro-${itemIndex}-${item.text}`}
                  delay={Math.min(itemIndex * 0.04, 0.28)}
                  className="flex items-start gap-2 px-5 py-4 font-editorial text-base leading-7 text-[#24313d]"
                >
                  <span className="font-bold text-[#1a4d2e]">+</span>
                  <span className="min-w-0"><HighlightCoupon text={item.text} /></span>
                </EditorialReveal>
              ))}
            </div>
            <div className="border-y border-[#ff6b35]/15 bg-[#fff3ee] px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[#d94b21]">
              Contras
            </div>
            <div className="divide-y divide-[#ff6b35]/10 bg-[#fffaf7]">
              {consItems.map((item, itemIndex) => (
                <EditorialReveal
                  key={`mobile-con-${itemIndex}-${item.text}`}
                  delay={Math.min(itemIndex * 0.04, 0.28)}
                  className="flex items-start gap-2 px-5 py-4 font-editorial text-base leading-7 text-[#24313d]"
                >
                  <span className="font-bold text-[#ff6b35]">−</span>
                  <span className="min-w-0"><HighlightCoupon text={item.text} /></span>
                </EditorialReveal>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="grid grid-cols-2">
              <div className="border-b border-r border-[#1a4d2e]/10 bg-[#eef7f1] px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[#1a4d2e]">
                Prós
              </div>
              <div className="border-b border-[#ff6b35]/15 bg-[#fff3ee] px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[#d94b21]">
                Contras
              </div>
            </div>
            <div className="divide-y divide-[#1a4d2e]/10">
              {prosConsRows.map((row, rowIndex) => (
                <EditorialReveal
                  key={`pros-cons-row-${rowIndex}`}
                  delay={Math.min(rowIndex * 0.04, 0.28)}
                  className="grid md:grid-cols-2"
                >
                  <div className="flex min-h-14 items-start gap-2 px-5 py-4 font-editorial text-base leading-7 text-[#24313d] md:border-r md:border-[#1a4d2e]/10">
                    {row.pro ? (
                      <>
                        <span className="font-bold text-[#1a4d2e]">+</span>
                        <span className="min-w-0"><HighlightCoupon text={row.pro} /></span>
                      </>
                    ) : (
                      <span className="text-[#24313d]/35">—</span>
                    )}
                  </div>
                  <div className="flex min-h-14 items-start gap-2 bg-[#fffaf7] px-5 py-4 font-editorial text-base leading-7 text-[#24313d]">
                    {row.con ? (
                      <>
                        <span className="font-bold text-[#ff6b35]">−</span>
                        <span className="min-w-0"><HighlightCoupon text={row.con} /></span>
                      </>
                    ) : (
                      <span className="text-[#24313d]/35">—</span>
                    )}
                  </div>
                </EditorialReveal>
              ))}
            </div>
          </div>
        </div>
      )}

      {faqItems.length > 0 && (
        <div className="mt-5 space-y-4">
          {faqItems.map((faq, faqIndex) => (
            <EditorialReveal
              key={`faq-${faqIndex}`}
              delay={Math.min(faqIndex * 0.06, 0.3)}
              distance={12}
            >
              <details className="group rounded-[1.5rem] border border-[#1a4d2e]/10 bg-white px-6 py-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ff6b35]/30 hover:shadow-md open:border-[#ff6b35]/40 open:bg-[#fef9f3]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#0f1419] outline-none transition-colors group-open:text-[#1a4d2e] focus-visible:ring-2 focus-visible:ring-[#ff6b35]/35">
                  <span className="min-w-0"><HighlightCoupon text={faq.question} /></span>
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#fef9f3] text-xl font-semibold text-[#ff6b35] shadow-[inset_0_0_0_1px_rgba(255,107,53,0.10)] transition-all duration-300 group-hover:bg-[#ff6b35]/10 group-open:rotate-45 group-open:bg-[#ff6b35] group-open:text-white">
                    +
                  </span>
                </summary>
                <div className="faq-answer mt-4 border-t border-[#1a4d2e]/10 pt-4">
                  <p className="font-editorial text-base leading-relaxed text-[#24313d]">
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
              className="flex items-start gap-3 rounded-xl border border-[#1a4d2e]/10 bg-white p-4 font-editorial text-[#24313d]"
            >
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[#ff6b35]" />
              <span className="min-w-0">
                <HighlightCoupon text={item} />
              </span>
            </EditorialReveal>
          ))}
        </ul>
      )}

      {shouldRenderTopTen && <TopTenList items={section.bullets} />}

      {section.couponTiers && section.couponTiers.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-[#1a4d2e]/10 bg-white shadow-soft">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <caption className="sr-only">Faixas de cupom: código, desconto e compra mínima</caption>
            <thead>
              <tr className="bg-[#fef9f3]">
                <th scope="col" className="px-4 py-3 font-heading text-xs font-black uppercase tracking-[0.14em] text-[#0f1419]/70">
                  Cupom (clique para copiar)
                </th>
                <th scope="col" className="px-4 py-3 font-heading text-xs font-black uppercase tracking-[0.14em] text-[#0f1419]/70">
                  Desconto
                </th>
                <th scope="col" className="px-4 py-3 font-heading text-xs font-black uppercase tracking-[0.14em] text-[#0f1419]/70">
                  Compra mínima
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/8">
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
                  <td className="px-4 py-3 font-semibold text-[#0f1419]">{tier.discount}</td>
                  <td className="px-4 py-3 text-[#0f1419]/78">{tier.minPurchase}</td>
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
            const className = 'inline-flex items-center gap-1.5 rounded-full bg-[#0f1d3a] px-5 py-2.5 text-sm font-bold text-white wrap-anywhere transition-all hover:-translate-y-0.5 hover:bg-[#ff6b35] hover:shadow-md';

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
          <details className="group rounded-[1.5rem] border border-[#1a4d2e]/20 bg-[#f1f1ee] px-6 py-5 shadow-soft transition-all duration-300 hover:border-[#1a4d2e]/30 open:bg-[#e6e6e2]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#0f1419] outline-none transition-colors group-open:text-[#1a4d2e] focus-visible:ring-2 focus-visible:ring-[#ff6b35]/35">
              <span className="min-w-0">{section.accordionBlock.heading}</span>
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-xl font-semibold text-[#1a4d2e] shadow-[inset_0_0_0_1px_rgba(26,77,46,0.10)] transition-all duration-300 group-hover:bg-[#1a4d2e]/10 group-open:rotate-45 group-open:bg-[#1a4d2e] group-open:text-white">
                +
              </span>
            </summary>
            <div className="faq-answer mt-4 border-t border-[#1a4d2e]/10 pt-4 space-y-3">
              {section.accordionBlock.paragraphs.map((p, idx) => (
                <p key={idx} className="font-editorial text-base leading-relaxed text-[#24313d]">
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
          className="mt-6 font-editorial text-lg leading-8 text-[#24313d] last:mb-0"
        >
          <HighlightCoupon text={paragraph} />
        </EditorialReveal>
      ))}
    </>
  );
}
