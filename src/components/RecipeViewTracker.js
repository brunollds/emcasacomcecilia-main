"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { getRecipePrimaryCategory } from "@/lib/data";

export default function RecipeViewTracker({ recipe }) {
  useEffect(() => {
    if (!recipe) {
      return;
    }

    trackEvent("view_recipe", {
      recipe_slug: recipe.slug,
      recipe_title: recipe.title,
      recipe_category: getRecipePrimaryCategory(recipe),
    });
  }, [recipe]);

  return null;
}
