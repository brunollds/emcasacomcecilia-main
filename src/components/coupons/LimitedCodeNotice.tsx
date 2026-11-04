import { ArrowDown } from 'lucide-react';
import { CampaignWindow } from '@/components/ui/CampaignWindow';
import { FOCUS_RING } from '@/components/ui/focusRing';
import type { getPendingLimitedCodes } from '@/lib/couponsData';
import type { CouponStoreCopy } from './couponStoreCopy';
import { CompactCopyButton } from './StoreLayout';

type PendingLimitedCode = ReturnType<typeof getPendingLimitedCodes>[number];

const BRASILIA = 'America/Sao_Paulo';

// Os prazos não se cruzam, então no máximo uma caixa fica na tela e o id não se repete.
export const LIMITED_CODE_ID = 'codigo-com-prazo';

function dayAndMonth(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', timeZone: BRASILIA });
}

// O código com prazo, ao lado do código de sempre, só em PT: cada um aparece só dentro do prazo dele.
export function LimitedCodeNotices({
  items,
  brand,
  regularCode,
  regularDiscount,
  copy,
}: {
  items: PendingLimitedCode[];
  brand: string;
  regularCode: string;
  regularDiscount: string;
  copy: CouponStoreCopy;
}) {
  return items.map((item) => (
    <CampaignWindow key={item.startsAt} from={item.startsAt} until={item.endsAt} hiddenInHtml={!item.inHtml}>
      <article
        id={LIMITED_CODE_ID}
        data-limited-code={item.code}
        className="recorte scroll-mt-40 rounded-xl border-2 border-dashed border-marinho p-4 md:p-5"
      >
        <p className="text-xs font-extrabold uppercase leading-4 tracking-[0.08em] text-marinho-suave">
          Por tempo limitado: até {dayAndMonth(item.endsAt)}
        </p>
        <p className="mt-1 font-condensada text-[40px] font-black leading-none font-stretch-extra-condensed">{item.discount}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <code className="font-codigo text-[26px] font-extrabold tracking-[0.06em] break-all text-balance">{item.code}</code>
          <CompactCopyButton
            code={item.code}
            brand={brand}
            ariaLabel={copy.copyCodeAria(item.code)}
            copy={copy}
            placement="coupon_page_promo"
          />
        </div>
        <p className="mt-3 border-t-2 border-marinho/15 pt-3 text-sm font-semibold leading-5 text-pretty">
          No teste de {dayAndMonth(`${item.testedAt}T12:00:00-03:00`)}, o {item.code} {item.testNote}. Use no mesmo
          campo de cupom; o {regularCode} ({regularDiscount}) segue valendo depois do prazo.
        </p>
      </article>
    </CampaignWindow>
  ));
}

// A linha no recorte do topo que leva à caixa, no mesmo prazo: quem copia o código do topo sem rolar a página
// fica sabendo do código com prazo.
export function LimitedCodePointers({ items }: { items: PendingLimitedCode[] }) {
  return items.map((item) => (
    <CampaignWindow key={item.startsAt} from={item.startsAt} until={item.endsAt} hiddenInHtml={!item.inHtml}>
      <a
        href={`#${LIMITED_CODE_ID}`}
        data-limited-code-pointer={item.code}
        className={`mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-amarelo-cupom px-3 py-2 text-center text-[13px] font-extrabold leading-[18px] text-marinho underline-offset-2 hover:underline ${FOCUS_RING}`}
      >
        <span className="min-w-0 text-balance">
          Até {dayAndMonth(item.endsAt)}: <span className="whitespace-nowrap">{item.discount}</span> com o {item.code}
        </span>
        <ArrowDown aria-hidden="true" className="h-4 w-4 shrink-0" />
      </a>
    </CampaignWindow>
  ));
}
