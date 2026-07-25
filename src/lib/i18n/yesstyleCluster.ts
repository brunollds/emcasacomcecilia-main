// Registro central de locales e rotas da YesStyle (Projeto A - A1)
// Única fonte da verdade para chaves i18n, tags HTML, Open Graph e rotas dos clusters YesStyle.

export type YesStyleLocale = 'pt' | 'en' | 'es' | 'fr' | 'de' | 'ko' | 'ja' | 'zh-hant' | 'zh-hans';

export interface YesStyleLocaleConfig {
  locale: YesStyleLocale;
  htmlLang: string;
  hreflang: string;
  openGraphLocale: string;
  label: string;
  flag: string;
  hubPath: string;
  rewardArticleSlug: string;
  rewardArticlePath: string;
  guideSlug: string;
  guidePath: string;
}

export const YESSTYLE_LOCALES: Record<YesStyleLocale, YesStyleLocaleConfig> = {
  pt: {
    locale: 'pt',
    htmlLang: 'pt-BR',
    hreflang: 'pt-BR',
    openGraphLocale: 'pt_BR',
    label: 'Português',
    flag: '🇧🇷',
    hubPath: '/cupons/yesstyle',
    rewardArticleSlug: 'codigo-cecilia010-yesstyle-como-usar',
    rewardArticlePath: '/reviews/codigo-cecilia010-yesstyle-como-usar',
    guideSlug: 'como-encontrar-cupons-yesstyle-validos',
    guidePath: '/reviews/como-encontrar-cupons-yesstyle-validos',
  },
  en: {
    locale: 'en',
    htmlLang: 'en',
    hreflang: 'en',
    openGraphLocale: 'en_US',
    label: 'English',
    flag: '🇺🇸',
    hubPath: '/en/coupons/yesstyle',
    rewardArticleSlug: 'yesstyle-reward-code-coupon-cecilia010',
    rewardArticlePath: '/reviews/yesstyle-reward-code-coupon-cecilia010',
    guideSlug: 'how-to-find-valid-yesstyle-coupon-codes',
    guidePath: '/reviews/how-to-find-valid-yesstyle-coupon-codes',
  },
  es: {
    locale: 'es',
    htmlLang: 'es',
    hreflang: 'es',
    openGraphLocale: 'es_ES',
    label: 'Español',
    flag: '🇪🇸',
    hubPath: '/es/coupons/yesstyle',
    rewardArticleSlug: 'codigo-de-recompensa-yesstyle-cupon-cecilia010',
    rewardArticlePath: '/reviews/codigo-de-recompensa-yesstyle-cupon-cecilia010',
    guideSlug: 'como-encontrar-cupones-yesstyle-validos',
    guidePath: '/reviews/como-encontrar-cupones-yesstyle-validos',
  },
  fr: {
    locale: 'fr',
    htmlLang: 'fr',
    hreflang: 'fr',
    openGraphLocale: 'fr_FR',
    label: 'Français',
    flag: '🇫🇷',
    hubPath: '/fr/coupons/yesstyle',
    rewardArticleSlug: 'code-recompense-yesstyle-cecilia010',
    rewardArticlePath: '/reviews/code-recompense-yesstyle-cecilia010',
    guideSlug: 'comment-trouver-des-codes-promo-yesstyle-valides',
    guidePath: '/reviews/comment-trouver-des-codes-promo-yesstyle-valides',
  },
  de: {
    locale: 'de',
    htmlLang: 'de',
    hreflang: 'de',
    openGraphLocale: 'de_DE',
    label: 'Deutsch',
    flag: '🇩🇪',
    hubPath: '/de/coupons/yesstyle',
    rewardArticleSlug: 'yesstyle-reward-code-rabatt-cecilia010',
    rewardArticlePath: '/reviews/yesstyle-reward-code-rabatt-cecilia010',
    guideSlug: 'gueltige-yesstyle-gutscheincodes-finden',
    guidePath: '/reviews/gueltige-yesstyle-gutscheincodes-finden',
  },
  ko: {
    locale: 'ko',
    htmlLang: 'ko',
    hreflang: 'ko',
    openGraphLocale: 'ko_KR',
    label: '한국어',
    flag: '🇰🇷',
    hubPath: '/ko/coupons/yesstyle',
    rewardArticleSlug: 'yesstyle-reward-code-cecilia010-ko',
    rewardArticlePath: '/reviews/yesstyle-reward-code-cecilia010-ko',
    guideSlug: 'yesstyle-valid-coupon-guide-ko',
    guidePath: '/reviews/yesstyle-valid-coupon-guide-ko',
  },
  ja: {
    locale: 'ja',
    htmlLang: 'ja',
    hreflang: 'ja',
    openGraphLocale: 'ja_JP',
    label: '日本語',
    flag: '🇯🇵',
    hubPath: '/ja/coupons/yesstyle',
    rewardArticleSlug: 'yesstyle-reward-code-cecilia010-ja',
    rewardArticlePath: '/reviews/yesstyle-reward-code-cecilia010-ja',
    guideSlug: 'yesstyle-valid-coupon-guide-ja',
    guidePath: '/reviews/yesstyle-valid-coupon-guide-ja',
  },
  'zh-hant': {
    locale: 'zh-hant',
    htmlLang: 'zh-Hant',
    hreflang: 'zh-Hant',
    openGraphLocale: 'zh_TW',
    label: '繁體中文',
    flag: '🇭🇰',
    hubPath: '/zh-hant/coupons/yesstyle',
    rewardArticleSlug: 'yesstyle-reward-code-cecilia010-zh-hant',
    rewardArticlePath: '/reviews/yesstyle-reward-code-cecilia010-zh-hant',
    guideSlug: 'yesstyle-valid-coupon-guide-zh-hant',
    guidePath: '/reviews/yesstyle-valid-coupon-guide-zh-hant',
  },
  'zh-hans': {
    locale: 'zh-hans',
    htmlLang: 'zh-Hans',
    hreflang: 'zh-Hans',
    openGraphLocale: 'zh_CN',
    label: '简体中文',
    flag: '🇨🇳',
    hubPath: '/zh-hans/coupons/yesstyle',
    rewardArticleSlug: 'yesstyle-reward-code-cecilia010-zh-hans',
    rewardArticlePath: '/reviews/yesstyle-reward-code-cecilia010-zh-hans',
    guideSlug: 'yesstyle-valid-coupon-guide-zh-hans',
    guidePath: '/reviews/yesstyle-valid-coupon-guide-zh-hans',
  },
};

export const YESSTYLE_LOCALE_KEYS: YesStyleLocale[] = [
  'pt',
  'en',
  'es',
  'fr',
  'de',
  'ko',
  'ja',
  'zh-hant',
  'zh-hans',
];

// Helper: obtém configuração de locale a partir da chave 'pt', 'en', etc.
export function getYesStyleLocaleConfig(localeStr: string): YesStyleLocaleConfig {
  const config = YESSTYLE_LOCALES[localeStr as YesStyleLocale];
  if (!config) {
    throw new Error(`[yesstyleCluster] Locale inválido ou não registrado: "${localeStr}"`);
  }
  return config;
}

// Helper: identifica o locale a partir do slug do artigo ou rota do hub
export function getYesStyleLocaleFromSlugOrPath(slugOrPath: string): YesStyleLocale {
  for (const config of Object.values(YESSTYLE_LOCALES)) {
    if (
      config.rewardArticleSlug === slugOrPath ||
      config.guideSlug === slugOrPath ||
      config.hubPath === slugOrPath ||
      config.rewardArticlePath === slugOrPath ||
      config.guidePath === slugOrPath
    ) {
      return config.locale;
    }
  }
  return 'pt'; // Default seguro para páginas legadas em português
}

// Helper: obtém os links de alternância de idioma para o cluster de Reward Code
export function getRewardArticleLanguageLinks(): Record<YesStyleLocale, string> {
  const links: Partial<Record<YesStyleLocale, string>> = {};
  for (const config of Object.values(YESSTYLE_LOCALES)) {
    links[config.locale] = config.locale === 'pt' ? '/cupons/yesstyle' : config.rewardArticlePath;
  }
  return links as Record<YesStyleLocale, string>;
}

// Helper: obtém os links de alternância de idioma para o cluster de Guia de Cupons
export function getGuideArticleLanguageLinks(): Record<YesStyleLocale, string> {
  const links: Partial<Record<YesStyleLocale, string>> = {};
  for (const config of Object.values(YESSTYLE_LOCALES)) {
    links[config.locale] = config.guidePath;
  }
  return links as Record<YesStyleLocale, string>;
}

// Helper: obtém os links de alternância de idioma para os hubs de cupons
export function getHubLanguageLinks(): Record<YesStyleLocale, string> {
  const links: Partial<Record<YesStyleLocale, string>> = {};
  for (const config of Object.values(YESSTYLE_LOCALES)) {
    links[config.locale] = config.hubPath;
  }
  return links as Record<YesStyleLocale, string>;
}
