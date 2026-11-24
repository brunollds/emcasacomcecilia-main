import type { TranslatedLocale } from '@/lib/couponTranslations';

// Os textos da seção da data comercial nas homes dos 9 idiomas, por edição (o `id` em content/home-events.json): uma
// data sem textos aqui não aparece fora do PT. `{days}` e `{total}` são trocados pelo número.
export type LocaleEventCopy = {
  title: string;
  countdown: { days: string; tomorrow: string; today: string; last: string };
  guideSuffix: string;
  showAll: string;
  showLess: string;
};

const BLACK_FRIDAY_2026: Record<TranslatedLocale, LocaleEventCopy> = {
  en: {
    title: 'Black Friday',
    countdown: { days: '{days} days to go', tomorrow: 'it’s tomorrow', today: 'it’s today', last: 'last days' },
    guideSuffix: ', Black Friday guide',
    showAll: 'Show all {total} guides',
    showLess: 'Show less',
  },
  es: {
    title: 'Black Friday',
    countdown: { days: 'faltan {days} días', tomorrow: 'es mañana', today: 'es hoy', last: 'últimos días' },
    guideSuffix: ', guía del Black Friday',
    showAll: 'Mostrar las {total} guías',
    showLess: 'Mostrar menos',
  },
  fr: {
    title: 'Black Friday',
    countdown: { days: 'dans {days} jours', tomorrow: 'c’est demain', today: 'c’est aujourd’hui', last: 'derniers jours' },
    guideSuffix: ', guide du Black Friday',
    showAll: 'Afficher les {total} guides',
    showLess: 'Afficher moins',
  },
  de: {
    title: 'Black Friday',
    countdown: { days: 'noch {days} Tage', tomorrow: 'schon morgen', today: 'heute', last: 'letzte Tage' },
    guideSuffix: ', Black-Friday-Ratgeber',
    showAll: 'Alle {total} Ratgeber anzeigen',
    showLess: 'Weniger anzeigen',
  },
  it: {
    title: 'Black Friday',
    countdown: { days: 'mancano {days} giorni', tomorrow: 'è domani', today: 'è oggi', last: 'ultimi giorni' },
    guideSuffix: ', guida al Black Friday',
    showAll: 'Mostra tutte le {total} guide',
    showLess: 'Mostra meno',
  },
  ja: {
    title: 'ブラックフライデー',
    countdown: { days: 'あと{days}日', tomorrow: '明日です', today: '今日です', last: 'まもなく終了' },
    guideSuffix: '、ブラックフライデーガイド',
    showAll: '全{total}件のガイドを表示',
    showLess: '表示を減らす',
  },
  ko: {
    title: '블랙프라이데이',
    countdown: { days: '{days}일 남음', tomorrow: '내일입니다', today: '오늘입니다', last: '마지막 며칠' },
    guideSuffix: ', 블랙프라이데이 가이드',
    showAll: '가이드 {total}개 모두 보기',
    showLess: '간략히 보기',
  },
  'zh-hant': {
    title: '黑色星期五',
    countdown: { days: '還有 {days} 天', tomorrow: '就在明天', today: '就是今天', last: '最後幾天' },
    guideSuffix: '，黑色星期五指南',
    showAll: '顯示全部 {total} 篇指南',
    showLess: '收合',
  },
  'zh-hans': {
    title: '黑色星期五',
    countdown: { days: '还有 {days} 天', tomorrow: '就在明天', today: '就是今天', last: '最后几天' },
    guideSuffix: '，黑色星期五指南',
    showAll: '显示全部 {total} 篇指南',
    showLess: '收起',
  },
  ar: {
    title: 'الجمعة البيضاء',
    countdown: { days: 'الأيام المتبقية: {days}', tomorrow: 'غدًا', today: 'اليوم', last: 'الأيام الأخيرة' },
    guideSuffix: '، دليل الجمعة البيضاء',
    showAll: 'عرض جميع الأدلة ({total})',
    showLess: 'عرض أقل',
  },
};

export const LOCALE_EVENT_COPY: Record<string, Record<TranslatedLocale, LocaleEventCopy>> = {
  'black-friday-2026': BLACK_FRIDAY_2026,
};
