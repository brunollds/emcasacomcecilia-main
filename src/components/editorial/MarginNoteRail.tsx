'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { RichMarginNote } from './RichMarginNote';
import { parseLineAnchor } from '@/lib/pretext/lineAnchorCodec';
import type { EditorialNoteData } from '@/lib/content';

export interface MarginNoteRailProps {
  /** Editorial notes that may anchor to this section. */
  notes: EditorialNoteData[];
  /** 0-based section index for filtering notes by anchor. */
  sectionIndex: number;
  /** The prose block (children) to wrap and measure. */
  children: React.ReactNode;
}

/**
 * MarginNoteRail — positions line-anchored editorial notes in the left gutter.
 *
 * Wraps a prose section and renders line-anchored notes as absolute-positioned
 * margin notes in the left gutter (notebook metaphor). Falls back to inline
 * EditorialNotePill when:
 * - Viewport is <lg (via hidden xl:block in RichMarginNote)
 * - Left gutter is <250px (no real margin space)
 *
 * Line positioning:
 * - Reads prose element height + computed line-height after mount/resize
 * - Calculates lineTop = (lineNumber - 1) * computedLineHeight
 * - Approximation: assumes standard 720px width for line measurement (dicas convention)
 *
 * Collision handling:
 * - If two notes are closer than 96px, stacks the second at prevTop + 96
 * - Simple cascade, no solver
 */
export function MarginNoteRail({
  notes,
  sectionIndex,
  children,
}: MarginNoteRailProps): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const proseRef = useRef<HTMLDivElement>(null);

  const [linePositions, setLinePositions] = useState<Map<string, number>>(new Map());
  const [hasGutterSpace, setHasGutterSpace] = useState(false);

  // Filter notes anchored to this section via line anchor
  const anchoredNotes = notes.filter((note) => {
    if (!note.anchor) return false;
    const lineAnchor = parseLineAnchor(note.anchor);
    return lineAnchor !== null && lineAnchor.sectionIndex === sectionIndex;
  });

  const resolveLineTop = useCallback(() => {
    if (!proseRef.current) return;

    // Get computed line-height; fallback to 28px if unavailable
    const computed = getComputedStyle(proseRef.current);
    const lineHeightStr = computed.lineHeight;
    let computedLineHeight = 28;

    if (lineHeightStr && lineHeightStr !== 'normal') {
      const parsed = parseFloat(lineHeightStr);
      if (!isNaN(parsed)) {
        computedLineHeight = parsed;
      }
    }

    // Check if there's real gutter space (left distance to viewport edge)
    const rect = proseRef.current.getBoundingClientRect();
    const gutterSpace = rect.left; // Distance to viewport left in px

    // Gate: only show margin notes if gutter >= 250px AND we're in a large viewport
    // RichMarginNote handles the <lg fallback; this rail adds the >=lg-but-no-space fallback
    const canShowMarginNotes = gutterSpace >= 250;
    setHasGutterSpace(canShowMarginNotes);

    // Calculate line top positions for each anchored note
    const positions = new Map<string, number>();
    const sortedNotes = [...anchoredNotes].sort((a, b) => {
      const aLine = parseLineAnchor(a.anchor!)?.lineNumber ?? 0;
      const bLine = parseLineAnchor(b.anchor!)?.lineNumber ?? 0;
      return aLine - bLine;
    });

    let prevResolvedTop = -Infinity;

    for (const note of sortedNotes) {
      const lineAnchor = parseLineAnchor(note.anchor!);
      if (!lineAnchor) continue;

      let lineTop = (lineAnchor.lineNumber - 1) * computedLineHeight;

      // Collision avoidance: if within 96px of previous note, stack at prevTop + 96
      if (lineTop - prevResolvedTop < 96 && prevResolvedTop !== -Infinity) {
        lineTop = prevResolvedTop + 96;
      }

      prevResolvedTop = lineTop;
      positions.set(note.id || note.label, lineTop);
    }

    setLinePositions(positions);
  }, [anchoredNotes]);

  // Measure on mount
  useEffect(() => {
    resolveLineTop();
  }, [resolveLineTop]);

  // Re-measure on resize
  useEffect(() => {
    if (!proseRef.current) return;

    const observer = new ResizeObserver(() => {
      resolveLineTop();
    });

    observer.observe(proseRef.current);
    return () => observer.disconnect();
  }, [resolveLineTop]);

  return (
    <div ref={containerRef} className="relative">
      {/* Prose block with ref for measurement */}
      <div ref={proseRef}>{children}</div>

      {/* Margin notes rail (print:hidden already in RichMarginNote) */}
      {hasGutterSpace &&
        anchoredNotes.map((note) => {
          const lineTop = linePositions.get(note.id || note.label);
          return (
            <RichMarginNote
              key={note.id || note.label}
              note={note}
              lineTop={lineTop}
            />
          );
        })}
    </div>
  );
}
