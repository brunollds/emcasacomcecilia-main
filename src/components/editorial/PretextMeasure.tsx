'use client';

import { useEffect, useMemo } from 'react';
import { prepare, layout } from '@chenglou/pretext';
import { supportsPretextSafe } from '@/lib/pretext';

export interface PretextMeasureResult {
  height: number;
  lineCount: number;
}

export interface PretextMeasureProps {
  text: string;
  font: string;
  lineHeight: number;
  width: number;
  letterSpacing?: number;
  children?: React.ReactNode;
  onMeasure?: (result: PretextMeasureResult) => void;
}

const EMPTY_RESULT: PretextMeasureResult = { height: 0, lineCount: 0 };

/**
 * Mede altura e número de linhas de um texto usando Pretext.
 * Não renderiza Canvas nem substitui o texto semântico.
 * Em SSR ou ambientes sem suporte, retorna zeros e renderiza children normalmente.
 */
export function PretextMeasure({
  text,
  font,
  lineHeight,
  width,
  letterSpacing,
  children,
  onMeasure,
}: PretextMeasureProps): React.ReactElement {
  const canMeasure = useMemo(() => {
    return supportsPretextSafe() && width > 0 && text.length > 0;
  }, [width, text]);

  const prepared = useMemo(() => {
    if (!canMeasure) return null;
    try {
      return prepare(text, font, { letterSpacing });
    } catch {
      return null;
    }
  }, [canMeasure, text, font, letterSpacing]);

  const result = useMemo<PretextMeasureResult>(() => {
    if (!prepared) return EMPTY_RESULT;
    try {
      return layout(prepared, width, lineHeight);
    } catch {
      return EMPTY_RESULT;
    }
  }, [prepared, width, lineHeight]);

  useEffect(() => {
    onMeasure?.(result);
  }, [result, onMeasure]);

  return (
    <>
      {children}
      <span aria-hidden="true" data-pretext-measure="true" className="hidden">
        {text}
      </span>
    </>
  );
}
