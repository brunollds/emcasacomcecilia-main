'use client';

import Image from 'next/image';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Maximize2, X } from 'lucide-react';

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
      fit: fit === 'portrait' ? 'portrait' : fit === 'contain' ? 'contain' : 'cover',
    });
  }

  if (section.images && section.images.length > 0) {
    for (const item of section.images) {
      images.push({
        src: item.src,
        alt: item.alt || section.heading || reviewTitle,
        caption: item.caption,
        fit: item.objectFit === 'portrait' ? 'portrait' : item.objectFit === 'contain' ? 'contain' : 'cover',
      });
    }
  }

  return images;
}

function InlineImageThumbnail({ image, index, onOpen }) {
  const [pendingReveal, setPendingReveal] = useState(true);
  const isPortrait = image.fit === 'portrait';
  const isContain = image.fit === 'contain';
  const ref = useRef(null);

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
        type="button"
        onClick={() => onOpen(index)}
        className={`group relative block w-full overflow-hidden rounded-[1.25rem] ${isContain ? 'bg-white' : 'bg-[#f4f4f5]'}`}
        aria-label={`Ampliar imagem ${index + 1}`}
      >
        <div
          className={`relative w-full ${
            isPortrait ? 'aspect-[9/16]' : 'aspect-video'
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className={isPortrait ? 'object-cover' : isContain ? 'object-contain' : 'object-cover'}
            sizes="(max-width: 768px) 100vw, 50vw"
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

  const handleBackdropClick = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4"
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#0f1419] shadow-lg transition-transform hover:scale-110 active:scale-95"
        aria-label="Fechar imagem ampliada"
      >
        <X className="h-6 w-6" />
      </button>

      <div
        className="relative h-[75vh] w-full max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex items-center gap-4 text-white">
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
        <p className="mt-3 max-w-2xl text-center text-sm text-white/80">
          {image.caption}
        </p>
      )}
    </div>
  );
}

export default function ReviewInlineImage({ section, reviewTitle }) {
  const images = normalizeImages(section, reviewTitle);
  const [openIndex, setOpenIndex] = useState(null);

  const handleNext = useCallback(() => {
    setOpenIndex((prev) => (prev === null ? null : (prev + 1) % images.length));
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setOpenIndex((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length));
  }, [images.length]);

  if (images.length === 0) return null;

  const isMulti = images.length > 1;
  const isSinglePortrait = images.length === 1 && images[0].fit === 'portrait';
  const isSingleContain = images.length === 1 && images[0].fit === 'contain';

  return (
    <>
      <div className={`mt-6 grid w-full gap-4 ${isMulti ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'} ${isSinglePortrait ? 'mx-auto max-w-[320px]' : isSingleContain ? 'mx-auto max-w-[360px]' : ''}`}>
        {images.map((image, index) => (
          <InlineImageThumbnail
            key={`${image.src}-${index}`}
            image={image}
            index={index}
            onOpen={setOpenIndex}
          />
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={openIndex}
          onClose={() => setOpenIndex(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </>
  );
}
