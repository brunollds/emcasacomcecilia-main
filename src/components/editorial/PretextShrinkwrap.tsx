'use client';

import { useMemo, useRef } from 'react';
import { layout, prepare } from '@chenglou/pretext';
import { supportsPretextSafe, useElementWidth } from '@/lib/pretext';

export interface PretextShrinkwrapProps {
  text: string;
  font: string;
  lineHeight: number;
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  minWidth?: number;
  maxWidthRatio?: number;
}

function measureLineCount(text: string, font: string, width: number, lineHeight: number): number | null {
  try {
    const prepared = prepare(text, font);
    return layout(prepared, width, lineHeight).lineCount;
  } catch {
    return null;
  }
}

function findShrinkWidth(text: string, font: string, width: number, lineHeight: number, minWidth: number): number | null {
  const targetLines = measureLineCount(text, font, width, lineHeight);
  if (!targetLines || width <= minWidth) return null;

  let low = minWidth;
  let high = width;

  for (let i = 0; i < 10; i += 1) {
    const mid = Math.round((low + high) / 2);
    const lines = measureLineCount(text, font, mid, lineHeight);

    if (!lines) return null;

    if (lines > targetLines) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return Math.max(minWidth, high);
}

/**
 * Reduz a largura de blocos editoriais curtos sem medir DOM.
 * O texto continua renderizado como HTML normal; Pretext só calcula a largura.
 */
export function PretextShrinkwrap({
  text,
  font,
  lineHeight,
  children,
  className = '',
  as: Component = 'div',
  minWidth = 220,
  maxWidthRatio = 1,
}: PretextShrinkwrapProps): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const containerWidth = useElementWidth(ref);

  const shrinkWidth = useMemo(() => {
    if (!supportsPretextSafe() || containerWidth <= 0 || text.trim().length === 0) {
      return null;
    }

    const maxWidth = Math.floor(containerWidth * maxWidthRatio);
    return findShrinkWidth(text, font, maxWidth, lineHeight, minWidth);
  }, [containerWidth, font, lineHeight, maxWidthRatio, minWidth, text]);

  const Tag = Component as React.ElementType;

  return (
    <Tag ref={ref} data-pretext-shrinkwrap={shrinkWidth ? 'measured' : 'fallback'}>
      <div
        className={className}
        style={shrinkWidth ? { width: `${shrinkWidth}px`, maxWidth: '100%' } : undefined}
      >
        {children}
      </div>
    </Tag>
  );
}
