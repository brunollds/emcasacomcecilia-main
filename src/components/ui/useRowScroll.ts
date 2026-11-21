import { useEffect, useRef, useState } from 'react';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { hasMoreAtEnd, hasMoreAtStart, scrollByReading } from '@/components/ui/direction';

// Fila que rola na horizontal com setas (as ofertas da home e as Novidades de /reviews): se o conteúdo
// passa da largura (as setas só aparecem aí), se ainda há o que ver no início e no fim da leitura (o degradê
// da borda e a vez de cada seta) e o passo das setas. `items` refaz a medida quando a fila muda. Início e fim
// seguem a direção da fila: em LTR, a esquerda e a direita; em RTL, o contrário.
export const ROW_ARROW = `flex size-11 items-center justify-center rounded-full border-2 border-marinho bg-white text-marinho hover:bg-marinho hover:text-amarelo-cupom motion-safe:transition-colors ${FOCUS_RING}`;

// Rolagem das setas: suave, salvo com "reduzir movimento".
export function rowScrollBehavior(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

// 'left' e 'right' são os nomes antigos de 'start' e 'end', ainda usados por quem não passou para os novos.
export type RowEdge = 'start' | 'end' | 'left' | 'right';

export function useRowScroll<T extends HTMLElement>(items: unknown) {
  const trackRef = useRef<T>(null);
  const [overflows, setOverflows] = useState(false);
  const [moreAtEnd, setMoreAtEnd] = useState(false);
  const [moreAtStart, setMoreAtStart] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      setOverflows(track.scrollWidth > track.clientWidth);
      setMoreAtEnd(hasMoreAtEnd(track));
      setMoreAtStart(hasMoreAtStart(track));
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

  function scrollTrack(edge: RowEdge) {
    const track = trackRef.current;
    if (!track) return;
    const amount = Math.max(track.clientWidth * 0.8, 280);
    const towardEnd = edge === 'end' || edge === 'right';
    scrollByReading(track, towardEnd ? amount : -amount, rowScrollBehavior());
  }

  // moreToTheRight e moreToTheLeft: os nomes antigos de moreAtEnd e moreAtStart.
  return { trackRef, overflows, moreAtEnd, moreAtStart, moreToTheRight: moreAtEnd, moreToTheLeft: moreAtStart, scrollTrack };
}
