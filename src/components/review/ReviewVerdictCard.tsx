'use client';

import { CheckCircle2, Star, XCircle } from 'lucide-react';
import { EditorialReveal, SectionLinkButton } from '@/components/editorial';
import type { Review, ReviewKind } from '@/lib/content';

export interface ReviewVerdictCardProps {
  review: Review;
  kind: ReviewKind;
}

function StarRating({
  rating,
  interactive = false,
}: {
  rating: number;
  interactive?: boolean;
}): React.ReactElement {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div
      className="flex items-center gap-1"
      aria-label={`Avaliação ${rating.toFixed(1)} de 5 estrelas`}
      role="img"
    >
      {Array.from({ length: 5 }).map((_, index) => {
        const starNum = index + 1;
        const isFilled = starNum <= fullStars;
        const isHalf = !isFilled && starNum === fullStars + 1 && hasHalf;
        return (
          <Star
            key={starNum}
            className={`h-5 w-5 transition-transform duration-150 ${
              interactive ? 'cursor-pointer hover:scale-125' : ''
            } ${
              isFilled
                ? 'fill-[#ffd700] text-[#ffd700]'
                : isHalf
                  ? 'fill-[#ffd700]/50 text-[#ffd700]'
                  : 'text-[#ffd700]/40'
            }`}
          />
        );
      })}
    </div>
  );
}

export function ReviewVerdictCard({
  review,
  kind,
}: ReviewVerdictCardProps): React.ReactElement | null {
  if (kind !== 'produto') {
    return null;
  }

  const hasVerdict = Boolean(review.verdict?.stars);
  const hasRating = typeof review.rating === 'number';
  const stars = review.verdict?.stars ?? review.rating ?? 0;
  const summary = review.verdict?.summary || review.description;
  const showSeal = review.verdict?.recommendation === 'recomendo' || (!review.verdict && hasRating && stars >= 4);

  if (!hasVerdict && !hasRating && review.pros.length === 0 && review.cons.length === 0) {
    return null;
  }

  const prosItems = review.pros || [];
  const consItems = review.cons || [];
  const rows = Array.from(
    { length: Math.max(prosItems.length, consItems.length) },
    (_, index) => ({
      pro: prosItems[index],
      con: consItems[index],
    })
  );

  return (
    <EditorialReveal as="section" id="veredito" className="mb-10 space-y-6 scroll-mt-24">
      {(hasVerdict || hasRating) && (
        <div className="relative overflow-hidden rounded-2xl border border-[#1a4d2e]/10 bg-white shadow-soft">
          {showSeal && (
            <div className="absolute right-3 top-3 z-10 max-w-[150px] rotate-[-6deg] text-center sm:right-4 sm:top-4 sm:max-w-none">
              <span className="inline-block rounded-full border-2 border-[#ff6b35]/30 bg-[#fff8f0] px-3 py-1.5 font-hand-title text-xs font-bold leading-tight text-[#d94b21] shadow-sm sm:px-4 sm:py-2 sm:text-sm">
                Aprovado pela Cecília
              </span>
            </div>
          )}

          <div className="grid md:grid-cols-[190px_1fr]">
            <div className="flex flex-col justify-center bg-[#1a4d2e] p-6 text-white">
              <StarRating rating={stars} interactive />
              <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/65">
                Nota da Cecília
              </p>
              <span className="mt-3 w-fit rounded-md bg-white/10 px-3 py-1.5 text-xs font-bold text-white">
                {review.verdict?.recommendation === 'recomendo'
                  ? '✓ Recomendo'
                  : review.verdict?.recommendation || 'Avaliado'}
              </span>
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-3 flex items-center gap-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1a4d2e]/55">
                  Veredito
                </p>
                <SectionLinkButton anchorId="veredito" />
              </div>
              <p className="font-editorial text-lg italic leading-relaxed text-[#24313d]">
                &quot;{summary}&quot;
              </p>
              {review.cta?.text && (
                <p className="mt-4 text-sm font-bold text-[#1a4d2e]">
                  {review.cta.text}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {(prosItems.length > 0 || consItems.length > 0) && (
        <div id="pros-e-contras" className="scroll-mt-24 overflow-hidden rounded-2xl border border-[#1a4d2e]/10 bg-white shadow-soft">
          <div className="grid gap-0 md:hidden">
            <div className="border-b border-[#1a4d2e]/10 bg-[#eef7f1] px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[#1a4d2e]">
              <CheckCircle2 className="mb-1 h-4 w-4" />
              Pontos fortes
            </div>
            <div className="divide-y divide-[#1a4d2e]/10">
              {prosItems.map((item, itemIndex) => (
                <EditorialReveal
                  key={`mobile-pro-${itemIndex}-${item}`}
                  delay={Math.min(itemIndex * 0.04, 0.28)}
                  className="flex items-start gap-2 px-5 py-4 font-editorial text-base leading-7 text-[#24313d]"
                >
                  <span className="font-bold text-[#1a4d2e]">+</span>
                  <span>{item}</span>
                </EditorialReveal>
              ))}
            </div>
            <div className="border-y border-[#ff6b35]/15 bg-[#fff3ee] px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[#d94b21]">
              <XCircle className="mb-1 h-4 w-4" />
              Pontos de atenção
            </div>
            <div className="divide-y divide-[#ff6b35]/10 bg-[#fffaf7]">
              {consItems.map((item, itemIndex) => (
                <EditorialReveal
                  key={`mobile-con-${itemIndex}-${item}`}
                  delay={Math.min(itemIndex * 0.04, 0.28)}
                  className="flex items-start gap-2 px-5 py-4 font-editorial text-base leading-7 text-[#24313d]"
                >
                  <span className="font-bold text-[#ff6b35]">−</span>
                  <span>{item}</span>
                </EditorialReveal>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="grid grid-cols-2">
              <div className="border-b border-r border-[#1a4d2e]/10 bg-[#eef7f1] px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[#1a4d2e]">
                <CheckCircle2 className="mb-1 inline h-4 w-4" /> Pontos fortes
              </div>
              <div className="border-b border-[#ff6b35]/15 bg-[#fff3ee] px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[#d94b21]">
                <XCircle className="mb-1 inline h-4 w-4" /> Pontos de atenção
              </div>
            </div>
            <div className="divide-y divide-[#1a4d2e]/10">
              {rows.map((row, rowIndex) => (
                <EditorialReveal
                  key={`pros-cons-row-${rowIndex}`}
                  delay={Math.min(rowIndex * 0.04, 0.28)}
                  className="grid md:grid-cols-2"
                >
                  <div className="flex min-h-14 items-start gap-2 px-5 py-4 font-editorial text-base leading-7 text-[#24313d] md:border-r md:border-[#1a4d2e]/10">
                    {row.pro ? (
                      <>
                        <span className="font-bold text-[#1a4d2e]">+</span>
                        <span>{row.pro}</span>
                      </>
                    ) : (
                      <span className="text-[#24313d]/35">—</span>
                    )}
                  </div>
                  <div className="flex min-h-14 items-start gap-2 bg-[#fffaf7] px-5 py-4 font-editorial text-base leading-7 text-[#24313d]">
                    {row.con ? (
                      <>
                        <span className="font-bold text-[#ff6b35]">−</span>
                        <span>{row.con}</span>
                      </>
                    ) : (
                      <span className="text-[#24313d]/35">—</span>
                    )}
                  </div>
                </EditorialReveal>
              ))}
            </div>
          </div>
        </div>
      )}
    </EditorialReveal>
  );
}
