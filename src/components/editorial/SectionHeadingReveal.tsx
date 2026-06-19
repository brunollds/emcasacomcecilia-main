'use client';

import { EditorialReveal } from './EditorialReveal';

export interface SectionHeadingRevealProps {
  children: React.ReactNode;
  as?: 'h2' | 'h3';
  className?: string;
  underlineColor?: string;
  underlineHeight?: number;
  delay?: number;
}

/**
 * Heading editorial com animação de revelação e sublinhado desenhado via CSS.
 * Usa EditorialReveal internamente.
 * Não acopla cores ou fontes exclusivas a um único template.
 */
export function SectionHeadingReveal({
  children,
  as: Heading = 'h2',
  className = '',
  underlineColor = 'var(--laranja, #ff6b35)',
  underlineHeight = 3,
  delay = 0,
}: SectionHeadingRevealProps): React.ReactElement {
  return (
    <EditorialReveal as={Heading} delay={delay} className={`relative inline-block ${className}`}>
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
