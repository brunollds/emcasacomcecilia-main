'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Links do carrossel
const links = [
  {
    id: 'dicas',
    title: 'Dicas & Ofertas',
    description: 'Promoções, cupons e ofertas imperdíveis',
    url: 'https://dicas.emcasacomcecilia.com',
    gradient: 'from-green-500 to-emerald-600',
    badge: 'Novo',
    icon: '🏷️',
  },
  {
    id: 'damie',
    title: 'DAMIE - Cupom CECILIA12',
    description: 'Economize com o cupom exclusivo CECILIA12',
    url: 'https://damie.emcasacomcecilia.com',
    gradient: 'from-purple-500 to-pink-600',
    badge: '12% OFF',
    icon: '💳',
  },
];

export function MyLinks() {
  return (
    <section className="py-12 px-6 bg-[#fef9f3]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0f1419] mb-2">
            Meus Links
          </h2>
          <p className="text-gray-600 text-sm">
            Sites e ofertas especiais para você
          </p>
        </div>

        {/* Carrossel - Largura total */}
        <div className="flex overflow-x-auto gap-4 pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:justify-center">
          {links.map((link, index) => (
            <Link
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex-shrink-0 w-[280px] md:w-[320px] animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card com gradiente */}
              <div className={`relative h-[180px] md:h-[200px] rounded-2xl bg-gradient-to-br ${link.gradient} overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow`}>
                {/* Conteúdo */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  {/* Topo: Ícone + Badge */}
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl">
                      {link.icon}
                    </div>
                    {link.badge && (
                      <span className="px-3 py-1 bg-white text-[#1a4d2e] text-xs font-bold rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </div>

                  {/* Texto */}
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                      {link.title}
                    </h3>
                    <p className="text-sm text-white/90 mb-3">
                      {link.description}
                    </p>
                    
                    {/* CTA */}
                    <div className="flex items-center gap-2 text-white text-sm font-semibold">
                      <span>Acessar</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Elemento decorativo */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              </div>
            </Link>
          ))}
        </div>

        {/* Scroll hint para mobile */}
        <div className="text-center mt-4 md:hidden">
          <p className="text-xs text-gray-500">
            ← Deslize para ver mais →
          </p>
        </div>
      </div>
    </section>
  );
}
