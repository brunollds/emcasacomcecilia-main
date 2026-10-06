import { Suspense } from 'react';
import {
  getRecipeAllCategoryLabels,
  getRecipeImage,
  getRecipeImageAlt,
  getRecipePrimaryCategory,
  recipes,
} from '@/lib/data';
import ReceitasClientPage from './ReceitasClientPage';

export const metadata = {
  title: 'Receitas - Em Casa com Cecília',
  description: 'Explore receitas por categoria, dificuldade, tempo de preparo e descubra novas ideias para o dia a dia.',
  alternates: {
    canonical: '/receitas',
  },
  openGraph: {
    title: 'Receitas - Em Casa com Cecília',
    description: 'Receitas fáceis que dão certo para café da manhã, almoço, jantar, sobremesas e ocasiões especiais.',
    url: '/receitas',
    type: 'website',
  },
};

// Só o que a listagem usa de cada receita: o card, os campos dos filtros e o texto da busca `q`.
function toListedRecipe(recipe) {
  const categoryLabels = getRecipeAllCategoryLabels(recipe);

  return {
    id: recipe.id,
    slug: recipe.slug,
    title: recipe.title,
    image: getRecipeImage(recipe),
    imageAlt: getRecipeImageAlt(recipe),
    displayCategory: getRecipePrimaryCategory(recipe),
    totalTime: recipe.totalTime,
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
    categoryLabels,
    searchText: [
      recipe.title,
      recipe.description,
      ...categoryLabels,
      ...(recipe.searchTerms || []),
      ...(recipe.tags || []),
      ...recipe.ingredients.flatMap((section) => section.items),
    ]
      .join(' ')
      .toLowerCase(),
  };
}

export default function ReceitasPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fef9f3]" />}>
      <ReceitasClientPage recipes={recipes.map(toListedRecipe)} />
    </Suspense>
  );
}
