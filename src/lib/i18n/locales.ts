export type Locale = 'pt' | 'en' | 'es' | 'fr' | 'de' | 'ko' | 'ja' | 'zh-hant' | 'zh-hans';

export interface LocaleConfig {
  locale: Locale;
  htmlLang: string;
  hreflang: string;
  openGraphLocale: string;
  label: string;
  shortLabel: string;
  flag: string;
}

export const LOCALES: Record<Locale, LocaleConfig> = {
  pt: { locale: 'pt', htmlLang: 'pt-BR', hreflang: 'pt-BR', openGraphLocale: 'pt_BR', label: 'Português', shortLabel: 'BR', flag: '🇧🇷' },
  en: { locale: 'en', htmlLang: 'en', hreflang: 'en', openGraphLocale: 'en_US', label: 'English', shortLabel: 'US', flag: '🇺🇸' },
  es: { locale: 'es', htmlLang: 'es', hreflang: 'es', openGraphLocale: 'es_ES', label: 'Español', shortLabel: 'ES', flag: '🇪🇸' },
  fr: { locale: 'fr', htmlLang: 'fr', hreflang: 'fr', openGraphLocale: 'fr_FR', label: 'Français', shortLabel: 'FR', flag: '🇫🇷' },
  de: { locale: 'de', htmlLang: 'de', hreflang: 'de', openGraphLocale: 'de_DE', label: 'Deutsch', shortLabel: 'DE', flag: '🇩🇪' },
  ko: { locale: 'ko', htmlLang: 'ko', hreflang: 'ko', openGraphLocale: 'ko_KR', label: '한국어', shortLabel: 'KR', flag: '🇰🇷' },
  ja: { locale: 'ja', htmlLang: 'ja', hreflang: 'ja', openGraphLocale: 'ja_JP', label: '日本語', shortLabel: 'JP', flag: '🇯🇵' },
  'zh-hant': { locale: 'zh-hant', htmlLang: 'zh-Hant', hreflang: 'zh-Hant', openGraphLocale: 'zh_TW', label: '繁體中文', shortLabel: 'HK', flag: '🇭🇰' },
  'zh-hans': { locale: 'zh-hans', htmlLang: 'zh-Hans', hreflang: 'zh-Hans', openGraphLocale: 'zh_CN', label: '简体中文', shortLabel: 'CN', flag: '🇨🇳' },
};

export const LOCALE_KEYS: Locale[] = [...RUNTIME_LOCALE_KEYS] as Locale[];

export function getLocaleConfig(localeStr: string): LocaleConfig {
  const config = LOCALES[localeStr as Locale];
  if (!config) {
    throw new Error(`[locales] Locale inválido ou não registrado: "${localeStr}"`);
  }
  return config;
}

export function findLocaleByHtmlLang(htmlLang: string): Locale | null {
  return Object.values(LOCALES).find((config) => config.htmlLang === htmlLang)?.locale ?? null;
}
import { LOCALE_KEYS as RUNTIME_LOCALE_KEYS } from './locale-keys.mjs';
