'use client';

import { ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import { ReviewTableOfContents, type TocItem } from './ReviewTableOfContents';
import type { Review, ReviewKind } from '@/lib/content';

export interface ReviewSidebarProps {
  review: Review;
  kind: ReviewKind;
  tocItems: TocItem[];
  transparencySection?: { heading?: string; paragraphs?: string[] } | null;
  effectiveCta?: { url: string; label: string; text?: string } | null;
}

function StarRating({ rating }: { rating: number }): React.ReactElement {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-0.5" aria-label={`Avaliação ${rating.toFixed(1)} de 5 estrelas`} role="img">
      {Array.from({ length: 5 }).map((_, index) => {
        const starNum = index + 1;
        const isFilled = starNum <= fullStars;
        const isHalf = !isFilled && starNum === fullStars + 1 && hasHalf;
        return (
          <Star
            key={starNum}
            className={`h-4 w-4 ${
              isFilled ? 'fill-[#ffd700] text-[#ffd700]' : isHalf ? 'fill-[#ffd700]/50 text-[#ffd700]' : 'text-[#ffd700]/40'
            }`}
          />
        );
      })}
    </div>
  );
}

export function ReviewSidebar({
  review,
  kind,
  tocItems,
  transparencySection,
  effectiveCta,
}: ReviewSidebarProps): React.ReactElement | null {
  if (kind === 'produto') {
    const stars = review.verdict?.stars ?? review.rating;
    const recommendation = review.verdict?.recommendation;

    return (
      <div className="space-y-6">
        {typeof stars === 'number' && (
          <div className="rounded-xl border border-[#1a4d2e]/10 bg-white p-5 shadow-soft">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#1a4d2e]/60">Veredito da Cecília</p>
            <div className="mb-2 flex items-center gap-2">
              <StarRating rating={stars} />
              <span className="text-sm font-bold text-[#1a4d2e]">{stars.toFixed(1)}</span>
            </div>
            {recommendation && (
              <p className="mb-3 text-sm font-bold text-[#1a4d2e]">
                {recommendation === 'recomendo' ? '✓ Recomendo' : recommendation === 'com ressalvas' ? 'Com ressalvas' : 'Não recomendo'}
              </p>
            )}
            {effectiveCta?.url && effectiveCta?.label && (
              <a
                href={effectiveCta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#ff6b35] px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#e55a26] hover:shadow-md"
              >
                {effectiveCta.label}
                <ArrowRight size={16} />
              </a>
            )}
          </div>
        )}

        {transparencySection && (
          <div className="rounded-xl border border-[#1a4d2e]/10 bg-white p-5 text-sm leading-relaxed text-[#4a5568]">
            <strong className="font-bold text-[#0f1419]">Transparência:</strong>{' '}
            {transparencySection.paragraphs?.join(' ')}
          </div>
        )}

        <ReviewTableOfContents items={tocItems} />
      </div>
    );
  }

  if (kind === 'guia') {
    return (
      <div className="space-y-6">
        <ReviewTableOfContents items={tocItems} />

        {transparencySection && (
          <div className="rounded-xl border border-[#1a4d2e]/10 bg-white p-5 text-sm leading-relaxed text-[#4a5568]">
            <strong className="font-bold text-[#0f1419]">Transparência:</strong>{' '}
            {transparencySection.paragraphs?.join(' ')}
          </div>
        )}
      </div>
    );
  }

  // editorial
  return (
    <div className="space-y-6">
      {transparencySection && (
        <div className="rounded-xl border border-[#1a4d2e]/10 bg-white p-5 text-sm leading-relaxed text-[#4a5568]">
          <strong className="font-bold text-[#0f1419]">Transparência:</strong>{' '}
          {transparencySection.paragraphs?.join(' ')}
        </div>
      )}

      {tocItems.length > 0 && <ReviewTableOfContents items={tocItems} />}

      {review.relatedArticles && review.relatedArticles.length > 0 && (
        <div className="rounded-xl border border-[#1a4d2e]/10 bg-white p-5 shadow-soft">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#1a4d2e]/60">Leia também</p>
          <ul className="space-y-2">
            {review.relatedArticles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/reviews/${article.slug}`}
                  className="group flex items-start gap-2 text-sm text-[#4a5568] transition-colors hover:text-[#1a4d2e]"
                >
                  <ArrowRight size={14} className="mt-0.5 flex-shrink-0 text-[#ff6b35] transition-transform group-hover:translate-x-0.5" />
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
