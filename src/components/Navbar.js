'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import DesktopNav from '@/components/header/DesktopNav';
import MobileHeader from '@/components/header/MobileHeader';
import SiteName from '@/components/header/SiteName';
import { useActiveNav } from '@/components/header/useActiveNav';
import {
  getShellCommercialLinks,
  getShellCopy,
  getShellHomeHref,
} from '@/lib/i18n/shellDictionary';
import { getShellMenu } from '@/lib/i18n/shellMenu';
import { findLocaleByHtmlLang } from '@/lib/i18n/locales';

export default function Navbar({ lang = 'pt-BR' }) {
  const [scrolled, setScrolled] = useState(false);

  // Map htmlLang back to internal locale key (e.g. 'pt-BR' -> 'pt', 'en' -> 'en', 'ja' -> 'ja', 'zh-Hant' -> 'zh-hant')
  const localeKey = findLocaleByHtmlLang(lang) || 'pt';

  const isPt = localeKey === 'pt';
  const copy = getShellCopy(localeKey);
  const commercialLinks = getShellCommercialLinks(localeKey);
  const menu = getShellMenu(localeKey);
  const active = useActiveNav(localeKey);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 print:hidden motion-safe:transition-shadow motion-safe:duration-300 ${scrolled ? 'shadow-md' : ''}`}
      style={{ background: '#0f1d3a' }}
    >
      {/* Computador: o nome com a frase embaixo e a navegação */}
      <div className="mx-auto hidden max-w-7xl items-center justify-between gap-8 px-4 py-3 sm:px-6 lg:px-8 xl:flex">
        <Link href={getShellHomeHref(localeKey)} className="group flex flex-shrink-0 translate-y-[2px] flex-col items-center justify-center">
          <SiteName style={{ fontSize: '2.45rem' }} />
          <span style={{
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
      </div>

      <MobileHeader
        locale={localeKey}
        menu={menu}
        active={active}
        copy={copy}
        commercialLinks={commercialLinks}
        isPt={isPt}
        scrolled={scrolled}
      />
    </header>
  );
}
