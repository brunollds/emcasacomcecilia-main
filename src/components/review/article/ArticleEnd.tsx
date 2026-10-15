import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { CouponStoreLink } from '@/components/CouponComponents';
import { ShareBar } from '@/components/shared/ShareBar';
import { EditorialReveal, SectionHeadingReveal, SectionLinkButton } from '@/components/editorial';
import type { Review, ReviewViewModel } from '@/lib/content';
import { getReviewCanonicalPathname } from '@/lib/content/review-i18n';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { ReviewGallerySection } from '../ReviewGallerySection';
import { ReviewVerdictCard } from '../ReviewVerdictCard';
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
}

// Do vídeo ao compartilhar: o fim da coluna do texto, antes da sidebar. A galeria vem antes do veredito.
export function ArticleEnd({
  review, kind, copy, ui, couponCopyLocale, youtubeEmbedUrl, videoPageUrl, showVerdict, hasCta, effectiveCta, reviewImage,
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

export interface ArticleAfterProps {
  ui: TemplateUi;
  relatedReviews: Review[];
  reviewHubHref: string;
}

// Artigos relacionados, depois da grade do texto com a sidebar.
export function ArticleAfter({ ui, relatedReviews, reviewHubHref }: ArticleAfterProps): React.ReactElement {
  return (
    <>
    {/* Artigos relacionados */}
    {relatedReviews.length > 0 && (
      <section className="mt-12 print:hidden">
        <div className="mb-6 flex items-end justify-between gap-4">
          <SectionHeadingReveal
            as="h2"
            underlineColor="#ff6b35"
            className="font-editorial text-2xl font-bold text-[#1a4d2e]"
          >
            {ui.relatedArticles}
          </SectionHeadingReveal>
          <Link
            href={reviewHubHref}
            className="hidden items-center gap-2 text-sm font-bold text-[#1a4d2e] transition-colors hover:text-[#ff6b35] md:inline-flex"
          >
            {ui.viewAll}
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {relatedReviews.map((item) => (
            <Link
              key={item.id}
              href={getReviewCanonicalPathname(item)}
              className="group relative min-h-[220px] overflow-hidden rounded-[1.5rem] border border-[#0f1419]/8 bg-[#0f1d3a] p-4 transition-all hover:-translate-y-1 hover:border-[#ff6b35]/30 hover:shadow-md"
            >
              {item.image ? (
                <Image
                  src={resolveMediaUrl(item.image)}
                  alt={item.imageAlt || item.title}
                  fill
                  className={`transition-transform duration-700 group-hover:scale-105 ${
                    item.rating ? 'object-contain bg-white p-5' : 'object-cover'
                  }`}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a4d2e] to-[#0f1d3a]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
              <div className="relative z-10 flex h-full min-h-[188px] flex-col justify-end">
                <p className="w-fit rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0f1419]">
                  {item.type}
                </p>
                <h3 className="mt-3 font-heading text-lg font-bold leading-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/75">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    )}
    </>
  );
}
