'use client';

import { useEffect, useRef, type ComponentPropsWithoutRef } from 'react';

// Seção da home que a rolagem revela: o marca-texto do título (.marca-texto) e os cards (.revela, com
// --i) entram quando a seção chega à tela, ou quando o foco do teclado entra nela, uma vez. Só esconde
// depois de montar e só a seção que ainda está abaixo da tela: sem JavaScript, com erro ou com "reduzir
// movimento", tudo aparece como está. Os estilos estão no globals.css.
export function RevealSection(props: ComponentPropsWithoutRef<'section'>) {
  const ref = useRef<HTMLElement>(null);

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
  }, []);

  return <section ref={ref} {...props} />;
}
