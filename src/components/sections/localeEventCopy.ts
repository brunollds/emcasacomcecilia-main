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
    title: 'Cyber Monday',
    countdown: { days: '{days} days to go', tomorrow: 'it’s tomorrow', today: 'it’s today', last: 'last days' },
    guideSuffix: ', Cyber Monday guide',
    showAll: 'Show all {total} guides',
    showLess: 'Show less',
  },
  es: {
    title: 'Cyber Monday',
    countdown: { days: 'faltan {days} días', tomorrow: 'es mañana', today: 'es hoy', last: 'últimos días' },
    guideSuffix: ', guía del Cyber Monday',
    showAll: 'Mostrar las {total} guías',
    showLess: 'Mostrar menos',
  },
  fr: {
    title: 'Cyber Monday',
    countdown: { days: 'dans {days} jours', tomorrow: 'c’est demain', today: 'c’est aujourd’hui', last: 'derniers jours' },
    guideSuffix: ', guide du Cyber Monday',
    showAll: 'Afficher les {total} guides',
    showLess: 'Afficher moins',
  },
  de: {
    title: 'Cyber Monday',
    countdown: { days: 'noch {days} Tage', tomorrow: 'schon morgen', today: 'heute', last: 'letzte Tage' },
    guideSuffix: ', Cyber-Monday-Ratgeber',
    showAll: 'Alle {total} Ratgeber anzeigen',
    showLess: 'Weniger anzeigen',
  },
  it: {
    title: 'Cyber Monday',
    countdown: { days: 'mancano {days} giorni', tomorrow: 'è domani', today: 'è oggi', last: 'ultimi giorni' },
    guideSuffix: ', guida al Cyber Monday',
    showAll: 'Mostra tutte le {total} guide',
    showLess: 'Mostra meno',
  },
  ja: {
    title: 'サイバーマンデー',
    countdown: { days: 'あと{days}日', tomorrow: '明日です', today: '今日です', last: 'まもなく終了' },
    guideSuffix: '、サイバーマンデーガイド',
    showAll: '全{total}件のガイドを表示',
    showLess: '表示を減らす',
  },
  ko: {
    title: '사이버 먼데이',
    countdown: { days: '{days}일 남음', tomorrow: '내일입니다', today: '오늘입니다', last: '마지막 며칠' },
    guideSuffix: ', 사이버 먼데이 가이드',
    showAll: '가이드 {total}개 모두 보기',
    showLess: '간략히 보기',
  },
  'zh-hant': {
    title: '網路星期一',
    countdown: { days: '還有 {days} 天', tomorrow: '就在明天', today: '就是今天', last: '最後幾天' },
    guideSuffix: '，網路星期一指南',
    showAll: '顯示全部 {total} 篇指南',
    showLess: '收合',
  },
  'zh-hans': {
    title: '网络星期一',
    countdown: { days: '还有 {days} 天', tomorrow: '就在明天', today: '就是今天', last: '最后几天' },
    guideSuffix: '，网络星期一指南',
    showAll: '显示全部 {total} 篇指南',
    showLess: '收起',
  },
  ar: {
    title: 'سايبر مونداي',
    countdown: { days: 'الأيام المتبقية: {days}', tomorrow: 'غدًا', today: 'اليوم', last: 'الأيام الأخيرة' },
    guideSuffix: '، دليل سايبر مونداي',
    showAll: 'عرض جميع الأدلة ({total})',
    showLess: 'عرض أقل',
  },
};

export const LOCALE_EVENT_COPY: Record<string, Record<TranslatedLocale, LocaleEventCopy>> = {
  'black-friday-2026': BLACK_FRIDAY_2026,
};
