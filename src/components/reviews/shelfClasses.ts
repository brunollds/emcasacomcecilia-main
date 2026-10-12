import { FOCUS_RING } from '@/components/ui/focusRing';

// Classes que as seções da estante (/reviews e subpáginas de loja) repetem: o contêiner de 1200 px da
// home e o título condensado com o marca-texto (o mesmo do HomeSection).
export const SHELF_CONTAINER = 'mx-auto w-full max-w-[1200px] px-4 md:px-10';

export const SHELF_TITLE =
  'font-condensada text-[32px] leading-none font-black text-marinho font-stretch-extra-condensed md:text-5xl';

// A fila de chips de filtro (as categorias da estante, as lojas de /videos): rola no celular, com o degradê
// na borda direita enquanto há chip escondido (moreToTheRight, do useRowScroll), e quebra linha a partir do
// md, sem o degradê. O espaço antes do ${…} deixa o Tailwind ler a classe de antes.
export function filterChipRowClass(moreToTheRight: boolean): string {
  return `hide-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:[mask-image:none] ${
    moreToTheRight ? '[mask-image:linear-gradient(to_right,black_85%,transparent)]' : ''
  }`;
}

// O chip: marinho quando escolhido; 44 px de alvo de toque.
export function filterChipClass(selected: boolean): string {
  return `min-h-11 shrink-0 rounded-full border-2 px-4 text-sm font-bold whitespace-nowrap motion-safe:transition-colors ${
    selected ? 'border-marinho bg-marinho text-white' : 'border-marinho/20 bg-white text-marinho hover:border-marinho'
  } ${FOCUS_RING}`;
}
