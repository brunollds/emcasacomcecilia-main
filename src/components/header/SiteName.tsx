import type { CSSProperties } from 'react';

interface SiteNameProps {
  className?: string;
  style?: CSSProperties;
}

const SMALL: CSSProperties = { fontSize: '0.60rem', fontWeight: 700, letterSpacing: '-0.3px' };
const BIG: CSSProperties = { fontSize: '1em', fontWeight: 800, letterSpacing: '-0.4px' };

// As cores trocam no hover do computador (group-hover) e no toque do celular (data-tap="true" no link, o group).
const LIGHT = 'text-white group-hover:text-[#ff6b35] group-data-[tap=true]:text-[#ff6b35] motion-safe:transition-colors motion-safe:duration-300';
const ACCENT = 'border-b-2 border-[#ff6b35]/80 pb-0.5 text-[#ff6b35] group-hover:text-white group-data-[tap=true]:text-white motion-safe:transition-colors motion-safe:duration-300';

// O nome do site do header: o tamanho vem de quem usa (computador ou celular); cores e formato, sempre estes.
export default function SiteName({ className, style }: SiteNameProps) {
  return (
    <span
      className={className}
      style={{
        fontWeight: 800,
        lineHeight: '1',
        letterSpacing: '-0.5px',
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: '1.5px',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      <span className={LIGHT} style={SMALL}>em</span>
      <span className={LIGHT} style={BIG}>CASA</span>
      <span className={LIGHT} style={SMALL}>com</span>
      <span className={ACCENT} style={BIG}>CECÍLIA</span>
    </span>
  );
}
