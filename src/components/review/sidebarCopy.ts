import type { CouponCodeKind } from '@/lib/couponsData';
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
  // O 4CW5Y da SHEIN é código de indicação da SHEIN Brasil, pesquisado no aplicativo; fora do PT o
  // texto diz que ele é de lá. Os termos são os da página da loja (couponTranslations.ts).
  referralCodeLabel: (brand: string) => string;
  copiedStatus: (code: string) => string;
  relatedTitle: string;
  // Só no desktop.
  tocTitle: string;
  copyHint: string;
  copiedHint: string;
  // Sob o código de indicação, no lugar de copyHint e copiedHint: ele não se cola no checkout.
  referralCopyHint: (brand: string) => string;
  referralCopiedHint: (brand: string) => string;
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
    referralCodeLabel: (brand) => `Código de indicação ${brand}`,
    copiedStatus: (code) => `Código ${code} copiado.`,
    relatedTitle: 'Leia também',
    tocTitle: 'Nesta análise',
    copyHint: 'Copie antes de ir para a loja.',
    copiedHint: 'Código copiado. Cole no campo correto do checkout.',
    referralCopyHint: (brand) => `Copie e pesquise no aplicativo ${brand}.`,
    referralCopiedHint: (brand) => `Código copiado. Pesquise no aplicativo ${brand}.`,
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
    referralCodeLabel: (brand) => `${brand} Brazil referral code`,
    copiedStatus: (code) => `Code ${code} copied.`,
    relatedTitle: 'Read next',
    tocTitle: 'In this guide',
    copyHint: 'Copy it before going to the store.',
    copiedHint: 'Code copied. Paste it into the right field at checkout.',
    referralCopyHint: (brand) => `Copy it, then search for it in the ${brand} app.`,
    referralCopiedHint: (brand) => `Code copied. Search for it in the ${brand} app.`,
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
    referralCodeLabel: (brand) => `Código de referido de ${brand} Brasil`,
    copiedStatus: (code) => `Código ${code} copiado.`,
    relatedTitle: 'Lee también',
    tocTitle: 'En esta guía',
    copyHint: 'Cópialo antes de ir a la tienda.',
    copiedHint: 'Código copiado. Pégalo en el campo correcto al finalizar la compra.',
    referralCopyHint: (brand) => `Cópialo y búscalo en la app de ${brand}.`,
    referralCopiedHint: (brand) => `Código copiado. Búscalo en la app de ${brand}.`,
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
    referralCodeLabel: (brand) => `Code de parrainage ${brand} Brésil`,
    copiedStatus: (code) => `Code ${code} copié.`,
    relatedTitle: 'À lire aussi',
    tocTitle: 'Dans ce guide',
    copyHint: 'Copiez-le avant d’aller sur la boutique.',
    copiedHint: 'Code copié. Collez-le dans le bon champ lors du paiement.',
    referralCopyHint: (brand) => `Copiez-le, puis recherchez-le dans l’appli ${brand}.`,
    referralCopiedHint: (brand) => `Code copié. Recherchez-le dans l’appli ${brand}.`,
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
    referralCodeLabel: (brand) => `Empfehlungscode von ${brand} Brasilien`,
    copiedStatus: (code) => `Code ${code} kopiert.`,
    relatedTitle: 'Weiterlesen',
    tocTitle: 'In diesem Ratgeber',
    copyHint: 'Kopiere ihn, bevor du zum Shop gehst.',
    copiedHint: 'Code kopiert. Füge ihn an der Kasse ins richtige Feld ein.',
    referralCopyHint: (brand) => `Kopiere ihn und suche ihn in der ${brand}-App.`,
    referralCopiedHint: (brand) => `Code kopiert. Suche ihn in der ${brand}-App.`,
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
    referralCodeLabel: (brand) => `Codice invito ${brand} Brasile`,
    copiedStatus: (code) => `Codice ${code} copiato.`,
    relatedTitle: 'Leggi anche',
    tocTitle: 'In questa guida',
    copyHint: 'Copialo prima di andare al negozio.',
    copiedHint: 'Codice copiato. Incollalo nel campo giusto al checkout.',
    referralCopyHint: (brand) => `Copialo e cercalo nell’app ${brand}.`,
    referralCopiedHint: (brand) => `Codice copiato. Cercalo nell’app ${brand}.`,
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
    referralCodeLabel: (brand) => `${brand} 브라질 추천 코드`,
    copiedStatus: (code) => `코드 ${code} 복사 완료.`,
    relatedTitle: '함께 읽어 보세요',
    tocTitle: '목차',
    copyHint: '스토어로 이동하기 전에 복사하세요.',
    copiedHint: '코드 복사 완료. 결제할 때 알맞은 칸에 붙여 넣으세요.',
    referralCopyHint: (brand) => `복사한 뒤 ${brand} 앱에서 검색하세요.`,
    referralCopiedHint: (brand) => `코드 복사 완료. ${brand} 앱에서 검색하세요.`,
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
    referralCodeLabel: (brand) => `${brand} ブラジルの紹介コード`,
    copiedStatus: (code) => `コード ${code} をコピーしました。`,
    relatedTitle: 'あわせて読みたい',
    tocTitle: '目次',
    copyHint: 'ストアへ移動する前にコピーしてください。',
    copiedHint: 'コードをコピーしました。チェックアウトで正しい欄に貼り付けてください。',
    referralCopyHint: (brand) => `コピーして、${brand} アプリで検索してください。`,
    referralCopiedHint: (brand) => `コードをコピーしました。${brand} アプリで検索してください。`,
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
    referralCodeLabel: (brand) => `${brand} 巴西站推薦碼`,
    copiedStatus: (code) => `已複製代碼 ${code}。`,
    relatedTitle: '延伸閱讀',
    tocTitle: '目錄',
    copyHint: '前往商店前請先複製。',
    copiedHint: '已複製代碼。結帳時請貼到正確的欄位。',
    referralCopyHint: (brand) => `請先複製，再到 ${brand} App 搜尋。`,
    referralCopiedHint: (brand) => `已複製代碼。請到 ${brand} App 搜尋。`,
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
    referralCodeLabel: (brand) => `${brand} 巴西站推荐码`,
    copiedStatus: (code) => `已复制代码 ${code}。`,
    relatedTitle: '延伸阅读',
    tocTitle: '目录',
    copyHint: '前往商店前请先复制。',
    copiedHint: '已复制代码。结账时请粘贴到正确的栏位。',
    referralCopyHint: (brand) => `请先复制，再到 ${brand} App 中搜索。`,
    referralCopiedHint: (brand) => `已复制代码。请到 ${brand} App 中搜索。`,
  },
};

export function getSidebarCopy(locale: Locale): SidebarCopy {
  return sidebarCopy[locale];
}

// Título do código no card do dock: cupom comum, código de recompensa ou código de indicação.
export function getCodeTitle(copy: SidebarCopy, kind: CouponCodeKind | undefined, brand?: string): string {
  if (kind === 'reward') return copy.rewardCodeLabel(brand);
  if (kind === 'referral' && brand) return copy.referralCodeLabel(brand);
  return copy.couponLabel(brand);
}

// Frases da sidebar sob o código, antes e depois de copiar. O de indicação não se cola no checkout.
export function getCodeHints(copy: SidebarCopy, kind: CouponCodeKind | undefined, brand?: string): { copy: string; copied: string } {
  return kind === 'referral' && brand
    ? { copy: copy.referralCopyHint(brand), copied: copy.referralCopiedHint(brand) }
    : { copy: copy.copyHint, copied: copy.copiedHint };
}
