import assert from 'node:assert/strict';

import { COUPONS } from '@/lib/couponsData';
import { publishedReviews } from '@/lib/data';
import { getStoreArticlePageSlugs, getStoreArticlesPage } from '@/lib/homeStores';
import { SITE_SOCIAL_IMAGE, absoluteMediaUrl } from '@/lib/pageSeo';
import {
  REVIEW_CATEGORIES,
  getListedPortugueseReviews,
  sortReviewsByPublishedAt,
  type ReviewCategory,
} from '@/lib/reviewDiscovery';
import { getReviewsHubContent, getStoreShelfContent, type HubReview } from '@/lib/reviewsHub';
import {
  GRID_PAGE_SIZE,
  LIST_PAGE_SIZE,
  countLabel,
  emptySearchMessage,
  filterShelf,
  foldSearchText,
  getEmptySearchAction,
  getReviewsRouteClickParameters,
  getShelfControlParameters,
  getShelfSearchParameters,
  isSearching,
  pageSizeOf,
  parseShelfQuery,
  resultsLabel,
  reviewsSearchHref,
  searchWords,
  shelfPlacement,
  shelfSearch,
  shouldTrackSearch,
  siteSearchHref,
  sortShelf,
  visibleAfterViewChange,
  withShelfQuery,
  type ShelfArticle,
  type ShelfQuery,
} from '@/lib/reviewsShelf';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

// A estante de /reviews e das subpáginas de loja: as regras de reviewsShelf.ts, os dados de
// reviewsHub.ts e (nas tasks seguintes) os componentes, renderizados como o servidor os entrega.

function store(slug: string) {
  const found = COUPONS.find((coupon) => coupon.slug === slug);
  assert.ok(found, `loja ${slug} existe em couponsData.ts`);
  return found;
}

type FixtureReview = HubReview & { locale?: string };

function review(id: number, slug: string, overrides: Partial<FixtureReview> = {}): FixtureReview {
  const publishedAtISO = overrides.publishedAtISO ?? '2026-10-01';
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
    ...overrides,
  };
}

// 9 artigos listados (fora o rascunho, o em inglês e o escondido); o Magalu tem 4 e ganha subpágina, a
// DAMIE tem 1. A capa mais nova é AVIF, que o cartão do X não mostra.
const fixture: FixtureReview[] = [
  review(1, 'poltrona-damie', {
    title: 'Poltrona reclinável DAMIE',
    affiliate: 'damie',
    publishedAtISO: '2026-10-09',
    isNew: true,
    category: 'produtos-experiencias',
    image: '/images/reviews/teste/poltrona.avif',
  }),
  review(2, 'agua', { title: 'Água com gás: vale a pena?', publishedAtISO: '2026-10-08', isNew: true, rating: 4 }),
  review(3, 'abacate', { title: 'abacate no café', publishedAtISO: '2026-09-01', tags: ['fruta'], imageFit: 'cover', rating: 5 }),
  review(4, 'dez-dicas', { title: '10 dicas de sono', publishedAtISO: '2026-09-01', image: undefined }),
  review(5, 'duas-dicas', { title: '2 dicas de café', publishedAtISO: '2026-08-01', category: 'cupons-como-usar' }),
  review(6, 'magalu-1', { affiliate: 'magalu', publishedAtISO: '2026-07-04', category: 'cupons-como-usar' }),
  review(7, 'magalu-2', { affiliate: 'magalu', publishedAtISO: '2026-07-03', category: 'confianca-reputacao' }),
  review(8, 'magalu-3', { affiliate: 'magalu', publishedAtISO: '2026-07-02', category: 'cupons-como-usar' }),
  review(9, 'magalu-4', { affiliate: 'magalu', publishedAtISO: '2026-07-01', category: 'cupons-como-usar' }),
  { ...review(10, 'rascunho', { isNew: true }), draft: true },
  { ...review(11, 'em-ingles', { isNew: true }), locale: 'en' },
  review(12, 'escondido', { hideFromPortugueseListings: true }),
];
const fixtureStores = [store('damie'), store('magalu')];
const hub = getReviewsHubContent(fixture, fixtureStores);
const slugs = (articles: readonly { slug: string }[]) => articles.map(({ slug }) => slug);
const article = (slug: string): ShelfArticle => {
  const found = hub.articles.find((item) => item.slug === slug);
  assert.ok(found, `artigo ${slug} na estante`);
  return found;
};

// Artigos: só os listados em português, do mais novo, com o maior id no empate de data.
assert.deepEqual(slugs(hub.articles), [
  'poltrona-damie',
  'agua',
  'dez-dicas',
  'abacate',
  'duas-dicas',
  'magalu-1',
  'magalu-2',
  'magalu-3',
  'magalu-4',
]);
assert.deepEqual(slugs(hub.newArticles), ['poltrona-damie', 'agua'], 'Novidades: só os listados com isNew');
assert.equal(
  hub.intro,
  '9 guias e análises. Guias práticos, experiências reais quando existem e análises baseadas em dados e fontes declaradas.'
);
assert.equal(getReviewsHubContent(fixture.map((item) => ({ ...item, isNew: false })), fixtureStores).newArticles.length, 0);

const poltrona = article('poltrona-damie');
assert.equal(poltrona.href, '/reviews/poltrona-damie');
assert.equal(poltrona.dayMonth, '09/10');
assert.equal(poltrona.fullDate, '09/10/2026');
assert.equal(poltrona.store, 'DAMIE');
assert.equal(poltrona.image, resolveMediaUrl('/images/reviews/teste/poltrona.avif'));
assert.equal(poltrona.imageFit, 'cover');
assert.equal(poltrona.isNew, true);
for (const text of ['poltrona reclinavel damie', 'descricao poltrona-damie', 'produtos & experiencias']) {
  assert.ok(poltrona.searchText.includes(text), `texto de busca sem "${text}": ${poltrona.searchText}`);
}
assert.equal(article('agua').store, undefined, 'sem loja');
assert.equal(article('agua').imageFit, 'contain', 'foto de produto com nota não é cortada');
assert.equal(article('abacate').imageFit, 'cover', 'imageFit explícito vale');
assert.ok(article('abacate').searchText.includes('fruta'), 'tags entram na busca');
assert.equal(article('dez-dicas').image, undefined);

// Bolinhas: só lojas com subpágina (mais de 3 artigos), na ordem das lojas.
assert.deepEqual(hub.stores, [
  {
    slug: 'magalu',
    brand: 'Magalu',
    logo: store('magalu').brandLogo ? resolveMediaUrl(store('magalu').brandLogo) : undefined,
    initials: store('magalu').brandIcon,
    total: 4,
    href: '/reviews/loja/magalu',
    countLabel: '4 artigos',
  },
]);
assert.deepEqual(
  hub.categories.map(({ value }) => value),
  REVIEW_CATEGORIES.map(({ value }) => value),
  'as quatro categorias, na ordem de REVIEW_CATEGORIES'
);

// Imagem de compartilhamento: a capa mais nova num formato que o X mostra; sem nenhuma, o logo do site.
assert.deepEqual(hub.socialImage, {
  url: absoluteMediaUrl('/images/reviews/teste/agua.webp'),
  alt: 'Água com gás: vale a pena?',
});
assert.deepEqual(
  getReviewsHubContent(fixture.map((item) => ({ ...item, image: undefined })), fixtureStores).socialImage,
  SITE_SOCIAL_IMAGE
);

// Busca: sem acento nem maiúscula, todas as palavras, nome da loja e tags; caracteres especiais são texto.
const ALL = REVIEW_CATEGORIES.map(({ value }) => value);
const query = (overrides: Partial<ShelfQuery> = {}): ShelfQuery => ({ q: '', category: null, order: 'novos', ...overrides });
assert.equal(foldSearchText('  Poltrona   RECLINÁVEL\tDAMIE '), 'poltrona reclinavel damie');
assert.deepEqual(searchWords('   '), []);
assert.deepEqual(searchWords(' Pôltrona  damie '), ['poltrona', 'damie']);
assert.equal(isSearching(query({ q: '   ' })), false, 'só espaço não é busca');
assert.equal(isSearching(query({ q: 'a' })), true);
assert.deepEqual(slugs(filterShelf(hub.articles, query({ q: 'POLTRONA reclinavel' }))), ['poltrona-damie']);
assert.deepEqual(slugs(filterShelf(hub.articles, query({ q: 'damie' }))), ['poltrona-damie'], 'nome da loja');
assert.deepEqual(slugs(filterShelf(hub.articles, query({ q: 'fruta' }))), ['abacate'], 'tags');
assert.deepEqual(slugs(filterShelf(hub.articles, query({ q: 'poltrona agua' }))), [], 'todas as palavras');
assert.deepEqual(slugs(filterShelf(hub.articles, query({ q: '   ' }))), slugs(hub.articles));
assert.deepEqual(slugs(filterShelf(hub.articles, query({ q: 'c++ 50% "x" <b>' }))), [], 'caracteres especiais são texto');
assert.deepEqual(slugs(filterShelf(hub.articles, query({ category: 'cupons-como-usar' }))), [
  'duas-dicas',
  'magalu-1',
  'magalu-3',
  'magalu-4',
]);
assert.deepEqual(slugs(filterShelf(hub.articles, query({ category: 'cupons-como-usar', q: 'magalu' }))), [
  'magalu-1',
  'magalu-3',
  'magalu-4',
]);

// Ordem A–Z: número antes de letra, "2" antes de "10", sem acento nem maiúscula; empate pelo mais novo.
assert.deepEqual(
  sortShelf(hub.articles, 'az')
    .slice(0, 5)
    .map(({ title }) => title),
  ['2 dicas de café', '10 dicas de sono', 'abacate no café', 'Água com gás: vale a pena?', 'Poltrona reclinável DAMIE']
);
const sameTitle = [
  { ...article('agua'), id: 50, title: 'Mesmo título', publishedAtISO: '2026-01-01' },
  { ...article('agua'), id: 51, title: 'mesmo título', publishedAtISO: '2026-02-01' },
];
assert.deepEqual(sortShelf(sameTitle, 'az').map(({ id }) => id), [51, 50]);
assert.deepEqual(slugs(sortShelf([...hub.articles].reverse(), 'novos')), slugs(hub.articles));

// URL: valores desconhecidos caem nos padrões, categoria fora da página vale como "Todos", a busca vai e
// volta como foi digitada e os outros parâmetros ficam.
assert.deepEqual(parseShelfQuery('?q=c%2B%2B+50%25&categoria=produtos-experiencias&ordem=az', ALL), {
  q: 'c++ 50%',
  category: 'produtos-experiencias',
  order: 'az',
});
assert.deepEqual(parseShelfQuery('?categoria=inexistente&ordem=xyz&q=', ALL), query());
assert.deepEqual(parseShelfQuery('?categoria=produtos-experiencias', ['cupons-como-usar']), query());
assert.deepEqual(parseShelfQuery('', ALL), query());
assert.equal(shelfSearch(query({ q: '  ' })), '');
assert.equal(shelfSearch(query({ order: 'novos' })), '');
assert.equal(
  shelfSearch(query({ q: 'a & b', category: 'cupons-como-usar', order: 'az' })),
  '?q=a+%26+b&categoria=cupons-como-usar&ordem=az'
);
const tricky = query({ q: '50% "x" <b> + c# ', category: 'confianca-reputacao' });
assert.deepEqual(parseShelfQuery(shelfSearch(tricky), ALL), tricky, 'a busca vai e volta pela URL sem perder nada');
assert.equal(withShelfQuery('?utm_source=ig&q=velho&ordem=az', query({ q: 'novo' })), '?utm_source=ig&q=novo');
assert.equal(withShelfQuery('?q=velho', query()), '');
assert.equal(siteSearchHref('  air fryer & 50% '), '/buscar?q=air+fryer+%26+50%25');
assert.equal(reviewsSearchHref(' poltrona '), '/reviews?q=poltrona');

// Textos: total, resultado e busca vazia.
assert.equal(countLabel(1), '1 artigo');
assert.equal(countLabel(68), '68 artigos');
assert.equal(resultsLabel(68, '  '), '68 artigos');
assert.equal(resultsLabel(3, ' travesseiro '), '3 artigos com “travesseiro”');
assert.equal(emptySearchMessage(' air fryer '), 'Nenhum artigo com “air fryer”.');
assert.deepEqual(getEmptySearchAction(' air fryer ', 'site', null), {
  kind: 'link',
  href: '/buscar?q=air+fryer',
  label: 'Buscar “air fryer” no site todo',
});
assert.deepEqual(getEmptySearchAction('sofá', 'reviews', null), {
  kind: 'link',
  href: '/reviews?q=sof%C3%A1',
  label: 'Buscar “sofá” em todos os guias e análises',
});
assert.deepEqual(getEmptySearchAction('x', 'site', 'cupons-como-usar'), {
  kind: 'all-categories',
  label: 'Buscar em todas as categorias',
});

// Páginas: 12 cartões na grade, 24 linhas na lista; na troca de modo fica a maior quantidade.
assert.equal(GRID_PAGE_SIZE, 12);
assert.equal(LIST_PAGE_SIZE, 24);
assert.equal(pageSizeOf('grade'), 12);
assert.equal(pageSizeOf('lista'), 24);
assert.equal(visibleAfterViewChange(12, 'lista'), 24);
assert.equal(visibleAfterViewChange(36, 'lista'), 36);
assert.equal(visibleAfterViewChange(24, 'grade'), 24);

// Medição.
assert.equal(shelfPlacement('reviews', 'grade'), 'reviews_grid');
assert.equal(shelfPlacement('reviews', 'lista'), 'reviews_list');
assert.equal(shelfPlacement('store', 'grade'), 'store_grid');
assert.equal(shelfPlacement('store', 'lista'), 'store_list');
assert.deepEqual(getReviewsRouteClickParameters({ href: '/reviews/agua', placement: 'reviews_new', linkLabel: 'Água' }), {
  destination: '/reviews/agua',
  placement: 'reviews_new',
  link_label: 'Água',
});
assert.deepEqual(getShelfSearchParameters({ q: ' poltrona ', resultsCount: 3, listPath: '/reviews' }), {
  search_term: 'poltrona',
  results_count: 3,
  list_path: '/reviews',
});
assert.deepEqual(getShelfControlParameters({ control: 'sort', value: 'az', listPath: '/reviews/loja/damie' }), {
  control: 'sort',
  value: 'az',
  list_path: '/reviews/loja/damie',
});
assert.equal(shouldTrackSearch('a', null), false, 'menos de 2 letras');
assert.equal(shouldTrackSearch('Poltrona', null), true);
assert.equal(shouldTrackSearch('poltrona', 'poltrona'), false, 'o mesmo termo seguido');
assert.equal(shouldTrackSearch(' Pôltrona ', 'poltrona'), false, 'o mesmo termo, com acento e espaço');

// Subpágina: textos de hoje, trilha, categorias da loja, Outras lojas e a busca só acima de 12 artigos.
const magalu = getStoreShelfContent(fixture, 'magalu', fixtureStores);
assert.ok(magalu);
assert.equal(magalu.title, 'Artigos do Magalu');
assert.equal(magalu.path, '/reviews/loja/magalu');
assert.equal(magalu.codeLinkLabel, 'Ver o código do Magalu');
assert.equal(magalu.storePageUrl, '/cupons/magalu');
assert.equal(magalu.countLabel, '4 artigos da Cecília sobre o Magalu');
assert.deepEqual(slugs(magalu.articles), ['magalu-1', 'magalu-2', 'magalu-3', 'magalu-4']);
assert.deepEqual(magalu.categories.map(({ value }) => value), ['cupons-como-usar', 'confianca-reputacao']);
assert.equal(magalu.search, null);
assert.equal(magalu.store.total, 4);
assert.deepEqual(magalu.otherStores, [], 'a DAMIE do fixture não tem subpágina');
assert.deepEqual(magalu.trail, [
  { name: 'Início', path: '/' },
  { name: 'Guias & Análises', path: '/reviews' },
  { name: 'Artigos do Magalu', path: '/reviews/loja/magalu' },
]);
assert.equal(getStoreShelfContent(fixture, 'damie', fixtureStores), null, 'loja com 1 artigo não tem subpágina');
assert.equal(getStoreShelfContent(fixture, 'loja-que-nao-existe', fixtureStores), null);

const magaluArticles = (count: number) =>
  Array.from({ length: count }, (_, index) =>
    review(100 + index, `extra-${index}`, {
      affiliate: 'magalu',
      publishedAtISO: `2026-06-${String(index + 1).padStart(2, '0')}`,
    })
  );
assert.equal(getStoreShelfContent(magaluArticles(12), 'magalu', [store('magalu')])?.search, null, '12 artigos: sem busca');
assert.deepEqual(getStoreShelfContent(magaluArticles(13), 'magalu', [store('magalu')])?.search, {
  label: 'Buscar nos artigos do Magalu',
  placeholder: 'Buscar nos artigos do Magalu',
  scope: 'reviews',
});
const twoStores = [
  ...fixture,
  ...[20, 21, 22].map((id) => review(id, `damie-${id}`, { affiliate: 'damie', publishedAtISO: '2026-05-01' })),
];
assert.deepEqual(slugs(getStoreShelfContent(twoStores, 'magalu', fixtureStores)?.otherStores ?? []), ['damie']);
assert.deepEqual(slugs(getStoreShelfContent(twoStores, 'damie', fixtureStores)?.otherStores ?? []), ['magalu']);

// Controle positivo: artigo listado sem categoria válida derruba a montagem, como no resto do site.
assert.throws(
  () => getReviewsHubContent([review(1, 'sem-categoria', { category: 'inexistente' as ReviewCategory })], []),
  /category ausente ou inválida/
);

// Dados reais.
const listed = sortReviewsByPublishedAt(getListedPortugueseReviews(publishedReviews));
const real = getReviewsHubContent(publishedReviews);
assert.deepEqual(slugs(real.articles), slugs(listed));
assert.deepEqual(slugs(real.newArticles), slugs(listed.filter(({ isNew }) => isNew)));
assert.deepEqual(slugs(real.stores), getStoreArticlePageSlugs(publishedReviews));
assert.match(new URL(real.socialImage.url).pathname, /\.(?:jpe?g|png|webp|gif)$/i);
for (const item of real.articles) {
  assert.match(item.dayMonth, /^\d{2}\/\d{2}$/, `${item.slug}: dayMonth`);
  assert.match(item.fullDate, /^\d{2}\/\d{2}\/\d{4}$/, `${item.slug}: fullDate`);
  assert.equal(item.searchText, foldSearchText(item.searchText), `${item.slug}: texto de busca normalizado`);
}
for (const shelfStore of real.stores) {
  assert.equal(shelfStore.total, getStoreArticlesPage(publishedReviews, shelfStore.slug)?.articles.length, `${shelfStore.slug}: total`);
  const page = getStoreShelfContent(publishedReviews, shelfStore.slug);
  assert.ok(page, `${shelfStore.slug}: subpágina`);
  assert.equal(page.search !== null, page.articles.length > GRID_PAGE_SIZE, `${shelfStore.slug}: busca só acima de 12 artigos`);
  assert.ok(!page.otherStores.some(({ slug }) => slug === shelfStore.slug), `${shelfStore.slug}: Outras lojas sem a própria`);
}

console.log(
  `✅ reviewsHub: estante de ${real.articles.length} artigos, ${real.newArticles.length} novidades, ${real.stores.length} lojas com subpágina, busca, ordem, URL e medição passaram.`
);
