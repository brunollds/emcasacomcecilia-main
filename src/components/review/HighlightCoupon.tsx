'use client';

import { AnimatedTextHighlight } from '@/components/editorial';

// Faixas da Magalu: 10EMCASACOMCECILIA … 100EMCASACOMCECILIA.
const MAGALU_TIER_CODES = Array.from({ length: 10 }, (_, i) => `${(i + 1) * 10}EMCASACOMCECILIA`);

/** Códigos de cupom destacados no texto dos artigos. */
export const COUPON_HIGHLIGHT_TERMS = [
  ...MAGALU_TIER_CODES,
  'EMCASACOMCECILIA',
  'CECILIA010',
  'CECILIA12',
  'CECIEMCASA',
  'CECI',
];

export interface HighlightCouponProps {
  text: string;
}

export function HighlightCoupon({ text }: HighlightCouponProps): React.ReactElement {
  return <AnimatedTextHighlight text={text} terms={COUPON_HIGHLIGHT_TERMS} />;
}
