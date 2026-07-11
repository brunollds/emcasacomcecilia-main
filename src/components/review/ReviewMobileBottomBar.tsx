'use client';

import { useEffect, useState } from 'react';
import { Check, Copy, ExternalLink, X } from 'lucide-react';
import { getCouponCopyLabels, type CouponCopyLocale } from './couponCopyLocale';

export interface ReviewMobileBottomBarProps {
  coupon?: string;
  cta?: { url: string; label: string } | null;
  locale?: CouponCopyLocale;
}

function getShortCtaLabel(label: string, locale: CouponCopyLocale): string {
  if (label.length <= 16) return label;
  return getCouponCopyLabels(locale).shortStoreCta;
}

export function ReviewMobileBottomBar({ coupon, cta, locale = 'pt' }: ReviewMobileBottomBarProps): React.ReactElement | null {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const labels = getCouponCopyLabels(locale);

  const hasCoupon = Boolean(coupon);
  const hasCta = Boolean(cta?.url && cta?.label);

  useEffect(() => {
    if (!hasCoupon && !hasCta) return undefined;

    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const threshold = 280;
      if (scrollY > threshold && !dismissed) {
        setVisible(true);
      } else if (scrollY <= threshold) {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed, hasCoupon, hasCta]);

  if (!hasCoupon && !hasCta) return null;

  const handleCopy = async () => {
    if (!coupon) return;
    try {
      await navigator.clipboard.writeText(coupon);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissed(true);
    setVisible(false);
  };

  const ctaLabel = cta?.label ? getShortCtaLabel(cta.label, locale) : '';

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 lg:hidden ${visible && !dismissed ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-300 ease-out`}
      aria-label="Barra de cupom mobile"
    >
      {/* Gradiente sutil na base para contraste sobre conteúdo claro */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-lg px-3 pt-2" style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}>
        <div className="flex items-center gap-2 p-2">
          {/* Botão Copiar Cupom */}
          {hasCoupon && (
            <button
              type="button"
              onClick={handleCopy}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-3 py-3 text-sm font-bold text-[#1a4d2e] shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all active:scale-95 border border-[#1a4d2e]/10 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.16)]"
              aria-label={labels.copyCoupon(coupon)}
            >
              <span className="font-mono tracking-[0.04em]">{coupon}</span>
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#1a4d2e] text-white">
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </span>
            </button>
          )}

          {/* Botão Ir para Loja */}
          {hasCta && (
            <a
              href={cta!.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff6b35] px-4 py-3 text-sm font-bold text-white shadow-[0_4px_16px_rgba(255,107,53,0.35)] transition-all active:scale-95 hover:-translate-y-0.5 hover:bg-[#e55a26] hover:shadow-[0_6px_20px_rgba(255,107,53,0.45)] ${hasCoupon ? 'flex-1' : 'w-full'}`}
            >
              {ctaLabel}
              <ExternalLink size={15} />
            </a>
          )}

          {/* Fechar */}
          <button
            type="button"
            onClick={handleDismiss}
            className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#4a5568] shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-0.5 hover:text-[#1a4d2e] hover:shadow-[0_4px_12px_rgba(0,0,0,0.14)]"
            aria-label={labels.closeBar}
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
