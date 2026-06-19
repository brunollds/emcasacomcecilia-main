'use client';

import { EditorialReveal } from './EditorialReveal';
import { HighlightCoupon } from '@/components/review/HighlightCoupon';

export interface TopTenListProps {
  items: string[];
}

function parseNumberedItem(item: string): { number: string; text: string } | null {
  const match = item.match(/^(\d+)\.\s*(.+)$/);
  if (!match) return null;
  return { number: match[1], text: match[2] };
}

export function TopTenList({ items }: TopTenListProps): React.ReactElement {
  const parsed = items.map(parseNumberedItem).filter(Boolean) as { number: string; text: string }[];

  return (
    <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      {parsed.map((item, index) => {
        const isEven = index % 2 === 0;
        return (
          <EditorialReveal
            as="li"
            key={`top10-${item.number}-${index}`}
            delay={Math.min(index * 0.05, 0.35)}
            distance={14}
            className={`flex items-start gap-4 rounded-2xl border bg-white p-5 shadow-soft transition-shadow hover:shadow-md ${
              isEven ? 'border-[#1a4d2e]/10' : 'border-[#ff6b35]/15'
            }`}
          >
            <span
              className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl font-handwritten text-2xl font-bold text-white shadow-soft ${
                isEven ? 'bg-[#1a4d2e]' : 'bg-[#ff6b35]'
              }`}
            >
              {item.number}
            </span>
            <span className="pt-0.5 font-editorial text-[#24313d] leading-7">
              <HighlightCoupon text={item.text} />
            </span>
          </EditorialReveal>
        );
      })}
    </ul>
  );
}
