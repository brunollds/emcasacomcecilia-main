'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const DEFAULT_TERMS = ['CECILIA12'];
const MARKDOWN_PATTERN = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)|\*\*([^*]+)\*\*/g;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

type TextSegment =
  | { type: 'text'; text: string }
  | { type: 'link'; text: string; href: string }
  | { type: 'bold'; text: string };

function splitMarkdown(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const pattern = new RegExp(MARKDOWN_PATTERN);

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', text: text.slice(lastIndex, match.index) });
    }
    if (match[1] !== undefined && match[2] !== undefined) {
      segments.push({ type: 'link', text: match[1], href: match[2] });
    } else if (match[3] !== undefined) {
      segments.push({ type: 'bold', text: match[3] });
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length || segments.length === 0) {
    segments.push({ type: 'text', text: text.slice(lastIndex) });
  }
  return segments;
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

function HighlightedText({
  text,
  activeTerms,
  className,
  keyPrefix,
}: {
  text: string;
  activeTerms: string[];
  className: string;
  keyPrefix: string;
}): React.ReactElement {
  if (activeTerms.length === 0) return <>{text}</>;
  const pattern = new RegExp(`(${activeTerms.map(escapeRegExp).join('|')})`, 'g');
  const parts = text.split(pattern).filter((part) => part.length > 0);
  if (parts.length === 1) return <>{text}</>;

  return (
    <>
      {parts.map((part, index) => {
        const isHighlight = activeTerms.includes(part);
        return isHighlight ? (
          <AnimatedHighlight key={`${keyPrefix}-${index}`} className={className}>
            {part}
          </AnimatedHighlight>
        ) : (
          <span key={`${keyPrefix}-${index}`}>{part}</span>
        );
      })}
    </>
  );
}

export function AnimatedTextHighlight({
  text,
  terms = DEFAULT_TERMS,
  className = '',
}: AnimatedTextHighlightProps): React.ReactElement {
  const activeTerms = useMemo(
    () => terms.filter(Boolean).sort((a, b) => b.length - a.length),
    [terms]
  );

  const segments = useMemo(() => splitMarkdown(text), [text]);

  return (
    <>
      {segments.map((segment, index) => {
        if (segment.type === 'link') {
          return (
            <a
              key={`link-${index}`}
              href={segment.href}
              target={segment.href.startsWith('/') ? undefined : '_blank'}
              rel={segment.href.startsWith('/') ? undefined : 'noopener noreferrer'}
              className="font-semibold text-[#1a4d2e] underline decoration-[#ff6b35]/50 underline-offset-2 transition-colors hover:text-[#ff6b35]"
            >
              <HighlightedText
                text={segment.text}
                activeTerms={activeTerms}
                className={className}
                keyPrefix={`link-text-${index}`}
              />
            </a>
          );
        }
        if (segment.type === 'bold') {
          return (
            <strong key={`bold-${index}`} className="font-bold text-[#1a4d2e]">
              <HighlightedText
                text={segment.text}
                activeTerms={activeTerms}
                className={className}
                keyPrefix={`bold-text-${index}`}
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
          />
        );
      })}
    </>
  );
}
