'use client';

import { useRef, useState } from 'react';
import { StickyNote } from 'lucide-react';
import { BottomSheet } from './BottomSheet';
import type { EditorialNoteData } from '@/lib/content';

export interface EditorialNotePillProps {
  note: EditorialNoteData;
}

export function EditorialNotePill({ note }: EditorialNotePillProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const pillRef = useRef<HTMLButtonElement>(null);

  const bodyParagraphs = note.body.split('\n\n').filter(Boolean);

  return (
    <>
      <button
        ref={pillRef}
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-[#fff4bf] px-3 py-2 text-xs font-semibold text-[#1a4d2e] shadow-soft transition-all hover:shadow-md hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:ring-offset-2 focus-visible:outline-none print:hidden"
        aria-label={`Nota editorial: ${note.label}`}
      >
        <StickyNote size={13} className="flex-shrink-0" />
        <span>{note.label}</span>
      </button>

      <BottomSheet
        open={isOpen}
        onClose={() => setIsOpen(false)}
        ariaLabel={note.label}
        returnFocusRef={pillRef}
      >
        <div>
          {bodyParagraphs.map((paragraph, index) => (
            <p
              key={`${note.id ?? note.label}-${index}`}
              className="mt-3 text-sm leading-relaxed text-[#4a5568] first:mt-0"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </BottomSheet>
    </>
  );
}
