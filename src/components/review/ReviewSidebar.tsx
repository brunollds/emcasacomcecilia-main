'use client';

import { ArrowRight, Check, Copy, ExternalLink, Star } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { ReviewTableOfContents, type TocItem } from './ReviewTableOfContents';
import type { Review, ReviewKind } from '@/lib/content';

export interface ReviewSidebarProps {
  review: Review;
  kind: ReviewKind;
  tocItems: TocItem[];
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

function SidebarConversionCards({
  coupon,
  effectiveCta,
}: {
  coupon?: string;
  effectiveCta?: { url: string; label: string; text?: string } | null;
}): React.ReactElement | null {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!coupon) return;

    try {
      await navigator.clipboard.writeText(coupon);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  if (!coupon && !effectiveCta?.url) return null;

  return (
    <div className="space-y-3">
      {coupon && (
        <div className="rounded-xl border border-[#1a4d2e]/10 bg-white p-4 shadow-soft">
          <div className="mb-2 flex items-center justify-between gap-3 rounded-xl border border-dashed border-[#1a4d2e]/20 bg-[#faf8f3] px-4 py-3">
            <span className="font-mono text-lg font-black tracking-[0.08em] text-[#1a4d2e]">{coupon}</span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1a4d2e] text-white transition-all hover:-translate-y-0.5 hover:bg-[#ff6b35] hover:shadow-md"
              aria-label={`Copiar código ${coupon}`}
            >
              {copied ? <Check size={17} /> : <Copy size={17} />}
            </button>
          </div>
          <p className="text-xs leading-relaxed text-[#4a5568]">
            {copied ? 'Código copiado. Cole no campo correto do checkout.' : 'Copie antes de ir para a loja.'}
          </p>
        </div>
      )}

      {effectiveCta?.url && effectiveCta?.label && (
        <div>
          <a
            href={effectiveCta.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#ff6b35] px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#e55a26] hover:shadow-md"
          >
            {effectiveCta.label}
            <ExternalLink size={16} />
          </a>
        </div>
      )}
    </div>
  );
}

export function ReviewSidebar({
  review,
  kind,
  tocItems,
  effectiveCta,
}: ReviewSidebarProps): React.ReactElement | null {
  // Unified order for all kinds
  const stars = kind === 'produto' ? review.verdict?.stars ?? review.rating : undefined;
  const recommendation = kind === 'produto' ? review.verdict?.recommendation : undefined;
  const hasConversionContent = Boolean(review.coupon || effectiveCta?.url);
  const hasToc = tocItems.length > 0;
  const hasRelated = Boolean(review.relatedArticles && review.relatedArticles.length > 0);

  if (typeof stars !== 'number' && !hasConversionContent && !hasToc && !hasRelated) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* 1. Verdict card (only produto with stars) */}
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

      {/* 2. Conversion cards (coupon + CTA) */}
      {hasConversionContent && <SidebarConversionCards coupon={review.coupon} effectiveCta={effectiveCta} />}

      {/* 3. Table of Contents */}
      {hasToc && <ReviewTableOfContents items={tocItems} />}

      {/* 4. Related articles block */}
      {hasRelated && (
        <div className="rounded-xl border border-[#1a4d2e]/10 bg-white p-5 shadow-soft">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#1a4d2e]/60">Leia também</p>
          <ul className="space-y-2">
            {review.relatedArticles!.map((article) => (
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
