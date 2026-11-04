import { CampaignWindow } from '@/components/review/article/CampaignWindow';
import type { getPendingLimitedCodes } from '@/lib/couponsData';
import type { CouponStoreCopy } from './couponStoreCopy';
import { CompactCopyButton } from './StoreLayout';

type PendingLimitedCode = ReturnType<typeof getPendingLimitedCodes>[number];

const BRASILIA = 'America/Sao_Paulo';

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
      <article data-limited-code={item.code} className="recorte rounded-xl border-2 border-dashed border-marinho p-4 md:p-5">
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
          campo de cupom; o {regularCode}, de {regularDiscount}, segue valendo depois do prazo.
        </p>
      </article>
    </CampaignWindow>
  ));
}
