# Reorganização da home — destaque para Reviews & Análises

**Data:** 2026-07-14
**Status:** aprovado em conversa (Bruno)

## Contexto e objetivo

A monetização do projeto hoje vem dos afiliados (Damie, I Wanna Sleep, YesStyle, Dolce Gusto, Nestlé Nutre), não de receitas, e o conteúdo da Cecília está migrando de "Receitas & Lifestyle" para "Lifestyle & Receitas". A home atual dedica 4 dos 9 blocos a receitas e mostra reviews só na 6ª posição, em fileira única de 4.

Objetivo: reviews viram a primeira seção de conteúdo, em grid 2×4 (8 cards), com vaga garantida para um artigo de cada afiliado.

## Nova ordem das seções (`src/app/page.js`)

1. `CouponStrip` (inalterado)
2. `MainCategories` (inalterado)
3. `Categories` (inalterado)
4. `Hero` (inalterado)
5. **`ReviewsShowcase` — grid 2×4** (sobe; era 6ª)
6. **`PopularRecipes` — só a fileira "Populares" 1×4** (a fileira "Receitas Novas" é removida da home; `/receitas` segue cobrindo novidades)
7. `MyLinks` (inalterado)
8. `Offers` (inalterado)
9. `CTA` (inalterado)

## Seleção das 8 reviews (`ReviewsShowcase.tsx`)

Base elegível: `publishedReviews` sem `hideFromListings` (regra atual).

Algoritmo, em ordem:

1. **Fixadas:** reviews com `homeFeatured: true` entram primeiro (novo campo opcional no JSON).
2. **Vaga por afiliado:** para cada afiliado ainda não representado no grid, entra o artigo mais recente daquele afiliado.
3. **Recentes:** vagas restantes até 8 preenchidas pelas mais recentes (ordenação atual: `publishedAtISO` desc, desempate por `id`), sem duplicar.

Se houver mais fixadas + afiliados do que 8 vagas, corta em 8 respeitando a ordem acima.

A ordem de exibição no grid é a ordem de seleção: fixadas primeiro, depois representantes de afiliado, depois recentes (cada grupo internamente por data desc).

### Identificação do afiliado

- Deriva do campo `coupon` existente, via mapa no código:
  - `CECILIA12` → `damie`
  - `CECIEMCASA` → `i-wanna-sleep`
  - `CECILIA010` → `yesstyle`
  - `CECI` → ambíguo (dois programas) — **não mapeia automaticamente**
- Novo campo opcional `affiliate` no JSON sobrescreve a derivação. Os ~10 artigos com cupom `CECI` recebem `affiliate: "dolce-gusto"` ou `affiliate: "nestle-nutre"` explicitamente (Dolce Gusto e Nestlé Nutre contam como **dois** afiliados, cada um com vaga própria).
- Artigo sem cupom e sem `affiliate` = sem afiliado (concorre só como "recente").

Campos novos (`homeFeatured`, `affiliate`) são **opcionais** — nenhuma das 35 reviews existentes quebra (regra do projeto: campos novos sempre opcionais).

## Layout do grid

- **Desktop (md+):** 4 colunas × 2 linhas, cards uniformes `aspect-[5/6]`. O tratamento atual de primeiro card maior (`lg:grid-cols-[1.35fr_1fr_1fr_1fr]` + aspect diferente) sai — em grid de 2 linhas ele alargaria a coluna inteira (cards 1 e 5), não um destaque.
- **Mobile:** scroll horizontal com snap como hoje, mas em **2 fileiras que deslizam juntas** (`grid grid-rows-2 grid-flow-col`), cards com a mesma largura atual (230–250px).
- Estilo dos cards (imagem, badges, hover, tipografia) permanece o atual.

## Refactor em `PopularRecipes.tsx`

- Remover o bloco "Receitas Novas" (JSX, `newRecipes`, badge `Lançamento`/`isNew` no card e o import `Sparkles` se ficar sem uso).
- Manter intacta a lógica de popularidade via analytics (`popularSlugs` → fallback `isPopular`).
- Sem código morto residual.

## Fora de escopo

- Rebranding do topo azul (MainCategories/Categories/Hero) — conversa futura de branding Lifestyle & Receitas.
- Qualquer outra página (`/receitas`, `/reviews`, etc.).
- Curadoria dos drafts (I Wanna Sleep, Dolce Gusto, Nestlé Nutre) — quando publicarem, ganham vaga automaticamente.

## Verificação

- `npm run build` sem erros (projeto não tem suíte de testes).
- Home local: grid com 8 reviews, um artigo de cada afiliado presente (hoje: Damie, I Wanna Sleep, YesStyle, Dolce Gusto e/ou Nestlé Nutre conforme publicados), sem duplicatas.
- Mobile (viewport ~375px): carrossel de 2 linhas desliza corretamente.
- Seção "Receitas Novas" ausente; "Populares" segue funcionando com analytics.
