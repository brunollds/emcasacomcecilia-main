'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock, ChefHat, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { getRecipeImage, getRecipeImageAlt, recipes } from '@/lib/data';
import { sanitizeViewTransitionName } from '@/lib/viewTransition';
import { ViewTransitionLink } from '@/components/ViewTransitionLink';

type PopularRecipesProps = {
  popularSlugs?: string[];
};

export function PopularRecipes({ popularSlugs = [] }: PopularRecipesProps) {
  // Popularidade real depende de analytics; por enquanto é uma curadoria manual.
  const analyticsPopularRecipes = popularSlugs
    .map((slug) => recipes.find((recipe) => recipe.slug === slug))
    .filter(Boolean);
  const popularRecipes = (analyticsPopularRecipes.length > 0
    ? analyticsPopularRecipes
    : recipes.filter(r => r.isPopular)
  ).slice(0, 4);
  const newRecipes = [...recipes].sort((a, b) => b.id - a.id).slice(0, 4);

  const renderRecipeCard = (recipe, index, isNew = false) => (
    <ViewTransitionLink
      key={recipe.id}
      href={`/receitas/${recipe.slug}`}
      className="group block w-[230px] flex-shrink-0 snap-start animate-slide-up sm:w-[250px] md:w-auto"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <article className="transition-all duration-500 group-hover:-translate-y-2">
        <div
          className="relative mb-4 aspect-[5/6] overflow-hidden rounded-[1.35rem] shadow-soft transition-all duration-500 group-hover:shadow-large md:rounded-[1.6rem] lg:rounded-[2rem]"
          style={{ viewTransitionName: `recipe-hero-${sanitizeViewTransitionName(recipe.slug)}` }}
        >
          <Image
            src={getRecipeImage(recipe)}
            alt={getRecipeImageAlt(recipe)}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

          {/* Badge 'Nova' */}
          {isNew && (
            <div className="absolute left-4 top-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a4d2e] shadow-lg backdrop-blur-md">
                <Sparkles className="h-3 w-3 fill-current" />
                Lançamento
              </span>
            </div>
          )}

          {/* Info no Rodapé da Imagem */}
          <div className="absolute bottom-5 left-5 right-5 flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#ffd700]" />
              {recipe.totalTime}
            </div>
            <div className="h-3 w-px bg-white/30" />
            <div className="flex items-center gap-1.5">
              <ChefHat className="h-3.5 w-3.5 text-[#ff6b35]" />
              {recipe.difficulty}
            </div>
          </div>
        </div>

        {/* Título abaixo da imagem */}
        <div className="px-2">
          <h3 className="font-heading text-lg font-bold leading-tight text-[#0f1419] transition-colors duration-300 group-hover:text-[#1a4d2e] lg:text-xl">
            {recipe.title}
          </h3>
          <div className="mt-2 h-0.5 w-0 bg-[#ff6b35] transition-all duration-500 group-hover:w-12" />
        </div>
      </article>
    </ViewTransitionLink>
  );

  return (
    <section className="bg-white pb-16 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Receitas Populares */}
        <div className="mb-10 md:mb-16">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-[#ff6b35] fill-[#ff6b35]" />
            <span className="text-sm font-semibold text-[#ff6b35] uppercase tracking-wide">
              Mais Amadas
            </span>
          </div>

          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0f1419]">
              Receitas Populares
            </h2>
            <Link
              href="/receitas"
              className="hidden items-center gap-2 rounded-full border border-[#1a4d2e]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#1a4d2e] transition-all hover:border-[#1a4d2e] hover:bg-[#1a4d2e] hover:text-white md:inline-flex"
            >
              Ver todas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:gap-6 [&::-webkit-scrollbar]:hidden">
            {popularRecipes.map((recipe, index) => renderRecipeCard(recipe, index))}
          </div>
        </div>

        {/* Receitas Novas */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#ffd700]" />
            <span className="text-sm font-semibold text-[#ffd700] uppercase tracking-wide">
              Acabou de Chegar
            </span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0f1419] mb-8">
            Receitas Novas
          </h2>

          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:gap-6 [&::-webkit-scrollbar]:hidden">
            {newRecipes.map((recipe, index) => renderRecipeCard(recipe, index, true))}
          </div>
        </div>

        {/* Ver Todas */}
        <div className="mt-10 text-center md:hidden">
          <Link
            href="/receitas"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#1a4d2e] text-[#1a4d2e] rounded-full font-semibold hover:bg-[#1a4d2e] hover:text-white transition-all"
          >
            Ver Todas as Receitas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
