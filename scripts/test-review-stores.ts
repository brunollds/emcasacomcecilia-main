// O artigo de várias lojas nas listagens: `affiliate` em lista (src/lib/reviewStores.ts). O teste monta os casos com
// artigos de mentira e confere que o de uma loja segue como sempre. Nenhum artigo publicado tem loja só de link nem
// afiliado sem página na lista ainda, nem lista fora do português: esses casos (SHEIN, Shopee, Temu e AliExpress, e as
// versões em outros idiomas) também são de mentira.
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { ArticleCodeCopyProvider, HighlightCoupon } from '@/components/review/HighlightCoupon';
import { ArticleStoreCodes } from '@/components/review/article/ArticleStoreCodes';
import { ArticleStyling } from '@/components/review/article/ArticleStyling';
import { getArticleCopy, getStoreListTitle } from '@/components/review/articleCopy';
import { getSidebarCopy, getViewStoresLabel } from '@/components/review/sidebarCopy';
import { AFFILIATE_STORES, getAffiliateStore } from '@/lib/affiliateStores';
import { getArticleStoreBlock, getArticleStoreBlocks, hasTranslatedStorePage, type ArticleStoreBlock } from '@/lib/articleStore';
import { getCouponCopyLabels } from '@/components/review/couponCopyLocale';
import { COUPONS, getActiveCoupons, getPendingLimitedCodes } from '@/lib/couponsData';
import { getLocalizedCoupon, TRANSLATED_LOCALES } from '@/lib/couponTranslations';
import { publishedReviews } from '@/lib/data';
import { resolveActiveHomeEvent } from '@/lib/homeEvents';
import { getHomeLatest, getHomeStoreTabs, getHomeVitrineStores, getStoreArticlePageSlugs, getStoreArticlesPage, getStoreCode, sortStoresByNewestArticle } from '@/lib/homeStores';
import { getLocaleHomeLatest, getLocaleHomeStoreTabs } from '@/lib/localeHome';
import { pickRelatedReviews } from '@/lib/relatedReviews';
import {
  everyStoreHasCode,
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
import { isListedInPortuguese } from '@/lib/reviewVisibility.mjs';
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
// Fora do PT, as duas frases saem no idioma do cartão; a marca não se traduz.
assert.equal(getReviewStoreLabel(pair, stores, 'en'), 'Black Skull and Max Titanium');
assert.equal(getReviewStoreLabel(multi, stores, 'en'), '4 partner stores');
assert.equal(getReviewStoreLabel(review(0, 'tres', FOUR.slice(0, 3), '2026-01-01'), stores, 'en'), '3 partner stores');
assert.equal(getReviewStoreLabel(pair, stores, 'ja'), 'Black Skull と Max Titanium');
assert.equal(getReviewStoreLabel(multi, stores, 'ja'), '提携ストア 4 店');
assert.equal(getReviewStoreLabel(pair, stores, 'ko'), 'Black Skull, Max Titanium');
assert.equal(getReviewStoreLabel(multi, stores, 'ko'), '파트너 스토어 4곳');
assert.equal(getReviewStoreLabel(pair, stores, 'zh-hant'), 'Black Skull 和 Max Titanium');
assert.equal(getReviewStoreLabel(multi, stores, 'de'), '4 Partner-Shops');
assert.equal(getReviewStoreLabel(pausedOnly, stores, 'en'), 'Black Skull', 'fora do PT, a lista com uma ativa mostra a ativa');
assert.equal(getReviewStoreLabel(fixtures[11], stores, 'en'), undefined, 'fora do PT, a lista sem nenhuma ativa fica sem nome');
for (const unknown of ['xx', 'pt-BR', 'constructor']) {
  assert.equal(getReviewStoreLabel(multi, stores, unknown), undefined, `idioma fora da tabela (${unknown}): sem nome`);
  assert.equal(getReviewStoreLabel(pair, stores, unknown), undefined, `idioma fora da tabela (${unknown}): sem nome`);
}
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
assert.deepEqual(
  getRelatedShelfCards([multi], 'en').map(({ store: label }) => label),
  [getReviewStoreLabel(multi, getActiveCoupons(), 'en')]
);

// O afiliado sem página (a Shopee) na lista: o artigo segue sendo da SHEIN em toda listagem, e a Shopee não ganha
// aba, bolinha, subpágina, nome no cartão nem entra em contagem.
const linkStores = [...stores, store('shein')];
const sheinShopee = review(20, 'shein-ou-shopee', ['shein', 'shopee'], '2026-11-16');
const withLinkOnly = [...fixtures, sheinShopee, review(21, 'shein-1', 'shein', '2026-10-05'), review(22, 'shein-2', 'shein', '2026-10-06')];
assert.equal(getReviewStoreLabel(sheinShopee, linkStores), 'SHEIN', 'o cartão leva só a loja com página');
const linkTabs = getHomeStoreTabs(withLinkOnly, linkStores, Date.parse('2026-11-16T12:00:00-03:00'));
assert.ok(linkTabs.find(({ slug }) => slug === 'shein')?.articles.some(({ slug }) => slug === 'shein-ou-shopee'), 'aba da SHEIN com o artigo');
assert.ok(!linkTabs.some(({ slug }) => slug === 'shopee'), 'a Shopee não ganha aba na home');
assert.equal(sortStoresByNewestArticle(linkStores, withLinkOnly)[0].slug, 'shein', 'o artigo mais novo põe a SHEIN na frente');
assert.ok(!sortStoresByNewestArticle(linkStores, withLinkOnly).some(({ slug }) => slug === 'shopee'), 'a Shopee não entra na ordem das bolinhas');
assert.equal(getHomeLatest(withLinkOnly, linkStores).find(({ slug }) => slug === 'shein-ou-shopee')?.store, 'SHEIN');
assert.equal(getStoreArticlesPage(withLinkOnly, 'shein', linkStores)?.articles.length, 3, 'o artigo conta para a subpágina da SHEIN');
assert.equal(getStoreArticlesPage(withLinkOnly, 'shopee', linkStores), null, 'a Shopee não tem subpágina');
assert.ok(!getStoreArticlePageSlugs(withLinkOnly, linkStores).includes('shopee'), 'nenhuma rota /reviews/loja/shopee');
const linkHub = getReviewsHubContent(withLinkOnly, linkStores);
assert.equal(linkHub.articles.find(({ slug }) => slug === 'shein-ou-shopee')?.store, 'SHEIN');
assert.ok(!linkHub.stores.some(({ slug }) => slug === 'shopee'), 'a Shopee não ganha bolinha em /reviews');
assert.equal(linkHub.stores.find(({ slug }) => slug === 'shein')?.total, 3, 'a bolinha da SHEIN conta o artigo');
assert.ok(
  !getOthersShelfContent(withLinkOnly, linkStores)?.articles.some(({ slug }) => slug === 'shein-ou-shopee'),
  'o artigo com a SHEIN ativa não cai em Outros'
);
assert.equal(pickRelatedReviews(sheinShopee, withLinkOnly)[0].slug, 'shein-2', 'relacionados: os da SHEIN primeiro');

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
listProblem({ affiliate: ['damie', 'yesstyle'] }, /"yesstyle": .*código de recompensa/, 'recompensa');
listProblem({ ...ok, locale: 'xx' }, /locale inválido/, 'idioma inválido não passa como PT');
assert.deepEqual(affiliateProblems({ ...ok, translationKey: 'familia' }, COUPONS, true), [], 'a lista entra em família');
listProblem({ ...ok, coupon: 'CECILIA10' }, /sem coupon/, 'coupon');
listProblem({ ...ok, cta: { url: 'https://x', label: 'x' } }, /sem cta/, 'cta');
listProblem({ affiliate: [1, 2] }, /slug de uma loja ou uma lista/, 'lista de números');
assert.ok((store('magalu') as { tiers?: unknown[] }).tiers?.length, 'a Magalu tem faixas');
listProblem({ affiliate: ['damie', 'magalu'] }, /"magalu": .*loja com faixas/, 'loja com faixas');

// A loja só de link e o afiliado sem página: só na lista, e o afiliado sem página só no idioma em que vale.
assert.equal(store('shein').offerMode, 'affiliate-link', 'a SHEIN é loja de link');
const linkOnly = COUPONS.find((coupon) => coupon.offerMode === 'affiliate-link' && !coupon.referral);
assert.deepEqual(affiliateProblems({ affiliate: ['shein', 'shopee'] }, COUPONS, true), [], 'SHEIN e Shopee em português');
assert.deepEqual(affiliateProblems({ affiliate: ['damie', 'shein'] }, COUPONS, true), [], 'loja de código com a de indicação');
if (linkOnly) assert.deepEqual(affiliateProblems({ affiliate: ['damie', linkOnly.slug] }, COUPONS, true), [], 'loja de link sem código');
assert.deepEqual(affiliateProblems({ affiliate: 'shein' }, COUPONS), [], 'a SHEIN sozinha segue como sempre');
const alone = affiliateProblems({ affiliate: 'shopee' }, COUPONS);
assert.equal(alone.length, 1);
assert.match(alone[0], /"shopee" é afiliado sem página.*só entra em lista/, 'a Shopee sozinha, em texto');
const english = affiliateProblems({ affiliate: ['shein', 'shopee'], locale: 'en' }, COUPONS, true).join('|');
assert.match(english, /"shopee": o link da loja não vale em artigo em en/, 'a Shopee fora do idioma dela');
assert.doesNotMatch(english, /"shein"/, 'a SHEIN não é barrada pelo idioma');
listProblem({ affiliate: ['shein', 'shopee', 'yesstyle'] }, /"yesstyle": .*código de recompensa/, 'recompensa ao lado da Shopee');
listProblem({ affiliate: ['shopee', 'shopee'] }, /repetida: shopee/, 'afiliado sem página repetido');

// Fora do português e em família: toda loja da lista tem de valer no idioma do artigo. A de couponsData.ts, com página
// de loja nesse idioma; a recompensa e as faixas seguem fora em qualquer um. A loja de código só do PT sai dos dados.
const portugueseOnly = getActiveCoupons().find(
  (coupon) => coupon.offerMode === 'discount-code' && !coupon.codeKind && !coupon.tiers?.length && !hasTranslatedStorePage(coupon.slug, 'en')
);
assert.ok(portugueseOnly, 'uma loja de código comum sem página traduzida');
for (const slug of ['shein', 'temu', 'aliexpress']) assert.ok(hasTranslatedStorePage(slug, 'ja'), `${slug} tem página nos outros idiomas`);
for (const locale of TRANSLATED_LOCALES) {
  for (const list of [['shein', 'temu'], ['shein', 'aliexpress'], ['aliexpress', 'temu', 'shein']]) {
    assert.deepEqual(affiliateProblems({ affiliate: list, locale, translationKey: 'familia' }, COUPONS, true), [], `${locale}: ${list.join(', ')} em família`);
  }
  const untranslated = affiliateProblems({ affiliate: ['shein', portugueseOnly.slug], locale }, COUPONS, true);
  assert.equal(untranslated.length, 1, `${locale}: só a loja sem página no idioma é barrada`);
  assert.match(untranslated[0], new RegExp(`"${portugueseOnly.slug}": a loja não tem página em ${locale}`));
  const shopeeAbroad = affiliateProblems({ affiliate: ['shein', 'shopee'], locale, translationKey: 'familia' }, COUPONS, true);
  assert.equal(shopeeAbroad.length, 1, `${locale}: só a Shopee é barrada`);
  assert.match(shopeeAbroad[0], new RegExp(`"shopee": o link da loja não vale em artigo em ${locale}`));
  const reward = affiliateProblems({ affiliate: ['shein', 'yesstyle'], locale }, COUPONS, true);
  assert.equal(reward.length, 1, `${locale}: a YesStyle tem página no idioma, e segue fora pela recompensa`);
  assert.match(reward[0], /"yesstyle": .*código de recompensa/);
  assert.match(affiliateProblems({ affiliate: ['shein', 'magalu'], locale }, COUPONS, true).join('|'), /"magalu": .*loja com faixas/, `${locale}: faixas`);
  assert.match(affiliateProblems({ affiliate: ['shein', 'temu'], locale, coupon: 'X' }, COUPONS, true).join('|'), /sem coupon/, `${locale}: coupon`);
}
assert.deepEqual(
  affiliateProblems({ affiliate: ['shein', portugueseOnly.slug], translationKey: 'familia' }, COUPONS, true),
  [],
  'a versão em português da família não é barrada pela loja sem tradução (as outras versões são)'
);

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
// A loja de link: o código de indicação da SHEIN é código atual, e a Shopee, sem código, não dá aviso nem quebra.
const sheinCode = getStoreCode(store('shein'));
assert.ok(sheinCode, 'a SHEIN tem código de indicação');
assert.deepEqual(
  staleCodeWarnings({ affiliate: ['shein', 'shopee'], contentSections: [{ paragraphs: [`Pesquise ${sheinCode} no app da SHEIN; na Shopee não há código.`] }] }, COUPONS),
  []
);
assert.match(
  staleCodeWarnings({ affiliate: ['shein', 'shopee'], contentSections: [{ paragraphs: ['O antigo CECILIA05 não vale.'] }] }, COUPONS).join('|'),
  /CECILIA05/
);

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

// A lista com a SHEIN e a Shopee: os blocos na ordem do artigo, misturando os dois cadastros. O da SHEIN é o do artigo
// dela com o código de indicação; o da Shopee, só o nome e o link, e só no idioma em que ela vale.
const shopee = getAffiliateStore('shopee');
assert.ok(shopee, 'a Shopee está em affiliateStores.ts');
const shopeeBlock: ArticleStoreBlock = { brand: shopee.brand, slug: 'shopee', rules: [], storeHref: shopee.offerUrl, storeSponsored: true };
const sheinActive = activeSlugs.has('shein');
if (!sheinActive) console.log('ℹ️ a SHEIN está pausada: o bloco dela na lista com a Shopee não teve o que conferir.');
for (const order of [['shein', 'shopee'], ['shopee', 'black-skull', 'shein']]) {
  const mixed = getArticleStoreBlocks({ ...multiReview, affiliate: order }, 'pt', now);
  assert.deepEqual(
    mixed.map(({ slug }) => slug),
    order.filter((slug) => slug === 'shopee' || activeSlugs.has(slug)),
    `${order.join(', ')}: a ordem do artigo`
  );
  assert.deepEqual(mixed.find(({ slug }) => slug === 'shopee'), shopeeBlock, 'o bloco da Shopee: nome e link, sem código nem página');
}
const linkBlocks = getArticleStoreBlocks({ ...multiReview, affiliate: ['shein', 'shopee'] }, 'pt', now);
const sheinBlock = linkBlocks.find(({ slug }) => slug === 'shein');
assert.equal(Boolean(sheinBlock), sheinActive);
if (sheinBlock) {
  assert.equal(sheinBlock.code, sheinCode, 'SHEIN: o código de indicação');
  assert.equal(sheinBlock.codeKind, 'referral');
  assert.equal(sheinBlock.couponPageHref, '/cupons/shein');
  assert.equal(sheinBlock.storeHref, store('shein').offerUrl);
  assert.equal(sheinBlock.storeSponsored, true);
  assert.deepEqual(sheinBlock, getArticleStoreBlock({ ...multiReview, affiliate: 'shein', coupon: sheinCode }, 'pt', now), 'o mesmo bloco do artigo da SHEIN');
}
for (const locale of ['en', 'ja'] as const) {
  assert.ok(
    !getArticleStoreBlocks({ ...multiReview, affiliate: ['shein', 'shopee'] }, locale, now).some(({ slug }) => slug === 'shopee'),
    `${locale}: a Shopee fica fora do idioma em que não vale`
  );
}
// Fora do português, a SHEIN ao lado da Temu ou do AliExpress: o código de indicação, com o desconto, as regras e o link
// da tradução da loja (a SHEIN tem link internacional próprio), e a página da loja no idioma. A Temu e o AliExpress
// saem sem código, com o link de afiliado do PT (a tradução delas não tem outro) e as regras do idioma.
const ptRuleValues = (slug: string) =>
  new Set(getArticleStoreBlocks({ ...multiReview, affiliate: [slug, 'black-skull'] }, 'pt', now).find((block) => block.slug === slug)?.rules.map(({ value }) => value));
for (const locale of TRANSLATED_LOCALES) {
  for (const other of ['temu', 'aliexpress']) {
    if (!sheinActive || !activeSlugs.has(other)) continue;
    const abroad = getArticleStoreBlocks({ ...multiReview, locale, affiliate: ['shein', other] }, locale, now);
    assert.deepEqual(abroad.map(({ slug }) => slug), ['shein', other], `${locale}: as duas lojas, na ordem do artigo`);
    const [sheinRow, otherRow] = abroad;
    const sheinText = getLocalizedCoupon('shein', locale);
    const otherText = getLocalizedCoupon(other, locale);
    assert.ok(sheinText && otherText, `${locale}: a SHEIN e ${other} com tradução`);
    assert.equal(sheinRow.code, sheinCode, `${locale}: o código de indicação da SHEIN`);
    assert.equal(sheinRow.codeKind, 'referral', `${locale}: o tipo do código da SHEIN`);
    assert.equal(sheinRow.discount, sheinText.discount, `${locale}: o desconto da SHEIN vem da tradução`);
    assert.notEqual(sheinRow.discount, store('shein').discount, `${locale}: desconto da SHEIN em português`);
    assert.equal(sheinRow.storeHref, sheinText.offerUrl, `${locale}: o link internacional da SHEIN`);
    assert.notEqual(sheinRow.storeHref, store('shein').offerUrl, `${locale}: a SHEIN com o link do PT`);
    assert.equal(sheinRow.couponPageHref, `/${locale}/coupons/shein`);
    assert.equal(otherRow.code, undefined, `${locale}: ${other} sem código`);
    assert.equal(otherRow.codeKind, undefined);
    assert.equal(otherRow.discount, undefined);
    assert.equal(otherRow.storeHref, store(other).offerUrl, `${locale}: ${other} com o link de afiliado da loja`);
    assert.equal(otherRow.couponPageHref, `/${locale}/coupons/${other}`);
    for (const [row, slug] of [[sheinRow, 'shein'], [otherRow, other]] as const) {
      assert.equal(row.storeSponsored, true, `${locale}: ${slug} patrocinado`);
      assert.equal(row.articlesHref, undefined, `${locale}: ${slug} sem a subpágina de artigos, que é do PT`);
      assert.equal(row.limitedCodes, undefined, `${locale}: ${slug} sem código com prazo`);
      assert.ok(row.rules.length > 0, `${locale}: ${slug} com as regras`);
      const portuguese = ptRuleValues(slug);
      assert.deepEqual(row.rules.filter(({ value }) => portuguese.has(value)), [], `${locale}: regra de ${slug} em português`);
    }
  }
}

// Toda loja do cadastro dá o bloco mínimo no idioma dela, na posição dela na lista.
for (const item of AFFILIATE_STORES) {
  const locale = item.locales === 'all' ? 'pt' : item.locales[0];
  const [first] = getArticleStoreBlocks({ ...multiReview, affiliate: [item.slug, 'black-skull'] }, locale, now);
  assert.deepEqual(first, { brand: item.brand, slug: item.slug, rules: [], storeHref: item.offerUrl, storeSponsored: true }, `${item.slug}: bloco mínimo`);
}

const render = (variant: 'top' | 'end' | 'sidebar' | 'drawer', rows: Parameters<typeof ArticleStoreCodes>[0]['blocks'] = blocks) =>
  renderToStaticMarkup(createElement(ArticleStoreCodes, { variant, blocks: rows, locale: 'pt', reviewSlug: 'x' }));
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

// O título e o botão do dock: "códigos" quando toda loja tem o dela; com uma loja sem código, "lojas".
assert.equal(everyStoreHasCode(blocks), true);
assert.equal(everyStoreHasCode(linkBlocks), false);
assert.equal(everyStoreHasCode([]), true);
assert.equal(getStoreListTitle(getArticleCopy('pt'), blocks), 'Códigos deste artigo');
assert.equal(getStoreListTitle(getArticleCopy('pt'), linkBlocks), 'Lojas deste artigo');
assert.equal(getViewStoresLabel(getSidebarCopy('pt'), blocks), `Ver códigos (${blocks.length})`);
assert.equal(getViewStoresLabel(getSidebarCopy('pt'), linkBlocks), `Ver lojas (${linkBlocks.length})`);
assert.equal(getStoreListTitle(getArticleCopy('ja'), [shopeeBlock]), 'この記事のストア');
assert.equal(getViewStoresLabel(getSidebarCopy('de'), [shopeeBlock, shopeeBlock]), 'Shops ansehen (2)');

// As linhas com a loja sem código: o título fala de lojas, a linha da Shopee tem só o nome e o "Ir à loja" patrocinado
// (nenhum botão de copiar nem link de regras), e a da SHEIN segue com o código dela.
for (const variant of ['top', 'sidebar', 'drawer', 'end'] as const) {
  const html = render(variant, linkBlocks);
  assert.deepEqual([...html.matchAll(/data-store-code="([^"]+)"/g)].map(([, slug]) => slug), linkBlocks.map(({ slug }) => slug), `${variant}: as linhas na ordem`);
  assert.ok(!html.includes('Códigos deste artigo'), `${variant}: sem "Códigos deste artigo" com loja sem código`);
  assert.equal(html.includes('Lojas deste artigo'), variant !== 'end', `${variant}: o título das lojas (no fim, vem do ArticleEnd)`);
  if (variant !== 'end') assert.match(html, /<section[^>]*aria-label="Lojas deste artigo"/, `${variant}: o nome da seção`);
  const row = html.split('data-store-code="shopee"')[1].split('data-store-code="')[0];
  assert.doesNotMatch(row, /<button\b/, `${variant}: a Shopee sem botão de copiar`);
  assert.doesNotMatch(row, /Regras/, `${variant}: a Shopee sem link de regras`);
  const links = row.match(/<a\b[^>]*>/g) ?? [];
  assert.equal(links.length, 1, `${variant}: um link só na linha da Shopee`);
  assert.ok(links[0].includes(`href="${shopee.offerUrl}"`), `${variant}: o link de afiliado da Shopee`);
  assert.match(links[0], /rel="[^"]*sponsored/, `${variant}: a Shopee com sponsored`);
  assert.match(links[0], /aria-label="Ir à loja: Shopee"/, `${variant}: o link diz qual loja`);
  // No cartão do topo, o "Ir à loja" ocupa o lugar do código (mt-auto), alinhado ao código do vizinho.
  assert.equal(/class="[^"]*\bmt-auto\b/.test(links[0]), variant === 'top' && linkBlocks.length > 1, `${variant}: o lugar do link da Shopee`);
  if (sheinBlock) assert.ok(html.includes(`aria-label="Copiar o código ${sheinBlock.code} (SHEIN)"`), `${variant}: a SHEIN com o código`);
}

// As linhas fora do português, com a SHEIN e a Temu: o título, o "Ir à loja", as regras, o botão de copiar e o aviso do
// código de indicação no idioma, e nenhum texto do PT.
const temuActive = activeSlugs.has('temu');
if (sheinActive && sheinCode && temuActive) {
  const escaped = (text: string) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
  const ptCopy = getArticleCopy('pt');
  const shein = { slug: 'shein', brand: store('shein').brand };
  for (const locale of TRANSLATED_LOCALES) {
    const abroad = getArticleStoreBlocks({ ...multiReview, locale, affiliate: ['shein', 'temu'] }, locale, now);
    const copy = getArticleCopy(locale);
    const title = getStoreListTitle(copy, abroad);
    assert.equal(title, copy.storeListTitle, `${locale}: com a Temu, o título fala de lojas`);
    assert.equal(getViewStoresLabel(getSidebarCopy(locale), abroad), getSidebarCopy(locale).viewStores(2), `${locale}: o botão do dock fala de lojas`);
    const portuguese = [
      ptCopy.storeListTitle,
      ptCopy.storeCodesTitle,
      ptCopy.storeGoShort,
      `>${ptCopy.storeRulesShort}<`,
      ptCopy.storeRulesOf(shein),
      getCouponCopyLabels('pt').copyCoupon(sheinCode),
      ptCopy.copiedHint(shein, 'referral'),
      store('shein').discount,
    ];
    for (const variant of ['top', 'sidebar', 'drawer', 'end'] as const) {
      const html = renderToStaticMarkup(createElement(ArticleStoreCodes, { variant, blocks: abroad, locale, reviewSlug: 'x' }));
      const where = `${locale}, ${variant}`;
      if (variant !== 'end') assert.ok(html.includes(`aria-label="${escaped(title)}"`), `${where}: o nome da seção no idioma`);
      for (const { brand, storeHref } of abroad) {
        assert.ok(html.includes(`aria-label="${escaped(`${copy.storeGoShort}: ${brand}`)}"`), `${where}: "Ir à loja" de ${brand} no idioma`);
        assert.ok(html.includes(`href="${escaped(storeHref!)}"`), `${where}: o link de ${brand}`);
      }
      assert.ok(html.includes(`aria-label="${escaped(`${getCouponCopyLabels(locale).copyCoupon(sheinCode)} (SHEIN)`)}"`), `${where}: o botão de copiar no idioma`);
      assert.ok(html.includes(escaped(copy.copiedHint(shein, 'referral'))), `${where}: o aviso do código de indicação no idioma`);
      assert.equal(html.match(/<button\b/g)?.length, 1, `${where}: só a SHEIN tem botão de copiar`);
      for (const slug of ['shein', 'temu']) {
        assert.equal(html.includes(`href="/${locale}/coupons/${slug}"`), variant !== 'sidebar', `${where}: as regras de ${slug} na página do idioma`);
      }
      assert.ok(!html.includes('href="/cupons/'), `${where}: link para a página de loja em português`);
      assert.deepEqual(portuguese.filter((text) => html.includes(escaped(text))), [], `${where}: texto em português`);
    }
  }
} else {
  console.log('ℹ️ a SHEIN ou a Temu está pausada: as linhas fora do português não tiveram o que conferir.');
}

// A família com a lista nas listagens. Em português, o artigo conta para a SHEIN e para a Temu em /reviews e nas
// subpáginas, e a Temu segue fora da vitrine da home; as versões dos outros idiomas ficam fora da vitrine em português
// e entram, cada uma, na home do idioma dela, nas abas das duas lojas.
const temuStores = [...linkStores, store('temu')];
const familyPt = { ...review(30, 'shein-ou-temu', ['shein', 'temu'], '2026-11-17'), translationKey: 'shein-ou-temu' };
const familyAbroad = (['en', 'ja'] as const).map((locale, index) => ({
  ...base,
  id: 9001 + index,
  slug: `shein-or-temu-${locale}`,
  locale,
  translationKey: 'shein-ou-temu',
  affiliate: ['shein', 'temu'],
  coupon: undefined,
  cta: undefined,
  draft: false,
  hideFromListings: false,
  hideFromPortugueseListings: true,
  publishedAtISO: '2099-01-01',
}));
const withFamily = [...withLinkOnly, familyPt, ...familyAbroad];
for (const version of familyAbroad) assert.equal(isListedInPortuguese(version), false, `${version.locale}: fora da vitrine em português`);
const familyHub = getReviewsHubContent(withFamily, temuStores);
assert.equal(familyHub.articles.find(({ slug }) => slug === 'shein-ou-temu')?.store, 'SHEIN e Temu');
assert.ok(!familyHub.articles.some(({ slug }) => slug.startsWith('shein-or-temu-')), 'as versões de outros idiomas ficam fora de /reviews');
assert.equal(familyHub.stores.find(({ slug }) => slug === 'shein')?.total, 4, 'a bolinha da SHEIN conta só a versão em português');
assert.equal(getStoreArticlesPage(withFamily, 'shein', temuStores)?.articles.length, 4, 'a subpágina da SHEIN com o artigo');
assert.ok(!familyHub.stores.some(({ slug }) => slug === 'temu'), 'a Temu com 1 artigo: sem bolinha ainda');
assert.equal(getStoreArticlesPage(withFamily, 'temu', temuStores), null, 'nem subpágina');
const withTemu = [...withFamily, review(31, 'temu-1', 'temu', '2026-10-07'), review(32, 'temu-2', 'temu', '2026-10-08')];
assert.equal(getReviewsHubContent(withTemu, temuStores).stores.find(({ slug }) => slug === 'temu')?.total, 3, 'com 3, a bolinha da Temu conta o artigo');
assert.deepEqual(
  getStoreArticlesPage(withTemu, 'temu', temuStores)?.articles.map(({ slug }) => slug),
  ['shein-ou-temu', 'temu-2', 'temu-1'],
  'e a subpágina da Temu leva só a versão em português'
);
assert.equal(store('temu').hideFromPortugueseHome, true, 'a Temu fica fora da vitrine da home em PT');
assert.ok(!getHomeVitrineStores(temuStores).some(({ slug }) => slug === 'temu'));
const familyTabs = getHomeStoreTabs(withFamily, temuStores, Date.parse('2026-11-17T12:00:00-03:00'));
assert.ok(!familyTabs.some(({ slug }) => slug === 'temu'), 'a Temu não ganha aba na home em PT');
assert.deepEqual(
  familyTabs.find(({ slug }) => slug === 'shein')?.articles.map(({ slug }) => slug).filter((slug) => slug.includes('temu')),
  ['shein-ou-temu'],
  'a aba da SHEIN leva só a versão em português'
);
if (sheinActive && temuActive) {
  // O cartão leva as duas lojas na frase do idioma dele, nunca o "A e B" do português.
  const pairLabel = { en: `${store('shein').brand} and ${store('temu').brand}`, ja: `${store('shein').brand} と ${store('temu').brand}` };
  assert.deepEqual(
    getRelatedShelfCards([familyAbroad[0]], 'en').map(({ store: label }) => label),
    [pairLabel.en],
    'fora do PT, o cartão de relacionados com as lojas no idioma'
  );
  for (const version of familyAbroad) {
    const localeTabs = getLocaleHomeStoreTabs(version.locale, [...publishedReviews, ...familyAbroad]);
    const href = `/${version.locale}/reviews/${version.slug}`;
    const holding = localeTabs.filter(({ articles }) => articles.some((article) => article.href === href)).map(({ slug }) => slug);
    assert.deepEqual([...holding].sort(), ['shein', 'temu'], `${version.locale}: o artigo nas abas da SHEIN e da Temu, e só nelas`);
    assert.ok(
      !localeTabs.some(({ articles }) => articles.some((article) => article.slug.startsWith('shein-or-temu-') && article.href !== href)),
      `${version.locale}: a versão de outro idioma fica fora`
    );
    const [newest] = getLocaleHomeLatest(version.locale, [...publishedReviews, ...familyAbroad]);
    assert.equal(newest.href, href, `${version.locale}: o artigo no "Acabou de sair" do idioma`);
    assert.equal(newest.store, pairLabel[version.locale], `${version.locale}: as duas lojas no cartão, na frase do idioma`);
  }
}

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
// O mapa do template sai dos blocos: com a Shopee nele, o link, a foto e a peça dela seguem com o link.
const linkStoresMap = Object.fromEntries(linkBlocks.map(({ slug, brand, code }) => [slug, { brand, code }]));
assert.deepEqual(linkStoresMap.shopee, { brand: 'Shopee', code: undefined });
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
  ['afiliado sem página', 'shopee', linkStoresMap],
  ['uma loja', undefined, undefined],
] as const) {
  assert.deepEqual(labels(withoutPausedStoreLinks(linksOf(storeSlug), multiStores)), ['Loja', 'Cupons', 'Fonte'], `${name}: todos os links`);
  assert.equal(withoutPausedHref(photo(storeSlug), multiStores).href, 'https://loja.example/a', `${name}: a foto com link`);
  const html = stylingHtml(storeSlug, multiStores);
  for (const path of ['c', 's']) assert.ok(html.includes(`https://loja.example/${path}`), `${name}: link da peça ${path}`);
}

console.log('✅ várias lojas nas listagens: home, /reviews, subpáginas, Outros, relacionados, data comercial, vídeo e snippet; regras do affiliate e do store, em português, nos outros idiomas e em família; aviso de código antigo; loja de link e afiliado sem página na lista; blocos e linhas de código do artigo nos 10 idiomas; a família nas listagens de cada idioma; código no texto; links, fotos e peças de loja pausada sem link');
