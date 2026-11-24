import { resolveYesStylePage } from '@/components/coupons/yesstylePage';
import {
  COUPON_HUB_CATEGORIES,
  formatBrasiliaDay,
  getActiveCoupons,
  getPendingLimitedCodes,
  type Coupon,
  type CouponBubble,
  type CouponHubCategory,
  type StackingBenefit,
} from '@/lib/couponsData';
import { publishedReviews, type Review } from '@/lib/data';
import { CECILIA_PHOTO, getStoreArticlesPath, getStoreMark, hasArticlesPage } from '@/lib/homeStores';
import { getListedPortugueseReviews, sortReviewsByPublishedAt } from '@/lib/reviewDiscovery';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';
import { reviewHasStore } from '@/lib/reviewStores';
import { STORE_BANNERS, isArticleBannerHref, type StoreBanner } from '@/lib/storeBanners';

export const BF_START_ISO = '2026-11-27T00:00:00-03:00';
export const BF_FRIDAY_END_ISO = '2026-11-27T23:59:59-03:00';
export const BF_WEEK_END_ISO = '2026-11-30T23:59:59-03:00';
export const BF_WEEK_END_MS = Date.parse(BF_WEEK_END_ISO);

export function isBlackFridaySeason(nowMs: number): boolean {
  return nowMs <= BF_WEEK_END_MS;
}

export type FestivalLimitedCode = {
  code: string;
  discount: string;
  startsAt: string;
  endsAt: string;
  endLabel: string;
};

export type FestivalCampaign = {
  id: string;
  headline: string;
  text: string;
  action: string;
  tag?: string;
  href: string;
  internal: boolean;
  storeAppCode?: string;
  startsAt?: string;
  endsAt?: string;
};

export type FestivalSpotlight = {
  label: string;
  imageUrl: string;
  url: string;
};

export type FestivalStoreArticle = {
  slug: string;
  title: string;
  href: string;
  type: string;
  imageUrl?: string;
};

export type FestivalStoreItem = {
  slug: string;
  brand: string;
  offerUrl: string;
  storePageUrl: string;
  festivalPageUrl: string;
  brandColor: string;
  hubCategory: CouponHubCategory;
  categoryName: string;
  featured: boolean;
  offerMode: 'discount-code' | 'affiliate-link';
  code: string | null;
  codeKind: 'coupon' | 'reward';
  codeFieldLabel?: string;
  discount: string;
  discountSortValue: number;
  shortDescription: string;
  eligibleCategories: string;
  combinable: string;
  actionLabel?: string;
  hasTiers: boolean;
  referral?: {
    code: string;
    label: string;
    instructions: string;
  };
  limitedCodes: FestivalLimitedCode[];
  mark: {
    logo?: string;
    bubble?: CouponBubble;
    initials: string;
  };
  campaigns: FestivalCampaign[];
  spotlight?: FestivalSpotlight;
  articles: FestivalStoreArticle[];
  articleCount: number;
  allArticlesHref?: string;
  searchHaystack: string;
};

export type FestivalCategoryOption = {
  id: CouponHubCategory;
  label: string;
};

export type FestivalHeadlinerMedia = {
  damiePhoto: string;
  insiderPhoto: string;
  iwsPhoto: string;
};

export type FestivalBlackFridayData = {
  generatedAtIso: string;
  ceciliaAvatarUrl: string;
  categories: FestivalCategoryOption[];
  stores: FestivalStoreItem[];
  lookbookSlugs: string[];
  headlinerMedia: FestivalHeadlinerMedia;
};

export type FestivalStackingRow = {
  label: string;
  stacks: 'sim' | 'nao' | 'depende';
  condition: string;
};

export type FestivalPartnerTier = {
  code: string;
  discount: string;
  minPurchase: string;
};

export type FestivalProductLink = {
  name: string;
  url: string;
  description: string;
};

export type FestivalYesStylePromo = {
  id: string;
  code: string;
  discountLabel: string;
  conditions: string[];
  validityLabel: string;
};

export type FestivalPartnerPageData = {
  generatedAtIso: string;
  ceciliaAvatarUrl: string;
  totalPartnerCount: number;
  store: FestivalStoreItem;
  heroImageUrl?: string;
  aboutBrand: string;
  shipping: string;
  validity: string;
  reusable: string;
  instructions: string[];
  stacking: FestivalStackingRow[];
  paymentPerks: string[];
  testedNote?: {
    dateLabel: string;
    note: string;
  };
  tiers?: FestivalPartnerTier[];
  productLinks?: FestivalProductLink[];
  yesstylePromos?: FestivalYesStylePromo[];
  allArticles: FestivalStoreArticle[];
  otherPartners: FestivalStoreItem[];
};

const FESTIVAL_CATEGORY_LABELS: Record<CouponHubCategory, string> = {
  moda: 'Moda & Viagem',
  casa: 'Casa & Conforto',
  beleza: 'Beleza & Skincare',
  saude: 'Saúde & Suplementos',
  alimentacao: 'Alimentação & Café',
  diversos: 'Tech, Pets & Diversos',
};

const STACKING_BENEFIT_LABELS: Record<StackingBenefit, string> = {
  promocoes: 'Promoções do site',
  assinatura: 'Assinatura',
  retirada: 'Retirada em loja',
  pix: 'Pagamento via Pix',
  cashback: 'Cashback',
  'outro-cupom': 'Outro cupom',
  frete: 'Frete grátis',
};

// Fotos limpas já entregues pelo mapa da CDN para a vitrine vertical da /blackfriday.
// Todos os textos descritivos vêm direto de couponsData.ts e STORE_BANNERS, sem frases fixas inventadas.
const SPOTLIGHT_IMAGES: Record<string, string> = {
  'dolce-gusto': '/images/reviews/dolcegusto/genio-s-touch-cecilia-servindo.webp',
  bagaggio: '/images/reviews/bagaggio/bagaggio-route-vinho-ambiente.webp',
  yesstyle: '/images/reviews/yesstyle/abib-rotina-skincare-cecilia-hero.webp',
  'dr-peanut': '/images/reviews/dr-peanut/dr-peanut-e-boa-pasta-pistache-600g.webp',
  hostinger: '/images/reviews/hostinger/black-friday-hostinger-pagina-2026.webp',
  'simple-organic': '/images/reviews/simple-organic/simple-organic-rotina-de-uso-kit-pele-iluminada.webp',
  holyfoods: '/images/reviews/holyfoods/black-friday-holyfoods-risoto-funghi.webp',
  baw: '/images/reviews/baw/tenis-baw-e-bom-grip-mad-off-white.webp',
  bold: '/images/reviews/bold/barra-bold-21g-ou-14g-crunch.webp',
  skelt: '/images/reviews/skelt/iluminador-corporal-skelt-como-usar-kit.webp',
  'clea-store': '/images/reviews/clea-store/clea-festas-vestido-floral.webp',
  letseatit: '/images/reviews/letseatit/taca-base-esfera-e-tacas-coloridas-sante-flute-coral-mesa.webp',
  damie: '/images/reviews/damie/poltrona-aurora-castanho-ambientada.webp',
  insider: '/images/reviews/insider/camiseta-insider-qual-escolher-tech-masculina.webp',
  'i-wanna-sleep': '/images/reviews/iwannasleep/cobertor-igloo-oficial-uso.webp',
};

const DEFAULT_LOOKBOOK_ORDER = [
  'dolce-gusto',
  'bagaggio',
  'yesstyle',
  'dr-peanut',
  'hostinger',
  'simple-organic',
  'holyfoods',
  'baw',
  'bold',
  'skelt',
  'clea-store',
  'letseatit',
];

function normalizeSearch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function extractBannerTag(banner: StoreBanner): string | undefined {
  if (banner.art.kind === 'tag' && banner.art.value) {
    const prefix = banner.copy.pt.tag ? `${banner.copy.pt.tag.toUpperCase()} ` : '';
    return `${prefix}${banner.art.value}`.trim();
  }
  return banner.copy.pt.tag ? banner.copy.pt.tag.toUpperCase() : undefined;
}

// Só pontua descontos percentuais fixos de códigos exclusivos (ex.: 15% OFF, 20% OFF).
// Descontos em reais (ex.: Magalu "R$ 10 a R$ 100 OFF"), links sem código (ex.: Proton "Até 75% OFF")
// ou tetos com "Até" (ex.: YesStyle "Até 5% OFF") retornam 0 e não entram em "Maiores Descontos (15%+)".
export function inferCouponPercentValue(store: Coupon): number {
  if (store.offerMode !== 'discount-code') return 0;
  const disc = store.discount.trim();
  if (!disc.includes('%') || /\bR\$/i.test(disc) || /^at[eé](?:\s|$)/i.test(disc)) {
    return 0;
  }
  return store.discountNumber;
}

function mapStoreCampaigns(slug: string, nowMs: number): FestivalCampaign[] {
  return STORE_BANNERS.filter((banner) => {
    if (banner.affiliate !== slug || !banner.copy.pt) return false;
    if (banner.endsAt && Date.parse(banner.endsAt) < nowMs) return false;
    return true;
  })
    .sort((a, b) => {
      const sa = a.startsAt ? Date.parse(a.startsAt) : -Infinity;
      const sb = b.startsAt ? Date.parse(b.startsAt) : -Infinity;
      return sa - sb;
    })
    .map((banner) => ({
      id: banner.id,
      headline: banner.copy.pt.headline,
      text: banner.copy.pt.text,
      action: banner.copy.pt.action,
      tag: extractBannerTag(banner),
      href: banner.href,
      internal: isArticleBannerHref(banner.href),
      ...(banner.code ? { storeAppCode: banner.code } : {}),
      ...(banner.startsAt ? { startsAt: banner.startsAt } : {}),
      ...(banner.endsAt ? { endsAt: banner.endsAt } : {}),
    }));
}

function buildSpotlightLabel(store: Coupon): string {
  if (store.featuredPitch) return store.featuredPitch.replace(/\.$/, '');
  const shortCat = store.category.split(':')[0].trim();
  return `${store.brand}: ${shortCat.charAt(0).toLowerCase()}${shortCat.slice(1)}`;
}

function resolveStoreSpotlight(store: Coupon): FestivalSpotlight | undefined {
  const img = SPOTLIGHT_IMAGES[store.slug];
  if (!img) return undefined;
  return {
    label: buildSpotlightLabel(store),
    imageUrl: resolveMediaUrl(img),
    url: store.offerUrl,
  };
}

function buildStoreItem(
  store: Coupon,
  nowMs: number,
  listedPtReviews: readonly Review[],
): { item: FestivalStoreItem; fullArticles: FestivalStoreArticle[] } {
  const campaigns = mapStoreCampaigns(store.slug, nowMs);
  const limitedCodes: FestivalLimitedCode[] = getPendingLimitedCodes(store, nowMs).map((lc) => ({
    code: lc.code,
    discount: lc.discount,
    startsAt: lc.startsAt,
    endsAt: lc.endsAt,
    endLabel: formatBrasiliaDay(lc.endsAt),
  }));
  const spotlight = resolveStoreSpotlight(store);
  const code = store.offerMode === 'discount-code' ? store.code : null;
  const codeKind = store.offerMode === 'discount-code' && store.codeKind === 'reward' ? 'reward' : 'coupon';
  const hasTiers = Boolean(store.offerMode === 'discount-code' && store.tiers?.length);

  const matchingReviews = listedPtReviews.filter((rev) => reviewHasStore(rev, store.slug));
  const fullArticles: FestivalStoreArticle[] = matchingReviews.slice(0, 8).map((rev) => ({
    slug: rev.slug,
    title: rev.title,
    href: `/reviews/${rev.slug}`,
    type: rev.type,
    ...(rev.image ? { imageUrl: resolveMediaUrl(rev.image) } : {}),
  }));

  const previewArticles: FestivalStoreArticle[] = fullArticles.slice(0, 3).map(({ slug, title, href, type }) => ({
    slug,
    title,
    href,
    type,
  }));

  const searchHaystack = normalizeSearch(
    [
      store.brand,
      store.slug,
      code ?? '',
      store.discount,
      store.category,
      FESTIVAL_CATEGORY_LABELS[store.hubCategory],
      store.shortDescription,
      store.eligibleCategories,
      store.referral?.code ?? '',
      ...limitedCodes.map((lc) => `${lc.code} ${lc.discount}`),
      ...campaigns.map((c) => `${c.headline} ${c.text}`),
      ...previewArticles.map((a) => a.title),
    ].join(' '),
  );

  const item: FestivalStoreItem = {
    slug: store.slug,
    brand: store.brand,
    offerUrl: store.offerUrl,
    storePageUrl: `/cupons/${store.slug}`,
    festivalPageUrl: `/blackfriday/${store.slug}`,
    brandColor: store.brandColor,
    hubCategory: store.hubCategory,
    categoryName: store.category,
    featured: store.featured,
    offerMode: store.offerMode,
    code,
    codeKind,
    ...(store.offerMode === 'discount-code' && store.codeFieldLabel
      ? { codeFieldLabel: store.codeFieldLabel }
      : {}),
    discount: store.discount,
    discountSortValue: inferCouponPercentValue(store),
    shortDescription: store.shortDescription,
    eligibleCategories: store.eligibleCategories,
    combinable: store.combinable,
    ...(store.offerActionLabel ? { actionLabel: store.offerActionLabel } : {}),
    hasTiers,
    ...(store.referral
      ? {
          referral: {
            code: store.referral.code,
            label: store.referral.label,
            instructions: store.referral.instructions,
          },
        }
      : {}),
    limitedCodes,
    mark: getStoreMark(store),
    campaigns,
    ...(spotlight ? { spotlight } : {}),
    articles: previewArticles,
    articleCount: matchingReviews.length,
    ...(hasArticlesPage(matchingReviews.length)
      ? { allArticlesHref: getStoreArticlesPath(store.slug) }
      : {}),
    searchHaystack,
  };

  return { item, fullArticles };
}

export function getFestivalBlackFridayData(now = new Date()): FestivalBlackFridayData {
  const nowMs = now.getTime();
  const activeCoupons = getActiveCoupons();
  const listedPtReviews = sortReviewsByPublishedAt(getListedPortugueseReviews(publishedReviews));

  const stores: FestivalStoreItem[] = activeCoupons.map(
    (store) => buildStoreItem(store, nowMs, listedPtReviews).item,
  );

  const lookbookSlugs = DEFAULT_LOOKBOOK_ORDER.filter((slug) =>
    stores.some((s) => s.slug === slug && s.spotlight && s.code),
  );

  const categories: FestivalCategoryOption[] = COUPON_HUB_CATEGORIES.map((cat) => ({
    id: cat.id,
    label: FESTIVAL_CATEGORY_LABELS[cat.id],
  }));

  return {
    generatedAtIso: now.toISOString(),
    ceciliaAvatarUrl: CECILIA_PHOTO,
    categories,
    stores,
    lookbookSlugs,
    headlinerMedia: {
      damiePhoto: resolveMediaUrl('/images/reviews/damie/poltrona-aurora-castanho-ambientada.webp'),
      insiderPhoto: resolveMediaUrl('/images/reviews/insider/black-friday-insider-capa-discover.webp'),
      iwsPhoto: resolveMediaUrl('/images/reviews/iwannasleep/cobertor-igloo-oficial-uso.webp'),
    },
  };
}

function buildDefaultInstructions(store: Coupon): string[] {
  if (store.offerMode === 'affiliate-link') {
    if (store.linkInstructions?.length) return store.linkInstructions;
    return [
      `Toque no botão acima para abrir o site oficial da ${store.brand} pelo link da parceria.`,
      'Escolha os produtos ou planos elegíveis e siga para o carrinho.',
      'Confira as condições e valores aplicados no resumo do pedido antes de concluir.',
    ];
  }
  if (store.codeInstructions?.length) return store.codeInstructions;
  const fieldHint = store.codeFieldLabel ? `no campo “${store.codeFieldLabel}”` : 'no campo de cupom';
  return [
    `Toque em “Copiar e abrir” para copiar o código ${store.code} e já abrir a loja oficial da ${store.brand}.`,
    'Adicione os produtos elegíveis ao carrinho e avance para o resumo ou pagamento.',
    `Cole ${store.code} ${fieldHint} e confirme o desconto aplicado antes de pagar.`,
  ];
}

export function getFestivalPartnerPageData(
  slug: string,
  now = new Date(),
): FestivalPartnerPageData | null {
  const nowMs = now.getTime();
  const activeCoupons = getActiveCoupons();
  const targetCoupon = activeCoupons.find((c) => c.slug === slug);
  if (!targetCoupon) return null;

  const listedPtReviews = sortReviewsByPublishedAt(getListedPortugueseReviews(publishedReviews));
  const builtAll = activeCoupons.map((c) => buildStoreItem(c, nowMs, listedPtReviews));
  const current = builtAll.find((entry) => entry.item.slug === slug);
  if (!current) return null;

  const isYesStyle = targetCoupon.slug === 'yesstyle';
  const yesstyleResolved = isYesStyle ? resolveYesStylePage('pt') : null;

  const stacking: FestivalStackingRow[] = yesstyleResolved
    ? yesstyleResolved.stacking.rows.map((r) => ({
        label: r.label,
        stacks: r.stacks,
        condition: r.condition,
      }))
    : targetCoupon.offerMode === 'discount-code' && targetCoupon.stacking
      ? targetCoupon.stacking.map((r) => ({
          label: r.label ?? STACKING_BENEFIT_LABELS[r.benefit],
          stacks: r.stacks,
          condition: r.condition,
        }))
      : [];

  const paymentPerks =
    targetCoupon.offerMode === 'discount-code' ? (targetCoupon.paymentPerks ?? []) : [];

  const testedNote =
    targetCoupon.offerMode === 'discount-code' && targetCoupon.testedAt && targetCoupon.testNote
      ? {
          dateLabel: formatBrasiliaDay(`${targetCoupon.testedAt}T12:00:00-03:00`),
          note: targetCoupon.testNote,
        }
      : undefined;

  const heroImageRaw =
    SPOTLIGHT_IMAGES[targetCoupon.slug] ??
    targetCoupon.socialImage;
  const heroImageUrl = heroImageRaw
    ? resolveMediaUrl(heroImageRaw)
    : current.fullArticles[0]?.imageUrl;

  const otherPartners = builtAll
    .map((entry) => entry.item)
    .filter((s) => s.slug !== slug)
    .sort(
      (a, b) =>
        Number(a.hubCategory === current.item.hubCategory ? 0 : 1) -
          Number(b.hubCategory === current.item.hubCategory ? 0 : 1) ||
        Number(b.featured) - Number(a.featured) ||
        Number(b.campaigns.length > 0) - Number(a.campaigns.length > 0),
    )
    .slice(0, 8);

  return {
    generatedAtIso: now.toISOString(),
    ceciliaAvatarUrl: CECILIA_PHOTO,
    totalPartnerCount: activeCoupons.length,
    store: current.item,
    ...(heroImageUrl ? { heroImageUrl } : {}),
    aboutBrand: targetCoupon.aboutBrand,
    shipping: targetCoupon.shipping,
    validity: targetCoupon.validity,
    reusable: targetCoupon.reusable,
    instructions: yesstyleResolved ? yesstyleResolved.instructions : buildDefaultInstructions(targetCoupon),
    stacking,
    paymentPerks,
    ...(testedNote ? { testedNote } : {}),
    ...(targetCoupon.offerMode === 'discount-code' && targetCoupon.tiers?.length
      ? { tiers: targetCoupon.tiers }
      : {}),
    ...(targetCoupon.offerMode === 'affiliate-link' && targetCoupon.productLinks?.length
      ? { productLinks: targetCoupon.productLinks }
      : {}),
    ...(yesstyleResolved?.activePromoOffers.length
      ? {
          yesstylePromos: yesstyleResolved.activePromoOffers.map((p) => ({
            id: p.id,
            code: p.code,
            discountLabel: p.discountLabel,
            conditions: p.conditions,
            validityLabel: p.validityLabel,
          })),
        }
      : {}),
    allArticles: current.fullArticles,
    otherPartners,
  };
}
