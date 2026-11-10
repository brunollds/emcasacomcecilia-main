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

type StoreTagged = { store?: unknown };
type CheckedSection = {
  heading?: string;
  paragraphs?: string[];
  postParagraphs?: string[];
  bullets?: string[];
  emphasis?: string;
  links?: Array<StoreTagged & { href?: string; sponsored?: boolean; label?: string }>;
  image?: unknown;
  images?: Array<StoreTagged & { href?: string; src?: string }>;
  styling?: { items?: Array<StoreTagged & { piece?: string; url?: string; pairsWith?: Array<StoreTagged & { label?: string; url?: string }> }> };
};
type SectionReview = { affiliate?: unknown; contentSections?: CheckedSection[] };

// Os links de loja do artigo que levam `store`: o botão de seção externo e patrocinado, a foto com link e as peças do
// card de estilo com url. `where` diz onde está, para a mensagem.
function storeLinks(review: SectionReview) {
  const links: Array<{ store: unknown; where: string }> = [];
  (review.contentSections ?? []).forEach((section, index) => {
    const at = `seção ${index + 1}${section.heading ? ` (${section.heading})` : ''}`;
    for (const link of section.links ?? []) {
      if (link.store !== undefined || (link.sponsored && /^https?:/.test(link.href ?? ''))) {
        links.push({ store: link.store, where: `${at}, link "${link.label}"` });
      }
    }
    const images = [...(section.image && typeof section.image === 'object' ? [section.image as StoreTagged & { href?: string; src?: string }] : []), ...(section.images ?? [])];
    for (const image of images) {
      if (image.store !== undefined || image.href) links.push({ store: image.store, where: `${at}, foto ${image.src}` });
    }
    for (const item of section.styling?.items ?? []) {
      if (item.store !== undefined || item.url) links.push({ store: item.store, where: `${at}, peça "${item.piece}"` });
      for (const pair of item.pairsWith ?? []) {
        if (pair.store !== undefined || pair.url) links.push({ store: pair.store, where: `${at}, "${pair.label}" de "${item.piece}"` });
      }
    }
  });
  return links;
}

// O `store` só existe no artigo de várias lojas, e nele todo link de loja diz de qual das lojas do artigo é: sem isso, o
// clique sairia sem marca (nada é inferido pelo endereço, que pode ser de marketplace ou encurtador).
export function storeFieldProblems(review: SectionReview): string[] {
  const links = storeLinks(review);
  if (!Array.isArray(review.affiliate)) {
    return links.filter((link) => link.store !== undefined).map((link) => `${link.where}: store só no artigo de várias lojas`);
  }
  const stores = new Set(review.affiliate as string[]);
  return links.flatMap(({ store, where }) => {
    if (store === undefined) return [`${where}: link de loja sem store no artigo de várias lojas`];
    if (typeof store !== 'string' || !stores.has(store)) return [`${where}: store "${String(store)}" fora das lojas do artigo`];
    return [];
  });
}

// Palavra com cara de código de cupom: 5 letras ou números ou mais, em maiúsculas, com número ou com o nome da Cecília.
const CODE_LIKE = /\b(?=[A-Z0-9]*(?:\d|CECI|MAUAD|EMCASA))[A-Z0-9]{5,}\b/g;

// Aviso (não erro) no artigo de várias lojas: código no texto que não é de nenhuma loja do artigo. Pega o código antigo
// que ficou no parágrafo depois de a loja trocar o dela: os botões vêm de couponsData.ts, o texto não.
export function staleCodeWarnings(review: SectionReview, coupons: readonly Coupon[]): string[] {
  if (!Array.isArray(review.affiliate)) return [];
  const slugs = new Set(review.affiliate as string[]);
  const current = new Set(
    coupons.filter((coupon) => slugs.has(coupon.slug) && coupon.offerMode === 'discount-code').map((coupon) => (coupon as { code: string }).code.toUpperCase())
  );
  const found = new Set<string>();
  for (const section of review.contentSections ?? []) {
    const texts = [section.heading, section.emphasis, ...(section.paragraphs ?? []), ...(section.postParagraphs ?? []), ...(section.bullets ?? [])];
    for (const text of texts) for (const [code] of (text ?? '').matchAll(CODE_LIKE)) if (!current.has(code)) found.add(code);
  }
  return [...found].map((code) => `o texto cita ${code}, que não é o código atual de nenhuma loja do artigo`);
}

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
