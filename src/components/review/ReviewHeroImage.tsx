'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export interface ReviewHeroImageProps {
  src: string;
  alt: string;
  isPortrait?: boolean;
  imageAspect?: 'landscape' | 'portrait' | 'square';
  imagePosition?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  imageFit?: 'cover' | 'contain';
  hasProductRating?: boolean;
  rating?: number;
  objectContain?: boolean;
}

function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 767px)').matches;
}

const POSITION_CLASSES = {
  center: 'object-center',
  top: 'object-top',
  bottom: 'object-bottom',
  left: 'object-left',
  right: 'object-right',
};

export function ReviewHeroImage({
  src,
  alt,
  isPortrait = false,
  imageAspect,
  imagePosition = 'center',
  imageFit = 'cover',
  hasProductRating = false,
  rating,
  objectContain = false,
}: ReviewHeroImageProps): React.ReactElement {
  const effectivePortrait = imageAspect === 'portrait' || (!imageAspect && isPortrait);
  const effectiveLandscape = imageAspect === 'landscape';
  const effectiveObjectContain = !imageAspect && objectContain;
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let rafId = 0;

    const update = () => {
      if (!wrapRef.current || !imgRef.current) return;

      if (isMobile()) {
        imgRef.current.style.transform = 'translateY(0px)';
        imgRef.current.style.filter = 'blur(0px)';
        imgRef.current.style.opacity = '1';
        return;
      }

      const scrolled = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Parallax vertical para hero landscape. Reduced motion mantém blur/opacidade,
      // mas remove deslocamento vertical.
      if (!effectivePortrait && !effectiveLandscape && !prefersReduced) {
        const rect = wrapRef.current.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < viewportHeight) {
          const offset = rect.top * 0.25;
          imgRef.current.style.transform = `translateY(${offset}px)`;
        }
      } else {
        imgRef.current.style.transform = 'translateY(0px)';
      }

      // Mantém o hero nítido no começo da leitura e só aplica foco/desfoque
      // depois que o usuário já passou pelo cabeçalho.
      const effectStart = 240;
      const effectEnd = 680;
      const progress = Math.max(0, Math.min(1, (scrolled - effectStart) / (effectEnd - effectStart)));
      const nextBlur = Math.round(progress * 8 * 10) / 10;
      const nextOpacity = Math.round((1 - progress * 0.22) * 100) / 100;

      imgRef.current.style.filter = `blur(${nextBlur}px)`;
      imgRef.current.style.opacity = `${nextOpacity}`;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        update();
        rafId = 0;
      });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, [effectivePortrait, effectiveLandscape]);

  return (
    <div
      ref={wrapRef}
      className={`group relative overflow-hidden rounded-2xl bg-white shadow-medium ${
        effectivePortrait
          ? 'mx-auto max-w-[320px] sm:max-w-[380px] md:max-w-[460px]'
          : effectiveObjectContain
            ? 'mx-auto max-w-[420px] md:max-w-[480px]'
            : ''
      }`}
    >
      <div
        ref={imgRef}
        className={`relative w-full will-change-transform transition-transform duration-75 ${
          effectivePortrait
            ? 'review-hero-portrait-zoom aspect-[9/16] max-h-[680px]'
            : effectiveObjectContain
              ? 'aspect-[4/5] max-h-[560px]'
              : effectiveLandscape
                ? 'aspect-[16/9]'
                : 'aspect-[16/9]'
        }`}
        style={effectivePortrait || effectiveObjectContain || effectiveLandscape ? {} : { height: '120%', marginTop: '-10%' }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={
            effectivePortrait && imageFit === 'contain'
              ? 'object-contain bg-white transition-transform duration-700 group-hover:scale-[1.02] md:p-2'
              : effectivePortrait || effectiveLandscape
                ? `object-cover ${POSITION_CLASSES[imagePosition] || 'object-center'} transition-transform duration-700 group-hover:scale-[1.03]`
                : hasProductRating
                  ? 'object-contain bg-white p-3 transition-transform duration-700 group-hover:scale-[1.02] md:p-5'
                  : effectiveObjectContain
                    ? 'object-contain bg-white p-2 transition-transform duration-700 group-hover:scale-[1.02] md:p-3'
                    : 'object-cover transition-transform duration-700 group-hover:scale-[1.03]'
          }
          sizes={
            isPortrait
              ? '(max-width: 768px) 100vw, 672px'
              : '(max-width: 1200px) 100vw, 1100px'
          }
          priority
        />
      </div>
      {hasProductRating && typeof rating === 'number' && (
        <figcaption className="sr-only">
          Imagem do produto avaliado com nota {rating.toFixed(1)} de 5.
        </figcaption>
      )}
    </div>
  );
}
