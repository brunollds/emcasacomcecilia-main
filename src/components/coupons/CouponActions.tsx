'use client';

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
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
  | 'bottom_bar'
  | 'review_mobile_dock'
  | 'review_mobile_drawer';

// Nos artigos a marca é o afiliado, que pode faltar, e o slug do artigo vai junto.
type CopyTracking = { placement: CopyPlacement; brand?: string; contentSlug?: string };

function useCopyCode(code: string, { placement, brand, contentSlug }: CopyTracking) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const copy = async (event: MouseEvent<HTMLElement>) => {
    if (!(await copyTextWithFallback(code, event.currentTarget))) return;
    trackEvent('coupon_copy', {
      coupon_code: code,
      ...(brand && { brand }),
      ...(contentSlug && { content_slug: contentSlug }),
      placement,
    });
    setCopied(true);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setCopied(false), 2200);
  };

  return { copied, copy };
}

type CopyCodeButtonProps = CopyTracking & {
  code: string;
  className: string;
  children: ReactNode;
  copiedChildren: ReactNode;
  // Para quando o texto visível não diz a ação (só ícone ou só o código); precisa conter esse texto.
  ariaLabel?: string;
  // O que o leitor de tela anuncia ao copiar; sem ele, a frase em português.
  copiedStatus?: string;
};

// O estado "copiado" sai em data-copied para o estilo trocar via data-[copied=true]:.
export function CopyCodeButton({
  code,
  brand,
  placement,
  contentSlug,
  className,
  children,
  copiedChildren,
  ariaLabel,
  copiedStatus,
}: CopyCodeButtonProps) {
  const { copied, copy } = useCopyCode(code, { placement, brand, contentSlug });

  return (
    <>
      <button type="button" onClick={copy} aria-label={ariaLabel} data-copied={copied} className={className}>
        {copied ? copiedChildren : children}
      </button>
      <span role="status" className="sr-only">
        {copied ? copiedStatus ?? `Código ${code} copiado.` : ''}
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
  copiedStatus: string;
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
  copiedStatus,
}: CopyAndOpenStoreLinkProps) {
  const { copied, copy } = useCopyCode(code, { placement: 'coupon_page', brand });

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    void copy(event);
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
        {copied ? copiedStatus : ''}
      </span>
    </>
  );
}

type CouponDockProps = {
  targetId: string;
  brand: string;
  storeUrl: string;
  storeLabel: string;
  // Vai no rastreio do clique na loja, inclusive quando o dock mostra as faixas.
  trackingCode?: string;
  // Os textos chegam prontos, no idioma da página.
  copyAction?: { code: string; ariaLabel: string; copiedLabel: string; copiedStatus: string };
  // Com faixas (Magalu) o dock leva à tabela em vez de copiar um código.
  tiersAction?: { href: string; label: string };
};

export const dockCodeSize = (code: string) =>
  code.length <= 10 ? 'text-[17px]' : code.length <= 13 ? 'text-[15px]' : 'text-[13px]';

// Aparece só depois que o recorte com o código sai da tela. Fica sticky no fim do <main>,
// então reserva o próprio espaço e nunca cobre o rodapé.
export function CouponDock({
  targetId,
  brand,
  storeUrl,
  storeLabel,
  trackingCode,
  copyAction,
  tiersAction,
}: CouponDockProps) {
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

  const hasSecondaryAction = Boolean(copyAction || tiersAction);

  return (
    <div
      inert={!visible}
      className={`sticky bottom-0 z-40 border-t-2 border-marinho bg-white px-3 pt-2.5 pb-[max(0.875rem,env(safe-area-inset-bottom))] transition-[translate,visibility] duration-200 ease-out motion-reduce:transition-none lg:hidden print:hidden ${
        visible ? 'translate-y-0' : 'invisible translate-y-full'
      }`}
    >
      <div className="mx-auto flex max-w-lg items-center gap-2.5">
        {tiersAction ? (
          <a
            href={tiersAction.href}
            className="flex min-h-12 min-w-0 flex-1 items-center justify-center rounded-[10px] border-2 border-dashed border-marinho bg-amarelo-cupom px-3 text-[15px] font-extrabold text-marinho focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-marinho"
          >
            {tiersAction.label}
          </a>
        ) : copyAction ? (
          <CopyCodeButton
            code={copyAction.code}
            brand={brand}
            placement="bottom_bar"
            ariaLabel={copyAction.ariaLabel}
            copiedStatus={copyAction.copiedStatus}
            className="flex min-h-12 min-w-0 flex-1 items-center justify-between gap-2 rounded-[10px] border-2 border-dashed border-marinho bg-amarelo-cupom px-3 font-codigo font-extrabold text-marinho focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-marinho data-[copied=true]:border-solid data-[copied=true]:border-verde-escuro data-[copied=true]:bg-verde-claro data-[copied=true]:text-verde-escuro"
            copiedChildren={
              <span className="flex flex-1 items-center justify-center gap-2 font-sans text-[15px]">
                <Check aria-hidden="true" className="h-[18px] w-[18px]" />
                {copyAction.copiedLabel}
              </span>
            }
          >
            <Scissors aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
            <span className={`min-w-0 flex-1 break-all text-balance leading-5 ${dockCodeSize(copyAction.code)}`}>{copyAction.code}</span>
            {/* Abaixo de 360px o ícone sai para o código caber em duas linhas; a tesoura já indica a cópia. */}
            <Copy aria-hidden="true" className="h-[18px] w-[18px] shrink-0 max-[360px]:hidden" />
          </CopyCodeButton>
        ) : null}
        <CouponStoreLink
          href={storeUrl}
          couponCode={trackingCode}
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
