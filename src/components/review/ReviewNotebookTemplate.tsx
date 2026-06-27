import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight, PlayCircle, Globe } from 'lucide-react';
import TextToSpeechButton from '@/components/TextToSpeechButton';
import { ShareBar } from '@/components/shared/ShareBar';
import { ReviewGallerySection } from './ReviewGallerySection';
import { ArticleByline, EditorialAmbientBackground, EditorialReveal, SectionHeadingReveal } from '@/components/editorial';
import { contentSectionsToPlainText, formatDate, generateSectionIds, type Review, type ReviewViewModel } from '@/lib/content';
import { ReadingProgressBar } from './ReadingProgressBar';
import { ReviewContentSections } from './ReviewContentSections';
import { ReviewHeroImage } from './ReviewHeroImage';
import { ReviewVerdictCard } from './ReviewVerdictCard';
import { ReviewMobileToc } from './ReviewTableOfContents';
import { ReviewSidebar } from './ReviewSidebar';
import { GuideTimeline } from './GuideTimeline';
import { PullQuote } from './PullQuote';

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

function isStepHeading(heading?: string): boolean {
  return /^(\d+[\.\)]\s+|Passo\s+\d+|Step\s+\d+)/i.test(heading || '');
}

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
  const { kind, plainTextBody } = viewModel;
  const kindLabel = getKindLabel(kind);
  const badgeColor = getBadgeColor(kind);
  const speechText = [review.title, review.description, plainTextBody].filter(Boolean).join(' ');
  const readTime = estimateReadTimeMinutes(plainTextBody);

  const hasProductRating = kind === 'produto' && typeof review.rating === 'number';
  const transparencySection = review.contentSections?.find((section) => section.heading === 'Transparência');
  const verdictSection = review.contentSections?.find((section) => section.heading === 'Veredito');

  const sectionIds = generateSectionIds(review.contentSections || []);
  const filteredHeadings: string[] = ['Transparência', 'Veredito'];

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

  const hasProductSpec = review.productSpec && review.productSpec.length > 0;
  const verdictLinkCta = verdictSection?.links?.[0];
  const effectiveCta = review.cta?.url && review.cta?.label
    ? review.cta
    : verdictLinkCta
      ? {
          url: verdictLinkCta.href,
          label: verdictLinkCta.label,
          text: verdictSection?.paragraphs?.at(-1) || review.description,
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

  return (
    <>
      <ReadingProgressBar />
      <EditorialAmbientBackground variant="review" className="review-page-bg min-h-screen pb-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {faqJsonLd && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        )}

        <div className="mx-auto max-w-6xl px-4 py-6 md:py-10">
          {/* Header editorial */}
          <header className="mb-10">
            {/* Fila do topo: categoria + breadcrumb */}
            <EditorialReveal as="div" delay={0} className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${badgeColor}`}>
                {kindLabel}
              </span>

              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-2 text-sm text-[#4a5568]">
                  <li>
                    <Link href="/" className="transition-colors hover:text-[#1a4d2e]">Início</Link>
                  </li>
                  <li aria-hidden="true"><ChevronRight size={14} /></li>
                  <li>
                    <Link href="/reviews" className="transition-colors hover:text-[#1a4d2e]">Reviews</Link>
                  </li>
                  <li aria-hidden="true"><ChevronRight size={14} /></li>
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
              className="mb-6 max-w-3xl font-editorial text-lg italic leading-relaxed text-[#4a5568] md:text-xl"
            >
              {review.description}
            </EditorialReveal>

            {/* Language Switcher for YesStyle localized versions */}
            {[
              'codigo-cecilia010-yesstyle-como-usar',
              'yesstyle-reward-code-coupon-cecilia010',
              'codigo-de-recompensa-yesstyle-cupon-cecilia010',
              'code-recompense-yesstyle-cecilia010',
              'yesstyle-reward-code-rabatt-cecilia010'
            ].includes(review.slug) && (
              <div className="mb-6 flex flex-wrap items-center gap-2 rounded-lg border border-[#1a4d2e]/10 bg-[#faf8f3] px-4 py-2.5 text-xs text-[#4a5568]">
                <span className="font-semibold text-[#1a4d2e] flex items-center gap-1.5">
                  <Globe size={14} className="text-[#ff6b35]" />
                  {review.slug === 'yesstyle-reward-code-coupon-cecilia010'
                    ? 'Read this guide in other languages:'
                    : review.slug === 'codigo-de-recompensa-yesstyle-cupon-cecilia010'
                      ? 'Lee esta guía en otros idiomas:'
                      : review.slug === 'code-recompense-yesstyle-cecilia010'
                        ? 'Lire ce guide dans une autre langue :'
                        : review.slug === 'yesstyle-reward-code-rabatt-cecilia010'
                          ? 'Diesen Leitfaden in einer anderen Sprache lesen:'
                          : 'Leia este guia em outros idiomas:'}
                </span>
                <div className="flex flex-wrap items-center gap-2 ml-1">
                  {[
                    { slug: 'codigo-cecilia010-yesstyle-como-usar', label: 'Português', href: '/reviews/codigo-cecilia010-yesstyle-como-usar' },
                    { slug: 'yesstyle-reward-code-coupon-cecilia010', label: 'English', href: '/reviews/yesstyle-reward-code-coupon-cecilia010' },
                    { slug: 'codigo-de-recompensa-yesstyle-cupon-cecilia010', label: 'Español', href: '/reviews/codigo-de-recompensa-yesstyle-cupon-cecilia010' },
                    { slug: 'code-recompense-yesstyle-cecilia010', label: 'Français', href: '/reviews/code-recompense-yesstyle-cecilia010' },
                    { slug: 'yesstyle-reward-code-rabatt-cecilia010', label: 'Deutsch', href: '/reviews/yesstyle-reward-code-rabatt-cecilia010' }
                  ]
                    .filter((lang) => lang.slug !== review.slug)
                    .map((lang, index, arr) => (
                      <span key={lang.slug} className="inline-flex items-center gap-2">
                        <Link
                          href={lang.href}
                          className="font-medium text-[#1a4d2e] hover:text-[#ff6b35] transition-colors underline underline-offset-4"
                        >
                          {lang.label}
                        </Link>
                        {index < arr.length - 1 && <span className="text-[#1a4d2e]/20">|</span>}
                      </span>
                    ))}
                </div>
              </div>
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
                    ? [{ icon: 'calendar' as const, label: 'Publicado em', value: formatDate(review.publishedAtISO), dateTime: review.publishedAtISO }]
                    : []),
                  { icon: 'clock', label: 'Tempo de leitura', value: `${readTime} min de leitura` },
                ]}
                action={<TextToSpeechButton text={speechText} />}
              />
            </EditorialReveal>

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
              />
            </EditorialReveal>
          </header>

          {/* Veredicto de produto */}
          <ReviewVerdictCard review={review} kind={kind} />

          {/* Layout principal + sidebar */}
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Conteúdo */}
            <div className="lg:col-span-8">
              <ReviewMobileToc items={tocItems} />

              {/* Pull quote editorial */}
              {review.pullQuote && (
                <div className="mb-10">
                  <PullQuote quote={review.pullQuote} />
                </div>
              )}

              {/* Ficha do produto em tabela */}
              {kind === 'produto' && hasProductSpec && (
                <EditorialReveal as="section" className="mb-10">
                  <details className="group overflow-hidden rounded-2xl border border-[#1a4d2e]/10 bg-white shadow-soft" open>
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
                          <tbody>
                            {review.productSpec.map((spec, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-[#faf8f3]' : 'bg-white'}>
                                <th className="w-2/5 px-4 py-3 text-left font-semibold text-[#1a4d2e]">
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
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#0f1d3a] px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#ff6b35] hover:shadow-md"
                        >
                          {link.label}
                          <ArrowRight size={16} />
                        </a>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Vídeo */}
              {youtubeEmbedUrl && (
                <section className="mt-10 mb-10 rounded-2xl border border-[#1a4d2e]/10 bg-white p-6 shadow-soft md:p-8">
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
                <EditorialReveal as="section" className="relative mt-12 mb-10 overflow-hidden rounded-2xl bg-[#1a4d2e] p-6 text-white shadow-medium md:p-8">
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#ff6b35]/15"
                    aria-hidden="true"
                  />
                  <div className="relative flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#ff6b35]">
                        Interessou?
                      </p>
                      <p className="max-w-2xl font-editorial text-lg italic leading-relaxed">
                        {effectiveCta?.text}
                      </p>
                    </div>
                    <a
                      href={effectiveCta?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-shrink-0 items-center rounded-full bg-[#ff6b35] px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:bg-[#e55a26] hover:shadow-lg"
                    >
                      {effectiveCta?.label}
                      <ArrowRight size={16} className="ml-2" />
                    </a>
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
                transparencySection={transparencySection}
                effectiveCta={effectiveCta}
              />
            </aside>
          </div>

          {/* Transparência mobile (quando não há sidebar) */}
          {transparencySection && (
            <div className="mt-8 rounded-xl border border-[#1a4d2e]/10 bg-white p-5 text-sm leading-relaxed text-[#4a5568] lg:hidden">
              <strong className="font-bold text-[#0f1419]">Transparência:</strong>{' '}
              {transparencySection.paragraphs?.join(' ')}
            </div>
          )}

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
            <section className="mt-12">
              <div className="mb-6 flex items-end justify-between gap-4">
                <SectionHeadingReveal
                  as="h2"
                  underlineColor="#ff6b35"
                  className="font-editorial text-2xl font-bold text-[#1a4d2e]"
                >
                  Mais artigos que você pode gostar
                </SectionHeadingReveal>
                <Link
                  href="/reviews"
                  className="hidden items-center gap-2 text-sm font-bold text-[#1a4d2e] transition-colors hover:text-[#ff6b35] md:inline-flex"
                >
                  Ver todos
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
    </>
  );
}
