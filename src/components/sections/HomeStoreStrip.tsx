'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from 'react';
import Image from 'next/image';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { CECILIA_TAB_ID, getTabAnchor, getTabOrder, parseTabHash, type HomeStoreTab } from '@/lib/homeStoreTabs';

// A faixa de bolinhas da vitrine, no padrão de abas: a da Cecília e uma por loja. No celular a faixa
// rola na horizontal: a quinta bolinha aparece pela metade, um degradê na borda direita some no fim
// da faixa, as bolinhas entram da direita na carga (.bolinha no globals.css) e a faixa dá um
// empurrãozinho uma vez por sessão.

// O lado de onde o painel novo entra: 1 pela direita, -1 pela esquerda.
export type TabDirection = 1 | -1;

const NUDGE_PX = 96;
const NUDGE_DELAY_MS = 1100;
const NUDGE_BACK_MS = 650;
const NUDGE_KEY = 'home-store-strip-nudge';
// Com o mouse na borda da bolinha: a inclinação do disco e o deslocamento do logo.
const TILT_DEG = 12;
const SHIFT_PX = 3;
const TILT_PROPERTIES = ['--rx', '--ry', '--lx', '--ly'];

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
};

export function HomeStoreStrip({ tabs, ceciliaPhoto, selected, onSelect }: HomeStoreStripProps) {
  const order = getTabOrder(tabs.map(({ slug }) => slug));
  const stripRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());
  // Qualquer toque, roda do mouse ou tecla na faixa cancela o empurrãozinho.
  const touched = useRef(false);
  const [moreToTheRight, setMoreToTheRight] = useState(false);

  const updateEdge = useCallback(() => {
    const strip = stripRef.current;
    if (!strip) return;
    setMoreToTheRight(strip.scrollLeft + strip.clientWidth < strip.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateEdge();
    window.addEventListener('resize', updateEdge);
    return () => window.removeEventListener('resize', updateEdge);
  }, [updateEdge]);

  // No celular as bolinhas rolam na horizontal: a escolhida vem para o meio da faixa.
  useEffect(() => {
    const strip = stripRef.current;
    const tab = tabRefs.current.get(selected);
    if (!strip || !tab || strip.scrollWidth <= strip.clientWidth) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    strip.scrollTo({
      left: tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  }, [selected]);

  // O empurrãozinho, depois da entrada das bolinhas: só com a faixa no começo, sem ninguém ter mexido
  // nela e sem a página ter aberto numa loja pelo endereço (#loja-…).
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const slugs = tabs.map(({ slug }) => slug);
    if (parseTabHash(window.location.hash, slugs) !== null || alreadyNudged()) return;
    const timers: number[] = [];
    timers.push(
      window.setTimeout(() => {
        if (touched.current || strip.scrollLeft > 0 || strip.scrollWidth <= strip.clientWidth) return;
        markNudged();
        strip.scrollBy({ left: NUDGE_PX, behavior: 'smooth' });
        timers.push(
          window.setTimeout(() => {
            if (!touched.current) strip.scrollBy({ left: -NUDGE_PX, behavior: 'smooth' });
          }, NUDGE_BACK_MS)
        );
      }, NUDGE_DELAY_MS)
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [tabs]);

  function markTouched() {
    touched.current = true;
  }

  // Com o clique, o lado é a posição da bolinha nova em relação à atual.
  function select(tabId: string) {
    onSelect(tabId, order.indexOf(tabId) > order.indexOf(selected) ? 1 : -1);
  }

  // Padrão de abas: setas andam (e voltam ao começo), Home e End vão às pontas. A tecla dá o lado.
  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const at = order.indexOf(selected);
    const moves: Partial<Record<string, [number, TabDirection]>> = {
      ArrowRight: [at + 1, 1],
      ArrowLeft: [at - 1, -1],
      Home: [0, -1],
      End: [order.length - 1, 1],
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
        aria-label="Escolha a Cecília ou uma loja"
        onScroll={updateEdge}
        onPointerDown={markTouched}
        onWheel={markTouched}
        onKeyDown={markTouched}
        className="flex gap-2.5 overflow-x-auto px-4 pt-1.5 pb-2 [scrollbar-width:none] md:flex-wrap md:gap-3.5 md:overflow-visible md:px-0"
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
          <Image src={ceciliaPhoto} alt="" fill sizes="(min-width: 768px) 80px, 64px" className="object-cover" />
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
            <StoreMark tab={tab} imageClassName="bolinha-logo h-[53%] w-[74%]" sizes="60px" />
          </StoreBubble>
        ))}
      </div>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-white to-transparent motion-safe:transition-opacity motion-safe:duration-200 md:hidden ${
          moreToTheRight ? 'opacity-100' : 'opacity-0'
        }`}
      />
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
  const diskRef = useRef<HTMLSpanElement>(null);

  // Só o mouse inclina, pela posição do ponteiro no disco; no toque, o :active do CSS afunda o disco.
  function tilt(event: PointerEvent<HTMLButtonElement>) {
    const disk = diskRef.current;
    if (event.pointerType !== 'mouse' || !disk) return;
    const box = disk.getBoundingClientRect();
    const x = Math.min(Math.max((event.clientX - box.left) / box.width - 0.5, -0.5), 0.5) * 2;
    const y = Math.min(Math.max((event.clientY - box.top) / box.height - 0.5, -0.5), 0.5) * 2;
    disk.style.setProperty('--rx', `${(-y * TILT_DEG).toFixed(1)}deg`);
    disk.style.setProperty('--ry', `${(x * TILT_DEG).toFixed(1)}deg`);
    disk.style.setProperty('--lx', `${(x * SHIFT_PX).toFixed(1)}px`);
    disk.style.setProperty('--ly', `${(y * SHIFT_PX).toFixed(1)}px`);
  }

  function untilt() {
    for (const property of TILT_PROPERTIES) diskRef.current?.style.removeProperty(property);
  }

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
      onPointerMove={tilt}
      onPointerLeave={untilt}
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

// Logo da loja ou, sem ele, as iniciais (brandIcon). Decorativo: o nome está ao lado.
export function StoreMark({ tab, imageClassName, sizes }: { tab: HomeStoreTab; imageClassName: string; sizes: string }) {
  return tab.logo ? (
    <span className={`relative ${imageClassName}`}>
      <Image src={tab.logo} alt="" fill sizes={sizes} className="object-contain" />
    </span>
  ) : (
    <span aria-hidden="true" className="font-condensada text-xl font-black text-marinho font-stretch-extra-condensed">
      {tab.initials}
    </span>
  );
}
