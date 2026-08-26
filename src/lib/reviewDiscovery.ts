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

const HOME_FEATURED_LIMIT = 4;
const HOME_FEATURED_MAX_PER_CATEGORY = 2;

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

export function isListedInPortuguese(
  review: Pick<
    ReviewDiscoveryItem,
    'draft' | 'hideFromListings' | 'hideFromPortugueseListings'
  >
): boolean {
  return (
    !review.draft &&
    !review.hideFromListings &&
    !review.hideFromPortugueseListings
  );
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

export function getReviewCategoryCounts<T extends ReviewDiscoveryItem>(
  reviews: readonly T[]
): Record<ReviewCategory, number> {
  const counts = Object.fromEntries(
    REVIEW_CATEGORIES.map(({ value }) => [value, 0])
  ) as Record<ReviewCategory, number>;

  for (const review of getListedPortugueseReviews(reviews)) {
    counts[review.category] += 1;
  }

  return counts;
}

export interface SelectHomeReviewDiscoveryOptions {
  recentLimit?: number;
  excludedIds?: readonly number[];
}

export function selectHomeReviewDiscovery<T extends ReviewDiscoveryItem>(
  reviews: readonly T[],
  recentLimitOrOptions: number | SelectHomeReviewDiscoveryOptions = 8
): {
  featured: Array<T & { category: ReviewCategory; publishedAtISO: string }>;
  recent: Array<T & { category: ReviewCategory; publishedAtISO: string }>;
  counts: Record<ReviewCategory, number>;
} {
  const listed = sortReviewsByPublishedAt(getListedPortugueseReviews(reviews));
  const options =
    typeof recentLimitOrOptions === 'number'
      ? { recentLimit: recentLimitOrOptions }
      : recentLimitOrOptions;
  const recentLimit = options.recentLimit ?? 8;
  const excludedIds = new Set(options.excludedIds ?? []);
  const categoryCounts: Record<ReviewCategory, number> = Object.fromEntries(
    REVIEW_CATEGORIES.map(({ value }) => [value, 0])
  ) as Record<ReviewCategory, number>;
  const featured: Array<
    T & { category: ReviewCategory; publishedAtISO: string }
  > = [];

  for (const review of listed) {
    if (featured.length >= HOME_FEATURED_LIMIT) {
      break;
    }

    if (excludedIds.has(review.id)) {
      continue;
    }

    if (categoryCounts[review.category] >= HOME_FEATURED_MAX_PER_CATEGORY) {
      continue;
    }

    featured.push(review);
    categoryCounts[review.category] += 1;
  }

  if (featured.length < HOME_FEATURED_LIMIT) {
    throw new Error(
      '[reviewDiscovery] home_featured_selection_failed: unable to fill 4 highlights'
    );
  }

  const featuredIds = new Set(featured.map(({ id }) => id));
  for (const excludedId of excludedIds) {
    featuredIds.add(excludedId);
  }

  return {
    featured,
    recent: listed
      .filter(({ id }) => !featuredIds.has(id))
      .slice(0, Math.max(0, recentLimit)),
    counts: getReviewCategoryCounts(listed),
  };
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
