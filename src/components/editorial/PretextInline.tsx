'use client';

import { useEffect, useMemo, useRef, useSyncExternalStore } from 'react';
import { measureRichInlineStats, prepareRichInline } from '@chenglou/pretext/rich-inline';
import { supportsPretextSafe, useElementWidth } from '@/lib/pretext';

export type PretextInlineFragment =
  | { kind: 'text'; text: string; className?: string }
  | { kind: 'emphasis'; text: string; className?: string }
  | { kind: 'chip'; text: string; className?: string; extraWidth?: number }
  | { kind: 'link'; text: string; href: string; className?: string; external?: boolean };

export interface PretextInlineProps {
  fragments: PretextInlineFragment[];
  font: string;
  emphasisFont?: string;
  chipFont?: string;
  letterSpacing?: number;
  className?: string;
  onMeasure?: (result: { lineCount: number; maxLineWidth: number }) => void;
}

function subscribeToPretextSupport(): () => void {
  return () => {};
}

function getPretextSnapshot(): boolean {
  return supportsPretextSafe();
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * Renderiza texto inline enriquecido com fallback HTML semântico.
 * O Pretext é usado apenas para medição futura; nenhum Canvas desenha o texto.
 * Não usa dangerouslySetInnerHTML.
 */
export function PretextInline({
  fragments,
  font,
  emphasisFont = font,
  chipFont = font,
  letterSpacing,
  className,
  onMeasure,
}: PretextInlineProps): React.ReactElement {
  const containerRef = useRef<HTMLSpanElement>(null);
  const width = useElementWidth(containerRef);
  const canUsePretext = useSyncExternalStore(
    subscribeToPretextSupport,
    getPretextSnapshot,
    getServerSnapshot
  );

  const prepared = useMemo(() => {
    if (!canUsePretext) return null;

    try {
      return prepareRichInline(
        fragments.map((fragment) => ({
          text: fragment.text,
          font:
            fragment.kind === 'emphasis'
              ? emphasisFont
              : fragment.kind === 'chip'
                ? chipFont
                : font,
          letterSpacing,
          break: fragment.kind === 'chip' ? 'never' : 'normal',
          extraWidth: fragment.kind === 'chip' ? fragment.extraWidth ?? 0 : 0,
        }))
      );
    } catch {
      return null;
    }
  }, [canUsePretext, chipFont, emphasisFont, font, fragments, letterSpacing]);

  const stats = useMemo(() => {
    if (!prepared || width <= 0) return null;

    try {
      return measureRichInlineStats(prepared, width);
    } catch {
      return null;
    }
  }, [prepared, width]);

  useEffect(() => {
    if (stats) onMeasure?.(stats);
  }, [onMeasure, stats]);

  return (
    <span
      ref={containerRef}
      className={className}
      data-pretext-inline={canUsePretext ? 'measured' : 'fallback'}
      data-pretext-lines={stats?.lineCount}
    >
      {fragments.map((fragment, index) => {
        const key = `${fragment.kind}-${index}-${fragment.text.slice(0, 8)}`;
        const baseClass = fragment.className || '';

        if (fragment.kind === 'emphasis') {
          return (
            <strong key={key} className={baseClass} style={{ font: emphasisFont }}>
              {fragment.text}
            </strong>
          );
        }

        if (fragment.kind === 'chip') {
          return (
            <span
              key={key}
              className={`inline-flex whitespace-nowrap ${baseClass}`}
              data-pretext-chip={canUsePretext ? 'true' : undefined}
              style={{ font: chipFont }}
            >
              {fragment.text}
            </span>
          );
        }

        if (fragment.kind === 'link') {
          return (
            <a
              key={key}
              href={fragment.href}
              className={baseClass}
              target={fragment.external ? '_blank' : undefined}
              rel={fragment.external ? 'noopener noreferrer' : undefined}
              style={{ font }}
            >
              {fragment.text}
            </a>
          );
        }

        return (
          <span key={key} className={baseClass} style={{ font }}>
            {fragment.text}
          </span>
        );
      })}
    </span>
  );
}
