import Image from 'next/image';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import { ChevronDown } from 'lucide-react';
import type { CouponFAQ } from '@/lib/couponsData';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

// Archivo entra condensada (eixo wdth) nos números e títulos; a JetBrains Mono separa O de 0 nos códigos.
const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['800'],
  display: 'swap',
});

export const couponFontVariables = `${archivo.variable} ${jetbrainsMono.variable}`;

export const FOCUS_RING = 'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-marinho';

export const PRIMARY_ACTION = `flex min-h-[52px] items-center justify-center gap-2.5 rounded-[10px] border-2 border-marinho bg-laranja px-4 text-center text-base font-extrabold text-marinho transition-colors hover:bg-laranja/85 data-[copied=true]:border-verde-escuro data-[copied=true]:bg-verde-escuro data-[copied=true]:text-white ${FOCUS_RING}`;

export const SECONDARY_ACTION = `flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] border-2 border-marinho bg-white px-4 text-center text-[15px] font-extrabold text-marinho transition-colors hover:bg-creme data-[copied=true]:border-verde-escuro data-[copied=true]:bg-verde-claro data-[copied=true]:text-verde-escuro ${FOCUS_RING}`;

export const BODY_TEXT = 'max-w-[68ch] text-[15px] font-medium leading-6 text-marinho-suave md:text-base md:leading-7';

type DiscountParts =
  | { kind: 'amount'; value: string; unit?: '%'; prefix?: string; currency?: string }
  | { kind: 'words'; text: string };

// "12% OFF" vira número grande. A faixa do Magalu só é resumida ("até R$ 100") nos cards:
// no H1 o texto do desconto fica exatamente como está nos dados.
export function parseDiscount(discount: string, compact: boolean): DiscountParts {
  const percent = discount.match(/^(Até )?(\d+)% OFF$/i);
  if (percent) {
    return { kind: 'amount', value: percent[2], unit: '%', ...(percent[1] ? { prefix: 'até' } : {}) };
  }
  const range = compact ? discount.match(/^R\$ ?\d+ a R\$ ?(\d+) OFF$/) : null;
  if (range) return { kind: 'amount', value: range[1], prefix: 'até', currency: 'R$' };
  return { kind: 'words', text: discount };
}

const FIGURE_SIZES = {
  hero: {
    prefix: 'text-[17px] leading-6',
    currency: 'pt-2 text-[64px] leading-none md:text-[86px]',
    value: 'text-[150px] leading-[0.82] tracking-[-0.03em] md:text-[200px]',
    unitColumn: 'pt-2.5 md:pt-3.5',
    unit: 'text-[64px] leading-[0.88] md:text-[86px]',
    off: 'text-[44px] leading-[0.9] md:text-[58px]',
    // Em japonês e chinês cada caractere ocupa a largura cheia: a 64px só cabem 5 no celular e
    // "活动" se partia. A 48px cabem 6 até numa tela de 320px.
    words:
      'text-[64px] leading-[0.92] tracking-[-0.01em] md:text-[96px] max-md:[&:lang(ja)]:text-[48px] max-md:[&:lang(zh)]:text-[48px]',
  },
  // Primeiro card dos Destaques no hub; cresce no desktop, onde o card passa de 550px.
  lead: {
    prefix: 'text-[15px] leading-5 lg:text-[17px] lg:leading-6',
    currency: 'pt-2 text-[44px] leading-none lg:text-[56px]',
    value: 'text-[120px] leading-[0.85] tracking-[-0.03em] lg:text-[150px]',
    unitColumn: 'pt-1.5 lg:pt-2',
    unit: 'text-[52px] leading-[0.9] lg:text-[64px]',
    off: 'text-[34px] leading-none lg:text-[42px]',
    words: 'text-[56px] leading-[0.92] tracking-[-0.01em] lg:text-[72px]',
  },
  featured: {
    prefix: 'text-sm leading-[18px]',
    currency: 'pt-2 text-[36px] leading-none',
    value: 'text-[96px] leading-[0.85] tracking-[-0.03em]',
    unitColumn: 'pt-1.5',
    unit: 'text-[42px] leading-[0.9]',
    off: 'text-[28px] leading-none',
    words: 'text-[48px] leading-[0.92] tracking-[-0.01em]',
  },
  // Cards das prateleiras do hub.
  card: {
    prefix: 'text-[13px] leading-4',
    currency: 'pt-1.5 text-[26px] leading-none',
    value: 'text-[68px] leading-[0.85] tracking-[-0.02em]',
    unitColumn: 'pt-1',
    unit: 'text-[30px] leading-[0.9]',
    off: 'text-[20px] leading-none',
    words: 'text-[40px] leading-[38px] tracking-[-0.01em]',
  },
  tag: {
    prefix: 'text-[11px] leading-[14px]',
    currency: 'pt-1 text-[20px] leading-none',
    value: 'text-[44px] leading-[0.85] tracking-[-0.02em]',
    unitColumn: 'pt-0.5',
    unit: 'text-[20px] leading-[0.9]',
    off: 'text-[14px] leading-none',
    words: 'text-[26px] leading-[0.95]',
  },
  // Canhoto do cupom na gaveta do sumário dos artigos, com 92px de largura.
  stub: {
    prefix: 'text-xs leading-4',
    currency: 'pt-1 text-[22px] leading-none',
    value: 'text-[52px] leading-[0.88] tracking-[-0.02em]',
    unitColumn: 'pt-1',
    unit: 'text-[22px] leading-[0.9]',
    off: 'text-[15px] leading-none',
    words: 'text-[24px] leading-[0.95]',
  },
} as const;

type FigureSize = keyof typeof FIGURE_SIZES;

type AmountFigureProps = {
  size: FigureSize;
  value: string;
  unit?: '%';
  prefix?: string;
  currency?: string;
  // O que vem embaixo do "%": "OFF" nas lojas; a YesStyle passa "extra" já traduzido.
  suffix?: string;
};

export function AmountFigure({ size, value, unit, prefix, currency, suffix = 'OFF' }: AmountFigureProps) {
  const s = FIGURE_SIZES[size];

  return (
    <span className="flex flex-col">
      {prefix && (
        <>
          <span className={`font-extrabold ${s.prefix}`}>{prefix}</span>{' '}
        </>
      )}
      <span className="flex items-start gap-[3px] font-condensada font-black font-stretch-extra-condensed">
        {currency && (
          <>
            <span className={s.currency}>{currency}</span>{' '}
          </>
        )}
        <span className={s.value}>{value}</span>
        {unit ? (
          <span className={`flex flex-col ${s.unitColumn}`}>
            <span className={s.unit}>{unit}</span>{' '}
            <span className={s.off}>{suffix}</span>
          </span>
        ) : (
          <>
            {' '}
            <span className={`${s.unitColumn} ${s.off}`}>{suffix}</span>
          </>
        )}
      </span>
    </span>
  );
}

export function DiscountFigure({ discount, size }: { discount: string; size: FigureSize }) {
  const parts = parseDiscount(discount, size !== 'hero');

  if (parts.kind === 'words') {
    return <span className={`block font-condensada font-black font-stretch-extra-condensed ${FIGURE_SIZES[size].words}`}>{parts.text}</span>;
  }

  return <AmountFigure size={size} value={parts.value} unit={parts.unit} prefix={parts.prefix} currency={parts.currency} />;
}

// "right-inset" deixa o logo perto da borda direita sem cortar quando a caixa vaza o card.
const WATERMARK_POSITION = {
  right: 'object-right',
  'right-inset': 'object-[88%_center]',
  center: 'object-center',
} as const;

// Fica entre o fundo do bloco (sem posição) e o conteúdo, que vai em z-10. No topo da página
// ela é a maior imagem visível e conta como LCP, por isso entra sem lazy loading.
// A moldura inset-0 recorta o que vaza: sem ela o card com overflow-hidden fica rolável na
// horizontal, e selecionar o código arrastando o mouse empurra o conteúdo para o lado.
export function BrandWatermark({
  src,
  className,
  align = 'right',
  aboveTheFold = false,
}: {
  src?: string;
  className: string;
  align?: keyof typeof WATERMARK_POSITION;
  aboveTheFold?: boolean;
}) {
  if (!src) return null;

  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <span className={`absolute opacity-[0.14] ${className}`}>
        <Image
          src={resolveMediaUrl(src)}
          alt=""
          fill
          sizes="(min-width: 1024px) 400px, 320px"
          loading={aboveTheFold ? 'eager' : 'lazy'}
          className={`object-contain ${WATERMARK_POSITION[align]}`}
        />
      </span>
    </span>
  );
}

export function SectionHeading({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="scroll-mt-40 font-condensada text-[34px] font-black leading-[0.95] tracking-[-0.01em] text-marinho font-stretch-extra-condensed md:text-[44px]"
    >
      {children}
    </h2>
  );
}

export function CouponFaq({ items }: { items: CouponFAQ[] }) {
  return (
    <div className="border-t-2 border-marinho">
      {items.map((item, index) => (
        <details key={item.question} open={index === 0} className="group border-b-2 border-marinho">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 py-3 text-[15px] font-extrabold leading-[22px] text-marinho focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-marinho md:text-base [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <ChevronDown
              aria-hidden="true"
              className="h-[22px] w-[22px] shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
            />
          </summary>
          <p className="max-w-[68ch] pb-4 text-sm font-medium leading-[22px] text-marinho-suave md:text-[15px] md:leading-6">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

export const asSentence = (text: string) => {
  const trimmed = text.trim();
  return `${trimmed.charAt(0).toUpperCase()}${trimmed.slice(1)}${/[.!?]$/.test(trimmed) ? '' : '.'}`;
};
