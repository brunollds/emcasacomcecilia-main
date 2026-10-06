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
npm run test:analytics-gate  # allowlist de hosts do GA4
npm run test:html-lang       # depois do build: <html lang> de cada rota
npm run test:build-output    # depois do build: CSS de CJK e da gaveta, sitemap, llms.txt, <head> das lojas traduzidas e dock dos artigos
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

### Component layers
- `src/components/ui/` — Primitive building blocks (`Card`, `Button`, `Badge`). Use `clsx` for className merging here.
- `src/components/sections/` — Page sections (`Hero`, `PopularRecipes`, `CouponStrip`, `ReviewsShowcase`, `CTA`…). `Navbar` and `Footer` live in `src/components/`.
- Each route group has its own root layout (`src/app/(pt)/layout.js`, `src/app/(en)/layout.tsx`… and `src/app/[locale]/layout.tsx`). All of them render `RootLayoutShell` (`src/components/RootLayoutShell.tsx`): `Navbar → {children} → Footer`.

### Artigos: sumário no celular

- `ReviewNotebookTemplate` monta o artigo. A seção atual e o progresso de leitura vêm de
  `useReadingPosition`, que alimenta o `ReviewSidebar` (desktop) e o `ReviewMobileBottomBar`
  (celular: dock `sticky` e gaveta do sumário num `<dialog>` aberto com `showModal()`).
- O dock e a gaveta ficam direto no `<body>`: dentro do fundo editorial, `.editorial-ambient-bg > *`
  troca o `sticky` por `relative`. `npm run test:build-output` confere isso em todos os artigos.
- Com a gaveta aberta, o resto da página fica inerte. O que precisa de foco nesse momento vai
  dentro do `<dialog>`, como o fallback de cópia de `clipboardUtils.ts`.
- Texto que é item flex (bullets, prós e contras) precisa de `min-w-0` para quebrar endereços
  longos; o contêiner do artigo já tem `wrap-break-word`.

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

### Pages
| Route | File |
|-------|------|
| `/` | `src/app/(pt)/page.js` |
| `/receitas` | `src/app/(pt)/receitas/page.js` |
| `/receitas/[slug]` | `src/app/(pt)/receitas/[slug]/page.js` |
| `/reviews` | `src/app/(pt)/reviews/page.js` |
| `/cupons` | `src/app/(pt)/cupons/page.tsx` |
| `/cupons/[brand]` | `src/app/(pt)/cupons/[brand]/page.tsx` (YesStyle has its own page in `cupons/yesstyle/`) |
| `/<locale>/coupons/[brand]` | `src/app/[locale]/coupons/[brand]/page.tsx`, only for stores in `couponTranslations.ts`; the static YesStyle routes win |
| `/sobre` | `src/app/(pt)/sobre/page.js` |
| `/contato` | `src/app/(pt)/contato/page.js` |
| `/faqs` | `src/app/(pt)/faqs/page.js` |

## Deploy (Hostinger)

1. `npm run build` locally
2. `git push origin main`
3. On Hostinger SSH: `npm install && npm run build`
4. Serve via Node.js Web App (not static hosting)

Full details in `DEPLOY-HOSTINGER-NODEJS.md`.
