import { Fragment } from 'react';
import Link from 'next/link';
import { ChevronRight, PlayCircle, ShieldCheck } from 'lucide-react';
import TextToSpeechButton from '@/components/TextToSpeechButton';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { ArticleByline, ChangelogDetails, EditorialReveal, EditorialNotePill } from '@/components/editorial';
import type { EditorialNoteLabels } from '@/components/editorial/EditorialNotePill';
import { formatDate, type Review, type ReviewViewModel } from '@/lib/content';
import type { Locale } from '@/lib/i18n/locales';
import { getShellCopy } from '@/lib/i18n/shellDictionary';
import { InlineCouponCopy } from '../InlineCouponCopy';
import { ReviewHeroImage } from '../ReviewHeroImage';
import { ReviewHighlightChips } from '../ReviewHighlightChips';
import { getDisclosureLabel, type ArticleCopy, type TemplateUi } from '../articleCopy';
import type { CouponCopyLocale } from '../couponCopyLocale';

type HighlightChipsProps = Parameters<typeof ReviewHighlightChips>[0];

export interface ArticleHeaderProps {
  review: Review;
  kind: ReviewViewModel['kind'];
  kindLabel: string;
  badgeColor: string;
  copy: ArticleCopy;
  ui: TemplateUi;
  noteLabels: EditorialNoteLabels;
  couponCopyLocale: CouponCopyLocale;
  breadcrumbs: Array<{ name: string; href: string }>;
  languageLinks: Partial<Record<Locale, string>>;
  codeKind: HighlightChipsProps['codeKind'];
  codeBrand: HighlightChipsProps['codeBrand'];
  speechText: string;
  readTime: number;
  unanchoredNotes: NonNullable<Review['notes']>;
  reviewImage: string;
  reviewImageAlt: string;
  isPortraitHero: boolean;
  hasProductRating: boolean;
  videoPageUrl: string | null;
  youtubeEmbedUrl: string | null;
}

export function ArticleHeader({
  review, kind, kindLabel, badgeColor, copy, ui, noteLabels, couponCopyLocale, breadcrumbs, languageLinks,
  codeKind, codeBrand, speechText, readTime, unanchoredNotes, reviewImage, reviewImageAlt, isPortraitHero,
  hasProductRating, videoPageUrl, youtubeEmbedUrl,
}: ArticleHeaderProps): React.ReactElement {
  return (
    <header className="mb-10">
      {/* Fila do topo: categoria + breadcrumb */}
      <EditorialReveal as="div" delay={0} className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${badgeColor}`}>
          {kindLabel}
        </span>

        <nav aria-label={copy.breadcrumbLabel}>
          <ol className="flex flex-wrap items-center gap-2 text-sm text-[#4a5568]">
            {breadcrumbs.map(({ name, href }) => (
              <Fragment key={href}>
                <li>
                  <Link href={href} className="transition-colors hover:text-[#1a4d2e]">{name}</Link>
                </li>
                <li aria-hidden="true"><ChevronRight size={14} /></li>
              </Fragment>
            ))}
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
          <InlineCouponCopy coupon={review.coupon} locale={couponCopyLocale} kind={codeKind} brand={codeBrand} />
        </EditorialReveal>
      )}

      {Object.keys(languageLinks).length > 1 && (
        <LanguageSwitcher
          currentLocale={couponCopyLocale}
          links={languageLinks}
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
              <EditorialNotePill key={note.id || note.label} note={note} labels={noteLabels} />
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

      <ReviewHighlightChips review={review} kind={kind} codeKind={codeKind} codeBrand={codeBrand} />

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
          compact={Boolean(review.heroCompact)}
          rating={typeof review.rating === 'number' ? review.rating : undefined}
          slug={review.slug}
          video={review.video}
          locale={couponCopyLocale}
        />
      </EditorialReveal>
      {videoPageUrl && !youtubeEmbedUrl && (
        <Link
          href={videoPageUrl}
          className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#ff6b35] hover:text-[#1a4d2e]"
        >
          <PlayCircle size={17} aria-hidden="true" /> {copy.openVideoPage}
        </Link>
      )}
    </header>
  );
}
