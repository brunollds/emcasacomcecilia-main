import { CheckCircle2 } from 'lucide-react';
import { RichChip } from '@/components/editorial';
import type { Review, ReviewKind } from '@/lib/content';

export interface ReviewHighlightChipsProps {
  review: Review;
  kind: ReviewKind;
}

export function ReviewHighlightChips({
  review,
  kind,
}: ReviewHighlightChipsProps): React.ReactElement | null {
  // Only render for product reviews
  if (kind !== 'produto') {
    return null;
  }

  const chips: React.ReactElement[] = [];

  // Rating chip
  const stars = review.verdict?.stars ?? review.rating;
  if (typeof stars === 'number') {
    chips.push(
      <RichChip key="rating" variant="destaque">
        ★ {stars.toFixed(1)}
      </RichChip>
    );
  }

  // Recommendation chip
  const recommendation = review.verdict?.recommendation;
  if (recommendation === 'recomendo') {
    chips.push(
      <RichChip key="recommendation" icon={<CheckCircle2 size={14} />} variant="destaque">
        Vale a pena
      </RichChip>
    );
  } else if (recommendation === 'com ressalvas') {
    chips.push(
      <RichChip key="recommendation" variant="alerta">
        Com ressalvas
      </RichChip>
    );
  }

  // Coupon chip
  if (review.coupon) {
    chips.push(
      <RichChip key="coupon" variant="neutral">
        Cupom {review.coupon}
      </RichChip>
    );
  }

  // Return nothing if no chips
  if (chips.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips}
    </div>
  );
}
