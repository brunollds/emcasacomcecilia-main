'use client';

import {
  useEffect,
  useRef,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { StoreMark } from '@/components/ui/StoreMark';
import { useBubbleTilt } from '@/components/ui/useBubbleTilt';
import { isRtl, readingOffset, readingScroll, scrollByReading, scrollToReading } from '@/components/ui/direction';
import { ROW_ARROW, rowScrollBehavior, useRowScroll } from '@/components/ui/useRowScroll';
import type { HomeCopy } from '@/components/sections/homeCopy';
import { CECILIA_TAB_ID, getTabAnchor, getTabOrder, parseTabHash, type HomeStoreTab } from '@/lib/homeStoreTabs';

// A faixa de bolinhas da vitrine, no padrão de abas: a da Cecília e uma por loja. A faixa é uma linha só
// que rola na horizontal, no celular e no computador: a bolinha seguinte aparece pela metade, um degradê
// em cada borda some quando não há mais para aquele lado e, a partir de md, uma seta em cada ponta anda
// a faixa (as setas ficam fora do tablist, que só pode ter abas). No celular as bolinhas entram pelo fim da
// leitura na carga (.bolinha no globals.css) e a faixa dá um empurrãozinho uma vez por sessão. As imagens das
// bolinhas carregam já (loading="eager", sem fetchpriority, que é da imagem do story): a faixa está
// sempre na primeira tela.

// O lado físico de onde o painel novo entra: 1 pela direita, -1 pela esquerda (o --painel-de é um translate).
export type TabDirection = 1 | -1;

const NUDGE_PX = 96;
const NUDGE_DELAY_MS = 1100;
const NUDGE_BACK_MS = 650;
const NUDGE_KEY = 'home-store-strip-nudge';

// Sem sessionStorage (bloqueado ou numa pré-visualização), conta como feito: o empurrão não se repete.
function alreadyNudged() {
  try {
    return window.sessionStorage.getItem(NUDGE_KEY) === '1';
  } catch {
    return true;
  }
}

function markNudged() {
  try {
    window.sessionStorage.setItem(NUDGE_KEY, '1');
  } catch {
    // Sem storage não há onde guardar.
  }
}

type HomeStoreStripProps = {
  tabs: HomeStoreTab[];
  ceciliaPhoto: string;
  selected: string;
  onSelect: (tabId: string, direction: TabDirection) => void;
  copy: HomeCopy;
};

export function HomeStoreStrip({ tabs, ceciliaPhoto, selected, onSelect, copy }: HomeStoreStripProps) {
  const order = getTabOrder(tabs.map(({ slug }) => slug));
  const { trackRef: stripRef, moreAtEnd, moreAtStart, scrollTrack } = useRowScroll<HTMLDivElement>(tabs);
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());
  // Qualquer toque, roda do mouse ou tecla na faixa cancela o empurrãozinho.
  const touched = useRef(false);

  // Quando as bolinhas passam da largura da faixa, a escolhida vem para o meio dela.
  useEffect(() => {
    const strip = stripRef.current;
    const tab = tabRefs.current.get(selected);
    if (!strip || !tab || strip.scrollWidth <= strip.clientWidth) return;
    scrollToReading(strip, readingOffset(strip, tab) - (strip.clientWidth - tab.offsetWidth) / 2, rowScrollBehavior());
  }, [selected, stripRef]);

  // O empurrãozinho, depois da entrada das bolinhas (só no celular): só com a faixa no começo, sem
  // ninguém ter mexido nela e sem a página ter aberto numa loja pelo endereço (#loja-…).
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(min-width: 768px)').matches) return;
    const slugs = tabs.map(({ slug }) => slug);
    if (parseTabHash(window.location.hash, slugs) !== null || alreadyNudged()) return;
    const timers: number[] = [];
    timers.push(
      window.setTimeout(() => {
        // Aberta numa aba de fundo, ninguém vê: não gasta o empurrãozinho da sessão.
        if (document.visibilityState !== 'visible') return;
        if (touched.current || readingScroll(strip) > 0 || strip.scrollWidth <= strip.clientWidth) return;
        markNudged();
        scrollByReading(strip, NUDGE_PX, 'smooth');
        timers.push(
          window.setTimeout(() => {
            if (!touched.current) scrollToReading(strip, 0, 'smooth');
          }, NUDGE_BACK_MS)
        );
      }, NUDGE_DELAY_MS)
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [tabs, stripRef]);

  function markTouched() {
    touched.current = true;
  }

  // O lado físico do fim da leitura: a direita em LTR, a esquerda em RTL.
  function forwardSide(): TabDirection {
    return stripRef.current && isRtl(stripRef.current) ? -1 : 1;
  }

  // Com o clique, o lado é a posição da bolinha nova em relação à atual.
  function select(tabId: string) {
    const forward = forwardSide();
    onSelect(tabId, order.indexOf(tabId) > order.indexOf(selected) ? forward : -forward as TabDirection);
  }

  // Padrão de abas: setas andam (e voltam ao começo), Home e End vão às pontas. A tecla dá o lado. Em RTL a
  // próxima loja é a da seta para a esquerda.
  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const at = order.indexOf(selected);
    const forward = forwardSide();
    const back = -forward as TabDirection;
    const [nextKey, previousKey] = forward === 1 ? ['ArrowRight', 'ArrowLeft'] : ['ArrowLeft', 'ArrowRight'];
    const moves: Partial<Record<string, [number, TabDirection]>> = {
      [nextKey]: [at + 1, forward],
      [previousKey]: [at - 1, back],
      Home: [0, back],
      End: [order.length - 1, forward],
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    const next = order[(move[0] + order.length) % order.length];
    onSelect(next, move[1]);
    tabRefs.current.get(next)?.focus();
  }

  function registerTab(tabId: string, node: HTMLButtonElement | null) {
    if (node) tabRefs.current.set(tabId, node);
    else tabRefs.current.delete(tabId);
  }

  return (
    <div className="relative -mx-4 md:mx-0">
      <div
        ref={stripRef}
        role="tablist"
        aria-label={copy.tablist}
        onPointerDown={markTouched}
        onWheel={markTouched}
        onKeyDown={markTouched}
        className="flex gap-2.5 overflow-x-auto px-4 pt-1.5 pb-2 [scrollbar-width:none] md:gap-3.5 md:px-2"
      >
        <StoreBubble
          tabId={CECILIA_TAB_ID}
          name="Cecília"
          index={0}
          dark
          selected={selected === CECILIA_TAB_ID}
          onSelect={select}
          onKeyDown={onTabKeyDown}
          register={registerTab}
        >
          <Image src={ceciliaPhoto} alt="" fill sizes="(min-width: 768px) 80px, 64px" loading="eager" className="object-cover" />
        </StoreBubble>
        {tabs.map((tab, index) => (
          <StoreBubble
            key={tab.slug}
            tabId={tab.slug}
            name={tab.brand}
            index={index + 1}
            selected={selected === tab.slug}
            onSelect={select}
            onKeyDown={onTabKeyDown}
            register={registerTab}
          >
            <StoreMark tab={tab} imageClassName="h-[53%] w-[74%]" sizes="60px" loading="eager" tilt />
          </StoreBubble>
        ))}
      </div>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 start-0 w-12 bg-linear-to-r from-white to-transparent motion-safe:transition-opacity motion-safe:duration-200 max-md:hidden rtl:bg-linear-to-l ${
          moreAtStart ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 end-0 w-12 bg-linear-to-l from-white to-transparent motion-safe:transition-opacity motion-safe:duration-200 rtl:bg-linear-to-r ${
          moreAtEnd ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {/* As setas ficam no centro dos discos (80 px + 6 px de folga em cima) e somem quando não há para onde ir. */}
      <button
        type="button"
        onClick={() => scrollTrack('start')}
        aria-label={copy.previousStores}
        className={`${ROW_ARROW} absolute top-6 start-1 max-md:hidden ${moreAtStart ? '' : 'invisible'}`}
      >
        <ChevronLeft aria-hidden="true" className="size-5 rtl:-scale-x-100" />
      </button>
      <button
        type="button"
        onClick={() => scrollTrack('end')}
        aria-label={copy.nextStores}
        className={`${ROW_ARROW} absolute top-6 end-1 max-md:hidden ${moreAtEnd ? '' : 'invisible'}`}
      >
        <ChevronRight aria-hidden="true" className="size-5 rtl:-scale-x-100" />
      </button>
    </div>
  );
}

type StoreBubbleProps = {
  tabId: string;
  name: string;
  // A posição na faixa: atrasa a entrada da bolinha no celular (--i).
  index: number;
  selected: boolean;
  dark?: boolean;
  onSelect: (tabId: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  register: (tabId: string, node: HTMLButtonElement | null) => void;
  children: ReactNode;
};

function StoreBubble({ tabId, name, index, selected, dark, onSelect, onKeyDown, register, children }: StoreBubbleProps) {
  const anchor = getTabAnchor(tabId);
  const { diskRef, onPointerMove, onPointerLeave } = useBubbleTilt<HTMLButtonElement>();

  return (
    <button
      ref={(node) => register(tabId, node)}
      id={anchor}
      type="button"
      role="tab"
      aria-selected={selected}
      aria-controls={`painel-${anchor}`}
      tabIndex={selected ? 0 : -1}
      onClick={() => onSelect(tabId)}
      onKeyDown={onKeyDown}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ '--i': index } as CSSProperties}
      className={`bolinha flex w-[72px] shrink-0 scroll-mt-40 flex-col items-center gap-2 rounded-lg pt-1.5 text-marinho md:w-[92px] ${FOCUS_RING}`}
    >
      <span
        ref={diskRef}
        className={`bolinha-disco relative flex size-16 items-center justify-center overflow-hidden rounded-full md:size-20 ${
          dark ? 'bg-marinho' : 'bg-creme'
        } ${
          selected
            ? 'shadow-[0_0_0_4px_var(--color-amarelo-cupom),0_0_0_6px_var(--color-marinho)]'
            : 'shadow-[0_0_0_2px_var(--color-marinho)]'
        }`}
      >
        {children}
      </span>
      <span className="text-center text-xs leading-tight font-bold">{name}</span>
    </button>
  );
}
