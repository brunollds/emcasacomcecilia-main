'use client';

import { useEffect, useRef, type ComponentPropsWithoutRef, type RefObject } from 'react';

// O elemento que a rolagem revela: o marca-texto (.marca-texto) e os cards (.revela, com --i) de dentro dele
// entram quando ele chega à tela, ou quando o foco do teclado entra nele, uma vez. Só esconde depois de
// montar e só o que ainda está abaixo da tela: sem JavaScript, com erro ou com "reduzir movimento", tudo
// aparece como está. Os estilos estão no globals.css.
export function useScrollReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = ref.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (section.getBoundingClientRect().top < window.innerHeight) return;
    const reveal = () => {
      section.dataset.reveal = 'done';
      observer.disconnect();
      section.removeEventListener('focusin', reveal);
    };
    // Revela quando o topo da seção passa de 85% da altura da tela, ou quando o foco do teclado entra
    // num card antes disso (o navegador pode rolar o card focado só até a beira de baixo).
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) reveal();
      },
      { rootMargin: '0px 0px -15% 0px' }
    );
    observer.observe(section);
    section.addEventListener('focusin', reveal);
    // Só esconde com o observer de pé: um erro antes daqui deixa a seção como veio do servidor.
    section.dataset.reveal = 'pending';
    return () => {
      observer.disconnect();
      section.removeEventListener('focusin', reveal);
      if (section.dataset.reveal === 'pending') delete section.dataset.reveal;
    };
  }, [ref]);
}

// Seção da home (e das outras páginas da D2) que a rolagem revela.
export function RevealSection(props: ComponentPropsWithoutRef<'section'>) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);
  return <section ref={ref} {...props} />;
}
