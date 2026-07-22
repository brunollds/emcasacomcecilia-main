import { notFound } from 'next/navigation';
import { getRecipeImage, recipes } from '@/lib/data';
import { buildRecipeTemplateProps } from '@/lib/recipe-template-props';
import { RecipeNotebookTemplate } from '@/components/recipe';

// SEO Dinâmico
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);
  if (!recipe) return { title: 'Receita não encontrada' };

  const recipeImage = getRecipeImage(recipe);
  const baseUrl = 'https://emcasacomcecilia.com';
  const url = `${baseUrl}/receitas/${recipe.slug}`;

  return {
    title: `${recipe.title} - Em Casa com Cecília`,
    description: recipe.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      url,
      type: 'article',
      images: [
        {
          url: recipeImage,
          width: 1200,
          height: 630,
          alt: recipe.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: recipe.title,
      description: recipe.description,
      images: [recipeImage],
    },
  };
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

export async function generateStaticParams() {
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}
