'use client';

import Link from 'next/link';
import { ExternalLink, Tag, TrendingUp } from 'lucide-react';
import { offers, formatPrice } from '@/lib/data';

export function Offers() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-[#ff6b35]" />
              <span className="text-sm font-semibold text-[#ff6b35] uppercase tracking-wide">
                Economize
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0f1419]">
              Ofertas em Destaque
            </h2>
          </div>
          
          <Link
            href="https://dicas.emcasacomcecilia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ff6b35] font-semibold hover:underline flex items-center gap-1 text-sm"
          >
            Ver Todas as Ofertas
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {offers.map((offer, index) => (
            <Link
              key={offer.id}
              href={offer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Imagem - Elemento separado */}
              <div className="relative overflow-hidden mb-3">
                <div className="aspect-[5/6] bg-gradient-to-br from-gray-200 to-gray-300 relative">
                  {/* Placeholder - substituir por foto do produto */}
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30 group-hover:scale-110 transition-transform duration-500">
                    🛍️
                  </div>

                  {/* Badge de desconto */}
                  <div className="absolute top-2 right-2">
                    <div className="bg-[#ff6b35] text-white px-2 py-1 rounded-full text-xs font-bold">
                      -{offer.discount}% OFF
                    </div>
                  </div>

                  {/* Badge Cupom */}
                  {offer.coupon && (
                    <div className="absolute top-2 left-2">
                      <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
                        <Tag className="w-3 h-3" />
                        Cupom
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Conteúdo - Separado */}
              <div className="text-center">
                {/* Loja */}
                <p className="text-xs text-gray-500 mb-1">{offer.store}</p>
                
                {/* Título */}
                <h3 className="font-heading font-semibold text-lg text-[#0f1419] group-hover:text-[#1a4d2e] transition-colors leading-tight mb-2">
                  {offer.title}
                </h3>

                {/* Preço */}
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg font-bold text-[#1a4d2e]">
                    {formatPrice(offer.discountPrice)}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    {formatPrice(offer.originalPrice)}
                  </span>
                </div>

                {/* Cupom */}
                {offer.coupon && (
                  <div className="mt-2 inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-mono text-[#ff6b35] font-semibold">
                    {offer.coupon}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Final */}
        <div className="text-center mt-10">
          <p className="text-gray-600 mb-4">
            Quer ver mais ofertas e cupons exclusivos?
          </p>
          <Link
            href="https://dicas.emcasacomcecilia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#ff6b35] hover:bg-[#ff5722] text-white rounded-full font-semibold transition-all"
          >
            Acessar Dicas & Ofertas
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
