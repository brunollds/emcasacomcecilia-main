'use client';

import React from 'react';
import { Truck, Armchair } from 'lucide-react';

// Bloco "Resposta rápida" — substitui a linha de texto corrido densa
export function ReputacaoMetricas(): React.ReactElement {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg bg-[#f1f1ee] p-4 shadow-sm border border-[#0f1419]/5">
          <p className="mb-1 text-[13px] font-sans font-semibold text-[#0f1419]/60">Nota</p>
          <p className="font-sans text-2xl font-bold text-[#0f1419]">
            8,0<span className="text-sm font-normal text-[#0f1419]/45">/10</span>
          </p>
        </div>
        <div className="rounded-lg bg-[#f1f1ee] p-4 shadow-sm border border-[#0f1419]/5">
          <p className="mb-1 text-[13px] font-sans font-semibold text-[#0f1419]/60">Respostas</p>
          <p className="font-sans text-2xl font-bold text-[#0f1419]">100%</p>
        </div>
        <div className="rounded-lg bg-[#f1f1ee] p-4 shadow-sm border border-[#0f1419]/5">
          <p className="mb-1 text-[13px] font-sans font-semibold text-[#0f1419]/60">Índice de solução</p>
          <p className="font-sans text-2xl font-bold text-[#0f1419]">81,7%</p>
        </div>
        <div className="rounded-lg bg-[#f1f1ee] p-4 shadow-sm border border-[#0f1419]/5">
          <p className="mb-1 text-[13px] font-sans font-semibold text-[#0f1419]/60">Tempo de resposta</p>
          <p className="font-sans text-2xl font-bold text-[#0f1419]">
            14<span className="text-sm font-normal text-[#0f1419]/45">h</span>
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 rounded-lg bg-[#f1f1ee] px-4 py-3 border border-[#0f1419]/5">
        <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-[#0f1419]/70 animate-pulse-respiro">
          Ótimo
        </span>
        <span className="text-[13px] font-sans text-[#0f1419]/60">
          <strong className="font-bold text-[#1a4d2e] animate-pulse-respiro">324</strong> casos no período · <strong className="font-bold text-[#1a4d2e] animate-pulse-respiro">70,9%</strong> voltariam a fazer negócio
        </span>
      </div>
    </div>
  );
}

// Bloco "O que aparece nas reclamações" — dois cards com ícone
export function PadroesReclamacao(): React.ReactElement {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
        <div className="mb-2 flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f1f1ee]">
            <Truck size={18} className="text-[#0f1419]/60" />
          </div>
          <p className="font-sans text-sm font-semibold text-[#0f1419]">Logística de entrega</p>
        </div>
        <p className="font-sans text-[13px] leading-relaxed text-[#0f1419]/70">
          Atrasos e dificuldade de acesso em prédios com elevador pequeno ou escada.
        </p>
      </div>

      <div className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
        <div className="mb-2 flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f1f1ee]">
            <Armchair size={18} className="text-[#0f1419]/60" />
          </div>
          <p className="font-sans text-sm font-semibold text-[#0f1419]">Revestimento em couro</p>
        </div>
        <p className="font-sans text-[13px] leading-relaxed text-[#0f1419]/70">
          Relatos pontuais de odor ou variação de textura em couro bovino original.
        </p>
      </div>
    </div>
  );
}
