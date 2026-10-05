'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Check, Copy, ExternalLink, Scissors } from 'lucide-react';
import { CouponStoreLink } from '@/components/CouponComponents';
import { copyTextWithFallback } from '@/lib/clipboardUtils';
import { trackEvent } from '@/lib/analytics';

type CopyPlacement =
  | 'coupon_page'
  | 'coupon_page_tiers'
  | 'coupon_page_others'
  | 'coupon_hub'
  | 'coupon_hub_featured'
  | 'bottom_bar';

function useCopyCode(code: string, brand: string, placement: CopyPlacement) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const copy = async () => {
    if (!(await copyTextWithFallback(code))) return;
    trackEvent('coupon_copy', { coupon_code: code, brand, placement });
    setCopied(true);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setCopied(false), 2200);
  };

  return { copied, copy };
}

type CopyCodeButtonProps = {
  code: string;
  brand: string;
  placement: CopyPlacement;
  className: string;
  children: ReactNode;
  copiedChildren: ReactNode;
  // Para quando o texto visível não diz a ação (só ícone ou só o código); precisa conter esse texto.
  ariaLabel?: string;
};

// O estado "copiado" sai em data-copied para o estilo trocar via data-[copied=true]:.
export function CopyCodeButton({
  code,
  brand,
  placement,
  className,
  children,
  copiedChildren,
  ariaLabel,
}: CopyCodeButtonProps) {
  const { copied, copy } = useCopyCode(code, brand, placement);

  return (
    <>
      <button type="button" onClick={copy} aria-label={ariaLabel} data-copied={copied} className={className}>
        {copied ? copiedChildren : children}
      </button>
      <span role="status" className="sr-only">
        {copied ? `Código ${code} copiado.` : ''}
      </span>
    </>
  );
}

type CopyAndOpenStoreLinkProps = {
  code: string;
  brand: string;
  href: string;
  className: string;
  children: ReactNode;
  copiedChildren: ReactNode;
};

// Copia e deixa o link abrir a loja em outra aba; a escrita na área de transferência começa
// ainda dentro do clique, antes de a aba nova tirar o foco da página.
export function CopyAndOpenStoreLink({
  code,
  brand,
  href,
  className,
  children,
  copiedChildren,
}: CopyAndOpenStoreLinkProps) {
  const { copied, copy } = useCopyCode(code, brand, 'coupon_page');

  const handleClick = () => {
    void copy();
    trackEvent('coupon_store_click', { coupon_code: code, brand, placement: 'coupon_page', url: href });
  };

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="sponsored noopener noreferrer"
        onClick={handleClick}
        data-copied={copied}
        className={className}
      >
        {copied ? copiedChildren : children}
      </a>
      <span role="status" className="sr-only">
        {copied ? `Código ${code} copiado. A loja abriu em outra aba.` : ''}
      </span>
    </>
  );
}

type CouponDockProps = {
  targetId: string;
  brand: string;
  storeUrl: string;
  storeLabel: string;
  code?: string;
  // Com faixas (Magalu) o dock leva à tabela em vez de copiar um código; o código segue no rastreio.
  tiersHref?: string;
};

const dockCodeSize = (code: string) =>
  code.length <= 10 ? 'text-[17px]' : code.length <= 13 ? 'text-[15px]' : 'text-[13px]';

// Aparece só depois que o recorte com o código sai da tela. Fica sticky no fim do <main>,
// então reserva o próprio espaço e nunca cobre o rodapé.
export function CouponDock({ targetId, brand, storeUrl, storeLabel, code, tiersHref }: CouponDockProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const headerHeight = document.querySelector('body > header')?.getBoundingClientRect().height ?? 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting && entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0));
      },
      { rootMargin: `-${Math.round(headerHeight)}px 0px 0px 0px` },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  const hasSecondaryAction = Boolean(code || tiersHref);

  return (
    <div
      inert={!visible}
      className={`sticky bottom-0 z-40 border-t-2 border-marinho bg-white px-3 pt-2.5 pb-[max(0.875rem,env(safe-area-inset-bottom))] transition-[translate,visibility] duration-200 ease-out motion-reduce:transition-none lg:hidden print:hidden ${
        visible ? 'translate-y-0' : 'invisible translate-y-full'
      }`}
    >
      <div className="mx-auto flex max-w-lg items-center gap-2.5">
        {tiersHref ? (
          <a
            href={tiersHref}
            className="flex min-h-12 min-w-0 flex-1 items-center justify-center rounded-[10px] border-2 border-dashed border-marinho bg-amarelo-cupom px-3 text-[15px] font-extrabold text-marinho focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-marinho"
          >
            Escolher faixa
          </a>
        ) : code ? (
          <CopyCodeButton
            code={code}
            brand={brand}
            placement="bottom_bar"
            ariaLabel={`Copiar o código ${code}`}
            className="flex min-h-12 min-w-0 flex-1 items-center justify-between gap-2 rounded-[10px] border-2 border-dashed border-marinho bg-amarelo-cupom px-3 font-codigo font-extrabold text-marinho focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-marinho data-[copied=true]:border-solid data-[copied=true]:border-verde-escuro data-[copied=true]:bg-verde-claro data-[copied=true]:text-verde-escuro"
            copiedChildren={
              <span className="flex flex-1 items-center justify-center gap-2 font-sans text-[15px]">
                <Check aria-hidden="true" className="h-[18px] w-[18px]" />
                Copiado
              </span>
            }
          >
            <Scissors aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
            <span className={`min-w-0 break-all leading-5 ${dockCodeSize(code)}`}>{code}</span>
            <Copy aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
          </CopyCodeButton>
        ) : null}
        <CouponStoreLink
          href={storeUrl}
          couponCode={code}
          brand={brand}
          placement="bottom_bar"
          className={`flex min-h-12 items-center justify-center gap-2 rounded-[10px] border-2 border-marinho bg-laranja px-3.5 text-[15px] font-extrabold text-marinho focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-marinho ${
            hasSecondaryAction ? 'shrink-0' : 'flex-1'
          }`}
        >
          {storeLabel}
          <ExternalLink aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
        </CouponStoreLink>
      </div>
    </div>
  );
}
