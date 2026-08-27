import type { Review } from './types';
import { LOCALE_KEYS, type Locale, LOCALES } from '@/lib/i18n/locales';
import { getReviewCanonicalPathname as getReviewCanonicalPathnameFromLocale } from './review-pathname.mjs';
export { detectDuplicateReviewPathnames } from './review-pathname.mjs';

export type ReviewTranslationKey = string;
export type ReviewLocaleGroup = Pick<Review, 'slug' | 'translationKey' | 'locale'>;
export type ReviewLocaleMap = Partial<Record<Locale, ReviewLocaleGroup[]>>;
export type ReviewTranslationGroups = Record<ReviewTranslationKey, ReviewLocaleMap>;

export type ReviewLocaleDup = {
  translationKey: ReviewTranslationKey;
  locale: Locale;
  slugs: string[];
};

const TRANSLATION_KEY_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function resolveReviewLocale(locale?: string): Locale {
  if (locale === undefined) return 'pt';
  if (!Object.prototype.hasOwnProperty.call(LOCALES, locale)) {
    throw new Error(`locale inválido para review: "${locale}"`);
  }
  return locale as Locale;
}

export function isValidTranslationKey(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  return TRANSLATION_KEY_PATTERN.test(value);
}

type ReviewPathSource = Pick<Review, 'slug' | 'locale'> | { slug: string; locale?: string };

export function getReviewCanonicalPathname(review: ReviewPathSource): string {
  return getReviewCanonicalPathnameFromLocale({
    slug: review.slug,
    locale: resolveReviewLocale(review.locale),
  });
}

export function groupReviewsByTranslationKey(
  reviews: Iterable<
    Pick<Review, 'slug' | 'translationKey' | 'locale'> | { slug: string; translationKey?: string; locale?: string }
  >
): ReviewTranslationGroups {
  const groups: ReviewTranslationGroups = {};

  for (const review of reviews) {
    if (review.translationKey === undefined) continue;
    const key = review.translationKey;
    const locale = resolveReviewLocale(review.locale);
    const entry: ReviewLocaleMap = groups[key] ?? {};
    const sourceReview = review as ReviewLocaleGroup;
    const mappedReview: ReviewLocaleGroup = {
      ...sourceReview,
      locale,
    };

    const localeReviews = entry[locale] ?? [];
    localeReviews.push(mappedReview);
    entry[locale] = localeReviews;
    groups[key] = entry;
  }

  return groups;
}

export function getReviewTranslationsByLocale(
  groups: ReviewTranslationGroups,
  translationKey: string
): ReviewLocaleMap {
  return groups[translationKey] ?? {};
}

export function getReviewTranslationPathnames(
  review: Pick<Review, 'slug' | 'translationKey' | 'locale'>,
  reviews: Iterable<Pick<Review, 'slug' | 'translationKey' | 'locale'> | { slug: string; translationKey?: string; locale?: string }>
): Partial<Record<Locale, string>> {
  if (review.translationKey === undefined) return {};

  const translations = getReviewTranslationsByLocale(
    groupReviewsByTranslationKey(reviews),
    review.translationKey
  );

  return Object.fromEntries(
    listGroupLocales(translations).flatMap((locale) => {
      const [translatedReview] = translations[locale] ?? [];
      return translatedReview ? [[locale, getReviewCanonicalPathname(translatedReview)]] : [];
    })
  ) as Partial<Record<Locale, string>>;
}

export function getReviewDefaultTranslationPathname(
  translationPathnames: Partial<Record<Locale, string>>
): string | undefined {
  return translationPathnames.en
    ?? translationPathnames.pt
    ?? LOCALE_KEYS.map((locale) => translationPathnames[locale]).find(Boolean);
}

export function listGroupLocales(group: ReviewLocaleMap): Locale[] {
  return Object.keys(group)
    .filter((locale) => Object.prototype.hasOwnProperty.call(LOCALES, locale))
    .map((locale) => locale as Locale);
}

export function detectDuplicateTranslationLocalePairs(
  groups: ReviewTranslationGroups
): ReviewLocaleDup[] {
  const duplicates: ReviewLocaleDup[] = [];

  for (const [translationKey, locales] of Object.entries(groups)) {
    const seen = new Map<Locale, string[]>();
    for (const locale of listGroupLocales(locales)) {
      const localeReviews = locales[locale] ?? [];
      if (localeReviews.length <= 1) {
        continue;
      }
      const slugs = localeReviews.map((review) => review.slug);
      const existing = seen.get(locale) ?? [];
      existing.push(...slugs);
      seen.set(locale, existing);
    }

    for (const [locale, slugs] of seen.entries()) {
      if (slugs.length > 1) {
        duplicates.push({ translationKey, locale, slugs });
      }
    }
  }

  return duplicates;
}
