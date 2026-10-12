# /videos e as páginas de cada vídeo (D2.2) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refazer `/videos` no layout A (destaque do vídeo mais novo, a grade dos vídeos com página própria filtrada por chips de loja e os últimos do canal com "Inscrever-se no canal") e as 14 páginas `/videos/<slug>` (player no formato do vídeo logo depois do h1, o painel com a origem e o botão da loja, e "Mais vídeos"), e fazer o "Últimos vídeos" da home levar à página do vídeo quando ela existe.

**Architecture:** Os dados saem prontos do servidor por `src/lib/videosHub.ts`, que recebe os artigos e as receitas por parâmetro e não importa `@/lib/data`. As regras que o navegador também usa (tipos, filtro por loja e `?loja=`, duração, data, medição) ficam em `src/lib/videosShelf.ts`, sem dados. Os componentes de `src/components/videos/` desenham; o `VideosBrowser` (cliente) guarda a loja na URL e anima a troca com a mesma máquina da estante de `/reviews`, que vira módulos comuns (`shelfTransition.ts`, `useListUrl.tsx`, `listUrl.ts` e as classes dos chips), sem mudança visível em `/reviews`.

**Tech Stack:** Next.js 16.1.4 App Router (SSR na Hostinger), React 19, TypeScript 5.9, Tailwind CSS v4, `lucide-react`, testes em `tsx` com `node:assert/strict` e `react-dom/server`.

**Spec:** `docs/superpowers/specs/2026-10-10-videos-redesign-design.md` (commit `59068a9`)

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
- **Fora do escopo.**
  - Não mexer em `/cupons/*`, `src/lib/couponsData.ts`, `src/lib/couponTranslations.ts`, `data/coupons/yesstyle.json` nem em `/<locale>/reviews`.
  - Não mexer em `src/lib/video-metadata.js`, `src/lib/video-schema.js`, `src/app/sitemap.ts` nem em `src/lib/youtube.ts`: o `VideoObject`, o sitemap de vídeo, a API do YouTube (6 uploads, 1 h) e os títulos não mudam.
  - O player do YouTube continua um `<iframe>` carregado (sem fachada).
  - Nunca abrir, clicar nem buscar link de afiliado ou da SHEIN.
- **Componentes cliente.** Arquivo `'use client'` não importa valores de `@/lib/data`, `@/lib/videosHub`, `@/lib/reviewsHub`, `@/lib/homeStores` nem `@/lib/couponsData` (só `import type`). As regras que o cliente usa vêm de `@/lib/videosShelf` (e `@/lib/listUrl`, `@/lib/viewTransition`).
- **`flushSync` só em módulo de cliente.** `src/lib/viewTransition.ts` é importado por componentes servidor (`RecipeNotebookTemplate`, `PopularRecipes`); nada que use `flushSync` entra nele.
- **Movimento.**
  - Todo movimento fica dentro de `prefers-reduced-motion: no-preference`: as classes do `globals.css` (`.revela` com `--i`, `.marca-texto`, `.marca-texto-entra`, `[data-trocando] .estante-item`) e os utilitários `motion-safe:`. Esta frente não acrescenta CSS ao `globals.css`.
  - O HTML do servidor de `/videos` não leva `data-reveal` nem `view-transition-name` (só a variável `--vt` e o `data-vt-name`). Na página de cada vídeo, a moldura do player leva `view-transition-name: video-player-<slug>` no HTML, como o topo dos artigos leva o `review-hero-`.
  - Animações mexem só em `opacity`, `transform`/`translate`/`scale`, `box-shadow` e `background-size`.
- **Tailwind.** Classe nunca colada a um `${…}`: sempre um espaço antes (o scanner do Tailwind 4 deixa de ler a classe colada, e ela some do CSS sem erro).
- **CECILIA010.** É código de recompensa: nenhum texto, `alt` ou `aria-label` o chama de cupom. O botão da loja diz "Ver o código da <loja>".
- **Textos.** Só em português, nos módulos indicados em cada task, sem mistura de inglês na interface.
- **`setState` em efeito** só por uma função local chamada dentro do efeito; o lint `react-hooks/set-state-in-effect` está ligado como erro.

## Review Focus

1. **Vídeo sem duração** (os 2 MP4 de hoje): nenhum selo, nenhum "Duração:" no painel, nenhum "undefined" ou "NaN" em texto, nome acessível ou meta. Testes: Task 1 (`formatDuration`, o `VideoItem` do MP4), Task 2 (o cartão), Task 4 (o destaque), Task 6 (o painel de cada página gerada).
2. **`?loja=` ruim** (loja desconhecida, maiúscula, vazia, repetida, loja com um vídeo só): cai em "Todos"; "Todos" tira todo `?loja=` e mantém `utm_*`. Testes na Task 1 (`readStoreFilter`, `withStoreFilter`).
3. **Loja pausada ou origem sem loja** (receita, guia sem `affiliate`, `affiliate` fora das lojas ativas): sem nome no cartão, sem chip e sem o botão "Ver o código". Testes: Task 1 (dados), Task 5 (`VideoSourceCard`), Task 6 (cada página gerada).
4. **Sem a chave da API do YouTube no build:** o canal some em `/videos` e na home, e nada mais quebra (destaque, grade e páginas de vídeo não dependem dela). Testes: Task 2 (`LatestVideos` vazio), Task 4 (`VideoChannelRow` vazio), Task 6 (as travas do canal só valem quando a seção existe).
5. **Títulos longos do YouTube** (emoji e "| CUPOM CECILIA12", até ~90 caracteres): o h1 sai inteiro e igual ao `name` do `VideoObject`, o cartão corta em 3 linhas e a trilha quebra linha. Testes: Task 2 (`line-clamp-3` no h3), Task 4 (`PageTrail` com `flex-wrap` e o item longo sem link), Task 6 (h1 de cada página igual ao `VideoObject`).

## Mapa dos arquivos

| Arquivo | Responsabilidade | Task |
|---|---|---|
| `src/lib/video-pages.js` | Cada definição ganha `aspect`. | 1 |
| `scripts/validate-video-schema.ts` | Exige o `aspect` com um dos três valores. | 1 |
| `src/lib/videosShelf.ts` (novo) | Tipos, `aspect`, duração, data, filtro por loja e `?loja=`, cartão, textos da origem, medição e o endereço de inscrição. Sem dados. | 1 |
| `src/lib/videosHub.ts` (novo) | Monta no servidor os vídeos, o destaque, os chips, a imagem de compartilhamento, a página de cada vídeo e a fila do canal. | 1 |
| `scripts/test-videos-hub.ts` (novo) | Testes das regras, dos dados e dos componentes. | 1, 2, 4, 5 |
| `package.json` | `test:videos-hub` e o teste na cadeia do `build`. | 1 |
| `src/lib/homeStores.ts`, `src/lib/homeEvents.ts` | `codeLinkLabel`: o rótulo "Ver o código da <loja>" num lugar só (subpágina de loja, datas comerciais e página do vídeo). | 1 |
| `src/components/videos/TrackedVideosLink.tsx` (novo) | `TrackedVideosLink` e `VideoPageLink`, medidos com `videos_route_click`. | 2 |
| `src/components/videos/VideoCard.tsx` (novo) | O cartão vertical (home, grade, canal, Mais vídeos). | 2 |
| `src/components/videos/VideoRow.tsx` (novo) | A fila de cartões (`ScrollRow`), com 6 colunas no desktop quando é o canal. | 2 |
| `src/components/sections/CTA.tsx` | "Últimos vídeos" com o `VideoRow`, o link interno e "Ver todos os vídeos". | 2 |
| `scripts/test-home-lower-sections.ts` | Travas da home nova. | 2 |
| `src/components/ui/shelfTransition.ts` (novo) | `runShelfTransition` (sai do `ReviewsBrowser`). | 3 |
| `src/lib/listUrl.ts` (novo) | `isOnList` e `urlSearchOf` (saem do `reviewsShelf.ts`, que os reexporta). | 3 |
| `src/components/ui/useListUrl.tsx` (novo) | `useListUrlSearch`, `writeListUrl` e `ListUrlListener` (saem do `ReviewsBrowser`). | 3 |
| `src/lib/reviewsShelf.ts`, `src/components/reviews/ReviewsBrowser.tsx` | Passam a usar os módulos comuns. | 3 |
| `src/components/reviews/shelfClasses.ts` | `filterChipRowClass` e `filterChipClass`. | 3 |
| `src/components/ui/PageTrail.tsx` (novo) | A trilha visível (sai do `StoreHero` da subpágina de loja). | 4 |
| `src/app/(pt)/reviews/loja/[brand]/page.tsx` | Usa o `PageTrail`. | 4 |
| `src/components/videos/VideoFeatured.tsx` (novo) | O destaque de `/videos`. | 4 |
| `src/components/videos/VideosBrowser.tsx` (novo) | Os chips, o total, a grade, a URL e a troca animada. | 4 |
| `src/components/videos/VideoChannelRow.tsx` (novo) | "Últimos do canal" e a faixa do canal (`VideoChannelStrip`). | 4 |
| `src/app/(pt)/videos/page.tsx` (novo; apaga `page.js`) | A página `/videos`. | 4 |
| `src/components/videos/VideoPlayer.tsx` (novo) | O player no formato do `aspect`. | 5 |
| `src/components/videos/VideoSourceCard.tsx` (novo) | A origem e o botão da loja. | 5 |
| `src/components/review/TrackedCouponPageLink.tsx` | O placement `video_page`. | 5 |
| `src/lib/pageSeo.ts` | `getBreadcrumbListJsonLd` (o `getCollectionPageJsonLd` passa a usá-lo). | 5 |
| `src/app/(pt)/videos/[slug]/page.tsx` (novo; apaga `[slug]/page.js`) | A página de cada vídeo. | 5 |
| `scripts/test-build-output.ts` | Travas no HTML gerado: `/videos`, as páginas de vídeo, a home e o CSS do player. | 6 |
| `CLAUDE.md`, `docs/GUIA-EDITORIAL-VIDEOS.md` | Documentação. | 6 |

As 5 etapas da spec viram 6 tasks: a troca animada e a leitura da URL saem do `ReviewsBrowser` numa task própria (a 3), que só reorganiza código e se revisa sozinha.

**Decisões do plano sobre pontos que a spec deixou em aberto ou que o código mostrou diferentes:**
- **`runShelfTransition` vai para `src/components/ui/shelfTransition.ts`, não para `src/lib/viewTransition.ts`.** Ele usa `flushSync`, e `viewTransition.ts` é importado por componentes servidor (`RecipeNotebookTemplate`, `PopularRecipes`): o `flushSync` não existe no código do servidor.
- **A leitura e a gravação da URL** (`useSyncExternalStore`, o evento, o `useSearchParams` com Suspense próprio) também saem do `ReviewsBrowser`, para `useListUrl.tsx`: o `VideosBrowser` precisa da mesma regra, e duas cópias divergiriam. `isOnList` e `urlSearchOf` vão para `src/lib/listUrl.ts`; o `reviewsShelf.ts` os reexporta, e os imports de hoje continuam valendo.
- **Os chips** de `/reviews` e de `/videos` usam as mesmas classes (`filterChipRowClass`, `filterChipClass` em `shelfClasses.ts`), com o mesmo texto de hoje: o HTML de `/reviews` não muda.
- **O título da origem** é o `sourceTitle` de `video-pages.js` (o de hoje na página e o das telas do brainstorm); a foto vem do artigo ou da receita.
- **A loja** é a loja **ativa** do `affiliate` do artigo de origem. Loja pausada ou ausente: sem nome no cartão, sem chip e sem botão.
- **Duração:** os 2 MP4 não têm `duration` em `localVideoMetadata`. Sem duração, nada de selo nem de "Duração:" (o campo não é inventado).
- **Fonte do artigo de origem:** a busca pelo slug prefere a versão em português (`locale` ausente ou `pt`).
- **O destaque** tem dois links para a página do vídeo (a miniatura e o título). O da miniatura sai do teclado e do leitor de tela (`tabIndex={-1}` e `aria-hidden`), para a página do vídeo ser um ponto só na ordem do Tab.
- **A home continua sem medição** nos vídeos (hoje não há): `VideoCard` e os links medem só quando recebem `placement`.
- **A faixa do canal** é a mesma em `/videos` e na página do vídeo: "Cecília no YouTube" (link para o canal, `*_channel`) e o botão "Inscrever-se no canal" (`*_subscribe`), com o mesmo rótulo nas duas.
- **Três filas iguais** (os Últimos vídeos da home, o canal de `/videos` e "Mais vídeos") usam um componente só, `VideoRow`, dentro do `HomeSection`.
- **A trilha** (`PageTrail`) sai do `StoreHero` da subpágina de loja, com o mesmo HTML, e serve às três páginas.
- **O `BreadcrumbList`** da página do vídeo sai do `getBreadcrumbListJsonLd` de `pageSeo.ts`, o mesmo que o `getCollectionPageJsonLd` passa a usar (saída idêntica).
- **O player quadrado** também não passa de `80svh`; o vertical usa `min(45svh, 405px)` de largura, que é 9/16 de `min(80svh, 720px)` de altura, sem `calc`.
- **O h1 da página do vídeo** é menor que o de `/videos` (32 px no celular, 48 px no desktop): os títulos do YouTube têm até ~90 caracteres.
- **`coupon_page_click`** ganha o placement `video_page`, com `content_slug` igual ao slug do vídeo.
- **O rótulo "Ver o código da <loja>"** (o `codeLinkLabel` da spec) vira a função `codeLinkLabel` em `homeStores.ts`, usada pela subpágina de loja, pelas datas comerciais e pela página do vídeo, em vez de uma terceira cópia do texto.
- **O canal acha a página do vídeo** pela mesma regra do `getVideoPageForYoutubeUrl` (o `embedUrl`), dentro do `getChannelRow`, que recebe as páginas por parâmetro para o teste usar dados próprios.
- **A duração** vira um objeto (`text`, `badge`, `spoken`) no lugar do `durationLabel` e do `durationBadge` da spec: o nome acessível do cartão precisa da forma por extenso ("54 segundos").

---

### Task 1: Dados e regras dos vídeos

**Files:**
- Modify: `src/lib/video-pages.js` (o `aspect` em cada definição)
- Modify: `scripts/validate-video-schema.ts` (o `aspect` obrigatório)
- Create: `src/lib/videosShelf.ts`
- Create: `src/lib/videosHub.ts`
- Create: `scripts/test-videos-hub.ts`
- Modify: `package.json` (scripts `test:videos-hub` e `build`)
- Modify: `src/lib/homeStores.ts` (`codeLinkLabel`, o rótulo "Ver o código da <loja>" num lugar só)
- Modify: `src/lib/homeEvents.ts` (usa o `codeLinkLabel`)

**Interfaces:**
- Consumes: `brandLinks` (`@/lib/brandLinks`); `sanitizeViewTransitionName` (`@/lib/viewTransition`); `getActiveCoupons`, `type Coupon` (`@/lib/couponsData`); `getCouponStorePath` (`@/lib/couponTranslations`); `type SocialHighlight` (`@/lib/data`, só tipo); `ofStore` e `codeLinkLabel` (`@/lib/homeStores`; o segundo é criado nesta task); `absoluteMediaUrl`, `type SocialImage` (`@/lib/pageSeo`); `resolveMediaUrl` (`@/lib/resolve-media.mjs`); `getYoutubeEmbedUrl` (`@/lib/video-metadata`); `isoDurationToSeconds`, `videoPages` (`@/lib/video-pages`).
- Produces (`@/lib/videosShelf`):
  - `VIDEO_ASPECTS`, `type VideoAspect` (`'vertical' | 'horizontal' | 'square'`), `isVideoAspect(value): value is VideoAspect`;
  - tipos `VideoDuration` (`{ text; badge; spoken }`), `VideoStore` (`{ slug; name }`), `VideoSourceKind` (`'guia' | 'receita'`), `VideoSource` (`{ href; title; image: string | null; kind }`), `VideoPlayerSource` (`{ kind: 'youtube'; embedUrl } | { kind: 'local'; contentUrl }`), `VideoItem`, `VideoCardData`, `VideosPlacement`;
  - `formatDuration(totalSeconds?: number): VideoDuration | null`, `formatVideoDate(uploadDate: string): string`;
  - `STORE_PARAM` (`'loja'`), `readStoreFilter(search, storeSlugs): string | null`, `withStoreFilter(currentSearch, store: string | null): string`, `filterByStore(videos, store)`, `videosCountLabel(total)`;
  - `sourceCopy(kind): { from; action }`, `videoMorphName(slug)`, `toVideoCard(video: VideoItem): VideoCardData`;
  - `VIDEOS_ROUTE_CLICK`, `VIDEOS_LIST_CONTROL`, `getVideosRouteClickParameters({ href, placement, linkLabel })`, `getVideosListControlParameters({ value, listPath })`, `YOUTUBE_SUBSCRIBE_URL`, `CHANNEL_PLACEMENTS`.
- Produces (`@/lib/videosHub`): `type VideoSources`, `type VideoPageRecord`, `type VideosHubContent`, `type VideoPageContent`, `VIDEOS_TRAIL`, `getVideoItems(sources, pages?, stores?)`, `getVideosHubContent(sources, pages?, stores?)`, `getVideoPageContent(sources, slug, pages?, stores?)`, `getChannelRow(highlights, pages?)`.

- [ ] **Step 1: Escrever o teste (falha porque os módulos não existem)**

Crie `scripts/test-videos-hub.ts`:

```ts
import assert from 'node:assert/strict';

import { COUPONS } from '@/lib/couponsData';
import { publishedReviews, recipes, type SocialHighlight } from '@/lib/data';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';
import { videoPages } from '@/lib/video-pages';
import {
  VIDEOS_TRAIL,
  getChannelRow,
  getVideoItems,
  getVideoPageContent,
  getVideosHubContent,
  type VideoPageRecord,
  type VideoSources,
} from '@/lib/videosHub';
import {
  CHANNEL_PLACEMENTS,
  VIDEOS_LIST_CONTROL,
  VIDEOS_ROUTE_CLICK,
  YOUTUBE_SUBSCRIBE_URL,
  filterByStore,
  formatDuration,
  formatVideoDate,
  getVideosListControlParameters,
  getVideosRouteClickParameters,
  isVideoAspect,
  readStoreFilter,
  sourceCopy,
  toVideoCard,
  videoMorphName,
  videosCountLabel,
  withStoreFilter,
  type VideoItem,
} from '@/lib/videosShelf';

// /videos e a página de cada vídeo: as regras de videosShelf.ts, os dados de videosHub.ts e os componentes,
// renderizados como o servidor os entrega. Sem DOM, os cliques são exercitados com eventos falsos.

function store(slug: string) {
  const found = COUPONS.find((coupon) => coupon.slug === slug);
  assert.ok(found, `loja ${slug} existe em couponsData.ts`);
  return found;
}

function page(slug: string, overrides: Partial<VideoPageRecord> = {}): VideoPageRecord {
  return {
    slug,
    kind: 'youtube',
    aspect: 'vertical',
    sourcePath: `/reviews/${slug}-guia`,
    sourceTitle: `Guia ${slug}`,
    title: `Vídeo ${slug}`,
    description: `Descrição ${slug}`,
    uploadDate: '2026-01-01',
    duration: 'PT54S',
    thumbnailUrl: `https://i.ytimg.com/vi/${slug}/hqdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${slug}`,
    ...overrides,
  };
}

// 8 vídeos, fora de ordem. Os três mais novos são do mesmo dia: o das 13h UTC (escrito com -03:00) vem antes
// do das 12h UTC, embora a ordem do texto diga o contrário, e o do dia sem hora (meia-noite UTC) vem depois. A
// DAMIE e a Dolce Gusto têm 2 vídeos cada (a Dolce Gusto, um MP4 quadrado sem duração); a YesStyle tem um só
// (sem chip); a Kopenhagen não está entre as lojas passadas (loja inativa); há uma receita e um guia sem loja
// e sem foto.
const fixturePages: VideoPageRecord[] = [
  page('mesmo-dia', { uploadDate: '2026-09-01T12:00:00Z', duration: 'PT1M7S' }),
  page('novo-damie', { uploadDate: '2026-09-01T10:00:00-03:00' }),
  page('cafe', { aspect: 'horizontal', uploadDate: '2026-09-01', duration: 'PT18M17S' }),
  page('cafe-local', {
    kind: 'local',
    aspect: 'square',
    uploadDate: '2026-08-01',
    duration: undefined,
    thumbnailUrl: '/images/teste/cafe-local-poster.jpg',
    embedUrl: undefined,
    contentUrl: '/videos/teste/cafe-local.mp4',
  }),
  page('receita', {
    sourcePath: '/receitas/bolo-teste',
    sourceTitle: 'Bolo de teste',
    uploadDate: '2026-07-01',
    duration: 'PT1M12S',
  }),
  page('sem-loja', { uploadDate: '2026-06-01', duration: 'PT1M' }),
  page('inativa', { uploadDate: '2026-05-01', duration: 'PT59S' }),
  page('um-so', { aspect: 'horizontal', uploadDate: '2026-04-01', duration: 'PT3M27S' }),
];

const guide = (slug: string, affiliate?: string) => ({
  slug: `${slug}-guia`,
  image: `/images/reviews/teste/${slug}.webp`,
  affiliate,
});
const fixtureSources: VideoSources = {
  reviews: [
    guide('mesmo-dia', 'damie'),
    guide('novo-damie', 'damie'),
    guide('cafe', 'dolce-gusto'),
    guide('cafe-local', 'dolce-gusto'),
    { slug: 'sem-loja-guia' },
    guide('inativa', 'kopenhagen'),
    guide('um-so', 'yesstyle'),
  ],
  recipes: [{ slug: 'bolo-teste', image: '/images/recipes/teste/bolo.avif' }],
};
const fixtureStores = [store('damie'), store('dolce-gusto'), store('yesstyle')];

const items = getVideoItems(fixtureSources, fixturePages, fixtureStores);
const slugs = (videos: readonly { slug: string }[]) => videos.map(({ slug }) => slug);
const item = (slug: string): VideoItem => {
  const found = items.find((video) => video.slug === slug);
  assert.ok(found, `vídeo ${slug}`);
  return found;
};

// Ordem: do mais novo ao mais antigo pelo instante, com e sem hora, com fuso.
assert.deepEqual(slugs(items), ['novo-damie', 'mesmo-dia', 'cafe', 'cafe-local', 'receita', 'sem-loja', 'inativa', 'um-so']);

// O vídeo como a página o recebe: data e duração em texto, a loja ativa, a origem e o botão do código.
const novo = item('novo-damie');
assert.deepEqual(novo, {
  slug: 'novo-damie',
  href: '/videos/novo-damie',
  title: 'Vídeo novo-damie',
  description: 'Descrição novo-damie',
  aspect: 'vertical',
  thumbnail: 'https://i.ytimg.com/vi/novo-damie/hqdefault.jpg',
  uploadDate: '2026-09-01T10:00:00-03:00',
  dateLabel: '01/09/2026',
  duration: { text: '54 s', badge: '0:54', spoken: '54 segundos' },
  store: { slug: 'damie', name: 'DAMIE' },
  source: {
    href: '/reviews/novo-damie-guia',
    title: 'Guia novo-damie',
    image: resolveMediaUrl('/images/reviews/teste/novo-damie.webp'),
    kind: 'guia',
  },
  codeLink: { label: 'Ver o código da DAMIE', href: '/cupons/damie' },
  player: { kind: 'youtube', embedUrl: 'https://www.youtube.com/embed/novo-damie' },
});
assert.deepEqual(item('cafe').codeLink, { label: 'Ver o código da Dolce Gusto', href: '/cupons/dolce-gusto' });
assert.deepEqual(item('um-so').codeLink, { label: 'Ver o código da YesStyle', href: '/cupons/yesstyle' });

// MP4 do site: sem duração (nada de selo nem de texto), miniatura e arquivo pelo resolvedor de mídia.
const local = item('cafe-local');
assert.equal(local.duration, null);
assert.equal(local.aspect, 'square');
assert.equal(local.thumbnail, resolveMediaUrl('/images/teste/cafe-local-poster.jpg'));
assert.deepEqual(local.player, { kind: 'local', contentUrl: resolveMediaUrl('/videos/teste/cafe-local.mp4') });

// Receita, guia sem loja (e sem foto) e loja inativa: sem loja e sem botão do código.
const receita = item('receita');
assert.deepEqual(receita.source, {
  href: '/receitas/bolo-teste',
  title: 'Bolo de teste',
  image: resolveMediaUrl('/images/recipes/teste/bolo.avif'),
  kind: 'receita',
});
for (const slug of ['receita', 'sem-loja', 'inativa']) {
  assert.equal(item(slug).store, null, `${slug}: sem loja`);
  assert.equal(item(slug).codeLink, null, `${slug}: sem botão do código`);
}
assert.equal(item('sem-loja').source.image, null, 'artigo sem foto');

// A versão em português do artigo vale, mesmo com outra versão do mesmo slug antes dela.
const withForeignTwin: VideoSources = {
  ...fixtureSources,
  reviews: [{ slug: 'novo-damie-guia', locale: 'en', image: '/images/reviews/teste/en.webp' }, ...fixtureSources.reviews],
};
assert.equal(
  getVideoItems(withForeignTwin, [page('novo-damie')], fixtureStores)[0].store?.slug,
  'damie',
  'a origem é a versão em português'
);

// Dados que não fecham derrubam a montagem, com o vídeo e o motivo.
assert.throws(() => getVideoItems(fixtureSources, [page('novo-damie', { aspect: 'retrato' })], fixtureStores), /vídeo novo-damie: aspect inválido/);
assert.throws(() => getVideoItems(fixtureSources, [page('novo-damie', { aspect: undefined })], fixtureStores), /aspect inválido/);
assert.throws(() => getVideoItems(fixtureSources, [page('orfao')], fixtureStores), /vídeo orfao: a origem \/reviews\/orfao-guia não está/);
assert.throws(
  () => getVideoItems(fixtureSources, [page('novo-damie', { sourcePath: '/cupons/damie' })], fixtureStores),
  /a origem \/cupons\/damie não está/
);
assert.throws(
  () => getVideoItems(fixtureSources, [page('novo-damie', { title: undefined })], fixtureStores),
  /sem título, descrição, data ou miniatura/
);
assert.throws(
  () => getVideoItems(fixtureSources, [page('cafe-local', { kind: 'local', embedUrl: undefined, contentUrl: undefined })], fixtureStores),
  /sem o endereço do player/
);

// O formato.
for (const aspect of ['vertical', 'horizontal', 'square']) assert.equal(isVideoAspect(aspect), true, aspect);
for (const aspect of ['Vertical', 'retrato', '', undefined, null, 1]) assert.equal(isVideoAspect(aspect), false, String(aspect));

// /videos: o destaque é o mais novo, a grade traz todos (inclusive o destaque), os chips são as lojas ativas
// com 2 ou mais vídeos na ordem das lojas, e a imagem de compartilhamento é a miniatura do destaque.
const hub = getVideosHubContent(fixtureSources, fixturePages, fixtureStores);
assert.equal(hub.featured.slug, 'novo-damie');
assert.deepEqual(slugs(hub.videos), slugs(items));
assert.equal(hub.intro, '8 vídeos da casa da Cecília. Cada um leva ao guia ou à receita completa.');
assert.deepEqual(hub.stores, [
  { slug: 'damie', name: 'DAMIE' },
  { slug: 'dolce-gusto', name: 'Dolce Gusto' },
]);
assert.deepEqual(hub.socialImage, { url: 'https://i.ytimg.com/vi/novo-damie/hqdefault.jpg', alt: 'Vídeo novo-damie' });
assert.deepEqual(
  getVideosHubContent(fixtureSources, fixturePages, [...fixtureStores].reverse()).stores.map(({ slug }) => slug),
  ['dolce-gusto', 'damie'],
  'os chips seguem a ordem das lojas'
);
// Controle: com um segundo vídeo, a YesStyle ganha chip.
const twoYesStyle = getVideosHubContent(
  { ...fixtureSources, reviews: [...fixtureSources.reviews, guide('um-so-2', 'yesstyle')] },
  [...fixturePages, page('um-so-2', { uploadDate: '2026-03-01' })],
  fixtureStores
);
assert.deepEqual(twoYesStyle.stores.map(({ slug }) => slug), ['damie', 'dolce-gusto', 'yesstyle']);
assert.match(getVideosHubContent(fixtureSources, [fixturePages[0]], fixtureStores).intro, /^1 vídeo da casa da Cecília\./);
assert.throws(() => getVideosHubContent(fixtureSources, [], fixtureStores), /nenhum vídeo/);

// Duração: o selo, o texto do painel e o nome acessível, por extenso.
assert.deepEqual(formatDuration(54), { text: '54 s', badge: '0:54', spoken: '54 segundos' });
assert.deepEqual(formatDuration(67), { text: '1 min 7 s', badge: '1:07', spoken: '1 minuto e 7 segundos' });
assert.deepEqual(formatDuration(72), { text: '1 min 12 s', badge: '1:12', spoken: '1 minuto e 12 segundos' });
assert.deepEqual(formatDuration(1097), { text: '18 min 17 s', badge: '18:17', spoken: '18 minutos e 17 segundos' });
assert.deepEqual(formatDuration(60), { text: '1 min', badge: '1:00', spoken: '1 minuto' });
assert.deepEqual(formatDuration(61), { text: '1 min 1 s', badge: '1:01', spoken: '1 minuto e 1 segundo' });
assert.deepEqual(formatDuration(3723), { text: '1 h 2 min 3 s', badge: '1:02:03', spoken: '1 hora, 2 minutos e 3 segundos' });
assert.deepEqual(formatDuration(7200), { text: '2 h', badge: '2:00:00', spoken: '2 horas' });
assert.equal(formatDuration(undefined), null);
assert.equal(formatDuration(0), null);
assert.equal(formatDuration(Number.NaN), null);
assert.deepEqual(item('mesmo-dia').duration, formatDuration(67), 'PT1M7S');
assert.deepEqual(item('sem-loja').duration, formatDuration(60), 'PT1M');

// Data: o dia como está no registro, o de quem publicou (em UTC, o vídeo das 18h35 de -07:00 já é dia 28).
assert.equal(formatVideoDate('2026-09-27T18:35:34-07:00'), '27/09/2026');
assert.equal(formatVideoDate('2026-03-19'), '19/03/2026');

// URL: só uma loja com chip vale; o resto é "Todos". "Todos" tira todo ?loja= e os outros parâmetros ficam.
const chipSlugs = hub.stores.map(({ slug }) => slug);
assert.equal(readStoreFilter('?loja=damie', chipSlugs), 'damie');
assert.equal(readStoreFilter('?utm_source=ig&loja=dolce-gusto', chipSlugs), 'dolce-gusto');
assert.equal(readStoreFilter('', chipSlugs), null);
assert.equal(readStoreFilter('?loja=', chipSlugs), null);
assert.equal(readStoreFilter('?loja=inexistente', chipSlugs), null, 'loja desconhecida');
assert.equal(readStoreFilter('?loja=yesstyle', chipSlugs), null, 'loja de um vídeo só');
assert.equal(readStoreFilter('?loja=DAMIE', chipSlugs), null, 'maiúscula não é o slug');
assert.equal(readStoreFilter('?loja=damie&loja=x', chipSlugs), 'damie', 'repetido: vale o primeiro');
assert.equal(withStoreFilter('', 'damie'), '?loja=damie');
assert.equal(withStoreFilter('?utm_source=ig', 'damie'), '?utm_source=ig&loja=damie');
assert.equal(withStoreFilter('?loja=damie&utm_source=ig', 'dolce-gusto'), '?utm_source=ig&loja=dolce-gusto');
assert.equal(withStoreFilter('?loja=damie&utm_source=ig', null), '?utm_source=ig');
assert.equal(withStoreFilter('?loja=damie&loja=x', null), '');
assert.deepEqual(slugs(filterByStore(hub.videos, 'damie')), ['novo-damie', 'mesmo-dia']);
assert.deepEqual(slugs(filterByStore(hub.videos, null)), slugs(hub.videos));
assert.equal(videosCountLabel(1), '1 vídeo');
assert.equal(videosCountLabel(0), '0 vídeos');
assert.equal(videosCountLabel(14), '14 vídeos');

// O cartão: a loja embaixo (ou "Receita"), e o nome da transição para o player.
assert.deepEqual(toVideoCard(novo), {
  id: 'novo-damie',
  title: 'Vídeo novo-damie',
  href: '/videos/novo-damie',
  external: false,
  thumbnail: 'https://i.ytimg.com/vi/novo-damie/hqdefault.jpg',
  vtName: 'video-player-novo-damie',
  duration: novo.duration,
  label: 'DAMIE',
});
assert.equal(toVideoCard(receita).label, 'Receita');
assert.equal(toVideoCard(item('sem-loja')).label, null);
assert.equal(toVideoCard(item('inativa')).label, null);
assert.equal(videoMorphName('Poltrona Levita_2.0'), 'video-player-poltrona-levita-2-0');
assert.deepEqual(sourceCopy('guia'), { from: 'Do guia', action: 'Ler o guia' });
assert.deepEqual(sourceCopy('receita'), { from: 'Da receita', action: 'Ver a receita' });

// A página do vídeo: a trilha, e "Mais vídeos" com a mesma loja primeiro, sem o vídeo aberto, até 8.
const damiePage = getVideoPageContent(fixtureSources, 'novo-damie', fixturePages, fixtureStores);
assert.ok(damiePage);
assert.deepEqual(VIDEOS_TRAIL, [
  { name: 'Início', path: '/' },
  { name: 'Vídeos', path: '/videos' },
]);
assert.deepEqual(damiePage.trail, [...VIDEOS_TRAIL, { name: 'Vídeo novo-damie', path: '/videos/novo-damie' }]);
assert.equal(damiePage.more.title, 'Mais vídeos da DAMIE');
assert.deepEqual(slugs(damiePage.more.videos), ['mesmo-dia', 'cafe', 'cafe-local', 'receita', 'sem-loja', 'inativa', 'um-so']);
// O outro vídeo da Dolce Gusto vem antes dos mais novos das outras lojas.
assert.deepEqual(
  slugs(getVideoPageContent(fixtureSources, 'cafe-local', fixturePages, fixtureStores)?.more.videos ?? []),
  ['cafe', 'novo-damie', 'mesmo-dia', 'receita', 'sem-loja', 'inativa', 'um-so']
);
// Loja sem outro vídeo, vídeo sem loja, loja inativa e receita: "Mais vídeos", os mais novos.
for (const slug of ['um-so', 'sem-loja', 'inativa', 'receita']) {
  const content = getVideoPageContent(fixtureSources, slug, fixturePages, fixtureStores);
  assert.equal(content?.more.title, 'Mais vídeos', slug);
  assert.deepEqual(slugs(content?.more.videos ?? []), slugs(items).filter((other) => other !== slug), slug);
}
const extras = Array.from({ length: 6 }, (_, index) => page(`extra-${index}`, { uploadDate: `2026-10-0${index + 1}` }));
const crowded = getVideoPageContent(
  { ...fixtureSources, reviews: [...fixtureSources.reviews, ...extras.map(({ slug }) => guide(slug))] },
  'cafe',
  [...fixturePages, ...extras],
  fixtureStores
);
assert.equal(crowded?.more.title, 'Mais vídeos da Dolce Gusto');
assert.deepEqual(
  slugs(crowded?.more.videos ?? []),
  ['cafe-local', 'extra-5', 'extra-4', 'extra-3', 'extra-2', 'extra-1', 'extra-0', 'novo-damie'],
  'no máximo 8'
);
assert.equal(getVideoPageContent(fixtureSources, 'nao-existe', fixturePages, fixtureStores), null);

// O canal: no máximo 6; o upload com página no site (também por link de Short) leva a ela, com o nome da
// transição; os outros vão ao YouTube. Sem a miniatura, a reserva; sem nenhuma, nada.
const realYoutube = videoPages.find((video) => video.kind === 'youtube');
assert.ok(realYoutube, 'há vídeo do YouTube com página');
const highlight = (id: string, overrides: Partial<SocialHighlight> = {}): SocialHighlight => ({
  id,
  title: `Upload ${id}`,
  url: `https://www.youtube.com/watch?v=${id}`,
  thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  fallbackThumbnailUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
  ...overrides,
});
const channel = getChannelRow([
  highlight(realYoutube.videoId),
  highlight('zzzzzzzzzzz'),
  highlight('shortsxxxxx', { url: `https://www.youtube.com/shorts/${realYoutube.videoId}` }),
  highlight('aaaaaaaaaaa', { thumbnailUrl: undefined }),
  highlight('bbbbbbbbbbb', { thumbnailUrl: undefined, fallbackThumbnailUrl: undefined }),
  highlight('ccccccccccc'),
  highlight('ddddddddddd'),
]);
assert.equal(channel.length, 6);
assert.deepEqual(channel[0], {
  id: realYoutube.videoId,
  title: `Upload ${realYoutube.videoId}`,
  href: `/videos/${realYoutube.slug}`,
  external: false,
  thumbnail: `https://i.ytimg.com/vi/${realYoutube.videoId}/hqdefault.jpg`,
  vtName: videoMorphName(realYoutube.slug),
  duration: null,
  label: null,
});
assert.deepEqual(channel[1], {
  id: 'zzzzzzzzzzz',
  title: 'Upload zzzzzzzzzzz',
  href: 'https://www.youtube.com/watch?v=zzzzzzzzzzz',
  external: true,
  thumbnail: 'https://i.ytimg.com/vi/zzzzzzzzzzz/hqdefault.jpg',
  vtName: null,
  duration: null,
  label: null,
});
assert.equal(channel[2].href, `/videos/${realYoutube.slug}`, 'link de Short também acha a página');
assert.equal(channel[3].thumbnail, 'https://i.ytimg.com/vi/aaaaaaaaaaa/maxresdefault.jpg');
assert.equal(channel[4].thumbnail, null);
assert.deepEqual(getChannelRow([]), []);

// Medição e o endereço de inscrição.
assert.equal(VIDEOS_ROUTE_CLICK, 'videos_route_click');
assert.equal(VIDEOS_LIST_CONTROL, 'videos_list_control');
assert.deepEqual(getVideosRouteClickParameters({ href: '/videos/x', placement: 'videos_grid', linkLabel: 'X' }), {
  destination: '/videos/x',
  placement: 'videos_grid',
  link_label: 'X',
});
assert.deepEqual(getVideosListControlParameters({ value: 'damie', listPath: '/videos' }), {
  control: 'store',
  value: 'damie',
  list_path: '/videos',
});
assert.equal(YOUTUBE_SUBSCRIBE_URL, 'https://youtube.com/@emcasacomcecilia?sub_confirmation=1');
assert.deepEqual(CHANNEL_PLACEMENTS, {
  videos: { channel: 'videos_channel', subscribe: 'videos_subscribe' },
  video: { channel: 'video_channel', subscribe: 'video_subscribe' },
});

// Dados reais: toda página de vídeo entra, o destaque é o mais novo, cada chip tem 2 ou mais vídeos e
// nenhuma página repete o próprio vídeo em "Mais vídeos".
const sources: VideoSources = { reviews: publishedReviews, recipes };
const real = getVideosHubContent(sources);
assert.equal(real.videos.length, videoPages.length);
assert.equal(
  Date.parse(real.featured.uploadDate),
  Math.max(...videoPages.map((video) => Date.parse(video.uploadDate))),
  'o destaque é o mais novo'
);
for (const chip of real.stores) {
  assert.ok(filterByStore(real.videos, chip.slug).length >= 2, `${chip.slug}: chip com menos de 2 vídeos`);
}
for (const video of real.videos) {
  const content = getVideoPageContent(sources, video.slug);
  assert.ok(content, video.slug);
  assert.ok(!slugs(content.more.videos).includes(video.slug), `${video.slug}: Mais vídeos com o próprio vídeo`);
}

console.log(
  `✅ videosHub: ${real.videos.length} vídeos (destaque: ${real.featured.slug}), chips de ${real.stores
    .map(({ name }) => name)
    .join(', ')}, ?loja=, duração, origem, Mais vídeos, canal e medição passaram.`
);
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `npx tsx scripts/test-videos-hub.ts < /dev/null`
Expected: FAIL com `Cannot find module '@/lib/videosHub'` (ou `videosShelf`).

- [ ] **Step 3: Escrever `src/lib/videosShelf.ts`**

```ts
import { brandLinks } from '@/lib/brandLinks';
import { sanitizeViewTransitionName } from '@/lib/viewTransition';

// Regras de /videos e da página de cada vídeo que valem no servidor e no navegador: os tipos, o formato, a
// duração e a data em texto, o filtro por loja (?loja=), o cartão e a medição. Sem dados: componente cliente
// importa daqui, nunca do videosHub.ts (que lê as lojas, os artigos e as receitas).

export const VIDEO_ASPECTS = ['vertical', 'horizontal', 'square'] as const;
export type VideoAspect = (typeof VIDEO_ASPECTS)[number];

export function isVideoAspect(value: unknown): value is VideoAspect {
  return typeof value === 'string' && (VIDEO_ASPECTS as readonly string[]).includes(value);
}

// A duração no painel ("1 min 12 s"), no selo do cartão ("1:12") e no nome do link para o leitor de tela
// ("1 minuto e 12 segundos").
export type VideoDuration = { text: string; badge: string; spoken: string };
export type VideoStore = { slug: string; name: string };
export type VideoSourceKind = 'guia' | 'receita';
export type VideoSource = { href: string; title: string; image: string | null; kind: VideoSourceKind };
export type VideoPlayerSource = { kind: 'youtube'; embedUrl: string } | { kind: 'local'; contentUrl: string };

export type VideoItem = {
  slug: string;
  href: string;
  title: string;
  description: string;
  aspect: VideoAspect;
  // A miniatura (YouTube) ou o poster (MP4), já no endereço de entrega.
  thumbnail: string;
  // Como está no registro, com ou sem hora.
  uploadDate: string;
  dateLabel: string;
  duration: VideoDuration | null;
  // A loja ativa do artigo de origem; null para receita, artigo sem loja ou loja pausada.
  store: VideoStore | null;
  source: VideoSource;
  codeLink: { label: string; href: string } | null;
  player: VideoPlayerSource;
};

// O cartão vertical: um vídeo com página no site (toVideoCard) ou um upload do canal (getChannelRow).
export type VideoCardData = {
  id: string;
  title: string;
  href: string;
  // Só no YouTube: abre numa aba nova.
  external: boolean;
  thumbnail: string | null;
  // O nome da transição da miniatura para o player; só nos vídeos com página no site.
  vtName: string | null;
  duration: VideoDuration | null;
  // A loja, ou "Receita", embaixo do título.
  label: string | null;
};

const DURATION_UNITS = [
  { seconds: 3600, short: 'h', one: 'hora', many: 'horas' },
  { seconds: 60, short: 'min', one: 'minuto', many: 'minutos' },
  { seconds: 1, short: 's', one: 'segundo', many: 'segundos' },
] as const;

export function formatDuration(totalSeconds: number | undefined): VideoDuration | null {
  if (!totalSeconds || !Number.isFinite(totalSeconds) || totalSeconds < 0) return null;
  const whole = Math.round(totalSeconds);
  const hours = Math.floor(whole / 3600);
  const minutes = Math.floor((whole % 3600) / 60);
  const seconds = whole % 60;
  const values = [hours, minutes, seconds];
  const present = DURATION_UNITS.map((unit, index) => ({ ...unit, value: values[index] })).filter(({ value }) => value > 0);
  const pad = (value: number) => String(value).padStart(2, '0');
  const words = present.map(({ value, one, many }) => `${value} ${value === 1 ? one : many}`);
  return {
    text: present.map(({ value, short }) => `${value} ${short}`).join(' '),
    badge: hours > 0 ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${minutes}:${pad(seconds)}`,
    spoken: words.length > 1 ? `${words.slice(0, -1).join(', ')} e ${words.at(-1)}` : words[0],
  };
}

// DD/MM/AAAA do dia como está no registro: o de quem publicou, não o de UTC.
export function formatVideoDate(uploadDate: string): string {
  const [year, month, day] = uploadDate.slice(0, 10).split('-');
  return `${day}/${month}/${year}`;
}

export const STORE_PARAM = 'loja';

// A loja do ?loja=: só uma das lojas com chip. Vazia, desconhecida, com maiúscula ou de um vídeo só, vale
// "Todos" (null). Repetida, vale a primeira.
export function readStoreFilter(search: string, storeSlugs: readonly string[]): string | null {
  const value = new URLSearchParams(search).get(STORE_PARAM);
  return value !== null && storeSlugs.includes(value) ? value : null;
}

// A query string nova da página: troca só o ?loja= ("Todos" tira todos) e mantém os outros parâmetros
// (utm_*, por exemplo).
export function withStoreFilter(currentSearch: string, store: string | null): string {
  const params = new URLSearchParams(currentSearch);
  params.delete(STORE_PARAM);
  if (store) params.set(STORE_PARAM, store);
  const text = params.toString();
  return text ? `?${text}` : '';
}

export function filterByStore<T extends { store: VideoStore | null }>(videos: readonly T[], store: string | null): T[] {
  return store ? videos.filter((video) => video.store?.slug === store) : [...videos];
}

export function videosCountLabel(total: number): string {
  return total === 1 ? '1 vídeo' : `${total} vídeos`;
}

const SOURCE_COPY = {
  guia: { from: 'Do guia', action: 'Ler o guia' },
  receita: { from: 'Da receita', action: 'Ver a receita' },
} as const;

export function sourceCopy(kind: VideoSourceKind) {
  return SOURCE_COPY[kind];
}

export function videoMorphName(slug: string): string {
  return `video-player-${sanitizeViewTransitionName(slug)}`;
}

export function toVideoCard(video: VideoItem): VideoCardData {
  return {
    id: video.slug,
    title: video.title,
    href: video.href,
    external: false,
    thumbnail: video.thumbnail,
    vtName: videoMorphName(video.slug),
    duration: video.duration,
    label: video.store?.name ?? (video.source.kind === 'receita' ? 'Receita' : null),
  };
}

export const VIDEOS_ROUTE_CLICK = 'videos_route_click';
export const VIDEOS_LIST_CONTROL = 'videos_list_control';

export type VideosPlacement =
  | 'videos_featured'
  | 'videos_grid'
  | 'videos_channel'
  | 'videos_subscribe'
  | 'video_source'
  | 'video_more'
  | 'video_channel'
  | 'video_subscribe';

export function getVideosRouteClickParameters({
  href,
  placement,
  linkLabel,
}: {
  href: string;
  placement: VideosPlacement;
  linkLabel: string;
}) {
  return { destination: href, placement, link_label: linkLabel };
}

export function getVideosListControlParameters({ value, listPath }: { value: string; listPath: string }) {
  return { control: 'store', value, list_path: listPath };
}

export const YOUTUBE_SUBSCRIBE_URL = `${brandLinks.youtube}?sub_confirmation=1`;

// A faixa do canal em /videos (videos_*) e na página de cada vídeo (video_*).
export const CHANNEL_PLACEMENTS = {
  videos: { channel: 'videos_channel', subscribe: 'videos_subscribe' },
  video: { channel: 'video_channel', subscribe: 'video_subscribe' },
} as const satisfies Record<string, { channel: VideosPlacement; subscribe: VideosPlacement }>;
```

- [ ] **Step 4: O `aspect` em `src/lib/video-pages.js`**

1. Logo acima de `const videoPageDefinitions = [`, acrescente:
   ```js
   // aspect: o formato do vídeo, que o player e o destaque de /videos seguem. 'vertical' para os Shorts
   // (https://www.youtube.com/shorts/<id> responde 200), 'horizontal' para o vídeo comum (a mesma URL
   // redireciona para /watch) e 'square' para o MP4 quadrado. O validate:video exige um dos três.
   ```
2. Em cada definição, acrescente a linha `aspect: '<valor>',` logo depois da linha `kind: …,`, com estes valores:

   | slug | `aspect` |
   |---|---|
   | `rabanada-com-doce-de-leite-video` | `'vertical'` |
   | `truque-manteiga-com-leite-funciona` | `'vertical'` |
   | `poltronas-reclinaveis-damie-sala-de-cinema` | `'vertical'` |
   | `sofa-modular-damie-na-caixa` | `'vertical'` |
   | `aniversario-damie-poltronas-sofas-camas` | `'vertical'` |
   | `poltrona-levita-damie` | `'vertical'` |
   | `poltrona-damie-para-maes-e-amamentacao` | `'vertical'` |
   | `poltrona-reclinavel-damie-2-0` | `'vertical'` |
   | `cobertor-iws-igloo-dupla-face` | `'vertical'` |
   | `unboxing-dolce-gusto-mini-me-2-0-primeiro-cafe` | `'vertical'` |
   | `como-usar-cupom-ceciemcasa-i-wanna-sleep` | `'square'` |
   | `primeiro-preparo-dolce-gusto-genio-s-touch` | `'square'` |
   | `minha-primeira-lava-e-seca-samsung-13kg-video` | `'horizontal'` |
   | `rotina-skincare-coreano-30-anos-abib-video` | `'horizontal'` |

   Exemplo de uma definição pronta:
   ```js
   {
     slug: 'rabanada-com-doce-de-leite-video',
     kind: 'youtube',
     aspect: 'vertical',
     videoId: 'DSH6TZyiMms',
     sourcePath: '/receitas/rabanada-com-doce-de-leite',
     sourceTitle: 'Rabanada com doce de leite',
   },
   ```

- [ ] **Step 5: O `aspect` obrigatório no `validate:video`**

Em `scripts/validate-video-schema.ts`:

1. Depois de `import { videoPages } from '@/lib/video-pages';`, acrescente:
   ```ts
   import { VIDEO_ASPECTS, isVideoAspect } from '@/lib/videosShelf';
   ```
2. No laço `for (const videoPage of videoPages) {`, logo depois do bloco
   ```ts
     if (!sourcePagePaths.has(videoPage.sourcePath)) {
       report('página de vídeo', videoPage.slug, `conteúdo de origem não existe: ${videoPage.sourcePath}`);
     }
   ```
   acrescente:
   ```ts

     // O formato que o player e o destaque de /videos seguem (docs/GUIA-EDITORIAL-VIDEOS.md, seção 3.1).
     if (!isVideoAspect(videoPage.aspect)) {
       report(
         'página de vídeo',
         videoPage.slug,
         `aspect ausente ou inválido (${videoPage.aspect}); use ${VIDEO_ASPECTS.join(', ')}`
       );
     }
   ```

Run: `npm run validate:video < /dev/null`
Expected: PASS, `Vídeos válidos: … e 14 página(s) de exibição.`

Controle (não commitar): troque um `aspect: 'vertical'` por `aspect: 'retrato'`, rode de novo e confira a falha `aspect ausente ou inválido (retrato)`; desfaça.

- [ ] **Step 6: Escrever `src/lib/videosHub.ts`**

Antes, o rótulo do botão da loja num lugar só (hoje a subpágina de loja e as datas comerciais repetem o texto, e a página do vídeo seria a terceira cópia):

1. Em `src/lib/homeStores.ts`, logo depois da função `ofStore`, acrescente:
   ```ts

   // O botão que leva ao código da loja: subpágina de loja, datas comerciais e página do vídeo.
   export function codeLinkLabel(store: Pick<Coupon, 'slug' | 'brand'>): string {
     return `Ver o código ${ofStore(store)}`;
   }
   ```
   e, no objeto da subpágina de loja, troque `codeLinkLabel: \`Ver o código ${ofStore(store)}\`,` por `codeLinkLabel: codeLinkLabel(store),`.
2. Em `src/lib/homeEvents.ts`, troque `import { getStoreCode, ofStore, type StoreReview } from '@/lib/homeStores';` por `import { codeLinkLabel, getStoreCode, type StoreReview } from '@/lib/homeStores';` e, no `codeLink` dos cards, `label: \`Ver o código ${ofStore(store)}\`` por `label: codeLinkLabel(store)`. Confira com `grep -n "ofStore" src/lib/homeEvents.ts` que nada mais usa o `ofStore` ali (o import sai).

Depois crie `src/lib/videosHub.ts`:

```ts
import { getActiveCoupons, type Coupon } from '@/lib/couponsData';
import { getCouponStorePath } from '@/lib/couponTranslations';
import type { SocialHighlight } from '@/lib/data';
import { codeLinkLabel, ofStore } from '@/lib/homeStores';
import { absoluteMediaUrl, type SocialImage } from '@/lib/pageSeo';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';
import { getYoutubeEmbedUrl } from '@/lib/video-metadata';
import { isoDurationToSeconds, videoPages } from '@/lib/video-pages';
import {
  formatDuration,
  formatVideoDate,
  isVideoAspect,
  videoMorphName,
  videosCountLabel,
  type VideoCardData,
  type VideoItem,
  type VideoPlayerSource,
  type VideoSource,
  type VideoStore,
} from '@/lib/videosShelf';

// Dados de /videos e da página de cada vídeo, montados no servidor a partir de video-pages.js, do artigo ou
// da receita de origem e das lojas ativas. Recebe os artigos e as receitas por parâmetro e não importa
// '@/lib/data', como o reviewsHub.ts; o componente cliente recebe só o resultado. Dado que não fecha (formato,
// origem, título, player) derruba a montagem com o vídeo e o motivo.

type PageLink = { name: string; path: string };

// O que a página usa do artigo e da receita de origem.
export type VideoSources = {
  reviews: readonly { slug: string; image?: string; affiliate?: string; locale?: string }[];
  recipes: readonly { slug: string; image?: string }[];
};

// O registro de video-pages.js que a página usa (o arquivo é JavaScript: os campos são conferidos aqui).
export type VideoPageRecord = {
  slug: string;
  kind: string;
  aspect?: string;
  sourcePath: string;
  sourceTitle: string;
  title?: string;
  description?: string;
  uploadDate?: string;
  duration?: string;
  thumbnailUrl?: string;
  embedUrl?: string | null;
  contentUrl?: string;
};

export const VIDEOS_TRAIL: PageLink[] = [
  { name: 'Início', path: '/' },
  { name: 'Vídeos', path: '/videos' },
];

const MIN_STORE_VIDEOS = 2;
const MORE_LIMIT = 8;
const CHANNEL_LIMIT = 6;
const SOURCE_PATH = /^\/(reviews|receitas)\/([^/?#]+)$/;

function findSource(page: VideoPageRecord, sources: VideoSources): VideoSource & { affiliate?: string } {
  const [, section, slug] = page.sourcePath.match(SOURCE_PATH) ?? [];
  if (section === 'reviews') {
    const review = sources.reviews.find((item) => item.slug === slug && (!item.locale || item.locale === 'pt'));
    if (review) {
      return {
        href: page.sourcePath,
        title: page.sourceTitle,
        image: review.image ? resolveMediaUrl(review.image) : null,
        kind: 'guia',
        affiliate: review.affiliate,
      };
    }
  }
  if (section === 'receitas') {
    const recipe = sources.recipes.find((item) => item.slug === slug);
    if (recipe) {
      return {
        href: page.sourcePath,
        title: page.sourceTitle,
        image: recipe.image ? resolveMediaUrl(recipe.image) : null,
        kind: 'receita',
      };
    }
  }
  throw new Error(`vídeo ${page.slug}: a origem ${page.sourcePath} não está entre os artigos e receitas publicados`);
}

function playerOf(page: VideoPageRecord): VideoPlayerSource | null {
  if (page.kind === 'youtube' && page.embedUrl) return { kind: 'youtube', embedUrl: page.embedUrl };
  if (page.kind === 'local' && page.contentUrl) return { kind: 'local', contentUrl: resolveMediaUrl(page.contentUrl) };
  return null;
}

function toVideoItem(page: VideoPageRecord, sources: VideoSources, stores: readonly Coupon[]): VideoItem {
  const fail = (reason: string) => new Error(`vídeo ${page.slug}: ${reason}`);
  if (!isVideoAspect(page.aspect)) throw fail(`aspect inválido (${page.aspect}); use vertical, horizontal ou square`);
  if (!page.title || !page.description || !page.uploadDate || !page.thumbnailUrl) {
    throw fail('sem título, descrição, data ou miniatura');
  }
  const player = playerOf(page);
  if (!player) throw fail('sem o endereço do player');
  const { affiliate, ...source } = findSource(page, sources);
  const store = stores.find(({ slug }) => slug === affiliate);
  return {
    slug: page.slug,
    href: `/videos/${page.slug}`,
    title: page.title,
    description: page.description,
    aspect: page.aspect,
    thumbnail: resolveMediaUrl(page.thumbnailUrl),
    uploadDate: page.uploadDate,
    dateLabel: formatVideoDate(page.uploadDate),
    duration: formatDuration(isoDurationToSeconds(page.duration)),
    store: store ? { slug: store.slug, name: store.brand } : null,
    source,
    codeLink: store ? { label: codeLinkLabel(store), href: getCouponStorePath(store.slug, 'pt') } : null,
    player,
  };
}

// Do mais novo ao mais antigo pelo instante (com e sem hora, com fuso); no empate, pelo slug.
function byNewest(a: VideoItem, b: VideoItem): number {
  return Date.parse(b.uploadDate) - Date.parse(a.uploadDate) || a.slug.localeCompare(b.slug);
}

export function getVideoItems(
  sources: VideoSources,
  pages: readonly VideoPageRecord[] = videoPages,
  stores: readonly Coupon[] = getActiveCoupons()
): VideoItem[] {
  return pages.map((page) => toVideoItem(page, sources, stores)).sort(byNewest);
}

// Os chips: as lojas ativas com 2 ou mais vídeos, na ordem das lojas.
function getStoreChips(videos: readonly VideoItem[], stores: readonly Coupon[]): VideoStore[] {
  return stores
    .filter((store) => videos.filter((video) => video.store?.slug === store.slug).length >= MIN_STORE_VIDEOS)
    .map((store) => ({ slug: store.slug, name: store.brand }));
}

export type VideosHubContent = {
  intro: string;
  featured: VideoItem;
  videos: VideoItem[];
  stores: VideoStore[];
  socialImage: SocialImage;
};

export function getVideosHubContent(
  sources: VideoSources,
  pages: readonly VideoPageRecord[] = videoPages,
  stores: readonly Coupon[] = getActiveCoupons()
): VideosHubContent {
  const videos = getVideoItems(sources, pages, stores);
  const [featured] = videos;
  if (!featured) throw new Error('/videos: nenhum vídeo em video-pages.js');
  return {
    intro: `${videosCountLabel(videos.length)} da casa da Cecília. Cada um leva ao guia ou à receita completa.`,
    featured,
    videos,
    stores: getStoreChips(videos, stores),
    socialImage: { url: absoluteMediaUrl(featured.thumbnail), alt: featured.title },
  };
}

export type VideoPageContent = {
  video: VideoItem;
  // A trilha visível, da mesma lista que o BreadcrumbList.
  trail: PageLink[];
  more: { title: string; videos: VideoItem[] };
};

// A página de um vídeo; null quando o slug não tem página. "Mais vídeos": primeiro os da mesma loja, depois
// os mais novos, sem o vídeo aberto, até 8.
export function getVideoPageContent(
  sources: VideoSources,
  slug: string,
  pages: readonly VideoPageRecord[] = videoPages,
  stores: readonly Coupon[] = getActiveCoupons()
): VideoPageContent | null {
  const videos = getVideoItems(sources, pages, stores);
  const video = videos.find((item) => item.slug === slug);
  if (!video) return null;
  const others = videos.filter((item) => item.slug !== slug);
  const sameStore = video.store ? others.filter((item) => item.store?.slug === video.store?.slug) : [];
  const rest = others.filter((item) => !sameStore.includes(item));
  return {
    video,
    trail: [...VIDEOS_TRAIL, { name: video.title, path: video.href }],
    more: {
      title:
        video.store && sameStore.length > 0
          ? `Mais vídeos ${ofStore({ slug: video.store.slug, brand: video.store.name })}`
          : 'Mais vídeos',
      videos: [...sameStore, ...rest].slice(0, MORE_LIMIT),
    },
  };
}

// Os últimos uploads do canal (home e /videos), no máximo 6: o que tem página no site leva a ela (com a
// miniatura pronta para voar até o player); os outros vão ao YouTube. A miniatura do YouTube, senão a
// reserva da API, senão nenhuma.
export function getChannelRow(
  highlights: readonly SocialHighlight[],
  pages: readonly VideoPageRecord[] = videoPages
): VideoCardData[] {
  return highlights.slice(0, CHANNEL_LIMIT).map((highlight) => {
    const embedUrl = getYoutubeEmbedUrl(highlight.url);
    const page = embedUrl ? pages.find((item) => item.kind === 'youtube' && item.embedUrl === embedUrl) : undefined;
    const thumbnail = highlight.thumbnailUrl || highlight.fallbackThumbnailUrl;
    return {
      id: highlight.id,
      title: highlight.title,
      href: page ? `/videos/${page.slug}` : highlight.url,
      external: !page,
      thumbnail: thumbnail ? resolveMediaUrl(thumbnail) : null,
      vtName: page ? videoMorphName(page.slug) : null,
      duration: null,
      label: null,
    };
  });
}
```

- [ ] **Step 7: `package.json`**

1. Depois da linha `"test:reviews-hub": "tsx scripts/test-reviews-hub.ts",`, acrescente:
   ```json
       "test:videos-hub": "tsx scripts/test-videos-hub.ts",
   ```
2. No script `build`, troque `tsx scripts/test-reviews-hub.ts && ` por `tsx scripts/test-reviews-hub.ts && tsx scripts/test-videos-hub.ts && ` (uma ocorrência).

- [ ] **Step 8: Rodar e ver passar**

Run:
```bash
npm run test:videos-hub < /dev/null
npm run validate:video < /dev/null
npm run test:home-stores < /dev/null
npm run test:home-events < /dev/null
npm run test:reviews-hub < /dev/null
npm run typecheck < /dev/null
npx eslint src/lib/videosShelf.ts src/lib/videosHub.ts src/lib/video-pages.js src/lib/homeStores.ts src/lib/homeEvents.ts scripts/test-videos-hub.ts scripts/validate-video-schema.ts --quiet < /dev/null
```
Expected: `✅ videosHub: 14 vídeos (destaque: rotina-skincare-coreano-30-anos-abib-video), chips de DAMIE, Dolce Gusto, I Wanna Sleep, …`; o `validate:video` verde; os três testes de antes verdes (eles conferem "Ver o código da DAMIE" e "Ver o código do Magalu"); typecheck e lint sem erro.

- [ ] **Step 9: Commits**

```bash
git add src/lib/video-pages.js scripts/validate-video-schema.ts src/lib/videosShelf.ts
git commit -F - <<'EOF'
feat: formato de cada vídeo e as regras de /videos

O aspect (vertical, horizontal ou square) em cada página de vídeo, exigido
pelo validate:video, e o videosShelf.ts: tipos, duração e data em texto,
filtro por loja (?loja=), cartão e medição.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
git add src/lib/videosHub.ts scripts/test-videos-hub.ts package.json src/lib/homeStores.ts src/lib/homeEvents.ts
git commit -F - <<'EOF'
feat: dados de /videos e da página de cada vídeo

videosHub.ts monta no servidor os vídeos do mais novo, o destaque, os chips
das lojas ativas com 2 ou mais vídeos, a página de cada vídeo com "Mais
vídeos" e a fila do canal. test:videos-hub na cadeia do build. O rótulo
"Ver o código da <loja>" passa a sair de um lugar só (codeLinkLabel).

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Task 2: O cartão de vídeo, a fila e a home

**Files:**
- Create: `src/components/videos/TrackedVideosLink.tsx`
- Create: `src/components/videos/VideoCard.tsx`
- Create: `src/components/videos/VideoRow.tsx`
- Modify: `scripts/test-videos-hub.ts`
- Modify: `src/components/sections/CTA.tsx`
- Modify: `scripts/test-home-lower-sections.ts`

**Interfaces:**
- Consumes (Task 1): `VIDEOS_ROUTE_CLICK`, `getVideosRouteClickParameters`, `type VideoCardData`, `type VideosPlacement`, `toVideoCard` (`@/lib/videosShelf`); `getChannelRow` (`@/lib/videosHub`). Do projeto: `ViewTransitionLink`, `type ViewTransitionLinkProps` (`@/components/ViewTransitionLink`); `ScrollRow`; `FOCUS_RING`; `HomeSection`; `trackEvent` (`@/lib/analytics`).
- Produces:
  - `TrackedVideosLink({ href, placement?, linkLabel, ...props do next/link })` e `VideoPageLink({ href, placement?, linkLabel, ...props do ViewTransitionLink })` (`@/components/videos/TrackedVideosLink`, cliente);
  - `VideoCard({ video: VideoCardData, sizes: string, placement?: VideosPlacement })` (`@/components/videos/VideoCard`, sem diretiva);
  - `VideoRow({ videos: VideoCardData[], placement?: VideosPlacement, desktopGrid: boolean })` (`@/components/videos/VideoRow`, servidor);
  - `LatestVideos({ videos: SocialHighlight[] })` continua com a mesma assinatura.

- [ ] **Step 1: Escrever os testes dos componentes (falham porque não existem)**

Em `scripts/test-videos-hub.ts`:

1. Troque o bloco de imports do topo, até `from '@/lib/videosShelf';`, por:
   ```ts
   import assert from 'node:assert/strict';
   import { createElement, type ReactElement } from 'react';
   import { renderToStaticMarkup } from 'react-dom/server';
   import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
   import { imageConfigDefault, type ImageConfigComplete, type RemotePattern } from 'next/dist/shared/lib/image-config';
   import { ImageConfigContext } from 'next/dist/shared/lib/image-config-context.shared-runtime';

   import { FOCUS_RING } from '@/components/ui/focusRing';
   import { ScrollRow } from '@/components/ui/ScrollRow';
   import { TrackedVideosLink, VideoPageLink } from '@/components/videos/TrackedVideosLink';
   import { VideoCard } from '@/components/videos/VideoCard';
   import { VideoRow } from '@/components/videos/VideoRow';
   import { COUPONS } from '@/lib/couponsData';
   import { publishedReviews, recipes, type SocialHighlight } from '@/lib/data';
   import { IMAGE_REMOTE_PATTERNS } from '@/lib/imageHosts.mjs';
   import { resolveMediaUrl } from '@/lib/resolve-media.mjs';
   import { videoPages } from '@/lib/video-pages';
   import {
     VIDEOS_TRAIL,
     getChannelRow,
     getVideoItems,
     getVideoPageContent,
     getVideosHubContent,
     type VideoPageRecord,
     type VideoSources,
   } from '@/lib/videosHub';
   import {
     CHANNEL_PLACEMENTS,
     VIDEOS_LIST_CONTROL,
     VIDEOS_ROUTE_CLICK,
     YOUTUBE_SUBSCRIBE_URL,
     filterByStore,
     formatDuration,
     formatVideoDate,
     getVideosListControlParameters,
     getVideosRouteClickParameters,
     isVideoAspect,
     readStoreFilter,
     sourceCopy,
     toVideoCard,
     videoMorphName,
     videosCountLabel,
     withStoreFilter,
     type VideoItem,
   } from '@/lib/videosShelf';
   ```
2. Logo antes do comentário `// Dados reais: toda página de vídeo entra, …`, acrescente:

```ts
// Componentes, renderizados como o servidor os entrega. Fora do Next, o next/image não conhece os hosts do
// next.config.mjs, e o useRouter() do ViewTransitionLink exige o roteador do App Router montado.
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
const count = (html: string, pattern: RegExp) => html.match(pattern)?.length ?? 0;
const openingTag = (html: string) => html.match(/^<a [^>]*>/)?.[0] ?? '';

// Cartão de vídeo com página: link para a página na mesma aba, com o anel de foco; a miniatura decorativa
// (alt vazio, sem pressa) com o nome da transição só no data-vt-name; o título num h3 de até 3 linhas; no
// nome do link, depois do título, a duração por extenso e a loja. O selo "0:54" é só visual.
const card = render(createElement(VideoCard, { video: toVideoCard(novo), sizes: '160px', placement: 'videos_grid' }));
const cardTag = openingTag(card);
assert.match(cardTag, /href="\/videos\/novo-damie"/);
assert.ok(cardTag.includes(FOCUS_RING), 'cartão sem o anel de foco');
assert.ok(!cardTag.includes('target='), 'vídeo com página abre na mesma aba');
assert.ok(card.includes('data-vt-name="video-player-novo-damie"'));
assert.ok(!card.includes('view-transition-name'), 'nome de transição só no clique');
assert.match(card, /<img\b[^>]*\balt=""/);
assert.match(card, /<img\b[^>]*\bloading="lazy"/);
assert.match(card, /<h3 class="line-clamp-3[^"]*">Vídeo novo-damie<\/h3>/);
assert.match(card, /<span class="sr-only">54 segundos<\/span>/);
assert.match(card, /<span aria-hidden="true" class="[^"]*">0:54<\/span>/, 'o selo é só visual');
const cardText = textOf(card);
assert.ok(
  cardText.indexOf('Vídeo novo-damie') === 0 &&
    cardText.indexOf('54 segundos') > 0 &&
    cardText.indexOf('DAMIE', cardText.indexOf('54 segundos')) > 0,
  `nome do link: título, duração e loja (${cardText})`
);
assert.equal(textOf(render(createElement(VideoCard, { video: toVideoCard(item('sem-loja')), sizes: '1px' }))), 'Vídeo sem-loja1 minuto1:00');
assert.ok(textOf(render(createElement(VideoCard, { video: toVideoCard(receita), sizes: '1px' }))).includes('Receita'));

// MP4 sem duração: sem selo e sem texto de duração.
const localCard = render(createElement(VideoCard, { video: toVideoCard(local), sizes: '1px' }));
assert.ok(!localCard.includes('sr-only') && !/\d:\d\d/.test(textOf(localCard)), 'MP4 sem duração');
assert.ok(!/undefined|NaN/.test(localCard));

// Upload só no YouTube: aba nova, sem nome de transição; sem miniatura, o fundo marinho.
const externalCard = render(createElement(VideoCard, { video: channel[1], sizes: '1px', placement: 'videos_channel' }));
assert.match(openingTag(externalCard), /target="_blank"/);
assert.match(openingTag(externalCard), /rel="noopener noreferrer"/);
assert.ok(!externalCard.includes('data-vt-name'));
assert.equal(count(render(createElement(VideoCard, { video: channel[4], sizes: '1px' })), /<img/g), 0);

// O link certo para cada caso: a página do vídeo pelo VideoPageLink (com a troca animada), o YouTube pelo
// TrackedVideosLink; o placement chega aos dois.
const internalElement = VideoCard({ video: toVideoCard(novo), sizes: '1px', placement: 'videos_grid' });
assert.equal(internalElement.type, VideoPageLink);
assert.equal(internalElement.props.placement, 'videos_grid');
assert.equal(VideoCard({ video: channel[1], sizes: '1px', placement: 'videos_channel' }).type, TrackedVideosLink);

// Cliques: medidos como videos_route_click com o destino, o placement e o texto do link; sem placement (a
// home) e com o clique cancelado, nada. Os componentes rodam como função (nenhum usa hook) e o onClick do
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
const gridClick = ['event', 'videos_route_click', { destination: '/videos/novo-damie', placement: 'videos_grid', link_label: 'Vídeo novo-damie' }];
assert.deepEqual(
  gtagCallsOf(VideoPageLink({ href: '/videos/novo-damie', placement: 'videos_grid', linkLabel: 'Vídeo novo-damie', children: null })),
  [gridClick]
);
assert.deepEqual(gtagCallsOf(VideoPageLink({ href: '/videos/novo-damie', linkLabel: 'Vídeo novo-damie', children: null })), [], 'home');
const subscribeLink = { href: YOUTUBE_SUBSCRIBE_URL, placement: 'videos_subscribe', linkLabel: 'Inscrever-se no canal' } as const;
assert.deepEqual(gtagCallsOf(TrackedVideosLink({ ...subscribeLink, children: null })), [
  ['event', 'videos_route_click', { destination: YOUTUBE_SUBSCRIBE_URL, placement: 'videos_subscribe', link_label: 'Inscrever-se no canal' }],
]);
assert.deepEqual(gtagCallsOf(TrackedVideosLink({ ...subscribeLink, children: null }), { defaultPrevented: true }), []);

// A fila: um ScrollRow; cada cartão entra na rolagem (revela, com a posição em --i). O canal vira 6 colunas
// a partir de 1024 px; "Mais vídeos" rola em toda largura.
const channelRow = render(createElement(VideoRow, { videos: channel, placement: 'videos_channel', desktopGrid: true }));
assert.match(channelRow, /^<ul class="hide-scrollbar [^"]*lg:grid-cols-6/);
assert.equal(count(channelRow, /<li class="revela flex w-40 shrink-0 snap-start md:w-48 lg:w-auto" style="--i:\d"/g), 6);
const moreRow = render(createElement(VideoRow, { videos: items.map(toVideoCard), placement: 'video_more', desktopGrid: false }));
assert.equal(count(moreRow, /<li class="revela flex w-40 shrink-0 snap-start md:w-48 ?" style="--i:\d"/g), items.length);
assert.ok(!moreRow.includes('lg:grid') && !moreRow.includes('lg:w-auto'), 'Mais vídeos rola em toda largura');
assert.equal(VideoRow({ videos: channel, desktopGrid: true }).type, ScrollRow, 'a fila é um ScrollRow');
```

Run: `npx tsx scripts/test-videos-hub.ts < /dev/null`
Expected: FAIL com `Cannot find module '@/components/videos/TrackedVideosLink'`.

- [ ] **Step 2: `src/components/videos/TrackedVideosLink.tsx`**

```tsx
'use client';

import type { ComponentProps } from 'react';
import Link from 'next/link';
import { ViewTransitionLink, type ViewTransitionLinkProps } from '@/components/ViewTransitionLink';
import { trackEvent } from '@/lib/analytics';
import { VIDEOS_ROUTE_CLICK, getVideosRouteClickParameters, type VideosPlacement } from '@/lib/videosShelf';

// Os links de /videos e da página de cada vídeo, que contam o clique no GA4 (videos_route_click), como o
// TrackedReviewsLink da estante. Sem placement (os Últimos vídeos da home, que nunca foram medidos), o clique
// não é medido.

function track(href: string, placement: VideosPlacement | undefined, linkLabel: string) {
  if (placement) trackEvent(VIDEOS_ROUTE_CLICK, getVideosRouteClickParameters({ href, placement, linkLabel }));
}

type TrackedVideosLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
  placement?: VideosPlacement;
  linkLabel: string;
};

// Link comum: a origem, o canal, o "Inscrever-se no canal" e o upload que só existe no YouTube.
export function TrackedVideosLink({ href, placement, linkLabel, onClick, ...rest }: TrackedVideosLinkProps) {
  return (
    <Link
      href={href}
      {...rest}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        track(href, placement, linkLabel);
      }}
    />
  );
}

type VideoPageLinkProps = Omit<ViewTransitionLinkProps, 'onClick'> & {
  placement?: VideosPlacement;
  linkLabel: string;
};

// O link para a página de um vídeo: a troca de página animada (a miniatura com data-vt-name voa para o
// player, pelo ViewTransitionLink) e a medição. Nunca para o YouTube: o ViewTransitionLink lê o target no
// elemento clicado, que pode ser a imagem, e abriria o YouTube na mesma aba.
export function VideoPageLink({ href, placement, linkLabel, ...rest }: VideoPageLinkProps) {
  return <ViewTransitionLink href={href} {...rest} onClick={() => track(href, placement, linkLabel)} />;
}
```

- [ ] **Step 3: `src/components/videos/VideoCard.tsx`**

```tsx
import Image from 'next/image';
import { Play } from 'lucide-react';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { TrackedVideosLink, VideoPageLink } from '@/components/videos/TrackedVideosLink';
import type { VideoCardData, VideosPlacement } from '@/lib/videosShelf';

// O cartão vertical (9:16) dos vídeos: os Últimos vídeos da home, a grade e o canal de /videos e "Mais
// vídeos" da página de cada vídeo. A miniatura do YouTube (hqdefault, 4:3) é recortada no meio pelo
// object-cover. O título é o primeiro texto do link, num h3; depois vêm a duração por extenso (para o leitor
// de tela; o selo do canto é só visual) e a loja. O vídeo com página no site abre a página, com a miniatura
// voando para o player (data-vt-name); o que só existe no YouTube abre numa aba nova.

const CARD = `group relative flex aspect-[9/16] flex-1 items-center justify-center overflow-hidden rounded-xl border-2 border-marinho bg-marinho text-white motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1 ${FOCUS_RING}`;

type VideoCardProps = {
  video: VideoCardData;
  sizes: string;
  // Sem placement (a home), o clique não é medido.
  placement?: VideosPlacement;
};

export function VideoCard({ video, sizes, placement }: VideoCardProps) {
  const content = (
    <>
      <span data-vt-name={video.vtName ?? undefined} className="absolute inset-0">
        {video.thumbnail ? <Image src={video.thumbnail} alt="" fill sizes={sizes} className="object-cover" /> : null}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-marinho via-marinho/70 to-transparent"
      />
      <Play
        aria-hidden="true"
        className="relative size-12 fill-amarelo-cupom text-amarelo-cupom motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-110 md:size-14"
      />
      <div className="absolute inset-x-2.5 bottom-2.5 flex flex-col gap-0.5 md:inset-x-3 md:bottom-3">
        <h3 className="line-clamp-3 text-xs leading-[14px] font-bold md:leading-4">{video.title}</h3>
        {video.duration ? <span className="sr-only">{video.duration.spoken}</span> : null}
        {video.label ? <span className="text-[11px] leading-4 font-semibold text-white/80">{video.label}</span> : null}
      </div>
      {video.duration ? (
        <span
          aria-hidden="true"
          className="absolute top-2 right-2 rounded-md bg-marinho/85 px-1.5 py-0.5 text-[11px] leading-none font-extrabold tabular-nums"
        >
          {video.duration.badge}
        </span>
      ) : null}
    </>
  );

  return video.external ? (
    <TrackedVideosLink
      href={video.href}
      target="_blank"
      rel="noopener noreferrer"
      placement={placement}
      linkLabel={video.title}
      className={CARD}
    >
      {content}
    </TrackedVideosLink>
  ) : (
    <VideoPageLink href={video.href} placement={placement} linkLabel={video.title} className={CARD}>
      {content}
    </VideoPageLink>
  );
}
```

- [ ] **Step 4: `src/components/videos/VideoRow.tsx`**

```tsx
import type { CSSProperties } from 'react';
import { ScrollRow } from '@/components/ui/ScrollRow';
import { VideoCard } from '@/components/videos/VideoCard';
import type { VideoCardData, VideosPlacement } from '@/lib/videosShelf';

// A fila de cartões de vídeo, que rola na horizontal (ScrollRow: com o foco do teclado, o cartão meio
// escondido entra inteiro). Com desktopGrid, os 6 do canal (home e /videos) cabem numa linha a partir de
// 1024 px; "Mais vídeos" (até 8) rola em toda largura. Cada cartão entra na rolagem (revela, com a posição em
// --i). O py-1.5 e o recuo de 1,5 nas laterais dão espaço ao anel de foco, que fica fora do cartão.
const ROW =
  'hide-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 py-1.5 md:-mx-1.5 md:scroll-px-1.5 md:gap-4 md:px-1.5';
const ROW_GRID = 'lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:p-0';
const GRID_SIZES = '(min-width: 1200px) 175px, (min-width: 1024px) 15vw, (min-width: 768px) 192px, 160px';
const SCROLL_SIZES = '(min-width: 768px) 192px, 160px';

type VideoRowProps = {
  videos: VideoCardData[];
  placement?: VideosPlacement;
  desktopGrid: boolean;
};

export function VideoRow({ videos, placement, desktopGrid }: VideoRowProps) {
  return (
    <ScrollRow className={`${ROW} ${desktopGrid ? ROW_GRID : ''}`}>
      {videos.map((video, index) => (
        <li
          key={video.id}
          className={`revela flex w-40 shrink-0 snap-start md:w-48 ${desktopGrid ? 'lg:w-auto' : ''}`}
          style={{ '--i': index } as CSSProperties}
        >
          <VideoCard video={video} sizes={desktopGrid ? GRID_SIZES : SCROLL_SIZES} placement={placement} />
        </li>
      ))}
    </ScrollRow>
  );
}
```

Run: `npx tsx scripts/test-videos-hub.ts < /dev/null`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
npm run typecheck < /dev/null
npx eslint src/components/videos scripts/test-videos-hub.ts --quiet < /dev/null
git add src/components/videos/TrackedVideosLink.tsx src/components/videos/VideoCard.tsx src/components/videos/VideoRow.tsx scripts/test-videos-hub.ts
git commit -F - <<'EOF'
feat: cartão de vídeo, fila de vídeos e links medidos

VideoCard (o cartão vertical da home, com h3, duração por extenso e loja),
VideoRow (a fila com ScrollRow) e TrackedVideosLink/VideoPageLink, que
medem com videos_route_click e levam a miniatura até o player.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

- [ ] **Step 6: Testes da home (falham com o `CTA.tsx` de hoje)**

Em `scripts/test-home-lower-sections.ts`:

1. Depois de `import { IMAGE_REMOTE_PATTERNS } from '@/lib/imageHosts.mjs';`, acrescente:
   ```ts
   import { videoPages } from '@/lib/video-pages';
   ```
2. Logo depois da linha `assert.equal(render(createElement(LatestVideos, { videos: [] })), '', 'sem vídeo, sem seção');`, acrescente:

```ts
// O título de cada vídeo num h3. O vídeo que tem página no site abre a página, na mesma aba, com a miniatura
// pronta para voar até o player; os outros seguem no YouTube numa aba nova. "Ver todos os vídeos" leva a
// /videos.
assert.equal(count(videosHtml, /<h3\b/g), 6, 'o título de cada vídeo num h3');
const pagedVideo = videoPages.find((page) => page.kind === 'youtube');
assert.ok(pagedVideo, 'há vídeo do YouTube com página');
const pagedHtml = render(createElement(LatestVideos, { videos: [video(pagedVideo.videoId), video('zzzzzzzzzzz')] }));
assert.ok(!linkTo(pagedHtml, `/videos/${pagedVideo.slug}`).includes('target='), 'vídeo com página abre na mesma aba');
assert.ok(pagedHtml.includes(`data-vt-name="video-player-${pagedVideo.slug}"`));
assert.ok(opensNewTab(linkTo(pagedHtml, 'https://www.youtube.com/watch?v=zzzzzzzzzzz')));
assert.ok(pagedHtml.includes(`${linkTo(pagedHtml, '/videos')}Ver todos os vídeos</a>`));
assert.ok(videosHtml.includes(`${linkTo(videosHtml, '/videos')}Ver todos os vídeos</a>`));
```

Run: `npx tsx scripts/test-home-lower-sections.ts < /dev/null`
Expected: FAIL em `o título de cada vídeo num h3`.

- [ ] **Step 7: `src/components/sections/CTA.tsx`**

Substitua o arquivo inteiro por:

```tsx
import Link from 'next/link';
import { HomeSection } from '@/components/sections/HomeSection';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { VideoRow } from '@/components/videos/VideoRow';
import { brandLinks } from '@/lib/brandLinks';
import type { SocialHighlight } from '@/lib/data';
import { getChannelRow } from '@/lib/videosHub';
import { getYoutubeHighlights } from '@/lib/youtube';

// "Últimos vídeos": os 6 vídeos mais novos do canal. No celular e no tablet a fila rola na horizontal; a
// partir de 1024 px os 6 cabem numa linha. O vídeo com página no site (/videos/…) abre a página; os outros, o
// YouTube numa aba nova. Sem vídeo (a API do YouTube fora do ar e a lista reserva vazia), a seção não
// aparece.

export async function CTA() {
  const videos = await getYoutubeHighlights();
  return <LatestVideos videos={videos} />;
}

const MORE_LINK = `flex min-h-11 items-center text-[13px] font-extrabold text-marinho underline underline-offset-[3px] md:text-[15px] ${FOCUS_RING}`;

export function LatestVideos({ videos }: { videos: SocialHighlight[] }) {
  const cards = getChannelRow(videos);
  if (cards.length === 0) return null;

  return (
    <HomeSection id="titulo-ultimos-videos" title="Últimos vídeos" className="pb-10 md:pb-14">
      <VideoRow videos={cards} desktopGrid />
      <div className="flex flex-wrap gap-x-6">
        <Link href="/videos" className={MORE_LINK}>
          Ver todos os vídeos
        </Link>
        <Link href={brandLinks.youtube} target="_blank" rel="noopener noreferrer" className={MORE_LINK}>
          Ver canal do YouTube
        </Link>
      </div>
    </HomeSection>
  );
}
```

- [ ] **Step 8: Rodar e ver passar**

Run:
```bash
npm run test:home-lower-sections < /dev/null
npm run test:videos-hub < /dev/null
npm run typecheck < /dev/null
npx eslint src/components/sections/CTA.tsx scripts/test-home-lower-sections.ts --quiet < /dev/null
```
Expected: `test:home-lower-sections ok`, o `✅ videosHub` e nada no typecheck nem no lint.

- [ ] **Step 9: Commit**

```bash
git add src/components/sections/CTA.tsx scripts/test-home-lower-sections.ts
git commit -F - <<'EOF'
feat: Últimos vídeos da home levam à página do vídeo

O vídeo do canal que tem página no site abre /videos/<slug> na mesma aba
(com a miniatura voando até o player); os outros seguem no YouTube. A seção
ganha "Ver todos os vídeos" e usa o VideoCard comum, sem mudança visual.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Task 3: Peças comuns da estante (sem mudança visível em `/reviews`)

**Files:**
- Create: `src/components/ui/shelfTransition.ts`
- Create: `src/lib/listUrl.ts`
- Create: `src/components/ui/useListUrl.tsx`
- Modify: `src/lib/reviewsShelf.ts`
- Modify: `src/components/reviews/ReviewsBrowser.tsx`
- Modify: `src/components/reviews/shelfClasses.ts`

**Interfaces:**
- Consumes: nada das tasks anteriores.
- Produces:
  - `runShelfTransition(shelf: HTMLElement | null, update: () => void): void` (`@/components/ui/shelfTransition`);
  - `isOnList(listPath, pathname)`, `urlSearchOf(listPath, location)` (`@/lib/listUrl`; reexportados por `@/lib/reviewsShelf`);
  - `useListUrlSearch(listPath): { urlSearch: string; getUrlSearch: () => string }`, `writeListUrl(search: string, mode: 'push' | 'replace')`, `ListUrlListener()` (`@/components/ui/useListUrl`, cliente);
  - `filterChipRowClass(moreToTheRight: boolean): string`, `filterChipClass(selected: boolean): string` (`@/components/reviews/shelfClasses`).

Esta task só reorganiza código. O HTML de `/reviews` e das subpáginas não muda, e o comportamento (URL, Voltar e Avançar, troca animada) também não: o `test:reviews-hub` e o `test:build-output` de hoje provam.

- [ ] **Step 1: Confirmar o ponto de partida**

Run: `npm run test:reviews-hub < /dev/null`
Expected: PASS (`✅ reviewsHub: …`).

- [ ] **Step 2: `src/components/ui/shelfTransition.ts`**

```ts
import { flushSync } from 'react-dom';

// A troca animada de uma lista (a estante de /reviews e a grade de /videos): data-trocando liga, no
// globals.css, o nome de transição de cada item (a variável --vt) só durante a troca. Sem a API (Firefox) ou
// com "reduzir movimento", troca na hora. Uma troca nova encerra a anterior; só a última tira o
// data-trocando. Fica fora do src/lib/viewTransition.ts, que componentes servidor importam: o flushSync só
// existe no cliente.
let transitionCount = 0;

export function runShelfTransition(shelf: HTMLElement | null, update: () => void) {
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
  try {
    const transition = document.startViewTransition(() => flushSync(update));
    // Uma troca que pula a anterior rejeita o ready dela: não é erro.
    transition.ready.catch(() => {});
    transition.finished.then(done, done);
  } catch {
    // A API existe, mas a chamada falhou: nada de nome de transição preso, e a troca acontece na hora.
    done();
    update();
  }
}
```

- [ ] **Step 3: `src/lib/listUrl.ts` e o reexport em `reviewsShelf.ts`**

Crie `src/lib/listUrl.ts`:

```ts
// As listas que guardam o filtro na query string: a estante de /reviews, as subpáginas de loja e /videos.

// A URL é a da própria lista? Numa navegação no cliente o endereço muda antes ou depois da página: o primeiro
// quadro depois de um link ainda vê o endereço da anterior, e um Voltar ou Avançar que sai da lista troca o
// endereço com a lista ainda na tela. Fora da lista ela não lê a URL nem grava nada.
export function isOnList(listPath: string, pathname: string): boolean {
  return pathname === listPath;
}

// A query string que a lista enxerga no navegador: só a da própria lista.
export function urlSearchOf(listPath: string, location: { pathname: string; search: string }): string {
  return isOnList(listPath, location.pathname) ? location.search : '';
}
```

Em `src/lib/reviewsShelf.ts`, troque o trecho abaixo (do comentário "A URL é a da própria lista?" até o fim de `urlSearchOf`):

```ts
// A URL é a da própria lista? Numa navegação no cliente o endereço muda antes ou depois da página: o
// primeiro quadro depois de um link ainda vê o endereço da anterior, e um Voltar ou Avançar que sai da
// lista troca o endereço com a estante ainda na tela. Fora da lista a estante não lê a URL, não grava a
// busca nem a página aberta.
export function isOnList(listPath: string, pathname: string): boolean {
  return pathname === listPath;
}

// A query string que a estante enxerga no navegador: só a da própria lista.
export function urlSearchOf(listPath: string, location: { pathname: string; search: string }): string {
  return isOnList(listPath, location.pathname) ? location.search : '';
}
```

por:

```ts
// A leitura da URL vale para toda lista com filtro na query string (a estante e /videos): fora da lista, a
// estante não lê a URL, não grava a busca nem a página aberta.
export { isOnList, urlSearchOf } from '@/lib/listUrl';
```

Confira com `grep -n "isOnList\|urlSearchOf" src/lib/reviewsShelf.ts` que nenhuma outra função do arquivo chama os dois (o reexport não os põe no escopo local). Se chamar, acrescente também `import { isOnList, urlSearchOf } from '@/lib/listUrl';` no topo.

- [ ] **Step 4: `src/components/ui/useListUrl.tsx`**

```tsx
'use client';

import { Suspense, useCallback, useEffect, useSyncExternalStore } from 'react';
import { useSearchParams } from 'next/navigation';
import { urlSearchOf } from '@/lib/listUrl';

// A query string de uma lista que guarda o filtro na URL (a estante de /reviews, as subpáginas de loja e
// /videos). O useSyncExternalStore lê a URL (só a desta lista, ver urlSearchOf); o evento avisa das trocas da
// própria lista (writeListUrl), e o ListUrlListener, das de fora (voltar, avançar ou um link para esta
// página). O useSearchParams fica nele, com Suspense próprio: assim o prerender não para no Suspense e o HTML
// estático traz os cartões.
const LIST_URL_EVENT = 'list-url';

function subscribeToUrl(onChange: () => void) {
  window.addEventListener(LIST_URL_EVENT, onChange);
  return () => window.removeEventListener(LIST_URL_EVENT, onChange);
}

const getServerSearch = () => '';

export function useListUrlSearch(listPath: string) {
  const getUrlSearch = useCallback(() => urlSearchOf(listPath, window.location), [listPath]);
  const urlSearch = useSyncExternalStore(subscribeToUrl, getUrlSearch, getServerSearch);
  return { urlSearch, getUrlSearch };
}

// Troca a query string da página (pushState ou replaceState, sem ir ao servidor) e avisa quem lê a URL.
export function writeListUrl(search: string, mode: 'push' | 'replace') {
  const url = `${window.location.pathname}${search}${window.location.hash}`;
  if (mode === 'push') window.history.pushState(null, '', url);
  else window.history.replaceState(null, '', url);
  window.dispatchEvent(new Event(LIST_URL_EVENT));
}

function UrlWatcher() {
  // Fora do App Router (no teste) não há parâmetros.
  const search = useSearchParams()?.toString() ?? '';

  useEffect(() => {
    window.dispatchEvent(new Event(LIST_URL_EVENT));
  }, [search]);

  return null;
}

export function ListUrlListener() {
  return (
    <Suspense fallback={null}>
      <UrlWatcher />
    </Suspense>
  );
}
```

- [ ] **Step 5: O `ReviewsBrowser` usa os módulos comuns**

Em `src/components/reviews/ReviewsBrowser.tsx`:

1. Nos imports do React, tire `Suspense,` da lista. Tire a linha `import { useSearchParams } from 'next/navigation';`.
2. Depois de `import { RevealSection } from '@/components/ui/RevealSection';`, acrescente:
   ```ts
   import { runShelfTransition } from '@/components/ui/shelfTransition';
   import { ListUrlListener, useListUrlSearch, writeListUrl } from '@/components/ui/useListUrl';
   ```
3. Na lista de imports de `@/lib/reviewsShelf`, tire `urlSearchOf,` (o `isOnList` fica).
4. Apague o comentário que começa por `// O useSyncExternalStore lê a URL (só a desta lista, ver urlSearchOf); o evento avisa das trocas da própria` (4 linhas) e a linha `const URL_EVENT = 'reviews-shelf-url';`. As constantes `VIEW_EVENT`, `VIEW_KEY`, `PAGE_KEY`, `EMPTY_PRIMARY`, `EMPTY_SECONDARY` e `VIEWS` ficam.
5. Apague `function subscribeToUrl(…) { … }`, `const getServerSearch = () => '';` e `function ShelfUrlListener() { … }` inteiros.
6. Troque o corpo de `writeUrl` por:
   ```ts
   function writeUrl(
     update: (query: ShelfQuery) => ShelfQuery,
     readQuery: (search: string) => ShelfQuery,
     mode: 'push' | 'replace'
   ): ShelfQuery {
     const next = update(readQuery(window.location.search));
     writeListUrl(withShelfQuery(window.location.search, next), mode);
     return readQuery(window.location.search);
   }
   ```
   (o comentário de cima dele fica como está).
7. Apague o comentário `// A troca animada da estante: data-trocando liga, …` (3 linhas), `let transitionCount = 0;` e `function runShelfTransition(…) { … }` inteiros.
8. No componente, troque
   ```ts
     const getUrlSearch = useCallback(() => urlSearchOf(listPath, window.location), [listPath]);
     const urlSearch = useSyncExternalStore(subscribeToUrl, getUrlSearch, getServerSearch);
   ```
   por
   ```ts
     const { urlSearch, getUrlSearch } = useListUrlSearch(listPath);
   ```
9. No JSX, troque
   ```tsx
         <Suspense fallback={null}>
           <ShelfUrlListener />
         </Suspense>
   ```
   por
   ```tsx
         <ListUrlListener />
   ```

O `flushSync` (do efeito da busca), o `useCallback` (do `readQuery`) e o `useSyncExternalStore` (do modo) continuam em uso no arquivo.

Run:
```bash
npm run test:reviews-hub < /dev/null
npm run typecheck < /dev/null
npx eslint src/components/ui/shelfTransition.ts src/components/ui/useListUrl.tsx src/lib/listUrl.ts src/lib/reviewsShelf.ts src/components/reviews/ReviewsBrowser.tsx --quiet < /dev/null
grep -rn "reviews-shelf-url\|ShelfUrlListener\|transitionCount" src scripts
```
Expected: o `✅ reviewsHub` igual ao do Step 1; typecheck e lint sem erro; o `grep` só acha `transitionCount` em `src/components/ui/shelfTransition.ts`.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/shelfTransition.ts src/lib/listUrl.ts src/components/ui/useListUrl.tsx src/lib/reviewsShelf.ts src/components/reviews/ReviewsBrowser.tsx
git commit -F - <<'EOF'
refactor: troca animada e leitura da URL da estante em módulos comuns

runShelfTransition vai para shelfTransition.ts (fora do viewTransition.ts,
que o servidor importa); a leitura e a gravação da URL, para useListUrl.tsx;
isOnList e urlSearchOf, para listUrl.ts, reexportados pelo reviewsShelf.ts.
Sem mudança em /reviews; /videos usa as mesmas peças.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

- [ ] **Step 7: As classes dos chips em `shelfClasses.ts`**

Em `src/components/reviews/shelfClasses.ts`, acrescente no topo `import { FOCUS_RING } from '@/components/ui/focusRing';` (com uma linha em branco antes do comentário de hoje) e, no fim do arquivo:

```ts

// A fila de chips de filtro (as categorias da estante, as lojas de /videos): rola no celular, com o degradê
// na borda direita enquanto há chip escondido (moreToTheRight, do useRowScroll), e quebra linha a partir do
// md, sem o degradê. O espaço antes do ${…} deixa o Tailwind ler a classe de antes.
export function filterChipRowClass(moreToTheRight: boolean): string {
  return `hide-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:[mask-image:none] ${
    moreToTheRight ? '[mask-image:linear-gradient(to_right,black_85%,transparent)]' : ''
  }`;
}

// O chip: marinho quando escolhido; 44 px de alvo de toque.
export function filterChipClass(selected: boolean): string {
  return `min-h-11 shrink-0 rounded-full border-2 px-4 text-sm font-bold whitespace-nowrap motion-safe:transition-colors ${
    selected ? 'border-marinho bg-marinho text-white' : 'border-marinho/20 bg-white text-marinho hover:border-marinho'
  } ${FOCUS_RING}`;
}
```

Em `src/components/reviews/ReviewsBrowser.tsx`:

1. Troque `import { SHELF_CONTAINER, SHELF_TITLE } from '@/components/reviews/shelfClasses';` por
   ```ts
   import { SHELF_CONTAINER, SHELF_TITLE, filterChipClass, filterChipRowClass } from '@/components/reviews/shelfClasses';
   ```
2. No `<div ref={categoriesRef} data-categorias="true" …>`, troque o `className={`hide-scrollbar … ${ moreCategories ? '…' : '' }`}` inteiro por `className={filterChipRowClass(moreCategories)}`.
3. No `<button>` das categorias, troque o `className={`min-h-11 shrink-0 … ${FOCUS_RING}`}` inteiro por `className={filterChipClass(query.category === value)}`.

O `FOCUS_RING` continua importado no `ReviewsBrowser` (outros botões o usam).

Run:
```bash
npm run test:reviews-hub < /dev/null
npm run typecheck < /dev/null
npx eslint src/components/reviews/shelfClasses.ts src/components/reviews/ReviewsBrowser.tsx --quiet < /dev/null
```
Expected: PASS, sem erro.

- [ ] **Step 8: Build completo (o HTML de `/reviews` e das subpáginas não mudou)**

Com o servidor de desenvolvimento parado:

Run: `npm run build < /dev/null`
Expected: termina com `✅ client bundle` e `✅ build output: …` (as travas de `/reviews`, das subpáginas e o `md:[mask-image:none]` no CSS passam). Restaure o `content-index.ts` se ele mudou só por fim de linha.

- [ ] **Step 9: Commit**

```bash
git add src/components/reviews/shelfClasses.ts src/components/reviews/ReviewsBrowser.tsx
git commit -F - <<'EOF'
refactor: classes dos chips de filtro em shelfClasses.ts

filterChipRowClass e filterChipClass, com o mesmo texto de hoje: a estante
de /reviews não muda, e os chips das lojas de /videos usam as mesmas.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Task 4: A página `/videos`

**Files:**
- Create: `src/components/ui/PageTrail.tsx`
- Modify: `src/app/(pt)/reviews/loja/[brand]/page.tsx`
- Create: `src/components/videos/VideoFeatured.tsx`
- Create: `src/components/videos/VideosBrowser.tsx`
- Create: `src/components/videos/VideoChannelRow.tsx`
- Create: `src/app/(pt)/videos/page.tsx`
- Delete: `src/app/(pt)/videos/page.js`
- Modify: `scripts/test-videos-hub.ts`

**Interfaces:**
- Consumes (Tasks 1–3): `getVideosHubContent`, `getChannelRow`, `VIDEOS_TRAIL` (`@/lib/videosHub`); `VIDEOS_LIST_CONTROL`, `CHANNEL_PLACEMENTS`, `YOUTUBE_SUBSCRIBE_URL`, `filterByStore`, `getVideosListControlParameters`, `readStoreFilter`, `withStoreFilter`, `videosCountLabel`, `toVideoCard`, `sourceCopy`, `videoMorphName`, tipos (`@/lib/videosShelf`); `TrackedVideosLink`, `VideoPageLink`, `VideoCard`, `VideoRow`; `runShelfTransition`; `ListUrlListener`, `useListUrlSearch`, `writeListUrl`; `isOnList` (`@/lib/listUrl`); `filterChipClass`, `filterChipRowClass`, `SHELF_CONTAINER`, `SHELF_TITLE`.
- Produces:
  - `PageTrail({ trail: readonly TrailItem[] })`, `type TrailItem` (`@/components/ui/PageTrail`);
  - `VideoFeatured({ video: VideoItem })`, `VideosBrowser({ videos: VideoItem[]; stores: VideoStore[] })`, `VideoChannelRow({ highlights: SocialHighlight[] })`, `VideoChannelStrip({ context: 'videos' | 'video' })`.

- [ ] **Step 1: Escrever os testes (falham porque os componentes não existem)**

Em `scripts/test-videos-hub.ts`:

1. Nos imports, depois de `import { FOCUS_RING } from '@/components/ui/focusRing';`, acrescente:
   ```ts
   import { PageTrail } from '@/components/ui/PageTrail';
   ```
   e depois de `import { VideoCard } from '@/components/videos/VideoCard';`:
   ```ts
   import { VideoChannelRow } from '@/components/videos/VideoChannelRow';
   import { VideoFeatured } from '@/components/videos/VideoFeatured';
   ```
   e depois de `import { VideoRow } from '@/components/videos/VideoRow';`:
   ```ts
   import { VideosBrowser } from '@/components/videos/VideosBrowser';
   import { brandLinks } from '@/lib/brandLinks';
   ```
2. Logo antes do comentário `// Dados reais: toda página de vídeo entra, …`, acrescente:

```ts
// A trilha: a mesma lista do BreadcrumbList; a própria página fica sem link (aria-current), e a lista quebra
// linha (o título longo de um vídeo não estoura a tela).
const longTitle = '🛋️ Poltronas Damie: Conforto Sala de Cinema de LUXO na sua CASA | CUPOM CECILIA12';
const trailHtml = render(createElement(PageTrail, { trail: [...VIDEOS_TRAIL, { name: longTitle, path: '/videos/x' }] }));
assert.match(trailHtml, /^<nav aria-label="[^"]+" class="mb-5"><ol class="flex flex-wrap /);
assert.ok(trailHtml.includes('href="/"') && trailHtml.includes('href="/videos"'));
assert.ok(trailHtml.includes(`<span aria-current="page" class="text-marinho">${longTitle}</span>`));
assert.ok(!trailHtml.includes('href="/videos/x"'), 'a própria página fica sem link');

// Destaque deitado: os dois links para a página do vídeo (o da miniatura fora do Tab e do leitor de tela), a
// miniatura sem atraso com o nome da transição só no data-vt-name, a data, a duração, a origem e "Ler o guia".
const featured = render(createElement(VideoFeatured, { video: item('cafe') }));
assert.match(featured, /data-destaque="horizontal"/);
assert.match(featured, /<section aria-labelledby="titulo-destaque"/);
const featuredLinks = featured.match(/<a\b[^>]*href="\/videos\/cafe"[^>]*>/g) ?? [];
assert.equal(featuredLinks.length, 2);
assert.ok(/tabindex="-1"/.test(featuredLinks[0]) && /aria-hidden="true"/.test(featuredLinks[0]), 'miniatura fora do Tab');
assert.ok(featuredLinks[1].includes(FOCUS_RING), 'título com o anel de foco');
assert.match(featured, /<h2 id="titulo-destaque"[^>]*><a\b[^>]*>Vídeo cafe<\/a><\/h2>/);
assert.ok(featured.includes('data-vt-name="video-player-cafe"') && !featured.includes('view-transition-name'));
assert.match(featured, /<img\b[^>]*\bloading="eager"/);
assert.match(featured, /<img\b[^>]*\bfetchpriority="high"/i);
assert.ok(textOf(featured).includes('01/09/2026, 18 min 17 s'));
assert.ok(textOf(featured).includes('Do guia: Guia cafe'));
assert.match(featured, /<a\b[^>]*href="\/reviews\/cafe-guia"[^>]*>Ler o guia/);
assert.match(render(createElement(VideoFeatured, { video: novo })), /data-destaque="vertical"/);
assert.match(render(createElement(VideoFeatured, { video: local })), /data-destaque="square"/);
const featuredRecipe = render(createElement(VideoFeatured, { video: receita }));
assert.ok(textOf(featuredRecipe).includes('Da receita: Bolo de teste'));
assert.match(featuredRecipe, /<a\b[^>]*href="\/receitas\/bolo-teste"[^>]*>Ver a receita/);
// Sem duração: só a data (sem a vírgula da duração) e nenhum selo.
const featuredLocal = render(createElement(VideoFeatured, { video: local }));
assert.ok(textOf(featuredLocal).includes('01/08/2026') && !textOf(featuredLocal).includes('01/08/2026,'), 'data sem duração');
assert.ok(!/\d:\d\d/.test(textOf(featuredLocal)) && !/undefined|NaN/.test(featuredLocal));

// A grade como o servidor a entrega: "Todos" escolhido, um chip por loja com 2 ou mais vídeos, o total que o
// leitor de tela ouve, todos os vídeos na ordem, cada item com o próprio nome de transição (--vt, sem
// repetir) e entrando na rolagem; nenhum view-transition-name no HTML.
const grid = render(createElement(VideosBrowser, { videos: hub.videos, stores: hub.stores }));
assert.match(grid, /<h2 id="titulo-todos-videos"[^>]*><span class="marca-texto">Todos os vídeos<\/span><\/h2>/);
const chips = [...grid.matchAll(/<button\b([^>]*)>([^<]*)<\/button>/g)];
assert.deepEqual(chips.map(([, , label]) => label), ['Todos', 'DAMIE', 'Dolce Gusto']);
assert.deepEqual(chips.map(([attributes]) => attributes.includes('aria-pressed="true"')), [true, false, false]);
assert.match(grid, /<div role="group" aria-label="Filtrar por loja" data-lojas="true"/);
assert.match(grid, /<p aria-live="polite"[^>]*>8 vídeos<\/p>/);
const gridList = grid.slice(grid.indexOf('<ul data-estante="videos"'));
assert.deepEqual([...gridList.matchAll(/<a\b[^>]*href="\/videos\/([^"]+)"/g)].map(([, slug]) => slug), slugs(hub.videos));
const gridNames = [...grid.matchAll(/--vt:(estante-[a-z0-9-]+)/g)].map(([, name]) => name);
assert.equal(gridNames.length, hub.videos.length);
assert.equal(new Set(gridNames).size, gridNames.length, 'nomes de transição repetidos');
assert.equal(count(grid, /<li class="estante-item revela flex" style="--vt:estante-[a-z0-9-]+;--i:\d+"/g), hub.videos.length);
assert.ok(!grid.includes('view-transition-name'));
assert.ok(!render(createElement(VideosBrowser, { videos: hub.videos, stores: [] })).includes('data-lojas'), 'sem chip, sem fila');

// O canal: título, a fila (o vídeo com página na mesma aba, o do YouTube numa aba nova) e a faixa com o link
// do canal e o "Inscrever-se no canal", os dois numa aba nova. Sem upload, a seção some.
const channelSection = render(
  createElement(VideoChannelRow, { highlights: [highlight(realYoutube.videoId), highlight('zzzzzzzzzzz')] })
);
assert.match(channelSection, /<h2 id="titulo-canal"[^>]*><span class="marca-texto">Últimos do canal<\/span><\/h2>/);
assert.ok(!(channelSection.match(new RegExp(`<a\\b[^>]*href="/videos/${realYoutube.slug}"[^>]*>`))?.[0] ?? '').includes('target='));
assert.match(channelSection, /<a\b[^>]*href="https:\/\/www\.youtube\.com\/watch\?v=zzzzzzzzzzz"[^>]*target="_blank"/);
const subscribeTag = channelSection.match(/<a\b[^>]*href="https:\/\/youtube\.com\/@emcasacomcecilia\?sub_confirmation=1"[^>]*>/)?.[0] ?? '';
assert.ok(subscribeTag.includes('target="_blank"') && subscribeTag.includes('rel="noopener noreferrer"'), 'Inscrever-se');
assert.ok(subscribeTag.includes('min-h-12'), 'alvo de toque de 44 px');
assert.ok(textOf(channelSection).includes('Inscrever-se no canal'));
assert.ok(channelSection.includes(`href="${brandLinks.youtube}"`), 'o link do canal');
assert.equal(render(createElement(VideoChannelRow, { highlights: [] })), '', 'sem a API, sem a seção');
```

Run: `npx tsx scripts/test-videos-hub.ts < /dev/null`
Expected: FAIL com `Cannot find module '@/components/ui/PageTrail'`.

- [ ] **Step 2: `src/components/ui/PageTrail.tsx` e a subpágina de loja**

Crie `src/components/ui/PageTrail.tsx`:

```tsx
import Link from 'next/link';
import { getArticleCopy } from '@/components/review/articleCopy';
import { FOCUS_RING } from '@/components/ui/focusRing';

// A trilha visível das páginas de lista e de vídeo (subpáginas de loja, /videos e a página de cada vídeo): a
// mesma lista do BreadcrumbList do JSON-LD, com o rótulo da trilha dos artigos em português. O último item é
// a própria página, sem link (aria-current). A lista quebra linha: o título longo de um vídeo não estoura a
// tela.
export type TrailItem = { name: string; path: string };

export function PageTrail({ trail }: { trail: readonly TrailItem[] }) {
  return (
    <nav aria-label={getArticleCopy('pt').breadcrumbLabel} className="mb-5">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-bold text-marinho-suave">
        {trail.map((item, index) => {
          const last = index === trail.length - 1;
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
  );
}
```

Em `src/app/(pt)/reviews/loja/[brand]/page.tsx`:

1. No `StoreHero`, troque o `<nav aria-label={getArticleCopy('pt').breadcrumbLabel} className="mb-5"> … </nav>` inteiro por `<PageTrail trail={page.trail} />`.
2. Acrescente `import { PageTrail } from '@/components/ui/PageTrail';` depois de `import { FOCUS_RING } from '@/components/ui/focusRing';`.
3. Tire os imports que ficaram sem uso: `import Link from 'next/link';` e `import { getArticleCopy } from '@/components/review/articleCopy';` (confira com `grep -n "Link\b\|getArticleCopy" "src/app/(pt)/reviews/loja/[brand]/page.tsx"` que nenhum outro trecho os usa).
4. O comentário de cima do `StoreHero` continua valendo ("a trilha (a mesma lista do BreadcrumbList)").

Run:
```bash
npm run typecheck < /dev/null
npx eslint src/components/ui/PageTrail.tsx "src/app/(pt)/reviews/loja/[brand]/page.tsx" --quiet < /dev/null
```
Expected: sem erro.

```bash
git add src/components/ui/PageTrail.tsx "src/app/(pt)/reviews/loja/[brand]/page.tsx"
git commit -F - <<'EOF'
refactor: trilha das páginas de lista em PageTrail

A trilha da subpágina de loja vira um componente comum, com o mesmo HTML;
/videos e a página de cada vídeo usam a mesma.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

- [ ] **Step 3: `src/components/videos/VideoFeatured.tsx`**

```tsx
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';
import { SHELF_CONTAINER } from '@/components/reviews/shelfClasses';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { TrackedVideosLink, VideoPageLink } from '@/components/videos/TrackedVideosLink';
import { sourceCopy, videoMorphName, type VideoAspect, type VideoItem } from '@/lib/videosShelf';

// O destaque de /videos: o vídeo mais novo, no formato dele. Vertical e quadrado ficam com o texto ao lado; o
// deitado ocupa a largura toda, com o texto embaixo. A miniatura e o título levam à página do vídeo (o hub
// não tem player); "Ler o guia" ou "Ver a receita" leva à origem. A miniatura é a maior imagem do topo e
// carrega sem atraso. O link dela sai do Tab e do leitor de tela: o do título leva ao mesmo lugar.

const LAYOUT: Record<VideoAspect, { box: string; thumb: string; sizes: string }> = {
  vertical: {
    box: 'grid grid-cols-[8.5rem_minmax(0,1fr)] items-end gap-4 sm:grid-cols-[13rem_minmax(0,1fr)] md:gap-8',
    thumb: 'aspect-[9/16]',
    sizes: '(min-width: 640px) 208px, 136px',
  },
  square: {
    box: 'grid grid-cols-[8.5rem_minmax(0,1fr)] items-end gap-4 sm:grid-cols-[18rem_minmax(0,1fr)] md:gap-8',
    thumb: 'aspect-square',
    sizes: '(min-width: 640px) 288px, 136px',
  },
  horizontal: {
    box: 'flex max-w-4xl flex-col gap-4 md:gap-5',
    thumb: 'aspect-video w-full',
    sizes: '(min-width: 1024px) 896px, 100vw',
  },
};

const SOURCE_LINK = `inline-flex min-h-12 items-center gap-2 self-start rounded-[10px] border-2 border-marinho bg-laranja px-5 text-[15px] font-extrabold text-marinho hover:bg-laranja/85 motion-safe:transition-colors ${FOCUS_RING}`;

export function VideoFeatured({ video }: { video: VideoItem }) {
  const layout = LAYOUT[video.aspect];
  const copy = sourceCopy(video.source.kind);

  return (
    <section aria-labelledby="titulo-destaque" className={`${SHELF_CONTAINER} pb-10 md:pb-14`}>
      <div data-destaque={video.aspect} className={layout.box}>
        <VideoPageLink
          href={video.href}
          placement="videos_featured"
          linkLabel={video.title}
          tabIndex={-1}
          aria-hidden="true"
          className={`group relative flex ${layout.thumb} items-center justify-center overflow-hidden rounded-xl border-2 border-marinho bg-marinho`}
        >
          <span data-vt-name={videoMorphName(video.slug)} className="absolute inset-0">
            <Image
              src={video.thumbnail}
              alt=""
              fill
              sizes={layout.sizes}
              loading="eager"
              fetchPriority="high"
              className="object-cover"
            />
          </span>
          <Play
            aria-hidden="true"
            className="relative size-14 fill-amarelo-cupom text-amarelo-cupom motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-110 md:size-20"
          />
          {video.duration ? (
            <span className="absolute right-2 bottom-2 rounded-md bg-marinho/85 px-1.5 py-0.5 text-xs leading-none font-extrabold text-white tabular-nums">
              {video.duration.badge}
            </span>
          ) : null}
        </VideoPageLink>
        <div className="flex min-w-0 flex-col gap-2 md:gap-3">
          <h2 id="titulo-destaque" className="text-xl leading-tight font-extrabold text-marinho md:text-3xl">
            <VideoPageLink
              href={video.href}
              placement="videos_featured"
              linkLabel={video.title}
              className={`hover:underline hover:underline-offset-4 ${FOCUS_RING}`}
            >
              {video.title}
            </VideoPageLink>
          </h2>
          <p className="text-sm font-bold text-marinho-suave">
            <time dateTime={video.uploadDate}>{video.dateLabel}</time>
            {video.duration ? `, ${video.duration.text}` : null}
          </p>
          <p className="text-[15px] leading-snug font-semibold text-marinho">{`${copy.from}: ${video.source.title}`}</p>
          <TrackedVideosLink href={video.source.href} placement="videos_featured" linkLabel={copy.action} className={SOURCE_LINK}>
            {copy.action}
            <ArrowRight aria-hidden="true" className="size-4" />
          </TrackedVideosLink>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: `src/components/videos/VideosBrowser.tsx`**

```tsx
'use client';

import { useMemo, useRef, type CSSProperties } from 'react';
import { SHELF_CONTAINER, SHELF_TITLE, filterChipClass, filterChipRowClass } from '@/components/reviews/shelfClasses';
import { RevealSection } from '@/components/ui/RevealSection';
import { runShelfTransition } from '@/components/ui/shelfTransition';
import { ListUrlListener, useListUrlSearch, writeListUrl } from '@/components/ui/useListUrl';
import { useRowScroll } from '@/components/ui/useRowScroll';
import { VideoCard } from '@/components/videos/VideoCard';
import { trackEvent } from '@/lib/analytics';
import { isOnList } from '@/lib/listUrl';
import { sanitizeViewTransitionName } from '@/lib/viewTransition';
import {
  VIDEOS_LIST_CONTROL,
  filterByStore,
  getVideosListControlParameters,
  readStoreFilter,
  toVideoCard,
  videosCountLabel,
  withStoreFilter,
  type VideoItem,
  type VideoStore,
} from '@/lib/videosShelf';

// "Todos os vídeos" de /videos: os chips das lojas, o total e a grade. A loja escolhida fica na URL (?loja=,
// com pushState, sem ir ao servidor) e é lida depois da hidratação, como na estante de /reviews: o HTML do
// servidor traz "Todos" com todos os vídeos. Voltar e Avançar trocam o filtro, e fora de /videos nada é
// gravado. A troca de loja é animada (runShelfTransition, com o --vt de cada item).

const LIST_PATH = '/videos';
const GRID_SIZES = '(min-width: 1200px) 210px, (min-width: 1024px) 18vw, (min-width: 768px) 22vw, (min-width: 640px) 30vw, 46vw';

type VideosBrowserProps = {
  videos: VideoItem[];
  stores: VideoStore[];
};

export function VideosBrowser({ videos, stores }: VideosBrowserProps) {
  const storeSlugs = useMemo(() => stores.map(({ slug }) => slug), [stores]);
  const { urlSearch } = useListUrlSearch(LIST_PATH);
  const store = readStoreFilter(urlSearch, storeSlugs);
  const shown = useMemo(() => filterByStore(videos, store), [videos, store]);
  // O degradê da borda direita dos chips só aparece enquanto há chip escondido. O hook é chamado sempre: sem
  // chips, ele não faz nada.
  const { trackRef: chipsRef, moreToTheRight } = useRowScroll<HTMLDivElement>(stores);
  const shelfRef = useRef<HTMLDivElement>(null);

  function selectStore(next: string | null) {
    if (next === store) return;
    // Um clique com esta página ainda na tela, depois de um Voltar para outra rota, não monta /?loja=…
    if (!isOnList(LIST_PATH, window.location.pathname)) return;
    trackEvent(VIDEOS_LIST_CONTROL, getVideosListControlParameters({ value: next ?? 'todos', listPath: LIST_PATH }));
    runShelfTransition(shelfRef.current, () => writeListUrl(withStoreFilter(window.location.search, next), 'push'));
  }

  return (
    <>
      <ListUrlListener />
      <RevealSection aria-labelledby="titulo-todos-videos" className="pb-10 md:pb-14">
        <div ref={shelfRef} className={`${SHELF_CONTAINER} flex flex-col gap-4 md:gap-6`}>
          <h2 id="titulo-todos-videos" className={SHELF_TITLE}>
            <span className="marca-texto">Todos os vídeos</span>
          </h2>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {stores.length > 0 ? (
              <div
                ref={chipsRef}
                role="group"
                aria-label="Filtrar por loja"
                data-lojas="true"
                className={filterChipRowClass(moreToTheRight)}
              >
                {[{ slug: null, name: 'Todos' }, ...stores].map(({ slug, name }) => (
                  <button
                    key={slug ?? 'todos'}
                    type="button"
                    aria-pressed={store === slug}
                    onClick={() => selectStore(slug)}
                    className={filterChipClass(store === slug)}
                  >
                    {name}
                  </button>
                ))}
              </div>
            ) : null}
            <p aria-live="polite" className="text-sm font-bold text-marinho-suave">
              {videosCountLabel(shown.length)}
            </p>
          </div>
          <ul data-estante="videos" className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-5 lg:grid-cols-5">
            {shown.map((video, index) => (
              <li
                key={video.slug}
                className="estante-item revela flex"
                style={{ '--vt': `estante-${sanitizeViewTransitionName(video.slug)}`, '--i': index } as CSSProperties}
              >
                <VideoCard video={toVideoCard(video)} sizes={GRID_SIZES} placement="videos_grid" />
              </li>
            ))}
          </ul>
        </div>
      </RevealSection>
    </>
  );
}
```

- [ ] **Step 5: `src/components/videos/VideoChannelRow.tsx`**

```tsx
import { HomeSection } from '@/components/sections/HomeSection';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { TrackedVideosLink } from '@/components/videos/TrackedVideosLink';
import { VideoRow } from '@/components/videos/VideoRow';
import { brandLinks } from '@/lib/brandLinks';
import type { SocialHighlight } from '@/lib/data';
import { getChannelRow } from '@/lib/videosHub';
import { CHANNEL_PLACEMENTS, YOUTUBE_SUBSCRIBE_URL } from '@/lib/videosShelf';

// "Últimos do canal" de /videos: os 6 uploads mais novos (os mesmos da home), o que tem página no site
// abrindo a página e os outros o YouTube numa aba nova, e a faixa do canal. Sem a API do YouTube, a seção
// some, como na home.
export function VideoChannelRow({ highlights }: { highlights: SocialHighlight[] }) {
  const videos = getChannelRow(highlights);
  if (videos.length === 0) return null;

  return (
    <HomeSection id="titulo-canal" title="Últimos do canal" className="pb-12 md:pb-16">
      <VideoRow videos={videos} placement="videos_channel" desktopGrid />
      <VideoChannelStrip context="videos" />
    </HomeSection>
  );
}

// A faixa do canal, em /videos e na página de cada vídeo: o link do canal e o "Inscrever-se no canal", os
// dois numa aba nova e medidos (videos_* ou video_*).
export function VideoChannelStrip({ context }: { context: keyof typeof CHANNEL_PLACEMENTS }) {
  const placements = CHANNEL_PLACEMENTS[context];

  return (
    <div className="flex flex-col gap-3 rounded-[10px] border-2 border-marinho bg-creme p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[15px] font-semibold text-marinho">
        <TrackedVideosLink
          href={brandLinks.youtube}
          target="_blank"
          rel="noopener noreferrer"
          placement={placements.channel}
          linkLabel="Cecília no YouTube"
          className={`font-extrabold underline underline-offset-[3px] ${FOCUS_RING}`}
        >
          Cecília no YouTube
        </TrackedVideosLink>
        : casa, café e receitas.
      </p>
      <TrackedVideosLink
        href={YOUTUBE_SUBSCRIBE_URL}
        target="_blank"
        rel="noopener noreferrer"
        placement={placements.subscribe}
        linkLabel="Inscrever-se no canal"
        className={`inline-flex min-h-12 items-center justify-center self-start rounded-full border-2 border-marinho bg-marinho px-6 text-[15px] font-extrabold text-white hover:bg-marinho/85 motion-safe:transition-colors sm:self-auto ${FOCUS_RING}`}
      >
        Inscrever-se no canal
      </TrackedVideosLink>
    </div>
  );
}
```

Run: `npx tsx scripts/test-videos-hub.ts < /dev/null`
Expected: PASS.

- [ ] **Step 6: Commit dos componentes**

```bash
npm run typecheck < /dev/null
npx eslint src/components/videos scripts/test-videos-hub.ts --quiet < /dev/null
git add src/components/videos/VideoFeatured.tsx src/components/videos/VideosBrowser.tsx src/components/videos/VideoChannelRow.tsx scripts/test-videos-hub.ts
git commit -F - <<'EOF'
feat: destaque, grade com chips de loja e canal de /videos

VideoFeatured (o vídeo mais novo no formato dele), VideosBrowser (chips das
lojas com 2 ou mais vídeos, ?loja= com pushState, total aria-live e a troca
animada da estante) e VideoChannelRow com a faixa "Inscrever-se no canal".

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

- [ ] **Step 7: `src/app/(pt)/videos/page.tsx` no lugar de `page.js`**

Apague `src/app/(pt)/videos/page.js` (`git rm "src/app/(pt)/videos/page.js"`) e crie `src/app/(pt)/videos/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { couponFontVariables } from '@/components/coupons/CouponBlocks';
import { SHELF_CONTAINER } from '@/components/reviews/shelfClasses';
import { PageTrail } from '@/components/ui/PageTrail';
import { VideoChannelRow } from '@/components/videos/VideoChannelRow';
import { VideoFeatured } from '@/components/videos/VideoFeatured';
import { VideosBrowser } from '@/components/videos/VideosBrowser';
import { publishedReviews, recipes } from '@/lib/data';
import { LOCALES } from '@/lib/i18n/locales';
import { serializeJsonLd } from '@/lib/jsonLd';
import { SITE_NAME, getCollectionPageJsonLd } from '@/lib/pageSeo';
import { VIDEOS_TRAIL, getVideosHubContent } from '@/lib/videosHub';
import { getYoutubeHighlights } from '@/lib/youtube';

// Os vídeos do site em duas camadas: em cima os que têm página própria (o destaque e a grade com os chips das
// lojas), que levam ao guia e à loja; embaixo os últimos do canal, com o "Inscrever-se no canal". Os dados
// saem prontos do servidor (videosHub.ts); o canal vem da API do YouTube, renovada a cada hora, e some sem ela.

const TITLE = 'Vídeos - Em Casa com Cecília';
const DESCRIPTION = 'Assista aos vídeos de receitas, reviews e demonstrações publicados pelo Em Casa com Cecília.';
const SHARE_DESCRIPTION = 'Receitas, reviews e demonstrações em vídeo.';

const content = getVideosHubContent({ reviews: publishedReviews, recipes });

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/videos' },
  openGraph: {
    title: TITLE,
    description: SHARE_DESCRIPTION,
    url: '/videos',
    siteName: SITE_NAME,
    locale: LOCALES.pt.openGraphLocale,
    type: 'website',
    images: [content.socialImage],
  },
  // O layout já define título e descrição genéricos no twitter, e o Next não os troca pelos do Open Graph.
  twitter: { card: 'summary_large_image', title: TITLE, description: SHARE_DESCRIPTION, images: [content.socialImage.url] },
};

export default async function VideosPage() {
  const highlights = await getYoutubeHighlights();
  const page = VIDEOS_TRAIL[VIDEOS_TRAIL.length - 1];
  const jsonLd = getCollectionPageJsonLd({
    name: page.name,
    description: DESCRIPTION,
    path: page.path,
    items: content.videos.map((video) => ({ name: video.title, path: video.href })),
    breadcrumb: VIDEOS_TRAIL.slice(0, -1),
  });

  return (
    <main className={`${couponFontVariables} min-h-screen bg-white text-marinho`}>
      {jsonLd.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      ))}
      <header className={`${SHELF_CONTAINER} pt-8 pb-6 md:pt-12 md:pb-10`}>
        <PageTrail trail={VIDEOS_TRAIL} />
        <h1 className="font-condensada text-[44px] leading-none font-black text-marinho font-stretch-extra-condensed md:text-7xl">
          <span className="marca-texto marca-texto-entra">Vídeos</span>
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed font-medium text-marinho-suave md:text-lg">{content.intro}</p>
      </header>
      <VideoFeatured video={content.featured} />
      <VideosBrowser videos={content.videos} stores={content.stores} />
      <VideoChannelRow highlights={highlights} />
    </main>
  );
}
```

- [ ] **Step 8: Typecheck, lint e build**

Run:
```bash
npm run typecheck < /dev/null
npx eslint "src/app/(pt)/videos/page.tsx" --quiet < /dev/null
npm run build < /dev/null
```
Expected: sem erro; a build termina com `✅ build output`. Restaure o `content-index.ts` se ele mudou só por fim de linha.

Confira o HTML gerado (o texto em `.next/server/app/videos.html`):

```bash
grep -o 'data-destaque="[a-z]*"' .next/server/app/videos.html
grep -c 'data-estante="videos"' .next/server/app/videos.html
grep -c 'view-transition-name' .next/server/app/videos.html
grep -o 'aria-pressed="true"[^>]*>Todos' .next/server/app/videos.html
```
Expected: `data-destaque="horizontal"` (o skincare é o mais novo), `1`, `0` e uma linha com `Todos`.

- [ ] **Step 9: Commit**

```bash
git add "src/app/(pt)/videos/page.tsx" "src/app/(pt)/videos/page.js"
git commit -F - <<'EOF'
feat: /videos com destaque, grade por loja e últimos do canal

A página no layout A: trilha, h1 com o marca-texto, o vídeo mais novo em
destaque, a grade de todos os vídeos com chips das lojas e os últimos do
canal. JSON-LD de lista (CollectionPage e BreadcrumbList) e a miniatura do
destaque como imagem de compartilhamento.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Task 5: A página de cada vídeo

**Files:**
- Create: `src/components/videos/VideoPlayer.tsx`
- Create: `src/components/videos/VideoSourceCard.tsx`
- Modify: `src/components/review/TrackedCouponPageLink.tsx`
- Modify: `scripts/test-videos-hub.ts`
- Modify: `src/lib/pageSeo.ts`
- Create: `src/app/(pt)/videos/[slug]/page.tsx`
- Delete: `src/app/(pt)/videos/[slug]/page.js`

**Interfaces:**
- Consumes (Tasks 1–4): `getVideoPageContent` (`@/lib/videosHub`); `videoMorphName`, `sourceCopy`, `toVideoCard`, `type VideoItem`, `type VideoAspect` (`@/lib/videosShelf`); `TrackedVideosLink`, `VideoRow`, `VideoChannelStrip`, `PageTrail`; do projeto: `HomeSection`, `TrackedCouponPageLink`, `buildYoutubeVideoObject`, `buildLocalVideoObject` (`@/lib/video-schema`), `getVideoPageBySlug`, `videoPages` (`@/lib/video-pages`), `serializeJsonLd`, `absoluteUrl`.
- Produces: `VideoPlayer({ video: VideoItem })`, `VideoSourceCard({ video: VideoItem })`, `getBreadcrumbListJsonLd(trail: readonly { name: string; path: string }[])` (`@/lib/pageSeo`); o placement `'video_page'` em `CouponPageLinkPlacement`.

- [ ] **Step 1: Escrever os testes (falham porque os componentes não existem)**

Em `scripts/test-videos-hub.ts`:

1. Nos imports, depois de `import { FOCUS_RING } from '@/components/ui/focusRing';`, acrescente:
   ```ts
   import { TrackedCouponPageLink } from '@/components/review/TrackedCouponPageLink';
   ```
   e depois de `import { VideoFeatured } from '@/components/videos/VideoFeatured';`:
   ```ts
   import { VideoPlayer } from '@/components/videos/VideoPlayer';
   ```
   e depois de `import { VideoRow } from '@/components/videos/VideoRow';`:
   ```ts
   import { VideoSourceCard } from '@/components/videos/VideoSourceCard';
   ```
2. Logo antes do comentário `// Dados reais: toda página de vídeo entra, …`, acrescente:

```ts
// O player: a moldura no formato (data-player) com o nome da transição da miniatura; o YouTube num <iframe>
// com os atributos de antes; o MP4 com controles, poster e o arquivo. O vertical não passa de min(45svh,
// 405px) de largura (9/16 de min(80svh, 720px) de altura); o quadrado, de 80svh.
const youtubePlayer = render(createElement(VideoPlayer, { video: item('cafe') }));
assert.match(youtubePlayer, /^<section aria-label="Player do vídeo: Vídeo cafe">/);
assert.match(youtubePlayer, /<div data-player="horizontal" class="[^"]*aspect-video[^"]*" style="view-transition-name:video-player-cafe">/);
assert.match(youtubePlayer, /<iframe src="https:\/\/www\.youtube\.com\/embed\/cafe" title="Vídeo cafe"/);
// O HTML não diferencia maiúsculas no nome do atributo, e o React pode escrever referrerPolicy e
// allowFullScreen de um jeito ou de outro: a conferência ignora a caixa.
const iframeTag = (youtubePlayer.match(/<iframe\b[^>]*>/)?.[0] ?? '').toLowerCase();
for (const attribute of [
  'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"',
  'referrerpolicy="strict-origin-when-cross-origin"',
  'allowfullscreen=""',
]) {
  assert.ok(iframeTag.includes(attribute), `iframe sem ${attribute}`);
}
assert.match(render(createElement(VideoPlayer, { video: novo })), /data-player="vertical" class="[^"]*max-w-\[min\(45svh,405px\)\]/);
const localPlayer = render(createElement(VideoPlayer, { video: local }));
assert.match(localPlayer, /data-player="square" class="[^"]*max-w-\[min\(48rem,80svh\)\]/);
assert.match(localPlayer, /<video controls="" preload="metadata" poster="[^"]+cafe-local-poster\.jpg"/);
assert.ok(localPlayer.includes(`<source src="${local.player.kind === 'local' ? local.player.contentUrl : ''}" type="video/mp4"/>`));
assert.ok(!localPlayer.includes('<iframe'));

// A origem: "Do guia" com "Ler o guia" e, com loja ativa, o botão laranja do código; receita, "Da receita" com
// "Ver a receita"; sem loja, sem o botão; sem foto, sem imagem.
const sourceCard = render(createElement(VideoSourceCard, { video: novo }));
assert.ok(textOf(sourceCard).startsWith('Do guiaGuia novo-damie'));
assert.match(sourceCard, /<a\b[^>]*href="\/reviews\/novo-damie-guia"[^>]*>Ler o guia/);
assert.match(sourceCard, /<a\b[^>]*href="\/cupons\/damie"[^>]*>Ver o código da DAMIE/);
assert.match(sourceCard, /<a\b[^>]*href="\/cupons\/damie"[^>]*class="[^"]*bg-laranja/);
const recipeCard = render(createElement(VideoSourceCard, { video: receita }));
assert.ok(textOf(recipeCard).startsWith('Da receitaBolo de teste'));
assert.match(recipeCard, /<a\b[^>]*href="\/receitas\/bolo-teste"[^>]*>Ver a receita/);
for (const slug of ['receita', 'sem-loja', 'inativa']) {
  assert.ok(!textOf(render(createElement(VideoSourceCard, { video: item(slug) }))).includes('Ver o código'), `${slug}: sem botão`);
}
assert.ok(!render(createElement(VideoSourceCard, { video: item('sem-loja') })).includes('<img'), 'sem foto, sem imagem');

// O botão da loja conta como coupon_page_click, com o placement da página do vídeo e o slug do vídeo.
assert.deepEqual(
  gtagCallsOf(
    TrackedCouponPageLink({
      href: '/cupons/damie',
      linkLabel: 'Ver o código da DAMIE',
      placement: 'video_page',
      contentSlug: 'novo-damie',
      children: null,
    })
  ),
  [
    [
      'event',
      'coupon_page_click',
      { brand: 'damie', content_slug: 'novo-damie', link_label: 'Ver o código da DAMIE', placement: 'video_page', url: '/cupons/damie' },
    ],
  ]
);
```

Run: `npx tsx scripts/test-videos-hub.ts < /dev/null`
Expected: FAIL com `Cannot find module '@/components/videos/VideoPlayer'`.

- [ ] **Step 2: `src/components/videos/VideoPlayer.tsx`**

```tsx
import { videoMorphName, type VideoAspect, type VideoItem } from '@/lib/videosShelf';

// O player da página do vídeo, no formato dele, logo depois do h1 (a regra do guia de vídeo). O vertical (os
// Shorts) não passa de min(80svh, 720px) de altura: a largura vai até min(45svh, 405px), que é 9/16 disso. O
// quadrado (os MP4) fica até 3xl de largura, sem passar de 80svh; o deitado ocupa a largura do conteúdo. A
// partir do lg, o vertical e o quadrado têm largura fixa, para o painel ficar ao lado. O YouTube vai num
// <iframe> com os atributos de antes; o MP4, num <video> com controles e o poster. A moldura tem o nome de
// transição da miniatura dos cartões (video-player-<slug>): ao abrir o vídeo, a miniatura voa para o player.
const FRAME: Record<VideoAspect, string> = {
  vertical: 'mx-auto aspect-[9/16] w-full max-w-[min(45svh,405px)] lg:mx-0 lg:w-[min(45svh,405px)]',
  horizontal: 'aspect-video w-full',
  square: 'mx-auto aspect-square w-full max-w-[min(48rem,80svh)] lg:mx-0 lg:w-[min(32rem,80svh)]',
};

export function VideoPlayer({ video }: { video: VideoItem }) {
  return (
    <section aria-label={`Player do vídeo: ${video.title}`}>
      <div
        data-player={video.aspect}
        className={`overflow-hidden rounded-xl border-2 border-marinho bg-black ${FRAME[video.aspect]}`}
        style={{ viewTransitionName: videoMorphName(video.slug) }}
      >
        {video.player.kind === 'youtube' ? (
          <iframe
            src={video.player.embedUrl}
            title={video.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <video controls preload="metadata" poster={video.thumbnail} className="h-full w-full object-contain">
            <source src={video.player.contentUrl} type="video/mp4" />
            Seu navegador não suporta a reprodução deste vídeo.
          </video>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: `src/components/videos/VideoSourceCard.tsx` e o placement `video_page`**

```tsx
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { TrackedCouponPageLink } from '@/components/review/TrackedCouponPageLink';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { TrackedVideosLink } from '@/components/videos/TrackedVideosLink';
import { sourceCopy, type VideoItem } from '@/lib/videosShelf';

// A origem do vídeo, no painel da página: a foto e o título do guia ou da receita, o link para lá e, quando o
// artigo tem loja ativa, o botão laranja do código (o mesmo rótulo da subpágina da loja, medido como
// coupon_page_click).
const SECONDARY = `inline-flex min-h-12 items-center gap-2 rounded-[10px] border-2 border-marinho bg-white px-4 text-[15px] font-extrabold text-marinho hover:bg-creme motion-safe:transition-colors ${FOCUS_RING}`;
const PRIMARY = `inline-flex min-h-12 items-center gap-2 rounded-[10px] border-2 border-marinho bg-laranja px-4 text-[15px] font-extrabold text-marinho hover:bg-laranja/85 motion-safe:transition-colors ${FOCUS_RING}`;

export function VideoSourceCard({ video }: { video: VideoItem }) {
  const copy = sourceCopy(video.source.kind);

  return (
    <div className="grid grid-cols-[6rem_minmax(0,1fr)] overflow-hidden rounded-[10px] border-2 border-marinho bg-white sm:grid-cols-[8rem_minmax(0,1fr)]">
      <span className="relative block min-h-24 border-r-2 border-marinho bg-creme">
        {video.source.image ? <Image src={video.source.image} alt="" fill sizes="128px" className="object-cover" /> : null}
      </span>
      <div className="flex min-w-0 flex-col gap-1.5 p-3 sm:p-4">
        <p className="text-xs font-bold text-marinho-suave">{copy.from}</p>
        <p className="text-[15px] leading-5 font-extrabold text-marinho">{video.source.title}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <TrackedVideosLink href={video.source.href} placement="video_source" linkLabel={copy.action} className={SECONDARY}>
            {copy.action}
            <ArrowRight aria-hidden="true" className="size-4" />
          </TrackedVideosLink>
          {video.codeLink ? (
            <TrackedCouponPageLink
              href={video.codeLink.href}
              linkLabel={video.codeLink.label}
              placement="video_page"
              contentSlug={video.slug}
              className={PRIMARY}
            >
              {video.codeLink.label}
              <ArrowRight aria-hidden="true" className="size-4" />
            </TrackedCouponPageLink>
          ) : null}
        </div>
      </div>
    </div>
  );
}
```

Em `src/components/review/TrackedCouponPageLink.tsx`, no tipo `CouponPageLinkPlacement`, troque `| 'home_store_page';` por:

```ts
  | 'home_store_page'
  | 'video_page';
```

Run:
```bash
npx tsx scripts/test-videos-hub.ts < /dev/null
```
Expected: PASS.

- [ ] **Step 4: Commit dos componentes**

```bash
npm run typecheck < /dev/null
npx eslint src/components/videos src/components/review/TrackedCouponPageLink.tsx scripts/test-videos-hub.ts --quiet < /dev/null
git add src/components/videos/VideoPlayer.tsx src/components/videos/VideoSourceCard.tsx src/components/review/TrackedCouponPageLink.tsx scripts/test-videos-hub.ts
git commit -F - <<'EOF'
feat: player no formato do vídeo e cartão da origem

VideoPlayer (vertical até min(80svh, 720px) de altura, deitado na largura,
quadrado até 3xl, com o nome da transição da miniatura) e VideoSourceCard
(o guia ou a receita e o botão "Ver o código" com coupon_page_click, placement
video_page).

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

- [ ] **Step 5: `getBreadcrumbListJsonLd` em `src/lib/pageSeo.ts`**

1. Antes de `// A página como lista de artigos e o caminho até ela; …`, acrescente:
   ```ts
   // O caminho até a página, como BreadcrumbList; o último item é a própria página.
   export function getBreadcrumbListJsonLd(trail: readonly PageLink[]) {
     return {
       '@context': 'https://schema.org',
       '@type': 'BreadcrumbList',
       itemListElement: trail.map((item, index) => ({
         '@type': 'ListItem',
         position: index + 1,
         name: item.name,
         item: absoluteUrl(item.path),
       })),
     };
   }

   ```
2. No `getCollectionPageJsonLd`, troque o segundo objeto do array devolvido (o `{ '@context': …, '@type': 'BreadcrumbList', itemListElement: [...breadcrumb, { name, path }].map(…) }` inteiro) por:
   ```ts
       getBreadcrumbListJsonLd([...breadcrumb, { name, path }]),
   ```

A saída é a mesma (as mesmas chaves, na mesma ordem); o `test:build-output` do Step 8 confere nas subpáginas, nas datas e em `/reviews`.

- [ ] **Step 6: `src/app/(pt)/videos/[slug]/page.tsx` no lugar de `page.js`**

Primeiro a trava (falha porque a página em TypeScript ainda não existe). Em `scripts/test-videos-hub.ts`:

1. Depois de `import assert from 'node:assert/strict';`, acrescente:
   ```ts
   import { readFileSync } from 'node:fs';
   import { resolve } from 'node:path';
   ```
2. Logo antes do comentário `// Dados reais: toda página de vídeo entra, …`, acrescente:
   ```ts
   // As duas páginas escrevem o JSON-LD pelo serializeJsonLd (o "<" escapado), nunca pelo JSON.stringify cru.
   for (const file of ['src/app/(pt)/videos/page.tsx', 'src/app/(pt)/videos/[slug]/page.tsx']) {
     const source = readFileSync(resolve(process.cwd(), file), 'utf8');
     assert.ok(source.includes('serializeJsonLd(') && !source.includes('JSON.stringify('), `${file}: JSON-LD sem o serializeJsonLd`);
   }
   ```

Run: `npx tsx scripts/test-videos-hub.ts < /dev/null`
Expected: FAIL com `ENOENT` em `src/app/(pt)/videos/[slug]/page.tsx`.

Depois apague `src/app/(pt)/videos/[slug]/page.js` (`git rm "src/app/(pt)/videos/[slug]/page.js"`) e crie `src/app/(pt)/videos/[slug]/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { couponFontVariables } from '@/components/coupons/CouponBlocks';
import { SHELF_CONTAINER } from '@/components/reviews/shelfClasses';
import { HomeSection } from '@/components/sections/HomeSection';
import { PageTrail } from '@/components/ui/PageTrail';
import { VideoChannelStrip } from '@/components/videos/VideoChannelRow';
import { VideoPlayer } from '@/components/videos/VideoPlayer';
import { VideoRow } from '@/components/videos/VideoRow';
import { VideoSourceCard } from '@/components/videos/VideoSourceCard';
import { publishedReviews, recipes } from '@/lib/data';
import { serializeJsonLd } from '@/lib/jsonLd';
import { absoluteUrl, getBreadcrumbListJsonLd } from '@/lib/pageSeo';
import { buildLocalVideoObject, buildYoutubeVideoObject } from '@/lib/video-schema';
import { getVideoPageBySlug, videoPages } from '@/lib/video-pages';
import { getVideoPageContent } from '@/lib/videosHub';
import { toVideoCard } from '@/lib/videosShelf';

// A página de exibição de um vídeo (docs/GUIA-EDITORIAL-VIDEOS.md, seção 6): a trilha, o h1 igual ao name do
// VideoObject, o player no formato do vídeo logo depois do h1, o painel (Sobre este vídeo, a origem com o
// botão da loja e o canal) e "Mais vídeos". Existe para o Google indexar o vídeo: o VideoObject, o canonical e
// o sitemap de vídeo não mudam.

export const dynamicParams = false;

type VideoPageProps = {
  params: Promise<{ slug: string }>;
};

const sources = { reviews: publishedReviews, recipes };

export function generateStaticParams() {
  return videoPages.map((video) => ({ slug: video.slug }));
}

export async function generateMetadata({ params }: VideoPageProps): Promise<Metadata> {
  const content = getVideoPageContent(sources, (await params).slug);
  if (!content) return { title: 'Vídeo não encontrado' };
  const { video } = content;
  const canonical = absoluteUrl(video.href);

  return {
    title: `${video.title} - Em Casa com Cecília`,
    description: video.description,
    alternates: { canonical },
    openGraph: {
      title: video.title,
      description: video.description,
      url: canonical,
      type: 'video.other',
      images: [{ url: video.thumbnail, alt: video.title }],
      videos: video.player.kind === 'local' ? [{ url: video.player.contentUrl }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: video.title,
      description: video.description,
      images: [video.thumbnail],
    },
  };
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { slug } = await params;
  const content = getVideoPageContent(sources, slug);
  const record = getVideoPageBySlug(slug);
  if (!content || !record) notFound();
  const { video, trail, more } = content;

  const videoObject =
    record.kind === 'youtube'
      ? buildYoutubeVideoObject({
          url: record.youtubeUrl,
          title: record.title,
          description: record.description,
          thumbnailUrl: record.thumbnailUrl,
          uploadDate: record.uploadDate,
          duration: record.duration,
        })
      : buildLocalVideoObject(record);
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      ...videoObject,
      '@id': `${record.canonicalUrl}#video`,
      mainEntityOfPage: record.canonicalUrl,
    },
    getBreadcrumbListJsonLd(trail),
  ];

  return (
    <main className={`${couponFontVariables} min-h-screen bg-white text-marinho`}>
      {jsonLd.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      ))}
      <article className={`${SHELF_CONTAINER} pt-8 pb-10 md:pt-12 md:pb-14`}>
        <PageTrail trail={trail} />
        <h1 className="mb-6 font-condensada text-[32px] leading-[1.05] font-black text-marinho font-stretch-extra-condensed md:mb-8 md:text-5xl">
          <span className="marca-texto marca-texto-entra">{video.title}</span>
        </h1>
        <div
          className={
            video.aspect === 'horizontal'
              ? 'flex flex-col gap-6 md:gap-8'
              : 'flex flex-col gap-6 md:gap-8 lg:grid lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start lg:gap-10'
          }
        >
          <VideoPlayer video={video} />
          <div className={`flex min-w-0 flex-col gap-5 ${video.aspect === 'horizontal' ? 'max-w-3xl' : ''}`}>
            <section aria-labelledby="titulo-sobre">
              <h2 id="titulo-sobre" className="text-xl font-extrabold text-marinho">
                Sobre este vídeo
              </h2>
              <p className="mt-1 flex flex-wrap gap-x-4 text-sm font-bold text-marinho-suave">
                <span>
                  Publicado em <time dateTime={video.uploadDate}>{video.dateLabel}</time>
                </span>
                {video.duration ? <span>{`Duração: ${video.duration.text}`}</span> : null}
              </p>
              <p className="mt-3 text-base leading-relaxed whitespace-pre-line text-marinho">{video.description}</p>
            </section>
            <VideoSourceCard video={video} />
            <VideoChannelStrip context="video" />
          </div>
        </div>
      </article>
      {more.videos.length > 0 ? (
        <HomeSection id="titulo-mais-videos" title={more.title} className="pb-12 md:pb-16">
          <VideoRow videos={more.videos.map(toVideoCard)} placement="video_more" desktopGrid={false} />
        </HomeSection>
      ) : null}
    </main>
  );
}
```

- [ ] **Step 7: Rodar os testes e o build**

Run:
```bash
npm run test:videos-hub < /dev/null
npm run typecheck < /dev/null
npx eslint "src/app/(pt)/videos/[slug]/page.tsx" src/lib/pageSeo.ts scripts/test-videos-hub.ts --quiet < /dev/null
npm run build < /dev/null
```
Expected: o `✅ videosHub`; typecheck e lint sem erro; a build com `Vídeos válidos: … e 14 página(s) de exibição.` e `✅ build output`. Restaure o `content-index.ts` se ele mudou só por fim de linha.

Confira três páginas geradas:

```bash
for slug in poltrona-damie-para-maes-e-amamentacao minha-primeira-lava-e-seca-samsung-13kg-video como-usar-cupom-ceciemcasa-i-wanna-sleep; do
  file=".next/server/app/videos/$slug.html"
  grep -o 'data-player="[a-z]*"' "$file"
  grep -c '<iframe\|<video' "$file"
  grep -o 'Ver o código [^<]*' "$file" | head -1
done
```
Expected: `vertical`, `horizontal`, `square`; `1` em cada; `Ver o código da DAMIE`, nenhuma linha para a lava e seca (sem loja) e `Ver o código da I Wanna Sleep`.

- [ ] **Step 8: Commit**

```bash
git add src/lib/pageSeo.ts "src/app/(pt)/videos/[slug]/page.tsx" "src/app/(pt)/videos/[slug]/page.js" scripts/test-videos-hub.ts
git commit -F - <<'EOF'
feat: página de cada vídeo com player no formato e Mais vídeos

Trilha igual ao BreadcrumbList, h1 igual ao VideoObject com o marca-texto,
o player no formato do vídeo logo depois do h1, o painel (Sobre este vídeo,
a origem com o botão da loja e o canal) e "Mais vídeos" da mesma loja. O
VideoObject, o canonical e o sitemap de vídeo não mudam; o JSON-LD passa
pelo serializeJsonLd e o BreadcrumbList pelo getBreadcrumbListJsonLd.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

### Task 6: Travas no HTML gerado e documentação

**Files:**
- Modify: `scripts/test-build-output.ts`
- Modify: `CLAUDE.md`
- Modify: `docs/GUIA-EDITORIAL-VIDEOS.md`

**Interfaces:**
- Consumes (Tasks 1–5): `getVideosHubContent`, `getVideoPageContent`, `VIDEOS_TRAIL`, `type VideoPageContent` (`../src/lib/videosHub`); `videoMorphName`, `YOUTUBE_SUBSCRIBE_URL` (`../src/lib/videosShelf`); `videoPages` (`../src/lib/video-pages`). Do próprio arquivo: `builtFile`, `read`, `bodyOf`, `headOf`, `jsonLdOf`, `textOf`, `decodeHtml`, `between`, `assertListPageSeo`, `assertCollectionNames`, `storeTrailOf`/`assertStoreTrail` (renomeados aqui), `css`, `homeBody`, `sectionCards`.
- Produces: travas na build; `assertPageTrail` e `pageTrailOf` (o novo nome de `assertStoreTrail` e `storeTrailOf`), `PAGE_TRAIL_LABEL` (o de `STORE_TRAIL_LABEL`).

- [ ] **Step 1: Nomes da trilha para todas as páginas**

Em `scripts/test-build-output.ts`, troque em todo o arquivo (confira antes com `grep -n "storeTrailOf\|assertStoreTrail\|STORE_TRAIL_LABEL" scripts/test-build-output.ts` e depois com o mesmo `grep`, que não deve achar nada):
- `STORE_TRAIL_LABEL` → `PAGE_TRAIL_LABEL`;
- `storeTrailOf` → `pageTrailOf`;
- `assertStoreTrail` → `assertPageTrail`.

No comentário de cima do `pageTrailOf`, troque `// A trilha visível de uma subpágina (o <nav> com o rótulo da trilha dos artigos em português), item por` por `// A trilha visível de uma subpágina de loja, de /videos ou de uma página de vídeo (o <nav> com o rótulo da trilha dos artigos em português), item por`.

- [ ] **Step 2: Imports**

Depois de `import { GRID_PAGE_SIZE } from '../src/lib/reviewsShelf';`, acrescente:

```ts
import { videoPages } from '../src/lib/video-pages';
import { VIDEOS_TRAIL, getVideoPageContent, getVideosHubContent, type VideoPageContent } from '../src/lib/videosHub';
import { YOUTUBE_SUBSCRIBE_URL, videoMorphName } from '../src/lib/videosShelf';
```

- [ ] **Step 3: O tamanho do player no CSS**

Logo depois do bloco do `md:[mask-image:none]` (o `assert.ok(css.includes('.md\\:\\[mask-image\\:none\\]{'), …);`), acrescente:

```ts

// O player da página do vídeo não passa da altura da tela: o vertical vai até min(45svh, 405px) de largura
// (9/16 de min(80svh, 720px) de altura) e o quadrado até 80svh. Valor arbitrário que o Tailwind deixa de ler
// some do CSS sem erro nenhum.
{
  const compactCss = css.replace(/\s+/g, '');
  for (const size of ['min(45svh,405px)', 'min(48rem,80svh)', 'min(32rem,80svh)']) {
    assert.ok(compactCss.includes(`:${size}`), `CSS sem o tamanho do player ${size}`);
  }
}
```

- [ ] **Step 4: As travas de `/videos`, das páginas de vídeo e da home**

Logo antes do comentário `// O feed do Dicas & Ofertas e a API do YouTube decidem na hora do build se ofertas e vídeos`, acrescente:

```ts
// /videos: um h1, o destaque, a grade com todos os vídeos na ordem e o anel de foco, os chips das lojas com 2
// ou mais vídeos ("Todos" escolhido), a trilha igual ao BreadcrumbList, o JSON-LD de lista com a imagem, o
// canal com o "Inscrever-se no canal" (quando a API respondeu no build) e nenhum nome de transição no HTML
// (no HTML, o video-player- fica só no data-vt-name).
const videoSources = { reviews: publishedReviews, recipes };
const videosHub = getVideosHubContent(videoSources);
const videoLinksIn = (html: string) => [...html.matchAll(/<a\b[^>]*\bhref="\/videos\/([^"/?#]+)"/g)].map(([, slug]) => slug);
const videosFile = builtFile(`${SITE_URL}/videos`);
assert.ok(videosFile, '/videos: página não gerada no build');
const videosHtml = read(videosFile);
const videosBody = bodyOf(videosHtml);
assert.deepEqual(
  [...videosBody.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map(([, h1]) => textOf(h1)),
  ['Vídeos'],
  '/videos: h1'
);
assert.deepEqual(
  [...new Set(videoLinksIn(between(videosBody, 'aria-labelledby="titulo-destaque"', ['</section>'])))],
  [videosHub.featured.slug],
  '/videos: destaque'
);
const videosGrid = between(videosBody, '<ul data-estante="videos"', ['</ul>']);
assert.deepEqual(videoLinksIn(videosGrid), videosHub.videos.map(({ slug }) => slug), '/videos: a grade, do mais novo');
for (const [tag] of videosGrid.matchAll(/<a\b[^>]*>/g)) {
  assert.match(tag, /\bclass="[^"]* focus-visible:outline-marinho[ "]/, `/videos: cartão sem o anel de foco da casa: ${tag}`);
}
const videoChips = [...between(videosBody, 'data-lojas="true"', ['</div>']).matchAll(/<button\b([^>]*)>([^<]*)<\/button>/g)];
assert.deepEqual(
  videoChips.map(([, , label]) => decodeHtml(label)),
  ['Todos', ...videosHub.stores.map(({ name }) => name)],
  '/videos: chips'
);
assert.deepEqual(
  videoChips.map(([, attributes]) => attributes.includes('aria-pressed="true"')),
  videoChips.map((_, index) => index === 0),
  '/videos: só "Todos" escolhido no HTML'
);
assert.ok(!videosBody.includes('view-transition-name'), '/videos: nome de transição no HTML');
const videoMorphNames = videosBody.match(/data-vt-name="video-player-/g)?.length ?? 0;
assert.ok(videoMorphNames > 0, '/videos: nenhuma miniatura com o nome da transição (data-vt-name)');
assert.equal(videosBody.match(/video-player-/g)?.length ?? 0, videoMorphNames, '/videos: video-player- fora do data-vt-name');
assertPageTrail('/videos', videosHtml, VIDEOS_TRAIL);
assertListPageSeo('/videos', videosHtml, { items: videosHub.videos.length, image: videosHub.socialImage });
assertCollectionNames('/videos', videosHtml, videosHub.videos.map(({ title }) => title));
const videosChannel = between(videosBody, 'aria-labelledby="titulo-canal"', ['</section>']);
if (videosChannel) {
  assert.match(
    videosChannel,
    new RegExp(`<a\\b[^>]*href="${YOUTUBE_SUBSCRIBE_URL.replace(/[.?]/g, '\\$&')}"[^>]*target="_blank"`),
    '/videos: canal sem o "Inscrever-se no canal"'
  );
}

// As páginas de vídeo (docs/GUIA-EDITORIAL-VIDEOS.md, seção 6): um h1, igual ao name do VideoObject; o player
// logo depois do h1 (nenhum <iframe>, <video>, imagem ou fila entre os dois), no formato do aspect e com o
// nome da transição da miniatura; um player só; o link da origem; o botão da loja e a duração só quando
// existem; "Mais vídeos" sem o vídeo aberto; a trilha igual ao BreadcrumbList; o JSON-LD sem "<" cru.
function assertVideoWatchPage(pagePath: string, html: string, content: VideoPageContent) {
  const body = bodyOf(html);
  const { video } = content;
  const article = between(body, '<article', ['</article>']);
  const videoObject = jsonLdOf(html).find((schema) => schema['@type'] === 'VideoObject');
  assert.equal(videoObject?.name, video.title, `${pagePath}: name do VideoObject`);
  assert.deepEqual(
    [...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map(([, h1]) => textOf(h1)),
    [videoObject?.name],
    `${pagePath}: h1 diferente do name do VideoObject`
  );
  const afterH1 = body.slice(body.indexOf('</h1>'));
  const playerAt = afterH1.indexOf('data-player="');
  assert.ok(playerAt > 0, `${pagePath}: sem o player`);
  assert.doesNotMatch(afterH1.slice(0, playerAt), /<(?:iframe|video|img|ul)\b/, `${pagePath}: algo entre o h1 e o player`);
  const frame = afterH1.slice(playerAt).match(/^data-player="[^"]+"[^>]*>/)?.[0] ?? '';
  assert.ok(frame.startsWith(`data-player="${video.aspect}"`), `${pagePath}: player fora do formato ${video.aspect}`);
  assert.ok(frame.includes(`view-transition-name:${videoMorphName(video.slug)}`), `${pagePath}: player sem o nome da transição`);
  assert.equal(body.match(/<(?:iframe|video)\b/g)?.length ?? 0, 1, `${pagePath}: mais de um player`);
  assert.ok(article.includes(`href="${video.source.href}"`), `${pagePath}: sem o link da origem`);
  assert.equal(textOf(article).includes('Ver o código'), video.codeLink !== null, `${pagePath}: botão da loja onde não devia, ou faltando`);
  if (video.codeLink) assert.ok(article.includes(`href="${video.codeLink.href}"`), `${pagePath}: botão sem a página de cupom`);
  assert.equal(textOf(article).includes('Duração:'), video.duration !== null, `${pagePath}: duração onde não devia, ou faltando`);
  assert.doesNotMatch(textOf(article), /undefined|NaN/, `${pagePath}: texto quebrado`);
  assert.deepEqual(
    videoLinksIn(between(body, 'aria-labelledby="titulo-mais-videos"', ['</section>'])),
    content.more.videos.map(({ slug }) => slug),
    `${pagePath}: Mais vídeos`
  );
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    assert.ok(!json.includes('<'), `${pagePath}: JSON-LD com "<" cru`);
  }
  assertPageTrail(pagePath, html, content.trail);
}

const videoWatchPages = videoPages.map((page) => {
  const pagePath = `/videos/${page.slug}`;
  const content = getVideoPageContent(videoSources, page.slug);
  assert.ok(content, `${pagePath}: sem conteúdo`);
  const file = builtFile(`${SITE_URL}${pagePath}`);
  assert.ok(file, `${pagePath}: página não gerada no build`);
  const html = read(file);
  assertVideoWatchPage(pagePath, html, content);
  return { pagePath, html, content };
});

// Controles numa página com loja: cada defeito derruba a trava com a mensagem dele.
{
  const sample = videoWatchPages.find(({ content }) => content.video.codeLink);
  assert.ok(sample, 'controle: há página de vídeo com loja');
  const { pagePath, html, content } = sample;
  const otherAspect = content.video.aspect === 'horizontal' ? 'vertical' : 'horizontal';
  const label = content.video.codeLink?.label ?? '';
  const failures: Array<[string, RegExp]> = [
    [html.replace('</h1>', '</h1><ul></ul>'), /algo entre o h1 e o player/],
    [html.replace(`data-player="${content.video.aspect}"`, `data-player="${otherAspect}"`), /player fora do formato/],
    [html.replace(/<h1\b([^>]*)>/, '<h1$1>Outro título '), /h1 diferente do name do VideoObject/],
    [html.replace('</article>', '<iframe></iframe></article>'), /mais de um player/],
    [html.split(label).join('Outro texto'), /botão da loja onde não devia, ou faltando/],
    [html.replace('aria-labelledby="titulo-mais-videos"', 'aria-labelledby="titulo-outro"'), /Mais vídeos/],
  ];
  for (const [mutated, message] of failures) {
    assert.throws(() => assertVideoWatchPage(pagePath, mutated, content), message);
  }
}

// Os Últimos vídeos da home (quando a API do YouTube respondeu no build): o "Ver todos os vídeos"; o vídeo com
// página no site abre a página na mesma aba, e o do YouTube numa aba nova.
const homeVideos = between(homeBody, 'aria-labelledby="titulo-ultimos-videos"', ['aria-labelledby="titulo-', '<footer']);
if (homeVideos) {
  assert.match(homeVideos, /<a\b[^>]*href="\/videos"[^>]*>Ver todos os vídeos<\/a>/, 'home: sem o "Ver todos os vídeos"');
  for (const [tag] of homeVideos.matchAll(/<a\b[^>]*href="\/videos\/[^"]+"[^>]*>/g)) {
    assert.ok(!tag.includes('target="_blank"'), `home: vídeo com página abrindo em aba nova: ${tag}`);
  }
  for (const [tag] of homeVideos.matchAll(/<a\b[^>]*href="https:\/\/www\.youtube\.com\/watch\?v=[^"]+"[^>]*>/g)) {
    assert.ok(tag.includes('target="_blank"'), `home: vídeo do YouTube sem aba nova: ${tag}`);
  }
}
```

- [ ] **Step 5: A linha final**

Na `console.log` final, troque `${storeArticleSlugs.length} subpáginas de loja, ` por:

```
${storeArticleSlugs.length} subpáginas de loja, /videos (${videosHub.videos.length} vídeos, canal: ${videosChannel ? 'sim' : 'ausente'}), ${videoWatchPages.length} páginas de vídeo, 
```

e confira com o `grep -n "subpáginas de loja, /videos" scripts/test-build-output.ts` que a troca entrou.

- [ ] **Step 6: Rodar a build**

Com o servidor de desenvolvimento parado:

Run:
```bash
npm run typecheck < /dev/null
npx eslint scripts/test-build-output.ts --quiet < /dev/null
npm run build < /dev/null
```
Expected: sem erro; a última linha `✅ build output: …, /videos (14 vídeos, canal: …), 14 páginas de vídeo, …`. Restaure o `content-index.ts` se ele mudou só por fim de linha.

Controle (não commitar): em `src/components/videos/VideoPlayer.tsx`, troque `max-w-[min(45svh,405px)]` por `max-w-[min(45svh,404px)]` no vertical e rode só `npx tsx scripts/test-build-output.ts < /dev/null` depois de um `npx next build --webpack < /dev/null`: a trava `CSS sem o tamanho do player min(45svh,405px)` falha. Desfaça e refaça o build.

- [ ] **Step 7: Commit das travas**

```bash
git add scripts/test-build-output.ts
git commit -F - <<'EOF'
test: travas de /videos, das páginas de vídeo e da home

No HTML gerado: o destaque, a grade na ordem com o anel de foco, os chips,
a trilha, o JSON-LD de lista e nenhum nome de transição em /videos; em cada
página de vídeo, h1 igual ao VideoObject, o player logo depois do h1 no
formato do aspect, um player só, a origem, o botão da loja e a duração só
quando existem e Mais vídeos sem o próprio vídeo; o "Ver todos os vídeos" da
home; o tamanho do player no CSS. A trilha das subpáginas vira assertPageTrail.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

- [ ] **Step 8: `CLAUDE.md`**

1. Na lista de comandos, depois da linha do `npm run test:reviews-hub`, acrescente:
   ```
   npm run test:videos-hub      # /videos e as páginas de vídeo: destaque e ordem pela data, chips de loja e ?loja=, duração, origem e botão da loja, Mais vídeos, canal, medição e os componentes
   ```
2. Na descrição do `npm run test:build-output`, troque `as páginas de data (imagem e JSON-LD), ` por `as páginas de data (imagem e JSON-LD), /videos (o destaque, a grade na ordem, os chips, o JSON-LD de lista e nenhum nome de transição no HTML), as páginas de vídeo (trilha igual ao BreadcrumbList, h1 igual ao VideoObject, o player logo depois do h1 no formato do vídeo, a origem, o botão da loja e Mais vídeos), o "Ver todos os vídeos" da home, o tamanho do player no CSS, `.
3. Na tabela do "Data layer", troque a linha `| Vídeos | `src/lib/video-metadata.js` e `src/lib/video-pages.js` |` por:
   ```
   | Vídeos | `src/lib/video-metadata.js` e `src/lib/video-pages.js` (com o `aspect` de cada vídeo); `/videos` e as páginas de vídeo montadas por `src/lib/videosHub.ts`, regras do navegador em `src/lib/videosShelf.ts` |
   ```
4. No fim do parágrafo que começa por "Filtro que só muda a query string da mesma página" (depois de "…se a URL já saiu da lista, a gravação some."), acrescente:
   ```
   A grade de `/videos` (`VideosBrowser`) guarda a loja escolhida em `?loja=` do mesmo jeito. A leitura e
   a gravação da URL das duas ficam em `src/components/ui/useListUrl.tsx` (`isOnList` e `urlSearchOf` em
   `src/lib/listUrl.ts`), e a troca animada, em `src/components/ui/shelfTransition.ts`, fora do
   `src/lib/viewTransition.ts`, que componentes servidor importam: o `flushSync` só existe no cliente.
   ```
5. Em "Component layers", depois do item de `src/components/reviews/`, acrescente:
   ```
   - `src/components/videos/` — `/videos` e as páginas de vídeo: `VideoCard` (o cartão vertical, também nos Últimos vídeos da home), `VideoRow` (as filas: os Últimos vídeos da home, o canal e Mais vídeos), `VideoFeatured` (o destaque), `VideosBrowser` (os chips das lojas, a grade e o `?loja=`), `VideoChannelRow` e `VideoChannelStrip` (o canal e o "Inscrever-se no canal"), `VideoPlayer` (o player no formato do `aspect`), `VideoSourceCard` (a origem e o botão da loja) e `TrackedVideosLink`/`VideoPageLink` (`videos_route_click`). Os dados, montados no servidor, ficam em `src/lib/videosHub.ts`; as regras que o navegador usa, em `src/lib/videosShelf.ts`. A trilha visível das páginas de lista e de vídeo é o `PageTrail` (`src/components/ui/`).
   ```
6. Na lista "Os dados saem do servidor" da seção "Home (D2)", troque
   ```
     - `dicasOffers.ts` e `youtube.ts`: sem oferta com foto, o card do Dicas & Ofertas volta a ser só o
       link; sem vídeo, a seção some. Não há ofertas reserva.
   ```
   por
   ```
     - `dicasOffers.ts` e `youtube.ts`: sem oferta com foto, o card do Dicas & Ofertas volta a ser só o
       link; sem vídeo, a seção some. Não há ofertas reserva. O vídeo do canal que tem página no site
       (`/videos/<slug>`) abre a página (`getChannelRow`, de `videosHub.ts`), e a seção tem o "Ver todos
       os vídeos".
   ```
7. Na seção "Styling", no fim do parágrafo que começa por "Na estante de `/reviews`, o `ReviewsBrowser` anima a troca da lista" (depois de "…continua capturando a página inteira."), acrescente:
   ```
   A grade de `/videos` troca de loja do mesmo jeito, e os cartões de vídeo levam
   `data-vt-name="video-player-<slug>"` na miniatura: a moldura do player da página do vídeo tem o mesmo
   nome no HTML, e a miniatura voa até ela. O HTML de `/videos` não leva nenhum nome.
   ```
8. Na tabela "Pages", depois da linha de `/reviews/loja/[brand]`, acrescente:
   ```
   | `/videos` | `src/app/(pt)/videos/page.tsx` (o destaque, a grade com os chips das lojas e os últimos do canal; dados em `src/lib/videosHub.ts`) |
   | `/videos/[slug]` | `src/app/(pt)/videos/[slug]/page.tsx` (a página de exibição: o player no formato do `aspect` logo depois do h1, o painel e Mais vídeos; o `VideoObject` e o sitemap de vídeo não mudam) |
   ```

- [ ] **Step 9: `docs/GUIA-EDITORIAL-VIDEOS.md`**

1. Na lista da seção 2, depois de `- duração, quando conhecida;`, acrescente `- formato: vertical (Short), deitado ou quadrado;`.
2. Na seção 3, troque `3. criar uma definição única em `src/lib/video-pages.js`;` por `3. criar uma definição única em `src/lib/video-pages.js`, com o `aspect` (ver 3.1);`.
3. Depois do parágrafo "O build não consulta a API do YouTube. Dados ausentes fazem a validação falhar." (fim da seção 3), acrescente:

````markdown

### 3.1 O formato (`aspect`)

Toda definição em `src/lib/video-pages.js` leva `aspect`, que o player da página e o destaque de
`/videos` seguem:

- `vertical`: Short do YouTube (9:16);
- `horizontal`: vídeo comum do YouTube (16:9);
- `square`: MP4 quadrado do site. Um MP4 vertical ou deitado usa `vertical` ou `horizontal`.

O build não consulta a rede, então o campo é editorial. Para conferir um vídeo do YouTube antes de
publicar:

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://www.youtube.com/shorts/<id>
```

`200` é Short (`vertical`); `303`, que redireciona para `/watch`, é vídeo comum (`horizontal`). Num MP4,
confira largura e altura do arquivo:

```bash
ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 arquivo.mp4
```

O `validate:video` falha sem o campo ou com outro valor.
````

4. Na seção 6, depois de "Não colocar carrossel, loop decorativo ou outro player antes do vídeo principal.", acrescente:

```markdown

No site, o player segue o `aspect` (vertical até `min(80svh, 720px)` de altura, deitado na largura do
conteúdo, quadrado até 3xl) e vem logo depois do H1. Depois dele ficam o painel (Sobre este vídeo, a
origem com o botão da loja e a faixa do canal) e "Mais vídeos". O `test:build-output` confere a ordem em
todas as páginas.
```

5. No fim do arquivo, acrescente:

```markdown

## 10. Onde o vídeo aparece em /videos e na home

- **Em `/videos`,** toda página de vídeo entra na grade, do mais novo ao mais antigo pelo `uploadDate`; o
  mais novo também é o destaque do topo.
- **Os chips** são as lojas ativas com 2 ou mais vídeos, pela loja (`affiliate`) do artigo de origem. O
  vídeo de receita, de artigo sem loja ou de loja com um vídeo só aparece em "Todos".
- **Na página do vídeo,** o botão "Ver o código da <loja>" aparece quando o artigo de origem tem loja
  ativa, e "Mais vídeos" mostra primeiro os da mesma loja, depois os mais novos.
- **Na home e em "Últimos do canal",** entram os 6 uploads mais novos do canal (API do YouTube); o que já
  tem página no site leva a ela.
```

- [ ] **Step 10: Commit da documentação**

```bash
git add CLAUDE.md docs/GUIA-EDITORIAL-VIDEOS.md
git commit -F - <<'EOF'
docs: /videos e as páginas de vídeo no CLAUDE.md e no guia de vídeo

Páginas, camadas de componentes, o test:videos-hub, a URL e a troca animada
comuns da estante e de /videos, o formato (aspect) e como conferir antes de
publicar, e onde o vídeo aparece em /videos e na home.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

---

## Conferência final (controlador)

Depois das 6 tasks e das revisões de cada uma (Claude e Meta Muse):

1. **No navegador**, com `next start` sobre a build final (`emcasacomcecilia-prod` no `.claude/launch.json`), a 375, 768 e 1280 px:
   - `/videos`: o topo, o destaque deitado (o skincare), a grade em 2, 3, 4 e 5 colunas, os chips (degradê só no celular e só com chip escondido), o canal quando a API responde;
   - os chips com Voltar e Avançar (`/videos?loja=damie` ↔ "Todos"), a troca animada, e um Voltar para a home com um clique logo depois, que não grava `?loja=` lá;
   - três páginas de vídeo: uma vertical (`poltrona-damie-para-maes-e-amamentacao`), uma deitada (`minha-primeira-lava-e-seca-samsung-13kg-video`) e uma quadrada (`como-usar-cupom-ceciemcasa-i-wanna-sleep`): o player sem faixa preta nos Shorts e sem passar da altura da tela, o painel ao lado no desktop (vertical e quadrado) e embaixo no celular, o botão da loja, "Mais vídeos";
   - a miniatura voando para o player (da grade, do destaque, do canal, de "Mais vídeos" e da home);
   - teclado: Tab pelos chips, pelo destaque (um ponto só para o vídeo), pela grade e pelas filas (o cartão meio escondido entra inteiro);
   - "reduzir movimento" ligado: tudo parado e funcionando;
   - console sem erros;
   - `/reviews` e uma subpágina de loja iguais a antes (chips, trilha, busca, troca animada).
2. **Build completo** verde no HEAD final.
3. **Revisão final do branch** (Claude no modelo mais capaz e Meta Muse), recibo em G.
4. O deploy vai com o resto da D2.2, só quando o Bruno decidir. Depois do deploy, acompanhar o relatório de vídeos do Search Console (seção 8 do guia).
