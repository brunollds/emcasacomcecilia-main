import type { MetadataRoute } from 'next';
import { recipes, reviews, getReviewSlug } from '@/lib/data';

const BASE_URL = 'https://emcasacomcecilia.com';

const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE_URL, priority: 1.0, changeFrequency: 'daily' },
  { url: `${BASE_URL}/receitas`, priority: 0.9, changeFrequency: 'daily' },
  { url: `${BASE_URL}/reviews`, priority: 0.8, changeFrequency: 'weekly' },
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

  const reviewRoutes: MetadataRoute.Sitemap = reviews.map((review) => ({
    url: `${BASE_URL}/reviews/${getReviewSlug(review)}`,
    priority: 0.6,
    changeFrequency: 'monthly' as const,
  }));

  return [...staticRoutes, ...recipeRoutes, ...reviewRoutes];
}
