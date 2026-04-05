'use client';

import Link from 'next/link';
import { ChefHat, ArrowRight, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Texto */}
          <div className="space-y-6 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a4d2e]/10 text-[#1a4d2e] text-sm font-semibold">
              <ChefHat className="w-4 h-4" />
              <span>Bem-vindo ao meu cantinho!</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f1419] leading-tight">
              Receitas <span className="text-[#1a4d2e]">práticas</span> e{' '}
              <span className="text-[#ff6b35]">deliciosas</span> para o seu dia a dia
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed">
              Olá! Sou a Cecília e aqui você encontra receitas que eu testo e aprovo na minha cozinha.
              Sem enrolação, direto ao ponto, com ingredientes acessíveis e resultado garantido!
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                className="bg-[#1a4d2e] hover:bg-[#145a3f] text-white px-6 py-5 text-sm font-semibold rounded-full"
              >
                <Link href="/receitas">
                  Ver Receitas
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                className="border-2 border-[#ff6b35] text-[#ff6b35] hover:bg-[#ff6b35] hover:text-white px-6 py-5 text-sm font-semibold rounded-full"
              >
                <Link href="https://youtube.com/@emcasacomcecilia" target="_blank" rel="noopener noreferrer">
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Ver Canal
                </Link>
              </Button>
            </div>

            {/* Stats rápidos */}
            <div className="flex gap-6 pt-4">
              <div className="text-center">
                <div className="font-heading text-2xl font-bold text-[#1a4d2e]">50+</div>
                <div className="text-xs text-gray-500">Receitas</div>
              </div>
              <div className="w-px bg-gray-200" />
              <div className="text-center">
                <div className="font-heading text-2xl font-bold text-[#ff6b35]">11.3K</div>
                <div className="text-xs text-gray-500">YouTube</div>
              </div>
              <div className="w-px bg-gray-200" />
              <div className="text-center">
                <div className="font-heading text-2xl font-bold text-[#ffd700]">445K</div>
                <div className="text-xs text-gray-500">Instagram</div>
              </div>
            </div>
          </div>

          {/* Imagem Hero - Placeholder com gradiente */}
          <div className="relative animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative rounded-3xl overflow-hidden shadow-large aspect-square lg:aspect-[4/3] bg-gradient-to-br from-[#1a4d2e] via-[#145a3f] to-[#0f1419]">
              {/* Placeholder visual */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">👩‍🍳</div>
                  <div className="text-white/80 text-lg font-semibold">Em Casa com Cecília</div>
                  <div className="text-white/60 text-sm">Receitas que dão certo</div>
                </div>
              </div>
              
              {/* Decorative circles */}
              <div className="absolute top-8 right-8 w-20 h-20 bg-white/10 rounded-full blur-xl" />
              <div className="absolute bottom-12 left-8 w-16 h-16 bg-[#ff6b35]/20 rounded-full blur-lg" />
              <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-[#ffd700]/20 rounded-full blur-lg" />
              
              {/* Floating Cards */}
              <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                <div className="bg-white/95 backdrop-blur rounded-xl px-4 py-3 shadow-lg flex-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-sm font-semibold text-[#0f1419]">Mais Popular</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Bolo de Cenoura</p>
                </div>
                <div className="bg-white/95 backdrop-blur rounded-xl px-4 py-3 shadow-lg flex-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm font-semibold text-[#0f1419]">Nova</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Torta de Limão</p>
                </div>
              </div>
            </div>

            {/* Elementos decorativos */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#ffd700]/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#ff6b35]/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
