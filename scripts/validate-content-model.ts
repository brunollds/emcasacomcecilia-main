// Validação da compatibilidade do modelo canônico com toda a base atual.
// Executa normalizeRecipe() e normalizeReview() em todos os registros de
// src/lib/data.ts e reporta inconsistências.

import { recipes, reviews } from '@/lib/data';
import {
  formatQuantity,
  inferReviewKind,
  normalizeRecipe,
  normalizeReview,
  resolveTotalMinutes,
  structuredIngredientToText,
} from '@/lib/content';

interface ValidationError {
  type: 'recipe' | 'review';
  id: number;
  slug: string;
  message: string;
}

interface ValidationWarning {
  type: 'recipe' | 'review' | 'autoria';
  id: number;
  slug: string;
  message: string;
}

const errors: ValidationError[] = [];
const warnings: ValidationWarning[] = [];
const recipeIds = new Set<number>();
const recipeSlugs = new Set<string>();
const reviewIds = new Set<number>();
const reviewSlugs = new Set<string>();

function reportError(error: ValidationError): void {
  errors.push(error);
}

function reportWarning(warning: ValidationWarning): void {
  warnings.push(warning);
}

if (
  formatQuantity(1.5) !== '1½' ||
  formatQuantity(1 / 3) !== '⅓' ||
  formatQuantity(1 / 16) !== '1/16'
) {
  reportError({
    type: 'recipe',
    id: -1,
    slug: '__serializers__',
    message: 'formatQuantity não preserva frações suportadas',
  });
}

const recipeWithPassiveTime = recipes.find(
  (recipe) => recipe.slug === 'pao-naan-indiano-caseiro'
);

if (
  !recipeWithPassiveTime ||
  resolveTotalMinutes(recipeWithPassiveTime) !== 85
) {
  reportError({
    type: 'recipe',
    id: -1,
    slug: '__serializers__',
    message: 'resolveTotalMinutes descartou tempo passivo da receita',
  });
}

if (
  structuredIngredientToText({
    qty: 0,
    unit: 'a gosto',
    name: 'sal',
  }) !== 'sal a gosto'
) {
  reportError({
    type: 'recipe',
    id: -1,
    slug: '__serializers__',
    message: 'ingrediente sem quantidade foi serializado incorretamente',
  });
}

// ---------------------------------------------------------------------------
// Validar receitas
// ---------------------------------------------------------------------------

for (const recipe of recipes) {
  if (!recipe.id || typeof recipe.id !== 'number') {
    reportError({ type: 'recipe', id: recipe.id ?? -1, slug: recipe.slug, message: 'id ausente ou não numérico' });
  }

  if (!recipe.slug) {
    reportError({ type: 'recipe', id: recipe.id, slug: recipe.slug, message: 'slug ausente' });
  }

  if (recipeIds.has(recipe.id)) {
    reportError({ type: 'recipe', id: recipe.id, slug: recipe.slug, message: 'id duplicado' });
  }
  recipeIds.add(recipe.id);

  if (recipeSlugs.has(recipe.slug)) {
    reportError({ type: 'recipe', id: recipe.id, slug: recipe.slug, message: 'slug duplicado' });
  }
  recipeSlugs.add(recipe.slug);

  if (!recipe.title) {
    reportError({ type: 'recipe', id: recipe.id, slug: recipe.slug, message: 'title ausente' });
  }

  if (!recipe.description) {
    reportError({ type: 'recipe', id: recipe.id, slug: recipe.slug, message: 'description ausente' });
  }

  if (!Array.isArray(recipe.ingredients) || recipe.ingredients.length === 0) {
    reportError({ type: 'recipe', id: recipe.id, slug: recipe.slug, message: 'ingredients ausente ou vazio' });
  } else {
    for (const section of recipe.ingredients) {
      if (!section.section || !Array.isArray(section.items)) {
        reportError({ type: 'recipe', id: recipe.id, slug: recipe.slug, message: 'ingredientSection malformado' });
      }
    }
  }

  if (!Array.isArray(recipe.instructions) || recipe.instructions.length === 0) {
    reportError({ type: 'recipe', id: recipe.id, slug: recipe.slug, message: 'instructions ausente ou vazio' });
  }

  if (recipe.subCategory && !Array.isArray(recipe.subCategory)) {
    reportError({ type: 'recipe', id: recipe.id, slug: recipe.slug, message: 'subCategory deve ser array' });
  }

  if (recipe.cuisine && !Array.isArray(recipe.cuisine)) {
    reportError({ type: 'recipe', id: recipe.id, slug: recipe.slug, message: 'cuisine deve ser array' });
  }

  if (
    recipe.rating &&
    (
      !Number.isFinite(recipe.rating.average) ||
      recipe.rating.average < 1 ||
      recipe.rating.average > 5 ||
      !Number.isInteger(recipe.rating.count) ||
      recipe.rating.count < 1
    )
  ) {
    reportError({
      type: 'recipe',
      id: recipe.id,
      slug: recipe.slug,
      message: 'rating deve ter average entre 1 e 5 e count inteiro positivo',
    });
  }

  if (
    recipe.videoUploadDate &&
    Number.isNaN(Date.parse(recipe.videoUploadDate))
  ) {
    reportError({
      type: 'recipe',
      id: recipe.id,
      slug: recipe.slug,
      message: 'videoUploadDate deve ser uma data ISO válida',
    });
  }

  // Warnings não bloqueantes
  if (!recipe.publishedAt) {
    reportWarning({
      type: 'recipe',
      id: recipe.id,
      slug: recipe.slug,
      message: 'receita sem publishedAt (impede datePublished no schema)',
    });
  }

  if (!recipe.imageAlt) {
    reportWarning({
      type: 'recipe',
      id: recipe.id,
      slug: recipe.slug,
      message: 'receita sem imageAlt (acessibilidade e SEO)',
    });
  }

  try {
    const viewModel = normalizeRecipe(recipe);
    if (!viewModel.displayInstructions || viewModel.displayInstructions.length === 0) {
      reportError({ type: 'recipe', id: recipe.id, slug: recipe.slug, message: 'normalizeRecipe não gerou displayInstructions' });
    }
    const expectedIngredientCount = recipe.ingredients.reduce(
      (count, section) => count + section.items.length,
      0
    );
    if (viewModel.schemaIngredients.length !== expectedIngredientCount) {
      reportError({
        type: 'recipe',
        id: recipe.id,
        slug: recipe.slug,
        message: 'normalizeRecipe perdeu ingredientes na serialização para schema',
      });
    }
    if (viewModel.schemaInstructions.length !== recipe.instructions.length) {
      reportError({
        type: 'recipe',
        id: recipe.id,
        slug: recipe.slug,
        message: 'normalizeRecipe perdeu passos na serialização para schema',
      });
    }
  } catch (err) {
    reportError({ type: 'recipe', id: recipe.id, slug: recipe.slug, message: `normalizeRecipe falhou: ${err instanceof Error ? err.message : String(err)}` });
  }
}

// ---------------------------------------------------------------------------
// Validar reviews
// ---------------------------------------------------------------------------

for (const review of reviews) {
  if (!review.id || typeof review.id !== 'number') {
    reportError({ type: 'review', id: review.id ?? -1, slug: review.slug, message: 'id ausente ou não numérico' });
  }

  if (!review.slug) {
    reportError({ type: 'review', id: review.id, slug: review.slug, message: 'slug ausente' });
  }

  if (reviewIds.has(review.id)) {
    reportError({ type: 'review', id: review.id, slug: review.slug, message: 'id duplicado' });
  }
  reviewIds.add(review.id);

  if (reviewSlugs.has(review.slug)) {
    reportError({ type: 'review', id: review.id, slug: review.slug, message: 'slug duplicado' });
  }
  reviewSlugs.add(review.slug);

  if (!review.title) {
    reportError({ type: 'review', id: review.id, slug: review.slug, message: 'title ausente' });
  }

  if (!review.description) {
    reportError({ type: 'review', id: review.id, slug: review.slug, message: 'description ausente' });
  }

  if (!review.type) {
    reportError({ type: 'review', id: review.id, slug: review.slug, message: 'type ausente' });
  }

  if (review.contentSections !== undefined && !Array.isArray(review.contentSections)) {
    reportError({ type: 'review', id: review.id, slug: review.slug, message: 'contentSections, quando presente, deve ser array' });
  }

  if (!Array.isArray(review.pros)) {
    reportError({ type: 'review', id: review.id, slug: review.slug, message: 'pros deve ser array' });
  }

  if (!Array.isArray(review.cons)) {
    reportError({ type: 'review', id: review.id, slug: review.slug, message: 'cons deve ser array' });
  }

  // Warnings não bloqueantes
  if (!review.publishedAtISO) {
    reportWarning({
      type: 'review',
      id: review.id,
      slug: review.slug,
      message: 'review sem publishedAtISO (impede datePublished ISO no schema)',
    });
  }

  const kind = inferReviewKind(review);
  if (kind === 'produto') {
    if (!review.verdict || typeof review.verdict.stars !== 'number') {
      reportWarning({
        type: 'review',
        id: review.id,
        slug: review.slug,
        message: 'review de produto sem verdict.stars',
      });
    }
    if (!review.productSpec || review.productSpec.length === 0) {
      reportWarning({
        type: 'review',
        id: review.id,
        slug: review.slug,
        message: 'review de produto sem productSpec',
      });
    }
    if (!review.cta || !review.cta.url || !review.cta.label) {
      reportWarning({
        type: 'review',
        id: review.id,
        slug: review.slug,
        message: 'review de produto sem cta completo',
      });
    }
  }

  try {
    const viewModel = normalizeReview(review);
    if (!viewModel.kind) {
      reportError({ type: 'review', id: review.id, slug: review.slug, message: 'normalizeReview não gerou kind' });
    }
    const expectedTextParts = (review.contentSections || []).flatMap((section) => [
      section.heading,
      ...(section.paragraphs || []),
      ...(section.bullets || []),
      section.emphasis,
    ]).filter(Boolean);
    if (expectedTextParts.length > 0 && !viewModel.plainTextBody) {
      reportError({
        type: 'review',
        id: review.id,
        slug: review.slug,
        message: 'normalizeReview perdeu o texto de contentSections',
      });
    }
  } catch (err) {
    reportError({ type: 'review', id: review.id, slug: review.slug, message: `normalizeReview falhou: ${err instanceof Error ? err.message : String(err)}` });
  }
}

// ---------------------------------------------------------------------------
// Validação dos pilotos
// ---------------------------------------------------------------------------

const PILOT_RECIPE_SLUG = 'pao-naan-indiano-caseiro';
const PILOT_REVIEW_SLUG = 'poltronas-reclinaveis-damie-vale-o-investimento';

const pilotRecipe = recipes.find((recipe) => recipe.slug === PILOT_RECIPE_SLUG);
const pilotReview = reviews.find((review) => review.slug === PILOT_REVIEW_SLUG);

if (!pilotRecipe) {
  reportError({ type: 'recipe', id: -1, slug: PILOT_RECIPE_SLUG, message: 'receita piloto não encontrada' });
} else {
  if (!pilotRecipe.structuredIngredients || pilotRecipe.structuredIngredients.length === 0) {
    reportError({ type: 'recipe', id: pilotRecipe.id, slug: pilotRecipe.slug, message: 'receita piloto não possui structuredIngredients' });
  }
  if (!pilotRecipe.instructionGroups || pilotRecipe.instructionGroups.length === 0) {
    reportError({ type: 'recipe', id: pilotRecipe.id, slug: pilotRecipe.slug, message: 'receita piloto não possui instructionGroups' });
  }
  if (!pilotRecipe.publishedAt) {
    reportError({ type: 'recipe', id: pilotRecipe.id, slug: pilotRecipe.slug, message: 'receita piloto não possui publishedAt' });
  }
}

if (!pilotReview) {
  reportError({ type: 'review', id: -1, slug: PILOT_REVIEW_SLUG, message: 'review piloto não encontrado' });
} else {
  if (!pilotReview.verdict || typeof pilotReview.verdict.stars !== 'number') {
    reportError({ type: 'review', id: pilotReview.id, slug: pilotReview.slug, message: 'review piloto não possui verdict.stars' });
  }
  if (!Array.isArray(pilotReview.pros) || pilotReview.pros.length === 0) {
    reportError({ type: 'review', id: pilotReview.id, slug: pilotReview.slug, message: 'review piloto não possui pros' });
  }
  if (!Array.isArray(pilotReview.cons) || pilotReview.cons.length === 0) {
    reportError({ type: 'review', id: pilotReview.id, slug: pilotReview.slug, message: 'review piloto não possui cons' });
  }
  if (!pilotReview.productSpec || pilotReview.productSpec.length === 0) {
    reportError({ type: 'review', id: pilotReview.id, slug: pilotReview.slug, message: 'review piloto não possui productSpec' });
  }
  if (!pilotReview.cta || !pilotReview.cta.url || !pilotReview.cta.label) {
    reportError({ type: 'review', id: pilotReview.id, slug: pilotReview.slug, message: 'review piloto não possui cta completo' });
  }
  if (!pilotReview.publishedAtISO) {
    reportError({ type: 'review', id: pilotReview.id, slug: pilotReview.slug, message: 'review piloto não possui publishedAtISO' });
  }
  if (!pilotReview.image) {
    reportError({ type: 'review', id: pilotReview.id, slug: pilotReview.slug, message: 'review piloto não possui image' });
  }
}

// ---------------------------------------------------------------------------
// Resumo
// ---------------------------------------------------------------------------

const isVerbose = process.argv.includes('--verbose');

function countWarningsByPrefix(prefix: string): number {
  return warnings.filter((warning) => warning.message.startsWith(prefix)).length;
}

function printWarningSummary(): void {
  const categories = [
    { label: 'receitas sem publishedAt', prefix: 'receita sem publishedAt' },
    { label: 'receitas sem imageAlt', prefix: 'receita sem imageAlt' },
    { label: 'reviews sem publishedAtISO', prefix: 'review sem publishedAtISO' },
    { label: 'reviews produto sem verdict.stars', prefix: 'review de produto sem verdict.stars' },
    { label: 'reviews produto sem productSpec', prefix: 'review de produto sem productSpec' },
    { label: 'reviews produto sem cta completo', prefix: 'review de produto sem cta completo' },
  ];

  console.warn(`⚠️  ${warnings.length} aviso(s) encontrado(s):`);
  for (const category of categories) {
    const count = countWarningsByPrefix(category.prefix);
    if (count > 0) {
      console.warn(`  - ${category.label}: ${count}`);
    }
  }
}

function printWarningDetails(): void {
  for (const warning of warnings) {
    console.warn(`  [${warning.type.toUpperCase()}] id=${warning.id} slug="${warning.slug}" — ${warning.message}`);
  }
}

console.log(`Validados ${recipes.length} receitas e ${reviews.length} reviews.`);

if (warnings.length > 0) {
  printWarningSummary();
  if (isVerbose) {
    console.warn('  Detalhes:');
    printWarningDetails();
  } else {
    console.warn('  Use --verbose para listar todos os warnings.');
  }
}

if (errors.length === 0) {
  console.log('✅ Nenhuma inconsistência encontrada.');
  process.exit(0);
} else {
  console.error(`❌ ${errors.length} erro(s) encontrado(s):`);
  for (const error of errors) {
    console.error(`  [${error.type.toUpperCase()}] id=${error.id} slug="${error.slug}" — ${error.message}`);
  }
  process.exit(1);
}
