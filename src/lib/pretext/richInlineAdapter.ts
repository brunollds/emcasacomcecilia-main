/**
 * Rich inline chip measurement helper for mid-prose chip placement (Pretext Wave 3).
 *
 * This module measures horizontal space occupied by rich chips for Pretext layout
 * planning. Used exclusively for Pretext inlining (not for the header rows in
 * RecipeMetaChips or ReviewHighlightChips, which are normal-flow server-side renders).
 *
 * IMPORTANT: This is client-only code. Canvas measureText is used for accuracy.
 * Node.js round-trip (e.g., scripts/validate-pretext.ts) cannot use this.
 */

export interface RichInlineItem {
  text: string;
  extraWidth?: number;
}

/**
 * Measures how much horizontal space a chip occupies for Pretext layout planning.
 *
 * Returns occupied width in pixels. Uses canvas measureText via the font parameter
 * to measure text width, then adds padding and icon space.
 *
 * Fails loud if canvas is not available (non-browser context).
 *
 * @param item - Text and optional extra width (for icons, padding)
 * @param font - Font spec string, e.g. "400 13px Montserrat, system-ui"
 * @returns Width in pixels
 */
export function measureChipWidth(item: RichInlineItem, font: string): number {
  if (typeof document === 'undefined' || !document.createElement) {
    throw new Error(
      'measureChipWidth: Canvas not available in non-browser context. ' +
      'Use this function client-side only.'
    );
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('measureChipWidth: Could not acquire canvas context');
  }

  ctx.font = font;
  const textWidth = ctx.measureText(item.text).width;

  // Padding: px-2 = 0.5rem = 8px (left + right = 16px total)
  // Icon space: gap-1 = 0.25rem = 4px, icon 14px = 18px total when icon present
  // Conservative estimate: always allocate padding + gap + optional extraWidth
  const paddingWidth = 16;
  const gapAndIconWidth = (item.extraWidth ?? 0) + 4; // gap-1 + conditionally-added icon width

  return textWidth + paddingWidth + gapAndIconWidth;
}
