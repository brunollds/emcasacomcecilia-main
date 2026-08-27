'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { brandLinks } from '@/lib/data';
import OmniSearch from '@/components/OmniSearch';
import {
  getShellCommercialLinks,
  getShellCopy,
  getShellHomeHref,
  getShellLanguageHubHref,
  getShellNavLinks,
} from '@/lib/i18n/shellDictionary';
import { LOCALES, LOCALE_KEYS, findLocaleByHtmlLang } from '@/lib/i18n/locales';

function LanguageSwitcher({ localeKey, label, mobile = false }) {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const containerRef = useRef(null);
  const activeLocale = LOCALES[localeKey];
  const menuId = mobile ? 'header-language-mobile-menu' : 'header-language-desktop-menu';

  useEffect(() => {
    if (!isLanguageOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsLanguageOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLanguageOpen]);

  return (
    <div ref={containerRef} className={`relative ${mobile ? 'w-full' : ''}`}>
      <button
        type="button"
        aria-expanded={isLanguageOpen}
        aria-controls={menuId}
        aria-label={`${label}: ${activeLocale.label} (${activeLocale.shortLabel})`}
        onClick={() => setIsLanguageOpen((current) => !current)}
        className={`flex items-center rounded-full border border-white/20 text-sm font-bold text-white/85 transition-colors hover:border-white/50 hover:text-white ${
          mobile
            ? 'w-full justify-between px-3 py-2.5'
            : 'min-w-[3.25rem] justify-center gap-1 px-2 py-1.5'
        }`}
      >
        {mobile && (
          <span className="text-xs uppercase tracking-[0.12em] text-white/60">{label}</span>
        )}
        <span className="flex items-center gap-1">
          {activeLocale.shortLabel}
          <ChevronDown
            aria-hidden="true"
            className={`h-3.5 w-3.5 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`}
          />
        </span>
      </button>

      {isLanguageOpen && (
        <nav
          id={menuId}
          aria-label={label}
          className={`z-[70] overflow-y-auto rounded-xl border border-white/15 bg-[#132342] p-1.5 shadow-2xl shadow-black/35 ${
            mobile
              ? 'mt-2 grid max-h-[18rem] grid-cols-2 gap-1'
              : 'absolute right-0 top-[calc(100%+0.55rem)] max-h-[24rem] min-w-52'
          }`}
        >
          {LOCALE_KEYS.map((locale) => {
            const config = LOCALES[locale];
            const isActive = locale === localeKey;

            return (
              <Link
                key={locale}
                href={getShellLanguageHubHref(locale)}
                hrefLang={config.hreflang}
                lang={config.htmlLang}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setIsLanguageOpen(false)}
                className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-white/12 font-bold text-white'
                    : 'font-medium text-white/78 hover:bg-white/8 hover:text-white'
                }`}
              >
                <span aria-hidden="true">{config.flag}</span>
                <span className="min-w-0 flex-1 truncate">{config.label}</span>
                <span className="text-[0.65rem] font-bold tracking-[0.08em] text-white/45">
                  {config.shortLabel}
                </span>
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}

export default function Navbar({ lang = 'pt-BR' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Map htmlLang back to internal locale key (e.g. 'pt-BR' -> 'pt', 'en' -> 'en', 'ja' -> 'ja', 'zh-Hant' -> 'zh-hant')
  const localeKey = findLocaleByHtmlLang(lang) || 'pt';

  const isPt = localeKey === 'pt';
  const copy = getShellCopy(localeKey);
  const navLinks = getShellNavLinks(localeKey);
  const commercialLinks = getShellCommercialLinks(localeKey);
  const homeHref = getShellHomeHref(localeKey);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 print:hidden ${scrolled ? 'shadow-md' : ''}`} style={{ background: '#0f1d3a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo + Busca (Apenas PT) + Mobile Menu */}
        <div className="flex flex-col items-center gap-3 py-3 lg:flex-row lg:justify-between lg:gap-8">
          {/* Logo - CSS Style */}
          <Link href={homeHref} className="group flex flex-shrink-0 translate-y-[2px] flex-col items-center justify-center">
            <span style={{
              fontSize: 'clamp(1.9rem, 7vw, 2.45rem)',
              fontWeight: 800,
              lineHeight: '1',
              letterSpacing: '-0.5px',
              display: 'inline-flex',
              alignItems: 'baseline',
              gap: '1.5px'
            }}>
              <span className="text-white transition-colors duration-300 group-hover:text-[#ff6b35]" style={{ fontSize: '0.60rem', fontWeight: 700, letterSpacing: '-0.3px' }}>em</span>
              <span className="text-white transition-colors duration-300 group-hover:text-[#ff6b35]" style={{ fontSize: '1em', fontWeight: 800, letterSpacing: '-0.4px' }}>CASA</span>
              <span className="text-white transition-colors duration-300 group-hover:text-[#ff6b35]" style={{ fontSize: '0.60rem', fontWeight: 700, letterSpacing: '-0.3px' }}>com</span>
              <span
                className="border-b-2 border-[#ff6b35]/80 pb-0.5 text-[#ff6b35] transition-colors duration-300 group-hover:text-white"
                style={{
                  fontSize: '1em',
                  fontWeight: 800,
                  letterSpacing: '-0.4px',
                }}
              >
                CECÍLIA
              </span>
            </span>
            <span className="hidden lg:block" style={{
              fontSize: '0.65rem',
              color: 'rgba(255, 255, 255, 0.78)',
              fontWeight: 500,
              letterSpacing: '0.3px',
              marginTop: '2px',
              textAlign: 'center'
            }}>
              {copy.tagline}
            </span>
          </Link>

          {/* Busca Desktop (Apenas PT) */}
          {isPt ? (
            <div className="hidden max-w-xl flex-1 lg:block">
              <OmniSearch />
            </div>
          ) : (
            <div className="hidden flex-1 lg:block" />
          )}

          {/* Links Desktop */}
          <nav className="hidden lg:flex items-center gap-4">
            {navLinks.filter((link) => link.desktop !== false).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  link.primary
                    ? 'border-b-2 border-[#ff6b35] pb-1 font-bold text-white'
                    : 'font-medium text-white/78 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {commercialLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                hrefLang={link.hrefLang}
                className="text-sm font-medium text-white/78 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
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
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ff6b35] text-white text-sm font-semibold hover:bg-[#ff5722] transition-all"
              >
                Dicas
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
            <LanguageSwitcher localeKey={localeKey} label={copy.languageLabel} />
          </nav>

          {/* Mobile menu button */}
          <div className="flex w-full items-center justify-center border-y border-white/18 py-2 lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center gap-3 rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-[0.12em] text-white/82 transition-colors hover:bg-white/10 hover:text-white"
              aria-label={copy.menuLabel}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              {copy.menuLabel}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#0f1d3a] border-t border-white/10 animate-slide-down">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block border-b border-white/10 px-2 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white/82 transition-colors hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {commercialLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                hrefLang={link.hrefLang}
                className="block border-b border-white/10 px-2 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white/82 transition-colors hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isPt && (
              <Link
                href={brandLinks.dicas}
                target="_blank"
                rel="noopener noreferrer"
                className="block border-b border-white/10 px-2 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#ff6b35] transition-colors hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Dicas & Ofertas
              </Link>
            )}
            {isPt && (
              <Link
                href={brandLinks.damie}
                target="_blank"
                rel="noopener noreferrer"
                className="block border-b border-white/10 px-2 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#ffd700] transition-colors hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {copy.damieLabel}
              </Link>
            )}
            {isPt && (
              <div className="pt-4">
                <OmniSearch placeholder="Buscar receitas e guias" />
              </div>
            )}
            {!isPt && (
              <div className="pt-3">
                <LanguageSwitcher localeKey={localeKey} label={copy.languageLabel} mobile />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
