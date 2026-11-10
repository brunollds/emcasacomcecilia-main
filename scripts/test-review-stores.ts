// O artigo de várias lojas nas listagens: `affiliate` em lista (src/lib/reviewStores.ts). Nenhum artigo publicado usa
// lista ainda; o teste monta os casos com artigos de mentira e confere que o de uma loja segue como sempre.
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { ArticleCodeCopyProvider, HighlightCoupon } from '@/components/review/HighlightCoupon';
import { ArticleStoreCodes } from '@/components/review/article/ArticleStoreCodes';
import { ArticleStyling } from '@/components/review/article/ArticleStyling';
import { getArticleCopy } from '@/components/review/articleCopy';
import { getArticleStoreBlock, getArticleStoreBlocks } from '@/lib/articleStore';
import { COUPONS, getActiveCoupons, getPendingLimitedCodes } from '@/lib/couponsData';
import { publishedReviews } from '@/lib/data';
import { resolveActiveHomeEvent } from '@/lib/homeEvents';
import { getHomeLatest, getHomeStoreTabs, getStoreArticlesPage, sortStoresByNewestArticle } from '@/lib/homeStores';
import { pickRelatedReviews } from '@/lib/relatedReviews';
import {
  getReviewStoreLabel,
  getReviewStoreSlugs,
  getReviewStores,
  getSingleStoreSlug,
  isMultiStoreReview,
  reviewHasStore,
  reviewsShareStore,
  withoutPausedHref,
  withoutPausedStoreLinks,
} from '@/lib/reviewStores';
import { getOthersShelfContent, getRelatedShelfCards, getReviewsHubContent, getStoreShelfContent, type HubReview } from '@/lib/reviewsHub';
import { getVideoItems, type VideoPageRecord } from '@/lib/videosHub';
import { affiliateProblems, staleCodeWarnings, storeFieldProblems } from './multi-store-checks';
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
// Os cartões de relacionados leem as lojas ativas de verdade (couponsData.ts): o rótulo esperado sai delas, e uma loja
// pausada amanhã não quebra o build.
const relatedCards = getRelatedShelfCards([multi, fixtures[3]], 'pt');
assert.deepEqual(
  relatedCards.map(({ store: label }) => label),
  [multi, fixtures[3]].map((item) => getReviewStoreLabel(item, getActiveCoupons()))
);
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

// validate:content: as regras da lista, com a liberação do repositório (ligada) e desligada pelo terceiro argumento.
const ok = { affiliate: ['black-skull', 'max-titanium'] };
assert.deepEqual(affiliateProblems(ok, COUPONS, true), []);
assert.deepEqual(affiliateProblems({ ...ok, locale: 'pt' }, COUPONS, true), []);
assert.deepEqual(affiliateProblems({ affiliate: FOUR }, COUPONS, true), []);
assert.deepEqual(affiliateProblems({ affiliate: ['black-skull', 'kopenhagen'] }, COUPONS, true), [], 'loja pausada fica na lista');
assert.deepEqual(affiliateProblems(ok, COUPONS), [], 'liberado: a lista passa com a configuração do repositório');
assert.match(affiliateProblems(ok, COUPONS, false).join('|'), /não está liberado/, 'com a liberação desligada, a lista é barrada');
assert.match(affiliateProblems({ affiliate: FOUR }, COUPONS, false).join('|'), /não está liberado/, 'desligada: barra também a lista de 4');
assert.deepEqual(affiliateProblems({ affiliate: 'damie' }, COUPONS, false), [], 'desligada: o artigo de uma loja segue');
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
assert.ok((store('magalu') as { tiers?: unknown[] }).tiers?.length, 'a Magalu tem faixas');
listProblem({ affiliate: ['damie', 'magalu'] }, /"magalu": .*sem faixas/, 'loja com faixas');

// O `store` dos links de loja: só no artigo de várias lojas, e nele em todo link de loja, uma das lojas do artigo.
const sections = (store?: string, extra: Record<string, unknown> = {}) => [
  {
    heading: 'Onde comprar',
    links: [{ label: 'Ver whey', href: 'https://loja.example/whey', sponsored: true, ...(store && { store }) }],
    images: [{ src: '/images/a.webp', alt: 'a', href: 'https://loja.example/a', ...(store && { store }) }],
    styling: { items: [{ piece: 'Camiseta', url: 'https://loja.example/c', ...(store && { store }), pairsWith: [{ label: 'Short', url: 'https://loja.example/s', ...(store && { store }) }] }] },
    ...extra,
  },
];
assert.deepEqual(storeFieldProblems({ affiliate: FOUR, contentSections: sections('probiotica') }), []);
assert.equal(storeFieldProblems({ affiliate: FOUR, contentSections: sections() }).length, 4, 'link, foto, peça e "combina com" sem store');
assert.match(storeFieldProblems({ affiliate: FOUR, contentSections: sections('damie') }).join('|'), /"damie" fora das lojas do artigo/);
assert.equal(storeFieldProblems({ affiliate: 'damie', contentSections: sections() }).length, 0, 'uma loja: sem store, como sempre');
assert.match(storeFieldProblems({ affiliate: 'damie', contentSections: sections('damie') }).join('|'), /store só no artigo de várias lojas/);
assert.deepEqual(
  storeFieldProblems({ affiliate: FOUR, contentSections: [{ links: [{ label: 'Cupons', href: '/cupons/black-skull', sponsored: false }] }] }),
  [],
  'link interno não pede store'
);

// Aviso do código antigo no texto: só o que não é o código atual de nenhuma loja do artigo.
const codeOf = (slug: string) => (store(slug) as { code: string }).code;
assert.deepEqual(
  staleCodeWarnings({ affiliate: ['black-skull', 'max-titanium'], contentSections: [{ paragraphs: [`Use ${codeOf('black-skull')} ou ${codeOf('max-titanium')}.`] }] }, COUPONS),
  []
);
assert.match(
  staleCodeWarnings({ affiliate: ['black-skull', 'max-titanium'], contentSections: [{ bullets: ['O antigo CECILIA05 não vale mais.'] }] }, COUPONS).join('|'),
  /CECILIA05/
);
assert.deepEqual(staleCodeWarnings({ affiliate: 'black-skull', contentSections: [{ paragraphs: ['CECILIA05'] }] }, COUPONS), [], 'só no artigo de várias lojas');

// O artigo: um bloco por loja ativa, na ordem do artigo, com o código e o link de afiliado de sempre de cada uma. Os
// blocos leem as lojas de verdade: a pausada da lista é uma loja de código que está pausada hoje, e o esperado sai do
// estado atual de cada uma, para pausar ou reativar uma loja não quebrar o build.
const now = Date.parse('2026-11-10T12:00:00-03:00');
const activeSlugs = new Set(getActiveCoupons().map(({ slug }) => slug));
const pausedSlug = COUPONS.find(({ slug, offerMode }) => offerMode === 'discount-code' && !activeSlugs.has(slug))?.slug;
const base = publishedReviews.find((item) => getSingleStoreSlug(item) && !item.locale);
assert.ok(base, 'um artigo PT de uma loja para a base');
const listed = ['max-titanium', ...(pausedSlug ? [pausedSlug] : []), 'black-skull'];
const multiReview = { ...base, affiliate: listed, coupon: undefined, cta: undefined };
const blocks = getArticleStoreBlocks(multiReview, 'pt', now);
assert.deepEqual(blocks.map(({ slug }) => slug), listed.filter((slug) => activeSlugs.has(slug)), 'a pausada sai e a ordem é a do artigo');
if (!pausedSlug) console.log('ℹ️ nenhuma loja de código pausada: o caso da pausada nos blocos não teve o que conferir.');
for (const block of blocks) {
  assert.equal(block.code, codeOf(block.slug), `${block.slug}: código de sempre`);
  assert.equal(block.storeHref, store(block.slug).offerUrl, `${block.slug}: link de afiliado da loja`);
  assert.equal(block.storeSponsored, true);
  assert.equal(block.couponPageHref, `/cupons/${block.slug}`);
}
assert.deepEqual(getArticleStoreBlocks(base, 'pt', now), [], 'uma loja: nenhum bloco a mais');

// Código com prazo no artigo de várias lojas: a linha da I Wanna Sleep leva os prazos pendentes dela (o ativo e o
// agendado), a da outra loja nenhum, e o que venceu sai. O esperado sai dos prazos de couponsData.ts, para a troca ou a
// limpeza de um prazo não quebrar o build; o caso inventado de prazo ativo e agendado fica no guarda do test:build-output.
const withIws = { ...multiReview, affiliate: ['i-wanna-sleep', 'black-skull'] };
const limitedAt = (iso: string) =>
  getArticleStoreBlocks(withIws, 'pt', Date.parse(iso)).map(({ slug, limitedCodes }) => [slug, (limitedCodes ?? []).map(({ endsAt }) => endsAt)]);
const expectedLimitedAt = (iso: string) =>
  ['i-wanna-sleep', 'black-skull']
    .filter((slug) => activeSlugs.has(slug))
    .map((slug) => [slug, slug === 'i-wanna-sleep' ? getPendingLimitedCodes(store(slug), Date.parse(iso)).map(({ endsAt }) => endsAt) : []]);
for (const iso of ['2026-11-05T12:00:00-03:00', '2026-11-10T12:00:00-03:00', '2026-11-28T12:00:00-03:00']) {
  assert.deepEqual(limitedAt(iso), expectedLimitedAt(iso), `prazos da I Wanna Sleep em ${iso.slice(0, 10)}`);
}
assert.deepEqual(
  getArticleStoreBlocks(withIws, 'en', Date.parse('2026-11-05T12:00:00-03:00')).flatMap(({ limitedCodes }) => limitedCodes ?? []),
  [],
  'prazo só em PT'
);
const withIwsRows = renderToStaticMarkup(
  createElement(ArticleStoreCodes, {
    variant: 'top',
    blocks: getArticleStoreBlocks(withIws, 'pt', Date.parse('2026-11-05T12:00:00-03:00')),
    locale: 'pt',
    reviewSlug: 'x',
  })
);
assert.ok(!withIwsRows.includes('CECIEMCASA15'), 'o código com prazo fica fora do HTML (só no navegador)');
assert.equal(getArticleStoreBlock(multiReview, 'pt', now), null, 'o artigo com lista não tem o bloco de uma loja');

const render = (variant: 'top' | 'end' | 'sidebar' | 'drawer') =>
  renderToStaticMarkup(createElement(ArticleStoreCodes, { variant, blocks, locale: 'pt', reviewSlug: 'x' }));
const top = render('top');
assert.match(top, /<section id="cupom-artigo" data-store-codes="top"/);
assert.ok(top.includes('Códigos deste artigo'));
assert.deepEqual([...top.matchAll(/data-store-code="([^"]+)"/g)].map(([, slug]) => slug), blocks.map(({ slug }) => slug), 'uma linha por loja ativa, na ordem do artigo');
// A linha compacta: o nome, "Ir à loja" e "Regras" juntos; o código é o próprio botão de copiar (sem "Copiar" ao lado),
// com o nome da loja no rótulo; nenhum cartão por loja (.recorte).
for (const block of blocks) {
  const row = top.slice(top.indexOf(`data-store-code="${block.slug}"`));
  const button = row.match(/<button\b[^>]*>[\s\S]*?<\/button>/)?.[0] ?? '';
  assert.ok(button.includes(`>${block.code}</span>`), `${block.slug}: o código dentro do botão`);
  assert.match(button, new RegExp(`aria-label="Copiar o código ${block.code} \\(${block.brand}\\)"`), `${block.slug}: rótulo do botão com o código e a loja`);
  const link = top.match(new RegExp(`<a[^>]*href="${block.storeHref!.replace(/[.?*+^$()[\]{}|\\]/g, '\\$&').replaceAll('&', '&amp;')}"[^>]*>`))?.[0] ?? '';
  assert.match(link, /rel="[^"]*sponsored/, `${block.slug}: link da loja com sponsored`);
  assert.match(link, new RegExp(`aria-label="Ir à loja: ${block.brand}"`), `${block.slug}: o link da loja diz qual loja`);
  assert.ok(row.includes(`<span class="sr-only">${getArticleCopy('pt').storeRulesOf(block)}</span>`), `${block.slug}: o nome completo das regras para o leitor de tela`);
}
assert.ok(top.includes('>Ir à loja') && top.includes('>Regras</span>'), 'os textos curtos na tela');
assert.ok(!/\bCopiar</.test(top), 'sem o botão "Copiar" ao lado do código');
assert.ok(!/class="[^"]*\brecorte\b/.test(top), 'sem um cartão (.recorte) por loja');
// O carrossel do celular rola por dentro e segura os sr-only (position: absolute) dos cartões fora da tela: sem o
// relative, eles escapam da rolagem e a página fica mais larga que o celular.
assert.match(top, /<ul class="[^"]*\brelative\b[^"]*\boverflow-x-auto\b/, 'o carrossel com relative e overflow-x-auto');
assert.doesNotMatch(render('sidebar'), /id="cupom-artigo"/, 'só o topo leva o id do dock');
assert.doesNotMatch(render('sidebar'), /Regras d[ao] /, 'a lateral fica sem o link das regras');
const drawer = render('drawer');
assert.doesNotMatch(drawer, /id="cupom-artigo"/, 'a gaveta não repete o id do topo');
assert.match(drawer, /data-store-codes="drawer"/);
assert.equal(drawer.match(/data-store-code="/g)?.length, blocks.length, 'a gaveta: uma linha por loja ativa');
assert.doesNotMatch(render('end'), /Códigos deste artigo/, 'no fim, o título vem do ArticleEnd');

// Código no texto: cada um copia com a loja dele; o que duas lojas dividem só fica destacado.
const inline = (code: string, slug: string) => ({ code, brand: store(slug).brand, slug, reviewSlug: 'x', locale: 'pt' as const });
const text = renderToStaticMarkup(
  createElement(ArticleCodeCopyProvider, {
    value: [inline('CECILIA10', 'black-skull'), inline('CECILIA10', 'bagaggio'), inline('MAX10EMCASACOMCECILIA', 'max-titanium')],
  } as never, createElement(HighlightCoupon, { text: 'Na Black Skull é CECILIA10; na Max, MAX10EMCASACOMCECILIA.' }))
);
assert.ok(text.includes('data-copy-code="MAX10EMCASACOMCECILIA"'), 'o código de uma loja só copia');
assert.ok(!text.includes('data-copy-code="CECILIA10"'), 'o código dividido não copia');
const single = renderToStaticMarkup(
  createElement(ArticleCodeCopyProvider, { value: inline('CECILIA10', 'black-skull') } as never, createElement(HighlightCoupon, { text: 'Use CECILIA10.' }))
);
assert.ok(single.includes('data-copy-code="CECILIA10"'), 'uma loja: copia como sempre');

// Loja pausada no artigo de várias lojas: o botão do link sai, e a foto e as peças ficam sem link; com todas pausadas
// (multiStores vazio), também. A loja ativa segue com os links, e o artigo de uma loja (sem multiStores), como sempre.
// (O ReviewSectionContent não roda no tsx, porque o ReviewInlineImage é .js com JSX: as regras do link e da foto são
// as funções que ele e o ReviewSectionContent usam.)
const multiStoresOf = (...slugs: string[]) => Object.fromEntries(slugs.map((slug) => [slug, { brand: store(slug).brand, code: codeOf(slug) }]));
const linksOf = (storeSlug?: string) => [
  { label: 'Loja', href: 'https://loja.example/whey', sponsored: true, ...(storeSlug && { store: storeSlug }) },
  { label: 'Cupons', href: '/cupons/black-skull', sponsored: false },
  { label: 'Fonte', href: 'https://fonte.example', sponsored: false },
];
const labels = (links: { label: string }[]) => links.map(({ label }) => label);
const photo = (storeSlug?: string) => ({ src: '/a.webp', href: 'https://loja.example/a', ...(storeSlug && { store: storeSlug }) });
const stylingHtml = (storeSlug: string | undefined, multiStores?: ReturnType<typeof multiStoresOf>) =>
  renderToStaticMarkup(
    createElement(ArticleStyling, {
      styling: sections(storeSlug)[0].styling,
      locale: 'pt',
      reviewSlug: 'x',
      ...(multiStores && { multiStores }),
    } as never)
  );
for (const [name, storeSlug, multiStores] of [
  ['loja pausada', 'kopenhagen', multiStoresOf('black-skull')],
  ['todas pausadas', 'black-skull', {}],
  ['sem store', undefined, multiStoresOf('black-skull')],
] as const) {
  assert.deepEqual(labels(withoutPausedStoreLinks(linksOf(storeSlug), multiStores)), ['Cupons', 'Fonte'], `${name}: o botão da loja sai`);
  assert.equal(withoutPausedHref(photo(storeSlug), multiStores).href, undefined, `${name}: a foto fica sem link`);
  const html = stylingHtml(storeSlug, multiStores);
  assert.ok(!html.includes('loja.example'), `${name}: peças sem link`);
  for (const piece of ['Camiseta', 'Short']) assert.ok(html.includes(piece), `${name}: a peça ${piece} fica`);
}
for (const [name, storeSlug, multiStores] of [
  ['loja ativa', 'black-skull', multiStoresOf('black-skull')],
  ['uma loja', undefined, undefined],
] as const) {
  assert.deepEqual(labels(withoutPausedStoreLinks(linksOf(storeSlug), multiStores)), ['Loja', 'Cupons', 'Fonte'], `${name}: todos os links`);
  assert.equal(withoutPausedHref(photo(storeSlug), multiStores).href, 'https://loja.example/a', `${name}: a foto com link`);
  const html = stylingHtml(storeSlug, multiStores);
  for (const path of ['c', 's']) assert.ok(html.includes(`https://loja.example/${path}`), `${name}: link da peça ${path}`);
}

console.log('✅ várias lojas nas listagens: home, /reviews, subpáginas, Outros, relacionados, data comercial, vídeo e snippet; regras do affiliate e do store; aviso de código antigo; blocos e linhas de código do artigo; código no texto; links, fotos e peças de loja pausada sem link');
