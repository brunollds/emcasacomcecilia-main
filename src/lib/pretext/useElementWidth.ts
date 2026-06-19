'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';

function getServerSnapshot(): number {
  return 0;
}

function getEmptySnapshot(): number {
  return 0;
}

function subscribeToResize(
  element: Element,
  callback: () => void
): (() => void) | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }

  if (typeof ResizeObserver === 'undefined') {
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  }

  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.target === element) {
        callback();
      }
    }
  });

  observer.observe(element);
  return () => observer.disconnect();
}

/**
 * Retorna a largura atual de um elemento HTML observado via ResizeObserver.
 * No SSR retorna 0.
 */
export function useElementWidth(elementRef: React.RefObject<HTMLElement | null>): number {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    const updateWidth = () => {
      setWidth(element.getBoundingClientRect().width);
    };

    updateWidth();
    return subscribeToResize(element, updateWidth);
  }, [elementRef]);

  return width;
}

/**
 * Hook baseado em useSyncExternalStore para observar largura com menos re-renderizações.
 * Útil quando o valor é consumido por bibliotecas de medição.
 */
export function useElementWidthExternal(
  elementRef: React.RefObject<HTMLElement | null>
): number {
  return useSyncExternalStore(
    (callback) => {
      const element = elementRef.current;
      if (!element) return () => {};
      return subscribeToResize(element, callback) || (() => {});
    },
    () => {
      const element = elementRef.current;
      return element ? element.getBoundingClientRect().width : 0;
    },
    getServerSnapshot
  );
}
