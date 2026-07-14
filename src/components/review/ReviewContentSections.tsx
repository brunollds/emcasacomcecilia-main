'use client';

import { EditorialReveal, SectionHeadingReveal, EditorialNotePill } from '@/components/editorial';
import { ReviewSectionContent } from './ReviewSectionContent';
import type { ContentSection, ReviewKind, EditorialNoteData } from '@/lib/content';

export interface ReviewContentSectionsProps {
  sections: ContentSection[];
  reviewTitle: string;
  sectionIds: Map<string, string>;
  filterHeadings?: string[];
  kind?: ReviewKind;
  notes?: EditorialNoteData[];
}

function getStepNumber(heading?: string): string | null {
  const match = heading?.match(/^(?:Passo\s+|Step\s+)?(\d+)(?:[\.\):\s]|\s+)/i);
  return match?.[1] || null;
}

export function ReviewContentSections({
  sections,
  reviewTitle,
  sectionIds,
  filterHeadings = [],
  kind = 'editorial',
  notes = [],
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

        // Find notes anchored to this section
        const ancheredNotes = notes.filter((note) => note.anchor === sectionId);

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
                    {stepNumber ? section.heading.replace(/^\d+\.\s+/, '') : section.heading}
                  </SectionHeadingReveal>
                  {ancheredNotes.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {ancheredNotes.map((note) => (
                        <EditorialNotePill key={note.id || note.label} note={note} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <ReviewSectionContent
              section={section}
              reviewTitle={reviewTitle}
              isFirst={isFirst}
              kind={kind}
            />
          </EditorialReveal>
        );
      })}
    </div>
  );
}
