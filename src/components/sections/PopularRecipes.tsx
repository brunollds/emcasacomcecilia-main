'use client';

import Link from 'next/link';
import { Clock, ChefHat, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { recipes } from '@/lib/data';

export function PopularRecipes() {
  const popularRecipes = recipes.filter(r => r.isPopular);
  const newRecipes = recipes.filter(r => r.isNew);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Receitas Populares */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-[#ff6b35] fill-[#ff6b35]" />
            <span className="text-sm font-semibold text-[#ff6b35] uppercase tracking-wide">
              Mais Amadas
            </span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0f1419] mb-8">
            Receitas Populares
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {popularRecipes.map((recipe, index) => (
              <Link
                key={recipe.id}
                href={`/receitas/${recipe.id}`}
                className="group block animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Imagem - Elemento separado, SEM borda arredondada */}
                <div className="relative overflow-hidden mb-3">
                  <div className="aspect-[5/6] bg-gradient-to-br from-[#ff6b35] to-[#ffd700] relative">
                    {/* Placeholder - substituir por foto real */}
                    <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30 group-hover:scale-110 transition-transform duration-500">
                      🍽️
                    </div>

                    {/* Tempo e Dificuldade - Sobreposto no topo da imagem */}
                    <div className="absolute top-2 left-2 right-2 flex items-center justify-center gap-3">
                      <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
                        <Clock className="w-3 h-3" />
                        {recipe.time}
                      </div>
                      <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
                        <ChefHat className="w-3 h-3" />
                        {recipe.difficulty}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Título - Elemento separado, centralizado, fonte maior */}
                <div className="text-center">
                  <h3 className="font-heading font-semibold text-lg md:text-xl text-[#0f1419] group-hover:text-[#1a4d2e] transition-colors leading-tight">
                    {recipe.title}
                  </h3>
                </div>
              </Link>
            ))}
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {newRecipes.map((recipe, index) => (
              <Link
                key={recipe.id}
                href={`/receitas/${recipe.id}`}
                className="group block animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Imagem - Elemento separado, SEM borda arredondada */}
                <div className="relative overflow-hidden mb-3">
                  <div className="aspect-[5/6] bg-gradient-to-br from-[#1a4d2e] to-[#145a3f] relative">
                    {/* Placeholder - substituir por foto real */}
                    <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30 group-hover:scale-110 transition-transform duration-500">
                      🍽️
                    </div>

                    {/* Badge Nova - Canto superior esquerdo */}
                    <div className="absolute top-2 left-2">
                      <div className="flex items-center gap-1 bg-[#1a4d2e] px-2 py-1 rounded-full text-white text-xs">
                        <Sparkles className="w-3 h-3" />
                        Nova
                      </div>
                    </div>

                    {/* Tempo e Dificuldade - Sobreposto no topo da imagem */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2">
                      <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
                        <Clock className="w-3 h-3" />
                        {recipe.time}
                      </div>
                      <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
                        <ChefHat className="w-3 h-3" />
                        {recipe.difficulty}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Título - Elemento separado, centralizado, fonte maior */}
                <div className="text-center">
                  <h3 className="font-heading font-semibold text-lg md:text-xl text-[#0f1419] group-hover:text-[#1a4d2e] transition-colors leading-tight">
                    {recipe.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Ver Todas */}
        <div className="text-center mt-10">
          <Link
            href="/receitas"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#1a4d2e] text-[#1a4d2e] rounded-full font-semibold hover:bg-[#1a4d2e] hover:text-white transition-all"
          >
            Ver Todas as Receitas
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
