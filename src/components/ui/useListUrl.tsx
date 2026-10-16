'use client';

import { Suspense, useCallback, useEffect, useSyncExternalStore } from 'react';
import { useSearchParams } from 'next/navigation';
import { urlSearchOf } from '@/lib/listUrl';

// A query string de uma lista que guarda o filtro na URL (a estante de /reviews, as subpáginas de loja e
// /videos). O useSyncExternalStore lê a URL (só a desta lista, ver urlSearchOf); o evento avisa das trocas da
// própria lista (writeListUrl), e o ListUrlListener, das de fora (voltar, avançar ou um link para esta
// página). O useSearchParams fica nele, com Suspense próprio: assim o prerender não para no Suspense e o HTML
// estático traz os cartões.
export const LIST_URL_EVENT = 'list-url';

function subscribeToUrl(onChange: () => void) {
  window.addEventListener(LIST_URL_EVENT, onChange);
  return () => window.removeEventListener(LIST_URL_EVENT, onChange);
}

const getServerSearch = () => '';

export function useListUrlSearch(listPath: string) {
  const getUrlSearch = useCallback(() => urlSearchOf(listPath, window.location), [listPath]);
  const urlSearch = useSyncExternalStore(subscribeToUrl, getUrlSearch, getServerSearch);
  return { urlSearch, getUrlSearch };
}

// Troca a query string da página (pushState ou replaceState, sem ir ao servidor) e avisa quem lê a URL.
export function writeListUrl(search: string, mode: 'push' | 'replace') {
  const url = `${window.location.pathname}${search}${window.location.hash}`;
  if (mode === 'push') window.history.pushState(null, '', url);
  else window.history.replaceState(null, '', url);
  window.dispatchEvent(new Event(LIST_URL_EVENT));
}

function UrlWatcher() {
  // Fora do App Router (no teste) não há parâmetros.
  const search = useSearchParams()?.toString() ?? '';

  useEffect(() => {
    window.dispatchEvent(new Event(LIST_URL_EVENT));
  }, [search]);

  return null;
}

export function ListUrlListener() {
  return (
    <Suspense fallback={null}>
      <UrlWatcher />
    </Suspense>
  );
}
