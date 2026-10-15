'use client';

import { useRef, useState } from 'react';
import { StickyNote } from 'lucide-react';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { BottomSheet } from './BottomSheet';
import type { EditorialNoteData } from '@/lib/content';

// O nome da nota para o leitor de tela e o botão de fechar, no idioma da página (getEditorialNoteLabels).
export interface EditorialNoteLabels {
  title: string;
  close: string;
}

export interface EditorialNotePillProps {
  note: EditorialNoteData;
  labels: EditorialNoteLabels;
  // 'd2' (artigos): etiqueta amarela com borda marinho, e a gaveta da nota em marinho.
  variant?: 'editorial' | 'd2';
}

const PILL_STYLES = {
  editorial:
    'inline-flex items-center gap-2 rounded-full bg-[#fff4bf] px-3 py-2 text-xs font-semibold text-[#1a4d2e] shadow-soft transition-all hover:shadow-md hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:ring-offset-2 focus-visible:outline-none print:hidden',
  d2: `inline-flex items-center gap-2 rounded-full border-2 border-marinho bg-amarelo-cupom px-3 py-1.5 text-xs font-bold text-marinho transition-colors hover:bg-white ${FOCUS_RING} print:hidden`,
} as const;

export function EditorialNotePill({ note, labels, variant = 'editorial' }: EditorialNotePillProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const pillRef = useRef<HTMLButtonElement>(null);

  const bodyParagraphs = note.body.split('\n\n').filter(Boolean);

  return (
    <>
      <button
        ref={pillRef}
        type="button"
        onClick={() => setIsOpen(true)}
        className={PILL_STYLES[variant]}
        aria-label={`${labels.title}: ${note.label}`}
      >
        <StickyNote size={13} className="flex-shrink-0" />
        <span>{note.label}</span>
      </button>

      <BottomSheet
        open={isOpen}
        onClose={() => setIsOpen(false)}
        ariaLabel={note.label}
        closeLabel={labels.close}
        returnFocusRef={pillRef}
        variant={variant}
      >
        <div>
          {bodyParagraphs.map((paragraph, index) => (
            <p
              key={`${note.id ?? note.label}-${index}`}
              className={`mt-3 text-sm leading-relaxed first:mt-0 ${variant === 'd2' ? 'text-marinho-suave' : 'text-[#4a5568]'}`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </BottomSheet>
    </>
  );
}
