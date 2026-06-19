/**
 * Tokens tipográficos compartilhados para medição com Pretext.
 * Devem permanecer sincronizados com as variáveis CSS em globals.css.
 */

export interface PretextFontStack {
  family: string;
  fallback: string;
}

export const fontStack = {
  sans: {
    family: 'Montserrat',
    fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  } satisfies PretextFontStack,
  serif: {
    family: 'Lora',
    fallback: 'Georgia, "Times New Roman", serif',
  } satisfies PretextFontStack,
  hand: {
    family: 'Caveat',
    fallback: '"Brush Script MT", cursive, sans-serif',
  } satisfies PretextFontStack,
} as const;

export function fontString(
  stack: keyof typeof fontStack,
  sizePx: number,
  weight: number | string = 400,
  style: 'normal' | 'italic' = 'normal'
): string {
  const { family, fallback } = fontStack[stack];
  return `${style} ${weight} ${sizePx}px ${family}, ${fallback}`;
}

export const editorialLineHeight = {
  tight: 1.25,
  normal: 1.6,
  relaxed: 1.75,
} as const;

export const editorialLetterSpacing = {
  tight: -0.02,
  normal: 0,
  wide: 0.02,
} as const;
