'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FocusEvent, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import { ArrowRight, ChevronDown, Search, X } from 'lucide-react';
import { brandLinks } from '@/lib/brandLinks';
import OmniSearch from '@/components/OmniSearch';
import LanguageSwitcher from '@/components/header/LanguageSwitcher';
import type { Locale } from '@/lib/i18n/locales';
import type { ShellCommercialLink, ShellCopy } from '@/lib/i18n/shellDictionary';
import { getAriaCurrent, type ActiveNav, type NavItem, type ShellMenu } from '@/lib/i18n/shellMenu';

interface DesktopNavProps {
  locale: Locale;
  menu: ShellMenu;
  active: ActiveNav;
  copy: ShellCopy;
  commercialLinks: ShellCommercialLink[];
  isPt: boolean;
}

type ListId = 'reviews' | 'more';

const OPEN_DELAY_MS = 120;
const CLOSE_DELAY_MS = 200;

const LINK_ON = 'border-b-2 border-[#ff6b35] pb-1 font-bold text-white';
const LINK_OFF = 'font-medium text-white/78 hover:text-white';
const ITEM_ON = 'bg-white/12 font-bold text-white';
const ITEM_OFF = 'font-medium text-white/78 hover:bg-white/8 hover:text-white';

export default function DesktopNav({ locale, menu, active, copy, commercialLinks, isPt }: DesktopNavProps) {
  const [openList, setOpenList] = useState<ListId | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const listRefs = useRef<Record<ListId, HTMLDivElement | null>>({ reviews: null, more: null });
  const buttonRefs = useRef<Record<ListId, HTMLButtonElement | null>>({ reviews: null, more: null });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  const closeNow = () => {
    clearTimer();
    setOpenList(null);
  };

  const scheduleOpen = (id: ListId) => {
    clearTimer();
    timer.current = setTimeout(() => setOpenList(id), OPEN_DELAY_MS);
  };

  const scheduleClose = () => {
    clearTimer();
    timer.current = setTimeout(() => setOpenList(null), CLOSE_DELAY_MS);
  };

  // Com o mouse, o hover já abriu a lista quando o clique chega: o clique só abre. Teclado e toque alternam.
  const toggle = (id: ListId, event: ReactMouseEvent) => {
    clearTimer();
    const pointerType = (event.nativeEvent as PointerEvent).pointerType;
    if (pointerType === 'mouse') {
      setOpenList(id);
      return;
    }
    setOpenList((current) => (current === id ? null : id));
  };

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  useEffect(() => {
    if (!openList) return undefined;

    const handlePointerDown = (event: PointerEvent) => {
      if (!listRefs.current[openList]?.contains(event.target as Node)) closeNow();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      closeNow();
      buttonRefs.current[openList]?.focus();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openList]);

  useEffect(() => {
    if (!searchOpen) return undefined;

    const handlePointerDown = (event: PointerEvent) => {
      if (!searchRef.current?.contains(event.target as Node)) setSearchOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchOpen(false);
        searchButtonRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchOpen]);

  const groupProps = (id: ListId) => ({
    ref: (node: HTMLDivElement | null) => {
      listRefs.current[id] = node;
    },
    onPointerEnter: (event: ReactPointerEvent) => {
      if (event.pointerType === 'mouse') scheduleOpen(id);
    },
    onPointerLeave: (event: ReactPointerEvent) => {
      if (event.pointerType === 'mouse') scheduleClose();
    },
    onBlur: (event: FocusEvent<HTMLDivElement>) => {
      const next = event.relatedTarget as Node | null;
      if (next && !event.currentTarget.contains(next)) closeNow();
    },
  });

  const renderList = (id: ListId, items: NavItem[], label: string | null) => (
    <ul
      id={`header-lista-${id}`}
      aria-label={label ?? undefined}
      className="header-lista absolute left-0 top-[calc(100%+0.55rem)] z-[70] min-w-56 list-none rounded-xl border border-white/15 bg-[#132342] p-1.5 shadow-2xl shadow-black/35"
    >
      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={item.href}
            aria-current={getAriaCurrent(item.href, active, false)}
            onClick={closeNow}
            className={`block whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors ${
              item.id === active.item ? ITEM_ON : ITEM_OFF
            }`}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  const renderToggle = (id: ListId, label: string, content: ReactNode, className: string, current?: 'true') => (
    <button
      ref={(node) => {
        buttonRefs.current[id] = node;
      }}
      type="button"
      aria-expanded={openList === id}
      aria-controls={`header-lista-${id}`}
      aria-label={id === 'reviews' ? label : undefined}
      aria-current={current}
      onClick={(event) => toggle(id, event)}
      className={`flex items-center gap-1 whitespace-nowrap text-sm transition-colors ${className}`}
    >
      {content}
      <ChevronDown
        aria-hidden="true"
        className={`h-3.5 w-3.5 transition-transform ${openList === id ? 'rotate-180' : ''}`}
      />
    </button>
  );

  const moreActive = active.section === 'more';

  return (
    <div className="hidden min-w-0 flex-1 items-center xl:flex">
      <div className="relative flex min-w-0 flex-1 items-center gap-4">
        {menu.searchLabels && (
          <button
            ref={searchButtonRef}
            type="button"
            aria-label={menu.searchLabels.open}
            aria-expanded={searchOpen}
            aria-controls="header-desktop-search"
            onClick={() => setSearchOpen(true)}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/8 text-white/70 transition-all hover:border-white/45 hover:bg-white/14 hover:text-white"
          >
            <Search className="h-4.5 w-4.5" />
          </button>
        )}

        <nav className="flex min-w-0 items-center gap-5">
          {menu.primary.map((item) => {
            const isActive = active.section === item.id;
            const current = getAriaCurrent(item.href, active, isActive);

            if (!item.children || !menu.reviewsListLabel) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={current}
                  className={`whitespace-nowrap text-sm transition-colors ${isActive ? LINK_ON : LINK_OFF}`}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={item.id} className="relative" {...groupProps('reviews')}>
                <div className={`flex items-center gap-1 ${isActive ? LINK_ON : ''}`}>
                  <Link
                    href={item.href}
                    aria-current={current}
                    className={`whitespace-nowrap text-sm transition-colors ${isActive ? 'font-bold text-white' : LINK_OFF}`}
                  >
                    {item.label}
                  </Link>
                  {renderToggle(
                    'reviews',
                    menu.reviewsListLabel,
                    null,
                    isActive ? 'text-white' : 'text-white/78 hover:text-white',
                  )}
                </div>
                {openList === 'reviews' && renderList('reviews', item.children, menu.reviewsListLabel)}
              </div>
            );
          })}

          {menu.moreLabel && menu.more.length > 0 && (
            <div className="relative" {...groupProps('more')}>
              <div className={moreActive ? LINK_ON : undefined}>
                {renderToggle(
                  'more',
                  menu.moreLabel,
                  menu.moreLabel,
                  moreActive ? 'font-bold text-white' : LINK_OFF,
                  moreActive ? 'true' : undefined,
                )}
              </div>
              {openList === 'more' && renderList('more', menu.more, null)}
            </div>
          )}
        </nav>

        {searchOpen && menu.searchLabels && (
          <div
            ref={searchRef}
            id="header-desktop-search"
            className="absolute -inset-y-1 left-0 right-0 z-30 flex items-center gap-2 bg-[#0f1d3a] py-1"
          >
            <div className="min-w-0 flex-1">
              <OmniSearch autoFocus />
            </div>
            <button
              type="button"
              aria-label={menu.searchLabels.close}
              onClick={() => {
                setSearchOpen(false);
                searchButtonRef.current?.focus();
              }}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/45 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>
        )}
      </div>

      <nav className="ml-4 flex flex-shrink-0 items-center gap-4">
        {commercialLinks.map((link) => {
          const isActive = active.section === link.id;
          return (
            <Link
              key={link.id}
              href={link.href}
              aria-current={getAriaCurrent(link.href, active, isActive)}
              className={`whitespace-nowrap text-sm transition-colors ${isActive ? LINK_ON : LINK_OFF}`}
            >
              {link.label}
            </Link>
          );
        })}
        {isPt && (
          <Link
            href={brandLinks.damie}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[#ffd700]/35 bg-[#ffd700]/10 px-3.5 py-1.5 text-sm font-bold text-[#ffd700] transition-all hover:border-[#ffd700]/70 hover:bg-[#ffd700]/18"
          >
            {copy.damieLabel}
          </Link>
        )}
        {isPt && (
          <Link
            href={brandLinks.dicas}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-[#ff6b35] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#ff5722]"
          >
            Dicas
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
        <LanguageSwitcher localeKey={locale} label={copy.languageLabel} />
      </nav>
    </div>
  );
}
