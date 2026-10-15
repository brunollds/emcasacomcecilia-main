'use client';

import { ArrowRight, Check, Copy, ExternalLink, Star } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { CouponStoreLink } from '@/components/CouponComponents';
import { CopyCodeButton } from '@/components/coupons/CouponActions';
import { FOCUS_RING } from '@/components/ui/focusRing';
import type { ArticleStoreBlock } from '@/lib/articleStore';
import { resolveReviewLocale } from '@/lib/content/review-i18n';
import type { CouponCodeKind } from '@/lib/couponsData';
import type { Locale } from '@/lib/i18n/locales';
import { ArticleCouponCutout } from './article/ArticleCouponCutout';
import { getArticleCopy } from './articleCopy';
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
  // Loja ativa do artigo: a lateral traz o recorte compacto, o mesmo do topo.
  storeBlock?: ArticleStoreBlock | null;
  storeLabel?: string;
  sponsored?: boolean;
}

export type ResolvedRelatedArticle = NonNullable<Review['relatedArticles']>[number] & { href: string };

const BOX = 'rounded-2xl border-2 border-marinho bg-white p-4';

function BoxTitle({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <p className="mb-2.5 font-condensada text-[28px] leading-none font-black font-stretch-extra-condensed">
      <span className="marca-texto">{children}</span>
    </p>
  );
}

function StarRating({ rating, label }: { rating: number; label: string }): React.ReactElement {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-0.5" aria-label={label} role="img">
      {Array.from({ length: 5 }).map((_, index) => {
        const starNum = index + 1;
        const isFilled = starNum <= fullStars;
        const isHalf = !isFilled && starNum === fullStars + 1 && hasHalf;
        return (
          <Star
            key={starNum}
            className={`h-4 w-4 ${isFilled ? 'fill-amarelo-cupom' : isHalf ? 'fill-amarelo-cupom/50' : 'text-marinho/30'}`}
          />
        );
      })}
    </div>
  );
}

// Artigo sem loja ativa (loja pausada ou fora de /cupons): o código e o link do artigo, sem o recorte.
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
    <div className={`${BOX} space-y-3`}>
      {/* A frase de baixo troca junto com o botão, que marca a cópia em data-copied. */}
      {coupon && (
        <div className="group/codigo space-y-2">
          {codeKind === 'referral' && (
            <p className="text-[13px] font-bold tracking-[0.04em] text-marinho-suave uppercase">
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
            className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] border-2 border-dashed border-marinho bg-amarelo-cupom px-3 font-codigo text-lg font-extrabold break-all text-balance ${FOCUS_RING} data-[copied=true]:border-solid data-[copied=true]:border-verde-escuro data-[copied=true]:bg-verde-claro data-[copied=true]:text-verde-escuro`}
            copiedChildren={
              <>
                {coupon}
                <Check aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
              </>
            }
          >
            {coupon}
            <Copy aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
          </CopyCodeButton>
          <p className="text-[13px] leading-[18px] font-semibold text-marinho-suave">
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
          className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] border-2 border-marinho bg-laranja px-4 text-center text-[15px] font-extrabold text-marinho transition-colors hover:bg-laranja/85 ${FOCUS_RING}`}
        >
          {effectiveCta.label}
          <ExternalLink aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
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
  storeBlock = null,
  storeLabel = '',
  sponsored = false,
}: ReviewSidebarProps): React.ReactElement | null {
  // Unified order for all kinds
  const stars = kind === 'produto' ? review.verdict?.stars ?? review.rating : undefined;
  const recommendation = kind === 'produto' ? review.verdict?.recommendation : undefined;
  const hasConversionContent = Boolean(storeBlock || review.coupon || effectiveCta?.url);
  const hasToc = tocItems.length > 0;
  const hasRelated = relatedArticleLinks.length > 0;
  const { activeIndex } = useReadingPosition(tocItems.map((item) => item.id));
  const tocListRef = useRef<HTMLUListElement>(null);
  const locale = resolveReviewLocale(review.locale);
  const copy = getSidebarCopy(locale);
  const article = getArticleCopy(locale);

  // O sumário longo rola dentro da própria lista, para o recorte logo abaixo caber na tela. A seção atual fica à
  // vista rolando só a lista, como a gaveta do celular: a página não se mexe.
  useEffect(() => {
    const list = tocListRef.current;
    const current = list?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!list || !current) return;
    const listBox = list.getBoundingClientRect();
    const itemBox = current.getBoundingClientRect();
    const offset = itemBox.top < listBox.top ? itemBox.top - listBox.top - 4 : itemBox.bottom > listBox.bottom ? itemBox.bottom - listBox.bottom + 4 : 0;
    if (!offset) return;
    const smooth = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    list.scrollTo({ top: list.scrollTop + offset, behavior: smooth ? 'smooth' : 'auto' });
  }, [activeIndex]);

  if (typeof stars !== 'number' && !hasConversionContent && !hasToc && !hasRelated) {
    return null;
  }

  return (
    <div className="space-y-5 text-marinho">
      {/* 1. Table of Contents (TOC first) */}
      {hasToc && (
        <nav aria-label={copy.sectionsNav} className={BOX}>
          <BoxTitle>{copy.tocTitle}</BoxTitle>
          {/* O px-1.5 dá lugar ao anel de foco dentro da rolagem. */}
          <ul ref={tocListRef} className="-mx-1.5 max-h-[min(40dvh,22rem)] space-y-1 overflow-y-auto overscroll-contain px-1.5 py-0.5">
            {tocItems.map((item, index) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={index === activeIndex ? 'location' : undefined}
                  className={`block rounded-[10px] border-2 px-3 py-2 text-sm leading-5 transition-colors ${FOCUS_RING} ${
                    index === activeIndex
                      ? 'border-marinho bg-amarelo-cupom font-extrabold'
                      : `border-transparent font-semibold hover:bg-amarelo-cupom/35 ${index < activeIndex ? 'text-marinho-suave' : ''}`
                  }`}
                >
                  {item.heading}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* 2. O código: o recorte compacto da loja ativa; sem ela, o código e o link do artigo. */}
      {storeBlock ? (
        <div className="pt-4">
          <ArticleCouponCutout
            variant="sidebar"
            block={storeBlock}
            locale={locale}
            reviewSlug={review.slug}
            storeLabel={storeLabel}
            sponsored={sponsored}
          />
        </div>
      ) : (
        hasConversionContent && (
          <SidebarConversionCards
            coupon={review.coupon}
            effectiveCta={effectiveCta}
            reviewSlug={review.slug}
            affiliate={review.affiliate}
            locale={locale}
            codeKind={codeKind}
            codeBrand={codeBrand}
          />
        )
      )}

      {/* 3. Verdict card (only produto with stars) */}
      {typeof stars === 'number' && (
        <div className={BOX}>
          <BoxTitle>{article.verdictTitle}</BoxTitle>
          <div className="mb-1.5 flex items-center gap-2">
            <StarRating rating={stars} label={article.ratingLabel(stars.toFixed(1))} />
            <span className="text-sm font-extrabold">{stars.toFixed(1)}</span>
          </div>
          {recommendation && <p className="text-sm font-extrabold">{article.recommendation[recommendation]}</p>}
        </div>
      )}

      {/* 4. Related articles block */}
      {hasRelated && (
        <div className={BOX}>
          <BoxTitle>{copy.relatedTitle}</BoxTitle>
          <ul className="space-y-1">
            {relatedArticleLinks.map((article) => (
              <li key={article.slug}>
                <Link
                  href={article.href}
                  className={`group flex items-start gap-2 py-1 text-sm leading-5 font-bold underline underline-offset-[3px] hover:text-marinho-suave ${FOCUS_RING}`}
                >
                  <ArrowRight
                    aria-hidden="true"
                    size={14}
                    className="mt-[3px] shrink-0 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
                  />
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
