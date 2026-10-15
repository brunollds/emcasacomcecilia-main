'use client';

import { useEffect, useRef, useState } from 'react';
import { Link2 } from 'lucide-react';
import { FOCUS_RING } from '@/components/ui/focusRing';

export interface SectionLinkButtonProps {
  anchorId: string;
  label?: string;
  copiedLabel?: string;
  // 'd2' (artigos): marinho, com o anel de foco da casa.
  variant?: 'editorial' | 'd2';
}

const LINK_BUTTON_STYLES = {
  editorial: {
    button: 'inline-flex items-center gap-1 rounded text-[#1a4d2e]/50 transition-colors hover:text-[#ff6b35] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#ff6b35] focus-visible:outline-none print:hidden',
    feedback: 'text-xs font-semibold text-[#1a4d2e]',
  },
  d2: {
    button: `inline-flex items-center gap-1 rounded text-marinho-suave transition-colors hover:text-marinho ${FOCUS_RING} print:hidden`,
    feedback: 'text-xs font-bold text-marinho',
  },
} as const;

export function SectionLinkButton({
  anchorId,
  label = 'Copiar link da seção',
  copiedLabel = 'Link copiado!',
  variant = 'editorial',
}: SectionLinkButtonProps): React.ReactElement {
  const [showFeedback, setShowFeedback] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${anchorId}`;

    try {
      await navigator.clipboard.writeText(url);
      setShowFeedback(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setShowFeedback(false);
      }, 2000);
    } catch {
      // Fallback: set hash
      window.location.hash = anchorId;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      title={label}
      className={LINK_BUTTON_STYLES[variant].button}
    >
      {showFeedback ? (
        <span className={LINK_BUTTON_STYLES[variant].feedback}>{copiedLabel}</span>
      ) : (
        <Link2 size={14} />
      )}
    </button>
  );
}
