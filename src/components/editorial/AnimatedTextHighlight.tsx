'use client';

import { Fragment, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useScrollReveal } from '@/components/ui/RevealSection';
import { splitInlineMarkdown } from '@/lib/inlineMarkdown';

const DEFAULT_TERMS = ['CECILIA12'];

// Link e negrito do texto: 'd2' é o dos artigos, em marinho com o sublinhado amarelo.
const INLINE_STYLES = {
  editorial: {
    link: 'font-semibold text-[#1a4d2e] underline decoration-[#ff6b35]/50 underline-offset-2 transition-colors hover:text-[#ff6b35]',
    bold: 'font-bold text-[#1a4d2e]',
  },
  d2: {
    link: 'font-semibold text-marinho underline decoration-amarelo-cupom decoration-2 underline-offset-2 transition-colors hover:decoration-marinho',
    bold: 'font-bold text-marinho',
  },
} as const;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

interface AnimatedHighlightProps {
  children: React.ReactNode;
  className?: string;
}

// Nos artigos (d2), o código vem pintado do servidor; com o movimento liberado, o que está abaixo da tela ao
// abrir se pinta quando a rolagem chega nele (.marca-codigo no globals.css).
function MarcaCodigo({ children, className = '' }: AnimatedHighlightProps): React.ReactElement {
  const ref = useRef<HTMLSpanElement>(null);
  useScrollReveal(ref);
  return (
    <span ref={ref} className={`marca-codigo ${className}`.trim()}>
      {children}
    </span>
  );
}

function AnimatedHighlight({ children, className = '' }: AnimatedHighlightProps): React.ReactElement {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    let timeoutId: number | null = null;
    const reveal = () => {
      timeoutId = window.setTimeout(() => setIsVisible(true), 350);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(element);
    return () => {
      if (timeoutId !== null) window.clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return (
    <span
      ref={ref}
      className={`coupon-highlight ${isVisible ? 'coupon-highlight-visible' : ''} ${className}`}
    >
      {children}
    </span>
  );
}

export interface AnimatedTextHighlightProps {
  text: string;
  terms?: string[];
  className?: string;
  variant?: keyof typeof INLINE_STYLES;
  // Envolve o termo destacado (ex.: num botão de copiar). Não vale dentro de link, onde não cabe outro controle.
  renderTerm?: (term: string, highlighted: ReactNode) => ReactNode;
}

function HighlightedText({
  text,
  activeTerms,
  className,
  keyPrefix,
  renderTerm,
  variant,
}: {
  text: string;
  activeTerms: string[];
  className: string;
  keyPrefix: string;
  renderTerm?: AnimatedTextHighlightProps['renderTerm'];
  variant: keyof typeof INLINE_STYLES;
}): React.ReactElement {
  if (activeTerms.length === 0) return <>{text}</>;
  // Só a palavra inteira: CECI não deve acender dentro de EMCASACOMCECILIA.
  const pattern = new RegExp(
    `(?<![\\p{L}\\p{N}])(${activeTerms.map(escapeRegExp).join('|')})(?![\\p{L}\\p{N}])`,
    'gu'
  );
  const parts = text.split(pattern).filter((part) => part.length > 0);
  // Nos artigos (d2), um termo sozinho (o negrito **CECILIA10**) também acende; nas receitas segue como sempre foi.
  if (parts.length === 1 && !(variant === 'd2' && activeTerms.includes(parts[0]))) return <>{text}</>;
  const Highlight = variant === 'd2' ? MarcaCodigo : AnimatedHighlight;

  return (
    <>
      {parts.map((part, index) => {
        if (!activeTerms.includes(part)) return <span key={`${keyPrefix}-${index}`}>{part}</span>;
        const highlighted = <Highlight className={className}>{part}</Highlight>;
        return <Fragment key={`${keyPrefix}-${index}`}>{renderTerm ? renderTerm(part, highlighted) : highlighted}</Fragment>;
      })}
    </>
  );
}

export function AnimatedTextHighlight({
  text,
  terms = DEFAULT_TERMS,
  className = '',
  variant = 'editorial',
  renderTerm,
}: AnimatedTextHighlightProps): React.ReactElement {
  const styles = INLINE_STYLES[variant];
  const activeTerms = useMemo(
    () => terms.filter(Boolean).sort((a, b) => b.length - a.length),
    [terms]
  );

  const segments = useMemo(() => splitInlineMarkdown(text), [text]);

  return (
    <>
      {segments.map((segment, index) => {
        if (segment.type === 'link') {
          return (
            <a
              key={`link-${index}`}
              href={segment.href}
              target={segment.href.startsWith('/') ? undefined : '_blank'}
              // Link externo no texto é de loja parceira (produto, loja oficial, página da marca): sponsored.
              rel={segment.href.startsWith('/') ? undefined : 'sponsored noopener noreferrer'}
              className={styles.link}
            >
              <HighlightedText
                text={segment.text}
                activeTerms={activeTerms}
                className={className}
                keyPrefix={`link-text-${index}`}
                variant={variant}
              />
            </a>
          );
        }
        if (segment.type === 'bold') {
          return (
            <strong key={`bold-${index}`} className={styles.bold}>
              <HighlightedText
                text={segment.text}
                activeTerms={activeTerms}
                className={className}
                keyPrefix={`bold-text-${index}`}
                variant={variant}
                renderTerm={renderTerm}
              />
            </strong>
          );
        }
        return (
          <HighlightedText
            key={`text-${index}`}
            text={segment.text}
            activeTerms={activeTerms}
            className={className}
            keyPrefix={`seg-${index}`}
            variant={variant}
            renderTerm={renderTerm}
          />
        );
      })}
    </>
  );
}
