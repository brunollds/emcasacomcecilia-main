'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy, ExternalLink, X, List } from 'lucide-react';
import { copyTextWithFallback } from '@/lib/clipboardUtils';
import { BottomSheet } from '@/components/editorial';
import { ReviewSidebarContent, type ReviewSidebarContentProps } from './ReviewSidebar';
import { getCouponCopyLabels, type CouponCopyLocale } from './couponCopyLocale';
import type { Review, ReviewKind } from '@/lib/content';
import type { TocItem } from './ReviewTableOfContents';

export interface ReviewMobileBottomBarProps {
  coupon?: string;
  cta?: { url: string; label: string } | null;
  locale?: CouponCopyLocale;
  review?: Review;
  kind?: ReviewKind;
  tocItems?: TocItem[];
  effectiveCta?: { url: string; label: string; text?: string } | null;
}

function getShortCtaLabel(label: string, locale: CouponCopyLocale): string {
  if (label.length <= 16) return label;
  return getCouponCopyLabels(locale).shortStoreCta;
}

export function ReviewMobileBottomBar({
  coupon,
  cta,
  locale = 'pt',
  review,
  kind,
  tocItems = [],
  effectiveCta,
}: ReviewMobileBottomBarProps): React.ReactElement | null {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  const [barState, setBarState] = useState<'full' | 'dismissed'>('full');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const drawerTriggerRef = useRef<HTMLButtonElement>(null);
  const labels = getCouponCopyLabels(locale);

  const hasCoupon = Boolean(coupon);
  const hasCta = Boolean(cta?.url && cta?.label);
  const hasSidebar = Boolean(review && kind) && (tocItems.length > 0 || review.coupon || effectiveCta?.url);

  useEffect(() => {
    if (!hasCoupon && !hasCta) return undefined;

    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const threshold = 280;
      if (scrollY > threshold && barState === 'full') {
        setVisible(true);
      } else if (scrollY <= threshold) {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [barState, hasCoupon, hasCta]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!hasCoupon && !hasCta && !hasSidebar) return null;

  const handleCopy = async () => {
    if (!coupon) return;

    const success = await copyTextWithFallback(coupon);
    if (!success) return;

    setCopied(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setCopied(false);
    }, 2200);
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBarState('dismissed');
    setVisible(false);
  };

  const ctaLabel = cta?.label ? getShortCtaLabel(cta.label, locale) : '';

  const handleDrawerTocClick = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      {/* Full bar: coupon + CTA + drawer trigger + close */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 lg:hidden print:hidden ${visible && barState === 'full' ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-300 ease-out`}
        aria-label="Barra de cupom mobile"
      >
        {/* Gradiente sutil na base para contraste sobre conteúdo claro */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent" aria-hidden="true" />

        <div className="relative mx-auto max-w-lg px-3 pt-2" style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}>
          <div className="flex items-center gap-2 p-2">
            {/* Botão TOC Drawer (primeiro) */}
            {hasSidebar && (
              <button
                ref={drawerTriggerRef}
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#4a5568] shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all motion-safe:hover:-translate-y-0.5 hover:text-[#1a4d2e] motion-safe:hover:shadow-[0_4px_12px_rgba(0,0,0,0.14)]"
                aria-label="Abrir sumário"
              >
                <List size={18} />
              </button>
            )}

            {/* Botão Copiar Cupom */}
            {hasCoupon && (
              <button
                type="button"
                onClick={handleCopy}
                className={`flex flex-1 items-center justify-center gap-2 rounded-full border-2 px-3 py-2 text-sm font-bold transition-all active:scale-95 motion-safe:hover:-translate-y-0.5 ${
                  copied
                    ? 'border-[#1a7f37] bg-[#f0fdf4] text-[#1a7f37] shadow-[0_4px_16px_rgba(26,127,55,0.12)] motion-safe:hover:shadow-[0_6px_20px_rgba(26,127,55,0.16)]'
                    : 'border-[#1a4d2e] text-[#1a4d2e] hover:bg-[#1a4d2e]/5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] motion-safe:hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]'
                }`}
                aria-label={copied ? 'Cupom copiado' : labels.copyCoupon(coupon)}
              >
                <span className="font-mono font-black tracking-[0.08em]">{coupon}</span>
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            )}

            {/* Botão Ir para Loja */}
            {hasCta && (
              <a
                href={cta!.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff6b35] px-4 py-3 text-sm font-bold text-white shadow-[0_4px_16px_rgba(255,107,53,0.35)] transition-all active:scale-95 motion-safe:hover:-translate-y-0.5 hover:bg-[#e55a26] motion-safe:hover:shadow-[0_6px_20px_rgba(255,107,53,0.45)] ${hasCoupon ? 'flex-1' : 'w-full'}`}
              >
                {ctaLabel}
                <ExternalLink size={15} />
              </a>
            )}

            {/* Close: dismisses coupon+CTA only */}
            <button
              type="button"
              onClick={handleDismiss}
              className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#4a5568] shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all motion-safe:hover:-translate-y-0.5 hover:text-[#1a4d2e] motion-safe:hover:shadow-[0_4px_12px_rgba(0,0,0,0.14)]"
              aria-label={labels.closeBar}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Floating drawer trigger (persistent after dismissal) */}
      {hasSidebar && barState === 'dismissed' && (
        <button
          ref={drawerTriggerRef}
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="fixed bottom-4 left-4 z-40 lg:hidden print:hidden inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#4a5568] border border-[#1a4d2e]/15 shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all motion-safe:hover:-translate-y-0.5 hover:text-[#1a4d2e] motion-safe:hover:shadow-[0_4px_12px_rgba(0,0,0,0.14)]"
          aria-label="Abrir sumário"
        >
          <List size={18} />
        </button>
      )}

      {/* TOC Drawer */}
      {hasSidebar && review && kind && (
        <BottomSheet
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          ariaLabel="Nesta análise"
          returnFocusRef={drawerTriggerRef}
        >
          <ReviewSidebarContent
            review={review}
            kind={kind}
            tocItems={tocItems}
            effectiveCta={effectiveCta}
            onTocLinkClick={handleDrawerTocClick}
          />
        </BottomSheet>
      )}
    </>
  );
}
