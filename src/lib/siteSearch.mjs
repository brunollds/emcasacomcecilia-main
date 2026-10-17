import { getReviewCanonicalPathname } from './content/review-pathname.mjs';
import { compareReviewsNewestFirst, isListedInLocale, isListedInPortuguese } from './reviewVisibility.mjs';

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

// Sem acento e em minúsculas, dos dois lados: "sofa" acha "sofá", como na estante de /reviews. O NFC do
// fim junta de novo o que o NFD separou e o filtro não tirou: a sílaba coreana e o dakuten japonês
// voltam a ser um caractere só, e "か" não acha "が".
export function foldSearchText(text) {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC').toLowerCase();
}

// O índice que o campo baixa: o do PT (receitas e artigos) ou o de um idioma (artigos e lojas).
export function getSearchIndexPath(locale) {
  return locale === 'pt' ? '/search-index.json' : `/search-index-${locale}.json`;
}

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
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase(),
  };
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
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase(),
  };
}

export function createSearchIndex({ recipes, reviews }) {
  return [
    ...recipes.map(buildRecipeSearchItem),
    ...reviews.filter(isListedInPortuguese).map(buildReviewSearchItem),
  ];
}

// O índice de um idioma fora do PT: as páginas de loja dele primeiro (são as do código), depois os
// artigos da lista dele (/<locale>/reviews), do mais novo para o mais antigo. Só texto do idioma.
export function createLocaleSearchIndex(locale, { reviews, stores }) {
  const storeItems = stores.map((store) => ({
    id: store.slug,
    contentType: 'store',
    href: store.href,
    title: store.title,
    description: store.description,
    terms: foldSearchText([store.name, store.title, store.description].filter(Boolean).join(' ')),
  }));
  const reviewItems = reviews
    .filter((review) => isListedInLocale(review, locale))
    .sort(compareReviewsNewestFirst)
    .map((review) => ({
      id: review.id,
      contentType: 'review',
      href: getReviewCanonicalPathname(review),
      title: review.title,
      description: review.description,
      category: review.type,
      terms: foldSearchText(
        [
          review.title,
          review.description,
          review.type,
          review.productName,
          review.brand,
          ...(review.tags || []),
          ...(review.collections || []),
        ]
          .filter(Boolean)
          .join(' ')
      ),
    }));

  return [...storeItems, ...reviewItems];
}

export function getRankedSearchResults(index, query, limit) {
  const foldedQuery = foldSearchText(query.trim());
  if (!foldedQuery || !index?.length) return [];

  const ranked = index
    .map((item, position) => ({
      item,
      position,
      titleMatch: foldSearchText(item.title).includes(foldedQuery),
    }))
    .filter(({ item }) => foldSearchText(item.terms).includes(foldedQuery))
    .sort(
      (left, right) =>
        Number(right.titleMatch) - Number(left.titleMatch) ||
        left.position - right.position
    )
    .map(({ item }) => item);

  return typeof limit === 'number' ? ranked.slice(0, Math.max(0, limit)) : ranked;
}
