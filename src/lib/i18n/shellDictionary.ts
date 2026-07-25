import { type YesStyleLocale, YESSTYLE_LOCALES } from './yesstyleCluster';

export interface ShellCopy {
  locale: YesStyleLocale;
  tagline: string;
  menuLabel: string;
  homeLabel: string;
  hubLabel: string;
  rewardArticleLabel: string;
  guideLabel: string;
  damieLabel: string;
  footerRights: string;
  contactLabel: string;
  privacyLabel: string;
  twitterDescription: string;
}

export const SHELL_DICTIONARY: Record<YesStyleLocale, ShellCopy> = {
  pt: {
    locale: 'pt',
    tagline: 'Receitas que dão certo',
    menuLabel: 'Menu & Busca',
    homeLabel: 'Início',
    hubLabel: 'Cupons',
    rewardArticleLabel: 'Guia do Código',
    guideLabel: 'Como Encontrar Cupons',
    damieLabel: 'DAMIE',
    footerRights: 'Todos os direitos reservados.',
    contactLabel: 'Contato',
    privacyLabel: 'Privacidade',
    twitterDescription: 'Receitas caseiras, reviews sinceros e análises de produtos.',
  },
  en: {
    locale: 'en',
    tagline: 'Home recipes & honest reviews',
    menuLabel: 'Menu',
    homeLabel: 'Home',
    hubLabel: 'YesStyle Coupons',
    rewardArticleLabel: 'Reward Code Guide',
    guideLabel: 'Coupon Stacking Guide',
    damieLabel: 'DAMIE',
    footerRights: 'All rights reserved.',
    contactLabel: 'Contact',
    privacyLabel: 'Privacy',
    twitterDescription: 'Tested home recipes, verified discount coupons, and K-beauty reviews by Cecília Mauad.',
  },
  es: {
    locale: 'es',
    tagline: 'Recetas caseras y opiniones sinceras',
    menuLabel: 'Menú',
    homeLabel: 'Inicio',
    hubLabel: 'Cupones YesStyle',
    rewardArticleLabel: 'Guía del Código',
    guideLabel: 'Guía de Cupones',
    damieLabel: 'DAMIE',
    footerRights: 'Todos los derechos reservados.',
    contactLabel: 'Contacto',
    privacyLabel: 'Privacidad',
    twitterDescription: 'Recetas probadas, cupones de descuento verificados y guías de belleza por Cecília Mauad.',
  },
  fr: {
    locale: 'fr',
    tagline: 'Recettes maison et avis sincères',
    menuLabel: 'Menu',
    homeLabel: 'Accueil',
    hubLabel: 'Coupons YesStyle',
    rewardArticleLabel: 'Guide du Code',
    guideLabel: 'Guide des Coupons',
    damieLabel: 'DAMIE',
    footerRights: 'Tous droits réservés.',
    contactLabel: 'Contact',
    privacyLabel: 'Confidentialité',
    twitterDescription: 'Recettes maison, coupons de réduction vérifiés et guides K-beauty par Cecília Mauad.',
  },
  de: {
    locale: 'de',
    tagline: 'Erprobte Rezepte & ehrliche Reviews',
    menuLabel: 'Menü',
    homeLabel: 'Startseite',
    hubLabel: 'YesStyle Gutscheine',
    rewardArticleLabel: 'Code-Ratgeber',
    guideLabel: 'Gutschein-Ratgeber',
    damieLabel: 'DAMIE',
    footerRights: 'Alle Rechte vorbehalten.',
    contactLabel: 'Kontakt',
    privacyLabel: 'Datenschutz',
    twitterDescription: 'Erprobte Rezepte, verifizierte Gutscheincodes und K-Beauty Ratgeber von Cecília Mauad.',
  },
  ko: {
    locale: 'ko',
    tagline: '홈 레시피 & 솔직한 리뷰',
    menuLabel: '메뉴',
    homeLabel: '홈',
    hubLabel: 'YesStyle 쿠폰',
    rewardArticleLabel: '코드 사용 가이드',
    guideLabel: '쿠폰 찾기 가이드',
    damieLabel: 'DAMIE',
    footerRights: '모든 권리 보유.',
    contactLabel: '문의하기',
    privacyLabel: '개인정보처리방침',
    twitterDescription: '검증된 홈 레시피, YesStyle 리워드 코드 및 K-뷰티 가이드.',
  },
  ja: {
    locale: 'ja',
    tagline: 'レシピと誠実なレビュー',
    menuLabel: 'メニュー',
    homeLabel: 'ホーム',
    hubLabel: 'YesStyle クーポン',
    rewardArticleLabel: 'コード使い方ガイド',
    guideLabel: 'クーポン探しガイド',
    damieLabel: 'DAMIE',
    footerRights: 'All rights reserved.',
    contactLabel: 'お問い合わせ',
    privacyLabel: 'プライバシーポリシー',
    twitterDescription: '検証済みレシピ、YesStyleリワードコード、K-Beautyレビュー。',
  },
  'zh-hant': {
    locale: 'zh-hant',
    tagline: '家常食譜與真實評測',
    menuLabel: '選單',
    homeLabel: '首頁',
    hubLabel: 'YesStyle 優惠碼',
    rewardArticleLabel: '代碼使用指南',
    guideLabel: '優惠碼尋找指南',
    damieLabel: 'DAMIE',
    footerRights: '版權所有，保留一切權利。',
    contactLabel: '聯絡我們',
    privacyLabel: '隱私權政策',
    twitterDescription: '經測試的家常食譜、驗證的 YesStyle 獎勵碼與美妝指南。',
  },
  'zh-hans': {
    locale: 'zh-hans',
    tagline: '家常食谱与真实测评',
    menuLabel: '菜单',
    homeLabel: '首页',
    hubLabel: 'YesStyle 优惠码',
    rewardArticleLabel: '代码使用指南',
    guideLabel: '优惠码寻找指南',
    damieLabel: 'DAMIE',
    footerRights: '版权所有，保留一切权利。',
    contactLabel: '联系我们',
    privacyLabel: '隐私政策',
    twitterDescription: '经测试的家常食谱、验证的 YesStyle 奖励码与美妆指南。',
  },
};

export function getShellCopy(localeStr: string): ShellCopy {
  const loc = (localeStr in SHELL_DICTIONARY ? localeStr : 'pt') as YesStyleLocale;
  return SHELL_DICTIONARY[loc];
}

export function getShellNavLinks(localeStr: string) {
  const loc = (localeStr in SHELL_DICTIONARY ? localeStr : 'pt') as YesStyleLocale;
  const config = YESSTYLE_LOCALES[loc];
  const copy = SHELL_DICTIONARY[loc];

  if (loc === 'pt') {
    return [
      { href: '/receitas', label: 'Receitas', primary: true },
      { href: '/reviews', label: 'Reviews' },
      { href: '/cupons', label: 'Cupons' },
      { href: '/sobre', label: 'Sobre' },
      { href: '/contato', label: 'Contato' },
      { href: '/faqs', label: 'FAQs' },
    ];
  }

  return [
    { href: config.hubPath, label: copy.hubLabel, primary: true },
    { href: config.rewardArticlePath, label: copy.rewardArticleLabel },
    { href: config.guidePath, label: copy.guideLabel },
  ];
}
