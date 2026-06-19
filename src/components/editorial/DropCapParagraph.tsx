'use client';

import { AnimatedTextHighlight } from './AnimatedTextHighlight';

export interface DropCapParagraphProps {
  text: string;
  className?: string;
  highlightTerms?: string[];
}

export function DropCapParagraph({
  text,
  className = '',
  highlightTerms,
}: DropCapParagraphProps): React.ReactElement {
  const trimmed = text.trim();
  if (trimmed.length === 0) return <p className={className} />;

  const firstLetter = trimmed.charAt(0);
  const rest = trimmed.slice(1);

  return (
    <p className={`mb-4 font-editorial text-lg leading-8 text-[#24313d] last:mb-0 ${className}`}>
      <span className="sr-only">{firstLetter}</span>
      <span
        aria-hidden="true"
        className="float-left mr-3 mt-1 font-editorial text-5xl font-bold leading-[0.85] text-[#1a4d2e] md:text-6xl lg:text-7xl"
      >
        {firstLetter}
      </span>
      {highlightTerms && highlightTerms.length > 0 ? (
        <AnimatedTextHighlight text={rest} terms={highlightTerms} />
      ) : (
        rest
      )}
    </p>
  );
}
