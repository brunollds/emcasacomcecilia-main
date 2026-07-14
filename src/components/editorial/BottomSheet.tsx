'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

// Module-level scroll lock counter to handle concurrent modals safely
let scrollLockCount = 0;
let previousOverflow = '';

export function acquireScrollLock(): void {
  if (scrollLockCount === 0) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  scrollLockCount += 1;
}

export function releaseScrollLock(): void {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) {
    document.body.style.overflow = previousOverflow;
  }
}

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  ariaLabel: string;
  returnFocusRef?: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
}

function subscribeToReducedMotion(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getReducedMotionSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function BottomSheet({
  open,
  onClose,
  ariaLabel,
  returnFocusRef,
  children,
}: BottomSheetProps): React.ReactElement {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  // Hydration-safe portal gate: true on client, false on server
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    if (!open) return;

    const closeButtonElement = closeButtonRef.current;
    const returnFocusElement = returnFocusRef?.current;

    // Move focus to close button
    const timer = window.setTimeout(() => {
      closeButtonElement?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }

      // Tab trap with wrap-around: cycle focus within visible focusable elements
      if (event.key === 'Tab') {
        const focusableElements = document.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusableInSheet = Array.from(focusableElements).filter((el) => {
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0; // visible
        });

        if (focusableInSheet.length === 0) return;

        const currentIndex = focusableInSheet.indexOf(document.activeElement as Element);
        let nextIndex = currentIndex;

        if (event.shiftKey) {
          // Shift+Tab: go backwards, wrap to end
          nextIndex = currentIndex <= 0 ? focusableInSheet.length - 1 : currentIndex - 1;
        } else {
          // Tab: go forwards, wrap to start
          nextIndex = currentIndex >= focusableInSheet.length - 1 ? 0 : currentIndex + 1;
        }

        event.preventDefault();
        (focusableInSheet[nextIndex] as HTMLElement).focus();
      }
    };

    // Lock body scroll using module-level counter
    acquireScrollLock();

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      releaseScrollLock();
      // Return focus to trigger element if provided
      returnFocusElement?.focus();
    };
  }, [open, onClose, returnFocusRef]);

  if (!open || !isMounted) return <></>;

  return createPortal(
    <div className="fixed inset-0 z-[60] print:hidden" role="dialog" aria-modal="true" aria-label={ariaLabel}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet panel */}
      <div
        className="absolute bottom-0 left-0 right-0 mx-auto max-w-2xl rounded-t-2xl bg-white shadow-lg overflow-y-auto max-h-[70vh]"
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: open ? 'translateY(0)' : 'translateY(100%)',
          opacity: open ? 1 : 0,
          transition: prefersReducedMotion ? 'none' : 'transform 300ms ease-out, opacity 300ms ease-out',
        }}
      >
        {/* Header with close button */}
        <div className="sticky top-0 flex items-center justify-between gap-4 border-b border-[#1a4d2e]/10 bg-white px-6 py-4 md:px-8">
          <h2 className="font-semibold text-[#1a4d2e] text-lg flex-1">{ariaLabel}</h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full hover:bg-[#f5f5f5] focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:ring-offset-2 focus-visible:outline-none transition-colors"
            aria-label="Fechar"
          >
            <X size={20} className="text-[#1a4d2e]" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 md:px-8">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
