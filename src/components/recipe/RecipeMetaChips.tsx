import { Clock, Users, ChefHat } from 'lucide-react';
import { RichChip, EditorialReveal } from '@/components/editorial';
import type { Recipe } from '@/lib/content';

export interface RecipeMetaChipsProps {
  recipe: Recipe;
}

export function RecipeMetaChips({ recipe }: RecipeMetaChipsProps): React.ReactElement | null {
  const chips = [];

  // Tempo total
  if (recipe.totalTime) {
    chips.push(
      <RichChip key="total-time" icon={<Clock size={14} />} variant="neutral">
        {recipe.totalTime}
      </RichChip>
    );
  }

  // Rendimento (porções)
  if (recipe.servings || recipe.yield) {
    const servingText = recipe.servings
      ? `${recipe.servings}${recipe.servingsUnit ? ` ${recipe.servingsUnit}` : ''}`
      : recipe.yield;
    chips.push(
      <RichChip key="servings" icon={<Users size={14} />} variant="neutral">
        {servingText}
      </RichChip>
    );
  }

  // Dificuldade
  const difficulty = recipe.difficultyLevel ?? recipe.difficulty;
  if (difficulty) {
    chips.push(
      <RichChip key="difficulty" icon={<ChefHat size={14} />} variant="neutral">
        {difficulty}
      </RichChip>
    );
  }

  if (chips.length === 0) {
    return null;
  }

  return (
    <EditorialReveal as="div" delay={0.23} className="mb-6">
      <div className="flex flex-wrap items-center gap-2">
        {chips}
      </div>
    </EditorialReveal>
  );
}
