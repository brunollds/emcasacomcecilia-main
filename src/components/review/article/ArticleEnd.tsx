import Link from 'next/link';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { CouponStoreLink } from '@/components/CouponComponents';
import { ShareBar } from '@/components/shared/ShareBar';
import { EditorialReveal, SectionHeadingReveal, SectionLinkButton } from '@/components/editorial';
import type { Review, ReviewViewModel } from '@/lib/content';
import type { ShelfCardArticle } from '@/lib/reviewsShelf';
import { getReviewCanonicalPathname } from '@/lib/content/review-i18n';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { ReviewGallerySection } from '../ReviewGallerySection';
import { ReviewVerdictCard } from '../ReviewVerdictCard';
import { ArticleRelated } from './ArticleRelated';
import type { ArticleCopy, TemplateUi } from '../articleCopy';
import type { CouponCopyLocale } from '../couponCopyLocale';

export interface ArticleEndProps {
  review: Review;
  kind: ReviewViewModel['kind'];
  copy: ArticleCopy;
  ui: TemplateUi;
  couponCopyLocale: CouponCopyLocale;
  youtubeEmbedUrl: string | null;
  videoPageUrl: string | null;
  showVerdict: boolean;
  hasCta: boolean;
  effectiveCta: { url: string; label: string; text?: string; sponsored?: boolean } | null;
  reviewImage: string;
  relatedArticles: ShelfCardArticle[];
  relatedAllHref: string;
}

// Do vídeo ao compartilhar: o fim da coluna do texto, antes da sidebar. A galeria vem antes do veredito.
export function ArticleEnd({
  review, kind, copy, ui, couponCopyLocale, youtubeEmbedUrl, videoPageUrl, showVerdict, hasCta, effectiveCta, reviewImage,
  relatedArticles, relatedAllHref,
}: ArticleEndProps): React.ReactElement {
  // O vídeo do YouTube que o bloco de vídeo já mostra não se repete na galeria.
  const galleryVideos = review.youtubeUrl && !youtubeEmbedUrl ? [{ url: review.youtubeUrl, title: review.title }] : [];

  return (
    <>
      {/* Vídeo */}
      {youtubeEmbedUrl && (
        <section className="mt-12 mb-10 text-marinho print:hidden">
          <SectionHeadingReveal as="h2" variant="d2" className="mb-5">
            {copy.relatedVideo}
          </SectionHeadingReveal>
          <div className="aspect-video overflow-hidden rounded-2xl border-2 border-marinho bg-creme">
            <iframe
              src={youtubeEmbedUrl}
              title={review.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-marinho-suave">
            <PlayCircle size={16} aria-hidden="true" />
            {copy.watchOnYoutube}
          </p>
          {videoPageUrl && (
            <Link
              href={videoPageUrl}
              className={`mt-2 inline-flex items-center gap-2 text-sm font-extrabold underline underline-offset-[3px] hover:text-marinho-suave ${FOCUS_RING}`}
            >
              {copy.openVideoPage} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}
        </section>
      )}

      <ReviewGallerySection
        images={review.gallery || []}
        videos={galleryVideos}
        title={review.title}
        locale={couponCopyLocale}
      />

      {/* CTA final */}
      {hasCta && (
        <EditorialReveal as="section" className="relative mt-12 mb-10 overflow-hidden rounded-2xl bg-[#1a4d2e] p-6 text-white shadow-medium md:p-8 print:hidden">
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#ff6b35]/15"
            aria-hidden="true"
          />
          <div className="relative flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#ff6b35]">
                {ui.interested}
              </p>
              <p className="max-w-2xl font-editorial text-lg italic leading-relaxed">
                {effectiveCta?.text}
              </p>
            </div>
            <CouponStoreLink
              href={effectiveCta?.url}
              couponCode={review.coupon}
              brand={review.affiliate}
              contentSlug={review.slug}
              linkLabel={effectiveCta?.label}
              sponsored={effectiveCta?.sponsored}
              placement="review_final_cta"
              className="inline-flex flex-shrink-0 items-center rounded-full bg-[#ff6b35] px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:bg-[#e55a26] hover:shadow-lg"
            >
              {effectiveCta?.label}
              <ArrowRight size={16} className="ml-2" />
            </CouponStoreLink>
          </div>
        </EditorialReveal>
      )}

      {/* Veredito no final do corpo */}
      {showVerdict && (
        <section id="veredito" className="mb-10 scroll-mt-24 text-marinho">
          <div className="mb-5 flex items-start gap-2">
            <SectionHeadingReveal as="h2" variant="d2">
              {ui.verdictToc}
            </SectionHeadingReveal>
            <div className="pt-1">
              <SectionLinkButton anchorId="veredito" label={copy.finalVerdictLink} copiedLabel={copy.sectionLinkCopied} variant="d2" />
            </div>
          </div>
          <ReviewVerdictCard review={review} kind={kind} />
        </section>
      )}

      <ArticleRelated
        articles={relatedArticles}
        title={ui.relatedArticles}
        viewAllLabel={ui.viewAll}
        viewAllHref={relatedAllHref}
      />

      {/* Share */}
      <EditorialReveal as="section" className="mb-10">
        <ShareBar
          url={`https://emcasacomcecilia.com${getReviewCanonicalPathname(review)}`}
          title={review.title}
          contentType="review"
          locale={couponCopyLocale}
          imageUrl={
            reviewImage.startsWith('http')
              ? reviewImage
              : `https://emcasacomcecilia.com${reviewImage}`
          }
        />
      </EditorialReveal>
    </>
  );
}
