import {
  getRecipeAllCategoryLabels,
  getRecipeImageAlt,
  getRecipeOwnImage,
  getRecipePrimaryCategory,
  type Recipe,
} from '@/lib/data';
import { formatRecipeTime } from '@/lib/recipeTime';

// Só o que a listagem de /receitas usa de cada receita: o cartão e os campos dos filtros. Sem foto própria,
// image fica undefined e o cartão desenha a capa (RecipeCover). O totalTime segue cru para o filtro de
// tempo; o cartão mostra o totalTimeLabel.
export function toListedRecipe(recipe: Recipe) {
  const image = getRecipeOwnImage(recipe);
  return {
    id: recipe.id,
    slug: recipe.slug,
    title: recipe.title,
    image,
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
