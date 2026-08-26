# Home — destaques recentes e curadoria editorial

**Data:** 26/08/2026

**Status:** plano aprovado. O Commit 1 foi autorizado em 26/08/2026; os commits seguintes, push e
deploy continuam condicionados a autorizações separadas.

**Continuidade:** este plano altera somente a regra de seleção dos quatro cards criada na Frente 3
e adiciona uma seção editorial entre Guias & Análises e Receitas. Ele não reabre a taxonomia, o
redesign do Hero nem a arquitetura das subpáginas.

**Referências vigentes:**

- `docs/GUIA-EDITORIAL-GUIAS-ANALISES.md`;
- `docs/HANDOFF-LIFESTYLE-FASE-0.md`;
- `docs/superpowers/plans/2026-08-13-lifestyle-home-guides-implementation.md`;
- `src/lib/reviewDiscovery.ts`;
- `src/app/(pt)/page.js`.

## 1. Objetivo

Resolver dois problemas diferentes sem misturar seus contratos:

1. os quatro cards principais devem acompanhar a cadência real de publicação sem manter vagas
   antigas apenas porque uma categoria publica pouco;
2. a home precisa de uma superfície de curadoria explícita para campanhas sazonais e conteúdos
   estratégicos, sem reclassificar artigos nem transformar `category` em ferramenta de promoção.

Resultado pretendido:

```text
CouponStrip
Hero
4 destaques recentes com diversidade mínima
Atalhos + grade de Guias & Análises
Escolha da Cecília
Receitas Favoritas
Universo da Cecília
Ofertas
YouTube
```

`FeaturedReviewGuides` e `ReviewsShowcase` continuam sendo duas partes do mesmo bloco de Guias &
Análises. A nova seção entra depois desse bloco completo e antes de `PopularRecipes`.

## 2. Baseline verificado em 26/08/2026

### 2.1 O denominador que governa a home

Há dois retratos corretos para perguntas diferentes:

| Conjunto | Guias | Produtos | Cupons | Confiança | Total |
|---|---:|---:|---:|---:|---:|
| todos os JSONs categorizados | 25 | 11 | 7 | 7 | 50 |
| artigos elegíveis para a vitrine PT/home | 16 | 11 | 7 | 6 | 40 |

A home usa o segundo conjunto por meio de `getListedPortugueseReviews()`: exclui `draft`,
`hideFromListings` e `hideFromPortugueseListings`.

A diferença de dez arquivos é composta por:

- oito traduções K-Beauty ocultas da listagem portuguesa;
- um draft de Guia;
- um draft de Confiança & reputação.

O gate que precisa continuar sendo a autoridade é:

```bash
npm run test:review-discovery
```

Saída do snapshot:

```text
40 artigos PT; guias-praticos-utilidade=16,
produtos-experiencias=11, cupons-como-usar=7,
confianca-reputacao=6
```

Essas contagens são retrato, não meta nem asserção fixa de teste.

### 2.2 Comportamento atual

`selectHomeReviewDiscovery()` reserva uma vaga para cada `category` e escolhe o artigo mais recente
daquela classe. A lógica funciona como implementada, mas produz cards antigos quando uma categoria
fica sem publicação nova.

O problema é de política de seleção, não de ordenação ou falha técnica.

### 2.3 Simulação da política nova

Com “quatro mais recentes” puro, os quatro cards do snapshot atual seriam todos de
`guias-praticos-utilidade`.

Com ordenação cronológica e teto de dois por categoria, o snapshot produz:

- dois Guias práticos & utilidade;
- um Produtos & experiências;
- um Confiança & reputação.

Aplicada a cada data de publicação de agosto, a regra de teto dois nunca gerou quatro cards da mesma
categoria. Depois de 12/08, manteve três categorias na maior parte das rotações. Isso é evidência
suficiente para o teto inicial; não criar ranking, pesos ou pontuação adicional nesta fase.

## 3. Decisões fechadas

### 3.1 Taxonomia permanece intacta

Os quatro valores de `category` continuam iguais e continuam governando `/reviews`, atalhos e
filtros:

- `guias-praticos-utilidade`;
- `produtos-experiencias`;
- `cupons-como-usar`;
- `confianca-reputacao`.

Não reclassificar artigos para equilibrar a home. Reclassificação só ocorre quando a pergunta central
do artigo estiver editorialmente errada.

`type` permanece rótulo público livre. É proibido inferir `category` a partir de `type`,
`reviewKind`, marca, parceria, `pros/cons` ou frequência de publicação.

### 3.2 Quatro cards principais

Nova regra:

1. partir somente dos artigos listados em português;
2. ordenar por `publishedAtISO` decrescente;
3. desempatar pelo maior `id`;
4. percorrer a lista nessa ordem;
5. aceitar no máximo dois artigos da mesma `category`;
6. parar ao selecionar quatro IDs únicos;
7. falhar com mensagem nomeada se o corpus não conseguir preencher quatro vagas sob essa regra.

Constantes explícitas, não parâmetros editoriais livres:

```ts
const HOME_FEATURED_LIMIT = 4;
const HOME_FEATURED_MAX_PER_CATEGORY = 2;
```

Não usar peso por marca, afiliado, CTR, `isNew`, `homeFeatured`, impressões ou clique. Os cards são
recência com uma proteção mínima contra monocultura visual.

### 3.3 Curadoria editorial

A nova seção se chama **Escolha da Cecília**. Não usar “Escolha do dia”, pois isso promete rotação
diária.

MVP:

- exatamente um artigo de `content/reviews`;
- card amplo, sem carrossel;
- seleção manual e versionada;
- título, descrição, imagem e URL derivados do artigo canônico;
- configuração fornece apenas o slug, o rótulo editorial e o período;
- seção não renderiza quando não há seleção ativa;
- artigo precisa estar publicado e elegível para a vitrine PT;
- artigo curado não pode se repetir nos quatro cards nem na grade da home;
- o artigo continua aparecendo normalmente em `/reviews` e no filtro da categoria.

Campanha sazonal pode usar `eyebrow` como `Black Friday 2026`. Fora de campanhas, a escolha pode
favorecer conteúdo evergreen, estratégico ou de uma categoria menos exposta, mas isso é decisão
manual — nunca compensação automática por contagem.

### 3.4 Fonte de verdade da curadoria

Criar um arquivo próprio, separado do artigo:

```text
content/home-curation.json
```

Forma mínima:

```json
{
  "selection": {
    "articleSlug": "slug-do-artigo-publicado",
    "eyebrow": "Escolha da Cecília",
    "startsAt": "2026-08-26T00:00:00-03:00",
    "endsAt": null
  }
}
```

Para desativar:

```json
{
  "selection": null
}
```

Regras:

- `articleSlug` referencia um artigo existente; não duplica conteúdo;
- `eyebrow` é texto curto, não substitui o título do artigo;
- `startsAt` e `endsAt` usam ISO 8601 com offset explícito;
- `endsAt: null` representa escolha evergreen;
- quando `endsAt` existir, deve ser posterior a `startsAt`;
- não criar `enabled`: `selection: null` já é o estado desligado;
- não reativar `homeFeatured`: um booleano no artigo não representa campanha, período e rótulo;
- não criar array no MVP. Mais de uma peça só será considerada depois de uso real.

## 4. Arquitetura técnica mínima

### 4.1 Evolução de `reviewDiscovery.ts`

Manter a biblioteca pura e mudar `selectHomeReviewDiscovery()` para aceitar apenas exclusões
necessárias à home:

```ts
selectHomeReviewDiscovery(reviews, {
  recentLimit: 10,
  excludedIds: activeCuration ? [activeCuration.id] : [],
})

// compatibilidade legada: chamadas numéricas continuam válidas
selectHomeReviewDiscovery(reviews, 10);
selectHomeReviewDiscovery(reviews, {
  excludedIds: activeCuration ? [activeCuration.id] : [],
});
```

A função continua sem importar `publishedReviews` nem a configuração de curadoria.

Comportamento:

- `counts` é calculado sobre toda a vitrine PT, inclusive o artigo curado;
- `featured` usa recência + teto dois e ignora `excludedIds`;
- `recent` ignora IDs curados e IDs já destacados;
- a ordem da grade continua cronológica pura;
- o tamanho da grade atual permanece inalterado;
- filtros e URLs de `/reviews` não mudam.

Não tornar limite e teto configuráveis pelo JSON. Eles são decisão de produto e ficam no código.

### 4.2 Loader puro da curadoria

Criar:

```text
src/lib/homeCuration.ts
scripts/test-home-curation.ts
```

API sugerida:

```ts
resolveActiveHomeCuration(config, reviews, now)
```

`now` é argumento obrigatório da função pura para permitir testes determinísticos. O consumidor da
home passa o instante atual.

Validações fail-loud:

- shape e chaves esperadas;
- timestamps válidos e com offset;
- intervalo coerente;
- slug existente;
- artigo não draft e não oculto da listagem portuguesa;
- `category` e `publishedAtISO` válidos;
- nenhum texto editorial do artigo duplicado no JSON de curadoria.

Resultado:

- `null` quando `selection` for nula, ainda não tiver começado ou já tiver terminado;
- artigo projetado quando estiver dentro do período;
- erro nomeado quando a configuração for inválida.

A home tem `revalidate = 300`; ativação e expiração podem convergir em até aproximadamente cinco
minutos depois do limite temporal. Documentar essa janela e não prometer troca no segundo exato.

### 4.3 Componente visual

Criar:

```text
src/components/sections/HomeEditorialPick.tsx
```

Posição em `src/app/(pt)/page.js`:

```jsx
<ReviewsShowcase items={carouselReviewGuides} />
<HomeEditorialPick item={activeCuration} />
<PopularRecipes popularSlugs={popularRecipeSlugs} />
```

Anatomia para o primeiro mockup:

- um card horizontal amplo no desktop;
- imagem e texto empilhados no mobile;
- imagem, título, descrição curta, data/tipo e CTA;
- `eyebrow` acima do título;
- CTA fixo `Ler o destaque`;
- sem setas, paginação ou rotação automática;
- sem texto sobreposto à imagem no mobile;
- altura controlada para não recriar excesso de espaço vertical;
- divisor leve em relação ao bloco de Guias;
- não alterar `PopularRecipes` para acomodar o componente.

Título, descrição e imagem vêm do artigo. Se faltar imagem, usar o fallback já aceito nos cards de
Guias; não criar asset novo nesta fase.

O mockup desktop e mobile precisa de aprovação antes do commit visual.

### 4.4 Medição

Reusar `TrackedHomeLink` e o evento `home_route_click`.

Adicionar um único placement:

```text
home_editor_pick
```

Parâmetros:

- `destination`: `/reviews/<slug>`;
- `placement`: `home_editor_pick`;
- `link_label`: título canônico do artigo.

Não criar evento novo nem medir hover. Uma ativação do link produz um evento, por mouse ou teclado.

## 5. Sequência de implementação

Cada commit para e entrega diff + gates para revisão. Não iniciar o próximo automaticamente.

### Commit 1 — seleção recente com teto de diversidade

**Objetivo:** substituir uma vaga por categoria pela política cronológica com teto dois.

**Modificar:**

- `src/lib/reviewDiscovery.ts`;
- `scripts/test-review-discovery.ts`;
- `docs/GUIA-EDITORIAL-GUIAS-ANALISES.md`;
- `docs/HANDOFF-LIFESTYLE-FASE-0.md`, apenas com nota de regra supersedida;
- `docs/superpowers/plans/2026-08-13-lifestyle-home-guides-implementation.md`, apenas com nota
  histórica de supersessão.

**Testes obrigatórios:**

- quatro candidatos mais recentes da mesma categoria não ocupam as quatro vagas;
- entram no máximo dois da mesma categoria;
- o restante é preenchido pelos próximos artigos cronológicos;
- empate de data continua favorecendo maior `id`;
- resultado tem quatro IDs únicos;
- artigo excluído não entra em `featured` nem `recent`;
- contagens por categoria não mudam por causa da seleção;
- teste não congela 16/11/7/6 nem slugs atuais.

**Commit sugerido:**

```text
refactor(home): rotate guide highlights by recency
```

### Commit 2 — contrato versionado de curadoria

**Objetivo:** criar configuração, loader e validação sem publicar seção visível.

**Adicionar:**

- `content/home-curation.json`, inicialmente com `selection: null`;
- `src/lib/homeCuration.ts`;
- `scripts/test-home-curation.ts`.

**Modificar:**

- `package.json`, incluindo `test:home-curation` no `build`;
- `AGENTS.md`, incluindo o teste na suíte;
- `.gitattributes` somente se a política de source archive exigir declaração para o novo JSON. Não
  alterar export-ignore sem evidência.

**Testes obrigatórios:**

- seleção nula;
- seleção antes do início;
- seleção ativa nos limites definidos;
- seleção depois do fim;
- `endsAt: null` evergreen;
- timestamp sem offset recusado;
- intervalo invertido recusado;
- slug inexistente recusado;
- draft e artigo oculto recusados;
- título/descrição/imagem continuam vindo do artigo.

**Commit sugerido:**

```text
feat(home): add versioned editorial curation
```

### Gate editorial antes do Commit 3

O Bruno escolhe e registra:

- slug inicial;
- `eyebrow`;
- início;
- término ou `null`;
- se é campanha sazonal ou escolha evergreen.

Sem esses cinco dados, manter `selection: null` e não inventar campanha.

### Commit 3 — seção Escolha da Cecília

**Objetivo:** integrar o artigo curado, impedir duplicação e publicar o componente aprovado.

**Adicionar:**

- `src/components/sections/HomeEditorialPick.tsx`.

**Modificar:**

- `src/app/(pt)/page.js`;
- `src/components/TrackedHomeLink.tsx`;
- `scripts/test-home-route-tracking.ts`;
- `content/home-curation.json`, com a escolha aprovada;
- documentação da home e da curadoria.

**Integração no servidor:**

1. resolver curadoria ativa;
2. obter seu ID, se houver;
3. selecionar quatro destaques excluindo esse ID;
4. montar a grade excluindo curadoria + destaques;
5. projetar apenas os campos necessários para cada componente.

**Commit sugerido:**

```text
feat(home): add Cecilia editorial pick
```

## 6. Gates

### Focados

```bash
npm run test:review-discovery
npm run test:home-curation
npm run test:home-route-tracking
npm run validate:content
npm run typecheck
```

### Integração

```bash
npm run lint
npm run build
git diff --check
```

O `build` deve executar `test:review-discovery`, `test:home-curation` e
`test:home-route-tracking`. Teste versionado fora do build não é gate.

## 7. Smokes obrigatórios

### Dados e HTML

- quatro links principais únicos;
- no máximo dois cards principais da mesma categoria;
- ordem cronológica preservada entre candidatos aceitos;
- artigo curado presente exatamente uma vez na home;
- artigo curado ausente dos quatro destaques e da grade inferior;
- artigo curado ainda presente em `/reviews` e no filtro da categoria;
- `selection: null` remove a seção sem espaço vazio;
- campanha expirada remove a seção depois da janela de revalidação;
- `canonical` da home e de `/reviews` permanecem inalterados;
- nenhuma URL ou slug é criado por categoria ou curadoria.

### Visual

- desktop de 1280 px ou maior;
- tablet de 768 px;
- mobile entre 360 e 390 px;
- quatro destaques continuam 2×2 no mobile e 1×4 no desktop;
- card curado empilha sem corte de texto no mobile;
- transição Guias → Curadoria → Receitas não cria espaços verticais excessivos;
- foco visível e ordem de tabulação coerente;
- ausência de CLS perceptível;
- título longo não cobre CTA ou imagem.

### Analytics

- `home_featured_guides` continua nos quatro cards;
- `home_reviews_carousel` continua na grade;
- `home_editor_pick` dispara uma vez;
- nenhum evento ao apenas exibir a seção;
- nenhum código de cupom em `link_label` por derivação acidental.

## 8. Buscas recomendadas

Antes:

```bash
rg -n "selectHomeReviewDiscovery|discovery\.featured|featuredIds" src scripts
rg -n "uma vaga|vaga fixa|mais recente de cada categoria" docs
rg -n "homeFeatured" src content docs
```

Depois:

```bash
rg -n "HOME_FEATURED_LIMIT|HOME_FEATURED_MAX_PER_CATEGORY" src/lib/reviewDiscovery.ts
rg -n "home-curation|HomeEditorialPick|home_editor_pick" content src scripts docs
rg -n "uma vaga|vaga fixa|mais recente de cada categoria" docs
# esperado: somente registro histórico explicitamente marcado como supersedido
```

## 9. Fora do escopo

- reorganizar ou renomear as quatro categorias;
- reclassificar artigos para preencher cards;
- alterar `type` ou `reviewKind`;
- mudar filtros, canonical, sitemap ou URLs de `/reviews`;
- alterar `/receitas` ou suas categorias;
- criar suporte a vários artigos curados;
- criar carrossel, rotação aleatória ou personalização por usuário;
- integrar a configuração à Central Editorial nesta entrega;
- criar conteúdo de Black Friday;
- alterar Hero, ticker, Universo, Ofertas ou YouTube;
- push ou deploy sem autorização separada.

A Central pode ganhar edição de `content/home-curation.json` em tarefa posterior. O arquivo e seu
schema devem ser estáveis antes de expor um formulário remoto.

## 10. Proteção da árvore compartilhada

No momento da escrita deste plano há trabalho paralelo em conteúdo, manifest, índice gerado e memória
editorial. A execução usa `git add` explícito por caminho; nunca `git add -A`.

Não tocar nem incluir nos commits desta frente, salvo autorização específica:

- `content/reviews/_manifest.json`;
- `content/reviews/sofa-modular-ou-retratil-qual-escolher.json`;
- `src/lib/generated/content-index.ts`;
- `docs/Memoria de Artigos/memreview/**`;
- arquivos de clusters multilíngues em andamento.

Depois de cada commit, conferir:

```bash
git diff --cached --name-only
git show --stat --oneline HEAD
git status --short
```

## 11. Relatório obrigatório após cada commit

Entregar:

1. SHA e mensagem;
2. caminhos alterados;
3. regra implementada em linguagem simples;
4. seleção resultante no snapshot, sem transformá-la em constante;
5. gates com exit code;
6. smokes manuais realizados;
7. arquivos paralelos preservados;
8. riscos ou decisões pendentes;
9. diff para revisão antes do próximo commit.

## 12. Gate de autorização

Este documento aprova apenas o planejamento em princípio.

Próxima ação depois da revisão do plano:

1. corrigir o próprio documento, se necessário;
2. obter autorização explícita para o Commit 1;
3. executar somente o Commit 1;
4. parar com diff e gates;
5. não iniciar curadoria visual antes da aprovação do seletor e do mockup.
