'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { brandLinks } from '@/lib/brandLinks';
import OmniSearch from '@/components/OmniSearch';
import LanguageSwitcher from '@/components/header/LanguageSwitcher';
import DesktopNav from '@/components/header/DesktopNav';
import SiteName from '@/components/header/SiteName';
import { useActiveNav } from '@/components/header/useActiveNav';
import {
  getShellCommercialLinks,
  getShellCopy,
  getShellHomeHref,
  getShellNavLinks,
} from '@/lib/i18n/shellDictionary';
import { getShellMenu } from '@/lib/i18n/shellMenu';
import { findLocaleByHtmlLang } from '@/lib/i18n/locales';

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
  const menu = getShellMenu(localeKey);
  const active = useActiveNav(localeKey);

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
        <div className="flex flex-col items-center gap-3 py-3 xl:flex-row xl:justify-between xl:gap-8">
          {/* Logo - CSS Style */}
          <Link href={homeHref} className="group flex flex-shrink-0 translate-y-[2px] flex-col items-center justify-center">
            <SiteName style={{ fontSize: 'clamp(1.9rem, 7vw, 2.45rem)' }} />
            <span className="hidden xl:block" style={{
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

          <DesktopNav
            locale={localeKey}
            menu={menu}
            active={active}
            copy={copy}
            commercialLinks={commercialLinks}
            isPt={isPt}
          />

          {/* Mobile menu button */}
          <div className="flex w-full items-center justify-center border-y border-white/18 py-2 xl:hidden">
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
        <div className="bg-[#0f1d3a] border-t border-white/10 animate-slide-down xl:hidden">
          <div className="px-4 py-4 space-y-1">
            {isPt && (
              <div className="mb-3 rounded-2xl bg-white/5 p-1.5">
                <OmniSearch placeholder="Buscar Receitas e Artigos" emphasis />
              </div>
            )}
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
