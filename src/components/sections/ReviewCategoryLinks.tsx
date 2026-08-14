'use client';

import {
  BookOpenText,
  Package,
  ShieldCheck,
  SquaresFour,
  Ticket,
} from '@phosphor-icons/react/dist/ssr';
import type { Icon } from '@phosphor-icons/react';
import {
  getHomeCategoryFilterParameters,
  TrackedHomeLink,
} from '@/components/TrackedHomeLink';
import { trackEvent } from '@/lib/analytics';
import { REVIEW_CATEGORIES, type ReviewCategory } from '@/lib/reviewDiscovery';

const icons: Record<ReviewCategory, Icon> = {
  'guias-praticos-utilidade': BookOpenText,
  'produtos-experiencias': Package,
  'cupons-como-usar': Ticket,
  'confianca-reputacao': ShieldCheck,
};

export function ReviewCategoryLinks({
  activeCategory,
  onSelect,
}: {
  activeCategory: ReviewCategory | null;
  onSelect: (category: ReviewCategory) => void;
}) {
  return (
    <section className="bg-[#0f1d3a] pb-12 pt-2 md:pb-14 md:pt-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-nowrap justify-start gap-4 overflow-x-auto pb-2 [scrollbar-width:none] lg:justify-center lg:gap-8 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
          {REVIEW_CATEGORIES.map(({ value, label }) => {
            const CategoryIcon = icons[value];

            return (
              <button
                type="button"
                key={value}
                onMouseEnter={() => onSelect(value)}
                onFocus={() => onSelect(value)}
                onClick={() => {
                  onSelect(value);
                  trackEvent(
                    'home_category_filter',
                    getHomeCategoryFilterParameters(value, label)
                  );
                }}
                aria-pressed={activeCategory === value}
                aria-controls="home-review-carousel"
                className="group flex w-[108px] flex-shrink-0 flex-col items-center gap-2 text-center lg:w-[150px]"
              >
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-full border bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#ff6b35]/70 group-hover:text-[#ff6b35] group-hover:shadow-md lg:h-16 lg:w-16 ${
                    activeCategory === value
                      ? 'border-[#ffd700] text-[#ff6b35] ring-4 ring-[#ffd700]/20'
                      : 'border-white/20 text-[#1a4d2e]'
                  }`}
                >
                  <CategoryIcon className="h-7 w-7 lg:h-8 lg:w-8" weight="duotone" />
                </span>
                <span
                  className={`text-xs font-semibold leading-tight transition-colors group-hover:text-white lg:text-sm ${
                    activeCategory === value ? 'text-white' : 'text-white/72'
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}

          <TrackedHomeLink
            href="/reviews"
            placement="home_review_categories"
            linkLabel="Todos os guias"
            className="group flex w-[108px] flex-shrink-0 flex-col items-center gap-2 text-center lg:w-[150px]"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white text-[#1a4d2e] shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#ff6b35]/70 group-hover:text-[#ff6b35] group-hover:shadow-md lg:h-16 lg:w-16">
              <SquaresFour className="h-7 w-7 lg:h-8 lg:w-8" weight="duotone" />
            </span>
            <span className="text-xs font-semibold leading-tight text-white/72 transition-colors group-hover:text-white lg:text-sm">
              Todos os guias
            </span>
          </TrackedHomeLink>
        </div>
      </div>
    </section>
  );
}
