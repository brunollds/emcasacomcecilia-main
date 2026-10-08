import { getActiveCoupons, type Coupon } from '@/lib/couponsData';
import { getStoreCode, ofStore, type StoreReview } from '@/lib/homeStores';
import { getTabAnchor } from '@/lib/homeStoreTabs';
import { isListedInPortuguese } from '@/lib/reviewDiscovery';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

// Datas comerciais (Black Friday, Natal, 11.11…), configuradas em content/home-events.json. A home
// mostra a data em campanha; a página fixa de cada data (/black-friday) mostra a edição mais recente.
// Recebe as reviews por parâmetro e não importa '@/lib/data', como homeStores.ts.

export const EVENT_THEMES = ['noite', 'laranja', 'amarelo'] as const;
export type EventTheme = (typeof EVENT_THEMES)[number];

export type HomeEventEntry = {
  id: string;
  hub?: string;
  title: string;
  titleOf: string;
  theme: EventTheme;
  dayAt: string;
  startsAt: string;
  endsAt: string;
  description: string;
  articleSlugs: string[];
};

export type HomeEventCard = {
  slug: string;
  href: string;
  title: string;
  type: string;
  image?: string;
  store?: string;
  // Só para loja ativa com código: leva à aba da loja na vitrine, onde o código fica.
  codeLink?: { href: string; label: string };
};

export type ResolvedHomeEvent = {
  id: string;
  title: string;
  theme: EventTheme;
  description: string;
  dayDate: string;
  dayLabel: string;
  countdownLabel: string;
  hubLink?: { href: string; label: string };
  cards: HomeEventCard[];
};

export type EventHubPageData = {
  hub: string;
  path: string;
  title: string;
  titleOf: string;
  theme: EventTheme;
  description: string;
  metaTitle: string;
  dayDate: string;
  dayLabel: string;
  countdownLabel?: string;
  cards: HomeEventCard[];
};

const HOME_CARD_LIMIT = 4;
const REQUIRED_KEYS = ['id', 'title', 'titleOf', 'theme', 'dayAt', 'startsAt', 'endsAt', 'description', 'articleSlugs'];
const OPTIONAL_KEYS = ['hub'];
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_WITH_OFFSET_RE = /^(\d{4}-\d{2}-\d{2})T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(Z|[+-]\d{2}:\d{2})$/;
const WEEKDAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const MONTHS = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];
const SAO_PAULO_DATE = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Sao_Paulo',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
});

function fail(message: string): never {
  throw new Error(`[homeEvents] ${message}`);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim() !== '';
}

// Instante de uma data ISO 8601 com fuso explícito; recusa dia que não existe (31/11).
function parseInstant(value: unknown, context: string): number {
  const match = typeof value === 'string' ? ISO_WITH_OFFSET_RE.exec(value) : null;
  if (!match) fail(`${context}: data ISO 8601 com fuso explícito`);
  const [text, date, offset] = match;
  const sign = offset.startsWith('-') ? -1 : 1;
  const offsetMinutes = offset === 'Z' ? 0 : sign * (Number(offset.slice(1, 3)) * 60 + Number(offset.slice(4, 6)));
  const time = Date.parse(text);
  if (Number.isNaN(time) || new Date(time + offsetMinutes * 60_000).toISOString().slice(0, 10) !== date) {
    fail(`${context}: data inexistente`);
  }
  return time;
}

function parseEntry(candidate: unknown, index: number): HomeEventEntry {
  const context = `events[${index}]`;
  if (candidate === null || typeof candidate !== 'object' || Array.isArray(candidate)) {
    fail(`${context}: objeto inválido`);
  }
  const entry = candidate as Record<string, unknown>;
  const keys = Object.keys(entry);
  const extras = keys.filter((key) => !REQUIRED_KEYS.includes(key) && !OPTIONAL_KEYS.includes(key));
  const missing = REQUIRED_KEYS.filter((key) => !keys.includes(key));
  if (extras.length > 0) fail(`${context}: chaves não permitidas (${extras.join(', ')})`);
  if (missing.length > 0) fail(`${context}: chaves faltando (${missing.join(', ')})`);

  const { id, hub, title, titleOf, theme, description, articleSlugs } = entry;
  if (typeof id !== 'string' || !SLUG_RE.test(id)) fail(`${context}.id inválido`);
  if (hub !== undefined && (typeof hub !== 'string' || !SLUG_RE.test(hub))) fail(`${context}.hub inválido`);
  if (!isNonEmptyString(title)) fail(`${context}.title vazio`);
  if (titleOf !== `da ${title}` && titleOf !== `do ${title}`) {
    fail(`${context}.titleOf deve ser "da ${title}" ou "do ${title}"`);
  }
  if (!EVENT_THEMES.includes(theme as EventTheme)) fail(`${context}.theme deve ser ${EVENT_THEMES.join(', ')}`);
  if (!isNonEmptyString(description)) fail(`${context}.description vazia`);
  if (!Array.isArray(articleSlugs) || articleSlugs.length === 0) {
    fail(`${context}.articleSlugs precisa de pelo menos 1 artigo`);
  }
  if (!articleSlugs.every(isNonEmptyString)) fail(`${context}.articleSlugs inválido`);
  if (new Set(articleSlugs).size !== articleSlugs.length) fail(`${context}.articleSlugs repetido`);

  const startsAt = parseInstant(entry.startsAt, `${context}.startsAt`);
  const endsAt = parseInstant(entry.endsAt, `${context}.endsAt`);
  const dayAt = parseInstant(entry.dayAt, `${context}.dayAt`);
  if (startsAt >= endsAt) fail(`${context}: startsAt precisa vir antes de endsAt`);
  if (dayAt < startsAt || dayAt >= endsAt) fail(`${context}: dayAt fora da janela`);

  return {
    id,
    ...(hub === undefined ? {} : { hub: hub as string }),
    title,
    titleOf: titleOf as string,
    theme: theme as EventTheme,
    dayAt: entry.dayAt as string,
    startsAt: entry.startsAt as string,
    endsAt: entry.endsAt as string,
    description: description.trim(),
    articleSlugs: articleSlugs as string[],
  };
}

// Valida o arquivo inteiro. Um erro aqui para o build: a home e o test:home-events chamam isto.
export function parseHomeEvents(config: unknown, reviews: readonly StoreReview[]): HomeEventEntry[] {
  if (config === null || typeof config !== 'object' || Array.isArray(config)) fail('configuração inválida');
  const root = config as Record<string, unknown>;
  const extras = Object.keys(root).filter((key) => key !== 'events');
  if (extras.length > 0) fail(`chaves não permitidas (${extras.join(', ')})`);
  if (!Array.isArray(root.events)) fail('events precisa ser uma lista');

  const events = root.events.map(parseEntry);
  const ids = events.map(({ id }) => id);
  const repeated = ids.find((id, index) => ids.indexOf(id) !== index);
  if (repeated) fail(`id repetido: ${repeated}`);

  const byStart = [...events].sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
  byStart.slice(1).forEach((current, index) => {
    const previous = byStart[index];
    if (Date.parse(previous.endsAt) > Date.parse(current.startsAt)) {
      fail(`janelas sobrepostas: ${previous.id} e ${current.id}`);
    }
  });

  const listed = new Set(reviews.filter(isListedInPortuguese).map(({ slug }) => slug));
  for (const current of events) {
    const missing = current.articleSlugs.find((slug) => !listed.has(slug));
    if (missing) fail(`${current.id}: artigo não encontrado ou fora da vitrine em português (${missing})`);
  }
  return events;
}

// Dia do calendário em São Paulo. A contagem compara dias, não horas.
function saoPauloDay(date: Date) {
  const parts = Object.fromEntries(SAO_PAULO_DATE.formatToParts(date).map(({ type, value }) => [type, value]));
  const [year, month, day] = [parts.year, parts.month, parts.day].map(Number);
  const utc = Date.UTC(year, month - 1, day);
  return { year, month, day, weekday: new Date(utc).getUTCDay(), index: utc / 86_400_000 };
}

export function formatEventDay(iso: string, withYear = false): string {
  const { year, month, day, weekday } = saoPauloDay(new Date(iso));
  return `${WEEKDAYS[weekday]}, ${day} de ${MONTHS[month - 1]}${withYear ? ` de ${year}` : ''}`;
}

export function getCountdownLabel(dayAt: string, now: Date): string {
  const days = saoPauloDay(new Date(dayAt)).index - saoPauloDay(now).index;
  if (days > 1) return `faltam ${days} dias`;
  if (days === 1) return 'é amanhã';
  if (days === 0) return 'é hoje';
  return 'últimos dias';
}

function toCards(event: HomeEventEntry, reviews: readonly StoreReview[], stores: readonly Coupon[]): HomeEventCard[] {
  return event.articleSlugs.map((slug) => {
    const review = reviews.find((item) => item.slug === slug && isListedInPortuguese(item));
    const store = stores.find((item) => item.slug === review.affiliate);
    const code = store ? getStoreCode(store) : undefined;
    return {
      slug,
      href: `/reviews/${slug}`,
      title: review.title,
      type: review.type,
      image: review.image ? resolveMediaUrl(review.image) : undefined,
      store: store?.brand,
      codeLink:
        store && code ? { href: `/#${getTabAnchor(store.slug)}`, label: `Ver o código ${ofStore(store)}` } : undefined,
    };
  });
}

function isOpen(event: HomeEventEntry, now: Date): boolean {
  return Date.parse(event.startsAt) <= now.getTime() && now.getTime() < Date.parse(event.endsAt);
}

// A home renderiza de novo a cada 5 minutos (revalidate = 300): a seção entra e sai nesse prazo.
export function resolveActiveHomeEvent(
  config: unknown,
  reviews: readonly StoreReview[],
  now: Date,
  stores: readonly Coupon[] = getActiveCoupons()
): ResolvedHomeEvent | null {
  const event = parseHomeEvents(config, reviews).find((item) => isOpen(item, now));
  if (!event) return null;

  return {
    id: event.id,
    title: event.title,
    theme: event.theme,
    description: event.description,
    dayDate: event.dayAt.slice(0, 10),
    dayLabel: formatEventDay(event.dayAt),
    countdownLabel: getCountdownLabel(event.dayAt, now),
    hubLink: event.hub ? { href: `/${event.hub}`, label: `Ver tudo ${event.titleOf}` } : undefined,
    cards: toCards({ ...event, articleSlugs: event.articleSlugs.slice(0, HOME_CARD_LIMIT) }, reviews, stores),
  };
}

// A edição mais recente que já abriu; antes da primeira abrir, a próxima. Fora da campanha a página
// continua no ar com a última edição: o endereço vale de um ano para o outro.
export function getEventHubPage(
  config: unknown,
  reviews: readonly StoreReview[],
  hub: string,
  now: Date,
  stores: readonly Coupon[] = getActiveCoupons()
): EventHubPageData | null {
  const editions = parseHomeEvents(config, reviews)
    .filter((item) => item.hub === hub)
    .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
  if (editions.length === 0) return null;
  const started = editions.filter((item) => Date.parse(item.startsAt) <= now.getTime());
  const event = started.length > 0 ? started[started.length - 1] : editions[0];

  return {
    hub,
    path: `/${hub}`,
    title: event.title,
    titleOf: event.titleOf,
    theme: event.theme,
    description: event.description,
    metaTitle: `${event.title}: guias das lojas parceiras - Em Casa com Cecília`,
    dayDate: event.dayAt.slice(0, 10),
    dayLabel: formatEventDay(event.dayAt, true),
    countdownLabel: now.getTime() < Date.parse(event.endsAt) ? getCountdownLabel(event.dayAt, now) : undefined,
    cards: toCards(event, reviews, stores),
  };
}

// Página de cada data que já tem edição no arquivo: o sitemap e o test:home-events usam.
export function getEventHubPaths(config: unknown, reviews: readonly StoreReview[]): string[] {
  const hubs = parseHomeEvents(config, reviews).flatMap(({ hub }) => (hub ? [hub] : []));
  return [...new Set(hubs)].sort().map((hub) => `/${hub}`);
}
