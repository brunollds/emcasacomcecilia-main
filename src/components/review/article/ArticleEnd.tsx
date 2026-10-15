import Link from 'next/link';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { ShareBar } from '@/components/shared/ShareBar';
import { EditorialReveal, SectionHeadingReveal, SectionLinkButton } from '@/components/editorial';
import { FOCUS_RING } from '@/components/ui/focusRing';
import type { ArticleStoreBlock as StoreBlock } from '@/lib/articleStore';
import type { Review, ReviewViewModel } from '@/lib/content';
import { getReviewCanonicalPathname } from '@/lib/content/review-i18n';
import type { ShelfCardArticle } from '@/lib/reviewsShelf';
import { ReviewGallerySection } from '../ReviewGallerySection';
import { ReviewVerdictCard } from '../ReviewVerdictCard';
import type { ArticleCopy, TemplateUi } from '../articleCopy';
import type { CouponCopyLocale } from '../couponCopyLocale';
import { ArticleAffiliateBlock, type ArticleAffiliateCta } from './ArticleAffiliateBlock';
import { ArticleAuthorBox } from './ArticleAuthorBox';
import { ArticleRelated } from './ArticleRelated';
import { ArticleStoreBlock } from './ArticleStoreBlock';

export interface ArticleEndProps {
  review: Review;
  kind: ReviewViewModel['kind'];
  copy: ArticleCopy;
  ui: TemplateUi;
  couponCopyLocale: CouponCopyLocale;
  youtubeEmbedUrl: string | null;
  videoPageUrl: string | null;
  showVerdict: boolean;
  // O bloco da loja, com o mesmo link e a mesma marcação de patrocínio do recorte do topo; null sem loja ativa.
  storeBlock: StoreBlock | null;
  // Sem loja ativa, o link de afiliado do artigo (cta) ocupa o lugar do bloco da loja; null sem cta.
  affiliateCta: ArticleAffiliateCta | null;
  storeLabel: string;
  reviewImage: string;
  relatedArticles: ShelfCardArticle[];
  relatedAllHref: string;
}

// O fim da coluna do texto, ao lado da sidebar: vídeo, galeria, veredito, bloco da loja, a Cecília, relacionados e
// compartilhar.
export function ArticleEnd({
  review, kind, copy, ui, couponCopyLocale, youtubeEmbedUrl, videoPageUrl, showVerdict, storeBlock, affiliateCta, storeLabel,
  reviewImage, relatedArticles, relatedAllHref,
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

      {storeBlock ? (
        <ArticleStoreBlock
          block={storeBlock}
          locale={couponCopyLocale}
          copy={copy}
          reviewSlug={review.slug}
          storeLabel={storeLabel}
        />
      ) : (
        affiliateCta && <ArticleAffiliateBlock cta={affiliateCta} reviewSlug={review.slug} />
      )}

      <ArticleAuthorBox copy={copy} locale={couponCopyLocale} />

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
