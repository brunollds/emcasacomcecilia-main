'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import ReviewInlineImage from '@/components/ReviewInlineImage';
import { DropCapParagraph, EditorialReveal, PretextShrinkwrap, TopTenList } from '@/components/editorial';
import { HighlightCoupon } from './HighlightCoupon';
import { CopyButton, CouponStoreLink } from '@/components/CouponComponents';
import type { ContentSection } from '@/lib/content';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { getFaqItems, isFaqHeading } from '@/lib/faq';
import type { Locale } from '@/lib/i18n/locales';
import { isCouponPageLink, isInternalLink } from '@/lib/internalLinks';
import { PadroesReclamacao } from './ReputacaoMetricas';
import { ReviewSectionVideo } from './ReviewSectionVideo';
import { TrackedCouponPageLink } from './TrackedCouponPageLink';
import { ArticleChecklist } from './article/ArticleChecklist';
import { ArticleMetrics } from './article/ArticleMetrics';
import { ArticleSimulator } from './article/ArticleSimulator';
import { ArticleStyling } from './article/ArticleStyling';
import { ComparisonTableBlock } from './article/ComparisonTableBlock';
import { withoutPausedStoreLinks, type MultiStores } from '@/lib/reviewStores';

export interface ReviewSectionContentProps {
  section: ContentSection;
  reviewTitle: string;
  isFirst?: boolean;
  kind?: 'editorial' | 'guia' | 'produto';
  reviewSlug?: string;
  coupon?: string;
  affiliate?: string;
  storeBrand?: string;
  // O artigo de várias lojas: as lojas dele (slug: marca e código), para o `store` dos links, das fotos e do card.
  multiStores?: MultiStores;
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

// Prós e contras: o título de cada coluna (verde e amarelo) e a célula de cada item.
const PROS_HEADING = 'border-marinho bg-verde-claro px-5 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-verde-escuro';
const CONS_HEADING = 'border-marinho bg-amarelo-cupom/40 px-5 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-marinho';
const PROS_CONS_CELL = 'flex items-start gap-2 px-5 py-4 font-editorial text-base leading-7 text-marinho';

// O acordeão do FAQ e o da seção (accordionBlock): pergunta em negrito e o + que vira x ao abrir.
const ACCORDION_SUMMARY = `flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 font-extrabold text-marinho [&::-webkit-details-marker]:hidden ${FOCUS_RING}`;
const ACCORDION_ICON =
  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-marinho bg-white text-xl font-bold text-marinho transition-transform group-open:rotate-45 group-open:bg-amarelo-cupom motion-reduce:transition-none';

// Botão dos links da seção (loja, página de cupom, link externo). O link patrocinado fica laranja, como os outros
// botões do artigo que levam à loja (sidebar e gaveta); o test:build-output confere.
const SECTION_LINK_SHAPE = `inline-flex min-h-11 items-center gap-1.5 rounded-[10px] border-2 border-marinho px-5 py-2 text-sm font-extrabold text-marinho wrap-anywhere transition-colors ${FOCUS_RING}`;
const SECTION_LINK = `${SECTION_LINK_SHAPE} bg-white hover:bg-amarelo-cupom`;
const SECTION_LINK_SPONSORED = `${SECTION_LINK_SHAPE} bg-laranja hover:bg-laranja/85`;

export function ReviewSectionContent({
  section,
  reviewTitle,
  isFirst = false,
  kind = 'editorial',
  reviewSlug,
  coupon,
  affiliate,
  storeBrand,
  multiStores,
  locale = 'pt',
}: ReviewSectionContentProps): React.ReactElement {
  const showDropCap = isFirst && Boolean(kind);
  // A loja das fotos com link de produto (o "Ver na <loja>" e a medição).
  const imageStore = affiliate && storeBrand ? { slug: affiliate, brand: storeBrand } : undefined;
  const { comparisonTable } = section;
  // O botão de loja pausada no artigo de várias lojas sai; os outros links ficam.
  const links = withoutPausedStoreLinks(section.links, multiStores);
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

  const emphasisAtEnd = Boolean(section.emphasis && !section.emphasisAfterParagraph);

  const renderEmphasisBlock = (withImage: boolean = true) => (
    <div className={withImage && section.image ? 'my-6 grid grid-cols-1 gap-6 md:grid-cols-[1fr_200px] items-center' : 'my-6'}>
      <div>
        <PretextShrinkwrap
          text={section.emphasis}
          font="italic 400 18px Lora, Georgia, serif"
          lineHeight={30}
          minWidth={260}
          maxWidthRatio={0.9}
          className="rounded-e-xl border-s-[6px] border-marinho bg-amarelo-cupom/25 px-5 py-4"
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
            store={imageStore}
            stores={multiStores}
            reviewSlug={reviewSlug}
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
                <DropCapParagraph text={paragraph} renderText={(rest) => <HighlightCoupon text={rest} />} variant="d2" />
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

      {emphasisAtEnd && renderEmphasisBlock(true)}

      {/* O cartão do fim já desenha a `image` ao lado; a galeria `images` não cabe ali e vem depois dele. */}
      {(section.image || (section.images && section.images.length > 0)) && !(emphasisAtEnd && section.image) && (
        <ReviewInlineImage section={section} reviewTitle={reviewTitle} locale={locale} store={imageStore} stores={multiStores} reviewSlug={reviewSlug} />
      )}

      {section.metrics && <ArticleMetrics metrics={section.metrics} locale={locale} />}

      {comparisonTable && (
        <ComparisonTableBlock
          comparisonTable={comparisonTable}
          sectionHeading={section.heading}
          reviewTitle={reviewTitle}
          locale={locale}
        />
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
              <div className={`border-e-2 ${PROS_HEADING}`}>
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
                  <div className={`min-h-14 md:border-e-2 md:border-marinho ${PROS_CONS_CELL}`}>
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
                  <span className="min-w-0"><HighlightCoupon text={faq.question} copyable={false} /></span>
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
          <table className="w-full min-w-[480px] border-collapse text-start text-sm">
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

      {links.length > 0 && (
        <div className={`mt-4 flex flex-wrap gap-4 ${Boolean(section.image || (section.images && section.images.length > 0)) ? 'justify-center w-full' : ''}`}>
          {links.map((link) => {
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
                  couponCode={link.store && multiStores?.[link.store] ? multiStores[link.store].code : coupon}
                  brand={link.store && multiStores?.[link.store] ? link.store : affiliate}
                  contentSlug={reviewSlug}
                  sponsored
                  placement="review_inline"
                  className={SECTION_LINK_SPONSORED}
                >
                  {link.label}
                  <ArrowUpRight size={16} className="shrink-0" />
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
                {!internal && <ArrowUpRight size={16} className="shrink-0" />}
              </a>
            );
          })}
        </div>
      )}

      {section.widget === 'PadroesReclamacao' && (
        <div className="mt-6">
          <PadroesReclamacao />
        </div>
      )}

      {section.simulator && <ArticleSimulator simulator={section.simulator} locale={locale} />}

      {section.checklist && <ArticleChecklist checklist={section.checklist} locale={locale} />}

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

      {section.styling && (
        <ArticleStyling styling={section.styling} locale={locale} affiliate={affiliate} multiStores={multiStores} reviewSlug={reviewSlug} />
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
