'use client';

import { useRef } from 'react';
import { useElementWidth } from '@/lib/pretext';
import { PretextMeasure } from './PretextMeasure';

export interface PretextPullQuoteProps {
  quote: string;
  cite?: string;
  font?: string;
  lineHeight?: number;
  className?: string;
  variant?: 'default' | 'recipe' | 'review';
}

/**
 * Renderiza um bloco de citação semântico.
 * O Pretext pode ser usado futuramente para medir linhas e controlar
 * quebras, mas o texto principal permanece em HTML puro.
 */
export function PretextPullQuote({
  quote,
  cite,
  font = '600 28px Georgia, serif',
  lineHeight = 42,
  className = '',
}: PretextPullQuoteProps): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const width = useElementWidth(containerRef);

  return (
    <figure className={`my-8 ${className}`} ref={containerRef}>
      <PretextMeasure text={quote} font={font} lineHeight={lineHeight} width={width}>
        <blockquote
          className="relative m-0 p-0"
          style={{ font, lineHeight: `${lineHeight}px` }}
        >
          <p className="m-0 text-pretty">{quote}</p>
          {cite && <cite className="not-italic block mt-3 text-sm opacity-70">{cite}</cite>}
        </blockquote>
      </PretextMeasure>
    </figure>
  );
}
