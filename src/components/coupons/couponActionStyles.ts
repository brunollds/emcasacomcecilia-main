import { FOCUS_RING } from '@/components/ui/focusRing';

// Os botões das caixas de código (/cupons, páginas de loja e recortes dos artigos). Ficam fora do CouponBlocks.tsx, que
// carrega as fontes com next/font: assim os testes que renderizam componentes no tsx podem usá-los.

const PRIMARY_LOOK = `flex items-center justify-center gap-2.5 rounded-[10px] border-2 border-marinho bg-laranja px-4 text-center font-extrabold text-marinho transition-colors hover:bg-laranja/85 data-[copied=true]:border-verde-escuro data-[copied=true]:bg-verde-escuro data-[copied=true]:text-white ${FOCUS_RING}`;

const SECONDARY_LOOK = `flex w-full items-center justify-center gap-2 rounded-[10px] border-2 border-marinho bg-white px-4 text-center font-extrabold text-marinho transition-colors hover:bg-creme data-[copied=true]:border-verde-escuro data-[copied=true]:bg-verde-claro data-[copied=true]:text-verde-escuro ${FOCUS_RING}`;

export const PRIMARY_ACTION = `min-h-[52px] text-base ${PRIMARY_LOOK}`;

export const SECONDARY_ACTION = `min-h-12 text-[15px] ${SECONDARY_LOOK}`;

// Os recortes do artigo (topo e lateral): no celular, os dois com 44 px (o mínimo de toque) e a letra 10% menor.
export const PRIMARY_ACTION_COMPACT = `min-h-11 text-[15px] md:min-h-[52px] md:text-base ${PRIMARY_LOOK}`;

export const SECONDARY_ACTION_COMPACT = `min-h-11 text-sm md:min-h-12 md:text-[15px] ${SECONDARY_LOOK}`;
