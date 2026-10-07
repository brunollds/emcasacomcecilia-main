'use client';

import { ArrowRight, Check, Copy, ExternalLink, Star } from 'lucide-react';
import Link from 'next/link';
import { CouponStoreLink } from '@/components/CouponComponents';
import { CopyCodeButton } from '@/components/coupons/CouponActions';
import { resolveReviewLocale } from '@/lib/content/review-i18n';
import type { CouponCodeKind } from '@/lib/couponsData';
import type { Locale } from '@/lib/i18n/locales';
import { getCouponCopyLabels } from './couponCopyLocale';
import { getCodeHints, getCodeTitle, getSidebarCopy } from './sidebarCopy';
import { useReadingPosition, type TocItem } from './useReadingPosition';
import type { Review, ReviewKind } from '@/lib/content';

interface ReviewSidebarProps {
  review: Review;
  kind: ReviewKind;
  tocItems: TocItem[];
  effectiveCta?: { url: string; label: string; text?: string; sponsored?: boolean } | null;
  relatedArticleLinks?: ResolvedRelatedArticle[];
  // Tipo e loja do código do artigo, quando ele é o da loja em /cupons.
  codeKind?: CouponCodeKind;
  codeBrand?: string;
}

export type ResolvedRelatedArticle = NonNullable<Review['relatedArticles']>[number] & { href: string };

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
  reviewSlug,
  affiliate,
  locale,
  codeKind,
  codeBrand,
}: {
  coupon?: string;
  effectiveCta?: { url: string; label: string; text?: string; sponsored?: boolean } | null;
  reviewSlug: string;
  affiliate?: string;
  locale: Locale;
  codeKind?: CouponCodeKind;
  codeBrand?: string;
}): React.ReactElement | null {
  if (!coupon && !effectiveCta?.url) return null;

  const copy = getSidebarCopy(locale);
  const hints = getCodeHints(copy, codeKind, codeBrand);

  return (
    <div className="space-y-3">
      {/* A frase de baixo troca junto com o botão, que marca a cópia em data-copied. */}
      {coupon && (
        <div className="group/codigo space-y-2">
          {codeKind === 'referral' && (
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1a4d2e]/60">
              {getCodeTitle(copy, codeKind, codeBrand)}
            </p>
          )}
          <CopyCodeButton
            code={coupon}
            brand={affiliate}
            contentSlug={reviewSlug}
            placement="review_sidebar"
            ariaLabel={getCouponCopyLabels(locale).copyCoupon(coupon)}
            copiedStatus={copy.copiedStatus(coupon)}
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full border-2 border-dashed border-[#ff6b35]/60 bg-gradient-to-b from-[#fef9f3] to-[#fff4bf] px-4 py-2 font-mono text-base font-black tracking-[0.08em] text-[#1a4d2e] transition-all hover:shadow-md motion-safe:hover:-translate-y-px motion-safe:hover:shadow-md data-[copied=true]:border-solid data-[copied=true]:border-[#1a7f37] data-[copied=true]:bg-[#f0fdf4] data-[copied=true]:bg-none data-[copied=true]:text-[#1a7f37]"
            copiedChildren={
              <>
                {coupon}
                <Check size={18} />
              </>
            }
          >
            {coupon}
            <Copy size={18} />
          </CopyCodeButton>
          <p className="text-xs leading-relaxed text-[#4a5568]">
            <span className="group-has-[[data-copied=true]]/codigo:hidden">{hints.copy}</span>
            <span className="hidden group-has-[[data-copied=true]]/codigo:inline">{hints.copied}</span>
          </p>
        </div>
      )}

      {effectiveCta?.url && effectiveCta?.label && (
        <CouponStoreLink
          href={effectiveCta.url}
          couponCode={coupon}
          brand={affiliate}
          contentSlug={reviewSlug}
          linkLabel={effectiveCta.label}
          sponsored={effectiveCta.sponsored}
          placement="review_sidebar"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#ff6b35] px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#e55a26] hover:shadow-md"
        >
          {effectiveCta.label}
          <ExternalLink size={16} />
        </CouponStoreLink>
      )}
    </div>
  );
}

export function ReviewSidebar({
  review,
  kind,
  tocItems,
  effectiveCta,
  relatedArticleLinks = [],
  codeKind,
  codeBrand,
}: ReviewSidebarProps): React.ReactElement | null {
  // Unified order for all kinds
  const stars = kind === 'produto' ? review.verdict?.stars ?? review.rating : undefined;
  const recommendation = kind === 'produto' ? review.verdict?.recommendation : undefined;
  const hasConversionContent = Boolean(review.coupon || effectiveCta?.url);
  const hasToc = tocItems.length > 0;
  const hasRelated = relatedArticleLinks.length > 0;
  const { activeIndex } = useReadingPosition(tocItems.map((item) => item.id));
  const locale = resolveReviewLocale(review.locale);
  const copy = getSidebarCopy(locale);

  if (typeof stars !== 'number' && !hasConversionContent && !hasToc && !hasRelated) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* 1. Table of Contents (TOC first) */}
      {hasToc && (
        <nav aria-label={copy.sectionsNav} className="rounded-xl border border-[#1a4d2e]/10 bg-white p-5 shadow-soft">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#1a4d2e]/60">
            {copy.tocTitle}
          </p>
          <ul className="space-y-1">
            {tocItems.map((item, index) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={index === activeIndex ? 'location' : undefined}
                  className={
                    index === activeIndex
                      ? 'block rounded-lg bg-[#1a4d2e] px-3 py-2 text-sm font-semibold text-white transition-colors'
                      : 'block rounded-lg px-3 py-2 text-sm text-[#4a5568] transition-colors hover:bg-[#1a4d2e]/5 hover:text-[#1a4d2e]'
                  }
                >
                  {item.heading}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* 2. Conversion cards (coupon + CTA) */}
      {hasConversionContent && (
        <SidebarConversionCards
          coupon={review.coupon}
          effectiveCta={effectiveCta}
          reviewSlug={review.slug}
          affiliate={review.affiliate}
          locale={locale}
          codeKind={codeKind}
          codeBrand={codeBrand}
        />
      )}

      {/* 3. Verdict card (only produto with stars) */}
      {typeof stars === 'number' && (
        <div className="rounded-xl border border-[#1a4d2e]/10 bg-white p-5 shadow-soft">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#1a4d2e]/60">Veredito da Cecília</p>
          <div className="mb-2 flex items-center gap-2">
            <StarRating rating={stars} />
            <span className="text-sm font-bold text-[#1a4d2e]">{stars.toFixed(1)}</span>
          </div>
          {recommendation && (
            <p className="text-sm font-bold text-[#1a4d2e]">
              {recommendation === 'recomendo' ? '✓ Recomendo' : recommendation === 'com ressalvas' ? 'Com ressalvas' : 'Não recomendo'}
            </p>
          )}
        </div>
      )}

      {/* 4. Related articles block */}
      {hasRelated && (
        <div className="rounded-xl border border-[#1a4d2e]/10 bg-white p-5 shadow-soft">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#1a4d2e]/60">{copy.relatedTitle}</p>
          <ul className="space-y-2">
            {relatedArticleLinks.map((article) => (
              <li key={article.slug}>
                <Link
                  href={article.href}
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
