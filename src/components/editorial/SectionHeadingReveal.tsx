'use client';

import { useRef } from 'react';
import { useScrollReveal } from '@/components/ui/RevealSection';
import { EditorialReveal } from './EditorialReveal';

export interface SectionHeadingRevealProps {
  children: React.ReactNode;
  as?: 'h2' | 'h3';
  className?: string;
  underlineColor?: string;
  underlineHeight?: number;
  delay?: number;
  // 'd2' (artigos): título condensado em marinho com o marca-texto, que se pinta quando a rolagem chega
  // nele; sem o sublinhado nem a entrada do EditorialReveal. As cores e a fonte vêm daqui.
  variant?: 'editorial' | 'd2';
}

function MarcaTextoHeading({ as: Heading, className, children }: { as: 'h2' | 'h3'; className: string; children: React.ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useScrollReveal(ref);
  return (
    <Heading
      ref={ref}
      className={`font-condensada text-[30px] leading-[1.02] font-black text-balance text-marinho wrap-anywhere font-stretch-extra-condensed md:text-[38px] ${className}`}
    >
      <span className="marca-texto">{children}</span>
    </Heading>
  );
}

// Título de seção. No 'editorial' (receitas), entra com o EditorialReveal e ganha o sublinhado desenhado
// no CSS; as cores e a fonte vêm do className.
export function SectionHeadingReveal({
  children,
  as: Heading = 'h2',
  className = '',
  underlineColor = 'var(--laranja, #ff6b35)',
  underlineHeight = 3,
  delay = 0,
  variant = 'editorial',
}: SectionHeadingRevealProps): React.ReactElement {
  if (variant === 'd2') {
    return <MarcaTextoHeading as={Heading} className={className}>{children}</MarcaTextoHeading>;
  }
  // Uma palavra mais longa que a coluna, como um código de cupom, quebra em vez de alargar o título.
  return (
    <EditorialReveal as={Heading} delay={delay} className={`relative inline-block wrap-anywhere ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        className="editorial-underline"
        aria-hidden="true"
        style={{
          backgroundColor: underlineColor,
          height: `${underlineHeight}px`,
        }}
      />
    </EditorialReveal>
  );
}
