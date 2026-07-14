# Reorganização da Home (Reviews 2×4) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reviews viram a primeira seção de conteúdo da home, em grid 2×4 com vaga garantida por afiliado; fileira "Receitas Novas" sai da home.

**Architecture:** Next.js 16 App Router SSR. Conteúdo vive em `content/reviews/*.json`, compilado por `scripts/content/build-index.mjs` para `src/lib/generated/content-index.ts` (roda em todo `npm run build`; o gerador copia o JSON inteiro, sem whitelist de campos). `src/lib/data.ts` tipa e exporta `publishedReviews`. Os componentes de seção ficam em `src/components/sections/*.tsx`.

**Tech Stack:** Next.js 16.1.4, TypeScript (sections) + JS (app), Tailwind v4, lucide-react.

**Spec:** `docs/superpowers/specs/2026-07-14-home-reorg-reviews-design.md`

**Verificação do projeto:** não há suíte de testes (CLAUDE.md do projeto). Validar com `npm run typecheck` + `npm run build`. TDD não se aplica; cada task termina com typecheck/build verde e commit.

**Modelos sugeridos por task:** Task 1 e 3 e 4 = Haiku (mecânicas); Task 2 = Sonnet (lógica + layout).

---

### Task 1: Campos novos no modelo + etiquetar artigos CECI

**Files:**
- Modify: `src/lib/data.ts` (interface `Review`, ~linha 177–256)
- Modify: `src/lib/content/types.ts` (interface `Review`, ~linha 298–369)
- Modify: 10 arquivos JSON em `content/reviews/` (lista abaixo)
- Regenerate: `src/lib/generated/content-index.ts` (via script — NUNCA editar à mão)

- [ ] **Step 1: Adicionar campos opcionais na interface `Review` de `src/lib/data.ts`**

Logo após a linha `hideFromListings?: boolean;` (~linha 192), adicionar:

```ts
  homeFeatured?: boolean;
  affiliate?: string;
```

- [ ] **Step 2: Adicionar os mesmos campos na interface `Review` de `src/lib/content/types.ts`**

No bloco `// Taxonomia e flags`, logo após `hideFromListings?: boolean;` (~linha 364), adicionar:

```ts
  homeFeatured?: boolean;
  affiliate?: string;
```

- [ ] **Step 3: Adicionar campo `affiliate` nos 10 JSONs com cupom CECI**

Em cada arquivo abaixo, adicionar a propriedade `"affiliate"` no nível raiz do objeto, imediatamente após a propriedade `"coupon"`. Editar SOMENTE isso — não reformatar o arquivo.

Com `"affiliate": "dolce-gusto"`:
- `content/reviews/clube-dolce-gusto-como-funciona.json`
- `content/reviews/cupom-ceci-nescafe-dolce-gusto-como-usar.json`
- `content/reviews/dolce-gusto-e-confiavel.json`
- `content/reviews/dolce-gusto-maquinas-qual-escolher.json`
- `content/reviews/melhores-capsulas-dolce-gusto-2026.json`
- `content/reviews/promocao-dolce-gusto-55-caixas-mini-me-gratis.json`

Com `"affiliate": "nestle-nutre"`:
- `content/reviews/cupom-ceci-nestle-nutre-como-usar.json`
- `content/reviews/nestle-nutre-e-confiavel.json`
- `content/reviews/nestle-nutre-produtos-para-que-servem.json`
- `content/reviews/nutren-senior-zero-lactose-ficha-tecnica.json`

Exemplo (trecho antes → depois):

```json
"coupon": "CECI",
```
vira
```json
"coupon": "CECI",
"affiliate": "dolce-gusto",
```

- [ ] **Step 4: Regenerar o índice e conferir**

Run: `npm run content:index`
Expected: `ok content-index.ts (N receitas, 35 reviews)`

Run: `grep -c "\"affiliate\":" src/lib/generated/content-index.ts`
Expected: `10`

- [ ] **Step 5: Typecheck**

Run: `npm run typecheck`
Expected: sem erros.

- [ ] **Step 6: Commit**

```bash
git add src/lib/data.ts src/lib/content/types.ts content/reviews/*.json src/lib/generated/content-index.ts
git commit -m "feat: campos opcionais homeFeatured/affiliate em reviews + etiqueta afiliado nos artigos CECI"
```

---

### Task 2: ReviewsShowcase — seleção por afiliado + grid 2×4

**Files:**
- Modify: `src/components/sections/ReviewsShowcase.tsx`

- [ ] **Step 1: Substituir a seleção de reviews**

Substituir as linhas atuais dentro de `ReviewsShowcase()`:

```tsx
  const listedReviews = publishedReviews.filter((review) => !review.hideFromListings);
  const featuredReviews = sortReviewsByDateDesc(listedReviews).slice(0, 4);
```

por uma chamada `const featuredReviews = selectShowcaseReviews(publishedReviews);` e adicionar acima do componente (após `sortReviewsByDateDesc`):

```tsx
const COUPON_TO_AFFILIATE: Record<string, string> = {
  CECILIA12: 'damie',
  CECIEMCASA: 'i-wanna-sleep',
  CECILIA010: 'yesstyle',
};

type ShowcaseReview = (typeof publishedReviews)[number];

const getAffiliate = (review: ShowcaseReview): string | undefined =>
  review.affiliate ?? (review.coupon ? COUPON_TO_AFFILIATE[review.coupon] : undefined);

const SHOWCASE_SIZE = 8;

function selectShowcaseReviews(all: typeof publishedReviews): ShowcaseReview[] {
  const listed = sortReviewsByDateDesc(all.filter((review) => !review.hideFromListings));
  const selected: ShowcaseReview[] = [];
  const usedIds = new Set<number>();
  const coveredAffiliates = new Set<string>();

  const push = (review: ShowcaseReview) => {
    if (selected.length >= SHOWCASE_SIZE || usedIds.has(review.id)) return;
    selected.push(review);
    usedIds.add(review.id);
    const affiliate = getAffiliate(review);
    if (affiliate) coveredAffiliates.add(affiliate);
  };

  // 1. Fixadas manualmente
  listed.filter((review) => review.homeFeatured).forEach(push);

  // 2. Um artigo (o mais recente) por afiliado ainda não representado
  for (const review of listed) {
    const affiliate = getAffiliate(review);
    if (affiliate && !coveredAffiliates.has(affiliate)) push(review);
  }

  // 3. Completa com as mais recentes
  listed.forEach(push);

  return selected;
}
```

- [ ] **Step 2: Remover o tratamento de "primeiro card maior"**

No `.map()` dos cards:
- Remover a linha `const isFeatured = index === 0;`
- No `className` do wrapper da imagem, trocar o template condicional `${isFeatured ? 'aspect-[9/10] lg:aspect-[10/11]' : 'aspect-[5/6]'}` por `aspect-[5/6]` fixo.
- No `className` do `<h3>`, trocar o condicional `${isFeatured ? 'text-lg lg:text-2xl' : 'text-lg lg:text-xl'}` por `text-lg lg:text-xl` fixo.

- [ ] **Step 3: Grid 2×4 desktop + carrossel de 2 linhas no mobile**

Substituir o `className` do container dos cards (o div com `-mx-4 flex snap-x ...`):

```
-mx-4 grid grid-flow-col grid-rows-2 snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid-flow-row md:grid-rows-none md:grid-cols-4 md:overflow-visible md:px-0 md:pb-0 lg:gap-6 [&::-webkit-scrollbar]:hidden
```

(Muda: `flex` → `grid grid-flow-col grid-rows-2`; desktop volta a fluxo de linhas com `md:grid-flow-row md:grid-rows-none md:grid-cols-4`; sai o `lg:grid-cols-[1.35fr_1fr_1fr_1fr]`.)

O `className` dos cards (`w-[230px] flex-shrink-0 snap-start ... md:w-auto`) permanece como está — largura fixa funciona em coluna de grid no mobile.

- [ ] **Step 4: Ajustar padding da seção (vira primeira seção de conteúdo)**

Trocar `<section className="bg-white pb-16 pt-6 md:pt-8">` por `<section className="bg-white pb-16 pt-10">`.

- [ ] **Step 5: Typecheck + build**

Run: `npm run typecheck`
Expected: sem erros.

Run: `npm run build`
Expected: build completa sem erros.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/ReviewsShowcase.tsx
git commit -m "feat: grid 2x4 de reviews na home com vaga garantida por afiliado"
```

---

### Task 3: PopularRecipes — remover fileira "Receitas Novas"

**Files:**
- Modify: `src/components/sections/PopularRecipes.tsx`

- [ ] **Step 1: Remover dados e JSX das Novas**

- Remover a linha `const newRecipes = [...recipes].sort((a, b) => b.id - a.id).slice(0, 4);`
- Remover o bloco JSX inteiro comentado como `{/* Receitas Novas */}` (o `<div>` com header "Acabou de Chegar"/"Receitas Novas" e o carrossel de `newRecipes`).
- Em `renderRecipeCard`, remover o parâmetro `isNew = false` e o bloco `{/* Badge 'Nova' */}` (`{isNew && (...)}`).
- Remover `Sparkles` do import de `lucide-react` (ficará sem uso).
- No wrapper das Populares, remover o `mb-10 md:mb-16` da div externa (era o espaçamento entre as duas fileiras): `<div className="mb-10 md:mb-16">` vira `<div>`.
- Ajustar padding da seção (deixa de ser a primeira seção de conteúdo): `<section className="bg-white pb-16 pt-10">` vira `<section className="bg-white pb-16 pt-6 md:pt-8">`.

- [ ] **Step 2: Verificar que nada mais referencia o que foi removido**

Run: `grep -rn "newRecipes" src/`
Expected: nenhum resultado.

Run: `grep -n "Sparkles" src/components/sections/PopularRecipes.tsx`
Expected: nenhum resultado.

- [ ] **Step 3: Typecheck**

Run: `npm run typecheck`
Expected: sem erros.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/PopularRecipes.tsx
git commit -m "refactor: remove fileira Receitas Novas da home (segue em /receitas)"
```

---

### Task 4: page.js — nova ordem das seções

**Files:**
- Modify: `src/app/page.js`

- [ ] **Step 1: Reordenar o JSX**

No `return` de `Home()`, mover `<ReviewsShowcase />` para ANTES de `<PopularRecipes ... />` e atualizar os comentários numerados:

```jsx
      {/* 5. Reviews & Análises */}
      <ReviewsShowcase />

      {/* 6. Receitas Populares */}
      <PopularRecipes popularSlugs={popularRecipeSlugs} />
```

(O restante — MyLinks, Offers, CTA — permanece na mesma ordem, renumerando comentários se necessário.)

- [ ] **Step 2: Typecheck + build**

Run: `npm run typecheck`
Expected: sem erros.

Run: `npm run build`
Expected: build completa sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.js
git commit -m "feat: reviews sobem para primeira seção de conteúdo da home"
```

---

### Task 5: Verificação visual final (supervisor)

- [ ] **Step 1: Subir dev server e abrir a home**
- [ ] **Step 2: Desktop — conferir:** grid de reviews com 8 cards uniformes em 2 linhas logo após o hero; presença de ao menos 1 artigo de cada afiliado publicado (damie, i-wanna-sleep, yesstyle, dolce-gusto, nestle-nutre); sem duplicatas; Populares 1×4 logo abaixo; seção "Receitas Novas" ausente.
- [ ] **Step 3: Mobile (~375px) — conferir:** carrossel de reviews em 2 fileiras deslizando junto com snap; Populares em 1 fileira.
- [ ] **Step 4: Conferir console do browser sem erros.**
