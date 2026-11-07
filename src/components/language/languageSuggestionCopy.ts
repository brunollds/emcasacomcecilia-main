import type { Locale } from '@/lib/i18n/locales';

// A faixa fala no idioma que ela sugere, não no da página: quem a lê é quem entende esse idioma.
// A faixa importa este arquivo direto (e não por props do layout), para os 10 textos não irem ao HTML.
export interface LanguageSuggestionCopy {
  regionLabel: string;
  message: string;
  action: string;
  dismiss: string;
}

export const LANGUAGE_SUGGESTION_COPY: Record<Locale, LanguageSuggestionCopy> = {
  pt: {
    regionLabel: 'Sugestão de idioma',
    message: 'Esta página também está em português.',
    action: 'Ler em português',
    dismiss: 'Fechar',
  },
  en: {
    regionLabel: 'Language suggestion',
    message: 'This page is also available in English.',
    action: 'Read in English',
    dismiss: 'Close',
  },
  es: {
    regionLabel: 'Sugerencia de idioma',
    message: 'Esta página también está disponible en español.',
    action: 'Leer en español',
    dismiss: 'Cerrar',
  },
  fr: {
    regionLabel: 'Suggestion de langue',
    message: 'Cette page est aussi disponible en français.',
    action: 'Lire en français',
    dismiss: 'Fermer',
  },
  de: {
    regionLabel: 'Sprachvorschlag',
    message: 'Diese Seite gibt es auch auf Deutsch.',
    action: 'Auf Deutsch lesen',
    dismiss: 'Schließen',
  },
  it: {
    regionLabel: 'Suggerimento di lingua',
    message: 'Questa pagina è disponibile anche in italiano.',
    action: 'Leggi in italiano',
    dismiss: 'Chiudi',
  },
  ko: {
    regionLabel: '언어 제안',
    message: '이 페이지는 한국어로도 볼 수 있습니다.',
    action: '한국어로 보기',
    dismiss: '닫기',
  },
  ja: {
    regionLabel: '言語の提案',
    message: 'このページは日本語でもご覧いただけます。',
    action: '日本語で読む',
    dismiss: '閉じる',
  },
  'zh-hant': {
    regionLabel: '語言建議',
    message: '本頁也提供繁體中文版。',
    action: '以繁體中文閱讀',
    dismiss: '關閉',
  },
  'zh-hans': {
    regionLabel: '语言建议',
    message: '本页也有简体中文版。',
    action: '用简体中文阅读',
    dismiss: '关闭',
  },
};
