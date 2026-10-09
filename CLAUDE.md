# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev server on http://localhost:3000
npm run build    # Production build (run before deploy)
npm run start    # Production server (PORT env var or 3000)
npm run lint     # ESLint
```

Além disso há verificações versionadas — a afirmação anterior de que "não há suíte de testes"
estava desatualizada:

```bash
npm run typecheck            # tsc --noEmit — gate mais rápido que o build
npm run validate:content     # modelo de conteúdo
npm run validate:video       # metadados e páginas de exibição de vídeo
npm run test:internal-links  # domínio, normalização e derivação de marca
npm run test:coupon-offer-modes
npm run test:coupon-translations  # lojas em outros idiomas: texto traduzido, códigos e links do PT
npm run validate:yesstyle    # data/coupons/yesstyle.json; falha com oferta ativa vencida (data em UTC)
npm run test:analytics-gate  # allowlist de hosts do GA4
npm run test:home-stores     # vitrine da home, "Acabou de sair" e subpáginas /reviews/loja/<slug>
npm run test:home-events     # datas comerciais: content/home-events.json, a faixa e a página da data
npm run test:home-lower-sections  # receitas, Explore a casa, ofertas (e o feed) e vídeos da home, e que o page.js monta Ofertas e Vídeos
npm run test:home-route-tracking  # placements do home_route_click e o link das abas da vitrine (<a> comum)
npm run test:html-lang       # depois do build: <html lang> de cada rota
npm run test:build-output    # depois do build: CSS de CJK e da gaveta, sitemap, llms.txt, <head> das lojas traduzidas e dos artigos de família, SEO das 10 páginas da YesStyle, dock, sidebar e interface dos artigos no idioma de cada um, textos que citam o CECILIA010, a home, os cards de /reviews, as subpáginas de loja e as páginas de data (imagem e JSON-LD) e o noindex do /categorias
```

`npm run typecheck` antes do `build`: enumera tudo de uma vez e é muito mais rápido.

⚠️ **Editou `content/reviews/*.json` ou `content/receitas/*.json` à mão?** O app não lê esses
arquivos direto em dev — ele lê `src/lib/generated/content-index.ts`, um índice gerado. Rode
`node scripts/content/build-index.mjs` antes de conferir a mudança no `localhost:3000` (o
`npm run build` já roda isso sozinho; só o `npm run dev` não regenera automaticamente).

## Architecture

**Next.js 16.1.4 App Router + SSR** — do NOT add `output: 'export'` to `next.config.mjs`; Hostinger Node.js Web App requires SSR.

### File mix: JS vs TSX
- `src/app/**` — JavaScript (`.js`) in the older routes; newer ones such as `cupons/` and `[locale]/` are TypeScript (`.tsx`/`.ts`)
- `src/components/sections/**` — TypeScript (`.tsx`)
- `src/components/ui/**` — TypeScript (`.tsx`)
- `src/lib/data.ts` — TypeScript (adaptador legado do conteúdo; ver Data layer)

### Path alias
`@/*` resolves to `src/*` (configured in `jsconfig.json`).

### Data layer

⚠️ **`src/lib/data.ts` não é mais a fonte de verdade do conteúdo.** A migração para JSON já
aconteceu:

| Conteúdo | Onde vive |
|---|---|
| Receitas e reviews | `content/receitas/*.json`, `content/reviews/*.json` + `_manifest.json` |
| Tipos do conteúdo | `src/lib/content/types.ts` |
| Cupons | `src/lib/couponsData.ts` (união `discount-code \| affiliate-link`) |
| Cupons em outros idiomas (hoje só a SHEIN) | `src/lib/couponTranslations.ts`: só texto; códigos, datas e campanhas vêm do cupom em PT. Textos da interface da página de loja em `src/components/coupons/couponStoreCopy.tsx` |
| YesStyle: código de recompensa e cupons da loja | `data/coupons/yesstyle.json`, lido por `src/lib/yesstyleCoupons.ts`. Textos dos 10 idiomas em `src/components/coupons/yesstyleCopy.ts`, juntados aos dados em `yesstylePage.ts`. Manutenção na seção 3 de `docs/MANUTENCAO-MENSAL.md` |
| Locales e clusters i18n | `src/lib/i18n/locales.ts` e `src/lib/i18n/clusters/` |
| Vídeos | `src/lib/video-metadata.js` e `src/lib/video-pages.js` |
| Links da marca e redes sociais | `src/lib/brandLinks.ts` |

`src/lib/data.ts` ainda existe como adaptador legado: expõe `recipes`, `reviews` e
`publishedReviews` a partir do índice gerado, os tipos legados e helpers de receita e review.
Não acrescentar conteúdo editorial ali.

⚠️ **Arquivo `'use client'` não importa valores de `@/lib/data`** (`import type` é apagado na
compilação e não conta). O módulo carrega `src/lib/generated/content-index.ts` — todas as receitas
e reviews, ~2 MB minificado — e o webpack não separa o índice dos helpers: um único import
num componente cliente põe o índice inteiro no bundle de toda página que usa o componente (até
05/10/2026 o Navbar e o Footer faziam isso e cada página baixava ~2,8 MB de JS). O prefetch dos
`<Link>` espalha o efeito: ele baixa os chunks cliente da rota de destino, então o índice também
vai, em segundo plano, para toda página com link visível para uma página afetada. O cliente recebe
dados por props de um componente servidor ou de módulos sem o índice, como `src/lib/brandLinks.ts`.
Logo depois do `next build`, o `npm run build` roda `scripts/test-client-bundle.mjs`
(`npm run test:client-bundle`), que falha se algum chunk do navegador trouxer o índice.

Filtro que só muda a query string da mesma página (ex.: `/receitas`, `/reviews`) não usa
`router.replace`/`push`: o router baixa de novo o payload RSC da página — com todos os cards — a
cada clique. `/receitas` usa `window.history.replaceState`, que o Next sincroniza com o
`useSearchParams` sem ida ao servidor. `/reviews` usa `pushState` e lê a categoria da URL com
`useSyncExternalStore`; o `useSearchParams` fica num componente vazio com Suspense próprio, só para
avisar das mudanças, e assim o prerender não para no Suspense e o HTML estático traz os cards.

### Mídia (imagens e vídeos) — biblioteca CDN em migração

Existe uma frente em andamento (`docs/GUIA-MIDIA-EDITORIAL.md` e
`docs/plans/2026-09-06-biblioteca-midia-deploy.md`) migrando `public/images` e `public/videos`
para `https://cdn.emcasacomcecilia.com`, resolvido só na entrega. **Regra que não muda para
quem escreve conteúdo:** continue usando caminhos locais nos JSONs (`/images/reviews/marca/...`).
Não reescrever artigos com URL de CDN nem alterar chaves de `localVideoMetadata`/`video-pages` —
o resolvedor aplica o mapa exato (`src/lib/generated/media-delivery-map.json`) só na entrega, sem
tocar no conteúdo. Upload, verificação e deploy de mídia são scripts próprios em `scripts/media/`
(ver o guia) e não devem ser executados a partir de uma tarefa editorial comum.

### Classificação de Guias & Análises

Antes de criar ou revisar `content/reviews/*.json`, ler
`docs/GUIA-EDITORIAL-GUIAS-ANALISES.md`.

| Campo | Autoridade |
|---|---|
| `category` | classe editorial e navegação; enum de quatro valores |
| `reviewKind` | capacidades estruturais do template |
| `type` | rótulo público granular e livre |

Não inferir `category` de `type`, `reviewKind`, marca ou `pros/cons`, e não criar um campo
paralelo `editorialClass`. O Aliv Head Gel IWS é guia porque usa fontes públicas sem experiência
própria declarada; o Cobertor IWS Igloo é produto/experiência porque registra produto recebido,
vídeo, primeiras impressões e uso noturno.

### Artigos em outros idiomas

- Uma família é o conjunto de JSONs com a mesma `translationKey`, um por idioma, cada um com
  `locale` explícito. A URL sai sozinha: `/reviews/<slug>` em português e `/<locale>/reviews/<slug>`
  nos outros idiomas. Não se cria rota, hreflang nem entrada em `src/lib/i18n/clusters/` para isso.
- `npm run test:review-i18n`, que roda na build, exige as 10 versões de toda família, com o mesmo
  `affiliate` e o mesmo `coupon`, e o link da página da loja no idioma do artigo: `/cupons/<marca>`
  em português e `/<locale>/coupons/<marca>` nos outros.
- Versão fora do PT não leva link da SHEIN Brasil (`br.shein.com` nem os links de oferta e
  campanha do cupom em PT): o `test:review-i18n` barra, e no artigo da SHEIN o `cta.url` tem de ser
  o link principal neutro da página da loja (`getLocalizedCoupon('shein', locale).offerUrl`).
- A interface do artigo que não é conteúdo (selo do tipo, veredito e nota, ficha do produto, bloco de
  vídeo, galeria, barra de compartilhar) tem o texto nos 10 idiomas em `articleCopy.ts`,
  `galleryCopy.ts` (ambos em `src/components/review/`) e `shared/shareCopy.ts`; o dock e a sidebar
  seguem em `sidebarCopy.ts`. Texto novo no artigo vai nesses arquivos, nunca solto no JSX. O
  `test:review-i18n` barra campo igual ao português (salvo a lista de palavras iguais nas duas
  línguas) e o `test:build-output` barra texto em português nas páginas fora do PT e confere o
  veredito da sidebar e o `<head>` (canonical e hreflang dos 10 idiomas, x-default no inglês) de
  todo artigo de família. O `type` da review (rótulo do tipo no cabeçalho, na vitrine por idioma e
  nos relacionados) é conteúdo, mas sai no idioma da versão: o `test:review-i18n` barra `type`
  igual ao do PT, salvo "Editorial" em en e es (`TYPE_SAME_AS_PORTUGUESE`), e, em ja, ko e zh,
  `type` só em letras latinas. Os termos de cada idioma estão na tabela do Job 4 do vault (seção 3,
  item 4). Os cards de artigos relacionados seguem fora dessa conferência.
- A vitrine em português (`/reviews`, home e busca) só mostra artigos em português, pelo `locale`.
  As versões em outros idiomas seguem com `hideFromPortugueseListings: true`, que o
  `validate:content` cobra nas famílias registradas em `clusters/yesstyle.ts`.
- A seção de FAQ vira o `FAQPage` do schema pelo título, que precisa estar em `isFaqHeading`
  (`src/lib/review-template-props.js`); o Job 4 do vault traz o título de cada idioma. O
  `test:review-i18n` confere o formato "pergunta? resposta" de cada item e exige a seção em todas
  as versões quando a família tem FAQ.
- O processo editorial (pauta, redação, revisão, JSON e gates) está no vault
  `docs/Memoria de Artigos/memreview`, a partir de `00_Sistema/AI-PRIMING-INDEX.md`.

### Component layers
- `src/components/ui/` — Shared building blocks: `focusRing.ts` (`FOCUS_RING`, `FOCUS_RING_ON_DARK`), `ScrollRow` and `CategoryIcon`.
- `src/components/sections/` — Page sections: the D2 home (`HomeStoreStories`, `HomeCeciliaPanel`, `HomeLatest`, `HomeEvent`, `PopularRecipes`, `MyLinks`, `Offers`, `CTA`, the last three wrapped in `HomeSection`) and `EventHubPage`, which reads the data and wraps `EventHubView` (the date page itself, rendered by `test:home-events`; it must not import `next/font`, which does not run under tsx). `Navbar` and `Footer` live in `src/components/`.
- Each route group has its own root layout (`src/app/(pt)/layout.js`, `src/app/(en)/layout.tsx`… and `src/app/[locale]/layout.tsx`). All of them render `RootLayoutShell` (`src/components/RootLayoutShell.tsx`): `Navbar → {children} → Footer`.

### Artigos: sumário no celular

- `ReviewNotebookTemplate` monta o artigo. A seção atual e o progresso de leitura vêm de
  `useReadingPosition`, que alimenta o `ReviewSidebar` (desktop) e o `ReviewMobileBottomBar`
  (celular: dock `sticky` e gaveta do sumário num `<dialog>` aberto com `showModal()`).
- Os textos dos dois, nos 10 idiomas, ficam em `src/components/review/sidebarCopy.ts`; o rótulo de
  cópia do código vem de `couponCopyLocale.ts`, e o botão de copiar é o `CopyCodeButton` de
  `CouponActions.tsx` nos dois. `npm run test:build-output` confere a sidebar de cada artigo no
  idioma dele.
- O dock e a gaveta ficam direto no `<body>`: dentro do fundo editorial, `.editorial-ambient-bg > *`
  troca o `sticky` por `relative`. `npm run test:build-output` confere isso em todos os artigos.
- Com a gaveta aberta, o resto da página fica inerte. O que precisa de foco nesse momento vai
  dentro do `<dialog>`, como o fallback de cópia de `clipboardUtils.ts`.
- Texto que é item flex (bullets, prós e contras) precisa de `min-w-0` para quebrar endereços
  longos; o contêiner do artigo já tem `wrap-break-word`.

### Home (D2)

- `src/app/(pt)/page.js` monta, nesta ordem:
  - a vitrine (`HomeStoreStories`, com o painel da Cecília e uma aba por loja ativa de
    `couponsData.ts`);
  - o "Acabou de sair" (`HomeLatest`);
  - a data comercial (`HomeEvent`, só em campanha);
  - receitas, Explore a casa, ofertas e vídeos.

  O `page.js` dá o espaço de baixo das seções de cima; as de baixo trazem o delas: a faixa de
  receitas no próprio `<section>`, as outras pelo `HomeSection`.
- Os dados saem do servidor:
  - `src/lib/homeStores.ts`: abas, artigos da loja pelo `affiliate`, "Acabou de sair" e as
    subpáginas `/reviews/loja/<slug>` das lojas com mais de 3 artigos;
  - `src/lib/homeEvents.ts` com `content/home-events.json`: as datas comerciais. Como pôr uma data
    no ar está em "Para pôr a Black Friday no ar", no fim de
    `docs/superpowers/plans/2026-10-08-home-d2-fase-4.md`;
  - `dicasOffers.ts` e `youtube.ts`: sem o feed ou sem vídeo, a seção some. Não há ofertas reserva.
- Fila de cards que rola na horizontal usa o `ScrollRow` (`src/components/ui/ScrollRow.tsx`): com o
  foco do teclado, o card meio escondido entra inteiro na tela. As bolinhas da vitrine ficam de
  fora: elas já centralizam a loja escolhida.
- Onde um artigo aparece na home está na seção 10 do `docs/GUIA-EDITORIAL-GUIAS-ANALISES.md`.
- A subpágina de loja e a página da data compartilham com imagem (a da página de cupom da loja; na
  data, a capa do artigo mais novo) e levam JSON-LD de lista (`CollectionPage` e `BreadcrumbList`),
  tudo por `src/lib/pageSeo.ts`, que a página de cupom também usa para a imagem da loja.

### Páginas de loja (cupons)

- Loja com código tem `testNote` em `couponsData.ts`: o recorte diz "Cupom testado em" com o
  `lastVerified`, a página ganha a seção "Como testamos o cupom" e o `WebPage` leva `lastReviewed`
  e `reviewedBy` (o site, porque o teste é da equipe). SHEIN e YesStyle seguem com "Conferido em".
  A data só avança com teste real, na revisão mensal feita antes da virada do mês.
- `src/components/coupons/CouponStorePage.tsx` (lojas de `couponsData.ts`) e
  `src/components/YesStyleCouponPage.tsx` usam a mesma moldura,
  `src/components/coupons/StoreLayout.tsx`, e o `CouponDock` de `CouponActions.tsx`: no celular,
  o dock aparece depois que o recorte `#cupom` sobe e sai da tela.
- O CECILIA010 é código de recompensa, não cupom: vai no campo Reward Code e soma com os cupons
  da própria YesStyle. Nenhum texto ou `aria-label` pode chamá-lo de cupom nem falar em usá-lo
  "com outros cupons". Os rótulos de cópia compartilhados dizem "código" (`couponCopyLocale.ts`); o
  que nomeia o tipo do código lê da loja em `couponsData.ts`: o `codeKind: 'reward'` no dock dos
  artigos, nos 10 idiomas, e o `offerTypeLabel` nos cards e na ItemList de `/cupons`.
  `npm run test:build-output` confere toda página que cita o código, inclusive o nome dos cards que
  o mostram e a home, que mostra o código no painel da YesStyle.
- O 4CW5Y da SHEIN é código de indicação da SHEIN Brasil: pesquisa-se no aplicativo, não se cola no
  checkout, e também não é cupom. `getStoreCodeKind` (`couponsData.ts`) dá o tipo do código de um
  artigo (`reward`, `referral` ou nenhum); o dock, a sidebar e o resumo dos guias o usam por
  `getCodeTitle` e `getCodeHints` (`sidebarCopy.ts`) e `inlineReferral` (`couponCopyLocale.ts`),
  com o termo que a página da loja já usa em cada idioma e, fora do PT, o aviso de que o código é
  da SHEIN Brasil. O `test:review-i18n` confere os rótulos nos 10 idiomas e o `test:build-output`,
  em toda página, o tipo no dock e na sidebar.

### Styling
Tailwind CSS v4 via `@import "tailwindcss"` in `globals.css`. Custom tokens defined in `@theme inline {}` block — use these instead of arbitrary values:

| Token | Value | Use |
|-------|-------|-----|
| `verde-escuro` | `#1a4d2e` | Primary / headings |
| `laranja` | `#ff6b35` | Secondary / CTAs |
| `amarelo` | `#ffd700` | Accent |
| `creme` | `#fef9f3` | Light backgrounds |
| `shadow-soft/medium/large` | — | Card shadows |

Font is Montserrat loaded via `next/font/google` in `RootLayoutShell.tsx` as `--font-montserrat`. Use `font-sans` or `font-heading` Tailwind utilities.

Código de cupom que pode quebrar linha usa `break-all text-balance`: as linhas saem do mesmo
tamanho, sem sobrar uma ou duas letras sozinhas. O `text-balance` não age sobre `wrap-anywhere`.

Animação que respeita "reduzir movimento" leva `motion-safe:`. As classes soltas do `globals.css`
(`.animate-slide-up`, `.animate-float`…) não são utilitários do Tailwind 4 e não aceitam variante:
`motion-safe:animate-slide-up` não gera CSS. Use o valor arbitrário com o `@keyframes` delas, como
`motion-safe:animate-[slide-up_0.5s_ease-out_backwards]` (o `backwards` segura o card escondido durante o
`animation-delay`).

### Pages
| Route | File |
|-------|------|
| `/` | `src/app/(pt)/page.js` |
| `/receitas` | `src/app/(pt)/receitas/page.js` |
| `/receitas/[slug]` | `src/app/(pt)/receitas/[slug]/page.js` |
| `/reviews` | `src/app/(pt)/reviews/page.js` |
| `/reviews/loja/[brand]` | `src/app/(pt)/reviews/loja/[brand]/page.tsx` (só lojas ativas com mais de 3 artigos) |
| `/black-friday` | `src/app/(pt)/black-friday/page.tsx` (`EventHubPage`; 404 enquanto não houver edição em `content/home-events.json`) |
| `/cupons` | `src/app/(pt)/cupons/page.tsx` |
| `/cupons/[brand]` | `src/app/(pt)/cupons/[brand]/page.tsx` (YesStyle has its own page in `cupons/yesstyle/`) |
| `/<locale>/coupons/[brand]` | `src/app/[locale]/coupons/[brand]/page.tsx`, only for stores in `couponTranslations.ts`; the static YesStyle routes win |
| `/cupons/yesstyle`, `/<locale>/coupons/yesstyle` | `src/app/(pt)/cupons/yesstyle/page.tsx` and one static route per language in `src/app/(<locale>)/<locale>/coupons/yesstyle/page.tsx`; all render `src/components/YesStyleCouponPage.tsx` |
| `/sobre` | `src/app/(pt)/sobre/page.js` |
| `/contato` | `src/app/(pt)/contato/page.js` |
| `/faqs` | `src/app/(pt)/faqs/page.js` |

## Deploy (Hostinger)

A fonte de verdade é o `docs/DEPLOY-GUIDE.md`, que deve ser relido antes de cada deploy. Desde
13/08/2026 o único fluxo é o build gerenciado da Hostinger, supervisionado:

1. Deploy só com decisão explícita do Bruno, um por vez.
2. Num clone limpo da `main`, pelo PowerShell: `npm run deploy:prepare`. Ele confere o `tar` (tem
   de ser o bsdtar do Windows), a branch e o worktree, faz um build local de verificação e gera o
   archive atestado.
3. Recalcular o SHA-256 do archive, enviá-lo pelo MCP da Hostinger e esperar o build `completed`.
4. `npm run deploy:finish -- --target-sha … --deploy-uuid … --build-uuid …`; depois a captura
   `CAPTURE_ONLY` (`hostinger-wire-probe.yml`), o smoke e o IndexNow.

O site roda como Node.js Web App com SSR, não como hospedagem estática. O build que vai ao ar é
sempre o da Hostinger: nunca subir build feito no Windows. O `DEPLOY-HOSTINGER-NODEJS.md` (Git
Deploy e build por SSH) e o fluxo SSH por CI estão suspensos e só valem como histórico.
