'use client';

import { StickyNote } from 'lucide-react';
import { isLineAnchor } from '@/lib/pretext/lineAnchorCodec';
import { EditorialNotePill } from './EditorialNotePill';
import type { EditorialNoteData } from '@/lib/content';

export interface RichMarginNoteProps {
  note: EditorialNoteData;
  /**
   * Absolute vertical offset (px) within the positioning container where the anchored line sits.
   * Provided by the line-measurement provider (MarginNoteRail).
   * Undefined = not yet positioned.
   */
  lineTop?: number;
  /**
   * Horizontal offset (px) from the left edge of the positioning container to the prose element.
   * Used to position the note in the left gutter: left = noteLeft - 244px.
   * Provided by MarginNoteRail after measuring the prose element.
   */
  noteLeft?: number;
  /**
   * When true, only render the margin note aside (no internal pill fallback).
   * Used by MarginNoteRail which handles the fallback chain directly.
   * Default: false (for backward compatibility with direct usage).
   */
  marginNoteOnly?: boolean;
}

/**
 * RichMarginNote — editorial note rendering for line-anchored notes
 *
 * Delegates to EditorialNotePill for non-line-anchor notes (keeps existing behavior).
 * For line-anchored notes when marginNoteOnly=false (default):
 * - Mobile (<lg): shows pill fallback
 * - Desktop (≥lg): renders a margin note aside with connector line
 *
 * When marginNoteOnly=true (used by MarginNoteRail):
 * - Only renders the margin note aside (no internal pill fallback)
 * - MarginNoteRail handles the breakpoint/fallback chain directly
 *
 * Positioning: when lineTop is defined, the aside is positioned absolutely within
 * a relative container (provided by the parent, e.g., MarginNoteRail).
 * When undefined, renders at top of margin stack in static flow (fallback, no layout jump).
 */
export function RichMarginNote({ note, lineTop, noteLeft, marginNoteOnly = false }: RichMarginNoteProps): React.ReactElement {
  // Non-line-anchor notes: delegate to existing pill (all breakpoints)
  if (!note.anchor || !isLineAnchor(note.anchor)) {
    return <EditorialNotePill note={note} />;
  }

  const bodyParagraphs = note.body.split('\n\n').filter(Boolean);

  // When marginNoteOnly is true, only render the aside (no internal pill)
  // MarginNoteRail handles the breakpoint/fallback logic directly
  if (marginNoteOnly) {
    return (
      <aside
        role="note"
        aria-label={note.label}
        className={`max-w-[220px] bg-[#fff4bf] rounded-lg p-3 shadow-soft ${lineTop === undefined ? 'richnote-fade-in' : ''}`}
        style={{
          transform: 'rotate(-0.35deg)',
          ...(lineTop !== undefined && noteLeft !== undefined && {
            position: 'absolute',
            top: `${lineTop}px`,
            left: `${noteLeft - 244}px`,
          }),
        }}
      >
        {/* Header: icon + label */}
        <div className="mb-2 flex items-center gap-2">
          <StickyNote size={13} className="flex-shrink-0 text-[#1a4d2e]" />
          <span className="text-xs font-semibold text-[#1a4d2e]">{note.label}</span>
        </div>

        {/* Body: paragraphs */}
        <div>
          {bodyParagraphs.map((paragraph, index) => (
            <p
              key={`${note.id ?? note.label}-${index}`}
              className="mt-2 text-xs text-[#4a5568] leading-relaxed first:mt-0"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Connector line: dashed line extending toward text column */}
        <div
          className="richnote-connector absolute top-1/2 -left-6 w-6 h-px border-t border-dashed border-[#ff6b35]/60"
          aria-hidden="true"
        />
      </aside>
    );
  }

  // Default behavior: render both mobile pill and desktop margin note
  return (
    <>
      {/* Mobile: show pill (handled by max-lg: block, lg: hidden) */}
      <div className="lg:hidden">
        <EditorialNotePill note={note} />
      </div>

      {/* Desktop margin note (visible only at lg and above) */}
      <aside
        role="note"
        aria-label={note.label}
        className={`hidden lg:block max-w-[220px] bg-[#fff4bf] rounded-lg p-3 shadow-soft print:hidden ${lineTop === undefined ? 'richnote-fade-in' : ''}`}
        style={{
          transform: 'rotate(-0.35deg)',
          ...(lineTop !== undefined && noteLeft !== undefined && {
            position: 'absolute',
            top: `${lineTop}px`,
            left: `${noteLeft - 244}px`,
          }),
        }}
      >
        {/* Header: icon + label */}
        <div className="mb-2 flex items-center gap-2">
          <StickyNote size={13} className="flex-shrink-0 text-[#1a4d2e]" />
          <span className="text-xs font-semibold text-[#1a4d2e]">{note.label}</span>
        </div>

        {/* Body: paragraphs */}
        <div>
          {bodyParagraphs.map((paragraph, index) => (
            <p
              key={`${note.id ?? note.label}-${index}`}
              className="mt-2 text-xs text-[#4a5568] leading-relaxed first:mt-0"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Connector line: dashed line extending toward text column */}
        <div
          className="richnote-connector absolute top-1/2 -left-6 w-6 h-px border-t border-dashed border-[#ff6b35]/60"
          aria-hidden="true"
        />
      </aside>
    </>
  );
}
