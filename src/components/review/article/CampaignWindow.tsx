'use client';

import { useSyncExternalStore, type ReactNode } from 'react';

const subscribe = () => () => {};

// O HTML do build traz o banner que estava no prazo. Se o início ou o fim da campanha passa antes do próximo deploy, o
// navegador mostra ou esconde o banner; no servidor e na hidratação vale o estado do build, para o HTML bater.
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
