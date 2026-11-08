import { type Locale } from './locales';

export interface ShellCopy {
  locale: Locale;
  tagline: string;
  openMenuLabel: string;
  closeMenuLabel: string;
  openSearchLabel: string;
  closeSearchLabel: string;
  languageLabel: string;
  homeLabel: string;
  reviewHubLabel: string;
  damieLabel: string;
  footerRights: string;
  contactLabel: string;
  footerExploreLabel: string;
  footerHouseLabel: string;
  privacyLabel: string;
  twitterDescription: string;
  followAria: string;
  listenAudio: string;
}

export const SHELL_DICTIONARY: Record<Locale, ShellCopy> = {
  pt: {
    locale: 'pt',
    tagline: 'Receitas que dão certo',
    openMenuLabel: 'Abrir menu',
    closeMenuLabel: 'Fechar menu',
    openSearchLabel: 'Abrir busca',
    closeSearchLabel: 'Fechar busca',
    languageLabel: 'Idioma',
    homeLabel: 'Início',
    reviewHubLabel: 'Guias & Análises',
    damieLabel: 'DAMIE',
    footerRights: 'Todos os direitos reservados.',
    contactLabel: 'Contato',
    footerExploreLabel: 'Explorar',
    footerHouseLabel: 'Em Casa',
    privacyLabel: 'Privacidade',
    twitterDescription: 'Receitas caseiras, reviews sinceros e análises de produtos.',
    followAria: 'Siga @emcasacomcecilia no {social}',
    listenAudio: 'Ouvir artigo',
  },
  en: {
    locale: 'en',
    tagline: 'Home recipes & honest reviews',
    openMenuLabel: 'Open menu',
    closeMenuLabel: 'Close menu',
    openSearchLabel: 'Open search',
    closeSearchLabel: 'Close search',
    languageLabel: 'Language',
    homeLabel: 'Home',
    reviewHubLabel: 'Guides & Reviews',
    damieLabel: 'DAMIE',
    footerRights: 'All rights reserved.',
    contactLabel: 'Contact',
    footerExploreLabel: 'Explore',
    footerHouseLabel: 'At Home',
    privacyLabel: 'Privacy',
    twitterDescription: 'Tested home recipes, verified discount coupons, and K-beauty reviews by Cecília Mauad.',
    followAria: 'Follow @emcasacomcecilia on {social}',
    listenAudio: 'Listen to article',
  },
  es: {
    locale: 'es',
    tagline: 'Recetas caseras y opiniones sinceras',
    openMenuLabel: 'Abrir menú',
    closeMenuLabel: 'Cerrar menú',
    openSearchLabel: 'Abrir búsqueda',
    closeSearchLabel: 'Cerrar búsqueda',
    languageLabel: 'Idioma',
    homeLabel: 'Inicio',
    reviewHubLabel: 'Guías y reseñas',
    damieLabel: 'DAMIE',
    footerRights: 'Todos los derechos reservados.',
    contactLabel: 'Contacto',
    footerExploreLabel: 'Explorar',
    footerHouseLabel: 'En casa',
    privacyLabel: 'Privacidad',
    twitterDescription: 'Recetas probadas, cupones de descuento verificados y guías de belleza por Cecília Mauad.',
    followAria: 'Sigue a @emcasacomcecilia en {social}',
    listenAudio: 'Escuchar artículo',
  },
  fr: {
    locale: 'fr',
    tagline: 'Recettes maison et avis sincères',
    openMenuLabel: 'Ouvrir le menu',
    closeMenuLabel: 'Fermer le menu',
    openSearchLabel: 'Ouvrir la recherche',
    closeSearchLabel: 'Fermer la recherche',
    languageLabel: 'Langue',
    homeLabel: 'Accueil',
    reviewHubLabel: 'Guides et avis',
    damieLabel: 'DAMIE',
    footerRights: 'Tous droits réservés.',
    contactLabel: 'Contact',
    footerExploreLabel: 'Explorer',
    footerHouseLabel: 'À la maison',
    privacyLabel: 'Confidentialité',
    twitterDescription: 'Recettes maison, coupons de réduction vérifiés et guides K-beauty par Cecília Mauad.',
    followAria: 'Suivez @emcasacomcecilia sur {social}',
    listenAudio: "Écouter l'article",
  },
  de: {
    locale: 'de',
    tagline: 'Erprobte Rezepte & ehrliche Reviews',
    openMenuLabel: 'Menü öffnen',
    closeMenuLabel: 'Menü schließen',
    openSearchLabel: 'Suche öffnen',
    closeSearchLabel: 'Suche schließen',
    languageLabel: 'Sprache',
    homeLabel: 'Startseite',
    reviewHubLabel: 'Ratgeber und Tests',
    damieLabel: 'DAMIE',
    footerRights: 'Alle Rechte vorbehalten.',
    contactLabel: 'Kontakt',
    footerExploreLabel: 'Entdecken',
    footerHouseLabel: 'Zuhause',
    privacyLabel: 'Datenschutz',
    twitterDescription: 'Erprobte Rezepte, verifizierte Gutscheincodes und K-Beauty Ratgeber von Cecília Mauad.',
    followAria: 'Folgen Sie @emcasacomcecilia auf {social}',
    listenAudio: 'Artikel anhören',
  },
  it: {
    locale: 'it',
    tagline: 'Ricette di casa e recensioni sincere',
    openMenuLabel: 'Apri il menu',
    closeMenuLabel: 'Chiudi il menu',
    openSearchLabel: 'Apri la ricerca',
    closeSearchLabel: 'Chiudi la ricerca',
    languageLabel: 'Lingua',
    homeLabel: 'Home',
    reviewHubLabel: 'Guide e recensioni',
    damieLabel: 'DAMIE',
    footerRights: 'Tutti i diritti riservati.',
    contactLabel: 'Contatti',
    footerExploreLabel: 'Esplora',
    footerHouseLabel: 'In casa',
    privacyLabel: 'Privacy',
    twitterDescription: 'Ricette di casa, codici sconto verificati e guide K-beauty di Cecília Mauad.',
    followAria: 'Segui @emcasacomcecilia su {social}',
    listenAudio: 'Ascolta l’articolo',
  },
  ko: {
    locale: 'ko',
    tagline: '홈 레시피 & 솔직한 리뷰',
    openMenuLabel: '메뉴 열기',
    closeMenuLabel: '메뉴 닫기',
    openSearchLabel: '검색 열기',
    closeSearchLabel: '검색 닫기',
    languageLabel: '언어',
    homeLabel: '홈',
    reviewHubLabel: '가이드와 리뷰',
    damieLabel: 'DAMIE',
    footerRights: '모든 권리 보유.',
    contactLabel: '문의하기',
    footerExploreLabel: '둘러보기',
    footerHouseLabel: '집에서',
    privacyLabel: '개인정보처리방침',
    twitterDescription: '검증된 홈 레시피, YesStyle 리워드 코드 및 K-뷰티 가이드.',
    followAria: '{social}에서 @emcasacomcecilia 팔로우하기',
    listenAudio: '기사 듣기',
  },
  ja: {
    locale: 'ja',
    tagline: 'レシピと誠実なレビュー',
    openMenuLabel: 'メニューを開く',
    closeMenuLabel: 'メニューを閉じる',
    openSearchLabel: '検索を開く',
    closeSearchLabel: '検索を閉じる',
    languageLabel: '言語',
    homeLabel: 'ホーム',
    reviewHubLabel: 'ガイドとレビュー',
    damieLabel: 'DAMIE',
    footerRights: '全著作権所有。',
    contactLabel: 'お問い合わせ',
    footerExploreLabel: '見て回る',
    footerHouseLabel: 'おうちで',
    privacyLabel: 'プライバシーポリシー',
    twitterDescription: '検証済みレシピ、YesStyleリワードコード、K-Beautyレビュー。',
    followAria: '{social}で@emcasacomceciliaをフォロー',
    listenAudio: '記事を聞く',
  },
  'zh-hant': {
    locale: 'zh-hant',
    tagline: '家常食譜與真實評測',
    openMenuLabel: '開啟選單',
    closeMenuLabel: '關閉選單',
    openSearchLabel: '開啟搜尋',
    closeSearchLabel: '關閉搜尋',
    languageLabel: '語言',
    homeLabel: '首頁',
    reviewHubLabel: '指南與評測',
    damieLabel: 'DAMIE',
    footerRights: '版權所有，保留一切權利。',
    contactLabel: '聯絡我們',
    footerExploreLabel: '探索',
    footerHouseLabel: '居家生活',
    privacyLabel: '隱私權政策',
    twitterDescription: '經測試的家常食譜、驗證的 YesStyle 獎勵碼與美妝指南。',
    followAria: '在 {social} 上追蹤 @emcasacomcecilia',
    listenAudio: '收聽文章',
  },
  'zh-hans': {
    locale: 'zh-hans',
    tagline: '家常食谱与真实测评',
    openMenuLabel: '打开菜单',
    closeMenuLabel: '关闭菜单',
    openSearchLabel: '打开搜索',
    closeSearchLabel: '关闭搜索',
    languageLabel: '语言',
    homeLabel: '首页',
    reviewHubLabel: '指南与评测',
    damieLabel: 'DAMIE',
    footerRights: '版权所有，保留一切权利。',
    contactLabel: '联系我们',
    footerExploreLabel: '探索',
    footerHouseLabel: '居家生活',
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

// Logo, rodapé, início da trilha das lojas e seletor de idioma: a home do idioma (src/app/[locale]/page.tsx).
// Sem importar de localeHome.ts: o shell roda no cliente e levaria junto os textos das lojas.
export function getShellHomeHref(localeStr: string): string {
  const loc = (localeStr in SHELL_DICTIONARY ? localeStr : 'pt') as Locale;
  return loc === 'pt' ? '/' : `/${loc}`;
}
