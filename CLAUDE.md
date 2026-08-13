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
npm run test:analytics-gate  # allowlist de hosts do GA4
npm run test:html-lang
```

`npm run typecheck` antes do `build`: enumera tudo de uma vez e é muito mais rápido.

## Architecture

**Next.js 16.1.4 App Router + SSR** — do NOT add `output: 'export'` to `next.config.mjs`; Hostinger Node.js Web App requires SSR.

### File mix: JS vs TSX
- `src/app/**` — JavaScript (`.js`)
- `src/components/sections/**` — TypeScript (`.tsx`)
- `src/components/ui/**` — TypeScript (`.tsx`)
- `src/lib/data.ts` — TypeScript (source of truth for all data/interfaces)

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
| Locales e clusters i18n | `src/lib/i18n/locales.ts` e `src/lib/i18n/clusters/` |
| Vídeos | `src/lib/video-metadata.js` e `src/lib/video-pages.js` |

`src/lib/data.ts` ainda existe para categorias, redes sociais e links, com `formatPrice()` e
`totalFollowers()`. Não acrescentar conteúdo editorial ali.

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
- `src/components/sections/` — Page sections (`TopBar`, `Navbar` is at `src/components/Navbar.js`, `Hero`, `MainCategories`, `Categories`, `PopularRecipes`, `MyLinks`, `Offers`, `CTA`).
- Layout order in `src/app/layout.js`: `TopBar → Navbar → {children} → Footer`.

### Styling
Tailwind CSS v4 via `@import "tailwindcss"` in `globals.css`. Custom tokens defined in `@theme inline {}` block — use these instead of arbitrary values:

| Token | Value | Use |
|-------|-------|-----|
| `verde-escuro` | `#1a4d2e` | Primary / headings |
| `laranja` | `#ff6b35` | Secondary / CTAs |
| `amarelo` | `#ffd700` | Accent |
| `creme` | `#fef9f3` | Light backgrounds |
| `shadow-soft/medium/large` | — | Card shadows |

Font is Montserrat loaded via `next/font/google` in `layout.js` as `--font-montserrat`. Use `font-sans` or `font-heading` Tailwind utilities.

### Pages
| Route | File |
|-------|------|
| `/` | `src/app/page.js` |
| `/receitas` | `src/app/receitas/page.js` |
| `/receitas/[id]` | `src/app/receitas/[id]/page.js` |
| `/reviews` | `src/app/reviews/page.js` |
| `/sobre` | `src/app/sobre/page.js` |
| `/contato` | `src/app/contato/page.js` |
| `/faqs` | `src/app/faqs/page.js` |

## Deploy (Hostinger)

1. `npm run build` locally
2. `git push origin main`
3. On Hostinger SSH: `npm install && npm run build`
4. Serve via Node.js Web App (not static hosting)

Full details in `DEPLOY-HOSTINGER-NODEJS.md`.
