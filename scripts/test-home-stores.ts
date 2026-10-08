import assert from 'node:assert/strict';

import sitemap from '@/app/sitemap';
import { COUPONS, getActiveCoupons, type Coupon } from '@/lib/couponsData';
import { publishedReviews, reviews } from '@/lib/data';
import {
  formatFollowerCount,
  getCeciliaSocialStats,
  getHomeLatest,
  getHomeStoreTabs,
  getStoreArticlePageSlugs,
  getStoreArticlesPage,
  type StoreReview,
} from '@/lib/homeStores';
import { getListedPortugueseReviews, sortReviewsByPublishedAt } from '@/lib/reviewDiscovery';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';
import {
  CECILIA_TAB_ID,
  getDefaultTabId,
  getHomeStoreSelectParameters,
  getTabAnchor,
  getTabOrder,
  parseTabHash,
} from '@/lib/homeStoreTabs';

function store(slug: string) {
  const found = COUPONS.find((coupon) => coupon.slug === slug);
  assert.ok(found, `loja ${slug} existe em couponsData.ts`);
  return found;
}

type ReviewFixture = StoreReview & { locale?: string };

function review(id: number, slug: string, affiliate: string | undefined, publishedAtISO: string): ReviewFixture {
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

// Magalu com 4 artigos listados (fora o rascunho, o em inglês e o escondido) e 1 da DAMIE.
const fixtureReviews: ReviewFixture[] = [
  review(1, 'antigo', 'magalu', '2026-09-01'),
  review(2, 'novo', 'magalu', '2026-10-01'),
  review(3, 'meio', 'magalu', '2026-09-15'),
  review(4, 'mais-um', 'magalu', '2026-09-10'),
  review(5, 'da-damie', 'damie', '2026-10-02'),
  { ...review(6, 'rascunho', 'magalu', '2026-10-05'), draft: true },
  { ...review(7, 'em-ingles', 'magalu', '2026-10-06'), locale: 'en' },
  { ...review(8, 'escondido', 'magalu', '2026-10-07'), hideFromPortugueseListings: true },
  review(9, 'sem-loja', undefined, '2026-10-03'),
];

// Abas: o hash é a única fonte da aba aberta, e o id da bolinha é o próprio hash.
const slugs = ['damie', 'yesstyle'];
assert.equal(getTabAnchor('yesstyle'), 'loja-yesstyle');
assert.equal(getTabAnchor(CECILIA_TAB_ID), 'cecilia');
assert.equal(parseTabHash('#loja-yesstyle', slugs), 'yesstyle');
assert.equal(parseTabHash('#cecilia', slugs), CECILIA_TAB_ID);
assert.equal(parseTabHash('#loja-kopenhagen', slugs), null, 'loja fora da vitrine');
assert.equal(parseTabHash('#yesstyle', slugs), null, 'sem o prefixo loja-');
assert.equal(parseTabHash('#loja-', slugs), null);
assert.equal(parseTabHash('', slugs), null);
assert.equal(getDefaultTabId(['dolce-gusto', 'damie']), 'damie');
assert.equal(getDefaultTabId(['dolce-gusto']), 'dolce-gusto', 'sem a DAMIE, a primeira loja');
assert.equal(getDefaultTabId([]), CECILIA_TAB_ID);
assert.deepEqual(getTabOrder(slugs), ['cecilia', 'damie', 'yesstyle'], 'a Cecília vem primeiro');
assert.deepEqual(getHomeStoreSelectParameters('yesstyle'), { store: 'yesstyle', placement: 'home_store_tabs' });
assert.deepEqual(getHomeStoreSelectParameters(CECILIA_TAB_ID), { store: 'cecilia', placement: 'home_store_tabs' });

// Abas com fixture: ordem, limite de 3, total, "do Magalu" e o link para todos os artigos.
const [magaluTab] = getHomeStoreTabs(fixtureReviews, [store('magalu')]);
assert.deepEqual(magaluTab.articles.map(({ slug }) => slug), ['novo', 'meio', 'mais-um']);
assert.equal(magaluTab.total, 4);
assert.equal(magaluTab.listTitle, 'Artigos do Magalu');
assert.equal(magaluTab.storeLinkLabel, 'Ir para o Magalu');
assert.deepEqual(magaluTab.allArticles, { href: '/reviews/loja/magalu', label: 'Ver os 4 artigos do Magalu' });
assert.deepEqual(magaluTab.articles[0], {
  slug: 'novo',
  href: '/reviews/novo',
  title: 'Título novo',
  type: 'Guia',
  image: resolveMediaUrl('/images/reviews/teste/novo.webp'),
});

// Loja sem artigo (a SHEIN hoje): sem story, sem lista e com o aviso no lugar.
const [sheinTab] = getHomeStoreTabs(fixtureReviews, [store('shein')]);
assert.equal(sheinTab.total, 0);
assert.deepEqual(sheinTab.articles, []);
assert.equal(sheinTab.allArticles, undefined);
assert.equal(sheinTab.emptyText, 'Ainda não há artigo da SHEIN por aqui. As campanhas vigentes ficam na página da loja.');

// Loja de link sem código de indicação: sem código e sem rótulo de cupom.
const semCodigo = { ...store('shein'), referral: undefined } as Coupon;
const [semCodigoTab] = getHomeStoreTabs([], [semCodigo]);
assert.equal(semCodigoTab.code, undefined);
assert.equal(semCodigoTab.label, 'SHEIN');

// Abas com os dados de hoje.
const tabs = getHomeStoreTabs(publishedReviews);
const bySlug = new Map(tabs.map((tab) => [tab.slug, tab]));
const tab = (slug: string) => {
  const found = bySlug.get(slug);
  assert.ok(found, `aba ${slug}`);
  return found;
};
assert.deepEqual(
  tabs.map(({ slug }) => slug),
  getActiveCoupons().map(({ slug }) => slug),
  'uma aba por loja ativa, na ordem de couponsData.ts'
);
assert.ok(!bySlug.has('cecilia'), 'a aba da Cecília é o painel dela, não uma loja');
assert.ok(!bySlug.has('kopenhagen'), 'loja pausada fica de fora');

assert.equal(tab('damie').label, 'Cupom DAMIE');
assert.equal(tab('damie').code, 'CECILIA12');
// O menu já linka o subdomínio da DAMIE; a vitrine traz tráfego para /cupons/damie (Bruno, 08/10).
assert.equal(tab('damie').storePageUrl, '/cupons/damie');
assert.equal(tab('yesstyle').label, 'Código de recompensa YesStyle');
assert.ok(
  ![tab('yesstyle').label, tab('yesstyle').hints.copy, tab('yesstyle').hints.copied].some((text) => /cupom/i.test(text)),
  'o CECILIA010 nunca é chamado de cupom'
);
assert.equal(tab('shein').label, 'Código de indicação SHEIN');
assert.equal(tab('shein').code, '4CW5Y');
assert.equal(tab('shein').hints.copy, 'Copie e pesquise no aplicativo SHEIN.');

// Desconto e descrição saem dos dados da loja, sem texto próprio da vitrine.
for (const current of tabs) {
  assert.equal(current.discount, store(current.slug).discount, `${current.slug}: desconto dos dados`);
  assert.equal(current.description, store(current.slug).shortDescription, `${current.slug}: descrição dos dados`);
}
assert.match(tab('nestle-nutre').description, /fórmulas infantis de 0 a 12 meses/);
assert.equal(tab('letseatit').storeUrl, store('letseatit').offerUrl, 'o link da loja leva os UTMs dos dados');

const listed = sortReviewsByPublishedAt(getListedPortugueseReviews(publishedReviews));
for (const current of tabs) {
  const expected = listed.filter((item) => item.affiliate === current.slug);
  assert.equal(current.total, expected.length, `${current.slug}: total`);
  assert.deepEqual(
    current.articles.map(({ slug }) => slug),
    expected.slice(0, 3).map(({ slug }) => slug),
    `${current.slug}: os 3 mais novos`
  );
  for (const article of current.articles) {
    assert.equal(article.href, `/reviews/${article.slug}`);
    assert.ok(!Object.keys(article).some((key) => /code|coupon/i.test(key)), `${article.slug}: artigo sem código`);
  }
  assert.equal(current.allArticles === undefined, expected.length <= 3, `${current.slug}: "Ver os N artigos" só acima de 3`);
  assert.equal(current.storePageUrl, `/cupons/${current.slug}`, `${current.slug}: página da loja em /cupons`);
}

// Subpágina: dados e lojas com página.
const damiePage = getStoreArticlesPage(publishedReviews, 'damie');
assert.ok(damiePage);
assert.equal(damiePage.title, 'Artigos da DAMIE');
assert.equal(damiePage.metaTitle, 'DAMIE: guias e análises - Em Casa com Cecília');
assert.equal(damiePage.codeLinkLabel, 'Ver o código da DAMIE');
assert.equal(damiePage.storePageUrl, '/cupons/damie');
assert.equal(damiePage.articles.length, tab('damie').total);
assert.equal(getStoreArticlesPage(publishedReviews, 'loja-que-nao-existe'), null);
assert.equal(getStoreArticlesPage(publishedReviews, 'kopenhagen'), null, 'pausada');
assert.equal(getStoreArticlesPage(fixtureReviews, 'shein', [store('shein')]), null, 'sem artigo, sem página');

const magaluPage = getStoreArticlesPage(fixtureReviews, 'magalu', [store('magalu')]);
assert.ok(magaluPage);
assert.equal(magaluPage.countLabel, '4 artigos da Cecília sobre o Magalu');
assert.equal(magaluPage.description, '4 artigos da Cecília sobre o Magalu: guias e análises, do mais novo para o mais antigo.');
assert.equal(magaluPage.storePageUrl, '/cupons/magalu');
// Até 3 artigos a vitrine já mostra todos: sem subpágina. Com 4 (o Magalu acima), a página existe.
const tresArtigos = [1, 2, 3].map((id) => review(id, `artigo-${id}`, 'magalu', `2026-10-0${id}`));
assert.equal(getStoreArticlesPage(tresArtigos, 'magalu', [store('magalu')]), null, 'com 3 artigos, sem subpágina');
assert.deepEqual(getStoreArticlePageSlugs(tresArtigos, [store('magalu')]), []);

assert.deepEqual(
  getStoreArticlePageSlugs(fixtureReviews, [store('damie'), store('magalu'), store('shein')]),
  ['magalu'],
  'a DAMIE do fixture tem 1 artigo'
);
const pageSlugs = getStoreArticlePageSlugs(publishedReviews);
assert.ok(pageSlugs.includes('damie'), 'a DAMIE tem subpágina');
assert.deepEqual(
  pageSlugs,
  getActiveCoupons()
    .filter((coupon) => listed.filter((item) => item.affiliate === coupon.slug).length > 3)
    .map(({ slug }) => slug),
  'subpágina para toda loja ativa com mais de 3 artigos'
);
assert.deepEqual(
  tabs.filter(({ allArticles }) => allArticles).map(({ slug }) => slug),
  pageSlugs,
  'o "Ver os N artigos" da vitrine e a subpágina seguem a mesma regra'
);

// "Acabou de sair": as 5 listadas mais novas, com a loja de cada uma e sem código.
const latestFixture = getHomeLatest(fixtureReviews, [store('magalu'), store('damie')]);
assert.deepEqual(latestFixture.map(({ slug }) => slug), ['sem-loja', 'da-damie', 'novo', 'meio', 'mais-um']);
assert.equal(latestFixture[0].store, undefined);
assert.equal(latestFixture[1].store, 'DAMIE');
assert.equal(latestFixture[2].dateLabel, '01/10');
assert.equal(latestFixture[2].href, '/reviews/novo');
assert.equal(latestFixture[2].image, resolveMediaUrl('/images/reviews/teste/novo.webp'));

const latest = getHomeLatest(publishedReviews);
assert.deepEqual(latest.map(({ slug }) => slug), listed.slice(0, 5).map(({ slug }) => slug));
for (const item of latest) {
  assert.match(item.dateLabel, /^\d{2}\/\d{2}$/);
  assert.ok(!Object.keys(item).some((key) => /code|coupon/i.test(key)), `${item.slug}: sem código`);
}

// Com menos de 5 artigos a seção mostra os que houver; artigo sem imagem chega sem imagem.
const semImagem = getHomeLatest([{ ...review(1, 'sem-imagem', 'magalu', '2026-10-01'), image: undefined }], [store('magalu')]);
assert.equal(semImagem.length, 1);
assert.equal(semImagem[0].image, undefined);
assert.equal(semImagem[0].store, 'Magalu');

// Números das redes no painel da Cecília: a mesma conta do Hero de hoje.
assert.equal(formatFollowerCount('443.5K'), '444k');
assert.equal(formatFollowerCount('85.5K'), '86k');
assert.equal(formatFollowerCount(undefined), undefined);
assert.equal(formatFollowerCount('sem número'), undefined);
assert.deepEqual(getCeciliaSocialStats().map(({ name }) => name), ['Instagram', 'TikTok', 'YouTube', 'Facebook']);
assert.ok(getCeciliaSocialStats().every(({ followers }) => followers && /^\d+k$/.test(followers)));

// /reviews/loja sozinho cai em /reviews/[slug]: nenhuma review, nem rascunho, pode ter esse slug.
assert.ok(!reviews.some(({ slug }) => slug === 'loja'), 'nenhuma review com o slug loja');

// Subpáginas no sitemap: exatamente as lojas com subpágina, nenhuma outra URL em /reviews/loja/.
const storeArticleUrls = sitemap()
  .map(({ url }) => url)
  .filter((url) => url.startsWith('https://emcasacomcecilia.com/reviews/loja/'));
assert.deepEqual(
  storeArticleUrls,
  pageSlugs.map((slug) => `https://emcasacomcecilia.com/reviews/loja/${slug}`),
  'sitemap com as subpáginas e só elas'
);

console.log(`✅ homeStores: abas, ${tabs.length} lojas, subpáginas, "Acabou de sair" e redes passaram.`);
