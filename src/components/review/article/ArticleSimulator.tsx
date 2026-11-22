'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { isRtl } from '@/components/ui/direction';
import { FOCUS_RING } from '@/components/ui/focusRing';
import type { ContentSectionSimulator } from '@/lib/content';
import type { Locale } from '@/lib/i18n/locales';
import { HighlightCoupon } from '../HighlightCoupon';
import { getNotebookCopy } from '../notebookCopy';

export type ArticleSimulatorProps = {
  simulator: ContentSectionSimulator;
  locale?: Locale;
};

function keepCurrencyTogether(text: string): string {
  return text.replace(/R\$ (?=\d)/g, 'R$\u00a0');
}

// Simulador rápido de cenários reais verificados no carrinho (ex.: "Pix + cupom" vs "Cartão" ou faixas de compra).
// Todos os cenários saem no HTML inicial (abas escondidas com `hidden`), garantindo indexação integral.
export function ArticleSimulator({ simulator, locale = 'pt' }: ArticleSimulatorProps) {
  const id = useId();
  const copy = getNotebookCopy(locale);
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const scenarios = simulator.scenarios;
  const tabbed = scenarios.length > 1;
  const heading = simulator.title || copy.simulatorTitle;

  const select = (index: number, focus: boolean) => {
    setActive(index);
    if (focus) tabs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = scenarios.length - 1;
    const rtl = isRtl(event.currentTarget);
    const next =
      event.key === (rtl ? 'ArrowLeft' : 'ArrowRight')
        ? index === last
          ? 0
          : index + 1
        : event.key === (rtl ? 'ArrowRight' : 'ArrowLeft')
          ? index === 0
            ? last
            : index - 1
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    select(next, true);
  };

  return (
    <section
      data-article="simulator"
      aria-labelledby={`${id}-title`}
      className="mt-6 overflow-hidden rounded-2xl border-2 border-marinho bg-white text-marinho shadow-[4px_4px_0_var(--color-marinho)]"
    >
      <header className="border-b-2 border-marinho bg-creme px-4 pt-3.5 pb-3 sm:px-5">
        <h3
          id={`${id}-title`}
          className="font-condensada text-[21px] leading-tight font-black font-stretch-extra-condensed uppercase"
        >
          {heading}
        </h3>

        {tabbed && (
          <div
            role="tablist"
            aria-label={copy.simulatorTablistLabel}
            className="mt-3 flex flex-wrap gap-2"
          >
            {scenarios.map((scenario, index) => (
              <button
                key={scenario.label}
                ref={(element) => {
                  tabs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={`${id}-tab-${index}`}
                aria-controls={`${id}-panel-${index}`}
                aria-selected={index === active}
                tabIndex={index === active ? 0 : -1}
                onClick={() => select(index, false)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={`min-h-10 cursor-pointer rounded-full border-2 border-marinho px-3.5 py-1.5 text-[13px] leading-snug transition-colors motion-reduce:transition-none ${
                  index === active
                    ? 'bg-amarelo-cupom font-extrabold text-marinho shadow-[2px_2px_0_var(--color-marinho)]'
                    : 'bg-white font-bold text-marinho-suave hover:bg-white/80 hover:text-marinho'
                } ${FOCUS_RING}`}
              >
                {scenario.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {scenarios.map((scenario, index) => (
        <div
          key={scenario.label}
          id={`${id}-panel-${index}`}
          role={tabbed ? 'tabpanel' : undefined}
          aria-labelledby={tabbed ? `${id}-tab-${index}` : undefined}
          tabIndex={tabbed ? 0 : undefined}
          hidden={tabbed && index !== active}
          className={`p-4 sm:px-5 sm:py-[18px] ${FOCUS_RING}`}
        >
          <dl className="space-y-2.5">
            {scenario.lines.map((line) => (
              <div
                key={line.label}
                className={
                  line.highlight
                    ? 'flex items-baseline justify-between gap-4 rounded-lg border border-verde-escuro/30 bg-verde-claro/45 px-3 py-1.5 text-verde-escuro'
                    : 'flex items-baseline justify-between gap-4 border-b border-dashed border-marinho/20 pb-2 text-marinho'
                }
              >
                <dt className="text-sm font-semibold">
                  <HighlightCoupon text={line.label} />
                </dt>
                <dd className="shrink-0 text-sm font-extrabold">
                  {keepCurrencyTogether(line.value)}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-3.5 flex items-baseline justify-between gap-4 rounded-xl border-2 border-marinho bg-amarelo-cupom/45 px-4 py-3">
            <span className="text-sm font-extrabold uppercase tracking-[0.06em] text-marinho">
              {scenario.totalLabel || copy.simulatorTotalLabel}
            </span>
            <span className="font-condensada text-[26px] leading-none font-black font-stretch-extra-condensed text-marinho">
              {keepCurrencyTogether(scenario.totalValue)}
            </span>
          </div>

          {scenario.note && (
            <p className="mt-2.5 text-[13.5px] leading-relaxed font-medium text-marinho-suave">
              <HighlightCoupon text={scenario.note} />
            </p>
          )}
        </div>
      ))}
    </section>
  );
}
