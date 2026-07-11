import Link from 'next/link';
import { Globe } from 'lucide-react';

export type ContentLocale = 'pt' | 'en' | 'es' | 'fr' | 'de' | 'ko' | 'ja' | 'zh-hant' | 'zh-hans';

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
  ko: '다른 언어로 보기:',
  ja: 'ほかの言語で読む:',
  'zh-hant': '以其他語言閱讀此內容：',
  'zh-hans': '使用其他语言阅读此内容：',
};

const languageNames: Record<ContentLocale, string> = {
  pt: 'Português', en: 'English', es: 'Español', fr: 'Français', de: 'Deutsch',
  ko: '한국어', ja: '日本語', 'zh-hant': '繁體中文', 'zh-hans': '简体中文',
};

export function LanguageSwitcher({ currentLocale, links }: LanguageSwitcherProps) {
  const alternatives = (Object.keys(links) as ContentLocale[]).filter((locale) => locale !== currentLocale && links[locale]);
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2 rounded-lg border border-[#1a4d2e]/10 bg-[#faf8f3] px-4 py-2.5 text-xs text-[#4a5568]">
      <span className="flex items-center gap-1.5 font-semibold text-[#1a4d2e]">
        <Globe size={14} className="text-[#ff6b35]" />
        {labels[currentLocale]}
      </span>
      <div className="ml-1 flex flex-wrap items-center gap-2">
        {alternatives.map((locale, index) => (
          <span key={locale} className="inline-flex items-center gap-2">
            <Link href={links[locale]!} hrefLang={locale} className="font-medium text-[#1a4d2e] underline underline-offset-4 transition-colors hover:text-[#ff6b35]">
              {languageNames[locale]}
            </Link>
            {index < alternatives.length - 1 && <span className="text-[#1a4d2e]/20">|</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
