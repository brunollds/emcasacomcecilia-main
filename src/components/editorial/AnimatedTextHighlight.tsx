'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const DEFAULT_TERMS = ['CECILIA12'];

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

interface AnimatedHighlightProps {
  children: React.ReactNode;
  className?: string;
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
}

export function AnimatedTextHighlight({
  text,
  terms = DEFAULT_TERMS,
  className = '',
}: AnimatedTextHighlightProps): React.ReactElement {
  const activeTerms = terms.filter(Boolean);

  const parts = useMemo(() => {
    if (activeTerms.length === 0) return [text];
    const pattern = new RegExp(`(${activeTerms.map(escapeRegExp).join('|')})`, 'g');
    return text.split(pattern).filter((part) => part.length > 0);
  }, [activeTerms, text]);

  if (activeTerms.length === 0 || parts.length === 1) {
    return <>{text}</>;
  }

  return (
    <>
      {parts.map((part, index) => {
        const isHighlight = activeTerms.includes(part);
        return isHighlight ? (
          <AnimatedHighlight key={`${part}-${index}`} className={className}>
            {part}
          </AnimatedHighlight>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        );
      })}
    </>
  );
}
