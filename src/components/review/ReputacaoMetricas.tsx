'use client';

import React from 'react';
import { Truck, Armchair } from 'lucide-react';

// Bloco "O que aparece nas reclamações": os principais problemas do painel (até 3 anos de reclamações)
export function PadroesReclamacao(): React.ReactElement {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div className="rounded-xl border-2 border-marinho bg-white p-5">
        <div className="mb-2 flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-marinho bg-amarelo-cupom">
            <Truck size={18} className="text-marinho" />
          </div>
          <p className="font-sans text-sm font-semibold text-marinho">Atraso na entrega</p>
        </div>
        <p className="font-sans text-[13px] leading-relaxed text-marinho-suave">
          O problema mais citado: 50,57% das reclamações.
        </p>
      </div>

      <div className="rounded-xl border-2 border-marinho bg-white p-5">
        <div className="mb-2 flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-marinho bg-amarelo-cupom">
            <Armchair size={18} className="text-marinho" />
          </div>
          <p className="font-sans text-sm font-semibold text-marinho">Sofás e estofados</p>
        </div>
        <p className="font-sans text-[13px] leading-relaxed text-marinho-suave">
          O produto mais citado: 26,28% das reclamações.
        </p>
      </div>
    </div>
  );
}
