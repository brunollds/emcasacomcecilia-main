'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { flushSync } from 'react-dom';
import { ChevronRight, Search, X } from 'lucide-react';
import { brandLinks } from '@/lib/brandLinks';
import OmniSearch from '@/components/OmniSearch';
import LanguageSwitcher from '@/components/header/LanguageSwitcher';
import SiteName from '@/components/header/SiteName';
import type { Locale } from '@/lib/i18n/locales';
import { getShellHomeHref, type ShellCommercialLink, type ShellCopy } from '@/lib/i18n/shellDictionary';
import { getAriaCurrent, type ActiveNav, type ShellMenu } from '@/lib/i18n/shellMenu';

interface MobileHeaderProps {
  locale: Locale;
  menu: ShellMenu;
  active: ActiveNav;
  copy: ShellCopy;
  commercialLinks: ShellCommercialLink[];
  isPt: boolean;
  scrolled: boolean;
}

const DRAWER_ID = 'header-gaveta';
const CATEGORIES_ID = 'header-gaveta-categorias';
const SEARCH_ID = 'header-busca-movel';
const NAME_TAP_MS = 450;

const BIG_ROW =
  'relative flex w-full items-center justify-between border-b border-white/10 px-4 py-3.5 text-left text-[15px] font-extrabold uppercase tracking-[0.1em]';
const bigRowTone = (isActive: boolean) => (isActive ? 'header-atual bg-white/6 text-white' : 'text-white/85');

const cascade = (index: number) => ({ '--i': index }) as CSSProperties;

export default function MobileHeader({ locale, menu, active, copy, commercialLinks, isPt, scrolled }: MobileHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(active.section === 'reviews');
  const [nameTapped, setNameTapped] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mudou de página: menu e busca fecham, e as categorias voltam a seguir a seção da página nova.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
    setSearchOpen(false);
    setCategoriesOpen(active.section === 'reviews');
  }

  useEffect(() => {
    if (!menuOpen && !searchOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      } else {
        setSearchOpen(false);
        searchButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, searchOpen]);

  useEffect(
    () => () => {
      if (tapTimer.current) clearTimeout(tapTimer.current);
    },
    [],
  );

  const toggleMenu = () => {
    if (!menuOpen) setCategoriesOpen(active.section === 'reviews');
    setSearchOpen(false);
    setMenuOpen(!menuOpen);
  };

  const toggleSearch = () => {
    setMenuOpen(false);
    if (searchOpen) {
      setSearchOpen(false);
      return;
    }
    // O foco tem de sair dentro do clique, senão o iOS não abre o teclado: o campo sai do inert antes.
    flushSync(() => setSearchOpen(true));
    searchInputRef.current?.focus();
  };

  const closeMenu = () => setMenuOpen(false);

  const tapName = () => {
    closeMenu();
    if (tapTimer.current) clearTimeout(tapTimer.current);
    setNameTapped(true);
    tapTimer.current = setTimeout(() => setNameTapped(false), NAME_TAP_MS);
  };

  // Os links grandes (os do PT, ou a lista de artigos e as lojas nos outros idiomas), a grade e o fim, nesta ordem na cascata.
  const rows = [...menu.primary, ...commercialLinks];
  const lastBlockIndex = rows.length + (menu.more.length > 0 ? 1 : 0);

  return (
    <div
      className="header-movel xl:hidden"
      data-menu-aberto={menuOpen || undefined}
      data-busca-aberta={searchOpen || undefined}
      data-rolou={scrolled || undefined}
    >
      <div className="header-linha relative flex items-center justify-between gap-2 px-3">
        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls={DRAWER_ID}
          aria-label={menuOpen ? copy.closeMenuLabel : copy.openMenuLabel}
          onClick={toggleMenu}
          className="header-botao header-hamburguer"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <div className="header-nome-movel pointer-events-none absolute inset-0 flex items-center justify-center" inert={searchOpen}>
          <Link
            href={getShellHomeHref(locale)}
            data-tap={nameTapped ? 'true' : undefined}
            onClick={tapName}
            className="group pointer-events-auto"
          >
            <SiteName className="header-nome" />
          </Link>
        </div>

        {menu.searchLabels ? (
          <>
            <div id={SEARCH_ID} className="header-busca" inert={!searchOpen}>
              <OmniSearch inputRef={searchInputRef} tone="light" fullWidthResults />
            </div>
            <button
              ref={searchButtonRef}
              type="button"
              aria-expanded={searchOpen}
              aria-controls={SEARCH_ID}
              aria-label={searchOpen ? menu.searchLabels.close : menu.searchLabels.open}
              onClick={toggleSearch}
              className="header-botao"
            >
              {searchOpen ? <X aria-hidden="true" className="h-4.5 w-4.5" /> : <Search aria-hidden="true" className="h-4.5 w-4.5" />}
            </button>
          </>
        ) : (
          // Sem busca fora do PT: o lugar da lupa fica vazio para o nome continuar no centro.
          <span aria-hidden="true" className="h-10 w-10 flex-shrink-0" />
        )}
      </div>

      <nav id={DRAWER_ID} className="header-gaveta" inert={!menuOpen}>
        <div className="header-gaveta-dentro">
          {rows.map((item, index) => {
            const isActive = active.section === item.id;
            const children = 'children' in item ? item.children : undefined;

            if (children && menu.reviewsListLabel) {
              return (
                <div key={item.id} className="header-cascata" style={cascade(index)}>
                  <button
                    type="button"
                    aria-expanded={categoriesOpen}
                    aria-controls={CATEGORIES_ID}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => setCategoriesOpen((open) => !open)}
                    className={`${BIG_ROW} ${bigRowTone(isActive)}`}
                  >
                    {item.label}
                    <ChevronRight aria-hidden="true" className="header-seta h-4 w-4" />
                  </button>
                  <div
                    id={CATEGORIES_ID}
                    className="header-categorias bg-white/6"
                    data-aberto={categoriesOpen || undefined}
                    inert={!categoriesOpen}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <ul aria-label={menu.reviewsListLabel} className="pb-[5px] pl-7 pr-4 pt-[3px]">
                        {children.map((child) => (
                          <li key={child.id}>
                            <Link
                              href={child.href}
                              aria-current={getAriaCurrent(child.href, active, false)}
                              onClick={closeMenu}
                              className={`block py-[7px] text-sm ${child.id === active.item ? 'font-bold text-white' : 'text-white/78'}`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={getAriaCurrent(item.href, active, isActive)}
                onClick={closeMenu}
                className={`header-cascata ${BIG_ROW} ${bigRowTone(isActive)}`}
                style={cascade(index)}
              >
                {item.label}
                <ChevronRight aria-hidden="true" className="h-4 w-4 opacity-60" />
              </Link>
            );
          })}

          {menu.more.length > 0 && (
            <ul className="header-cascata grid grid-cols-2 gap-1.5 px-4 py-3" style={cascade(rows.length)}>
              {menu.more.map((item) => {
                const isCurrent = item.id === active.item;
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      aria-current={getAriaCurrent(item.href, active, isCurrent)}
                      onClick={closeMenu}
                      className={`block rounded-[10px] border border-white/14 px-2.5 py-2 text-[13px] ${
                        isCurrent ? 'font-bold text-white' : 'text-white/75'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {menu.dicasLabels ? (
            <div className="header-cascata flex flex-wrap gap-2 px-4 pb-4 pt-1" style={cascade(lastBlockIndex)}>
              <Link
                href={brandLinks.dicas}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="rounded-full bg-[#ff6b35] px-[15px] py-[7px] text-[13px] font-semibold text-white"
              >
                {menu.dicasLabels.long}
              </Link>
              <Link
                href={brandLinks.damie}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="rounded-full border border-[#ffd700]/35 bg-[#ffd700]/10 px-[13px] py-1.5 text-[13px] font-bold text-[#ffd700]"
              >
                {copy.damieLabel}
              </Link>
            </div>
          ) : (
            <div className="header-cascata px-4 py-4" style={cascade(lastBlockIndex)}>
              <LanguageSwitcher localeKey={locale} label={copy.languageLabel} mobile />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
