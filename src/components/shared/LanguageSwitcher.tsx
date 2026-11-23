'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Globe } from 'lucide-react';
import { FOCUS_RING } from '@/components/ui/focusRing';
import type { Locale } from '@/lib/i18n/locales';

export type ContentLocale = Locale;

type LanguageSwitcherProps = {
  currentLocale: ContentLocale;
  links: Partial<Record<ContentLocale, string>>;
};

const desktopLabels: Record<ContentLocale, string> = {
  pt: 'Leia este conteúdo em outros idiomas:',
  en: 'Read this content in other languages:',
  es: 'Lee este contenido en otros idiomas:',
  fr: 'Lire ce contenu dans une autre langue :',
  de: 'Diesen Inhalt in anderen Sprachen lesen:',
  it: 'Leggi questo contenuto in altre lingue:',
  ko: '다른 언어로 보기:',
  ja: 'ほかの言語で読む:',
  'zh-hant': '以其他語言閱讀此內容：',
  'zh-hans': '使用其他语言阅读此内容：',
  ar: 'اقرأ هذا المحتوى بلغات أخرى:',
};

const mobileLabels: Record<ContentLocale, string> = {
  pt: 'Ler em outro idioma',
  en: 'Read in another language',
  es: 'Leer en otro idioma',
  fr: 'Lire dans une autre langue',
  de: 'In anderer Sprache lesen',
  it: 'Leggi in un’altra lingua',
  ko: '다른 언어로 읽기',
  ja: 'ほかの言語で読む',
  'zh-hant': '以其他語言閱讀',
  'zh-hans': '使用其他语言阅读',
  ar: 'اقرأ بلغة أخرى',
};

const languageNames: Record<ContentLocale, string> = {
  pt: 'Português', en: 'English', es: 'Español', fr: 'Français', de: 'Deutsch',
  it: 'Italiano',
  ko: '한국어', ja: '日本語', 'zh-hant': '繁體中文', 'zh-hans': '简体中文',
  ar: 'العربية',
};

// Os outros idiomas do artigo, no topo dele (o seletor do menu é outro, no Navbar): recolhido em 1 linha no celular
// e aberto em linha no computador, com uma única lista de <a hreflang> presente no HTML inicial.
export function LanguageSwitcher({ currentLocale, links }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const alternatives = (Object.keys(links) as ContentLocale[]).filter((locale) => locale !== currentLocale && links[locale]);
  return (
    <div className="rounded-[10px] border-2 border-marinho bg-white text-[13px] text-marinho md:flex md:flex-wrap md:items-center md:gap-x-2 md:px-4 md:py-1.5 md:text-sm">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        className={`flex min-h-11 w-full cursor-pointer items-center justify-between gap-2 rounded-[8px] px-3.5 py-1.5 text-start font-extrabold md:hidden ${FOCUS_RING}`}
      >
        <span className="flex items-center gap-1.5">
          <Globe aria-hidden="true" size={15} className="shrink-0" />
          <span>{mobileLabels[currentLocale]}</span>
          <bdi dir="ltr" className="font-bold text-marinho-suave">({alternatives.length})</bdi>
        </span>
        <ChevronDown
          aria-hidden="true"
          size={16}
          className={`shrink-0 transition-transform motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <span className="flex items-center gap-1.5 font-extrabold max-md:hidden">
        <Globe aria-hidden="true" size={16} />
        {desktopLabels[currentLocale]}
      </span>

      <div
        id={panelId}
        className={`${open ? 'max-md:flex' : 'max-md:hidden'} flex flex-wrap items-center gap-x-2 max-md:border-t max-md:border-marinho/15 max-md:px-3.5 max-md:py-1.5`}
      >
        {alternatives.map((locale, index) => (
          <span key={locale} className="inline-flex items-center gap-2">
            <Link
              href={links[locale]!}
              hrefLang={locale}
              className={`inline-flex min-h-11 items-center font-bold underline underline-offset-[3px] hover:text-marinho-suave ${FOCUS_RING}`}
            >
              {languageNames[locale]}
            </Link>
            {index < alternatives.length - 1 && <span aria-hidden="true" className="text-marinho/30">|</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
