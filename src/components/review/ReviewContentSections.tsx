'use client';

import { EditorialReveal, SectionHeadingReveal, EditorialNotePill, MarginNoteRail } from '@/components/editorial';
import { ReviewSectionContent } from './ReviewSectionContent';
import { isLineAnchor } from '@/lib/pretext/lineAnchorCodec';
import type { ContentSection, ReviewKind, EditorialNoteData } from '@/lib/content';

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

        return (
          <EditorialReveal
            as="section"
            key={section.heading || `section-${index}`}
            id={sectionId}
            className="scroll-mt-32 lg:scroll-mt-28"
          >
            {section.heading && (
              <div className={stepNumber ? 'mb-5 flex items-start gap-4' : ''}>
                {stepNumber && (
                  <span className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#ff6b35] font-handwritten text-2xl font-bold text-white shadow-soft">
                    {stepNumber}
                  </span>
                )}
                <div className={`${stepNumber ? 'flex-1' : ''}`}>
                  <SectionHeadingReveal
                    as="h2"
                    underlineColor="#ff6b35"
                    className={`${stepNumber ? 'mb-0 pt-1' : 'mb-5'} font-editorial text-2xl font-bold text-[#1a4d2e]`}
                  >
                    {stepNumber ? removeStepPrefix(section.heading) : section.heading}
                  </SectionHeadingReveal>
                  {sectionIdNotes.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {sectionIdNotes.map((note) => (
                        <EditorialNotePill key={note.id || note.label} note={note} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <MarginNoteRail notes={lineAnchoredNotes} sectionIndex={index}>
              <ReviewSectionContent
                section={section}
                reviewTitle={reviewTitle}
                isFirst={isFirst}
                kind={kind}
                reviewSlug={reviewSlug}
                coupon={coupon}
                affiliate={affiliate}
              />
            </MarginNoteRail>
          </EditorialReveal>
        );
      })}
    </div>
  );
}
