import { COUPON_STORE_COPY } from '@/components/coupons/couponStoreCopy';
import { resolveYesStylePage } from '@/components/coupons/yesstylePage';
import { getArticleCopy } from '@/components/review/articleCopy';
import type { CouponCopyLocale } from '@/components/review/couponCopyLocale';
import { affiliateStoreServesLocale, getAffiliateStore } from '@/lib/affiliateStores';
import { getPendingCodeSeasonNotice, storeTakesCodeSeasonNotice, type CodeSeasonNotice } from '@/lib/codeSeasonNotice';
import {
  formatBrasiliaDay,
  getCouponBySlug,
  getPendingLimitedCodes,
  getStoreCodeKind,
  type Coupon,
  type CouponCodeKind,
} from '@/lib/couponsData';
import { getCouponStorePath, getCouponTranslation, getLocalizedCoupon, isTranslatedLocale } from '@/lib/couponTranslations';
import { publishedReviews, type Review } from '@/lib/data';
import { getStoreArticlesPath, getStoreCode, hasArticlesPage } from '@/lib/homeStores';
import { isInternalLink } from '@/lib/internalLinks';
import { getReviewStoreSlugs, getSingleStoreSlug, isMultiStoreReview, reviewHasStore } from '@/lib/reviewStores';
import { isListedInPortuguese } from '@/lib/reviewVisibility.mjs';

// Server-only: lê o índice de artigos (@/lib/data) e os dados de cupom. Nada 'use client' importa este arquivo.

export type ArticleStoreBlock = {
  brand: string;
  slug: string;
  code?: string;
  codeKind?: CouponCodeKind;
  discount?: string;
  // Aviso de oferta/indicação direta pelo link nos recortes sem código (Proton, Starlink, AliExpress, Temu, Lejour).
  cutoutNote?: string;
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
  // O aviso de temporada (codeSeasonNotice.ts) no fim dos recortes do topo e do fim: só em PT, em artigo com cupom de
  // loja de cupom, e só enquanto a janela não venceu no build.
  codeNotice?: CodeSeasonNotice;
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

// A loja tem página no idioma: a YesStyle tem uma rota estática por idioma; as demais, só com tradução em
// couponTranslations, que traz os 9 idiomas de uma vez. Não olha se a loja está pausada: o bloco só existe para a loja
// ativa, e o validate:content (multi-store-checks.ts) usa a mesma regra para a lista de lojas de um artigo fora do PT.
export function hasTranslatedStorePage(slug: string, locale: CouponCopyLocale): boolean {
  if (locale === 'pt') return true;
  if (slug === 'yesstyle') return true;
  return Boolean(getCouponTranslation(slug));
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
  const eligible = { label: copy.rules.eligible, value: source.eligibleCategories };
  const combinable = { label: copy.rules.combinable, value: source.combinable };
  // O código testado da parceria vale enquanto ela durar, como no topo da página da loja; a data do teste no
  // carrinho fica na seção "Como testamos" de lá. O resto mostra a data da conferência.
  if (source.offerMode === 'discount-code' && source.testNote) {
    return [eligible, combinable, { label: copy.rules.validity, value: source.validity }];
  }
  const date = new Date(`${source.lastVerified}T12:00:00`).toLocaleDateString(copy.dateLocale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return [eligible, combinable, { label: articleCopy.ruleVerifiedLabel, value: date }];
}

// Reconhece o código principal da loja e também qualquer código de faixa (Magalu: 10EMCASACOMCECILIA..100EMCASACOMCECILIA).
export function storeOwnsCode(store: Coupon, code: string | undefined): boolean {
  if (!code) return false;
  if (code === getStoreCode(store)) return true;
  return Boolean(store.offerMode === 'discount-code' && store.tiers?.some((tier) => tier.code === code));
}

// `now` decide os códigos com prazo: o build usa a hora dele, e os testes passam uma data fixa.
export function getArticleStoreBlock(review: Review, locale: CouponCopyLocale, now = Date.now()): ArticleStoreBlock | null {
  // O artigo de várias lojas não tem o bloco de uma loja: as linhas de código de cada uma vêm de outro lugar.
  const storeSlug = getSingleStoreSlug(review);
  if (!storeSlug) return null;
  const store = getCouponBySlug(storeSlug);
  if (!store) return null;

  const code = review.coupon || undefined;
  const storeCode = getStoreCode(store);
  const isStoreCode = storeOwnsCode(store, code);

  // Fora do PT, as regras só existem na tradução da loja; em PT, nos dados da própria loja. Loja com código só
  // mostra as regras quando o código do artigo é o dela; loja sem código (Lejour), sempre.
  const source = locale === 'pt' ? store : isTranslatedLocale(locale) ? getLocalizedCoupon(store.slug, locale) : undefined;
  const rules = isStoreCode || !storeCode ? getStoreRules(store, source, locale) : [];
  const cutoutNote = !code && source?.offerMode === 'affiliate-link'
    ? source.cutoutNote || COUPON_STORE_COPY[locale].noCodeToCopy
    : undefined;

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
  const codeNotice = locale === 'pt' && code && storeTakesCodeSeasonNotice(store) ? getPendingCodeSeasonNotice(now) : undefined;

  return {
    brand: store.brand,
    slug: store.slug,
    code,
    codeKind: getStoreCodeKind(store, code),
    // Fora do PT, só o texto da tradução: o desconto da loja em PT não vai a outro idioma.
    discount: isStoreCode ? source?.discount : undefined,
    ...(cutoutNote && { cutoutNote }),
    rules: rules.filter((rule) => rule.value).slice(0, MAX_RULES).map((rule) => ({ ...rule, value: shortenRule(rule.value) })),
    storeHref,
    storeSponsored,
    couponPageHref: hasTranslatedStorePage(store.slug, locale) ? getCouponStorePath(store.slug, locale) : undefined,
    articlesHref: showArticles ? getStoreArticlesPath(store.slug) : undefined,
    articleCount: showArticles ? articleCount : undefined,
    ...(limitedCodes.length > 0 && { limitedCodes }),
    ...(codeNotice && { codeNotice }),
  };
}

// O artigo de várias lojas: um bloco por loja da lista, na ordem do artigo. A loja ativa de couponsData.ts sai como a
// do artigo de uma loja que usa o código de sempre dela (o de indicação, na SHEIN; sem cta: o link é o de afiliado da
// loja), e a pausada fica de fora. Fora do PT, o desconto, as regras e o link saem da tradução da loja, e o
// validate:content só deixa na lista a loja com página no idioma. O afiliado sem página dá só o nome e o link, e só no
// idioma em que vale. O artigo de uma loja e o sem loja dão [].
export function getArticleStoreBlocks(review: Review, locale: CouponCopyLocale, now = Date.now()): ArticleStoreBlock[] {
  if (!isMultiStoreReview(review)) return [];
  return getReviewStoreSlugs(review).flatMap((slug) => {
    const store = getCouponBySlug(slug);
    if (store) {
      const block = getArticleStoreBlock({ ...review, affiliate: slug, coupon: getStoreCode(store), cta: undefined }, locale, now);
      return block ? [block] : [];
    }
    const linkOnly = getAffiliateStore(slug);
    if (!linkOnly || !affiliateStoreServesLocale(linkOnly, locale)) return [];
    return [{ brand: linkOnly.brand, slug, rules: [], storeHref: linkOnly.offerUrl, storeSponsored: true }];
  });
}
