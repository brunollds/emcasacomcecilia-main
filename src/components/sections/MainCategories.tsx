'use client';

import Link from 'next/link';

// 4 categorias principais com foto + texto sobreposto
const mainCategories = [
  { 
    slug: 'doces', 
    nome: 'Doces', 
    emoji: '🍰',
    count: 24,
    // Gradiente como placeholder (substituir por foto depois)
    gradient: 'from-pink-400 to-pink-600',
  },
  { 
    slug: 'salgados', 
    nome: 'Salgados', 
    emoji: '🥐',
    count: 18,
    gradient: 'from-orange-400 to-orange-600',
  },
  { 
    slug: 'massas', 
    nome: 'Massas', 
    emoji: '🍝',
    count: 12,
    gradient: 'from-yellow-400 to-yellow-600',
  },
  { 
    slug: 'carnes', 
    nome: 'Carnes', 
    emoji: '🍖',
    count: 15,
    gradient: 'from-red-400 to-red-600',
  },
];

export function MainCategories() {
  return (
    <section className="py-8 px-6 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mainCategories.map((cat, index) => (
            <Link
              key={cat.slug}
              href={`/receitas?categoria=${cat.slug}`}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card Retangular Vertical - Aspect Ratio 3:4 */}
              <div className={`aspect-[3/4] bg-gradient-to-br ${cat.gradient} relative`}>
                
                {/* Imagem de fundo (placeholder - substituir por foto real depois) */}
                <div className="absolute inset-0 flex items-center justify-center text-7xl md:text-8xl opacity-30 group-hover:scale-110 transition-transform duration-500">
                  {cat.emoji}
                </div>

                {/* Overlay gradiente - mais forte embaixo para leitura */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Texto na PARTE INFERIOR do card */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  {/* Nome da categoria em branco */}
                  <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide mb-1 drop-shadow-lg">
                    {cat.nome}
                  </h3>
                  
                  {/* Contagem de receitas */}
                  <p className="text-white/80 text-xs md:text-sm font-medium">
                    {cat.count} receitas
                  </p>
                </div>

                {/* Efeito hover - overlay mais escuro */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
