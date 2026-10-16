'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { getShellHomeHref } from '@/lib/i18n/shellDictionary';
import { LOCALES, LOCALE_KEYS, type Locale } from '@/lib/i18n/locales';

interface LanguageSwitcherProps {
  localeKey: Locale;
  label: string;
  mobile?: boolean;
}

export default function LanguageSwitcher({ localeKey, label, mobile = false }: LanguageSwitcherProps) {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLocale = LOCALES[localeKey];
  const menuId = mobile ? 'header-language-mobile-menu' : 'header-language-desktop-menu';

  useEffect(() => {
    if (!isLanguageOpen) return undefined;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
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
            className={`h-3.5 w-3.5 motion-safe:transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`}
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
                href={getShellHomeHref(locale)}
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
