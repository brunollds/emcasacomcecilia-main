import { Info } from 'lucide-react';
import { CampaignWindow } from '@/components/ui/CampaignWindow';
import type { CodeSeasonNotice as Notice } from '@/lib/codeSeasonNotice';

// A linha do aviso de temporada no fim do recorte do código, nos artigos e nas páginas de loja, só em PT. O
// data-nosnippet fica no invólucro: o snippet do Google não cita o aviso ao lado do percentual do título.
export function CodeSeasonNotice({ notice, className }: { notice: Notice; className: string }) {
  return (
    <div data-nosnippet="" data-code-season-notice="">
      <CampaignWindow from={notice.startsAt} until={notice.endsAt} hiddenInHtml={!notice.inHtml}>
        <p
          className={`flex items-start justify-center gap-2 border-t-2 border-marinho/15 pt-2.5 text-start text-[13px] font-bold leading-[18px] text-marinho ${className}`}
        >
          <Info aria-hidden="true" className="mt-px h-4 w-4 shrink-0" />
          <span className="min-w-0 text-pretty">{notice.text}</span>
        </p>
      </CampaignWindow>
    </div>
  );
}
