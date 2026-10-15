'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { CONSENT_PRIVACY_HREF, type ConsentCopy } from '@/components/consent/consentCopy';
import {
  clearTrackingCookies,
  getServerConsentSnapshot,
  onConsentPreferencesOpen,
  readConsent,
  subscribeConsent,
  writeConsent,
  type ConsentChoice,
} from '@/lib/consent';

const noSubscription = () => () => {};

// Os dois botões têm o mesmo tamanho e o mesmo peso: recusar não pode ser mais difícil que aceitar.
const BUTTON = `min-h-11 flex-1 rounded-lg border-2 border-marinho bg-white px-4 py-2 text-sm font-bold text-marinho transition-colors hover:bg-marinho hover:text-white ${FOCUS_RING}`;

export default function ConsentBanner({ copy }: { copy: ConsentCopy }) {
  // Nunca no HTML do servidor: a escolha só existe no navegador.
  const mounted = useSyncExternalStore(noSubscription, () => true, () => false);
  const consent = useSyncExternalStore(subscribeConsent, readConsent, getServerConsentSnapshot);
  const [openRequest, setOpenRequest] = useState(0);
  const [reopened, setReopened] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(
    () =>
      onConsentPreferencesOpen(() => {
        returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        setReopened(true);
        setOpenRequest((count) => count + 1);
      }),
    []
  );

  // Aberto pelo rodapé, o foco entra no aviso; no primeiro carregamento, o foco fica onde está.
  useEffect(() => {
    if (openRequest > 0) regionRef.current?.focus();
  }, [openRequest]);

  if (!mounted || (consent !== null && !reopened)) return null;

  const choose = (choice: ConsentChoice) => {
    const previous = readConsent();
    writeConsent(choice);
    setReopened(false);
    // Os scripts do GA4 e do Clarity não descarregam: quem retira o aceite fica sem os cookies deles e
    // recebe a página de novo, sem os scripts.
    if (previous === 'granted' && choice === 'denied') {
      clearTrackingCookies();
      window.location.reload();
      return;
    }
    returnFocusRef.current?.focus();
    returnFocusRef.current = null;
  };

  return (
    <div
      ref={regionRef}
      role="region"
      aria-label={copy.regionLabel}
      tabIndex={-1}
      className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 rounded-xl border-2 border-marinho bg-white p-4 text-marinho shadow-[4px_4px_0_var(--color-marinho)] outline-none motion-safe:animate-[slide-up_0.3s_ease-out] sm:right-auto sm:left-6 sm:w-[min(640px,calc(100%-3rem))] sm:p-5 print:hidden"
    >
      <p className="text-sm leading-relaxed">
        {copy.message}{' '}
        <Link
          href={CONSENT_PRIVACY_HREF}
          className={`font-semibold underline underline-offset-2 hover:text-laranja ${FOCUS_RING}`}
        >
          {copy.privacyLabel}
        </Link>
      </p>
      <div className="mt-3 flex gap-3">
        <button type="button" onClick={() => choose('denied')} className={BUTTON}>
          {copy.decline}
        </button>
        <button type="button" onClick={() => choose('granted')} className={BUTTON}>
          {copy.accept}
        </button>
      </div>
    </div>
  );
}
