'use client';

import type { ContentSectionMetrics } from '@/lib/content';
import type { Locale } from '@/lib/i18n/locales';
import { HighlightCoupon } from '../HighlightCoupon';
import { getNotebookCopy } from '../notebookCopy';

export type ArticleMetricsProps = {
  metrics: ContentSectionMetrics;
  locale?: Locale;
};

// Faixa de indicadores movida por JSON (Reclame Aqui, Trustpilot, medições técnicas).
export function ArticleMetrics({ metrics, locale = 'pt' }: ArticleMetricsProps) {
  const copy = getNotebookCopy(locale);
  const count = metrics.items.length;
  const gridCols =
    count === 3
      ? 'grid-cols-1 sm:grid-cols-3'
      : count === 2
        ? 'grid-cols-2'
        : 'grid-cols-2 sm:grid-cols-4';

  return (
    <section
      data-article="metrics"
      aria-label={copy.metricsLabel}
      className="mt-6 text-marinho"
    >
      <dl className={`grid gap-3 ${gridCols}`}>
        {metrics.items.map((item) => (
          <div
            key={item.label}
            className="flex flex-col justify-between rounded-xl border-2 border-marinho bg-white p-4 shadow-[3px_3px_0_var(--color-marinho)]"
          >
            <dt className="text-[13px] leading-snug font-bold text-marinho-suave">
              {item.label}
            </dt>
            <dd className="mt-1.5">
              <bdi dir="ltr" className="inline-baseline">
                <span className="font-condensada text-[28px] leading-none font-black font-stretch-extra-condensed text-marinho">
                  {item.value}
                </span>
                {item.unit && (
                  <span className="ms-0.5 text-sm font-bold text-marinho-suave">
                    {item.unit}
                  </span>
                )}
              </bdi>
              {item.note && (
                <span className="mt-1 block text-xs leading-snug font-medium text-marinho-suave">
                  {item.note}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>

      {metrics.summary && (
        <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border-2 border-marinho bg-creme px-4 py-3">
          {metrics.summary.badge && (
            <span className="rounded-full border-2 border-marinho bg-amarelo-cupom px-3 py-0.5 text-xs font-extrabold text-marinho">
              {metrics.summary.badge}
            </span>
          )}
          <p className="text-[13.5px] leading-relaxed font-medium text-marinho">
            <HighlightCoupon text={metrics.summary.text} />
          </p>
        </div>
      )}
    </section>
  );
}
