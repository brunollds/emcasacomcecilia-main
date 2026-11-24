import {
  COUPON_HUB_CATEGORIES,
  formatBrasiliaDay,
  getActiveCoupons,
  getPendingLimitedCodes,
  type Coupon,
  type CouponBubble,
  type CouponHubCategory,
} from '@/lib/couponsData';
import { CECILIA_PHOTO, getStoreMark } from '@/lib/homeStores';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';
import { STORE_BANNERS, isArticleBannerHref, type StoreBanner } from '@/lib/storeBanners';

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

export type FestivalStoreItem = {
  slug: string;
  brand: string;
  offerUrl: string;
  storePageUrl: string;
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

const FESTIVAL_CATEGORY_LABELS: Record<CouponHubCategory, string> = {
  moda: 'Moda & Viagem',
  casa: 'Casa & Conforto',
  beleza: 'Beleza & Skincare',
  saude: 'Saúde & Suplementos',
  alimentacao: 'Alimentação & Café',
  diversos: 'Tech, Pets & Diversos',
};

// Vitrine padrão de fotos limpas já entregues pelo mapa de mídia. Se uma loja definir `festivalSpotlight`
// em `couponsData.ts`, o valor de `couponsData.ts` prevalece automaticamente.
const DEFAULT_FESTIVAL_SPOTLIGHTS: Record<string, { label: string; image: string }> = {
  'dolce-gusto': {
    label: 'Cafeteiras Mini Me, Genio S & cápsulas',
    image: '/images/reviews/dolcegusto/genio-s-touch-cecilia-servindo.webp',
  },
  bagaggio: {
    label: 'Malas de bordo, mochilas & linha viagem',
    image: '/images/reviews/bagaggio/bagaggio-route-vinho-ambiente.webp',
  },
  yesstyle: {
    label: 'K-Beauty & skincare coreano original',
    image: '/images/reviews/yesstyle/abib-rotina-skincare-cecilia-hero.webp',
  },
  'dr-peanut': {
    label: 'Pastas proteicas, alfajores & kits',
    image: '/images/reviews/dr-peanut/dr-peanut-e-boa-pasta-pistache-600g.webp',
  },
  hostinger: {
    label: 'Hospedagem de sites, nuvem & VPS',
    image: '/images/reviews/hostinger/black-friday-hostinger-pagina-2026.webp',
  },
  'simple-organic': {
    label: 'Skincare limpo, séruns & kits de rotina',
    image: '/images/reviews/simple-organic/simple-organic-rotina-de-uso-kit-pele-iluminada.webp',
  },
  holyfoods: {
    label: 'Refeições práticas prontas em minutos',
    image: '/images/reviews/holyfoods/black-friday-holyfoods-risoto-funghi.webp',
  },
  baw: {
    label: 'Streetwear, tênis & coleções BAW',
    image: '/images/reviews/baw/tenis-baw-e-bom-grip-mad-off-white.webp',
  },
  bold: {
    label: 'Barras proteicas BOLD Crunch & Tube',
    image: '/images/reviews/bold/barra-bold-21g-ou-14g-crunch.webp',
  },
  skelt: {
    label: 'Autobronzeadores, body splash & glow',
    image: '/images/reviews/skelt/iluminador-corporal-skelt-como-usar-kit.webp',
  },
  'clea-store': {
    label: 'Alfaiataria feminina, vestidos & básicos',
    image: '/images/reviews/clea-store/clea-festas-vestido-floral.webp',
  },
  letseatit: {
    label: 'Mesa posta, taças, Le Creuset & cozinha',
    image: '/images/reviews/letseatit/taca-base-esfera-e-tacas-coloridas-sante-flute-coral-mesa.webp',
  },
  damie: {
    label: 'Poltronas reclináveis & sofás na caixa',
    image: '/images/reviews/damie/poltrona-aurora-castanho-ambientada.webp',
  },
  insider: {
    label: 'Tech T-Shirt & roupas tecnológicas',
    image: '/images/reviews/insider/camiseta-insider-qual-escolher-tech-masculina.webp',
  },
  'i-wanna-sleep': {
    label: 'Cobertores Igloo, travesseiros & sono',
    image: '/images/reviews/iwannasleep/cobertor-igloo-oficial-uso.webp',
  },
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

function inferDiscountSortValue(store: Coupon): number {
  if (store.offerMode === 'discount-code') return store.discountNumber;
  const pct = store.discount.match(/(\d+)\s*%/);
  if (pct) return Number(pct[1]);
  return 0;
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

function resolveStoreSpotlight(store: Coupon): FestivalSpotlight | undefined {
  const custom = store.festivalSpotlight;
  if (custom) {
    return {
      label: custom.label,
      imageUrl: resolveMediaUrl(custom.image),
      url: custom.url || store.offerUrl,
    };
  }
  const fallback = DEFAULT_FESTIVAL_SPOTLIGHTS[store.slug];
  if (!fallback) return undefined;
  return {
    label: fallback.label,
    imageUrl: resolveMediaUrl(fallback.image),
    url: store.offerUrl,
  };
}

export function getFestivalBlackFridayData(now = new Date()): FestivalBlackFridayData {
  const nowMs = now.getTime();
  const activeCoupons = getActiveCoupons();

  const stores: FestivalStoreItem[] = activeCoupons.map((store) => {
    const campaigns = mapStoreCampaigns(store.slug, nowMs);
    const limitedCodes: FestivalLimitedCode[] = getPendingLimitedCodes(store, nowMs).map((item) => ({
      code: item.code,
      discount: item.discount,
      startsAt: item.startsAt,
      endsAt: item.endsAt,
      endLabel: formatBrasiliaDay(item.endsAt),
    }));
    const spotlight = resolveStoreSpotlight(store);
    const code = store.offerMode === 'discount-code' ? store.code : null;
    const codeKind = store.offerMode === 'discount-code' && store.codeKind === 'reward' ? 'reward' : 'coupon';

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
        spotlight?.label ?? '',
      ].join(' '),
    );

    return {
      slug: store.slug,
      brand: store.brand,
      offerUrl: store.offerUrl,
      storePageUrl: `/cupons/${store.slug}`,
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
      discountSortValue: inferDiscountSortValue(store),
      shortDescription: store.shortDescription,
      eligibleCategories: store.eligibleCategories,
      combinable: store.combinable,
      ...(store.offerActionLabel ? { actionLabel: store.offerActionLabel } : {}),
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
      searchHaystack,
    };
  });

  // Vitrines customizadas em couponsData.ts entram automaticamente além da seleção padrão
  const customSlugs = stores
    .filter((s) => s.spotlight && !DEFAULT_LOOKBOOK_ORDER.includes(s.slug) && !['damie', 'insider', 'i-wanna-sleep'].includes(s.slug))
    .map((s) => s.slug);

  const lookbookSlugs = [...customSlugs, ...DEFAULT_LOOKBOOK_ORDER].filter((slug) =>
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
