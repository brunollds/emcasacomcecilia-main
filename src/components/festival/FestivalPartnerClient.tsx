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
import { copyTextWithFallback } from '@/lib/clipboardUtils';
import { openConsentPreferences } from '@/lib/consent';
import type { FestivalPartnerPageData } from '@/lib/festivalBlackFriday';
import {
  CeciliaAvatar,
  FestivalBannerStripCard,
  FestivalTimerPill,
  StoreOrb,
  getActiveLimitedCode,
  getClientMinuteSnapshot,
  getLiveBannerStrips,
  getLiveCampaigns,
  getReducedMotionSnapshot,
  getUpcomingLimitedCode,
  subscribeMinuteClock,
  subscribeReducedMotion,
  type ManualCopyPrompt,
  type WalletEntry,
} from './FestivalStageClient';
import './festival-stage.css';

const BF_WEEK_END_MS = Date.parse('2026-11-30T23:59:59-03:00');

export function FestivalPartnerClient({ data }: { data: FestivalPartnerPageData }) {
  const serverMs = useMemo(() => Date.parse(data.generatedAtIso), [data.generatedAtIso]);
  const minuteNowMs = useSyncExternalStore(subscribeMinuteClock, getClientMinuteSnapshot, () => serverMs);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );

  const isBfSeason = minuteNowMs <= BF_WEEK_END_MS;

  const [copiedCodes, setCopiedCodes] = useState<Record<string, boolean>>({});
  const [wallet, setWallet] = useState<Record<string, WalletEntry>>({});
  const [walletOpen, setWalletOpen] = useState(false);
  const [manualCopyPrompt, setManualCopyPrompt] = useState<ManualCopyPrompt | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [motionOverride, setMotionOverride] = useState<'auto' | 'paused' | 'forced'>('auto');

  const motionEnabled =
    motionOverride === 'forced' ? true : motionOverride === 'paused' ? false : !prefersReducedMotion;

  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);
  const manualInputRef = useRef<HTMLInputElement>(null);
  const toastTimerRef = useRef<number | null>(null);
  const confettiRef = useRef<{
    particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; color: string; life: number }>;
    raf: number | null;
  }>({ particles: [], raf: null });

  const { store } = data;
  const liveBannerStrips = useMemo(
    () => getLiveBannerStrips(data.bannerStrips, minuteNowMs),
    [data.bannerStrips, minuteNowMs],
  );
  const liveCampaigns = useMemo(
    () => getLiveCampaigns(store.campaigns, minuteNowMs),
    [store.campaigns, minuteNowMs],
  );
  const activeLimited = useMemo(
    () => getActiveLimitedCode(store.limitedCodes, minuteNowMs),
    [store.limitedCodes, minuteNowMs],
  );
  const upcomingLimited = useMemo(
    () => getUpcomingLimitedCode(store.limitedCodes, minuteNowMs),
    [store.limitedCodes, minuteNowMs],
  );

  const effectiveCode = activeLimited ? activeLimited.code : store.code;
  const effectiveDiscount = activeLimited ? activeLimited.discount : store.discount;

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToastMsg(null), 3200);
  }, []);

  useEffect(() => {
    if (motionEnabled) return;
    if (confettiRef.current.raf) {
      cancelAnimationFrame(confettiRef.current.raf);
      confettiRef.current.raf = null;
    }
    confettiRef.current.particles = [];
    const canvas = confettiCanvasRef.current;
    canvas?.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
  }, [motionEnabled]);

  const burstConfetti = useCallback(
    (clientX: number, clientY: number) => {
      if (!motionEnabled) return;
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
    [motionEnabled],
  );

  const handleCopyAndGo = useCallback(
    async (
      codeToCopy: string,
      discountLabel: string,
      ev: React.MouseEvent<HTMLAnchorElement>,
      targetUrl?: string,
    ) => {
      const destinationUrl = targetUrl || store.offerUrl;
      const { clientX, clientY } = ev;
      const triggerEl = ev.currentTarget;

      trackEvent('coupon_store_click', {
        coupon_code: codeToCopy,
        brand: store.brand,
        placement: 'festival_blackfriday',
        url: destinationUrl,
      });

      const ok = await copyTextWithFallback(codeToCopy, triggerEl);
      if (ok) {
        trackEvent('coupon_copy', {
          coupon_code: codeToCopy,
          brand: store.brand,
          placement: 'festival_blackfriday',
        });

        setManualCopyPrompt(null);
        setCopiedCodes((prev) => ({ ...prev, [codeToCopy]: true }));
        setWallet((prev) => ({
          ...prev,
          [codeToCopy]: {
            slug: `${store.slug}-${codeToCopy}`,
            brand: store.brand,
            code: codeToCopy,
            discount: discountLabel,
            url: destinationUrl,
          },
        }));

        if (clientX || clientY) {
          burstConfetti(clientX, clientY);
        }
        showToast(`✓ ${codeToCopy} copiado! Abrindo ${store.brand}…`);
      } else {
        setManualCopyPrompt({
          slug: `${store.slug}-${codeToCopy}`,
          brand: store.brand,
          code: codeToCopy,
          discount: discountLabel,
          url: destinationUrl,
        });
      }
    },
    [store.brand, store.offerUrl, store.slug, burstConfetti, showToast],
  );

  const handleManualCopyRetry = useCallback(
    async (ev: React.MouseEvent<HTMLButtonElement>) => {
      if (!manualCopyPrompt) return;
      const triggerEl = ev.currentTarget;
      manualInputRef.current?.focus();
      manualInputRef.current?.select();
      const ok = await copyTextWithFallback(manualCopyPrompt.code, triggerEl);
      if (ok) {
        trackEvent('coupon_copy', {
          coupon_code: manualCopyPrompt.code,
          brand: manualCopyPrompt.brand,
          placement: 'festival_blackfriday',
        });
        setCopiedCodes((prev) => ({ ...prev, [manualCopyPrompt.code]: true }));
        setWallet((prev) => ({
          ...prev,
          [manualCopyPrompt.code]: {
            slug: manualCopyPrompt.slug,
            brand: manualCopyPrompt.brand,
            code: manualCopyPrompt.code,
            discount: manualCopyPrompt.discount,
            url: manualCopyPrompt.url,
          },
        }));
        const code = manualCopyPrompt.code;
        setManualCopyPrompt(null);
        showToast(`✓ ${code} copiado!`);
      } else {
        showToast('Toque e segure o código selecionado para copiar.');
      }
    },
    [manualCopyPrompt, showToast],
  );

  useEffect(() => {
    if (!manualCopyPrompt) return;
    const input = manualInputRef.current;
    if (!input) return;
    input.scrollIntoView({ block: 'nearest' });
    input.select();
  }, [manualCopyPrompt]);

  const handleStoreOnlyClick = useCallback(
    (customUrl?: string) => {
      trackEvent('coupon_store_click', {
        brand: store.brand,
        placement: 'festival_blackfriday',
        url: customUrl || store.offerUrl,
      });
    },
    [store.brand, store.offerUrl],
  );

  const handleToggleMotion = () => {
    if (motionEnabled) {
      setMotionOverride('paused');
      showToast('Efeitos visuais pausados.');
    } else {
      setMotionOverride(prefersReducedMotion ? 'forced' : 'auto');
      showToast('✨ Efeitos visuais ativados!');
    }
  };

  const heroAriaLabel =
    store.codeKind === 'reward' && effectiveCode
      ? `${store.brand}: Reward Code ${effectiveCode}`
      : effectiveCode
        ? `${store.brand}: ${effectiveDiscount} com ${effectiveCode}`
        : `${store.brand}: ${effectiveDiscount}`;

  const walletEntries = Object.values(wallet);
  const rootClasses = `bf-root${!motionEnabled ? ' is-paused' : ''}${motionOverride === 'forced' ? ' is-forced' : ''}`;

  return (
    <div className={rootClasses} id="topo">
      <canvas ref={confettiCanvasRef} className="bf-confetti-canvas" aria-hidden="true" />

      <header className="bf-top-stage">
        <div className="bf-stage-grid-bg" aria-hidden="true" />

        <div className="bf-wrap bf-masthead">
          <Link href="/" className="bf-brand-id">
            <CeciliaAvatar url={data.ceciliaAvatarUrl} />
            <span className="bf-brand-title">
              Em Casa<span>com Cecília</span>
            </span>
          </Link>

          <FestivalTimerPill storeCount={data.totalPartnerCount} serverMs={serverMs} />
        </div>

        <div className="bf-wrap bf-p-subbar">
          <Link href="/blackfriday" className="bf-p-back-pill">
            ← Voltar ao Festival ({data.totalPartnerCount} parceiras)
          </Link>
        </div>

        <div className="bf-wrap">
          <article
            className={`bf-p-hero${data.heroImageUrl ? '' : ' no-photo'}`}
            aria-label={heroAriaLabel}
            style={{ '--c': store.brandColor } as CSSProperties}
          >
            <div className="bf-p-hero-main">
              <div className="bf-p-brand-row">
                <StoreOrb store={store} size={64} eager />
                <div>
                  <span className="bf-p-eyebrow">
                    {isBfSeason ? `Black Friday · ${store.categoryName}` : store.categoryName}
                  </span>
                  <h1 className="bf-p-h1">
                    {store.brand}{' '}
                    <span className="bf-p-offer-highlight">· {effectiveDiscount}</span>
                  </h1>
                </div>
              </div>

              <p className="bf-p-lead">
                <strong>Onde vale:</strong> {store.eligibleCategories}.{' '}
                {store.combinable ? `${store.combinable}.` : ''}
              </p>

              {activeLimited ? (
                <div className="bf-flash-unlock">
                  ⚡ Código especial <b>{activeLimited.code}</b> (<b>{activeLimited.discount}</b>) liberado agora até {activeLimited.endLabel}!
                </div>
              ) : upcomingLimited ? (
                <div className="bf-flash-unlock">
                  ⚡ Em breve entra o código <b>{upcomingLimited.code}</b> (<b>{upcomingLimited.discount}</b> até {upcomingLimited.endLabel}). Hoje já vale {store.discount}:
                </div>
              ) : null}

              {store.referral ? (
                <div className="bf-flash-unlock">
                  🔎 <strong>{store.referral.label} ({store.referral.code}):</strong> {store.referral.instructions}
                </div>
              ) : null}

              {effectiveCode ? (
                <div className={`bf-vip-stub${copiedCodes[effectiveCode] ? ' is-copied' : ''}`}>
                  <div className="bf-vip-code-box">
                    <span className="bf-vip-code-label">
                      {store.codeKind === 'reward'
                        ? `Reward Code (${store.codeFieldLabel ?? 'Reward Code'})`
                        : store.codeFieldLabel
                          ? `Campo: ${store.codeFieldLabel}`
                          : 'Código oficial · Toque para copiar e abrir'}
                    </span>
                    <code className="bf-vip-code-text">{effectiveCode}</code>
                  </div>
                  <a
                    className="bf-vip-copy-go"
                    href={store.offerUrl}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    onClick={(ev) => handleCopyAndGo(effectiveCode, effectiveDiscount, ev)}
                  >
                    {copiedCodes[effectiveCode] ? '✓ Copiado · Abrir ↗' : `Copiar e abrir ${store.brand} ↗`}
                  </a>
                </div>
              ) : (
                <a
                  href={store.offerUrl}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="bf-btn-link-full"
                  onClick={() => handleStoreOnlyClick()}
                >
                  {store.actionLabel || `Abrir ofertas na ${store.brand}`} ↗
                </a>
              )}

              {manualCopyPrompt ? (
                <div
                  className="bf-manual-copy-inline"
                  role="region"
                  aria-label={`Copiar código da ${manualCopyPrompt.brand}`}
                >
                  <div className="bf-manual-copy-head">
                    <span className="bf-manual-copy-title">
                      A {manualCopyPrompt.brand} abriu em outra aba. Toque para copiar o código:
                    </span>
                    <button
                      type="button"
                      className="bf-icon-close-btn"
                      onClick={() => setManualCopyPrompt(null)}
                      aria-label="Fechar aviso de cópia"
                    >
                      ×
                    </button>
                  </div>
                  <div className="bf-manual-copy-row">
                    <input
                      ref={manualInputRef}
                      className="bf-manual-copy-input"
                      type="text"
                      readOnly
                      value={manualCopyPrompt.code}
                      aria-label={`Código da ${manualCopyPrompt.brand}`}
                      onFocus={(ev) => ev.currentTarget.select()}
                      onClick={(ev) => ev.currentTarget.select()}
                    />
                    <button type="button" className="bf-manual-copy-btn" onClick={handleManualCopyRetry}>
                      Copiar
                    </button>
                  </div>
                </div>
              ) : null}
            </div>

            {data.heroImageUrl ? (
              <div className="bf-p-photo-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.heroImageUrl} alt="" loading="eager" decoding="async" />
              </div>
            ) : null}
          </article>
        </div>
      </header>

      <main className="bf-wrap">
        {/* 0. FAIXA DE OFERTA ESPECIAL (ex.: Netshoes / Rakuten) */}
        {liveBannerStrips.length > 0 ? (
          <section className="bf-p-sec" aria-label={`Oferta especial ${store.brand}`}>
            <div className="bf-banner-strips-stack">
              {liveBannerStrips.map((strip) => (
                <FestivalBannerStripCard key={strip.id} strip={strip} />
              ))}
            </div>
          </section>
        ) : null}

        {/* 1. CAMPANHAS EM VIGOR NA MARCA */}
        {liveCampaigns.length > 0 ? (
          <section className="bf-p-sec" aria-labelledby="partner-camps-title">
            <h2 className="bf-p-sec-title" id="partner-camps-title">
              🔥 Campanhas ativas na {store.brand}
            </h2>
            <div className="bf-p-camps-grid">
              {liveCampaigns.map((camp) => (
                <div key={camp.id} className="bf-p-camp-card">
                  <div>
                    {camp.tag ? <span className="bf-p-camp-tag">{camp.tag}</span> : null}
                    <h3 className="bf-p-camp-headline">{camp.headline}</h3>
                    <p className="bf-p-camp-text">
                      {camp.text}
                      {camp.storeAppCode ? ` (código no app da loja: ${camp.storeAppCode})` : ''}
                    </p>
                  </div>
                  {camp.internal ? (
                    <Link href={camp.href} className="bf-p-camp-btn">
                      {camp.action || 'Ler guia da campanha'} →
                    </Link>
                  ) : (
                    <a
                      href={camp.href}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      className="bf-p-camp-btn"
                      onClick={(ev) => {
                        if (effectiveCode) {
                          handleCopyAndGo(effectiveCode, effectiveDiscount, ev, camp.href);
                        } else {
                          handleStoreOnlyClick(camp.href);
                        }
                      }}
                    >
                      {effectiveCode ? `Copiar ${effectiveCode} + abrir ↗` : `${camp.action || 'Ver campanha'} ↗`}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* 2. FAIXAS DE VALOR (ex.: Magalu) */}
        {data.tiers && data.tiers.length > 0 ? (
          <section className="bf-p-sec" aria-labelledby="partner-tiers-title">
            <h2 className="bf-p-sec-title" id="partner-tiers-title">
              🏷️ Escolha o código da sua faixa de compra
            </h2>
            <div className="bf-p-tier-list">
              {data.tiers.map((tier) => (
                <div key={tier.code} className="bf-p-tier-row">
                  <div>
                    <div className="bf-p-tier-code">{tier.code}</div>
                    <div className="bf-p-tier-meta">
                      <strong>{tier.discount}</strong> · a partir de {tier.minPurchase}
                    </div>
                  </div>
                  <a
                    href={store.offerUrl}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className={`bf-p-tier-btn${copiedCodes[tier.code] ? ' is-copied' : ''}`}
                    onClick={(ev) => handleCopyAndGo(tier.code, tier.discount, ev)}
                  >
                    {copiedCodes[tier.code] ? '✓ Copiado ↗' : 'Copiar e ir ↗'}
                  </a>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* 3. LINKS POR PRODUTO (ex.: Proton VPN, Mail, Pass, Drive) */}
        {data.productLinks && data.productLinks.length > 0 ? (
          <section className="bf-p-sec" aria-labelledby="partner-products-title">
            <h2 className="bf-p-sec-title" id="partner-products-title">
              🔗 Ofertas por produto {store.brand}
            </h2>
            <div className="bf-p-camps-grid">
              {data.productLinks.map((pl) => (
                <div key={pl.url} className="bf-p-camp-card">
                  <div>
                    <h3 className="bf-p-camp-headline">{pl.name}</h3>
                    <p className="bf-p-camp-text">{pl.description}</p>
                  </div>
                  <a
                    href={pl.url}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="bf-p-camp-btn"
                    onClick={() => handleStoreOnlyClick(pl.url)}
                  >
                    Abrir {pl.name} ↗
                  </a>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* 4. OFERTAS PROMOCIONAIS DA PRÓPRIA YESSTYLE (somam com o Reward Code) */}
        {data.yesstylePromos && data.yesstylePromos.length > 0 ? (
          <section className="bf-p-sec" aria-labelledby="partner-ys-promos-title">
            <h2 className="bf-p-sec-title" id="partner-ys-promos-title">
              ✨ Ofertas temporárias da própria YesStyle (campo Coupon Code)
            </h2>
            <div className="bf-p-tier-list">
              {data.yesstylePromos.map((promo) => (
                <div key={promo.id} className="bf-p-tier-row">
                  <div>
                    <div className="bf-p-tier-code">{promo.code}</div>
                    <div className="bf-p-tier-meta">
                      <strong>{promo.discountLabel}</strong> · {promo.validityLabel}
                      {promo.conditions.length > 0 ? ` · ${promo.conditions.join(' · ')}` : ''}
                    </div>
                  </div>
                  <a
                    href={store.offerUrl}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className={`bf-p-tier-btn${copiedCodes[promo.code] ? ' is-copied' : ''}`}
                    onClick={(ev) => handleCopyAndGo(promo.code, promo.discountLabel, ev)}
                  >
                    {copiedCodes[promo.code] ? '✓ Copiado ↗' : 'Copiar e ir ↗'}
                  </a>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* 5. COMO USAR + O QUE ACUMULA */}
        <div className="bf-p-cols">
          <section className="bf-p-card" aria-labelledby="partner-how-title">
            <h2 id="partner-how-title">Passo a passo no carrinho</h2>
            <ol className="bf-p-steps">
              {data.instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            {data.testedNote ? (
              <div className="bf-p-test-box">
                <strong>✓ Teste verificado em {data.testedNote.dateLabel}:</strong> {data.testedNote.note}
              </div>
            ) : null}
          </section>

          <section className="bf-p-card" aria-labelledby="partner-rules-title">
            <h2 id="partner-rules-title">Regras &amp; o que acumula</h2>
            {data.stacking.length > 0 ? (
              <div className="bf-p-stack-list">
                {data.stacking.map((row, idx) => (
                  <div key={idx} className="bf-p-stack-row">
                    <div className="bf-p-stack-top">
                      <span>{row.label}</span>
                      <span className={`bf-p-stack-badge is-${row.stacks}`}>
                        {row.stacks === 'sim' ? 'Soma' : row.stacks === 'depende' ? 'Depende' : 'Não soma'}
                      </span>
                    </div>
                    <span>{row.condition}</span>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="bf-p-rule-list">
              <div>
                <strong>Frete:</strong> {data.shipping}.
              </div>
              <div>
                <strong>Reuso:</strong> {data.reusable}.
              </div>
              {data.paymentPerks.length > 0 ? (
                <div>
                  <strong>Pagamento:</strong> {data.paymentPerks.join(' · ')}.
                </div>
              ) : null}
            </div>

            {store.storePageUrl ? (
              <Link href={store.storePageUrl} className="bf-modal-page-btn">
                Ver todas as perguntas e regras em {store.storePageUrl} →
              </Link>
            ) : null}
          </section>
        </div>

        {/* 6. GUIAS & ANÁLISES PUBLICADOS DA MARCA */}
        {data.allArticles.length > 0 ? (
          <section className="bf-p-sec" aria-labelledby="partner-articles-title">
            <div className="bf-act-header">
              <div>
                <span className="bf-act-eyebrow">Conteúdo do Em Casa com Cecília</span>
                <h2 className="bf-p-sec-title" id="partner-articles-title">
                  Guias &amp; análises sobre a {store.brand}
                </h2>
              </div>
              {store.allArticlesHref ? (
                <Link href={store.allArticlesHref} className="bf-p-back-pill">
                  Ver todos os {store.articleCount} artigos →
                </Link>
              ) : null}
            </div>
            <div className="bf-p-articles-grid">
              {data.allArticles.map((art) => (
                <Link key={art.slug} href={art.href} className="bf-p-article-card">
                  {art.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="bf-p-article-img" src={art.imageUrl} alt="" loading="lazy" decoding="async" />
                  ) : null}
                  <div className="bf-p-article-body">
                    <span className="bf-p-article-type">{art.type}</span>
                    <h3 className="bf-p-article-title">{art.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {/* 7. OUTRAS PARCEIRAS NO FESTIVAL */}
        <section className="bf-p-sec" aria-labelledby="partner-others-title">
          <h2 className="bf-p-sec-title" id="partner-others-title">
            Outras parceiras no Festival
          </h2>
          <div className="bf-p-others-rail">
            {data.otherPartners.map((other) => (
              <Link key={other.slug} href={other.festivalPageUrl} className="bf-p-other-chip">
                <StoreOrb store={other} size={32} />
                <span>{other.brand}</span>
                <small>{other.discount.replace(' OFF', '')}</small>
              </Link>
            ))}
            <Link href="/blackfriday" className="bf-p-back-pill">
              Ver todas as {data.totalPartnerCount} lojas no Pôster →
            </Link>
          </div>
        </section>
      </main>

      <footer className="bf-stage-footer">
        <div className="bf-wrap bf-footer-inner">
          <div className="bf-footer-copy">
            <p className="bf-footer-note">
              <strong>Transparência Em Casa com Cecília:</strong>{' '}
              {isBfSeason
                ? 'as campanhas de Black Friday são das próprias lojas e mudam sem aviso.'
                : 'as campanhas promocionais são das próprias lojas e mudam sem aviso.'}{' '}
              Quando você usa nossos códigos ou links oficiais, podemos receber comissão sem custo extra para você.
            </p>
            <div className="bf-footer-links">
              <Link href="/blackfriday">Voltar ao Festival (/blackfriday)</Link>
              {store.storePageUrl ? (
                <Link href={store.storePageUrl}>Página permanente da {store.brand} em /cupons</Link>
              ) : (
                <Link href="/cupons">Ver todas as lojas em /cupons</Link>
              )}
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
            aria-pressed={!motionEnabled}
            onClick={handleToggleMotion}
          >
            {motionEnabled ? '⏸ Pausar efeitos' : '▶️ Ativar efeitos'}
          </button>
        </div>
      </footer>

      {walletEntries.length > 0 ? (
        <div className="bf-vip-wallet">
          {walletOpen ? (
            <div className="bf-wallet-drawer">
              <div className="bf-wallet-head">
                <strong className="bf-wallet-title">🎟️ Códigos copiados nesta visita</strong>
                <button
                  type="button"
                  className="bf-icon-close-btn"
                  onClick={() => setWalletOpen(false)}
                  aria-label="Fechar carteira"
                >
                  ×
                </button>
              </div>
              <div className="bf-wallet-list">
                {walletEntries.map((item) => (
                  <div key={item.slug} className="bf-wallet-item">
                    <div>
                      <strong>{item.brand}</strong>{' '}
                      <span className="bf-wallet-disc">{item.discount}</span>
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
