# Home D2, vitrine: plano de implementação (Fases 1, 2a e 2b)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** a home abre pela vitrine da D2. A bolinha da Cecília mostra a apresentação dela; a de cada
loja mostra o código em destaque e os artigos sobre a loja, sem código. Cada loja com artigo ganha a
subpágina `/reviews/loja/{slug}`.

**Architecture:** um módulo do servidor, `src/lib/homeStores.ts`, monta os dados a partir das
reviews e de `couponsData.ts`. O componente cliente `HomeStoreStories` recebe só dados prontos, e as
regras que ele usa no navegador ficam num módulo sem dados, `src/lib/homeStoreTabs.ts`. A aba aberta
vem do hash da URL (`useSyncExternalStore`), como a categoria em `/reviews`. O painel da Cecília é um
componente do servidor, passado pronto para a vitrine. A subpágina é estática (`generateStaticParams`
com `dynamicParams = false`) e usa o card de `/reviews`, extraído para `ReviewHubCard.tsx`.

**Tech Stack:** Next.js 16.1.4 (App Router, SSR), React 19.2, Tailwind CSS v4 (tokens do Encarte:
`marinho`, `marinho-suave`, `amarelo-cupom`, `laranja`, `creme`, `font-condensada`, `font-codigo`),
testes em `tsx` com `node:assert/strict`.

**Spec:** `docs/superpowers/specs/2026-10-07-home-d2-design.md` (seções "Seção 2: vitrine", "Todos
os artigos de uma loja", "Analytics" e "Testes"). Este plano cobre as Fases 1, 2a e 2b. As Fases 3
(Acabou de sair e faixa Sobre), 4 (datas comerciais), 5 (seções de baixo) e 6 (remoções e travas)
ganham planos próprios quando chegarmos nelas, escritos sobre o código que existir então.

## Global Constraints

- Branch `claude/home-d2`, que já tem a spec e acumula as fases. Nada vai ao ar no meio: a D2 vai
  inteira, depois da Fase 6c, com decisão explícita do Bruno.
- No máximo 5 arquivos por fase. Cada fase termina com `npm run typecheck`, `npx eslint --quiet` nos
  arquivos tocados e os testes da fase. **Depois de cada fase, parar e esperar a aprovação do Bruno.**
- Nunca `git add -A` nem `git add .`; nunca pular hooks; nunca `git stash` sem nome.
- Mensagens de commit em português, no formato `tipo: descrição`, terminando com
  `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Arquivo `'use client'` não importa valor de `@/lib/data` nem de `@/lib/homeStores` (que carrega
  `couponsData.ts`). O cliente recebe tudo por props.
- Textos dos códigos:
  - CECILIA010 é código de recompensa, nunca "cupom";
  - 4CW5Y é código de indicação da SHEIN, pesquisado no aplicativo;
  - a Insider mostra o desconto que estiver em `couponsData.ts`: desde 07/10 o Bruno decidiu
    mostrar o percentual (15%), e a página da loja muda em outra sessão;
  - a Nestlé Nutre mantém a exclusão das fórmulas infantis de 0 a 12 meses;
  - "Ver a página da loja" leva a `/cupons/<slug>` em toda loja, a DAMIE inclusive: o menu já
    linka o subdomínio da DAMIE, e a vitrine traz tráfego para `/cupons/damie` (decisão do Bruno
    em 08/10, que para a vitrine substitui a regra do dossiê de 07/10).
- Os rótulos de código vêm de `getCodeTitle` e `getCodeHints` (`src/components/review/sidebarCopy.ts`),
  e o botão de copiar é o `CopyCodeButton` de `CouponActions.tsx`, com os rótulos de
  `getCouponCopyLabels('pt')`. Nenhum texto de código solto no JSX.
- O site escreve "do Magalu" e "da" para as outras lojas (contado em `src` e `content/reviews` em 08/10).
- Animações e efeitos: o Bruno pediu em 08/10 para manter o que der, e depois avaliar o que mais
  entra. A vitrine leva todos os do canvas:
  - entrada da aba (0,4 s, opacidade 0,3 e 8 px);
  - brilho amarelo no código ao copiar;
  - hover das bolinhas (1,06), do cartão de foto (endireita e sobe 4 px) e das redes (sobe 2 px);
  - do hero de hoje, o zoom lento da foto (`ken-burns`) e os ícones flutuando ao fundo do painel da
    Cecília (`float`, `float-delayed`).

  Tudo com `motion-safe:`, usando as keyframes que já estão em `globals.css`. Nenhum CSS novo em
  `globals.css`.
- Alvos de toque de 44 px no mínimo, fonte de 12 px no mínimo, foco visível (`FOCUS_RING`
  marinho no claro, amarelo no marinho).
- Comandos rodam a partir do worktree
  `C:/Users/Bruno/Downloads/Emcasacomcecilia/emcasacomcecilia/.claude/worktrees/inspiring-curie-d32d66`.

## Estrutura de arquivos

| Arquivo | Fase | Responsabilidade |
|---|---|---|
| `src/lib/homeStoreTabs.ts` (novo) | 1 | Tipos da vitrine e as regras que o navegador usa: âncora e hash de cada aba, aba padrão, ordem das abas, parâmetros do evento `home_store_select`. Sem dados |
| `src/lib/homeStores.ts` (novo) | 1 | Servidor: abas das lojas, artigos por loja, link da página do código, dados da subpágina, "Acabou de sair" e números das redes |
| `src/lib/couponsData.ts` | 1 | Campo `storePageUrl`, posto na Task 2 e tirado na 4b: sem mudança líquida |
| `scripts/test-home-stores.ts` (novo) | 1, 2b | Teste da Fase 1, ampliado na 2b |
| `package.json` | 1 | Script `test:home-stores` e entrada na cadeia do `build` |
| `src/components/coupons/CouponActions.tsx` | 2a | `CopyPlacement` ganha `home_store_banner` |
| `src/components/TrackedHomeLink.tsx` | 2a | `HomeRoutePlacement` ganha os placements da vitrine |
| `src/components/sections/HomeCeciliaPanel.tsx` (novo) | 2a | Servidor: painel da Cecília (o hero dela) |
| `src/components/sections/HomeStoreStories.tsx` (novo) | 2a | Cliente: bolinhas, painéis, recorte do código, story e lista |
| `src/app/(pt)/page.js` | 2a | Vitrine no lugar da faixa de cupons e do Hero; `h1` só para leitor de tela |
| `src/components/review/ReviewHubCard.tsx` (novo) | 2b | Card de `/reviews`, usado também pela subpágina |
| `src/app/(pt)/reviews/ReviewsClientPage.js` | 2b | Passa a usar o `ReviewHubCard` |
| `src/app/(pt)/reviews/loja/[brand]/page.tsx` (novo) | 2b | Subpágina de cada loja |
| `src/app/sitemap.ts` | 2b | Entradas das subpáginas |

`Hero.tsx` e `CouponStrip.tsx` saem do `page.js` na Fase 2a e ficam sem uso até a Fase 6a, que os
apaga depois do grep (spec, "Fases"). Os três `path` de ícone que o `HomeCeciliaPanel` copia do Hero
voltam a existir num lugar só quando o Hero sair.

---

# Fase 1: dados da vitrine (5 arquivos)

### Task 1: regras das abas (`homeStoreTabs.ts`) e o teste novo

**Files:**
- Create: `src/lib/homeStoreTabs.ts`
- Create: `scripts/test-home-stores.ts`
- Modify: `package.json` (linha do `build` e lista de scripts)

**Interfaces:**
- Produces:
  - `CECILIA_TAB_ID = 'cecilia'`, `DEFAULT_STORE_SLUG = 'damie'`;
  - `type HomeStoreArticle = { slug: string; href: string; title: string; type: string; image?: string }`;
  - `type HomeStoreTab` (campos abaixo);
  - `getTabAnchor(tabId: string): string`;
  - `parseTabHash(hash: string, storeSlugs: readonly string[]): string | null`;
  - `getDefaultTabId(storeSlugs: readonly string[]): string`;
  - `getTabOrder(storeSlugs: readonly string[]): string[]`;
  - `getHomeStoreSelectParameters(tabId: string): { store: string; placement: 'home_store_tabs' }`.

- [ ] **Step 1: escrever o teste que falha**

Criar `scripts/test-home-stores.ts`:

```ts
import assert from 'node:assert/strict';

import {
  CECILIA_TAB_ID,
  getDefaultTabId,
  getHomeStoreSelectParameters,
  getTabAnchor,
  getTabOrder,
  parseTabHash,
} from '@/lib/homeStoreTabs';

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

console.log('✅ homeStores: regras das abas passaram.');
```

- [ ] **Step 2: rodar e ver falhar**

Run: `npx tsx scripts/test-home-stores.ts`
Expected: FAIL com `Cannot find module '@/lib/homeStoreTabs'` (ou equivalente do `tsx`).

- [ ] **Step 3: escrever `src/lib/homeStoreTabs.ts`**

```ts
// Regras da vitrine da home que valem no servidor e no navegador. O componente cliente importa
// daqui; os dados das lojas chegam prontos de homeStores.ts, que fica no servidor.

export const CECILIA_TAB_ID = 'cecilia';
// Loja aberta ao entrar na home (decisão de 07/10).
export const DEFAULT_STORE_SLUG = 'damie';

export type HomeStoreArticle = {
  slug: string;
  href: string;
  title: string;
  type: string;
  // URL de entrega, já resolvida.
  image?: string;
};

export type HomeStoreTab = {
  slug: string;
  brand: string;
  // URL de entrega do logo; sem ele, a bolinha e o recorte mostram as iniciais (brandIcon).
  logo?: string;
  initials: string;
  label: string;
  // Falta só em loja de link sem código de indicação.
  code?: string;
  discount: string;
  description: string;
  hints: { copy: string; copied: string };
  storeUrl: string;
  storeLinkLabel: string;
  storePageUrl: string;
  listTitle: string;
  articles: HomeStoreArticle[];
  total: number;
  allArticles?: { href: string; label: string };
  emptyText: string;
};

// O id da bolinha é o próprio hash: o navegador rola até a vitrine ao seguir /#loja-yesstyle.
export function getTabAnchor(tabId: string): string {
  return tabId === CECILIA_TAB_ID ? CECILIA_TAB_ID : `loja-${tabId}`;
}

// Hash desconhecido não muda nada: a vitrine segue na aba padrão.
export function parseTabHash(hash: string, storeSlugs: readonly string[]): string | null {
  const anchor = hash.replace(/^#/, '');
  if (anchor === CECILIA_TAB_ID) return CECILIA_TAB_ID;
  const slug = anchor.startsWith('loja-') ? anchor.slice('loja-'.length) : '';
  return storeSlugs.includes(slug) ? slug : null;
}

export function getDefaultTabId(storeSlugs: readonly string[]): string {
  if (storeSlugs.includes(DEFAULT_STORE_SLUG)) return DEFAULT_STORE_SLUG;
  return storeSlugs[0] ?? CECILIA_TAB_ID;
}

export function getTabOrder(storeSlugs: readonly string[]): string[] {
  return [CECILIA_TAB_ID, ...storeSlugs];
}

export function getHomeStoreSelectParameters(tabId: string) {
  return { store: tabId, placement: 'home_store_tabs' as const };
}
```

- [ ] **Step 4: rodar e ver passar**

Run: `npx tsx scripts/test-home-stores.ts`
Expected: `✅ homeStores: regras das abas passaram.`

- [ ] **Step 5: registrar o teste no `package.json`**

Na lista de scripts, logo depois de `"test:home-curation": "tsx scripts/test-home-curation.ts",`,
acrescentar:

```json
    "test:home-stores": "tsx scripts/test-home-stores.ts",
```

Na linha do `"build"`, trocar `tsx scripts/test-home-curation.ts && ` por
`tsx scripts/test-home-curation.ts && tsx scripts/test-home-stores.ts && ` (uma vez só; conferir com
`grep -o "test-home-stores" package.json | wc -l`, que deve dar 2).

Run: `npm run test:home-stores`
Expected: a mesma linha ✅.

- [ ] **Step 6: commit**

```bash
git add src/lib/homeStoreTabs.ts scripts/test-home-stores.ts package.json
git commit -m "feat: regras das abas da vitrine da home, com teste próprio

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

### Task 2: link da página do código (`storePageUrl` e `getStorePageUrl`)

> Desfeita pela Task 4b (decisão do Bruno em 08/10): a vitrine leva a `/cupons/damie`.

**Files:**
- Modify: `src/lib/couponsData.ts` (interface `CouponBase` e a entrada da DAMIE, perto da linha 130)
- Create: `src/lib/homeStores.ts`
- Test: `scripts/test-home-stores.ts`

**Interfaces:**
- Consumes: `Coupon`, `COUPONS` de `couponsData.ts`.
- Produces:
  - `type StorePagePlacement = 'home' | 'reviews-loja'`;
  - `getStorePageUrl(store: Pick<Coupon, 'slug' | 'storePageUrl'>, placement: StorePagePlacement): string`.

- [ ] **Step 1: escrever o teste que falha**

No topo de `scripts/test-home-stores.ts`, junto dos imports, acrescentar:

```ts
import { COUPONS } from '@/lib/couponsData';
import { getStorePageUrl } from '@/lib/homeStores';

function store(slug: string) {
  const found = COUPONS.find((coupon) => coupon.slug === slug);
  assert.ok(found, `loja ${slug} existe em couponsData.ts`);
  return found;
}
```

Antes do `console.log` final, acrescentar:

```ts
// A DAMIE leva à página do código no subdomínio, nunca a /cupons/damie (dossiê de 07/10).
const DAMIE_CODE_PAGE =
  'https://damie.emcasacomcecilia.com/cupom-cecilia12?utm_source=site-principal&utm_medium=blog&utm_campaign=cecilia12';
assert.equal(getStorePageUrl(store('damie'), 'home'), `${DAMIE_CODE_PAGE}&utm_content=home`);
assert.equal(getStorePageUrl(store('damie'), 'reviews-loja'), `${DAMIE_CODE_PAGE}&utm_content=reviews-loja`);
assert.equal(getStorePageUrl(store('yesstyle'), 'home'), '/cupons/yesstyle');
assert.equal(getStorePageUrl(store('nestle-nutre'), 'reviews-loja'), '/cupons/nestle-nutre');
```

- [ ] **Step 2: rodar e ver falhar**

Run: `npm run test:home-stores`
Expected: FAIL, `Cannot find module '@/lib/homeStores'`.

- [ ] **Step 3: campo novo em `couponsData.ts`**

Em `interface CouponBase`, logo depois de `offerUrl: string;` (atenção: a `CouponCampaign`, mais
acima, também tem um `offerUrl: string;`; o campo novo vai na `CouponBase`):

```ts
  // Página do código fora de /cupons, já com a UTM da parceria; o lugar do link entra no
  // utm_content (homeStores.ts). Só a DAMIE usa: o dossiê de 07/10 proíbe linkar /cupons/damie.
  storePageUrl?: string;
```

Na entrada da DAMIE, trocar

```ts
    officialUrl: 'https://damie.com.br',
    offerUrl: 'https://damie.com.br',
```

por

```ts
    officialUrl: 'https://damie.com.br',
    offerUrl: 'https://damie.com.br',
    storePageUrl:
      'https://damie.emcasacomcecilia.com/cupom-cecilia12?utm_source=site-principal&utm_medium=blog&utm_campaign=cecilia12',
```

- [ ] **Step 4: criar `src/lib/homeStores.ts` com o link**

```ts
import type { Coupon } from '@/lib/couponsData';

// Dados da vitrine da home e da subpágina /reviews/loja/{slug}. Recebe as reviews por parâmetro e
// não importa '@/lib/data': quem chama é o servidor, e o componente cliente recebe só o resultado.

export type StorePagePlacement = 'home' | 'reviews-loja';

export function getStorePageUrl(
  store: Pick<Coupon, 'slug' | 'storePageUrl'>,
  placement: StorePagePlacement
): string {
  if (!store.storePageUrl) return `/cupons/${store.slug}`;
  const url = new URL(store.storePageUrl);
  url.searchParams.set('utm_content', placement);
  return url.toString();
}
```

- [ ] **Step 5: rodar e ver passar**

Run: `npm run test:home-stores && npm run typecheck`
Expected: ✅ e `tsc` sem erro.

- [ ] **Step 6: commit**

```bash
git add src/lib/couponsData.ts src/lib/homeStores.ts scripts/test-home-stores.ts
git commit -m "feat: página do código da DAMIE no subdomínio, com o lugar do link na UTM

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

### Task 3: abas das lojas e artigos por loja

> A Task 4b troca `getStorePageUrl` por `getCouponStorePath(store.slug, 'pt')` nas duas montagens.

**Files:**
- Modify: `src/lib/homeStores.ts`
- Test: `scripts/test-home-stores.ts`

**Interfaces:**
- Consumes: `getActiveCoupons`, `getStoreCodeKind`, `Coupon` (`couponsData.ts`);
  `getCodeTitle`, `getCodeHints`, `getSidebarCopy` (`sidebarCopy.ts`);
  `getListedPortugueseReviews`, `sortReviewsByPublishedAt`, `ReviewDiscoveryItem`
  (`reviewDiscovery.ts`); `resolveMediaUrl`; `HomeStoreTab` (Task 1).
- Produces:
  - `type StoreReview = ReviewDiscoveryItem & { affiliate?: string }`;
  - `getStoreArticlesPath(slug: string): string`;
  - `getHomeStoreTabs<T extends StoreReview>(reviews: readonly T[], stores?: readonly Coupon[]): HomeStoreTab[]`;
  - `getStoreArticlesPage<T extends StoreReview>(reviews: readonly T[], slug: string, stores?: readonly Coupon[])`,
    que devolve `{ slug, brand, title, metaTitle, description, countLabel, codeLinkLabel, storePageUrl, articles: T[] } | null`;
  - `getStoreArticlePageSlugs<T extends StoreReview>(reviews: readonly T[], stores?: readonly Coupon[]): string[]`.

- [ ] **Step 1: escrever o teste que falha**

Ampliar os imports de `scripts/test-home-stores.ts`:

```ts
import { COUPONS, getActiveCoupons, type Coupon } from '@/lib/couponsData';
import { publishedReviews } from '@/lib/data';
import {
  getHomeStoreTabs,
  getStoreArticlePageSlugs,
  getStoreArticlesPage,
  getStorePageUrl,
  type StoreReview,
} from '@/lib/homeStores';
import { getListedPortugueseReviews, sortReviewsByPublishedAt } from '@/lib/reviewDiscovery';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';
```

(o import antigo de `COUPONS` e o de `getStorePageUrl` saem, substituídos por estes.)

Logo abaixo da função `store`, acrescentar o fixture de review:

```ts
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
```

Antes do `console.log` final, acrescentar:

```ts
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
assert.equal(tab('yesstyle').label, 'Código de recompensa YesStyle');
assert.ok(
  ![tab('yesstyle').label, tab('yesstyle').hints.copy, tab('yesstyle').hints.copied].some((text) => /cupom/i.test(text)),
  'o CECILIA010 nunca é chamado de cupom'
);
assert.equal(tab('shein').label, 'Código de indicação SHEIN');
assert.equal(tab('shein').code, '4CW5Y');
assert.equal(tab('shein').hints.copy, 'Copie e pesquise no aplicativo SHEIN.');
assert.ok(!JSON.stringify(tab('insider')).includes('%'), 'a Insider nunca mostra percentual');
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
  assert.ok(!current.storePageUrl.includes('/cupons/damie'), `${current.slug}: nunca /cupons/damie`);
}

// Subpágina: dados e lojas com página.
const damiePage = getStoreArticlesPage(publishedReviews, 'damie');
assert.ok(damiePage);
assert.equal(damiePage.title, 'Artigos da DAMIE');
assert.equal(damiePage.metaTitle, 'DAMIE: guias e análises - Em Casa com Cecília');
assert.equal(damiePage.codeLinkLabel, 'Ver o código da DAMIE');
assert.equal(damiePage.storePageUrl, getStorePageUrl(store('damie'), 'reviews-loja'));
assert.equal(damiePage.articles.length, tab('damie').total);
assert.equal(getStoreArticlesPage(publishedReviews, 'loja-que-nao-existe'), null);
assert.equal(getStoreArticlesPage(publishedReviews, 'kopenhagen'), null, 'pausada');
assert.equal(getStoreArticlesPage(fixtureReviews, 'shein', [store('shein')]), null, 'sem artigo, sem página');

const magaluPage = getStoreArticlesPage(fixtureReviews, 'magalu', [store('magalu')]);
assert.ok(magaluPage);
assert.equal(magaluPage.countLabel, '4 artigos da Cecília sobre o Magalu');
assert.equal(magaluPage.description, '4 artigos da Cecília sobre o Magalu: guias e análises, do mais novo para o mais antigo.');
const umArtigo = getStoreArticlesPage([review(1, 'so-um', 'magalu', '2026-10-01')], 'magalu', [store('magalu')]);
assert.equal(umArtigo?.countLabel, '1 artigo da Cecília sobre o Magalu');

assert.deepEqual(getStoreArticlePageSlugs(fixtureReviews, [store('damie'), store('magalu'), store('shein')]), ['damie', 'magalu']);
assert.deepEqual(
  getStoreArticlePageSlugs(publishedReviews),
  getActiveCoupons()
    .filter((coupon) => listed.some((item) => item.affiliate === coupon.slug))
    .map(({ slug }) => slug),
  'subpágina para toda loja ativa com artigo'
);
```

- [ ] **Step 2: rodar e ver falhar**

Run: `npm run test:home-stores`
Expected: FAIL com erro de import (`getHomeStoreTabs` não existe).

- [ ] **Step 3: implementar em `src/lib/homeStores.ts`**

Trocar o import de tipo do topo e acrescentar o resto, deixando o arquivo assim:

```ts
import { getActiveCoupons, getStoreCodeKind, type Coupon } from '@/lib/couponsData';
import { getCodeHints, getCodeTitle, getSidebarCopy } from '@/components/review/sidebarCopy';
import type { HomeStoreTab } from '@/lib/homeStoreTabs';
import {
  getListedPortugueseReviews,
  sortReviewsByPublishedAt,
  type ReviewDiscoveryItem,
} from '@/lib/reviewDiscovery';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

// Dados da vitrine da home e da subpágina /reviews/loja/{slug}. Recebe as reviews por parâmetro e
// não importa '@/lib/data': quem chama é o servidor, e o componente cliente recebe só o resultado.

export type StoreReview = ReviewDiscoveryItem & { affiliate?: string };
export type StorePagePlacement = 'home' | 'reviews-loja';

const VISIBLE_ARTICLES = 3;

// O site escreve "do Magalu" e "da" para as outras lojas.
const MASCULINE_STORES = new Set(['magalu']);

function ofStore(store: Pick<Coupon, 'slug' | 'brand'>): string {
  return `${MASCULINE_STORES.has(store.slug) ? 'do' : 'da'} ${store.brand}`;
}

function theStore(store: Pick<Coupon, 'slug' | 'brand'>): string {
  return `${MASCULINE_STORES.has(store.slug) ? 'o' : 'a'} ${store.brand}`;
}

function listedNewestFirst<T extends StoreReview>(reviews: readonly T[]) {
  return sortReviewsByPublishedAt(getListedPortugueseReviews(reviews));
}

export function getStorePageUrl(
  store: Pick<Coupon, 'slug' | 'storePageUrl'>,
  placement: StorePagePlacement
): string {
  if (!store.storePageUrl) return `/cupons/${store.slug}`;
  const url = new URL(store.storePageUrl);
  url.searchParams.set('utm_content', placement);
  return url.toString();
}

export function getStoreArticlesPath(slug: string): string {
  return `/reviews/loja/${slug}`;
}

export function getHomeStoreTabs<T extends StoreReview>(
  reviews: readonly T[],
  stores: readonly Coupon[] = getActiveCoupons()
): HomeStoreTab[] {
  const listed = listedNewestFirst(reviews);
  const copy = getSidebarCopy('pt');

  return stores.map((store) => {
    const code = store.offerMode === 'discount-code' ? store.code : store.referral?.code;
    const kind = getStoreCodeKind(store, code);
    const articles = listed.filter((review) => review.affiliate === store.slug);

    return {
      slug: store.slug,
      brand: store.brand,
      logo: store.brandLogo ? resolveMediaUrl(store.brandLogo) : undefined,
      initials: store.brandIcon,
      label: code ? getCodeTitle(copy, kind, store.brand) : store.brand,
      code,
      discount: store.discount,
      description: store.shortDescription,
      hints: getCodeHints(copy, kind, store.brand),
      storeUrl: store.offerUrl,
      storeLinkLabel: `Ir para ${theStore(store)}`,
      storePageUrl: getStorePageUrl(store, 'home'),
      listTitle: `Artigos ${ofStore(store)}`,
      articles: articles.slice(0, VISIBLE_ARTICLES).map((review) => ({
        slug: review.slug,
        href: `/reviews/${review.slug}`,
        title: review.title,
        type: review.type,
        image: review.image ? resolveMediaUrl(review.image) : undefined,
      })),
      total: articles.length,
      allArticles:
        articles.length > VISIBLE_ARTICLES
          ? { href: getStoreArticlesPath(store.slug), label: `Ver os ${articles.length} artigos ${ofStore(store)}` }
          : undefined,
      emptyText: `Ainda não há artigo ${ofStore(store)} por aqui. As campanhas vigentes ficam na página da loja.`,
    };
  });
}

// Tudo o que a Cecília escreveu sobre uma loja ativa; sem artigo, a loja não tem subpágina.
export function getStoreArticlesPage<T extends StoreReview>(
  reviews: readonly T[],
  slug: string,
  stores: readonly Coupon[] = getActiveCoupons()
) {
  const store = stores.find((item) => item.slug === slug);
  if (!store) return null;
  const articles = listedNewestFirst(reviews).filter((review) => review.affiliate === store.slug);
  if (articles.length === 0) return null;

  const countLabel = `${articles.length} ${articles.length === 1 ? 'artigo' : 'artigos'} da Cecília sobre ${theStore(store)}`;
  return {
    slug: store.slug,
    brand: store.brand,
    title: `Artigos ${ofStore(store)}`,
    metaTitle: `${store.brand}: guias e análises - Em Casa com Cecília`,
    description: `${countLabel}: guias e análises, do mais novo para o mais antigo.`,
    countLabel,
    codeLinkLabel: `Ver o código ${ofStore(store)}`,
    storePageUrl: getStorePageUrl(store, 'reviews-loja'),
    articles,
  };
}

export function getStoreArticlePageSlugs<T extends StoreReview>(
  reviews: readonly T[],
  stores: readonly Coupon[] = getActiveCoupons()
): string[] {
  const listed = getListedPortugueseReviews(reviews);
  return stores
    .filter((store) => listed.some((review) => review.affiliate === store.slug))
    .map((store) => store.slug);
}
```

- [ ] **Step 4: rodar e ver passar**

Run: `npm run test:home-stores && npm run typecheck`
Expected: ✅ e `tsc` sem erro. Se o `tsc` reclamar do `as Coupon` do fixture `semCodigo`, trocar
por uma anotação `const semCodigo: Coupon = { ...store('shein'), referral: undefined };`.

- [ ] **Step 5: commit**

```bash
git add src/lib/homeStores.ts scripts/test-home-stores.ts
git commit -m "feat: abas das lojas da vitrine e dados da subpágina de cada loja

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

### Task 4: "Acabou de sair" e números das redes

**Files:**
- Modify: `src/lib/homeStores.ts`
- Test: `scripts/test-home-stores.ts`

**Interfaces:**
- Consumes: `socialMedias` (`src/lib/brandLinks.ts`).
- Produces:
  - `type HomeLatestArticle = { slug: string; href: string; title: string; type: string; dateLabel: string; image?: string; store?: string }`;
  - `getHomeLatest<T extends StoreReview>(reviews: readonly T[], stores?: readonly Coupon[]): HomeLatestArticle[]` (5 itens);
  - `formatFollowerCount(value?: string): string | undefined`;
  - `getCeciliaSocialStats(): Array<{ name: 'Instagram' | 'TikTok' | 'YouTube' | 'Facebook'; followers?: string }>`.

- [ ] **Step 1: escrever o teste que falha**

Acrescentar `formatFollowerCount`, `getCeciliaSocialStats` e `getHomeLatest` ao import de
`@/lib/homeStores`, e antes do `console.log` final:

```ts
// "Acabou de sair": as 5 listadas mais novas, com a loja de cada uma e sem código.
const latestFixture = getHomeLatest(fixtureReviews, [store('magalu'), store('damie')]);
assert.deepEqual(latestFixture.map(({ slug }) => slug), ['sem-loja', 'da-damie', 'novo', 'meio', 'mais-um']);
assert.equal(latestFixture[0].store, undefined);
assert.equal(latestFixture[1].store, 'DAMIE');
assert.equal(latestFixture[2].dateLabel, '01/10');
assert.equal(latestFixture[2].href, '/reviews/novo');

const latest = getHomeLatest(publishedReviews);
assert.deepEqual(latest.map(({ slug }) => slug), listed.slice(0, 5).map(({ slug }) => slug));
for (const item of latest) {
  assert.match(item.dateLabel, /^\d{2}\/\d{2}$/);
  assert.ok(!Object.keys(item).some((key) => /code|coupon/i.test(key)), `${item.slug}: sem código`);
}

// Números das redes no painel da Cecília: a mesma conta do Hero de hoje.
assert.equal(formatFollowerCount('443.5K'), '444k');
assert.equal(formatFollowerCount('85.5K'), '86k');
assert.equal(formatFollowerCount(undefined), undefined);
assert.equal(formatFollowerCount('sem número'), undefined);
assert.deepEqual(getCeciliaSocialStats().map(({ name }) => name), ['Instagram', 'TikTok', 'YouTube', 'Facebook']);
assert.ok(getCeciliaSocialStats().every(({ followers }) => followers && /^\d+k$/.test(followers)));
```

Trocar a mensagem do `console.log` final por:

```ts
console.log(`✅ homeStores: abas, ${tabs.length} lojas, subpáginas, "Acabou de sair" e redes passaram.`);
```

Trocar a asserção da Insider que a Task 3 escreveu (`a Insider nunca mostra percentual`), no
mesmo lugar, por esta, que segue os dados de cada loja. Desde 07/10 o Bruno decidiu mostrar o
percentual da Insider (15%); o texto do desconto é o de `couponsData.ts`, e a regra de conteúdo
fica no `test:coupon-offer-modes`. Ela passa logo de saída (é troca de trava, não comportamento
novo):

```ts
// Desconto e descrição saem dos dados da loja, sem texto próprio da vitrine.
for (const current of tabs) {
  assert.equal(current.discount, store(current.slug).discount, `${current.slug}: desconto dos dados`);
  assert.equal(current.description, store(current.slug).shortDescription, `${current.slug}: descrição dos dados`);
}
```

- [ ] **Step 2: rodar e ver falhar**

Run: `npm run test:home-stores`
Expected: FAIL (`getHomeLatest` não existe).

- [ ] **Step 3: implementar**

Em `src/lib/homeStores.ts`, acrescentar o import `import { socialMedias } from '@/lib/brandLinks';`
e, no fim do arquivo:

```ts
const LATEST_LIMIT = 5;

export type HomeLatestArticle = {
  slug: string;
  href: string;
  title: string;
  type: string;
  dateLabel: string;
  image?: string;
  store?: string;
};

// publishedAtISO começa por AAAA-MM-DD; o card mostra DD/MM.
function formatDayMonth(publishedAtISO: string): string {
  const [, month, day] = publishedAtISO.slice(0, 10).split('-');
  return `${day}/${month}`;
}

export function getHomeLatest<T extends StoreReview>(
  reviews: readonly T[],
  stores: readonly Coupon[] = getActiveCoupons()
): HomeLatestArticle[] {
  return listedNewestFirst(reviews)
    .slice(0, LATEST_LIMIT)
    .map((review) => ({
      slug: review.slug,
      href: `/reviews/${review.slug}`,
      title: review.title,
      type: review.type,
      dateLabel: formatDayMonth(review.publishedAtISO),
      image: review.image ? resolveMediaUrl(review.image) : undefined,
      store: stores.find((store) => store.slug === review.affiliate)?.brand,
    }));
}

const CECILIA_STAT_NETWORKS = ['Instagram', 'TikTok', 'YouTube', 'Facebook'] as const;

// Seguidores em milhares, como o topo da home sempre mostrou: "443.5K" vira "444k".
export function formatFollowerCount(value?: string): string | undefined {
  const thousands = Number.parseFloat(value ?? '');
  return Number.isFinite(thousands) ? `${Math.round(thousands)}k` : undefined;
}

export function getCeciliaSocialStats() {
  return CECILIA_STAT_NETWORKS.map((name) => ({
    name,
    followers: formatFollowerCount(socialMedias.find((social) => social.name === name)?.followers),
  }));
}
```

- [ ] **Step 4: rodar e ver passar**

Run: `npm run test:home-stores && npm run typecheck && npx eslint --quiet src/lib/homeStores.ts src/lib/homeStoreTabs.ts src/lib/couponsData.ts scripts/test-home-stores.ts`
Expected: ✅, `tsc` e ESLint sem erro.

- [ ] **Step 5: conferir que nada mais mudou**

Run: `npm run validate:content && npm run test:coupon-offer-modes && npm run test:internal-links`
Expected: tudo verde (o campo novo é opcional e só a DAMIE o usa).

- [ ] **Step 6: commit**

```bash
git add src/lib/homeStores.ts scripts/test-home-stores.ts
git commit -m "feat: dados do Acabou de sair e dos números das redes da Cecília

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

- [ ] **Step 7:** seguir para a Task 4b.

### Task 4b: a vitrine leva a `/cupons/damie`, como as outras lojas

Decisão do Bruno em 08/10, depois da Fase 1: o menu já linka o subdomínio da DAMIE, então a
vitrine traz tráfego para `/cupons/damie`. O campo `storePageUrl` de `couponsData.ts` (Task 2)
perde o único uso e sai; a página de cada loja vem de `getCouponStorePath(slug, 'pt')`
(`src/lib/couponTranslations.ts`), que já dá `/cupons/<slug>`.

**Files:**
- Modify: `src/lib/couponsData.ts` (tira o campo e o valor da DAMIE que a Task 2 pôs)
- Modify: `src/lib/homeStores.ts`
- Test: `scripts/test-home-stores.ts`

**Interfaces:**
- Consumes: `getCouponStorePath(slug: string, locale: Locale)` de `couponTranslations.ts`.
- Removes: `StorePagePlacement` e `getStorePageUrl` (`homeStores.ts`); `storePageUrl?` da
  `CouponBase`. O campo `storePageUrl` de `HomeStoreTab` e do retorno de `getStoreArticlesPage`
  fica, agora sempre `/cupons/<slug>`; as Tasks 7 e 9 seguem lendo `tab.storePageUrl` e
  `page.storePageUrl`.

- [ ] **Step 1: trocar as travas do teste**

Em `scripts/test-home-stores.ts`:

1. Tirar `getStorePageUrl,` do import de `@/lib/homeStores`.
2. Apagar o bloco que começa em `// A DAMIE leva à página do código no subdomínio` (o comentário,
   a constante `DAMIE_CODE_PAGE` e as quatro asserções de `getStorePageUrl`).
3. Logo depois de `assert.equal(tab('damie').code, 'CECILIA12');`, acrescentar:

```ts
// O menu já linka o subdomínio da DAMIE; a vitrine traz tráfego para /cupons/damie (Bruno, 08/10).
assert.equal(tab('damie').storePageUrl, '/cupons/damie');
```

4. No laço das abas, trocar a linha
   ``assert.ok(!current.storePageUrl.includes('/cupons/damie'), `${current.slug}: nunca /cupons/damie`);``
   por:

```ts
  assert.equal(current.storePageUrl, `/cupons/${current.slug}`, `${current.slug}: página da loja em /cupons`);
```

5. Na subpágina, trocar
   `assert.equal(damiePage.storePageUrl, getStorePageUrl(store('damie'), 'reviews-loja'));` por:

```ts
assert.equal(damiePage.storePageUrl, '/cupons/damie');
```

- [ ] **Step 2: rodar e ver falhar**

Run: `npm run test:home-stores`
Expected: FAIL na asserção `tab('damie').storePageUrl` (hoje é o subdomínio com UTM).

- [ ] **Step 3: implementar**

Em `src/lib/homeStores.ts`:
- acrescentar `import { getCouponStorePath } from '@/lib/couponTranslations';` junto dos outros
  imports de `@/lib`;
- apagar `export type StorePagePlacement = 'home' | 'reviews-loja';` e a função
  `getStorePageUrl` inteira;
- em `getHomeStoreTabs`, `storePageUrl: getStorePageUrl(store, 'home'),` vira
  `storePageUrl: getCouponStorePath(store.slug, 'pt'),`;
- em `getStoreArticlesPage`, `storePageUrl: getStorePageUrl(store, 'reviews-loja'),` vira
  `storePageUrl: getCouponStorePath(store.slug, 'pt'),`.

Em `src/lib/couponsData.ts`:
- na `CouponBase`, apagar as três linhas do campo (o comentário de duas linhas que começa em
  `// Página do código fora de /cupons` e `storePageUrl?: string;`);
- na entrada da DAMIE, apagar `storePageUrl:` e a linha do endereço do subdomínio logo abaixo.

Depois disso, `couponsData.ts` volta a ser igual ao da `main`:
`git diff 58d175d -- src/lib/couponsData.ts` não mostra nada.

- [ ] **Step 4: rodar e ver passar**

Run: `npm run test:home-stores && npm run typecheck && npx eslint --quiet src/lib/homeStores.ts src/lib/couponsData.ts scripts/test-home-stores.ts`
Expected: ✅, `tsc` e ESLint sem erro.

Run: `git grep -n "getStorePageUrl\|StorePagePlacement\|storePageUrl?\|damie.emcasacomcecilia.com/cupom-cecilia12" -- src/lib/couponsData.ts src/lib/homeStores.ts scripts/test-home-stores.ts`
Expected: nada (os artigos seguem com os próprios links do subdomínio no `content-index.ts`, que esta tarefa não toca).

- [ ] **Step 5: conferir que nada mais mudou**

Run: `npm run validate:content && npm run test:coupon-offer-modes && npm run test:internal-links`
Expected: tudo verde.

- [ ] **Step 6: commit**

```bash
git add src/lib/couponsData.ts src/lib/homeStores.ts scripts/test-home-stores.ts
git commit -m "fix: vitrine leva a /cupons/damie, como as outras lojas

O menu já linka o subdomínio da DAMIE; o Bruno decidiu em 08/10 que a vitrine
traz tráfego para /cupons/damie. Sai o campo storePageUrl de couponsData.ts e a
página de cada loja vem de getCouponStorePath.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

- [ ] **Step 7: parar.** Relatar ao Bruno o que a Fase 1 entregou e esperar a aprovação antes da 2a.

---

# Fase 2a: vitrine na home (5 arquivos)

### Task 5: placements novos

**Files:**
- Modify: `src/components/coupons/CouponActions.tsx:9-19` (`CopyPlacement`)
- Modify: `src/components/TrackedHomeLink.tsx:7-11` (`HomeRoutePlacement`)

**Interfaces:**
- Produces: `CopyPlacement` com `'home_store_banner'`; `HomeRoutePlacement` com
  `'home_store_banner' | 'home_store_page' | 'home_store_articles' | 'home_cecilia'`.

- [ ] **Step 1: `CopyPlacement`**

Em `CouponActions.tsx`, trocar

```ts
  | 'review_mobile_drawer';
```

por

```ts
  | 'review_mobile_drawer'
  // Recorte do código na vitrine da home.
  | 'home_store_banner';
```

- [ ] **Step 2: `HomeRoutePlacement`**

Em `TrackedHomeLink.tsx`, trocar

```ts
  | 'home_editor_pick';
```

por

```ts
  | 'home_editor_pick'
  // Vitrine da D2: recorte do código, página da loja, artigos da loja e painel da Cecília.
  | 'home_store_banner'
  | 'home_store_page'
  | 'home_store_articles'
  | 'home_cecilia';
```

O teste desses placements entra no `test-home-route-tracking.ts` na Fase 3, como manda a spec; os
parâmetros de `home_store_select` já estão cobertos pelo `test:home-stores` (Task 1).

- [ ] **Step 3: conferir**

Run: `npm run typecheck && npm run test:home-route-tracking`
Expected: sem erro; o teste de hoje continua passando.

(Sem commit separado: os placements vão junto do componente que os usa, na Task 7.)

### Task 6: painel da Cecília (`HomeCeciliaPanel.tsx`)

**Files:**
- Create: `src/components/sections/HomeCeciliaPanel.tsx`

**Interfaces:**
- Consumes: `getCeciliaSocialStats` (Task 4), `TrackedHomeLink` com `placement="home_cecilia"`
  (Task 5), `FOCUS_RING`, `brandLinks`, `resolveMediaUrl`.
- Produces: `HomeCeciliaPanel(): JSX.Element`, componente do servidor sem props.

- [ ] **Step 1: escrever o componente**

```tsx
import Image from 'next/image';
import { ArrowRight, Coffee, Leaf, UtensilsCrossed } from 'lucide-react';
import { FOCUS_RING } from '@/components/coupons/CouponBlocks';
import { TrackedHomeLink } from '@/components/TrackedHomeLink';
import { brandLinks } from '@/lib/brandLinks';
import { getCeciliaSocialStats } from '@/lib/homeStores';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

// O painel é marinho: o foco fica amarelo, menos dentro do cartão de foto, que é branco.
const FOCUS_RING_ON_DARK = 'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-amarelo-cupom';

// Os mesmos desenhos dos ícones do Hero de hoje.
const SOCIAL_ICON_PATHS = {
  Instagram:
    'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  TikTok:
    'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.84-2.9 6.24-1.72 1.39-4.02 1.9-6.15 1.39-2.9-.66-5.16-3.27-5.48-6.21-.34-3.15 1.69-6.13 4.73-6.98 1.12-.31 2.31-.31 3.43.02v4.16c-.56-.38-1.21-.59-1.88-.59-1.44 0-2.63 1.15-2.68 2.59-.05 1.44 1.06 2.68 2.5 2.76 1.44.08 2.65-1.03 2.73-2.47.02-.31.02-.62.02-.93V.02z',
  YouTube:
    'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
} as const;

type SocialName = keyof typeof SOCIAL_ICON_PATHS;

const SOCIAL_LINKS: Array<{ name: SocialName; href: string }> = [
  { name: 'Instagram', href: brandLinks.instagram },
  { name: 'TikTok', href: brandLinks.tiktok },
  { name: 'YouTube', href: brandLinks.youtube },
];

const STAT_COLOR: Record<string, string> = {
  Instagram: 'text-amarelo-cupom',
  TikTok: 'text-white',
  YouTube: 'text-laranja',
  Facebook: 'text-white',
};

function SocialIcon({ name, className }: { name: SocialName; className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d={SOCIAL_ICON_PATHS[name]} />
    </svg>
  );
}

function PhotoCard({ instagramFollowers }: { instagramFollowers?: string }) {
  return (
    <figure className="relative mx-auto w-full max-w-[300px] rotate-2 rounded-lg bg-white px-3 pt-3 pb-3.5 shadow-[0_18px_40px_rgb(0_0_0/0.35)] motion-safe:transition-transform motion-safe:duration-350 motion-safe:hover:-translate-y-1 motion-safe:hover:rotate-0 lg:max-w-[340px]">
      <span
        aria-hidden="true"
        className="absolute -top-3.5 left-1/2 z-10 size-9 -translate-x-1/2 rounded-full bg-amarelo-cupom shadow-[0_3px_8px_rgb(0_0_0/0.3)]"
      />
      <div className="relative aspect-[4/4.7] overflow-hidden rounded bg-marinho/15">
        <Image
          src={resolveMediaUrl('/images/photos/BRU-1.jpg')}
          alt="Cecília segurando uma xícara de café na cozinha"
          fill
          sizes="(min-width: 1024px) 316px, 276px"
          className="object-cover motion-safe:animate-[ken-burns_24s_ease-in-out_infinite]"
        />
        <span className="absolute top-2.5 left-2.5 flex items-center gap-2 rounded-full bg-white/95 py-[5px] pr-3 pl-[5px] text-marinho shadow-[0_2px_6px_rgb(0_0_0/0.2)]">
          <span aria-hidden="true" className="flex size-7 items-center justify-center rounded-full bg-marinho text-amarelo-cupom">
            <SocialIcon name="Instagram" className="size-[15px]" />
          </span>
          <span className="text-xs font-extrabold">@emcasacomcecilia</span>
        </span>
        {instagramFollowers ? (
          <span className="absolute right-2.5 bottom-2.5 rounded-full bg-marinho px-2.5 py-1.5 text-xs font-extrabold text-white">
            {instagramFollowers} seguidores
          </span>
        ) : null}
      </div>
      <figcaption className="flex items-center justify-between gap-3 px-0.5 pt-3">
        <span className="flex min-w-0 flex-col gap-[3px]">
          <span className="text-xs font-bold text-marinho-suave">No Instagram</span>
          <span className="font-condensada text-[22px] leading-[1.02] font-black text-marinho font-stretch-extra-condensed lg:text-2xl">
            Bastidores, rotina e receitas da Cecília
          </span>
        </span>
        <TrackedHomeLink
          href={brandLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          placement="home_cecilia"
          linkLabel="Ver o Instagram da Cecília"
          aria-label="Ver o Instagram da Cecília"
          className={`flex size-11 shrink-0 items-center justify-center rounded-full bg-marinho text-amarelo-cupom ${FOCUS_RING}`}
        >
          <SocialIcon name="Instagram" className="size-5" />
        </TrackedHomeLink>
      </figcaption>
    </figure>
  );
}

// Aba da Cecília na vitrine: a apresentação dela, sem código e sem artigos. No celular a ordem é
// título, foto, texto, links, números e a orientação; no desktop, texto à esquerda e foto à direita.
export function HomeCeciliaPanel() {
  const stats = getCeciliaSocialStats();
  const instagramFollowers = stats.find(({ name }) => name === 'Instagram')?.followers;

  return (
    <section
      aria-labelledby="titulo-cecilia"
      className="relative isolate flex flex-col gap-[18px] overflow-hidden rounded-[14px] border-2 border-marinho bg-marinho px-4 pt-6 pb-[22px] text-white shadow-[0_4px_0_var(--color-marinho)] lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center lg:gap-10 lg:px-11 lg:py-10 lg:shadow-[0_6px_0_var(--color-marinho)]"
    >
      {/* Os ícones que flutuavam no Hero de hoje, atrás do conteúdo. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden text-white/5 select-none">
        <Leaf size={120} strokeWidth={1} className="absolute top-[15%] left-[5%] motion-safe:animate-[float-delayed_12s_ease-in-out_infinite]" />
        <UtensilsCrossed size={80} strokeWidth={1} className="absolute bottom-[20%] left-[45%] motion-safe:animate-[float_8s_ease-in-out_infinite]" />
        <Coffee size={100} strokeWidth={1} className="absolute top-[40%] left-[85%] motion-safe:animate-[float-delayed_12s_ease-in-out_infinite]" />
        <Leaf size={140} strokeWidth={0.5} className="absolute right-[5%] bottom-[10%] rotate-45 motion-safe:animate-[float_8s_ease-in-out_infinite]" />
      </div>

      <div className="contents lg:flex lg:flex-col lg:gap-[22px]">
        <h2
          id="titulo-cecilia"
          className="order-1 font-condensada text-5xl leading-[0.9] font-black tracking-[-0.005em] font-stretch-extra-condensed lg:text-7xl"
        >
          Da minha casa
          <br />
          para a sua.
        </h2>
        <p className="order-3 max-w-[34em] text-[15px] leading-[1.55] font-medium text-white/80 lg:text-[17px]">
          Olá! Sou a Cecília. Conto o que testei em casa, divido as receitas da minha cozinha e reúno os
          códigos de desconto das marcas parceiras.
        </p>
        <div className="order-3 flex flex-wrap items-center gap-3">
          <TrackedHomeLink
            href="/sobre"
            placement="home_cecilia"
            linkLabel="Mais sobre mim"
            className={`flex min-h-12 items-center gap-2 rounded-full bg-laranja px-[22px] text-[15px] font-extrabold text-marinho ${FOCUS_RING_ON_DARK}`}
          >
            Mais sobre mim
            <ArrowRight aria-hidden="true" className="size-[18px]" strokeWidth={2.4} />
          </TrackedHomeLink>
          <div className="flex gap-2">
            {SOCIAL_LINKS.map(({ name, href }) => (
              <TrackedHomeLink
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                placement="home_cecilia"
                linkLabel={name}
                aria-label={`${name} da Cecília`}
                className={`flex size-11 items-center justify-center rounded-full border-[1.5px] border-white/25 text-laranja hover:border-laranja motion-safe:transition motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 ${FOCUS_RING_ON_DARK}`}
              >
                <SocialIcon name={name} className="size-[18px]" />
              </TrackedHomeLink>
            ))}
          </div>
        </div>
        <dl className="order-3 grid max-w-[460px] grid-cols-4">
          {stats.map(({ name, followers }, index) => (
            <div
              key={name}
              className={`flex flex-col-reverse px-2 ${index === 0 ? 'pl-0 text-left' : 'border-l border-white/15 text-center'}`}
            >
              <dt className="mt-1 text-xs font-semibold text-white/60">{name}</dt>
              <dd className={`font-condensada text-2xl leading-none font-black font-stretch-extra-condensed lg:text-3xl ${STAT_COLOR[name]}`}>
                {followers ?? '—'}
              </dd>
            </div>
          ))}
        </dl>
        <p className="order-3 text-[13px] leading-[1.45] font-semibold text-white/70">
          Escolha uma loja nas bolinhas para ver o código e os artigos dela.
        </p>
      </div>

      <div className="order-2 px-3.5 pt-2.5 pb-1.5 lg:px-2 lg:pt-[18px] lg:pb-2">
        <PhotoCard instagramFollowers={instagramFollowers} />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: conferir os ícones copiados do Hero**

Run:

```bash
for p in 'M12 2.163c3.204' 'M12.525.02c1.31' 'M23.498 6.186a3.016'; do
  a=$(grep -o "$p[^\"']*" src/components/sections/Hero.tsx); b=$(grep -o "$p[^\"']*" src/components/sections/HomeCeciliaPanel.tsx)
  [ "$a" = "$b" ] && echo "igual: $p" || echo "DIFERENTE: $p"
done
```

Expected: três linhas `igual:`.

- [ ] **Step 3: tipos**

Run: `npm run typecheck`
Expected: sem erro.

### Task 7: vitrine (`HomeStoreStories.tsx`) e a home

**Files:**
- Create: `src/components/sections/HomeStoreStories.tsx`
- Modify: `src/app/(pt)/page.js`

**Interfaces:**
- Consumes:
  - `HomeStoreTab`, `HomeStoreArticle`, `CECILIA_TAB_ID`, `getDefaultTabId`,
    `getHomeStoreSelectParameters`, `getTabAnchor`, `getTabOrder`, `parseTabHash` (Task 1);
  - `CopyCodeButton` com `placement="home_store_banner"` (Task 5);
  - `TrackedHomeLink` com os placements da Task 5;
  - `getCouponCopyLabels('pt')`, `FOCUS_RING`, `asSentence`, `trackEvent`.
- Produces: `HomeStoreStories({ tabs, ceciliaPanel, ceciliaPhoto }: { tabs: HomeStoreTab[]; ceciliaPanel: ReactNode; ceciliaPhoto: string })`.

- [ ] **Step 1: escrever o componente**

```tsx
'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent, type ReactNode } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CopyCodeButton } from '@/components/coupons/CouponActions';
import { FOCUS_RING, asSentence } from '@/components/coupons/CouponBlocks';
import { getCouponCopyLabels } from '@/components/review/couponCopyLocale';
import { TrackedHomeLink } from '@/components/TrackedHomeLink';
import { trackEvent } from '@/lib/analytics';
import {
  CECILIA_TAB_ID,
  getDefaultTabId,
  getHomeStoreSelectParameters,
  getTabAnchor,
  getTabOrder,
  parseTabHash,
  type HomeStoreArticle,
  type HomeStoreTab,
} from '@/lib/homeStoreTabs';

const COPY_LABELS = getCouponCopyLabels('pt');
// Foco dentro de caixas com overflow escondido: a borda fica para dentro, senão é cortada.
const FOCUS_INSET = 'focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-marinho';
const FOCUS_RING_ON_DARK = 'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-amarelo-cupom';
const TEXT_LINK = `flex min-h-11 items-center text-sm text-marinho underline underline-offset-[3px] ${FOCUS_RING}`;
// Entrada da aba, como no canvas: o painel sai do display:none e o @starting-style anima a volta.
const PANEL_ENTER =
  'motion-safe:transition-[opacity,translate] motion-safe:duration-400 motion-safe:ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-safe:starting:translate-y-2 motion-safe:starting:opacity-30';

// A aba aberta vive no hash da URL. O replaceState não dispara hashchange, então a troca avisa por
// um evento próprio, como o filtro de /reviews.
const TAB_CHANGE_EVENT = 'home-store-tab-change';

function subscribeToTab(onChange: () => void) {
  window.addEventListener('hashchange', onChange);
  window.addEventListener(TAB_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener('hashchange', onChange);
    window.removeEventListener(TAB_CHANGE_EVENT, onChange);
  };
}

type HomeStoreStoriesProps = {
  tabs: HomeStoreTab[];
  ceciliaPanel: ReactNode;
  ceciliaPhoto: string;
};

export function HomeStoreStories({ tabs, ceciliaPanel, ceciliaPhoto }: HomeStoreStoriesProps) {
  const storeSlugs = tabs.map(({ slug }) => slug);
  const order = getTabOrder(storeSlugs);
  const defaultTab = getDefaultTabId(storeSlugs);
  const selected = useSyncExternalStore(
    subscribeToTab,
    () => parseTabHash(window.location.hash, storeSlugs) ?? defaultTab,
    () => defaultTab
  );
  // A animação de entrada só depois da primeira troca: a aba que abre com a página não anima.
  const [switched, setSwitched] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());

  // No celular as bolinhas rolam na horizontal: a escolhida vem para o meio da faixa.
  useEffect(() => {
    const strip = stripRef.current;
    const tab = tabRefs.current.get(selected);
    if (!strip || !tab || strip.scrollWidth <= strip.clientWidth) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    strip.scrollTo({
      left: tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  }, [selected]);

  function select(tabId: string) {
    if (tabId === selected) return;
    window.history.replaceState(null, '', `#${getTabAnchor(tabId)}`);
    window.dispatchEvent(new Event(TAB_CHANGE_EVENT));
    setSwitched(true);
    trackEvent('home_store_select', getHomeStoreSelectParameters(tabId));
  }

  // Padrão de abas: setas andam (e voltam ao começo), Home e End vão às pontas.
  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const at = order.indexOf(selected);
    const moves: Partial<Record<string, number>> = { ArrowRight: at + 1, ArrowLeft: at - 1, Home: 0, End: order.length - 1 };
    const target = moves[event.key];
    if (target === undefined) return;
    event.preventDefault();
    const next = order[(target + order.length) % order.length];
    select(next);
    tabRefs.current.get(next)?.focus();
  }

  function registerTab(tabId: string, node: HTMLButtonElement | null) {
    if (node) tabRefs.current.set(tabId, node);
    else tabRefs.current.delete(tabId);
  }

  const panelClass = switched ? PANEL_ENTER : undefined;

  return (
    <section
      aria-label="A Cecília e as lojas parceiras"
      className="mx-auto flex w-full max-w-[1200px] flex-col gap-3.5 px-4 pt-3.5 md:gap-[22px] md:px-10 md:pt-8"
    >
      <div
        ref={stripRef}
        role="tablist"
        aria-label="Escolha a Cecília ou uma loja"
        className="relative -mx-4 flex gap-2.5 overflow-x-auto px-4 pt-1.5 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:gap-3.5 md:overflow-visible md:px-0"
      >
        <StoreBubble tabId={CECILIA_TAB_ID} name="Cecília" dark selected={selected === CECILIA_TAB_ID} onSelect={select} onKeyDown={onTabKeyDown} register={registerTab}>
          <Image src={ceciliaPhoto} alt="" fill sizes="(min-width: 768px) 80px, 68px" className="object-cover" />
        </StoreBubble>
        {tabs.map((tab) => (
          <StoreBubble key={tab.slug} tabId={tab.slug} name={tab.brand} selected={selected === tab.slug} onSelect={select} onKeyDown={onTabKeyDown} register={registerTab}>
            <StoreMark tab={tab} imageClassName="h-[46%] w-[64%]" sizes="52px" />
          </StoreBubble>
        ))}
      </div>

      <div
        id={`painel-${getTabAnchor(CECILIA_TAB_ID)}`}
        role="tabpanel"
        aria-labelledby={getTabAnchor(CECILIA_TAB_ID)}
        hidden={selected !== CECILIA_TAB_ID}
        className={panelClass}
      >
        {ceciliaPanel}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.slug}
          id={`painel-${getTabAnchor(tab.slug)}`}
          role="tabpanel"
          aria-labelledby={getTabAnchor(tab.slug)}
          hidden={selected !== tab.slug}
          className={panelClass}
        >
          <StorePanel tab={tab} priority={tab.slug === defaultTab} />
        </div>
      ))}
    </section>
  );
}

type StoreBubbleProps = {
  tabId: string;
  name: string;
  selected: boolean;
  dark?: boolean;
  onSelect: (tabId: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  register: (tabId: string, node: HTMLButtonElement | null) => void;
  children: ReactNode;
};

function StoreBubble({ tabId, name, selected, dark, onSelect, onKeyDown, register, children }: StoreBubbleProps) {
  const anchor = getTabAnchor(tabId);

  return (
    <button
      ref={(node) => register(tabId, node)}
      id={anchor}
      type="button"
      role="tab"
      aria-selected={selected}
      aria-controls={`painel-${anchor}`}
      tabIndex={selected ? 0 : -1}
      onClick={() => onSelect(tabId)}
      onKeyDown={onKeyDown}
      className={`group flex w-20 shrink-0 scroll-mt-4 flex-col items-center gap-2 rounded-lg pt-1.5 text-marinho md:w-[92px] ${FOCUS_RING}`}
    >
      <span
        className={`relative flex size-[68px] items-center justify-center overflow-hidden rounded-full group-hover:scale-106 motion-safe:transition-transform motion-safe:duration-250 md:size-20 ${
          dark ? 'bg-marinho' : 'bg-creme'
        } ${
          selected
            ? 'shadow-[0_0_0_4px_var(--color-amarelo-cupom),0_0_0_6px_var(--color-marinho)]'
            : 'shadow-[0_0_0_2px_var(--color-marinho)]'
        }`}
      >
        {children}
      </span>
      <span className="text-center text-xs leading-tight font-bold">{name}</span>
    </button>
  );
}

// Logo da loja ou, sem ele, as iniciais (brandIcon). Decorativo: o nome está ao lado.
function StoreMark({ tab, imageClassName, sizes }: { tab: HomeStoreTab; imageClassName: string; sizes: string }) {
  return tab.logo ? (
    <span className={`relative ${imageClassName}`}>
      <Image src={tab.logo} alt="" fill sizes={sizes} className="object-contain" />
    </span>
  ) : (
    <span aria-hidden="true" className="font-condensada text-xl font-black text-marinho font-stretch-extra-condensed">
      {tab.initials}
    </span>
  );
}

function StorePanel({ tab, priority }: { tab: HomeStoreTab; priority: boolean }) {
  const [current, setCurrent] = useState(0);
  const count = tab.articles.length;
  const move = (step: number) => setCurrent((index) => (index + step + count) % count);

  return (
    <div className="flex flex-col gap-4 md:gap-[22px]">
      <CodeBanner tab={tab} />
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
        {count > 0 ? (
          <ArticleStory article={tab.articles[current]} index={current} count={count} onMove={move} priority={priority} />
        ) : null}
        <ArticleList tab={tab} current={current} onPick={setCurrent} />
      </div>
    </div>
  );
}

// O recorte do código: parte laranja com logo, rótulo e oferta; parte creme com o código e os links.
function CodeBanner({ tab }: { tab: HomeStoreTab }) {
  const titleId = `titulo-${getTabAnchor(tab.slug)}`;

  return (
    <section
      aria-labelledby={titleId}
      className="grid overflow-hidden rounded-[14px] border-2 border-marinho shadow-[0_4px_0_var(--color-marinho)] md:grid-cols-2 lg:shadow-[0_6px_0_var(--color-marinho)]"
    >
      <div className="relative flex items-center gap-3.5 border-b-[3px] border-dashed border-marinho bg-laranja p-4 md:gap-5 md:border-r-[3px] md:border-b-0 md:px-7 md:py-6">
        <span className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-marinho bg-creme md:size-[88px]">
          <StoreMark tab={tab} imageClassName="h-1/2 w-[68%]" sizes="(min-width: 768px) 60px, 44px" />
        </span>
        <div className="flex min-w-0 flex-col gap-1.5">
          <h2 id={titleId} className="font-condensada text-[26px] leading-none font-black text-marinho font-stretch-extra-condensed md:text-[34px]">
            {tab.label}
          </h2>
          <p className="text-[13px] leading-[1.45] font-semibold text-marinho md:text-sm">
            <span className="block font-extrabold">{tab.discount}</span>
            {asSentence(tab.description)}
          </p>
        </div>
        {/* Picotes do cupom, no começo e no fim da linha tracejada. */}
        <span aria-hidden="true" className="absolute -bottom-3 -left-3 size-[18px] rounded-full border-2 border-marinho bg-white md:-top-3 md:-right-3 md:bottom-auto md:left-auto" />
        <span aria-hidden="true" className="absolute -right-3 -bottom-3 size-[18px] rounded-full border-2 border-marinho bg-white" />
      </div>
      <div className="flex flex-col justify-center gap-2 bg-creme px-4 pt-3.5 pb-3 md:gap-3 md:px-7 md:py-6">
        {tab.code ? (
          <>
            <div className="group/codigo flex flex-wrap items-center justify-between gap-3">
              <span className="-ml-1 rounded px-1 py-0.5 font-codigo text-2xl font-extrabold tracking-[0.04em] break-all text-balance text-marinho group-has-[[data-copied=true]]/codigo:bg-amarelo-cupom motion-safe:transition-colors motion-safe:duration-700 motion-safe:group-has-[[data-copied=true]]/codigo:duration-0 md:text-[38px]">
                {tab.code}
              </span>
              <CopyCodeButton
                code={tab.code}
                brand={tab.slug}
                placement="home_store_banner"
                ariaLabel={COPY_LABELS.copyCoupon(tab.code)}
                copiedStatus={tab.hints.copied}
                copiedChildren={COPY_LABELS.copied}
                className={`flex min-h-11 min-w-[104px] shrink-0 items-center justify-center rounded-[10px] border-2 border-marinho bg-marinho px-[18px] text-[15px] font-extrabold text-white data-[copied=true]:bg-amarelo-cupom data-[copied=true]:text-marinho md:min-h-12 ${FOCUS_RING}`}
              >
                {COPY_LABELS.copy}
              </CopyCodeButton>
            </div>
            <p className="text-[13px] font-medium text-marinho-suave">{tab.hints.copy}</p>
          </>
        ) : null}
        <div className="flex flex-wrap gap-x-5">
          <TrackedHomeLink
            href={tab.storeUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
            placement="home_store_banner"
            linkLabel={tab.storeLinkLabel}
            className={`${TEXT_LINK} font-extrabold`}
          >
            {tab.storeLinkLabel}
          </TrackedHomeLink>
          <TrackedHomeLink
            href={tab.storePageUrl}
            placement="home_store_page"
            linkLabel="Ver a página da loja"
            className={`${TEXT_LINK} font-bold`}
          >
            Ver a página da loja
          </TrackedHomeLink>
        </div>
      </div>
    </section>
  );
}

type ArticleStoryProps = {
  article: HomeStoreArticle;
  index: number;
  count: number;
  onMove: (step: number) => void;
  priority: boolean;
};

// Só no desktop: o artigo atual em destaque, com cores alternadas como no canvas.
function ArticleStory({ article, index, count, onMove, priority }: ArticleStoryProps) {
  const dark = index % 2 === 1;

  return (
    <article className="hidden min-w-0 flex-[1_1_420px] flex-col overflow-hidden rounded-[14px] border-2 border-marinho bg-white lg:flex">
      <div className="relative h-[300px] bg-creme">
        {article.image ? (
          // Abaixo de 1024 px o story fica escondido; o sizes de 1px faz o preload baixar a menor versão.
          <Image
            src={article.image}
            alt=""
            fill
            priority={priority && index === 0}
            sizes="(min-width: 1024px) 560px, 1px"
            className="object-cover"
          />
        ) : null}
      </div>
      {count > 1 ? (
        <div aria-hidden="true" className="flex h-1.5 bg-marinho/15">
          {Array.from({ length: count }, (_, step) => (
            <span key={step} className={`flex-1 border-r border-white last:border-r-0 ${step === index ? 'bg-laranja' : ''}`} />
          ))}
        </div>
      ) : null}
      <div className={`flex flex-1 flex-col justify-between gap-3.5 p-5 ${dark ? 'bg-marinho' : 'bg-white'}`}>
        <div className="flex flex-col gap-2.5">
          <p className={`text-[13px] leading-snug font-bold ${dark ? 'text-white' : 'text-marinho-suave'}`}>{article.type}</p>
          <h3
            className={`font-condensada text-[34px] leading-none font-black tracking-[-0.01em] font-stretch-extra-condensed ${
              dark ? 'text-amarelo-cupom' : 'text-marinho'
            }`}
          >
            {article.title}
          </h3>
        </div>
        <TrackedHomeLink
          href={article.href}
          placement="home_store_articles"
          linkLabel={article.title}
          aria-label={`Ler o artigo: ${article.title}`}
          className={`flex min-h-12 items-center justify-center rounded-[10px] border-2 text-[15px] font-extrabold ${
            dark ? `border-amarelo-cupom bg-amarelo-cupom text-marinho ${FOCUS_RING_ON_DARK}` : `border-marinho bg-marinho text-white ${FOCUS_RING}`
          }`}
        >
          Ler o artigo
        </TrackedHomeLink>
      </div>
      {count > 1 ? (
        <div className="flex items-center justify-between border-t-2 border-marinho/15 bg-white px-4 py-3">
          <button type="button" onClick={() => onMove(-1)} aria-label="Artigo anterior" className={`flex size-11 items-center justify-center rounded-lg text-marinho ${FOCUS_RING}`}>
            <ChevronLeft aria-hidden="true" className="size-[22px]" />
          </button>
          <span aria-live="polite" className="text-[13px] font-bold text-marinho-suave">
            {index + 1} / {count}
          </span>
          <button type="button" onClick={() => onMove(1)} aria-label="Próximo artigo" className={`flex size-11 items-center justify-center rounded-lg text-marinho ${FOCUS_RING}`}>
            <ChevronRight aria-hidden="true" className="size-[22px]" />
          </button>
        </div>
      ) : null}
    </article>
  );
}

// No desktop cada item leva o story até ele; abaixo de 1024 px, sem story, o item é o link do artigo.
function ArticleList({ tab, current, onPick }: { tab: HomeStoreTab; current: number; onPick: (index: number) => void }) {
  return (
    <div className="w-full self-start overflow-hidden rounded-[14px] border-2 border-marinho bg-white lg:w-auto lg:flex-[1_1_340px]">
      <h3 className="bg-marinho px-4 py-3.5 font-condensada text-2xl leading-none font-black text-amarelo-cupom font-stretch-extra-condensed lg:text-[28px]">
        {tab.listTitle}
      </h3>
      {tab.articles.length > 0 ? (
        <ul>
          {tab.articles.map((article, index) => (
            <li key={article.slug} className="border-b-[1.5px] border-marinho/15">
              <button
                type="button"
                onClick={() => onPick(index)}
                aria-current={index === current ? 'true' : undefined}
                className={`hidden w-full items-center gap-3 px-4 py-3 text-left text-marinho lg:flex ${
                  index === current ? 'bg-creme' : 'bg-white hover:bg-creme/60'
                } ${FOCUS_INSET}`}
              >
                <ArticleThumb image={article.image} className="h-[52px] w-16" />
                <ArticleText article={article} />
              </button>
              <TrackedHomeLink
                href={article.href}
                placement="home_store_articles"
                linkLabel={article.title}
                className={`flex items-center gap-3 px-4 py-3 text-marinho lg:hidden ${FOCUS_INSET}`}
              >
                <ArticleThumb image={article.image} className="h-14 w-[72px]" />
                <ArticleText article={article} />
              </TrackedHomeLink>
            </li>
          ))}
        </ul>
      ) : (
        <p className="p-4 text-sm leading-normal font-semibold text-marinho">{tab.emptyText}</p>
      )}
      {tab.allArticles ? (
        <TrackedHomeLink
          href={tab.allArticles.href}
          placement="home_store_articles"
          linkLabel={tab.allArticles.label}
          className={`flex min-h-12 items-center px-4 text-sm font-extrabold text-marinho underline underline-offset-[3px] ${FOCUS_INSET}`}
        >
          {tab.allArticles.label}
        </TrackedHomeLink>
      ) : null}
    </div>
  );
}

function ArticleThumb({ image, className }: { image?: string; className: string }) {
  return (
    <span className={`relative shrink-0 overflow-hidden rounded-md bg-creme ${className}`}>
      {image ? <Image src={image} alt="" fill sizes="72px" className="object-cover" /> : null}
    </span>
  );
}

function ArticleText({ article }: { article: HomeStoreArticle }) {
  return (
    <span className="flex min-w-0 flex-col gap-0.5">
      <span className="text-xs font-bold text-marinho-suave">{article.type}</span>
      <span className="text-sm leading-[1.35] font-bold lg:text-[13px]">{article.title}</span>
    </span>
  );
}
```

- [ ] **Step 2: a vitrine no `page.js`**

Em `src/app/(pt)/page.js`:

1. Trocar os imports

```js
import { Hero } from '@/components/sections/Hero';
import { CouponStrip } from '@/components/sections/CouponStrip';
```

por

```js
import { HomeStoreStories } from '@/components/sections/HomeStoreStories';
import { HomeCeciliaPanel } from '@/components/sections/HomeCeciliaPanel';
import { couponFontVariables } from '@/components/coupons/CouponBlocks';
```

2. Trocar `import { getCouponStripItems } from '@/lib/couponsData';` por
   `import { getHomeStoreTabs } from '@/lib/homeStores';`.

3. Trocar o começo do JSX

```jsx
    <div className="min-h-screen bg-[#fef9f3]">
      <div className="bg-[#0f1d3a]">
        {/* 1. Cupons ativos em faixa compacta */}
        <CouponStrip coupons={getCouponStripItems()} />

        {/* 2. Hero - Apresentação principal */}
        <Hero />

        {/* 3. Destaques de Guias & Análises */}
        <FeaturedReviewGuides items={featuredReviewGuides} />
      </div>
```

por

```jsx
    <div className={`${couponFontVariables} min-h-screen bg-[#fef9f3]`}>
      <h1 className="sr-only">Em Casa com Cecília: guias, códigos de desconto e receitas</h1>

      {/* 1. Vitrine: a Cecília e as lojas parceiras */}
      <div className="bg-white pb-8 md:pb-10">
        <HomeStoreStories
          tabs={getHomeStoreTabs(publishedReviews)}
          ceciliaPanel={<HomeCeciliaPanel />}
          ceciliaPhoto={resolveMediaUrl('/images/photos/BRU-1.jpg')}
        />
      </div>

      <div className="bg-[#0f1d3a]">
        {/* 2. Destaques de Guias & Análises (sai na Fase 3, com o Acabou de sair) */}
        <FeaturedReviewGuides items={featuredReviewGuides} />
      </div>
```

- [ ] **Step 3: tipos, lint e testes rápidos**

Run: `npm run typecheck && npx eslint --quiet src/components/sections/HomeStoreStories.tsx src/components/sections/HomeCeciliaPanel.tsx src/components/coupons/CouponActions.tsx src/components/TrackedHomeLink.tsx "src/app/(pt)/page.js" && npm run test:home-stores && npm run test:home-route-tracking && npm run test:home-curation`
Expected: tudo verde. Se o ESLint apontar `react-hooks/*` no componente, corrigir a causa (nada de
`eslint-disable`).

- [ ] **Step 4: build completo**

Run: `npm run build`
Expected: verde até o fim, inclusive `test:client-bundle` (nenhum chunk com o índice de conteúdo) e
`test:build-output`.

- [ ] **Step 5: HTML do servidor**

Run:

```bash
f=.next/server/app/index.html
grep -o 'role="tabpanel"' $f | wc -l          # 1 + número de lojas ativas (hoje 10)
grep -o 'id="loja-[a-z-]*"' $f | sort | uniq | wc -l   # uma bolinha por loja (hoje 9)
grep -c 'Código de recompensa YesStyle' $f
grep -c 'Cupom YesStyle' $f                   # 0
grep -c 'Código de indicação SHEIN' $f
grep -c 'exceto Alfamino, Alfaré e fórmulas infantis de 0 a 12 meses' $f
grep -o 'href="[^"]*cupons/damie"' $f | wc -l  # 1 (o "Ver a página da loja" do painel da DAMIE)
grep -c 'utm_content=home' $f                # 0 (a vitrine não leva mais a UTM ao subdomínio)
```

Expected: os números dos comentários. O painel da DAMIE é o único sem `hidden`.

- [ ] **Step 6: verificação visual no preview**

1. `preview_start` com `emcasacomcecilia-dev` e abrir `/`.
2. `resize_window` em 390×812, 768×1024 e 1280×900; comparar com as pranchetas "D2. Stories da
   Cecília" do canvas (celular e desktop):
   - 390: bolinhas rolando na horizontal, recorte empilhado, lista com links, sem story;
   - 768: recorte lado a lado, lista na largura toda, sem story;
   - 1280: story e lista lado a lado; na Cecília, texto à esquerda e foto à direita.
3. Clicar em cada bolinha:
   - o hash muda (`#loja-yesstyle`, `#cecilia`);
   - o painel entra com a animação;
   - a Magalu mostra 1 artigo, sem segmentos, setas nem contador;
   - a SHEIN mostra o aviso no lugar da lista;
   - DAMIE, Dolce Gusto, I Wanna Sleep e Nutre mostram "Ver os N artigos".
4. Copiar um código e conferir:
   - o botão vira "Copiado" amarelo;
   - o código ganha o fundo amarelo e volta devagar;
   - pelo `javascript_tool`, `getComputedStyle` do código mostra o `background-color` amarelo
     logo depois do clique.
5. Teclado:
   - Tab chega à bolinha selecionada;
   - setas trocam de aba e levam o foco;
   - Home e End vão às pontas;
   - o foco aparece em todos os links e botões, amarelo no painel da Cecília.
6. Abrir `/#loja-yesstyle` direto: a YesStyle abre e a página para na vitrine. Abrir `/#loja-xyz`:
   abre a DAMIE.
7. Hover: bolinhas crescem, o cartão de foto endireita e sobe, as redes sobem; a foto da Cecília tem
   o zoom lento e os ícones flutuam ao fundo.
8. Movimento reduzido: as ferramentas do preview não emulam `prefers-reduced-motion`. Conferir no
   `javascript_tool` que nenhuma classe de animação ou transição da vitrine fica sem `motion-safe:`:
   `[...document.querySelector('[aria-label="A Cecília e as lojas parceiras"]').querySelectorAll('*')].flatMap((e) => [...e.classList]).filter((c) => /^(animate-|transition|duration-|ease-|starting:)/.test(c))`
   deve voltar `[]`.
9. `read_console_messages` sem erro nem aviso de hidratação; tirar screenshot de cada largura.

- [ ] **Step 7: commit**

```bash
git add src/components/sections/HomeStoreStories.tsx src/components/sections/HomeCeciliaPanel.tsx src/components/coupons/CouponActions.tsx src/components/TrackedHomeLink.tsx "src/app/(pt)/page.js"
git commit -m "feat: vitrine da D2 na home, com a aba da Cecília e o código de cada loja

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

- [ ] **Step 8: parar.** Mandar ao Bruno as screenshots e o que mudou, e esperar a aprovação antes
  da 2b.

---

# Fase 2b: subpágina de cada loja (5 arquivos)

### Task 8: card de `/reviews` num componente próprio

**Files:**
- Create: `src/components/review/ReviewHubCard.tsx`
- Modify: `src/app/(pt)/reviews/ReviewsClientPage.js` (constantes do topo e o `map` do grid)

**Interfaces:**
- Consumes: `HomeReviewCard` (`reviewDiscovery.ts`), `ViewTransitionLink`,
  `sanitizeViewTransitionName`, `resolveMediaUrl`.
- Produces: `ReviewHubCard({ review, index }: { review: HomeReviewCard; index: number })`. Sem
  `'use client'`: no `/reviews` ele roda no cliente, e na subpágina, no servidor.

- [ ] **Step 1: guardar o HTML de hoje para comparar**

Run: `npm run build` (se o da 2a não estiver mais em `.next`) e
`cp .next/server/app/reviews.html "$TEMP/reviews-antes.html"`

- [ ] **Step 2: criar `src/components/review/ReviewHubCard.tsx`**

O JSX é o mesmo que hoje está dentro do `map` de `ReviewsClientPage.js`, sem mudar classe nenhuma:

```tsx
import Image from 'next/image';
import { ViewTransitionLink } from '@/components/ViewTransitionLink';
import type { HomeReviewCard } from '@/lib/reviewDiscovery';
import { sanitizeViewTransitionName } from '@/lib/viewTransition';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

// Card de Guias & Análises: o grid de /reviews e a subpágina de cada loja.

const accentByType: Record<string, string> = {
  'Eletrodoméstico': '#ff6b35',
  'Alimento': '#1a4d2e',
  'Utensílio': '#0f1d3a',
  'Ingrediente': '#ffd700',
  'Teste de Cozinha': '#ff6b35',
};

const iconByType: Record<string, string> = {
  'Eletrodoméstico': '🔌',
  'Alimento': '🥄',
  'Utensílio': '🍴',
  'Ingrediente': '🧂',
  'Teste de Cozinha': '🧪',
};

const OBJECT_POSITION: Record<string, string> = {
  top: '50% 10%',
  bottom: '50% 90%',
  left: '20% 50%',
  right: '80% 50%',
  center: 'center',
};

function imageFitClass(review: HomeReviewCard): string {
  if (review.imageFit === 'cover') return 'object-cover';
  if (review.imageFit === 'contain' || review.rating) return 'object-contain bg-white p-4';
  return 'object-cover';
}

export function ReviewHubCard({ review, index }: { review: HomeReviewCard; index: number }) {
  const accent = accentByType[review.type] ?? '#ff6b35';
  const icon = iconByType[review.type] ?? '📝';
  const usesPosition = review.imageFit === 'cover' || (!review.imageFit && !review.rating);

  return (
    <ViewTransitionLink
      href={`/reviews/${review.slug}`}
      className="group block animate-slide-up"
      style={{ animationDelay: `${(index % 8) * 0.05}s` }}
    >
      <article className="transition-all duration-500 group-hover:-translate-y-2">
        <div
          className="relative mb-4 aspect-[5/6] overflow-hidden rounded-[2rem] shadow-soft transition-all duration-500 group-hover:shadow-large"
          style={{ viewTransitionName: `review-hero-${sanitizeViewTransitionName(review.slug)}` }}
        >
          {review.image ? (
            <Image
              src={resolveMediaUrl(review.image)}
              alt={review.imageAlt || review.title}
              fill
              className={`transition-transform duration-700 ease-out group-hover:scale-110 ${imageFitClass(review)}`}
              style={review.imagePosition && usesPosition ? { objectPosition: OBJECT_POSITION[review.imagePosition] } : undefined}
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />
          ) : (
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
              style={{ background: `linear-gradient(160deg, ${accent}18 0%, ${accent}30 42%, #0f1d3a 100%)` }}
            />
          )}

          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

          <div className="absolute left-4 top-4">
            <div className="flex flex-wrap gap-2">
              {review.isNew && (
                <span className="inline-flex items-center rounded-full bg-[#ff6b35] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg">
                  Novo
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0f1419] shadow-lg backdrop-blur-md">
                {review.type}
              </span>
            </div>
          </div>

          {!review.image && (
            <div className="absolute inset-0 flex items-center justify-center text-5xl transition-transform duration-700 group-hover:scale-110">
              {icon}
            </div>
          )}

          <div className="absolute bottom-5 left-5 right-5 text-xs font-bold uppercase tracking-widest text-white/78">
            {review.publishedAt} · {review.readingMinutes} min de leitura
          </div>
        </div>

        <div className="px-2">
          <h3 className="font-heading text-lg font-bold leading-tight text-[#0f1419] transition-colors duration-300 group-hover:text-[#1a4d2e] md:text-xl">
            {review.title}
          </h3>
          <div className="mt-2 h-0.5 w-0 bg-[#ff6b35] transition-all duration-500 group-hover:w-12" />
        </div>
      </article>
    </ViewTransitionLink>
  );
}
```

Equivalências com o código de hoje, que o passo 4 confere no HTML:
- o `objectPosition`: `top`, `bottom`, `left` e `right` dão os mesmos valores, e `center` cai em
  `'center'`, que é o que o código de hoje passa quando não é um dos quatro;
- o `imageFitClass`: `rating` é o `isProductReview` de hoje;
- o rótulo `10px` em caixa alta continua como está: o card muda junto com a revisão de `/reviews`,
  não agora.

- [ ] **Step 3: `ReviewsClientPage.js` passa a usar o card**

1. Apagar as constantes `accentByType` e `iconByType` do topo e os imports que ficam sem uso:
   `Image`, `sanitizeViewTransitionName`, `ViewTransitionLink` e `resolveMediaUrl`. Ficam `Leaf` e
   `ArrowRight`, que o hero e o "Carregar mais" usam.
2. Acrescentar `import { ReviewHubCard } from '@/components/review/ReviewHubCard';`.
3. Trocar o `map` inteiro do grid, de `{visibleReviews.map((review, index) => {` até o `})}` que
   fecha antes do `</div>` do grid, por:

```jsx
            {visibleReviews.map((review, index) => (
              <ReviewHubCard key={review.id} review={review} index={index} />
            ))}
```

- [ ] **Step 4: conferir que `/reviews` não mudou**

Run: `npm run build && diff <(sed 's/>/>\n/g' "$TEMP/reviews-antes.html" | grep -v 'static/chunks\|_buildManifest\|"b":\|nonce') <(sed 's/>/>\n/g' .next/server/app/reviews.html | grep -v 'static/chunks\|_buildManifest\|"b":\|nonce') | head -40`
Expected: nenhuma diferença nos cards (só podem mudar nomes de chunks e o payload do RSC). Se
aparecer diferença de classe ou de `style`, o card não ficou idêntico: corrigir antes de seguir.

### Task 9: rota `/reviews/loja/[brand]` e sitemap

**Files:**
- Create: `src/app/(pt)/reviews/loja/[brand]/page.tsx`
- Modify: `src/app/sitemap.ts`
- Test: `scripts/test-home-stores.ts`

**Interfaces:**
- Consumes: `getStoreArticlePageSlugs`, `getStoreArticlesPage` (Task 3), `ReviewHubCard` (Task 8),
  `toHomeReviewCard`, `publishedReviews`.

- [ ] **Step 1: escrever o teste que falha**

Em `scripts/test-home-stores.ts`, acrescentar os imports `import sitemap from '@/app/sitemap';` e
`reviews` em `import { publishedReviews, reviews } from '@/lib/data';`, e antes do `console.log`
final:

```ts
// /reviews/loja sozinho cai em /reviews/[slug]: nenhuma review, nem rascunho, pode ter esse slug.
assert.ok(!reviews.some(({ slug }) => slug === 'loja'), 'nenhuma review com o slug loja');

// Subpáginas no sitemap: uma por loja ativa com artigo, nenhuma das outras.
const sitemapUrls = new Set(sitemap().map(({ url }) => url));
for (const coupon of getActiveCoupons()) {
  const url = `https://emcasacomcecilia.com/reviews/loja/${coupon.slug}`;
  const hasPage = getStoreArticlePageSlugs(publishedReviews).includes(coupon.slug);
  assert.equal(sitemapUrls.has(url), hasPage, `${coupon.slug}: subpágina no sitemap só com artigo`);
}
```

- [ ] **Step 2: rodar e ver falhar**

Run: `npm run test:home-stores`
Expected: FAIL em `damie: subpágina no sitemap só com artigo`.

- [ ] **Step 3: sitemap**

Em `src/app/sitemap.ts`, acrescentar `import { getStoreArticlePageSlugs } from '@/lib/homeStores';`
e, logo depois de `reviewRoutes`:

```ts
  // Todos os artigos de cada loja (/reviews/loja/{slug}), só em português.
  const storeArticleRoutes: MetadataRoute.Sitemap = getStoreArticlePageSlugs(publishedReviews).map((slug) => ({
    url: `${BASE_URL}/reviews/loja/${slug}`,
    priority: 0.6,
    changeFrequency: 'weekly' as const,
  }));
```

No `return`, logo depois de `...reviewRoutes,`, acrescentar `...storeArticleRoutes,`.

- [ ] **Step 4: rodar e ver passar**

Run: `npm run test:home-stores`
Expected: ✅.

- [ ] **Step 5: a página**

Criar `src/app/(pt)/reviews/loja/[brand]/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { ReviewHubCard } from '@/components/review/ReviewHubCard';
import { publishedReviews } from '@/lib/data';
import { getStoreArticlePageSlugs, getStoreArticlesPage } from '@/lib/homeStores';
import { toHomeReviewCard } from '@/lib/reviewDiscovery';

// Tudo o que a Cecília escreveu sobre uma loja. A página da loja (/cupons/{slug}) responde qual é o
// código e como usar; esta lista os artigos. Só em português, e só para loja ativa com artigo.

export const dynamicParams = false;

type StoreArticlesPageProps = {
  params: Promise<{ brand: string }>;
};

export function generateStaticParams() {
  return getStoreArticlePageSlugs(publishedReviews).map((brand) => ({ brand }));
}

export async function generateMetadata({ params }: StoreArticlesPageProps): Promise<Metadata> {
  const page = getStoreArticlesPage(publishedReviews, (await params).brand);
  if (!page) return {};
  const path = `/reviews/loja/${page.slug}`;

  return {
    title: page.metaTitle,
    description: page.description,
    alternates: { canonical: path },
    openGraph: { title: page.metaTitle, description: page.description, url: path, type: 'website' },
  };
}

export default async function StoreArticlesPage({ params }: StoreArticlesPageProps) {
  const page = getStoreArticlesPage(publishedReviews, (await params).brand);
  if (!page) notFound();

  return (
    <main className="min-h-screen bg-[#fef9f3]">
      <section className="border-b border-black/5 bg-[#0f1d3a] px-6 py-14 text-white md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">{page.title}</h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">{page.countLabel}</p>
          <Link
            href={page.storePageUrl}
            className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-full bg-laranja px-6 text-sm font-extrabold text-marinho focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-amarelo-cupom"
          >
            {page.codeLinkLabel}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>

      <section className="px-6 py-8 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4">
            {page.articles.map(toHomeReviewCard).map((review, index) => (
              <ReviewHubCard key={review.id} review={review} index={index} />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#1a4d2e] px-8 py-4 font-semibold text-[#1a4d2e] transition-all hover:bg-[#1a4d2e] hover:text-white"
            >
              Ver todos os guias e análises
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 6: tipos, lint e build**

Run: `npm run typecheck && npx eslint --quiet src/components/review/ReviewHubCard.tsx "src/app/(pt)/reviews/ReviewsClientPage.js" "src/app/(pt)/reviews/loja/[brand]/page.tsx" src/app/sitemap.ts scripts/test-home-stores.ts && npm run build`
Expected: verde, com `test:client-bundle` passando (nem o card nem a vitrine levam o índice).

- [ ] **Step 7: conferir o HTML das subpáginas**

Run:

```bash
for f in .next/server/app/reviews/loja/*.html; do
  printf "%s h1=%s cards=%s canonical=%s cupons_damie=%s\n" "$(basename $f .html)" \
    "$(grep -o '<h1[^>]*>[^<]*' $f | sed 's/<h1[^>]*>//')" \
    "$(grep -o 'href="/reviews/[a-z0-9-]*"' $f | grep -v '/reviews/loja' | sort -u | wc -l)" \
    "$(grep -o '<link rel="canonical" href="[^"]*"' $f | sed 's/.*href="//;s/"//')" \
    "$(grep -o 'href="[^"]*cupons/damie"' $f | wc -l)"
done
```

Expected: uma linha por loja com artigo (hoje 8, sem a SHEIN):
- `h1` "Artigos da …" ("do Magalu");
- `cards` igual ao total da loja (DAMIE 14, Dolce Gusto 15…);
- canonical `https://emcasacomcecilia.com/reviews/loja/<slug>`;
- `cupons_damie=1` na DAMIE (o "Ver o código da DAMIE") e 0 nas outras.

`.next/server/app/reviews/loja/shein.html` não existe.

- [ ] **Step 8: navegador**

No preview:
- `/reviews/loja/damie` mostra "Artigos da DAMIE" e 14 cards, e o link "Ver o código da DAMIE"
  aponta para `/cupons/damie`;
- `/reviews/loja/shein` e `/reviews/loja` dão 404;
- na home, "Ver os 14 artigos da DAMIE" abre a subpágina;
- `/reviews` segue igual, com filtro e "Carregar mais".

Tirar screenshot em 390 e 1280.

- [ ] **Step 9: commit**

```bash
git add src/components/review/ReviewHubCard.tsx "src/app/(pt)/reviews/ReviewsClientPage.js" "src/app/(pt)/reviews/loja/[brand]/page.tsx" src/app/sitemap.ts scripts/test-home-stores.ts
git commit -m "feat: subpágina com todos os artigos de cada loja, com o card de /reviews

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

- [ ] **Step 10: parar.** Relatar ao Bruno e combinar o plano da Fase 3.

---

## Cobertura da spec neste plano

| Requisito da spec | Onde |
|---|---|
| Aba da Cecília primeiro, sem código e sem artigos | Task 1 (`getTabOrder`), Task 3 (nenhuma aba `cecilia` nos dados), Task 6 |
| Uma aba por loja ativa, na ordem de `couponsData.ts`; pausada some | Task 3 |
| Rótulos de recompensa e de indicação, sem "cupom" no CECILIA010 | Task 3 |
| Desconto e descrição das abas vindos dos dados (Insider com o percentual desde 07/10); Nutre com a exclusão | Task 3, Task 4 |
| Até 3 artigos, sem código; `total`; "Ver os N artigos" acima de 3 | Task 3, Task 7 |
| 0 artigo (SHEIN): aviso no lugar da lista; 1 artigo: sem segmentos, setas e contador | Task 3, Task 7 |
| DAMIE abre ao entrar; `/#loja-…` e `/#cecilia`; hash desconhecido ignorado | Task 1, Task 7 |
| Página da loja de cada aba em `/cupons/<slug>`, a DAMIE inclusive (Bruno, 08/10) | Task 4b, Task 7 (passo 5), Task 9 (passo 7) |
| Padrão de abas (setas, Home, End), alvos de 44 px, foco visível | Task 7 |
| Painéis no HTML do servidor, escondidos com `hidden`; imagens dos escondidos sem carregar | Task 7 |
| Movimento (entrada, brilho ao copiar, hovers) e os efeitos do hero de hoje, com `motion-safe` | Task 6, Task 7 |
| `CopyPlacement` `home_store_banner`; placements da vitrine; `home_store_select` | Task 1, Task 5, Task 7 |
| Subpágina estática, 404 para outras lojas e para `/reviews/loja`, card extraído, sitemap | Task 8, Task 9 |
| "Acabou de sair" (dados) | Task 4 (a seção na home é da Fase 3) |
| `test:build-output` da home e das subpáginas | Fase 6c (plano próprio); aqui, conferência manual nos passos 5 da Task 7 e 7 da Task 9 |
