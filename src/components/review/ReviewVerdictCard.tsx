import { CheckCircle2, Star, XCircle } from 'lucide-react';
import { resolveReviewLocale } from '@/lib/content/review-i18n';
import type { Review, ReviewKind } from '@/lib/content';
import { getArticleCopy } from './articleCopy';

export interface ReviewVerdictCardProps {
  review: Review;
  kind: ReviewKind;
}

function StarRating({ rating, label }: { rating: number; label: string }): React.ReactElement {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1" aria-label={label} role="img">
      {Array.from({ length: 5 }).map((_, index) => {
        const starNum = index + 1;
        const isFilled = starNum <= fullStars;
        const isHalf = !isFilled && starNum === fullStars + 1 && hasHalf;
        return (
          <Star
            key={starNum}
            className={`h-5 w-5 ${
              isFilled
                ? 'fill-amarelo-cupom text-amarelo-cupom'
                : isHalf
                  ? 'fill-amarelo-cupom/50 text-amarelo-cupom'
                  : 'text-amarelo-cupom/40'
            }`}
          />
        );
      })}
    </div>
  );
}

// Prós e contras são duas listas independentes, cada uma só com os itens dela: lado a lado no computador, uma
// embaixo da outra no celular.
function ProsConsList({ list, title, items }: { list: 'pros' | 'contras'; title: string; items: string[] }) {
  const pros = list === 'pros';
  const Icon = pros ? CheckCircle2 : XCircle;
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-marinho bg-white">
      <p
        className={`flex items-center gap-2 border-b-2 border-marinho px-5 py-3 text-xs font-extrabold tracking-[0.14em] uppercase ${
          pros ? 'bg-verde-claro text-verde-escuro' : 'bg-laranja/20 text-marinho'
        }`}
      >
        <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
        {title}
      </p>
      <ul data-lista={list} className="divide-y divide-marinho/15">
        {items.map((item, index) => (
          <li key={`${index}-${item}`} className="flex items-start gap-2 px-5 py-3 font-editorial text-base leading-7 text-marinho">
            <span aria-hidden="true" className={`font-extrabold ${pros ? 'text-verde-escuro' : 'text-marinho-suave'}`}>
              {pros ? '+' : '−'}
            </span>
            <span className="min-w-0">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ReviewVerdictCard({ review, kind }: ReviewVerdictCardProps): React.ReactElement | null {
  if (kind !== 'produto') {
    return null;
  }

  const locale = resolveReviewLocale(review.locale);
  const copy = getArticleCopy(locale);
  const hasVerdict = Boolean(review.verdict?.stars);
  const hasRating = typeof review.rating === 'number';
  const stars = review.verdict?.stars ?? review.rating ?? 0;
  const summary = review.verdict?.summary || review.description;
  // Em português o card sempre mostrou o valor do JSON como está ("com ressalvas" em minúsculas).
  const recommendation = review.verdict?.recommendation;
  const recommendationLabel = !recommendation
    ? copy.rated
    : locale === 'pt' && recommendation !== 'recomendo'
      ? recommendation
      : copy.recommendation[recommendation];
  const showSeal = review.verdict?.recommendation === 'recomendo' || (!review.verdict && hasRating && stars >= 4);
  const prosItems = review.pros || [];
  const consItems = review.cons || [];

  if (!hasVerdict && !hasRating && prosItems.length === 0 && consItems.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {(hasVerdict || hasRating) && (
        <div className="relative overflow-hidden rounded-2xl border-2 border-marinho bg-white text-marinho">
          {showSeal && (
            <span className="absolute top-3 right-3 z-10 max-w-[150px] -rotate-3 rounded-full border-2 border-marinho bg-amarelo-cupom px-3 py-1 text-center text-xs leading-tight font-extrabold print:hidden sm:top-4 sm:right-4 sm:max-w-none">
              {copy.approvedSeal}
            </span>
          )}

          <div className="grid md:grid-cols-[190px_1fr]">
            <div className="flex flex-col justify-center bg-marinho p-6 text-white">
              <StarRating rating={stars} label={copy.ratingLabel(stars.toFixed(1))} />
              <p className="mt-3 text-[11px] font-extrabold tracking-[0.16em] text-white/70 uppercase">{copy.scoreTitle}</p>
              <span className="mt-3 w-fit rounded-md bg-white/15 px-3 py-1.5 text-xs font-extrabold">{recommendationLabel}</span>
            </div>

            <div className="p-6 md:p-8">
              <p className="mb-3 text-[11px] font-extrabold tracking-[0.16em] text-marinho-suave uppercase">{copy.verdictHeading}</p>
              <p className="font-editorial text-lg leading-relaxed italic">&quot;{summary}&quot;</p>
              {review.cta?.text && <p className="mt-4 text-sm font-extrabold">{review.cta.text}</p>}
            </div>
          </div>
        </div>
      )}

      {(prosItems.length > 0 || consItems.length > 0) && (
        <div id="pros-e-contras" className="grid scroll-mt-24 gap-4 md:grid-cols-2 md:items-start">
          {prosItems.length > 0 && <ProsConsList list="pros" title={copy.strengths} items={prosItems} />}
          {consItems.length > 0 && <ProsConsList list="contras" title={copy.cautions} items={consItems} />}
        </div>
      )}
    </div>
  );
}
