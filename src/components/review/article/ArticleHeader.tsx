import { Fragment } from 'react';
import Link from 'next/link';
import { ChevronRight, Clock, PlayCircle, ShieldCheck, Star } from 'lucide-react';
import TextToSpeechButton from '@/components/TextToSpeechButton';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { ChangelogDetails, EditorialNotePill } from '@/components/editorial';
import type { EditorialNoteLabels } from '@/components/editorial/EditorialNotePill';
import { FOCUS_RING } from '@/components/ui/focusRing';
import type { ArticleStoreBlock } from '@/lib/articleStore';
import { formatDate, type PersonRef, type Review, type ReviewViewModel } from '@/lib/content';
import type { Locale } from '@/lib/i18n/locales';
import { getShellCopy } from '@/lib/i18n/shellDictionary';
import { ReviewHeroImage } from '../ReviewHeroImage';
import { getDisclosureLabel, type ArticleCopy, type TemplateUi } from '../articleCopy';
import type { CouponCopyLocale } from '../couponCopyLocale';
import { ArticleCouponCutout } from './ArticleCouponCutout';

const CECILIA: Pick<PersonRef, 'name' | 'url'> = { name: 'Cecília Mauad', url: '/sobre' };

export interface ArticleHeaderProps {
  review: Review;
  kind: ReviewViewModel['kind'];
  kindLabel: string;
  copy: ArticleCopy;
  ui: TemplateUi;
  noteLabels: EditorialNoteLabels;
  couponCopyLocale: CouponCopyLocale;
  breadcrumbs: Array<{ name: string; href: string }>;
  languageLinks: Partial<Record<Locale, string>>;
  speechText: string;
  readTime: number;
  unanchoredNotes: NonNullable<Review['notes']>;
  reviewImage: string;
  reviewImageAlt: string;
  isPortraitHero: boolean;
  hasProductRating: boolean;
  videoPageUrl: string | null;
  youtubeEmbedUrl: string | null;
  storeBlock: ArticleStoreBlock | null;
  storeLabel: string;
}

// Topo do artigo no visual da D2: trilha, tipo e categoria, título com o marca-texto, introdução em serifa,
// a linha de dados, a transparência numa linha, o recorte do código (artigo com loja) e a foto.
export function ArticleHeader({
  review, kind, kindLabel, copy, ui, noteLabels, couponCopyLocale, breadcrumbs, languageLinks, speechText,
  readTime, unanchoredNotes, reviewImage, reviewImageAlt, isPortraitHero, hasProductRating, videoPageUrl,
  youtubeEmbedUrl, storeBlock, storeLabel,
}: ArticleHeaderProps): React.ReactElement {
  const authors = review.authors?.length ? review.authors : [review.author ?? CECILIA];
  const showType = Boolean(review.type) && review.type !== kindLabel;
  const updated = review.updatedAt && review.updatedAt !== review.publishedAtISO ? review.updatedAt : undefined;
  // A nota do veredito, como na sidebar; só em análise de produto.
  const rawStars = kind === 'produto' ? review.verdict?.stars ?? review.rating : undefined;
  const stars = typeof rawStars === 'number' ? rawStars.toFixed(1) : undefined;

  return (
    <header data-article="topo" className="mb-10 text-marinho">
      <nav aria-label={copy.breadcrumbLabel}>
        <ol className="flex flex-wrap items-center gap-1 text-[13px] font-bold leading-[18px] text-marinho-suave">
          {breadcrumbs.map(({ name, href }) => (
            <Fragment key={href}>
              <li>
                <Link href={href} className={`flex min-h-11 items-center underline underline-offset-[3px] hover:text-marinho ${FOCUS_RING}`}>
                  {name}
                </Link>
              </li>
              <li aria-hidden="true" className="flex">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
            </Fragment>
          ))}
          <li aria-current="page" className="max-w-full min-w-0 truncate text-marinho">
            {review.title}
          </li>
        </ol>
      </nav>

      <p className="mt-2 flex flex-wrap items-center gap-x-2 text-[13px] font-extrabold leading-[18px] tracking-[0.06em] uppercase">
        {/* O ponto fica com o tipo: numa quebra de linha, ele não abre a linha de baixo. */}
        <span className="whitespace-nowrap">
          <span>{kindLabel}</span>
          {showType && <span aria-hidden="true"> ·</span>}
        </span>
        {showType && <span className="text-marinho-suave">{review.type}</span>}
      </p>

      <h1 className="mt-3 max-w-4xl font-condensada text-[40px] leading-[1.02] font-black text-balance font-stretch-extra-condensed md:text-6xl">
        <span className="marca-texto marca-texto-entra">{review.title}</span>
      </h1>

      <p className="mt-4 max-w-3xl font-editorial text-lg leading-relaxed text-marinho-suave md:text-xl">
        {review.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-marinho-suave">
        <span className="font-extrabold text-marinho">
          {authors.map((author, index) => (
            <Fragment key={author.name}>
              {index > 0 && ', '}
              {author.url ? (
                <Link href={author.url} className={`underline underline-offset-[3px] hover:text-marinho-suave ${FOCUS_RING}`}>
                  {author.name}
                </Link>
              ) : (
                author.name
              )}
            </Fragment>
          ))}
        </span>
        {review.publishedAtISO && (
          <time dateTime={review.publishedAtISO}>{formatDate(review.publishedAtISO, couponCopyLocale)}</time>
        )}
        {updated && (
          <span>
            {ui.updatedAt} <time dateTime={updated}>{formatDate(updated, couponCopyLocale)}</time>
          </span>
        )}
        <span className="inline-flex items-center gap-1.5">
          <Clock aria-hidden="true" className="h-4 w-4" />
          {ui.readTime(readTime)}
        </span>
        {stars && (
          <span className="inline-flex items-center gap-1 font-extrabold text-marinho">
            <Star aria-hidden="true" className="h-4 w-4 fill-amarelo-cupom" />
            <span aria-hidden="true">{stars}</span>
            <span className="sr-only">{copy.ratingLabel(stars)}</span>
          </span>
        )}
        <TextToSpeechButton
          text={speechText}
          label={getShellCopy(couponCopyLocale).listenAudio}
          pauseLabel={copy.listenPause}
          resumeLabel={copy.listenResume}
          stopLabel={copy.listenStop}
          variant="d2"
        />
      </div>

      {review.changelog && review.changelog.length > 0 && (
        <div className="mt-3">
          <ChangelogDetails entries={review.changelog} variant="d2" />
        </div>
      )}
      {unanchoredNotes.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {unanchoredNotes.map((note) => (
            <EditorialNotePill key={note.id || note.label} note={note} labels={noteLabels} variant="d2" />
          ))}
        </div>
      )}

      {Object.keys(languageLinks).length > 1 && (
        <div className="mt-5">
          <LanguageSwitcher currentLocale={couponCopyLocale} links={languageLinks} />
        </div>
      )}

      {/* A transparência numa linha; o texto inteiro abre ao tocar, sem JavaScript. */}
      {review.editorialNote && (
        <details className="group mt-4 max-w-3xl border-y-2 border-marinho/15 text-sm">
          <summary className={`flex min-h-11 cursor-pointer list-none items-center gap-2 py-2 [&::-webkit-details-marker]:hidden ${FOCUS_RING}`}>
            <ShieldCheck aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
            <span className="shrink-0 font-extrabold">{getDisclosureLabel(couponCopyLocale)}</span>
            <span className="min-w-0 flex-1 truncate text-marinho-suave group-open:hidden">{review.editorialNote}</span>
            <span className="ml-auto shrink-0 font-bold underline underline-offset-[3px] group-open:hidden">{copy.disclosureMore}</span>
          </summary>
          <p className="pb-3 leading-relaxed text-marinho-suave">{review.editorialNote}</p>
        </details>
      )}

      {storeBlock && (
        <div className="mt-8 max-w-3xl">
          <ArticleCouponCutout
            variant="top"
            block={storeBlock}
            locale={couponCopyLocale}
            reviewSlug={review.slug}
            storeLabel={storeLabel}
          />
        </div>
      )}

      <figure className="mt-8">
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
          slug={review.slug}
          video={review.video}
          locale={couponCopyLocale}
        />
      </figure>
      {videoPageUrl && !youtubeEmbedUrl && (
        <Link
          href={videoPageUrl}
          className={`mt-4 inline-flex items-center gap-2 text-sm font-bold underline underline-offset-[3px] hover:text-marinho-suave ${FOCUS_RING}`}
        >
          <PlayCircle size={17} aria-hidden="true" /> {copy.openVideoPage}
        </Link>
      )}
    </header>
  );
}
