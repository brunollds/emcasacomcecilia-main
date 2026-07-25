import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight, PlayCircle, ShieldCheck } from 'lucide-react';
import TextToSpeechButton from '@/components/TextToSpeechButton';
import { CouponStoreLink } from '@/components/CouponComponents';
import { ShareBar } from '@/components/shared/ShareBar';
import { DocumentLangSetter } from '@/components/shared/DocumentLangSetter';
import { ReviewGallerySection } from './ReviewGallerySection';
import { ArticleByline, ChangelogDetails, EditorialAmbientBackground, EditorialReveal, SectionHeadingReveal, SectionLinkButton, EditorialNotePill } from '@/components/editorial';
import { contentSectionsToPlainText, formatDate, generateSectionIds, type Review, type ReviewViewModel } from '@/lib/content';
import { isLineAnchor } from '@/lib/pretext/lineAnchorCodec';
import { ReadingProgressBar } from './ReadingProgressBar';
import { ReviewContentSections } from './ReviewContentSections';
import { ReviewHeroImage } from './ReviewHeroImage';
import { ReviewVerdictCard } from './ReviewVerdictCard';
import { ReviewSidebar } from './ReviewSidebar';
import { ReviewMobileBottomBar } from './ReviewMobileBottomBar';
import { InlineCouponCopy } from './InlineCouponCopy';
import { getCouponCopyLocale, isStepHeading, type CouponCopyLocale } from './couponCopyLocale';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { YESSTYLE_LOCALES, getRewardArticleLanguageLinks, getGuideArticleLanguageLinks } from '@/lib/i18n/yesstyleCluster';
import { getShellCopy } from '@/lib/i18n/shellDictionary';
import { GuideTimeline } from './GuideTimeline';
import { PullQuote } from './PullQuote';
import { ReviewHighlightChips } from './ReviewHighlightChips';

export interface ReviewNotebookTemplateProps {
  review: Review;
  viewModel: ReviewViewModel;
  youtubeEmbedUrl: string | null;
  reviewImage: string;
  reviewImageAlt: string;
  breadcrumbJsonLd: Record<string, unknown>;
  jsonLd: Record<string, unknown>;
  faqJsonLd?: Record<string, unknown> | null;
  relatedReviews: Review[];
}

function getKindLabel(kind: ReviewViewModel['kind']) {
  if (kind === 'produto') return 'Review de produto';
  if (kind === 'guia') return 'Guia';
  return 'Editorial';
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





function getDisclosureLabel(locale: CouponCopyLocale): string {
  const labels: Record<CouponCopyLocale, string> = {
    pt: 'Transparência editorial',
    en: 'Editorial transparency',
    es: 'Transparencia editorial',
    fr: 'Transparence éditoriale',
    de: 'Redaktionelle Transparenz',
    ko: '광고 및 제휴 안내',
    ja: '広告・アフィリエイトについて',
    'zh-hant': '聯盟行銷揭露',
    'zh-hans': '联盟营销披露',
  };

  return labels[locale];
}

const templateUiLabels: Record<CouponCopyLocale, {
  publishedAt: string;
  updatedAt: string;
  readTime: (mins: number) => string;
  interested: string;
  tableOfContents: string;
  relatedArticles: string;
  verdictHeading: string;
  verdictToc: string;
  viewAll: string;
}> = {
  pt: {
    publishedAt: 'Publicado em',
    updatedAt: 'Atualizado em',
    readTime: (m) => `${m} min de leitura`,
    interested: 'Interessou?',
    tableOfContents: 'Nesta análise',
    relatedArticles: 'Artigos relacionados',
    verdictHeading: 'Veredito da Cecília',
    verdictToc: 'Veredito final',
    viewAll: 'Ver todos',
  },
  en: {
    publishedAt: 'Published on',
    updatedAt: 'Updated on',
    readTime: (m) => `${m} min read`,
    interested: 'Interested?',
    tableOfContents: 'In this guide',
    relatedArticles: 'Related articles',
    verdictHeading: 'Cecília’s Verdict',
    verdictToc: 'Final verdict',
    viewAll: 'View all',
  },
  es: {
    publishedAt: 'Publicado el',
    updatedAt: 'Actualizado el',
    readTime: (m) => `${m} min de lectura`,
    interested: '¿Te interesa?',
    tableOfContents: 'En esta guía',
    relatedArticles: 'Artículos relacionados',
    verdictHeading: 'Veredicto de Cecília',
    verdictToc: 'Veredicto final',
    viewAll: 'Ver todos',
  },
  fr: {
    publishedAt: 'Publié le',
    updatedAt: 'Mis à jour le',
    readTime: (m) => `${m} min de lecture`,
    interested: 'Intéressé ?',
    tableOfContents: 'Dans ce guide',
    relatedArticles: 'Articles connexes',
    verdictHeading: 'Verdict de Cecília',
    verdictToc: 'Verdict final',
    viewAll: 'Voir tout',
  },
  de: {
    publishedAt: 'Veröffentlicht am',
    updatedAt: 'Aktualisiert am',
    readTime: (m) => `${m} Min. Lesezeit`,
    interested: 'Interessiert?',
    tableOfContents: 'In diesem Ratgeber',
    relatedArticles: 'Verwandte Artikel',
    verdictHeading: 'Cecílias Fazit',
    verdictToc: 'Endergebnis',
    viewAll: 'Alle ansehen',
  },
  ko: {
    publishedAt: '발행일',
    updatedAt: '수정일',
    readTime: (m) => `읽는 시간 ${m}분`,
    interested: '관심이 있으신가요?',
    tableOfContents: '목차',
    relatedArticles: '관련 문서',
    verdictHeading: '세실리아의 최종 평가',
    verdictToc: '최종 평가',
    viewAll: '전체 보기',
  },
  ja: {
    publishedAt: '公開日',
    updatedAt: '更新日',
    readTime: (m) => `読了時間 約${m}分`,
    interested: '気になりましたか？',
    tableOfContents: '目次',
    relatedArticles: '関連記事',
    verdictHeading: 'セシリアの最終評価',
    verdictToc: '最終評価',
    viewAll: 'すべて見る',
  },
  'zh-hant': {
    publishedAt: '發布於',
    updatedAt: '更新於',
    readTime: (m) => `閱讀時間約 ${m} 分鐘`,
    interested: '感興趣嗎？',
    tableOfContents: '目錄',
    relatedArticles: '相關文章',
    verdictHeading: 'Cecília 的最終評價',
    verdictToc: '最終評價',
    viewAll: '查看全部',
  },
  'zh-hans': {
    publishedAt: '发布于',
    updatedAt: '更新于',
    readTime: (m) => `阅读时间约 ${m} 分钟`,
    interested: '感兴趣吗？',
    tableOfContents: '目录',
    relatedArticles: '相关文章',
    verdictHeading: 'Cecília 的最终评价',
    verdictToc: '最终评价',
    viewAll: '查看全部',
  },
};

export function ReviewNotebookTemplate({
  review,
  viewModel,
  youtubeEmbedUrl,
  reviewImage,
  reviewImageAlt,
  breadcrumbJsonLd,
  jsonLd,
  faqJsonLd = null,
  relatedReviews,
}: ReviewNotebookTemplateProps): React.ReactElement {
  const couponCopyLocale = getCouponCopyLocale(review.slug);
  const ui = templateUiLabels[couponCopyLocale] || templateUiLabels.pt;

  const { kind, plainTextBody } = viewModel;
  const kindLabel = getKindLabel(kind);
  const badgeColor = getBadgeColor(kind);
  const speechText = [review.title, review.description, plainTextBody].filter(Boolean).join(' ');
  const readTime = estimateReadTimeMinutes(plainTextBody);

  const hasProductRating = kind === 'produto' && typeof review.rating === 'number';
  const verdictSection = review.contentSections?.find((section) => section.heading === 'Veredito');

  const sectionIds = generateSectionIds(review.contentSections || []);
  const filteredHeadings: string[] = ['Veredito'];

  const tocItems = (review.contentSections || [])
    .filter((section) => (
      section.heading &&
      !filteredHeadings.includes(section.heading) &&
      !(kind === 'guia' && isStepHeading(section.heading))
    ))
    .map((section) => ({
      id: sectionIds.get(section.heading || '') || '',
      heading: section.heading || '',
    }))
    .filter((item) => item.id);

  // Add "Veredito final" to TOC if the verdict section will render
  const hasVerdictStars = Boolean(review.verdict?.stars);
  const hasRating = typeof review.rating === 'number';
  const hasProsOrCons = (review.pros?.length ?? 0) > 0 || (review.cons?.length ?? 0) > 0;
  const shouldRenderVerdict = kind === 'produto' && (hasVerdictStars || hasRating || hasProsOrCons);
  if (shouldRenderVerdict) {
    tocItems.push({ id: 'veredito', heading: 'Veredito final' });
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

  const stepSections = (review.contentSections || []).filter((s) => isStepHeading(s.heading));
  const firstStepIndex = (review.contentSections || []).findIndex((s) => isStepHeading(s.heading));

  const preStepSections = firstStepIndex !== -1
    ? (review.contentSections || []).slice(0, firstStepIndex).filter((s) => !isStepHeading(s.heading))
    : (review.contentSections || []).filter((s) => !isStepHeading(s.heading));

  const postStepSections = firstStepIndex !== -1
    ? (review.contentSections || []).slice(firstStepIndex).filter((s) => !isStepHeading(s.heading))
    : [];

  // Separate notes into anchored and unanchored
  // Exclude both section-id anchored notes and line-anchored notes (which belong to margin rails)
  const notes = review.notes || [];
  const unanchoredNotes = notes.filter((note) => !note.anchor || (!sectionIds.has(note.anchor) && !isLineAnchor(note.anchor)));

  return (
    <>
      <DocumentLangSetter locale={couponCopyLocale} />
      <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var l=${JSON.stringify(couponCopyLocale === 'pt' ? 'pt-BR' : (couponCopyLocale === 'zh-hant' ? 'zh-Hant' : (couponCopyLocale === 'zh-hans' ? 'zh-Hans' : couponCopyLocale)))};if(document&&document.documentElement){document.documentElement.lang=l;}}catch(e){}})();`,
          }}
        />
      <ReadingProgressBar />
      <EditorialAmbientBackground variant="review" className="review-page-bg min-h-screen pb-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {faqJsonLd && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        )}

        <div className="mx-auto max-w-6xl px-4 py-6 pb-28 md:py-10 lg:pb-10">
          {/* Header editorial */}
          <header className="mb-10">
            {/* Fila do topo: categoria + breadcrumb */}
            <EditorialReveal as="div" delay={0} className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${badgeColor}`}>
                {kindLabel}
              </span>

              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-2 text-sm text-[#4a5568]">
                  {couponCopyLocale === 'pt' ? (
                    <>
                      <li>
                        <Link href="/" className="transition-colors hover:text-[#1a4d2e]">{getShellCopy('pt').homeLabel}</Link>
                      </li>
                      <li aria-hidden="true"><ChevronRight size={14} /></li>
                      <li>
                        <Link href="/reviews" className="transition-colors hover:text-[#1a4d2e]">Reviews</Link>
                      </li>
                      <li aria-hidden="true"><ChevronRight size={14} /></li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link href={YESSTYLE_LOCALES[couponCopyLocale as keyof typeof YESSTYLE_LOCALES]?.hubPath || '/'} className="transition-colors hover:text-[#1a4d2e]">
                          {getShellCopy(couponCopyLocale).hubLabel}
                        </Link>
                      </li>
                      <li aria-hidden="true"><ChevronRight size={14} /></li>
                    </>
                  )}
                  <li className="max-w-[200px] truncate text-[#1a4d2e] md:max-w-md" aria-current="page">
                    {review.title}
                  </li>
                </ol>
              </nav>
            </EditorialReveal>

            {/* Divisor horizontal */}
            <div className="mb-6 h-px w-full bg-[#1a4d2e]/10" />

            {/* Corpo do cabeçalho */}
            <EditorialReveal as="div" delay={0.05} className="mb-3">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff6b35]">
                {review.type}
              </span>
            </EditorialReveal>

            <EditorialReveal
              as="h1"
              delay={0.1}
              className="mb-4 font-editorial text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[#1a4d2e] md:text-4xl lg:text-5xl"
            >
              {review.title}
            </EditorialReveal>

            <div className="mb-5 h-[3px] w-16 bg-[#ff6b35]" />

            <EditorialReveal
              as="p"
              delay={0.15}
              className="mb-4 max-w-3xl font-editorial text-lg italic leading-relaxed text-[#4a5568] md:text-xl"
            >
              {review.description}
            </EditorialReveal>

            {/* Cupom copiável no resumo — só guias com cupom (oculto quando há tabela de faixas) */}
            {kind === 'guia' &&
              review.coupon &&
              !review.contentSections?.some(
                (s) => s.couponTiers && s.couponTiers.length > 0
              ) && (
              <EditorialReveal delay={0.17}>
                <InlineCouponCopy coupon={review.coupon} locale={couponCopyLocale} />
              </EditorialReveal>
            )}

            {/* Seletor reutilizável para versões localizadas */}
            {Object.values(YESSTYLE_LOCALES).some((cfg) => cfg.rewardArticleSlug === review.slug) && (
              <LanguageSwitcher
                currentLocale={couponCopyLocale}
                links={getRewardArticleLanguageLinks()}
              />
            )}

            {Object.values(YESSTYLE_LOCALES).some((cfg) => cfg.guideSlug === review.slug) && (
              <LanguageSwitcher
                currentLocale={couponCopyLocale}
                links={getGuideArticleLanguageLinks()}
              />
            )}

            <EditorialReveal as="div" delay={0.2} className="mb-8">
              <ArticleByline
                authors={review.authors || (review.author ? [review.author] : undefined)}
                fallbackAuthor={{
                  name: 'Cecília Mauad',
                  role: 'Em Casa com Cecília',
                  initials: 'CM',
                  url: '/sobre',
                }}
                meta={[
                  ...(review.publishedAtISO
                    ? [{ icon: 'calendar' as const, label: ui.publishedAt, value: formatDate(review.publishedAtISO, couponCopyLocale), dateTime: review.publishedAtISO }]
                    : []),
                  ...(review.updatedAt && review.updatedAt !== review.publishedAtISO
                    ? [{ label: ui.updatedAt, value: formatDate(review.updatedAt, couponCopyLocale), dateTime: review.updatedAt }]
                    : []),
                  { icon: 'clock', label: ui.readTime(1).split(' ')[0], value: ui.readTime(readTime) },
                ]}
                action={<TextToSpeechButton text={speechText} label={getShellCopy(couponCopyLocale).listenAudio} />}
              />
              {review.changelog && review.changelog.length > 0 && (
                <div className="mt-3">
                  <ChangelogDetails entries={review.changelog} />
                </div>
              )}
              {unanchoredNotes.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {unanchoredNotes.map((note) => (
                    <EditorialNotePill key={note.id || note.label} note={note} />
                  ))}
                </div>
              )}
            </EditorialReveal>

            {review.editorialNote && (
              <EditorialReveal
                as="aside"
                delay={0.22}
                className="mb-6 flex max-w-3xl items-start gap-3 rounded-xl border border-[#1a4d2e]/15 bg-[#eef7f1] px-4 py-3 text-[#24313d]"
                aria-label={getDisclosureLabel(couponCopyLocale)}
              >
                <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#1a4d2e]" aria-hidden="true" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1a4d2e]">
                    {getDisclosureLabel(couponCopyLocale)}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#4a5568]">
                    {review.editorialNote}
                  </p>
                </div>
              </EditorialReveal>
            )}

            <ReviewHighlightChips review={review} kind={kind} />

            {/* Hero image */}
            <EditorialReveal as="figure" delay={0.25}>
              <ReviewHeroImage
                src={reviewImage}
                alt={reviewImageAlt}
                isPortrait={isPortraitHero}
                imageAspect={review.imageAspect}
                imagePosition={review.imagePosition}
                imageFit={review.imageFit}
                hasProductRating={hasProductRating}
                objectContain={kind === 'editorial'}
                rating={typeof review.rating === 'number' ? review.rating : undefined}
                slug={review.slug}
                video={review.video}
              />
            </EditorialReveal>
          </header>

          {/* Layout principal + sidebar */}
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Conteúdo */}
            <div className="lg:col-span-8">
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
                        <span>Ficha do produto</span>
                        <span className="text-sm font-sans font-bold uppercase tracking-[0.14em] text-[#ff6b35] group-open:hidden">
                          Abrir
                        </span>
                        <span className="hidden text-sm font-sans font-bold uppercase tracking-[0.14em] text-[#ff6b35] group-open:inline">
                          Fechar
                        </span>
                      </summary>
                      <div className="border-t border-[#1a4d2e]/10 px-6 pb-6 md:px-8 md:pb-8">
                        <div className="mt-5 overflow-hidden rounded-xl border border-[#1a4d2e]/10">
                          <table className="w-full text-sm">
                            <caption className="sr-only">Ficha técnica do produto avaliado</caption>
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
                      <SectionLinkButton anchorId="especificacoes" label="Copiar link da ficha do produto" />
                    </div>
                  </div>
                </EditorialReveal>
              )}

              {/* Conteúdo editorial */}
              {kind === 'guia' ? (
                <>
                  <ReviewContentSections
                    sections={preStepSections.filter((s) => !filteredHeadings.includes(s.heading || ''))}
                    reviewTitle={review.title}
                    sectionIds={sectionIds}
                    filterHeadings={filteredHeadings}
                    kind={kind}
                    notes={notes}
                    reviewSlug={review.slug}
                    coupon={review.coupon}
                    affiliate={review.affiliate}
                  />
                  {stepSections.length > 0 && (
                    <div className="mt-12">
                      <GuideTimeline steps={stepSections} sectionIds={sectionIds} reviewTitle={review.title} />
                    </div>
                  )}
                  {postStepSections.length > 0 && (
                    <div className="mt-12">
                      <ReviewContentSections
                        sections={postStepSections.filter((s) => !filteredHeadings.includes(s.heading || ''))}
                        reviewTitle={review.title}
                        sectionIds={sectionIds}
                        filterHeadings={filteredHeadings}
                        kind={kind}
                        notes={notes}
                        reviewSlug={review.slug}
                        coupon={review.coupon}
                        affiliate={review.affiliate}
                      />
                    </div>
                  )}
                </>
              ) : (
                <ReviewContentSections
                  sections={review.contentSections || []}
                  reviewTitle={review.title}
                  sectionIds={sectionIds}
                  filterHeadings={filteredHeadings}
                  kind={kind}
                  notes={notes}
                  reviewSlug={review.slug}
                  coupon={review.coupon}
                  affiliate={review.affiliate}
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
                    {kind === 'produto' ? 'Veredito da Cecília' : 'Nota editorial'}
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
                          sponsored={link.sponsored ?? hasCommercialRelationship}
                          placement="review_inline"
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#0f1d3a] px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#ff6b35] hover:shadow-md"
                        >
                          {link.label}
                          <ArrowRight size={16} />
                        </CouponStoreLink>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Vídeo */}
              {youtubeEmbedUrl && (
                <section className="mt-10 mb-10 rounded-2xl border border-[#1a4d2e]/10 bg-white p-6 shadow-soft md:p-8 print:hidden">
                  <SectionHeadingReveal
                    as="h2"
                    underlineColor="#ff6b35"
                    className="mb-5 font-editorial text-2xl font-bold text-[#1a4d2e]"
                  >
                    Vídeo relacionado
                  </SectionHeadingReveal>
                  <div className="aspect-video overflow-hidden rounded-xl bg-[#1a4d2e]/5">
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
                  <p className="mt-3 flex items-center gap-2 text-sm text-[#1a4d2e]/70">
                    <PlayCircle size={16} className="text-[#ff6b35]" />
                    Assista ao vídeo completo no YouTube
                  </p>
                </section>
              )}

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
              {kind === 'produto' && (
                <EditorialReveal as="section" id="veredito" className="mb-10 scroll-mt-24">
                  <div className="mb-6 flex items-start gap-2">
                    <SectionHeadingReveal
                      as="h2"
                      underlineColor="#ff6b35"
                      className="font-editorial text-2xl font-bold text-[#1a4d2e]"
                    >
                      Veredito final
                    </SectionHeadingReveal>
                    <SectionLinkButton anchorId="veredito" label="Copiar link do veredito final" />
                  </div>
                  <div className="space-y-6">
                    <ReviewVerdictCard review={review} kind={kind} />
                  </div>
                </EditorialReveal>
              )}

              {/* Share */}
              <EditorialReveal as="section" className="mb-10">
                <ShareBar
                  url={`https://emcasacomcecilia.com/reviews/${review.slug}`}
                  title={review.title}
                  contentType="review"
                  imageUrl={
                    reviewImage.startsWith('http')
                      ? reviewImage
                      : `https://emcasacomcecilia.com${reviewImage}`
                  }
                />
              </EditorialReveal>
            </div>

            {/* Sidebar */}
            <aside className="sticky top-24 hidden h-fit self-start lg:col-span-4 lg:block">
              <ReviewSidebar
                review={review}
                kind={kind}
                tocItems={tocItems}
                effectiveCta={effectiveCta}
              />
            </aside>
          </div>

          {/* Galeria */}
          {(review.gallery && review.gallery.length > 0) || review.youtubeUrl ? (
            <ReviewGallerySection
              images={review.gallery || []}
              videos={review.youtubeUrl ? [{ url: review.youtubeUrl, title: review.title }] : []}
              title={review.title}
            />
          ) : null}

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
                  href={couponCopyLocale === 'pt' ? '/reviews' : (YESSTYLE_LOCALES[couponCopyLocale as keyof typeof YESSTYLE_LOCALES]?.hubPath || '/')}
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
                    href={`/reviews/${item.slug}`}
                    className="group relative min-h-[220px] overflow-hidden rounded-[1.5rem] border border-[#0f1419]/8 bg-[#0f1d3a] p-4 transition-all hover:-translate-y-1 hover:border-[#ff6b35]/30 hover:shadow-md"
                  >
                    {item.image ? (
                      <Image
                        src={item.image}
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
        </div>
      </EditorialAmbientBackground>

      <ReviewMobileBottomBar
        review={review}
        kind={kind}
        tocItems={tocItems}
        effectiveCta={effectiveCta}
      />
    </>
  );
}
