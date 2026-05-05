'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Copy, X } from 'lucide-react';
import { getActiveCoupons } from '@/lib/couponsData';

const DISMISS_KEY = 'coupon_strip_dismissed_until';
const DISMISS_HOURS = 24;
const activeCoupons = getActiveCoupons();

export function CouponStrip() {
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Checar localStorage apenas no client, após hydration
  useEffect(() => {
    try {
      const dismissedUntil = window.localStorage.getItem(DISMISS_KEY);
      if (dismissedUntil && new Date(dismissedUntil).getTime() > Date.now()) {
        setDismissed(true);
        return;
      }
      if (dismissedUntil) window.localStorage.removeItem(DISMISS_KEY);
    } catch {
      // ignora erro de localStorage
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (paused || !mounted || activeCoupons.length < 2) return undefined;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % activeCoupons.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [mounted, paused]);

  // Renderiza null no server e na hidratação inicial — evita mismatch
  if (!mounted || dismissed || activeCoupons.length === 0) return null;

  const coupon = activeCoupons[activeIndex];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coupon.code);
      setCopiedIndex(activeIndex);
      window.setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      setCopiedIndex(null);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    try {
      const dismissedUntil = new Date(Date.now() + DISMISS_HOURS * 60 * 60 * 1000).toISOString();
      window.localStorage.setItem(DISMISS_KEY, dismissedUntil);
    } catch {
      // dismiss vale para a sessão mesmo sem localStorage
    }
  };

  return (
    <section
      className="bg-[#0f1d3a]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-3 pb-2 sm:px-6 lg:px-0">
        <div
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-3 py-2 shadow-[0_8px_28px_rgba(0,0,0,0.14)] backdrop-blur-md sm:gap-3"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Logo da marca */}
          <span className="relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/18 bg-white text-[10px] font-black uppercase text-[#0f1d3a] shadow-inner">
            {coupon.brandLogo ? (
              <Image
                src={coupon.brandLogo}
                alt={coupon.brandLogoAlt || `Marca ${coupon.brand}`}
                fill
                sizes="28px"
                className="object-contain p-0.5"
              />
            ) : (
              coupon.brandIcon
            )}
          </span>

          {/* Conteúdo central — visível em todos os tamanhos */}
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <span className="shrink-0 text-xs font-black uppercase tracking-[0.12em] text-[#ff9158]">
              {coupon.brand}
            </span>
            <code className="shrink-0 rounded-full border border-[#ffd23f]/24 bg-[#ffd23f]/12 px-2 py-0.5 font-mono text-[0.72rem] font-black tracking-[0.06em] text-[#ffd23f]">
              {coupon.code}
            </code>
            <span className="shrink-0 rounded-full bg-[#ff6b35]/20 px-2 py-0.5 text-[0.7rem] font-black text-[#ff9158]">
              {coupon.discount}
            </span>
            <span className="hidden truncate text-xs text-white/68 sm:inline">
              {coupon.shortDescription}
            </span>
          </div>

          {/* Ações */}
          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b35]"
              aria-label={`Copiar cupom ${coupon.code}`}
            >
              {copiedIndex === activeIndex ? (
                <><Check className="h-3 w-3" /><span className="hidden xs:inline sm:inline">Copiado</span></>
              ) : (
                <><Copy className="h-3 w-3" /><span className="hidden sm:inline">Copiar</span></>
              )}
            </button>

            <Link
              href="/cupons"
              className="hidden rounded-full bg-[#ffd23f]/15 px-2.5 py-1 text-[11px] font-bold text-[#ffd23f] transition-colors hover:bg-[#ffd23f]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd23f] xs:inline-flex sm:inline-flex"
            >
              Ver cupons
            </Link>

            {/* Paginação por pontos — só desktop */}
            {activeCoupons.length > 1 && (
              <div
                className="ml-1 hidden items-center gap-1 sm:flex"
                role="tablist"
                aria-label="Selecionar cupom"
              >
                {activeCoupons.map((item, index) => (
                  <button
                    key={item.slug}
                    type="button"
                    role="tab"
                    aria-selected={index === activeIndex}
                    aria-label={`Cupom ${index + 1} de ${activeCoupons.length}`}
                    onClick={() => setActiveIndex(index)}
                    className={`h-1.5 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b35] ${
                      index === activeIndex
                        ? 'w-4 bg-[#ff9158]'
                        : 'w-1.5 bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={handleDismiss}
              className="ml-0.5 rounded-full p-1 text-white/56 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b35]"
              aria-label="Fechar barra de cupons por 24 horas"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
