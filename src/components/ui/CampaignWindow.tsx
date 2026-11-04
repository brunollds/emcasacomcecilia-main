'use client';

import { useSyncExternalStore, type ReactNode } from 'react';

// Confere o prazo de novo a cada minuto e quando a aba volta a ficar visível: uma página aberta antes do fim (ou que o
// celular guardou na memória) esconde o que venceu sem recarregar. O React só renderiza de novo quando o resultado
// muda.
function subscribe(onStoreChange: () => void) {
  const timer = window.setInterval(onStoreChange, 60_000);
  document.addEventListener('visibilitychange', onStoreChange);
  return () => {
    window.clearInterval(timer);
    document.removeEventListener('visibilitychange', onStoreChange);
  };
}

// O HTML do build traz o que estava no prazo. No servidor e na hidratação vale o estado do build, para o HTML bater;
// depois, o navegador mostra o que começou e esconde o que venceu, também com a página aberta.
export function CampaignWindow({
  from,
  until,
  hiddenInHtml = false,
  children,
}: {
  from?: string;
  until?: string;
  hiddenInHtml?: boolean;
  children: ReactNode;
}) {
  const visible = useSyncExternalStore(
    subscribe,
    () => {
      const now = Date.now();
      return !(from && now < Date.parse(from)) && !(until && now > Date.parse(until));
    },
    () => !hiddenInHtml
  );
  return visible ? children : null;
}
