'use client';

import type { CSSProperties } from 'react';
import { TrackedReviewsLink } from '@/components/reviews/TrackedReviewsLink';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { StoreMark } from '@/components/ui/StoreMark';
import { useBubbleTilt } from '@/components/ui/useBubbleTilt';
import type { ShelfPlacement, ShelfStore } from '@/lib/reviewsShelf';

// A bolinha da home como link para a subpágina da loja: o disco inclina com o mouse (useBubbleTilt e as
// classes .bolinha* do globals.css), ganha o anel amarelo com o mouse em cima e, no celular, entra da
// direita pela posição (--i). Embaixo, o nome e o total de artigos.
export function StoreBubbleLink({ store, index, placement }: { store: ShelfStore; index: number; placement: ShelfPlacement }) {
  const { diskRef, onPointerMove, onPointerLeave } = useBubbleTilt<HTMLAnchorElement>();

  return (
    <TrackedReviewsLink
      href={store.href}
      placement={placement}
      linkLabel={store.brand}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ '--i': index } as CSSProperties}
      className={`bolinha group flex w-[84px] shrink-0 flex-col items-center gap-1.5 rounded-lg pt-1.5 pb-1 text-marinho md:w-[100px] ${FOCUS_RING}`}
    >
      <span
        ref={diskRef}
        className="bolinha-disco relative flex size-16 items-center justify-center overflow-hidden rounded-full bg-creme shadow-[0_0_0_2px_var(--color-marinho)] group-hover:shadow-[0_0_0_4px_var(--color-amarelo-cupom),0_0_0_6px_var(--color-marinho)] md:size-20"
      >
        <StoreMark tab={store} imageClassName="bolinha-logo h-[53%] w-[74%]" sizes="60px" />
      </span>
      <span className="text-center text-xs leading-tight font-bold">{store.brand}</span>
      <span className="text-[11px] font-semibold text-marinho-suave">{store.countLabel}</span>
    </TrackedReviewsLink>
  );
}
