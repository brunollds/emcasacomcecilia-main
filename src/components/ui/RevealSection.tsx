'use client';

import { useEffect, useRef, type ComponentPropsWithoutRef } from 'react';

// Seção da home que a rolagem revela: o marca-texto do título (.marca-texto) e os cards (.revela, com
// --i) entram quando a seção chega à tela, uma vez. Só esconde depois de montar e só a seção que ainda
// está abaixo da tela: sem JavaScript, com erro ou com "reduzir movimento", tudo aparece como está.
// Os estilos estão no globals.css.
export function RevealSection(props: ComponentPropsWithoutRef<'section'>) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (section.getBoundingClientRect().top < window.innerHeight) return;
    section.dataset.reveal = 'pending';
    // Revela quando o topo da seção passa de 85% da altura da tela.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        section.dataset.reveal = 'done';
        observer.disconnect();
      },
      { rootMargin: '0px 0px -15% 0px' }
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      if (section.dataset.reveal === 'pending') delete section.dataset.reveal;
    };
  }, []);

  return <section ref={ref} {...props} />;
}
