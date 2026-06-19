'use client';

import { useState } from 'react';
import type { IngredientSection, StructuredIngredientSection } from '@/lib/content';
import { EditorialReveal, SectionHeadingReveal } from '@/components/editorial';
import { ServingScaleControl, ScaledIngredientText, useServingScaleValue } from './ServingScaleControl';

export interface RecipeIngredientsProps {
  slug: string;
  structuredIngredients?: StructuredIngredientSection[] | null;
  legacyIngredients: IngredientSection[];
  baseServings?: number;
  servingsUnit?: string;
  variant?: 'default' | 'notebook';
  hideServingsControl?: boolean;
  servingsStorageKey?: string;
}

export function RecipeIngredients({
  slug,
  structuredIngredients,
  legacyIngredients,
  baseServings,
  servingsUnit,
  variant = 'default',
  hideServingsControl = false,
  servingsStorageKey,
}: RecipeIngredientsProps): React.ReactElement {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const hasControl = Boolean(
    structuredIngredients && structuredIngredients.length > 0 && baseServings && baseServings > 0
  );
  const displaySections = hasControl ? structuredIngredients! : legacyIngredients;
  const isNotebook = variant === 'notebook';
  const storageKey = servingsStorageKey ?? `serving-scale-${slug}`;
  const currentServings = useServingScaleValue({
    baseServings: baseServings ?? 1,
    storageKey,
  });

  const toggleItem = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <div className={`mb-6 ${isNotebook ? 'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between' : 'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'}`}>
        <SectionHeadingReveal as="h3" underlineColor={isNotebook ? '#ff6b35' : '#ffd700'}>
          Ingredientes
        </SectionHeadingReveal>

        {hasControl && !hideServingsControl && (
          <ServingScaleControl
            baseServings={baseServings!}
            servingsUnit={servingsUnit}
            storageKey={storageKey}
            compact={isNotebook}
          />
        )}
      </div>

      {displaySections.map((section, sectionIndex) => (
        <div key={`${section.section}-${sectionIndex}`} className="mb-8 last:mb-0">
          <h4 className={`mb-4 text-sm font-bold uppercase tracking-wider ${isNotebook ? 'text-[#1a4d2e]' : 'text-[#ff6b35]'}`}>
            {section.section}
          </h4>
          <ul className="space-y-4">
            {section.items.map((item, itemIndex) => {
              const key = `ingredient-${sectionIndex}-${itemIndex}`;
              const isChecked = checkedItems[key];

              if (hasControl) {
                const structured = item as StructuredIngredientSection['items'][number];
                return (
                  <EditorialReveal
                    key={key}
                    as="li"
                    delay={Math.min(itemIndex * 0.05, 0.3)}
                    distance={10}
                    className="group flex items-start gap-3"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleItem(key)}
                      className="mt-1.5 h-4 w-4 rounded border-[#1a4d2e]/30 text-[#1a4d2e] focus:ring-[#1a4d2e]"
                    />
                    <span
                      className={`leading-tight transition-colors ${
                        isNotebook
                          ? 'font-editorial text-[#24313d]'
                          : 'text-gray-700 group-hover:text-black'
                      } ${isChecked ? 'text-[#1a4d2e]/40 line-through' : ''}`}
                    >
                      <ScaledIngredientText
                        qty={structured.qty}
                        unit={structured.unit}
                        name={structured.name}
                        note={structured.note}
                        baseServings={baseServings!}
                        currentServings={currentServings}
                      />
                    </span>
                  </EditorialReveal>
                );
              }

              return (
                <EditorialReveal
                  key={key}
                  as="li"
                  delay={Math.min(itemIndex * 0.05, 0.3)}
                  distance={10}
                  className="group flex items-start gap-3"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleItem(key)}
                    className="mt-1.5 h-4 w-4 rounded border-[#1a4d2e]/30 text-[#1a4d2e] focus:ring-[#1a4d2e]"
                  />
                  <span
                    className={`leading-tight transition-colors ${
                      isNotebook ? 'font-editorial text-[#24313d]' : 'text-gray-700 group-hover:text-black'
                    } ${isChecked ? 'text-[#1a4d2e]/40 line-through' : ''}`}
                  >
                    {item as string}
                  </span>
                </EditorialReveal>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default RecipeIngredients;
