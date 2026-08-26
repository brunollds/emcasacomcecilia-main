import {
  isListedInPortuguese,
  isReviewCategory,
  isValidReviewPublishedAtISO,
  type ReviewCategory,
  type ReviewDiscoveryItem,
} from '@/lib/reviewDiscovery';

export interface HomeCurationSelection {
  articleSlug: string;
  eyebrow: string;
  startsAt: string;
  endsAt: string | null;
}

export interface HomeCurationConfig {
  selection: HomeCurationSelection | null;
}

export interface ResolvedHomeCuration<T extends ReviewDiscoveryItem> {
  article: T & { category: ReviewCategory; publishedAtISO: string };
  eyebrow: string;
  startsAt: string;
  endsAt: string | null;
}

const HOME_CURATION_TOP_LEVEL_KEYS = ['selection'];
const HOME_CURATION_SELECTION_KEYS = [
  'articleSlug',
  'eyebrow',
  'startsAt',
  'endsAt',
];
const ISO_8601_OFFSET_RE =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(Z|[+-]\d{2}:\d{2})$/;

function fail(message: string): never {
  throw new Error(`[homeCuration] ${message}`);
}

function assertObject(value: unknown): Record<string, unknown> {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    fail('objeto de configuração inválido');
  }

  return value as Record<string, unknown>;
}

function assertExactKeys(
  value: Record<string, unknown>,
  expected: string[],
  context: string
): void {
  const keys = Object.keys(value);
  const extras = keys.filter((key) => !expected.includes(key));
  const missing = expected.filter((key) => !keys.includes(key));

  if (extras.length > 0) {
    fail(`${context}: chaves extras não permitidas (${extras.join(', ')})`);
  }
  if (missing.length > 0) {
    fail(`${context}: chaves faltantes (${missing.join(', ')})`);
  }
}

function assertDateTimeWithOffset(value: unknown, context: string): Date {
  if (typeof value !== 'string' || !ISO_8601_OFFSET_RE.test(value)) {
    fail(`${context}: timestamp deve ser ISO 8601 com offset explícito`);
  }

  const match = ISO_8601_OFFSET_RE.exec(value);
  if (!match) {
    fail(`${context}: timestamp inválido`);
  }

  const [_, yearValue, monthValue, dayValue, hourValue, minuteValue, secondValue] =
    match;
  const year = Number(yearValue);
  const month = Number(monthValue);
  const day = Number(dayValue);
  const hour = Number(hourValue);
  const minute = Number(minuteValue);
  const second = Number(secondValue);
  if (
    hour > 23 ||
    minute > 59 ||
    second > 59
  ) {
    fail(`${context}: timestamp inválido`);
  }

  const normalized = new Date(Date.UTC(year, month - 1, day));
  if (
    normalized.getUTCFullYear() !== year ||
    normalized.getUTCMonth() + 1 !== month ||
    normalized.getUTCDate() !== day
  ) {
    fail(`${context}: timestamp inválido`);
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    fail(`${context}: timestamp inválido`);
  }

  return date;
}

function assertDeterministicNow(now: unknown): Date {
  if (!(now instanceof Date) || Number.isNaN(now.getTime())) {
    fail('instante atual (now) inválido');
  }
  return now;
}

function assertSelection(
  candidate: unknown
): HomeCurationSelection {
  const selection = assertObject(candidate);
  assertExactKeys(selection, HOME_CURATION_SELECTION_KEYS, 'selection');

  const articleSlug = selection.articleSlug;
  if (typeof articleSlug !== 'string' || articleSlug.trim() === '') {
    fail('selection.articleSlug inválido');
  }

  const eyebrow = selection.eyebrow;
  if (typeof eyebrow !== 'string' || eyebrow.trim() === '') {
    fail('selection.eyebrow inválido');
  }

  const startsAtIso = selection.startsAt;
  if (typeof startsAtIso !== 'string') {
    fail('selection.startsAt inválido');
  }
  const startsAtDate = assertDateTimeWithOffset(
    startsAtIso,
    'selection.startsAt'
  );

  const endsAtRaw = selection.endsAt;
  if (endsAtRaw !== null) {
    if (typeof endsAtRaw !== 'string' || endsAtRaw === '') {
      fail('selection.endsAt inválido');
    }

    const endsAtDate = assertDateTimeWithOffset(
      endsAtRaw,
      'selection.endsAt'
    );

    if (endsAtDate.getTime() <= startsAtDate.getTime()) {
      fail('selection.intervalo inválido: endsAt deve ser estritamente posterior a startsAt');
    }
  }

  return {
    articleSlug,
    eyebrow: eyebrow.trim(),
    startsAt: startsAtIso,
    endsAt:
      endsAtRaw === null
        ? null
        : (endsAtRaw as string),
  };
}

function assertHomeCurationConfig(
  config: unknown
): HomeCurationConfig {
  const configObject = assertObject(config);
  assertExactKeys(configObject, HOME_CURATION_TOP_LEVEL_KEYS, 'config');
  return {
    selection:
      configObject.selection === null
        ? null
        : assertSelection(configObject.selection),
  };
}

function resolveArticleForCuration<T extends ReviewDiscoveryItem>(
  reviews: readonly T[],
  articleSlug: string
): T & { category: ReviewCategory; publishedAtISO: string } {
  const matching = reviews.filter((review) => review.slug === articleSlug);
  if (matching.length === 0) {
    fail(`articleSlug não encontrado: ${articleSlug}`);
  }
  if (matching.length > 1) {
    fail(`articleSlug duplicado: ${articleSlug}`);
  }

  const review = matching[0];
  if (!isReviewCategory(review.category)) {
    fail(`artigo não elegível (${articleSlug}): category ausente ou inválida`);
  }
  if (!isValidReviewPublishedAtISO(review.publishedAtISO)) {
    fail(
      `artigo não elegível (${articleSlug}): publishedAtISO ausente ou inválida`
    );
  }
  if (!isListedInPortuguese(review)) {
    fail(`artigo não elegível para vitrine PT (${articleSlug})`);
  }

  return review as T & { category: ReviewCategory; publishedAtISO: string };
}

export function resolveActiveHomeCuration<T extends ReviewDiscoveryItem>(
  config: unknown,
  reviews: readonly T[],
  now: Date
): ResolvedHomeCuration<T> | null {
  // A home revalida em cerca de 5 minutos (`revalidate = 300`) e pode
  // levar alguns minutos para refletir troca de início/fim em janela ativa.
  const nowDate = assertDeterministicNow(now);
  const parsed = assertHomeCurationConfig(config);
  if (!parsed.selection) {
    return null;
  }

  const article = resolveArticleForCuration(reviews, parsed.selection.articleSlug);

  const {
    eyebrow,
    startsAt,
    endsAt,
  } = parsed.selection;
  const startsAtDate = new Date(startsAt);
  if (nowDate.getTime() < startsAtDate.getTime()) {
    return null;
  }
  if (endsAt !== null) {
    const endsAtDate = new Date(endsAt);
    if (nowDate.getTime() > endsAtDate.getTime()) {
      return null;
    }
  }

  return {
    article,
    eyebrow,
    startsAt,
    endsAt,
  };
}
