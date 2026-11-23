import { cardImageFit, type CardImageFit, type CardImagePosition } from '@/lib/cardImage';
import { getActiveCoupons, type Coupon } from '@/lib/couponsData';
import { getCouponStorePath } from '@/lib/couponTranslations';
import { getPendingCodeSeasonNotice, storeTakesCodeSeasonNotice } from '@/lib/codeSeasonNotice';
import {
  codeLinkLabel,
  getHomeVitrineStores,
  getStoreCode,
  getStoreMark,
  sortStoresByNewestArticle,
  type StoreReview,
} from '@/lib/homeStores';
import { getTabAnchor, type HomeStoreTab } from '@/lib/homeStoreTabs';
import { SITE_SOCIAL_IMAGE, absoluteMediaUrl, type SocialImage } from '@/lib/pageSeo';
import { getListedPortugueseReviews, isListedInPortuguese, sortReviewsByPublishedAt } from '@/lib/reviewDiscovery';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';
import { getReviewStoreLabel, getReviewStores, isMultiStoreReview } from '@/lib/reviewStores';

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
  boost?: HomeEventBoost;
};

// Reta final da data (a Black Friday de 2026, até 30/11): até `endsAt`, a home sobe a seção para logo abaixo da
// vitrine, tira as Receitas e mostra todos os guias em cards compactos. Depois, tudo volta sozinho, sem deploy.
// `labels` distingue os guias de uma loja com mais de um e nomeia o guia sem loja ativa.
// Na reta final, o celular abre com os primeiros guias; o resto vem pelo botão de mostrar todos.
export const MOBILE_VISIBLE_GUIDES = 12;

export type HomeEventBoost = {
  endsAt: string;
  labels: Record<string, string>;
};

// O card compacto da reta final: a bolinha da loja (a casa, sem loja ativa), o nome, o desconto da página da loja e,
// quando o guia precisa, o rótulo do arquivo.
export type HomeEventGuide = {
  slug: string;
  href: string;
  title: string;
  name: string;
  mark?: Pick<HomeStoreTab, 'logo' | 'bubble' | 'initials'>;
  discount?: string;
  label?: string;
  // Só na home em português, onde a reta final é o carrossel de capas: a capa pela regra dos cartões
  // (src/lib/cardImage.ts) e a aba da loja na vitrine. Loja fora da vitrine e guia sem loja ativa ficam sem aba.
  cover?: { image?: string; imageFit: CardImageFit; imagePosition?: CardImagePosition };
  tab?: string;
};

// O carrossel da reta final segue a vitrine: `tabSlugs` são as lojas dela, na ordem das bolinhas, para o carrossel
// ler a aba aberta do mesmo jeito que a vitrine lê.
export type HomeEventCarousel = { tabSlugs: string[]; previousLabel: string; nextLabel: string };

export type HomeEventCard = {
  slug: string;
  href: string;
  title: string;
  type: string;
  image?: string;
  // A capa pela regra dos cartões (src/lib/cardImage.ts).
  imageFit: CardImageFit;
  imagePosition?: CardImagePosition;
  store?: string;
  // Só para loja ativa com código: leva à aba da loja na vitrine, onde o código fica, ou à página da loja em /cupons
  // quando ela está fora da vitrine (hideFromPortugueseHome).
  codeLink?: { href: string; label: string };
};

export type ResolvedHomeEvent = {
  id: string;
  title: string;
  titleOf: string;
  theme: EventTheme;
  description: string;
  dayDate: string;
  dayLabel: string;
  countdownLabel: string;
  hubLink?: { href: string; label: string };
  cards: HomeEventCard[];
  // Só durante a reta final (boost): todos os guias, compactos, e o aviso de temporada dos códigos.
  guides?: HomeEventGuide[];
  // Só na home em português: os guias vão no carrossel de capas, não na grade compacta.
  carousel?: HomeEventCarousel;
  seasonNotice?: string;
  // No idioma da home: o fim do nome do link de cada guia, para leitor de tela, e o botão do celular.
  guideLabels: HomeEventGuideLabels;
};

export type HomeEventGuideLabels = { suffix: string; showAll: string; showLess: string };

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
  socialImage: SocialImage;
};

const HOME_CARD_LIMIT = 4;
const REQUIRED_KEYS = ['id', 'title', 'titleOf', 'theme', 'dayAt', 'startsAt', 'endsAt', 'description', 'articleSlugs'];
const OPTIONAL_KEYS = ['hub', 'boost'];
const BOOST_KEYS = ['endsAt', 'labels'];
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
  const name = title.trim();
  if (titleOf !== `da ${name}` && titleOf !== `do ${name}`) {
    fail(`${context}.titleOf deve ser "da ${name}" ou "do ${name}"`);
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
  const boost = entry.boost === undefined ? undefined : parseBoost(entry.boost, `${context}.boost`, startsAt, endsAt, articleSlugs as string[]);

  return {
    id,
    ...(hub === undefined ? {} : { hub: hub as string }),
    title: name,
    titleOf: titleOf as string,
    theme: theme as EventTheme,
    dayAt: entry.dayAt as string,
    startsAt: entry.startsAt as string,
    endsAt: entry.endsAt as string,
    description: description.trim(),
    articleSlugs: articleSlugs as string[],
    ...(boost ? { boost } : {}),
  };
}

function parseBoost(value: unknown, context: string, startsAt: number, endsAt: number, articleSlugs: string[]): HomeEventBoost {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) fail(`${context}: objeto inválido`);
  const boost = value as Record<string, unknown>;
  const extras = Object.keys(boost).filter((key) => !BOOST_KEYS.includes(key));
  if (extras.length > 0) fail(`${context}: chaves não permitidas (${extras.join(', ')})`);
  const boostEndsAt = parseInstant(boost.endsAt, `${context}.endsAt`);
  if (boostEndsAt <= startsAt || boostEndsAt > endsAt) fail(`${context}.endsAt fora da janela da data`);

  const labels = boost.labels === undefined ? {} : boost.labels;
  if (labels === null || typeof labels !== 'object' || Array.isArray(labels)) fail(`${context}.labels inválido`);
  const trimmed: Record<string, string> = {};
  for (const [slug, label] of Object.entries(labels)) {
    if (!articleSlugs.includes(slug)) fail(`${context}.labels: ${slug} não está em articleSlugs`);
    if (!isNonEmptyString(label)) fail(`${context}.labels.${slug} vazio`);
    trimmed[slug] = label.trim();
  }
  return { endsAt: boost.endsAt as string, labels: trimmed };
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
  return `${WEEKDAYS[weekday]}, ${day === 1 ? '1º' : day} de ${MONTHS[month - 1]}${withYear ? ` de ${year}` : ''}`;
}

// O mesmo dia do rótulo, como AAAA-MM-DD, para o <time dateTime>.
export function formatIsoDay(iso: string): string {
  const { year, month, day } = saoPauloDay(new Date(iso));
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

// Quantos dias faltam até a data, contados em dias de Brasília: negativo depois dela.
export function getCountdownDays(dayAt: string, now: Date): number {
  return saoPauloDay(new Date(dayAt)).index - saoPauloDay(now).index;
}

export function getCountdownLabel(dayAt: string, now: Date): string {
  const days = getCountdownDays(dayAt, now);
  if (days > 1) return `faltam ${days} dias`;
  if (days === 1) return 'é amanhã';
  if (days === 0) return 'é hoje';
  return 'últimos dias';
}

// A loja fora da vitrine (hideFromPortugueseHome) não tem aba na home: o botão leva à página dela em /cupons.
function getCodeHref(store: Coupon): string {
  return store.hideFromPortugueseHome ? getCouponStorePath(store.slug, 'pt') : `/#${getTabAnchor(store.slug)}`;
}

function toCards(event: HomeEventEntry, reviews: readonly StoreReview[], stores: readonly Coupon[]): HomeEventCard[] {
  return event.articleSlugs.map((slug) => {
    // parseHomeEvents já garantiu que cada slug existe e está listado em português.
    const review = reviews.find((item) => item.slug === slug && isListedInPortuguese(item));
    // O artigo de várias lojas leva o nome delas no cartão e nenhum botão de código: o de uma delas seria eleger uma
    // principal.
    const store = isMultiStoreReview(review) ? undefined : getReviewStores(review, stores)[0];
    const code = store ? getStoreCode(store) : undefined;
    return {
      slug,
      href: `/reviews/${slug}`,
      title: review.title,
      type: review.type,
      image: review.image ? resolveMediaUrl(review.image) : undefined,
      imageFit: cardImageFit(review),
      imagePosition: review.imagePosition,
      store: getReviewStoreLabel(review, stores),
      codeLink: store && code ? { href: getCodeHref(store), label: codeLinkLabel(store) } : undefined,
    };
  });
}

// O guia da reta final. O desconto é o da página da loja (nunca o de um código com prazo, que fica no painel da vitrine).
// O guia sem loja ativa, ou de loja com mais de um guia na data, precisa de rótulo: sem ele, dois cards iguais.
// O aviso de temporada entra se algum guia é de loja com cupom (storeTakesCodeSeasonNotice).
// A ordem é a das bolinhas da vitrine, com os guias de cada loja juntos e na ordem do arquivo; loja fora da vitrine e
// guia sem loja ativa vão para o fim, também na ordem do arquivo.
function toGuides(
  event: HomeEventEntry,
  boost: HomeEventBoost,
  reviews: readonly StoreReview[],
  stores: readonly Coupon[]
): { guides: HomeEventGuide[]; tabSlugs: string[]; takesSeasonNotice: boolean } {
  const tabSlugs = sortStoresByNewestArticle(getHomeVitrineStores(stores), reviews).map(({ slug }) => slug);
  const tabRank = (store: Coupon | undefined) => {
    const rank = store ? tabSlugs.indexOf(store.slug) : -1;
    return rank < 0 ? tabSlugs.length : rank;
  };
  const entries = event.articleSlugs
    .map((slug) => {
      const review = reviews.find((item) => item.slug === slug && isListedInPortuguese(item));
      const store = isMultiStoreReview(review) ? undefined : getReviewStores(review, stores)[0];
      return { slug, review, store };
    })
    .sort((a, b) => tabRank(a.store) - tabRank(b.store));
  const guidesPerStore = new Map<string, number>();
  for (const { store } of entries) if (store) guidesPerStore.set(store.slug, (guidesPerStore.get(store.slug) ?? 0) + 1);

  const guides = entries.map(({ slug, review, store }) => {
    const label = boost.labels[slug];
    const needsLabel = !store || (guidesPerStore.get(store.slug) ?? 0) > 1;
    if (needsLabel && !label) fail(`${event.id}.boost.labels: ${slug} precisa de rótulo (loja com mais de um guia, ou sem loja ativa)`);
    const name = store?.brand ?? getReviewStoreLabel(review, stores) ?? label;
    return {
      slug,
      href: `/reviews/${slug}`,
      title: review.title,
      name,
      ...(store ? { mark: getStoreMark(store), discount: store.discount } : {}),
      ...(label && label !== name ? { label } : {}),
      cover: {
        image: review.image ? resolveMediaUrl(review.image) : undefined,
        imageFit: cardImageFit(review),
        imagePosition: review.imagePosition,
      },
      ...(store && tabSlugs.includes(store.slug) ? { tab: store.slug } : {}),
    };
  });
  // Dois cards iguais (mesma loja e mesmo rótulo) não se distinguem na grade.
  const keys = guides.map(({ name, label }) => `${name}|${label ?? ''}`);
  const repeated = guides.find((_, index) => keys.indexOf(keys[index]) !== index);
  if (repeated) fail(`${event.id}.boost.labels: ${repeated.slug} repete a loja e o rótulo de outro guia`);
  return { guides, tabSlugs, takesSeasonNotice: entries.some(({ store }) => store !== undefined && storeTakesCodeSeasonNotice(store)) };
}

function isBoosted(event: HomeEventEntry, now: Date): event is HomeEventEntry & { boost: HomeEventBoost } {
  return event.boost !== undefined && now.getTime() < Date.parse(event.boost.endsAt);
}

// A data aberta e em reta final, já validada. As homes dos outros idiomas só mostram a seção nesse período.
export function getBoostedHomeEvent(
  config: unknown,
  reviews: readonly StoreReview[],
  now: Date
): (HomeEventEntry & { boost: HomeEventBoost }) | null {
  const event = parseHomeEvents(config, reviews).find((item) => isOpen(item, now));
  return event && isBoosted(event, now) ? event : null;
}

// A capa do artigo mais novo da edição, com o desempate do site (data e depois id). O card traz a
// capa já resolvida, mas não a data; sem capa em nenhum card, vale o logo do site.
function getSocialImage(cards: readonly HomeEventCard[], reviews: readonly StoreReview[]): SocialImage {
  const covered = cards.filter((card) => card.image);
  const slugs = new Set(covered.map((card) => card.slug));
  const [newest] = sortReviewsByPublishedAt(getListedPortugueseReviews(reviews.filter(({ slug }) => slugs.has(slug))));
  const card = covered.find(({ slug }) => slug === newest?.slug);

  return card?.image ? { url: absoluteMediaUrl(card.image), alt: card.title } : SITE_SOCIAL_IMAGE;
}

function isOpen(event: HomeEventEntry, now: Date): boolean {
  return Date.parse(event.startsAt) <= now.getTime() && now.getTime() < Date.parse(event.endsAt);
}

// A home renderiza de novo a cada 5 minutos (revalidate = 300): a seção e a reta final entram e saem no primeiro
// acesso depois do prazo, que recebe ainda a versão guardada enquanto o servidor gera a nova.
export function resolveActiveHomeEvent(
  config: unknown,
  reviews: readonly StoreReview[],
  now: Date,
  stores: readonly Coupon[] = getActiveCoupons()
): ResolvedHomeEvent | null {
  const event = parseHomeEvents(config, reviews).find((item) => isOpen(item, now));
  if (!event) return null;
  const boosted = isBoosted(event, now) ? toGuides(event, event.boost, reviews, stores) : undefined;
  const notice = getPendingCodeSeasonNotice(now.getTime());

  return {
    id: event.id,
    title: event.title,
    titleOf: event.titleOf,
    theme: event.theme,
    description: event.description,
    dayDate: formatIsoDay(event.dayAt),
    dayLabel: formatEventDay(event.dayAt),
    countdownLabel: getCountdownLabel(event.dayAt, now),
    hubLink: event.hub
      ? { href: `/${event.hub}`, label: boosted ? `Ver todos os ${boosted.guides.length} guias` : `Ver tudo ${event.titleOf}` }
      : undefined,
    cards: toCards({ ...event, articleSlugs: event.articleSlugs.slice(0, HOME_CARD_LIMIT) }, reviews, stores),
    ...(boosted
      ? {
          guides: boosted.guides,
          carousel: { tabSlugs: boosted.tabSlugs, previousLabel: 'Ver guias anteriores', nextLabel: 'Ver próximos guias' },
        }
      : {}),
    ...(boosted?.takesSeasonNotice && notice?.inHtml ? { seasonNotice: notice.text } : {}),
    guideLabels: {
      suffix: `, guia ${event.titleOf}`,
      showAll: `Mostrar todos os ${boosted?.guides.length ?? 0} guias`,
      showLess: 'Mostrar menos',
    },
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
  const cards = toCards(event, reviews, stores);

  return {
    hub,
    path: `/${hub}`,
    title: event.title,
    titleOf: event.titleOf,
    theme: event.theme,
    description: event.description,
    metaTitle: `${event.title}: guias das lojas parceiras - Em Casa com Cecília`,
    dayDate: formatIsoDay(event.dayAt),
    dayLabel: formatEventDay(event.dayAt, true),
    countdownLabel: now.getTime() < Date.parse(event.endsAt) ? getCountdownLabel(event.dayAt, now) : undefined,
    cards,
    socialImage: getSocialImage(cards, reviews),
  };
}

// Página de cada data que já tem edição no arquivo: o sitemap e o test:home-events usam.
export function getEventHubPaths(config: unknown, reviews: readonly StoreReview[]): string[] {
  const hubs = parseHomeEvents(config, reviews).flatMap(({ hub }) => (hub ? [hub] : []));
  return [...new Set(hubs)].sort().map((hub) => `/${hub}`);
}
