import { isListedInPortuguese } from './reviewVisibility.mjs';

export const SITE_SEARCH_PATH = '/buscar';
export const SEARCH_ACTION_URL_TEMPLATE =
  'https://emcasacomcecilia.com/buscar?q={search_term_string}';

export const SEARCH_PAGE_METADATA = {
  title: 'Buscar - Em Casa com Cecília',
  description: 'Busque receitas, guias e análises publicados no Em Casa com Cecília.',
  alternates: {
    canonical: SITE_SEARCH_PATH,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export function getSearchContentTypeLabel(contentType) {
  return contentType === 'recipe' ? 'Receita' : 'Guia & análise';
}

function buildRecipeSearchItem(recipe) {
  const categories = [
    ...(recipe.categories || []),
    recipe.primaryCategory,
    ...(recipe.subCategory || []),
    ...(recipe.mealTime || []),
    ...(recipe.cuisine || []),
    ...(recipe.method || []),
    ...(recipe.collections || []),
  ].filter(Boolean);

  return {
    id: recipe.id,
    contentType: 'recipe',
    href: `/receitas/${recipe.slug}`,
    title: recipe.title,
    description: recipe.description,
    category: recipe.primaryCategory || recipe.categories?.[0] || 'Geral',
    difficulty: recipe.difficulty,
    totalTime: recipe.totalTime,
    terms: [
      recipe.title,
      recipe.description,
      ...categories,
      ...(recipe.searchTerms || []),
      ...(recipe.tags || []),
      recipe.difficulty,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase(),
  };
}

function isPortugueseReview(review) {
  return (!review.locale || review.locale === 'pt') && isListedInPortuguese(review);
}

function buildReviewSearchItem(review) {
  return {
    id: review.id,
    contentType: 'review',
    href: `/reviews/${review.slug}`,
    title: review.title,
    description: review.description,
    category: review.type || 'Guia & análise',
    terms: [
      review.title,
      review.description,
      review.type,
      review.category,
      review.productName,
      review.brand,
      ...(review.tags || []),
      ...(review.collections || []),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase(),
  };
}

export function createSearchIndex({ recipes, reviews }) {
  return [
    ...recipes.map(buildRecipeSearchItem),
    ...reviews.filter(isPortugueseReview).map(buildReviewSearchItem),
  ];
}

export function getRankedSearchResults(index, query, limit) {
  const lowerQuery = query.trim().toLowerCase();
  if (!lowerQuery || !index?.length) return [];

  const ranked = index
    .map((item, position) => ({
      item,
      position,
      titleMatch: item.title.toLowerCase().includes(lowerQuery),
    }))
    .filter(({ item }) => item.terms.includes(lowerQuery))
    .sort(
      (left, right) =>
        Number(right.titleMatch) - Number(left.titleMatch) ||
        left.position - right.position
    )
    .map(({ item }) => item);

  return typeof limit === 'number' ? ranked.slice(0, Math.max(0, limit)) : ranked;
}
