'use client';

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
} from '@phosphor-icons/react';

const categories = [
  { id: '1', nome: 'Pudim', slug: 'pudim', Icon: ChartPieSlice },
  { id: '2', nome: 'Frango', slug: 'frango', Icon: CookingPot },
  { id: '3', nome: 'Carnes', slug: 'carnes', Icon: Hamburger },
  { id: '4', nome: 'Massas', slug: 'massas', Icon: Pizza },
  { id: '5', nome: 'Saladas', slug: 'saladas', Icon: Carrot },
  { id: '6', nome: 'Doces', slug: 'doces', Icon: Cake },
  { id: '7', nome: 'Salgados', slug: 'salgados', Icon: Cookie },
  { id: '8', nome: 'Bebidas', slug: 'bebidas', Icon: Coffee },
  { id: '9', nome: 'Todas categorias', slug: 'categorias', Icon: SquaresFour, href: '/categorias' },
];

export function Categories() {
  return (
    <section className="overflow-visible pb-8 pt-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-nowrap justify-start gap-3 overflow-x-auto overflow-y-visible pb-2 [scrollbar-width:none] sm:gap-4 lg:justify-center lg:gap-5 lg:overflow-visible xl:gap-7 [&::-webkit-scrollbar]:hidden">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={category.href || `/receitas?categoria=${category.slug}`}
              className="group relative z-0 flex w-[74px] flex-shrink-0 flex-col items-center gap-1.5 animate-slide-up hover:z-10 sm:w-[82px] lg:w-[88px] xl:w-auto"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex h-12 w-14 items-center justify-center text-white/55 transition-all duration-300 will-change-transform group-hover:translate-y-0.5 group-hover:scale-105 group-hover:text-[#ff6b35] sm:h-13 sm:w-14 lg:h-16 lg:w-20 xl:h-[4.75rem] xl:w-24">
                <category.Icon
                  className="h-8 w-8 sm:h-9 sm:w-9 lg:h-11 lg:w-11 xl:h-14 xl:w-14"
                  weight="fill"
                />
              </div>
              
              <span className="max-w-[74px] text-center text-[9px] font-semibold uppercase leading-tight tracking-[0.06em] text-white/62 transition-colors group-hover:text-white sm:max-w-[82px] sm:text-[10px] lg:max-w-[88px] lg:text-[10.5px] lg:tracking-[0.12em] xl:max-w-none xl:text-xs xl:tracking-[0.16em]">
                {category.nome}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
