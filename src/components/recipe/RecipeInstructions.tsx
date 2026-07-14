'use client';

import type { InstructionSection } from '@/lib/content';
import { EditorialReveal, SectionHeadingReveal } from '@/components/editorial';

export interface RecipeInstructionsProps {
  instructionGroups: InstructionSection[];
  baseSlug: string;
  variant?: 'default' | 'notebook';
  headingButton?: React.ReactNode;
}

interface StepWithNumber {
  text: string;
  number: number;
}

interface GroupWithStepNumbers {
  section: string;
  steps: StepWithNumber[];
}

export function RecipeInstructions({
  instructionGroups,
  baseSlug,
  variant = 'default',
  headingButton,
}: RecipeInstructionsProps): React.ReactElement {
  // Calcula números de passo globalmente sem mutação durante o render.
  const groupsWithStepNumbers = instructionGroups.reduce<{
    counter: number;
    groups: GroupWithStepNumbers[];
  }>(
    (acc, group) => {
      const steps = group.steps.map((step) => {
        acc.counter += 1;
        return { text: step, number: acc.counter };
      });
      acc.groups.push({ section: group.section, steps });
      return acc;
    },
    { counter: 0, groups: [] }
  ).groups;

  const isNotebook = variant === 'notebook';

  return (
    <div>
      <div className="mb-6 flex items-center gap-2">
        <SectionHeadingReveal
          as="h3"
          underlineColor={isNotebook ? '#ff6b35' : '#ffd700'}
        >
          Modo de Preparo
        </SectionHeadingReveal>
        {headingButton}
      </div>

      <div className="space-y-10">
        {groupsWithStepNumbers.map((group, groupIndex) => (
          <div key={`${baseSlug}-group-${groupIndex}`}>
            {instructionGroups.length > 1 && (
              <h4 className={`mb-4 text-sm font-bold uppercase tracking-wider ${isNotebook ? 'text-[#1a4d2e]' : 'text-[#ff6b35]'}`}>
                {group.section}
              </h4>
            )}

            <ol className="space-y-8">
              {group.steps.map((step) => {
                const delay = Math.min((step.number - 1) * 0.05, 0.35);

                return (
                  <EditorialReveal
                    key={`${baseSlug}-step-${step.number}`}
                    as="li"
                    id={`step-${step.number}`}
                    delay={delay}
                    className="relative pl-12"
                  >
                    <span
                      className={`absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full ${
                        isNotebook
                          ? 'bg-[#ff6b35]/10 font-handwritten text-xl text-[#ff6b35]'
                          : 'bg-[#f5f5f5] text-sm font-bold text-[#1a4d2e]'
                      }`}
                    >
                      {step.number}
                    </span>
                    <p
                      className={`pt-1 leading-relaxed ${
                        isNotebook ? 'font-editorial text-lg text-[#24313d]' : 'text-gray-700'
                      }`}
                    >
                      {step.text}
                    </p>
                  </EditorialReveal>
                );
              })}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeInstructions;
