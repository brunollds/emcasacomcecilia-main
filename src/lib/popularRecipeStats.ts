import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { recipes } from '@/lib/data';

type PopularRecipesFile = {
  generatedAt?: string;
  source?: string;
  slugs?: string[];
};

const popularRecipesPath = path.join(process.cwd(), 'public', 'data', 'popular-recipes.json');

function isPopularRecipesEnabled(): boolean {
  if (process.env.GA_POPULAR_RECIPES_ENABLED !== 'true') {
    return false;
  }

  const activateAfter = process.env.GA_POPULAR_RECIPES_ACTIVATE_AFTER;

  if (!activateAfter) {
    return true;
  }

  const activationDate = new Date(`${activateAfter}T00:00:00.000Z`);

  if (Number.isNaN(activationDate.getTime())) {
    return false;
  }

  return Date.now() >= activationDate.getTime();
}

export async function getPopularRecipeSlugs(): Promise<string[]> {
  if (!isPopularRecipesEnabled()) {
    return [];
  }

  try {
    const raw = await readFile(popularRecipesPath, 'utf8');
    const data = JSON.parse(raw) as PopularRecipesFile;
    const validSlugs = new Set(recipes.map((recipe) => recipe.slug));

    return (data.slugs || []).filter((slug) => validSlugs.has(slug));
  } catch {
    return [];
  }
}
