'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { hasSearchText, searchWords } from '@/lib/reviewsShelf';
import { PT_COUPON_HUB_FILTER_COPY } from './couponHubCopy';

export type CouponHubSearchableStore = {
  slug: string;
  categoryId: string;
  searchText: string;
};

export type CouponHubCategoryLink = {
  id: string;
  label: string;
};

export function filterCouponHubStores(
  stores: readonly CouponHubSearchableStore[],
  query: string
): Set<string> {
  const words = searchWords(query);
  if (words.length === 0) return new Set(stores.map((store) => store.slug));
  return new Set(
    stores
      .filter((store) => words.every((word) => store.searchText.includes(word)))
      .map((store) => store.slug)
  );
}

function normalizeCategoryHash(hash: string, categoryIds: ReadonlySet<string>): string | null {
  const raw = hash.replace(/^#/, '');
  if (!raw) return null;
  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    // Segue com o hash bruto.
  }
  if (categoryIds.has(decoded)) return decoded;
  if (decoded.startsWith('prateleira-')) {
    const shortId = decoded.slice('prateleira-'.length);
    if (categoryIds.has(shortId)) return shortId;
  }
  return null;
}

function restoreAllHubShelves(targetCategoryId?: string) {
  const featuredEl = document.querySelector<HTMLElement>('[data-coupon-featured]');
  if (featuredEl) featuredEl.hidden = false;
  document.querySelectorAll<HTMLElement>('[data-coupon-shelf]').forEach((shelf) => {
    shelf.hidden = false;
    if (targetCategoryId && shelf.dataset.couponShelf === targetCategoryId) {
      delete shelf.dataset.reveal;
    }
  });
  document.querySelectorAll<HTMLElement>('[data-coupon-item]').forEach((item) => {
    item.hidden = false;
  });
}

export function CouponHubControls({
  stores,
  categories,
}: {
  stores: readonly CouponHubSearchableStore[];
  categories: readonly CouponHubCategoryLink[];
}) {
  const copy = PT_COUPON_HUB_FILTER_COPY;
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const categoryIdSet = useMemo(() => new Set(categories.map((category) => category.id)), [categories]);
  const searching = hasSearchText(query);
  const matchedSlugs = useMemo(() => filterCouponHubStores(stores, query), [stores, query]);

  useEffect(() => {
    const syncHash = () => {
      setActiveCategory(normalizeCategoryHash(window.location.hash, categoryIdSet));
    };
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, [categoryIdSet]);

  useEffect(() => {
    if (!searching) {
      restoreAllHubShelves();
      return;
    }

    const featuredEl = document.querySelector<HTMLElement>('[data-coupon-featured]');
    const shelfEls = document.querySelectorAll<HTMLElement>('[data-coupon-shelf]');
    const itemEls = document.querySelectorAll<HTMLElement>('[data-coupon-item]');

    // Durante a busca, esconde os Destaques para não mostrar a mesma loja duas vezes.
    if (featuredEl) featuredEl.hidden = true;
    itemEls.forEach((item) => {
      const slug = item.dataset.couponItem ?? '';
      item.hidden = !matchedSlugs.has(slug);
    });
    shelfEls.forEach((shelf) => {
      const categoryId = shelf.dataset.couponShelf ?? '';
      const hasMatch = stores.some(
        (store) => store.categoryId === categoryId && matchedSlugs.has(store.slug)
      );
      shelf.hidden = !hasMatch;
      if (hasMatch) delete shelf.dataset.reveal;
    });
  }, [searching, matchedSlugs, stores]);

  const clearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const liveMessage = !searching
    ? ''
    : matchedSlugs.size > 0
      ? copy.resultsCount(matchedSlugs.size)
      : copy.emptyResults(query.trim());

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            if (window.matchMedia('(pointer: coarse)').matches) {
              inputRef.current?.blur();
            }
          }}
          className="w-full md:max-w-sm"
        >
          <label htmlFor="busca-cupons" className="sr-only">
            {copy.searchLabel}
          </label>
          <div className="flex min-h-12 items-center gap-2 rounded-full border-2 border-marinho bg-white ps-4 pe-1 focus-within:outline-3 focus-within:outline-offset-2 focus-within:outline-marinho">
            <Search aria-hidden="true" className="size-5 shrink-0 text-marinho" />
            <input
              ref={inputRef}
              id="busca-cupons"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key !== 'Escape' || !searching) return;
                event.preventDefault();
                clearSearch();
              }}
              placeholder={copy.searchPlaceholder}
              autoComplete="off"
              enterKeyHint="search"
              className="min-w-0 flex-1 bg-transparent py-2.5 text-base font-semibold text-marinho outline-none placeholder:font-medium placeholder:text-marinho-suave [&::-webkit-search-cancel-button]:appearance-none"
            />
            {searching && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label={copy.clearSearchLabel}
                className={`flex size-11 shrink-0 items-center justify-center rounded-full text-marinho hover:bg-creme ${FOCUS_RING}`}
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            )}
          </div>
        </form>

        <nav aria-label={copy.categoriesNavLabel} className="min-w-0">
          <ul className="flex flex-wrap items-center gap-2">
            {categories.map((category) => {
              const isActive = !searching && activeCategory === category.id;
              return (
                <li key={category.id}>
                  <a
                    href={`#${category.id}`}
                    onClick={(event) => {
                      setActiveCategory(category.id);
                      if (!searching) return;
                      // Reexibe as prateleiras de forma síncrona antes de rolar até a âncora.
                      event.preventDefault();
                      restoreAllHubShelves(category.id);
                      setQuery('');
                      window.history.pushState(null, '', `#${category.id}`);
                      document.getElementById(category.id)?.scrollIntoView();
                    }}
                    aria-current={isActive ? 'location' : undefined}
                    className={`inline-flex min-h-11 items-center rounded-full border-2 border-marinho px-3.5 py-1.5 text-sm font-extrabold motion-safe:transition-colors ${
                      isActive ? 'bg-amarelo-cupom text-marinho' : 'bg-white text-marinho hover:bg-creme'
                    } ${FOCUS_RING}`}
                  >
                    {category.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Sempre montado no DOM para o leitor de tela anunciar também o primeiro resultado da busca. */}
      <p
        role="status"
        aria-live="polite"
        className={searching && matchedSlugs.size > 0 ? 'text-sm font-bold text-marinho-suave' : 'sr-only'}
      >
        {liveMessage}
      </p>

      {searching && matchedSlugs.size === 0 && (
        <div className="flex flex-col items-start gap-3 rounded-2xl border-2 border-marinho bg-creme p-5">
          <p aria-hidden="true" className="text-[15px] font-bold text-marinho">
            {copy.emptyResults(query.trim())}
          </p>
          <button
            type="button"
            onClick={clearSearch}
            className={`inline-flex min-h-11 items-center justify-center rounded-[10px] border-2 border-marinho bg-white px-4 text-sm font-extrabold text-marinho hover:bg-amarelo-cupom/40 motion-safe:transition-colors ${FOCUS_RING}`}
          >
            {copy.showAllStores}
          </button>
        </div>
      )}
    </div>
  );
}
