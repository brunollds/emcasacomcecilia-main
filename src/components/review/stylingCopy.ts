import type { Locale } from '@/lib/i18n/locales';

// O francês pede espaço antes de : ; ? ! e %, e ele não pode quebrar a linha.
const NBSP = ' ';

// Textos do card de estilo dos artigos de roupa (ArticleStyling): as três abas, que também são os rótulos das
// etiquetas, e as partes do "combina com". O `avoid` já traz os dois-pontos do idioma.
export type StylingCopy = {
  howTo: string;
  occasion: string;
  pairsWith: string;
  closet: string;
  byColor: string;
  avoid: string;
  newTab: string;
  tips: string;
  tipsFor: (piece: string) => string;
};

const stylingCopy: Record<Locale, StylingCopy> = {
  pt: {
    howTo: 'Como usar',
    occasion: 'Ocasião',
    pairsWith: 'Combina com',
    closet: 'Do seu armário',
    byColor: 'Por cor',
    avoid: 'Evite:',
    newTab: '(abre em nova aba)',
    tips: 'Dicas de estilo',
    tipsFor: (piece) => `Dicas de estilo: ${piece}`,
  },
  en: {
    howTo: 'How to wear',
    occasion: 'Occasion',
    pairsWith: 'Pairs with',
    closet: 'From your closet',
    byColor: 'By color',
    avoid: 'Avoid:',
    newTab: '(opens in a new tab)',
    tips: 'Styling tips',
    tipsFor: (piece) => `Styling tips: ${piece}`,
  },
  es: {
    howTo: 'Cómo llevar',
    occasion: 'Ocasión',
    pairsWith: 'Combina con',
    closet: 'De tu armario',
    byColor: 'Por color',
    avoid: 'Evita:',
    newTab: '(se abre en una pestaña nueva)',
    tips: 'Consejos de estilo',
    tipsFor: (piece) => `Consejos de estilo: ${piece}`,
  },
  fr: {
    howTo: 'Comment porter',
    occasion: 'Occasion',
    pairsWith: 'Va avec',
    closet: 'Dans votre placard',
    byColor: 'Par couleur',
    avoid: `À éviter${NBSP}:`,
    newTab: '(s’ouvre dans un nouvel onglet)',
    tips: 'Conseils de style',
    tipsFor: (piece) => `Conseils de style${NBSP}: ${piece}`,
  },
  de: {
    howTo: 'Verwendung',
    occasion: 'Anlass',
    pairsWith: 'Passt zu',
    closet: 'Aus dem Schrank',
    byColor: 'Nach Farbe',
    avoid: 'Lieber nicht:',
    newTab: '(öffnet in neuem Tab)',
    tips: 'Styling-Tipps',
    tipsFor: (piece) => `Styling-Tipps: ${piece}`,
  },
  it: {
    howTo: 'Come indossare',
    occasion: 'Occasione',
    pairsWith: 'Sta bene con',
    closet: 'Dal tuo armadio',
    byColor: 'Per colore',
    avoid: 'Da evitare:',
    newTab: '(si apre in una nuova scheda)',
    tips: 'Consigli di stile',
    tipsFor: (piece) => `Consigli di stile: ${piece}`,
  },
  ko: {
    howTo: '입는 법',
    occasion: '상황',
    pairsWith: '어울리는 옷',
    closet: '내 옷장에서',
    byColor: '색상별',
    avoid: '피하기:',
    newTab: '(새 탭에서 열림)',
    tips: '스타일링 팁',
    tipsFor: (piece) => `스타일링 팁: ${piece}`,
  },
  ja: {
    howTo: '着こなし',
    occasion: 'シーン',
    pairsWith: '合わせ方',
    closet: '手持ちの服',
    byColor: '色別',
    avoid: '避けたい：',
    newTab: '（新しいタブで開きます）',
    tips: 'スタイリングのヒント',
    tipsFor: (piece) => `${piece}の着こなし`,
  },
  'zh-hant': {
    howTo: '怎麼穿',
    occasion: '場合',
    pairsWith: '搭配',
    closet: '衣櫥裡的',
    byColor: '按顏色',
    avoid: '避免：',
    newTab: '（在新分頁中開啟）',
    tips: '穿搭建議',
    tipsFor: (piece) => `穿搭建議：${piece}`,
  },
  'zh-hans': {
    howTo: '怎么穿',
    occasion: '场合',
    pairsWith: '搭配',
    closet: '衣橱里的',
    byColor: '按颜色',
    avoid: '避免：',
    newTab: '（在新标签页中打开）',
    tips: '穿搭建议',
    tipsFor: (piece) => `穿搭建议：${piece}`,
  },
};

export function getStylingCopy(locale: Locale): StylingCopy {
  return stylingCopy[locale] ?? stylingCopy.pt;
}
