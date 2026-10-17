import assert from 'node:assert/strict';

import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { imageConfigDefault, type ImageConfigComplete, type RemotePattern } from 'next/dist/shared/lib/image-config';
import { ImageConfigContext } from 'next/dist/shared/lib/image-config-context.shared-runtime';

import sitemap from '@/app/sitemap';
import { CECILIA_PHOTO_COPY_PT } from '@/components/sections/CeciliaProfile';
import { HomeCeciliaPanel } from '@/components/sections/HomeCeciliaPanel';
import { HomeLatest } from '@/components/sections/HomeLatest';
import { HomeStoreStrip } from '@/components/sections/HomeStoreStrip';
import { getLocaleHomeCopy } from '@/components/sections/localeHomeCopy';
import { cardImageLook } from '@/lib/cardImage';
import { COUPONS, getActiveCoupons, type Coupon } from '@/lib/couponsData';
import { publishedReviews, reviews } from '@/lib/data';
import {
  formatFollowerCount,
  getCeciliaSocialStats,
  getHomeLatest,
  getHomeStoreTabs,
  getStoreArticlePageSlugs,
  getStoreArticlesPage,
  sortStoresByNewestArticle,
  type HomeLatestArticle,
  type StoreReview,
} from '@/lib/homeStores';
import { getListedPortugueseReviews, sortReviewsByPublishedAt } from '@/lib/reviewDiscovery';
import { IMAGE_REMOTE_PATTERNS } from '@/lib/imageHosts.mjs';
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
assert.equal(parseTabHash('loja-yesstyle', slugs), 'yesstyle', 'hash sem o #');
const todas = [...slugs, 'dolce-gusto'];
for (const id of getTabOrder(todas)) {
  assert.equal(parseTabHash(`#${getTabAnchor(id)}`, todas), id, `${id}: a âncora volta para a mesma aba`);
}
assert.equal(parseTabHash('#loja-kopenhagen', slugs), null, 'loja fora da vitrine');
assert.equal(parseTabHash('#yesstyle', slugs), null, 'sem o prefixo loja-');
assert.equal(parseTabHash('#loja-', slugs), null);
assert.equal(parseTabHash('', slugs), null);
assert.equal(getDefaultTabId(['dolce-gusto', 'damie']), 'dolce-gusto', 'a primeira loja da faixa, sem preferência pela DAMIE');
assert.equal(getDefaultTabId([]), CECILIA_TAB_ID);
assert.deepEqual(getTabOrder(slugs), ['cecilia', 'damie', 'yesstyle'], 'a Cecília vem primeiro');
assert.deepEqual(getTabOrder([]), ['cecilia'], 'sem loja, só a Cecília');
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
  imageFit: 'cover',
  imagePosition: undefined,
});

// Ordem das lojas: o artigo PT listado mais novo primeiro; empate de data vai pelo id maior, como a lista de
// artigos (a YesStyle passa a Magalu mesmo vindo depois); as sem artigo vão para o fim, na ordem recebida.
// Artigo de outro idioma, rascunho e escondido da listagem não contam.
const orderFixture = [
  review(21, 'a-damie', 'damie', '2026-10-01'),
  review(22, 'a-magalu', 'magalu', '2026-10-05'),
  review(23, 'a-yesstyle', 'yesstyle', '2026-10-05'),
  review(24, 'a-dolce', 'dolce-gusto', '2026-09-01'),
  { ...review(25, 'dolce-en', 'dolce-gusto', '2026-10-20'), locale: 'en' },
  { ...review(26, 'shein-escondido', 'shein', '2026-10-21'), hideFromPortugueseListings: true },
  { ...review(27, 'shein-rascunho', 'shein', '2026-10-22'), draft: true },
];
const orderStores = ['shein', 'damie', 'magalu', 'yesstyle', 'dolce-gusto', 'insider'].map(store);
assert.deepEqual(
  sortStoresByNewestArticle(orderStores, orderFixture).map(({ slug }) => slug),
  ['yesstyle', 'magalu', 'damie', 'dolce-gusto', 'shein', 'insider'],
  'mais novo primeiro; empate pelo id maior; sem artigo (ou só de fora da listagem) no fim, na ordem recebida'
);
assert.deepEqual(
  getHomeStoreTabs(orderFixture, orderStores).map(({ slug }) => slug),
  ['yesstyle', 'magalu', 'damie', 'dolce-gusto', 'shein', 'insider'],
  'as abas saem na ordem do artigo mais novo'
);
assert.deepEqual(sortStoresByNewestArticle(orderStores, []).map(({ slug }) => slug), orderStores.map(({ slug }) => slug));

// Loja sem artigo (a SHEIN hoje): sem story, sem lista e com o aviso no lugar.
const [sheinTab] = getHomeStoreTabs(fixtureReviews, [store('shein')]);
assert.equal(sheinTab.total, 0);
assert.deepEqual(sheinTab.articles, []);
assert.equal(sheinTab.allArticles, undefined);
assert.equal(sheinTab.emptyText, 'Ainda não há artigo da SHEIN por aqui. As campanhas vigentes ficam na página da loja.');
assert.equal(
  getHomeStoreTabs([], [store('magalu')])[0].emptyText,
  'Ainda não há artigo do Magalu por aqui. As campanhas vigentes ficam na página da loja.',
  'loja no masculino'
);

// Loja com um artigo só: a lista mostra o artigo e não há "Ver os N artigos".
const [damieTab] = getHomeStoreTabs(fixtureReviews, [store('damie')]);
assert.equal(damieTab.total, 1);
assert.deepEqual(damieTab.articles.map(({ slug }) => slug), ['da-damie']);
assert.equal(damieTab.allArticles, undefined);

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
const activeStores = getActiveCoupons();
assert.deepEqual(
  tabs.map(({ slug }) => slug),
  sortStoresByNewestArticle(activeStores, publishedReviews).map(({ slug }) => slug),
  'uma aba por loja ativa, pelo artigo mais novo'
);
assert.deepEqual(
  [...tabs.map(({ slug }) => slug)].sort(),
  activeStores.map(({ slug }) => slug).sort(),
  'a ordem não perde nem repete loja'
);
const newestListed = sortReviewsByPublishedAt(getListedPortugueseReviews(publishedReviews)).find(({ affiliate }) =>
  activeStores.some(({ slug }) => slug === affiliate)
);
assert.equal(tabs[0].slug, newestListed?.affiliate, 'a primeira aba é a loja do artigo PT mais novo');
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
  assert.equal(current.allArticles === undefined, expected.length < 3, `${current.slug}: "Ver os N artigos" a partir de 3`);
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
// A partir de 3 artigos a loja tem subpágina; com 2, não.
const tresArtigos = [1, 2, 3].map((id) => review(id, `artigo-${id}`, 'magalu', `2026-10-0${id}`));
assert.equal(getStoreArticlesPage(tresArtigos, 'magalu', [store('magalu')])?.countLabel, '3 artigos da Cecília sobre o Magalu', 'com 3 artigos, com subpágina');
assert.deepEqual(getStoreArticlePageSlugs(tresArtigos, [store('magalu')]), ['magalu']);
assert.deepEqual(
  getHomeStoreTabs(tresArtigos, [store('magalu')])[0].allArticles,
  { href: '/reviews/loja/magalu', label: 'Ver os 3 artigos do Magalu' },
  'com 3 artigos, a vitrine leva à subpágina'
);
const doisArtigos = tresArtigos.slice(0, 2);
assert.equal(getStoreArticlesPage(doisArtigos, 'magalu', [store('magalu')]), null, 'com 2 artigos, sem subpágina');
assert.deepEqual(getStoreArticlePageSlugs(doisArtigos, [store('magalu')]), []);
assert.equal(getHomeStoreTabs(doisArtigos, [store('magalu')])[0].allArticles, undefined, 'com 2 artigos, sem o Ver os N artigos');

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
    .filter((coupon) => listed.filter((item) => item.affiliate === coupon.slug).length >= 3)
    .map(({ slug }) => slug),
  'subpágina para toda loja ativa com 3 artigos ou mais'
);
assert.deepEqual(
  tabs.filter(({ allArticles }) => allArticles).map(({ slug }) => slug),
  sortStoresByNewestArticle(pageSlugs.map((slug) => store(slug)), publishedReviews).map(({ slug }) => slug),
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

// A capa dos cartões segue o JSON do artigo (src/lib/cardImage.ts), igual na vitrine e no "Acabou de sair":
// imageFit explícito vale, foto de produto com nota fica inteira, e o imagePosition vem com o artigo.
const capasFixture: ReviewFixture[] = [
  { ...review(11, 'capa-inteira', 'magalu', '2026-10-12'), imageFit: 'contain' },
  { ...review(12, 'capa-com-nota', 'magalu', '2026-10-11'), rating: 5 },
  { ...review(13, 'capa-no-topo', 'magalu', '2026-10-10'), imagePosition: 'top' },
];
const capaOf = ({ slug, imageFit, imagePosition }: Pick<HomeLatestArticle, 'slug' | 'imageFit' | 'imagePosition'>) => ({
  slug,
  imageFit,
  imagePosition,
});
const capasLatest = getHomeLatest(capasFixture, [store('magalu')]);
assert.deepEqual(capasLatest.map(capaOf), [
  { slug: 'capa-inteira', imageFit: 'contain', imagePosition: undefined },
  { slug: 'capa-com-nota', imageFit: 'contain', imagePosition: undefined },
  { slug: 'capa-no-topo', imageFit: 'cover', imagePosition: 'top' },
]);
const [capasTab] = getHomeStoreTabs(capasFixture, [store('magalu')]);
assert.deepEqual(capasTab.articles.map(capaOf), capasLatest.map(capaOf), 'a vitrine dá a mesma capa que o "Acabou de sair"');

// O contain fica inteiro sobre fundo branco e dispensa o imagePosition; o cover recorta pelo imagePosition.
assert.deepEqual(cardImageLook('contain', 'top', 'p-3'), { className: 'bg-white object-contain p-3' });
assert.deepEqual(cardImageLook('cover', 'top', 'p-3'), { className: 'object-cover', style: { objectPosition: '50% 10%' } });
assert.equal(cardImageLook('cover', undefined, 'p-3').className, 'object-cover');
assert.equal(cardImageLook('cover', undefined, 'p-3').style, undefined);

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

// Números das redes no painel da Cecília: a mesma conta do antigo Hero.
assert.equal(formatFollowerCount('443.5K'), '444k');
assert.equal(formatFollowerCount('85.5K'), '86k');
assert.equal(formatFollowerCount(undefined), undefined);
assert.equal(formatFollowerCount('sem número'), undefined);
assert.deepEqual(getCeciliaSocialStats().map(({ name }) => name), ['Instagram', 'TikTok', 'YouTube', 'Facebook']);
assert.ok(getCeciliaSocialStats().every(({ followers }) => followers && /^\d+k$/.test(followers)));

// O painel da Cecília na home em português reaproveita o cartão de foto da home de cada idioma: nada do
// inglês vaza para ele, e a foto segue lazy, sem fetchpriority (no PT o LCP é a imagem do story).
// Fora do Next, o next/image não conhece os hosts do next.config.mjs, e a foto da Cecília vem do CDN.
const imageConfig: ImageConfigComplete = {
  ...imageConfigDefault,
  remotePatterns: IMAGE_REMOTE_PATTERNS as RemotePattern[],
};
const decodeEntities = (text: string) =>
  text.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
// A faixa de bolinhas: uma linha que rola (sem quebrar linha no computador), as abas na ordem das abas e as duas
// setas fora do tablist.
const stripHtml = renderToStaticMarkup(
  createElement(
    ImageConfigContext.Provider,
    { value: imageConfig },
    createElement(HomeStoreStrip, { tabs, ceciliaPhoto: '/images/photos/BRU-1.jpg', selected: CECILIA_TAB_ID, onSelect: () => {} })
  )
);
const tablistAt = stripHtml.indexOf('role="tablist"');
const tablistEnd = stripHtml.indexOf('</div>', tablistAt);
const tablistHtml = stripHtml.slice(tablistAt, tablistEnd);
assert.ok(!stripHtml.includes('md:flex-wrap') && stripHtml.includes('overflow-x-auto'), 'a faixa não quebra linha: rola');
assert.deepEqual(
  [...tablistHtml.matchAll(/<button[^>]*\sid="([^"]+)"/g)].map(([, id]) => id),
  ['cecilia', ...tabs.map(({ slug }) => `loja-${slug}`)],
  'bolinhas na ordem das abas, a Cecília primeiro'
);
for (const label of ['Ver lojas anteriores', 'Ver mais lojas']) {
  assert.ok(stripHtml.includes(`aria-label="${label}"`), `seta "${label}"`);
  assert.ok(!tablistHtml.includes(label), `seta "${label}" fora do tablist`);
}

const panelHtml = renderToStaticMarkup(
  createElement(ImageConfigContext.Provider, { value: imageConfig }, createElement(HomeCeciliaPanel))
);
const panelText = decodeEntities(panelHtml);
for (const [key, text] of Object.entries(CECILIA_PHOTO_COPY_PT)) {
  assert.ok(panelText.includes(text), `painel da Cecília sem o texto em português (${key}): ${text}`);
}
const englishCopy = getLocaleHomeCopy('en');
for (const text of [englishCopy.photoAlt, englishCopy.followers]) {
  assert.ok(!panelText.includes(text), `painel da Cecília com texto em inglês: ${text}`);
}
const panelPhoto = (panelHtml.match(/<img\b[^>]*>/g) ?? []).find((tag) => decodeEntities(tag).includes(CECILIA_PHOTO_COPY_PT.alt));
assert.ok(panelPhoto, 'painel da Cecília sem a foto');
assert.match(panelPhoto, /\sloading="lazy"/, 'foto do painel em português tem de ser lazy');
assert.doesNotMatch(panelPhoto, /fetchpriority/i, 'foto do painel em português sem fetchpriority');

// O "Acabou de sair" desenha a capa pela mesma regra: inteira sobre fundo branco no contain, cortada e
// com o recorte do imagePosition no cover. A lista do celular não leva foto, então só os cartões têm <img>.
const latestHtml = renderToStaticMarkup(
  createElement(ImageConfigContext.Provider, { value: imageConfig }, createElement(HomeLatest, { articles: capasLatest }))
);
const latestImage = (slug: string) => {
  const tag = (latestHtml.match(/<img\b[^>]*>/g) ?? []).find((candidate) => candidate.includes(slug));
  assert.ok(tag, `"Acabou de sair" sem a foto de ${slug}`);
  return tag;
};
for (const slug of ['capa-inteira', 'capa-com-nota']) {
  assert.match(latestImage(slug), /class="[^"]*\bbg-white object-contain p-3\b/, `${slug}: inteira sobre fundo branco`);
  assert.doesNotMatch(latestImage(slug), /object-position/, `${slug}: o contain não leva recorte`);
}
assert.match(latestImage('capa-no-topo'), /class="[^"]*\bobject-cover\b/, 'sem imageFit nem nota, a capa cobre');
assert.match(latestImage('capa-no-topo'), /style="[^"]*object-position:50% 10%/, 'o imagePosition recorta o cover');

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
