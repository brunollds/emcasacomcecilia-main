'use client';

import { useState } from 'react';
import { FOCUS_RING } from '@/components/ui/focusRing';
import type { ContentSection } from '@/lib/content';
import type { Locale } from '@/lib/i18n/locales';
import { keepCurrencyTogether } from '@/lib/keepCurrencyTogether';
import { HighlightCoupon } from '../HighlightCoupon';
import { getNotebookCopy } from '../notebookCopy';

export type ComparisonTableBlockProps = {
  comparisonTable: NonNullable<ContentSection['comparisonTable']>;
  sectionHeading?: string;
  reviewTitle: string;
  locale?: Locale;
};

const COMPARISON_WRAPPER_BASE = [
  'overflow-x-auto rounded-2xl border-2 border-marinho bg-white',
  'sm:[background-image:linear-gradient(to_left,#fff_35%,transparent),radial-gradient(farthest-side_at_100%_50%,rgb(15_29_58/0.22),transparent)]',
  'sm:[background-position:right_center] sm:[background-size:2.5rem_100%,0.9rem_100%]',
  'sm:[background-repeat:no-repeat] sm:[background-attachment:local,scroll]',
].join(' ');

const COMPARISON_CELL = 'align-top border-marinho/15 sm:border-e sm:last:border-e-0';
const COMPARISON_COLUMN_MIN_WIDTH = 'sm:min-w-[6rem] print:min-w-0';
const STRIPE_OPAQUE = 'sm:bg-[#f5f6f7]';

const COMPARISON_STICKY_CELL =
  'sm:sticky sm:start-0 sm:z-10 sm:min-w-[7.5rem] sm:max-w-[12rem] print:min-w-0 sm:shadow-[4px_0_6px_-4px_rgb(15_29_58/0.16)]';

const COMPARISON_HEAD_CELL = `${COMPARISON_CELL} text-start font-heading text-[0.68rem] font-black uppercase leading-snug tracking-[0.08em] text-marinho-suave sm:border-b-2 sm:border-b-marinho`;

const COMPARISON_ROW_HEAD_CELL = `${COMPARISON_CELL} ${COMPARISON_STICKY_CELL} text-start font-bold text-marinho sm:border-b max-sm:block max-sm:pb-2 max-sm:text-base max-sm:leading-snug`;

const COMPARISON_DATA_CELL = `${COMPARISON_CELL} ${COMPARISON_COLUMN_MIN_WIDTH} text-marinho sm:border-b max-sm:block max-sm:border-t max-sm:py-2 max-sm:before:mb-0.5 max-sm:before:block max-sm:before:font-heading max-sm:before:text-[0.68rem] max-sm:before:font-bold max-sm:before:uppercase max-sm:before:leading-snug max-sm:before:tracking-[0.1em] max-sm:before:text-marinho-suave max-sm:before:content-[attr(data-label)]`;

const COMPARISON_SPACING = {
  roomy: { head: 'sm:px-4 sm:py-3', body: 'leading-6 sm:px-4 sm:py-3.5' },
  compact: { head: 'sm:px-3 sm:py-2.5', body: 'leading-6 sm:px-3 sm:py-3 sm:leading-5' },
} as const;

const COMPARISON_SCROLL_MIN_COLUMNS = 6;

// Tabela comparativa com pílulas opcionais de filtro por perfil (`comparisonTable.filters`).
// No HTML inicial (activeFilter === null) todas as linhas saem sem `hidden` para buscadores e IAs lerem a tabela inteira.
export function ComparisonTableBlock({
  comparisonTable,
  sectionHeading,
  reviewTitle,
  locale = 'pt',
}: ComparisonTableBlockProps) {
  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const copy = getNotebookCopy(locale);

  const filters = comparisonTable.filters?.length ? comparisonTable.filters : null;
  const activeSet =
    filters && activeFilter !== null && filters[activeFilter]
      ? new Set(filters[activeFilter].rows)
      : null;

  const comparisonCaption =
    comparisonTable.caption || sectionHeading || `Tabela comparativa de ${reviewTitle}`;
  const comparisonScrolls = comparisonTable.headers.length >= COMPARISON_SCROLL_MIN_COLUMNS;
  const comparisonSpacing = COMPARISON_SPACING[comparisonScrolls ? 'compact' : 'roomy'];
  const totalRows = comparisonTable.rows.length;
  const visibleRowIndices = comparisonTable.rows.flatMap((_, idx) =>
    !activeSet || activeSet.has(idx) ? [idx] : []
  );
  const visiblePositionByRow = new Map(visibleRowIndices.map((rowIdx, pos) => [rowIdx, pos]));
  const shownRows = visibleRowIndices.length;

  return (
    <>
      {filters && (
        <div
          role="group"
          aria-label={copy.tableFilterGroup}
          data-article="table-filters"
          className="mt-6 mb-3 flex flex-wrap items-center gap-2 print:hidden"
        >
          <button
            type="button"
            aria-pressed={activeFilter === null}
            onClick={() => setActiveFilter(null)}
            className={`min-h-10 cursor-pointer rounded-full border-2 border-marinho px-3.5 py-1.5 text-[13px] leading-snug transition-colors motion-reduce:transition-none ${
              activeFilter === null
                ? 'bg-amarelo-cupom font-extrabold text-marinho shadow-[2px_2px_0_var(--color-marinho)]'
                : 'bg-white font-bold text-marinho-suave hover:bg-creme hover:text-marinho'
            } ${FOCUS_RING}`}
          >
            {copy.tableFilterAll}
          </button>
          {filters.map((filter, index) => {
            const selected = activeFilter === index;
            return (
              <button
                key={filter.label}
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveFilter(selected ? null : index)}
                className={`min-h-10 cursor-pointer rounded-full border-2 border-marinho px-3.5 py-1.5 text-[13px] leading-snug transition-colors motion-reduce:transition-none ${
                  selected
                    ? 'bg-amarelo-cupom font-extrabold text-marinho shadow-[2px_2px_0_var(--color-marinho)]'
                    : 'bg-white font-bold text-marinho-suave hover:bg-creme hover:text-marinho'
                } ${FOCUS_RING}`}
              >
                {filter.label}
              </button>
            );
          })}
          {activeSet && (
            <span aria-live="polite" className="ms-1 text-xs font-bold text-marinho-suave">
              {copy.tableFilterCount(shownRows, totalRows)}
            </span>
          )}
        </div>
      )}

      <div
        className={`${filters ? 'mt-3' : 'mt-6'} ${
          comparisonScrolls ? `${COMPARISON_WRAPPER_BASE} ${FOCUS_RING}` : COMPARISON_WRAPPER_BASE
        }`}
        tabIndex={comparisonScrolls ? 0 : undefined}
        role={comparisonScrolls ? 'region' : undefined}
        aria-label={comparisonScrolls ? comparisonCaption : undefined}
      >
        <table role="table" className="border-separate border-spacing-0 text-start text-sm max-sm:block sm:w-full">
          <caption className="sr-only">{comparisonCaption}</caption>
          <thead role="rowgroup" className="max-sm:sr-only">
            <tr role="row" className="bg-white">
              {comparisonTable.headers.map((header, headerIndex) => (
                <th
                  key={header}
                  role="columnheader"
                  scope="col"
                  className={
                    headerIndex === 0
                      ? `${COMPARISON_HEAD_CELL} ${comparisonSpacing.head} ${COMPARISON_STICKY_CELL} sm:bg-white`
                      : `${COMPARISON_HEAD_CELL} ${comparisonSpacing.head} ${COMPARISON_COLUMN_MIN_WIDTH}`
                  }
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            role="rowgroup"
            className="max-sm:block max-sm:divide-y max-sm:divide-marinho/15 sm:[&>tr:last-child>*]:border-b-0"
          >
            {comparisonTable.rows.map((row, rowIndex) => {
              const visiblePos = visiblePositionByRow.get(rowIndex);
              const isHidden = visiblePos === undefined;
              const isStriped = visiblePos !== undefined && visiblePos % 2 !== 0;
              return (
                <tr
                  key={`${row[0]}-${rowIndex}`}
                  role="row"
                  hidden={isHidden || undefined}
                  className={isHidden ? undefined : `max-sm:block max-sm:px-4 max-sm:py-4 ${isStriped ? 'bg-marinho/4' : ''}`}
                >
                  {row.map((cell, cellIndex) =>
                    cellIndex === 0 ? (
                      <th
                        key={`${cell}-${cellIndex}`}
                        role="rowheader"
                        scope="row"
                        className={`${COMPARISON_ROW_HEAD_CELL} ${comparisonSpacing.body} ${
                          isStriped ? STRIPE_OPAQUE : 'sm:bg-white'
                        }`}
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
                    )
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
