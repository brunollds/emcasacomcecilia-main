// O artigo de várias lojas nas listagens: `affiliate` em lista (src/lib/reviewStores.ts). Nenhum artigo publicado usa
// lista ainda; o teste monta os casos com artigos de mentira e confere que o de uma loja segue como sempre.
import assert from 'node:assert/strict';

import { COUPONS } from '@/lib/couponsData';
import { resolveActiveHomeEvent } from '@/lib/homeEvents';
import { getHomeLatest, getHomeStoreTabs, getStoreArticlesPage, sortStoresByNewestArticle } from '@/lib/homeStores';
import { pickRelatedReviews } from '@/lib/relatedReviews';
import {
  getReviewStoreLabel,
  getReviewStoreSlugs,
  getReviewStores,
  isMultiStoreReview,
  reviewHasStore,
  reviewsShareStore,
} from '@/lib/reviewStores';
import { getOthersShelfContent, getRelatedShelfCards, getReviewsHubContent, getStoreShelfContent, type HubReview } from '@/lib/reviewsHub';
import { getVideoItems, type VideoPageRecord } from '@/lib/videosHub';
import { affiliateProblems } from './multi-store-checks';
import { relatedOrderProblem } from './related-order';
import { isSnippetChecked } from './review-prose-checks';

function store(slug: string) {
  const found = COUPONS.find((coupon) => coupon.slug === slug);
  assert.ok(found, `loja ${slug} existe em couponsData.ts`);
  return found;
}

type ReviewFixture = HubReview & { locale?: string };

function review(id: number, slug: string, affiliate: ReviewFixture['affiliate'], publishedAtISO: string): ReviewFixture {
  return {
    id,
    slug,
    title: `Título ${slug}`,
    type: 'Guia',
    description: `Descrição ${slug}`,
    publishedAt: publishedAtISO,
    publishedAtISO,
    category: 'guias-praticos-utilidade',
    image: `/images/reviews/teste/${slug}.webp`,
    imageAlt: `Imagem ${slug}`,
    affiliate,
  };
}

const FOUR = ['black-skull', 'max-titanium', 'probiotica', 'mais-mu'];
// A Kopenhagen fica fora das ativas, como uma loja pausada.
const stores = ['black-skull', 'max-titanium', 'probiotica', 'mais-mu', 'magalu', 'damie'].map(store);

const multi = review(1, 'alternativas', FOUR, '2026-11-08');
const pair = review(2, 'skull-ou-max', ['black-skull', 'max-titanium'], '2026-11-07');
const pausedOnly = review(3, 'so-pausada', ['kopenhagen', 'black-skull'], '2026-11-06');
const fixtures: ReviewFixture[] = [
  multi,
  pair,
  pausedOnly,
  review(4, 'skull-1', 'black-skull', '2026-10-01'),
  review(5, 'skull-2', 'black-skull', '2026-10-02'),
  review(6, 'max-1', 'max-titanium', '2026-10-03'),
  review(7, 'magalu-1', 'magalu', '2026-11-09'),
  review(8, 'damie-1', 'damie', '2026-09-01'),
  review(9, 'sem-loja-1', undefined, '2026-09-02'),
  review(10, 'sem-loja-2', undefined, '2026-09-03'),
  review(11, 'pausada-1', 'kopenhagen', '2026-09-04'),
  review(12, 'pausadas', ['kopenhagen', 'bagaggio'], '2026-09-05'),
];

// reviewStores
assert.deepEqual(getReviewStoreSlugs(multi), FOUR);
assert.deepEqual(getReviewStoreSlugs({ affiliate: 'damie' }), ['damie']);
assert.deepEqual(getReviewStoreSlugs({}), []);
assert.equal(isMultiStoreReview({ affiliate: 'damie' }), false);
assert.equal(isMultiStoreReview(multi), true);
assert.equal(reviewHasStore(multi, 'probiotica'), true);
assert.equal(reviewHasStore(multi, 'damie'), false);
assert.equal(reviewsShareStore(multi, { affiliate: 'mais-mu' }), true);
assert.equal(reviewsShareStore(multi, { affiliate: 'damie' }), false);
assert.equal(reviewsShareStore({}, {}), false, 'sem loja não é mesma loja');
assert.deepEqual(getReviewStores(pausedOnly, stores).map(({ slug }) => slug), ['black-skull'], 'a pausada sai');

// O rótulo do cartão em lugar neutro.
assert.equal(getReviewStoreLabel({ affiliate: 'damie' }, stores), 'DAMIE');
assert.equal(getReviewStoreLabel({ affiliate: 'kopenhagen' }, stores), undefined, 'loja pausada: sem nome, como sempre');
assert.equal(getReviewStoreLabel(pair, stores), 'Black Skull e Max Titanium');
assert.equal(getReviewStoreLabel(multi, stores), '4 lojas parceiras');
assert.equal(getReviewStoreLabel(review(0, 'tres', FOUR.slice(0, 3), '2026-01-01'), stores), '3 lojas parceiras');
assert.equal(getReviewStoreLabel(pausedOnly, stores), 'Black Skull', 'a lista com uma ativa mostra a ativa');
assert.equal(getReviewStoreLabel(fixtures[11], stores), undefined, 'a lista sem nenhuma ativa fica sem nome');
assert.equal(getReviewStoreLabel(multi, stores, 'en'), undefined, 'fora do PT, sem nome');
assert.equal(getReviewStoreLabel({ affiliate: 'damie' }, stores, 'en'), 'DAMIE', 'uma loja fora do PT segue com o nome');

// Home: as abas de todas as lojas da lista levam o artigo, e a ordem das bolinhas conta o artigo em todas.
const tabs = getHomeStoreTabs(fixtures, stores, Date.parse('2026-11-09T12:00:00-03:00'));
const tab = (slug: string) => tabs.find((item) => item.slug === slug);
for (const slug of FOUR) assert.ok(tab(slug)?.articles.some(({ slug: s }) => s === 'alternativas'), `aba ${slug} com o artigo`);
assert.deepEqual(tab('black-skull')?.articles.map(({ slug }) => slug), ['alternativas', 'skull-ou-max', 'so-pausada', 'skull-2', 'skull-1']);
assert.equal(tab('damie')?.articles.some(({ slug }) => slug === 'alternativas'), false);
assert.deepEqual(
  sortStoresByNewestArticle(stores, fixtures).map(({ slug }) => slug),
  ['magalu', 'black-skull', 'max-titanium', 'probiotica', 'mais-mu', 'damie'],
  'o artigo de 4 lojas põe as 4 logo depois da Magalu, na ordem de couponsData no empate'
);
const latest = getHomeLatest(fixtures, stores);
assert.equal(latest.find(({ slug }) => slug === 'alternativas')?.store, '4 lojas parceiras');
assert.equal(latest.find(({ slug }) => slug === 'magalu-1')?.store, 'Magalu');

// Subpágina da loja: conta o artigo de várias lojas no mínimo de 3, e o cartão leva o nome da loja da página.
assert.equal(getStoreArticlesPage(fixtures, 'black-skull', stores)?.articles.length, 5);
assert.equal(getStoreArticlesPage(fixtures, 'max-titanium', stores)?.articles.length, 3);
assert.equal(getStoreArticlesPage(fixtures, 'probiotica', stores), null, 'só 1 artigo: sem subpágina');
const maxShelf = getStoreShelfContent(fixtures, 'max-titanium', stores);
assert.ok(maxShelf);
assert.deepEqual(maxShelf.articles.map(({ store: label }) => label), ['Max Titanium', 'Max Titanium', 'Max Titanium']);

// /reviews: o rótulo neutro, a busca pelo nome de todas as lojas ativas e a bolinha com a contagem certa.
const hub = getReviewsHubContent(fixtures, stores);
const card = hub.articles.find(({ slug }) => slug === 'alternativas');
assert.equal(card?.store, '4 lojas parceiras');
for (const name of ['black skull', 'max titanium', 'probiotica', 'mais mu']) {
  assert.ok(card?.searchText.includes(name), `a busca acha o artigo por ${name}`);
}
assert.ok(!hub.articles.find(({ slug }) => slug === 'so-pausada')?.searchText.includes('kopenhagen'), 'a pausada fica fora da busca');
assert.equal(hub.stores.find(({ slug }) => slug === 'black-skull')?.total, 5);

// Outros: só os artigos sem nenhuma loja ativa; a lista com uma ativa fica com a loja.
const others = getOthersShelfContent(fixtures, stores);
assert.deepEqual(others?.articles.map(({ slug }) => slug), ['pausadas', 'pausada-1', 'sem-loja-2', 'sem-loja-1']);

// Relacionados: mesma loja é ter alguma em comum.
const related = pickRelatedReviews(pair, fixtures);
assert.deepEqual(related.slice(0, 4).map(({ slug }) => slug), ['alternativas', 'so-pausada', 'max-1', 'skull-2']);
assert.equal(relatedOrderProblem(pair, related), null);
assert.match(relatedOrderProblem(pair, [fixtures[6], multi]) ?? '', /mesma loja não veio primeiro/);
assert.equal(relatedOrderProblem({ slug: 'x', affiliate: 'damie' }, [fixtures[7], fixtures[6]]), null, 'uma loja: como sempre');
const relatedCards = getRelatedShelfCards([multi, fixtures[3]], 'pt');
assert.deepEqual(relatedCards.map(({ store: label }) => label), ['4 lojas parceiras', 'Black Skull']);
assert.deepEqual(getRelatedShelfCards([multi], 'en').map(({ store: label }) => label), [undefined]);

// Data comercial: o cartão do artigo de várias lojas leva os nomes e nenhum botão de código.
const event = resolveActiveHomeEvent(
  {
    events: [
      {
        id: 'black-friday-2026',
        hub: 'black-friday',
        title: 'Black Friday',
        titleOf: 'da Black Friday',
        theme: 'noite',
        dayAt: '2026-11-27T00:00:00-03:00',
        startsAt: '2026-11-01T00:00:00-03:00',
        endsAt: '2026-12-01T00:00:00-03:00',
        description: 'Teste.',
        articleSlugs: ['skull-ou-max', 'skull-1'],
      },
    ],
  },
  fixtures,
  new Date('2026-11-09T12:00:00-03:00'),
  stores
);
assert.equal(event?.cards[0].store, 'Black Skull e Max Titanium');
assert.equal(event?.cards[0].codeLink, undefined);
assert.equal(event?.cards[1].store, 'Black Skull');
assert.ok(event?.cards[1].codeLink, 'uma loja: o botão do código continua');

// Vídeo: o do artigo de várias lojas fica sem loja e leva ao artigo.
const page = (slug: string, source: string): VideoPageRecord => ({
  slug,
  kind: 'youtube',
  aspect: 'vertical',
  sourcePath: `/reviews/${source}`,
  sourceTitle: `Título ${source}`,
  title: `Vídeo ${slug}`,
  description: 'Descrição.',
  uploadDate: '2026-11-08',
  duration: 'PT30S',
  thumbnailUrl: '/images/videos/teste.webp',
  embedUrl: 'https://www.youtube.com/embed/teste',
});
const videos = getVideoItems(
  { reviews: fixtures, recipes: [] },
  [page('v-multi', 'alternativas'), page('v-uma', 'skull-1'), page('v-pausadas', 'pausadas')],
  stores
);
const video = (slug: string) => videos.find((item) => item.slug === slug);
assert.equal(video('v-multi')?.store, null);
assert.deepEqual(video('v-multi')?.codeLink, { label: 'Ver lojas e códigos no artigo', href: '/reviews/alternativas' });
assert.equal(video('v-uma')?.store?.slug, 'black-skull');
assert.equal(video('v-uma')?.codeLink?.href, '/cupons/black-skull');
assert.equal(video('v-pausadas')?.codeLink, null, 'nenhuma loja ativa: sem botão');

// Snippet: o artigo de várias lojas fica fora da regra.
assert.equal(isSnippetChecked({ slug: 'alternativas', coupon: 'CECILIA10', affiliate: FOUR, metaDescription: 'x' }), false);
assert.equal(isSnippetChecked({ slug: 'skull-1', coupon: 'CECILIA10', affiliate: 'black-skull', metaDescription: 'x' }), true);

// validate:content: as regras da lista, com a liberação ligada (o terceiro argumento) e desligada.
const ok = { affiliate: ['black-skull', 'max-titanium'] };
assert.deepEqual(affiliateProblems(ok, COUPONS, true), []);
assert.deepEqual(affiliateProblems({ ...ok, locale: 'pt' }, COUPONS, true), []);
assert.deepEqual(affiliateProblems({ affiliate: FOUR }, COUPONS, true), []);
assert.deepEqual(affiliateProblems({ affiliate: ['black-skull', 'kopenhagen'] }, COUPONS, true), [], 'loja pausada fica na lista');
assert.match(affiliateProblems(ok, COUPONS).join('|'), /ainda não está liberado/, 'conteúdo com lista barrado até a fase 4');
assert.deepEqual(affiliateProblems({ affiliate: 'damie' }, COUPONS), [], 'uma loja: como sempre');
assert.match(affiliateProblems({ affiliate: 'loja-que-nao-existe' }, COUPONS).join('|'), /não é o slug/);
const listProblem = (review: Record<string, unknown>, pattern: RegExp, name: string) =>
  assert.match(affiliateProblems(review, COUPONS, true).join('|'), pattern, name);
listProblem({ affiliate: ['damie'] }, /uma loja só/, 'lista de 1');
listProblem({ affiliate: [...FOUR, 'damie'] }, /de 2 a 4 lojas \(tem 5\)/, 'lista de 5');
listProblem({ affiliate: ['damie', 'damie'] }, /repetida: damie/, 'repetida');
listProblem({ affiliate: ['damie', 'loja-que-nao-existe'] }, /"loja-que-nao-existe" não é o slug/, 'inexistente');
listProblem({ affiliate: ['damie', 'yesstyle'] }, /"yesstyle": .*código comum/, 'recompensa');
listProblem({ affiliate: ['damie', 'shein'] }, /"shein": .*código comum/, 'indicação');
listProblem({ ...ok, locale: 'en' }, /só em artigo em português/, 'idioma');
listProblem({ ...ok, locale: 'xx' }, /só em artigo em português|locale/, 'idioma inválido não passa como PT');
listProblem({ ...ok, translationKey: 'familia' }, /translationKey/, 'família');
listProblem({ ...ok, coupon: 'CECILIA10' }, /sem coupon/, 'coupon');
listProblem({ ...ok, cta: { url: 'https://x', label: 'x' } }, /sem cta/, 'cta');
listProblem({ affiliate: [1, 2] }, /slug de uma loja ou uma lista/, 'lista de números');

console.log('✅ várias lojas nas listagens: home, /reviews, subpáginas, Outros, relacionados, data comercial, vídeo e snippet; regras do affiliate em lista');
