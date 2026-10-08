'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent, type ReactNode } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CouponStoreLink } from '@/components/CouponComponents';
import { CopyCodeButton } from '@/components/coupons/CouponActions';
import { asSentence } from '@/components/coupons/CouponBlocks';
import { getCouponCopyLabels } from '@/components/review/couponCopyLocale';
import { TrackedCouponPageLink } from '@/components/review/TrackedCouponPageLink';
import { TrackedHomeLink } from '@/components/TrackedHomeLink';
import { FOCUS_RING, FOCUS_RING_ON_DARK } from '@/components/ui/focusRing';
import { trackEvent } from '@/lib/analytics';
import {
  CECILIA_TAB_ID,
  getDefaultTabId,
  getHomeStoreSelectParameters,
  getTabAnchor,
  getTabOrder,
  parseTabHash,
  type HomeStoreArticle,
  type HomeStoreTab,
} from '@/lib/homeStoreTabs';

const COPY_LABELS = getCouponCopyLabels('pt');
// Foco dentro de caixas com overflow escondido: a borda fica para dentro, senão é cortada.
const FOCUS_INSET = 'focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-marinho';
const TEXT_LINK = `flex min-h-11 items-center text-sm text-marinho underline underline-offset-[3px] ${FOCUS_RING}`;
// Entrada da aba, como no canvas: o painel sai do display:none e o @starting-style anima a volta.
const PANEL_ENTER =
  'motion-safe:transition-[opacity,translate] motion-safe:duration-400 motion-safe:ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-safe:starting:translate-y-2 motion-safe:starting:opacity-30';

// A aba aberta vive no hash da URL. O replaceState não dispara hashchange, então a troca avisa por
// um evento próprio, como o filtro de /reviews.
const TAB_CHANGE_EVENT = 'home-store-tab-change';

function subscribeToTab(onChange: () => void) {
  window.addEventListener('hashchange', onChange);
  window.addEventListener(TAB_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener('hashchange', onChange);
    window.removeEventListener(TAB_CHANGE_EVENT, onChange);
  };
}

type HomeStoreStoriesProps = {
  tabs: HomeStoreTab[];
  ceciliaPanel: ReactNode;
  ceciliaPhoto: string;
};

export function HomeStoreStories({ tabs, ceciliaPanel, ceciliaPhoto }: HomeStoreStoriesProps) {
  const storeSlugs = tabs.map(({ slug }) => slug);
  const order = getTabOrder(storeSlugs);
  const defaultTab = getDefaultTabId(storeSlugs);
  const selected = useSyncExternalStore(
    subscribeToTab,
    () => parseTabHash(window.location.hash, storeSlugs) ?? defaultTab,
    () => defaultTab
  );
  // A animação de entrada só depois da primeira troca: a aba que abre com a página não anima.
  const [switched, setSwitched] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());

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

  function select(tabId: string) {
    if (tabId === selected) return;
    window.history.replaceState(null, '', `#${getTabAnchor(tabId)}`);
    window.dispatchEvent(new Event(TAB_CHANGE_EVENT));
    setSwitched(true);
    trackEvent('home_store_select', getHomeStoreSelectParameters(tabId));
  }

  // Padrão de abas: setas andam (e voltam ao começo), Home e End vão às pontas.
  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const at = order.indexOf(selected);
    const moves: Partial<Record<string, number>> = { ArrowRight: at + 1, ArrowLeft: at - 1, Home: 0, End: order.length - 1 };
    const target = moves[event.key];
    if (target === undefined) return;
    event.preventDefault();
    const next = order[(target + order.length) % order.length];
    select(next);
    tabRefs.current.get(next)?.focus();
  }

  function registerTab(tabId: string, node: HTMLButtonElement | null) {
    if (node) tabRefs.current.set(tabId, node);
    else tabRefs.current.delete(tabId);
  }

  const panelClass = switched ? PANEL_ENTER : undefined;

  return (
    <section
      aria-label="A Cecília e as lojas parceiras"
      className="mx-auto flex w-full max-w-[1200px] flex-col gap-3.5 px-4 pt-3.5 md:gap-[22px] md:px-10 md:pt-8"
    >
      <div
        ref={stripRef}
        role="tablist"
        aria-label="Escolha a Cecília ou uma loja"
        className="relative -mx-4 flex gap-2.5 overflow-x-auto px-4 pt-1.5 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:gap-3.5 md:overflow-visible md:px-0"
      >
        <StoreBubble tabId={CECILIA_TAB_ID} name="Cecília" dark selected={selected === CECILIA_TAB_ID} onSelect={select} onKeyDown={onTabKeyDown} register={registerTab}>
          <Image src={ceciliaPhoto} alt="" fill sizes="(min-width: 768px) 80px, 68px" className="object-cover" />
        </StoreBubble>
        {tabs.map((tab) => (
          <StoreBubble key={tab.slug} tabId={tab.slug} name={tab.brand} selected={selected === tab.slug} onSelect={select} onKeyDown={onTabKeyDown} register={registerTab}>
            <StoreMark tab={tab} imageClassName="h-[46%] w-[64%]" sizes="52px" />
          </StoreBubble>
        ))}
      </div>

      <div
        id={`painel-${getTabAnchor(CECILIA_TAB_ID)}`}
        role="tabpanel"
        aria-labelledby={getTabAnchor(CECILIA_TAB_ID)}
        hidden={selected !== CECILIA_TAB_ID}
        className={panelClass}
      >
        {ceciliaPanel}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.slug}
          id={`painel-${getTabAnchor(tab.slug)}`}
          role="tabpanel"
          aria-labelledby={getTabAnchor(tab.slug)}
          hidden={selected !== tab.slug}
          className={panelClass}
        >
          <StorePanel tab={tab} eager={tab.slug === defaultTab} />
        </div>
      ))}
    </section>
  );
}

type StoreBubbleProps = {
  tabId: string;
  name: string;
  selected: boolean;
  dark?: boolean;
  onSelect: (tabId: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  register: (tabId: string, node: HTMLButtonElement | null) => void;
  children: ReactNode;
};

function StoreBubble({ tabId, name, selected, dark, onSelect, onKeyDown, register, children }: StoreBubbleProps) {
  const anchor = getTabAnchor(tabId);

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
      className={`group flex w-20 shrink-0 scroll-mt-40 flex-col items-center gap-2 rounded-lg pt-1.5 text-marinho md:w-[92px] ${FOCUS_RING}`}
    >
      <span
        className={`relative flex size-[68px] items-center justify-center overflow-hidden rounded-full motion-safe:group-hover:scale-106 motion-safe:transition-transform motion-safe:duration-250 md:size-20 ${
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
function StoreMark({ tab, imageClassName, sizes }: { tab: HomeStoreTab; imageClassName: string; sizes: string }) {
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

function StorePanel({ tab, eager }: { tab: HomeStoreTab; eager: boolean }) {
  const [current, setCurrent] = useState(0);
  const count = tab.articles.length;
  const move = (step: number) => setCurrent((index) => (index + step + count) % count);

  return (
    <div className="flex flex-col gap-4 md:gap-[22px]">
      <CodeBanner tab={tab} />
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
        {count > 0 ? (
          <ArticleStory article={tab.articles[current]} index={current} count={count} onMove={move} eager={eager} />
        ) : null}
        <ArticleList tab={tab} current={current} onPick={setCurrent} />
      </div>
    </div>
  );
}

// O recorte do código: parte laranja com logo, rótulo e oferta; parte creme com o código e os links.
function CodeBanner({ tab }: { tab: HomeStoreTab }) {
  const titleId = `titulo-${getTabAnchor(tab.slug)}`;

  return (
    <section
      aria-labelledby={titleId}
      className="grid overflow-hidden rounded-[14px] border-2 border-marinho shadow-[0_4px_0_var(--color-marinho)] md:grid-cols-2 lg:shadow-[0_6px_0_var(--color-marinho)]"
    >
      <div className="relative flex items-center gap-3.5 border-b-[3px] border-dashed border-marinho bg-laranja p-4 md:gap-5 md:border-r-[3px] md:border-b-0 md:px-7 md:py-6">
        <span className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-marinho bg-creme md:size-[88px]">
          <StoreMark tab={tab} imageClassName="h-1/2 w-[68%]" sizes="(min-width: 768px) 60px, 44px" />
        </span>
        <div className="flex min-w-0 flex-col gap-1.5">
          <h2 id={titleId} className="font-condensada text-[26px] leading-none font-black text-marinho font-stretch-extra-condensed md:text-[34px]">
            {tab.label}
          </h2>
          <p className="text-[13px] leading-[1.45] font-semibold text-marinho md:text-sm">
            <span className="block font-extrabold">{tab.discount}</span>
            {asSentence(tab.description)}
          </p>
        </div>
        {/* Picotes do cupom, no começo e no fim da linha tracejada. */}
        <span aria-hidden="true" className="absolute -bottom-3 -left-3 size-[18px] rounded-full border-2 border-marinho bg-white md:-top-3 md:-right-3 md:bottom-auto md:left-auto" />
        <span aria-hidden="true" className="absolute -right-3 -bottom-3 size-[18px] rounded-full border-2 border-marinho bg-white" />
      </div>
      <div className="flex flex-col justify-center gap-2 bg-creme px-4 pt-3.5 pb-3 md:gap-3 md:px-7 md:py-6">
        {tab.code ? (
          <div className="group/codigo flex flex-col gap-2 md:gap-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="-ml-1 rounded px-1 py-0.5 font-codigo text-2xl font-extrabold tracking-[0.04em] break-all text-balance text-marinho group-has-[[data-copied=true]]/codigo:bg-amarelo-cupom motion-safe:transition-colors motion-safe:duration-700 motion-safe:group-has-[[data-copied=true]]/codigo:duration-0 md:text-[38px]">
                {tab.code}
              </span>
              <CopyCodeButton
                code={tab.code}
                brand={tab.slug}
                placement="home_store_banner"
                ariaLabel={COPY_LABELS.copyCoupon(tab.code)}
                copiedStatus={tab.hints.copied}
                copiedChildren={COPY_LABELS.copied}
                className={`flex min-h-11 min-w-[104px] shrink-0 items-center justify-center rounded-[10px] border-2 border-marinho bg-marinho px-[18px] text-[15px] font-extrabold text-white data-[copied=true]:bg-amarelo-cupom data-[copied=true]:text-marinho md:min-h-12 ${FOCUS_RING}`}
              >
                {COPY_LABELS.copy}
              </CopyCodeButton>
            </div>
            <p className="text-[13px] font-medium text-marinho-suave">
              <span className="group-has-[[data-copied=true]]/codigo:hidden">{tab.hints.copy}</span>
              <span className="hidden group-has-[[data-copied=true]]/codigo:inline">{tab.hints.copied}</span>
            </p>
          </div>
        ) : null}
        <div className="flex flex-wrap gap-x-5">
          <CouponStoreLink
            href={tab.storeUrl}
            brand={tab.slug}
            couponCode={tab.code}
            placement="home_store_banner"
            className={`${TEXT_LINK} font-extrabold`}
          >
            {tab.storeLinkLabel}
          </CouponStoreLink>
          <TrackedCouponPageLink
            href={tab.storePageUrl}
            placement="home_store_page"
            linkLabel="Ver a página da loja"
            className={`${TEXT_LINK} font-bold`}
          >
            Ver a página da loja
          </TrackedCouponPageLink>
        </div>
      </div>
    </section>
  );
}

type ArticleStoryProps = {
  article: HomeStoreArticle;
  index: number;
  count: number;
  onMove: (step: number) => void;
  eager: boolean;
};

// Só no desktop: o artigo atual em destaque, com cores alternadas como no canvas.
function ArticleStory({ article, index, count, onMove, eager }: ArticleStoryProps) {
  const dark = index % 2 === 1;
  // A primeira imagem da aba que abre com a página é a do LCP no desktop: carrega já e com prioridade.
  const eagerImage = eager && index === 0;

  return (
    <article className="hidden min-w-0 flex-[1_1_420px] flex-col overflow-hidden rounded-[14px] border-2 border-marinho bg-white lg:flex">
      <div className="relative h-[300px] bg-creme">
        {article.image ? (
          // Abaixo de 1024 px o story fica escondido; o sizes de 1px faz o navegador baixar a menor versão.
          <Image
            src={article.image}
            alt=""
            fill
            loading={eagerImage ? 'eager' : 'lazy'}
            fetchPriority={eagerImage ? 'high' : 'auto'}
            sizes="(min-width: 1024px) 560px, 1px"
            className="object-cover"
          />
        ) : null}
      </div>
      {count > 1 ? (
        <div aria-hidden="true" className="flex h-1.5 bg-marinho/15">
          {Array.from({ length: count }, (_, step) => (
            <span key={step} className={`flex-1 border-r border-white last:border-r-0 ${step === index ? 'bg-laranja' : ''}`} />
          ))}
        </div>
      ) : null}
      <div className={`flex flex-1 flex-col justify-between gap-3.5 p-5 ${dark ? 'bg-marinho' : 'bg-white'}`}>
        <div className="flex flex-col gap-2.5">
          <p className={`text-[13px] leading-snug font-bold ${dark ? 'text-white' : 'text-marinho-suave'}`}>{article.type}</p>
          <h3
            className={`font-condensada text-[34px] leading-none font-black tracking-[-0.01em] font-stretch-extra-condensed ${
              dark ? 'text-amarelo-cupom' : 'text-marinho'
            }`}
          >
            {article.title}
          </h3>
        </div>
        <TrackedHomeLink
          href={article.href}
          placement="home_store_articles"
          linkLabel={article.title}
          aria-label={`Ler o artigo: ${article.title}`}
          className={`flex min-h-12 items-center justify-center rounded-[10px] border-2 text-[15px] font-extrabold ${
            dark ? `border-amarelo-cupom bg-amarelo-cupom text-marinho ${FOCUS_RING_ON_DARK}` : `border-marinho bg-marinho text-white ${FOCUS_RING}`
          }`}
        >
          Ler o artigo
        </TrackedHomeLink>
      </div>
      {count > 1 ? (
        <div className="flex items-center justify-between border-t-2 border-marinho/15 bg-white px-4 py-3">
          <button type="button" onClick={() => onMove(-1)} aria-label="Artigo anterior" className={`flex size-11 items-center justify-center rounded-lg text-marinho ${FOCUS_RING}`}>
            <ChevronLeft aria-hidden="true" className="size-[22px]" />
          </button>
          <span aria-live="polite" className="text-[13px] font-bold text-marinho-suave">
            {index + 1} / {count}
          </span>
          <button type="button" onClick={() => onMove(1)} aria-label="Próximo artigo" className={`flex size-11 items-center justify-center rounded-lg text-marinho ${FOCUS_RING}`}>
            <ChevronRight aria-hidden="true" className="size-[22px]" />
          </button>
        </div>
      ) : null}
    </article>
  );
}

// No desktop cada item leva o story até ele; abaixo de 1024 px, sem story, o item é o link do artigo.
function ArticleList({ tab, current, onPick }: { tab: HomeStoreTab; current: number; onPick: (index: number) => void }) {
  return (
    <div className="w-full self-start overflow-hidden rounded-[14px] border-2 border-marinho bg-white lg:w-auto lg:flex-[1_1_340px]">
      <h3 className="bg-marinho px-4 py-3.5 font-condensada text-2xl leading-none font-black text-amarelo-cupom font-stretch-extra-condensed lg:text-[28px]">
        {tab.listTitle}
      </h3>
      {tab.articles.length > 0 ? (
        <ul>
          {tab.articles.map((article, index) => (
            <li key={article.slug} className="border-b-[1.5px] border-marinho/15">
              <button
                type="button"
                onClick={() => onPick(index)}
                aria-current={index === current ? 'true' : undefined}
                className={`hidden w-full items-center gap-3 px-4 py-3 text-left text-marinho lg:flex ${
                  index === current ? 'bg-creme' : 'bg-white hover:bg-creme/60'
                } ${FOCUS_INSET}`}
              >
                <ArticleThumb image={article.image} className="h-[52px] w-16" />
                <ArticleText article={article} />
              </button>
              <TrackedHomeLink
                href={article.href}
                placement="home_store_articles"
                linkLabel={article.title}
                className={`flex items-center gap-3 px-4 py-3 text-marinho lg:hidden ${FOCUS_INSET}`}
              >
                <ArticleThumb image={article.image} className="h-14 w-[72px]" />
                <ArticleText article={article} />
              </TrackedHomeLink>
            </li>
          ))}
        </ul>
      ) : (
        <p className="p-4 text-sm leading-normal font-semibold text-marinho">{tab.emptyText}</p>
      )}
      {tab.allArticles ? (
        <TrackedHomeLink
          href={tab.allArticles.href}
          placement="home_store_articles"
          linkLabel={tab.allArticles.label}
          className={`flex min-h-12 items-center px-4 text-sm font-extrabold text-marinho underline underline-offset-[3px] ${FOCUS_INSET}`}
        >
          {tab.allArticles.label}
        </TrackedHomeLink>
      ) : null}
    </div>
  );
}

function ArticleThumb({ image, className }: { image?: string; className: string }) {
  return (
    <span className={`relative shrink-0 overflow-hidden rounded-md bg-creme ${className}`}>
      {image ? <Image src={image} alt="" fill sizes="72px" className="object-cover" /> : null}
    </span>
  );
}

function ArticleText({ article }: { article: HomeStoreArticle }) {
  return (
    <span className="flex min-w-0 flex-col gap-0.5">
      <span className="text-xs font-bold text-marinho-suave">{article.type}</span>
      <span className="text-sm leading-[1.35] font-bold lg:text-[13px]">{article.title}</span>
    </span>
  );
}
