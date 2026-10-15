// Escolha do aviso de cookies (LGPD). O GA4 e o Clarity só carregam com 'granted'; sem escolha
// guardada, o aviso aparece. Fica no localStorage, não em cookie, como diz a política de privacidade.
// Sem React e sem @/lib/data: os loaders, o aviso e o rodapé são componentes de cliente.

export type ConsentChoice = 'granted' | 'denied';
export type ConsentState = ConsentChoice | null;

export const CONSENT_STORAGE_KEY = 'ecc-consent-v1';
const CHANGE_EVENT = 'ecc-consent-change';
const OPEN_EVENT = 'ecc-consent-open';

// Se o navegador recusa o armazenamento (modo privado, site bloqueado), a escolha vale ao menos
// até a página recarregar.
let memoryChoice: ConsentState = null;

export function parseConsent(value: unknown): ConsentState {
  return value === 'granted' || value === 'denied' ? value : null;
}

export function readConsent(): ConsentState {
  if (typeof window === 'undefined') return null;
  try {
    return parseConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY)) ?? memoryChoice;
  } catch {
    return memoryChoice;
  }
}

export function writeConsent(choice: ConsentChoice) {
  memoryChoice = choice;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Fica só na memória.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

// Assinatura do useSyncExternalStore: a escolha feita nesta aba e a feita em outra aba.
export function subscribeConsent(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === CONSENT_STORAGE_KEY) onChange();
  };
  window.addEventListener('storage', onStorage);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

export function getServerConsentSnapshot(): ConsentState {
  return null;
}

// O link "Preferências de cookies" do rodapé reabre o aviso.
export function openConsentPreferences() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onConsentPreferencesOpen(listener: () => void) {
  window.addEventListener(OPEN_EVENT, listener);
  return () => window.removeEventListener(OPEN_EVENT, listener);
}

// O gate dos dois loaders: o host liberado (a allowlist de src/lib/analytics.js) e o aceite no aviso.
export function isTrackingAllowed(hostAllowed: boolean, consent: ConsentState) {
  return hostAllowed && consent === 'granted';
}
