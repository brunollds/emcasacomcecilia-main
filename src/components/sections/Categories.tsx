'use client';

import Link from 'next/link';

// Todas as categorias com ícones
const categories = [
  { id: '1', nome: 'Doces', slug: 'doces', emoji: '🍰' },
  { id: '2', nome: 'Salgados', slug: 'salgados', emoji: '🥐' },
  { id: '3', nome: 'Massas', slug: 'massas', emoji: '🍝' },
  { id: '4', nome: 'Carnes', slug: 'carnes', emoji: '🍖' },
  { id: '5', nome: 'Bebidas', slug: 'bebidas', emoji: '🥤' },
  { id: '6', nome: 'Air Fryer', slug: 'air-fryer', emoji: '🍟' },
  { id: '7', nome: 'Sopas', slug: 'sopas', emoji: '🍲' },
  { id: '8', nome: 'Lanches', slug: 'lanches', emoji: '🥪' },
];

export function Categories() {
  return (
    <section className="py-10 bg-[#fef9f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Categorias em linha horizontal - Ícones minimalistas em cinza */}
        <div className="flex flex-nowrap justify-center gap-3 md:gap-6 overflow-x-auto pb-2">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/receitas?categoria=${category.slug}`}
              className="group flex flex-col items-center gap-1 md:gap-2 flex-shrink-0 animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Ícone minimalista em cinza */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl transition-all duration-300 group-hover:scale-110"
                style={{ 
                  background: '#f5f5f5',
                  color: '#666666'
                }}
              >
                {category.emoji}
              </div>
              
              {/* Nome da categoria em cinza */}
              <span className="text-xs md:text-sm font-medium text-[#666666] text-center group-hover:text-[#333333] transition-colors whitespace-nowrap">
                {category.nome}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
