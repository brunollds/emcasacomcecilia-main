'use client';

import {
  Box,
  Check,
  Droplets,
  Gauge,
  Grid3X3,
  HardHat,
  Layers,
  Maximize,
  Move,
  Package,
  Plug,
  Ruler,
  Scale,
  Shield,
  Tag,
  Timer,
  Weight,
  Zap,
} from 'lucide-react';
import { EditorialReveal } from '@/components/editorial';
import type { ProductSpecItem } from '@/lib/content';

export interface ReviewProductSpecGridProps {
  specs: ProductSpecItem[];
}

function pickIcon(key: string): React.ReactElement {
  const normalized = key.toLowerCase();

  if (normalized.includes('peso') || normalized.includes('kg')) return <Weight className="h-5 w-5" />;
  if (normalized.includes('voltagem') || normalized.includes('volts') || normalized.includes('v')) return <Zap className="h-5 w-5" />;
  if (normalized.includes('marca')) return <Tag className="h-5 w-5" />;
  if (normalized.includes('dimens') || normalized.includes('largura') || normalized.includes('altura') || normalized.includes('profundidade')) return <Maximize className="h-5 w-5" />;
  if (normalized.includes('tamanho') || normalized.includes('medida')) return <Ruler className="h-5 w-5" />;
  if (normalized.includes('material') || normalized.includes('tecido') || normalized.includes('estofado')) return <Layers className="h-5 w-5" />;
  if (normalized.includes('cor')) return <Droplets className="h-5 w-5" />;
  if (normalized.includes('garantia')) return <Shield className="h-5 w-5" />;
  if (normalized.includes('montagem') || normalized.includes('instalação')) return <HardHat className="h-5 w-5" />;
  if (normalized.includes('potência') || normalized.includes('w') || normalized.includes('watts')) return <Gauge className="h-5 w-5" />;
  if (normalized.includes('tempo') || normalized.includes('durabilidade')) return <Timer className="h-5 w-5" />;
  if (normalized.includes('movimento') || normalized.includes('reclin')) return <Move className="h-5 w-5" />;
  if (normalized.includes('pacote') || normalized.includes('entrega')) return <Package className="h-5 w-5" />;
  if (normalized.includes('tomada') || normalized.includes('plug')) return <Plug className="h-5 w-5" />;
  if (normalized.includes('acabamento') || normalized.includes('estilo')) return <Grid3X3 className="h-5 w-5" />;

  return <Box className="h-5 w-5" />;
}

export function ReviewProductSpecGrid({ specs }: ReviewProductSpecGridProps): React.ReactElement {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {specs.map((spec, index) => (
        <EditorialReveal
          key={`${spec.key}-${index}`}
          delay={Math.min(index * 0.04, 0.24)}
          className="flex items-start gap-3 rounded-xl border border-[#1a4d2e]/10 bg-white p-4 shadow-soft transition-transform duration-200 hover:-translate-y-0.5"
        >
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#faf8f3] text-[#1a4d2e]">
            {pickIcon(spec.key)}
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#4a5568]">{spec.key}</p>
            <p className={`mt-0.5 text-sm font-semibold ${spec.highlight ? 'text-[#ff6b35]' : 'text-[#0f1419]'}`}>
              {spec.value}
            </p>
          </div>
        </EditorialReveal>
      ))}
    </div>
  );
}
