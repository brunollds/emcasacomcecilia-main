'use client';

import { useId, useState, type MouseEvent } from 'react';
import { Check } from 'lucide-react';
import { FOCUS_RING } from '@/components/ui/focusRing';
import type { ContentSectionChecklist } from '@/lib/content';
import type { Locale } from '@/lib/i18n/locales';
import { HighlightCoupon } from '../HighlightCoupon';
import { getNotebookCopy } from '../notebookCopy';

export type ArticleChecklistProps = {
  checklist: ContentSectionChecklist;
  locale?: Locale;
};

// Checklist clicável do caderno ("Antes de fechar o pedido"): cada item tem um checkbox acessível separado do texto
// para nunca aninhar <button> dentro de <button> quando HighlightCoupon desenha o botão de copiar código no meio da frase.
export function ArticleChecklist({ checklist, locale = 'pt' }: ArticleChecklistProps) {
  const id = useId();
  const copy = getNotebookCopy(locale);
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const total = checklist.items.length;
  const doneCount = Object.values(checked).filter(Boolean).length;
  const allDone = total > 0 && doneCount === total;
  const heading = checklist.title || copy.checklistTitle;

  const toggle = (index: number) => {
    setChecked((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const onRowClick = (event: MouseEvent<HTMLDivElement>, index: number) => {
    if ((event.target as HTMLElement).closest('button, a')) return;
    toggle(index);
  };

  return (
    <section
      data-article="checklist"
      aria-labelledby={`${id}-title`}
      className="mt-6 overflow-hidden rounded-2xl border-2 border-marinho bg-white text-marinho shadow-[4px_4px_0_var(--color-marinho)]"
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-marinho bg-amarelo-cupom/45 px-4 py-3 sm:px-5">
        <h3
          id={`${id}-title`}
          className="font-condensada text-[21px] leading-tight font-black font-stretch-extra-condensed uppercase"
        >
          {heading}
        </h3>
        <span
          aria-live="polite"
          className={`rounded-full border-2 px-3 py-0.5 text-xs font-extrabold transition-colors motion-reduce:transition-none ${
            allDone
              ? 'border-verde-escuro bg-verde-claro text-verde-escuro'
              : 'border-marinho bg-white text-marinho-suave'
          }`}
        >
          {copy.checklistProgress(doneCount, total)}
        </span>
      </header>

      <ul className="divide-y divide-marinho/15">
        {checklist.items.map((item, index) => {
          const isChecked = Boolean(checked[index]);
          const itemId = `${id}-item-${index}`;
          return (
            <li key={`${index}-${item}`}>
              <div
                onClick={(event) => onRowClick(event, index)}
                className={`flex cursor-pointer items-start gap-3.5 px-4 py-3.5 transition-colors motion-reduce:transition-none sm:px-5 ${
                  isChecked ? 'bg-verde-claro/25' : 'hover:bg-creme/70'
                }`}
              >
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={isChecked}
                  aria-labelledby={itemId}
                  onClick={() => toggle(index)}
                  className={`mt-0.5 -m-2 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg ${FOCUS_RING}`}
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-6 w-6 items-center justify-center rounded-[6px] border-2 transition-colors motion-reduce:transition-none ${
                      isChecked
                        ? 'border-verde-escuro bg-verde-escuro text-white'
                        : 'border-marinho bg-white'
                    }`}
                  >
                    {isChecked && <Check className="h-4 w-4 stroke-[3]" />}
                  </span>
                </button>

                <span
                  id={itemId}
                  className={`min-w-0 flex-1 font-editorial text-[17px] leading-7 transition-opacity motion-reduce:transition-none ${
                    isChecked ? 'text-marinho-suave line-through decoration-marinho/40' : 'text-marinho'
                  }`}
                >
                  <HighlightCoupon text={item} />
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
