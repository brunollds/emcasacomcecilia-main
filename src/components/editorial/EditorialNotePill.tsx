'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { X, StickyNote } from 'lucide-react';
import type { EditorialNoteData } from '@/lib/content';

// Module-level scroll lock counter to handle concurrent modals safely
let scrollLockCount = 0;
let previousOverflow = '';

function acquireScrollLock(): void {
  if (scrollLockCount === 0) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  scrollLockCount += 1;
}

function releaseScrollLock(): void {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) {
    document.body.style.overflow = previousOverflow;
  }
}

export interface EditorialNotePillProps {
  note: EditorialNoteData;
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

export function EditorialNotePill({ note }: EditorialNotePillProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const pillRef = useRef<HTMLButtonElement>(null);
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
    if (!isOpen) return;

    const pillElement = pillRef.current;
    const closeButtonElement = closeButtonRef.current;

    // Move focus to close button
    const timer = window.setTimeout(() => {
      closeButtonElement?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
      // Tab trap: if Tab and only close button is focusable, prevent and keep focus
      if (event.key === 'Tab') {
        const focusableElements = document.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusableInDialog = Array.from(focusableElements).filter((el) => {
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0; // visible
        });
        if (focusableInDialog.length === 1 && focusableInDialog[0] === closeButtonElement) {
          event.preventDefault();
          closeButtonElement?.focus();
        }
      }
    };

    // Lock body scroll using module-level counter
    acquireScrollLock();

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      releaseScrollLock();
      // Return focus to pill
      pillElement?.focus();
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const bodyParagraphs = note.body.split('\n\n').filter(Boolean);

  const pillContent = (
    <button
      ref={pillRef}
      type="button"
      onClick={() => setIsOpen(true)}
      className="inline-flex items-center gap-2 rounded-full bg-[#fff4bf] px-3 py-2 text-xs font-semibold text-[#1a4d2e] shadow-soft transition-all hover:shadow-md hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:ring-offset-2 focus-visible:outline-none print:hidden"
      aria-label={`Nota editorial: ${note.label}`}
    >
      <StickyNote size={13} className="flex-shrink-0" />
      <span>{note.label}</span>
    </button>
  );

  const sheetContent = isOpen && isMounted && createPortal(
    <div className="fixed inset-0 z-[60] print:hidden" role="dialog" aria-modal="true" aria-label={note.label}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Sheet panel */}
      <div
        className="absolute bottom-0 left-0 right-0 mx-auto max-w-2xl rounded-t-2xl bg-white shadow-lg overflow-y-auto max-h-[70vh]"
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          opacity: isOpen ? 1 : 0,
          transition: prefersReducedMotion ? 'none' : 'transform 300ms ease-out, opacity 300ms ease-out',
        }}
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between gap-4 border-b border-[#1a4d2e]/10 bg-white px-6 py-4 md:px-8">
          <h2 className="font-semibold text-[#1a4d2e] text-lg">{note.label}</h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full hover:bg-[#f5f5f5] focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:ring-offset-2 focus-visible:outline-none transition-colors"
            aria-label="Fechar nota"
          >
            <X size={20} className="text-[#1a4d2e]" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 md:px-8">
          {bodyParagraphs.map((paragraph, index) => (
            <p
              key={`${note.id ?? note.label}-${index}`}
              className="mt-3 text-sm leading-relaxed text-[#4a5568] first:mt-0"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );

  return (
    <>
      {pillContent}
      {sheetContent}
    </>
  );
}
