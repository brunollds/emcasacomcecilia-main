import { recipesData, reviewsData } from './generated/content-index';
import type { ReviewCategory } from './reviewDiscovery';
import type { Locale } from '@/lib/i18n/locales';

// 📊 Dados Unificados - Em Casa com Cecília

export interface IngredientSection {
  section: string;
  items: string[];
}

export interface StructuredIngredientItem {
  qty: number;
  unit: string;
  name: string;
  note?: string;
}

export interface StructuredIngredientSection {
  section: string;
  items: StructuredIngredientItem[];
}

export interface InstructionSection {
  section: string;
  steps: string[];
}

export interface InstructionMedia {
  stepIndex: number;
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  videoUrl?: string;
  caption?: string;
}

export interface ContentSectionLink {
  label: string;
  href: string;
  sponsored?: boolean;
}

export interface ContentSectionImage {
  src: string;
  alt: string;
  caption?: string;
  objectFit?: 'cover' | 'contain' | 'portrait';
  aspectRatio?: number;
}

export interface RecipeRating {
  average: number;
  count: number;
}

export interface RecipeNutrition {
  calories?: string;
  protein?: string;
  carbohydrates?: string;
  fat?: string;
  fiber?: string;
  sodium?: string;
}

export interface RecipeCostEstimate {
  label?: string;
  amount?: string;
  currency?: 'BRL' | string;
  note?: string;
}

export interface PersonRef {
  name: string;
  slug: string;
  role?: string;
  url?: string;
  initials?: string;
  avatar?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
}

export interface Recipe {
  id: number;
  slug: string;
  title: string;
  description: string;
  intro?: string;
  context?: string;
  publishedAt?: string;
  updatedAt?: string;
  author?: PersonRef;
  authors?: PersonRef[];
  image?: string;
  imageAlt?: string;
  category?: string;
  categories?: string[];
  primaryCategory?: string;
  subCategory?: string[];
  cuisine?: string[];
  mealTime?: string[];
  method?: string[];
  diet?: string[];
  keyIngredients?: string[];
  collections?: string[];
  tags?: string[];
  searchTerms?: string[];
  prepTime: string;
  prepMinutes?: number;
  cookTime: string;
  cookMinutes?: number;
  totalTime: string;
  calories?: string;
  nutrition?: RecipeNutrition;
  estimatedCost?: RecipeCostEstimate;
  difficulty: 'Fácil' | 'Médio' | 'Difícil' | string;
  yield: string;
  servings?: number;
  servingsUnit?: string;
  youtubeUrl?: string;
  videoThumbnail?: string;
  videoUploadDate?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  isPopular?: boolean;
  isNew?: boolean;
  ingredients: IngredientSection[];
  structuredIngredients?: StructuredIngredientSection[];
  instructions: string[];
  instructionGroups?: InstructionSection[];
  instructionMedia?: InstructionMedia[];
  tips?: string[];
  rating?: RecipeRating;
}

export interface AudioClip {
  src: string;
  title: string;
  duration?: string;
  transcript?: string;
  description?: string;
}

export interface Review {
  id: number;
  slug: string;
  locale?: Locale;
  translationKey?: string;
  title: string;
  type: string;
  reviewKind?: 'produto' | 'guia' | 'editorial';
  category?: ReviewCategory;
  rating?: number;
  ratingCount?: number;
  productName?: string;
  brand?: string;
  description: string;
  publishedAt: string;
  publishedAtISO?: string;
  updatedAt?: string;
  author?: PersonRef;
  authors?: PersonRef[];
  isNew?: boolean;
  hideFromListings?: boolean;
  hideFromPortugueseListings?: boolean;
  homeFeatured?: boolean;
  affiliate?: string;
  image?: string;
  imageAlt?: string;
  imageAspect?: 'landscape' | 'portrait' | 'square';
  video?: {
    mp4: string;
    webm?: string;
    poster?: string;
    aspect?: 'landscape' | 'portrait' | 'square';
  };
  draft?: boolean;
  imagePosition?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  imageFit?: 'cover' | 'contain';
  youtubeUrl?: string;
  audio?: AudioClip;
  gallery?: {
    image: string;
    alt: string;
    caption?: string;
    objectFit?: 'cover' | 'contain';
    aspectRatio?: number;
  }[];
  pros: string[];
  cons: string[];
  pullQuote?: string;
  verdict?: {
    stars: 1 | 2 | 3 | 4 | 5;
    recommendation: 'recomendo' | 'com ressalvas' | 'não recomendo';
    summary: string;
  };
  productSpec?: {
    key: string;
    value: string;
    highlight?: boolean;
  }[];
  cta?: {
    text: string;
    label: string;
    url: string;
    sponsored?: boolean;
  };
  coupon?: string;
  editorialNote?: string;
  seoTitle?: string;
  metaDescription?: string;
  canonical?: string;
  relatedArticles?: {
    slug: string;
    title: string;
    category?: string;
  }[];
  contentSections?: {
    heading?: string;
    paragraphs?: string[];
    bullets?: string[];
    emphasis?: string;
    image?: string | ContentSectionImage;
    imageAlt?: string;
    imageCaption?: string;
    imageFit?: 'cover' | 'contain' | 'portrait' | 'wide' | 'panoramic' | 'square';
    imageAspectRatio?: number;
    images?: ContentSectionImage[];
    comparisonTable?: {
      caption?: string;
      headers: string[];
      rows: string[][];
    };
    links?: ContentSectionLink[];
    notice?: string;
    widget?: string;
    postParagraphs?: string[];
    accordionBlock?: {
      heading: string;
      paragraphs: string[];
    };
    video?: {
      mp4: string;
      webm?: string;
      poster?: string;
      alt?: string;
      aspect?: 'video' | 'square' | 'portrait';
    };
  }[];
}

export interface SocialHighlight {
  id: string;
  title: string;
  url: string;
  thumbnailUrl?: string;
  fallbackThumbnailUrl?: string;
}

// 🍳 Receitas
// Conteúdo migrado para content/ (Fase 2b) — o índice é gerado no build.
export const recipes: Recipe[] = recipesData as unknown as Recipe[];

export const recipePlaceholderImages = {
    'air-fryer': '/images/recipes/placeholder/air-fryer-placeholder.jpg',
    bebidas: '/images/recipes/placeholder/bebidas-placeholder.jpg',
    acompanhamentos: '/images/recipes/placeholder/salgados-placeholder.jpg',
    bolos: '/images/recipes/placeholder/bolos-placeholder.jpg',
    'bolos-caseiros': '/images/recipes/placeholder/bolos-placeholder.jpg',
    bolo: '/images/recipes/placeholder/bolos-placeholder.jpg',
    brunch: '/images/recipes/placeholder/salgados-placeholder.jpg',
    'cafe-da-manha': '/images/recipes/placeholder/salgados-placeholder.jpg',
    churrasco: '/images/recipes/carnes/carne.jpg',
    doces: '/images/recipes/placeholder/doces-placeholder.jpg',
    sobremesas: '/images/recipes/sobremesas/mousse.jpg',
    chocolate: '/images/recipes/placeholder/doces-placeholder.jpg',
    festas: '/images/recipes/placeholder/doces-placeholder.jpg',
    pudins: '/images/recipes/pudins/pudim.jpg',
    tortas: '/images/recipes/tortas/torta.jpg',
    massas: '/images/recipes/placeholder/massas-placeholder.jpg',
    italiana: '/images/recipes/placeholder/massas-placeholder.jpg',
    pizza: '/images/recipes/pizzas/pizza.jpg',
    pizzas: '/images/recipes/pizzas/pizza.jpg',
    pascoa: '/images/recipes/placeholder/pascoa-placeholder.jpg',
    sazonais: '/images/recipes/placeholder/pascoa-placeholder.jpg',
    salgados: '/images/recipes/placeholder/salgados-placeholder.jpg',
    petiscos: '/images/recipes/placeholder/salgados-placeholder.jpg',
    lanches: '/images/recipes/placeholder/salgados-placeholder.jpg',
    frango: '/images/recipes/frango/frango.jpg',
    carnes: '/images/recipes/carnes/carne.jpg',
    carne: '/images/recipes/carnes/carne.jpg',
    feijoada: '/images/recipes/carnes/feijoada.jpg',
    peixes: '/images/recipes/peixes/peixe.jpg',
    paes: '/images/recipes/paes/pao.jpg',
    sopas: '/images/recipes/sopas/sopa.jpg',
    saudaveis: '/images/recipes/placeholder/saudaveis-placeholder.jpg',
    saudavel: '/images/recipes/placeholder/saudaveis-placeholder.jpg',
    saladas: '/images/recipes/saladas/salada.jpg',
    vegetariana: '/images/recipes/placeholder/saudaveis-placeholder.jpg',
    vegano: '/images/recipes/placeholder/saudaveis-placeholder.jpg',
    vegana: '/images/recipes/placeholder/saudaveis-placeholder.jpg',
};
const recipeDisplayCategoryPriority = [
    'sobremesas',
    'doces',
    'pudins',
    'tortas',
    'bolos-caseiros',
    'bolos',
    'pizza',
    'pizzas',
    'massas',
    'paes',
    'saladas',
    'sopas',
    'bebidas',
    'frango',
    'carnes',
    'carne',
    'peixes',
    'salgados',
    'petiscos',
    'lanches',
    'acompanhamentos',
    'churrasco',
    'air-fryer',
];
const specificRecipePlaceholderPriority = [
    'pudins',
    'tortas',
    'pizza',
    'pizzas',
    'frango',
    'carnes',
    'carne',
    'peixes',
    'paes',
    'saladas',
    'sopas',
    'sobremesas',
    'acompanhamentos',
    'churrasco',
];
export function getCategorySlug(value) {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/&/g, 'e')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}
export function getRecipePrimaryCategory(recipe) {
    const labels = recipe.categories?.length ? recipe.categories : [recipe.primaryCategory].filter(Boolean);
    const categorySlugs = labels.map(getCategorySlug);
    const preferredSlug = recipeDisplayCategoryPriority.find((slug) => categorySlugs.includes(slug));
    if (!preferredSlug) {
        return recipe.primaryCategory || recipe.categories?.[0] || 'Geral';
    }
    const preferredCategory = labels.find((category) => getCategorySlug(category) === preferredSlug);
    return preferredCategory || recipe.primaryCategory || recipe.categories?.[0] || 'Geral';
}
export function getRecipeImage(recipe) {
    if (recipe.image)
        return recipe.image;
    const labels = recipe.categories?.length ? recipe.categories : getRecipeAllCategoryLabels(recipe);
    const categorySlugs = labels.map(getCategorySlug);
    const specificPlaceholder = specificRecipePlaceholderPriority
        .filter((category) => categorySlugs.includes(category))
        .map((category) => recipePlaceholderImages[category])
        .find(Boolean);
    if (specificPlaceholder)
        return specificPlaceholder;
    const placeholder = categorySlugs
        .map((category) => recipePlaceholderImages[category])
        .find(Boolean);
    return placeholder || recipePlaceholderImages.doces;
}
export function getRecipeImageAlt(recipe) {
    return recipe.imageAlt || `Imagem ilustrativa da receita ${recipe.title}`;
}
export function slugifyContent(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, 'e')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getReviewSlug(review: Review): string {
  return review.slug || slugifyContent(review.title);
}

export function getRecipeAllCategoryLabels(recipe: Recipe): string[] {
  return Array.from(
    new Set([
      ...(recipe.categories || []),
      ...(recipe.primaryCategory ? [recipe.primaryCategory] : []),
      ...(recipe.subCategory || []),
      ...(recipe.mealTime || []),
      ...(recipe.cuisine || []),
      ...(recipe.method || []),
      ...(recipe.diet || []),
      ...(recipe.keyIngredients || []),
      ...(recipe.collections || []),
    ].filter(Boolean))
  );
}

export function getRecipeCuisine(recipe: Recipe): string | null {
  return recipe.cuisine?.[0] || null;
}

export const reviews: Review[] = reviewsData as unknown as Review[];

export const publishedReviews: Review[] = reviews.filter((review) => !review.draft);

export const youtubeShorts: any[] = [];
