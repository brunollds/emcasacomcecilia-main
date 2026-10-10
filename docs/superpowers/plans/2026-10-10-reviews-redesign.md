# /reviews e as subpáginas das lojas (D2.2) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refazer `/reviews` no layout A da D2 (topo com busca, Novidades, bolinhas das lojas e a estante com categorias, ordem "Mais novos" ou "A–Z", grade ou lista e 12 cartões antes do "Carregar mais") e levar a mesma estante às subpáginas `/reviews/loja/<loja>`, com a trilha visível e "Outras lojas".

**Architecture:** Os dados saem prontos do servidor por `src/lib/reviewsHub.ts`, que não importa `@/lib/data`. As regras que o navegador também usa (busca, ordem, URL, tamanhos de página, medição) ficam em `src/lib/reviewsShelf.ts`, sem dados. Os componentes de `src/components/reviews/` desenham; o `ReviewsBrowser` (cliente) guarda a busca, a categoria e a ordem na URL e anima a troca da lista com a View Transitions API. As peças que a home já tem (ímã dos cartões, inclinação das bolinhas, fila com setas) viram módulos comuns, sem mudança visível na home.

**Tech Stack:** Next.js 16.1.4 App Router (SSR na Hostinger), React 19, TypeScript 5.9, Tailwind CSS v4, `lucide-react`, testes em `tsx` com `node:assert/strict` e `react-dom/server`.

**Spec:** `docs/superpowers/specs/2026-10-10-reviews-redesign-design.md` (commit `bea0e5d`)

## Global Constraints

- **Onde trabalhar.** Worktree `C:\Users\Bruno\Downloads\Emcasacomcecilia\emcasacomcecilia\.claude\worktrees\inspiring-curie-d32d66`, branch `claude/home-d2-2`. Nunca ler nem editar o checkout principal (`C:\Users\Bruno\Downloads\Emcasacomcecilia\emcasacomcecilia` sem `.claude\worktrees\…`). Sem push.
- **Tamanho e higiene dos commits.**
  - Cada commit toca no máximo 5 arquivos (arquivo apagado conta).
  - Staging só por caminho explícito: nunca `git add -A` nem `git add .`.
  - Nunca `--no-verify` nem `git stash` sem tag.
- **Mensagem de commit.** Formato `<tipo>: <descrição em português>`, uma linha em branco e `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- **Comandos.** No Bash, todo `npm`, `npx`, `node` e `tsx` roda com `< /dev/null`.
- **Antes de cada commit:**
  - `npm run typecheck < /dev/null`;
  - `npx eslint <arquivos tocados> --quiet < /dev/null`;
  - os testes da task.

  Nada é dado como pronto com erro em aberto.
- **Build completo** (`npm run build`) só com o servidor de desenvolvimento parado. Depois dele, se `git status` mostrar `src/lib/generated/content-index.ts` modificado só por fim de linha (`git diff --stat` sem linhas reais), restaure com `git checkout -- src/lib/generated/content-index.ts`.
- **Oferta da YesStyle.** O 1010VIBES vence em 12/10/2026 e o `validate:yesstyle` derruba a build a partir das 21h (BRT) desse dia. Se a build parar nele, pare a task e avise: atualizar a oferta é decisão do Bruno.
- **Fora do escopo.** Não mexer em `/cupons/*`, `src/lib/couponsData.ts`, `src/lib/couponTranslations.ts`, `data/coupons/yesstyle.json` nem em `/<locale>/reviews` (`LocalizedReviewHub`). Nunca abrir, clicar nem buscar link de afiliado.
- **Componentes cliente.** Arquivo `'use client'` não importa valores de `@/lib/data`, de `@/lib/reviewsHub`, de `@/lib/homeStores` nem de `@/lib/couponsData` (só `import type`). As regras que o cliente usa vêm de `@/lib/reviewsShelf`.
- **Movimento.**
  - Todo movimento fica dentro de `prefers-reduced-motion: no-preference`: as classes do `globals.css` (`.revela` com `--i`, `.marca-texto`, `.bolinha*`, e as novas `.marca-texto-entra`, `.estante-entra`, `.carimbo-assenta`, `[data-trocando] .estante-item`) e os utilitários `motion-safe:`.
  - O HTML do servidor não leva `data-reveal` nem `view-transition-name`.
  - Nunca escrever `@media (width < X) and (…)` nem `@media not … and …`.
  - Animações mexem só em `opacity`, `transform`/`translate`/`scale`/`rotate`, `box-shadow` e `background-size`.
- **CECILIA010.** É código de recompensa: nenhum texto, `alt` ou `aria-label` o chama de cupom.
- **Textos.** As páginas são só em português; os textos ficam nos módulos indicados em cada task (`reviewsShelf.ts`, `reviewsHub.ts` ou o próprio componente), em português, sem mistura de inglês na interface.
- **`setState` em efeito** só por uma função local chamada dentro do efeito (o padrão do `OfferCarousel`); o lint `react-hooks/set-state-in-effect` está ligado como erro.

## Review Focus

1. **Busca com caracteres que pesam em URL e HTML** (`&`, `%`, `+`, aspas, `<`): o filtro trata tudo como texto, a URL vai e volta sem perder nada nem os outros parâmetros (`utm_*`), e o link "Buscar no site todo" sai codificado. Testes na Task 1 (`shelfSearch`, `withShelfQuery`, `siteSearchHref`, `getEmptySearchAction`).
2. **Parâmetros desconhecidos ou velhos na URL** (`?categoria=inexistente`, categoria que a loja não tem, `?ordem=xyz`, `?q=` vazio): a estante cai nos padrões sem quebrar. Teste na Task 1 (`parseShelfQuery`).
3. **Busca só com espaço, com acento ou em maiúsculas:** "   " não é busca (a vitrine fica), "POLTRONA reclinavel" acha "Poltrona reclinável". Testes na Task 1 (`searchWords`, `isSearching`, `filterShelf`).
4. **Ordem A–Z com títulos que começam por número, acento ou minúscula, e empate de data:** "2 dicas" antes de "10 dicas", "abacate" antes de "Água", desempate estável. Testes na Task 1 (`sortShelf`).
5. **Limites:** loja com 12 e com 13 artigos (busca e "Carregar mais"), nenhum artigo "Novo" (sem Novidades), loja com uma categoria só (sem os botões). Testes nas Tasks 1, 4 e 5.

## Mapa dos arquivos

| Arquivo | Responsabilidade | Task |
|---|---|---|
| `src/lib/reviewsShelf.ts` (novo) | Tipos da estante, tamanhos de página, busca normalizada, ordem, URL, textos da busca vazia e parâmetros da medição. Sem dados. | 1 |
| `src/lib/reviewsHub.ts` (novo) | Monta no servidor os artigos, as Novidades, as bolinhas, as categorias presentes, a imagem de compartilhamento e o conteúdo da subpágina. | 1 |
| `scripts/test-reviews-hub.ts` (novo) | Testes das regras e dos componentes da estante. | 1, 3, 4, 5 |
| `package.json` | `test:reviews-hub` e o teste na cadeia do `build`. | 1 |
| `src/components/ui/cardDecor.ts` (novo) | Ímã e inclinação dos cartões de geladeira (sai do `HomeLatest.tsx`). | 2 |
| `src/components/sections/HomeLatest.tsx`, `LocaleHomeSections.tsx` | Passam a importar o `cardDecor`. | 2 |
| `src/components/ui/useBubbleTilt.ts` (novo) | A inclinação das bolinhas com o mouse (sai do `HomeStoreStrip.tsx`). | 2 |
| `src/components/sections/HomeStoreStrip.tsx` | Usa o hook; o `StoreMark` aceita só logo e iniciais. | 2 |
| `src/components/ui/useRowScroll.ts` (novo) | Fila com setas: transbordo, borda direita, passo das setas e a classe das setas (sai do `OfferCarousel.tsx`). | 2 |
| `src/components/sections/OfferCarousel.tsx` | Usa o hook. | 2 |
| `src/components/reviews/TrackedReviewsLink.tsx` (novo) | Link medido com `reviews_route_click`. | 3 |
| `src/components/reviews/StoreBubbleLink.tsx` (novo) | A bolinha da loja como link. | 3 |
| `src/components/reviews/ReviewShelfCard.tsx` (novo) | O cartão (grade e Novidades) e a linha (lista). | 3 |
| `src/components/ViewTransitionLink.tsx` | Aplica o nome da foto (`data-vt-name`) só no clique. | 3 |
| `src/components/reviews/shelfClasses.ts` (novo) | Contêiner e título das seções da estante. | 4 |
| `src/components/reviews/ReviewsNewRow.tsx` (novo) | A faixa das Novidades. | 4 |
| `src/components/reviews/ReviewsStoreStrip.tsx` (novo) | "Por loja" e "Outras lojas". | 4 |
| `src/components/reviews/ReviewsBrowser.tsx` (novo) | A estante: busca, categorias, ordem, grade ou lista, "Carregar mais", URL, memória e transições. | 5 |
| `src/app/globals.css` | Animações novas e a troca da estante. | 5 |
| `src/app/(pt)/reviews/page.tsx` (novo; apaga `page.js` e `ReviewsClientPage.js`) | A página `/reviews`. | 6 |
| `scripts/test-build-output.ts` | Travas no HTML gerado de `/reviews` (Task 6) e das subpáginas (Task 7). | 6, 7 |
| `src/app/(pt)/reviews/loja/[brand]/page.tsx` (apaga `ReviewHubCard.tsx`) | A subpágina da loja. | 7 |
| `CLAUDE.md`, `docs/GUIA-EDITORIAL-GUIAS-ANALISES.md` | Documentação. | 8 |

As 6 etapas da spec viram 8 tasks: a etapa 2 ("peças visuais") passou do limite de 5 arquivos por commit e foi dividida nas Tasks 2, 3 e 4.

**Decisões do plano sobre pontos que a spec deixou em aberto:**
- **Imagem de compartilhamento de `/reviews`:** a capa do artigo mais novo **num formato que o cartão do X mostra** (JPG, PNG, WebP ou GIF), senão o logo do site. Dois artigos em português têm capa AVIF, e o `assertShareImage` do `test:build-output` barra AVIF.
- **Fotos sem atraso:** `loading="eager"` com `fetchPriority="high"`, como o `CeciliaPhotoCard` (o `priority` do `next/image` está obsoleto no Next 16).
- **Outros parâmetros da URL** (como `utm_source`) ficam quando a estante troca busca, categoria ou ordem (`withShelfQuery`).
- **Fila com setas:** o `OfferCarousel` da home passa a usar o mesmo hook das Novidades, sem mudança visível.
- **`alt` da foto:** vazio, como no `LatestCard` da home. A spec lista um `alt` no `ShelfArticle`, mas o título do artigo já dá nome ao link, e o `alt` com o título (o do `ReviewHubCard`) fazia o leitor de tela ler o título duas vezes. O `ShelfArticle` fica sem o campo, e sem o slug da loja, que nenhuma tela usa.
- **Selo "Novo":** só nos cartões e linhas do acervo. Nas Novidades todos os cartões seriam "Novo", e a tela da parte 1 não mostra o selo ali.
- **Busca no site todo:** o link sai `/buscar?q=air+fryer` (`URLSearchParams`); o `/buscar` lê o `q` pelo `searchParams` do Next, que trata `+` e `%20` do mesmo jeito.
- **"Nenhum `review-hero-` no HTML"** (spec, Testes) vira: nenhum `view-transition-name` no HTML, e todo `review-hero-` só dentro de um `data-vt-name`, que não liga transição nenhuma.

---

### Task 1: Dados e regras da estante

**Files:**
- Create: `src/lib/reviewsShelf.ts`
- Create: `src/lib/reviewsHub.ts`
- Create: `scripts/test-reviews-hub.ts`
- Modify: `package.json` (scripts `test:reviews-hub` e `build`)

**Interfaces:**
- Consumes: `getActiveCoupons`, `type Coupon` (`@/lib/couponsData`); `getStoreArticlePageSlugs`, `getStoreArticlesPage`, `getStoreArticlesPath`, `ofStore`, `type StoreReview` (`@/lib/homeStores`); `SITE_SOCIAL_IMAGE`, `absoluteMediaUrl`, `type SocialImage` (`@/lib/pageSeo`); `REVIEW_CATEGORIES`, `getListedPortugueseReviews`, `parseReviewCategory`, `sortReviewsByPublishedAt`, `type ReviewCategory` (`@/lib/reviewDiscovery`); `resolveMediaUrl` (`@/lib/resolve-media.mjs`).
- Produces (`@/lib/reviewsShelf`):
  - tipos `ShelfArticle`, `ShelfCategory`, `ShelfStore`, `ShelfOrder` (`'novos' | 'az'`), `ShelfView` (`'grade' | 'lista'`), `ShelfQuery` (`{ q: string; category: ReviewCategory | null; order: ShelfOrder }`), `ShelfSearch` (`{ label; placeholder; scope: 'site' | 'reviews' }`), `ShelfPlacement`, `EmptySearchAction`;
  - `GRID_PAGE_SIZE` (12), `LIST_PAGE_SIZE` (24), `pageSizeOf(view)`, `visibleAfterViewChange(visible, view)`;
  - `foldSearchText(text)`, `searchWords(query)`, `isSearching(query)`, `sortShelf(articles, order)`, `filterShelf(articles, query)`;
  - `parseShelfQuery(search, categories)`, `shelfSearch(query)`, `withShelfQuery(currentSearch, next)`, `siteSearchHref(q)`, `reviewsSearchHref(q)`;
  - `countLabel(total)`, `resultsLabel(total, q)`, `emptySearchMessage(q)`, `getEmptySearchAction(q, scope, category)`;
  - `REVIEWS_ROUTE_CLICK`, `SHELF_CONTROL_EVENT`, `SHELF_SEARCH_EVENT`, `SEARCH_EVENT_DELAY_MS`, `shelfPlacement(prefix, view)`, `getReviewsRouteClickParameters`, `getShelfSearchParameters`, `getShelfControlParameters`, `shouldTrackSearch(q, lastTracked)`.
- Produces (`@/lib/reviewsHub`): `type HubReview`, `type ReviewsHubContent`, `type StoreShelfContent`, `REVIEWS_TRAIL_ROOT`, `STORE_SEARCH_THRESHOLD`, `getReviewsHubContent(reviews, stores?)`, `getStoreShelfContent(reviews, slug, stores?)`.

- [ ] **Step 1: Escrever o teste (falha porque os módulos não existem)**

Crie `scripts/test-reviews-hub.ts`:

```ts
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
```

- [ ] **Step 2: Rodar o teste e ver falhar**

Run: `npx tsx scripts/test-reviews-hub.ts < /dev/null`
Expected: FAIL com `Cannot find module '@/lib/reviewsHub'` (ou `reviewsShelf`).

- [ ] **Step 3: Criar `src/lib/reviewsShelf.ts`**

```ts
import { parseReviewCategory, type ReviewCategory } from './reviewDiscovery';

// A estante de artigos de /reviews e das subpáginas de loja: o que vale no servidor e no navegador
// (tipos, tamanhos de página, busca, ordem, endereço, textos da busca e medição). Não importa dados: o
// componente cliente usa daqui, e os artigos chegam prontos de reviewsHub.ts, que fica no servidor.

export type ShelfArticle = {
  id: number;
  slug: string;
  href: string;
  title: string;
  type: string;
  category: ReviewCategory;
  publishedAtISO: string;
  // DD/MM nas Novidades; DD/MM/AAAA no acervo, que atravessa anos.
  dayMonth: string;
  fullDate: string;
  // Nome da loja, quando o artigo é de uma loja ativa.
  store?: string;
  // URL de entrega, já resolvida.
  image?: string;
  imageFit: 'cover' | 'contain';
  imagePosition?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  isNew: boolean;
  // Texto de busca já normalizado (foldSearchText).
  searchText: string;
};

export type ShelfCategory = { value: ReviewCategory; label: string };

export type ShelfStore = {
  slug: string;
  brand: string;
  // URL de entrega do logo; sem ele, a bolinha mostra as iniciais.
  logo?: string;
  initials: string;
  total: number;
  href: string;
  countLabel: string;
};

export type ShelfOrder = 'novos' | 'az';
export type ShelfView = 'grade' | 'lista';
export type ShelfQuery = { q: string; category: ReviewCategory | null; order: ShelfOrder };

export type ShelfSearch = {
  label: string;
  placeholder: string;
  // Para onde a busca sem resultado leva: o site todo (/buscar) ou todos os guias e análises.
  scope: 'site' | 'reviews';
};

export const GRID_PAGE_SIZE = 12;
export const LIST_PAGE_SIZE = 24;

export function pageSizeOf(view: ShelfView): number {
  return view === 'lista' ? LIST_PAGE_SIZE : GRID_PAGE_SIZE;
}

// Na troca de modo a pessoa não perde o ponto: fica a maior entre a quantidade aberta e a primeira
// página do modo novo.
export function visibleAfterViewChange(visible: number, view: ShelfView): number {
  return Math.max(visible, pageSizeOf(view));
}

export function foldSearchText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

export function searchWords(query: string): string[] {
  const folded = foldSearchText(query);
  return folded ? folded.split(' ') : [];
}

export function isSearching(query: ShelfQuery): boolean {
  return searchWords(query.q).length > 0;
}

const titleCollator = new Intl.Collator('pt-BR', { sensitivity: 'base', numeric: true });

function newestFirst(left: ShelfArticle, right: ShelfArticle): number {
  return right.publishedAtISO.localeCompare(left.publishedAtISO) || right.id - left.id;
}

function byTitle(left: ShelfArticle, right: ShelfArticle): number {
  return titleCollator.compare(left.title, right.title) || newestFirst(left, right);
}

export function sortShelf(articles: readonly ShelfArticle[], order: ShelfOrder): ShelfArticle[] {
  return [...articles].sort(order === 'az' ? byTitle : newestFirst);
}

// O artigo entra se for da categoria escolhida e tiver todas as palavras da busca.
export function filterShelf(articles: readonly ShelfArticle[], query: ShelfQuery): ShelfArticle[] {
  const words = searchWords(query.q);
  return sortShelf(
    articles.filter(
      (article) =>
        (!query.category || article.category === query.category) &&
        words.every((word) => article.searchText.includes(word))
    ),
    query.order
  );
}

const SHELF_PARAMS = ['q', 'categoria', 'ordem'];

// Categoria que a página não tem (a loja não tem artigo nela) vale como "Todos".
export function parseShelfQuery(search: string, categories: readonly ReviewCategory[]): ShelfQuery {
  const params = new URLSearchParams(search);
  const category = parseReviewCategory(params.get('categoria'));
  return {
    q: params.get('q') ?? '',
    category: category && categories.includes(category) ? category : null,
    order: params.get('ordem') === 'az' ? 'az' : 'novos',
  };
}

// A query string da estante: a busca como foi digitada (sem ela quando só tem espaço), a categoria e a
// ordem, só quando não é a padrão.
export function shelfSearch(query: ShelfQuery): string {
  const params = new URLSearchParams();
  if (query.q.trim()) params.set('q', query.q);
  if (query.category) params.set('categoria', query.category);
  if (query.order === 'az') params.set('ordem', 'az');
  const text = params.toString();
  return text ? `?${text}` : '';
}

// A query string nova da página: troca só os parâmetros da estante e mantém os outros (utm_*, por
// exemplo).
export function withShelfQuery(currentSearch: string, next: ShelfQuery): string {
  const params = new URLSearchParams(currentSearch);
  for (const key of SHELF_PARAMS) params.delete(key);
  new URLSearchParams(shelfSearch(next)).forEach((value, key) => params.set(key, value));
  const text = params.toString();
  return text ? `?${text}` : '';
}

export function siteSearchHref(q: string): string {
  return `/buscar?${new URLSearchParams({ q: q.trim() })}`;
}

export function reviewsSearchHref(q: string): string {
  return `/reviews?${new URLSearchParams({ q: q.trim() })}`;
}

export function countLabel(total: number): string {
  return total === 1 ? '1 artigo' : `${total} artigos`;
}

export function resultsLabel(total: number, q: string): string {
  const term = q.trim();
  return term ? `${countLabel(total)} com “${term}”` : countLabel(total);
}

export function emptySearchMessage(q: string): string {
  return `Nenhum artigo com “${q.trim()}”.`;
}

export type EmptySearchAction =
  | { kind: 'all-categories'; label: string }
  | { kind: 'link'; href: string; label: string };

// O botão principal da busca sem resultado: com uma categoria marcada, desmarcá-la; senão, buscar o
// mesmo termo num lugar maior.
export function getEmptySearchAction(
  q: string,
  scope: ShelfSearch['scope'],
  category: ReviewCategory | null
): EmptySearchAction {
  if (category) return { kind: 'all-categories', label: 'Buscar em todas as categorias' };
  const term = q.trim();
  return scope === 'reviews'
    ? { kind: 'link', href: reviewsSearchHref(term), label: `Buscar “${term}” em todos os guias e análises` }
    : { kind: 'link', href: siteSearchHref(term), label: `Buscar “${term}” no site todo` };
}

// Medição (GA4). reviews_route_click é o par do home_route_click; a busca usa o evento recomendado
// search, e reviews_list_control registra categoria, ordem e modo.
export type ShelfPlacement =
  | 'reviews_new'
  | 'reviews_stores'
  | 'reviews_grid'
  | 'reviews_list'
  | 'store_grid'
  | 'store_list'
  | 'store_other_stores'
  | 'store_all_reviews';

export const REVIEWS_ROUTE_CLICK = 'reviews_route_click';
export const SHELF_CONTROL_EVENT = 'reviews_list_control';
export const SHELF_SEARCH_EVENT = 'search';
// A busca vai para o Analytics quando a pessoa para de digitar por 1,5 s.
export const SEARCH_EVENT_DELAY_MS = 1500;
const SEARCH_EVENT_MIN_LENGTH = 2;

const SHELF_PLACEMENTS = {
  reviews: { grade: 'reviews_grid', lista: 'reviews_list' },
  store: { grade: 'store_grid', lista: 'store_list' },
} as const;

export function shelfPlacement(prefix: 'reviews' | 'store', view: ShelfView): ShelfPlacement {
  return SHELF_PLACEMENTS[prefix][view];
}

export function getReviewsRouteClickParameters({
  href,
  placement,
  linkLabel,
}: {
  href: string;
  placement: ShelfPlacement;
  linkLabel: string;
}) {
  return { destination: href, placement, link_label: linkLabel };
}

export function getShelfSearchParameters({
  q,
  resultsCount,
  listPath,
}: {
  q: string;
  resultsCount: number;
  listPath: string;
}) {
  return { search_term: q.trim(), results_count: resultsCount, list_path: listPath };
}

export function getShelfControlParameters({
  control,
  value,
  listPath,
}: {
  control: 'category' | 'sort' | 'view';
  value: string;
  listPath: string;
}) {
  return { control, value, list_path: listPath };
}

// Com pelo menos 2 letras e sem repetir o termo anterior (lastTracked já normalizado).
export function shouldTrackSearch(q: string, lastTracked: string | null): boolean {
  const folded = foldSearchText(q);
  return folded.length >= SEARCH_EVENT_MIN_LENGTH && folded !== lastTracked;
}
```

- [ ] **Step 4: Criar `src/lib/reviewsHub.ts`**

```ts
import { getActiveCoupons, type Coupon } from '@/lib/couponsData';
import {
  getStoreArticlePageSlugs,
  getStoreArticlesPage,
  getStoreArticlesPath,
  ofStore,
  type StoreReview,
} from '@/lib/homeStores';
import { SITE_SOCIAL_IMAGE, absoluteMediaUrl, type SocialImage } from '@/lib/pageSeo';
import {
  REVIEW_CATEGORIES,
  getListedPortugueseReviews,
  sortReviewsByPublishedAt,
  type ReviewCategory,
} from '@/lib/reviewDiscovery';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';
import {
  GRID_PAGE_SIZE,
  countLabel,
  foldSearchText,
  type ShelfArticle,
  type ShelfCategory,
  type ShelfSearch,
  type ShelfStore,
} from '@/lib/reviewsShelf';

// Dados de /reviews e das subpáginas /reviews/loja/{slug}, montados no servidor. Recebe as reviews por
// parâmetro e não importa '@/lib/data', como o homeStores.ts; o componente cliente recebe só o resultado.

// Os campos da busca do site (siteSearch.mjs) que o StoreReview não traz.
export type HubReview = StoreReview & {
  productName?: string;
  brand?: string;
  tags?: string[];
  collections?: string[];
};

type ListedReview = HubReview & { category: ReviewCategory; publishedAtISO: string };
type PageLink = { name: string; path: string };

// O começo da trilha das páginas de lista; o JSON-LD acrescenta a própria página.
export const REVIEWS_TRAIL_ROOT: PageLink = { name: 'Início', path: '/' };
const REVIEWS_TRAIL: PageLink[] = [REVIEWS_TRAIL_ROOT, { name: 'Guias & Análises', path: '/reviews' }];

// A subpágina só ganha a busca quando a loja passa de uma página de cartões.
export const STORE_SEARCH_THRESHOLD = GRID_PAGE_SIZE;

// A frase de sempre do topo de /reviews, que não promete experiência própria em todo artigo.
const REVIEWS_INTRO =
  'Guias práticos, experiências reais quando existem e análises baseadas em dados e fontes declaradas.';

// Formatos que o cartão do X mostra (a mesma regra do assertShareImage do test:build-output).
const SHARE_IMAGE_FORMAT = /\.(?:jpe?g|png|webp|gif)$/i;

const CATEGORY_LABELS = new Map<string, string>(REVIEW_CATEGORIES.map(({ value, label }) => [value, label]));

function formatDates(publishedAtISO: string) {
  const [year, month, day] = publishedAtISO.slice(0, 10).split('-');
  return { dayMonth: `${day}/${month}`, fullDate: `${day}/${month}/${year}` };
}

// Os campos da busca do site (siteSearch.mjs), com o rótulo da categoria e o nome da loja.
function searchTextOf(review: ListedReview, store: string | undefined): string {
  return foldSearchText(
    [
      review.title,
      review.description,
      review.type,
      CATEGORY_LABELS.get(review.category),
      review.productName,
      review.brand,
      store,
      ...(review.tags ?? []),
      ...(review.collections ?? []),
    ]
      .filter(Boolean)
      .join(' ')
  );
}

function toShelfArticle(review: ListedReview, stores: readonly Coupon[]): ShelfArticle {
  const store = stores.find(({ slug }) => slug === review.affiliate)?.brand;
  return {
    id: review.id,
    slug: review.slug,
    href: `/reviews/${review.slug}`,
    title: review.title,
    type: review.type,
    category: review.category,
    publishedAtISO: review.publishedAtISO,
    ...formatDates(review.publishedAtISO),
    store,
    image: review.image ? resolveMediaUrl(review.image) : undefined,
    // Foto de produto com nota e sem imageFit não é cortada, como no cartão antigo.
    imageFit: review.imageFit ?? (review.rating ? 'contain' : 'cover'),
    imagePosition: review.imagePosition,
    isNew: Boolean(review.isNew),
    searchText: searchTextOf(review, store),
  };
}

function getPresentCategories(articles: readonly ShelfArticle[]): ShelfCategory[] {
  return REVIEW_CATEGORIES.filter(({ value }) => articles.some((article) => article.category === value)).map(
    ({ value, label }) => ({ value, label })
  );
}

function toShelfStore(store: Coupon, total: number): ShelfStore {
  return {
    slug: store.slug,
    brand: store.brand,
    logo: store.brandLogo ? resolveMediaUrl(store.brandLogo) : undefined,
    initials: store.brandIcon,
    total,
    href: getStoreArticlesPath(store.slug),
    countLabel: countLabel(total),
  };
}

// As lojas com subpágina, na ordem das lojas (a da vitrine da home), com o total de artigos de cada uma.
function getShelfStores(reviews: readonly HubReview[], stores: readonly Coupon[]): ShelfStore[] {
  const listed = getListedPortugueseReviews(reviews);
  const withPage = new Set(getStoreArticlePageSlugs(reviews, stores));
  return stores
    .filter(({ slug }) => withPage.has(slug))
    .map((store) => toShelfStore(store, listed.filter(({ affiliate }) => affiliate === store.slug).length));
}

// A capa do artigo mais novo num formato que o cartão do X mostra; sem nenhuma, o logo do site.
function getShareImage(listed: readonly ListedReview[]): SocialImage {
  for (const review of listed) {
    if (!review.image) continue;
    const url = absoluteMediaUrl(review.image);
    if (SHARE_IMAGE_FORMAT.test(new URL(url).pathname)) return { url, alt: review.title };
  }
  return SITE_SOCIAL_IMAGE;
}

export type ReviewsHubContent = {
  intro: string;
  articles: ShelfArticle[];
  newArticles: ShelfArticle[];
  stores: ShelfStore[];
  categories: ShelfCategory[];
  socialImage: SocialImage;
};

export function getReviewsHubContent(
  reviews: readonly HubReview[],
  stores: readonly Coupon[] = getActiveCoupons()
): ReviewsHubContent {
  const listed = sortReviewsByPublishedAt(getListedPortugueseReviews(reviews));
  const articles = listed.map((review) => toShelfArticle(review, stores));
  return {
    intro: `${articles.length} guias e análises. ${REVIEWS_INTRO}`,
    articles,
    newArticles: articles.filter(({ isNew }) => isNew),
    stores: getShelfStores(reviews, stores),
    categories: getPresentCategories(articles),
    socialImage: getShareImage(listed),
  };
}

export type StoreShelfContent = {
  slug: string;
  brand: string;
  title: string;
  metaTitle: string;
  description: string;
  countLabel: string;
  codeLinkLabel: string;
  storePageUrl: string;
  path: string;
  store: ShelfStore;
  articles: ShelfArticle[];
  categories: ShelfCategory[];
  search: ShelfSearch | null;
  otherStores: ShelfStore[];
  // A trilha visível, da mesma lista que o BreadcrumbList (o JSON-LD recebe tudo menos o último item).
  trail: PageLink[];
};

// A subpágina de uma loja ativa com mais de 3 artigos (a regra de getStoreArticlesPage); as outras dão null.
export function getStoreShelfContent(
  reviews: readonly HubReview[],
  slug: string,
  stores: readonly Coupon[] = getActiveCoupons()
): StoreShelfContent | null {
  const page = getStoreArticlesPage(reviews, slug, stores);
  const store = stores.find((item) => item.slug === slug);
  if (!page || !store) return null;

  const { articles: storeReviews, ...texts } = page;
  const path = getStoreArticlesPath(page.slug);
  const articles = storeReviews.map((review) => toShelfArticle(review, stores));
  const searchText = `Buscar nos artigos ${ofStore(store)}`;

  return {
    ...texts,
    path,
    store: toShelfStore(store, articles.length),
    articles,
    categories: getPresentCategories(articles),
    search:
      articles.length > STORE_SEARCH_THRESHOLD ? { label: searchText, placeholder: searchText, scope: 'reviews' } : null,
    otherStores: getShelfStores(reviews, stores).filter((item) => item.slug !== page.slug),
    trail: [...REVIEWS_TRAIL, { name: page.title, path }],
  };
}
```

- [ ] **Step 5: Registrar o teste no `package.json`**

Em `"scripts"`, logo depois da linha `"test:home-stores": "tsx scripts/test-home-stores.ts",`, acrescente:

```json
    "test:reviews-hub": "tsx scripts/test-reviews-hub.ts",
```

No script `"build"`, troque o trecho `tsx scripts/test-home-stores.ts && ` por `tsx scripts/test-home-stores.ts && tsx scripts/test-reviews-hub.ts && ` (o resto da linha não muda).

- [ ] **Step 6: Rodar o teste e ver passar**

Run: `npx tsx scripts/test-reviews-hub.ts < /dev/null`
Expected: PASS, terminando em `✅ reviewsHub: estante de 68 artigos, 15 novidades, 6 lojas com subpágina, busca, ordem, URL e medição passaram.` (os números são os do conteúdo de hoje: 68, 15 e 6; se o conteúdo mudar, eles mudam junto).

- [ ] **Step 7: Typecheck e lint**

Run: `npm run typecheck < /dev/null` e `npx eslint src/lib/reviewsShelf.ts src/lib/reviewsHub.ts scripts/test-reviews-hub.ts --quiet < /dev/null`
Expected: sem erros.

- [ ] **Step 8: Commit**

```bash
git add src/lib/reviewsShelf.ts src/lib/reviewsHub.ts scripts/test-reviews-hub.ts package.json
git commit -F - <<'EOF'
feat: dados da estante de /reviews e das subpáginas de loja

reviewsShelf.ts guarda as regras que o navegador também usa (busca sem
acento, ordem Mais novos e A–Z, URL, páginas de 12 e 24, textos da busca
vazia e medição); reviewsHub.ts monta no servidor os artigos, as
Novidades, as bolinhas das lojas com subpágina, as categorias, a imagem
de compartilhamento e a subpágina. test:reviews-hub entra na build.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Task 2: Peças da home em módulos comuns (sem mudança visível)

**Files:**
- Create: `src/components/ui/cardDecor.ts`
- Modify: `src/components/sections/HomeLatest.tsx` (bloco `CardDecor`/`CARD_DECOR` e o `decor=` do desktop)
- Modify: `src/components/sections/LocaleHomeSections.tsx:6` e `:85`
- Create: `src/components/ui/useBubbleTilt.ts`
- Modify: `src/components/sections/HomeStoreStrip.tsx` (constantes da inclinação, `StoreBubble`, `StoreMark`)
- Create: `src/components/ui/useRowScroll.ts`
- Modify: `src/components/sections/OfferCarousel.tsx` (estado, efeito, `scrollTrack` e `ARROW`)

**Interfaces:**
- Produces:
  - `type CardDecor = { magnet: string | null; tilt: string }`, `CARD_DECOR: CardDecor[]`, `cardDecorAt(index: number): CardDecor` (`@/components/ui/cardDecor`);
  - `useBubbleTilt<T extends HTMLElement>(): { diskRef: RefObject<HTMLSpanElement | null>; onPointerMove(event: PointerEvent<T>): void; onPointerLeave(): void }` (`@/components/ui/useBubbleTilt`);
  - `useRowScroll<T extends HTMLElement>(items: unknown): { trackRef: RefObject<T | null>; overflows: boolean; moreToTheRight: boolean; scrollTrack(direction: 'left' | 'right'): void }` e `ROW_ARROW: string` (`@/components/ui/useRowScroll`);
  - `StoreMark({ tab, imageClassName, sizes })` com `tab: Pick<HomeStoreTab, 'logo' | 'initials'>` (`@/components/sections/HomeStoreStrip`).

- [ ] **Step 1: Linha de base dos testes da home**

Run: `npx tsx scripts/test-home-stores.ts < /dev/null && npx tsx scripts/test-home-lower-sections.ts < /dev/null && npx tsx scripts/test-locale-home.ts < /dev/null`
Expected: os três passam (é a referência do "sem mudança").

- [ ] **Step 2: Criar `src/components/ui/cardDecor.ts`**

```ts
// Ímã e inclinação dos cartões de geladeira, pela posição na fila: o "Acabou de sair" da home, os
// artigos da home de cada idioma e as Novidades de /reviews. Decoração: fora da leitura de tela.
export type CardDecor = { magnet: string | null; tilt: string };

export const CARD_DECOR: CardDecor[] = [
  { magnet: '-top-3 -right-3 bg-amarelo-cupom', tilt: '-rotate-1' },
  { magnet: null, tilt: '' },
  { magnet: '-top-3 -left-3 bg-laranja', tilt: 'rotate-[0.5deg]' },
  { magnet: null, tilt: '' },
  { magnet: '-top-3 -right-3 bg-marinho', tilt: 'rotate-[-0.6deg]' },
];

export function cardDecorAt(index: number): CardDecor {
  return CARD_DECOR[index % CARD_DECOR.length];
}
```

- [ ] **Step 3: `HomeLatest.tsx` passa a usar o módulo**

Apague este bloco inteiro de `src/components/sections/HomeLatest.tsx`:

```tsx
export type CardDecor = { magnet: string | null; tilt: string };

// Ímã e inclinação de cada posição, como no canvas. Decoração: fora da leitura de tela.
export const CARD_DECOR: CardDecor[] = [
  { magnet: '-top-3 -right-3 bg-amarelo-cupom', tilt: '-rotate-1' },
  { magnet: null, tilt: '' },
  { magnet: '-top-3 -left-3 bg-laranja', tilt: 'rotate-[0.5deg]' },
  { magnet: null, tilt: '' },
  { magnet: '-top-3 -right-3 bg-marinho', tilt: 'rotate-[-0.6deg]' },
];

```

Acrescente aos imports, depois de `import { TrackedHomeLink, type HomeRoutePlacement } from '@/components/TrackedHomeLink';`:

```tsx
import { cardDecorAt, type CardDecor } from '@/components/ui/cardDecor';
```

Troque `decor={CARD_DECOR[index % CARD_DECOR.length]}` por `decor={cardDecorAt(index)}`.

- [ ] **Step 4: `LocaleHomeSections.tsx` passa a usar o módulo**

Troque a linha `import { CARD_DECOR, LatestCard } from '@/components/sections/HomeLatest';` por:

```tsx
import { LatestCard } from '@/components/sections/HomeLatest';
import { cardDecorAt } from '@/components/ui/cardDecor';
```

Troque `decor={CARD_DECOR[index % CARD_DECOR.length]}` por `decor={cardDecorAt(index)}`. Confira com `grep -rn "CARD_DECOR" src` que só o `cardDecor.ts` ainda cita `CARD_DECOR`.

- [ ] **Step 5: Testes, typecheck, lint e commit (2a)**

Run: os três testes do Step 1, `npm run typecheck < /dev/null` e `npx eslint src/components/ui/cardDecor.ts src/components/sections/HomeLatest.tsx src/components/sections/LocaleHomeSections.tsx --quiet < /dev/null`
Expected: tudo passa.

```bash
git add src/components/ui/cardDecor.ts src/components/sections/HomeLatest.tsx src/components/sections/LocaleHomeSections.tsx
git commit -F - <<'EOF'
refactor: ímã e inclinação dos cartões num módulo comum

O CARD_DECOR sai do HomeLatest para src/components/ui/cardDecor.ts, com
cardDecorAt, para as Novidades de /reviews usarem o mesmo desenho. A
home e a home de cada idioma ficam iguais.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

- [ ] **Step 6: Criar `src/components/ui/useBubbleTilt.ts`**

```ts
import { useRef, type PointerEvent } from 'react';

// A inclinação das bolinhas com o mouse (home e /reviews): o disco inclina para o lado do ponteiro e o
// logo se desloca um pouco, pelas variáveis --rx, --ry, --lx e --ly que o .bolinha-disco e o
// .bolinha-logo do globals.css leem. Só o mouse: no toque, o :active do CSS afunda o disco.
const TILT_DEG = 12;
const SHIFT_PX = 3;
const TILT_PROPERTIES = ['--rx', '--ry', '--lx', '--ly'];

export function useBubbleTilt<T extends HTMLElement>() {
  const diskRef = useRef<HTMLSpanElement>(null);

  function onPointerMove(event: PointerEvent<T>) {
    const disk = diskRef.current;
    if (event.pointerType !== 'mouse' || !disk) return;
    const box = disk.getBoundingClientRect();
    const x = Math.min(Math.max((event.clientX - box.left) / box.width - 0.5, -0.5), 0.5) * 2;
    const y = Math.min(Math.max((event.clientY - box.top) / box.height - 0.5, -0.5), 0.5) * 2;
    disk.style.setProperty('--rx', `${(-y * TILT_DEG).toFixed(1)}deg`);
    disk.style.setProperty('--ry', `${(x * TILT_DEG).toFixed(1)}deg`);
    disk.style.setProperty('--lx', `${(x * SHIFT_PX).toFixed(1)}px`);
    disk.style.setProperty('--ly', `${(y * SHIFT_PX).toFixed(1)}px`);
  }

  function onPointerLeave() {
    for (const property of TILT_PROPERTIES) diskRef.current?.style.removeProperty(property);
  }

  return { diskRef, onPointerMove, onPointerLeave };
}
```

- [ ] **Step 7: `HomeStoreStrip.tsx` usa o hook**

Em `src/components/sections/HomeStoreStrip.tsx`:

1. No import do React, tire `type PointerEvent,` (o resto fica).
2. Acrescente, depois de `import { FOCUS_RING } from '@/components/ui/focusRing';`:
   ```tsx
   import { useBubbleTilt } from '@/components/ui/useBubbleTilt';
   ```
3. Apague estas linhas (e só elas) do topo:
   ```tsx
   // Com o mouse na borda da bolinha: a inclinação do disco e o deslocamento do logo.
   const TILT_DEG = 12;
   const SHIFT_PX = 3;
   const TILT_PROPERTIES = ['--rx', '--ry', '--lx', '--ly'];
   ```
4. Em `StoreBubble`, troque o bloco que vai de `const diskRef = useRef<HTMLSpanElement>(null);` até o fim da função `untilt` (inclusive o comentário "Só o mouse inclina…") por:
   ```tsx
   const { diskRef, onPointerMove, onPointerLeave } = useBubbleTilt<HTMLButtonElement>();
   ```
5. No `<button>` do `StoreBubble`, troque `onPointerMove={tilt}` por `onPointerMove={onPointerMove}` e `onPointerLeave={untilt}` por `onPointerLeave={onPointerLeave}`.
6. Na assinatura do `StoreMark`, troque `{ tab: HomeStoreTab; imageClassName: string; sizes: string }` por `{ tab: Pick<HomeStoreTab, 'logo' | 'initials'>; imageClassName: string; sizes: string }`.

- [ ] **Step 8: Criar `src/components/ui/useRowScroll.ts`**

```ts
import { useEffect, useRef, useState } from 'react';
import { FOCUS_RING } from '@/components/ui/focusRing';

// Fila que rola na horizontal com setas (as ofertas da home e as Novidades de /reviews): se o conteúdo
// passa da largura (as setas só aparecem aí), se ainda há o que ver à direita (o degradê da borda, no
// celular) e o passo das setas. `items` refaz a medida quando a fila muda.
export const ROW_ARROW = `flex size-11 items-center justify-center rounded-full border-2 border-marinho bg-white text-marinho hover:bg-marinho hover:text-amarelo-cupom motion-safe:transition-colors ${FOCUS_RING}`;

export function useRowScroll<T extends HTMLElement>(items: unknown) {
  const trackRef = useRef<T>(null);
  const [overflows, setOverflows] = useState(false);
  const [moreToTheRight, setMoreToTheRight] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      setOverflows(track.scrollWidth > track.clientWidth);
      setMoreToTheRight(track.scrollLeft + track.clientWidth < track.scrollWidth - 1);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(track);
    track.addEventListener('scroll', update, { passive: true });
    return () => {
      observer.disconnect();
      track.removeEventListener('scroll', update);
    };
  }, [items]);

  function scrollTrack(direction: 'left' | 'right') {
    const track = trackRef.current;
    if (!track) return;
    const amount = Math.max(track.clientWidth * 0.8, 280);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({ left: direction === 'right' ? amount : -amount, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  return { trackRef, overflows, moreToTheRight, scrollTrack };
}
```

- [ ] **Step 9: `OfferCarousel.tsx` usa o hook**

Em `src/components/sections/OfferCarousel.tsx`:

1. Troque `import { useEffect, useRef, useState, type ReactNode } from 'react';` por `import type { ReactNode } from 'react';`.
2. Acrescente, depois de `import { ScrollRow } from '@/components/ui/ScrollRow';`:
   ```tsx
   import { ROW_ARROW, useRowScroll } from '@/components/ui/useRowScroll';
   ```
3. Apague a constante `ARROW` inteira (a linha que começa por `const ARROW = `). Se o import `FOCUS_RING` ficar sem uso, mantenha-o: o `OfferCard` usa `FOCUS_RING`.
4. Dentro de `OfferCarousel`, troque tudo de `const trackRef = useRef<HTMLUListElement>(null);` até o fim da função `scrollTrack` (inclusive o comentário "Com poucas ofertas…") por:
   ```tsx
   // Com poucas ofertas numa tela larga cabe tudo, e as setas não teriam o que fazer.
   const { trackRef, overflows, scrollTrack } = useRowScroll<HTMLUListElement>(items);
   ```
5. Nos dois botões de seta, troque `className={ARROW}` por `className={ROW_ARROW}`.

- [ ] **Step 10: Testes, typecheck, lint e commit (2b)**

Run: os três testes do Step 1, `npm run typecheck < /dev/null` e `npx eslint src/components/ui/useBubbleTilt.ts src/components/sections/HomeStoreStrip.tsx src/components/ui/useRowScroll.ts src/components/sections/OfferCarousel.tsx --quiet < /dev/null`
Expected: tudo passa.

```bash
git add src/components/ui/useBubbleTilt.ts src/components/sections/HomeStoreStrip.tsx src/components/ui/useRowScroll.ts src/components/sections/OfferCarousel.tsx
git commit -F - <<'EOF'
refactor: inclinação das bolinhas e fila com setas em hooks comuns

useBubbleTilt sai do StoreBubble e useRowScroll (com ROW_ARROW) sai do
OfferCarousel, para as bolinhas e as Novidades de /reviews usarem o
mesmo código. O StoreMark aceita só o logo e as iniciais. A home fica
igual.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Task 3: Cartão, linha, bolinha e link medido

**Files:**
- Create: `src/components/reviews/TrackedReviewsLink.tsx`
- Create: `src/components/reviews/StoreBubbleLink.tsx`
- Create: `src/components/reviews/ReviewShelfCard.tsx`
- Modify: `src/components/ViewTransitionLink.tsx` (`handleClick`)
- Modify: `scripts/test-reviews-hub.ts` (imports e seção de componentes)

**Interfaces:**
- Consumes: `type ShelfArticle`, `type ShelfStore`, `type ShelfPlacement`, `REVIEWS_ROUTE_CLICK`, `getReviewsRouteClickParameters` (Task 1); `type CardDecor`, `useBubbleTilt`, `StoreMark` (Task 2); `trackEvent` (`@/lib/analytics`); `sanitizeViewTransitionName` (`@/lib/viewTransition`).
- Produces:
  - `TrackedReviewsLink(props: Omit<ComponentProps<typeof Link>, 'href'> & { href: string; placement: ShelfPlacement; linkLabel: string })`;
  - `StoreBubbleLink({ store: ShelfStore; index: number; placement: ShelfPlacement })`;
  - `ReviewShelfCard({ article; placement; dateFormat: 'dayMonth' | 'fullDate'; showStore: boolean; decor?: CardDecor; eager?: boolean; showNewBadge?: boolean; imageSizes: string })` (`showNewBadge` é `true` por padrão; as Novidades passam `false`);
  - `ReviewShelfRow({ article; placement; showStore: boolean })`;
  - a foto de cada cartão e linha leva `data-vt-name="review-hero-<slug>"`; o `ViewTransitionLink` copia esse valor para `style.viewTransitionName` só no clique.

- [ ] **Step 1: Escrever os testes dos componentes (falham porque os arquivos não existem)**

Em `scripts/test-reviews-hub.ts`, acrescente aos imports do topo:

```ts
import { createElement, type ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { imageConfigDefault, type ImageConfigComplete, type RemotePattern } from 'next/dist/shared/lib/image-config';
import { ImageConfigContext } from 'next/dist/shared/lib/image-config-context.shared-runtime';

import { ReviewShelfCard, ReviewShelfRow } from '@/components/reviews/ReviewShelfCard';
import { StoreBubbleLink } from '@/components/reviews/StoreBubbleLink';
import { TrackedReviewsLink } from '@/components/reviews/TrackedReviewsLink';
import { cardDecorAt } from '@/components/ui/cardDecor';
import { IMAGE_REMOTE_PATTERNS } from '@/lib/imageHosts.mjs';
```

E insira, logo antes do `console.log` final:

```ts
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
assert.ok(gridCard.includes('data-vt-name="review-hero-poltrona-damie"'));
assert.ok(!gridCard.includes('view-transition-name'), 'nome de transição no HTML');
assert.match(gridCard, /<img [^>]*loading="lazy"/);
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
assert.ok(!newCard.includes('>Novo</span>'), 'selo Novo nas Novidades');
assert.match(newCard, /<span aria-hidden="true" class="[^"]*bg-amarelo-cupom/);
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
assert.ok(row.includes('>Magalu</span>'));
assert.ok(row.includes('data-vt-name="review-hero-magalu-1"'));
const rowNoStore = render(createElement(ReviewShelfRow, { article: article('magalu-1'), placement: 'store_list', showStore: false }));
assert.ok(!rowNoStore.includes('>Magalu</span>'));

// Bolinha da loja como link: href da subpágina, classes da bolinha, posição (--i), nome e total.
const bubble = render(createElement(StoreBubbleLink, { store: hub.stores[0], index: 2, placement: 'reviews_stores' }));
assert.match(bubble, /<a [^>]*href="\/reviews\/loja\/magalu"/);
assert.match(bubble, /class="bolinha /);
assert.match(bubble, /--i:2/);
assert.ok(bubble.includes('>Magalu</span>'));
assert.ok(bubble.includes('>4 artigos</span>'));

const tracked = render(
  createElement(
    TrackedReviewsLink,
    { href: '/reviews', placement: 'store_all_reviews', linkLabel: 'Ver todos', className: 'x' },
    'Ver todos'
  )
);
assert.match(tracked, /<a class="x" href="\/reviews">Ver todos<\/a>/);
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `npx tsx scripts/test-reviews-hub.ts < /dev/null`
Expected: FAIL com `Cannot find module '@/components/reviews/ReviewShelfCard'`.

- [ ] **Step 3: Criar `src/components/reviews/TrackedReviewsLink.tsx`**

```tsx
'use client';

import type { ComponentProps } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import { REVIEWS_ROUTE_CLICK, getReviewsRouteClickParameters, type ShelfPlacement } from '@/lib/reviewsShelf';

// Link de /reviews e das subpágina de loja que conta o clique no GA4 (reviews_route_click), como o
// TrackedHomeLink faz na home.
type TrackedReviewsLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
  placement: ShelfPlacement;
  linkLabel: string;
};

export function TrackedReviewsLink({ href, placement, linkLabel, onClick, ...rest }: TrackedReviewsLinkProps) {
  return (
    <Link
      href={href}
      {...rest}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        trackEvent(REVIEWS_ROUTE_CLICK, getReviewsRouteClickParameters({ href, placement, linkLabel }));
      }}
    />
  );
}
```

- [ ] **Step 4: Criar `src/components/reviews/StoreBubbleLink.tsx`**

```tsx
'use client';

import type { CSSProperties } from 'react';
import { TrackedReviewsLink } from '@/components/reviews/TrackedReviewsLink';
import { StoreMark } from '@/components/sections/HomeStoreStrip';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { useBubbleTilt } from '@/components/ui/useBubbleTilt';
import type { ShelfPlacement, ShelfStore } from '@/lib/reviewsShelf';

// A bolinha da home como link para a subpágina da loja: o disco inclina com o mouse (useBubbleTilt e as
// classes .bolinha* do globals.css), ganha o anel amarelo com o mouse em cima e, no celular, entra da
// direita pela posição (--i). Embaixo, o nome e o total de artigos.
export function StoreBubbleLink({ store, index, placement }: { store: ShelfStore; index: number; placement: ShelfPlacement }) {
  const { diskRef, onPointerMove, onPointerLeave } = useBubbleTilt<HTMLAnchorElement>();

  return (
    <TrackedReviewsLink
      href={store.href}
      placement={placement}
      linkLabel={store.brand}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ '--i': index } as CSSProperties}
      className={`bolinha group flex w-[84px] shrink-0 flex-col items-center gap-1.5 rounded-lg pt-1.5 pb-1 text-marinho md:w-[100px] ${FOCUS_RING}`}
    >
      <span
        ref={diskRef}
        className="bolinha-disco relative flex size-16 items-center justify-center overflow-hidden rounded-full bg-creme shadow-[0_0_0_2px_var(--color-marinho)] group-hover:shadow-[0_0_0_4px_var(--color-amarelo-cupom),0_0_0_6px_var(--color-marinho)] md:size-20"
      >
        <StoreMark tab={store} imageClassName="bolinha-logo h-[53%] w-[74%]" sizes="60px" />
      </span>
      <span className="text-center text-xs leading-tight font-bold">{store.brand}</span>
      <span className="text-[11px] font-semibold text-marinho-suave">{store.countLabel}</span>
    </TrackedReviewsLink>
  );
}
```

- [ ] **Step 5: Criar `src/components/reviews/ReviewShelfCard.tsx`**

```tsx
'use client';

import Image from 'next/image';
import { ViewTransitionLink } from '@/components/ViewTransitionLink';
import type { CardDecor } from '@/components/ui/cardDecor';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { trackEvent } from '@/lib/analytics';
import {
  REVIEWS_ROUTE_CLICK,
  getReviewsRouteClickParameters,
  type ShelfArticle,
  type ShelfPlacement,
} from '@/lib/reviewsShelf';
import { sanitizeViewTransitionName } from '@/lib/viewTransition';

// O cartão de artigo de /reviews e das subpáginas de loja (na grade e, com ímã e inclinação, nas
// Novidades) e a linha do modo lista. A foto leva em data-vt-name o nome da transição para o topo do
// artigo; o ViewTransitionLink só o aplica no clique, porque o mesmo artigo pode estar duas vezes na
// página (Novidades e acervo), e nomes repetidos cancelam a transição.

const OBJECT_POSITION: Record<NonNullable<ShelfArticle['imagePosition']>, string> = {
  top: '50% 10%',
  bottom: '50% 90%',
  left: '20% 50%',
  right: '80% 50%',
  center: 'center',
};

type ShelfLinkProps = { article: ShelfArticle; placement: ShelfPlacement };

function trackClick({ article, placement }: ShelfLinkProps) {
  trackEvent(REVIEWS_ROUTE_CLICK, getReviewsRouteClickParameters({ href: article.href, placement, linkLabel: article.title }));
}

const morphName = (slug: string) => `review-hero-${sanitizeViewTransitionName(slug)}`;

// A foto é decorativa (alt vazio): o título do artigo já dá nome ao link. Produto com nota fica inteiro.
function Photo({
  article,
  sizes,
  eager = false,
  compact = false,
}: {
  article: ShelfArticle;
  sizes: string;
  eager?: boolean;
  compact?: boolean;
}) {
  if (!article.image) return null;
  const contain = article.imageFit === 'contain';
  return (
    <Image
      src={article.image}
      alt=""
      fill
      sizes={sizes}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      className={`motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-105 ${
        contain ? `bg-white object-contain ${compact ? 'p-1' : 'p-3'}` : 'object-cover'
      }`}
      style={!contain && article.imagePosition ? { objectPosition: OBJECT_POSITION[article.imagePosition] } : undefined}
    />
  );
}

type ReviewShelfCardProps = ShelfLinkProps & {
  // Nas Novidades a data é DD/MM; no acervo, com o ano.
  dateFormat: 'dayMonth' | 'fullDate';
  showStore: boolean;
  decor?: CardDecor;
  eager?: boolean;
  // Nas Novidades todos são novos: o selo sai.
  showNewBadge?: boolean;
  imageSizes: string;
};

export function ReviewShelfCard({
  article,
  placement,
  dateFormat,
  showStore,
  decor,
  eager = false,
  showNewBadge = true,
  imageSizes,
}: ReviewShelfCardProps) {
  return (
    <ViewTransitionLink
      href={article.href}
      onClick={() => trackClick({ article, placement })}
      className={`group relative flex flex-1 flex-col rounded-[10px] border-2 border-marinho bg-white text-marinho ${decor?.tilt ?? ''} motion-safe:transition-[translate,rotate,box-shadow] motion-safe:duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:rotate-0 motion-safe:hover:shadow-[0_8px_18px_rgb(15_29_58/0.15)] ${FOCUS_RING}`}
    >
      {decor?.magnet ? (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute z-10 size-10 rounded-full shadow-[0_2px_6px_rgb(15_29_58/0.3)] ${decor.magnet}`}
        />
      ) : null}
      <span
        data-vt-name={morphName(article.slug)}
        className="relative block aspect-[4/3] overflow-hidden rounded-t-lg border-b-2 border-marinho bg-creme"
      >
        <Photo article={article} sizes={imageSizes} eager={eager} />
        {showNewBadge && article.isNew ? (
          <span className="absolute top-2 left-2 rounded-full border-2 border-marinho bg-laranja px-2.5 py-0.5 text-[11px] font-extrabold text-marinho">
            Novo
          </span>
        ) : null}
      </span>
      <span className="flex flex-1 flex-col gap-1.5 p-3">
        <span className="text-xs font-bold text-marinho-suave">{`${article[dateFormat]}, ${article.type}`}</span>
        <span className="text-[15px] leading-5 font-extrabold">{article.title}</span>
      </span>
      {showStore && article.store ? (
        <span className="rounded-b-lg border-t-2 border-marinho bg-creme px-3 py-2 text-xs font-bold">{article.store}</span>
      ) : null}
    </ViewTransitionLink>
  );
}

export function ReviewShelfRow({ article, placement, showStore }: ShelfLinkProps & { showStore: boolean }) {
  return (
    <ViewTransitionLink
      href={article.href}
      onClick={() => trackClick({ article, placement })}
      className={`group flex min-h-11 flex-1 items-center gap-3 py-2.5 text-marinho ${FOCUS_RING}`}
    >
      <span
        data-vt-name={morphName(article.slug)}
        className="relative size-14 shrink-0 overflow-hidden rounded-lg border-2 border-marinho bg-creme"
      >
        <Photo article={article} sizes="56px" compact />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="text-[15px] leading-5 font-extrabold group-hover:underline group-hover:underline-offset-[3px]">
          {article.title}
        </span>
        <span className="flex flex-wrap gap-x-2 text-xs font-bold text-marinho-suave">
          <span>{`${article.fullDate}, ${article.type}`}</span>
          {showStore && article.store ? <span className="text-marinho">{article.store}</span> : null}
        </span>
      </span>
    </ViewTransitionLink>
  );
}
```

- [ ] **Step 6: `ViewTransitionLink` aplica o nome da foto no clique**

Em `src/components/ViewTransitionLink.tsx`, dentro do `if (supportsViewTransition && !prefersReducedMotion && !isSpecialClick && !isExternalLink) {`, logo depois de `e.preventDefault();`, acrescente:

```tsx
      // A foto do cartão (data-vt-name) só ganha o nome da transição agora: o mesmo artigo pode estar
      // duas vezes na página (Novidades e acervo de /reviews), e nomes repetidos cancelam a transição.
      const morph = e.currentTarget.querySelector<HTMLElement>('[data-vt-name]');
      if (morph?.dataset.vtName) morph.style.viewTransitionName = morph.dataset.vtName;
```

- [ ] **Step 7: Rodar e ver passar**

Run: `npx tsx scripts/test-reviews-hub.ts < /dev/null`
Expected: PASS.

- [ ] **Step 8: Typecheck, lint e commit**

Run: `npm run typecheck < /dev/null` e `npx eslint src/components/reviews/TrackedReviewsLink.tsx src/components/reviews/StoreBubbleLink.tsx src/components/reviews/ReviewShelfCard.tsx src/components/ViewTransitionLink.tsx scripts/test-reviews-hub.ts --quiet < /dev/null`
Expected: sem erros.

```bash
git add src/components/reviews/TrackedReviewsLink.tsx src/components/reviews/StoreBubbleLink.tsx src/components/reviews/ReviewShelfCard.tsx src/components/ViewTransitionLink.tsx scripts/test-reviews-hub.ts
git commit -F - <<'EOF'
feat: cartão, linha e bolinha da estante de /reviews

O cartão é o da home (borda marinho, data e tipo, loja embaixo), com
ímã e inclinação nas Novidades; a linha é a do modo lista. A bolinha da
loja vira link com a inclinação da home. Os cliques contam como
reviews_route_click. A foto só ganha o nome da transição para o artigo
no clique, porque o mesmo artigo pode aparecer duas vezes na página.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Task 4: Novidades e bolinhas das lojas

**Files:**
- Create: `src/components/reviews/shelfClasses.ts`
- Create: `src/components/reviews/ReviewsNewRow.tsx`
- Create: `src/components/reviews/ReviewsStoreStrip.tsx`
- Modify: `scripts/test-reviews-hub.ts` (imports e seção)

**Interfaces:**
- Consumes: `ReviewShelfCard` e `StoreBubbleLink` (Task 3); `cardDecorAt`, `useRowScroll`, `ROW_ARROW` (Task 2); `RevealSection`, `ScrollRow` (`@/components/ui`).
- Produces:
  - `SHELF_CONTAINER`, `SHELF_TITLE` (`@/components/reviews/shelfClasses`);
  - `ReviewsNewRow({ articles: ShelfArticle[] })`: seção `aria-labelledby="titulo-novidades"`;
  - `ReviewsStoreStrip({ id: string; title: string; stores: ShelfStore[]; placement: ShelfPlacement })`: seção `aria-labelledby={id}`; sem lojas, não renderiza nada.

- [ ] **Step 1: Escrever os testes (falham)**

Em `scripts/test-reviews-hub.ts`, acrescente aos imports:

```ts
import { ReviewsNewRow } from '@/components/reviews/ReviewsNewRow';
import { ReviewsStoreStrip } from '@/components/reviews/ReviewsStoreStrip';
```

E insira antes do `console.log` final:

```ts
// Novidades: título com o marca-texto, um cartão por artigo (revelado na rolagem), as duas primeiras fotos
// sem atraso e as setas escondidas até o navegador medir a fila.
const newRow = render(createElement(ReviewsNewRow, { articles: hub.articles.slice(0, 3) }));
assert.ok(newRow.includes('aria-labelledby="titulo-novidades"'));
assert.match(newRow, /<h2 id="titulo-novidades"[^>]*><span class="marca-texto">Novidades<\/span><\/h2>/);
assert.equal(newRow.match(/<li class="revela /g)?.length, 3, 'um cartão por artigo');
assert.equal(newRow.match(/loading="eager"/g)?.length, 2, 'as duas primeiras fotos sem atraso');
assert.ok(newRow.includes('class="hidden shrink-0 gap-2"'), 'setas escondidas no HTML do servidor');
assert.ok(newRow.includes('aria-label="Ver próximas novidades"'));

// Bolinhas: título, uma por loja na ordem dos dados; sem loja, a seção não existe.
const strip = render(
  createElement(ReviewsStoreStrip, { id: 'titulo-por-loja', title: 'Por loja', stores: hub.stores, placement: 'reviews_stores' })
);
assert.ok(strip.includes('aria-labelledby="titulo-por-loja"'));
assert.match(strip, /<span class="marca-texto">Por loja<\/span>/);
assert.deepEqual([...strip.matchAll(/href="\/reviews\/loja\/([^"]+)"/g)].map(([, slug]) => slug), slugs(hub.stores));
assert.equal(
  render(createElement(ReviewsStoreStrip, { id: 'titulo-outras-lojas', title: 'Outras lojas', stores: [], placement: 'store_other_stores' })),
  ''
);
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `npx tsx scripts/test-reviews-hub.ts < /dev/null`
Expected: FAIL com `Cannot find module '@/components/reviews/ReviewsNewRow'`.

- [ ] **Step 3: Criar `src/components/reviews/shelfClasses.ts`**

```ts
// Classes que as seções da estante (/reviews e subpáginas de loja) repetem: o contêiner de 1200 px da
// home e o título condensado com o marca-texto (o mesmo do HomeSection).
export const SHELF_CONTAINER = 'mx-auto w-full max-w-[1200px] px-4 md:px-10';

export const SHELF_TITLE =
  'font-condensada text-[32px] leading-none font-black text-marinho font-stretch-extra-condensed md:text-5xl';
```

- [ ] **Step 4: Criar `src/components/reviews/ReviewsNewRow.tsx`**

```tsx
'use client';

import type { CSSProperties } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReviewShelfCard } from '@/components/reviews/ReviewShelfCard';
import { SHELF_CONTAINER, SHELF_TITLE } from '@/components/reviews/shelfClasses';
import { cardDecorAt } from '@/components/ui/cardDecor';
import { RevealSection } from '@/components/ui/RevealSection';
import { ScrollRow } from '@/components/ui/ScrollRow';
import { ROW_ARROW, useRowScroll } from '@/components/ui/useRowScroll';
import type { ShelfArticle } from '@/lib/reviewsShelf';

// As Novidades de /reviews: os artigos com o selo "Novo", como cartões de geladeira (ímã e inclinação
// pela posição), numa fila que rola na horizontal. As setas só aparecem no computador quando a fila não
// cabe; no celular, o degradê da borda direita some no fim. Os cartões entram em cascata quando a seção
// chega à tela (RevealSection, .revela com --i), e as duas primeiras fotos carregam sem atraso.
export function ReviewsNewRow({ articles }: { articles: ShelfArticle[] }) {
  const { trackRef, overflows, moreToTheRight, scrollTrack } = useRowScroll<HTMLUListElement>(articles);

  return (
    <RevealSection aria-labelledby="titulo-novidades" className="pb-8 md:pb-12">
      <div className={`${SHELF_CONTAINER} flex flex-col gap-2 md:gap-4`}>
        <div className="flex items-end justify-between gap-4">
          <h2 id="titulo-novidades" className={SHELF_TITLE}>
            <span className="marca-texto">Novidades</span>
          </h2>
          <div className={`hidden shrink-0 gap-2${overflows ? ' md:flex' : ''}`}>
            <button type="button" onClick={() => scrollTrack('left')} className={ROW_ARROW} aria-label="Ver novidades anteriores">
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button type="button" onClick={() => scrollTrack('right')} className={ROW_ARROW} aria-label="Ver próximas novidades">
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>
        {/* O pt-4 dá lugar aos ímãs, que saem do cartão, e o px-3 do computador, à inclinação. */}
        <div className="relative -mx-4 md:-mx-3">
          <ScrollRow
            ref={trackRef}
            className="hide-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pt-4 pb-3 md:scroll-px-3 md:px-3"
          >
            {articles.map((article, index) => (
              <li
                key={article.slug}
                className="revela flex w-[200px] shrink-0 snap-start md:w-[220px]"
                style={{ '--i': index } as CSSProperties}
              >
                <ReviewShelfCard
                  article={article}
                  placement="reviews_new"
                  dateFormat="dayMonth"
                  showStore
                  decor={cardDecorAt(index)}
                  eager={index < 2}
                  showNewBadge={false}
                  imageSizes="220px"
                />
              </li>
            ))}
          </ScrollRow>
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-white to-transparent motion-safe:transition-opacity motion-safe:duration-200 md:hidden ${
              moreToTheRight ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      </div>
    </RevealSection>
  );
}
```

- [ ] **Step 5: Criar `src/components/reviews/ReviewsStoreStrip.tsx`**

```tsx
import { StoreBubbleLink } from '@/components/reviews/StoreBubbleLink';
import { SHELF_CONTAINER, SHELF_TITLE } from '@/components/reviews/shelfClasses';
import { RevealSection } from '@/components/ui/RevealSection';
import type { ShelfPlacement, ShelfStore } from '@/lib/reviewsShelf';

// As bolinhas das lojas com subpágina: "Por loja" em /reviews e "Outras lojas" na subpágina. No celular
// a fila rola na horizontal; a partir de md, quebra linha.
type ReviewsStoreStripProps = { id: string; title: string; stores: ShelfStore[]; placement: ShelfPlacement };

export function ReviewsStoreStrip({ id, title, stores, placement }: ReviewsStoreStripProps) {
  if (stores.length === 0) return null;

  return (
    <RevealSection aria-labelledby={id} className="pb-8 md:pb-12">
      <div className={`${SHELF_CONTAINER} flex flex-col gap-3 md:gap-5`}>
        <h2 id={id} className={SHELF_TITLE}>
          <span className="marca-texto">{title}</span>
        </h2>
        <ul className="hide-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4 pt-1.5 pb-2 md:mx-0 md:flex-wrap md:gap-3.5 md:overflow-visible md:px-0">
          {stores.map((store, index) => (
            <li key={store.slug} className="flex">
              <StoreBubbleLink store={store} index={index} placement={placement} />
            </li>
          ))}
        </ul>
      </div>
    </RevealSection>
  );
}
```

- [ ] **Step 6: Rodar e ver passar**

Run: `npx tsx scripts/test-reviews-hub.ts < /dev/null`
Expected: PASS.

- [ ] **Step 7: Typecheck, lint e commit**

Run: `npm run typecheck < /dev/null` e `npx eslint src/components/reviews/shelfClasses.ts src/components/reviews/ReviewsNewRow.tsx src/components/reviews/ReviewsStoreStrip.tsx scripts/test-reviews-hub.ts --quiet < /dev/null`
Expected: sem erros.

```bash
git add src/components/reviews/shelfClasses.ts src/components/reviews/ReviewsNewRow.tsx src/components/reviews/ReviewsStoreStrip.tsx scripts/test-reviews-hub.ts
git commit -F - <<'EOF'
feat: Novidades e bolinhas das lojas da estante

As Novidades são cartões de geladeira numa fila com setas só quando
transborda e as duas primeiras fotos sem atraso; Por loja e Outras
lojas usam a bolinha como link. As duas seções entram com o marca-texto
e a cascata da home.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Task 5: A estante (`ReviewsBrowser`) e as animações

**Files:**
- Create: `src/components/reviews/ReviewsBrowser.tsx`
- Modify: `src/app/globals.css` (bloco novo antes de `/* Scrollbar customizada */`)
- Modify: `scripts/test-reviews-hub.ts` (import e seção)

**Interfaces:**
- Consumes: tudo de `@/lib/reviewsShelf` (Task 1); `ReviewShelfCard`, `ReviewShelfRow` (Task 3); `SHELF_CONTAINER`, `SHELF_TITLE` (Task 4); `RevealSection`; `trackEvent`; `sanitizeViewTransitionName`.
- Produces: `ReviewsBrowser(props: ReviewsBrowserProps)` com

  ```ts
  type ReviewsBrowserProps = {
    articles: ShelfArticle[];
    categories: ShelfCategory[];
    listPath: string; // '/reviews' ou '/reviews/loja/<slug>'
    placementPrefix: 'reviews' | 'store';
    showStore: boolean;
    heading: string;
    headingVisible: boolean;
    search: ShelfSearch | null;
    hero: ReactNode;
    showcase?: ReactNode;
    footer?: ReactNode;
  };
  ```

  Marcadores no HTML que o `test:build-output` usa: a lista é `<ul data-estante="grade" …>` (ou `"lista"`), os botões de categoria ficam num `<div data-categorias="true" …>`, o rótulo da busca é `<label for="busca-estante" class="sr-only">…</label>` e o título da estante tem `id="titulo-estante"`.

- [ ] **Step 1: Escrever os testes (falham)**

Em `scripts/test-reviews-hub.ts`, acrescente aos imports:

```ts
import { ReviewsBrowser } from '@/components/reviews/ReviewsBrowser';
```

E insira antes do `console.log` final:

```ts
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
assert.ok(shelfHtml.includes('--vt:estante-poltrona-damie'), 'variável do nome da troca em cada item');
assert.ok(!shelfHtml.includes('view-transition-name'), 'nome de transição no HTML');
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
assert.ok(storeShelf.includes('<h2 id="titulo-estante" class="sr-only">Lista de artigos</h2>'));
assert.ok(!storeShelf.includes('data-categorias'));
assert.ok(!storeShelf.includes('Carregar mais'));
assert.ok(storeShelf.includes('>3 artigos<'));
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `npx tsx scripts/test-reviews-hub.ts < /dev/null`
Expected: FAIL com `Cannot find module '@/components/reviews/ReviewsBrowser'`.

- [ ] **Step 3: Criar `src/components/reviews/ReviewsBrowser.tsx`**

```tsx
'use client';

import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { flushSync } from 'react-dom';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { LayoutGrid, List, Search, X } from 'lucide-react';
import { ReviewShelfCard, ReviewShelfRow } from '@/components/reviews/ReviewShelfCard';
import { SHELF_CONTAINER, SHELF_TITLE } from '@/components/reviews/shelfClasses';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { RevealSection } from '@/components/ui/RevealSection';
import { trackEvent } from '@/lib/analytics';
import type { ReviewCategory } from '@/lib/reviewDiscovery';
import {
  GRID_PAGE_SIZE,
  SEARCH_EVENT_DELAY_MS,
  SHELF_CONTROL_EVENT,
  SHELF_SEARCH_EVENT,
  emptySearchMessage,
  filterShelf,
  foldSearchText,
  getEmptySearchAction,
  getShelfControlParameters,
  getShelfSearchParameters,
  isSearching,
  pageSizeOf,
  parseShelfQuery,
  resultsLabel,
  shelfPlacement,
  shelfSearch,
  shouldTrackSearch,
  visibleAfterViewChange,
  withShelfQuery,
  type ShelfArticle,
  type ShelfCategory,
  type ShelfOrder,
  type ShelfQuery,
  type ShelfSearch,
  type ShelfView,
} from '@/lib/reviewsShelf';
import { sanitizeViewTransitionName } from '@/lib/viewTransition';

// A estante de /reviews e das subpáginas de loja: a busca, as categorias, a ordem, a grade ou lista e o
// "Carregar mais". Busca, categoria e ordem ficam na URL (pushState e replaceState, sem ir ao servidor);
// o modo fica no aparelho (localStorage) e a página aberta, na sessão (sessionStorage), para quem volta
// de um artigo. O topo e a vitrine chegam prontos do servidor; a vitrine sai enquanto há texto na busca.

// O useSyncExternalStore lê a URL; o evento avisa das trocas da própria estante, e o ShelfUrlListener,
// das de fora (voltar, avançar ou um link para esta página). O useSearchParams fica nele, com Suspense
// próprio: assim o prerender não para no Suspense e o HTML estático traz os cartões.
const URL_EVENT = 'reviews-shelf-url';
const VIEW_EVENT = 'reviews-shelf-view';
const VIEW_KEY = 'reviews-modo';
const PAGE_KEY = 'reviews-pagina:';
// A busca filtra quando a pessoa para de digitar por um instante.
const SEARCH_DELAY_MS = 120;

const EMPTY_PRIMARY = `flex min-h-12 items-center justify-center rounded-[10px] border-2 border-marinho bg-laranja px-4 text-center text-[15px] font-extrabold text-marinho hover:bg-laranja/85 motion-safe:transition-colors ${FOCUS_RING}`;
const EMPTY_SECONDARY = `flex min-h-12 items-center justify-center rounded-[10px] border-2 border-marinho bg-white px-4 text-center text-[15px] font-extrabold text-marinho hover:bg-creme motion-safe:transition-colors ${FOCUS_RING}`;

const VIEWS: Array<{ value: ShelfView; label: string; Icon: typeof LayoutGrid }> = [
  { value: 'grade', label: 'Grade', Icon: LayoutGrid },
  { value: 'lista', label: 'Lista', Icon: List },
];

function subscribeToUrl(onChange: () => void) {
  window.addEventListener(URL_EVENT, onChange);
  return () => window.removeEventListener(URL_EVENT, onChange);
}

const getUrlSearch = () => window.location.search;
const getServerSearch = () => '';

function ShelfUrlListener() {
  // Fora do App Router (no teste) não há parâmetros.
  const search = useSearchParams()?.toString() ?? '';

  useEffect(() => {
    window.dispatchEvent(new Event(URL_EVENT));
  }, [search]);

  return null;
}

// Sem localStorage (bloqueado ou numa pré-visualização), o modo escolhido vale até sair da página.
let viewThisVisit: ShelfView | null = null;

function subscribeToView(onChange: () => void) {
  window.addEventListener(VIEW_EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(VIEW_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

function getStoredView(): ShelfView {
  if (viewThisVisit) return viewThisVisit;
  try {
    return window.localStorage.getItem(VIEW_KEY) === 'lista' ? 'lista' : 'grade';
  } catch {
    return 'grade';
  }
}

const getServerView = (): ShelfView => 'grade';

function storeView(view: ShelfView) {
  viewThisVisit = view;
  try {
    window.localStorage.setItem(VIEW_KEY, view);
  } catch {
    // Sem storage, o modo vale só nesta visita.
  }
  window.dispatchEvent(new Event(VIEW_EVENT));
}

type SavedPage = { search: string; visible: number };

function readSavedPage(listPath: string): SavedPage | null {
  try {
    const saved = JSON.parse(window.sessionStorage.getItem(PAGE_KEY + listPath) ?? 'null');
    return saved && typeof saved.search === 'string' && Number.isInteger(saved.visible) ? saved : null;
  } catch {
    return null;
  }
}

function savePage(listPath: string, page: SavedPage) {
  try {
    window.sessionStorage.setItem(PAGE_KEY + listPath, JSON.stringify(page));
  } catch {
    // Sem storage, quem volta de um artigo encontra a primeira página.
  }
}

// Troca busca, categoria ou ordem na URL (os outros parâmetros ficam) e avisa o useSyncExternalStore.
function writeUrl(
  update: (query: ShelfQuery) => ShelfQuery,
  categories: readonly ReviewCategory[],
  mode: 'push' | 'replace'
) {
  const next = update(parseShelfQuery(window.location.search, categories));
  const url = `${window.location.pathname}${withShelfQuery(window.location.search, next)}${window.location.hash}`;
  if (mode === 'push') window.history.pushState(null, '', url);
  else window.history.replaceState(null, '', url);
  window.dispatchEvent(new Event(URL_EVENT));
}

// A troca animada da estante: data-trocando liga, no globals.css, o nome de transição de cada item (a
// variável --vt) só durante a troca. Sem a API (Firefox) ou com "reduzir movimento", troca na hora. Uma
// troca nova encerra a anterior; só a última tira o data-trocando.
let transitionCount = 0;

function runShelfTransition(shelf: HTMLElement | null, update: () => void) {
  if (
    !shelf ||
    typeof document.startViewTransition !== 'function' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    update();
    return;
  }
  const id = ++transitionCount;
  shelf.dataset.trocando = '';
  const done = () => {
    if (id === transitionCount) delete shelf.dataset.trocando;
  };
  document.startViewTransition(() => flushSync(update)).finished.then(done, done);
}

type ReviewsBrowserProps = {
  articles: ShelfArticle[];
  categories: ShelfCategory[];
  listPath: string;
  placementPrefix: 'reviews' | 'store';
  showStore: boolean;
  // O título da estante: visível em /reviews ("Todos os artigos"); na subpágina, só para leitor de tela.
  heading: string;
  headingVisible: boolean;
  search: ShelfSearch | null;
  // O topo da página e a vitrine (Novidades e Por loja) vêm prontos do servidor.
  hero: ReactNode;
  showcase?: ReactNode;
  footer?: ReactNode;
};

export function ReviewsBrowser({
  articles,
  categories,
  listPath,
  placementPrefix,
  showStore,
  heading,
  headingVisible,
  search,
  hero,
  showcase,
  footer,
}: ReviewsBrowserProps) {
  const categoryValues = useMemo(() => categories.map(({ value }) => value), [categories]);
  const urlSearch = useSyncExternalStore(subscribeToUrl, getUrlSearch, getServerSearch);
  const query = useMemo(() => parseShelfQuery(urlSearch, categoryValues), [urlSearch, categoryValues]);
  const view = useSyncExternalStore(subscribeToView, getStoredView, getServerView);
  const results = useMemo(() => filterShelf(articles, query), [articles, query]);
  const listKey = shelfSearch(query);
  const searching = isSearching(query);

  // A página aberta vale para a busca, a categoria e a ordem atuais (listKey): trocar qualquer uma volta
  // ao começo. newFrom marca os cartões que o "Carregar mais" acabou de trazer.
  const [page, setPage] = useState({ key: listKey, visible: GRID_PAGE_SIZE, newFrom: -1 });
  const current = page.key === listKey ? page : { key: listKey, visible: GRID_PAGE_SIZE, newFrom: -1 };
  const visible = Math.max(current.visible, pageSizeOf(view));
  const shown = results.slice(0, visible);

  // O texto do campo: o que a pessoa digita, até a URL mudar por outro caminho (voltar, limpar).
  const [draft, setDraft] = useState({ text: query.q, base: query.q });
  const inputValue = draft.base === query.q ? draft.text : query.q;

  const shelfRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const focusFrom = useRef<number | null>(null);
  const restored = useRef(false);
  const lastTrackedSearch = useRef<string | null>(null);

  // A busca vai para a URL quando a pessoa para de digitar.
  useEffect(() => {
    if (draft.base !== query.q || draft.text === query.q) return;
    const timer = window.setTimeout(() => {
      runShelfTransition(shelfRef.current, () =>
        writeUrl((latest) => ({ ...latest, q: draft.text }), categoryValues, 'replace')
      );
    }, SEARCH_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [draft, query.q, categoryValues]);

  // Quem volta de um artigo encontra a mesma página aberta. Só depois de ler a URL do navegador (no
  // render da hidratação vale a do servidor) e uma vez por montagem.
  useEffect(() => {
    if (restored.current || urlSearch !== window.location.search) return;
    restored.current = true;
    const saved = readSavedPage(listPath);
    const restore = (savedVisible: number) => setPage({ key: listKey, visible: savedVisible, newFrom: -1 });
    if (saved && saved.search === listKey && saved.visible > visible) restore(saved.visible);
  }, [urlSearch, listPath, listKey, visible]);

  useEffect(() => {
    if (restored.current) savePage(listPath, { search: listKey, visible });
  }, [listPath, listKey, visible]);

  // Depois do "Carregar mais", o foco vai para o primeiro artigo novo.
  useEffect(() => {
    const from = focusFrom.current;
    if (from === null) return;
    focusFrom.current = null;
    listRef.current?.querySelectorAll<HTMLAnchorElement>(':scope > li > a')[from]?.focus();
  }, [visible]);

  // A busca vai para o Analytics quando a pessoa para de digitar, sem repetir o termo.
  useEffect(() => {
    if (!shouldTrackSearch(query.q, lastTrackedSearch.current)) return;
    const timer = window.setTimeout(() => {
      lastTrackedSearch.current = foldSearchText(query.q);
      trackEvent(SHELF_SEARCH_EVENT, getShelfSearchParameters({ q: query.q, resultsCount: results.length, listPath }));
    }, SEARCH_EVENT_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [query.q, results.length, listPath]);

  function trackControl(control: 'category' | 'sort' | 'view', value: string) {
    trackEvent(SHELF_CONTROL_EVENT, getShelfControlParameters({ control, value, listPath }));
  }

  function selectCategory(category: ReviewCategory | null) {
    if (category === query.category) return;
    trackControl('category', category ?? 'todos');
    runShelfTransition(shelfRef.current, () => writeUrl((latest) => ({ ...latest, category }), categoryValues, 'push'));
  }

  function selectOrder(order: ShelfOrder) {
    if (order === query.order) return;
    trackControl('sort', order);
    runShelfTransition(shelfRef.current, () => writeUrl((latest) => ({ ...latest, order }), categoryValues, 'push'));
  }

  function selectView(next: ShelfView) {
    if (next === view) return;
    trackControl('view', next);
    runShelfTransition(shelfRef.current, () => {
      setPage({ key: listKey, visible: visibleAfterViewChange(visible, next), newFrom: -1 });
      storeView(next);
    });
  }

  function loadMore() {
    focusFrom.current = visible;
    setPage({ key: listKey, visible: visible + pageSizeOf(view), newFrom: visible });
  }

  function clearSearch() {
    setDraft({ text: '', base: query.q });
    runShelfTransition(shelfRef.current, () => writeUrl((latest) => ({ ...latest, q: '' }), categoryValues, 'replace'));
  }

  const placement = shelfPlacement(placementPrefix, view);
  const emptyAction = search && searching ? getEmptySearchAction(query.q, search.scope, query.category) : null;
  const titleVisible = headingVisible || searching;

  return (
    <>
      <Suspense fallback={null}>
        <ShelfUrlListener />
      </Suspense>

      <header className={`${SHELF_CONTAINER} pt-8 pb-8 md:pt-12 md:pb-12`}>
        {hero}
        {search ? (
          <form role="search" onSubmit={(event) => event.preventDefault()} className="mt-6 max-w-xl">
            <label htmlFor="busca-estante" className="sr-only">
              {search.label}
            </label>
            <div className="flex min-h-12 items-center gap-2 rounded-full border-2 border-marinho bg-white pr-1 pl-4 focus-within:outline-3 focus-within:outline-offset-2 focus-within:outline-marinho">
              <Search aria-hidden="true" className="size-5 shrink-0 text-marinho" />
              <input
                ref={inputRef}
                id="busca-estante"
                type="search"
                value={inputValue}
                onChange={(event) => setDraft({ text: event.target.value, base: query.q })}
                onKeyDown={(event) => {
                  if (event.key !== 'Escape' || !inputValue) return;
                  event.preventDefault();
                  clearSearch();
                }}
                placeholder={search.placeholder}
                autoComplete="off"
                enterKeyHint="search"
                className="min-w-0 flex-1 bg-transparent py-2.5 text-base font-semibold text-marinho outline-none placeholder:font-medium placeholder:text-marinho-suave [&::-webkit-search-cancel-button]:appearance-none"
              />
              {inputValue ? (
                <button
                  type="button"
                  onClick={() => {
                    clearSearch();
                    inputRef.current?.focus();
                  }}
                  aria-label="Limpar a busca"
                  className={`flex size-11 shrink-0 items-center justify-center rounded-full text-marinho hover:bg-creme ${FOCUS_RING}`}
                >
                  <X aria-hidden="true" className="size-5" />
                </button>
              ) : null}
            </div>
          </form>
        ) : null}
      </header>

      {searching ? null : showcase}

      <RevealSection aria-labelledby="titulo-estante" className="pb-10 md:pb-14">
        <div ref={shelfRef} className={`${SHELF_CONTAINER} flex flex-col gap-4 md:gap-6`}>
          <h2 id="titulo-estante" className={titleVisible ? SHELF_TITLE : 'sr-only'}>
            {titleVisible ? <span className="marca-texto">{searching ? 'Resultados da busca' : heading}</span> : heading}
          </h2>

          <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:justify-between">
            {categories.length > 1 ? (
              <div
                data-categorias="true"
                className="hide-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-1 [mask-image:linear-gradient(to_right,black_85%,transparent)] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:[mask-image:none]"
              >
                {[{ value: null, label: 'Todos' }, ...categories].map(({ value, label }) => (
                  <button
                    key={value ?? 'todos'}
                    type="button"
                    aria-pressed={query.category === value}
                    onClick={() => selectCategory(value)}
                    className={`min-h-11 shrink-0 rounded-full border-2 px-4 text-sm font-bold whitespace-nowrap motion-safe:transition-colors ${
                      query.category === value
                        ? 'border-marinho bg-marinho text-white'
                        : 'border-marinho/20 bg-white text-marinho hover:border-marinho'
                    } ${FOCUS_RING}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            ) : null}
            <div className="flex items-center justify-between gap-3 md:justify-end">
              <p aria-live="polite" className="text-sm font-bold text-marinho-suave">
                {resultsLabel(results.length, query.q)}
              </p>
              <div className="flex items-center gap-2">
                <label htmlFor="ordem-estante" className="sr-only">
                  Ordem
                </label>
                <select
                  id="ordem-estante"
                  value={query.order}
                  onChange={(event) => selectOrder(event.target.value === 'az' ? 'az' : 'novos')}
                  className={`min-h-12 rounded-lg border-2 border-marinho bg-white px-2 text-sm font-extrabold text-marinho ${FOCUS_RING}`}
                >
                  <option value="novos">Mais novos</option>
                  <option value="az">A–Z</option>
                </select>
                <div className="flex rounded-lg border-2 border-marinho">
                  {VIEWS.map(({ value, label, Icon }) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={view === value}
                      onClick={() => selectView(value)}
                      className={`flex min-h-11 items-center gap-1.5 px-3 text-sm font-extrabold first:rounded-l-md last:rounded-r-md ${
                        view === value ? 'bg-marinho text-white' : 'bg-white text-marinho hover:bg-creme'
                      } ${FOCUS_RING}`}
                    >
                      <Icon aria-hidden="true" className="size-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {shown.length > 0 ? (
            <ul
              ref={listRef}
              data-estante={view}
              className={
                view === 'lista'
                  ? 'flex flex-col border-t-2 border-marinho'
                  : 'grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4'
              }
            >
              {shown.map((article, index) => {
                const entering = current.newFrom >= 0 && index >= current.newFrom;
                return (
                  <li
                    key={article.slug}
                    className={`estante-item flex ${entering ? 'estante-entra' : index < GRID_PAGE_SIZE ? 'revela' : ''} ${
                      view === 'lista' ? 'border-b-[1.5px] border-marinho/15' : ''
                    }`}
                    style={
                      {
                        '--vt': `estante-${sanitizeViewTransitionName(article.slug)}`,
                        '--i': entering ? index - current.newFrom : index,
                      } as CSSProperties
                    }
                  >
                    {view === 'lista' ? (
                      <ReviewShelfRow article={article} placement={placement} showStore={showStore} />
                    ) : (
                      <ReviewShelfCard
                        article={article}
                        placement={placement}
                        dateFormat="fullDate"
                        showStore={showStore}
                        imageSizes="(min-width: 1280px) 270px, (min-width: 768px) 30vw, 46vw"
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          ) : emptyAction ? (
            <div className="carimbo-assenta mx-auto flex w-full max-w-md flex-col gap-3 rounded-[10px] border-2 border-dashed border-marinho/40 p-6 text-center">
              <p className="font-extrabold text-marinho">{emptySearchMessage(query.q)}</p>
              {emptyAction.kind === 'all-categories' ? (
                <button type="button" onClick={() => selectCategory(null)} className={EMPTY_PRIMARY}>
                  {emptyAction.label}
                </button>
              ) : (
                <Link href={emptyAction.href} className={EMPTY_PRIMARY}>
                  {emptyAction.label}
                </Link>
              )}
              <button type="button" onClick={clearSearch} className={EMPTY_SECONDARY}>
                Limpar a busca
              </button>
            </div>
          ) : null}

          {results.length > visible ? (
            <button
              type="button"
              onClick={loadMore}
              className={`mx-auto mt-2 inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-marinho bg-white px-8 font-extrabold text-marinho hover:bg-marinho hover:text-white motion-safe:transition-colors ${FOCUS_RING}`}
            >
              Carregar mais
            </button>
          ) : null}

          {footer}
        </div>
      </RevealSection>
    </>
  );
}
```

- [ ] **Step 4: Animações no `globals.css`**

Em `src/app/globals.css`, insira este bloco imediatamente antes da linha `/* Scrollbar customizada */`:

```css
/* /reviews e subpáginas de loja: o marca-texto do h1 se pinta ao abrir a página (a seção já está na
   tela, então não é a revelação da rolagem), a troca animada da estante (ReviewsBrowser), os cartões do
   "Carregar mais" em cascata (--i) e o aviso da busca vazia, que assenta como o carimbo da vitrine. O
   nome de transição de cada item (--vt) só vale com data-trocando, que o ReviewsBrowser põe no
   contêiner durante a troca: o HTML não leva nenhum nome. */
@keyframes marca-texto-pinta {
  from {
    background-size: 0% 45%;
  }
}

@keyframes estante-sobe {
  from {
    opacity: 0;
    translate: 0 12px;
    scale: 0.94;
  }
}

@keyframes carimbo-assenta {
  from {
    opacity: 0;
    scale: 1.06;
    rotate: -1.5deg;
  }
}

@media screen and (prefers-reduced-motion: no-preference) {
  .marca-texto-entra {
    animation: marca-texto-pinta 800ms cubic-bezier(0.2, 0.8, 0.2, 1) 150ms backwards;
  }

  [data-trocando] .estante-item {
    view-transition-name: var(--vt);
    view-transition-class: estante;
  }

  .estante-entra {
    animation: estante-sobe 550ms cubic-bezier(0.2, 0.8, 0.2, 1) backwards;
    animation-delay: calc(min(var(--i, 0), 5) * 70ms);
  }

  .carimbo-assenta {
    animation: carimbo-assenta 500ms cubic-bezier(0.34, 1.56, 0.64, 1) 100ms backwards;
  }
}

::view-transition-group(.estante) {
  animation-duration: 450ms;
  animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
}

```

- [ ] **Step 5: Rodar e ver passar**

Run: `npx tsx scripts/test-reviews-hub.ts < /dev/null`
Expected: PASS.

- [ ] **Step 6: Typecheck, lint e commit**

Run: `npm run typecheck < /dev/null` e `npx eslint src/components/reviews/ReviewsBrowser.tsx scripts/test-reviews-hub.ts --quiet < /dev/null`
Expected: sem erros. Se o `react-hooks/set-state-in-effect` acusar alguma linha, confira que o `setPage` do efeito de volta está dentro da função local `restore` (o padrão aceito pelo lint, como no `OfferCarousel`); não desligue a regra.

```bash
git add src/components/reviews/ReviewsBrowser.tsx src/app/globals.css scripts/test-reviews-hub.ts
git commit -F - <<'EOF'
feat: estante de /reviews com busca, ordem, grade ou lista e troca animada

ReviewsBrowser guarda busca, categoria e ordem na URL, o modo no
aparelho e a página aberta na sessão; abre 12 cartões ou 24 linhas, leva
o foco ao primeiro novo no Carregar mais e anima a troca com a View
Transitions API (nomes só durante a troca). Busca sem resultado oferece
o site todo ou todas as categorias. Animações novas no globals.css,
todas com o movimento liberado.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Task 6: A página `/reviews`

**Files:**
- Create: `src/app/(pt)/reviews/page.tsx`
- Delete: `src/app/(pt)/reviews/page.js`
- Delete: `src/app/(pt)/reviews/ReviewsClientPage.js`
- Modify: `scripts/test-build-output.ts` (imports; o bloco de `/reviews`)

**Interfaces:**
- Consumes: `getReviewsHubContent`, `REVIEWS_TRAIL_ROOT` (Task 1); `ReviewsBrowser` (Task 5); `ReviewsNewRow`, `ReviewsStoreStrip` (Task 4); `couponFontVariables` (`@/components/coupons/CouponBlocks`); `getCollectionPageJsonLd`, `SITE_NAME` (`@/lib/pageSeo`); `LOCALES` (`@/lib/i18n/locales`).
- Produces: no `test-build-output.ts`, as funções `articleLinksIn(html)`, `storeLinksIn(html)` e `assertShelfPage(where, body, expected)`, que a Task 7 usa.

- [ ] **Step 1: Escrever as travas do HTML gerado**

Em `scripts/test-build-output.ts`:

1. Acrescente aos imports, depois de `import { getInternationalReviewHub } from '../src/lib/review-hubs';`:
   ```ts
   import { getReviewsHubContent, getStoreShelfContent } from '../src/lib/reviewsHub';
   import { GRID_PAGE_SIZE } from '../src/lib/reviewsShelf';
   ```
   (O `getStoreShelfContent` só passa a ser usado na Task 7; se o lint acusar import sem uso agora, acrescente-o só na Task 7.)

2. Apague este bloco inteiro (do `const reviewsFile` até o fecho `}` do bloco de controle, logo antes do comentário "O <head> e o JSON-LD de uma página que lista artigos"):
   ```ts
   const reviewsFile = builtFile(`${SITE_URL}/reviews`);
   assert.ok(reviewsFile, '/reviews: página não gerada no build');
   const reviewsBody = bodyOf(read(reviewsFile));
   assertHubCards('/reviews', reviewsBody, 'Lista de conteúdos');

   // Só a grade conta. Um link de artigo sem o anel fora dela, antes do h2 ou depois do fim da <section>,
   // não é card e passa; dentro dela o guarda acusa, e sem o h2 ou com o h2 depois dos cards também.
   {
     const heading = 'Lista de conteúdos';
     …
   }
   ```
   No lugar dele, cole:

   ```ts
   // Os slugs dos links de artigo e de subpágina de loja de um trecho do HTML, na ordem.
   const articleLinksIn = (html: string) =>
     [...html.matchAll(/<a\b[^>]*\bhref="\/reviews\/([^"/?#]+)"/g)].map(([, slug]) => slug);
   const storeLinksIn = (html: string) =>
     [...html.matchAll(/<a\b[^>]*\bhref="\/reviews\/loja\/([^"/?#]+)"/g)].map(([, slug]) => slug);

   // A estante (ReviewsBrowser) no HTML do servidor: os 12 primeiros artigos na ordem "Mais novos", cada
   // link com o anel de foco da casa, nenhum nome de transição (a foto só o ganha no clique: no HTML, o
   // review-hero- fica só no data-vt-name) e a busca com rótulo só quando a página tem busca.
   function assertShelfPage(
     where: string,
     body: string,
     expected: { articles: readonly { slug: string }[]; searchLabel: string | null }
   ) {
     const list = between(body, '<ul data-estante="grade"', ['</ul>']);
     assert.ok(list, `${where}: sem a estante`);
     assert.deepEqual(
       articleLinksIn(list),
       expected.articles.slice(0, GRID_PAGE_SIZE).map(({ slug }) => slug),
       `${where}: os ${GRID_PAGE_SIZE} primeiros artigos, do mais novo`
     );
     for (const [tag] of list.matchAll(/<a\b[^>]*\bhref="\/reviews\/[^"/]+"[^>]*>/g)) {
       assert.match(tag, /\bclass="[^"]* focus-visible:outline-marinho[ "]/, `${where}: cartão sem o anel de foco da casa: ${tag}`);
     }
     assert.ok(!body.includes('view-transition-name'), `${where}: nome de transição no HTML`);
     assert.equal(
       body.match(/review-hero-/g)?.length ?? 0,
       body.match(/data-vt-name="review-hero-/g)?.length ?? 0,
       `${where}: review-hero- fora do data-vt-name`
     );
     const label = body.match(/<label for="busca-estante"[^>]*>([^<]*)<\/label>/)?.[1];
     assert.equal(body.includes('role="search"'), expected.searchLabel !== null, `${where}: busca onde não devia, ou faltando`);
     assert.equal(label === undefined ? null : decodeHtml(label), expected.searchLabel, `${where}: rótulo da busca`);
   }

   // /reviews: o h1, a estante, as Novidades (uma por artigo com o selo "Novo"), as bolinhas das lojas com
   // subpágina e o JSON-LD de lista com a imagem de compartilhamento (assertListPageSeo, mais abaixo no
   // arquivo, é uma declaração de função e vale aqui).
   const reviewsHub = getReviewsHubContent(publishedReviews);
   const reviewsFile = builtFile(`${SITE_URL}/reviews`);
   assert.ok(reviewsFile, '/reviews: página não gerada no build');
   const reviewsHtml = read(reviewsFile);
   const reviewsBody = bodyOf(reviewsHtml);
   assert.equal(textOf(reviewsBody.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? ''), 'Guias & Análises', '/reviews: h1');
   const reviewsShelf = { articles: reviewsHub.articles, searchLabel: 'Buscar nos guias e análises' };
   assertShelfPage('/reviews', reviewsBody, reviewsShelf);
   assertListPageSeo('/reviews', reviewsHtml, { items: reviewsHub.articles.length, image: reviewsHub.socialImage });
   assert.deepEqual(
     articleLinksIn(between(reviewsBody, 'id="titulo-novidades"', ['</section>'])),
     reviewsHub.newArticles.map(({ slug }) => slug),
     '/reviews: Novidades'
   );
   assert.deepEqual(
     storeLinksIn(between(reviewsBody, 'id="titulo-por-loja"', ['</section>'])),
     reviewsHub.stores.map(({ slug }) => slug),
     '/reviews: bolinhas das lojas'
   );
   assert.ok(!reviewsHtml.includes('data-reveal'), '/reviews: data-reveal no HTML');

   // O guarda da estante acusa cada defeito: sem a lista, ordem trocada, cartão sem o anel, nome de
   // transição no HTML e busca sobrando ou faltando.
   {
     const listStart = reviewsBody.indexOf('<ul data-estante="grade"');
     const withoutRing =
       reviewsBody.slice(0, listStart) + reviewsBody.slice(listStart).replace('focus-visible:outline-marinho', '');
     assert.throws(() => assertShelfPage('/reviews', reviewsBody.replace('data-estante="grade"', 'data-x="grade"'), reviewsShelf), /sem a estante/);
     assert.throws(
       () => assertShelfPage('/reviews', reviewsBody, { ...reviewsShelf, articles: [...reviewsShelf.articles].reverse() }),
       /primeiros artigos/
     );
     assert.throws(() => assertShelfPage('/reviews', withoutRing, reviewsShelf), /anel de foco/);
     assert.throws(
       () => assertShelfPage('/reviews', reviewsBody.replace('<ul data-estante="grade"', '<p style="view-transition-name:x"></p><ul data-estante="grade"'), reviewsShelf),
       /nome de transição/
     );
     assert.throws(
       () => assertShelfPage('/reviews', reviewsBody.replace('data-vt-name="review-hero-', 'data-x="review-hero-'), reviewsShelf),
       /review-hero- fora do data-vt-name/
     );
     assert.throws(() => assertShelfPage('/reviews', reviewsBody, { ...reviewsShelf, searchLabel: null }), /busca/);
   }
   ```

- [ ] **Step 2: Criar `src/app/(pt)/reviews/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { couponFontVariables } from '@/components/coupons/CouponBlocks';
import { ReviewsBrowser } from '@/components/reviews/ReviewsBrowser';
import { ReviewsNewRow } from '@/components/reviews/ReviewsNewRow';
import { ReviewsStoreStrip } from '@/components/reviews/ReviewsStoreStrip';
import { publishedReviews } from '@/lib/data';
import { LOCALES } from '@/lib/i18n/locales';
import { SITE_NAME, getCollectionPageJsonLd } from '@/lib/pageSeo';
import { REVIEWS_TRAIL_ROOT, getReviewsHubContent } from '@/lib/reviewsHub';

// Guias & Análises em português: o topo com a busca, as Novidades e as bolinhas das lojas (a vitrine) e
// a estante com todos os artigos. Os dados saem prontos do servidor (reviewsHub.ts).

const TITLE = 'Guias & Análises - Em Casa com Cecília';
const DESCRIPTION =
  'Guias práticos, análises de produtos, reputação de marcas e instruções de compra para ajudar você a decidir com mais contexto.';
const SHARE_DESCRIPTION =
  'Guias práticos, análises de produtos, reputação de marcas e instruções de compra para decisões com mais contexto.';

const content = getReviewsHubContent(publishedReviews);

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/reviews' },
  openGraph: {
    title: TITLE,
    description: SHARE_DESCRIPTION,
    url: '/reviews',
    siteName: SITE_NAME,
    locale: LOCALES.pt.openGraphLocale,
    type: 'website',
    images: [content.socialImage],
  },
  // O layout já define título e descrição genéricos no twitter, e o Next não os troca pelos do Open Graph.
  twitter: { card: 'summary_large_image', title: TITLE, description: SHARE_DESCRIPTION, images: [content.socialImage.url] },
};

export default function ReviewsPage() {
  const jsonLd = getCollectionPageJsonLd({
    name: 'Guias & Análises',
    description: DESCRIPTION,
    path: '/reviews',
    items: content.articles.map((article) => ({ name: article.title, path: article.href })),
    breadcrumb: [REVIEWS_TRAIL_ROOT],
  });

  return (
    <main className={`${couponFontVariables} min-h-screen bg-white text-marinho`}>
      {jsonLd.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <ReviewsBrowser
        articles={content.articles}
        categories={content.categories}
        listPath="/reviews"
        placementPrefix="reviews"
        showStore
        heading="Todos os artigos"
        headingVisible
        search={{ label: 'Buscar nos guias e análises', placeholder: 'Buscar guia, produto ou loja', scope: 'site' }}
        hero={
          <>
            <h1 className="font-condensada text-[44px] leading-none font-black text-marinho font-stretch-extra-condensed md:text-7xl">
              <span className="marca-texto marca-texto-entra">Guias & Análises</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed font-medium text-marinho-suave md:text-lg">{content.intro}</p>
          </>
        }
        showcase={
          <>
            {content.newArticles.length > 0 ? <ReviewsNewRow articles={content.newArticles} /> : null}
            <ReviewsStoreStrip id="titulo-por-loja" title="Por loja" stores={content.stores} placement="reviews_stores" />
          </>
        }
        footer={
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-marinho-suave">
            Cada conteúdo informa sua base: experiência própria, dados públicos ou fontes declaradas. Parcerias comerciais
            são identificadas explicitamente.
          </p>
        }
      />
    </main>
  );
}
```

- [ ] **Step 3: Apagar a página antiga**

```bash
git rm "src/app/(pt)/reviews/page.js" "src/app/(pt)/reviews/ReviewsClientPage.js"
```

Confira com `grep -rn "ReviewsClientPage" src scripts` que nada mais cita o componente apagado (só o `CLAUDE.md`, que a Task 8 atualiza, pode citar `reviews/page.js`).

- [ ] **Step 4: Typecheck, lint e testes rápidos**

Run: `npm run typecheck < /dev/null`, `npx eslint "src/app/(pt)/reviews/page.tsx" scripts/test-build-output.ts --quiet < /dev/null` e `npx tsx scripts/test-reviews-hub.ts < /dev/null`
Expected: sem erros.

- [ ] **Step 5: Build completo**

Com o servidor de desenvolvimento parado:

Run: `npm run build < /dev/null` (timeout de 10 min)
Expected: termina com o `✅ build output: …` do `test-build-output.ts`. Depois:
- `git status --short`: se só `src/lib/generated/content-index.ts` aparecer como modificado e `git diff --stat -- src/lib/generated/content-index.ts` não mostrar linhas reais, rode `git checkout -- src/lib/generated/content-index.ts`;
- `grep -l "view-transition-class" .next/static/css/*.css`: deve achar um arquivo. Se não achar (o Lightning CSS recusou a regra), apague do `globals.css` a linha `view-transition-class: estante;` e o bloco `::view-transition-group(.estante) { … }`, rode a build de novo e registre a decisão no relatório da task (a troca fica com a duração padrão do navegador).

Se a build parar no `validate-yesstyle-coupons.mjs` por oferta vencida, pare e avise (decisão do Bruno).

- [ ] **Step 6: Commit**

```bash
git add "src/app/(pt)/reviews/page.tsx" scripts/test-build-output.ts
git commit -F - <<'EOF'
feat: /reviews no layout da D2 com Novidades, lojas e a estante

A página vira page.tsx: topo com o marca-texto e a busca, Novidades,
Por loja e a estante com todos os artigos em português; ganha o
JSON-LD de lista e a imagem de compartilhamento. Saem o page.js e o
ReviewsClientPage.js. test:build-output confere a estante, as Novidades,
as bolinhas e o JSON-LD no HTML gerado, com controles de cada defeito.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

(O `git rm` do Step 3 já pôs as duas exclusões no índice; o commit leva 4 arquivos.)

---

### Task 7: As subpáginas das lojas

**Files:**
- Modify: `src/app/(pt)/reviews/loja/[brand]/page.tsx` (inteiro)
- Delete: `src/components/review/ReviewHubCard.tsx`
- Modify: `scripts/test-build-output.ts` (apaga `assertHubCards`; refaz o laço das subpáginas; imports)

**Interfaces:**
- Consumes: `getStoreShelfContent`, `type StoreShelfContent` (Task 1); `ReviewsBrowser` (Task 5); `ReviewsStoreStrip`, `SHELF_CONTAINER` (Task 4); `TrackedReviewsLink` (Task 3); `StoreMark` (Task 2); `getArticleCopy` (`@/components/review/articleCopy`); `TrackedCouponPageLink`; `articleLinksIn`, `storeLinksIn`, `assertShelfPage` (Task 6).

- [ ] **Step 1: Reescrever as travas das subpáginas**

Em `scripts/test-build-output.ts`:

1. Apague a função `assertHubCards` inteira, com o comentário que a precede ("Os cards de Guias & Análises (ReviewHubCard)…" até o `}` que fecha a função).
2. Troque o laço das subpáginas, do comentário `// Subpágina de cada loja com mais de 3 artigos: o h1, o canonical, um card por artigo (com o anel de` até o `}` que fecha o `for (const slug of storeArticleSlugs)`, por:

   ```ts
   // A trilha visível de uma subpágina (o <nav> com o rótulo da trilha dos artigos em português) é a do
   // BreadcrumbList do JSON-LD, item por item.
   const STORE_TRAIL_LABEL = getArticleCopy('pt').breadcrumbLabel;
   function storeTrailNames(body: string): string[] {
     const nav = between(body, `<nav aria-label="${STORE_TRAIL_LABEL}"`, ['</nav>']);
     return [...nav.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)].map(([, item]) => textOf(item).replace(/›$/, '').trim());
   }

   // Subpágina de cada loja com mais de 3 artigos: o h1, o canonical, a trilha visível igual ao
   // BreadcrumbList, a estante (busca só acima de 12 artigos e só as categorias da loja), o link da página
   // da loja, Outras lojas sem a loja da página, a imagem de compartilhamento, o JSON-LD e a data no sitemap.
   const storeArticleSlugs = getStoreArticlePageSlugs(publishedReviews);
   for (const slug of storeArticleSlugs) {
     const page = getStoreShelfContent(publishedReviews, slug);
     const storeReviews = getStoreArticlesPage(publishedReviews, slug)?.articles;
     assert.ok(page && storeReviews, `${slug}: sem dados da subpágina`);
     const pagePath = page.path;
     const file = builtFile(`${SITE_URL}${pagePath}`);
     assert.ok(file, `${pagePath}: página não gerada no build`);
     const html = read(file);
     const body = bodyOf(html);
     assert.equal(headOf(html).match(/<link rel="canonical" href="([^"]+)"/)?.[1], `${SITE_URL}${pagePath}`, `${pagePath}: canonical`);
     assert.equal(textOf(body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? ''), page.title, `${pagePath}: h1`);
     assert.ok(body.includes(hrefOf(page.storePageUrl)), `${pagePath}: sem o link de ${page.storePageUrl}`);
     assert.ok(!html.includes('data-reveal'), `${pagePath}: data-reveal no HTML`);

     const trailNames = page.trail.map(({ name }) => name);
     assert.deepEqual(storeTrailNames(body), trailNames, `${pagePath}: trilha visível`);
     const breadcrumb = jsonLdOf(html).find((schema) => schema['@type'] === 'BreadcrumbList');
     assert.deepEqual(
       breadcrumb?.itemListElement?.map((item: { name: string }) => item.name),
       trailNames,
       `${pagePath}: trilha visível diferente do BreadcrumbList`
     );

     assertShelfPage(pagePath, body, { articles: page.articles, searchLabel: page.search?.label ?? null });
     const chips = between(body, 'data-categorias="true"', ['</div>']);
     assert.deepEqual(
       [...chips.matchAll(/<button\b[^>]*aria-pressed="(?:true|false)"[^>]*>([^<]*)<\/button>/g)].map(([, label]) => decodeHtml(label)),
       page.categories.length > 1 ? ['Todos', ...page.categories.map(({ label }) => label)] : [],
       `${pagePath}: categorias da loja`
     );
     assert.deepEqual(
       storeLinksIn(between(body, 'id="titulo-outras-lojas"', ['</section>'])),
       page.otherStores.map((store) => store.slug),
       `${pagePath}: Outras lojas`
     );
     assert.ok(!page.otherStores.some((store) => store.slug === slug), `${pagePath}: Outras lojas com a própria loja`);

     const store = getCouponBySlug(slug);
     assert.ok(store, `${pagePath}: sem a loja ${slug} em couponsData`);
     assertListPageSeo(pagePath, html, { items: page.articles.length, image: getStoreSocialImage(store) });
     assertSitemapLastmod(pagePath, storeReviews);
   }

   // O guarda da trilha acusa o último item trocado.
   {
     const [slug] = storeArticleSlugs;
     const page = getStoreShelfContent(publishedReviews, slug);
     const file = page && builtFile(`${SITE_URL}${page.path}`);
     assert.ok(page && file, 'sem subpágina para o controle da trilha');
     const body = bodyOf(read(file));
     const navStart = body.indexOf(`<nav aria-label="${STORE_TRAIL_LABEL}"`);
     const swapped =
       body.slice(0, navStart) + body.slice(navStart).replace(`>${escapeHtml(page.title)}<`, '>Outro título<');
     assert.notDeepEqual(storeTrailNames(swapped), page.trail.map(({ name }) => name), 'o guarda da trilha deixou passar');
   }
   ```

3. No import de `'../src/lib/homeStores'`, tire `getStoreArticlesPath` (fica sem uso). Mantenha `getStoreArticlesPage` e `getStoreArticlePageSlugs`. Confira que o import de `getStoreShelfContent` (Task 6) está presente.

- [ ] **Step 2: Reescrever `src/app/(pt)/reviews/loja/[brand]/page.tsx`**

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { couponFontVariables } from '@/components/coupons/CouponBlocks';
import { getArticleCopy } from '@/components/review/articleCopy';
import { TrackedCouponPageLink } from '@/components/review/TrackedCouponPageLink';
import { ReviewsBrowser } from '@/components/reviews/ReviewsBrowser';
import { ReviewsStoreStrip } from '@/components/reviews/ReviewsStoreStrip';
import { SHELF_CONTAINER } from '@/components/reviews/shelfClasses';
import { TrackedReviewsLink } from '@/components/reviews/TrackedReviewsLink';
import { StoreMark } from '@/components/sections/HomeStoreStrip';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { getCouponBySlug } from '@/lib/couponsData';
import { publishedReviews } from '@/lib/data';
import { getStoreArticlePageSlugs } from '@/lib/homeStores';
import { LOCALES } from '@/lib/i18n/locales';
import { SITE_NAME, SITE_SOCIAL_IMAGE, getCollectionPageJsonLd, getStoreSocialImage } from '@/lib/pageSeo';
import { getStoreShelfContent, type StoreShelfContent } from '@/lib/reviewsHub';

// Tudo o que a Cecília escreveu sobre uma loja. A página da loja (/cupons/{slug}) responde qual é o
// código e como usar; esta lista os artigos, na estante de /reviews. Só em português, e só para loja
// ativa com mais de 3 artigos.

export const dynamicParams = false;

type StoreArticlesPageProps = {
  params: Promise<{ brand: string }>;
};

export function generateStaticParams() {
  return getStoreArticlePageSlugs(publishedReviews).map((brand) => ({ brand }));
}

export async function generateMetadata({ params }: StoreArticlesPageProps): Promise<Metadata> {
  const page = getStoreShelfContent(publishedReviews, (await params).brand);
  if (!page) return {};
  // A mesma imagem da página de cupom da loja.
  const store = getCouponBySlug(page.slug);
  const image = store ? getStoreSocialImage(store) : SITE_SOCIAL_IMAGE;

  return {
    title: page.metaTitle,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      title: page.metaTitle,
      description: page.description,
      url: page.path,
      siteName: SITE_NAME,
      locale: LOCALES.pt.openGraphLocale,
      type: 'website',
      images: [image],
    },
    // O layout já define título e descrição genéricos no twitter, e o Next não os troca pelos do Open Graph.
    twitter: { card: 'summary_large_image', title: page.metaTitle, description: page.description, images: [image.url] },
  };
}

export default async function StoreArticlesPage({ params }: StoreArticlesPageProps) {
  const page = getStoreShelfContent(publishedReviews, (await params).brand);
  if (!page) notFound();

  const jsonLd = getCollectionPageJsonLd({
    name: page.title,
    description: page.description,
    path: page.path,
    items: page.articles.map((article) => ({ name: article.title, path: article.href })),
    breadcrumb: page.trail.slice(0, -1),
  });

  return (
    <main className={`${couponFontVariables} min-h-screen bg-white pb-16 text-marinho`}>
      {jsonLd.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <ReviewsBrowser
        articles={page.articles}
        categories={page.categories}
        listPath={page.path}
        placementPrefix="store"
        showStore={false}
        heading="Lista de artigos"
        headingVisible={false}
        search={page.search}
        hero={<StoreHero page={page} />}
      />
      <ReviewsStoreStrip id="titulo-outras-lojas" title="Outras lojas" stores={page.otherStores} placement="store_other_stores" />
      <div className={`${SHELF_CONTAINER} flex justify-center`}>
        <TrackedReviewsLink
          href="/reviews"
          placement="store_all_reviews"
          linkLabel="Ver todos os guias e análises"
          className={`inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-marinho px-8 font-extrabold text-marinho hover:bg-marinho hover:text-white motion-safe:transition-colors ${FOCUS_RING}`}
        >
          Ver todos os guias e análises
          <ArrowRight aria-hidden="true" className="size-4" />
        </TrackedReviewsLink>
      </div>
    </main>
  );
}

// O topo da subpágina: a trilha (a mesma lista do BreadcrumbList), a bolinha da loja com o anel, o h1
// com o marca-texto, o total e o botão do código.
function StoreHero({ page }: { page: StoreShelfContent }) {
  return (
    <>
      <nav aria-label={getArticleCopy('pt').breadcrumbLabel} className="mb-5">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-bold text-marinho-suave">
          {page.trail.map((item, index) => {
            const last = index === page.trail.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-marinho">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.path} className={`underline underline-offset-[3px] hover:text-marinho ${FOCUS_RING}`}>
                    {item.name}
                  </Link>
                )}
                {last ? null : <span aria-hidden="true">›</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="flex items-center gap-4 md:gap-6">
          <span className="relative m-1.5 flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-creme shadow-[0_0_0_4px_var(--color-amarelo-cupom),0_0_0_6px_var(--color-marinho)] md:size-24">
            <StoreMark tab={page.store} imageClassName="h-[53%] w-[74%]" sizes="96px" />
          </span>
          <div>
            <h1 className="font-condensada text-[40px] leading-none font-black text-marinho font-stretch-extra-condensed md:text-6xl">
              <span className="marca-texto marca-texto-entra">{page.title}</span>
            </h1>
            <p className="mt-2 text-base font-semibold text-marinho-suave">{page.countLabel}</p>
          </div>
        </div>
        <TrackedCouponPageLink
          href={page.storePageUrl}
          linkLabel={page.codeLinkLabel}
          placement="reviews_store_page"
          className={`inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-[10px] border-2 border-marinho bg-laranja px-5 text-[15px] font-extrabold text-marinho hover:bg-laranja/85 motion-safe:transition-colors md:self-auto ${FOCUS_RING}`}
        >
          {page.codeLinkLabel}
          <ArrowRight aria-hidden="true" className="size-4" />
        </TrackedCouponPageLink>
      </div>
    </>
  );
}
```

- [ ] **Step 3: Apagar o cartão antigo**

Confira com `grep -rn "ReviewHubCard" src scripts` que só o próprio arquivo cita o nome; então:

```bash
git rm src/components/review/ReviewHubCard.tsx
```

- [ ] **Step 4: Typecheck, lint, testes e build completo**

Run: `npm run typecheck < /dev/null`, `npx eslint "src/app/(pt)/reviews/loja/[brand]/page.tsx" scripts/test-build-output.ts --quiet < /dev/null` e `npx tsx scripts/test-reviews-hub.ts < /dev/null`
Expected: sem erros.

Com o servidor de desenvolvimento parado: `npm run build < /dev/null` (timeout de 10 min).
Expected: termina com o `✅ build output: …`, contando 6 subpáginas de loja. Restaure o `content-index.ts` se só o fim de linha mudou (como na Task 6). Se parar no `validate-yesstyle-coupons.mjs` por oferta vencida, pare e avise.

- [ ] **Step 5: Commit**

```bash
git add "src/app/(pt)/reviews/loja/[brand]/page.tsx" scripts/test-build-output.ts
git commit -F - <<'EOF'
feat: subpáginas das lojas com a estante, a trilha e Outras lojas

O topo ganha a trilha visível (a mesma lista do BreadcrumbList), a
bolinha da loja e o botão do código; os artigos vão para a estante de
/reviews, com busca só acima de 12 artigos e só as categorias da loja;
no fim, Outras lojas e o link para todos os guias. Sai o ReviewHubCard.
test:build-output confere trilha, estante, categorias e Outras lojas.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Task 8: Documentação

**Files:**
- Modify: `CLAUDE.md`
- Modify: `docs/GUIA-EDITORIAL-GUIAS-ANALISES.md` (seção 10)

- [ ] **Step 1: `CLAUDE.md`**

1. Na lista de comandos, depois da linha do `npm run test:home-stores`, acrescente:
   ```
   npm run test:reviews-hub     # estante de /reviews e das subpáginas: busca sem acento, ordem, URL, Novidades, bolinhas, páginas de 12 e 24, medição e os componentes
   ```
2. Na descrição do `npm run test:build-output`, troque o trecho `os cards de /reviews, as subpáginas de loja e as páginas de data (imagem e JSON-LD)` por `a estante de /reviews e das subpáginas de loja (os 12 primeiros artigos, a busca, as Novidades, as bolinhas, a trilha das subpáginas igual ao BreadcrumbList, as categorias da loja e Outras lojas), as páginas de data (imagem e JSON-LD)`.
3. Troque o parágrafo que começa por "Filtro que só muda a query string da mesma página" pelo texto abaixo:
   ```
   Filtro que só muda a query string da mesma página (ex.: `/receitas`, `/reviews`) não usa
   `router.replace`/`push`: o router baixa de novo o payload RSC da página — com todos os cards — a
   cada clique. `/receitas` usa `window.history.replaceState`, que o Next sincroniza com o
   `useSearchParams` sem ida ao servidor. A estante de `/reviews` e das subpáginas de loja
   (`ReviewsBrowser`) usa `pushState` para categoria e ordem e `replaceState` para a busca, e lê a URL
   com `useSyncExternalStore`; o `useSearchParams` fica num componente vazio com Suspense próprio, só
   para avisar das mudanças, e assim o prerender não para no Suspense e o HTML estático traz os cards.
   ```
4. Em "Component layers", depois do item de `src/components/sections/`, acrescente:
   ```
   - `src/components/reviews/` — a estante de `/reviews` e das subpáginas de loja: `ReviewsBrowser` (busca, categorias, ordem, grade ou lista, "Carregar mais", a URL e a troca animada), `ReviewShelfCard` e `ReviewShelfRow`, `ReviewsNewRow` (Novidades), `ReviewsStoreStrip` e `StoreBubbleLink` (bolinhas) e `TrackedReviewsLink` (`reviews_route_click`). As regras que o navegador usa ficam em `src/lib/reviewsShelf.ts`; os dados, montados no servidor, em `src/lib/reviewsHub.ts`. O ímã dos cartões (`cardDecor.ts`), a inclinação das bolinhas (`useBubbleTilt.ts`) e a fila com setas (`useRowScroll.ts`) ficam em `src/components/ui/`, usados também pela home.
   ```
5. Na tabela "Pages", troque a linha de `/reviews` por:
   ```
   | `/reviews` | `src/app/(pt)/reviews/page.tsx` (Novidades, bolinhas e a estante `ReviewsBrowser`; dados em `src/lib/reviewsHub.ts`) |
   ```
   e a de `/reviews/loja/[brand]` por:
   ```
   | `/reviews/loja/[brand]` | `src/app/(pt)/reviews/loja/[brand]/page.tsx` (só lojas ativas com mais de 3 artigos; a estante de `/reviews`, com busca acima de 12 artigos) |
   ```
6. Na seção "Styling", depois do parágrafo que começa por "Animação que respeita", acrescente:
   ```
   Na estante de `/reviews`, o `ReviewsBrowser` anima a troca da lista com a View Transitions API: o
   `data-trocando` no contêiner liga o `view-transition-name` de cada item (a variável `--vt`) só durante
   a troca, e a foto do cartão só ganha o nome da transição para o artigo (`data-vt-name`) no clique,
   pelo `ViewTransitionLink`. O HTML do servidor não leva nenhum nome; o `test:build-output` confere.
   ```

- [ ] **Step 2: Seção 10 do guia editorial**

Em `docs/GUIA-EDITORIAL-GUIAS-ANALISES.md`:

1. Troque o título `## 10. Onde o artigo aparece na home` por `## 10. Onde o artigo aparece na home e em /reviews`.
2. Depois do item "**na faixa de uma data comercial**…" (o último da lista), acrescente:
   ```
   - **em `/reviews`**, sempre, em "Todos os artigos" (ordem "Mais novos" por `publishedAtISO`,
     desempate pelo maior `id`, ou "A–Z" pelo título); **nas Novidades**, enquanto tiver `isNew` (a
     regra mensal do selo "Novo"); e, pelo `affiliate`, na subpágina `/reviews/loja/<slug>` da loja e na
     bolinha dela em "Por loja", quando a loja tem mais de 3 artigos.
   ```
3. Troque a frase "`category` continua valendo para os filtros de `/reviews`. `type`, `reviewKind`, `isNew`, `pros/cons` e a marca citada no texto não mudam o lugar do artigo na home." por:
   ```
   `category` continua valendo para os filtros de `/reviews`, e `isNew` só põe o artigo nas Novidades de
   `/reviews`. `type`, `reviewKind`, `isNew`, `pros/cons` e a marca citada no texto não mudam o lugar do
   artigo na home.
   ```

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md docs/GUIA-EDITORIAL-GUIAS-ANALISES.md
git commit -F - <<'EOF'
docs: estante de /reviews no CLAUDE.md e no guia editorial

Páginas, camadas de componentes, o test:reviews-hub, a URL da estante, a
troca animada e onde o artigo aparece em /reviews (Novidades pelo isNew,
subpágina e bolinha pelo affiliate).

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

## Conferência final (controlador)

Depois das 8 tasks e das revisões de cada uma (Claude e Meta Muse):

1. **No navegador**, com o servidor de desenvolvimento (`npm run dev`, a partir do worktree), em `/reviews`, `/reviews/loja/damie` (com busca) e `/reviews/loja/letseatit` (sem busca), a 375, 768 e 1280 px:
   - o topo, as Novidades (setas só quando transborda), as bolinhas (inclinação com o mouse, anel amarelo), a estante;
   - busca com acento e sem, com categoria, sem resultado (os dois botões), Esc e ✕;
   - ordem A–Z, grade e lista (a troca animada), "Carregar mais" (foco no primeiro novo, cascata);
   - abrir um artigo pelas Novidades e pelo acervo (a foto voa para o topo) e voltar (a lista volta igual);
   - "reduzir movimento" ligado: tudo parado e funcionando;
   - console sem erros;
   - a home: bolinhas da vitrine e setas das ofertas iguais a antes.
2. **Build completo** verde no HEAD final.
3. **Revisão final do branch** (Claude no modelo mais capaz e Meta Muse), recibo em G.
4. O deploy vai com o resto da D2.2, só quando o Bruno decidir.
