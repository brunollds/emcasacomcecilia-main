import { House } from 'lucide-react';
import { StoreMark } from '@/components/ui/StoreMark';
import type { ShelfStore } from '@/lib/reviewsShelf';

// O miolo da bolinha da estante: a marca da loja (StoreMark) ou, na "Outros", a casa. Decorativo: o nome
// está ao lado. Fica fora de 'use client' para a página /reviews/outros renderizá-lo no servidor.
export function ShelfStoreMark({
  store,
  imageClassName,
  sizes,
  tilt,
}: {
  store: ShelfStore;
  imageClassName: string;
  sizes: string;
  tilt?: boolean;
}) {
  if (store.icon === 'house') return <House aria-hidden="true" className="size-[42%] text-marinho" strokeWidth={2.25} />;
  return <StoreMark tab={store} imageClassName={imageClassName} sizes={sizes} tilt={tilt} />;
}
