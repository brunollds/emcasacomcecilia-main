import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { COUPONS } from '@/lib/couponsData';
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
assert.equal(formatEventDay('2026-03-01T00:00:00-03:00'), 'Domingo, 1 de março');
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

const afterCampaign = getEventHubPage(hubConfig, reviews, 'black-friday', at('2027-03-01T12:00:00-03:00'), stores);
assert.equal(afterCampaign?.dayLabel, 'Sexta, 27 de novembro de 2026', 'fora da campanha, a última edição');
assert.equal(afterCampaign?.countdownLabel, undefined);

const upcoming = getEventHubPage({ events: [event()] }, reviews, 'black-friday', at('2026-10-15T12:00:00-03:00'), stores);
assert.equal(upcoming?.countdownLabel, 'faltam 43 dias', 'antes da primeira edição abrir, a próxima');
assert.equal(getEventHubPage(hubConfig, reviews, 'dia-das-maes', at('2026-11-07T10:00:00-03:00'), stores), null);

assert.deepEqual(getEventHubPaths(hubConfig, reviews), ['/black-friday', '/natal']);
assert.deepEqual(getEventHubPaths({ events: [without('hub')] }, reviews), []);

console.log(`✅ homeEvents: validação (${invalid.length} casos), janela, contagem, home e página da data passaram.`);
