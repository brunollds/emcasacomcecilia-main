'use client';

import type { ReactNode } from 'react';

export interface DropCapParagraphProps {
  text: string;
  className?: string;
  // Monta o texto depois da capitular (ex.: com os códigos destacados); sem ele, o texto puro.
  renderText?: (text: string) => ReactNode;
  // 'd2' (artigos): o texto e a capitular em marinho.
  variant?: 'editorial' | 'd2';
}

export function DropCapParagraph({
  text,
  className = '',
  renderText,
  variant = 'editorial',
}: DropCapParagraphProps): React.ReactElement {
  const trimmed = text.trim();
  if (trimmed.length === 0) return <p className={className} />;

  const firstLetter = trimmed.charAt(0);
  const rest = trimmed.slice(1);
  const ink = variant === 'd2' ? { text: 'text-marinho', cap: 'text-marinho' } : { text: 'text-[#24313d]', cap: 'text-[#1a4d2e]' };

  return (
    <p className={`mb-4 font-editorial text-lg leading-8 ${ink.text} last:mb-0 ${className}`}>
      <span className="sr-only">{firstLetter}</span>
      <span
        aria-hidden="true"
        className={`float-left mr-3 mt-1 font-editorial text-5xl font-bold leading-[0.85] ${ink.cap} md:text-6xl lg:text-7xl`}
      >
        {firstLetter}
      </span>
      {renderText ? renderText(rest) : rest}
    </p>
  );
}
