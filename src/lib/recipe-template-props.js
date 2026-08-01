// Constrói as props do RecipeNotebookTemplate a partir de uma Recipe.
// Fonte única do mapeamento: usada pela página /receitas/[slug] E pelo /preview
// (que renderiza rascunhos da central com os MESMOS componentes de produção).
import { getCategorySlug, getRecipeImage, getRecipeImageAlt, getRecipePrimaryCategory, getRecipeCuisine } from '@/lib/data';
import { buildSchemaAuthors, minutesToIsoDuration, normalizeRecipe } from '@/lib/content';
import { getYoutubeEmbedUrl } from '@/lib/video-metadata';
import { buildYoutubeVideoObject } from '@/lib/video-schema';
import { getVideoPageForYoutubeUrl, getVideoPageUrl } from '@/lib/video-pages';

// Função auxiliar para converter tempo legível (ex: '15 min', '1h 20 min') para ISO 8601 (ex: 'PT15M', 'PT1H20M')
function convertToISO8601(timeStr) {
  if (!timeStr) return undefined;
  const hoursMatch = timeStr.match(/(\d+)\s*h/);
  const minutesMatch = timeStr.match(/(\d+)\s*min/);

  let iso = 'PT';
  if (hoursMatch) iso += `${hoursMatch[1]}H`;
  if (minutesMatch) iso += `${minutesMatch[1]}M`;

  return iso === 'PT' ? undefined : iso;
}

function getRecipeTaxonomyChips(recipe) {
  const chips = [];

  if (recipe.primaryCategory) {
    chips.push({
      key: `tipo-${recipe.primaryCategory}`,
      label: recipe.primaryCategory,
      href: `/receitas?tipo=${getCategorySlug(recipe.primaryCategory)}`,
      primary: true,
    });
  }

  (recipe.subCategory || []).forEach((label) => {
    chips.push({
      key: `sub-${label}`,
      label,
      href: `/receitas?sub=${getCategorySlug(label)}`,
    });
  });

  (recipe.cuisine || []).forEach((label) => {
    chips.push({
      key: `cozinha-${label}`,
      label,
      href: `/receitas?cozinha=${getCategorySlug(label)}`,
    });
  });

  (recipe.method || []).forEach((label) => {
    chips.push({
      key: `metodo-${label}`,
      label,
      href: `/receitas?metodo=${getCategorySlug(label)}`,
    });
  });

  (recipe.diet || []).forEach((label) => {
    chips.push({
      key: `dieta-${label}`,
      label,
      href: `/receitas?dieta=${getCategorySlug(label)}`,
    });
  });

  (recipe.keyIngredients || []).forEach((label) => {
    chips.push({
      key: `ingrediente-${label}`,
      label,
      href: `/receitas?ingrediente=${getCategorySlug(label)}`,
    });
  });

  (recipe.collections || []).forEach((label) => {
    chips.push({
      key: `colecao-${label}`,
      label,
      href: `/receitas?colecao=${getCategorySlug(label)}`,
    });
  });

  return chips
    .filter((chip, index, list) => list.findIndex((candidate) => candidate.key === chip.key) === index)
    .slice(0, 7);
}

export function buildRecipeTemplateProps(recipe) {
  const viewModel = normalizeRecipe(recipe);
  const {
    recipe: canonical,
    schemaIsoDuration,
    schemaIngredients,
    schemaInstructions,
  } = viewModel;

  const recipeImage = getRecipeImage(recipe);
  const recipeImageAlt = getRecipeImageAlt(recipe);
  const baseUrl = 'https://emcasacomcecilia.com';
  const taxonomyChips = getRecipeTaxonomyChips(recipe);
  const youtubeEmbedUrl = getYoutubeEmbedUrl(recipe.youtubeUrl);
  const videoPageUrl = getVideoPageUrl(getVideoPageForYoutubeUrl(recipe.youtubeUrl));

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Receitas', item: `${baseUrl}/receitas` },
      { '@type': 'ListItem', position: 3, name: recipe.title, item: `${baseUrl}/receitas/${recipe.slug}` },
    ],
  };

  const videoJsonLd = buildYoutubeVideoObject({
    url: recipe.youtubeUrl,
    thumbnailUrl: recipe.videoThumbnail,
    uploadDate: recipe.videoUploadDate,
    baseUrl,
  });

  // JSON-LD para Google Recipes
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Recipe',
    name: recipe.title,
    image: [`${baseUrl}${recipeImage}`],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/receitas/${recipe.slug}`,
    },
    author: buildSchemaAuthors(recipe.authors, recipe.author),
    description: recipe.description,
    prepTime: minutesToIsoDuration(canonical.prepMinutes) ?? convertToISO8601(recipe.prepTime),
    cookTime: minutesToIsoDuration(canonical.cookMinutes) ?? convertToISO8601(recipe.cookTime),
    totalTime: schemaIsoDuration ?? convertToISO8601(recipe.totalTime),
    recipeYield: recipe.yield,
    recipeCategory: getRecipePrimaryCategory(recipe),
    recipeCuisine: getRecipeCuisine(recipe) || 'Brasileira',
    keywords: recipe.searchTerms?.join(', '),
    recipeIngredient: schemaIngredients,
    recipeInstructions: schemaInstructions.map((step, index) => ({
      '@type': 'HowToStep',
      name: `Passo ${index + 1}`,
      text: step,
      url: `${baseUrl}/receitas/${recipe.slug}#step-${index + 1}`,
    })),
    ...(recipe.publishedAt && { datePublished: recipe.publishedAt }),
    ...(recipe.updatedAt && { dateModified: recipe.updatedAt }),
    ...(recipe.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: recipe.rating.average,
        ratingCount: recipe.rating.count,
      },
    }),
    ...(recipe.calories && {
      nutrition: {
        '@type': 'NutritionInformation',
        calories: recipe.calories,
      },
    }),
    ...(videoJsonLd && { video: videoJsonLd }),
  };

  return {
    recipe,
    viewModel,
    taxonomyChips,
    youtubeEmbedUrl,
    videoPageUrl,
    recipeImage,
    recipeImageAlt,
    breadcrumbJsonLd,
    jsonLd,
  };
}
