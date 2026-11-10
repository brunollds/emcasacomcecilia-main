// Regras do `affiliate` no validate:content: o slug de uma loja ou, no artigo de várias lojas, a lista delas
// (docs/superpowers/plans/2026-11-09-artigo-varias-lojas.md). A lista vale só em português, de 2 a 4 lojas de código
// comum, sem `coupon` nem `cta`: o código e o link de cada loja vêm de couponsData.ts.
import { resolveReviewLocale } from '../src/lib/content/review-i18n';
import type { Coupon } from '../src/lib/couponsData';

export const MIN_REVIEW_STORES = 2;
export const MAX_REVIEW_STORES = 4;

// Nenhum artigo publicado usa lista antes de o artigo saber mostrar as lojas no computador e no celular (fases 3 e 4
// do plano). A fase 4 liga isto.
export const MULTI_STORE_CONTENT_ALLOWED = false;

type CheckedReview = {
  affiliate?: unknown;
  locale?: string;
  translationKey?: string;
  coupon?: string;
  cta?: unknown;
};

// O idioma resolvido (sem locale é português); locale inválido não conta como português, e o validate:content já o
// acusa à parte.
function isPortuguese(locale: string | undefined): boolean {
  try {
    return resolveReviewLocale(locale) === 'pt';
  } catch {
    return false;
  }
}

export function affiliateProblems(
  review: CheckedReview,
  coupons: readonly Coupon[],
  contentAllowed = MULTI_STORE_CONTENT_ALLOWED
): string[] {
  const { affiliate } = review;
  if (affiliate === undefined) return [];
  const bySlug = new Map(coupons.map((coupon) => [coupon.slug, coupon]));

  if (typeof affiliate === 'string') {
    return bySlug.has(affiliate) ? [] : [`affiliate "${affiliate}" não é o slug de nenhuma loja de couponsData.ts`];
  }
  if (!Array.isArray(affiliate) || affiliate.some((slug) => typeof slug !== 'string')) {
    return ['affiliate tem de ser o slug de uma loja ou uma lista de slugs'];
  }

  const problems: string[] = [];
  if (!contentAllowed) {
    problems.push('affiliate em lista ainda não está liberado: o artigo de várias lojas espera as fases 3 e 4 do plano');
  }
  if (affiliate.length === 1) problems.push('affiliate com uma loja só: use o slug, sem a lista');
  else if (affiliate.length < MIN_REVIEW_STORES || affiliate.length > MAX_REVIEW_STORES) {
    problems.push(`affiliate em lista leva de ${MIN_REVIEW_STORES} a ${MAX_REVIEW_STORES} lojas (tem ${affiliate.length})`);
  }
  const repeated = affiliate.filter((slug, index) => affiliate.indexOf(slug) !== index);
  if (repeated.length) problems.push(`affiliate com loja repetida: ${[...new Set(repeated)].join(', ')}`);
  for (const slug of new Set(affiliate as string[])) {
    const coupon = bySlug.get(slug);
    if (!coupon) problems.push(`affiliate "${slug}" não é o slug de nenhuma loja de couponsData.ts`);
    else if (coupon.offerMode !== 'discount-code' || coupon.codeKind || coupon.tiers?.length) {
      // Fora: loja só de link (e a de indicação, como a SHEIN), código de recompensa (YesStyle) e loja com faixas.
      problems.push(`affiliate "${slug}": o artigo de várias lojas só aceita loja de código comum, sem faixas`);
    }
  }
  if (!isPortuguese(review.locale)) problems.push('affiliate em lista só em artigo em português');
  if (review.translationKey !== undefined) problems.push('affiliate em lista não aceita translationKey: a família traduzida fica para depois');
  if (review.coupon !== undefined) problems.push('affiliate em lista sem coupon: o código de cada loja vem de couponsData.ts');
  if (review.cta !== undefined) problems.push('affiliate em lista sem cta: o link de cada loja vem de couponsData.ts');
  return problems;
}
