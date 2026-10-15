import { cardImageFit, type CardImageFit, type CardImagePosition } from '@/lib/cardImage';
import { getRecipeImage, publishedReviews, recipes, type Recipe, type Review } from '@/lib/data';
import type { PageLink } from '@/lib/pageSeo';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';
import { createSearchIndex, getRankedSearchResults, getSearchContentTypeLabel } from '@/lib/siteSearch.mjs';

// O /buscar: a mesma busca do campo do topo (siteSearch.mjs) e, por resultado, a capa da receita ou do
// artigo. O índice que vai para o navegador (public/search-index.json) segue sem imagem: a capa só é
// procurada aqui, no servidor.

export const SEARCH_TRAIL: PageLink[] = [
  { name: 'Início', path: '/' },
  { name: 'Busca', path: '/buscar' },
];

export const SEARCH_COPY = {
  title: 'Buscar no site',
  intro: 'Digite na busca do topo da página para achar guias, análises e receitas.',
  placeholder: 'Buscar receitas e artigos',
  count: (total: number, query: string) => `${total} ${total === 1 ? 'resultado' : 'resultados'} para “${query}”`,
  emptyTitle: (query: string) => `Nada encontrado para “${query}”`,
  emptyHint: 'Tente uma palavra só, o nome da marca ou do produto. Cupons ficam em',
};

export type SearchCardImage = { src: string; fit: CardImageFit; position?: CardImagePosition };

export type SearchCard = {
  key: string;
  href: string;
  title: string;
  description: string;
  typeLabel: string;
  category?: string;
  image?: SearchCardImage;
};

type SearchSource = { recipes: readonly Recipe[]; reviews: readonly Review[] };

type IndexItem = { id: number; contentType: 'recipe' | 'review'; href: string; title: string; description: string; category?: string };

// A receita sem foto própria leva a ilustração da categoria (getRecipeImage), como em /receitas; a foto da
// receita cobre o cartão. O artigo segue a regra dos cartões (cardImage.ts).
function recipeImage(recipe: Recipe): SearchCardImage {
  return { src: resolveMediaUrl(getRecipeImage(recipe)), fit: 'cover' };
}

function reviewImage(review: Review): SearchCardImage | undefined {
  if (!review.image) return undefined;
  return { src: resolveMediaUrl(review.image), fit: cardImageFit(review), position: review.imagePosition };
}

export function createSearchPage({ recipes: recipeList, reviews }: SearchSource) {
  const index = createSearchIndex({ recipes: recipeList, reviews }) as IndexItem[];
  const recipeById = new Map(recipeList.map((recipe) => [recipe.id, recipe]));
  const reviewById = new Map(reviews.map((review) => [review.id, review]));

  return function search(query: string): SearchCard[] {
    return (getRankedSearchResults(index, query) as IndexItem[]).map((result) => {
      const recipe = result.contentType === 'recipe' ? recipeById.get(result.id) : undefined;
      const review = result.contentType === 'review' ? reviewById.get(result.id) : undefined;
      return {
        key: `${result.contentType}:${result.id}`,
        href: result.href,
        title: result.title,
        description: result.description,
        typeLabel: getSearchContentTypeLabel(result.contentType),
        category: result.category,
        image: recipe ? recipeImage(recipe) : review ? reviewImage(review) : undefined,
      };
    });
  };
}

export const searchSite = createSearchPage({ recipes, reviews: publishedReviews });

// O ?q= da URL: o primeiro valor, sem espaço nas pontas.
export function getSearchQuery(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value ?? '').trim();
}
