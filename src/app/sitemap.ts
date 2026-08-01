import type { MetadataRoute } from 'next';
import { recipes, publishedReviews, getReviewSlug } from '@/lib/data';
import { getActiveCoupons } from '@/lib/couponsData';
import { YESSTYLE_LOCALES } from '@/lib/i18n/yesstyleCluster';
import { getLatestYesStyleVerifiedAtISO } from '@/lib/yesstyleCoupons';
import { isoDurationToSeconds, videoPages } from '@/lib/video-pages';

const BASE_URL = 'https://emcasacomcecilia.com';

const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE_URL, priority: 1.0, changeFrequency: 'daily' },
  { url: `${BASE_URL}/receitas`, priority: 0.9, changeFrequency: 'daily' },
  { url: `${BASE_URL}/reviews`, priority: 0.8, changeFrequency: 'weekly' },
  { url: `${BASE_URL}/videos`, priority: 0.8, changeFrequency: 'weekly' },
  { url: `${BASE_URL}/cupons`, priority: 0.8, changeFrequency: 'weekly' },
  { url: `${BASE_URL}/categorias`, priority: 0.7, changeFrequency: 'weekly' },
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
      url: `${BASE_URL}/reviews/${getReviewSlug(review)}`,
      priority: 0.6,
      changeFrequency: 'monthly' as const,
      lastModified: review.publishedAtISO,
    }));

  const couponRoutes: MetadataRoute.Sitemap = getActiveCoupons().map((coupon) => ({
    url: `${BASE_URL}/cupons/${coupon.slug}`,
    priority: 0.75,
    changeFrequency: 'weekly' as const,
    lastModified: coupon.lastVerified,
  }));

  const videoRoutes: MetadataRoute.Sitemap = videoPages.map((video) => ({
    url: video.canonicalUrl,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
    lastModified: video.uploadDate,
    videos: [
      {
        title: video.title,
        thumbnail_loc: new URL(video.thumbnailUrl, BASE_URL).toString(),
        description: video.description,
        ...(video.kind === 'youtube'
          ? { player_loc: video.embedUrl }
          : { content_loc: new URL(video.contentUrl, BASE_URL).toString() }),
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

  return [
    ...staticRoutes,
    ...recipeRoutes,
    ...reviewRoutes,
    ...videoRoutes,
    ...couponRoutes,
    ...internationalYesStyleHubs,
  ];
}
