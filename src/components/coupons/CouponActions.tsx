'use client';

import { useEffect, useId, useRef, useState, useSyncExternalStore, type CSSProperties, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Check, Copy, ExternalLink, Scissors, X } from 'lucide-react';
import { CouponStoreLink } from '@/components/CouponComponents';
import { copyTextWithFallback } from '@/lib/clipboardUtils';
import { trackEvent } from '@/lib/analytics';

export type CopyPlacement =
  | 'coupon_page'
  | 'coupon_page_tiers'
  // Cupons da própria loja num cartão abaixo do recorte, como os da YesStyle.
  | 'coupon_page_promo'
  | 'coupon_page_others'
  | 'coupon_hub'
  | 'coupon_hub_featured'
  | 'bottom_bar'
  | 'review_sidebar'
  // Recorte do topo do artigo e bloco da loja no fim dele.
  | 'review_top'
  | 'review_end'
  // Código da loja citado no texto do artigo.
  | 'review_inline'
  | 'review_mobile_dock'
  | 'review_mobile_drawer'
  // Recorte do código na vitrine da home.
  | 'home_store_banner';

// Nos artigos a marca é o afiliado, que pode faltar, e o slug do artigo vai junto.
type CopyTracking = { placement: CopyPlacement; brand?: string; contentSlug?: string };

function useCopyCode(code: string, { placement, brand, contentSlug }: CopyTracking, onCopied?: () => void) {
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
    onCopied?.();
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
  onCopied?: () => void;
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
  onCopied,
}: CopyCodeButtonProps) {
  const { copied, copy } = useCopyCode(code, { placement, brand, contentSlug }, onCopied);

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

type ReturnNotice = { text: string; closeLabel: string };

// Um aviso só por página: o do último "copiar e ir" que voltou da aba da loja. Fica no <body>, por portal, porque o dock
// do celular tem translate (que prenderia o fixed a ele) e fica inert e invisible quando some.
// A fonte do código (--font-jetbrains-mono) vem do recorte ou do dock, e o aviso a copia do botão: o CouponBlocks, que a
// define, usa next/font, que não roda nos testes em tsx que importam este arquivo.
type OpenNotice = ReturnNotice & { owner: string; code: string; codeFont: string };
let openNotice: OpenNotice | null = null;
const noticeListeners = new Set<() => void>();
const setOpenNotice = (notice: OpenNotice | null) => {
  openNotice = notice;
  noticeListeners.forEach((listener) => listener());
};
const subscribeNotice = (listener: () => void) => {
  noticeListeners.add(listener);
  return () => noticeListeners.delete(listener);
};
const getOpenNotice = () => openNotice;
const getNoNotice = () => null;

function ReturnNoticeBanner({ notice }: { notice: OpenNotice }) {
  return createPortal(
    <div
      role="status"
      data-return-notice=""
      style={notice.codeFont ? ({ '--font-jetbrains-mono': notice.codeFont } as CSSProperties) : undefined}
      className="fixed inset-x-3 top-3 z-[70] mx-auto flex max-w-md items-start gap-3 rounded-xl border-2 border-verde-escuro bg-verde-claro p-3.5 text-start text-verde-escuro shadow-large motion-safe:animate-[slide-up_0.25s_ease-out]"
    >
      <Check aria-hidden="true" className="mt-1 h-6 w-6 shrink-0" />
      <div className="min-w-0 flex-1">
        <p dir="ltr" className="font-codigo text-xl leading-7 font-extrabold tracking-[0.04em] break-all">{notice.code}</p>
        <p className="mt-0.5 text-[15px] leading-5 font-bold">{notice.text}</p>
      </div>
      <button
        type="button"
        onClick={() => setOpenNotice(null)}
        aria-label={notice.closeLabel}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border-2 border-verde-escuro bg-white focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-marinho"
      >
        <X aria-hidden="true" strokeWidth={2.4} className="h-5 w-5" />
      </button>
    </div>,
    document.body
  );
}

type CopyAndOpenStoreLinkProps = Partial<CopyTracking> & {
  code: string;
  href: string;
  className: string;
  children: ReactNode;
  copiedChildren: ReactNode;
  copiedStatus: string;
  sponsored?: boolean;
  // Para quando o texto visível não diz a ação (só o código); precisa conter esse texto.
  ariaLabel?: string;
  // O aviso de quando a pessoa volta da aba da loja: o código e onde colar, até ela fechar.
  returnNotice?: ReturnNotice;
};

// Copia e deixa o link abrir a loja em outra aba; a escrita na área de transferência começa
// ainda dentro do clique, antes de a aba nova tirar o foco da página. A cópia e o clique na loja
// seguem como dois eventos. O "Copiado" do botão fica atrás da aba da loja, então quem volta
// encontra o aviso (returnNotice), que o botão de onde a pessoa saiu põe no <body>.
export function CopyAndOpenStoreLink({
  code,
  brand,
  placement = 'coupon_page',
  contentSlug,
  href,
  className,
  children,
  copiedChildren,
  copiedStatus,
  sponsored = true,
  ariaLabel,
  returnNotice,
}: CopyAndOpenStoreLinkProps) {
  const owner = useId();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const awaitingReturn = useRef(false);
  const notice = useSyncExternalStore(subscribeNotice, getOpenNotice, getNoNotice);
  const { copied, copy } = useCopyCode(code, { placement, brand, contentSlug }, () => {
    awaitingReturn.current = true;
  });

  useEffect(() => {
    if (!returnNotice) return undefined;
    const onVisibilityChange = () => {
      if (document.visibilityState !== 'visible' || !awaitingReturn.current) return;
      awaitingReturn.current = false;
      const codeFont = linkRef.current ? getComputedStyle(linkRef.current).getPropertyValue('--font-jetbrains-mono').trim() : '';
      setOpenNotice({ ...returnNotice, owner, code, codeFont });
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, [returnNotice, owner, code]);

  // O aviso some com o botão que o abriu (a página mudou).
  useEffect(() => () => {
    if (openNotice?.owner === owner) setOpenNotice(null);
  }, [owner]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    void copy(event);
    trackEvent(sponsored ? 'coupon_store_click' : 'outbound_link_click', {
      coupon_code: code,
      ...(brand && { brand }),
      ...(contentSlug && { content_slug: contentSlug }),
      placement,
      url: href,
    });
  };

  return (
    <>
      <a
        ref={linkRef}
        href={href}
        target="_blank"
        rel={sponsored ? 'sponsored noopener noreferrer' : 'noopener noreferrer'}
        onClick={handleClick}
        aria-label={ariaLabel}
        data-copied={copied}
        className={className}
      >
        {copied ? copiedChildren : children}
      </a>
      <span role="status" className="sr-only">
        {copied ? copiedStatus : ''}
      </span>
      {notice?.owner === owner && <ReturnNoticeBanner notice={notice} />}
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
  copyAction?: {
    code: string;
    ariaLabel: string;
    copiedLabel: string;
    copiedStatus: string;
    returnNotice?: ReturnNotice;
  };
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
          <CopyAndOpenStoreLink
            code={copyAction.code}
            href={storeUrl}
            brand={brand}
            placement="bottom_bar"
            ariaLabel={copyAction.ariaLabel}
            copiedStatus={copyAction.copiedStatus}
            returnNotice={copyAction.returnNotice}
            className="flex min-h-12 min-w-0 flex-1 items-center justify-between gap-2 rounded-[10px] border-2 border-dashed border-marinho bg-amarelo-cupom px-3 font-codigo font-extrabold text-marinho focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-marinho data-[copied=true]:border-solid data-[copied=true]:border-verde-escuro data-[copied=true]:bg-verde-claro data-[copied=true]:text-verde-escuro"
            copiedChildren={
              <span className="flex flex-1 items-center justify-center gap-2 font-sans text-[15px]">
                <Check aria-hidden="true" className="h-[18px] w-[18px]" />
                {copyAction.copiedLabel}
              </span>
            }
          >
            <Scissors aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
            <span dir="ltr" className={`min-w-0 flex-1 break-all text-balance leading-5 ${dockCodeSize(copyAction.code)}`}>{copyAction.code}</span>
            {/* Abaixo de 360px o ícone sai para o código caber em duas linhas; a tesoura já indica a cópia. */}
            <Copy aria-hidden="true" className="h-[18px] w-[18px] shrink-0 max-[360px]:hidden" />
          </CopyAndOpenStoreLink>
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
