import {
  LOCALES,
  LOCALE_KEYS,
  getLocaleConfig,
  type Locale,
  type LocaleConfig,
} from '../locales';
import {
  findClusterLocaleFromSlugOrPath,
  getClusterArticle,
  getClusterArticleLanguageLinks,
  getClusterHubLanguageLinks,
  type Cluster,
  type ClusterArticle,
  type ClusterLocaleConfig,
} from './types';

export type YesStyleArticleKey = 'reward' | 'guide' | 'trust' | 'kbeauty';

const yesStyleCluster = {
  id: 'yesstyle',
  locales: {
    pt: {
      hubPath: '/cupons/yesstyle',
      articles: [
        { key: 'reward', slug: 'codigo-cecilia010-yesstyle-como-usar', path: '/reviews/codigo-cecilia010-yesstyle-como-usar' },
        { key: 'guide', slug: 'como-encontrar-cupons-yesstyle-validos', path: '/reviews/como-encontrar-cupons-yesstyle-validos' },
        { key: 'trust', slug: 'yesstyle-e-confiavel', path: '/reviews/yesstyle-e-confiavel' },
        { key: 'kbeauty', slug: 'k-beauty-o-que-e-onde-comprar', path: '/reviews/k-beauty-o-que-e-onde-comprar' },
      ],
    },
    en: {
      hubPath: '/en/coupons/yesstyle',
      articles: [
        { key: 'reward', slug: 'yesstyle-reward-code-coupon-cecilia010', path: '/en/reviews/yesstyle-reward-code-coupon-cecilia010' },
        { key: 'guide', slug: 'how-to-find-valid-yesstyle-coupon-codes', path: '/en/reviews/how-to-find-valid-yesstyle-coupon-codes' },
        { key: 'trust', slug: 'is-yesstyle-legit-and-safe-review', path: '/en/reviews/is-yesstyle-legit-and-safe-review' },
        { key: 'kbeauty', slug: 'k-beauty-trend-explained-where-to-buy', path: '/en/reviews/k-beauty-trend-explained-where-to-buy' },
      ],
    },
    es: {
      hubPath: '/es/coupons/yesstyle',
      articles: [
        { key: 'reward', slug: 'codigo-de-recompensa-yesstyle-cupon-cecilia010', path: '/es/reviews/codigo-de-recompensa-yesstyle-cupon-cecilia010' },
        { key: 'guide', slug: 'como-encontrar-cupones-yesstyle-validos', path: '/es/reviews/como-encontrar-cupones-yesstyle-validos' },
        { key: 'trust', slug: 'es-yesstyle-de-fiar-y-seguro', path: '/es/reviews/es-yesstyle-de-fiar-y-seguro' },
        { key: 'kbeauty', slug: 'k-beauty-marcas-coreanas-tendencia-mundial', path: '/es/reviews/k-beauty-marcas-coreanas-tendencia-mundial' },
      ],
    },
    fr: {
      hubPath: '/fr/coupons/yesstyle',
      articles: [
        { key: 'reward', slug: 'code-recompense-yesstyle-cecilia010', path: '/fr/reviews/code-recompense-yesstyle-cecilia010' },
        { key: 'guide', slug: 'comment-trouver-des-codes-promo-yesstyle-valides', path: '/fr/reviews/comment-trouver-des-codes-promo-yesstyle-valides' },
        { key: 'trust', slug: 'yesstyle-est-il-fiable-et-sur', path: '/fr/reviews/yesstyle-est-il-fiable-et-sur' },
        { key: 'kbeauty', slug: 'k-beauty-tendance-beaute-coreenne', path: '/fr/reviews/k-beauty-tendance-beaute-coreenne' },
      ],
    },
    de: {
      hubPath: '/de/coupons/yesstyle',
      articles: [
        { key: 'reward', slug: 'yesstyle-reward-code-rabatt-cecilia010', path: '/de/reviews/yesstyle-reward-code-rabatt-cecilia010' },
        { key: 'guide', slug: 'gueltige-yesstyle-gutscheincodes-finden', path: '/de/reviews/gueltige-yesstyle-gutscheincodes-finden' },
        { key: 'trust', slug: 'ist-yesstyle-serioes-und-sicher', path: '/de/reviews/ist-yesstyle-serioes-und-sicher' },
        { key: 'kbeauty', slug: 'k-beauty-trend-koreanische-marken-kaufen', path: '/de/reviews/k-beauty-trend-koreanische-marken-kaufen' },
      ],
    },
    ko: {
      hubPath: '/ko/coupons/yesstyle',
      articles: [
        { key: 'reward', slug: 'yesstyle-reward-code-cecilia010-ko', path: '/ko/reviews/yesstyle-reward-code-cecilia010-ko' },
        { key: 'guide', slug: 'yesstyle-valid-coupon-guide-ko', path: '/ko/reviews/yesstyle-valid-coupon-guide-ko' },
        { key: 'trust', slug: 'yesstyle-trust-guide-ko', path: '/ko/reviews/yesstyle-trust-guide-ko' },
        { key: 'kbeauty', slug: 'yesstyle-kbeauty-guide-ko', path: '/ko/reviews/yesstyle-kbeauty-guide-ko' },
      ],
    },
    ja: {
      hubPath: '/ja/coupons/yesstyle',
      articles: [
        { key: 'reward', slug: 'yesstyle-reward-code-cecilia010-ja', path: '/ja/reviews/yesstyle-reward-code-cecilia010-ja' },
        { key: 'guide', slug: 'yesstyle-valid-coupon-guide-ja', path: '/ja/reviews/yesstyle-valid-coupon-guide-ja' },
        { key: 'trust', slug: 'yesstyle-trust-guide-ja', path: '/ja/reviews/yesstyle-trust-guide-ja' },
        { key: 'kbeauty', slug: 'yesstyle-kbeauty-guide-ja', path: '/ja/reviews/yesstyle-kbeauty-guide-ja' },
      ],
    },
    'zh-hant': {
      hubPath: '/zh-hant/coupons/yesstyle',
      articles: [
        { key: 'reward', slug: 'yesstyle-reward-code-cecilia010-zh-hant', path: '/zh-hant/reviews/yesstyle-reward-code-cecilia010-zh-hant' },
        { key: 'guide', slug: 'yesstyle-valid-coupon-guide-zh-hant', path: '/zh-hant/reviews/yesstyle-valid-coupon-guide-zh-hant' },
        { key: 'trust', slug: 'yesstyle-trust-guide-zh-hant', path: '/zh-hant/reviews/yesstyle-trust-guide-zh-hant' },
        { key: 'kbeauty', slug: 'yesstyle-kbeauty-guide-zh-hant', path: '/zh-hant/reviews/yesstyle-kbeauty-guide-zh-hant' },
      ],
    },
    'zh-hans': {
      hubPath: '/zh-hans/coupons/yesstyle',
      articles: [
        { key: 'reward', slug: 'yesstyle-reward-code-cecilia010-zh-hans', path: '/zh-hans/reviews/yesstyle-reward-code-cecilia010-zh-hans' },
        { key: 'guide', slug: 'yesstyle-valid-coupon-guide-zh-hans', path: '/zh-hans/reviews/yesstyle-valid-coupon-guide-zh-hans' },
        { key: 'trust', slug: 'yesstyle-trust-guide-zh-hans', path: '/zh-hans/reviews/yesstyle-trust-guide-zh-hans' },
        { key: 'kbeauty', slug: 'yesstyle-kbeauty-guide-zh-hans', path: '/zh-hans/reviews/yesstyle-kbeauty-guide-zh-hans' },
      ],
    },
  },
} satisfies Cluster & { locales: Record<Locale, ClusterLocaleConfig> };

export const YESSTYLE_CLUSTER: Cluster = yesStyleCluster;

export type YesStyleLocaleConfig = LocaleConfig & ClusterLocaleConfig;

export const YESSTYLE_LOCALES = Object.fromEntries(
  LOCALE_KEYS.map((locale) => [
    locale,
    { ...LOCALES[locale], ...yesStyleCluster.locales[locale] },
  ])
) as Record<Locale, YesStyleLocaleConfig>;

export function getYesStyleLocaleConfig(localeStr: string): YesStyleLocaleConfig {
  const localeConfig = getLocaleConfig(localeStr);
  const clusterConfig = yesStyleCluster.locales[localeConfig.locale];
  if (!clusterConfig) {
    throw new Error(`[clusters/yesstyle] Locale não registrado: "${localeStr}"`);
  }
  return { ...localeConfig, ...clusterConfig };
}

export function getYesStyleArticle(locale: Locale, articleKey: YesStyleArticleKey): ClusterArticle {
  const article = getClusterArticle(YESSTYLE_CLUSTER, locale, articleKey);
  if (!article) {
    throw new Error(`[clusters/yesstyle] Artigo "${articleKey}" ausente no locale "${locale}"`);
  }
  return article;
}

export function isYesStyleArticle(slugOrPath: string, articleKey?: YesStyleArticleKey): boolean {
  return Object.values(yesStyleCluster.locales).some((config) =>
    config.articles.some((article) =>
      (!articleKey || article.key === articleKey) &&
      (article.slug === slugOrPath || article.path === slugOrPath)
    )
  );
}

export function findYesStyleArticleKey(slugOrPath: string): YesStyleArticleKey | null {
  for (const config of Object.values(yesStyleCluster.locales)) {
    const article = config.articles.find((item) => item.slug === slugOrPath || item.path === slugOrPath);
    if (article) return article.key as YesStyleArticleKey;
  }
  return null;
}

export function findYesStyleLocaleFromSlugOrPath(slugOrPath: string): Locale | null {
  return findClusterLocaleFromSlugOrPath(YESSTYLE_CLUSTER, slugOrPath);
}

export function getYesStyleLocaleFromSlugOrPath(slugOrPath: string): Locale {
  const locale = findYesStyleLocaleFromSlugOrPath(slugOrPath);
  if (!locale) {
    throw new Error(`[clusters/yesstyle] Slug ou rota YesStyle desconhecida/não registrada: "${slugOrPath}"`);
  }
  return locale;
}

export function getYesStyleArticleLanguageLinks(articleKey: YesStyleArticleKey): Record<Locale, string> {
  return getClusterArticleLanguageLinks(YESSTYLE_CLUSTER, articleKey) as Record<Locale, string>;
}

export function getRewardArticleLanguageLinks(): Record<Locale, string> {
  return getYesStyleArticleLanguageLinks('reward');
}

export function getHubLanguageLinks(): Record<Locale, string> {
  return getClusterHubLanguageLinks(YESSTYLE_CLUSTER) as Record<Locale, string>;
}
