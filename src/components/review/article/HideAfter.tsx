'use client';

import { useSyncExternalStore, type ReactNode } from 'react';

const subscribe = () => () => {};

// O HTML do build traz a campanha que estava no prazo. Se a data de fim passa antes do próximo deploy, o navegador
// esconde o banner; no servidor e na hidratação ele aparece, para o HTML bater com o do build.
export function HideAfter({ until, children }: { until: string; children: ReactNode }) {
  const expired = useSyncExternalStore(subscribe, () => Date.now() > Date.parse(until), () => false);
  return expired ? null : children;
}
