# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev server on http://localhost:3000
npm run build    # Production build (run before deploy)
npm run start    # Production server (PORT env var or 3000)
npm run lint     # ESLint
```

No test suite is configured. After edits, validate with `npm run build` to catch type/build errors.

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
`src/lib/data.ts` exports typed interfaces and mock arrays for recipes, categories, offers, social media, and link items. **All content data lives here** until a CMS is integrated. Helper functions `formatPrice()` and `totalFollowers()` are also here.

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
