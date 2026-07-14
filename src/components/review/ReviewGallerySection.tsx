'use client';

import Image from 'next/image';
import { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Play, ImageIcon, X } from 'lucide-react';

export interface ReviewGalleryImage {
  image: string;
  alt?: string;
  caption?: string;
  label?: string;
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

function useCarousel() {
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
    track.scrollBy({ left: direction * (cardWidth + gapRef.current), behavior: 'smooth' });
  }, []);

  return { trackRef, scrollByCard };
}

function PhotoLightbox({
  images,
  active,
  onClose,
  onPrevious,
  onNext,
}: {
  images: ReviewGalleryImage[];
  active: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const current = images[active];
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        data-lightbox-control
        className="absolute right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#0f1419] shadow-lg transition-transform hover:scale-110 active:scale-95"
        aria-label="Fechar imagem ampliada"
      >
        <X className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrevious();
        }}
        data-lightbox-control
        className="absolute left-4 top-1/2 z-50 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#0f1419] shadow-lg transition-transform hover:scale-110 active:scale-95 md:flex"
        aria-label="Imagem anterior"
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
        className="absolute right-4 top-1/2 z-50 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#0f1419] shadow-lg transition-transform hover:scale-110 active:scale-95 md:flex"
        aria-label="Próxima imagem"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div
        className="relative h-[80vh] w-full max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={current.image}
          alt={current.alt || current.caption || 'Imagem da galeria'}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>

      {current.caption && (
        <p className="absolute bottom-6 max-w-2xl px-4 text-center text-sm text-white/80">
          {current.caption}
        </p>
      )}
    </div>
  );
}

function PhotoCarousel({
  images,
  title,
  onOpen,
}: {
  images: ReviewGalleryImage[];
  title?: string;
  onOpen: (index: number) => void;
}) {
  const { trackRef, scrollByCard } = useCarousel();

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-12 bg-gradient-to-r from-white to-transparent lg:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] hidden w-12 bg-gradient-to-l from-white to-transparent lg:block" />

      <div
        ref={trackRef}
        className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden py-2 lg:px-6"
        aria-label="Galeria de fotos"
      >
        {images.map((img, index) => (
          <button
            key={`${img.image}-${index}`}
            type="button"
            data-gallery-card
            onClick={() => onOpen(index)}
            className="group relative w-[260px] flex-shrink-0 snap-start overflow-hidden rounded-2xl border border-[#1a4d2e]/10 bg-[#f9f9f9] text-left transition-all hover:border-[#ff6b35]/30 hover:shadow-md sm:w-[300px] lg:w-[340px]"
            aria-label={`Ampliar imagem ${index + 1}`}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={img.image}
                alt={img.alt || img.caption || title || 'Foto da galeria'}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 300px, 340px"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1419]/5 to-[#0f1419]/30" />
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white opacity-90 transition-opacity group-hover:opacity-100">
                <Maximize2 className="h-3.5 w-3.5" />
                Ampliar
              </span>
            </div>
            {(img.caption || img.alt) && (
              <p className="line-clamp-2 px-4 py-3 text-sm font-semibold text-[#24313d]">
                {img.caption || img.alt}
              </p>
            )}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollByCard(-1)}
        className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#1a4d2e]/12 bg-white/95 text-[#0f1419] shadow-lg transition-all hover:border-[#ff6b35]/45 hover:text-[#ff6b35] lg:inline-flex"
        aria-label="Fotos anteriores"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={() => scrollByCard(1)}
        className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#1a4d2e]/12 bg-white/95 text-[#0f1419] shadow-lg transition-all hover:border-[#ff6b35]/45 hover:text-[#ff6b35] lg:inline-flex"
        aria-label="Próximas fotos"
      >
        <ChevronRight size={18} />
      </button>

      <div className="mt-4 flex justify-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1a4d2e]/20 text-[#1a4d2e] transition-colors hover:bg-[#1a4d2e] hover:text-white"
          aria-label="Fotos anteriores"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1a4d2e]/20 text-[#1a4d2e] transition-colors hover:bg-[#1a4d2e] hover:text-white"
          aria-label="Próximas fotos"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {images.length > 1 && (
        <p className="mt-2 text-center text-xs text-[#24313d]/50 lg:hidden">
          Arraste para ver mais · {images.length} fotos
        </p>
      )}
    </div>
  );
}

function VideoCarousel({ videos }: { videos: ReviewGalleryVideo[] }) {
  const { trackRef, scrollByCard } = useCarousel();

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-12 bg-gradient-to-r from-white to-transparent lg:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] hidden w-12 bg-gradient-to-l from-white to-transparent lg:block" />

      <div
        ref={trackRef}
        className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden py-2 lg:px-6"
        aria-label="Carrossel de vídeos"
      >
        {videos.map((video) => {
          const url = video.url;
          const thumbnailUrl = video.thumbnailUrl || getYouTubeThumbnail(url);
          const title = video.title || 'Vídeo relacionado';

          return (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              data-gallery-card
              className="group w-[260px] flex-shrink-0 snap-start sm:w-[300px] lg:w-[340px]"
            >
              <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-[#1a4d2e]/10 bg-[#0f1419] transition-all hover:border-[#ff6b35]/30 hover:shadow-md">
                {thumbnailUrl ? (
                  <Image
                    src={thumbnailUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 300px, 340px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#1a4d2e]">
                    <Play className="h-10 w-10 text-white/70" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1419]/10 to-[#0f1419]/60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <Play className="ml-0.5 h-6 w-6 fill-current" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="rounded-full bg-[#ff6b35] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                    Vídeo
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80">
                    YouTube
                  </span>
                </div>
              </div>
              <h4 className="mt-3 px-1 text-center text-[0.95rem] font-semibold leading-snug text-[#24313d] transition-colors group-hover:text-[#ff6b35]">
                {title}
              </h4>
            </a>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => scrollByCard(-1)}
        className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#1a4d2e]/12 bg-white/95 text-[#0f1419] shadow-lg transition-all hover:border-[#ff6b35]/45 hover:text-[#ff6b35] lg:inline-flex"
        aria-label="Vídeos anteriores"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={() => scrollByCard(1)}
        className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#1a4d2e]/12 bg-white/95 text-[#0f1419] shadow-lg transition-all hover:border-[#ff6b35]/45 hover:text-[#ff6b35] lg:inline-flex"
        aria-label="Próximos vídeos"
      >
        <ChevronRight size={18} />
      </button>

      <div className="mt-4 flex justify-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1a4d2e]/20 text-[#1a4d2e] transition-colors hover:bg-[#1a4d2e] hover:text-white"
          aria-label="Vídeos anteriores"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1a4d2e]/20 text-[#1a4d2e] transition-colors hover:bg-[#1a4d2e] hover:text-white"
          aria-label="Próximos vídeos"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {videos.length > 1 && (
        <p className="mt-2 text-center text-xs text-[#24313d]/50 lg:hidden">
          Arraste para ver mais · {videos.length} vídeos
        </p>
      )}
    </div>
  );
}

export function ReviewGallerySection({ images, videos = [], title }: ReviewGallerySectionProps): React.ReactElement | null {
  const hasPhotos = images.length > 0;
  const hasVideos = videos.length > 0;

  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>(hasPhotos ? 'photos' : 'videos');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const imageCount = images.length;
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
    <section className="mt-12 print:hidden">
      <div className="rounded-2xl border border-[#1a4d2e]/10 bg-white p-5 shadow-soft md:p-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff6b35]">Galeria</p>
            <h2 className="mt-1 font-heading text-2xl font-bold text-[#0f1419]">Fotos e vídeos</h2>
          </div>

          {hasPhotos && hasVideos && (
            <div className="flex border-b border-[#1a4d2e]/10">
              <button
                type="button"
                onClick={() => setActiveTab('photos')}
                className={`relative flex items-center gap-2 px-4 py-2.5 text-sm font-bold transition-colors ${
                  activeTab === 'photos' ? 'text-[#1a4d2e]' : 'text-[#24313d]/50 hover:text-[#24313d]/80'
                }`}
              >
                <ImageIcon size={14} />
                Fotos
                {activeTab === 'photos' && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[#ff6b35]" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('videos')}
                className={`relative flex items-center gap-2 px-4 py-2.5 text-sm font-bold transition-colors ${
                  activeTab === 'videos' ? 'text-[#1a4d2e]' : 'text-[#24313d]/50 hover:text-[#24313d]/80'
                }`}
              >
                <Play size={14} />
                Vídeos
                {activeTab === 'videos' && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[#ff6b35]" />
                )}
              </button>
            </div>
          )}
        </div>

        <div className="min-h-[320px]">
          {activeTab === 'photos' && hasPhotos && (
            <PhotoCarousel images={images} title={title} onOpen={openLightbox} />
          )}
          {activeTab === 'videos' && hasVideos && (
            <VideoCarousel videos={videos} />
          )}
        </div>
      </div>

      {lightboxIndex !== null && (
        <PhotoLightbox
          images={images}
          active={lightboxIndex}
          onClose={closeLightbox}
          onPrevious={previousImage}
          onNext={nextImage}
        />
      )}
    </section>
  );
}
