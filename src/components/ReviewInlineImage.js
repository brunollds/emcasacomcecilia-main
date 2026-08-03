'use client';

import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Maximize2, X } from 'lucide-react';
import { useReviewMediaBlur } from '@/components/review/useReviewMediaBlur';

function normalizeImages(section, reviewTitle) {
  const images = [];

  const singleSrc = typeof section.image === 'string' ? section.image : section.image?.src;
  if (singleSrc) {
    const fit = typeof section.image === 'string' ? section.imageFit : section.image?.objectFit;
    const caption = typeof section.image === 'string' ? section.imageCaption : section.image?.caption;
    images.push({
      src: singleSrc,
      alt: (typeof section.image === 'string' ? section.imageAlt : section.image?.alt) || section.heading || reviewTitle,
      caption,
      fit: fit === 'portrait' ? 'portrait' : fit === 'wide' ? 'wide' : fit === 'square' ? 'square' : fit === 'contain' ? 'contain' : 'cover',
    });
  }

  if (section.images && section.images.length > 0) {
    for (const item of section.images) {
      images.push({
        src: item.src,
        alt: item.alt || section.heading || reviewTitle,
        caption: item.caption,
        fit: item.objectFit === 'portrait' ? 'portrait' : item.objectFit === 'wide' ? 'wide' : item.objectFit === 'square' ? 'square' : item.objectFit === 'contain' ? 'contain' : 'cover',
      });
    }
  }

  return images;
}

function InlineImageThumbnail({ image, index, onOpen, sizes }) {
  const [pendingReveal, setPendingReveal] = useState(true);
  const isPortrait = image.fit === 'portrait';
  const isContain = image.fit === 'contain';
  const isWide = image.fit === 'wide';
  const isSquare = image.fit === 'square';
  const ref = useRef(null);
  const mediaRef = useRef(null);
  useReviewMediaBlur(mediaRef);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const reveal = () => {
      setPendingReveal(false);
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const frame = window.requestAnimationFrame(reveal);
      return () => window.cancelAnimationFrame(frame);
    }

    // Checagem imediata se já está na viewport para evitar imagens presas em blur.
    const element = ref.current;
    if (element) {
      const rect = element.getBoundingClientRect();
      const inViewport = rect.top < (window.innerHeight || 800) && rect.bottom > 0;
      if (inViewport) {
        const timeoutId = window.setTimeout(reveal, 150);
        return () => window.clearTimeout(timeoutId);
      }
    } else {
      const fallback = window.setTimeout(reveal, 120);
      return () => window.clearTimeout(fallback);
    }

    const fallback = window.setTimeout(reveal, 1200);

    if (typeof IntersectionObserver === 'undefined') {
      const frame = window.requestAnimationFrame(reveal);
      return () => {
        window.clearTimeout(fallback);
        window.cancelAnimationFrame(frame);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(element);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  return (
    <figure
      ref={ref}
      className={`w-full overflow-hidden rounded-[1.25rem] bg-white shadow-sm ${
        pendingReveal ? 'inline-image-reveal-pending' : 'inline-image-reveal-ready'
      }`}
    >
      <button
        ref={mediaRef}
        type="button"
        onClick={(event) => onOpen(index, event.currentTarget)}
        className={`group relative block w-full overflow-hidden rounded-[1.25rem] transition-[filter,opacity] duration-150 ${(isContain || isWide) ? 'bg-white' : 'bg-[#f4f4f5]'}`}
        aria-label={`Ampliar imagem: ${image.alt}`}
      >
        <div
          className={`relative w-full ${
            isPortrait ? 'aspect-[9/16]' : isWide ? 'aspect-[4/1]' : isSquare ? 'aspect-square' : 'aspect-video'
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className={isPortrait || isSquare ? 'object-cover' : (isContain || isWide) ? 'object-contain' : 'object-cover'}
            sizes={sizes}
          />
        </div>
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white opacity-90 transition-opacity group-hover:opacity-100">
          <Maximize2 className="h-3.5 w-3.5" />
          Ampliar
        </span>
      </button>
      {image.caption && (
        <figcaption className="px-2 pt-2.5 text-sm leading-relaxed text-gray-600">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

function Lightbox({ images, currentIndex, onClose, onNext, onPrev }) {
  const image = images[currentIndex];
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  const handleBackdropClick = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'ArrowLeft' && images.length > 1) {
        event.preventDefault();
        onPrev();
        return;
      }

      if (event.key === 'ArrowRight' && images.length > 1) {
        event.preventDefault();
        onNext();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = Array.from(dialog.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));
      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [images.length, onClose, onNext, onPrev]);

  if (!image || typeof document === 'undefined') return null;

  const captionId = image.caption ? `review-lightbox-caption-${currentIndex}` : undefined;

  return createPortal(
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[100] flex min-h-[100dvh] flex-col items-center justify-center overscroll-contain bg-black/90 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))]"
      role="dialog"
      aria-modal="true"
      aria-label={`Imagem ampliada ${currentIndex + 1} de ${images.length}`}
      aria-describedby={captionId}
      tabIndex={-1}
      onClick={handleBackdropClick}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-[max(0.75rem,env(safe-area-inset-right))] top-[max(0.75rem,env(safe-area-inset-top))] z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#0f1419] shadow-lg transition-transform hover:scale-110 active:scale-95"
        aria-label="Fechar imagem ampliada"
      >
        <X className="h-6 w-6" />
      </button>

      <div
        className="relative flex min-h-0 w-full max-w-6xl flex-1 items-center justify-center overflow-hidden rounded-xl bg-white p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-full w-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex shrink-0 items-center gap-4 text-white">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold hover:bg-white/20"
            aria-label="Imagem anterior"
          >
            ←
          </button>
          <span className="text-sm">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold hover:bg-white/20"
            aria-label="Próxima imagem"
          >
            →
          </button>
        </div>
      )}

      {image.caption && (
        <p id={captionId} className="mt-2 max-w-2xl shrink-0 px-3 text-center text-sm text-white/80">
          {image.caption}
        </p>
      )}
    </div>,
    document.body
  );
}

export default function ReviewInlineImage({ section, reviewTitle }) {
  const images = normalizeImages(section, reviewTitle);
  const [openIndex, setOpenIndex] = useState(null);
  const lastTriggerRef = useRef(null);

  const handleOpen = useCallback((index, trigger) => {
    lastTriggerRef.current = trigger;
    setOpenIndex(index);
  }, []);

  const handleClose = useCallback(() => {
    setOpenIndex(null);
    window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
  }, []);

  const handleNext = useCallback(() => {
    setOpenIndex((prev) => (prev === null ? null : (prev + 1) % images.length));
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setOpenIndex((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length));
  }, [images.length]);

  if (images.length === 0) return null;

  const isMulti = images.length > 1;
  const isSinglePortrait = images.length === 1 && images[0].fit === 'portrait';
  const isSingleSquare = images.length === 1 && images[0].fit === 'square';
  const isSingleContain = images.length === 1 && images[0].fit === 'contain';
  const isSingleWide = images.length === 1 && images[0].fit === 'wide';
  const thumbnailSizes = isMulti
    ? '(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) calc((100vw - 4rem) / 2), 336px'
    : isSingleSquare
      ? '(max-width: 768px) min(calc(100vw - 2rem), 448px), 512px'
      : isSinglePortrait
        ? '(max-width: 768px) min(calc(100vw - 2rem), 320px), 320px'
        : '(max-width: 1024px) calc(100vw - 2rem), 672px';

  return (
    <>
      <div className={`mt-6 grid w-full gap-4 ${isMulti ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'} ${isSinglePortrait ? 'mx-auto max-w-[320px]' : isSingleSquare ? 'mx-auto max-w-md md:max-w-lg' : isSingleWide ? 'mx-auto max-w-3xl' : isSingleContain ? 'mx-auto max-w-2xl' : ''}`}>
        {images.map((image, index) => (
          <InlineImageThumbnail
            key={`${image.src}-${index}`}
            image={image}
            index={index}
            onOpen={handleOpen}
            sizes={thumbnailSizes}
          />
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={openIndex}
          onClose={handleClose}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </>
  );
}
