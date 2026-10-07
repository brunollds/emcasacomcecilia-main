import { CheckCircle2 } from 'lucide-react';
import { RichChip, EditorialReveal } from '@/components/editorial';
import { resolveReviewLocale } from '@/lib/content/review-i18n';
import type { Review, ReviewKind } from '@/lib/content';
import type { CouponCodeKind } from '@/lib/couponsData';
import { getArticleCopy } from './articleCopy';

export interface ReviewHighlightChipsProps {
  review: Review;
  kind: ReviewKind;
  // Tipo e loja do código do artigo, quando ele é o da loja em /cupons.
  codeKind?: CouponCodeKind;
  codeBrand?: string;
}

export function ReviewHighlightChips({
  review,
  kind,
  codeKind,
  codeBrand,
}: ReviewHighlightChipsProps): React.ReactElement | null {
  // Only render for product reviews
  if (kind !== 'produto') {
    return null;
  }

  const copy = getArticleCopy(resolveReviewLocale(review.locale));
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
        {copy.worthIt}
      </RichChip>
    );
  } else if (recommendation === 'com ressalvas') {
    chips.push(
      <RichChip key="recommendation" variant="alerta">
        {copy.recommendation['com ressalvas']}
      </RichChip>
    );
  }

  // Coupon chip
  if (review.coupon) {
    chips.push(
      <RichChip key="coupon" variant="neutral">
        {codeKind === 'reward'
          ? copy.codeChip.reward(review.coupon)
          : codeKind === 'referral' && codeBrand
            ? copy.codeChip.referral(review.coupon, codeBrand)
            : copy.codeChip.coupon(review.coupon)}
      </RichChip>
    );
  }

  // Return nothing if no chips
  if (chips.length === 0) {
    return null;
  }

  return (
    <EditorialReveal as="div" delay={0.22} className="mb-6">
      <div className="flex flex-wrap items-center gap-2">
        {chips}
      </div>
    </EditorialReveal>
  );
}
