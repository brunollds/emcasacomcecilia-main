import { INTERNAL_HOSTNAMES } from './internalLinks';

export function shouldEnableAnalytics(hostname, debugEnabled = false) {
  return debugEnabled || INTERNAL_HOSTNAMES.has(hostname);
}

// Sem o opt-in NEXT_PUBLIC_GA_DEBUG: o Clarity não tem modo debug, então liberar
// localhost aqui mandaria sessões de dev para o projeto de produção.
export function shouldEnableClarity(hostname) {
  return shouldEnableAnalytics(hostname);
}

export function getAnalyticsConfig(debugEnabled = false) {
  return {
    send_page_view: false,
    ...(debugEnabled ? { debug_mode: true } : {}),
  };
}

export function trackEvent(eventName, parameters = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', eventName, parameters);
}
