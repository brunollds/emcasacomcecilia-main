'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { getCouponCopyLabels, type CouponCopyLocale } from './couponCopyLocale';

export interface InlineCouponCopyProps {
  coupon: string;
  locale?: CouponCopyLocale;
}

export function InlineCouponCopy({ coupon, locale = 'pt' }: InlineCouponCopyProps): React.ReactElement {
  const [copied, setCopied] = useState(false);
  const labels = getCouponCopyLabels(locale);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coupon);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mb-6 inline-flex flex-wrap items-center gap-3 rounded-xl border border-[#1a4d2e]/10 bg-[#faf8f3] px-4 py-2.5">
      <span className="text-sm text-[#4a5568]">
        {labels.inlinePrefix}
      </span>
      <span className="font-mono text-base font-black tracking-[0.04em] text-[#1a4d2e]">
        {coupon}
      </span>
      <span className="text-sm text-[#4a5568]">
        {labels.inlineSuffix}
      </span>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 rounded-lg bg-[#1a4d2e] px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-[#ff6b35] active:scale-95"
        aria-label={labels.copyCoupon(coupon)}
      >
        {copied ? <Check size={13} /> : <Copy size={13} />}
        {copied ? labels.copied : labels.copy}
      </button>
    </div>
  );
}
