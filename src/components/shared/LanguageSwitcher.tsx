import Link from 'next/link';
import { Globe } from 'lucide-react';
import { FOCUS_RING } from '@/components/ui/focusRing';
import type { Locale } from '@/lib/i18n/locales';

export type ContentLocale = Locale;

type LanguageSwitcherProps = {
  currentLocale: ContentLocale;
  links: Partial<Record<ContentLocale, string>>;
};

const labels: Record<ContentLocale, string> = {
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
};

const languageNames: Record<ContentLocale, string> = {
  pt: 'Português', en: 'English', es: 'Español', fr: 'Français', de: 'Deutsch',
  it: 'Italiano',
  ko: '한국어', ja: '日本語', 'zh-hant': '繁體中文', 'zh-hans': '简体中文',
};

// Os outros idiomas do artigo, no topo dele (o seletor do menu é outro, no Navbar).
export function LanguageSwitcher({ currentLocale, links }: LanguageSwitcherProps) {
  const alternatives = (Object.keys(links) as ContentLocale[]).filter((locale) => locale !== currentLocale && links[locale]);
  return (
    <div className="flex flex-wrap items-center gap-x-2 rounded-[10px] border-2 border-marinho bg-white px-4 py-1.5 text-sm text-marinho">
      <span className="flex items-center gap-1.5 font-extrabold">
        <Globe aria-hidden="true" size={16} />
        {labels[currentLocale]}
      </span>
      <div className="flex flex-wrap items-center gap-x-2">
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
