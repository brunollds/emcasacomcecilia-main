'use client';

import { useMemo, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { LIST_URL_EVENT } from '@/components/ui/useListUrl';
import { getActiveNav, type ActiveNav } from '@/lib/i18n/shellMenu';
import type { Locale } from '@/lib/i18n/locales';

function subscribeToSearch(onChange: () => void) {
  window.addEventListener('popstate', onChange);
  window.addEventListener(LIST_URL_EVENT, onChange);
  return () => {
    window.removeEventListener('popstate', onChange);
    window.removeEventListener(LIST_URL_EVENT, onChange);
  };
}

const getSearch = () => window.location.search;
const getServerSearch = () => '';

// Lê a query direto da URL (e não pelo useSearchParams) para o header continuar no HTML do servidor.
export function useActiveNav(locale: Locale): ActiveNav {
  const pathname = usePathname() ?? '';
  const search = useSyncExternalStore(subscribeToSearch, getSearch, getServerSearch);
  return useMemo(() => getActiveNav(pathname, search, locale), [pathname, search, locale]);
}
