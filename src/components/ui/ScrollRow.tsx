'use client';

import type { ComponentProps } from 'react';

// Fila que rola na horizontal. O Chrome só rola até o elemento focado quando ele está todo
// escondido; o card meio visível ficaria cortado. Com o foco do teclado, o card (o <li>) que não
// cabe inteiro vai para o começo da fila, que é o ponto de encaixe dele: alinhado pelo lado mais
// perto, o snap puxaria a fila de volta ao encaixe anterior. O clique do mouse também foca o link,
// mas aí a fila não se mexe.
export function ScrollRow(props: Omit<ComponentProps<'ul'>, 'onFocus'>) {
  return (
    <ul
      {...props}
      onFocus={(event) => {
        const target = event.target;
        if (!(target instanceof Element) || !target.matches(':focus-visible')) return;
        const item = Array.from(event.currentTarget.children).find((child) => child.contains(target));
        if (!item) return;
        const box = item.getBoundingClientRect();
        const row = event.currentTarget.getBoundingClientRect();
        if (box.left >= row.left && box.right <= row.right) return;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        item.scrollIntoView({ block: 'nearest', inline: 'start', behavior: reduceMotion ? 'auto' : 'smooth' });
      }}
    />
  );
}
