'use client';

import { useEffect, useRef, useState } from 'react';
import { List } from 'lucide-react';
import { BottomSheet } from '@/components/editorial';
import { ReviewSidebarContent } from './ReviewSidebar';
import type { Review, ReviewKind } from '@/lib/content';
import type { TocItem } from './ReviewTableOfContents';

export interface ReviewMobileBottomBarProps {
  review?: Review;
  kind?: ReviewKind;
  tocItems?: TocItem[];
  effectiveCta?: { url: string; label: string; text?: string } | null;
}

export function ReviewMobileBottomBar({
  review,
  kind,
  tocItems = [],
  effectiveCta,
}: ReviewMobileBottomBarProps): React.ReactElement | null {
  const [visible, setVisible] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const floatingDrawerTriggerRef = useRef<HTMLButtonElement>(null);

  const hasSidebar = Boolean(review && kind) && (tocItems.length > 0 || review.coupon || effectiveCta?.url);

  useEffect(() => {
    if (!hasSidebar) return undefined;

    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const threshold = 280;
      if (scrollY > threshold) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [hasSidebar]);

  if (!hasSidebar) return null;

  return (
    <>
      {/* Floating drawer trigger (persistent, appears after scroll) */}
      {visible && (
        <button
          ref={floatingDrawerTriggerRef}
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="fixed bottom-4 left-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#4a5568] border border-[#1a4d2e]/15 shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all motion-safe:hover:-translate-y-0.5 hover:text-[#1a4d2e] motion-safe:hover:shadow-[0_4px_12px_rgba(0,0,0,0.14)] lg:hidden print:hidden"
          aria-label="Abrir sumário"
        >
          <List size={18} />
        </button>
      )}

      {/* TOC Drawer */}
      {review && kind && (
        <BottomSheet
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          ariaLabel="Nesta análise"
          returnFocusRef={floatingDrawerTriggerRef}
        >
          <ReviewSidebarContent
            review={review}
            kind={kind}
            tocItems={tocItems}
            effectiveCta={effectiveCta}
            onTocLinkClick={() => setDrawerOpen(false)}
          />
        </BottomSheet>
      )}
    </>
  );
}
