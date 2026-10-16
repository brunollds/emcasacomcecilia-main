import { useEffect, useRef, useState } from 'react';
import { FOCUS_RING } from '@/components/ui/focusRing';

// Fila que rola na horizontal com setas (as ofertas da home e as Novidades de /reviews): se o conteúdo
// passa da largura (as setas só aparecem aí), se ainda há o que ver à direita e à esquerda (o degradê da
// borda e a vez de cada seta) e o passo das setas. `items` refaz a medida quando a fila muda.
export const ROW_ARROW = `flex size-11 items-center justify-center rounded-full border-2 border-marinho bg-white text-marinho hover:bg-marinho hover:text-amarelo-cupom motion-safe:transition-colors ${FOCUS_RING}`;

// Rolagem das setas: suave, salvo com "reduzir movimento".
export function rowScrollBehavior(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

export function useRowScroll<T extends HTMLElement>(items: unknown) {
  const trackRef = useRef<T>(null);
  const [overflows, setOverflows] = useState(false);
  const [moreToTheRight, setMoreToTheRight] = useState(false);
  const [moreToTheLeft, setMoreToTheLeft] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      setOverflows(track.scrollWidth > track.clientWidth);
      setMoreToTheRight(track.scrollLeft + track.clientWidth < track.scrollWidth - 1);
      setMoreToTheLeft(track.scrollLeft > 1);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(track);
    track.addEventListener('scroll', update, { passive: true });
    return () => {
      observer.disconnect();
      track.removeEventListener('scroll', update);
    };
  }, [items]);

  function scrollTrack(direction: 'left' | 'right') {
    const track = trackRef.current;
    if (!track) return;
    const amount = Math.max(track.clientWidth * 0.8, 280);
    track.scrollBy({ left: direction === 'right' ? amount : -amount, behavior: rowScrollBehavior() });
  }

  return { trackRef, overflows, moreToTheRight, moreToTheLeft, scrollTrack };
}
