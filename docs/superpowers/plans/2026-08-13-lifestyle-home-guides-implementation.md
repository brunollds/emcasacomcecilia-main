# Lifestyle Home — Plano técnico de implementação

**Data:** 13/08/2026

**Status:** pronto para revisão; execução de runtime ainda não autorizada

**Spec de produto:** `docs/HANDOFF-LIFESTYLE-FASE-0.md`

**Objetivo:** substituir os dois blocos de atalhos de receitas no topo da home por descoberta real de Guias & Análises, criar quatro categorias controladas em `/reviews` e tornar o carrossel inferior cronológico, sem mudar Hero, ticker, URLs canônicas ou o restante da home.

## 1. Resultado esperado

A ordem da home passa a ser:

1. Header existente;
2. `CouponStrip` existente;
3. `Hero` existente;
4. quatro artigos em destaque — o mais recente de cada categoria;
5. cinco atalhos — quatro categorias + “Todos os guias”;
6. carrossel cronológico com oito artigos, sem repetir os quatro destaques;
7. `PopularRecipes`, `MyLinks`, `Offers` e `CTA` sem mudança de função.

A rota continua `/reviews`. Não criar `/lifestyle` nem landing pages indexáveis de categoria.

## 2. Princípios que governam a implementação

### 2.1 Uma autoridade por pergunta

| Campo | Responde | Não responde |
|---|---|---|
| `category` | “qual das quatro classes editoriais governa esta pauta e sua navegação?” | forma estrutural ou prova de teste |
| `reviewKind` | “qual capacidade de template esta peça usa?” | categoria de navegação |
| `type` | “qual rótulo editorial granular esta peça carrega?” | filtro principal da listagem |

`category` é o nome técnico já existente no schema para a classe editorial controlada. Não adicionar `editorialClass`: seria um campo paralelo para o mesmo conceito e violaria o contrato de portabilidade. `type` permanece obrigatório e visível, mas deixa de governar os filtros de `/reviews`.

Na criação de conteúdo, todo novo artigo de Guias & Análises escolhe exatamente uma classe. Na Central Editorial, o campo deve ser um select/enum com estes quatro valores, não texto livre. `reviewKind` continua separado porque governa capacidades de template e exigência de veredito; ele não governa a navegação.

### 2.2 Destaque não é sorteio

- uma vaga fixa por categoria;
- artigo com `publishedAtISO` mais recente;
- empate resolvido por `id` decrescente;
- resultado estável entre builds;
- atualização ocorre no deploy do conteúdo novo.

Não usar `Math.random`, shuffle no cliente, request-time rendering ou `isNew` antes da data.

### 2.3 Dois blocos, dois trabalhos

- destaques: **leia isto** — imagem e título do artigo;
- atalhos: **navegue por aqui** — ícone e nome da categoria.

O card destacado não repete o rótulo da categoria.

### 2.4 Nenhuma inferência editorial automática

- não derivar `category` de `reviewKind`;
- não derivar `category` de `type`;
- não inferir experiência própria por `pros/cons`;
- não exigir `reviewKind` porque existem `pros/cons`.

O backfill dos 32 artigos é uma decisão editorial explícita.

## 3. Arquitetura mínima

### 3.1 Biblioteca pura

Criar `src/lib/reviewDiscovery.ts` para concentrar:

- valores canônicos e rótulos;
- tipo `ReviewCategory`;
- validação/parsing do parâmetro `categoria`;
- regra de listagem PT;
- cronologia pura;
- contagem derivada;
- seleção de um destaque por categoria;
- seleção dos oito recentes sem duplicidade;
- projeção para um view model leve de card.

O módulo não importa `publishedReviews`. Recebe a coleção como argumento, o que permite teste sintético e evita acoplamento escondido.

Valores canônicos:

```ts
export const REVIEW_CATEGORIES = [
  { value: 'guias-praticos-utilidade', label: 'Guias práticos & utilidade' },
  { value: 'produtos-experiencias', label: 'Produtos & experiências' },
  { value: 'cupons-como-usar', label: 'Cupons & como usar' },
  { value: 'confianca-reputacao', label: 'Confiança & reputação' },
] as const;
```

O tipo deve ser derivado desse literal, não duplicado manualmente:

```ts
export type ReviewCategory = (typeof REVIEW_CATEGORIES)[number]['value'];
```

### 3.2 View model da home

O carrossel é client component, mas não deve importar todo `publishedReviews` e todo o conteúdo dos artigos para o bundle.

Projetar no servidor apenas os campos do card:

```ts
export interface HomeReviewCard {
  id: number;
  slug: string;
  title: string;
  type: string;
  category: ReviewCategory;
  publishedAt: string;
  publishedAtISO: string;
  image?: string;
  imageAlt?: string;
  imageFit?: 'cover' | 'contain';
  imagePosition?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  isNew?: boolean;
  rating?: number;
  readingMinutes: number;
}
```

`Home()` seleciona e projeta no servidor; os componentes recebem apenas `HomeReviewCard[]`.

### 3.3 Componentes

Criar:

- `src/components/sections/FeaturedReviewGuides.tsx` — quatro cards;
- `src/components/sections/ReviewCategoryLinks.tsx` — quatro categorias + todos;
- `src/components/TrackedHomeLink.tsx` — somente no commit de medição, se o evento for aprovado.

Modificar:

- `src/components/sections/ReviewsShowcase.tsx` — passa a receber cards recentes por prop;
- `src/app/(pt)/page.js` — computa dados e monta a ordem aprovada.

Remover após a troca:

- `src/components/sections/MainCategories.tsx`;
- `src/components/sections/Categories.tsx`.

Esses componentes têm apenas a home como consumidor. As rotas `/receitas` e `/categorias` permanecem.

## 4. Backfill editorial fechado

Adicionar `category` no nível raiz dos 32 JSONs abaixo.

### 4.1 `guias-praticos-utilidade` — 10

- `content/reviews/airfryer-uma-breve-historia.json`
- `content/reviews/10-fatos-surpreendentes-sobre-a-air-fryer-que-voce-nao-sabia.json`
- `content/reviews/conhecendo-mais-rabanada.json`
- `content/reviews/minha-experiencia-manteiga-batida-aerada.json`
- `content/reviews/clube-dolce-gusto-como-funciona.json`
- `content/reviews/promocao-dolce-gusto-caixas-mini-me-gratis.json`
- `content/reviews/tabela-medidas-dolce-gusto-ml-por-nivel.json`
- `content/reviews/assinatura-dolce-gusto-como-funciona.json`
- `content/reviews/adaptador-neo-start-o-que-e.json`
- `content/reviews/aliv-head-gel-iws-mascara-termica-enxaqueca.json`

### 4.2 `produtos-experiencias` — 10

- `content/reviews/poltronas-reclinaveis-damie-vale-o-investimento.json`
- `content/reviews/poltrona-amamentacao-rotina.json`
- `content/reviews/i-wanna-sleep-cobertor-igloo-ficha-tecnica.json`
- `content/reviews/poltrona-moon-design-que-parece-obra-de-arte.json`
- `content/reviews/sofa-damie-na-caixa-vale-a-pena-o-modular.json`
- `content/reviews/poltrona-levita-o-topo-da-tecnologia-e-conforto.json`
- `content/reviews/sofa-damie-modular-vale-a-pena.json`
- `content/reviews/poltrona-damie-e-boa.json`
- `content/reviews/dolce-gusto-genio-s-touch-vale-a-pena.json`
- `content/reviews/dolce-gusto-mini-me-2-0-vale-a-pena.json`

Esta lista foi conferida como conteúdo de produto/experiência para o backfill aprovado. Ela não transforma `reviewKind` nem cria promessa de “testado” para o pilar inteiro.

Os rótulos granulares `Móveis & Conforto`, `Móveis de Luxo`, `Praticidade & Conforto`, `Decoração & Design` e `Reviews` não criam categorias paralelas: os artigos de móveis listados acima são reviews de produto e ficam todos em `produtos-experiencias`.

### 4.3 `cupons-como-usar` — 7

- `content/reviews/cupom-cecilia12-como-usar.json`
- `content/reviews/cupom-ceci-nescafe-dolce-gusto-como-usar.json`
- `content/reviews/codigo-cecilia010-yesstyle-como-usar.json`
- `content/reviews/cupom-ceciemcasa-i-wanna-sleep-como-usar.json`
- `content/reviews/cupom-ceci-nestle-nutre-como-usar.json`
- `content/reviews/cupom-magalu-em-casa-com-cecilia.json`
- `content/reviews/como-encontrar-cupons-yesstyle-validos.json`

### 4.4 `confianca-reputacao` — 5

- `content/reviews/damie-reclame-aqui-o-que-os-dados-mostram.json`
- `content/reviews/nestle-nutre-e-confiavel.json`
- `content/reviews/dolce-gusto-e-confiavel.json`
- `content/reviews/yesstyle-e-confiavel.json`
- `content/reviews/sofa-na-caixa-crise-reclamacoes-procon-sp.json`

`Editorial` não vira categoria automaticamente. Os editoriais “Marca é confiável?” de Dolce Gusto, Nutren e YesStyle pertencem a `confianca-reputacao` pela função da pauta. O Cobertor IWS também carrega `type: Editorial`, mas pertence a `produtos-experiencias`: registra produto recebido, primeiras impressões em vídeo e uso noturno. O Aliv Head Gel IWS permanece em `guias-praticos-utilidade` porque é uma peça promocional/informativa baseada em especificações públicas, sem experiência própria declarada.

### 4.5 `publishedAtISO` — 7

Adicionar sem alterar `publishedAt` legível:

| Arquivo | `publishedAtISO` |
|---|---|
| `minha-experiencia-manteiga-batida-aerada.json` | `2026-04-20` |
| `conhecendo-mais-rabanada.json` | `2026-04-20` |
| `10-fatos-surpreendentes-sobre-a-air-fryer-que-voce-nao-sabia.json` | `2026-04-20` |
| `airfryer-uma-breve-historia.json` | `2026-04-20` |
| `poltrona-levita-o-topo-da-tecnologia-e-conforto.json` | `2026-04-18` |
| `sofa-damie-na-caixa-vale-a-pena-o-modular.json` | `2026-04-18` |
| `poltrona-moon-design-que-parece-obra-de-arte.json` | `2026-04-18` |

Regenerar `src/lib/generated/content-index.ts` uma vez, depois de todo o backfill. Nunca editá-lo manualmente.

## 5. Primeiro resultado automático esperado

Os quatro artigos usados no mockup eram exemplos visuais. Aplicando literalmente “mais recente por categoria” ao snapshot atual, o primeiro build deve destacar:

| Categoria | Artigo esperado | Data |
|---|---|---|
| Guias práticos & utilidade | `aliv-head-gel-iws-mascara-termica-enxaqueca` | 2026-08-04 |
| Produtos & experiências | `dolce-gusto-mini-me-2-0-vale-a-pena` | 2026-08-12 |
| Cupons & como usar | `como-encontrar-cupons-yesstyle-validos` | 2026-07-24 |
| Confiança & reputação | `sofa-na-caixa-crise-reclamacoes-procon-sp` | 2026-08-10 |

O empate de 04/08 em Guias é vencido pelo maior `id`: Aliv Head Gel (`258`) precede Adaptador NEO (`246`).

Depois da exclusão desses quatro, os oito recentes esperados são:

1. `nestle-nutre-e-confiavel`;
2. `adaptador-neo-start-o-que-e`;
3. `assinatura-dolce-gusto-como-funciona`;
4. `yesstyle-e-confiavel`;
5. `tabela-medidas-dolce-gusto-ml-por-nivel`;
6. `dolce-gusto-genio-s-touch-vale-a-pena`;
7. `poltrona-damie-e-boa`;
8. `cupom-magalu-em-casa-com-cecilia`.

Essas listas são smoke expectations do snapshot, não constantes de produção.

## 6. Commits de implementação

### Commit 3A — contrato, dados e seleção pura

**Objetivo:** tornar a taxonomia e a cronologia verificáveis antes de mexer na UI.

**Adicionar em runtime:**

- `src/lib/reviewDiscovery.ts`
- `scripts/test-review-discovery.ts`

**Modificar:**

- `src/lib/data.ts`
- `src/lib/content/types.ts`
- `scripts/validate-content-model.ts`
- `package.json`
- os 32 JSONs da seção 4
- `src/lib/generated/content-index.ts`, somente via `npm run content:index`

**Contrato:**

- `Review.category?: ReviewCategory` permanece opcional no tipo porque o cluster internacional ainda não participa desta frente;
- todo artigo que a vitrine PT lista deve ter categoria válida e `publishedAtISO` válido;
- categoria presente em qualquer locale deve pertencer ao vocabulário controlado;
- `type` continua obrigatório;
- `reviewKind` não é alterado.

**Contrato de criação e Central Editorial, preparado antes do runtime:**

- `GUIA-EDITORIAL-GUIAS-ANALISES.md` é a fonte de verdade humana para escolher uma das quatro classes, com exemplos positivos, contraexemplos e a distinção Cobertor Igloo × Aliv Head Gel;
- `AGENTS.md` e o contrato de afiliados apontam para esse guia antes de criar artigo novo;
- `EDITORIAL-PORTABILITY.md` registra `category` como nome canônico do Em Casa e proíbe `editorialClass` paralelo;
- `HANDOFF-CENTRAL-WAVE5.md` especifica enum obrigatório no formulário de Guias & Análises e passthrough no adapter;
- a alteração efetiva em `packages/content-model` e na UI da Central pertence ao repositório da Central e exige tarefa/commit próprios; não fingir que foi entregue por este repo.

Esses documentos devem ser versionados em commit `docs:` separado antes do 3A. O 3A apenas
confirma que o runtime implementa o contrato já documentado; não deve reescrever a decisão.

**Validador:**

Em `validate-content-model.ts`, espelhar exatamente a regra da vitrine:

```ts
const listedInPortuguese =
  !review.draft
  && !review.hideFromListings
  && !review.hideFromPortugueseListings;
```

Para esses artigos:

- `category` obrigatório e válido;
- `publishedAtISO` obrigatório;
- `Date.parse(publishedAtISO)` finito.

Não criar regra baseada em `pros`, `cons`, `type` ou `reviewKind`.

**Teste permanente `test-review-discovery`:**

- os quatro valores são únicos;
- parser aceita os quatro e rejeita valor desconhecido;
- todos os listados PT têm categoria e ISO válidos;
- todas as categorias têm ao menos um artigo;
- soma das contagens equivale ao total listado;
- seletor devolve quatro IDs únicos, um por categoria;
- cada destaque é realmente o mais recente de sua categoria;
- recentes estão em data decrescente;
- recentes não repetem os quatro destaques;
- fixtures sintéticas provam desempate por `id` e rotação ao publicar artigo novo;
- `pros/cons` não participam de nenhuma classificação.

Não fixar 10/10/7/5 como asserção permanente. Esses números devem crescer sem quebrar o teste.

**Package:**

```json
"test:review-discovery": "tsx scripts/test-review-discovery.ts"
```

Encadear o teste em `build` depois de `content:index` e antes de `next build`.

**Gates:**

```bash
npm run content:index
npm run validate:content
npm run test:review-discovery
npm run typecheck
npm run lint
git diff --check
```

**Commit sugerido:**

```text
feat(content): define review navigation categories
```

### Commit 3B — hub `/reviews` usa categoria controlada

**Objetivo:** fazer os cinco atalhos terem destinos reais antes de aparecerem na home.

**Modificar:**

- `src/app/(pt)/reviews/ReviewsClientPage.js`
- `src/app/(pt)/reviews/page.js`
- `src/lib/i18n/shellDictionary.ts`
- `scripts/test-review-discovery.ts`, somente se o parser exigir cobertura adicional

**Filtro:**

- remover `uniqueTypes` como fonte dos botões;
- remover `activeType` do estado local;
- ler `categoria` com `useSearchParams`;
- validar pelo parser central;
- categoria ausente ou inválida mostra todos;
- atualizar URL com `router.replace(..., { scroll: false })`, repetindo o padrão já usado por `ReceitasClientPage`;
- resetar `visible` para `INITIAL_COUNT` ao mudar categoria;
- voltar/avançar do navegador restaura a seleção;
- `type` continua aparecendo como etiqueta nos cards.

**Rótulos e copy PT:**

- nav: `Guias & Análises`;
- H1: `Guias & Análises`;
- metadata title: `Guias & Análises - Em Casa com Cecília`;
- description sugerida: `Guias práticos, análises de produtos, reputação de marcas e instruções de compra para ajudar você a decidir com mais contexto.`;
- texto do hero sugerido: `Guias práticos, experiências reais quando existem e análises baseadas em dados e fontes declaradas.`;
- disclaimer sugerido: `Cada conteúdo informa sua base: experiência própria, dados públicos ou fontes declaradas. Parcerias comerciais são identificadas explicitamente.`

Eliminar estas promessas incorretas:

- “Produtos testados de verdade na cozinha”;
- “Todos os reviews são baseados na experiência pessoal”;
- “ingredientes testados na cozinha”;
- “Produtos testados de verdade” no Open Graph.

Alterar somente o rótulo PT em `shellDictionary.ts`. Nenhum locale internacional muda.

**SEO:**

- canonical continua `/reviews`;
- queries não entram no sitemap;
- não adicionar `noindex` nem canonical por categoria;
- não mudar slugs de artigos.

**Gates:**

```bash
npm run test:review-discovery
npm run test:html-lang
npm run typecheck
npm run lint
npm run build
git diff --check
```

**Teste manual:**

- abrir `/reviews`;
- abrir cada um dos quatro `?categoria=`;
- confirmar contagens 10/10/7/5 no snapshot inicial;
- testar categoria inválida;
- testar voltar/avançar;
- conferir nav PT e dois locales internacionais;
- conferir `<link rel="canonical" href=".../reviews">`.

**Commit sugerido:**

```text
feat(reviews): add controlled category navigation
```

### Commit 3C — descoberta de Guias & Análises na home

**Objetivo:** aplicar de uma vez o estado visual coerente, sem commit intermediário com conteúdo duplicado.

**Adicionar:**

- `src/components/sections/FeaturedReviewGuides.tsx`
- `src/components/sections/ReviewCategoryLinks.tsx`

**Modificar:**

- `src/components/sections/ReviewsShowcase.tsx`
- `src/app/(pt)/page.js`

**Remover:**

- `src/components/sections/MainCategories.tsx`
- `src/components/sections/Categories.tsx`

**Server selection em `Home()`:**

```ts
const discovery = selectHomeReviewDiscovery(publishedReviews);
```

Passar:

- `discovery.featured` para `FeaturedReviewGuides`;
- definições de categoria para `ReviewCategoryLinks`;
- `discovery.recent` para `ReviewsShowcase`.

Não importar `publishedReviews` dentro de `ReviewsShowcase` depois dessa mudança.

**Ordem em `page.js`:**

```text
CouponStrip
Hero
FeaturedReviewGuides
ReviewCategoryLinks
ReviewsShowcase
PopularRecipes
MyLinks
Offers
CTA
```

Header permanece no shell, fora de `page.js`.

**Destaques:**

- grid de quatro no desktop;
- grid de duas colunas no mobile, seguindo a anatomia do `MainCategories` atual;
- usar `review.image`, `imageAlt`, `imageFit` e `imagePosition`;
- fallback visual quando não houver imagem;
- mostrar título do artigo, sem categoria;
- link direto `/reviews/<slug>`;
- nenhuma lista manual de slugs.

**Atalhos:**

- usar os ícones de `@phosphor-icons/react`, já instalado;
- quatro URLs `/reviews?categoria=<value>`;
- “Todos os guias” → `/reviews`;
- omitir contadores na primeira implementação;
- se forem adicionados depois, derivar da coleção.

**Carrossel:**

- oito cards por seleção;
- data decrescente pura;
- quatro visíveis por página no desktop;
- dois visíveis por página no mobile;
- setas acessíveis, com `aria-label`;
- `scroll-snap` ou paginação local; não usar biblioteca nova;
- esconder/desabilitar controle impossível no início/fim;
- excluir todos os IDs de `featured`;
- remover `COUPON_TO_AFFILIATE`, `getAffiliate`, `homeFeatured` e cobertura por afiliado da seleção da home;
- `isNew` pode continuar como badge, nunca como ordenação.

Substituir “Testado em Casa / Análises Sinceras” por linguagem coerente, por exemplo:

- kicker: `Publicados recentemente`;
- heading: `Mais em Guias & Análises`.

**Preservar integralmente:**

- JSX e copy de `Hero`;
- comportamento de `CouponStrip`;
- metadata da home;
- `PopularRecipes`, `MyLinks`, `Offers`, `CTA`;
- DAMIE no navbar, Universo e footer.

**Gates:**

```bash
npm run test:review-discovery
npm run test:internal-links
npm run test:analytics-gate
npm run typecheck
npm run lint
npm run build
git diff --check
```

**Smoke do HTML gerado:**

- quatro links destacados, todos únicos;
- cinco atalhos de navegação;
- oito links do carrossel, sem ID repetido nos destaques;
- nenhum link antigo de `MainCategories` ou `Categories` no topo;
- Hero ainda contém a mesma copy;
- `/receitas` e `/categorias` continuam no build;
- `/reviews` continua com canonical único.

**Visual:**

- desktop ≥ 1280 px;
- tablet 768 px;
- mobile 360–390 px;
- foco de teclado nas setas e links;
- sem CLS ao carregar;
- títulos longos não sobrepõem imagens ou controles;
- carrossel não cria rolagem horizontal na página inteira.

**Commit sugerido:**

```text
feat(home): replace recipe shortcuts with guide discovery
```

### Commit 3D — medição do novo roteamento

**Objetivo:** medir a função nova da home sem criar um evento por componente.

**Adicionar:**

- `src/components/TrackedHomeLink.tsx`
- `scripts/test-home-route-tracking.ts`, se a função de parâmetros for extraída e testável

**Modificar:**

- `FeaturedReviewGuides.tsx`
- `ReviewCategoryLinks.tsx`
- `ReviewsShowcase.tsx`
- `package.json`, se houver teste novo

**Evento único:**

```text
home_route_click
  destination
  placement
  link_label
```

Placements:

- `home_featured_guides`;
- `home_review_categories`;
- `home_reviews_carousel`.

Regras:

- disparar uma vez por ativação;
- não incluir código de cupom;
- não alterar destino ou semântica do link;
- respeitar o gate de analytics por hostname;
- navegação por teclado também registra;
- não instrumentar Hero ou ticker neste commit.

Se o tracking exigir transformar toda a seção em client component ou duplicar renderizadores, parar e revisar. O componente rastreado deve ser pequeno e reutilizado pelos três blocos.

**Gates:**

```bash
npm run test:analytics-gate
npm run test:home-route-tracking
npm run typecheck
npm run lint
npm run build
git diff --check
```

**Manual com debug explícito:**

- um clique em cada placement;
- nenhum evento duplicado;
- hostname local bloqueado sem debug;
- parâmetros com destino e âncora corretos.

**Commit sugerido:**

```text
feat(analytics): track home guide routing
```

## 7. Buscas obrigatórias antes e depois

Antes:

```bash
rg -n "MainCategories|<Categories|ReviewsShowcase" src
rg -n "review\.type|activeType|uniqueTypes" src/app/\(pt\)/reviews src/components src/lib
rg -n '"category"' content/reviews
rg -n '"publishedAtISO"' content/reviews
```

Depois:

```bash
rg -n "MainCategories|<Categories" src
# esperado: vazio

rg -n "activeType|uniqueTypes|COUPON_TO_AFFILIATE|getAffiliate" src
# esperado: vazio nos consumidores migrados

rg -n "review\.type" src
# esperado: apenas rótulo, relacionados e compatibilidade; nunca filtro da listagem

rg -n '"category": "(guias-praticos-utilidade|produtos-experiencias|cupons-como-usar|confianca-reputacao)"' content/reviews
# esperado no snapshot inicial: 32 ocorrências
```

No PowerShell, usar aspas e `-LiteralPath` quando o caminho contiver `(pt)`.

## 8. Gates finais do lote

```bash
npm run content:index
npm run validate:content
npm run test:review-discovery
npm run test:home-route-tracking
npm run test:html-lang
npm run test:internal-links
npm run test:coupon-offer-modes
npm run test:analytics-gate
npm run typecheck
npm run lint
npm run build
git diff --check
```

Se o Commit 3D de analytics for deliberadamente adiado, `test:home-route-tracking` não existe e sai do gate; isso deve ser declarado no relatório, não simulado.

## 9. Testes manuais mínimos

### `/reviews`

- “Todos” mostra 32 no snapshot inicial;
- cada categoria mostra 10/10/7/5;
- URL atualiza sem scroll ao topo;
- refresh preserva filtro;
- voltar/avançar funciona;
- query inválida mostra todos;
- `type` continua visível nos cards;
- nenhuma copy promete teste ou experiência pessoal universal.

### Home

- quatro categorias representadas exatamente uma vez;
- primeiro snapshot automático corresponde à seção 5;
- oito recentes correspondem à seção 5;
- nenhum artigo aparece nos dois blocos;
- publicar fixture mais recente numa categoria troca somente aquela vaga;
- carrossel chega ao fim e volta sem pular cards;
- DAMIE continua no navbar e no Universo;
- ticker e Hero não mudaram.

### SEO e idiomas

- canonical de `/reviews?categoria=...` resolve para `/reviews`;
- sitemap não ganha query strings ou `/lifestyle`;
- menu PT diz “Guias & Análises”;
- pelo menos dois locales internacionais preservam seus rótulos;
- nenhuma URL de artigo muda.

## 10. O que não fazer

- não criar `/lifestyle`;
- não mudar Hero ou metadata da home;
- não mover/remover ticker neste lote;
- não retirar DAMIE do navbar;
- não criar categorias de receitas;
- não consertar “Pudim” junto — o componente sai da home;
- não apagar `type`;
- não normalizar `reviewKind`;
- não inferir categoria por palavra-chave;
- não usar aleatoriedade;
- não hardcodar 10/10/7/5 na UI;
- não adicionar biblioteca de carrossel;
- não editar `content-index.ts` à mão;
- não tocar em conteúdo internacional da YesStyle;
- não misturar haul SHEIN ou pauta Dolce Gusto neste lote;
- não usar `git add -A` no worktree compartilhado.

## 11. Staging e relatório por commit

Usar `git add` explícito pelos caminhos do commit. Antes de cada commit:

```bash
git status --short
git diff --check
git diff --cached --stat
git diff --cached --name-status
```

Relatório obrigatório:

```text
Commit:
Objetivo:
Arquivos alterados:
Comportamento anterior:
Comportamento novo:
Gates executados:
Resultados:
Buscas rg:
Teste manual:
Riscos ou decisões pendentes:
Arquivos paralelos preservados:
```

Parar após cada commit para revisão. Não executar o próximo automaticamente sem autorização.

## 12. Critério de conclusão

O lote está concluído quando:

1. os 32 artigos PT têm categoria válida e data ISO;
2. `/reviews` navega pelas quatro categorias usando a URL;
3. `type` deixou de ser filtro e continua como rótulo;
4. a home preserva ticker e Hero;
5. os quatro destaques são determinísticos e diversos por categoria;
6. o carrossel é cronológico e não duplica destaques;
7. DAMIE continua nas superfícies aprovadas;
8. nenhum locale internacional mudou;
9. todos os gates estão verdes;
10. o HTML e a interação correspondem ao mockup aprovado.

Até uma autorização explícita do Bruno, este documento é **plano revisável**, não ordem de execução.
