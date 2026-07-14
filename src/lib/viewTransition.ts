/**
 * View Transitions API utility
 * Wraps navigation in document.startViewTransition for smooth morphing between pages
 */

export function useViewTransition(callback: () => void): void {
  if (typeof document === 'undefined') {
    callback();
    return;
  }

  if ('startViewTransition' in document) {
    // Browser supports View Transitions API
    (document as any).startViewTransition(callback);
  } else {
    // Fallback for unsupported browsers
    callback();
  }
}

export function sanitizeViewTransitionName(slug: string): string {
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
