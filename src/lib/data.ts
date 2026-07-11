import { recipesData, reviewsData } from './generated/content-index';

// 📊 Dados Unificados - Em Casa com Cecília

import { BRUNO_AUTHOR, CECILIA_AUTHOR } from '@/lib/content/authors';

export interface SocialMedia {
  name: string;
  handle: string;
  followers: string;
  url: string;
  icon: string;
  color: string;
}

export interface LinkItem {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  color: string;
  badge?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  count: number;
}

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
}

export interface ContentSectionImage {
  src: string;
  alt: string;
  caption?: string;
  objectFit?: 'cover' | 'contain' | 'portrait';
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
  title: string;
  type: string;
  reviewKind?: 'produto' | 'guia' | 'editorial';
  rating?: number;
  ratingCount?: number;
  description: string;
  publishedAt: string;
  publishedAtISO?: string;
  updatedAt?: string;
  author?: PersonRef;
  authors?: PersonRef[];
  isNew?: boolean;
  hideFromListings?: boolean;
  image?: string;
  imageAlt?: string;
  imageAspect?: 'landscape' | 'portrait' | 'square';
  video?: {
    mp4: string;
    webm?: string;
    poster?: string;
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
  };
  coupon?: string;
  editorialNote?: string;
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
    imageFit?: 'cover' | 'contain' | 'portrait' | 'wide';
    images?: ContentSectionImage[];
    links?: ContentSectionLink[];
    widget?: string;
    postParagraphs?: string[];
    accordionBlock?: {
      heading: string;
      paragraphs: string[];
    };
  }[];
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  discount: number;
  store: string;
  coupon?: string;
  url: string;
  image?: string;
}

export interface BrandLinks {
  contactEmail: string;
  contactMailto: string;
  mediaKit: string;
  whatsappGroup: string;
  whatsapp: string;
  instagram: string;
  youtube: string;
  tiktok: string;
  facebook: string;
  kwai: string;
  dicas: string;
  damie: string;
  dolceGusto: string;
  parcerias: string;
  airFryerEbook: string;
}

export interface SocialHighlight {
  id: string;
  platform: 'YouTube' | 'Instagram';
  title: string;
  description: string;
  url: string;
  accent?: string;
  thumbnailUrl?: string;
  fallbackThumbnailUrl?: string;
}

export const brandLinks: BrandLinks = {
  contactEmail: 'contato@emcasacomcecilia.com',
  contactMailto: 'mailto:contato@emcasacomcecilia.com',
  mediaKit: 'https://mk.emcasacomcecilia.com',
  whatsappGroup: 'https://chat.whatsapp.com/GwouQfaZMrj32j7pKOIZbQ',
  whatsapp: 'https://wa.me/5511999999999',
  instagram: 'https://instagram.com/emcasacomcecilia',
  youtube: 'https://youtube.com/@emcasacomcecilia',
  tiktok: 'https://tiktok.com/@emcasacomcecilia',
  facebook: 'https://facebook.com/emcasacomcecilia',
  kwai: 'https://kwai.com/@emcasacomcecilia',
  dicas: 'https://dicas.emcasacomcecilia.com',
  damie: 'https://damie.emcasacomcecilia.com',
  dolceGusto: 'https://www.nescafe-dolcegusto.com.br/',
  parcerias: 'mailto:contato@emcasacomcecilia.com',
  airFryerEbook: 'mailto:contato@emcasacomcecilia.com?subject=Quero%20saber%20sobre%20o%20E-book%20Air%20Fryer',
};

// 📱 Redes Sociais da Cecília
export const socialMedias: SocialMedia[] = [
  {
    name: 'YouTube',
    handle: '@emcasacomcecilia',
    followers: '11.3K+',
    url: brandLinks.youtube,
    icon: 'Youtube',
    color: 'bg-red-600',
  },
  {
    name: 'Instagram',
    handle: '@emcasacomcecilia',
    followers: '445K',
    url: brandLinks.instagram,
    icon: 'Instagram',
    color: 'bg-gradient-to-br from-purple-600 to-pink-600',
  },
  {
    name: 'TikTok',
    handle: '@emcasacomcecilia',
    followers: '84K',
    url: brandLinks.tiktok,
    icon: 'TikTok',
    color: 'bg-black',
  },
  {
    name: 'Facebook',
    handle: 'Em Casa com Cecília',
    followers: '7K',
    url: brandLinks.facebook,
    icon: 'Facebook',
    color: 'bg-blue-600',
  },
  {
    name: 'Kwai',
    handle: '@emcasacomcecilia',
    followers: '5K',
    url: brandLinks.kwai,
    icon: 'Kwai',
    color: 'bg-orange-500',
  },
];

// 📂 Categorias Unificadas
export const categories: Category[] = [
  { id: '1', name: 'Bolos', slug: 'bolos', icon: 'Cake', color: 'from-orange-400 to-orange-600', count: 42 },
  { id: '2', name: 'Massas', slug: 'massas', icon: 'Utensils', color: 'from-yellow-400 to-yellow-600', count: 35 },
  { id: '3', name: 'Doces', slug: 'doces', icon: 'Cookie', color: 'from-pink-400 to-pink-600', count: 24 },
  { id: '4', name: 'Salgados', slug: 'salgados', icon: 'Pizza', color: 'from-red-400 to-red-600', count: 28 },
  { id: '5', name: 'Saudáveis', slug: 'saudaveis', icon: 'Leaf', color: 'from-green-400 to-green-600', count: 31 },
  { id: '6', name: 'Air Fryer', slug: 'air-fryer', icon: 'Zap', color: 'from-purple-400 to-purple-600', count: 22 },
];

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

export const offers: Offer[] = [
  {
    id: '1',
    title: 'Batedeira Planetária KitchenAid',
    description: 'Batedeira profissional com 10 velocidades',
    originalPrice: 2499.90,
    discountPrice: 1899.90,
    discount: 24,
    store: 'Amazon',
    coupon: 'CECILIA10',
    url: `${brandLinks.dicas}/batedeira-kitchenaid`,
  },
  {
    id: '2',
    title: 'Air Fryer Philips Walita',
    description: 'Fritadeira sem óleo 4.1L para a família',
    originalPrice: 899.90,
    discountPrice: 649.90,
    discount: 28,
    store: 'Magazine Luiza',
    coupon: 'CECILIA12',
    url: `${brandLinks.dicas}/air-fryer-philips`,
  },
  {
    id: '3',
    title: 'Kit Panelas Antiaderentes',
    description: 'Jogo com 5 panelas com revestimento cerâmico',
    originalPrice: 599.90,
    discountPrice: 399.90,
    discount: 33,
    store: 'Shopee',
    url: `${brandLinks.dicas}/kit-panelas`,
  },
];

export const linkItems: LinkItem[] = [
  { id: 'dicas', title: 'Dicas & Ofertas', description: 'Promoções', url: brandLinks.dicas, icon: 'Tag', color: 'from-green-500 to-emerald-600' }
];

export const youtubeShorts: any[] = [];

export function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function totalFollowers(): string {
  const total = socialMedias.reduce((acc, social) => {
    const num = parseFloat(social.followers.replace('K', '').replace('+', ''));
    return acc + (social.followers.includes('K') ? num * 1000 : num);
  }, 0);
  
  if (total >= 1000000) return (total / 1000000).toFixed(1) + 'M';
  if (total >= 1000) return (total / 1000).toFixed(1) + 'K';
  return total.toString();
}
