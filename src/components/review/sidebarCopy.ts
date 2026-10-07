import type { Locale } from '@/lib/i18n/locales';

// Textos do sidebar do artigo: o ReviewSidebar no desktop e o equivalente dele no celular, o dock
// e a gaveta do ReviewMobileBottomBar. O rótulo de cópia do código vem de couponCopyLocale.ts.
export type SidebarCopy = {
  contents: string;
  openContents: (current: number, total: number, heading: string) => string;
  position: (current: number, total: number) => string;
  closeContents: string;
  sectionsNav: string;
  readingProgress: string;
  couponLabel: (brand?: string) => string;
  // O CECILIA010 da YesStyle não é cupom; o termo é o mesmo da página da YesStyle.
  rewardCodeLabel: (brand?: string) => string;
  copiedStatus: (code: string) => string;
  relatedTitle: string;
  // Só no desktop.
  tocTitle: string;
  copyHint: string;
  copiedHint: string;
};

// O rótulo do botão do dock contém o texto visível dele ("Sumário" e a seção), para quem o
// aciona por voz.
const sidebarCopy: Record<Locale, SidebarCopy> = {
  pt: {
    contents: 'Sumário',
    openContents: (current, total, heading) => `Abrir o sumário. Seção ${current} de ${total}: ${heading}`,
    position: (current, total) => `${current} de ${total}`,
    closeContents: 'Fechar o sumário',
    sectionsNav: 'Seções do artigo',
    readingProgress: 'Progresso de leitura',
    couponLabel: (brand) => (brand ? `Cupom ${brand}` : 'Cupom de desconto'),
    rewardCodeLabel: (brand) => (brand ? `Código de recompensa ${brand}` : 'Código de recompensa'),
    copiedStatus: (code) => `Código ${code} copiado.`,
    relatedTitle: 'Leia também',
    tocTitle: 'Nesta análise',
    copyHint: 'Copie antes de ir para a loja.',
    copiedHint: 'Código copiado. Cole no campo correto do checkout.',
  },
  en: {
    contents: 'Contents',
    openContents: (current, total, heading) => `Open contents. Section ${current} of ${total}: ${heading}`,
    position: (current, total) => `${current} of ${total}`,
    closeContents: 'Close contents',
    sectionsNav: 'Article sections',
    readingProgress: 'Reading progress',
    couponLabel: (brand) => (brand ? `${brand} code` : 'Discount code'),
    rewardCodeLabel: (brand) => (brand ? `${brand} Reward Code` : 'Reward Code'),
    copiedStatus: (code) => `Code ${code} copied.`,
    relatedTitle: 'Read next',
    tocTitle: 'In this guide',
    copyHint: 'Copy it before going to the store.',
    copiedHint: 'Code copied. Paste it into the right field at checkout.',
  },
  es: {
    contents: 'Índice',
    openContents: (current, total, heading) => `Abrir el índice. Sección ${current} de ${total}: ${heading}`,
    position: (current, total) => `${current} de ${total}`,
    closeContents: 'Cerrar el índice',
    sectionsNav: 'Secciones del artículo',
    readingProgress: 'Progreso de lectura',
    couponLabel: (brand) => (brand ? `Código ${brand}` : 'Código de descuento'),
    rewardCodeLabel: (brand) => (brand ? `Código de recompensa ${brand}` : 'Código de recompensa'),
    copiedStatus: (code) => `Código ${code} copiado.`,
    relatedTitle: 'Lee también',
    tocTitle: 'En esta guía',
    copyHint: 'Cópialo antes de ir a la tienda.',
    copiedHint: 'Código copiado. Pégalo en el campo correcto al finalizar la compra.',
  },
  fr: {
    contents: 'Sommaire',
    openContents: (current, total, heading) => `Ouvrir le sommaire. Section ${current} sur ${total} : ${heading}`,
    position: (current, total) => `${current} sur ${total}`,
    closeContents: 'Fermer le sommaire',
    sectionsNav: 'Sections de l’article',
    readingProgress: 'Progression de la lecture',
    couponLabel: (brand) => (brand ? `Code ${brand}` : 'Code promo'),
    rewardCodeLabel: (brand) => (brand ? `Code récompense ${brand}` : 'Code récompense'),
    copiedStatus: (code) => `Code ${code} copié.`,
    relatedTitle: 'À lire aussi',
    tocTitle: 'Dans ce guide',
    copyHint: 'Copiez-le avant d’aller sur la boutique.',
    copiedHint: 'Code copié. Collez-le dans le bon champ lors du paiement.',
  },
  de: {
    contents: 'Inhalt',
    openContents: (current, total, heading) => `Inhalt öffnen. Abschnitt ${current} von ${total}: ${heading}`,
    position: (current, total) => `${current} von ${total}`,
    closeContents: 'Inhalt schließen',
    sectionsNav: 'Abschnitte des Artikels',
    readingProgress: 'Lesefortschritt',
    couponLabel: (brand) => (brand ? `${brand}-Code` : 'Rabattcode'),
    rewardCodeLabel: (brand) => (brand ? `${brand} Reward Code` : 'Reward Code'),
    copiedStatus: (code) => `Code ${code} kopiert.`,
    relatedTitle: 'Weiterlesen',
    tocTitle: 'In diesem Ratgeber',
    copyHint: 'Kopiere ihn, bevor du zum Shop gehst.',
    copiedHint: 'Code kopiert. Füge ihn an der Kasse ins richtige Feld ein.',
  },
  it: {
    contents: 'Indice',
    openContents: (current, total, heading) => `Apri l’indice. Sezione ${current} di ${total}: ${heading}`,
    position: (current, total) => `${current} di ${total}`,
    closeContents: 'Chiudi l’indice',
    sectionsNav: 'Sezioni dell’articolo',
    readingProgress: 'Avanzamento della lettura',
    couponLabel: (brand) => (brand ? `Codice ${brand}` : 'Codice sconto'),
    rewardCodeLabel: (brand) => (brand ? `Codice ricompensa ${brand}` : 'Codice ricompensa'),
    copiedStatus: (code) => `Codice ${code} copiato.`,
    relatedTitle: 'Leggi anche',
    tocTitle: 'In questa guida',
    copyHint: 'Copialo prima di andare al negozio.',
    copiedHint: 'Codice copiato. Incollalo nel campo giusto al checkout.',
  },
  ko: {
    contents: '목차',
    openContents: (current, total, heading) => `목차 열기. ${total}개 중 ${current}번째 섹션: ${heading}`,
    position: (current, total) => `${current} / ${total}`,
    closeContents: '목차 닫기',
    sectionsNav: '본문 섹션',
    readingProgress: '읽기 진행률',
    couponLabel: (brand) => (brand ? `${brand} 코드` : '할인 코드'),
    rewardCodeLabel: (brand) => (brand ? `${brand} 리워드 코드` : '리워드 코드'),
    copiedStatus: (code) => `코드 ${code} 복사 완료.`,
    relatedTitle: '함께 읽어 보세요',
    tocTitle: '목차',
    copyHint: '스토어로 이동하기 전에 복사하세요.',
    copiedHint: '코드 복사 완료. 결제할 때 알맞은 칸에 붙여 넣으세요.',
  },
  ja: {
    contents: '目次',
    openContents: (current, total, heading) => `目次を開く。${total}セクション中${current}番目：${heading}`,
    position: (current, total) => `${current} / ${total}`,
    closeContents: '目次を閉じる',
    sectionsNav: '記事のセクション',
    readingProgress: '読み進めた割合',
    couponLabel: (brand) => (brand ? `${brand}のコード` : '割引コード'),
    rewardCodeLabel: (brand) => (brand ? `${brand}のリワードコード` : 'リワードコード'),
    copiedStatus: (code) => `コード ${code} をコピーしました。`,
    relatedTitle: 'あわせて読みたい',
    tocTitle: '目次',
    copyHint: 'ストアへ移動する前にコピーしてください。',
    copiedHint: 'コードをコピーしました。チェックアウトで正しい欄に貼り付けてください。',
  },
  'zh-hant': {
    contents: '目錄',
    openContents: (current, total, heading) => `開啟目錄。第 ${current} 節，共 ${total} 節：${heading}`,
    position: (current, total) => `${current} / ${total}`,
    closeContents: '關閉目錄',
    sectionsNav: '文章段落',
    readingProgress: '閱讀進度',
    couponLabel: (brand) => (brand ? `${brand} 優惠碼` : '優惠碼'),
    rewardCodeLabel: (brand) => (brand ? `${brand} 獎勵碼` : '獎勵碼'),
    copiedStatus: (code) => `已複製代碼 ${code}。`,
    relatedTitle: '延伸閱讀',
    tocTitle: '目錄',
    copyHint: '前往商店前請先複製。',
    copiedHint: '已複製代碼。結帳時請貼到正確的欄位。',
  },
  'zh-hans': {
    contents: '目录',
    openContents: (current, total, heading) => `打开目录。第 ${current} 节，共 ${total} 节：${heading}`,
    position: (current, total) => `${current} / ${total}`,
    closeContents: '关闭目录',
    sectionsNav: '文章段落',
    readingProgress: '阅读进度',
    couponLabel: (brand) => (brand ? `${brand} 优惠码` : '优惠码'),
    rewardCodeLabel: (brand) => (brand ? `${brand} 奖励码` : '奖励码'),
    copiedStatus: (code) => `已复制代码 ${code}。`,
    relatedTitle: '延伸阅读',
    tocTitle: '目录',
    copyHint: '前往商店前请先复制。',
    copiedHint: '已复制代码。结账时请粘贴到正确的栏位。',
  },
};

export function getSidebarCopy(locale: Locale): SidebarCopy {
  return sidebarCopy[locale];
}
