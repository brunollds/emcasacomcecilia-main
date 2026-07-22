// Constrói as props do RecipeNotebookTemplate a partir de uma Recipe.
// Fonte única do mapeamento: usada pela página /receitas/[slug] E pelo /preview
// (que renderiza rascunhos da central com os MESMOS componentes de produção).
import { getCategorySlug, getRecipeImage, getRecipeImageAlt, getRecipePrimaryCategory, getRecipeCuisine } from '@/lib/data';
import { buildSchemaAuthors, minutesToIsoDuration, normalizeRecipe } from '@/lib/content';

function getYoutubeVideoId(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace(/^www\./, '');

    if (hostname === 'youtu.be') {
      return parsed.pathname.split('/').filter(Boolean)[0] || null;
    }

    if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
      if (parsed.pathname === '/watch') {
        return parsed.searchParams.get('v');
      }

      const [type, id] = parsed.pathname.split('/').filter(Boolean);
      if (['embed', 'shorts', 'live'].includes(type)) {
        return id || null;
      }
    }
  } catch {
    return null;
  }

  return null;
}

function getYoutubeEmbedUrl(url) {
  const id = getYoutubeVideoId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

function getYoutubeWatchUrl(url) {
  const id = getYoutubeVideoId(url);
  return id ? `https://www.youtube.com/watch?v=${id}` : null;
}

function getAbsoluteUrl(url, baseUrl) {
  if (!url) return null;

  try {
    return new URL(url, baseUrl).toString();
  } catch {
    return null;
  }
}

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

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Receitas', item: `${baseUrl}/receitas` },
      { '@type': 'ListItem', position: 3, name: recipe.title, item: `${baseUrl}/receitas/${recipe.slug}` },
    ],
  };

  const youtubeVideoId = getYoutubeVideoId(recipe.youtubeUrl);
  const youtubeWatchUrl = getYoutubeWatchUrl(recipe.youtubeUrl);

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
    ...(youtubeVideoId && recipe.videoUploadDate && {
      video: {
        '@type': 'VideoObject',
        name: recipe.title,
        description: recipe.description,
        thumbnailUrl: recipe.videoThumbnail
          ? getAbsoluteUrl(recipe.videoThumbnail, baseUrl)
          : `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`,
        uploadDate: recipe.videoUploadDate,
        url: youtubeWatchUrl,
        embedUrl: youtubeEmbedUrl,
      },
    }),
  };

  return {
    recipe,
    viewModel,
    taxonomyChips,
    youtubeEmbedUrl,
    recipeImage,
    recipeImageAlt,
    breadcrumbJsonLd,
    jsonLd,
  };
}
