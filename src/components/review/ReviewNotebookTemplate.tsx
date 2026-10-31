import { SectionLinkButton, SectionHeadingReveal, EditorialReveal, EditorialAmbientBackground } from '@/components/editorial';
import { asSentence, couponFontVariables } from '@/components/coupons/CouponBlocks';
import { COUPON_STORE_COPY } from '@/components/coupons/couponStoreCopy';
import { generateSectionIds, type Review, type ReviewViewModel } from '@/lib/content';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { getCouponBySlug, getStoreCodeKind } from '@/lib/couponsData';
import { getLocalizedCoupon } from '@/lib/couponTranslations';
import { isFaqHeading } from '@/lib/faq';
import { getArticleStoreBanners, isStoreBannerLive, placeStoreBanners } from '@/lib/storeBanners';
import { serializeJsonLd } from '@/lib/jsonLd';
import { isLineAnchor } from '@/lib/pretext/lineAnchorCodec';
import { resolveReviewLocale } from '@/lib/content/review-i18n';
import type { Locale } from '@/lib/i18n/locales';
import type { ArticleStoreBlock } from '@/lib/articleStore';
import type { ShelfCardArticle } from '@/lib/reviewsShelf';
import { ReadingProgressBar } from './ReadingProgressBar';
import { ReviewContentSections } from './ReviewContentSections';
import { ReviewSidebar, type ResolvedRelatedArticle } from './ReviewSidebar';
import { ReviewMobileBottomBar } from './ReviewMobileBottomBar';
import { getArticleCopy, getEditorialNoteLabels, getTemplateUi } from './articleCopy';
import { getBodySections, HEADINGS_OUTSIDE_BODY } from './bodySections';
import { isStepHeading } from './couponCopyLocale';
import { GuideTimeline } from './GuideTimeline';
import { ArticleCodeCopyProvider } from './HighlightCoupon';
import { ArticleHeader } from './article/ArticleHeader';
import { ArticleEnd } from './article/ArticleEnd';
import { ArticlePromoBanner } from './article/ArticlePromoBanner';

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
  // Os 6 relacionados (pickRelatedReviews), já nos cartões da estante.
  relatedReviews: ShelfCardArticle[];
  // Recorte do topo (e, depois, bloco da loja e lateral); null em artigo sem loja ativa.
  storeBlock?: ArticleStoreBlock | null;
  relatedArticleLinks: ResolvedRelatedArticle[];
  languageLinks: Partial<Record<Locale, string>>;
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
  storeBlock = null,
  relatedArticleLinks,
  languageLinks,
}: ReviewNotebookTemplateProps): React.ReactElement {
  const couponCopyLocale = resolveReviewLocale(review.locale);
  // O "Ver todos" dos relacionados: a subpágina da loja quando existe; senão, a lista de artigos do idioma, o
  // último nível da trilha antes do artigo.
  const relatedAllHref = storeBlock?.articlesHref ?? breadcrumbs[breadcrumbs.length - 1].href;
  const ui = getTemplateUi(couponCopyLocale);

  const { kind, plainTextBody } = viewModel;
  const copy = getArticleCopy(couponCopyLocale);
  const noteLabels = getEditorialNoteLabels(couponCopyLocale);
  // Um `reviewKind` fora do enum (a Mini Me 2.0 tem "product") sempre caiu no selo de editorial.
  const kindLabel = copy.kindLabel[kind] ?? copy.kindLabel.editorial;
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

  // O link do recorte: 'Ir para a loja' com código; sem código, o rótulo que a página da loja já usa, no
  // idioma do artigo.
  const storeCopy = COUPON_STORE_COPY[couponCopyLocale];
  const offerActionLabel = couponCopyLocale === 'pt'
    ? store?.offerActionLabel
    : review.affiliate && getLocalizedCoupon(review.affiliate, couponCopyLocale)?.offerActionLabel;
  const storeLabel = storeBlock?.code ? storeCopy.goToStore : offerActionLabel || storeCopy.viewOffer;
  // O código da loja citado no texto do corpo copia ao toque, com os textos do recorte.
  const inlineCodeCopy = storeBlock?.code
    ? { code: storeBlock.code, codeKind: storeBlock.codeKind, brand: storeBlock.brand, slug: storeBlock.slug, reviewSlug: review.slug, locale: couponCopyLocale }
    : null;

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

  // Os banners de campanha da loja (storeBanners.ts): o `top` depois da 1ª seção do corpo, o `mid` antes do FAQ.
  // O que ainda não começou vai escondido no HTML e aparece no navegador na hora do início.
  const now = new Date();
  const banners = store ? getArticleStoreBanners(store.slug, review.slug, now) : {};
  const bannerPlaces = placeStoreBanners(
    bodySections.map(({ id }) => id),
    bodySections.findIndex(({ heading }) => isFaqHeading(heading)),
  );
  const bannerSlots: Record<string, { before?: React.ReactNode; after?: React.ReactNode }> = {};
  if (store && banners.top && bannerPlaces.top) {
    bannerSlots[bannerPlaces.top] = {
      after: (
        <ArticlePromoBanner
          banner={banners.top}
          locale={couponCopyLocale}
          storeBrand={store.brand}
          reviewSlug={review.slug}
          hiddenInHtml={!isStoreBannerLive(banners.top, now)}
        />
      ),
    };
  }
  if (store && banners.mid && bannerPlaces.mid) {
    bannerSlots[bannerPlaces.mid] = {
      ...bannerSlots[bannerPlaces.mid],
      before: (
        <ArticlePromoBanner
          banner={banners.mid}
          locale={couponCopyLocale}
          storeBrand={store.brand}
          reviewSlug={review.slug}
          hiddenInHtml={!isStoreBannerLive(banners.mid, now)}
        />
      ),
    };
  }

  return (
    <>
      {/* No celular o progresso de leitura fica no dock do sumário. */}
      <div className="hidden lg:block">
        <ReadingProgressBar />
      </div>
      <EditorialAmbientBackground variant="review" className="min-h-screen pb-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
        {faqJsonLd && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }} />
        )}

        {/* Endereços e e-mails longos no texto quebram em vez de alargar a página no celular. */}
        <div className={`${couponFontVariables} mx-auto max-w-6xl px-4 py-6 wrap-break-word md:py-10`}>
          {/* Header editorial */}
          <ArticleHeader
            review={review}
            kind={kind}
            kindLabel={kindLabel}
            copy={copy}
            ui={ui}
            noteLabels={noteLabels}
            couponCopyLocale={couponCopyLocale}
            breadcrumbs={breadcrumbs}
            languageLinks={languageLinks}
            speechText={speechText}
            readTime={readTime}
            unanchoredNotes={unanchoredNotes}
            reviewImage={reviewImage}
            reviewImageAlt={reviewImageAlt}
            isPortraitHero={isPortraitHero}
            hasProductRating={hasProductRating}
            videoPageUrl={videoPageUrl}
            youtubeEmbedUrl={youtubeEmbedUrl}
            storeBlock={storeBlock}
            storeLabel={storeLabel}
          />

          {/* Layout principal + sidebar */}
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Conteúdo */}
            <div className="min-w-0 lg:col-span-8">
              {/* O corpo: ficha, seções e veredito em texto. O test:build-output confere o visual dele por este atributo. */}
              <ArticleCodeCopyProvider value={inlineCodeCopy}>
                <div data-article="corpo">
                  {/* Ficha do produto em tabela */}
                  {kind === 'produto' && hasProductSpec && (
                    <EditorialReveal as="section" id="especificacoes" className="mb-10 scroll-mt-24">
                      <div className="flex items-start gap-2">
                        <details className="group flex-1 overflow-hidden rounded-2xl border-2 border-marinho bg-white" open>
                          <summary className={`flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 transition-colors hover:bg-creme md:px-6 [&::-webkit-details-marker]:hidden ${FOCUS_RING}`}>
                            <span className="font-condensada text-[28px] leading-none font-black text-marinho font-stretch-extra-condensed md:text-[32px]">
                              {copy.productSheet}
                            </span>
                            <span className="text-xs font-extrabold tracking-[0.14em] text-marinho-suave uppercase group-open:hidden">
                              {copy.productSheetOpen}
                            </span>
                            <span className="hidden text-xs font-extrabold tracking-[0.14em] text-marinho-suave uppercase group-open:inline">
                              {copy.productSheetClose}
                            </span>
                          </summary>
                          <table className="w-full border-t-2 border-marinho text-sm">
                            <caption className="sr-only">{copy.productSheetCaption}</caption>
                            <tbody className="divide-y divide-marinho/15">
                              {review.productSpec.map((spec, index) => (
                                <tr key={index}>
                                  <th scope="row" className="w-2/5 px-5 py-3 text-left align-top font-bold text-marinho-suave md:px-6">
                                    {spec.key}
                                  </th>
                                  <td className="px-5 py-3 align-top font-semibold text-marinho md:px-6">
                                    {spec.highlight ? <span className="marca-texto font-extrabold">{spec.value}</span> : spec.value}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </details>
                        <div className="pt-4">
                          <SectionLinkButton anchorId="especificacoes" label={copy.productSheetLink} copiedLabel={copy.sectionLinkCopied} variant="d2" />
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
                        storeBrand={store?.brand}
                        locale={couponCopyLocale}
                        noteLabels={noteLabels}
                        slots={bannerSlots}
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
                            storeBrand={store?.brand}
                            locale={couponCopyLocale}
                            noteLabels={noteLabels}
                            slots={bannerSlots}
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
                      storeBrand={store?.brand}
                      locale={couponCopyLocale}
                      noteLabels={noteLabels}
                      slots={bannerSlots}
                    />
                  )}

                  {/* Veredito em texto corrido quando não há rating de produto */}
                  {verdictSection && !hasProductRating && (
                    <section className="mt-10 rounded-2xl border-2 border-marinho bg-white p-6 md:p-8">
                      <SectionHeadingReveal as="h2" variant="d2" className="mb-5">
                        {kind === 'produto' ? copy.verdictTitle : copy.editorialNoteTitle}
                      </SectionHeadingReveal>
                      {verdictSection.paragraphs?.map((paragraph, index) => (
                        <p key={index} className="mb-4 font-editorial text-lg leading-8 text-marinho last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                    </section>
                  )}
                </div>
              </ArticleCodeCopyProvider>

              <ArticleEnd
                review={review}
                kind={kind}
                copy={copy}
                ui={ui}
                couponCopyLocale={couponCopyLocale}
                youtubeEmbedUrl={youtubeEmbedUrl}
                videoPageUrl={videoPageUrl}
                showVerdict={shouldRenderVerdict}
                storeBlock={storeBlock}
                affiliateCta={
                  review.cta?.url && review.cta.label
                    ? { url: review.cta.url, label: review.cta.label, text: review.cta.text, sponsored: review.cta.sponsored ?? hasCommercialRelationship }
                    : null
                }
                storeLabel={storeLabel}
                reviewImage={reviewImage}
                relatedArticles={relatedReviews}
                relatedAllHref={relatedAllHref}
              />
            </div>

            {/* Sidebar. Mais alta que a tela (sumário longo), ela rola sozinha: o sticky deixaria o fim dela, com o
                recorte, fora de alcance. O px-2 dá lugar à sombra do recorte ao copiar. */}
            <aside className="sticky top-24 -mx-2 hidden h-fit max-h-[calc(100dvh-7rem)] self-start overflow-y-auto px-2 pb-2 lg:col-span-4 lg:block">
              <ReviewSidebar
                review={review}
                kind={kind}
                tocItems={tocItems}
                effectiveCta={effectiveCta}
                relatedArticleLinks={relatedArticleLinks}
                codeKind={codeKind}
                codeBrand={codeBrand}
                storeBlock={storeBlock}
                storeLabel={storeLabel}
              />
            </aside>
          </div>
        </div>
      </EditorialAmbientBackground>

      {/* Filho direto do <body>: dentro do fundo editorial o sticky viraria relative. */}
      <ReviewMobileBottomBar
        locale={couponCopyLocale}
        reviewSlug={review.slug}
        tocItems={tocItems}
        affiliate={review.affiliate}
        coupon={review.coupon ? { code: review.coupon, brand: store?.brand, kind: codeKind, offer: storeOffer } : undefined}
        // Com loja ativa, o botão da gaveta é o "Ir para a loja" dos recortes (rótulo junto com o link); sem ela, o cta.
        cta={
          storeBlock?.storeHref
            ? { url: storeBlock.storeHref, label: storeLabel, sponsored: storeBlock.storeSponsored }
            : effectiveCta && hasCta
              ? { url: effectiveCta.url, label: effectiveCta.label, sponsored: effectiveCta.sponsored }
              : undefined
        }
        related={relatedArticleLinks}
        hasTopCutout={Boolean(storeBlock)}
      />
    </>
  );
}
