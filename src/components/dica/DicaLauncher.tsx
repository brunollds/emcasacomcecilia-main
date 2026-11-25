'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Minus } from 'lucide-react';
import { FOCUS_RING, FOCUS_RING_ON_DARK } from '@/components/ui/focusRing';
import { getServerConsentSnapshot, readConsent, subscribeConsent } from '@/lib/consent';
import { trackEvent } from '@/lib/analytics';

// A gaveta só baixa no primeiro toque: a barra fechada não leva o código dela.
const DicaPanel = dynamic(() => import('./DicaPanel'), { ssr: false });

const COLLAPSED_KEY = 'ecc-dica-collapsed';
const noSubscription = () => () => {};
// Sem <dialog> com showModal (iOS antes do 15.4), a barra não aparece: a caixa não abriria.
const supportsDialog = () => typeof HTMLDialogElement === 'function' && 'showModal' in HTMLDialogElement.prototype;

function readCollapsed(): boolean {
  try {
    return window.sessionStorage.getItem(COLLAPSED_KEY) === '1';
  } catch {
    return false;
  }
}

function writeCollapsed(value: boolean) {
  try {
    if (value) window.sessionStorage.setItem(COLLAPSED_KEY, '1');
    else window.sessionStorage.removeItem(COLLAPSED_KEY);
  } catch {
    // Sem armazenamento, vale só nesta página.
  }
}

const THEMES = {
  default: {
    bar: 'border-marinho bg-white text-marinho shadow-[4px_4px_0_var(--color-marinho)]',
    badge: 'border-marinho bg-amarelo-cupom text-marinho',
    hint: 'text-marinho-suave',
    pill: 'bg-laranja text-marinho',
    minimize: 'text-marinho hover:bg-creme',
    focus: FOCUS_RING,
    lift: '',
  },
  festival: {
    bar: 'border-[#d9ff43] bg-[#150d2c] text-[#f7f5ff] shadow-[4px_4px_0_#ff2e93]',
    badge: 'border-[#d9ff43] bg-[#d9ff43] text-[#150d2c]',
    hint: 'text-[#f7f5ff]/75',
    pill: 'bg-[#ff2e93] text-white',
    minimize: 'text-[#f7f5ff] hover:bg-white/10',
    focus: FOCUS_RING_ON_DARK,
    // A carteira dos códigos copiados do festival fica no mesmo canto, por cima (z-45): a barra sobe acima dela.
    lift: '[body:has(.bf-vip-wallet)_&]:bottom-[84px] sm:[body:has(.bf-vip-wallet)_&]:bottom-[84px]',
  },
} as const;

export function DicaLauncher({ variant = 'default' }: { variant?: keyof typeof THEMES }) {
  // Nunca no HTML do servidor, e só depois do aviso de cookies: os dois ficam no pé da tela.
  const mounted = useSyncExternalStore(noSubscription, supportsDialog, () => false);
  const consent = useSyncExternalStore(subscribeConsent, readConsent, getServerConsentSnapshot);
  const [collapsed, setCollapsed] = useState(readCollapsedSafe);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const openerRef = useRef<HTMLButtonElement>(null);
  const focusAfterToggle = useRef(false);

  // Ao recolher ou abrir de novo a barra, o botão some: o foco vai para o que aparece no lugar.
  useEffect(() => {
    if (!focusAfterToggle.current) return;
    focusAfterToggle.current = false;
    openerRef.current?.focus();
  }, [collapsed]);

  if (!mounted || consent === null) return null;

  const theme = THEMES[variant];

  const openPanel = () => {
    setLoaded(true);
    setOpen(true);
    trackEvent('dica_open', { placement: variant === 'festival' ? 'festival_blackfriday' : 'site' });
  };

  const collapse = (value: boolean) => {
    writeCollapsed(value);
    focusAfterToggle.current = true;
    setCollapsed(value);
  };

  return (
    <>
      {collapsed ? (
        <div className={`fixed end-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex print:hidden sm:inset-x-0 sm:mx-auto sm:w-fit sm:bottom-5 ${theme.lift}`}>
          <button
            ref={openerRef}
            type="button"
            onClick={() => {
              // Sem mover o foco para a barra: ele vai para o campo da caixa que abre.
              writeCollapsed(false);
              setCollapsed(false);
              openPanel();
            }}
            className={`flex min-h-11 items-center gap-1.5 rounded-full border-2 px-3.5 text-xs font-extrabold ${theme.bar} ${theme.focus}`}
          >
            <span aria-hidden="true">✦</span> DICA · Tem cupom?
          </button>
        </div>
      ) : (
        <div
          className={`fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex min-h-[52px] items-center gap-1 rounded-2xl border-2 p-1.5 ps-2.5 print:hidden sm:inset-x-0 sm:mx-auto sm:bottom-5 sm:w-[360px] ${theme.bar} ${theme.lift}`}
        >
          <button
            ref={openerRef}
            type="button"
            onClick={openPanel}
            className={`flex min-w-0 flex-1 items-center gap-2.5 rounded-xl py-1 text-start ${theme.focus}`}
          >
            <span className={`shrink-0 rounded-lg border px-2 py-1 text-[11px] font-black ${theme.badge}`}>
              <span aria-hidden="true">✦</span> DICA
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] leading-4 font-extrabold">Tem nos parceiros? Pergunte aqui</span>
              {/* Só na barra larga: nos celulares estreitos e na barra de 360 px do computador, o título já ocupa duas linhas. */}
              <span className={`hidden truncate text-[11px] leading-4 font-semibold min-[420px]:block sm:hidden ${theme.hint}`}>
                Ex: tem whey?, tem sofá?
              </span>
            </span>
            {/* Abaixo de 420 px a pílula some: a barra toda abre a caixa, e o texto precisa do espaço. */}
            <span aria-hidden="true" className={`hidden shrink-0 rounded-xl px-3 py-2 text-xs font-extrabold min-[420px]:block ${theme.pill}`}>
              Perguntar
            </span>
          </button>
          <button
            type="button"
            onClick={() => collapse(true)}
            aria-label="Recolher o DICA"
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${theme.minimize} ${theme.focus}`}
          >
            <Minus aria-hidden="true" className="h-5 w-5" strokeWidth={2.6} />
          </button>
        </div>
      )}
      {loaded && (
        <DicaPanel
          variant={variant}
          open={open}
          onClose={() => {
            setOpen(false);
            openerRef.current?.focus();
          }}
        />
      )}
    </>
  );
}

// No servidor e na hidratação a barra não aparece, então ler o sessionStorage aqui não gera diferença no HTML.
function readCollapsedSafe(): boolean {
  return typeof window === 'undefined' ? false : readCollapsed();
}
