'use client';

import { AnimatedTextHighlight } from '@/components/editorial';

export interface HighlightCouponProps {
  text: string;
}

export function HighlightCoupon({ text }: HighlightCouponProps): React.ReactElement {
  return <AnimatedTextHighlight text={text} terms={['CECILIA12']} />;
}
