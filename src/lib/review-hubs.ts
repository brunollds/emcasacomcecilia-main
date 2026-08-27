import type { Review } from '@/lib/content/types';
import { resolveReviewLocale } from '@/lib/content/review-i18n';
import { LOCALE_KEYS, type Locale } from '@/lib/i18n/locales';

export type ReviewHubLocale = Exclude<Locale, 'pt'>;
type ReviewHubReview = Review & { draft?: boolean };

export const REVIEW_HUB_LOCALES = LOCALE_KEYS.filter(
  (locale): locale is ReviewHubLocale => locale !== 'pt'
);

type ReviewHubCopy = {
  title: string;
  description: string;
};

const REVIEW_HUB_COPY: Record<ReviewHubLocale, ReviewHubCopy> = {
  en: {
    title: 'Guides & Reviews',
    description: 'Practical guides and independent reviews selected for you.',
  },
  es: {
    title: 'Guías y reseñas',
    description: 'Guías prácticas y análisis independientes seleccionados para ti.',
  },
  fr: {
    title: 'Guides et avis',
    description: 'Des guides pratiques et des avis indépendants sélectionnés pour vous.',
  },
  de: {
    title: 'Ratgeber und Tests',
    description: 'Praktische Ratgeber und unabhängige Tests für Sie ausgewählt.',
  },
  ko: {
    title: '가이드와 리뷰',
    description: '실용적인 가이드와 독립적인 리뷰를 모았습니다.',
  },
  ja: {
    title: 'ガイドとレビュー',
    description: '実用的なガイドと独立したレビューを集めました。',
  },
  'zh-hant': {
    title: '指南與評測',
    description: '精選實用指南與獨立評測。',
  },
  'zh-hans': {
    title: '指南与评测',
    description: '精选实用指南与独立评测。',
  },
};

export function getReviewHubPath(locale: ReviewHubLocale): string {
  return `/${locale}/reviews`;
}

export function getReviewHubCopy(locale: ReviewHubLocale): ReviewHubCopy {
  return REVIEW_HUB_COPY[locale];
}

export function getInternationalReviewHub(locale: ReviewHubLocale): {
  href: string;
  label: string;
} {
  const copy = getReviewHubCopy(locale);

  return { href: getReviewHubPath(locale), label: copy.title };
}

export function getPublishedReviewsForLocale(
  locale: ReviewHubLocale,
  reviews: readonly ReviewHubReview[]
): ReviewHubReview[] {
  return reviews
    .filter(
      (review) =>
        !review.draft &&
        !review.hideFromListings &&
        resolveReviewLocale(review.locale) === locale
    )
    .sort((left, right) => {
      const publishedAtDifference = (right.publishedAtISO ?? '').localeCompare(
        left.publishedAtISO ?? ''
      );

      return publishedAtDifference || right.id - left.id;
    });
}
