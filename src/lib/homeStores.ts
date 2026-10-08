import type { Coupon } from '@/lib/couponsData';

// Dados da vitrine da home e da subpágina /reviews/loja/{slug}. Recebe as reviews por parâmetro e
// não importa '@/lib/data': quem chama é o servidor, e o componente cliente recebe só o resultado.

export type StorePagePlacement = 'home' | 'reviews-loja';

export function getStorePageUrl(
  store: Pick<Coupon, 'slug' | 'storePageUrl'>,
  placement: StorePagePlacement
): string {
  if (!store.storePageUrl) return `/cupons/${store.slug}`;
  const url = new URL(store.storePageUrl);
  url.searchParams.set('utm_content', placement);
  return url.toString();
}
