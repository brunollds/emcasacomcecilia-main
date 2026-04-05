'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-16 bg-gradient-to-br from-[#1a4d2e] to-[#0f1419]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#ffd700] mb-4">
          Inscreva-se no Canal!
        </h2>
        
        <p className="text-lg text-white/90 mb-8">
          Não perca nenhuma receita nova! Toda semana tem novidades deliciosas.
        </p>
        
        <Link
          href="https://youtube.com/@emcasacomcecilia"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#ff6b35] hover:bg-[#ff5722] text-white rounded-full font-semibold transition-all hover:scale-105"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          Inscrever no YouTube
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
