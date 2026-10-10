import { StoreBubbleLink } from '@/components/reviews/StoreBubbleLink';
import { SHELF_CONTAINER, SHELF_TITLE } from '@/components/reviews/shelfClasses';
import { RevealSection } from '@/components/ui/RevealSection';
import type { ShelfPlacement, ShelfStore } from '@/lib/reviewsShelf';

// As bolinhas das lojas com subpágina: "Por loja" em /reviews e "Outras lojas" na subpágina. No celular
// a fila rola na horizontal; a partir de md, quebra linha.
type ReviewsStoreStripProps = { id: string; title: string; stores: ShelfStore[]; placement: ShelfPlacement };

export function ReviewsStoreStrip({ id, title, stores, placement }: ReviewsStoreStripProps) {
  if (stores.length === 0) return null;

  return (
    <RevealSection aria-labelledby={id} className="pb-8 md:pb-12">
      <div className={`${SHELF_CONTAINER} flex flex-col gap-3 md:gap-5`}>
        <h2 id={id} className={SHELF_TITLE}>
          <span className="marca-texto">{title}</span>
        </h2>
        <ul className="hide-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4 pt-1.5 pb-2 md:mx-0 md:flex-wrap md:gap-3.5 md:overflow-visible md:px-0">
          {stores.map((store, index) => (
            <li key={store.slug} className="flex">
              <StoreBubbleLink store={store} index={index} placement={placement} />
            </li>
          ))}
        </ul>
      </div>
    </RevealSection>
  );
}
