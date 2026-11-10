import { COUPON_STORE_COPY } from '@/components/coupons/couponStoreCopy';
import { resolveYesStylePage } from '@/components/coupons/yesstylePage';
import { getArticleCopy } from '@/components/review/articleCopy';
import type { CouponCopyLocale } from '@/components/review/couponCopyLocale';
import {
  formatBrasiliaDay,
  getCouponBySlug,
  getPendingLimitedCodes,
  getStoreCodeKind,
  type Coupon,
  type CouponCodeKind,
} from '@/lib/couponsData';
import { getCouponStorePath, getLocalizedCoupon, isTranslatedLocale } from '@/lib/couponTranslations';
import { publishedReviews, type Review } from '@/lib/data';
import { getStoreArticlesPath, getStoreCode, hasArticlesPage } from '@/lib/homeStores';
import { isInternalLink } from '@/lib/internalLinks';
import { isMultiStoreReview, reviewHasStore } from '@/lib/reviewStores';
import { isListedInPortuguese } from '@/lib/reviewVisibility.mjs';

// Server-only: lê o índice de artigos (@/lib/data) e os dados de cupom. Nada 'use client' importa este arquivo.

export type ArticleStoreBlock = {
  brand: string;
  slug: string;
  code?: string;
  codeKind?: CouponCodeKind;
  discount?: string;
  rules: Array<{ label: string; value: string }>;
  storeHref?: string;
  // Patrocínio do link da loja: o do cta quando o link é o dele; o link de afiliado da loja é sempre patrocinado.
  storeSponsored: boolean;
  couponPageHref?: string;
  articlesHref?: string;
  articleCount?: number;
  // O código com prazo da loja (o CECIEMCASA15 da I Wanna Sleep): a faixa do fim dos recortes e do card da gaveta, que
  // só monta no navegador e dentro do prazo. Vai no payload do React até o próximo deploy, e o navegador esconde o que
  // venceu. Sem prazo pendente no build, o campo não existe.
  limitedCodes?: ArticleLimitedCode[];
};

export type ArticleLimitedCode = {
  code: string;
  startsAt: string;
  endsAt: string;
  // "Até 8 de novembro: 15% OFF com o CECIEMCASA15": a mesma frase no recorte e na gaveta.
  label: string;
};

// O desconto não quebra entre o número e o OFF, como na linha do recorte da página da loja.
const NBSP = ' ';

// Os mesmos códigos com prazo da página da loja (CouponStorePage): só em PT, em loja de código sem faixas, e só no
// artigo que usa o código de sempre da loja. O que já venceu fica de fora.
export function pickArticleLimitedCodes(
  store: Coupon,
  articleCode: string | undefined,
  locale: CouponCopyLocale,
  now = Date.now()
): ArticleLimitedCode[] {
  if (locale !== 'pt' || store.offerMode !== 'discount-code' || store.tiers?.length) return [];
  if (!articleCode || articleCode !== store.code) return [];
  const copy = getArticleCopy(locale);
  return getPendingLimitedCodes(store, now).map(({ code, discount, startsAt, endsAt }) => ({
    code,
    startsAt,
    endsAt,
    label: copy.limitedCodeLine(code, discount.replace(/ /g, NBSP), formatBrasiliaDay(endsAt)),
  }));
}

const MAX_RULE_LENGTH = 140;
const MAX_RULES = 3;

// Corta na última palavra antes do limite e fecha com reticências.
export function shortenRule(text: string, max = MAX_RULE_LENGTH): string {
  if (text.length <= max) return text;
  const head = text.slice(0, max + 1);
  const lastSpace = head.lastIndexOf(' ');
  const cut = (lastSpace > 0 ? head.slice(0, lastSpace) : text.slice(0, max)).trimEnd();
  return `${cut}…`;
}

// YesStyle tem uma rota estática por idioma; as demais, só com tradução em couponTranslations.
function hasTranslatedStorePage(slug: string, locale: CouponCopyLocale): boolean {
  if (locale === 'pt') return true;
  if (slug === 'yesstyle') return true;
  return isTranslatedLocale(locale) && Boolean(getLocalizedCoupon(slug, locale));
}

// O que a página da YesStyle diz do próprio código de recompensa, com a data dela. As regras da seção dos cupons
// da loja ("só produtos da promoção", "um por pedido") não valem para o código e ficam de fora.
function getYesStyleRules(locale: CouponCopyLocale): ArticleStoreBlock['rules'] {
  const page = resolveYesStylePage(locale);
  if (!page) return [];
  // Fora do PT, a nota do campo só entra traduzida. O rótulo pode ser igual: "Código de recompensa" é assim
  // também em espanhol (LABEL_SAME_AS_PORTUGUESE nos testes).
  const fieldNoteTranslated = locale === 'pt' || page.rewardFieldNote !== resolveYesStylePage('pt')?.rewardFieldNote;
  return [
    { label: COUPON_STORE_COPY[locale].rules.combinable, value: page.intro },
    ...(page.rewardCodeLabel && page.rewardFieldNote && fieldNoteTranslated
      ? [{ label: page.rewardCodeLabel, value: page.rewardFieldNote }]
      : []),
    { label: getArticleCopy(locale).ruleVerifiedLabel, value: page.formattedDate },
  ];
}

// As regras que a página da loja mostra, com a data dela: a YesStyle tem página própria, em todo idioma; as
// demais, os dados da loja em PT ou a tradução dela.
function getStoreRules(store: Coupon, source: Coupon | undefined, locale: CouponCopyLocale): ArticleStoreBlock['rules'] {
  if (store.slug === 'yesstyle') return getYesStyleRules(locale);
  const copy = COUPON_STORE_COPY[locale];
  const articleCopy = getArticleCopy(locale);
  if (!source) return [];
  const date = new Date(`${source.lastVerified}T12:00:00`).toLocaleDateString(copy.dateLocale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const tested = source.offerMode === 'discount-code' && Boolean(source.testNote);
  return [
    { label: copy.rules.eligible, value: source.eligibleCategories },
    { label: copy.rules.combinable, value: source.combinable },
    { label: tested ? articleCopy.ruleTestedLabel : articleCopy.ruleVerifiedLabel, value: date },
  ];
}

// `now` decide os códigos com prazo: o build usa a hora dele, e os testes passam uma data fixa.
export function getArticleStoreBlock(review: Review, locale: CouponCopyLocale, now = Date.now()): ArticleStoreBlock | null {
  // O artigo de várias lojas não tem o bloco de uma loja: as linhas de código de cada uma vêm de outro lugar.
  if (!review.affiliate || isMultiStoreReview(review)) return null;
  const store = getCouponBySlug(review.affiliate);
  if (!store) return null;

  const code = review.coupon || undefined;
  const storeCode = getStoreCode(store);
  const isStoreCode = Boolean(code) && code === storeCode;

  // Fora do PT, as regras só existem na tradução da loja; em PT, nos dados da própria loja. Loja com código só
  // mostra as regras quando o código do artigo é o dela; loja sem código (Lejour), sempre.
  const source = locale === 'pt' ? store : isTranslatedLocale(locale) ? getLocalizedCoupon(store.slug, locale) : undefined;
  const rules = isStoreCode || !storeCode ? getStoreRules(store, source, locale) : [];

  const articleCount = locale === 'pt'
    ? publishedReviews.filter((item) => reviewHasStore(item, store.slug) && isListedInPortuguese(item)).length
    : 0;
  const showArticles = locale === 'pt' && hasArticlesPage(articleCount);

  // "Ir para a loja" vai à loja: o cta que aponta para uma página do site (a de cupons da loja) cede ao link de
  // afiliado; fora do PT, o da tradução da loja.
  const ctaUrl = review.cta?.url;
  const storeHref = (ctaUrl && !isInternalLink(ctaUrl) ? ctaUrl : undefined) || source?.offerUrl || store.offerUrl;
  const storeSponsored = storeHref === ctaUrl ? review.cta?.sponsored ?? true : true;
  const limitedCodes = pickArticleLimitedCodes(store, code, locale, now);

  return {
    brand: store.brand,
    slug: store.slug,
    code,
    codeKind: getStoreCodeKind(store, code),
    // Fora do PT, só o texto da tradução: o desconto da loja em PT não vai a outro idioma.
    discount: isStoreCode ? source?.discount : undefined,
    rules: rules.filter((rule) => rule.value).slice(0, MAX_RULES).map((rule) => ({ ...rule, value: shortenRule(rule.value) })),
    storeHref,
    storeSponsored,
    couponPageHref: hasTranslatedStorePage(store.slug, locale) ? getCouponStorePath(store.slug, locale) : undefined,
    articlesHref: showArticles ? getStoreArticlesPath(store.slug) : undefined,
    articleCount: showArticles ? articleCount : undefined,
    ...(limitedCodes.length > 0 && { limitedCodes }),
  };
}
