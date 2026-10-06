"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export default function RecipeViewTracker({ slug, title, category }) {
  useEffect(() => {
    if (!slug) {
      return;
    }

    trackEvent("view_recipe", {
      recipe_slug: slug,
      recipe_title: title,
      recipe_category: category,
    });
  }, [slug, title, category]);

  return null;
}
