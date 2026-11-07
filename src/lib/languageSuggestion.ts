// Sugestão de idioma: quem lê o site num idioma diferente do da página vê uma faixa com o link da versão
// dele, tirado do hreflang que a página já declara. Nunca redireciona: o HTML do servidor e o que os
// robôs leem não mudam. Sem React e sem @/lib/data, porque a faixa é componente de cliente.
import { LOCALES, type Locale } from '@/lib/i18n/locales';

export const LANGUAGE_SUGGESTION_STORAGE_KEY = 'ecc-lang-suggestion-v1';

export type LanguageAlternate = { hreflang: string; href: string };
export type LanguageSuggestion = { locale: Locale; href: string };

const LOCALE_BY_HREFLANG = new Map(
  Object.values(LOCALES).map((config) => [config.hreflang.toLowerCase(), config.locale])
);

// Do idioma do navegador (navigator.languages) ao idioma do site. O chinês vai pela escrita: Taiwan,
// Hong Kong e Macau leem o tradicional; o resto, o simplificado.
export function localeFromLanguageTag(tag: string): Locale | null {
  const parts = tag.trim().toLowerCase().replace(/_/g, '-').split('-');
  const primary = parts[0];
  if (!primary) return null;
  if (primary === 'zh') {
    return parts.some((part) => ['hant', 'tw', 'hk', 'mo'].includes(part)) ? 'zh-hant' : 'zh-hans';
  }
  return primary in LOCALES ? (primary as Locale) : null;
}

// O primeiro idioma do visitante que o site tem decide. Se é o da página, nada a sugerir; se o site tem
// o idioma mas a página não tem a versão dele, também não (empurrar o inglês a quem lê espanhol não
// ajuda). Sem nenhum idioma do site entre os do visitante, a sugestão é o inglês, o x-default.
export function pickLanguageSuggestion(
  pageLocale: Locale,
  visitorLanguages: readonly string[],
  alternates: readonly LanguageAlternate[]
): LanguageSuggestion | null {
  const hrefByLocale = new Map<Locale, string>();
  for (const { hreflang, href } of alternates) {
    const locale = LOCALE_BY_HREFLANG.get(hreflang.toLowerCase());
    if (locale && href && !hrefByLocale.has(locale)) hrefByLocale.set(locale, href);
  }

  const visitorLocale = visitorLanguages.map(localeFromLanguageTag).find((locale) => locale !== null) ?? null;
  const target = visitorLocale ?? 'en';
  if (target === pageLocale) return null;
  const href = hrefByLocale.get(target);
  return href ? { locale: target, href } : null;
}

// O link do hreflang é absoluto; a faixa navega dentro do site, então fica só com o caminho.
export function toSitePath(href: string): string | null {
  try {
    const url = new URL(href, 'https://emcasacomcecilia.com');
    if (!['emcasacomcecilia.com', 'www.emcasacomcecilia.com'].includes(url.hostname)) return null;
    return `${url.pathname}${url.search}`;
  } catch {
    return null;
  }
}
