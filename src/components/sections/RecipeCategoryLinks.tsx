import Link from 'next/link';
import {
  Cake,
  Carrot,
  ChartPieSlice,
  Coffee,
  CookingPot,
  Cookie,
  Hamburger,
  Pizza,
  SquaresFour,
} from '@phosphor-icons/react/dist/ssr';
import type { Icon } from '@phosphor-icons/react';

const recipeCategories: Array<{
  label: string;
  slug?: string;
  href?: string;
  Icon: Icon;
}> = [
  { label: 'Pudins & Cremes', slug: 'pudins-e-cremes', Icon: ChartPieSlice },
  { label: 'Frango', slug: 'frango', Icon: CookingPot },
  { label: 'Carnes', slug: 'carnes', Icon: Hamburger },
  { label: 'Massas', slug: 'massas', Icon: Pizza },
  { label: 'Saladas', slug: 'saladas', Icon: Carrot },
  { label: 'Doces', slug: 'doces', Icon: Cake },
  { label: 'Salgados', slug: 'salgados', Icon: Cookie },
  { label: 'Bebidas', slug: 'bebidas', Icon: Coffee },
  { label: 'Todas categorias', href: '/categorias', Icon: SquaresFour },
];

export function RecipeCategoryLinks() {
  return (
    <div className="mt-12 border-t border-[#1a4d2e]/10 pt-8">
      <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.16em] text-[#1a4d2e]/65">
        Explore receitas
      </p>

      <nav
        aria-label="Categorias de receitas"
        className="flex flex-nowrap justify-start gap-3 overflow-x-auto pb-2 [scrollbar-width:none] sm:gap-4 lg:justify-center lg:gap-6 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {recipeCategories.map(({ label, slug, href, Icon }) => (
          <Link
            key={label}
            href={href || `/receitas?categoria=${slug}`}
            className="group flex w-[82px] flex-shrink-0 flex-col items-center gap-2 text-center lg:w-[104px]"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1a4d2e]/10 bg-[#fef9f3] text-[#1a4d2e] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#ff6b35]/35 group-hover:text-[#ff6b35] group-hover:shadow-md lg:h-14 lg:w-14">
              <Icon className="h-7 w-7 lg:h-8 lg:w-8" weight="duotone" />
            </span>
            <span className="text-[10px] font-semibold leading-tight text-[#0f1d3a]/65 transition-colors group-hover:text-[#0f1d3a] lg:text-xs">
              {label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
