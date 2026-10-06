import type { Metadata } from 'next';
import {
  getYesStyleLocaleConfig,
  getYesStyleArticle,
  YESSTYLE_LOCALES,
} from '@/lib/i18n/clusters/yesstyle';
import type { Locale } from '@/lib/i18n/locales';
import {
  getPrimaryRewardCode,
  getActivePromoCoupons,
  getLatestYesStyleVerifiedAtISO,
  type YesStyleRewardOffer,
  type YesStylePromoOffer,
} from '@/lib/yesstyleCoupons';
import { getYesStylePage, type PageCopy } from './yesstyleCopy';

// Textos e dados da página da YesStyle já resolvidos para um idioma. Ficam fora do componente para
// os metadados e o teste de mutação rodarem sem carregar as fontes do next/font.

export interface ResolvedPromoOffer {
  id: string;
  code: string;
  discountLabel: string;
  // Valor mínimo de compra, por faixa quando houver, e quem pode usar, já no idioma da página.
  conditions: string[];
  validityLabel: string;
  regionLabel: string;
  formattedVerifiedDate: string;
  officialSourceUrl: string;
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
  formattedDate: string;
  category: string;
  title: string;
  // O H1 em partes: a linha condensada e as palavras em volta do número grande.
  heroTitle: { lead: string; prefix: string; suffix: string };
  description: string;
  intro: string;
  visit: string;
  rewardCode: string;
  affiliateUrl: string;
  rewardCodeLabel: string;
  rewardFieldNote: string;
  firstOrder: { label: string; discount: string };
  nextOrders: { label: string; discount: string };
  newCustomerDiscount: number;
  promosSectionTitle: string;
  promosIntro: string;
  emptyPromosNotice: string;
  emptyPromosSubtext: string;
  promoLabels: PageCopy['promoLabels'];
  proofLabel: string;
  activePromoOffers: ResolvedPromoOffer[];
  policyTitle: string;
  policyRules: PageCopy['policyRules'];
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

// O H1 repete o título. O trecho depois dos dois-pontos ("até 5% extra") vira o número grande, e
// cada idioma escreve esse trecho do seu jeito, sempre em volta de "{newDiscount}%".
const TITLE_PARTS = /^(.+?[:：])\s*(.*?)\s*\{newDiscount\}\s*%\s*(.*)$/;

function splitTitle(template: string) {
  const parts = template.match(TITLE_PARTS);
  if (!parts) {
    throw new Error(`[YesStyle] O título precisa terminar em "<antes> {newDiscount}% <depois>": "${template}"`);
  }
  return [parts[1], parts[2], parts[3]];
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
  const formatPercent = (value: number) =>
    new Intl.NumberFormat(page.language, { style: 'percent' }).format(value / 100);
  // O valor leva o código da moeda (USD 79): com o "$" sozinho, quem está no Canadá ou na Austrália
  // pode ler como a moeda local.
  const formatMoney = (value: number, currency: string) =>
    new Intl.NumberFormat(page.language, {
      style: 'currency',
      currency,
      currencyDisplay: 'code',
      trailingZeroDisplay: 'stripIfInteger',
    }).format(value);
  const regionNames = new Intl.DisplayNames([page.language], { type: 'region' });
  const formatList = new Intl.ListFormat(page.language, { type: 'conjunction' });

  const canonicalUrl =
    page.locale === 'pt'
      ? 'https://emcasacomcecilia.com/cupons/yesstyle'
      : `https://emcasacomcecilia.com${config.hubPath}`;

  const activePromoOffers: ResolvedPromoOffer[] = promos.map((promo) => {
    let discountStr = '';
    const conditions: string[] = [];
    if (promo.discount.kind === 'percentage') {
      discountStr = `${promo.discount.value}% OFF`;
      conditions.push(page.noMinimumLabel);
    } else if (promo.discount.kind === 'fixed') {
      discountStr = `${promo.discount.currency} ${promo.discount.value} OFF`;
    } else if (promo.discount.kind === 'shipping') {
      discountStr = page.freeShippingLabel;
    } else {
      const { currency, tiers } = promo.discount;
      const percents = tiers.map((tier) => tier.percent);
      const lowest = Math.min(...percents);
      const highest = Math.max(...percents);
      discountStr = lowest === highest ? `${highest}% OFF` : `${lowest}–${highest}% OFF`;
      conditions.push(
        ...tiers.map((tier) =>
          page.tierTemplate
            .replace('{percent}', formatPercent(tier.percent))
            .replace('{amount}', formatMoney(tier.minSpend, currency))
        )
      );
    }
    if (promo.membersOnly) conditions.push(page.membersOnlyLabel);

    const validityLabel = promo.expiresAt
      ? formatIsoDateUTC(promo.expiresAt, page.language)
      : page.validityUnconfirmed;

    const regionLabel = promo.regions && promo.regions.length > 0
      ? formatList.format(
          promo.regions.map((region) => (region === 'GLOBAL' ? page.allRegionsLabel : regionNames.of(region) ?? region))
        )
      : page.regionUnconfirmed;

    return {
      id: promo.id,
      code: promo.code,
      discountLabel: discountStr,
      conditions,
      validityLabel,
      regionLabel,
      formattedVerifiedDate: formatIsoDateUTC(promo.verifiedAt, page.language),
      officialSourceUrl: promo.officialSourceUrl,
      copyAria: fillPlaceholders(page.copyAriaPromoTemplate, reward, promo.code),
    };
  });

  const firstPromoCode = activePromoOffers.length > 0 ? activePromoOffers[0].code : '';

  const instructionsTemplatesToUse = activePromoOffers.length > 0
    ? page.instructionsTemplates
    : page.emptyPromoInstructionsTemplates;

  const [titleLead, titlePrefix, titleSuffix] = splitTitle(page.titleTemplate).map((part) =>
    fillPlaceholders(part, reward, firstPromoCode)
  );

  return {
    locale: page.locale,
    language: page.language,
    htmlLang: config.htmlLang,
    homeLabel: page.homeLabel,
    couponsLabel: page.couponsLabel,
    canonicalUrl,
    verifiedAtISO: latestVerifiedAtISO,
    formattedDate,
    category: page.category,
    title: fillPlaceholders(page.titleTemplate, reward, firstPromoCode),
    heroTitle: { lead: titleLead, prefix: titlePrefix, suffix: titleSuffix },
    description: fillPlaceholders(page.descriptionTemplate, reward, firstPromoCode),
    intro: fillPlaceholders(page.introTemplate, reward, firstPromoCode),
    visit: page.visit,
    rewardCode: reward.code,
    affiliateUrl: reward.affiliateUrl,
    rewardCodeLabel: page.rewardCodeLabel,
    rewardFieldNote: page.rewardFieldNote,
    firstOrder: { label: page.firstOrderLabel, discount: formatPercent(reward.newCustomerDiscount) },
    nextOrders: { label: page.nextOrdersLabel, discount: formatPercent(reward.returningCustomerDiscount) },
    newCustomerDiscount: reward.newCustomerDiscount,
    promosSectionTitle: page.promosSectionTitle,
    promosIntro: fillPlaceholders(page.promosIntroTemplate, reward, firstPromoCode),
    emptyPromosNotice: fillPlaceholders(page.emptyPromosNoticeTemplate, reward, firstPromoCode),
    emptyPromosSubtext: fillPlaceholders(page.emptyPromosSubtextTemplate, reward, firstPromoCode),
    promoLabels: page.promoLabels,
    proofLabel: page.proofLabel,
    activePromoOffers,
    policyTitle: page.policyTitle,
    policyRules: {
      eligible: fillPlaceholders(page.policyRules.eligible, reward, firstPromoCode),
      combinable: fillPlaceholders(page.policyRules.combinable, reward, firstPromoCode),
      validity: fillPlaceholders(page.policyRules.validity, reward, firstPromoCode),
      shipping: fillPlaceholders(page.policyRules.shipping, reward, firstPromoCode),
    },
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
