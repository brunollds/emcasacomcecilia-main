// Camada canônica de contratos de conteúdo — Fase 1
// Compatível com src/lib/data.ts legado e com os contratos v1.1 de destino.

// ---------------------------------------------------------------------------
// Primitivos compartilhados
// ---------------------------------------------------------------------------

export interface Image {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface EditorialNoteData {
  id?: string;
  label: string;          // note title shown on the pill and sheet header
  body: string;           // plain text; paragraphs separated by \n\n
  placement?: 'margin' | 'inline';  // reserved; current UI treats both the same
  anchor?: string;        // section id ("ingredientes") or line anchor ("S2:L7" = section 0-based, line 1-based at 720px)
}

export interface PersonRef {
  name: string;
  slug: string;
  role?: string;
  url?: string;
  initials?: string;
  avatar?: Image;
}

export interface ArticleRef {
  slug: string;
  title: string;
  category?: string;
  coverImage?: Image;
}

// ---------------------------------------------------------------------------
// Receita — ingredientes
// ---------------------------------------------------------------------------

/** Modelo legado de seção de ingredientes (preservado em data.ts). */
export interface IngredientSection {
  section: string;
  items: string[];
}

/** Modelo estruturado de ingrediente — opcional, habilita escala de porções. */
export interface StructuredIngredientItem {
  /** Quantidade base para a porção definida em servings. */
  qty: number;
  /** Unidade abreviada: "xíc.", "col. sopa", "un.", "g", "ml"... */
  unit: string;
  /** Nome do ingrediente sem quantidade ou unidade. */
  name: string;
  /** Observação de preparo: "peneirada", "em temperatura ambiente". */
  note?: string;
}

/** Modelo estruturado de seção de ingredientes — opcional. */
export interface StructuredIngredientSection {
  section: string;
  items: StructuredIngredientItem[];
}

// ---------------------------------------------------------------------------
// Receita — modo de preparo
// ---------------------------------------------------------------------------

/** Modelo legado — lista plana de passos. */
export type Instructions = string[];

/** Modelo novo — passos agrupados por seção. Opcional. */
export interface InstructionSection {
  section: string;
  steps: string[];
}

export interface InstructionMedia {
  stepIndex: number;
  image?: Image;
  videoUrl?: string;
  caption?: string;
}

// ---------------------------------------------------------------------------
// Receita — avaliação
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Receita
// ---------------------------------------------------------------------------

export type Difficulty = 'fácil' | 'médio' | 'difícil';

/** Modelo canônico de receita — compatível com data.ts legado + campos v1.1. */
export interface Recipe {
  // Identificação
  id: number;
  slug: string;

  // Taxonomia (legado — preservar integralmente)
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
  searchTerms?: string[];
  tags?: string[];
  isPopular?: boolean;
  isNew?: boolean;

  // Cabeçalho
  title: string;
  description: string;
  author?: PersonRef;
  authors?: PersonRef[];
  publishedAt?: string;
  updatedAt?: string;
  changelog?: { date: string; text: string }[];
  image?: string;
  imageAlt?: string;
  coverImage?: Image;

  // Ficha técnica legada
  prepTime: string;
  cookTime: string;
  totalTime: string;
  yield: string;
  difficulty: string;

  // Ficha técnica nova (opcional)
  prepMinutes?: number;
  cookMinutes?: number;
  servings?: number;
  servingsUnit?: string;
  difficultyLevel?: Difficulty;

  // Conteúdo editorial
  intro?: string;
  context?: string;
  calories?: string;
  nutrition?: RecipeNutrition;
  estimatedCost?: RecipeCostEstimate;

  // Mídia e links
  youtubeUrl?: string;
  videoThumbnail?: string;
  videoUploadDate?: string;
  instagramUrl?: string;
  tiktokUrl?: string;

  // Ingredientes
  ingredients: IngredientSection[];
  structuredIngredients?: StructuredIngredientSection[];

  // Modo de preparo
  instructions: Instructions;
  instructionGroups?: InstructionSection[];
  instructionMedia?: InstructionMedia[];

  // Dicas
  tips?: string[];

  // Avaliação
  rating?: RecipeRating;

  // Editorial notes
  notes?: EditorialNoteData[];

  // SEO
  metaDescription?: string;
  canonical?: string;
}

// ---------------------------------------------------------------------------
// Review
// ---------------------------------------------------------------------------

export type ReviewKind = 'produto' | 'guia' | 'editorial';

export type ContentBlockType =
  | 'paragraph'
  | 'list'
  | 'emphasis'
  | 'image'
  | 'gallery'
  | 'link';

/** Modelo futuro opcional de bloco de conteúdo. Não migrar na Fase 1. */
export interface ContentBlock {
  type: ContentBlockType;
  content?: string;
  items?: string[];
  src?: string;
  alt?: string;
  caption?: string;
  href?: string;
  label?: string;
}

export interface ContentSectionLink {
  label: string;
  href: string;
}

export interface ContentSectionImage {
  src: string;
  alt: string;
  caption?: string;
  objectFit?: 'cover' | 'contain' | 'portrait' | 'wide';
}

/** Modelo legado real de contentSections em src/lib/data.ts. */
export interface ContentSection {
  heading?: string;
  paragraphs?: string[];
  postParagraphs?: string[];
  bullets?: string[];
  emphasis?: string;
  emphasisAfterParagraph?: number;
  image?: string | ContentSectionImage;
  imageAlt?: string;
  imageCaption?: string;
  imageFit?: 'cover' | 'contain' | 'portrait' | 'wide';
  images?: ContentSectionImage[];
  links?: ContentSectionLink[];
  widget?: string;
  accordionBlock?: {
    heading: string;
    paragraphs: string[];
  };
}

export interface GalleryImage {
  image: string;
  alt: string;
  caption?: string;
}

export interface AudioClip {
  src: string;
  title: string;
  duration?: string;
  transcript?: string;
  description?: string;
}

export type Stars = 1 | 2 | 3 | 4 | 5;
export type Recommendation = 'recomendo' | 'com ressalvas' | 'não recomendo';

export interface Verdict {
  stars: Stars;
  recommendation: Recommendation;
  summary: string;
}

export interface ProductSpecItem {
  key: string;
  value: string;
  highlight?: boolean;
}

export interface Cta {
  text: string;
  label: string;
  url: string;
}

/** Modelo canônico de review — compatível com data.ts legado + campos v1.1. */
export interface Review {
  // Identificação
  id: number;
  slug: string;

  // Tipo editorial legado (preservar — não substituir)
  type: string;

  // Novo discriminador opcional
  reviewKind?: ReviewKind;

  // Cabeçalho
  title: string;
  kicker?: string;
  description: string;
  author?: PersonRef;
  authors?: PersonRef[];
  publishedAt: string;
  publishedAtISO?: string;
  updatedAt?: string;
  changelog?: { date: string; text: string }[];
  image?: string;
  imageAlt?: string;
  imageAspect?: 'landscape' | 'portrait' | 'square';
  video?: {
    mp4: string;
    webm?: string;
    poster?: string;
  };
  imagePosition?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  imageFit?: 'cover' | 'contain';
  coverImage?: Image;
  category?: string;
  youtubeUrl?: string;
  audio?: AudioClip;
  gallery?: GalleryImage[];

  // Conteúdo
  contentSections?: ContentSection[];
  contentBlocks?: ContentBlock[];
  pullQuote?: string;

  // Campos de produto (opcionais)
  verdict?: Verdict;
  pros: string[];
  cons: string[];
  productSpec?: ProductSpecItem[];

  // CTA (opcional)
  cta?: Cta;
  coupon?: string;

  // Avaliação existente (preservar)
  rating?: number;
  ratingCount?: number;

  // Relacionados e rodapé
  relatedArticles?: ArticleRef[];
  editorialNote?: string;
  notes?: EditorialNoteData[];

  // Taxonomia e flags
  tags?: string[];
  collections?: string[];
  isPopular?: boolean;
  isNew?: boolean;
  hideFromListings?: boolean;

  // SEO
  metaDescription?: string;
  canonical?: string;
}

// ---------------------------------------------------------------------------
// View models — output dos adaptadores
// ---------------------------------------------------------------------------

export interface RecipeViewModel {
  recipe: Recipe;
  totalMinutes: number | null;
  displayIngredients: StructuredIngredientSection[] | null;
  displayInstructions: InstructionSection[];
  hasServingsControl: boolean;
  schemaIngredients: string[];
  schemaInstructions: string[];
  schemaIsoDuration?: string;
  authors: PersonRef[];
}

export interface ReviewViewModel {
  review: Review;
  kind: ReviewKind;
  plainTextBody: string;
  hasVerdict: boolean;
  hasCta: boolean;
  hasPullQuote: boolean;
  authors: PersonRef[];
}
