import assert from 'node:assert/strict';
import { createElement, type ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { imageConfigDefault, type ImageConfigComplete, type RemotePattern } from 'next/dist/shared/lib/image-config';
import { ImageConfigContext } from 'next/dist/shared/lib/image-config-context.shared-runtime';

import { ViewTransitionLink } from '@/components/ViewTransitionLink';
import { LocalizedReviewHub } from '@/components/review/LocalizedReviewHub';
import { ReviewShelfCard, ReviewShelfRow } from '@/components/reviews/ReviewShelfCard';
import { ReviewsBrowser } from '@/components/reviews/ReviewsBrowser';
import { ReviewsNewRow } from '@/components/reviews/ReviewsNewRow';
import { ReviewsStoreStrip } from '@/components/reviews/ReviewsStoreStrip';
import { StoreBubbleLink } from '@/components/reviews/StoreBubbleLink';
import { TrackedReviewsLink } from '@/components/reviews/TrackedReviewsLink';
import { cardDecorAt } from '@/components/ui/cardDecor';
import { ScrollRow } from '@/components/ui/ScrollRow';
import type { Review } from '@/lib/content/types';
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
import {
  OTHERS_SHELF_PATH,
  getOthersShelfContent,
  getReviewsHubContent,
  getStoreShelfContent,
  type HubReview,
} from '@/lib/reviewsHub';
import {
  GRID_PAGE_SIZE,
  LIST_PAGE_SIZE,
  SEARCH_WRITE_DELAY_MS,
  countLabel,
  draftValue,
  emptySearchMessage,
  filterShelf,
  firstPage,
  foldSearchText,
  freshDraft,
  getEmptySearchAction,
  getReviewsRouteClickParameters,
  getShelfControlParameters,
  getShelfSearchParameters,
  hasSearchText,
  isOnList,
  isSearching,
  isSearchWriteDue,
  pageSizeOf,
  parseShelfQuery,
  readShelfQuery,
  rebaseDraft,
  resultsLabel,
  reviewsSearchHref,
  searchWords,
  searchWriteDelay,
  settlePage,
  shelfPlacement,
  shelfSearch,
  shouldTrackSearch,
  siteSearchHref,
  sortShelf,
  urlSearchOf,
  visibleAfterViewChange,
  withShelfQuery,
  type SearchDraft,
  type ShelfArticle,
  type ShelfQuery,
} from '@/lib/reviewsShelf';
import { sanitizeViewTransitionName } from '@/lib/viewTransition';
import { IMAGE_REMOTE_PATTERNS } from '@/lib/imageHosts.mjs';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

// A estante de /reviews e das subpáginas de loja: as regras de reviewsShelf.ts, os dados de
// reviewsHub.ts e os componentes, renderizados como o servidor os entrega. Sem DOM, os cliques são
// exercitados com eventos falsos.

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
// DAMIE tem 1. A capa mais nova é AVIF, que o cartão do X não mostra. O "dez-dicas" traz os campos de busca
// que não são título nem descrição, e o "duas-dicas" é de uma loja que não está nas lojas passadas.
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
  review(4, 'dez-dicas', {
    title: '10 dicas de sono',
    publishedAtISO: '2026-09-01',
    image: undefined,
    productName: 'Travesseiro Zephyr',
    brand: 'Ventobrisa',
    collections: ['Coleção Orvalho'],
  }),
  review(5, 'duas-dicas', {
    title: '2 dicas de café',
    publishedAtISO: '2026-08-01',
    category: 'cupons-como-usar',
    affiliate: 'insider',
  }),
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
assert.equal(article('duas-dicas').store, undefined, 'affiliate fora das lojas passadas: sem nome de loja');

// Bolinhas: só lojas com subpágina (3 artigos ou mais), na ordem das lojas, e a "Outros" por último (aqui
// 4 artigos sem loja ativa: 3 sem affiliate e 1 da Insider, que não está nas lojas passadas).
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
  {
    slug: 'outros',
    brand: 'Outros',
    initials: 'Outros',
    icon: 'house',
    total: 4,
    href: '/reviews/outros',
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
assert.deepEqual(
  getReviewsHubContent(fixture.map((item) => ({ ...item, image: '/images/reviews/teste/capa.avif' })), fixtureStores)
    .socialImage,
  SITE_SOCIAL_IMAGE,
  'só capas AVIF: o logo do site'
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
for (const [word, field] of [
  ['zephyr', 'productName'],
  ['VENTOBRISA', 'brand'],
  ['coleçao orvalho', 'collections'],
]) {
  assert.deepEqual(slugs(filterShelf(hub.articles, query({ q: word }))), ['dez-dicas'], `${field} entra na busca`);
}
assert.deepEqual(slugs(filterShelf(hub.articles, query({ q: 'c++ 50% "x" <b>' }))), [], 'caracteres especiais são texto');
// Controle positivo: o mesmo texto, quando o artigo o tem, é achado com a pontuação como foi digitada.
const punctuated: ShelfArticle = {
  ...article('agua'),
  id: 60,
  slug: 'cupom-pontuado',
  searchText: foldSearchText('Cupom 50% & C++ "x" <b>'),
};
for (const q of ['50% & c++', '"x" <b>', 'C++ 50% "X" <B>']) {
  assert.deepEqual(slugs(filterShelf([...hub.articles, punctuated], query({ q }))), ['cupom-pontuado'], `pontuação em "${q}"`);
}
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
assert.equal(parseShelfQuery('?q=um&q=dois', ALL).q, 'um', 'q repetido: vale o primeiro');
assert.equal(parseShelfQuery('?ordem=AZ', ALL).order, 'novos', 'ordem só vale em minúsculas');
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
assert.equal(shelfPlacement('others', 'grade'), 'others_grid');
assert.equal(shelfPlacement('others', 'lista'), 'others_list');
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
assert.equal(shouldTrackSearch('++', null), false, 'pontuação não é letra');
assert.equal(shouldTrackSearch('5%', null), false, 'um número e um símbolo: menos de 2 letras ou números');
assert.equal(shouldTrackSearch('50', null), true, 'dois números contam');
assert.equal(shouldTrackSearch('a b', null), true, 'o espaço não conta, as duas letras sim');
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
assert.deepEqual(slugs(magalu.otherStores), ['outros'], 'a DAMIE do fixture não tem subpágina; a Outros fecha a fila');
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
assert.deepEqual(slugs(getStoreShelfContent(twoStores, 'magalu', fixtureStores)?.otherStores ?? []), ['damie', 'outros']);
assert.deepEqual(slugs(getStoreShelfContent(twoStores, 'damie', fixtureStores)?.otherStores ?? []), ['magalu', 'outros']);

// Outros: o artigo sem affiliate e o de loja que não está entre as ativas entram; o de loja ativa não. Com 3
// ou mais há página e bolinha; com menos, nenhuma das duas, nem em /reviews nem nas subpáginas.
const OTHERS_SLUGS = ['sem-loja-velho', 'loja-pausada', 'sem-loja-novo', 'sem-loja-meio'];
const othersFixture = (count: number): FixtureReview[] => {
  let left = count;
  return [
    review(40, 'sem-loja-velho', { publishedAtISO: '2026-03-01', image: '/images/reviews/teste/velho.avif' }),
    review(41, 'loja-pausada', { affiliate: 'loja-pausada', publishedAtISO: '2026-05-02', category: 'cupons-como-usar' }),
    review(42, 'sem-loja-novo', { publishedAtISO: '2026-06-01', image: '/images/reviews/teste/novo.webp' }),
    review(43, 'sem-loja-meio', { publishedAtISO: '2026-04-01', category: 'produtos-experiencias' }),
    review(44, 'da-loja-ativa', { affiliate: 'magalu', publishedAtISO: '2026-07-01' }),
    review(45, 'magalu-x', { affiliate: 'magalu', publishedAtISO: '2026-07-02' }),
    review(46, 'magalu-y', { affiliate: 'magalu', publishedAtISO: '2026-07-03' }),
    review(47, 'magalu-z', { affiliate: 'magalu', publishedAtISO: '2026-07-04' }),
  ].filter((item) => !OTHERS_SLUGS.includes(item.slug) || left-- > 0);
};
const magaluOnly = [store('magalu')];
const others = getOthersShelfContent(othersFixture(4), magaluOnly);
assert.ok(others);
assert.deepEqual(slugs(others.articles), ['sem-loja-novo', 'loja-pausada', 'sem-loja-meio', 'sem-loja-velho'], 'do mais novo ao mais antigo');
assert.equal(others.articles.find((item) => item.slug === 'loja-pausada')?.store, undefined, 'loja pausada: sem nome de loja');
assert.equal(others.title, 'Outros artigos');
assert.equal(others.metaTitle, 'Outros guias e análises - Em Casa com Cecília');
assert.equal(others.countLabel, '4 artigos');
assert.equal(
  others.description,
  '4 artigos da Cecília fora das lojas parceiras: guias e análises, do mais novo para o mais antigo.'
);
assert.equal(others.path, '/reviews/outros');
assert.equal(others.path, OTHERS_SHELF_PATH);
assert.deepEqual(others.trail, [
  { name: 'Início', path: '/' },
  { name: 'Guias & Análises', path: '/reviews' },
  { name: 'Outros', path: '/reviews/outros' },
]);
assert.deepEqual(others.categories.map(({ value }) => value), [
  'guias-praticos-utilidade',
  'produtos-experiencias',
  'cupons-como-usar',
]);
assert.equal(others.search, null);
assert.deepEqual(others.store, {
  slug: 'outros',
  brand: 'Outros',
  initials: 'Outros',
  icon: 'house',
  total: 4,
  href: '/reviews/outros',
  countLabel: '4 artigos',
});
assert.deepEqual(slugs(others.otherStores), ['magalu'], 'Outras lojas: só as lojas, sem a Outros');
assert.deepEqual(others.socialImage, { url: absoluteMediaUrl('/images/reviews/teste/novo.webp'), alt: 'Título sem-loja-novo' });
assert.equal('storePageUrl' in others || 'codeLinkLabel' in others, false, 'sem campos de loja');
const looseReviews = (count: number) =>
  Array.from({ length: count }, (_, index) =>
    review(200 + index, `solto-${index}`, { publishedAtISO: `2026-02-${String(index + 1).padStart(2, '0')}` })
  );
assert.deepEqual(getOthersShelfContent(looseReviews(13), [])?.search, {
  label: 'Buscar nos outros artigos',
  placeholder: 'Buscar nos outros artigos',
  scope: 'reviews',
});
assert.equal(getOthersShelfContent(looseReviews(12), [])?.search, null, '12 artigos: sem busca');
assert.deepEqual(
  getOthersShelfContent(othersFixture(4).map((item) => ({ ...item, image: '/images/reviews/teste/capa.avif' })), magaluOnly)
    ?.socialImage,
  SITE_SOCIAL_IMAGE,
  'só capas AVIF: o logo do site'
);

for (const count of [0, 1, 2]) {
  const reviews = othersFixture(count);
  assert.equal(getOthersShelfContent(reviews, magaluOnly), null, `${count} artigos: sem página`);
  assert.deepEqual(slugs(getReviewsHubContent(reviews, magaluOnly).stores), ['magalu'], `${count} artigos: sem bolinha em /reviews`);
  assert.deepEqual(
    slugs(getStoreShelfContent(reviews, 'magalu', magaluOnly)?.otherStores ?? []),
    [],
    `${count} artigos: sem bolinha nas subpáginas`
  );
}
{
  const withPage = othersFixture(3);
  assert.equal(getOthersShelfContent(withPage, magaluOnly)?.articles.length, 3, '3 artigos: a página existe');
  assert.deepEqual(slugs(getReviewsHubContent(withPage, magaluOnly).stores), ['magalu', 'outros'], 'a Outros é a última de /reviews');
  assert.deepEqual(slugs(getStoreShelfContent(withPage, 'magalu', magaluOnly)?.otherStores ?? []), ['outros']);
  const damieToo = [...withPage, ...[50, 51, 52].map((id) => review(id, `damie-${id}`, { affiliate: 'damie' }))];
  assert.deepEqual(
    slugs(getStoreShelfContent(damieToo, 'magalu', [store('damie'), store('magalu')])?.otherStores ?? []),
    ['damie', 'outros'],
    'a Outros é a última de Outras lojas'
  );
}
assert.equal(
  getOthersShelfContent(othersFixture(4), [...magaluOnly, store('damie')])?.articles.length,
  4,
  'uma loja ativa a mais, sem artigo no fixture, não muda a Outros'
);
assert.equal(getOthersShelfContent(othersFixture(4), [])?.articles.length, 8, 'sem lojas ativas, todo artigo é da Outros');

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
const realOthers = getOthersShelfContent(publishedReviews);
assert.deepEqual(
  slugs(real.stores),
  [...getStoreArticlePageSlugs(publishedReviews), ...(realOthers ? ['outros'] : [])],
  'as lojas com subpágina e, por último, a Outros quando há página'
);
assert.deepEqual(slugs(realOthers?.otherStores ?? []), getStoreArticlePageSlugs(publishedReviews), 'Outras lojas da Outros: só as lojas');
// A rota estática /reviews/outros vence o /reviews/[slug]: nenhum artigo nem loja pode ter o slug "outros".
assert.ok(!publishedReviews.some(({ slug }) => slug === 'outros'), 'artigo com o slug "outros" ficaria inalcançável');
assert.ok(!COUPONS.some(({ slug }) => slug === 'outros'), 'loja com o slug "outros" colidiria com a bolinha');
assert.deepEqual(slugs(sortShelf(real.articles, 'novos')), slugs(real.articles), 'a ordem do servidor é a do sortShelf');
assert.match(new URL(real.socialImage.url).pathname, /\.(?:jpe?g|png|webp|gif)$/i);
const shareable = listed.find(
  ({ image }) => image && /\.(?:jpe?g|png|webp|gif)$/i.test(new URL(absoluteMediaUrl(image)).pathname)
);
assert.deepEqual(
  real.socialImage,
  shareable?.image ? { url: absoluteMediaUrl(shareable.image), alt: shareable.title } : SITE_SOCIAL_IMAGE,
  'imagem de compartilhamento: a capa mais nova num formato que o X mostra'
);
for (const item of real.articles) {
  assert.match(item.dayMonth, /^\d{2}\/\d{2}$/, `${item.slug}: dayMonth`);
  assert.match(item.fullDate, /^\d{2}\/\d{2}\/\d{4}$/, `${item.slug}: fullDate`);
  assert.equal(item.searchText, foldSearchText(item.searchText), `${item.slug}: texto de busca normalizado`);
  assert.ok(item.searchText.includes(foldSearchText(item.title)), `${item.slug}: o título entra na busca`);
}
for (const shelfStore of real.stores.filter(({ slug }) => slug !== 'outros')) {
  assert.equal(shelfStore.total, getStoreArticlesPage(publishedReviews, shelfStore.slug)?.articles.length, `${shelfStore.slug}: total`);
  const page = getStoreShelfContent(publishedReviews, shelfStore.slug);
  assert.ok(page, `${shelfStore.slug}: subpágina`);
  assert.equal(page.search !== null, page.articles.length > GRID_PAGE_SIZE, `${shelfStore.slug}: busca só acima de 12 artigos`);
  assert.ok(!page.otherStores.some(({ slug }) => slug === shelfStore.slug), `${shelfStore.slug}: Outras lojas sem a própria`);
  assert.deepEqual(
    slugs(page.otherStores),
    slugs(real.stores).filter((slug) => slug !== shelfStore.slug),
    `${shelfStore.slug}: Outras lojas são todas as outras, na ordem das lojas`
  );
}

// Componentes, renderizados como o servidor os entrega. Fora do Next, o next/image não conhece os hosts
// do next.config.mjs, e o useRouter() do ViewTransitionLink exige o roteador do App Router montado.
const imageConfig: ImageConfigComplete = {
  ...imageConfigDefault,
  remotePatterns: IMAGE_REMOTE_PATTERNS as RemotePattern[],
};
const router = { back() {}, forward() {}, refresh() {}, push() {}, replace() {}, prefetch() {} };

function render(element: ReactElement): string {
  return renderToStaticMarkup(
    createElement(
      ImageConfigContext.Provider,
      { value: imageConfig },
      createElement(AppRouterContext.Provider, { value: router }, element)
    )
  );
}

// O texto que o leitor de tela lê no link, na ordem do DOM: o HTML sem as tags.
const textOf = (html: string) => html.replace(/<[^>]*>/g, '');

// Cartão da grade: link com o anel de foco, data com o ano, tipo, loja embaixo, selo "Novo", foto lazy
// e o nome da transição só no data-vt-name (o HTML não leva view-transition-name).
const gridCard = render(
  createElement(ReviewShelfCard, {
    article: poltrona,
    placement: 'reviews_grid',
    dateFormat: 'fullDate',
    showStore: true,
    imageSizes: '270px',
  })
);
assert.match(gridCard, /<a [^>]*href="\/reviews\/poltrona-damie"/);
assert.match(gridCard, /focus-visible:outline-marinho/);
assert.ok(gridCard.includes('>09/10/2026, Guia<'), 'data com o ano e tipo');
assert.ok(gridCard.includes('>DAMIE</span>'), 'loja embaixo');
assert.ok(gridCard.includes('>Novo</span>'), 'selo Novo');
// O título é o h3 do cartão e o primeiro texto do DOM, depois da foto; a data e o tipo vêm depois dele no
// DOM e sobem na tela por order-first. O selo é o último filho do link: o nome acessível começa pelo
// título, não pela data nem por "Novo".
assert.match(gridCard, /<h3 [^>]*>Poltrona reclinável DAMIE<\/h3>/, 'título como h3');
assert.ok(gridCard.indexOf('data-vt-name') < gridCard.indexOf('<h3'), 'título depois da foto');
assert.equal(textOf(gridCard.slice(0, gridCard.indexOf('<h3'))), '', 'nenhum texto antes do título');
assert.ok(gridCard.indexOf('<h3') < gridCard.indexOf('>09/10/2026, Guia<'), 'título antes da data no DOM');
assert.match(gridCard, /<span class="order-first [^"]*">09\/10\/2026, Guia<\/span>/, 'a data sobe na tela');
assert.ok(textOf(gridCard).startsWith('Poltrona reclinável DAMIE'), 'o nome do link começa pelo título');
assert.ok(gridCard.indexOf('>Novo</span>') > gridCard.indexOf('>Poltrona reclinável DAMIE</h3>'), 'selo depois do título');
assert.ok(gridCard.endsWith('>Novo</span></a>'), 'selo como último filho do link');
assert.ok(gridCard.includes('data-vt-name="review-hero-poltrona-damie"'));
assert.ok(!gridCard.includes('view-transition-name'), 'nome de transição no HTML');
assert.match(gridCard, /<img [^>]*loading="lazy"/);
assert.ok(!/fetchpriority/i.test(gridCard), 'foto lazy sem fetchpriority');
assert.ok(!gridCard.includes('aria-hidden="true"'), 'cartão do acervo sem ímã');

const noStore = render(
  createElement(ReviewShelfCard, {
    article: poltrona,
    placement: 'store_grid',
    dateFormat: 'fullDate',
    showStore: false,
    imageSizes: '270px',
  })
);
assert.ok(!noStore.includes('>DAMIE</span>'), 'na subpágina o cartão não repete a loja');

// Cartão das Novidades: DD/MM, ímã decorativo, inclinação, foto sem atraso e sem o selo "Novo" (todos ali
// são novos).
const newCard = render(
  createElement(ReviewShelfCard, {
    article: poltrona,
    placement: 'reviews_new',
    dateFormat: 'dayMonth',
    showStore: true,
    decor: cardDecorAt(0),
    eager: true,
    showNewBadge: false,
    imageSizes: '220px',
  })
);
assert.ok(newCard.includes('>09/10, Guia<'));
assert.ok(newCard.indexOf('<h3') !== -1 && newCard.indexOf('<h3') < newCard.indexOf('>09/10, Guia<'), 'título antes da data nas Novidades');
assert.ok(!newCard.includes('>Novo</span>'), 'selo Novo nas Novidades');
const magnet = newCard.match(/<span [^>]*bg-amarelo-cupom[^>]*>/)?.[0];
assert.ok(magnet, 'ímã amarelo');
assert.ok(magnet.includes('aria-hidden="true"'), 'ímã fora da leitura de tela');
assert.match(newCard, /class="[^"]*-rotate-1/);
assert.match(newCard, /<img [^>]*loading="eager"/);
assert.match(newCard, /<img [^>]*fetchpriority="high"/i);

const noImage = render(
  createElement(ReviewShelfCard, {
    article: article('dez-dicas'),
    placement: 'reviews_grid',
    dateFormat: 'fullDate',
    showStore: true,
    imageSizes: '270px',
  })
);
assert.ok(!noImage.includes('<img'), 'artigo sem capa: sem <img>');
const contained = render(
  createElement(ReviewShelfCard, {
    article: article('agua'),
    placement: 'reviews_grid',
    dateFormat: 'fullDate',
    showStore: true,
    imageSizes: '270px',
  })
);
assert.match(contained, /<img [^>]*class="[^"]*object-contain/);

// Linha da lista: data com o ano, tipo e loja; sem a loja na subpágina.
const row = render(createElement(ReviewShelfRow, { article: article('magalu-1'), placement: 'reviews_list', showStore: true }));
assert.match(row, /<a [^>]*href="\/reviews\/magalu-1"/);
assert.ok(row.includes('>04/07/2026, Guia<'));
assert.match(row, /<h3 [^>]*>Título magalu-1<\/h3>/, 'título como h3');
assert.ok(row.indexOf('data-vt-name') < row.indexOf('<h3'), 'título depois da foto');
assert.ok(row.indexOf('<h3') < row.indexOf('>04/07/2026, Guia<'), 'título antes da data no DOM');
assert.ok(textOf(row).startsWith('Título magalu-1'), 'o nome do link começa pelo título');
assert.ok(row.includes('>Magalu</span>'));
assert.ok(row.includes('data-vt-name="review-hero-magalu-1"'));
const rowNoStore = render(createElement(ReviewShelfRow, { article: article('magalu-1'), placement: 'store_list', showStore: false }));
assert.ok(!rowNoStore.includes('>Magalu</span>'));

// A capa pela regra única (src/lib/cardImage.ts): inteira sobre fundo branco no contain, cortada e com o
// recorte do imagePosition no cover. A miniatura da linha é pequena e leva o respiro menor (p-1).
const imageOf = (html: string, slug: string) => {
  const tag = Array.from(html.matchAll(/<img\b[^>]*>/g), ([image]) => image).find((candidate) => candidate.includes(slug));
  assert.ok(tag, `sem a foto de ${slug}`);
  return tag;
};
const rowContain = render(createElement(ReviewShelfRow, { article: article('agua'), placement: 'reviews_list', showStore: false }));
assert.match(imageOf(rowContain, 'agua'), /class="[^"]*\bbg-white object-contain p-1\b/, 'linha: a foto com nota fica inteira');
assert.doesNotMatch(imageOf(rowContain, 'agua'), /object-position/, 'linha: o contain não leva recorte');

// O hub de /<locale>/reviews desenha a capa pela mesma regra, com o respiro de p-4. Hoje nenhuma versão fora
// do PT tem nota sem imageFit nem imagePosition; o fixture cobre o caso para o dia em que alguma tiver.
function hubReview(id: number, slug: string, overrides: Partial<Review> = {}): Review {
  return {
    id,
    slug,
    locale: 'en',
    type: 'Guide',
    title: `Title ${slug}`,
    description: `Description ${slug}`,
    publishedAt: '2026-10-01',
    publishedAtISO: '2026-10-01',
    image: `/images/reviews/teste/${slug}.webp`,
    pros: [],
    cons: [],
    ...overrides,
  };
}
const localizedHub = render(
  createElement(LocalizedReviewHub, {
    locale: 'en',
    reviews: [
      hubReview(21, 'hub-com-nota', { rating: 5 }),
      hubReview(22, 'hub-no-topo', { imagePosition: 'top' }),
      hubReview(23, 'hub-nota-cobrindo', { rating: 5, imageFit: 'cover' }),
    ],
  })
);
assert.match(imageOf(localizedHub, 'hub-com-nota'), /class="[^"]*\bbg-white object-contain p-4\b/, 'hub: nota sem imageFit fica inteira');
assert.doesNotMatch(imageOf(localizedHub, 'hub-com-nota'), /object-position/, 'hub: o contain não leva recorte');
assert.match(imageOf(localizedHub, 'hub-no-topo'), /class="[^"]*\bobject-cover\b/, 'hub: sem nota, a capa cobre');
assert.match(imageOf(localizedHub, 'hub-no-topo'), /style="[^"]*object-position:50% 10%/, 'hub: o imagePosition recorta o cover');
assert.match(imageOf(localizedHub, 'hub-nota-cobrindo'), /class="[^"]*\bobject-cover\b/, 'hub: o imageFit explícito vale mais que a nota');

// Bolinha da loja como link: href da subpágina, classes da bolinha, posição (--i), nome e total.
const bubble = render(createElement(StoreBubbleLink, { store: hub.stores[0], index: 2, placement: 'reviews_stores' }));
assert.match(bubble, /<a [^>]*href="\/reviews\/loja\/magalu"/);
assert.match(bubble, /class="bolinha /);
assert.match(bubble, /--i:2/);
assert.ok(bubble.includes('>Magalu</span>'));
assert.ok(bubble.includes('>4 artigos</span>'));

// A bolinha da casa: o href de /reviews/outros, o ícone (svg decorativo) e nenhum <img> nem iniciais.
const othersBubble = render(createElement(StoreBubbleLink, { store: others.store, index: 0, placement: 'reviews_stores' }));
assert.match(othersBubble, /<a [^>]*href="\/reviews\/outros"/);
assert.match(othersBubble, /<svg [^>]*lucide-house[^>]*aria-hidden="true"/, 'a casa, escondida do leitor de tela');
assert.doesNotMatch(othersBubble, /<img\b/, 'sem logo');
assert.ok(!othersBubble.includes('>Outros</span></span>'), 'sem as iniciais dentro do disco');
assert.ok(othersBubble.includes('>Outros</span>') && othersBubble.includes('>4 artigos</span>'), 'nome e total embaixo');
assert.doesNotMatch(bubble, /<svg\b/, 'a bolinha de loja segue com o logo, sem a casa');

const tracked = render(
  createElement(
    TrackedReviewsLink,
    { href: '/reviews', placement: 'store_all_reviews', linkLabel: 'Ver todos', className: 'x' },
    'Ver todos'
  )
);
assert.match(tracked, /^<a [^>]*class="x"[^>]*>Ver todos<\/a>$/);
assert.match(tracked, /^<a [^>]*href="\/reviews"[^>]*>/);

// Cliques: medidos como reviews_route_click com o destino, o placement e o texto do link; o que outro
// handler já cancelou não é medido. Os componentes rodam como função (nenhum usa hook) e o onClick do
// elemento devolvido recebe um evento falso, com o window.gtag trocado por um espião.
type ClickableElement = { props: { onClick?: (event: { defaultPrevented: boolean }) => void } };
function gtagCallsOf({ props }: ClickableElement, event: { defaultPrevented: boolean } = { defaultPrevented: false }) {
  const calls: unknown[][] = [];
  Object.assign(globalThis, { window: { gtag: (...args: unknown[]) => calls.push(args) } });
  try {
    props.onClick?.(event);
  } finally {
    Reflect.deleteProperty(globalThis, 'window');
  }
  return calls;
}

const trackedLink = { href: '/reviews', placement: 'store_all_reviews', linkLabel: 'Ver todos' } as const;
assert.deepEqual(gtagCallsOf(TrackedReviewsLink({ ...trackedLink, children: 'Ver todos' })), [
  ['event', 'reviews_route_click', { destination: '/reviews', placement: 'store_all_reviews', link_label: 'Ver todos' }],
]);
assert.deepEqual(
  gtagCallsOf(TrackedReviewsLink({ ...trackedLink, children: 'Ver todos' }), { defaultPrevented: true }),
  [],
  'clique cancelado não é medido'
);
// O onClick de quem usa o link roda antes da medição, e cancelar ali também impede a medição.
const calledBefore: string[] = [];
assert.deepEqual(
  gtagCallsOf(
    TrackedReviewsLink({
      ...trackedLink,
      children: 'Ver todos',
      onClick: (event) => {
        calledBefore.push('onClick');
        Object.assign(event, { defaultPrevented: true });
      },
    }),
    { defaultPrevented: false }
  ),
  []
);
assert.deepEqual(calledBefore, ['onClick']);

assert.deepEqual(
  gtagCallsOf(
    ReviewShelfCard({ article: poltrona, placement: 'reviews_grid', dateFormat: 'fullDate', showStore: true, imageSizes: '270px' })
  ),
  [['event', 'reviews_route_click', { destination: '/reviews/poltrona-damie', placement: 'reviews_grid', link_label: 'Poltrona reclinável DAMIE' }]],
  'clique no cartão'
);
assert.deepEqual(
  gtagCallsOf(ReviewShelfRow({ article: article('magalu-1'), placement: 'store_list', showStore: false })),
  [['event', 'reviews_route_click', { destination: '/reviews/magalu-1', placement: 'store_list', link_label: 'Título magalu-1' }]],
  'clique na linha'
);

// Nome da foto na transição: só a foto do link clicado fica com ele. O mesmo artigo aparece nas Novidades e no
// acervo, e a foto clicada antes (navegação cancelada ou página restaurada pelo bfcache) ainda guarda o nome:
// se ele ficasse, as duas teriam o mesmo nome e a transição seria cancelada. Sem DOM aqui: o componente roda
// dentro de um render do servidor só para entregar o handleClick, e document e window são falsos.
type FakePhoto = {
  dataset: { vtName: string };
  style: { viewTransitionName: string; removeProperty(property: string): void };
};
function fakePhoto(name: string): FakePhoto {
  const style = {
    viewTransitionName: '',
    removeProperty(property: string): void {
      assert.equal(property, 'view-transition-name');
      style.viewTransitionName = '';
    },
  };
  return { dataset: { vtName: name }, style };
}

const pushed: string[] = [];
let handleClick: ((event: unknown) => void) | undefined;
function CaptureClick() {
  handleClick = ViewTransitionLink({ href: '/reviews/agua', children: null }).props.onClick;
  return null;
}
renderToStaticMarkup(
  createElement(
    AppRouterContext.Provider,
    { value: { ...router, push: (href: string) => pushed.push(href) } },
    createElement(CaptureClick)
  )
);
assert.ok(handleClick, 'ViewTransitionLink entrega o handleClick');

const novidadesPhoto = fakePhoto('review-hero-agua');
const acervoPhoto = fakePhoto('review-hero-agua');
const photos = [novidadesPhoto, acervoPhoto];
function clickOn(photo: FakePhoto, modifiers: { ctrlKey?: boolean } = {}) {
  let prevented = false;
  handleClick?.({
    metaKey: false,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    button: 0,
    ...modifiers,
    target: { target: '' },
    currentTarget: {
      querySelector: (selector: string) => {
        assert.equal(selector, '[data-vt-name]', 'a foto é buscada por [data-vt-name]');
        return photo;
      },
    },
    preventDefault: () => {
      prevented = true;
    },
  });
  return prevented;
}

Object.assign(globalThis, {
  window: { matchMedia: () => ({ matches: false }) },
  document: {
    querySelectorAll: (selector: string) => {
      assert.equal(selector, '[data-vt-name]', 'as fotos com nome são buscadas por [data-vt-name]');
      return photos;
    },
    startViewTransition: (update: () => void) => update(),
  },
});
try {
  assert.equal(clickOn(novidadesPhoto), true, 'clique comum vira transição');
  assert.equal(novidadesPhoto.style.viewTransitionName, 'review-hero-agua');
  assert.equal(acervoPhoto.style.viewTransitionName, '', 'a gêmea fica sem nome');
  assert.equal(clickOn(acervoPhoto), true);
  assert.equal(acervoPhoto.style.viewTransitionName, 'review-hero-agua');
  assert.equal(novidadesPhoto.style.viewTransitionName, '', 'o nome do clique anterior sai');
  assert.deepEqual(pushed, ['/reviews/agua', '/reviews/agua']);

  // Ctrl+clique abre em outra aba pelo navegador: nada de transição, nome nem navegação do roteador.
  assert.equal(clickOn(novidadesPhoto, { ctrlKey: true }), false);
  assert.equal(novidadesPhoto.style.viewTransitionName, '');
  assert.equal(acervoPhoto.style.viewTransitionName, 'review-hero-agua');
  assert.equal(pushed.length, 2);
} finally {
  Reflect.deleteProperty(globalThis, 'window');
  Reflect.deleteProperty(globalThis, 'document');
}

// Novidades: título com o marca-texto, um cartão por artigo (revelado na rolagem, com a posição em --i),
// as duas primeiras fotos sem atraso e as setas escondidas até o navegador medir a fila. Os três artigos
// têm foto e são "Novo": com tudo eager ou com o selo à mostra, os asserts abaixo falhariam.
const newRowArticles: ShelfArticle[] = [poltrona, article('agua'), { ...article('abacate'), isNew: true }];
assert.ok(
  newRowArticles.every(({ image, isNew }) => image && isNew),
  'os três artigos da fila têm foto e são novos'
);
const newRow = render(createElement(ReviewsNewRow, { articles: newRowArticles }));
assert.ok(newRow.includes('aria-labelledby="titulo-novidades"'));
assert.match(newRow, /<h2 id="titulo-novidades"[^>]*><span class="marca-texto">Novidades<\/span><\/h2>/);
assert.equal(newRow.match(/<li class="revela /g)?.length, 3, 'um cartão por artigo');
assert.deepEqual(
  [...newRow.matchAll(/<li [^>]*style="--i:(\d+)"/g)].map(([, position]) => Number(position)),
  [0, 1, 2],
  'cada cartão leva a posição em --i'
);
assert.deepEqual(
  [...newRow.matchAll(/loading="(eager|lazy)"/g)].map(([, loading]) => loading),
  ['eager', 'eager', 'lazy'],
  'as duas primeiras fotos sem atraso e a terceira lazy'
);
for (const date of ['>09/10, Guia<', '>08/10, Guia<', '>01/09, Guia<']) {
  assert.ok(newRow.includes(date), `data DD/MM ${date}`);
}
assert.ok(!newRow.includes('>Novo</span>'), 'selo Novo nas Novidades');
assert.ok(!newRow.includes('data-reveal'), 'o servidor não esconde a seção');

// Setas: no HTML do servidor o contêiner é `hidden` e não tem `md:flex` (só aparece com o transbordo
// medido no navegador); as duas setas têm nome. Confere pelas classes, não pela ordem delas.
const arrows = [...newRow.matchAll(/<div class="([^"]*)">((?:(?!<div|<\/div>)[\s\S])*)<\/div>/g)].find(([, , inner]) =>
  inner.includes('aria-label="Ver novidades anteriores"')
);
assert.ok(arrows, 'contêiner das setas');
const arrowClasses = arrows[1].split(/\s+/);
assert.ok(arrowClasses.includes('hidden'), 'setas escondidas no HTML do servidor');
assert.ok(!arrowClasses.includes('md:flex'), 'setas sem md:flex até a fila transbordar');
assert.ok(arrows[2].includes('aria-label="Ver próximas novidades"'), 'as duas setas no mesmo contêiner');

// Sem artigo "Novo", a seção não existe.
assert.equal(render(createElement(ReviewsNewRow, { articles: [] })), '');

// Bolinhas: título, uma por loja na ordem dos dados (com duas lojas, a ordem invertida inverte os links);
// sem loja, a seção não existe.
const twoStoresHub = getReviewsHubContent(twoStores, fixtureStores);
assert.deepEqual(slugs(twoStoresHub.stores), ['damie', 'magalu', 'outros'], 'DAMIE e Magalu têm subpágina, e a Outros fecha a fila');
const strip = render(
  createElement(ReviewsStoreStrip, { id: 'titulo-por-loja', title: 'Por loja', stores: twoStoresHub.stores, placement: 'reviews_stores' })
);
assert.ok(strip.includes('aria-labelledby="titulo-por-loja"'));
assert.match(strip, /<span class="marca-texto">Por loja<\/span>/);
const stripSlugs = (html: string) => [...html.matchAll(/href="\/reviews\/(?:loja\/)?([^"]+)"/g)].map(([, slug]) => slug);
assert.deepEqual(stripSlugs(strip), ['damie', 'magalu', 'outros']);
assert.deepEqual([...strip.matchAll(/--i:(\d+)/g)].map(([, position]) => Number(position)), [0, 1, 2]);
const reversedStrip = render(
  createElement(ReviewsStoreStrip, {
    id: 'titulo-por-loja',
    title: 'Por loja',
    stores: [...twoStoresHub.stores].reverse(),
    placement: 'reviews_stores',
  })
);
assert.deepEqual(stripSlugs(reversedStrip), ['outros', 'magalu', 'damie']);
// A fila das bolinhas é um ScrollRow (com o foco do teclado, a bolinha meio escondida entra inteira). O
// HTML do servidor é o mesmo de um <ul> comum, então não prova nada: a prova está na árvore de elementos,
// que o componente (sem hooks) devolve quando chamado como função.
function containsType(node: unknown, type: unknown): boolean {
  if (Array.isArray(node)) return node.some((child) => containsType(child, type));
  if (typeof node !== 'object' || node === null || !('type' in node) || !('props' in node)) return false;
  const { type: nodeType, props } = node as ReactElement<{ children?: unknown }>;
  return nodeType === type || containsType(props.children, type);
}
assert.ok(
  containsType(
    ReviewsStoreStrip({ id: 'titulo-por-loja', title: 'Por loja', stores: twoStoresHub.stores, placement: 'reviews_stores' }),
    ScrollRow
  ),
  'a fila das bolinhas é um ScrollRow'
);
assert.equal(
  render(createElement(ReviewsStoreStrip, { id: 'titulo-outras-lojas', title: 'Outras lojas', stores: [], placement: 'store_other_stores' })),
  ''
);

// A estante como o servidor a entrega: "Todos", "Mais novos", grade, os 12 primeiros na ordem, a busca
// com rótulo, as categorias, o total, a vitrine e o "Carregar mais"; nenhum nome de transição no HTML.
const big = getReviewsHubContent([...fixture, ...magaluArticles(13)], fixtureStores);
assert.equal(big.articles.length, 22);
const shelfHtml = render(
  createElement(ReviewsBrowser, {
    articles: big.articles,
    categories: big.categories,
    listPath: '/reviews',
    placementPrefix: 'reviews',
    showStore: true,
    heading: 'Todos os artigos',
    headingVisible: true,
    search: { label: 'Buscar nos guias e análises', placeholder: 'Buscar guia, produto ou loja', scope: 'site' },
    hero: createElement('h1', null, 'Guias & Análises'),
    showcase: createElement('p', { id: 'vitrine' }, 'vitrine'),
    footer: createElement('p', { id: 'rodape-estante' }, 'aviso'),
  })
);
const shelfList = shelfHtml.slice(shelfHtml.indexOf('<ul data-estante="grade"'));
assert.ok(shelfHtml.includes('<ul data-estante="grade"'), 'estante em grade');
assert.deepEqual(
  [...shelfList.slice(0, shelfList.indexOf('</ul>')).matchAll(/href="\/reviews\/([^"/]+)"/g)].map(([, slug]) => slug),
  slugs(big.articles.slice(0, GRID_PAGE_SIZE)),
  'os 12 primeiros, do mais novo'
);
assert.equal(shelfHtml.match(/class="estante-item /g)?.length, GRID_PAGE_SIZE);
assert.ok(shelfHtml.includes('Carregar mais'));
assert.ok(shelfHtml.includes('role="search"'));
assert.ok(shelfHtml.includes('<label for="busca-estante" class="sr-only">Buscar nos guias e análises</label>'));
assert.ok(shelfHtml.includes('id="vitrine"'), 'vitrine sem busca');
assert.ok(shelfHtml.includes('id="rodape-estante"'));
assert.match(shelfHtml, /<span class="marca-texto">Todos os artigos<\/span>/);
assert.ok(shelfHtml.includes('>22 artigos<'));
const chipsHtml = shelfHtml.slice(shelfHtml.indexOf('data-categorias="true"'));
assert.equal(chipsHtml.slice(0, chipsHtml.indexOf('</div>')).match(/aria-pressed=/g)?.length, big.categories.length + 1);
assert.match(shelfHtml, /<button[^>]*aria-pressed="true"[^>]*>Todos<\/button>/);
assert.match(shelfHtml, /<option value="novos" selected="">Mais novos<\/option>/);
// Cada item leva a variável do próprio nome de transição, e os nomes não se repetem (nome repetido aborta
// a transição).
const vtNames = [...shelfHtml.matchAll(/--vt:(estante-[a-z0-9-]+)/g)].map(([, name]) => name);
assert.equal(vtNames.length, GRID_PAGE_SIZE, 'uma variável --vt por item');
assert.equal(new Set(vtNames).size, GRID_PAGE_SIZE, 'nomes de transição diferentes');
assert.deepEqual(
  vtNames,
  big.articles.slice(0, GRID_PAGE_SIZE).map(({ slug }) => `estante-${sanitizeViewTransitionName(slug)}`),
  'o nome vem do slug de cada item'
);
assert.ok(vtNames.includes('estante-poltrona-damie'));
assert.ok(!shelfHtml.includes('view-transition-name'), 'nome de transição no HTML');
// Sem JavaScript, o Enter envia o formulário para a própria lista com ?q=.
const searchForm = shelfHtml.match(/<form[^>]*role="search"[^>]*>/)?.[0] ?? '';
assert.match(searchForm, /action="\/reviews"/, 'a busca envia para a lista');
assert.match(shelfHtml, /<input[^>]*id="busca-estante"[^>]*name="q"|<input[^>]*name="q"[^>]*id="busca-estante"/, 'campo com name=q');
// A barra de controles quebra linha no celular: o total na própria linha, os controles na seguinte.
const totalTag = shelfHtml.match(/<p[^>]*aria-live="polite"[^>]*>22 artigos<\/p>/)?.[0] ?? '';
assert.match(totalTag, /class="[^"]*\bw-full\b[^"]*\bmd:w-auto\b/, 'total na própria linha no celular');
assert.match(shelfHtml, /class="[^"]*\bflex-wrap\b[^"]*"[^>]*><label for="ordem-estante"/, 'controles que quebram linha');
assert.ok(!shelfHtml.includes('Nenhum artigo com'));

// Na subpágina: sem busca, título só para leitor de tela, sem botões com uma categoria só e sem "Carregar
// mais" com até 12 artigos.
const storeShelf = render(
  createElement(ReviewsBrowser, {
    articles: magalu.articles.filter(({ category }) => category === 'cupons-como-usar'),
    categories: [{ value: 'cupons-como-usar', label: 'Cupons & como usar' }],
    listPath: '/reviews/loja/magalu',
    placementPrefix: 'store',
    showStore: false,
    heading: 'Lista de artigos',
    headingVisible: false,
    search: null,
    hero: createElement('h1', null, 'Artigos do Magalu'),
  })
);
assert.ok(!storeShelf.includes('role="search"'));
// O título da estante é o alvo do foco programático (Enter no celular, "Buscar em todas as categorias"):
// tabindex -1 e sem anel.
const storeTitle = storeShelf.match(/<h2[^>]*id="titulo-estante"[^>]*>Lista de artigos<\/h2>/)?.[0] ?? '';
assert.match(storeTitle, /class="sr-only\b[^"]*"/, 'título só para leitor de tela na subpágina');
assert.match(storeTitle, /tabindex="-1"/, 'título focável por código');
assert.match(storeTitle, /class="[^"]*\bfocus:outline-none\b/, 'sem anel no foco programático');
const shelfTitle = shelfHtml.match(/<h2[^>]*id="titulo-estante"[^>]*>/)?.[0] ?? '';
assert.match(shelfTitle, /tabindex="-1"/);
assert.match(shelfTitle, /class="[^"]*\bfocus:outline-none\b/);
assert.ok(!storeShelf.includes('data-categorias'));
assert.ok(!storeShelf.includes('Carregar mais'));
assert.ok(storeShelf.includes('>3 artigos<'));
assert.ok(!/<form/.test(storeShelf), 'subpágina sem formulário de busca');

// Regras que o componente aplica no navegador, em funções puras.
// "Carregar mais" não volta aberto: a página aberta vale só para a query em que foi aberta, e A → B → A
// recomeça na primeira página, sem a cascata do "Carregar mais" (newFrom).
const openedOnA = { key: '', visible: 36, newFrom: 24 };
assert.equal(settlePage(openedOnA, ''), openedOnA, 'mesma query: a página aberta fica');
const onB = settlePage(openedOnA, '?categoria=cupons-como-usar');
assert.deepEqual(onB, firstPage('?categoria=cupons-como-usar'));
assert.deepEqual(settlePage(onB, ''), { key: '', visible: GRID_PAGE_SIZE, newFrom: -1 }, 'voltar a A mostra a primeira página');
assert.deepEqual(firstPage('?q=a'), { key: '?q=a', visible: GRID_PAGE_SIZE, newFrom: -1 });

// O rascunho do campo ({ text, base }: o texto e o q da URL de quando a pessoa digitou). A gravação da busca
// leva a base para o q gravado, e Voltar/Avançar passam a mostrar o q da URL; Esc e uma letra rápida
// seguem o mesmo caminho da digitação.
const typed = (text: string, urlQ: string): SearchDraft => ({ text, base: urlQ });
// Busca seguida de Voltar: digita "sono" em /reviews?categoria=a (q ''), a gravação entra com replace e
// Voltar leva a uma entrada com q ''.
let draft = typed('sono', '');
assert.equal(draftValue(draft, ''), 'sono', 'enquanto digita, o campo é o rascunho');
assert.equal(isSearchWriteDue(draft, ''), true);
draft = rebaseDraft(draft, 'sono');
assert.deepEqual(draft, { text: 'sono', base: 'sono' });
assert.equal(draftValue(draft, 'sono'), 'sono');
assert.equal(isSearchWriteDue(draft, 'sono'), false, 'gravado: nada a gravar');
assert.equal(draftValue(draft, ''), '', 'Voltar mostra o q da URL, não a busca de volta');
assert.equal(isSearchWriteDue(draft, ''), false, 'e não regrava a busca na entrada antiga');
assert.equal(draftValue(draft, 'sono'), 'sono', 'Avançar volta à busca');
// Esc: o rascunho vai a '' e o mesmo caminho grava; uma letra antes do callback troca o rascunho e o campo
// segue com a letra (a base ainda é o q velho, então o campo não cai para a URL).
draft = rebaseDraft(typed('abc', ''), 'abc');
draft = typed('', 'abc');
assert.equal(isSearchWriteDue(draft, 'abc'), true, 'limpar também precisa de gravação');
assert.equal(searchWriteDelay(draft.text), 0, 'campo vazio grava na hora');
draft = typed('x', 'abc');
assert.equal(draftValue(draft, 'abc'), 'x', 'a letra rápida fica no campo');
assert.equal(isSearchWriteDue(draft, 'abc'), true);
assert.equal(searchWriteDelay(draft.text), SEARCH_WRITE_DELAY_MS);
draft = rebaseDraft(draft, 'x');
assert.equal(draftValue(draft, 'x'), 'x');
// a, b, c rápido, a transição no meio: a gravação de "a" é descartada (stale no efeito) e o campo segue com
// "ab" até a de "ab" entrar; "c" parte da base nova.
draft = typed('ab', '');
assert.equal(draftValue(draft, ''), 'ab');
draft = rebaseDraft(draft, 'ab');
draft = typed('abc', 'ab');
assert.equal(draftValue(draft, 'ab'), 'abc');
assert.equal(isSearchWriteDue(draft, 'ab'), true);
// Espaços nas pontas não pedem gravação nova.
assert.equal(isSearchWriteDue(typed('abc ', 'abc'), 'abc'), false);
assert.equal(isSearchWriteDue(typed(' ', ''), ''), false);
// Voltar menos de 120 ms depois de uma tecla (E0 e E1 com q ''): o rascunho "sono" ainda espera a gravação e
// o q da URL não muda, então nada o descartaria. O popstate troca o rascunho por um novo, em dia com a
// entrada: nada a gravar e o campo mostra o q dela.
draft = typed('sono', '');
assert.equal(isSearchWriteDue(draft, ''), true, 'antes do Voltar: gravação pendente');
draft = freshDraft('');
assert.deepEqual(draft, { text: '', base: '' });
assert.equal(isSearchWriteDue(draft, ''), false, 'depois do Voltar: nada a gravar na entrada antiga');
assert.equal(draftValue(draft, ''), '');
assert.equal(isSearchWriteDue(freshDraft('sono'), 'sono'), false);
// Um texto que não sobrevive à URL (surrogate solto vira U+FFFD) não pode fazer o efeito gravar em laço: a
// segunda gravação devolve o mesmo rascunho, o setDraft não re-renderiza e o efeito não roda de novo.
const loose = typed('\ud800', '');
const looseQ = readShelfQuery(withShelfQuery('', query({ q: loose.text })), ALL, true).q;
assert.notEqual(looseQ, loose.text, 'o surrogate solto não sobrevive à URL');
const looseRebased = rebaseDraft(loose, looseQ);
assert.deepEqual(looseRebased, { text: loose.text, base: looseQ });
assert.equal(rebaseDraft(looseRebased, looseQ), looseRebased, 'mesma base: mesma referência');
assert.equal(rebaseDraft(draft, ''), draft, 'rebase sem mudança devolve o próprio rascunho');

// Sem campo de busca (subpágina), o ?q= digitado à mão na URL é ignorado; categoria e ordem continuam.
assert.equal(readShelfQuery('?q=poltrona', ALL, true).q, 'poltrona');
assert.equal(readShelfQuery('?q=poltrona', ALL, false).q, '', 'sem busca, o q da URL não filtra');
assert.deepEqual(
  readShelfQuery('?q=poltrona&categoria=cupons-como-usar&ordem=az', ALL, false),
  { q: '', category: 'cupons-como-usar', order: 'az' }
);
assert.equal(shelfSearch(readShelfQuery('?q=poltrona&ordem=az', ALL, false)), '?ordem=az', 'o q some da URL na próxima troca');

// O ✕ e o Esc só valem com texto de verdade; busca só com espaço não fica na URL nem vira filtro.
assert.equal(hasSearchText(''), false);
assert.equal(hasSearchText('   '), false);
assert.equal(hasSearchText(' poltrona '), true);
assert.equal(withShelfQuery('?utm_source=ig', query({ q: '   ' })), '?utm_source=ig', 'espaços não vão para a URL');
assert.equal(withShelfQuery('?q=poltrona&utm_source=ig', query({ q: '   ' })), '?utm_source=ig');

// Depois de uma navegação no cliente, o primeiro quadro ainda vê o endereço da página anterior: o que
// vale é só a query string da própria lista.
assert.equal(urlSearchOf('/reviews', { pathname: '/reviews', search: '?q=sono' }), '?q=sono');
assert.equal(urlSearchOf('/reviews/loja/magalu', { pathname: '/reviews', search: '?q=sono' }), '', 'outra página: nada');
assert.equal(urlSearchOf('/reviews', { pathname: '/reviews/loja/magalu', search: '?ordem=az' }), '');

// Voltar ou Avançar que sai da lista troca a URL com a estante ainda na tela: fora da lista ela não troca o
// rascunho, não grava a busca (que iria para a outra rota, como /?q=…) nem a página aberta.
assert.equal(isOnList('/reviews', '/reviews'), true);
assert.equal(isOnList('/reviews', '/'), false, 'Voltar para a home');
assert.equal(isOnList('/reviews/loja/magalu', '/reviews/loja/magalu'), true);
assert.equal(isOnList('/reviews/loja/magalu', '/reviews/poltrona-de-amamentacao-como-escolher'), false, 'da subpágina para um artigo');
assert.equal(isOnList('/reviews', '/reviews/loja/magalu'), false, 'de /reviews para uma subpágina');
assert.equal(isOnList('/reviews/loja/magalu', '/reviews'), false);

console.log(
  `✅ reviewsHub: estante de ${real.articles.length} artigos, ${real.newArticles.length} novidades, ${getStoreArticlePageSlugs(publishedReviews).length} lojas com subpágina, a Outros, busca, ordem, URL e medição passaram.`
);
