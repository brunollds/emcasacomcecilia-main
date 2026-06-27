'use client';

import { ArrowUpRight } from 'lucide-react';
import ReviewInlineImage from '@/components/ReviewInlineImage';
import { DropCapParagraph, EditorialReveal, PretextShrinkwrap, TopTenList } from '@/components/editorial';
import { HighlightCoupon } from './HighlightCoupon';
import type { ContentSection } from '@/lib/content';
import { ReputacaoMetricas, PadroesReclamacao } from './ReputacaoMetricas';

export interface ReviewSectionContentProps {
  section: ContentSection;
  reviewTitle: string;
  isFirst?: boolean;
  kind?: 'editorial' | 'guia' | 'produto';
}

function isInternalLink(href: string): boolean {
  return href.startsWith('/') || href.startsWith('#');
}

function parseProsConsBullet(item: string): { type: 'pro' | 'con'; text: string } | null {
  const match = item.match(/^(Prós|Contras):\s*(.+)$/i);
  if (!match) return null;
  return {
    type: match[1].toLowerCase() === 'prós' ? 'pro' : 'con',
    text: match[2],
  };
}

function parseFaqBullet(item: string): { question: string; answer: string } {
  const match = item.match(/^([^\?]+\?)\s*(.+)$/);
  if (match) {
    return {
      question: match[1].trim(),
      answer: match[2].trim(),
    };
  }
  // Try mapping by first colon ":" if no "?" found
  const colonIndex = item.indexOf(':');
  if (colonIndex > 0) {
    return {
      question: item.substring(0, colonIndex + 1).trim(),
      answer: item.substring(colonIndex + 1).trim(),
    };
  }
  // Fallback
  return {
    question: 'Dúvida',
    answer: item,
  };
}

function shouldRenderTopTenList(section: ContentSection): boolean {
  if (!section.bullets || section.bullets.length < 5) return false;
  const allNumbered = section.bullets.every((item) => /^\d+\.\s*/.test(item));
  const headingMatches = /\b10\b|fatos?|top\s*10|curiosidades/i.test(section.heading || '');
  return allNumbered && (section.bullets.length >= 10 || headingMatches);
}

export function ReviewSectionContent({
  section,
  reviewTitle,
  isFirst = false,
  kind = 'editorial',
}: ReviewSectionContentProps): React.ReactElement {
  const showDropCap = isFirst && Boolean(kind);
  const prosConsItems = section.bullets
    ?.map(parseProsConsBullet)
    .filter((item): item is { type: 'pro' | 'con'; text: string } => Boolean(item));
  const shouldRenderProsConsTable = Boolean(
    prosConsItems?.length && prosConsItems.length === section.bullets?.length
  );
  const shouldRenderTopTen = shouldRenderTopTenList(section);
  const prosItems = prosConsItems?.filter((item) => item.type === 'pro') ?? [];
  const consItems = prosConsItems?.filter((item) => item.type === 'con') ?? [];
  const prosConsRows = Array.from(
    { length: Math.max(prosItems.length, consItems.length) },
    (_, rowIndex) => ({
      pro: prosItems[rowIndex]?.text,
      con: consItems[rowIndex]?.text,
    })
  );
  const isFaq = Boolean(
    section.heading?.toLowerCase().includes('perguntas frequentes') ||
    section.heading?.toLowerCase().includes('faq')
  );

  return (
    <>
      {section.paragraphs?.map((paragraph, paragraphIndex) => {
        const isFirstParagraph = showDropCap && paragraphIndex === 0;
        if (isFirstParagraph) {
          return (
            <EditorialReveal
              key={`p-${paragraphIndex}`}
              delay={0}
              distance={14}
            >
              <DropCapParagraph text={paragraph} highlightTerms={['CECILIA12', 'CECI', 'CECILIA010']} />
            </EditorialReveal>
          );
        }
        return (
          <EditorialReveal
            as="p"
            key={`p-${paragraphIndex}`}
            delay={Math.min(paragraphIndex * 0.05, 0.25)}
            distance={14}
            className="mb-4 font-editorial text-lg leading-8 text-[#24313d] last:mb-0"
          >
            <HighlightCoupon text={paragraph} />
          </EditorialReveal>
        );
      })}

      {section.emphasis && (
        <div className="group my-6">
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
      )}

      {(section.image || (section.images && section.images.length > 0)) && (
        <ReviewInlineImage section={section} reviewTitle={reviewTitle} />
      )}

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
                  <span><HighlightCoupon text={item.text} /></span>
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
                  <span><HighlightCoupon text={item.text} /></span>
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
                        <span><HighlightCoupon text={row.pro} /></span>
                      </>
                    ) : (
                      <span className="text-[#24313d]/35">—</span>
                    )}
                  </div>
                  <div className="flex min-h-14 items-start gap-2 bg-[#fffaf7] px-5 py-4 font-editorial text-base leading-7 text-[#24313d]">
                    {row.con ? (
                      <>
                        <span className="font-bold text-[#ff6b35]">−</span>
                        <span><HighlightCoupon text={row.con} /></span>
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

      {section.bullets && section.bullets.length > 0 && !shouldRenderProsConsTable && !shouldRenderTopTen && (
        isFaq ? (
          <div className="mt-5 space-y-4">
            {section.bullets.map((item, bulletIndex) => {
              const faq = parseFaqBullet(item);
              return (
                <EditorialReveal
                  key={`faq-${bulletIndex}`}
                  delay={Math.min(bulletIndex * 0.06, 0.3)}
                  distance={12}
                >
                  <details className="group rounded-[1.5rem] border border-[#1a4d2e]/10 bg-white px-6 py-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ff6b35]/30 hover:shadow-md open:border-[#ff6b35]/40 open:bg-[#fef9f3]">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#0f1419] outline-none transition-colors group-open:text-[#1a4d2e] focus-visible:ring-2 focus-visible:ring-[#ff6b35]/35">
                      <span><HighlightCoupon text={faq.question} /></span>
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
              );
            })}
          </div>
        ) : (
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
                <span>
                  <HighlightCoupon text={item} />
                </span>
              </EditorialReveal>
            ))}
          </ul>
        )
      )}

      {shouldRenderTopTen && <TopTenList items={section.bullets} />}

      {section.links && section.links.length > 0 && (
        <div className={`mt-4 flex flex-wrap gap-4 ${Boolean(section.image || (section.images && section.images.length > 0)) ? 'justify-center w-full' : ''}`}>
          {section.links.map((link) => {
            const internal = isInternalLink(link.href);
            return (
              <a
                key={link.href}
                href={link.href}
                target={internal ? undefined : '_blank'}
                rel={internal ? undefined : 'noopener noreferrer'}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#0f1d3a] px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#ff6b35] hover:shadow-md"
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
              <span>{section.accordionBlock.heading}</span>
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
