import { COUPON_STORE_COPY } from '@/components/coupons/couponStoreCopy';
import { getArticleCopy } from '@/components/review/articleCopy';
import type { CouponCopyLocale } from '@/components/review/couponCopyLocale';
import { getCouponBySlug, getStoreCodeKind, type CouponCodeKind } from '@/lib/couponsData';
import { getCouponStorePath, getLocalizedCoupon, isTranslatedLocale } from '@/lib/couponTranslations';
import { publishedReviews, type Review } from '@/lib/data';
import { getStoreArticlesPath, getStoreCode, hasArticlesPage } from '@/lib/homeStores';
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
  couponPageHref?: string;
  articlesHref?: string;
  articleCount?: number;
};

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

export function getArticleStoreBlock(review: Review, locale: CouponCopyLocale, ctaUrl?: string): ArticleStoreBlock | null {
  if (!review.affiliate) return null;
  const store = getCouponBySlug(review.affiliate);
  if (!store) return null;

  const code = review.coupon || undefined;
  const isStoreCode = Boolean(code) && code === getStoreCode(store);
  const copy = COUPON_STORE_COPY[locale];
  const articleCopy = getArticleCopy(locale);

  // Fora do PT, as regras só existem na tradução da loja; em PT, nos dados da própria loja.
  const source = locale === 'pt' ? store : isTranslatedLocale(locale) ? getLocalizedCoupon(store.slug, locale) : undefined;
  const rules: ArticleStoreBlock['rules'] = [];
  if (isStoreCode && source) {
    const date = new Date(`${source.lastVerified}T12:00:00`).toLocaleDateString(copy.dateLocale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const tested = source.offerMode === 'discount-code' && Boolean(source.testNote);
    rules.push(
      { label: copy.rules.eligible, value: source.eligibleCategories },
      { label: copy.rules.combinable, value: source.combinable },
      { label: tested ? articleCopy.ruleTestedLabel : articleCopy.ruleVerifiedLabel, value: date }
    );
  }

  const articleCount = locale === 'pt'
    ? publishedReviews.filter((item) => item.affiliate === store.slug && isListedInPortuguese(item)).length
    : 0;
  const showArticles = locale === 'pt' && hasArticlesPage(articleCount);

  return {
    brand: store.brand,
    slug: store.slug,
    code,
    codeKind: getStoreCodeKind(store, code),
    // Fora do PT, só o texto da tradução: o desconto da loja em PT não vai a outro idioma.
    discount: isStoreCode ? source?.discount : undefined,
    rules: rules.filter((rule) => rule.value).slice(0, MAX_RULES).map((rule) => ({ ...rule, value: shortenRule(rule.value) })),
    storeHref: ctaUrl || review.cta?.url || source?.offerUrl || store.offerUrl,
    couponPageHref: hasTranslatedStorePage(store.slug, locale) ? getCouponStorePath(store.slug, locale) : undefined,
    articlesHref: showArticles ? getStoreArticlesPath(store.slug) : undefined,
    articleCount: showArticles ? articleCount : undefined,
  };
}
