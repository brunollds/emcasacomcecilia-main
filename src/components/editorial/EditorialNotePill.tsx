'use client';

import { useRef, useState } from 'react';
import { StickyNote } from 'lucide-react';
import { BottomSheet } from './BottomSheet';
import { getArticleCopy } from '@/components/review/articleCopy';
import type { EditorialNoteData } from '@/lib/content';
import type { Locale } from '@/lib/i18n/locales';

export interface EditorialNotePillProps {
  note: EditorialNoteData;
  // Idioma do rótulo para o leitor de tela e do botão de fechar; as receitas só existem em PT.
  locale?: Locale;
}

export function EditorialNotePill({ note, locale = 'pt' }: EditorialNotePillProps): React.ReactElement {
  const copy = getArticleCopy(locale);
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
        aria-label={`${copy.editorialNoteTitle}: ${note.label}`}
      >
        <StickyNote size={13} className="flex-shrink-0" />
        <span>{note.label}</span>
      </button>

      <BottomSheet
        open={isOpen}
        onClose={() => setIsOpen(false)}
        ariaLabel={note.label}
        closeLabel={copy.editorialNoteClose}
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
