import type { Locale } from '../locales';

export type ClusterArticle = {
  key: string;
  slug: string;
  path: string;
};

export type ClusterLocaleConfig = {
  hubPath: string;
  articles: ClusterArticle[];
};

export type Cluster = {
  id: string;
  locales: Partial<Record<Locale, ClusterLocaleConfig>>;
};

export function getClusterLocaleConfig(
  cluster: Cluster,
  locale: Locale
): ClusterLocaleConfig | null {
  return cluster.locales[locale] ?? null;
}

export function getClusterArticle(
  cluster: Cluster,
  locale: Locale,
  articleKey: string
): ClusterArticle | null {
  return getClusterLocaleConfig(cluster, locale)?.articles.find((article) => article.key === articleKey) ?? null;
}

export function findClusterLocaleFromSlugOrPath(
  cluster: Cluster,
  slugOrPath: string
): Locale | null {
  for (const [locale, config] of Object.entries(cluster.locales)) {
    if (
      config?.hubPath === slugOrPath ||
      config?.articles.some((article) => article.slug === slugOrPath || article.path === slugOrPath)
    ) {
      return locale as Locale;
    }
  }
  return null;
}

export function getClusterHubLanguageLinks(cluster: Cluster): Partial<Record<Locale, string>> {
  return Object.fromEntries(
    Object.entries(cluster.locales).flatMap(([locale, config]) =>
      config ? [[locale, config.hubPath]] : []
    )
  );
}

export function getClusterArticleLanguageLinks(
  cluster: Cluster,
  articleKey: string
): Partial<Record<Locale, string>> {
  return Object.fromEntries(
    Object.entries(cluster.locales).flatMap(([locale, config]) => {
      const article = config?.articles.find((item) => item.key === articleKey);
      return article ? [[locale, article.path]] : [];
    })
  );
}
