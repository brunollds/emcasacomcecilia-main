'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import { openConsentPreferences } from '@/lib/consent';
import type {
  FestivalBlackFridayData,
  FestivalCampaign,
  FestivalLimitedCode,
  FestivalStoreItem,
} from '@/lib/festivalBlackFriday';
import './festival-stage.css';

const BF_START_MS = Date.parse('2026-11-27T00:00:00-03:00');
const BF_FRIDAY_END_MS = Date.parse('2026-11-27T23:59:59-03:00');
const BF_WEEK_END_MS = Date.parse('2026-11-30T23:59:59-03:00');
const SIM_BASE_MS = Date.parse('2026-11-27T10:15:00-03:00');

const noSubscription = () => () => {};

function subscribeClock(onStoreChange: () => void) {
  const id = window.setInterval(onStoreChange, 1000);
  return () => window.clearInterval(id);
}

let previewBootMs: number | null | undefined;
function getClientClockSnapshot(): number {
  if (previewBootMs === undefined) {
    const params = new URLSearchParams(window.location.search);
    previewBootMs = params.get('preview') === '27nov' ? Date.now() : null;
  }
  const now = Date.now();
  // Arredonda ao segundo para não disparar re-render extra no mesmo segundo
  const rounded = Math.floor(now / 1000) * 1000;
  if (previewBootMs !== null) {
    const simOffset = Math.floor(Math.max(0, now - previewBootMs) / 1000) * 1000;
    return SIM_BASE_MS + simOffset;
  }
  return rounded;
}

type WalletEntry = {
  slug: string;
  brand: string;
  code: string;
  discount: string;
  url: string;
};

function normalizeSearch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function fallbackCopyText(code: string) {
  try {
    const ta = document.createElement('textarea');
    ta.value = code;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  } catch {
    // Ignora falha silenciosa de área de transferência restrita
  }
}

function getLiveCampaigns(campaigns: FestivalCampaign[], nowMs: number): FestivalCampaign[] {
  return campaigns.filter((c) => {
    if (c.startsAt && nowMs < Date.parse(c.startsAt)) return false;
    if (c.endsAt && nowMs > Date.parse(c.endsAt)) return false;
    return true;
  });
}

function getActiveLimitedCode(limitedCodes: FestivalLimitedCode[], nowMs: number): FestivalLimitedCode | undefined {
  return limitedCodes.find((lc) => nowMs >= Date.parse(lc.startsAt) && nowMs <= Date.parse(lc.endsAt));
}

function getUpcomingLimitedCode(limitedCodes: FestivalLimitedCode[], nowMs: number): FestivalLimitedCode | undefined {
  return limitedCodes.find((lc) => nowMs < Date.parse(lc.startsAt));
}

function StoreOrb({
  store,
  size = 44,
  eager = false,
}: {
  store: FestivalStoreItem;
  size?: number;
  eager?: boolean;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const bubble = store.mark.bubble;
  const src = bubble?.src ?? store.mark.logo;
  const bg = bubble?.background ?? '#f4efe6';
  const isRound = Boolean(bubble?.round);

  return (
    <span
      className={`bf-orb${isRound ? ' is-round' : ''}`}
      style={{ '--sz': `${size}px`, '--b-bg': bg } as CSSProperties}
      aria-hidden="true"
    >
      {src && !imgFailed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span className="bf-orb-init">{store.mark.initials}</span>
      )}
    </span>
  );
}

export function FestivalStageClient({ data }: { data: FestivalBlackFridayData }) {
  const mounted = useSyncExternalStore(noSubscription, () => true, () => false);
  const serverMs = useMemo(() => Date.parse(data.generatedAtIso), [data.generatedAtIso]);
  const effectiveNowMs = useSyncExternalStore(subscribeClock, getClientClockSnapshot, () => serverMs);

  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [modalSlug, setModalSlug] = useState<string | null>(null);
  const [wallet, setWallet] = useState<Record<string, WalletEntry>>({});
  const [walletOpen, setWalletOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const heroStageRef = useRef<HTMLElement>(null);
  const storiesRailRef = useRef<HTMLDivElement>(null);
  const posterFrameRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const toastTimerRef = useRef<number | null>(null);
  const confettiRef = useRef<{
    particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; color: string; life: number }>;
    raf: number | null;
  }>({ particles: [], raf: null });

  const bySlug = useMemo(() => new Map(data.stores.map((s) => [s.slug, s])), [data.stores]);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToastMsg(null), 3200);
  }, []);

  const burstConfetti = useCallback(
    (clientX: number, clientY: number) => {
      if (paused) return;
      const canvas = confettiCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const colors = ['#d9ff43', '#ff2e93', '#2ef2a0', '#ffffff', '#a855f7'];
      for (let i = 0; i < 24; i++) {
        const angle = (Math.PI * 2 * i) / 24 + (Math.random() - 0.5) * 0.4;
        const speed = 3 + Math.random() * 5.5;
        confettiRef.current.particles.push({
          x: clientX,
          y: clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2.2,
          size: 4 + Math.random() * 4,
          color: colors[i % colors.length],
          life: 1,
        });
      }
      const step = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confettiRef.current.particles = confettiRef.current.particles.filter((p) => p.life > 0.02);
        for (const p of confettiRef.current.particles) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.22;
          p.life -= 0.025;
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.size, p.size * 0.7);
        }
        ctx.globalAlpha = 1;
        confettiRef.current.raf = confettiRef.current.particles.length ? requestAnimationFrame(step) : null;
      };
      if (!confettiRef.current.raf) confettiRef.current.raf = requestAnimationFrame(step);
    },
    [paused],
  );

  // Cópia síncrona no gesto do clique sem preventDefault(), preservando a abertura nativa da nova aba no WhatsApp/Instagram!
  const handleCopyAndGo = useCallback(
    (store: FestivalStoreItem, codeToCopy: string, discountLabel: string, ev: React.MouseEvent<HTMLAnchorElement>) => {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(codeToCopy).catch(() => fallbackCopyText(codeToCopy));
      } else {
        fallbackCopyText(codeToCopy);
      }

      trackEvent('coupon_copy', {
        coupon_code: codeToCopy,
        brand: store.brand,
        placement: 'festival_blackfriday',
      });
      trackEvent('coupon_store_click', {
        coupon_code: codeToCopy,
        brand: store.brand,
        placement: 'festival_blackfriday',
        url: store.offerUrl,
      });

      setWallet((prev) => ({
        ...prev,
        [store.slug]: {
          slug: store.slug,
          brand: store.brand,
          code: codeToCopy,
          discount: discountLabel,
          url: store.offerUrl,
        },
      }));

      if (ev.clientX || ev.clientY) {
        burstConfetti(ev.clientX, ev.clientY);
      }
      showToast(`✓ ${codeToCopy} copiado! Abrindo ${store.brand}…`);
    },
    [burstConfetti, showToast],
  );

  const handleStoreOnlyClick = useCallback((store: FestivalStoreItem, customUrl?: string) => {
    trackEvent('coupon_store_click', {
      brand: store.brand,
      placement: 'festival_blackfriday',
      url: customUrl || store.offerUrl,
    });
  }, []);

  // Estado enriquecido de cada loja no instante atual (campanhas no ar + código turbo com prazo se ativo)
  const runtimeStores = useMemo(() => {
    return data.stores.map((store) => {
      const liveCampaigns = getLiveCampaigns(store.campaigns, effectiveNowMs);
      const activeLimited = getActiveLimitedCode(store.limitedCodes, effectiveNowMs);
      const upcomingLimited = getUpcomingLimitedCode(store.limitedCodes, effectiveNowMs);
      const effectiveCode = activeLimited ? activeLimited.code : store.code;
      const effectiveDiscount = activeLimited ? activeLimited.discount : store.discount;
      return {
        ...store,
        liveCampaigns,
        activeLimited,
        upcomingLimited,
        effectiveCode,
        effectiveDiscount,
      };
    });
  }, [data.stores, effectiveNowMs]);

  const runtimeBySlug = useMemo(() => new Map(runtimeStores.map((s) => [s.slug, s])), [runtimeStores]);

  const storyOrderedStores = useMemo(() => {
    return [...runtimeStores].sort(
      (a, b) =>
        Number(b.featured) - Number(a.featured) ||
        Number(b.liveCampaigns.length > 0) - Number(a.liveCampaigns.length > 0),
    );
  }, [runtimeStores]);

  const ribbonStores = useMemo(() => runtimeStores.filter((s) => Boolean(s.effectiveCode)), [runtimeStores]);
  const ribbonHalf = Math.ceil(ribbonStores.length / 2);
  const ribbonTrackA = ribbonStores.slice(0, ribbonHalf);
  const ribbonTrackB = ribbonStores.slice(ribbonHalf);

  const bfStoreCount = useMemo(
    () => runtimeStores.filter((s) => s.liveCampaigns.length > 0).length,
    [runtimeStores],
  );
  const topDiscountCount = useMemo(
    () => runtimeStores.filter((s) => s.discountSortValue >= 15).length,
    [runtimeStores],
  );

  const codeStoreCount = useMemo(() => runtimeStores.filter((s) => Boolean(s.effectiveCode)).length, [runtimeStores]);
  const linkOnlyCount = runtimeStores.length - codeStoreCount;

  const normalizedQ = useMemo(() => normalizeSearch(query), [query]);
  const filteredStores = useMemo(() => {
    return runtimeStores.filter((s) => {
      const passFilter =
        activeFilter === 'all'
          ? true
          : activeFilter === 'bf'
            ? s.liveCampaigns.length > 0
            : activeFilter === 'top'
              ? s.discountSortValue >= 15
              : s.hubCategory === activeFilter;
      if (!passFilter) return false;
      if (!normalizedQ) return true;
      return s.searchHaystack.includes(normalizedQ);
    });
  }, [runtimeStores, activeFilter, normalizedQ]);

  const isFiltered = Boolean(normalizedQ) || activeFilter !== 'all';

  const posterTiers = useMemo(() => {
    if (isFiltered) {
      return {
        mode: 'filtered' as const,
        items: filteredStores,
      };
    }
    const tier1 = filteredStores.filter((s) => s.featured || s.discountSortValue >= 15);
    const tier1Set = new Set(tier1.map((s) => s.slug));
    const tier2 = filteredStores.filter((s) => !tier1Set.has(s.slug) && s.liveCampaigns.length > 0);
    const tier2Set = new Set(tier2.map((s) => s.slug));
    const tier3 = filteredStores.filter((s) => !tier1Set.has(s.slug) && !tier2Set.has(s.slug));
    return {
      mode: 'full' as const,
      tier1,
      tier2,
      tier3,
    };
  }, [filteredStores, isFiltered]);

  // Cronômetro em duas fases: contagem até 27/11 -> cronômetro HH:MM:SS até 23:59 de 27/11 -> reta final até 30/11
  const timerState = useMemo(() => {
    const pad2 = (n: number) => String(n).padStart(2, '0');
    if (effectiveNowMs < BF_START_MS) {
      const diff = Math.max(0, BF_START_MS - effectiveNowMs);
      const d = Math.floor(diff / 86_400_000);
      const h = Math.floor((diff % 86_400_000) / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      return {
        isStopwatch: false,
        kicker: `23 a 30 nov · ${runtimeStores.length} parceiros oficiais`,
        prefix: '27/11 · ',
        hideXsPrefix: '',
        bold: `${pad2(d)}d ${pad2(h)}h ${pad2(m)}m`,
      };
    }

    const isFriday = effectiveNowMs <= BF_FRIDAY_END_MS;
    const endTarget = isFriday ? BF_FRIDAY_END_MS : BF_WEEK_END_MS;
    const diff = Math.max(0, endTarget - effectiveNowMs);

    if (diff === 0) {
      return {
        isStopwatch: false,
        kicker: `${runtimeStores.length} parceiros oficiais · Cupons ativos o ano todo`,
        prefix: 'Cupons ',
        hideXsPrefix: '',
        bold: 'ATIVOS',
      };
    }

    const d = Math.floor(diff / 86_400_000);
    const h = Math.floor((diff % 86_400_000) / 3_600_000);
    const m = Math.floor((diff % 3_600_000) / 60_000);
    const s = Math.floor((diff % 60_000) / 1000);

    return {
      isStopwatch: true,
      kicker: isFriday
        ? `⚡ É HOJE · CRONÔMETRO DA BLACK FRIDAY · ${runtimeStores.length} PARCEIROS`
        : `⚡ RETA FINAL · BLACK FRIDAY ATÉ 30/11 · ${runtimeStores.length} PARCEIROS`,
      prefix: '⏱ ',
      hideXsPrefix: 'Acaba em ',
      bold: d > 0 ? `${d}d ${pad2(h)}:${pad2(m)}:${pad2(s)}` : `${pad2(h)}:${pad2(m)}:${pad2(s)}`,
    };
  }, [effectiveNowMs, runtimeStores.length]);

  // Onda Magnética nas bolinhas dos Stories (Mouse + Dedo + Inércia do scroll)
  useEffect(() => {
    const rail = storiesRailRef.current;
    if (!rail) return;

    let pointerX: number | null = null;
    let pointerActive = false;
    let lastScrollLeft = rail.scrollLeft;
    let scrollVel = 0;
    let scrollDecayTimer: number | null = null;
    let waveRaf: number | null = null;

    const applyWave = () => {
      waveRaf = null;
      if (rootRef.current?.classList.contains('is-paused')) return;
      const list = rail.querySelectorAll<HTMLElement>('.bf-story-btn');
      if (!list.length) return;
      const railRect = rail.getBoundingClientRect();

      let peakBtn: HTMLElement | null = null;
      let peakVal = 0.32;

      list.forEach((btn) => {
        const r = btn.getBoundingClientRect();
        if (r.right < railRect.left - 90 || r.left > railRect.right + 90) {
          if (btn.style.getPropertyValue('--wave') !== '0') {
            btn.style.setProperty('--wave', '0');
            btn.style.setProperty('--tilt', '0deg');
            btn.classList.remove('is-peak');
          }
          return;
        }

        const cx = r.left + r.width / 2;
        let w = 0;
        let tilt = 0;

        if (pointerActive && pointerX !== null) {
          const dist = pointerX - cx;
          const absD = Math.abs(dist);
          const radius = 156;
          if (absD < radius) {
            w = Math.pow(Math.cos((absD / radius) * Math.PI * 0.5), 1.55);
            tilt = (-dist / radius) * 7.5 * w;
          }
        } else if (Math.abs(scrollVel) > 0.35) {
          const focusX = railRect.left + Math.min(railRect.width * 0.36, 165);
          const absD = Math.abs(focusX - cx);
          const radius = 145;
          if (absD < radius) {
            w = Math.pow(Math.cos((absD / radius) * Math.PI * 0.5), 1.7) * Math.min(1, Math.abs(scrollVel) / 9);
          }
          tilt = Math.max(-8, Math.min(8, scrollVel * 0.38));
        }

        btn.style.setProperty('--wave', w.toFixed(3));
        btn.style.setProperty('--tilt', `${tilt.toFixed(2)}deg`);
        btn.classList.remove('is-peak');
        if (w > peakVal) {
          peakVal = w;
          peakBtn = btn;
        }
      });

      if (peakBtn) (peakBtn as HTMLElement).classList.add('is-peak');
    };

    const scheduleWave = () => {
      if (!waveRaf) waveRaf = requestAnimationFrame(applyWave);
    };

    const resetWave = () => {
      pointerActive = false;
      pointerX = null;
      scrollVel = 0;
      rail.querySelectorAll<HTMLElement>('.bf-story-btn').forEach((btn) => {
        btn.style.setProperty('--wave', '0');
        btn.style.setProperty('--tilt', '0deg');
        btn.classList.remove('is-peak');
      });
    };

    const onPointerMove = (ev: PointerEvent) => {
      pointerActive = true;
      pointerX = ev.clientX;
      scheduleWave();
    };
    const onPointerDown = (ev: PointerEvent) => {
      pointerActive = true;
      pointerX = ev.clientX;
      scheduleWave();
    };
    const onTouchStart = (ev: TouchEvent) => {
      if (ev.touches[0]) {
        pointerActive = true;
        pointerX = ev.touches[0].clientX;
        scheduleWave();
      }
    };
    const onTouchMove = (ev: TouchEvent) => {
      if (ev.touches[0]) {
        pointerActive = true;
        pointerX = ev.touches[0].clientX;
        scheduleWave();
      }
    };
    const onTouchEnd = () => {
      pointerActive = false;
      pointerX = null;
      if (Math.abs(scrollVel) < 0.5) resetWave();
    };
    const onScroll = () => {
      const nowLeft = rail.scrollLeft;
      scrollVel = nowLeft - lastScrollLeft;
      lastScrollLeft = nowLeft;
      scheduleWave();
      if (scrollDecayTimer) window.clearTimeout(scrollDecayTimer);
      scrollDecayTimer = window.setTimeout(() => {
        scrollVel = 0;
        if (!pointerActive) resetWave();
      }, 150);
    };

    rail.addEventListener('pointermove', onPointerMove, { passive: true });
    rail.addEventListener('pointerdown', onPointerDown, { passive: true });
    rail.addEventListener('pointerleave', resetWave, { passive: true });
    rail.addEventListener('touchstart', onTouchStart, { passive: true });
    rail.addEventListener('touchmove', onTouchMove, { passive: true });
    rail.addEventListener('touchend', onTouchEnd, { passive: true });
    rail.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      rail.removeEventListener('pointermove', onPointerMove);
      rail.removeEventListener('pointerdown', onPointerDown);
      rail.removeEventListener('pointerleave', resetWave);
      rail.removeEventListener('touchstart', onTouchStart);
      rail.removeEventListener('touchmove', onTouchMove);
      rail.removeEventListener('touchend', onTouchEnd);
      rail.removeEventListener('scroll', onScroll);
      if (waveRaf) cancelAnimationFrame(waveRaf);
      if (scrollDecayTimer) window.clearTimeout(scrollDecayTimer);
    };
  }, []);

  // Coreografia Esquerda <-> Direita no Pôster ao rolar e ao trocar filtros
  const revealPosterInView = useCallback(() => {
    const frame = posterFrameRef.current;
    if (!frame) return;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const triggerLine = vh * 0.89;
    frame.querySelectorAll<HTMLElement>('.bf-act, .bf-poster-tier-label').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top <= triggerLine && r.bottom >= -50) {
        el.classList.add('is-in');
        el.classList.remove('is-armed');
      } else if (r.top > vh * 0.99) {
        el.classList.remove('is-in');
        el.classList.add('is-armed');
      }
    });
  }, []);

  const layoutPosterRows = useCallback(
    (fastMode: boolean, replayVisible: boolean) => {
      const frame = posterFrameRef.current;
      if (!frame) return;
      const acts = Array.from(frame.querySelectorAll<HTMLElement>('.bf-act'));
      if (!acts.length) return;

      const rows: Array<{ top: number; items: HTMLElement[] }> = [];
      for (const el of acts) {
        const top = el.offsetTop;
        const lastRow = rows[rows.length - 1];
        if (!lastRow || Math.abs(top - lastRow.top) > 10) {
          rows.push({ top, items: [el] });
        } else {
          lastRow.items.push(el);
        }
      }

      rows.forEach((row, rIdx) => {
        const dir = rIdx % 2 === 0 ? 'left' : 'right';
        const len = row.items.length;
        row.items.forEach((el, i) => {
          el.dataset.dir = dir;
          const order = dir === 'left' ? i : len - 1 - i;
          const stepMs = fastMode ? 25 : 55;
          el.style.setProperty('--delay', `${Math.min(order * stepMs, 275)}ms`);
          el.style.setProperty('--dur', fastMode ? '0.42s' : '0.68s');
          if (replayVisible) {
            el.classList.remove('is-in');
            el.classList.add('is-armed');
          }
        });
      });

      if (replayVisible) {
        frame.querySelectorAll<HTMLElement>('.bf-poster-tier-label').forEach((l) => {
          l.classList.remove('is-in');
          l.classList.add('is-armed');
        });
        void frame.offsetWidth;
      }

      revealPosterInView();
    },
    [revealPosterInView],
  );

  useEffect(() => {
    layoutPosterRows(Boolean(normalizedQ), true);
  }, [activeFilter, normalizedQ, layoutPosterRows]);

  useEffect(() => {
    let scrollRaf: number | null = null;
    const onScroll = () => {
      if (!scrollRaf) {
        scrollRaf = requestAnimationFrame(() => {
          scrollRaf = null;
          revealPosterInView();
        });
      }
    };
    let resizeTimer: number | null = null;
    const onResize = () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => layoutPosterRows(false, false), 120);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      if (resizeTimer) window.clearTimeout(resizeTimer);
    };
  }, [layoutPosterRows, revealPosterInView]);

  // Modal <dialog> nativo + navegação por teclado
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (modalSlug) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [modalSlug]);

  useEffect(() => {
    const onKeyDown = (ev: KeyboardEvent) => {
      if (modalSlug && (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft')) {
        const slugs = storyOrderedStores.map((s) => s.slug);
        const idx = slugs.indexOf(modalSlug);
        if (idx >= 0) {
          const step = ev.key === 'ArrowRight' ? 1 : -1;
          setModalSlug(slugs[(idx + step + slugs.length) % slugs.length]);
        }
        return;
      }
      if (ev.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        ev.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modalSlug, storyOrderedStores]);

  const handleHeroPointerMove = (ev: React.PointerEvent<HTMLElement>) => {
    if (ev.pointerType !== 'mouse' || paused) return;
    const el = heroStageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${(((ev.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${(((ev.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
  };

  const renderActItem = (store: (typeof runtimeStores)[number], tier: 1 | 2 | 3) => {
    const isCopied = Boolean(wallet[store.slug]);
    const orbSz = tier === 1 ? 36 : tier === 2 ? 28 : 24;
    const discShort = store.effectiveDiscount.replace(' OFF', '');
    const code = store.effectiveCode;

    return (
      <div key={store.slug} className="bf-act" style={{ '--c': store.brandColor } as CSSProperties}>
        <StoreOrb store={store} size={orbSz} />
        <button type="button" className="bf-brand-btn" onClick={() => setModalSlug(store.slug)}>
          {store.brand}
        </button>
        {code ? (
          <a
            className={`bf-ticket-go${isCopied ? ' is-copied' : ''}`}
            href={store.offerUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
            title={`Copiar ${code} e abrir ${store.brand}`}
            onClick={(ev) => handleCopyAndGo(store, code, store.effectiveDiscount, ev)}
          >
            {isCopied ? `✓ ${code} ↗` : `${discShort} · ${code} ↗`}
          </a>
        ) : (
          <a
            className="bf-ticket-go is-link"
            href={store.offerUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
            onClick={() => handleStoreOnlyClick(store)}
          >
            {discShort} ↗
          </a>
        )}
      </div>
    );
  };

  const damieStore = runtimeBySlug.get('damie');
  const insiderStore = runtimeBySlug.get('insider');
  const iwsStore = runtimeBySlug.get('i-wanna-sleep');

  const modalStore = modalSlug ? runtimeBySlug.get(modalSlug) ?? null : null;
  const modalNeighbors = useMemo(() => {
    if (!modalSlug) return null;
    const slugs = storyOrderedStores.map((s) => s.slug);
    const idx = slugs.indexOf(modalSlug);
    if (idx < 0) return null;
    const prev = bySlug.get(slugs[(idx - 1 + slugs.length) % slugs.length]);
    const next = bySlug.get(slugs[(idx + 1) % slugs.length]);
    return { prev, next };
  }, [modalSlug, storyOrderedStores, bySlug]);

  const walletEntries = Object.values(wallet);

  return (
    <div ref={rootRef} className={`bf-root${paused ? ' is-paused' : ''}`} id="topo">
      <canvas ref={confettiCanvasRef} className="bf-confetti-canvas" aria-hidden="true" />

      {/* TOPO ENXUTO: Masthead 1 linha + Stories no topo + Hero EXCLUSIVOS + Faixas Lima & Rosa */}
      <header ref={heroStageRef} className="bf-top-stage" onPointerMove={handleHeroPointerMove}>
        <div className="bf-stage-grid-bg" aria-hidden="true" />

        <div className="bf-wrap bf-masthead">
          <Link href="/" className="bf-brand-id">
            <span className="bf-brand-avatar">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.ceciliaAvatarUrl} alt="Cecília" loading="eager" />
            </span>
            <span className="bf-brand-title">
              Em Casa<span>com Cecília</span>
            </span>
          </Link>

          <span className={`bf-live-pill${mounted && timerState.isStopwatch ? ' is-stopwatch' : ''}`} role="timer" aria-live="off">
            <i className="bf-live-dot" aria-hidden="true" />
            <span>
              {mounted ? (
                <>
                  {timerState.prefix}
                  {timerState.hideXsPrefix ? <span className="bf-hide-xs">{timerState.hideXsPrefix}</span> : null}
                  <b>{timerState.bold}</b>
                </>
              ) : (
                <>
                  Black Friday · <b>{runtimeStores.length} lojas</b>
                </>
              )}
            </span>
          </span>
        </div>

        {/* Stories das marcas no topo */}
        <nav className="bf-wrap bf-stories-top" aria-label="Stories das marcas parceiras">
          <div ref={storiesRailRef} className="bf-stories-rail">
            {storyOrderedStores.map((store, idx) => {
              const badge = store.liveCampaigns[0]?.tag || store.effectiveDiscount.replace(' OFF', '');
              return (
                <button
                  key={store.slug}
                  type="button"
                  className={`bf-story-btn${store.liveCampaigns.length > 0 ? ' has-bf' : ''}`}
                  style={{ '--c': store.brandColor } as CSSProperties}
                  onClick={() => setModalSlug(store.slug)}
                  aria-label={`Abrir destaque da ${store.brand}`}
                >
                  <span className="bf-story-ring">
                    <StoreOrb store={store} size={48} eager={idx < 10} />
                    <span className="bf-story-tag">{badge}</span>
                  </span>
                  <span className="bf-story-name">{store.brand}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Hero compacto sem foto alta */}
        <div className="bf-wrap bf-hero-compact">
          <div className="bf-hero-title-block">
            <p className="bf-hero-kicker">
              {mounted ? timerState.kicker : `Black Friday · ${runtimeStores.length} parceiros oficiais`}
            </p>
            <h1 className="bf-hero-h1">
              <span className="bf-hero-h1-top">
                <span className="bf-stroke-word">Festival</span>
                <span className="bf-white-word">de Cupons</span>
              </span>
              <span className="bf-hero-h1-main">
                <span className="bf-solid-word">EXCLUSIVOS</span>
                <span className="bf-script-sig">da Cecília</span>
              </span>
            </h1>
          </div>
          <div className="bf-hero-side">
            <p className="bf-hero-sub">
              Toque em qualquer código: ele <strong>já copia e abre a loja oficial</strong> para você colar na hora de pagar.
            </p>
          </div>
        </div>

        {/* Duas faixas Lima & Rosa */}
        <div className="bf-ribbons-wrap" aria-label="Faixa rápida: toque para copiar e abrir a loja">
          <div className="bf-ribbon bf-ribbon-a">
            <div className="bf-ribbon-track">
              {[...ribbonTrackA, ...ribbonTrackA].map((s, idx) => (
                <a
                  key={`${s.slug}-a-${idx}`}
                  className="bf-ribbon-chip"
                  href={s.offerUrl}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  onClick={(ev) => s.effectiveCode && handleCopyAndGo(s, s.effectiveCode, s.effectiveDiscount, ev)}
                >
                  <span>{s.brand}</span> · <span>{s.effectiveDiscount}</span> <code>{s.effectiveCode}</code>
                </a>
              ))}
            </div>
          </div>
          <div className="bf-ribbon bf-ribbon-b">
            <div className="bf-ribbon-track">
              {[...ribbonTrackB, ...ribbonTrackB].map((s, idx) => (
                <a
                  key={`${s.slug}-b-${idx}`}
                  className="bf-ribbon-chip"
                  href={s.offerUrl}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  onClick={(ev) => s.effectiveCode && handleCopyAndGo(s, s.effectiveCode, s.effectiveDiscount, ev)}
                >
                  <span>{s.brand}</span> · <span>{s.effectiveDiscount}</span> <code>{s.effectiveCode}</code>
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Dock fixo: busca + filtros */}
      <div className="bf-command-dock" id="busca-palco">
        <div className="bf-wrap bf-dock-inner">
          <label className="bf-spotlight-search" htmlFor="bf-search-input">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4.2-4.2" />
            </svg>
            <input
              ref={searchInputRef}
              id="bf-search-input"
              type="search"
              autoComplete="off"
              value={query}
              onChange={(ev) => setQuery(ev.target.value)}
              placeholder="Buscar marca, código ou produto (poltrona, whey, café, mala…)"
            />
            {query ? (
              <button
                type="button"
                className="bf-clear-btn"
                onClick={() => {
                  setQuery('');
                  searchInputRef.current?.focus();
                }}
                aria-label="Limpar busca"
              >
                ×
              </button>
            ) : null}
          </label>

          <div className="bf-stage-filters" role="group" aria-label="Filtrar lojas">
            <button
              type="button"
              className="bf-chip"
              aria-pressed={activeFilter === 'all'}
              onClick={() => setActiveFilter('all')}
            >
              <span>✦ Todas</span>
              <small>{runtimeStores.length}</small>
            </button>
            {bfStoreCount > 0 ? (
              <button
                type="button"
                className="bf-chip is-bf"
                aria-pressed={activeFilter === 'bf'}
                onClick={() => setActiveFilter('bf')}
              >
                <span>🔥 Com Black Friday</span>
                <small>{bfStoreCount}</small>
              </button>
            ) : null}
            <button
              type="button"
              className="bf-chip"
              aria-pressed={activeFilter === 'top'}
              onClick={() => setActiveFilter('top')}
            >
              <span>💎 Maiores Descontos (15%+)</span>
              <small>{topDiscountCount}</small>
            </button>
            {data.categories.map((cat) => {
              const count = runtimeStores.filter((s) => s.hubCategory === cat.id).length;
              if (count === 0) return null;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className="bf-chip"
                  aria-pressed={activeFilter === cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                >
                  <span>{cat.label}</span>
                  <small>{count}</small>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <main>
        {/* ATO I — PÔSTER DO FESTIVAL */}
        <section className="bf-wrap bf-poster-sec" id="lineup" aria-labelledby="poster-heading">
          <div className="bf-act-header">
            <div>
              <span className="bf-act-eyebrow">Line-up Oficial · {runtimeStores.length} Marcas</span>
              <h2 className="bf-act-title" id="poster-heading">
                Pôster do Festival
              </h2>
            </div>
            <p className="bf-act-note">
              Toque no <strong>código pontilhado</strong> para copiar e abrir a loja na hora, ou no <strong>nome da marca</strong> para ver campanhas e regras.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px',
              fontSize: '13px',
              color: 'var(--bf-muted)',
              fontWeight: 700,
              gap: '10px',
            }}
          >
            <span role="status" aria-live="polite">
              {filteredStores.length
                ? `${filteredStores.length} ${filteredStores.length === 1 ? 'marca encontrada' : 'marcas no pôster'}${query ? ` para “${query}”` : ''}`
                : `Nenhuma marca encontrada para “${query}”.`}
            </span>
            {isFiltered ? (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setActiveFilter('all');
                }}
                style={{
                  color: 'var(--bf-lime)',
                  fontWeight: 800,
                  textDecoration: 'underline',
                  background: 'none',
                  border: 0,
                  cursor: 'pointer',
                }}
              >
                Mostrar todas as {runtimeStores.length}
              </button>
            ) : null}
          </div>

          <div ref={posterFrameRef} className="bf-poster-frame">
            {!filteredStores.length ? (
              <p style={{ textAlign: 'center', margin: '24px 0', color: 'var(--bf-muted)' }}>
                Tente outro termo ou toque em “Mostrar todas as {runtimeStores.length}”.
              </p>
            ) : posterTiers.mode === 'full' ? (
              <>
                <div className="bf-poster-top-bill">
                  <span>★ Em Casa com Cecília · Black Friday</span>
                  <span>
                    {codeStoreCount} Códigos + {linkOnlyCount} Links Oficiais ★
                  </span>
                </div>
                <div className="bf-poster-tier bf-tier-1">
                  <span className="bf-poster-tier-label">✦ Headliners &amp; Super Descontos ✦</span>
                  <div className="bf-poster-cloud">{posterTiers.tier1.map((s) => renderActItem(s, 1))}</div>
                </div>
                {posterTiers.tier2.length > 0 ? (
                  <div className="bf-poster-tier bf-tier-2">
                    <span className="bf-poster-tier-label">🔥 Com Campanha de Black Friday Ativa</span>
                    <div className="bf-poster-cloud">{posterTiers.tier2.map((s) => renderActItem(s, 2))}</div>
                  </div>
                ) : null}
                {posterTiers.tier3.length > 0 ? (
                  <div className="bf-poster-tier bf-tier-3">
                    <span className="bf-poster-tier-label">✦ Mais Parceiras Oficiais</span>
                    <div className="bf-poster-cloud">{posterTiers.tier3.map((s) => renderActItem(s, 3))}</div>
                  </div>
                ) : null}
                <p className="bf-poster-foot-hint">
                  💡 Dica: tocar na pílula pontilhada já copia o código e abre a loja oficial.
                </p>
              </>
            ) : (
              <div className="bf-poster-tier bf-tier-1">
                <div className="bf-poster-cloud">
                  {posterTiers.items.map((s) => renderActItem(s, posterTiers.items.length <= 10 ? 1 : 2))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ATO II — VITRINE REELS DE PRODUTOS (escondida durante busca por texto) */}
        {!normalizedQ && data.lookbookSlugs.length > 0 ? (
          <section className="bf-wrap bf-lookbook-sec" aria-labelledby="lookbook-title">
            <div className="bf-act-header">
              <div>
                <span className="bf-act-eyebrow">Produtos Testados &amp; Ofertas</span>
                <h2 className="bf-act-title" id="lookbook-title">
                  Vitrine em Destaque
                </h2>
              </div>
              <p className="bf-act-note">Deslize pelos produtos que testamos em casa — um toque já copia e abre a loja.</p>
            </div>

            <div className="bf-lookbook-rail">
              {data.lookbookSlugs.map((slug) => {
                const s = runtimeBySlug.get(slug);
                if (!s || !s.spotlight || !s.effectiveCode) return null;
                const code = s.effectiveCode;
                const isCopied = Boolean(wallet[s.slug]);
                const topTag = s.liveCampaigns[0]?.tag || s.effectiveDiscount;
                const kindLabel = s.codeKind === 'reward' ? 'Reward Code' : 'código exclusivo';

                return (
                  <article key={s.slug} className="bf-reel-poster" style={{ '--c': s.brandColor } as CSSProperties}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="bf-reel-photo" src={s.spotlight.imageUrl} alt="" loading="lazy" decoding="async" />
                    <div className="bf-reel-top">
                      <button type="button" className="bf-reel-brand-chip" onClick={() => setModalSlug(s.slug)}>
                        <StoreOrb store={s} size={26} />
                        <span>{s.brand}</span>
                      </button>
                      <span className="bf-reel-bf-tag">{topTag}</span>
                    </div>
                    <div className="bf-reel-bottom">
                      <h3 className="bf-reel-camp-text">{s.liveCampaigns[0]?.headline ?? s.spotlight.label}</h3>
                      <p className="bf-reel-sub">
                        Nosso {kindLabel}: <strong>{s.effectiveDiscount}</strong>
                      </p>
                      <div className={`bf-reel-ticket${isCopied ? ' is-copied' : ''}`}>
                        <code>{code}</code>
                        <a
                          className="bf-reel-copy"
                          href={s.spotlight.url}
                          target="_blank"
                          rel="sponsored noopener noreferrer"
                          onClick={(ev) => handleCopyAndGo(s, code, s.effectiveDiscount, ev)}
                        >
                          {isCopied ? '✓ Copiado ↗' : 'Copiar e ir ↗'}
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}

        {/* ATO III — HEADLINERS DA SEMANA (DAMIE, Insider, I Wanna Sleep) */}
        {!normalizedQ && (damieStore || insiderStore || iwsStore) ? (
          <section className="bf-wrap bf-headliners-sec" aria-labelledby="hl-title">
            <div className="bf-act-header">
              <div>
                <span className="bf-act-eyebrow">Atrações Principais</span>
                <h2 className="bf-act-title" id="hl-title">
                  Headliners da Semana
                </h2>
              </div>
              <p className="bf-act-note">As 3 parceiras mais pedidas pelos leitores do Em Casa com Cecília.</p>
            </div>

            {damieStore && damieStore.effectiveCode ? (
              <article className="bf-headliner-damie">
                <div className="bf-hl-content">
                  <div>
                    <div className="bf-hl-top-tags">
                      <span className="bf-hl-pill urgent">
                        {damieStore.liveCampaigns[0]?.tag ? `🔥 ${damieStore.liveCampaigns[0].tag}` : '🔥 Destaque Casa'}
                      </span>
                      <span className="bf-hl-pill">Soma com Pix</span>
                    </div>
                    <h3 className="bf-hl-headline">
                      {damieStore.liveCampaigns[0]?.headline ?? 'DAMIE: poltronas reclináveis e sofás na caixa'}
                    </h3>
                    <div className="bf-hl-stack-formula" aria-label="Benefícios acumuláveis na DAMIE">
                      <span>{damieStore.effectiveDiscount} no código</span>
                      <span className="plus">+</span>
                      <span>Desconto do Pix</span>
                      <span className="plus">+</span>
                      <span>Promoções do site</span>
                    </div>
                  </div>

                  <div
                    className={`bf-vip-stub${wallet[damieStore.slug] ? ' is-copied' : ''}`}
                    style={{ '--stub-notch': '#2b1109' } as CSSProperties}
                  >
                    <div className="bf-vip-code-box">
                      <span className="bf-vip-code-label">Código exclusivo · Soma com Pix</span>
                      <code className="bf-vip-code-text">{damieStore.effectiveCode}</code>
                    </div>
                    <a
                      className="bf-vip-copy-go"
                      href={damieStore.offerUrl}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      onClick={(ev) =>
                        damieStore.effectiveCode &&
                        handleCopyAndGo(damieStore, damieStore.effectiveCode, damieStore.effectiveDiscount, ev)
                      }
                    >
                      {wallet[damieStore.slug] ? '✓ Copiado · Abrir ↗' : 'Copiar e abrir DAMIE ↗'}
                    </a>
                  </div>
                </div>
                <div className="bf-hl-visual">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={data.headlinerMedia.damiePhoto}
                    alt="Poltrona reclinável DAMIE ambientada na sala"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>
            ) : null}

            <div className="bf-headliner-duet">
              {insiderStore && insiderStore.effectiveCode ? (
                <article className="bf-duet-stage bf-duet-insider">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="bf-duet-bg-photo" src={data.headlinerMedia.insiderPhoto} alt="" loading="lazy" />
                  <div>
                    <div className="bf-hl-top-tags">
                      <span className="bf-hl-pill urgent">
                        {insiderStore.liveCampaigns.length > 0
                          ? `${insiderStore.liveCampaigns.length} ${insiderStore.liveCampaigns.length === 1 ? 'Campanha no Ar' : 'Campanhas no Ar'}`
                          : 'Destaque Moda'}
                      </span>
                      <span className="bf-hl-pill">Moda Tech</span>
                    </div>
                    <h3 className="bf-duet-title">
                      Insider: {insiderStore.effectiveDiscount} com nosso código
                    </h3>
                    {insiderStore.liveCampaigns.length > 0 ? (
                      <ul className="bf-camp-stack-list">
                        {insiderStore.liveCampaigns.slice(0, 3).map((camp) => (
                          <li key={camp.id}>⚡ {camp.headline}</li>
                        ))}
                      </ul>
                    ) : (
                      <p style={{ margin: '8px 0 0', fontSize: '13px', color: 'var(--bf-muted)' }}>
                        {insiderStore.shortDescription}
                      </p>
                    )}
                  </div>
                  <div
                    className={`bf-vip-stub${wallet[insiderStore.slug] ? ' is-copied' : ''}`}
                    style={{ '--stub-notch': '#171922' } as CSSProperties}
                  >
                    <div className="bf-vip-code-box">
                      <span className="bf-vip-code-label">Código Insider ({insiderStore.eligibleCategories})</span>
                      <code className="bf-vip-code-text">{insiderStore.effectiveCode}</code>
                    </div>
                    <a
                      className="bf-vip-copy-go"
                      href={insiderStore.offerUrl}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      onClick={(ev) =>
                        insiderStore.effectiveCode &&
                        handleCopyAndGo(insiderStore, insiderStore.effectiveCode, insiderStore.effectiveDiscount, ev)
                      }
                    >
                      {wallet[insiderStore.slug] ? '✓ Copiado · Abrir ↗' : 'Copiar e abrir ↗'}
                    </a>
                  </div>
                </article>
              ) : null}

              {iwsStore && iwsStore.effectiveCode ? (
                <article className="bf-duet-stage bf-duet-iws">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="bf-duet-bg-photo" src={data.headlinerMedia.iwsPhoto} alt="" loading="lazy" />
                  <div>
                    <div className="bf-hl-top-tags">
                      <span className="bf-hl-pill urgent">
                        {iwsStore.activeLimited
                          ? `⚡ ${iwsStore.activeLimited.discount} liberado até ${iwsStore.activeLimited.endLabel}`
                          : iwsStore.upcomingLimited
                            ? 'Virada Especial'
                            : 'Sono & Casa'}
                      </span>
                      <span className="bf-hl-pill">I Wanna Sleep</span>
                    </div>
                    <h3 className="bf-duet-title">
                      I Wanna Sleep: {iwsStore.effectiveDiscount} no site oficial
                    </h3>
                    {iwsStore.activeLimited ? (
                      <div className="bf-flash-unlock">
                        ⚡ Código especial <b>{iwsStore.activeLimited.code}</b> (<b>{iwsStore.activeLimited.discount}</b>) ativo agora até {iwsStore.activeLimited.endLabel}!
                      </div>
                    ) : iwsStore.upcomingLimited ? (
                      <div className="bf-flash-unlock">
                        ⚡ Em breve entra o código <b>{iwsStore.upcomingLimited.code}</b> (<b>{iwsStore.upcomingLimited.discount}</b> até {iwsStore.upcomingLimited.endLabel}). Hoje já vale {iwsStore.discount} no site todo:
                      </div>
                    ) : (
                      <p style={{ margin: '8px 0 0', fontSize: '13px', color: 'var(--bf-muted)' }}>
                        {iwsStore.shortDescription}
                      </p>
                    )}
                  </div>
                  <div
                    className={`bf-vip-stub${wallet[iwsStore.slug] ? ' is-copied' : ''}`}
                    style={{ '--stub-notch': '#241547' } as CSSProperties}
                  >
                    <div className="bf-vip-code-box">
                      <span className="bf-vip-code-label">Ativo agora · Todo o site</span>
                      <code className="bf-vip-code-text">{iwsStore.effectiveCode}</code>
                    </div>
                    <a
                      className="bf-vip-copy-go"
                      href={iwsStore.offerUrl}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      onClick={(ev) =>
                        iwsStore.effectiveCode &&
                        handleCopyAndGo(iwsStore, iwsStore.effectiveCode, iwsStore.effectiveDiscount, ev)
                      }
                    >
                      {wallet[iwsStore.slug] ? '✓ Copiado · Abrir ↗' : 'Copiar e abrir ↗'}
                    </a>
                  </div>
                </article>
              ) : null}
            </div>
          </section>
        ) : null}
      </main>

      <footer className="bf-stage-footer">
        <div
          className="bf-wrap"
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}
        >
          <div style={{ maxWidth: '72ch' }}>
            <p style={{ margin: 0 }}>
              <strong>Transparência Em Casa com Cecília:</strong> as campanhas de Black Friday são das próprias lojas e mudam sem aviso. Quando você usa nossos códigos ou links oficiais, podemos receber comissão sem custo extra para você.
            </p>
            <div className="bf-footer-links">
              <Link href="/cupons">Ver regras completas em /cupons</Link>
              <Link href="/">Ir para o site Em Casa com Cecília</Link>
              <Link href="/privacidade">Política de Privacidade</Link>
              <button type="button" className="bf-footer-link-btn" onClick={() => openConsentPreferences()}>
                Preferências de cookies
              </button>
            </div>
          </div>
          <button
            type="button"
            className="bf-pause-fx-btn"
            aria-pressed={paused}
            onClick={() => {
              setPaused((p) => {
                const next = !p;
                showToast(next ? 'Efeitos visuais pausados.' : '✨ Efeitos visuais religados!');
                return next;
              });
            }}
          >
            {paused ? '▶️ Retomar efeitos' : '⏸ Pausar efeitos'}
          </button>
        </div>
      </footer>

      {/* MODAL DE STORY DA MARCA */}
      <dialog
        ref={dialogRef}
        className="bf-stage-modal"
        onClose={() => setModalSlug(null)}
        onClick={(ev) => {
          if (ev.target === dialogRef.current) setModalSlug(null);
        }}
      >
        {modalStore ? (
          <div>
            <div className="bf-modal-hero" style={{ '--c': modalStore.brandColor } as CSSProperties}>
              {modalStore.spotlight ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="bf-modal-hero-img" src={modalStore.spotlight.imageUrl} alt="" />
              ) : null}
              <button
                type="button"
                className="bf-modal-close"
                onClick={() => setModalSlug(null)}
                aria-label="Fechar janela da marca"
              >
                ×
              </button>
              <div className="bf-modal-hero-in">
                <StoreOrb store={modalStore} size={58} />
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--bf-lime)' }}>
                    {modalStore.categoryName}
                  </span>
                  <h2
                    style={{
                      margin: '2px 0 0',
                      fontFamily: 'var(--font-archivo), sans-serif',
                      fontWeight: 900,
                      fontSize: '30px',
                      lineHeight: 1,
                    }}
                  >
                    {modalStore.brand} · {modalStore.effectiveDiscount}
                  </h2>
                </div>
              </div>
            </div>

            <div className="bf-modal-body">
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--bf-muted)', fontWeight: 600 }}>
                <strong style={{ color: 'var(--bf-ink)' }}>Onde vale:</strong> {modalStore.eligibleCategories}.{' '}
                {modalStore.combinable ? `Acumula: ${modalStore.combinable}.` : ''}
              </p>

              {modalStore.activeLimited ? (
                <div className="bf-flash-unlock">
                  ⚡ Código especial <b>{modalStore.activeLimited.code}</b> (<b>{modalStore.activeLimited.discount}</b>) ativo até {modalStore.activeLimited.endLabel}!
                </div>
              ) : modalStore.upcomingLimited ? (
                <div className="bf-flash-unlock">
                  ⚡ Em breve entra <b>{modalStore.upcomingLimited.code}</b> (<b>{modalStore.upcomingLimited.discount}</b> até {modalStore.upcomingLimited.endLabel}).
                </div>
              ) : null}

              {modalStore.referral ? (
                <div className="bf-flash-unlock">
                  🔎 <strong>{modalStore.referral.label}:</strong> {modalStore.referral.instructions}
                </div>
              ) : null}

              {modalStore.effectiveCode ? (
                <div className={`bf-vip-stub${wallet[modalStore.slug] ? ' is-copied' : ''}`}>
                  <div className="bf-vip-code-box">
                    <span className="bf-vip-code-label">
                      {modalStore.codeKind === 'reward'
                        ? `Código de recompensa (${modalStore.codeFieldLabel ?? 'Reward Code'})`
                        : modalStore.codeFieldLabel
                          ? `Campo: ${modalStore.codeFieldLabel}`
                          : 'Código oficial · Toque para copiar e abrir'}
                    </span>
                    <code className="bf-vip-code-text">{modalStore.effectiveCode}</code>
                  </div>
                  <a
                    className="bf-vip-copy-go"
                    href={modalStore.offerUrl}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    onClick={(ev) =>
                      modalStore.effectiveCode &&
                      handleCopyAndGo(modalStore, modalStore.effectiveCode, modalStore.effectiveDiscount, ev)
                    }
                  >
                    {wallet[modalStore.slug] ? '✓ Copiado · Abrir ↗' : 'Copiar e abrir ↗'}
                  </a>
                </div>
              ) : (
                <a
                  href={modalStore.offerUrl}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="bf-btn-link-full"
                  onClick={() => handleStoreOnlyClick(modalStore)}
                >
                  {modalStore.actionLabel || `Abrir ofertas na ${modalStore.brand}`} ↗
                </a>
              )}

              {modalStore.liveCampaigns.length > 0 ? (
                <div className="bf-modal-camps">
                  <strong style={{ fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '.09em', color: 'var(--bf-muted)' }}>
                    🔥 Rolando agora na {modalStore.brand}
                  </strong>
                  {modalStore.liveCampaigns.map((camp) =>
                    camp.internal ? (
                      <Link key={camp.id} href={camp.href} className="bf-modal-camp-item">
                        <span>{camp.headline}</span>
                        <span style={{ color: 'var(--bf-lime)', whiteSpace: 'nowrap' }}>Ler guia →</span>
                      </Link>
                    ) : (
                      <a
                        key={camp.id}
                        className="bf-modal-camp-item"
                        href={camp.href}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                        onClick={(ev) => {
                          if (modalStore.effectiveCode) {
                            handleCopyAndGo(modalStore, modalStore.effectiveCode, modalStore.effectiveDiscount, ev);
                          } else {
                            handleStoreOnlyClick(modalStore, camp.href);
                          }
                        }}
                      >
                        <span>
                          {camp.headline}
                          {camp.storeAppCode ? ` (código no app: ${camp.storeAppCode})` : ''}
                        </span>
                        <span style={{ color: 'var(--bf-lime)', whiteSpace: 'nowrap' }}>
                          {modalStore.effectiveCode ? 'Copiar + Ver ↗' : 'Ver ↗'}
                        </span>
                      </a>
                    ),
                  )}
                </div>
              ) : null}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '8px',
                  paddingTop: '10px',
                  borderTop: '1px solid var(--bf-line)',
                  fontSize: '12.5px',
                  fontWeight: 800,
                }}
              >
                {modalNeighbors?.prev ? (
                  <button
                    type="button"
                    onClick={() => setModalSlug(modalNeighbors.prev!.slug)}
                    style={{
                      padding: '7px 12px',
                      borderRadius: '999px',
                      background: 'var(--bf-bg-elev)',
                      color: 'inherit',
                      border: 0,
                      cursor: 'pointer',
                      fontWeight: 800,
                    }}
                  >
                    ← {modalNeighbors.prev.brand}
                  </button>
                ) : (
                  <span />
                )}
                <Link
                  href={modalStore.storePageUrl}
                  style={{ color: 'var(--bf-muted)', fontWeight: 700, textDecoration: 'underline' }}
                >
                  Regras completas
                </Link>
                {modalNeighbors?.next ? (
                  <button
                    type="button"
                    onClick={() => setModalSlug(modalNeighbors.next!.slug)}
                    style={{
                      padding: '7px 12px',
                      borderRadius: '999px',
                      background: 'var(--bf-bg-elev)',
                      color: 'inherit',
                      border: 0,
                      cursor: 'pointer',
                      fontWeight: 800,
                    }}
                  >
                    {modalNeighbors.next.brand} →
                  </button>
                ) : (
                  <span />
                )}
              </div>
            </div>
          </div>
        ) : null}
      </dialog>

      {/* CARTEIRA FLUTUANTE DE CÓDIGOS COPIADOS */}
      {walletEntries.length > 0 ? (
        <div className="bf-vip-wallet">
          {walletOpen ? (
            <div className="bf-wallet-drawer">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontFamily: 'var(--font-archivo), sans-serif', fontSize: '14.5px' }}>
                  🎟️ Códigos copiados nesta visita
                </strong>
                <button
                  type="button"
                  onClick={() => setWalletOpen(false)}
                  aria-label="Fechar carteira"
                  style={{ fontWeight: 900, fontSize: '18px', background: 'none', border: 0, color: 'inherit', cursor: 'pointer' }}
                >
                  ×
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {walletEntries.map((item) => (
                  <div key={item.slug} className="bf-wallet-item">
                    <div>
                      <strong>{item.brand}</strong>{' '}
                      <span style={{ opacity: 0.7, fontSize: '11px' }}>{item.discount}</span>
                      <br />
                      <code>{item.code}</code>
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      onClick={() =>
                        trackEvent('coupon_store_click', {
                          coupon_code: item.code,
                          brand: item.brand,
                          placement: 'festival_blackfriday',
                          url: item.url,
                        })
                      }
                    >
                      Reabrir loja ↗
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <button
            type="button"
            className="bf-wallet-toggle"
            aria-expanded={walletOpen}
            onClick={() => setWalletOpen((o) => !o)}
          >
            <span>🎟️ Meus códigos</span>
            <span className="bf-wallet-count">{walletEntries.length}</span>
          </button>
        </div>
      ) : null}

      <div className={`bf-copy-toast${toastMsg ? ' show' : ''}`} role="status" aria-live="polite">
        {toastMsg ?? ''}
      </div>
    </div>
  );
}
