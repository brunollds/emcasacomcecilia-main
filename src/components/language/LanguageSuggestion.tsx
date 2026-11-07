'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { LANGUAGE_SUGGESTION_COPY } from '@/components/language/languageSuggestionCopy';
import { getServerConsentSnapshot, readConsent, subscribeConsent } from '@/lib/consent';
import { LOCALES, findLocaleByHtmlLang, type Locale } from '@/lib/i18n/locales';
import {
  LANGUAGE_SUGGESTION_STORAGE_KEY,
  pickLanguageSuggestion,
  toSitePath,
} from '@/lib/languageSuggestion';

const CHANGE_EVENT = 'ecc-lang-suggestion-change';

// Se o navegador recusa o armazenamento, a faixa fechada fica fechada até a página recarregar.
let memoryClosed = false;

function readClosed(): boolean {
  try {
    return window.localStorage.getItem(LANGUAGE_SUGGESTION_STORAGE_KEY) !== null || memoryClosed;
  } catch {
    return memoryClosed;
  }
}

function close(reason: 'dismissed' | 'followed') {
  memoryClosed = true;
  try {
    window.localStorage.setItem(LANGUAGE_SUGGESTION_STORAGE_KEY, reason);
  } catch {
    // Fica só na memória.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribeClosed(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === LANGUAGE_SUGGESTION_STORAGE_KEY) onChange();
  };
  window.addEventListener('storage', onStorage);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

// A sugestão sai do <head> da página aberta: o idioma do <html> e os <link rel="alternate" hreflang>.
// Na navegação pelo site, o Next troca esses links, e o observador do <head> refaz a conta.
function readSuggestion(): string {
  const pageLocale = findLocaleByHtmlLang(document.documentElement.lang);
  if (!pageLocale) return '';
  const alternates = Array.from(document.head.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]')).map(
    (link) => ({ hreflang: link.getAttribute('hreflang') ?? '', href: link.getAttribute('href') ?? '' })
  );
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  const suggestion = pickLanguageSuggestion(pageLocale, languages, alternates);
  const path = suggestion ? toSitePath(suggestion.href) : null;
  return suggestion && path ? `${suggestion.locale} ${path}` : '';
}

function subscribeHead(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.head, { childList: true, subtree: true, attributes: true, attributeFilter: ['href', 'hreflang'] });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  return () => observer.disconnect();
}

const BUTTON = `min-h-11 whitespace-nowrap rounded-lg border-2 border-marinho px-3 py-2 text-center text-sm font-bold transition-colors sm:px-4 ${FOCUS_RING}`;

export default function LanguageSuggestion() {
  // Nada disso existe no servidor: a faixa só monta no navegador e nunca vai ao HTML.
  const suggestion = useSyncExternalStore(subscribeHead, readSuggestion, () => '');
  const closed = useSyncExternalStore(subscribeClosed, readClosed, () => true);
  // Espera o aviso de cookies: os dois no mesmo lugar, um de cada vez.
  const consent = useSyncExternalStore(subscribeConsent, readConsent, getServerConsentSnapshot);

  if (!suggestion || closed || consent === null) return null;

  const [locale, href] = suggestion.split(' ') as [Locale, string];
  const copy = LANGUAGE_SUGGESTION_COPY[locale];

  return (
    <div
      role="region"
      aria-label={copy.regionLabel}
      lang={LOCALES[locale].htmlLang}
      className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 rounded-xl border-2 border-marinho bg-white p-4 text-marinho shadow-[4px_4px_0_var(--color-marinho)] motion-safe:animate-[slide-up_0.3s_ease-out] sm:right-auto sm:left-6 sm:flex sm:w-[min(640px,calc(100%-3rem))] sm:items-center sm:gap-4 print:hidden"
    >
      <p className="text-sm leading-relaxed font-semibold sm:flex-1">{copy.message}</p>
      <div className="mt-3 flex gap-3 sm:mt-0 sm:shrink-0">
        <button
          type="button"
          onClick={() => close('dismissed')}
          className={`${BUTTON} flex-1 bg-white text-marinho hover:bg-creme sm:flex-none`}
        >
          {copy.dismiss}
        </button>
        <Link
          href={href}
          hrefLang={LOCALES[locale].hreflang}
          onClick={() => close('followed')}
          className={`${BUTTON} flex flex-1 items-center justify-center bg-marinho text-white hover:bg-white hover:text-marinho sm:flex-none`}
        >
          {copy.action}
        </Link>
      </div>
    </div>
  );
}
