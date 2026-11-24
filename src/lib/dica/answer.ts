import { brandLinks } from '@/lib/brandLinks';
import { getActiveCoupons, getCouponBySlug, getPendingLimitedCodes, type Coupon } from '@/lib/couponsData';
import { getCatalog, getVocabulary, normalize } from './catalog';
import { DICA_COPY } from './dicaCopy';
import type { DicaAnswer, DicaCard, DicaResult } from './dicaTypes';

const MAX_CARDS = 5;

export function dicasSearchUrl(term: string): string {
  return `${brandLinks.dicas.replace(/\/$/, '')}/?q=${encodeURIComponent(term)}`;
}

function codeOf(coupon: Coupon, now: number): { code?: string; discount?: string; codeLabel: string } {
  if (coupon.offerMode === 'affiliate-link') {
    if (coupon.referral) return { code: coupon.referral.code, discount: coupon.discount, codeLabel: DICA_COPY.codeLabels.referral };
    return { discount: coupon.discount, codeLabel: DICA_COPY.codeLabels.link };
  }
  // O código com prazo que já começou vale no lugar do de sempre (o CECIEMCASA15 da I Wanna Sleep).
  const limited = getPendingLimitedCodes(coupon, now).find((item) => item.inHtml);
  const codeLabel = coupon.codeKind === 'reward' ? DICA_COPY.codeLabels.reward : DICA_COPY.codeLabels.coupon;
  if (limited) return { code: limited.code, discount: limited.discount, codeLabel };
  return { code: coupon.code, discount: coupon.discount, codeLabel };
}

// Sem termo (a pergunta foi o nome da loja), o cartão leva todos os avisos dela.
function toCard(slug: string, matched: string[], now: number): DicaCard | undefined {
  const coupon = getCouponBySlug(slug);
  if (!coupon) return undefined;
  const matchedKeys = new Set(matched.map(normalize));
  const store = getCatalog().find((item) => item.slug === slug);
  const warnings = (store?.avisos ?? [])
    .filter((warning) => matched.length === 0 || warning.termos.some((term) => matchedKeys.has(normalize(term))))
    .map((warning) => warning.texto);
  return {
    slug,
    brand: coupon.brand,
    matched,
    ...codeOf(coupon, now),
    note: coupon.offerMode === 'affiliate-link' ? coupon.cutoutNote : undefined,
    warnings,
    storeUrl: coupon.offerUrl,
    couponPageUrl: `/cupons/${slug}`,
  };
}

export function buildAnswer(input: {
  terms: string[];
  searchTerm: string;
  outOfScope?: boolean;
  viaFallback?: boolean;
  now?: number;
}): DicaAnswer {
  const now = input.now ?? Date.now();
  const searchTerm = input.searchTerm.trim();
  if (input.outOfScope) return { result: 'fora', message: DICA_COPY.outOfScope, cards: [] };

  const vocabulary = getVocabulary();
  const byStore = new Map<string, string[]>();
  for (const term of input.terms) {
    const entry = vocabulary.get(normalize(term));
    if (!entry) continue;
    for (const slug of entry.slugs) byStore.set(slug, [...(byStore.get(slug) ?? []), entry.term]);
  }

  const order = new Map(getActiveCoupons().map((coupon, index) => [coupon.slug, index]));
  const cards = [...byStore.entries()]
    .sort((a, b) => b[1].length - a[1].length || (order.get(a[0]) ?? 999) - (order.get(b[0]) ?? 999))
    .slice(0, MAX_CARDS)
    .map(([slug, matched]) => toCard(slug, matched, now))
    .filter((card): card is DicaCard => Boolean(card));

  if (cards.length > 0) {
    const result: DicaResult = input.viaFallback ? 'reserva-parceiros' : 'parceiros';
    return { result, message: DICA_COPY.partners, cards, searchTerm };
  }
  const result: DicaResult = input.viaFallback ? 'reserva-dicas' : 'dicas';
  return { result, message: DICA_COPY.noPartner, cards: [], dicasUrl: dicasSearchUrl(searchTerm), searchTerm };
}

export function buildStoreAnswer(slug: string, now = Date.now()): DicaAnswer {
  const card = toCard(slug, [], now);
  return { result: 'parceiros', message: DICA_COPY.partners, cards: card ? [card] : [] };
}
