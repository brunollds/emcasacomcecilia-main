import { notFound } from 'next/navigation';
import { recipes } from '@/lib/data';
import { buildRecipeMetadata, buildRecipeTemplateProps } from '@/lib/recipe-template-props';
import { RecipeNotebookTemplate } from '@/components/recipe';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);
  if (!recipe) return { title: 'Receita não encontrada' };
  return buildRecipeMetadata(recipe);
}

export default async function RecipePage({ params }) {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);

  if (!recipe) {
    notFound();
  }

  const templateProps = buildRecipeTemplateProps(recipe);
  return <RecipeNotebookTemplate {...templateProps} />;
}

// Receita fora da lista cai no 404 do site (src/app/global-not-found.js), que sai com o HTML completo.
export const dynamicParams = false;

export async function generateStaticParams() {
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}
