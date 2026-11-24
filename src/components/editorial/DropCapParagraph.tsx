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

  const ink = variant === 'd2' ? { text: 'text-marinho', cap: 'text-marinho' } : { text: 'text-[#24313d]', cap: 'text-[#1a4d2e]' };

  // Parágrafo que abre com markdown (`**negrito**`, `[link](…)`) fica sem capitular: tirar o primeiro
  // caractere quebraria a marcação e deixaria o asterisco ou o colchete à vista.
  if (/^[*[]/.test(trimmed)) {
    return <p className={`mb-4 font-editorial text-lg leading-8 ${ink.text} last:mb-0 ${className}`}>{renderText ? renderText(trimmed) : trimmed}</p>;
  }

  const firstLetter = trimmed.charAt(0);
  const rest = trimmed.slice(1);

  // A letra sai uma vez só, visível: com uma cópia em sr-only e outra aria-hidden, o texto da página (copiar,
  // snippet do Google, leitura por IA) dobrava a inicial ("CCom certeza").
  return (
    <p className={`mb-4 font-editorial text-lg leading-8 ${ink.text} last:mb-0 ${className}`}>
      <span
        data-dropcap=""
        className={`float-start me-3 mt-1 font-editorial text-5xl font-bold leading-[0.85] ${ink.cap} md:text-6xl lg:text-7xl`}
      >
        {firstLetter}
      </span>
      {renderText ? renderText(rest) : rest}
    </p>
  );
}
