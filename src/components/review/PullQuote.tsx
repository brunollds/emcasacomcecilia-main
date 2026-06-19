'use client';

import { EditorialReveal } from '@/components/editorial';
import { HighlightCoupon } from './HighlightCoupon';

export interface PullQuoteProps {
  quote: string;
  cite?: string;
}

export function PullQuote({ quote, cite = 'Cecília Mauad' }: PullQuoteProps): React.ReactElement {
  return (
    <EditorialReveal as="figure" className="relative my-8 rounded-2xl border border-[#1a4d2e]/10 bg-white p-8 shadow-soft md:p-10">
      <span
        aria-hidden="true"
        className="absolute -left-2 -top-6 font-editorial text-7xl leading-none text-[#ff6b35]/20 md:text-8xl"
      >
        &ldquo;
      </span>
      <blockquote className="relative z-10 m-0 font-editorial text-xl italic leading-relaxed text-[#4a5568] md:text-2xl">
        <HighlightCoupon text={quote} />
      </blockquote>
      {cite && (
        <figcaption className="relative z-10 mt-4 text-sm font-bold not-italic text-[#1a4d2e]">
          {cite}
        </figcaption>
      )}
    </EditorialReveal>
  );
}
