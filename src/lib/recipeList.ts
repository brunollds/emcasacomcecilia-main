import {
  getRecipeAllCategoryLabels,
  getRecipeImageAlt,
  getRecipeOwnImage,
  getRecipePrimaryCategory,
  type Recipe,
} from '@/lib/data';
import { formatRecipeTime } from '@/lib/recipeTime';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

// Só o que a listagem de /receitas usa de cada receita: o cartão e os campos dos filtros. Sem foto própria,
// image fica undefined e o cartão desenha a capa (RecipeCover). A foto vai pronta, com o endereço de entrega:
// a listagem é cliente e não importa o mapa de mídia. O totalTime segue cru para o filtro de
// tempo; o cartão mostra o totalTimeLabel.
export function toListedRecipe(recipe: Recipe) {
  const image = getRecipeOwnImage(recipe);
  return {
    id: recipe.id,
    slug: recipe.slug,
    title: recipe.title,
    image: image ? resolveMediaUrl(image) : undefined,
    imageAlt: image ? getRecipeImageAlt(recipe) : undefined,
    displayCategory: getRecipePrimaryCategory(recipe),
    totalTime: recipe.totalTime,
    totalTimeLabel: formatRecipeTime(recipe.totalTime),
    difficulty: recipe.difficulty,
    isPopular: recipe.isPopular,
    primaryCategory: recipe.primaryCategory,
    subCategory: recipe.subCategory,
    cuisine: recipe.cuisine,
    method: recipe.method,
    diet: recipe.diet,
    keyIngredients: recipe.keyIngredients,
    collections: recipe.collections,
    mealTime: recipe.mealTime,
    categoryLabels: getRecipeAllCategoryLabels(recipe),
  };
}

export type ListedRecipe = ReturnType<typeof toListedRecipe>;
