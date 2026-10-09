import type { MetadataRoute } from 'next';
import homeEventsConfig from '@/../content/home-events.json';
import { recipes, publishedReviews } from '@/lib/data';
import { getReviewCanonicalPathname } from '@/lib/content/review-i18n';
import { getActiveCoupons, getCouponBySlug } from '@/lib/couponsData';
import { getCouponStorePath, getTranslatedCouponRoutes } from '@/lib/couponTranslations';
import { getStoreArticlePageSlugs, getStoreArticlesPage } from '@/lib/homeStores';
import { getEventHubPaths } from '@/lib/homeEvents';
import { YESSTYLE_LOCALES } from '@/lib/i18n/clusters/yesstyle';
import { REVIEW_HUB_LOCALES, getReviewHubPath } from '@/lib/review-hubs';
import { getLatestYesStyleVerifiedAtISO } from '@/lib/yesstyleCoupons';
import { isoDurationToSeconds, videoPages } from '@/lib/video-pages';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

const BASE_URL = 'https://emcasacomcecilia.com';

// A data mais nova dos artigos de uma página: a da atualização, ou a da publicação (AAAA-MM-DD).
function newestDate(articles: readonly { updatedAt?: string; publishedAtISO?: string }[]) {
  return articles
    .map((article) => article.updatedAt ?? article.publishedAtISO)
    .filter((date): date is string => Boolean(date))
    .sort()
    .at(-1);
}

const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE_URL, priority: 1.0, changeFrequency: 'daily' },
  { url: `${BASE_URL}/receitas`, priority: 0.9, changeFrequency: 'daily' },
  { url: `${BASE_URL}/reviews`, priority: 0.8, changeFrequency: 'weekly' },
  { url: `${BASE_URL}/videos`, priority: 0.8, changeFrequency: 'weekly' },
  { url: `${BASE_URL}/cupons`, priority: 0.8, changeFrequency: 'weekly' },
  { url: `${BASE_URL}/sobre`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/contato`, priority: 0.5, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/faqs`, priority: 0.5, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/privacidade`, priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const recipeRoutes: MetadataRoute.Sitemap = recipes.map((recipe) => ({
    url: `${BASE_URL}/receitas/${recipe.slug}`,
    priority: recipe.isPopular ? 0.8 : 0.6,
    changeFrequency: 'monthly' as const,
  }));

  const reviewRoutes: MetadataRoute.Sitemap = publishedReviews
    .filter((review) => !review.hideFromListings)
    .map((review) => ({
      url: `${BASE_URL}${getReviewCanonicalPathname(review)}`,
      priority: 0.6,
      changeFrequency: 'monthly' as const,
      lastModified: review.updatedAt ?? review.publishedAtISO,
    }));

  // Todos os artigos de cada loja (/reviews/loja/{slug}), só em português.
  const storeArticleRoutes: MetadataRoute.Sitemap = getStoreArticlePageSlugs(publishedReviews).map((slug) => ({
    url: `${BASE_URL}/reviews/loja/${slug}`,
    priority: 0.6,
    changeFrequency: 'weekly' as const,
    lastModified: newestDate(getStoreArticlesPage(publishedReviews, slug)?.articles ?? []),
  }));

  // Página fixa de cada data comercial com edição em content/home-events.json (fora do menu).
  const eventHubRoutes: MetadataRoute.Sitemap = getEventHubPaths(homeEventsConfig, publishedReviews).map((path) => ({
    url: `${BASE_URL}${path}`,
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  }));

  const couponRoutes: MetadataRoute.Sitemap = getActiveCoupons().map((coupon) => ({
    url: `${BASE_URL}/cupons/${coupon.slug}`,
    priority: 0.75,
    changeFrequency: 'weekly' as const,
    lastModified: coupon.lastVerified,
  }));

  // Lojas com página em outros idiomas (hoje só a SHEIN); a versão em PT já está em couponRoutes.
  const translatedCouponRoutes: MetadataRoute.Sitemap = getTranslatedCouponRoutes().map(({ locale, slug }) => ({
    url: `${BASE_URL}${getCouponStorePath(slug, locale)}`,
    priority: 0.75,
    changeFrequency: 'weekly' as const,
    lastModified: getCouponBySlug(slug)?.lastVerified,
  }));

  const videoRoutes: MetadataRoute.Sitemap = videoPages.map((video) => ({
    url: video.canonicalUrl,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
    lastModified: video.uploadDate,
    videos: [
      {
        title: video.title,
        thumbnail_loc: new URL(resolveMediaUrl(video.thumbnailUrl), BASE_URL).toString(),
        description: video.description,
        ...(video.kind === 'youtube'
          ? { player_loc: video.embedUrl }
          : { content_loc: new URL(resolveMediaUrl(video.contentUrl), BASE_URL).toString() }),
        ...(isoDurationToSeconds(video.duration)
          ? { duration: isoDurationToSeconds(video.duration) }
          : {}),
        publication_date: video.uploadDate,
        family_friendly: 'yes' as const,
        uploader: {
          info: `${BASE_URL}/sobre`,
          content: 'Em Casa com Cecília',
        },
      },
    ],
  }));

  // [P1 Centralizado]: Data da verificação mais recente para os 8 hubs internacionais YesStyle
  const latestYesStyleDate = getLatestYesStyleVerifiedAtISO();

  // B2: Adicionar os 8 hubs internacionais YesStyle ao sitemap com lastModified = latestYesStyleDate
  const internationalYesStyleHubs: MetadataRoute.Sitemap = Object.values(YESSTYLE_LOCALES)
    .filter((config) => config.locale !== 'pt')
    .map((config) => ({
      url: `${BASE_URL}${config.hubPath}`,
      priority: 0.75,
      changeFrequency: 'weekly' as const,
      lastModified: latestYesStyleDate,
    }));

  const internationalReviewHubs: MetadataRoute.Sitemap = REVIEW_HUB_LOCALES.map((locale) => ({
    url: `${BASE_URL}${getReviewHubPath(locale)}`,
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  }));

  return [
    ...staticRoutes,
    ...recipeRoutes,
    ...reviewRoutes,
    ...storeArticleRoutes,
    ...eventHubRoutes,
    ...videoRoutes,
    ...couponRoutes,
    ...translatedCouponRoutes,
    ...internationalYesStyleHubs,
    ...internationalReviewHubs,
  ];
}
