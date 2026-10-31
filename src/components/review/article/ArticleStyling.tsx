'use client';

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { CouponStoreLink } from '@/components/CouponComponents';
import { FOCUS_RING } from '@/components/ui/focusRing';
import type { ContentSectionStyling, StylingItem } from '@/lib/content';
import type { Locale } from '@/lib/i18n/locales';
import { getStylingCopy, type StylingCopy } from '../stylingCopy';

type LinkContext = { affiliate?: string; reviewSlug?: string; copy: StylingCopy };

export type ArticleStylingProps = {
  styling: ContentSectionStyling;
  locale: Locale;
  affiliate?: string;
  reviewSlug?: string;
};

// O card "Como usar / Ocasião / Combina com" dos artigos de roupa, no fim da seção. Cada seção escolhe o modelo:
// `tabs` (o padrão), um card por peça com uma aba por campo, ou `tags`, as peças como etiquetas lado a lado, com
// tudo à vista. Os links das peças da loja são de afiliado e medidos como coupon_store_click em review_styling.
export function ArticleStyling({ styling, locale, affiliate, reviewSlug }: ArticleStylingProps) {
  const copy = getStylingCopy(locale);
  const context = { affiliate, reviewSlug, copy };
  const layout = styling.layout ?? 'tabs';

  return (
    <div data-article="styling" data-layout={layout} className="mt-6 text-marinho">
      {layout === 'tags' ? (
        <StylingTags items={styling.items} context={context} />
      ) : (
        <div className="space-y-4">
          {styling.items.map((item) => (
            <StylingTabsCard key={item.piece} item={item} context={context} />
          ))}
        </div>
      )}
    </div>
  );
}

const SENTENCE = 'styling-sentence font-editorial text-[17px] leading-7 text-marinho';
const MINI_LABEL = 'mb-2 flex items-center gap-1.5 text-xs font-extrabold tracking-[0.1em] text-marinho-suave uppercase';
const PIECE_NAME =
  'font-condensada text-[22px] leading-[1.05] font-black font-stretch-extra-condensed uppercase wrap-anywhere hyphens-auto';

type Panel = { key: string; label: string; content: ReactNode };

function getPanels(item: StylingItem, context: LinkContext): Panel[] {
  const { copy } = context;
  const panels: Panel[] = [];
  if (item.howTo) panels.push({ key: 'howTo', label: copy.howTo, content: <p className={SENTENCE}>{item.howTo}</p> });
  if (item.occasion) panels.push({ key: 'occasion', label: copy.occasion, content: <p className={SENTENCE}>{item.occasion}</p> });
  if (item.pairsWith?.length || item.variants?.length) {
    panels.push({ key: 'pairsWith', label: copy.pairsWith, content: <PairsWith item={item} context={context} /> });
  }
  return panels;
}

// Modelo `tabs`: o nome da peça e as abas no topo; sem JavaScript, só a primeira aba aparece, mas o texto das três
// está no HTML. Com um campo só, o card não tem abas, só o rótulo.
function StylingTabsCard({ item, context }: { item: StylingItem; context: LinkContext }) {
  const id = useId();
  const panels = getPanels(item, context);
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number, focus: boolean) => {
    setActive(index);
    if (focus) tabs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = panels.length - 1;
    const next =
      event.key === 'ArrowRight' ? (index === last ? 0 : index + 1)
      : event.key === 'ArrowLeft' ? (index === 0 ? last : index - 1)
      : event.key === 'Home' ? 0
      : event.key === 'End' ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    select(next, true);
  };

  const tabbed = panels.length > 1;

  return (
    <article className="overflow-hidden rounded-[14px] border-2 border-marinho bg-white">
      <header className="border-b-2 border-marinho bg-creme sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(18rem,56%)]">
        <h3 className={`px-4 pt-3.5 pb-3 sm:self-center sm:px-[18px] ${PIECE_NAME}`}>
          <PieceName item={item} context={context} />
        </h3>
        {tabbed && (
          <div
            role="tablist"
            aria-label={context.copy.tipsFor(item.piece)}
            className="grid border-t-2 border-marinho sm:border-t-0 sm:border-l-2"
            style={{ gridTemplateColumns: `repeat(${panels.length}, minmax(0, 1fr))` }}
          >
            {panels.map((panel, index) => (
              <button
                key={panel.key}
                ref={(element) => {
                  tabs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={`${id}-tab-${panel.key}`}
                aria-controls={`${id}-panel-${panel.key}`}
                aria-selected={index === active}
                tabIndex={index === active ? 0 : -1}
                onClick={() => select(index, false)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={`relative min-h-12 cursor-pointer border-l-2 border-marinho bg-creme px-1.5 pt-2.5 pb-2 text-[13px] leading-tight font-bold text-marinho-suave wrap-anywhere hyphens-auto first:border-l-0 hover:bg-white hover:text-marinho focus-visible:z-10 aria-selected:bg-white aria-selected:font-extrabold aria-selected:text-marinho aria-selected:before:absolute aria-selected:before:inset-x-0 aria-selected:before:top-0 aria-selected:before:h-[5px] aria-selected:before:bg-laranja sm:text-sm ${FOCUS_RING}`}
              >
                {panel.label}
              </button>
            ))}
          </div>
        )}
      </header>
      {panels.map((panel, index) => (
        <section
          key={panel.key}
          id={`${id}-panel-${panel.key}`}
          role={tabbed ? 'tabpanel' : undefined}
          aria-labelledby={tabbed ? `${id}-tab-${panel.key}` : undefined}
          tabIndex={tabbed ? 0 : undefined}
          hidden={tabbed && index !== active}
          className={`p-4 sm:px-5 sm:py-[18px] motion-safe:animate-[styling-in_0.18s_ease-out] ${FOCUS_RING}`}
        >
          {!tabbed && <h4 className={MINI_LABEL}>{panel.label}</h4>}
          {panel.content}
        </section>
      ))}
    </article>
  );
}

// Modelo `tags`: cada peça é uma etiqueta de roupa, com os três campos à vista. Mais de uma peça vira uma fila que
// rola de lado, com a próxima aparecendo na ponta.
const TAG_TILTS = ['-rotate-1', 'rotate-0', 'rotate-[0.6deg]'];

function StylingTags({ items, context }: { items: StylingItem[]; context: LinkContext }) {
  const { copy } = context;
  const row = items.length > 1;
  const variants = items.flatMap((item) => item.variants ?? []);

  return (
    <>
      <ul
        aria-label={copy.tips}
        tabIndex={row ? 0 : undefined}
        className={
          row
            ? `-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3.5 overflow-x-auto px-4 pt-3.5 pb-[18px] sm:mx-0 sm:px-1 ${FOCUS_RING}`
            : 'pt-3.5 pb-1'
        }
      >
        {items.map((item, index) => (
          <li
            key={item.piece}
            className={`relative snap-start rounded-[10px_10px_14px_14px] border-2 border-marinho bg-white px-4 pt-[30px] pb-4 shadow-[4px_4px_0_var(--color-marinho)] ${row ? `shrink-0 basis-[min(82%,18rem)] ${TAG_TILTS[index % TAG_TILTS.length]}` : ''}`}
          >
            <span
              aria-hidden="true"
              className="absolute top-2.5 left-1/2 size-3.5 -translate-x-1/2 rounded-full border-2 border-marinho bg-creme"
            />
            <h3 className={`mb-3 border-b-2 border-marinho pb-2.5 ${PIECE_NAME}`}>
              <PieceName item={item} context={context} />
            </h3>
            <dl className="grid gap-3">
              {getPanels({ ...item, variants: undefined }, context).map((panel) => (
                <div key={panel.key}>
                  <dt className="mb-1 text-[11px] font-extrabold tracking-[0.12em] text-marinho-suave uppercase">{panel.label}</dt>
                  <dd className="[&_.styling-sentence]:text-[15px] [&_.styling-sentence]:leading-6">{panel.content}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
      {variants.length > 0 && (
        <div className="mt-2">
          <p className={MINI_LABEL}>{copy.byColor}</p>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(9.5rem,1fr))] gap-2.5">
            {variants.map((variant) => (
              <li key={variant.color} className="overflow-hidden rounded-[10px] border-2 border-marinho bg-white">
                <p className="flex items-center gap-2 border-b-2 border-marinho bg-creme px-2.5 py-1.5 text-sm font-extrabold">
                  <Swatch color={variant.swatch} />
                  {variant.color}
                </p>
                <p className="px-2.5 pt-2 pb-2.5 text-sm leading-snug font-medium">
                  {variant.pairsWith.join(', ')}
                  {variant.avoid && <Avoid text={variant.avoid} copy={copy} />}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

function PairsWith({ item, context }: { item: StylingItem; context: LinkContext }) {
  const { copy } = context;
  const store = item.pairsWith?.filter((pair) => pair.url) ?? [];
  const closet = item.pairsWith?.filter((pair) => !pair.url) ?? [];

  return (
    <>
      {store.length > 0 && (
        <ul className="mb-3.5 grid gap-2.5 sm:grid-cols-[repeat(auto-fit,minmax(13rem,1fr))]">
          {store.map((pair) => (
            <li key={pair.label}>
              <StoreLink
                href={pair.url!}
                context={context}
                className="grid min-h-12 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2.5 gap-y-0.5 rounded-[10px] border-2 border-marinho bg-white px-3 py-2.5 shadow-[3px_3px_0_var(--color-marinho)] motion-safe:transition-[translate,box-shadow] motion-safe:hover:-translate-px motion-safe:hover:shadow-[4px_4px_0_var(--color-marinho)]"
              >
                <span className="font-condensada text-lg leading-[1.1] font-black font-stretch-extra-condensed uppercase wrap-anywhere">
                  {pair.label}
                </span>
                <ArrowUpRight aria-hidden="true" className="row-span-2 size-5 shrink-0" />
                {pair.note && <span className="text-[13px] leading-snug font-medium text-marinho-suave">{pair.note}</span>}
              </StoreLink>
            </li>
          ))}
        </ul>
      )}
      {closet.length > 0 && (
        <div>
          <p className={MINI_LABEL}>
            <HangerIcon />
            {copy.closet}
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {closet.map((pair) => (
              <li
                key={pair.label}
                className="rounded-full border-2 border-marinho/20 bg-creme px-2.5 py-1 text-sm leading-snug font-semibold"
              >
                {pair.label}
              </li>
            ))}
          </ul>
        </div>
      )}
      {item.variants && item.variants.length > 0 && (
        <div className={store.length || closet.length ? 'mt-4 border-t-2 border-marinho/10 pt-3.5' : ''}>
          <p className={MINI_LABEL}>{copy.byColor}</p>
          <ul className="grid gap-2.5">
            {item.variants.map((variant) => (
              <li key={variant.color} className="grid grid-cols-[auto_minmax(4.5em,auto)_minmax(0,1fr)] items-start gap-x-2 text-sm leading-6">
                <Swatch color={variant.swatch} />
                <span className="font-extrabold">{variant.color}</span>
                <span className="font-medium">
                  {variant.pairsWith.join(' · ')}
                  {variant.avoid && <Avoid text={variant.avoid} copy={copy} />}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

function PieceName({ item, context }: { item: StylingItem; context: LinkContext }) {
  if (!item.url) return item.piece;
  return (
    <StoreLink
      href={item.url}
      context={context}
      className="underline decoration-laranja decoration-2 underline-offset-4"
    >
      {item.piece}
      <ArrowUpRight aria-hidden="true" className="ml-0.5 inline size-[0.7em] align-[0.05em]" />
    </StoreLink>
  );
}

function StoreLink({ href, context, className, children }: { href: string; context: LinkContext; className: string; children: ReactNode }) {
  return (
    <CouponStoreLink
      href={href}
      brand={context.affiliate}
      contentSlug={context.reviewSlug}
      sponsored
      placement="review_styling"
      className={`${className} ${FOCUS_RING}`}
    >
      {children}
      <span className="sr-only"> {context.copy.newTab}</span>
    </CouponStoreLink>
  );
}

function Swatch({ color }: { color?: string }) {
  if (!color) return null;
  return (
    <span aria-hidden="true" className="mt-1 inline-block size-4 shrink-0 rounded-full border-2 border-marinho" style={{ backgroundColor: color }} />
  );
}

function Avoid({ text, copy }: { text: string; copy: StylingCopy }) {
  return (
    <span className="mt-1 flex items-start gap-1 text-[13px] leading-snug font-semibold text-marinho-suave">
      <X aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" strokeWidth={3} />
      <span>
        <span className="font-extrabold">{copy.avoid}</span> {text}
      </span>
    </span>
  );
}

function HangerIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 shrink-0">
      <path
        d="M12 7.5a2 2 0 1 1 2-2c0 1.2-2 1.6-2 3.2v.8m0 0L3.2 15.4a1.4 1.4 0 0 0 .9 2.6h15.8a1.4 1.4 0 0 0 .9-2.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
