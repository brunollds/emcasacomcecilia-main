'use client';

import React from 'react';
import { Truck, Armchair } from 'lucide-react';

// Bloco "Resposta rápida" — substitui a linha de texto corrido densa
export function ReputacaoMetricas(): React.ReactElement {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border-2 border-marinho bg-white p-4">
          <p className="mb-1 text-[13px] font-sans font-semibold text-marinho-suave">Nota</p>
          <p className="font-sans text-2xl font-bold text-marinho">
            8,0<span className="text-sm font-normal text-marinho-suave">/10</span>
          </p>
        </div>
        <div className="rounded-lg border-2 border-marinho bg-white p-4">
          <p className="mb-1 text-[13px] font-sans font-semibold text-marinho-suave">Respostas</p>
          <p className="font-sans text-2xl font-bold text-marinho">100%</p>
        </div>
        <div className="rounded-lg border-2 border-marinho bg-white p-4">
          <p className="mb-1 text-[13px] font-sans font-semibold text-marinho-suave">Índice de solução</p>
          <p className="font-sans text-2xl font-bold text-marinho">81,7%</p>
        </div>
        <div className="rounded-lg border-2 border-marinho bg-white p-4">
          <p className="mb-1 text-[13px] font-sans font-semibold text-marinho-suave">Tempo de resposta</p>
          <p className="font-sans text-2xl font-bold text-marinho">
            14<span className="text-sm font-normal text-marinho-suave">h</span>
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 rounded-lg border-2 border-marinho bg-white px-4 py-3">
        <span className="rounded-full border-2 border-marinho bg-amarelo-cupom px-3 py-1 text-xs font-semibold text-marinho-suave">
          Ótimo
        </span>
        <span className="text-[13px] font-sans text-marinho-suave">
          <strong className="font-bold text-marinho">324</strong> casos no período · <strong className="font-bold text-marinho">70,9%</strong> voltariam a fazer negócio
        </span>
      </div>
    </div>
  );
}

// Bloco "O que aparece nas reclamações" — dois cards com ícone
export function PadroesReclamacao(): React.ReactElement {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div className="rounded-xl border-2 border-marinho bg-white p-5">
        <div className="mb-2 flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-marinho bg-amarelo-cupom">
            <Truck size={18} className="text-marinho" />
          </div>
          <p className="font-sans text-sm font-semibold text-marinho">Logística de entrega</p>
        </div>
        <p className="font-sans text-[13px] leading-relaxed text-marinho-suave">
          Atrasos e dificuldade de acesso em prédios com elevador pequeno ou escada.
        </p>
      </div>

      <div className="rounded-xl border-2 border-marinho bg-white p-5">
        <div className="mb-2 flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-marinho bg-amarelo-cupom">
            <Armchair size={18} className="text-marinho" />
          </div>
          <p className="font-sans text-sm font-semibold text-marinho">Revestimento em couro</p>
        </div>
        <p className="font-sans text-[13px] leading-relaxed text-marinho-suave">
          Relatos pontuais de odor ou variação de textura em couro bovino original.
        </p>
      </div>
    </div>
  );
}
