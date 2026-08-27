import { type Locale } from './locales';
import { getYesStyleLocaleConfig } from './clusters/yesstyle';
import { getReviewHubPath } from '@/lib/review-hubs';

export interface ShellNavLink {
  href: string;
  label: string;
  primary?: boolean;
  desktop?: boolean;
}

export type ShellCommercialLink =
  | {
      id: 'yesstyle';
      href: string;
      label: string;
      hrefLang?: never;
    }
  | {
      id: 'shein';
      href: string;
      hrefLang: 'pt-BR';
      label: string;
    };

export interface ShellCopy {
  locale: Locale;
  tagline: string;
  menuLabel: string;
  languageLabel: string;
  homeLabel: string;
  hubLabel: string;
  reviewHubLabel: string;
  sheinCouponsLabel: string;
  damieLabel: string;
  footerRights: string;
  contactLabel: string;
  privacyLabel: string;
  twitterDescription: string;
  followAria: string;
  listenAudio: string;
}

export const SHELL_DICTIONARY: Record<Locale, ShellCopy> = {
  pt: {
    locale: 'pt',
    tagline: 'Receitas que dão certo',
    menuLabel: 'Menu & Busca',
    languageLabel: 'Idioma',
    homeLabel: 'Início',
    hubLabel: 'Cupons',
    reviewHubLabel: 'Guias & Análises',
    sheinCouponsLabel: 'Cupons SHEIN',
    damieLabel: 'DAMIE',
    footerRights: 'Todos os direitos reservados.',
    contactLabel: 'Contato',
    privacyLabel: 'Privacidade',
    twitterDescription: 'Receitas caseiras, reviews sinceros e análises de produtos.',
    followAria: 'Siga @emcasacomcecilia no {social}',
    listenAudio: 'Ouvir artigo',
  },
  en: {
    locale: 'en',
    tagline: 'Home recipes & honest reviews',
    menuLabel: 'Menu',
    languageLabel: 'Language',
    homeLabel: 'Home',
    hubLabel: 'YesStyle Coupons',
    reviewHubLabel: 'Guides & Reviews',
    sheinCouponsLabel: 'SHEIN Coupons',
    damieLabel: 'DAMIE',
    footerRights: 'All rights reserved.',
    contactLabel: 'Contact',
    privacyLabel: 'Privacy',
    twitterDescription: 'Tested home recipes, verified discount coupons, and K-beauty reviews by Cecília Mauad.',
    followAria: 'Follow @emcasacomcecilia on {social}',
    listenAudio: 'Listen to article',
  },
  es: {
    locale: 'es',
    tagline: 'Recetas caseras y opiniones sinceras',
    menuLabel: 'Menú',
    languageLabel: 'Idioma',
    homeLabel: 'Inicio',
    hubLabel: 'Cupones YesStyle',
    reviewHubLabel: 'Guías y reseñas',
    sheinCouponsLabel: 'Cupones SHEIN',
    damieLabel: 'DAMIE',
    footerRights: 'Todos los derechos reservados.',
    contactLabel: 'Contacto',
    privacyLabel: 'Privacidad',
    twitterDescription: 'Recetas probadas, cupones de descuento verificados y guías de belleza por Cecília Mauad.',
    followAria: 'Sigue a @emcasacomcecilia en {social}',
    listenAudio: 'Escuchar artículo',
  },
  fr: {
    locale: 'fr',
    tagline: 'Recettes maison et avis sincères',
    menuLabel: 'Menu',
    languageLabel: 'Langue',
    homeLabel: 'Accueil',
    hubLabel: 'Coupons YesStyle',
    reviewHubLabel: 'Guides et avis',
    sheinCouponsLabel: 'Coupons SHEIN',
    damieLabel: 'DAMIE',
    footerRights: 'Tous droits réservés.',
    contactLabel: 'Contact',
    privacyLabel: 'Confidentialité',
    twitterDescription: 'Recettes maison, coupons de réduction vérifiés et guides K-beauty par Cecília Mauad.',
    followAria: 'Suivez @emcasacomcecilia sur {social}',
    listenAudio: "Écouter l'article",
  },
  de: {
    locale: 'de',
    tagline: 'Erprobte Rezepte & ehrliche Reviews',
    menuLabel: 'Menü',
    languageLabel: 'Sprache',
    homeLabel: 'Startseite',
    hubLabel: 'YesStyle Gutscheine',
    reviewHubLabel: 'Ratgeber und Tests',
    sheinCouponsLabel: 'SHEIN Gutscheine',
    damieLabel: 'DAMIE',
    footerRights: 'Alle Rechte vorbehalten.',
    contactLabel: 'Kontakt',
    privacyLabel: 'Datenschutz',
    twitterDescription: 'Erprobte Rezepte, verifizierte Gutscheincodes und K-Beauty Ratgeber von Cecília Mauad.',
    followAria: 'Folgen Sie @emcasacomcecilia auf {social}',
    listenAudio: 'Artikel anhören',
  },
  ko: {
    locale: 'ko',
    tagline: '홈 레시피 & 솔직한 리뷰',
    menuLabel: '메뉴',
    languageLabel: '언어',
    homeLabel: '홈',
    hubLabel: 'YesStyle 쿠폰',
    reviewHubLabel: '가이드와 리뷰',
    sheinCouponsLabel: 'SHEIN 쿠폰',
    damieLabel: 'DAMIE',
    footerRights: '모든 권리 보유.',
    contactLabel: '문의하기',
    privacyLabel: '개인정보처리방침',
    twitterDescription: '검증된 홈 레시피, YesStyle 리워드 코드 및 K-뷰티 가이드.',
    followAria: '{social}에서 @emcasacomcecilia 팔로우하기',
    listenAudio: '기사 듣기',
  },
  ja: {
    locale: 'ja',
    tagline: 'レシピと誠実なレビュー',
    menuLabel: 'メニュー',
    languageLabel: '言語',
    homeLabel: 'ホーム',
    hubLabel: 'YesStyle クーポン',
    reviewHubLabel: 'ガイドとレビュー',
    sheinCouponsLabel: 'SHEIN クーポン',
    damieLabel: 'DAMIE',
    footerRights: '全著作権所有。',
    contactLabel: 'お問い合わせ',
    privacyLabel: 'プライバシーポリシー',
    twitterDescription: '検証済みレシピ、YesStyleリワードコード、K-Beautyレビュー。',
    followAria: '{social}で@emcasacomceciliaをフォロー',
    listenAudio: '記事を聞く',
  },
  'zh-hant': {
    locale: 'zh-hant',
    tagline: '家常食譜與真實評測',
    menuLabel: '選單',
    languageLabel: '語言',
    homeLabel: '首頁',
    hubLabel: 'YesStyle 優惠碼',
    reviewHubLabel: '指南與評測',
    sheinCouponsLabel: 'SHEIN 優惠碼',
    damieLabel: 'DAMIE',
    footerRights: '版權所有，保留一切權利。',
    contactLabel: '聯絡我們',
    privacyLabel: '隱私權政策',
    twitterDescription: '經測試的家常食譜、驗證的 YesStyle 獎勵碼與美妝指南。',
    followAria: '在 {social} 上追蹤 @emcasacomcecilia',
    listenAudio: '收聽文章',
  },
  'zh-hans': {
    locale: 'zh-hans',
    tagline: '家常食谱与真实测评',
    menuLabel: '菜单',
    languageLabel: '语言',
    homeLabel: '首页',
    hubLabel: 'YesStyle 优惠码',
    reviewHubLabel: '指南与评测',
    sheinCouponsLabel: 'SHEIN 优惠码',
    damieLabel: 'DAMIE',
    footerRights: '版权所有，保留一切权利。',
    contactLabel: '联系我们',
    privacyLabel: '隐私政策',
    twitterDescription: '经测试的家常食谱、验证的 YesStyle 奖励码与美妆指南。',
    followAria: '在 {social} 上关注 @emcasacomcecilia',
    listenAudio: '收听文章',
  },
};

export function getShellCopy(localeStr: string): ShellCopy {
  const loc = (localeStr in SHELL_DICTIONARY ? localeStr : 'pt') as Locale;
  return SHELL_DICTIONARY[loc];
}

export function getShellHomeHref(localeStr: string): string {
  const loc = (localeStr in SHELL_DICTIONARY ? localeStr : 'pt') as Locale;
  return loc === 'pt' ? '/' : getReviewHubPath(loc);
}

export function getShellLanguageHubHref(locale: Locale): string {
  return locale === 'pt' ? '/reviews' : getReviewHubPath(locale);
}

export function getShellNavLinks(localeStr: string): ShellNavLink[] {
  const loc = (localeStr in SHELL_DICTIONARY ? localeStr : 'pt') as Locale;
  const copy = SHELL_DICTIONARY[loc];

  if (loc === 'pt') {
    return [
      { href: '/receitas', label: 'Receitas', primary: true },
      { href: '/reviews', label: 'Guias & Análises' },
      { href: '/videos', label: 'Vídeos' },
      { href: '/cupons', label: 'Cupons' },
      { href: '/sobre', label: 'Sobre' },
      { href: '/contato', label: 'Contato', desktop: false },
      { href: '/faqs', label: 'FAQs', desktop: false },
    ];
  }

  return [
    { href: getReviewHubPath(loc), label: copy.reviewHubLabel, primary: true },
  ];
}

export function getShellCommercialLinks(localeStr: string): ShellCommercialLink[] {
  const loc = (localeStr in SHELL_DICTIONARY ? localeStr : 'pt') as Locale;
  const copy = SHELL_DICTIONARY[loc];

  if (loc === 'pt') return [];

  return [
    {
      id: 'yesstyle',
      href: getYesStyleLocaleConfig(loc).hubPath,
      label: copy.hubLabel,
    },
    {
      id: 'shein',
      href: '/cupons/shein',
      hrefLang: 'pt-BR',
      label: copy.sheinCouponsLabel,
      // A campanha SHEIN está disponível apenas em PT-BR; o atributo declara o fallback ao leitor.
    },
  ];
}
