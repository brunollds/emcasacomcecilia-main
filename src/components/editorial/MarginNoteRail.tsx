'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { RichMarginNote } from './RichMarginNote';
import { EditorialNotePill } from './EditorialNotePill';
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
 * Wraps a prose section and renders line-anchored notes with adaptive fallbacks:
 * - Mobile (<xl): EditorialNotePill at top of section (visible, discoverable)
 * - Desktop (≥xl) with gutter (≥250px): absolute margin note at prose_left - 244px
 * - Desktop (≥xl) without gutter: pill fallback
 *
 * Each note is rendered as TWO siblings, visibility controlled by state + classes:
 * 1. Mobile pill: `<div className="xl:hidden">` — always visible on mobile/tablet
 * 2. Desktop margin note: `<aside className="hidden ${hasGutterSpace ? 'xl:block' : 'xl:hidden'}">` — visible only with gutter
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
  const [noteLeft, setNoteLeft] = useState<number>(0);

  // Filter notes anchored to this section via line anchor
  const anchoredNotes = notes.filter((note) => {
    if (!note.anchor) return false;
    const lineAnchor = parseLineAnchor(note.anchor);
    return lineAnchor !== null && lineAnchor.sectionIndex === sectionIndex;
  });

  const resolveLineTop = useCallback(() => {
    if (!proseRef.current || !containerRef.current) return;

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

    // Calculate left position of prose element relative to container
    const proseRect = proseRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const proseLeftRelative = proseRect.left - containerRect.left;
    setNoteLeft(proseLeftRelative);

    // Check if there's real gutter space (left distance to viewport edge)
    const gutterSpace = proseRect.left; // Distance to viewport left in px

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
      {/* Mobile fallback pills: visible on <xl breakpoints */}
      {anchoredNotes.map((note) => (
        <div key={`mobile-${note.id || note.label}`} className="xl:hidden mb-4">
          <EditorialNotePill note={note} />
        </div>
      ))}

      {/* Prose block with ref for measurement */}
      <div ref={proseRef}>{children}</div>

      {/* Desktop margin notes: visible on ≥xl with gutter space only (print:hidden already in RichMarginNote) */}
      {anchoredNotes.map((note) => {
        const lineTop = linePositions.get(note.id || note.label);
        return (
          <div
            key={`desktop-${note.id || note.label}`}
            className={`hidden ${hasGutterSpace ? 'xl:block' : 'xl:hidden'} print:hidden`}
          >
            <RichMarginNote
              note={note}
              lineTop={lineTop}
              noteLeft={noteLeft}
              marginNoteOnly
            />
          </div>
        );
      })}
    </div>
  );
}
