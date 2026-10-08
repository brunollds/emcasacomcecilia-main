import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import sitemap from '@/app/sitemap';

import { EventHubView } from '@/components/sections/EventHubView';
import { EVENT_THEME_CLASSES, EventCard, HomeEvent } from '@/components/sections/HomeEvent';
import { COUPONS, type Coupon } from '@/lib/couponsData';
import { publishedReviews } from '@/lib/data';
import {
  formatEventDay,
  getCountdownLabel,
  getEventHubPage,
  getEventHubPaths,
  parseHomeEvents,
  resolveActiveHomeEvent,
} from '@/lib/homeEvents';
import type { StoreReview } from '@/lib/homeStores';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

function store(slug: string) {
  const found = COUPONS.find((coupon) => coupon.slug === slug);
  assert.ok(found, `loja ${slug} existe em couponsData.ts`);
  return found;
}

type ReviewFixture = StoreReview & { locale?: string };

function review(id: number, slug: string, affiliate?: string, overrides: Partial<ReviewFixture> = {}): ReviewFixture {
  return {
    id,
    slug,
    title: `Título ${slug}`,
    type: 'Guia de Black Friday',
    description: `Descrição ${slug}`,
    publishedAt: '2026-10-20',
    publishedAtISO: '2026-10-20',
    category: 'guias-praticos-utilidade',
    image: `/images/reviews/teste/${slug}.webp`,
    imageAlt: `Imagem ${slug}`,
    affiliate,
    ...overrides,
  };
}

const reviews: ReviewFixture[] = [
  review(1, 'bf-damie', 'damie'),
  review(2, 'bf-magalu', 'magalu'),
  review(3, 'bf-sem-loja', undefined, { image: undefined }),
  review(4, 'bf-kopenhagen', 'kopenhagen'),
  review(5, 'bf-dolce', 'dolce-gusto'),
  review(6, 'natal-damie', 'damie'),
  review(7, 'rascunho', 'damie', { draft: true }),
  review(8, 'em-ingles', 'damie', { locale: 'en' }),
  review(9, 'escondido', 'damie', { hideFromPortugueseListings: true }),
];

// A Kopenhagen está pausada: fica fora das lojas ativas, como na vitrine.
const stores = ['damie', 'magalu', 'dolce-gusto'].map(store);

function event(overrides: Record<string, unknown> = {}) {
  return {
    id: 'black-friday-2026',
    hub: 'black-friday',
    title: 'Black Friday',
    titleOf: 'da Black Friday',
    theme: 'noite',
    dayAt: '2026-11-27T00:00:00-03:00',
    startsAt: '2026-11-01T00:00:00-03:00',
    endsAt: '2026-12-01T00:00:00-03:00',
    description: 'O que vale acompanhar nas lojas parceiras.',
    articleSlugs: ['bf-damie', 'bf-magalu', 'bf-sem-loja', 'bf-kopenhagen', 'bf-dolce'],
    ...overrides,
  };
}

function without(key: string) {
  return Object.fromEntries(Object.entries(event()).filter(([name]) => name !== key));
}

const natal = event({
  id: 'natal-2026',
  hub: 'natal',
  title: 'Natal',
  titleOf: 'do Natal',
  theme: 'laranja',
  dayAt: '2026-12-25T00:00:00-03:00',
  startsAt: '2026-12-01T00:00:00-03:00',
  endsAt: '2026-12-26T00:00:00-03:00',
  description: 'Presentes e a mesa da ceia.',
  articleSlugs: ['natal-damie'],
});
const config = { events: [event(), natal] };
const at = (iso: string) => new Date(iso);

// O arquivo de verdade passa na validação contra as reviews publicadas.
const realConfig = JSON.parse(readFileSync(resolve(process.cwd(), 'content', 'home-events.json'), 'utf8')) as unknown;
parseHomeEvents(realConfig, publishedReviews);

// Validação: cada erro para o build com uma mensagem que diz o que corrigir.
const BF_WINDOW_OVERLAP = { id: 'cyber', dayAt: '2026-11-30T00:00:00-03:00', startsAt: '2026-11-29T00:00:00-03:00', endsAt: '2026-12-02T00:00:00-03:00' };
const AFTER_BF = { startsAt: '2026-12-01T00:00:00-03:00', endsAt: '2026-12-05T00:00:00-03:00', dayAt: '2026-12-02T00:00:00-03:00' };
const invalid: Array<[string, unknown, RegExp]> = [
  ['sem events', {}, /events precisa ser uma lista/],
  ['chave a mais na raiz', { events: [], extra: 1 }, /chaves não permitidas \(extra\)/],
  ['chave a mais na data', { events: [event({ cor: 'azul' })] }, /chaves não permitidas \(cor\)/],
  ['chave faltando', { events: [without('description')] }, /chaves faltando \(description\)/],
  ['id fora do formato', { events: [event({ id: 'Black Friday 2026' })] }, /id inválido/],
  ['hub fora do formato', { events: [event({ hub: 'Black Friday' })] }, /hub inválido/],
  ['título vazio', { events: [event({ title: ' ' })] }, /title vazio/],
  ['titleOf sem a preposição', { events: [event({ titleOf: 'Black Friday' })] }, /titleOf deve ser "da Black Friday" ou "do Black Friday"/],
  ['tema fora dos três', { events: [event({ theme: 'branco' })] }, /theme deve ser noite, laranja, amarelo/],
  ['descrição vazia', { events: [event({ description: ' ' })] }, /description vazia/],
  ['sem artigo', { events: [event({ articleSlugs: [] })] }, /pelo menos 1 artigo/],
  ['artigo repetido', { events: [event({ articleSlugs: ['bf-damie', 'bf-damie'] })] }, /articleSlugs repetido/],
  ['data sem fuso', { events: [event({ dayAt: '2026-11-27T00:00:00' })] }, /dayAt: data ISO 8601 com fuso explícito/],
  ['dia que não existe', { events: [event({ endsAt: '2026-11-31T00:00:00-03:00' })] }, /endsAt: data inexistente/],
  ['fim antes do começo', { events: [event({ startsAt: '2026-12-01T00:00:00-03:00', endsAt: '2026-11-01T00:00:00-03:00' })] }, /startsAt precisa vir antes de endsAt/],
  ['dia fora da janela', { events: [event({ dayAt: '2026-12-02T00:00:00-03:00' })] }, /dayAt fora da janela/],
  ['id repetido', { events: [event(), event(AFTER_BF)] }, /id repetido: black-friday-2026/],
  ['janelas sobrepostas', { events: [event(), event(BF_WINDOW_OVERLAP)] }, /janelas sobrepostas: black-friday-2026 e cyber/],
  ['artigo que não existe', { events: [event({ articleSlugs: ['nao-existe'] })] }, /artigo não encontrado ou fora da vitrine em português \(nao-existe\)/],
  ['rascunho', { events: [event({ articleSlugs: ['rascunho'] })] }, /\(rascunho\)/],
  ['versão em inglês', { events: [event({ articleSlugs: ['em-ingles'] })] }, /\(em-ingles\)/],
  ['fora da vitrine em português', { events: [event({ articleSlugs: ['escondido'] })] }, /\(escondido\)/],
];
for (const [name, value, message] of invalid) {
  assert.throws(() => parseHomeEvents(value, reviews), message, name);
}
assert.equal(parseHomeEvents({ events: [without('hub')] }, reviews)[0].hub, undefined, 'hub pode faltar');
assert.equal(parseHomeEvents(config, reviews).length, 2, 'Natal começa no instante em que a Black Friday acaba');
assert.throws(
  () => parseHomeEvents({ events: [event({ dayAt: '2026-12-01T00:00:00-03:00' })] }, reviews),
  /dayAt fora da janela/,
  'dayAt no instante de endsAt'
);
assert.equal(
  parseHomeEvents({ events: [event({ title: 'Black Friday ' })] }, reviews)[0].title,
  'Black Friday',
  'título aparado, e o titleOf conferido contra ele'
);

// Janela [startsAt, endsAt).
assert.equal(resolveActiveHomeEvent(config, reviews, at('2026-10-31T23:59:59-03:00'), stores), null, 'antes do esquenta');
assert.equal(resolveActiveHomeEvent(config, reviews, at('2026-11-01T00:00:00-03:00'), stores)?.id, 'black-friday-2026');
assert.equal(resolveActiveHomeEvent(config, reviews, at('2026-11-30T23:59:59-03:00'), stores)?.id, 'black-friday-2026');
assert.equal(resolveActiveHomeEvent(config, reviews, at('2026-12-01T00:00:00-03:00'), stores)?.id, 'natal-2026');
assert.equal(resolveActiveHomeEvent(config, reviews, at('2026-12-26T00:00:00-03:00'), stores), null, 'depois do Natal');
assert.equal(resolveActiveHomeEvent({ events: [] }, reviews, at('2026-11-10T12:00:00-03:00'), stores), null);

// Dia e contagem pelo calendário de São Paulo.
assert.equal(formatEventDay('2026-11-27T00:00:00-03:00'), 'Sexta, 27 de novembro');
assert.equal(formatEventDay('2026-11-27T00:00:00-03:00', true), 'Sexta, 27 de novembro de 2026');
assert.equal(formatEventDay('2026-11-11T00:00:00-03:00'), 'Quarta, 11 de novembro');
assert.equal(formatEventDay('2026-03-01T00:00:00-03:00'), 'Domingo, 1º de março');
const BF_DAY = '2026-11-27T00:00:00-03:00';
assert.equal(getCountdownLabel(BF_DAY, at('2026-11-07T10:00:00-03:00')), 'faltam 20 dias');
assert.equal(getCountdownLabel(BF_DAY, at('2026-11-25T23:59:00-03:00')), 'faltam 2 dias');
assert.equal(getCountdownLabel(BF_DAY, at('2026-11-26T08:00:00-03:00')), 'é amanhã');
assert.equal(getCountdownLabel(BF_DAY, at('2026-11-26T23:30:00-03:00')), 'é amanhã', 'já é dia 27 em UTC, ainda 26 em São Paulo');
assert.equal(getCountdownLabel(BF_DAY, at('2026-11-27T00:00:00-03:00')), 'é hoje');
assert.equal(getCountdownLabel(BF_DAY, at('2026-11-27T23:59:59-03:00')), 'é hoje');
assert.equal(getCountdownLabel(BF_DAY, at('2026-11-28T00:00:00-03:00')), 'últimos dias');

// O dia da data (dateTime) sai do calendário de São Paulo, como o rótulo: dayAt em UTC não muda de dia.
const utcDay = resolveActiveHomeEvent({ events: [event({ dayAt: '2026-11-27T02:00:00Z' })] }, reviews, at('2026-11-07T10:00:00-03:00'), stores);
assert.equal(utcDay?.dayDate, '2026-11-26');
assert.equal(utcDay?.dayLabel, 'Quinta, 26 de novembro');

// Home: até 4 cards, na ordem do arquivo, sem código; "Ver o código" só para loja ativa com código.
const active = resolveActiveHomeEvent(config, reviews, at('2026-11-07T10:00:00-03:00'), stores);
assert.ok(active);
assert.equal(active.title, 'Black Friday');
assert.equal(active.theme, 'noite');
assert.equal(active.description, 'O que vale acompanhar nas lojas parceiras.');
assert.equal(active.dayDate, '2026-11-27');
assert.equal(active.dayLabel, 'Sexta, 27 de novembro');
assert.equal(active.countdownLabel, 'faltam 20 dias');
assert.deepEqual(active.hubLink, { href: '/black-friday', label: 'Ver tudo da Black Friday' });
assert.deepEqual(active.cards.map(({ slug }) => slug), ['bf-damie', 'bf-magalu', 'bf-sem-loja', 'bf-kopenhagen']);
const [damie, magalu, semLoja, kopenhagen] = active.cards;
assert.equal(damie.href, '/reviews/bf-damie');
assert.equal(damie.title, 'Título bf-damie');
assert.equal(damie.type, 'Guia de Black Friday');
assert.equal(damie.image, resolveMediaUrl('/images/reviews/teste/bf-damie.webp'));
assert.equal(damie.store, 'DAMIE');
assert.deepEqual(damie.codeLink, { href: '/#loja-damie', label: 'Ver o código da DAMIE' });
assert.deepEqual(magalu.codeLink, { href: '/#loja-magalu', label: 'Ver o código do Magalu' });
assert.equal(semLoja.image, undefined);
assert.equal(semLoja.store, undefined);
assert.equal(semLoja.codeLink, undefined);
assert.equal(kopenhagen.store, undefined, 'loja pausada não tem faixa');
assert.equal(kopenhagen.codeLink, undefined, 'loja pausada não tem aba na vitrine');
for (const card of active.cards) assert.ok(!('code' in card), 'card sem código');

// Loja ativa sem código (a SHEIN sem o código de indicação): o card traz a loja, mas não o "Ver o código".
const sheinSemCodigo = { ...store('shein'), referral: undefined } as Coupon;
const sheinConfig = { events: [event({ articleSlugs: ['bf-shein'] })] };
const sheinReviews = [...reviews, review(10, 'bf-shein', 'shein')];
const sheinEvent = resolveActiveHomeEvent(sheinConfig, sheinReviews, at('2026-11-07T10:00:00-03:00'), [sheinSemCodigo]);
assert.ok(sheinEvent);
assert.equal(sheinEvent.cards.length, 1);
assert.equal(sheinEvent.cards[0].store, 'SHEIN', 'a loja ativa aparece no card');
assert.equal(sheinEvent.cards[0].codeLink, undefined, 'sem código, sem "Ver o código"');

// Controle: com o código de indicação de volta, o mesmo card ganha o "Ver o código".
const sheinComCodigo = resolveActiveHomeEvent(sheinConfig, sheinReviews, at('2026-11-07T10:00:00-03:00'), [store('shein')]);
assert.deepEqual(sheinComCodigo?.cards[0].codeLink, { href: '/#loja-shein', label: 'Ver o código da SHEIN' });

// A faixa renderizada: o HTML que a home serve durante a campanha.
const bandHtml = renderToStaticMarkup(createElement(HomeEvent, { event: active }));
const bandText = bandHtml.replace(/<[^>]+>/g, ' ');
assert.match(bandHtml, /<h2 id="titulo-data-comercial"[^>]*>Black Friday<\/h2>/);
assert.match(bandHtml, /<time datetime="2026-11-27">Sexta, 27 de novembro<\/time>/i);
assert.ok(bandText.includes('faltam 20 dias'));
assert.equal(bandHtml.match(/href="\/reviews\//g)?.length, 4, 'um link por card');
assert.ok(bandHtml.includes('href="/#loja-damie"') && bandHtml.includes('href="/#loja-magalu"'));
assert.equal(bandHtml.match(/href="\/#loja-/g)?.length, 2, 'loja pausada e card sem loja ficam sem "Ver o código"');
assert.ok(bandText.includes('Ver o código da DAMIE') && bandText.includes('Ver o código do Magalu'));
assert.match(bandHtml, /href="\/black-friday"[^>]*>Ver tudo da Black Friday</);
assert.ok(!bandHtml.includes('<code') && !/cupom|copiar/i.test(bandText), 'a faixa não mostra código nem fala em cupom');
assert.equal(
  bandHtml.match(/focus-visible:outline-amarelo-cupom/g)?.length,
  active.cards.length + 1,
  'no tema noite, o link de cada card e o "Ver tudo" têm o anel amarelo'
);

// Os temas claros: a banda e a pílula do tema; o anel amarelo é só do fundo escuro, nos outros é marinho.
for (const themeName of ['laranja', 'amarelo'] as const) {
  const theme = EVENT_THEME_CLASSES[themeName];
  const themedHtml = renderToStaticMarkup(createElement(HomeEvent, { event: { ...active, theme: themeName } }));
  assert.ok(themedHtml.includes(theme.band), `${themeName}: banda do tema`);
  assert.ok(!theme.band.includes('text-white'), `${themeName}: nunca branco sobre laranja ou amarelo`);
  assert.ok(themedHtml.includes(theme.pill), `${themeName}: pílula do tema`);
  assert.ok(!themedHtml.includes('outline-amarelo-cupom'), `${themeName}: sem anel amarelo no fundo claro`);
  assert.equal(
    themedHtml.match(/focus-visible:outline-marinho/g)?.length,
    active.cards.length + 1 + 2,
    `${themeName}: anel marinho nos 4 cards, no "Ver tudo" e nos 2 "Ver o código"`
  );
}
assert.equal(new Set(Object.values(EVENT_THEME_CLASSES).map(({ band }) => band)).size, 3, 'cada tema tem a própria banda');

// Na página da data (fundo creme), o card usa o anel marinho.
const hubCardHtml = renderToStaticMarkup(createElement(EventCard, { card: damie, placement: 'event_hub' }));
assert.ok(hubCardHtml.includes('href="/reviews/bf-damie"') && hubCardHtml.includes('href="/#loja-damie"'));
assert.ok(!hubCardHtml.includes('outline-amarelo-cupom'), 'anel marinho no fundo claro');

const christmas = resolveActiveHomeEvent(config, reviews, at('2026-12-10T12:00:00-03:00'), stores);
assert.equal(christmas?.theme, 'laranja');
assert.equal(christmas?.countdownLabel, 'faltam 15 dias');
assert.deepEqual(christmas?.hubLink, { href: '/natal', label: 'Ver tudo do Natal' });
assert.equal(
  resolveActiveHomeEvent({ events: [without('hub')] }, reviews, at('2026-11-07T10:00:00-03:00'), stores)?.hubLink,
  undefined,
  'sem hub, sem "Ver tudo"'
);

// Página da data: a edição mais recente que já abriu, com todos os artigos.
const edition2025 = event({
  id: 'black-friday-2025',
  dayAt: '2025-11-28T00:00:00-03:00',
  startsAt: '2025-11-01T00:00:00-03:00',
  endsAt: '2025-12-02T00:00:00-03:00',
  description: 'Edição de 2025.',
  articleSlugs: ['bf-dolce'],
});
const hubConfig = { events: [edition2025, event(), natal] };

const before2026 = getEventHubPage(hubConfig, reviews, 'black-friday', at('2026-10-15T12:00:00-03:00'), stores);
assert.equal(before2026?.description, 'Edição de 2025.', 'antes da janela de 2026, a de 2025');
assert.equal(before2026?.dayLabel, 'Sexta, 28 de novembro de 2025');
assert.equal(before2026?.countdownLabel, undefined, 'edição encerrada não tem contagem');

const during = getEventHubPage(hubConfig, reviews, 'black-friday', at('2026-11-07T10:00:00-03:00'), stores);
assert.equal(during?.path, '/black-friday');
assert.equal(during?.title, 'Black Friday');
assert.equal(during?.titleOf, 'da Black Friday');
assert.equal(during?.theme, 'noite');
assert.equal(during?.metaTitle, 'Black Friday: guias das lojas parceiras - Em Casa com Cecília');
assert.equal(during?.dayDate, '2026-11-27');
assert.equal(during?.countdownLabel, 'faltam 20 dias');
assert.deepEqual(
  during?.cards.map(({ slug }) => slug),
  ['bf-damie', 'bf-magalu', 'bf-sem-loja', 'bf-kopenhagen', 'bf-dolce'],
  'a página mostra todos os artigos'
);

// A página renderizada: o EventHubView recebe a edição pronta, sem ler o JSON nem a data de hoje.
assert.ok(during);
const hubHtml = renderToStaticMarkup(createElement(EventHubView, { page: during }));
const hubText = hubHtml.replace(/<[^>]+>/g, ' ');
assert.match(hubHtml, /<h1[^>]*>Black Friday<\/h1>/);
assert.match(hubHtml, /<time datetime="2026-11-27">Sexta, 27 de novembro de 2026<\/time>/i);
assert.ok(hubText.includes('faltam 20 dias'));
assert.ok(hubHtml.includes(EVENT_THEME_CLASSES.noite.pill), 'a contagem vai na pílula do tema');
assert.match(hubHtml, /<h2 id="titulo-guias-da-data" class="sr-only">Guias da Black Friday<\/h2>/);
assert.equal(hubHtml.match(/<li\b/g)?.length, 5, 'um item por card');
// Na página entram os 5 artigos: além da DAMIE e do Magalu, o da Dolce Gusto (a loja ativa com código no 5º card).
for (const slug of ['damie', 'magalu', 'dolce-gusto']) assert.ok(hubHtml.includes(`href="/#loja-${slug}"`), `"Ver o código" de ${slug}`);
assert.equal(hubHtml.match(/href="\/#loja-/g)?.length, 3, 'loja pausada e card sem loja ficam sem "Ver o código"');
assert.match(hubHtml, /href="\/reviews"[^>]*>Ver todos os guias e análises/);
assert.ok(hubHtml.match(/<section[^>]*>/)?.[0].includes(EVENT_THEME_CLASSES.noite.band), 'a banda do tema noite abre a página');
assert.ok(!hubHtml.includes('<code') && !/cupom|copiar/i.test(hubText), 'a página não mostra código nem fala em cupom');

assert.ok(before2026);
const closedHtml = renderToStaticMarkup(createElement(EventHubView, { page: before2026 }));
assert.ok(closedHtml.includes('Sexta, 28 de novembro de 2025'));
assert.ok(!/faltam/.test(closedHtml) && !closedHtml.includes(EVENT_THEME_CLASSES.noite.pill), 'edição encerrada sem pílula de contagem');

const afterCampaign = getEventHubPage(hubConfig, reviews, 'black-friday', at('2027-03-01T12:00:00-03:00'), stores);
assert.equal(afterCampaign?.dayLabel, 'Sexta, 27 de novembro de 2026', 'fora da campanha, a última edição');
assert.equal(afterCampaign?.countdownLabel, undefined);

const upcoming = getEventHubPage({ events: [event()] }, reviews, 'black-friday', at('2026-10-15T12:00:00-03:00'), stores);
assert.equal(upcoming?.countdownLabel, 'faltam 43 dias', 'antes da primeira edição abrir, a próxima');
assert.equal(getEventHubPage(hubConfig, reviews, 'dia-das-maes', at('2026-11-07T10:00:00-03:00'), stores), null);

assert.deepEqual(getEventHubPaths(hubConfig, reviews), ['/black-friday', '/natal']);
assert.deepEqual(getEventHubPaths({ events: [without('hub')] }, reviews), []);

// Cada data do arquivo tem a sua rota, e toda rota de data declara o próprio hub.
const appDir = resolve(process.cwd(), 'src', 'app', '(pt)');
const hubRoutes = readdirSync(appDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(resolve(appDir, entry.name, 'page.tsx')))
  .filter((entry) => readFileSync(resolve(appDir, entry.name, 'page.tsx'), 'utf8').includes('<EventHubPage'))
  .map((entry) => entry.name);
assert.ok(hubRoutes.includes('black-friday'), 'a rota /black-friday existe');
for (const name of hubRoutes) {
  const source = readFileSync(resolve(appDir, name, 'page.tsx'), 'utf8');
  assert.ok(source.includes(`const HUB = '${name}';`), `/${name} declara o hub dela`);
  assert.ok(source.includes('<EventHubPage hub={HUB} />'), `/${name} passa o próprio hub à página`);
  assert.ok(source.includes('getEventHubMetadata(HUB)'), `/${name} usa o próprio hub nos metadados`);
  assert.ok(source.includes('export const revalidate = 300;'), `/${name} se renova a cada 5 minutos`);
}
const realHubPaths = getEventHubPaths(realConfig, publishedReviews);
for (const path of realHubPaths) {
  assert.ok(hubRoutes.includes(path.slice(1)), `${path} precisa de src/app/(pt)${path}/page.tsx`);
}

// O sitemap traz a página de cada data com edição, e nenhuma rota de data sem edição.
const sitemapPaths = new Set(sitemap().map(({ url }) => new URL(url).pathname));
for (const name of hubRoutes) {
  assert.equal(sitemapPaths.has(`/${name}`), realHubPaths.includes(`/${name}`), `/${name} no sitemap só com edição`);
}

console.log(`✅ homeEvents: validação (${invalid.length} casos), janela, contagem, home (dados e HTML), página da data, rotas e sitemap passaram.`);
