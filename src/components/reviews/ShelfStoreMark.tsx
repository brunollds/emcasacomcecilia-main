import { House } from 'lucide-react';
import { StoreMark } from '@/components/ui/StoreMark';
import type { ShelfStore } from '@/lib/reviewsShelf';

// O miolo da bolinha da estante: o logo (ou as iniciais) da loja ou, na "Outros", a casa. Decorativo: o nome
// está ao lado. Fica fora de 'use client' para a página /reviews/outros renderizá-lo no servidor.
export function ShelfStoreMark({
  store,
  imageClassName,
  sizes,
}: {
  store: ShelfStore;
  imageClassName: string;
  sizes: string;
}) {
  if (store.icon === 'house') return <House aria-hidden="true" className="size-[42%] text-marinho" strokeWidth={2.25} />;
  return <StoreMark tab={store} imageClassName={imageClassName} sizes={sizes} />;
}
