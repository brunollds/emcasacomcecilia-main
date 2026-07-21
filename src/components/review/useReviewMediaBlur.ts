'use client';

import { RefObject, useEffect } from 'react';

export function useReviewMediaBlur<T extends HTMLElement>(ref: RefObject<T | null>): void {
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof window === 'undefined') return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const reset = () => {
      element.style.filter = 'blur(0px)';
      element.style.opacity = '1';
    };

    const update = () => {
      if (reducedMotion.matches) {
        reset();
        return;
      }

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 800;
      const blurStart = viewportHeight * 0.45;
      const blurEnd = Math.max(88, viewportHeight * 0.12);
      const progress = Math.max(0, Math.min(1, (blurStart - rect.bottom) / (blurStart - blurEnd)));
      const blur = Math.round(progress * 8 * 10) / 10;
      const opacity = Math.round((1 - progress * 0.22) * 100) / 100;

      element.style.filter = `blur(${blur}px)`;
      element.style.opacity = `${opacity}`;
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        update();
        frame = 0;
      });
    };

    update();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });
    reducedMotion.addEventListener('change', scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      reducedMotion.removeEventListener('change', scheduleUpdate);
      reset();
    };
  }, [ref]);
}
