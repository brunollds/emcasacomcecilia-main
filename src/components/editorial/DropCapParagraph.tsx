'use client';

import type { ReactNode } from 'react';

export interface DropCapParagraphProps {
  text: string;
  className?: string;
  // Monta o texto do parágrafo (ex.: com os códigos destacados); sem ele, o texto puro.
  renderText?: (text: string) => ReactNode;
  // 'd2' (artigos): o texto e a capitular em marinho.
  variant?: 'editorial' | 'd2';
}

// A capitular é só CSS (::first-letter) e o texto fica inteiro no HTML. Com a letra num elemento à parte, o texto
// da página dobrava a inicial ("CCom certeza") e o parágrafo que abre com negrito ficava sem capitular.
const DROP_CAP =
  'first-letter:float-start first-letter:mt-1 first-letter:text-5xl first-letter:font-bold first-letter:leading-[0.85] md:first-letter:text-6xl lg:first-letter:text-7xl';

// Palavra de uma letra só no começo ("É boa", "A marca"): o espaço logo depois da capitular cai no início da
// linha, o navegador o descarta e copiar dava "Éboa". O espaço fixo fica, e a margem menor compensa a largura dele.
const ONE_LETTER_WORD = /^(\p{P}*[\p{L}\p{N}]\p{P}*) /u;

export function DropCapParagraph({
  text,
  className = '',
  renderText,
  variant = 'editorial',
}: DropCapParagraphProps): React.ReactElement {
  const trimmed = text.trim();
  if (trimmed.length === 0) return <p className={className} />;

  const ink = variant === 'd2' ? 'text-marinho' : 'text-[#24313d] first-letter:text-[#1a4d2e]';
  const oneLetterWord = ONE_LETTER_WORD.test(trimmed);
  const body = oneLetterWord ? trimmed.replace(ONE_LETTER_WORD, '$1 ') : trimmed;
  const gap = oneLetterWord ? 'first-letter:me-2' : 'first-letter:me-3';

  return (
    <p data-dropcap="" className={`mb-4 font-editorial text-lg leading-8 ${ink} ${DROP_CAP} ${gap} last:mb-0 ${className}`}>
      {renderText ? renderText(body) : body}
    </p>
  );
}
