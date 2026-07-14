'use client';

import { useEffect, useRef } from 'react';

export function ReadingProgressBar(): React.ReactElement {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0;
      if (barRef.current) {
        barRef.current.style.width = `${pct}%`;
      }
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="review-reading-progress fixed top-0 left-0 z-[60] h-[3px] w-full bg-[#1a4d2e]/10 print:hidden"
    >
      <div
        ref={barRef}
        className="h-full bg-[#ff6b35] transition-none"
        style={{ width: '0%' }}
      />
    </div>
  );
}
