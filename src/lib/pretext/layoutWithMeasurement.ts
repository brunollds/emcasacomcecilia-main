import { prepare, layout } from '@chenglou/pretext';
import { supportsPretextSafe } from './supportsPretext';

export interface MeasuredLayout {
  lineCount: number;
  height: number;
}

/**
 * Mede altura e contagem de linhas de um texto usando Pretext.
 * Requer ambiente de browser com suporte a Canvas + Intl.Segmenter.
 * Lança erro descritivo se medição não é suportada — callers decidem fallback.
 */
export function layoutWithMeasurement(
  text: string,
  width: number,
  lineHeight: number,
  font: string
): MeasuredLayout {
  if (!supportsPretextSafe()) {
    throw new Error(
      'Text measurement with Pretext requires browser support: Canvas API and Intl.Segmenter. ' +
      'Not available in server environments or legacy browsers.'
    );
  }

  try {
    const prepared = prepare(text, font);
    const result = layout(prepared, width, lineHeight);

    return {
      lineCount: result.lineCount,
      height: result.height,
    };
  } catch (error) {
    throw new Error(
      `Pretext layout measurement failed: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
