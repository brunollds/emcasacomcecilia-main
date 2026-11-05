'use client';

import { Check, Copy } from 'lucide-react';
import { CopyCodeButton, type CopyPlacement } from '@/components/coupons/CouponActions';
import { CampaignWindow } from '@/components/ui/CampaignWindow';
import { FOCUS_RING } from '@/components/ui/focusRing';
import type { ArticleLimitedCode } from '@/lib/articleStore';
import { getCouponCopyLabels, type CouponCopyLocale } from '../couponCopyLocale';
import { getSidebarCopy } from '../sidebarCopy';

// A faixa do código com prazo da loja (o CECIEMCASA15 da I Wanna Sleep), no fim dos recortes e no card da gaveta:
// copia o código ali mesmo. Ela só monta no navegador e dentro do prazo, então o HTML leva só o invólucro, vazio. O
// data-nosnippet fica no invólucro porque o Google renderiza o JavaScript: sem ele, o snippet poderia citar um código
// que vence antes de o Google voltar à página.
export function ArticleLimitedCodeLines({
  items,
  locale,
  brand,
  reviewSlug,
  placement,
  className,
}: {
  items: ArticleLimitedCode[];
  locale: CouponCopyLocale;
  brand?: string;
  reviewSlug: string;
  placement: CopyPlacement;
  className: string;
}) {
  const labels = getCouponCopyLabels(locale);
  const { copiedStatus } = getSidebarCopy(locale);

  return (
    <div data-nosnippet="" data-limited-code-lines="">
      {items.map((item) => (
        <CampaignWindow key={item.startsAt} from={item.startsAt} until={item.endsAt} hiddenInHtml>
          <div data-limited-code-line={item.code} className={className}>
            <CopyCodeButton
              code={item.code}
              brand={brand}
              contentSlug={reviewSlug}
              placement={placement}
              copiedStatus={copiedStatus(item.code)}
              className={`flex min-h-11 w-full items-center justify-center gap-2.5 rounded-lg bg-amarelo-cupom px-3 py-2 text-[13px] font-extrabold leading-[18px] text-marinho ${FOCUS_RING} data-[copied=true]:bg-verde-escuro data-[copied=true]:text-white`}
              copiedChildren={
                <>
                  <span className="min-w-0 text-balance">{item.label}</span>
                  <span className="flex shrink-0 items-center gap-1">
                    <Check aria-hidden="true" className="h-4 w-4" />
                    {labels.copied}
                  </span>
                </>
              }
            >
              <span className="min-w-0 text-balance">{item.label}</span>
              <span className="flex shrink-0 items-center gap-1">
                <Copy aria-hidden="true" className="h-4 w-4" />
                {labels.copy}
              </span>
            </CopyCodeButton>
          </div>
        </CampaignWindow>
      ))}
    </div>
  );
}
