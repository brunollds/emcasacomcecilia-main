import { isListedInPortuguese } from './reviewVisibility.mjs';

export { isListedInPortuguese };

export const REVIEW_CATEGORIES = [
  { value: 'guias-praticos-utilidade', label: 'Guias práticos & utilidade' },
  { value: 'produtos-experiencias', label: 'Produtos & experiências' },
  { value: 'cupons-como-usar', label: 'Cupons & como usar' },
  { value: 'confianca-reputacao', label: 'Confiança & reputação' },
] as const;

export type ReviewCategory = (typeof REVIEW_CATEGORIES)[number]['value'];

export interface ReviewDiscoveryItem {
  id: number;
  slug: string;
  title: string;
  type: string;
  description: string;
  publishedAt: string;
  publishedAtISO?: string;
  category?: string;
  draft?: boolean;
  hideFromListings?: boolean;
  hideFromPortugueseListings?: boolean;
  image?: string;
  imageAlt?: string;
  imageFit?: 'cover' | 'contain';
  imagePosition?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  isNew?: boolean;
  rating?: number;
  pros?: string[];
  cons?: string[];
  contentSections?: Array<{
    heading?: string;
    paragraphs?: string[];
    bullets?: string[];
  }>;
}

export interface HomeReviewCard {
  id: number;
  slug: string;
  title: string;
  type: string;
  category: ReviewCategory;
  publishedAt: string;
  publishedAtISO: string;
  image?: string;
  imageAlt?: string;
  imageFit?: 'cover' | 'contain';
  imagePosition?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  isNew?: boolean;
  rating?: number;
  readingMinutes: number;
}

const REVIEW_CATEGORY_VALUES = new Set<string>(
  REVIEW_CATEGORIES.map(({ value }) => value)
);

export function isReviewCategory(value: unknown): value is ReviewCategory {
  return typeof value === 'string' && REVIEW_CATEGORY_VALUES.has(value);
}

export function parseReviewCategory(
  value: string | null | undefined
): ReviewCategory | null {
  return isReviewCategory(value) ? value : null;
}

export function isValidReviewPublishedAtISO(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() + 1 === month &&
    date.getUTCDate() === day
  );
}

function assertDiscoverableReview<T extends ReviewDiscoveryItem>(
  review: T
): asserts review is T & {
  category: ReviewCategory;
  publishedAtISO: string;
} {
  if (!isReviewCategory(review.category)) {
    throw new Error(
      `[reviewDiscovery] ${review.slug}: category ausente ou inválida`
    );
  }

  if (!isValidReviewPublishedAtISO(review.publishedAtISO)) {
    throw new Error(
      `[reviewDiscovery] ${review.slug}: publishedAtISO ausente ou inválida`
    );
  }
}

function compareReviewsByDateAndId(
  left: ReviewDiscoveryItem & { publishedAtISO: string },
  right: ReviewDiscoveryItem & { publishedAtISO: string }
): number {
  return (
    right.publishedAtISO.localeCompare(left.publishedAtISO) ||
    right.id - left.id
  );
}

export function getListedPortugueseReviews<T extends ReviewDiscoveryItem>(
  reviews: readonly T[]
): Array<T & { category: ReviewCategory; publishedAtISO: string }> {
  return reviews.filter(isListedInPortuguese).map((review) => {
    assertDiscoverableReview(review);
    return review;
  });
}

export function sortReviewsByPublishedAt<T extends ReviewDiscoveryItem & {
  publishedAtISO: string;
}>(reviews: readonly T[]): T[] {
  return [...reviews].sort(compareReviewsByDateAndId);
}

export function estimateReviewReadingMinutes(
  review: ReviewDiscoveryItem
): number {
  const words = [
    review.title,
    review.description,
    ...(review.pros || []),
    ...(review.cons || []),
    ...(review.contentSections || []).flatMap((section) => [
      section.heading,
      ...(section.paragraphs || []),
      ...(section.bullets || []),
    ]),
  ]
    .filter(Boolean)
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(2, Math.ceil(words / 180));
}

export function toHomeReviewCard(
  review: ReviewDiscoveryItem
): HomeReviewCard {
  assertDiscoverableReview(review);

  return {
    id: review.id,
    slug: review.slug,
    title: review.title,
    type: review.type,
    category: review.category,
    publishedAt: review.publishedAt,
    publishedAtISO: review.publishedAtISO,
    image: review.image,
    imageAlt: review.imageAlt,
    imageFit: review.imageFit,
    imagePosition: review.imagePosition,
    isNew: review.isNew,
    rating: review.rating,
    readingMinutes: estimateReviewReadingMinutes(review),
  };
}
