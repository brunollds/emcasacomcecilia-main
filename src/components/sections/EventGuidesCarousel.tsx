'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TrackedHomeLink } from '@/components/TrackedHomeLink';
import { readingOffset, scrollToReading } from '@/components/ui/direction';
import { ROW_ARROW, rowScrollBehavior, useRowScroll } from '@/components/ui/useRowScroll';
import { cardImageLook } from '@/lib/cardImage';
import type { HomeEventCarousel, HomeEventGuide } from '@/lib/homeEvents';
import { getDefaultTabId, parseTabHash } from '@/lib/homeStoreTabs';

// A reta final da data na home em português: um carrossel só, com a capa e o título de cada guia, na ordem das
// bolinhas da vitrine. A bolinha escolhida lá em cima traz os guias da loja para o centro e os marca; os outros
// continuam à vista, e arrastar o carrossel não troca a bolinha. Todos os links saem no HTML do servidor.
// Sem imports de dados: entra no bundle da home.

// A aba aberta da vitrine vive no hash da URL; a troca pelo clique avisa por este evento (HomeStoreStories).
const TAB_CHANGE_EVENT = 'home-store-tab-change';

function subscribeToTab(onChange: () => void) {
  window.addEventListener('hashchange', onChange);
  window.addEventListener(TAB_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener('hashchange', onChange);
    window.removeEventListener(TAB_CHANGE_EVENT, onChange);
  };
}

// Onde parar para os guias da loja ficarem no centro: o grupo inteiro, quando cabe; senão, o primeiro guia dela.
function groupScrollTarget(track: HTMLElement, group: HTMLElement[]): number {
  const first = group[0];
  const last = group[group.length - 1];
  const start = readingOffset(track, first);
  const span = readingOffset(track, last) + last.offsetWidth - start;
  const room = track.clientWidth - 2 * parseFloat(getComputedStyle(track).paddingInlineStart);
  const center = start + (span <= Math.max(room, first.offsetWidth) ? span : first.offsetWidth) / 2;
  return center - track.clientWidth / 2;
}

// Leva o carrossel aos guias da loja da aba; loja sem guia (e a aba da Cecília) deixa o carrossel onde está.
function centerStoreGuides(track: HTMLElement, tab: string, behavior: ScrollBehavior): void {
  const group = Array.from(track.children).filter(
    (item): item is HTMLElement => item instanceof HTMLElement && item.dataset.tab === tab
  );
  if (group.length > 0) scrollToReading(track, groupScrollTarget(track, group), behavior);
}

// O desconto só entra no rótulo quando é um número ("12% OFF"); "Promoções e descontos" ficaria maior que o nome.
function guideKicker({ name, label, discount }: HomeEventGuide): string {
  return [name, label, discount && /\d/.test(discount) ? discount : undefined].filter(Boolean).join(' · ');
}

export function EventGuidesCarousel({
  guides,
  carousel,
  focusRing,
  activeRing,
}: {
  guides: HomeEventGuide[];
  carousel: HomeEventCarousel;
  focusRing: string;
  // O contorno dos guias da loja escolhida, na cor que contrasta com a faixa.
  activeRing: string;
}) {
  const { tabSlugs, previousLabel, nextLabel } = carousel;
  const defaultTab = getDefaultTabId(tabSlugs);
  const selected = useSyncExternalStore(
    subscribeToTab,
    () => parseTabHash(window.location.hash, tabSlugs) ?? defaultTab,
    () => defaultTab
  );
  const { trackRef, moreAtStart, moreAtEnd, scrollTrack } = useRowScroll<HTMLUListElement>(guides);
  const opened = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    const opening = !opened.current;
    opened.current = true;
    // A página abre com o carrossel no começo; só quem chega com a loja no endereço (/#loja-damie) já o vê nela.
    if (!track || (opening && selected === defaultTab)) return;
    centerStoreGuides(track, selected, opening ? 'auto' : rowScrollBehavior());
  }, [selected, defaultTab, trackRef]);

  // Tocar de novo na bolinha já aberta não troca a aba, e a vitrine não avisa: quem arrastou o carrossel para longe
  // volta aos guias da loja com esse toque. O toque que troca a aba fica com o efeito de cima.
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const tab = event.target instanceof Element ? event.target.closest('[role="tab"]') : null;
      const track = trackRef.current;
      if (!tab || !track || parseTabHash(`#${tab.id}`, tabSlugs) !== selected) return;
      centerStoreGuides(track, selected, rowScrollBehavior());
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [selected, tabSlugs, trackRef]);

  return (
    <div className="relative">
      {/* O py-2 dá espaço ao contorno da loja escolhida e ao anel de foco. No celular, o primeiro guia começa na
          margem do título, e o próximo aparece pela metade à direita. */}
      <ul
        ref={trackRef}
        className="hide-scrollbar flex snap-x snap-proximity gap-3 overflow-x-auto py-2 max-md:px-4 md:px-2"
      >
        {guides.map((guide) => {
          const look = guide.cover ? cardImageLook(guide.cover.imageFit, guide.cover.imagePosition, 'p-3') : undefined;
          const active = guide.tab !== undefined && guide.tab === selected;
          return (
            <li key={guide.slug} data-tab={guide.tab} className="flex w-[min(74vw,268px)] shrink-0 snap-center">
              <TrackedHomeLink
                href={guide.href}
                prefetch={false}
                placement="home_event"
                linkLabel={guide.title}
                className={`flex min-w-0 flex-1 flex-col overflow-hidden rounded-[10px] border-2 border-marinho bg-white text-marinho motion-safe:transition-[transform,box-shadow] motion-safe:duration-300 motion-safe:hover:-translate-y-0.5 ${active ? activeRing : ''} ${focusRing}`}
              >
                <span className="relative block aspect-video overflow-hidden border-b-2 border-marinho bg-creme">
                  {guide.cover?.image && look ? (
                    <Image src={guide.cover.image} alt="" fill sizes="268px" className={look.className} style={look.style} />
                  ) : null}
                </span>
                <span className="flex min-w-0 flex-col gap-1 p-3">
                  <span className="text-[11px] leading-[1.3] font-extrabold tracking-wide text-marinho-suave uppercase">
                    {guideKicker(guide)}
                  </span>
                  <span className="line-clamp-3 text-sm leading-[1.25] font-extrabold">{guide.title}</span>
                </span>
              </TrackedHomeLink>
            </li>
          );
        })}
      </ul>
      {moreAtStart ? (
        <button
          type="button"
          onClick={() => scrollTrack('start')}
          aria-label={previousLabel}
          className={`absolute -start-5 top-1/2 -translate-y-1/2 max-md:hidden ${ROW_ARROW}`}
        >
          <ChevronLeft aria-hidden="true" className="size-5 rtl:-scale-x-100" />
        </button>
      ) : null}
      {moreAtEnd ? (
        <button
          type="button"
          onClick={() => scrollTrack('end')}
          aria-label={nextLabel}
          className={`absolute -end-5 top-1/2 -translate-y-1/2 max-md:hidden ${ROW_ARROW}`}
        >
          <ChevronRight aria-hidden="true" className="size-5 rtl:-scale-x-100" />
        </button>
      ) : null}
    </div>
  );
}
