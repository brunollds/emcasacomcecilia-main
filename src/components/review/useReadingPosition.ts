'use client';

import { useEffect, useState } from 'react';

export interface TocItem {
  id: string;
  heading: string;
}

export interface ReadingPosition {
  // Posição da seção atual na lista recebida; -1 antes da primeira.
  activeIndex: number;
  // Quanto da página já foi rolado, de 0 a 100.
  progress: number;
}

// A seção atual é a última cujo topo já passou desta linha: 30% da altura da tela, nunca menos
// de 160px. A seção aberta pelo sumário para a 128px do topo (scroll-mt-32) e tem de contar
// como atual mesmo num celular deitado.
const readingLine = () => Math.max(window.innerHeight * 0.3, 160);

// O sumário do sidebar e o do celular leem a seção atual daqui, para nunca discordarem.
export function useReadingPosition(sectionIds: string[]): ReadingPosition {
  const [position, setPosition] = useState<ReadingPosition>({ activeIndex: -1, progress: 0 });
  // Um array novo a cada render não pode reiniciar o efeito; os ids não têm espaço.
  const idsKey = sectionIds.join(' ');

  useEffect(() => {
    const ids = idsKey ? idsKey.split(' ') : [];
    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = readingLine();
      let activeIndex = -1;
      ids.forEach((id, index) => {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= line) activeIndex = index;
      });
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(100, Math.round((window.scrollY / scrollable) * 100)) : 0;
      setPosition((current) =>
        current.activeIndex === activeIndex && current.progress === progress ? current : { activeIndex, progress }
      );
    };
    const scheduleMeasure = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', scheduleMeasure, { passive: true });
    window.addEventListener('resize', scheduleMeasure);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleMeasure);
      window.removeEventListener('resize', scheduleMeasure);
    };
  }, [idsKey]);

  return position;
}
