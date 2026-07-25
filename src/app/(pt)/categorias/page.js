import CategoriasClientPage from './CategoriasClientPage';

export const metadata = {
  title: 'Categorias de Receitas - Em Casa com Cecília',
  description: 'Navegue pelo índice editorial de receitas por tipo de prato, método, dieta, cozinha, ingrediente e coleções.',
  alternates: {
    canonical: '/categorias',
  },
  openGraph: {
    title: 'Categorias de Receitas - Em Casa com Cecília',
    description: 'Descubra receitas por tipo de prato, subcategorias, cozinha, método, dieta, ingrediente e coleções.',
    url: '/categorias',
    type: 'website',
  },
};

export default function CategoriasPage() {
  return <CategoriasClientPage />;
}
