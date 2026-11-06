'use client';

import React from 'react';
import { Truck, Armchair } from 'lucide-react';

// Números do painel do Reclame Aqui da Damie Móveis (consulta de 06/11/2026, dados de 01/05 a 31/10/2026). Os mesmos
// números estão na lista do artigo damie-reclame-aqui-o-que-os-dados-mostram: ao atualizar um, atualize o outro.
const REPUTACAO = {
  nota: '7,9',
  respondidas: '100%',
  solucao: '83,1%',
  respostaHoras: '15',
  selo: 'Boa',
  periodo: '01/05 a 31/10/2026',
  recebidas: '192',
  voltariam: '70,2%',
};

// Bloco "Os dados atuais": as métricas do painel
export function ReputacaoMetricas(): React.ReactElement {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border-2 border-marinho bg-white p-4">
          <p className="mb-1 text-[13px] font-sans font-semibold text-marinho-suave">Nota</p>
          <p className="font-sans text-2xl font-bold text-marinho">
            {REPUTACAO.nota}
            <span className="text-sm font-normal text-marinho-suave">/10</span>
          </p>
        </div>
        <div className="rounded-lg border-2 border-marinho bg-white p-4">
          <p className="mb-1 text-[13px] font-sans font-semibold text-marinho-suave">Respostas</p>
          <p className="font-sans text-2xl font-bold text-marinho">{REPUTACAO.respondidas}</p>
        </div>
        <div className="rounded-lg border-2 border-marinho bg-white p-4">
          <p className="mb-1 text-[13px] font-sans font-semibold text-marinho-suave">Índice de solução</p>
          <p className="font-sans text-2xl font-bold text-marinho">{REPUTACAO.solucao}</p>
        </div>
        <div className="rounded-lg border-2 border-marinho bg-white p-4">
          <p className="mb-1 text-[13px] font-sans font-semibold text-marinho-suave">Tempo de resposta</p>
          <p className="font-sans text-2xl font-bold text-marinho">
            {REPUTACAO.respostaHoras}
            <span className="text-sm font-normal text-marinho-suave">h</span>
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 rounded-lg border-2 border-marinho bg-white px-4 py-3">
        <span className="rounded-full border-2 border-marinho bg-amarelo-cupom px-3 py-1 text-xs font-semibold text-marinho-suave">
          {REPUTACAO.selo}
        </span>
        <span className="text-[13px] font-sans text-marinho-suave">
          <strong className="font-bold text-marinho">{REPUTACAO.recebidas}</strong> reclamações de {REPUTACAO.periodo} ·{' '}
          <strong className="font-bold text-marinho">{REPUTACAO.voltariam}</strong> voltariam a fazer negócio
        </span>
      </div>
    </div>
  );
}

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
