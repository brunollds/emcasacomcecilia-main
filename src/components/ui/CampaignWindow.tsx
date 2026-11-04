'use client';

import { useSyncExternalStore, type ReactNode } from 'react';

type TimeWindow = { from?: string; until?: string };

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

function isInside({ from, until }: TimeWindow, now: number) {
  return !(from && now < Date.parse(from)) && !(until && now > Date.parse(until));
}

// O HTML do build traz o que estava no prazo. No servidor e na hidratação vale o estado do build, para o HTML bater;
// depois, o navegador mostra o que começou e esconde o que venceu, também com a página aberta.
export function CampaignWindow({
  from,
  until,
  hiddenInHtml = false,
  children,
}: TimeWindow & {
  hiddenInHtml?: boolean;
  children: ReactNode;
}) {
  const visible = useSyncExternalStore(
    subscribe,
    () => isInside({ from, until }, Date.now()),
    () => !hiddenInHtml
  );
  return visible ? children : null;
}

// O avesso: mostra os filhos fora de todos os prazos, como o código de sempre de uma loja enquanto o código com prazo
// não vale. `hiddenInHtml` é o build ter caído dentro de um dos prazos.
export function OutsideCampaignWindows({
  windows,
  hiddenInHtml = false,
  children,
}: {
  windows: readonly TimeWindow[];
  hiddenInHtml?: boolean;
  children: ReactNode;
}) {
  const visible = useSyncExternalStore(
    subscribe,
    () => {
      const now = Date.now();
      return !windows.some((item) => isInside(item, now));
    },
    () => !hiddenInHtml
  );
  return visible ? children : null;
}
