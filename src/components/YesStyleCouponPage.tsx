import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CopyButton, FAQAccordion } from '@/components/CouponComponents';
import { CouponBottomBar } from '@/components/CouponBottomBar';
import {
  getYesStyleLocaleConfig,
  getYesStyleArticle,
  getHubLanguageLinks,
  YESSTYLE_LOCALES,
} from '@/lib/i18n/clusters/yesstyle';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';
import type { Locale } from '@/lib/i18n/locales';
import {
  getPrimaryRewardCode,
  getActivePromoCoupons,
  getLatestYesStyleVerifiedAtISO,
  type YesStyleRewardOffer,
  type YesStylePromoOffer,
} from '@/lib/yesstyleCoupons';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { getYesStylePage, type PageCopy } from '@/components/coupons/yesstyleCopy';

export interface ResolvedPromoOffer {
  id: string;
  code: string;
  discountLabel: string;
  validityLabel: string;
  regionLabel: string;
  formattedVerifiedDate: string;
  officialSourceUrl: string;
  proofLabel: string;
  copyAria: string;
}

export interface ResolvedYesStylePage {
  locale: Locale;
  language: string;
  htmlLang: string;
  homeLabel: string;
  couponsLabel: string;
  canonicalUrl: string;
  verifiedAtISO: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  updatedLabel: string;
  formattedDate: string;
  copy: string;
  copied: string;
  copyAria: string;
  visit: string;
  rewardCardBadge: string;
  rewardCardDescription: string;
  rewardDiscountValue: string;
  promosSectionTitle: string;
  emptyPromosNotice: string;
  emptyPromosSubtext: string;
  proofLabel: string;
  tableHeaders: PageCopy['tableHeaders'];
  offerTypeReward: string;
  offerTypeCoupon: string;
  activePromoOffers: ResolvedPromoOffer[];
  details: string;
  codeLabel: string;
  discountLabel: string;
  discountValue: string;
  fieldLabel: string;
  fieldValue: string;
  instructionsTitle: string;
  instructions: string[];
  note: string;
  relatedContentTitle: string;
  rewardArticleCardTitle: string;
  rewardArticleCardSubtext: string;
  guideCardTitle: string;
  guideCardSubtext: string;
  rewardArticlePath: string;
  guidePath: string;
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  transparency: string;
  rewardCode: string;
  affiliateUrl: string;
}

export interface BreadcrumbItemSpec {
  name: string;
  item: string;
}

// Helper puro exportado para construção e teste estrito dos breadcrumbs (3 níveis em PT, 2 níveis nos internacionais)
export function getYesStyleBreadcrumbItems(
  locale: Locale,
  canonicalUrl: string,
  homeLabel: string,
  couponsLabel: string
): BreadcrumbItemSpec[] {
  if (locale === 'pt') {
    return [
      { name: homeLabel, item: 'https://emcasacomcecilia.com' },
      { name: couponsLabel, item: 'https://emcasacomcecilia.com/cupons' },
      { name: 'YesStyle', item: canonicalUrl },
    ];
  }
  return [
    { name: homeLabel, item: 'https://emcasacomcecilia.com' },
    { name: 'YesStyle', item: canonicalUrl },
  ];
}

function formatIsoDateUTC(dateIso: string, language: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateIso)) {
    throw new Error(`[formatIsoDateUTC] Formato de data ISO inválido (esperado YYYY-MM-DD): "${dateIso}"`);
  }
  const [year, month, day] = dateIso.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toLocaleDateString(language, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function fillPlaceholders(template: string, reward: YesStyleRewardOffer, promoCode = ''): string {
  return template
    .replace(/\{code\}/g, reward.code)
    .replace(/\{newDiscount\}/g, String(reward.newCustomerDiscount))
    .replace(/\{returningDiscount\}/g, String(reward.returningCustomerDiscount))
    .replace(/\{promoCode\}/g, promoCode);
}

export function resolveYesStylePage(
  locale: string,
  rewardInput?: YesStyleRewardOffer,
  promosInput?: YesStylePromoOffer[]
): ResolvedYesStylePage | null {
  const page = getYesStylePage(locale);
  if (!page) return null;

  const reward = rewardInput || getPrimaryRewardCode();
  const promos = promosInput !== undefined ? promosInput : getActivePromoCoupons();
  const config = getYesStyleLocaleConfig(page.locale);

  // [Arquitetura Centralizada]: Usa helper getLatestYesStyleVerifiedAtISO quando usando entradas de produção
  const latestVerifiedAtISO = rewardInput || promosInput
    ? [reward.verifiedAt, ...promos.map((p) => p.verifiedAt)].reduce((latest, date) => (date > latest ? date : latest), reward.verifiedAt)
    : getLatestYesStyleVerifiedAtISO();

  const formattedDate = formatIsoDateUTC(latestVerifiedAtISO, page.language);

  const canonicalUrl =
    page.locale === 'pt'
      ? 'https://emcasacomcecilia.com/cupons/yesstyle'
      : `https://emcasacomcecilia.com${config.hubPath}`;

  const activePromoOffers: ResolvedPromoOffer[] = promos.map((promo) => {
    let discountStr = '';
    if (promo.discount.kind === 'percentage') {
      discountStr = `${promo.discount.value}% OFF`;
    } else if (promo.discount.kind === 'fixed') {
      discountStr = `${promo.discount.currency} ${promo.discount.value} OFF`;
    } else if (promo.discount.kind === 'shipping') {
      discountStr = page.freeShippingLabel;
    } else {
      discountStr = promo.discount.label;
    }

    const validityLabel = promo.expiresAt
      ? formatIsoDateUTC(promo.expiresAt, page.language)
      : page.validityUnconfirmed;

    const regionLabel = promo.regions && promo.regions.length > 0
      ? promo.regions.join(', ')
      : page.regionUnconfirmed;

    return {
      id: promo.id,
      code: promo.code,
      discountLabel: discountStr,
      validityLabel,
      regionLabel,
      formattedVerifiedDate: formatIsoDateUTC(promo.verifiedAt, page.language),
      officialSourceUrl: promo.officialSourceUrl,
      proofLabel: page.proofLabel,
      copyAria: fillPlaceholders(page.copyAriaPromoTemplate, reward, promo.code),
    };
  });

  const firstPromoCode = activePromoOffers.length > 0 ? activePromoOffers[0].code : '';

  const instructionsTemplatesToUse = activePromoOffers.length > 0
    ? page.instructionsTemplates
    : page.emptyPromoInstructionsTemplates;

  return {
    locale: page.locale,
    language: page.language,
    htmlLang: config.htmlLang,
    homeLabel: page.homeLabel,
    couponsLabel: page.couponsLabel,
    canonicalUrl,
    verifiedAtISO: latestVerifiedAtISO,
    eyebrow: page.eyebrow,
    title: fillPlaceholders(page.titleTemplate, reward, firstPromoCode),
    description: fillPlaceholders(page.descriptionTemplate, reward, firstPromoCode),
    intro: fillPlaceholders(page.introTemplate, reward, firstPromoCode),
    updatedLabel: page.updated,
    formattedDate,
    copy: page.copy,
    copied: page.copied,
    copyAria: fillPlaceholders(page.copyAriaTemplate, reward, firstPromoCode),
    visit: page.visit,
    rewardCardBadge: page.rewardCardBadge,
    rewardCardDescription: fillPlaceholders(page.rewardCardDescriptionTemplate, reward, firstPromoCode),
    rewardDiscountValue: fillPlaceholders(page.rewardDiscountValueTemplate, reward, firstPromoCode),
    promosSectionTitle: page.promosSectionTitle,
    emptyPromosNotice: fillPlaceholders(page.emptyPromosNoticeTemplate, reward, firstPromoCode),
    emptyPromosSubtext: fillPlaceholders(page.emptyPromosSubtextTemplate, reward, firstPromoCode),
    proofLabel: page.proofLabel,
    tableHeaders: page.tableHeaders,
    offerTypeReward: page.offerTypeReward,
    offerTypeCoupon: page.offerTypeCoupon,
    activePromoOffers,
    details: page.details,
    codeLabel: page.codeLabel,
    discountLabel: page.discountLabel,
    discountValue: fillPlaceholders(page.discountValueTemplate, reward, firstPromoCode),
    fieldLabel: page.fieldLabel,
    fieldValue: page.fieldValue,
    instructionsTitle: fillPlaceholders(page.instructionsTitleTemplate, reward, firstPromoCode),
    instructions: instructionsTemplatesToUse.map((item) => fillPlaceholders(item, reward, firstPromoCode)),
    note: fillPlaceholders(page.noteTemplate, reward, firstPromoCode),
    relatedContentTitle: page.relatedContentTitle,
    rewardArticleCardTitle: fillPlaceholders(page.rewardArticleCardTitleTemplate, reward, firstPromoCode),
    rewardArticleCardSubtext: page.rewardArticleCardSubtext,
    guideCardTitle: page.guideCardTitle,
    guideCardSubtext: page.guideCardSubtext,
    rewardArticlePath: getYesStyleArticle(page.locale, 'reward').path,
    guidePath: getYesStyleArticle(page.locale, 'guide').path,
    faqTitle: page.faqTitle,
    faqs: page.faqs.map((faq) => ({
      question: fillPlaceholders(faq.question, reward, firstPromoCode),
      answer: fillPlaceholders(faq.answer, reward, firstPromoCode),
    })),
    transparency: fillPlaceholders(page.transparencyTemplate, reward, firstPromoCode),
    rewardCode: reward.code,
    affiliateUrl: reward.affiliateUrl,
  };
}

export function getYesStyleMetadata(locale: string): Metadata {
  const resolved = resolveYesStylePage(locale);
  if (!resolved) return {};
  const config = getYesStyleLocaleConfig(locale);

  const canonical = resolved.canonicalUrl;

  const languages: Record<string, string> = {};
  for (const locConfig of Object.values(YESSTYLE_LOCALES)) {
    languages[locConfig.hreflang] = `https://emcasacomcecilia.com${locConfig.hubPath}`;
  }
  languages['x-default'] = 'https://emcasacomcecilia.com/en/coupons/yesstyle';

  return {
    title: resolved.title,
    description: resolved.description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: resolved.title,
      description: resolved.description,
      url: canonical,
      locale: config.openGraphLocale,
      type: 'website',
    },
  };
}

export function YesStyleCouponPage({ locale }: { locale: string }) {
  const resolved = resolveYesStylePage(locale);
  if (!resolved) return null;

  const languageLinks = getHubLanguageLinks();
  const breadcrumbItems = getYesStyleBreadcrumbItems(resolved.locale, resolved.canonicalUrl, resolved.homeLabel, resolved.couponsLabel);

  // Schemas JSON-LD B2
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: resolved.title,
    description: resolved.description,
    url: resolved.canonicalUrl,
    inLanguage: resolved.htmlLang,
    dateModified: resolved.verifiedAtISO,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((b, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: b.name,
      item: b.item,
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: resolved.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <main lang={resolved.htmlLang} className="min-h-screen bg-[#fef9f3] pb-24 lg:pb-0">
      {/* Schemas JSON-LD Estruturados para B2 */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Header hero */}
      <section className="bg-[#0f1d3a] px-4 py-12 text-white md:py-16">
        <div className="mx-auto max-w-5xl">
          <nav className="mb-6 text-xs text-white/55">
            {breadcrumbItems.map((b, idx) => (
              <span key={b.item}>
                {idx > 0 ? <span className="mx-2">/</span> : null}
                {idx < breadcrumbItems.length - 1 ? (
                  <Link href={b.item.replace('https://emcasacomcecilia.com', '') || '/'}>{b.name}</Link>
                ) : (
                  <span>{b.name}</span>
                )}
              </span>
            ))}
          </nav>
          <div className="flex gap-5 md:items-center">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-white p-2">
              <Image src={resolveMediaUrl('/images/logos/yesstyle.jpg')} alt="YesStyle" fill sizes="80px" className="object-contain p-2" priority />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[.16em] text-[#ffd23f]">{resolved.eyebrow}</p>
              <h1 className="mt-2 font-heading text-3xl font-black leading-tight md:text-5xl">{resolved.title}</h1>
              <p className="mt-4 max-w-2xl text-white/78">{resolved.intro}</p>
              <p className="mt-4 text-xs text-white/55">{resolved.updatedLabel}: {resolved.formattedDate}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Language Switcher (Hub ↔ Hub) */}
      <section className="px-4 pt-8">
        <div className="mx-auto max-w-5xl">
          <LanguageSwitcher currentLocale={resolved.locale} links={languageLinks} />
        </div>
      </section>

      {/* Card Permanente 1: Reward Code (CECILIA010) */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#111827] p-7 text-white shadow-large md:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#ffd23f] px-3.5 py-1 text-xs font-black uppercase tracking-[.14em] text-[#4a2400]">
                {resolved.rewardCardBadge}
              </span>
              <span className="rounded-full bg-white/15 px-3.5 py-1 text-xs font-bold text-white">
                {resolved.rewardDiscountValue}
              </span>
            </div>

            <p className="mt-6 font-mono text-4xl font-black tracking-[.08em] md:text-6xl">{resolved.rewardCode}</p>
            <p className="mt-4 max-w-2xl text-white/85">{resolved.rewardCardDescription}</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <CopyButton code={resolved.rewardCode} label={resolved.copy} copiedLabel={resolved.copied} ariaLabel={resolved.copyAria} />
              <a
                href={resolved.affiliateUrl}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-white/30 px-4 py-2.5 text-sm font-semibold hover:bg-white/15 transition-colors"
              >
                {resolved.visit}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 2: Cupons Promocionais Verificados (Tabela simplificada de 6 colunas) */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-heading text-2xl font-black text-[#0f1419]">{resolved.promosSectionTitle}</h2>

          {resolved.activePromoOffers.length > 0 ? (
            <div className="mt-6">
              {/* Table view para Desktop */}
              <div className="hidden md:block overflow-hidden rounded-2xl border border-black/10 bg-white shadow-soft">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#0f1d3a] text-white">
                    <tr>
                      <th className="px-4 py-3.5 font-bold">{resolved.tableHeaders.type}</th>
                      <th className="px-4 py-3.5 font-bold">{resolved.tableHeaders.code}</th>
                      <th className="px-4 py-3.5 font-bold">{resolved.tableHeaders.discount}</th>
                      <th className="px-4 py-3.5 font-bold">{resolved.tableHeaders.validity}</th>
                      <th className="px-4 py-3.5 font-bold">{resolved.tableHeaders.region}</th>
                      <th className="px-4 py-3.5 font-bold">{resolved.tableHeaders.verified}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/8">
                    {resolved.activePromoOffers.map((promo) => (
                      <tr key={promo.id} className="hover:bg-[#fef9f3] transition-colors">
                        <td className="px-4 py-4 font-semibold text-[#0f1419]">
                          <span className="inline-flex items-center rounded-md bg-[#ff6b35]/12 px-2.5 py-1 text-xs font-bold text-[#7c2d12]">
                            {resolved.offerTypeCoupon}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <CopyButton
                            code={promo.code}
                            label={promo.code}
                            copiedLabel={resolved.copied}
                            ariaLabel={promo.copyAria}
                            variant="outline"
                            className="font-mono text-base font-black tracking-wider text-[#0f1419] border-[#0f1419]/20 hover:border-[#ff6b35]"
                          />
                        </td>
                        <td className="px-4 py-4 font-bold text-[#ff6b35]">{promo.discountLabel}</td>
                        <td className="px-4 py-4 text-xs text-[#0f1419]/75">{promo.validityLabel}</td>
                        <td className="px-4 py-4 text-xs text-[#0f1419]/75">{promo.regionLabel}</td>
                        <td className="px-4 py-4 text-xs text-[#0f1419]/65">{promo.formattedVerifiedDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards View */}
              <div className="grid gap-4 md:hidden">
                {resolved.activePromoOffers.map((promo) => (
                  <div key={promo.id} className="rounded-2xl border border-black/10 bg-white p-5 shadow-soft">
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-[#ff6b35]/12 px-2.5 py-1 text-xs font-bold text-[#7c2d12]">
                        {resolved.offerTypeCoupon}
                      </span>
                      <span className="font-bold text-[#ff6b35] text-sm">{promo.discountLabel}</span>
                    </div>

                    <div className="mt-3">
                      <CopyButton
                        code={promo.code}
                        label={promo.code}
                        copiedLabel={resolved.copied}
                        ariaLabel={promo.copyAria}
                        variant="outline"
                        className="w-full justify-center font-mono text-2xl font-black tracking-wider text-[#0f1419] border-[#0f1419]/20 hover:border-[#ff6b35] py-3"
                      />
                    </div>

                    <dl className="mt-4 divide-y divide-black/5 text-xs text-[#0f1419]/75">
                      <div className="flex justify-between py-1.5">
                        <dt>{resolved.tableHeaders.validity}:</dt>
                        <dd className="font-medium">{promo.validityLabel}</dd>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <dt>{resolved.tableHeaders.region}:</dt>
                        <dd className="font-medium">{promo.regionLabel}</dd>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <dt>{resolved.tableHeaders.verified}:</dt>
                        <dd className="font-medium">{promo.formattedVerifiedDate}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Estado Sem Cupom Promocional (B1.4) */
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50/80 p-6 text-[#78350f]">
              <p className="font-bold text-base">{resolved.emptyPromosNotice}</p>
              <p className="mt-2 text-sm">{resolved.emptyPromosSubtext}</p>
              <p className="mt-3 text-xs opacity-75">{resolved.updatedLabel}: {resolved.formattedDate}</p>
            </div>
          )}
        </div>
      </section>

      {/* Conteúdo Informativo e Instruções */}
      <article className="bg-white px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-black text-[#0f1419]">{resolved.details}</h2>
          <dl className="mt-6 divide-y divide-black/8 rounded-2xl border border-black/8">
            <Detail label={resolved.codeLabel} value={resolved.rewardCode} />
            <Detail label={resolved.discountLabel} value={resolved.discountValue} />
            <Detail label={resolved.fieldLabel} value={resolved.fieldValue} />
          </dl>

          <h2 className="mt-12 font-heading text-2xl font-black text-[#0f1419]">{resolved.instructionsTitle}</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-6 text-[#0f1419]/78">
            {resolved.instructions.map((item) => <li key={item}>{item}</li>)}
          </ol>
          <p className="mt-4 rounded-2xl border border-[#ff6b35]/25 bg-[#fff7ed] px-4 py-3 text-sm text-[#7c2d12]">{resolved.note}</p>

          {/* Links para artigos educativos do mesmo locale */}
          <h2 className="mt-12 font-heading text-2xl font-black text-[#0f1419]">{resolved.relatedContentTitle}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link
              href={resolved.rewardArticlePath}
              className="rounded-2xl border border-black/8 bg-[#fef9f3] p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-[#ff6b35]/35 hover:shadow-md"
            >
              <p className="text-sm font-bold text-[#0f1419]">{resolved.rewardArticleCardTitle}</p>
              <p className="mt-1 text-xs text-[#0f1419]/55">{resolved.rewardArticleCardSubtext}</p>
            </Link>
            <Link
              href={resolved.guidePath}
              className="rounded-2xl border border-black/8 bg-[#fef9f3] p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-[#ff6b35]/35 hover:shadow-md"
            >
              <p className="text-sm font-bold text-[#0f1419]">{resolved.guideCardTitle}</p>
              <p className="mt-1 text-xs text-[#0f1419]/55">{resolved.guideCardSubtext}</p>
            </Link>
          </div>

          <h2 className="mt-12 font-heading text-2xl font-black text-[#0f1419]">{resolved.faqTitle}</h2>
          <div className="mt-4"><FAQAccordion items={resolved.faqs} /></div>

          <div className="mt-14 rounded-2xl bg-[#fef9f3] p-6 text-sm leading-relaxed text-[#0f1419]/68">{resolved.transparency}</div>
        </div>
      </article>

      <CouponBottomBar coupon={resolved.rewardCode} cta={{ url: resolved.affiliateUrl, label: resolved.visit }} locale={resolved.locale} />
    </main>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 px-4 py-3 md:flex-row md:gap-6">
      <dt className="w-44 text-sm text-[#0f1419]/58">{label}</dt>
      <dd className="text-sm font-semibold text-[#0f1419]">{value}</dd>
    </div>
  );
}
