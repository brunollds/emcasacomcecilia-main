'use client';

import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useState, useRef, useCallback, useEffect, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Play, ImageIcon, X } from 'lucide-react';
import { SectionHeadingReveal } from '@/components/editorial/SectionHeadingReveal';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { ROW_ARROW, rowScrollBehavior } from '@/components/ui/useRowScroll';
import type { Locale } from '@/lib/i18n/locales';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';
import { getArticleCopy } from './articleCopy';
import { getGalleryCopy } from './galleryCopy';

export interface ReviewGalleryImage {
  image?: string;
  url?: string;
  alt?: string;
  caption?: string;
  label?: string;
  objectFit?: 'cover' | 'contain';
  aspectRatio?: number;
}

export interface ReviewGalleryVideo {
  url: string;
  title?: string;
  thumbnailUrl?: string;
}

export interface ReviewGallerySectionProps {
  images: ReviewGalleryImage[];
  videos?: ReviewGalleryVideo[];
  title?: string;
  locale?: Locale;
}

export function normalizeReviewGalleryImages(
  images: ReviewGalleryImage[] | null | undefined
): Array<ReviewGalleryImage & { image: string }> {
  if (!Array.isArray(images)) return [];

  return images.flatMap((item) => {
    const image = typeof item.image === 'string' && item.image ? item.image : item.url;
    return typeof image === 'string' && image ? [{ ...item, image }] : [];
  });
}

export function getReviewGalleryImagePresentation(image: ReviewGalleryImage) {
  return {
    aspectRatio: typeof image.aspectRatio === 'number'
      && Number.isFinite(image.aspectRatio) && image.aspectRatio > 0
      ? image.aspectRatio
      : 4 / 3,
    objectFit: image.objectFit === 'contain' ? 'contain' : 'cover',
  };
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:(?:m\.)?youtube\.com\/(?:shorts\/|watch\?(?:.*&)?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match?.[1] ?? null;
}

function getYouTubeThumbnail(url: string): string {
  const id = extractYouTubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : '';
}

// Largura do cartão no carrossel; sozinho, o cartão ocupa a coluna até um limite.
const CAROUSEL_CARD = 'w-[260px] flex-shrink-0 snap-start sm:w-[300px] lg:w-[340px]';
const SINGLE_CARD = 'w-full max-w-xl';
const CARD_SIZES = '(max-width: 640px) 260px, (max-width: 1024px) 300px, 340px';
const SINGLE_SIZES = '(max-width: 640px) 100vw, 576px';

function PhotoLightbox({
  images,
  active,
  onClose,
  onPrevious,
  onNext,
  locale,
}: {
  images: ReviewGalleryImage[];
  active: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  locale: Locale;
}) {
  const current = images[active];
  const copy = getGalleryCopy(locale);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const browsable = images.length > 1;

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onPrevious();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onNext();
      }
      if (event.key === 'Tab') {
        const focusable = Array.from(
          document.querySelectorAll<HTMLElement>('[data-lightbox-control]')
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose, onNext, onPrevious]);

  if (!current || typeof document === 'undefined') return null;

  const lightboxButton = `absolute z-50 flex h-11 w-11 items-center justify-center rounded-full border-2 border-marinho bg-white text-marinho shadow-lg hover:bg-amarelo-cupom ${FOCUS_RING}`;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex min-h-[100dvh] items-center justify-center overscroll-contain bg-black/90 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))]"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        data-lightbox-control
        className={`${lightboxButton} right-[max(0.75rem,env(safe-area-inset-right))] top-[max(0.75rem,env(safe-area-inset-top))]`}
        aria-label={copy.closeImage}
      >
        <X className="h-6 w-6" />
      </button>

      {browsable && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            data-lightbox-control
            className={`${lightboxButton} left-4 top-1/2 hidden -translate-y-1/2 md:flex`}
            aria-label={copy.previousImage}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            data-lightbox-control
            className={`${lightboxButton} right-4 top-1/2 hidden -translate-y-1/2 md:flex`}
            aria-label={copy.nextImage}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <div
        className="relative flex h-[min(82dvh,900px)] w-full max-w-6xl items-center justify-center overflow-hidden rounded-xl bg-white p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-full w-full">
          <Image
            src={resolveMediaUrl(current.image)}
            alt={current.alt || current.caption || copy.imageAlt}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      {current.caption && (
        <p className="absolute bottom-6 max-w-2xl px-4 text-center text-sm text-white/80">
          {current.caption}
        </p>
      )}
    </div>,
    document.body
  );
}

function PhotoCard({
  img,
  index,
  title,
  onOpen,
  locale,
  single,
}: {
  img: ReviewGalleryImage & { image: string };
  index: number;
  title?: string;
  onOpen: (index: number) => void;
  locale: Locale;
  single: boolean;
}) {
  const copy = getGalleryCopy(locale);
  const presentation = getReviewGalleryImagePresentation(img);
  const contain = presentation.objectFit === 'contain';

  return (
    <button
      type="button"
      data-gallery-card={single ? undefined : ''}
      onClick={() => onOpen(index)}
      className={`group relative overflow-hidden rounded-[10px] border-2 border-marinho bg-creme text-left text-marinho ${
        single ? SINGLE_CARD : CAROUSEL_CARD
      } ${contain ? 'self-start' : ''} ${FOCUS_RING}`}
      aria-label={copy.enlargeImage(index + 1)}
    >
      <div className="relative" style={{ aspectRatio: presentation.aspectRatio }}>
        <Image
          src={resolveMediaUrl(img.image)}
          alt={img.alt || img.caption || title || copy.photoAlt}
          fill
          className={`motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out ${
            contain ? 'object-contain' : 'object-cover motion-safe:group-hover:scale-105'
          }`}
          sizes={single ? SINGLE_SIZES : CARD_SIZES}
        />
        {!contain && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-marinho/5 to-marinho/30" />
            <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border-2 border-marinho bg-white px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-marinho">
              <Maximize2 className="h-3.5 w-3.5" />
              {copy.enlarge}
            </span>
          </>
        )}
      </div>
      {contain && (
        <span className="mx-4 mt-3 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.12em]">
          <Maximize2 className="h-3.5 w-3.5" />
          {copy.enlarge}
        </span>
      )}
      {(img.caption || img.alt) && (
        <p className="line-clamp-2 px-4 py-3 text-sm font-semibold">{img.caption || img.alt}</p>
      )}
    </button>
  );
}

function VideoCard({ video, locale, single }: { video: ReviewGalleryVideo; locale: Locale; single: boolean }) {
  const copy = getGalleryCopy(locale);
  const thumbnailUrl = video.thumbnailUrl || getYouTubeThumbnail(video.url);
  const title = video.title || getArticleCopy(locale).relatedVideo;

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      data-gallery-card={single ? undefined : ''}
      className={`group block text-marinho ${single ? 'w-full max-w-[340px]' : CAROUSEL_CARD} ${FOCUS_RING}`}
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-[10px] border-2 border-marinho bg-marinho">
        {thumbnailUrl ? (
          <Image
            src={resolveMediaUrl(thumbnailUrl)}
            alt={title}
            fill
            className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-105"
            sizes={CARD_SIZES}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Play className="h-10 w-10 text-white/70" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-marinho/10 to-marinho/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-marinho bg-amarelo-cupom text-marinho motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-110">
            <Play className="ml-0.5 h-6 w-6 fill-current" />
          </div>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="rounded-full border-2 border-marinho bg-laranja px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-marinho">
            {copy.video}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80">YouTube</span>
        </div>
      </div>
      <h3 className="mt-3 px-1 text-center text-[15px] font-extrabold leading-snug group-hover:underline group-hover:underline-offset-[3px]">
        {title}
      </h3>
    </a>
  );
}

// A fila que rola com setas. Com um item só, não há fila: o cartão fica sozinho, sem setas.
function Carousel({
  count,
  label,
  previousLabel,
  nextLabel,
  swipeHint,
  children,
}: {
  count: number;
  label: string;
  previousLabel: string;
  nextLabel: string;
  swipeHint: string;
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const gapRef = useRef<number | null>(null);

  const scrollByCard = useCallback((direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.querySelector('[data-gallery-card]') as HTMLElement | null;
    if (gapRef.current === null) {
      gapRef.current = parseInt(getComputedStyle(track).gap || '16', 10);
    }
    const cardWidth = firstCard?.offsetWidth || 280;
    track.scrollBy({ left: direction * (cardWidth + gapRef.current), behavior: rowScrollBehavior() });
  }, []);

  if (count === 1) return <div className="flex justify-center py-2">{children}</div>;

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden py-2"
        aria-label={label}
      >
        {children}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button type="button" onClick={() => scrollByCard(-1)} className={ROW_ARROW} aria-label={previousLabel}>
          <ChevronLeft size={18} />
        </button>
        <button type="button" onClick={() => scrollByCard(1)} className={ROW_ARROW} aria-label={nextLabel}>
          <ChevronRight size={18} />
        </button>
      </div>

      <p className="mt-2 text-center text-xs font-semibold text-marinho-suave lg:hidden">{swipeHint}</p>
    </div>
  );
}

function TabButton({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon: ReactNode; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative flex min-h-11 items-center gap-2 px-4 text-sm font-extrabold ${
        active ? 'text-marinho' : 'text-marinho-suave hover:text-marinho'
      } ${FOCUS_RING}`}
    >
      {icon}
      {children}
      {active && <span className="absolute bottom-0 left-2 right-2 h-1 rounded-full bg-laranja" />}
    </button>
  );
}

export function ReviewGallerySection({ images, videos = [], title, locale = 'pt' }: ReviewGallerySectionProps): React.ReactElement | null {
  const copy = getGalleryCopy(locale);
  const normalizedImages = normalizeReviewGalleryImages(images);
  const hasPhotos = normalizedImages.length > 0;
  const hasVideos = videos.length > 0;

  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>(hasPhotos ? 'photos' : 'videos');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const imageCount = normalizedImages.length;
  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const previousImage = useCallback(
    () => setLightboxIndex((prev) => (prev === null ? null : prev === 0 ? imageCount - 1 : prev - 1)),
    [imageCount]
  );
  const nextImage = useCallback(
    () => setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % imageCount)),
    [imageCount]
  );

  if (!hasPhotos && !hasVideos) return null;

  return (
    <section data-article="galeria" className="mt-12 mb-10 text-marinho print:hidden">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-marinho-suave">{copy.eyebrow}</p>
          <SectionHeadingReveal as="h2" variant="d2" className="mt-1">
            {hasPhotos && hasVideos ? copy.heading : hasPhotos ? copy.tabPhotos : copy.tabVideos}
          </SectionHeadingReveal>
        </div>

        {hasPhotos && hasVideos && (
          <div className="flex border-b-2 border-marinho/15">
            <TabButton active={activeTab === 'photos'} onClick={() => setActiveTab('photos')} icon={<ImageIcon size={14} />}>
              {copy.tabPhotos}
            </TabButton>
            <TabButton active={activeTab === 'videos'} onClick={() => setActiveTab('videos')} icon={<Play size={14} />}>
              {copy.tabVideos}
            </TabButton>
          </div>
        )}
      </div>

      {activeTab === 'photos' && hasPhotos && (
        <Carousel
          count={imageCount}
          label={copy.photoGallery}
          previousLabel={copy.previousPhotos}
          nextLabel={copy.nextPhotos}
          swipeHint={copy.swipePhotos(imageCount)}
        >
          {normalizedImages.map((img, index) => (
            <PhotoCard
              key={`${img.image}-${index}`}
              img={img}
              index={index}
              title={title}
              onOpen={openLightbox}
              locale={locale}
              single={imageCount === 1}
            />
          ))}
        </Carousel>
      )}
      {activeTab === 'videos' && hasVideos && (
        <Carousel
          count={videos.length}
          label={copy.videoCarousel}
          previousLabel={copy.previousVideos}
          nextLabel={copy.nextVideos}
          swipeHint={copy.swipeVideos(videos.length)}
        >
          {videos.map((video) => (
            <VideoCard key={video.url} video={video} locale={locale} single={videos.length === 1} />
          ))}
        </Carousel>
      )}

      {lightboxIndex !== null && (
        <PhotoLightbox
          images={normalizedImages}
          active={lightboxIndex}
          onClose={closeLightbox}
          onPrevious={previousImage}
          onNext={nextImage}
          locale={locale}
        />
      )}
    </section>
  );
}
