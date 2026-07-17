'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Check, ChevronDown, Copy } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

type CopyButtonProps = {
  code: string;
  label?: string;
  copiedLabel?: string;
  ariaLabel?: string;
  variant?: 'primary' | 'ghost' | 'outline';
  className?: string;
  brand?: string;
  placement?: 'coupon_page' | 'bottom_bar' | 'review_inline' | 'coupon_page_tiers';
};

export function CopyButton({
  code,
  label = 'Copiar código',
  copiedLabel = 'Copiado!',
  ariaLabel,
  variant = 'primary',
  className = '',
  brand,
  placement = 'coupon_page',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(code);
      trackEvent('coupon_copy', {
        coupon_code: code,
        ...(brand && { brand }),
        placement,
      });
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const variantClass =
    variant === 'primary'
      ? 'bg-white px-4 py-2.5 text-[#862f0e] hover:bg-white/90 focus-visible:ring-white'
      : variant === 'outline'
        ? 'border border-black/10 bg-[#fef9f3] px-2.5 py-1.5 text-[#0f1419] hover:bg-[#fdeedd] focus-visible:ring-[#ff6b35]'
        : 'border border-white/30 bg-white/15 px-4 py-2.5 text-white hover:bg-white/25 focus-visible:ring-white';

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variantClass} ${className}`}
      aria-label={ariaLabel || `Copiar código ${code}`}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          {copiedLabel}
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          {label}
        </>
      )}
    </button>
  );
}

type FAQItem = {
  question: string;
  answer: string;
};

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  return (
    <div className="divide-y divide-black/8">
      {items.map((item) => (
        <details key={item.question} className="group py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-[#0f1419] transition-colors hover:text-[#ff6b35]">
            <span>{item.question}</span>
            <ChevronDown className="h-4 w-4 shrink-0 text-[#0f1419]/45 transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-[#0f1419]/68">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

type CouponStoreLinkProps = {
  href: string;
  label?: string;
  couponCode?: string;
  brand?: string;
  placement?: 'coupon_page' | 'bottom_bar' | 'review_inline';
  className?: string;
};

export function CouponStoreLink({
  href,
  label = 'Ir para a loja',
  couponCode,
  brand,
  placement = 'coupon_page',
  className = '',
}: CouponStoreLinkProps) {
  const handleClick = () => {
    trackEvent('coupon_store_click', {
      ...(couponCode && { coupon_code: couponCode }),
      ...(brand && { brand }),
      placement,
      url: href,
    });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
    >
      {label}
    </a>
  );
}

type CouponPillCardProps = {
  brand: string;
  brandIcon: string;
  brandLogo?: string;
  brandLogoAlt?: string;
  code: string;
  shortDescription: string;
  discount: string;
  href: string;
  className?: string;
};

export function CouponPillCard({
  brand,
  brandIcon,
  brandLogo,
  brandLogoAlt,
  code,
  shortDescription,
  discount,
  href,
  className = '',
}: CouponPillCardProps) {
  return (
    <Link
      href={href}
      className={`group flex min-w-0 max-w-full items-center gap-2 rounded-2xl border border-black/8 bg-white p-3 shadow-soft transition-all hover:-translate-y-0.5 hover:border-[#ff6b35]/35 hover:shadow-md sm:gap-3 sm:p-4 ${className}`}
    >
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-black/8 bg-white text-sm font-black text-[#862f0e] shadow-inner">
        {brandLogo ? (
          <Image
            src={brandLogo}
            alt={brandLogoAlt || `Marca ${brand}`}
            fill
            sizes="48px"
            className="object-contain p-1.5"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#faece7] to-[#f5c4b3]">
            {brandIcon}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate text-sm font-black text-[#0f1419]">{brand}</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-[#0f1419]/38 transition-colors group-hover:text-[#ff6b35]" />
        </div>
        <p className="mt-0.5 truncate text-xs text-[#0f1419]/58">
          <code className="font-mono font-black text-[#0f1419]">{code}</code>
          {' · '}
          {shortDescription}
        </p>
      </div>
      <span className="max-w-[38%] shrink-0 truncate rounded-full bg-[#ffd23f] px-2.5 py-1 text-xs font-black text-[#4a2400] sm:px-3">
        {discount}
      </span>
    </Link>
  );
}
