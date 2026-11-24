import { Fragment } from 'react';
import Link from 'next/link';
import { ChevronRight, Clock, PlayCircle, ShieldCheck, Star } from 'lucide-react';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { ChangelogDetails, EditorialNotePill } from '@/components/editorial';
import type { EditorialNoteLabels } from '@/components/editorial/EditorialNotePill';
import { FOCUS_RING } from '@/components/ui/focusRing';
import type { ArticleStoreBlock } from '@/lib/articleStore';
import { formatDate, type PersonRef, type Review, type ReviewViewModel } from '@/lib/content';
import type { Locale } from '@/lib/i18n/locales';
import { ReviewHeroImage } from '../ReviewHeroImage';
import { getDisclosureLabel, type ArticleCopy, type TemplateUi } from '../articleCopy';
import type { CouponCopyLocale } from '../couponCopyLocale';
import { ArticleCouponCutout } from './ArticleCouponCutout';
import { ArticleStoreCodes } from './ArticleStoreCodes';

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
  readTime: number;
  unanchoredNotes: NonNullable<Review['notes']>;
  reviewImage: string;
  reviewImageAlt: string;
  isPortraitHero: boolean;
  hasProductRating: boolean;
  videoPageUrl: string | null;
  youtubeEmbedUrl: string | null;
  storeBlock: ArticleStoreBlock | null;
  // O artigo de várias lojas: as linhas de código no lugar do recorte; vazio no artigo de uma loja.
  storeBlocks?: readonly ArticleStoreBlock[];
  storeLabel: string;
}

// Topo do artigo no visual da D2: trilha, tipo e categoria, título com o marca-texto, introdução em serifa,
// a linha de dados, a transparência numa linha, o recorte do código (artigo com loja) e a foto. O "Ouvir" fica no
// título da primeira seção do corpo (ReviewContentSections), para a linha de dados caber numa linha no celular.
export function ArticleHeader({
  review, kind, kindLabel, copy, ui, noteLabels, couponCopyLocale, breadcrumbs, languageLinks, readTime, unanchoredNotes, reviewImage, reviewImageAlt, isPortraitHero, hasProductRating, videoPageUrl,
  youtubeEmbedUrl, storeBlock, storeBlocks = [], storeLabel,
}: ArticleHeaderProps): React.ReactElement {
  const authors = review.authors?.length ? review.authors : [review.author ?? CECILIA];
  const showType = Boolean(review.type) && review.type !== kindLabel;
  const updated = review.updatedAt && review.updatedAt !== review.publishedAtISO ? review.updatedAt : undefined;
  // A nota do veredito, como na sidebar; só em análise de produto.
  const rawStars = kind === 'produto' ? review.verdict?.stars ?? review.rating : undefined;
  const stars = typeof rawStars === 'number' ? rawStars.toFixed(1) : undefined;

  return (
    <header data-article="topo" className="mb-7 text-marinho md:mb-10">
      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[13px] font-bold leading-5 text-marinho-suave">
        <nav aria-label={copy.breadcrumbLabel}>
          <ol className="flex flex-wrap items-center gap-1">
            {breadcrumbs.map(({ name, href }, index) => (
              <Fragment key={href}>
                <li>
                  <Link
                    href={href}
                    className={`relative inline-flex items-center py-0.5 underline underline-offset-[3px] hover:text-marinho after:absolute after:-inset-y-2 after:inset-x-0 md:min-h-9 md:py-0 ${FOCUS_RING}`}
                  >
                    {name}
                  </Link>
                </li>
                <li aria-hidden="true" className={`flex ${index === breadcrumbs.length - 1 ? 'max-md:hidden' : ''}`}>
                  <ChevronRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
                </li>
              </Fragment>
            ))}
            {/* No celular, o título ocuparia uma linha só dele logo acima do h1: na tela, a trilha para antes dele; o leitor de
                tela e o JSON-LD seguem com o artigo. No computador, ele cabe na mesma linha. */}
            <li aria-current="page" className="text-marinho max-md:sr-only md:max-w-[26ch] md:min-w-0 md:truncate lg:max-w-[38ch]">
              {review.title}
            </li>
          </ol>
        </nav>

        <span className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-[0.05em] text-marinho uppercase">
          <span aria-hidden="true">·</span>
          <span>{showType ? review.type : kindLabel}</span>
        </span>
      </div>

      <h1 className="mt-2.5 max-w-5xl font-condensada text-[37px] leading-[1.03] font-black text-balance font-stretch-extra-condensed md:mt-3 md:text-6xl">
        <span className="marca-texto marca-texto-entra">{review.title}</span>
      </h1>

      <p className="mt-2.5 max-w-3xl font-editorial text-[13px] leading-snug text-marinho-suave md:mt-4 md:text-base md:leading-relaxed">
        {review.description}
      </p>

      <div className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-semibold text-marinho-suave md:mt-5 md:gap-x-4 md:text-sm">
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
        {/* No celular, o artigo atualizado mostra só a data da atualização: as duas não cabem na linha. */}
        {review.publishedAtISO && (
          <time dateTime={review.publishedAtISO} className={updated ? 'max-md:hidden' : undefined}>
            <span className="md:hidden">{formatDate(review.publishedAtISO, couponCopyLocale, 'short')}</span>
            <span className="max-md:hidden">{formatDate(review.publishedAtISO, couponCopyLocale)}</span>
          </time>
        )}
        {updated && (
          <span>
            {ui.updatedAt}{' '}
            <time dateTime={updated}>
              <span className="md:hidden">{formatDate(updated, couponCopyLocale, 'short')}</span>
              <span className="max-md:hidden">{formatDate(updated, couponCopyLocale)}</span>
            </time>
          </span>
        )}
        {stars && (
          <span className="inline-flex items-center gap-1 font-extrabold text-marinho">
            <Star aria-hidden="true" className="h-4 w-4 fill-amarelo-cupom" />
            <span aria-hidden="true">{stars}</span>
            <span className="sr-only">{copy.ratingLabel(stars)}</span>
          </span>
        )}
        <span className="inline-flex items-center gap-1">
          <Clock aria-hidden="true" className="h-3.5 w-3.5 md:h-4 md:w-4" />
          {ui.readTime(readTime)}
        </span>
      </div>

      {review.changelog && review.changelog.length > 0 && (
        <div className="mt-2.5">
          <ChangelogDetails entries={review.changelog} variant="d2" />
        </div>
      )}
      {unanchoredNotes.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {unanchoredNotes.map((note) => (
            <EditorialNotePill key={note.id || note.label} note={note} labels={noteLabels} variant="d2" />
          ))}
        </div>
      )}

      {Object.keys(languageLinks).length > 1 && (
        <div className="mt-3.5 md:mt-5">
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
            <span className="ms-auto shrink-0 font-bold underline underline-offset-[3px] group-open:hidden">{copy.disclosureMore}</span>
          </summary>
          <p className="pb-3 leading-relaxed text-marinho-suave">{review.editorialNote}</p>
        </details>
      )}

      {/* Uma expressão só: o artigo de uma loja mantém a mesma lista de filhos no payload. */}
      {/* Os cartões das várias lojas usam a largura toda do topo; uma loja só (a do recorte ou a que sobrou das pausadas),
          a da introdução. */}
      {storeBlocks.length > 0 ? (
        <div className={storeBlocks.length > 1 ? 'mt-5 md:mt-8' : 'mt-5 max-w-3xl md:mt-8'}>
          <ArticleStoreCodes
            variant="top"
            blocks={storeBlocks}
            locale={couponCopyLocale}
            reviewSlug={review.slug}
          />
        </div>
      ) : storeBlock && (
        <div className="mt-5 max-w-3xl md:mt-8">
          <ArticleCouponCutout
            variant="top"
            block={storeBlock}
            locale={couponCopyLocale}
            reviewSlug={review.slug}
            storeLabel={storeLabel}
          />
        </div>
      )}

      <figure className="mt-5 md:mt-8">
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
