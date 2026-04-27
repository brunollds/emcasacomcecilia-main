'use client';

import Link from 'next/link';
import Image from 'next/image';

// 4 categorias principais com foto + texto sobreposto
const mainCategories = [
  { 
    slug: 'air-fryer', 
    nome: 'Air Fryer', 
    image: '/images/recipes/featured/air-fryer.jpg',
    gradient: 'from-purple-900/80 to-indigo-900/40',
  },
  { 
    slug: 'frango', 
    nome: 'Frango', 
    image: '/images/recipes/featured/frango.jpg',
    gradient: 'from-orange-900/80 to-yellow-900/40',
  },
  { 
    slug: 'doces', 
    nome: 'Doces', 
    image: '/images/recipes/featured/doces.jpg',
    gradient: 'from-rose-900/80 to-pink-900/40',
  },
  { 
    slug: 'massas', 
    nome: 'Massas', 
    image: '/images/recipes/featured/massas.jpg',
    gradient: 'from-cyan-900/80 to-blue-900/40',
  },
];

export function MainCategories() {
  return (
    <section className="px-4 pb-6 pt-4 md:px-6 md:pb-8 md:pt-6">
      <div className="mx-auto max-w-[980px] lg:max-w-7xl">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6">
          {mainCategories.map((cat, index) => (
            <Link
              key={cat.slug}
              href={`/receitas?categoria=${cat.slug}`}
              className="group relative block aspect-[3/3.55] overflow-hidden rounded-[1.25rem] bg-[#0f1d3a] shadow-lg transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl lg:aspect-[3/3.5] lg:rounded-[2rem]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Imagem de Fundo Otimizada */}
              <Image
                src={cat.image}
                alt={cat.nome}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />

              {/* Overlays de Design */}
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} opacity-60 mix-blend-multiply transition-opacity group-hover:opacity-40`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

              {/* Conteúdo do Card */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-6">
                <h3 className="font-heading text-xl font-bold leading-tight text-white drop-shadow-md lg:text-3xl">
                  {cat.nome}
                </h3>
                
                {/* Linha decorativa animada */}
                <div className="mt-2 h-0.5 w-0 rounded-full bg-[#ffd700] transition-all duration-500 group-hover:w-12 lg:mt-3 lg:h-1 lg:group-hover:w-16" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
