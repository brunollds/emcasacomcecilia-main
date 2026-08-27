import type { Review } from './types';
import { type Locale, LOCALES } from '@/lib/i18n/locales';

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
