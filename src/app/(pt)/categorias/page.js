import { PRIMARY_CATEGORIES } from '@/constants/taxonomia';
import { getRecipeAllCategoryLabels, recipes } from '@/lib/data';
import CategoriasClientPage from './CategoriasClientPage';

export const metadata = {
  title: 'Categorias de Receitas - Em Casa com Cecília',
  description: 'Navegue pelo índice editorial de receitas por tipo de prato, método, dieta, cozinha, ingrediente e coleções.',
  alternates: {
    canonical: '/categorias',
  },
  // Sem link no site e fora do sitemap (Bruno, 08/10): segue no ar para quem tem o endereço, fora do Google.
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Categorias de Receitas - Em Casa com Cecília',
    description: 'Descubra receitas por tipo de prato, subcategorias, cozinha, método, dieta, ingrediente e coleções.',
    url: '/categorias',
    type: 'website',
  },
};

export default function CategoriasPage() {
  // Quantas receitas têm cada rótulo em qualquer campo da taxonomia.
  const recipeCounts = {};
  for (const recipe of recipes) {
    for (const label of getRecipeAllCategoryLabels(recipe)) {
      recipeCounts[label] = (recipeCounts[label] ?? 0) + 1;
    }
  }
  const primaryCategories = PRIMARY_CATEGORIES.filter((label) =>
    recipes.some((recipe) => recipe.primaryCategory === label)
  );

  return <CategoriasClientPage recipeCounts={recipeCounts} primaryCategories={primaryCategories} />;
}
