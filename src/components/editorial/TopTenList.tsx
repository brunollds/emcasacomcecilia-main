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
      {parsed.map((item, index) => (
        <EditorialReveal
          as="li"
          key={`top10-${item.number}-${index}`}
          delay={Math.min(index * 0.05, 0.35)}
          distance={14}
          className="flex items-start gap-4 rounded-2xl border-2 border-marinho bg-white p-5"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-marinho bg-amarelo-cupom font-condensada text-2xl font-black text-marinho font-stretch-extra-condensed">
            {item.number}
          </span>
          <span className="min-w-0 pt-1 font-editorial leading-7 text-marinho">
            <HighlightCoupon text={item.text} />
          </span>
        </EditorialReveal>
      ))}
    </ul>
  );
}
