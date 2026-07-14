'use client';

import { useEffect, useState } from 'react';

export interface TocItem {
  id: string;
  heading: string;
}

export interface ReviewTableOfContentsProps {
  items: TocItem[];
}

export function ReviewTableOfContents({ items }: ReviewTableOfContentsProps): React.ReactElement | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Navegação por capítulos" className="rounded-xl border border-[#1a4d2e]/10 bg-white p-5 shadow-soft">
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#1a4d2e]/60">
        Nesta análise
      </p>
      <ul className="space-y-1">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-[#1a4d2e] font-semibold text-white'
                    : 'text-[#4a5568] hover:bg-[#1a4d2e]/5 hover:text-[#1a4d2e]'
                }`}
              >
                {item.heading}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
