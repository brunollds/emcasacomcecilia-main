'use client';

import { useEffect, useRef, useState } from 'react';
import { Link2 } from 'lucide-react';

export interface SectionLinkButtonProps {
  anchorId: string;
  label?: string;
}

export function SectionLinkButton({
  anchorId,
  label = 'Copiar link da seção',
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
      className="inline-flex items-center gap-1 rounded text-[#1a4d2e]/50 transition-colors hover:text-[#ff6b35] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6b35] print:hidden"
    >
      {showFeedback ? (
        <span className="text-xs font-semibold text-[#1a4d2e]">Link copiado!</span>
      ) : (
        <Link2 size={14} />
      )}
    </button>
  );
}
