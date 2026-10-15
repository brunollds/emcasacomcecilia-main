import { ArrowRight } from 'lucide-react';
import { CouponStoreLink } from '@/components/CouponComponents';
import { SectionLinkButton, SectionHeadingReveal, EditorialReveal, EditorialAmbientBackground } from '@/components/editorial';
import { asSentence } from '@/components/coupons/CouponBlocks';
import { generateSectionIds, type Review, type ReviewViewModel } from '@/lib/content';
import { getCouponBySlug, getStoreCodeKind } from '@/lib/couponsData';
import { serializeJsonLd } from '@/lib/jsonLd';
import { isLineAnchor } from '@/lib/pretext/lineAnchorCodec';
import { resolveReviewLocale } from '@/lib/content/review-i18n';
import type { Locale } from '@/lib/i18n/locales';
import { ReadingProgressBar } from './ReadingProgressBar';
import { ReviewContentSections } from './ReviewContentSections';
import { ReviewSidebar, type ResolvedRelatedArticle } from './ReviewSidebar';
import { ReviewMobileBottomBar } from './ReviewMobileBottomBar';
import { getArticleCopy, getEditorialNoteLabels, getTemplateUi } from './articleCopy';
import { getBodySections, HEADINGS_OUTSIDE_BODY } from './bodySections';
import { isStepHeading } from './couponCopyLocale';
import { GuideTimeline } from './GuideTimeline';
import { PullQuote } from './PullQuote';
import { ArticleHeader } from './article/ArticleHeader';
import { ArticleAfter, ArticleEnd } from './article/ArticleEnd';

export interface ReviewNotebookTemplateProps {
  review: Review;
  viewModel: ReviewViewModel;
  youtubeEmbedUrl: string | null;
  videoPageUrl: string | null;
  reviewImage: string;
  reviewImageAlt: string;
  // As páginas acima do artigo, da home do idioma em diante; a mesma lista do breadcrumbJsonLd.
  breadcrumbs: Array<{ name: string; href: string }>;
  breadcrumbJsonLd: Record<string, unknown>;
  jsonLd: Record<string, unknown>;
  faqJsonLd?: Record<string, unknown> | null;
  relatedReviews: Review[];
  relatedArticleLinks: ResolvedRelatedArticle[];
  languageLinks: Partial<Record<Locale, string>>;
}

function getBadgeColor(kind: ReviewViewModel['kind']) {
  if (kind === 'produto') return 'bg-[#1a4d2e] text-white';
  if (kind === 'guia') return 'bg-[#ff6b35] text-white';
  return 'bg-[#1a4d2e]/10 text-[#1a4d2e]';
}

function estimateReadTimeMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}


export function ReviewNotebookTemplate({
  review,
  viewModel,
  youtubeEmbedUrl,
  videoPageUrl,
  reviewImage,
  reviewImageAlt,
  breadcrumbs,
  breadcrumbJsonLd,
  jsonLd,
  faqJsonLd = null,
  relatedReviews,
  relatedArticleLinks,
  languageLinks,
}: ReviewNotebookTemplateProps): React.ReactElement {
  const couponCopyLocale = resolveReviewLocale(review.locale);
  // A lista de artigos do idioma é o último nível da trilha antes do artigo.
  const reviewHubHref = breadcrumbs[breadcrumbs.length - 1].href;
  const ui = getTemplateUi(couponCopyLocale);

  const { kind, plainTextBody } = viewModel;
  const copy = getArticleCopy(couponCopyLocale);
  const noteLabels = getEditorialNoteLabels(couponCopyLocale);
  // Um `reviewKind` fora do enum (a Mini Me 2.0 tem "product") sempre caiu no selo de editorial.
  const kindLabel = copy.kindLabel[kind] ?? copy.kindLabel.editorial;
  const badgeColor = getBadgeColor(kind);
  const speechText = [review.title, review.description, plainTextBody].filter(Boolean).join(' ');
  const readTime = estimateReadTimeMinutes(plainTextBody);

  const hasProductRating = kind === 'produto' && typeof review.rating === 'number';
  const verdictSection = review.contentSections?.find((section) => section.heading === 'Veredito');

  const sectionIds = generateSectionIds(review.contentSections || []);

  const bodySections = getBodySections(review.contentSections || [], kind);
  const tocItems = [...bodySections];

  // Add "Veredito final" to TOC if the verdict section will render
  const hasVerdictStars = Boolean(review.verdict?.stars);
  const hasRating = typeof review.rating === 'number';
  const hasProsOrCons = (review.pros?.length ?? 0) > 0 || (review.cons?.length ?? 0) > 0;
  const shouldRenderVerdict = kind === 'produto' && (hasVerdictStars || hasRating || hasProsOrCons);
  if (shouldRenderVerdict) {
    tocItems.push({ id: 'veredito', heading: ui.verdictToc });
  }

  const hasProductSpec = review.productSpec && review.productSpec.length > 0;
  const hasCommercialRelationship = Boolean(
    review.affiliate || (review.coupon && review.editorialNote)
  );
  const verdictLinkCta = verdictSection?.links?.[0];
  const effectiveCta = review.cta?.url && review.cta?.label
    ? {
        ...review.cta,
        sponsored: review.cta.sponsored ?? hasCommercialRelationship,
      }
    : verdictLinkCta
      ? {
          url: verdictLinkCta.href,
          label: verdictLinkCta.label,
          text: verdictSection?.paragraphs?.at(-1) || review.description,
          sponsored: verdictLinkCta.sponsored ?? hasCommercialRelationship,
        }
      : null;
  const hasCta = Boolean(effectiveCta?.url && effectiveCta?.label);
  const isPortraitHero = review.imageAspect === 'portrait';

  // Quando o artigo usa o código da loja em /cupons, o dock e a sidebar dizem, em qualquer idioma,
  // se ele é de recompensa (CECILIA010) ou de indicação (4CW5Y da SHEIN). Em português a gaveta do
  // celular também repete o desconto e a regra da loja, textos que só existem nessa língua.
  const store = review.affiliate ? getCouponBySlug(review.affiliate) : undefined;
  const codeKind = getStoreCodeKind(store, review.coupon);
  const codeBrand = codeKind ? store?.brand : undefined;
  const sameCodeStore = store?.offerMode === 'discount-code' && store.code === review.coupon ? store : undefined;
  const storeOffer =
    couponCopyLocale === 'pt' && sameCodeStore && !sameCodeStore.tiers?.length
      ? { discount: sameCodeStore.discount, note: asSentence(sameCodeStore.shortDescription), watermark: sameCodeStore.brandWatermark }
      : undefined;

  const stepSections = (review.contentSections || []).filter((s) => isStepHeading(s.heading));
  const firstStepIndex = (review.contentSections || []).findIndex((s) => isStepHeading(s.heading));

  const preStepSections = firstStepIndex !== -1
    ? (review.contentSections || []).slice(0, firstStepIndex).filter((s) => !isStepHeading(s.heading))
    : (review.contentSections || []).filter((s) => !isStepHeading(s.heading));

  const postStepSections = firstStepIndex !== -1
    ? (review.contentSections || []).slice(firstStepIndex).filter((s) => !isStepHeading(s.heading))
    : [];

  // A nota ancorada numa seção do corpo sai no título dela, e a de linha, na margem. As outras saem no
  // topo, inclusive a ancorada numa seção que o corpo não mostra (veredito, passo do guia). A âncora é
  // um id; o sectionIds é indexado pelo título.
  const notes = review.notes || [];
  const bodySectionIds = new Set(bodySections.map(({ id }) => id));
  const unanchoredNotes = notes.filter((note) => !note.anchor || (!bodySectionIds.has(note.anchor) && !isLineAnchor(note.anchor)));

  return (
    <>
      {/* No celular o progresso de leitura fica no dock do sumário. */}
      <div className="hidden lg:block">
        <ReadingProgressBar />
      </div>
      <EditorialAmbientBackground variant="review" className="review-page-bg min-h-screen pb-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
        {faqJsonLd && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }} />
        )}

        {/* Endereços e e-mails longos no texto quebram em vez de alargar a página no celular. */}
        <div className="mx-auto max-w-6xl px-4 py-6 wrap-break-word md:py-10">
          {/* Header editorial */}
          <ArticleHeader
            review={review}
            kind={kind}
            kindLabel={kindLabel}
            badgeColor={badgeColor}
            copy={copy}
            ui={ui}
            noteLabels={noteLabels}
            couponCopyLocale={couponCopyLocale}
            breadcrumbs={breadcrumbs}
            languageLinks={languageLinks}
            codeKind={codeKind}
            codeBrand={codeBrand}
            speechText={speechText}
            readTime={readTime}
            unanchoredNotes={unanchoredNotes}
            reviewImage={reviewImage}
            reviewImageAlt={reviewImageAlt}
            isPortraitHero={isPortraitHero}
            hasProductRating={hasProductRating}
            videoPageUrl={videoPageUrl}
            youtubeEmbedUrl={youtubeEmbedUrl}
          />

          {/* Layout principal + sidebar */}
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Conteúdo */}
            <div className="min-w-0 lg:col-span-8">
              {/* Pull quote editorial */}
              {review.pullQuote && (
                <div className="mb-10">
                  <PullQuote quote={review.pullQuote} />
                </div>
              )}

              {/* Ficha do produto em tabela */}
              {kind === 'produto' && hasProductSpec && (
                <EditorialReveal as="section" id="especificacoes" className="mb-10 scroll-mt-24">
                  <div className="flex items-start gap-2">
                    <details className="group flex-1 overflow-hidden rounded-2xl border border-[#1a4d2e]/10 bg-white shadow-soft" open>
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-editorial text-xl font-bold text-[#1a4d2e] transition-colors hover:bg-[#faf8f3] md:px-8">
                        <span>{copy.productSheet}</span>
                        <span className="text-sm font-sans font-bold uppercase tracking-[0.14em] text-[#ff6b35] group-open:hidden">
                          {copy.productSheetOpen}
                        </span>
                        <span className="hidden text-sm font-sans font-bold uppercase tracking-[0.14em] text-[#ff6b35] group-open:inline">
                          {copy.productSheetClose}
                        </span>
                      </summary>
                      <div className="border-t border-[#1a4d2e]/10 px-6 pb-6 md:px-8 md:pb-8">
                        <div className="mt-5 overflow-hidden rounded-xl border border-[#1a4d2e]/10">
                          <table className="w-full text-sm">
                            <caption className="sr-only">{copy.productSheetCaption}</caption>
                            <tbody>
                              {review.productSpec.map((spec, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-[#faf8f3]' : 'bg-white'}>
                                  <th scope="row" className="w-2/5 px-4 py-3 text-left font-semibold text-[#1a4d2e]">
                                    {spec.key}
                                  </th>
                                  <td className={`px-4 py-3 font-medium ${spec.highlight ? 'text-[#ff6b35]' : 'text-[#0f1419]'}`}>
                                    {spec.value}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </details>
                    <div className="pt-4">
                      <SectionLinkButton anchorId="especificacoes" label={copy.productSheetLink} />
                    </div>
                  </div>
                </EditorialReveal>
              )}

              {/* Conteúdo editorial */}
              {kind === 'guia' ? (
                <>
                  <ReviewContentSections
                    sections={preStepSections.filter((s) => !HEADINGS_OUTSIDE_BODY.includes(s.heading || ''))}
                    reviewTitle={review.title}
                    sectionIds={sectionIds}
                    filterHeadings={HEADINGS_OUTSIDE_BODY}
                    kind={kind}
                    notes={notes}
                    reviewSlug={review.slug}
                    coupon={review.coupon}
                    affiliate={review.affiliate}
                    locale={couponCopyLocale}
                    noteLabels={noteLabels}
                  />
                  {stepSections.length > 0 && (
                    <div className="mt-12">
                      <GuideTimeline
                        steps={stepSections}
                        sectionIds={sectionIds}
                        reviewTitle={review.title}
                        locale={couponCopyLocale}
                      />
                    </div>
                  )}
                  {/* A contagem de seções da âncora de linha (S0, S1…) recomeça aqui: uma nota S0 sairia
                      nesta parte e na de antes dos passos. Nenhum artigo usa âncora de linha, e o
                      test:build-output barra a nota repetida. */}
                  {postStepSections.length > 0 && (
                    <div className="mt-12">
                      <ReviewContentSections
                        sections={postStepSections.filter((s) => !HEADINGS_OUTSIDE_BODY.includes(s.heading || ''))}
                        reviewTitle={review.title}
                        sectionIds={sectionIds}
                        filterHeadings={HEADINGS_OUTSIDE_BODY}
                        kind={kind}
                        notes={notes}
                        reviewSlug={review.slug}
                        coupon={review.coupon}
                        affiliate={review.affiliate}
                        locale={couponCopyLocale}
                        noteLabels={noteLabels}
                      />
                    </div>
                  )}
                </>
              ) : (
                <ReviewContentSections
                  sections={review.contentSections || []}
                  reviewTitle={review.title}
                  sectionIds={sectionIds}
                  filterHeadings={HEADINGS_OUTSIDE_BODY}
                  kind={kind}
                  notes={notes}
                  reviewSlug={review.slug}
                  coupon={review.coupon}
                  affiliate={review.affiliate}
                  locale={couponCopyLocale}
                  noteLabels={noteLabels}
                />
              )}

              {/* Veredito em texto corrido quando não há rating de produto */}
              {verdictSection && !hasProductRating && (
                <section className="mt-10 rounded-2xl border border-[#1a4d2e]/10 bg-white p-6 shadow-soft md:p-8">
                  <SectionHeadingReveal
                    as="h2"
                    underlineColor="#ff6b35"
                    className="mb-5 font-editorial text-2xl font-bold text-[#1a4d2e]"
                  >
                    {kind === 'produto' ? copy.verdictTitle : copy.editorialNoteTitle}
                  </SectionHeadingReveal>
                  {verdictSection.paragraphs?.map((paragraph, index) => (
                    <p key={index} className="mb-4 font-editorial text-lg leading-8 text-[#24313d] last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                  {verdictSection.links && verdictSection.links.length > 0 && (
                    <div className="mt-8 flex flex-wrap gap-4">
                      {verdictSection.links.map((link) => (
                        <CouponStoreLink
                          key={link.href}
                          href={link.href}
                          couponCode={review.coupon}
                          brand={review.affiliate}
                          contentSlug={review.slug}
                          linkLabel={link.label}
                          sponsored={link.sponsored ?? hasCommercialRelationship}
                          placement="review_verdict"
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#0f1d3a] px-5 py-2.5 text-sm font-bold text-white wrap-anywhere transition-all hover:-translate-y-0.5 hover:bg-[#ff6b35] hover:shadow-md"
                        >
                          {link.label}
                          <ArrowRight size={16} />
                        </CouponStoreLink>
                      ))}
                    </div>
                  )}
                </section>
              )}

              <ArticleEnd
                review={review}
                kind={kind}
                copy={copy}
                ui={ui}
                couponCopyLocale={couponCopyLocale}
                youtubeEmbedUrl={youtubeEmbedUrl}
                videoPageUrl={videoPageUrl}
                hasCta={hasCta}
                effectiveCta={effectiveCta}
                reviewImage={reviewImage}
              />
            </div>

            {/* Sidebar */}
            <aside className="sticky top-24 hidden h-fit self-start lg:col-span-4 lg:block">
              <ReviewSidebar
                review={review}
                kind={kind}
                tocItems={tocItems}
                effectiveCta={effectiveCta}
                relatedArticleLinks={relatedArticleLinks}
                codeKind={codeKind}
                codeBrand={codeBrand}
              />
            </aside>
          </div>

          <ArticleAfter
            review={review}
            ui={ui}
            couponCopyLocale={couponCopyLocale}
            relatedReviews={relatedReviews}
            reviewHubHref={reviewHubHref}
          />
        </div>
      </EditorialAmbientBackground>

      {/* Filho direto do <body>: dentro do fundo editorial o sticky viraria relative. */}
      <ReviewMobileBottomBar
        locale={couponCopyLocale}
        reviewSlug={review.slug}
        tocItems={tocItems}
        affiliate={review.affiliate}
        coupon={review.coupon ? { code: review.coupon, brand: store?.brand, kind: codeKind, offer: storeOffer } : undefined}
        cta={effectiveCta && hasCta ? { url: effectiveCta.url, label: effectiveCta.label, sponsored: effectiveCta.sponsored } : undefined}
        related={relatedArticleLinks}
      />
    </>
  );
}