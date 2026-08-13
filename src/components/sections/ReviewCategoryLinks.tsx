import Link from 'next/link';
import {
  BookOpenText,
  Package,
  ShieldCheck,
  SquaresFour,
  Ticket,
} from '@phosphor-icons/react/dist/ssr';
import type { Icon } from '@phosphor-icons/react';
import { REVIEW_CATEGORIES, type ReviewCategory } from '@/lib/reviewDiscovery';

const icons: Record<ReviewCategory, Icon> = {
  'guias-praticos-utilidade': BookOpenText,
  'produtos-experiencias': Package,
  'cupons-como-usar': Ticket,
  'confianca-reputacao': ShieldCheck,
};

export function ReviewCategoryLinks() {
  return (
    <section className="bg-[#fef9f3] pb-14 pt-2 md:pb-16 md:pt-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-nowrap justify-start gap-4 overflow-x-auto pb-2 [scrollbar-width:none] lg:justify-center lg:gap-8 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
          {REVIEW_CATEGORIES.map(({ value, label }) => {
            const CategoryIcon = icons[value];

            return (
              <Link
                key={value}
                href={`/reviews?categoria=${value}`}
                className="group flex w-[108px] flex-shrink-0 flex-col items-center gap-2 text-center lg:w-[150px]"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#0f1d3a]/10 bg-white text-[#1a4d2e] shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#ff6b35]/30 group-hover:text-[#ff6b35] group-hover:shadow-md lg:h-16 lg:w-16">
                  <CategoryIcon className="h-7 w-7 lg:h-8 lg:w-8" weight="duotone" />
                </span>
                <span className="text-xs font-semibold leading-tight text-[#0f1d3a]/72 transition-colors group-hover:text-[#0f1d3a] lg:text-sm">
                  {label}
                </span>
              </Link>
            );
          })}

          <Link
            href="/reviews"
            className="group flex w-[108px] flex-shrink-0 flex-col items-center gap-2 text-center lg:w-[150px]"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#0f1d3a]/10 bg-white text-[#1a4d2e] shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#ff6b35]/30 group-hover:text-[#ff6b35] group-hover:shadow-md lg:h-16 lg:w-16">
              <SquaresFour className="h-7 w-7 lg:h-8 lg:w-8" weight="duotone" />
            </span>
            <span className="text-xs font-semibold leading-tight text-[#0f1d3a]/72 transition-colors group-hover:text-[#0f1d3a] lg:text-sm">
              Todos os guias
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
