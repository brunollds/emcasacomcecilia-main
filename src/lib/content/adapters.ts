// Adaptadores puros — convertem dados legados de src/lib/data.ts para o
// modelo canônico consumido pelos templates e schemas futuros.

import type { Recipe as LegacyRecipe, Review as LegacyReview } from '@/lib/data';
import type {
  InstructionSection,
  Recipe,
  RecipeViewModel,
  Review,
  ReviewKind,
  ReviewViewModel,
  StructuredIngredientSection,
} from './types';
import {
  contentSectionsToPlainText,
  flattenLegacyIngredients,
  flattenInstructionGroups,
  flattenStructuredIngredients,
  minutesToIsoDuration,
  resolveTotalMinutes,
} from './serializers';

/**
 * Inferência provisória de reviewKind — NÃO persiste em data.ts.
 * Regras:
 *   - campo explícito reviewKind tem prioridade;
 *   - presença de rating → 'produto';
 *   - type contendo "guia" ou "cupom" → 'guia';
 *   - demais → 'editorial'.
 */
export function inferReviewKind(review: Review): ReviewKind {
  if (review.reviewKind) return review.reviewKind;
  if (review.rating !== undefined && review.rating !== null) return 'produto';
  const typeLower = review.type?.toLowerCase() || '';
  if (typeLower.includes('guia') || typeLower.includes('cupom')) return 'guia';
  return 'editorial';
}

/**
 * Cria um grupo de instrução padrão a partir da lista plana legada.
 */
export function fallbackInstructionGroups(
  instructions: string[]
): InstructionSection[] {
  if (!instructions || instructions.length === 0) return [];
  return [{ section: 'Modo de preparo', steps: instructions }];
}

/**
 * Normaliza uma receita legada para o modelo canônico + view model.
 * Não altera o objeto original.
 */
export function normalizeRecipe(recipe: LegacyRecipe): RecipeViewModel {
  const canonical: Recipe = recipe;

  const totalMinutes = resolveTotalMinutes(canonical);
  const displayIngredients: StructuredIngredientSection[] | null =
    canonical.structuredIngredients && canonical.structuredIngredients.length > 0
      ? canonical.structuredIngredients
      : null;

  const displayInstructions: InstructionSection[] =
    canonical.instructionGroups && canonical.instructionGroups.length > 0
      ? canonical.instructionGroups
      : fallbackInstructionGroups(canonical.instructions);

  const schemaIngredients = displayIngredients
    ? flattenStructuredIngredients(displayIngredients)
    : flattenLegacyIngredients(canonical.ingredients);

  const schemaInstructions = displayInstructions.length
    ? flattenInstructionGroups(displayInstructions)
    : canonical.instructions;

  const schemaIsoDuration = minutesToIsoDuration(totalMinutes);

  const authors = canonical.authors && canonical.authors.length > 0
    ? canonical.authors
    : canonical.author
      ? [canonical.author]
      : [];

  return {
    recipe: canonical,
    totalMinutes,
    displayIngredients,
    displayInstructions,
    hasServingsControl: Boolean(displayIngredients && canonical.servings && canonical.servings > 0),
    schemaIngredients,
    schemaInstructions,
    schemaIsoDuration,
    authors,
  };
}

/**
 * Normaliza um review legado para o modelo canônico + view model.
 * Não altera o objeto original.
 */
export function normalizeReview(review: LegacyReview): ReviewViewModel {
  const canonical: Review = review;
  const kind = inferReviewKind(canonical);

  const safeContentSections = canonical.contentSections || [];
  const plainTextBody = contentSectionsToPlainText(safeContentSections);

  const hasVerdict = Boolean(
    canonical.verdict &&
      canonical.pros &&
      canonical.cons &&
      canonical.productSpec
  );

  const authors = canonical.authors && canonical.authors.length > 0
    ? canonical.authors
    : canonical.author
      ? [canonical.author]
      : [];

  return {
    review: canonical,
    kind,
    plainTextBody,
    hasVerdict,
    hasCta: Boolean(canonical.cta),
    hasPullQuote: Boolean(canonical.pullQuote),
    authors,
  };
}
