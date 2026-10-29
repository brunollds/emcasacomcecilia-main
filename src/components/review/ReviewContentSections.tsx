'use client';

import { Fragment, type ReactNode } from 'react';
import { EditorialReveal, SectionHeadingReveal, EditorialNotePill, MarginNoteRail, type EditorialNoteLabels } from '@/components/editorial';
import { ReviewSectionContent } from './ReviewSectionContent';
import { isLineAnchor } from '@/lib/pretext/lineAnchorCodec';
import type { ContentSection, ReviewKind, EditorialNoteData } from '@/lib/content';
import type { Locale } from '@/lib/i18n/locales';

export interface ReviewContentSectionsProps {
  sections: ContentSection[];
  reviewTitle: string;
  sectionIds: Map<string, string>;
  filterHeadings?: string[];
  kind?: ReviewKind;
  notes?: EditorialNoteData[];
  reviewSlug?: string;
  coupon?: string;
  affiliate?: string;
  locale?: Locale;
  noteLabels: EditorialNoteLabels;
  // O que entra antes ou depois de uma seção, pelo id dela: os banners de campanha da loja.
  slots?: Record<string, { before?: ReactNode; after?: ReactNode }>;
}

function getStepNumber(heading?: string): string | null {
  if (!heading) return null;
  const prefixMatch = heading.match(/^(?:Passo|Paso|Étape|Schritt|Step|ステップ|步驟|步骤)\s*(\d+)/i);
  if (prefixMatch?.[1]) return prefixMatch[1];
  const koreanMatch = heading.match(/^(\d+)\s*단계/i);
  if (koreanMatch?.[1]) return koreanMatch[1];
  const digitMatch = heading.match(/^(\d+)[\.\)]/);
  return digitMatch?.[1] || null;
}

function removeStepPrefix(heading: string): string {
  if (!heading) return '';
  return heading
    .replace(/^(?:Passo|Paso|Étape|Schritt|Step|ステップ|步驟|步骤)\s*\d+[\s:\.\-—–]*/i, '')
    .replace(/^\d+\s*단계[\s:\.\-—–]*/i, '')
    .replace(/^\d+[\.\)]\s*/, '')
    .trim();
}

export function ReviewContentSections({
  sections,
  reviewTitle,
  sectionIds,
  filterHeadings = [],
  kind = 'editorial',
  notes = [],
  reviewSlug,
  coupon,
  affiliate,
  locale = 'pt',
  noteLabels,
  slots = {},
}: ReviewContentSectionsProps): React.ReactElement | null {
  const visibleSections = sections.filter((section) => !filterHeadings.includes(section.heading || ''));

  if (visibleSections.length === 0) {
    return null;
  }

  return (
    <div className="space-y-10">
      {visibleSections.map((section, index) => {
        const sectionId = section.heading ? sectionIds.get(section.heading) : undefined;
        const stepNumber = getStepNumber(section.heading);
        const isFirst = index === 0;

        // Separate section-id anchored notes (pills) from line-anchored notes (margin rail)
        const sectionIdNotes = notes.filter((note) => note.anchor === sectionId);
        const lineAnchoredNotes = notes.filter((note) => note.anchor && isLineAnchor(note.anchor));
        const slot = sectionId ? slots[sectionId] : undefined;

        return (
          <Fragment key={section.heading || `section-${index}`}>
            {slot?.before}
            <EditorialReveal
              as="section"
              id={sectionId}
              className="scroll-mt-32 lg:scroll-mt-28"
            >
              {section.heading && (
                <div className={stepNumber ? 'mb-5 flex items-start gap-4' : ''}>
                  {stepNumber && (
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-marinho bg-amarelo-cupom font-condensada text-2xl font-black text-marinho font-stretch-extra-condensed">
                      {stepNumber}
                    </span>
                  )}
                  <div className={`${stepNumber ? 'flex-1' : ''}`}>
                    <SectionHeadingReveal as="h2" variant="d2" className={stepNumber ? 'mb-0 pt-1' : 'mb-5'}>
                      {stepNumber ? removeStepPrefix(section.heading) : section.heading}
                    </SectionHeadingReveal>
                    {sectionIdNotes.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {sectionIdNotes.map((note) => (
                          <EditorialNotePill key={note.id || note.label} note={note} labels={noteLabels} variant="d2" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <MarginNoteRail notes={lineAnchoredNotes} sectionIndex={index} noteLabels={noteLabels} variant="d2">
                <ReviewSectionContent
                  section={section}
                  reviewTitle={reviewTitle}
                  isFirst={isFirst}
                  kind={kind}
                  reviewSlug={reviewSlug}
                  coupon={coupon}
                  affiliate={affiliate}
                  locale={locale}
                />
              </MarginNoteRail>
            </EditorialReveal>
            {slot?.after}
          </Fragment>
        );
      })}
    </div>
  );
}
