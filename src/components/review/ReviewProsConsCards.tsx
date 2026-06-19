'use client';

import { CheckCircle2, XCircle } from 'lucide-react';
import { EditorialReveal } from '@/components/editorial';

export interface ReviewProsConsCardsProps {
  pros: string[];
  cons: string[];
}

export function ReviewProsConsCards({ pros, cons }: ReviewProsConsCardsProps): React.ReactElement | null {
  if (pros.length === 0 && cons.length === 0) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {pros.length > 0 && (
        <div className="rounded-2xl border border-[#1a4d2e]/15 bg-[#eef7f1] p-6 shadow-soft transition-transform duration-200 hover:-translate-y-0.5">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-[#1a4d2e]">
            <CheckCircle2 className="h-5 w-5" />
            Pontos fortes
          </h3>
          <ul className="space-y-3">
            {pros.map((item, index) => (
              <EditorialReveal
                key={`pro-${item}`}
                as="li"
                delay={Math.min(index * 0.06, 0.3)}
                distance={10}
                className="flex items-start gap-2 text-sm leading-relaxed text-[#24313d]"
              >
                <span className="font-bold text-[#1a4d2e]">+</span>
                {item}
              </EditorialReveal>
            ))}
          </ul>
        </div>
      )}

      {cons.length > 0 && (
        <div className="rounded-2xl border border-[#ff6b35]/25 bg-[#fff3ee] p-6 shadow-soft transition-transform duration-200 hover:-translate-y-0.5">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-[#d94b21]">
            <XCircle className="h-5 w-5" />
            Pontos de atenção
          </h3>
          <ul className="space-y-3">
            {cons.map((item, index) => (
              <EditorialReveal
                key={`con-${item}`}
                as="li"
                delay={Math.min(index * 0.06, 0.3)}
                distance={10}
                className="flex items-start gap-2 text-sm leading-relaxed text-[#24313d]"
              >
                <span className="font-bold text-[#ff6b35]">−</span>
                {item}
              </EditorialReveal>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
