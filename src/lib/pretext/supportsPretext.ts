/**
 * Detecta se o ambiente atual suporta as APIs necessárias para o Pretext.
 * Deve ser chamado apenas no cliente (browser).
 */
export function supportsPretext(): boolean {
  if (typeof window === 'undefined') return false;
  if (typeof Intl === 'undefined' || typeof Intl.Segmenter !== 'function') return false;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  return ctx !== null && typeof ctx.measureText === 'function';
}

/**
 * Versão segura para SSR — sempre retorna false no servidor.
 */
export function supportsPretextSafe(): boolean {
  return typeof window !== 'undefined' && supportsPretext();
}
