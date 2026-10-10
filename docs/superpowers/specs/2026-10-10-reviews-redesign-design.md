# /reviews e as subpáginas das lojas (D2.2)

**Data:** 2026-10-10
**Status:** desenho aprovado pelo Bruno em 10/10, parte por parte; esta spec espera a revisão dele.
**Base:** o branch `claude/home-d2-2`, que acumula as correções e os redesigns da D2.2 para um deploy só,
no HEAD `21e7250`.
**Telas do brainstorm:** `.superpowers/brainstorm/4090-1791651123/content/` (pasta fora do git):
`reviews-caminhos.html` (os três caminhos), `reviews-a-estrutura.html` (parte 1),
`reviews-a-comportamento.html` (parte 2), `reviews-a-lojas.html` (parte 3) e `reviews-a-efeitos.html`
(a demonstração dos efeitos, que funciona no navegador).

## Contexto e objetivo

`/reviews` é a lista de Guias & Análises em português: 68 artigos hoje, 15 com o selo "Novo". A página
ainda tem a cara de antes da D2: o bloco azul com folhas flutuantes, os cartões altos de foto, oito
cartões por vez e "Carregar mais" de quatro em quatro. A única forma de achar um artigo é rolar ou filtrar
por uma das quatro categorias.

As subpáginas `/reviews/loja/<loja>` existem desde a D2 para as lojas ativas com mais de 3 artigos (hoje
DAMIE 15, Dolce Gusto 16, I Wanna Sleep 11, Nestlé Nutre 8, YesStyle 5 e Let's Eat It 4). Elas usam o
mesmo cartão alto e mostram tudo de uma vez.

O redesign tem três objetivos, na escolha do Bruno:

1. **A cara da D2:** a mesma linguagem visual da home (marinho, creme, laranja, amarelo-cupom, títulos
   condensados com marca-texto, cartões com borda marinho de 2 px).
2. **Vitrine editorial:** o que é novo e as lojas em destaque antes da lista.
3. **Achar mais rápido:** busca na página, lista compacta e ordem.

## Decisões do Bruno (10/10)

1. **"Achar mais rápido" é busca na página, lista compacta e ordem.** Filtros combinados (várias
   categorias ou lojas ao mesmo tempo) ficaram de fora.
2. **Escopo:** `/reviews` e as subpáginas das lojas.
3. **Faixas da vitrine:** Novidades e Por loja. Data comercial e faixa por categoria ficaram de fora.
4. **Layout A, "vitrine em cima, acervo embaixo"** (`reviews-caminhos.html`).
5. **Ordens:** "Mais novos" (o padrão) e "A–Z". "Mais lidos" ficou de fora: precisa de dados do Analytics
   que a build não tem.
6. **Estrutura, comportamento e subpáginas** como nas partes 1 a 3, com a primeira página da lista em
   **12 cartões antes do "Carregar mais"**, também nas subpáginas: a tendência é ter muito mais artigos.
7. **Busca nas subpáginas** só quando a loja passa de 12 artigos.
8. **Efeitos** como na demonstração (`reviews-a-efeitos.html`).
9. A repetição entre as Novidades e o começo de "Todos os artigos" fica, como a da home (decisão de 08/10).

## Fora do escopo

- **`/<locale>/reviews`** (`LocalizedReviewHub`). A spec da home em outros idiomas apontava o redesign
  dessa página para este item; o escopo escolhido foi só o português. Fica para depois.
- **A busca do site** (`/buscar` e a busca do cabeçalho). Não muda.
- **A home.** O cartão do "Acabou de sair" (`LatestCard`) continua o dela. As bolinhas da home só mudam
  por dentro: a inclinação do mouse vira uma função comum às duas páginas, sem mudança visível.
- **Quem tem subpágina.** Continua a regra de loja ativa com mais de 3 artigos.
- **"Mais lidos"** e **filtros combinados.**

## A página `/reviews`

O fundo passa a ser o branco da home, com as fontes da home (`couponFontVariables`). Os títulos das
seções são os condensados com o marca-texto (`font-condensada`, `.marca-texto`), como no `HomeSection`.

### Topo

- O `h1` continua "Guias & Análises", com o marca-texto.
- Embaixo, o total e a frase de hoje, que foi escrita para não prometer experiência própria em todo
  artigo: "68 guias e análises. Guias práticos, experiências reais quando existem e análises baseadas em
  dados e fontes declaradas." O número sai dos dados.
- A busca: um campo com borda marinho de 2 px e cantos redondos, com a lupa, o texto de exemplo "Buscar
  guia, produto ou loja" e o rótulo "Buscar nos guias e análises" para o leitor de tela.
- Saem o bloco azul, as folhas flutuantes e a animação de entrada.
- O título da página e a descrição para o Google não mudam.

### Novidades

- Os artigos com `isNew` (o selo "Novo", que segue a regra mensal), do mais novo para o mais antigo, todos.
- Cartões de geladeira, como no "Acabou de sair" da home: ímãs e inclinação pela posição (`CARD_DECOR`),
  data no formato DD/MM, tipo, título e a loja embaixo.
- Uma fila que rola na horizontal (`ScrollRow`). No computador, setas só quando a fila não cabe, como o
  carrossel do Dicas & Ofertas (item 1 da D2.2). No celular, o último cartão aparece pela metade e um
  degradê na borda direita some no fim da fila.
- Sem nenhum artigo com `isNew`, a seção não aparece.
- As fotos dos dois primeiros cartões carregam sem atraso (`priority`), porque podem ser o LCP no celular.

### Por loja

- As bolinhas da home, como links para `/reviews/loja/<loja>`: o disco com o logo (ou as iniciais), o nome
  e "15 artigos" embaixo.
- Só as lojas com subpágina, na ordem da vitrine da home (a de `couponsData.ts`). Insider (3 artigos) e
  Magalu (1) ficam no acervo e na busca.

### Todos os artigos

- O título "Todos os artigos".
- A barra: as categorias ("Todos" e as quatro de `REVIEW_CATEGORIES`, com os rótulos de hoje), o total
  ("68 artigos"), a ordem e o botão de grade ou lista.
- **O cartão da grade:** o da home, sem ímã e sem inclinação. Borda marinho de 2 px, foto em cima, a linha
  "data, tipo", o título e a loja numa faixa creme embaixo (sem loja, sem a faixa). A data tem o ano
  (DD/MM/AAAA), porque o acervo atravessa anos. O selo "Novo" fica na foto. O tempo de leitura sai.
- **A linha da lista:** foto pequena (quadrada), título e, embaixo, "data, tipo" e a loja.
- Grade: 2 colunas no celular, 3 no tablet, 4 no computador. Lista: uma coluna, com o mesmo conteúdo.
- "Carregar mais" embaixo, enquanto houver artigos.

### Fim

O aviso de sempre: "Cada conteúdo informa sua base: experiência própria, dados públicos ou fontes
declaradas. Parcerias comerciais são identificadas explicitamente."

## Comportamento

### Busca

- Filtra enquanto a pessoa digita, sem ida ao servidor, sobre os artigos que a página já recebeu.
- Procura nos mesmos campos da busca do site (título, resumo, tipo, categoria, `productName`, `brand`,
  `tags` e `collections`) e no nome da loja.
- Não liga para acento nem maiúscula: o texto de cada artigo vem do servidor já normalizado (NFD, sem os
  acentos, em minúsculas), e a busca normaliza o que a pessoa digita do mesmo jeito.
- Com mais de uma palavra, o artigo precisa ter todas.
- Com texto na busca:
  - Novidades e Por loja saem;
  - o título da seção vira "Resultados da busca";
  - o total vira "3 artigos com “travesseiro”" e é anunciado ao leitor de tela (`aria-live="polite"`);
  - os resultados seguem a ordem escolhida.
- O ✕ dentro do campo e a tecla Esc limpam a busca; o ✕ devolve o foco ao campo.
- **Sem resultado:** "Nenhum artigo com “air fryer”." e dois botões:
  - "Buscar “air fryer” no site todo", que leva a `/buscar?q=air%20fryer` (inclui as receitas). Com uma
    categoria marcada, este botão vira "Buscar em todas as categorias" e só desmarca a categoria;
  - "Limpar a busca".

### Categorias

Como hoje: uma por vez, "Todos" desmarca, e valem junto com a busca. No celular, numa linha só que rola
de lado, com o degradê na borda; a partir de `md`, quebram linha.

### Ordem

Uma lista de opções nativa (`<select>`), com o rótulo "Ordem" para o leitor de tela:

- **Mais novos** (padrão): pela `publishedAtISO`, e pelo id no empate, como `sortReviewsByPublishedAt`.
  O `isNew` não passa mais à frente, porque as Novidades já mostram esses artigos.
- **A–Z:** pelo título, com `localeCompare('pt-BR', { sensitivity: 'base', numeric: true })`.

### Grade ou lista

- Dois botões ("Grade" e "Lista", com ícone e texto), com `aria-pressed`.
- A escolha fica no aparelho (`localStorage`, com `try/catch`). O HTML do servidor sai em grade; quem
  escolheu lista vê a troca logo depois de a página abrir.

### Carregar mais

- A primeira página tem 12 cartões na grade ou 24 linhas na lista; cada clique abre mais 12 (grade) ou
  24 (lista).
- Na troca de grade para lista (e de volta), a quantidade aberta é a maior entre a atual e a primeira
  página do modo novo, para a pessoa não perder o ponto.
- O foco do teclado vai para o primeiro artigo novo.
- Trocar busca, categoria ou ordem volta à primeira página.

### Endereço e volta

- A busca, a categoria e a ordem ficam na URL: `?q=`, `?categoria=` (os valores de hoje) e `?ordem=az`
  (sem o parâmetro, "Mais novos"). Valores inválidos são ignorados.
- A categoria e a ordem usam `pushState` (o voltar do navegador desfaz a troca); a busca usa
  `replaceState`, para não criar uma entrada no histórico por letra. Nada disso busca de novo o payload
  da página (a regra do `CLAUDE.md` para filtros que só mudam a query string).
- O HTML do servidor sai sem parâmetros ("Todos", "Mais novos", sem busca). O cliente lê a URL depois de
  montar, como a categoria já faz hoje (`useSyncExternalStore` com o `useSearchParams` isolado num
  componente com Suspense próprio).
- Quantos cartões estavam abertos fica no `sessionStorage`, pela URL da lista. Quem abre um artigo e volta
  encontra a mesma lista, com os mesmos cartões abertos, para o navegador voltar à mesma altura.

## Subpáginas das lojas (`/reviews/loja/<loja>`)

- **Topo:**
  - a trilha visível "Início › Guias & Análises › Artigos da DAMIE", da mesma lista que monta o
    `BreadcrumbList` do JSON-LD;
  - a bolinha da loja em destaque (o disco com o anel amarelo), o `h1` "Artigos da DAMIE" com o
    marca-texto e "15 artigos da Cecília sobre a DAMIE" (os textos de hoje, de `getStoreArticlesPage`);
  - o botão laranja "Ver o código da DAMIE", para `/cupons/damie`, medido como hoje
    (`coupon_page_click`, posição `reviews_store_page`).
- **Busca:** só quando a loja passa de 12 artigos (hoje DAMIE e Dolce Gusto), com o texto de exemplo
  "Buscar nos artigos da DAMIE", procurando só nos artigos da loja. Sem resultado, o botão principal é
  "Buscar “x” em todos os guias e análises", que leva a `/reviews?q=x`; com uma categoria marcada, ele
  vira "Buscar em todas as categorias", como em `/reviews`.
- **Artigos:** a mesma barra, os mesmos cartões e as mesmas regras de `/reviews`:
  - as categorias que aparecem são só as que a loja tem; com uma só, os botões somem;
  - o cartão e a linha não repetem o nome da loja;
  - 12 cartões (ou 24 linhas) antes do "Carregar mais"; loja com até 12 artigos mostra todos.
- **Fim:** "Outras lojas", com as bolinhas das demais lojas com subpágina (sem a da página), e o link "Ver
  todos os guias e análises".
- **Não muda:** o endereço, quem tem subpágina, o título e a descrição para o Google, a imagem de
  compartilhamento e o JSON-LD.

## Efeitos e animações

As regras da D2.1 valem para tudo:

- Todo movimento fica dentro de `prefers-reduced-motion: no-preference`. Com "reduzir movimento", nada se
  move e tudo funciona.
- Nada fica escondido sem JavaScript: a rolagem só esconde depois de montar e só o que está abaixo da tela
  (`RevealSection`). O `test:build-output` já barra `data-reveal` no HTML do servidor.
- As animações mexem só em `opacity`, `transform`/`translate`/`scale`/`rotate`, `box-shadow` e
  `background-size`, sem deslocar o layout.

Os efeitos:

1. **Topo:** o marca-texto do `h1` se pinta da esquerda para a direita uma vez, quando a página abre (a
   seção já está na tela, então não é a da rolagem: é uma animação de carga com o mesmo `@keyframes`).
2. **Títulos de baixo** (Novidades, Por loja, Todos os artigos e Outras lojas): o marca-texto se pinta
   quando a seção chega à tela (`RevealSection`, como na home).
3. **Novidades:** os cartões entram em cascata na primeira vez que a faixa aparece (`.revela` com `--i`).
   Com o mouse, o cartão se endireita e sobe um pouco, como o `LatestCard`.
4. **Bolinhas:** as da home (`.bolinha`, `.bolinha-disco`, `.bolinha-logo`): com o mouse, o disco inclina
   para o lado do ponteiro e o logo cresce; no toque, o disco afunda; no celular, entram da direita, uma
   depois da outra. Na `/reviews` e em "Outras lojas", o anel amarelo aparece com o mouse em cima (na home
   ele marca a loja escolhida); na subpágina, a bolinha do topo fica com o anel.
5. **O acervo, o efeito principal:** ao trocar categoria, ordem, grade ou lista, ou ao digitar na busca, os
   cartões que continuam deslizam até o lugar novo, os que saem desbotam e os que chegam aparecem. Na troca
   para lista, cada cartão encolhe até virar a linha dele. Usa a View Transitions API
   (`document.startViewTransition` com `flushSync`), que o site já usa ao abrir um artigo.
   - Os nomes de transição dos cartões (`view-transition-name`) só existem durante a troca: uma classe no
     acervo os liga a partir de uma variável por cartão e é tirada no fim. Assim o HTML não leva nenhum
     nome, e a ida para um artigo não captura os cartões todos.
   - Na busca, a troca espera a pessoa parar de digitar por um instante (cerca de 120 ms); uma troca nova
     encerra a anterior.
   - Sem a API (Firefox) ou com "reduzir movimento", a lista troca na hora.
6. **Carregar mais:** os cartões novos entram em cascata.
7. **Busca sem resultado:** o aviso assenta como um carimbo, com o efeito do recorte do código na vitrine
   da home (`.carimbo`).
8. **Cartão da grade com o mouse:** sobe um pouco, ganha sombra, e a foto cresce de leve.
9. **Ao abrir um artigo:** a foto do cartão "voa" para o topo do artigo, como hoje. Como o mesmo artigo
   pode aparecer nas Novidades e no acervo, e nomes repetidos cancelam a transição, a foto só recebe o
   nome `review-hero-<slug>` no clique, no cartão clicado, logo antes da navegação.

## Arquitetura

### Dados no servidor

- **Módulo novo `src/lib/reviewsHub.ts`.** Como o `homeStores.ts`, recebe as reviews por parâmetro e não
  importa `@/lib/data`. Monta:
  - **os artigos da lista**, num tipo próprio (`ShelfArticle`): id, slug, href, título, tipo, categoria,
    `publishedAtISO`, as duas datas prontas (DD/MM e DD/MM/AAAA), loja (nome e slug), foto já resolvida
    (`resolveMediaUrl`), `alt`, enquadramento, `isNew` e o texto de busca normalizado;
  - **as Novidades**;
  - **as bolinhas** (slug, nome, logo, iniciais, total e href), a partir de `getStoreArticlePageSlugs` e
    das lojas ativas;
  - **as categorias presentes** numa lista de artigos;
  - **o conteúdo da subpágina**, usando o `getStoreArticlesPage` de hoje para os textos e a regra de quem
    tem subpágina.
- **Constantes de página:** 12 (grade), 24 (lista) e o limite da busca na subpágina (12), exportadas e
  testadas.
- **A normalização da busca** é uma função pura, num módulo sem dependências (para o cliente importar sem
  levar dados), usada pelo servidor (texto dos artigos) e pelo cliente (o que a pessoa digita).

### Componentes

- **`ReviewsBrowser`** (cliente, `src/components/reviews/`): a busca (opcional), as categorias, a ordem, a
  grade ou lista, o "Carregar mais", o aviso de busca vazia, a URL, o `sessionStorage` e o
  `localStorage`, as transições e a medição. Recebe os artigos e as categorias por props. O topo e a
  vitrine (Novidades e Por loja) chegam como elementos prontos do servidor; o `ReviewsBrowser` só decide
  se mostra a vitrine (sem texto na busca).
- **`ReviewShelfCard`** (grade e lista, com ímã e inclinação opcionais para as Novidades): substitui o
  `ReviewHubCard`, que é apagado com os mapas `accentByType` e `iconByType`.
- **`StoreBubbleLink`**: a bolinha como link. A inclinação do mouse sai do `StoreBubble` da home para um
  hook comum (`useBubbleTilt`), e o `StoreMark` passa a aceitar só o logo e as iniciais. Sem mudança
  visível na home.
- **`CARD_DECOR`** sai do `HomeLatest.tsx` para um módulo próprio em `src/components/ui/`, usado pela home
  e pelas Novidades.
- **`src/app/(pt)/reviews/page.js` vira `page.tsx`**, e o `ReviewsClientPage.js` é apagado.
- **A subpágina** (`reviews/loja/[brand]/page.tsx`) troca o corpo pelo topo novo, o `ReviewsBrowser` e as
  Outras lojas.
- **`ViewTransitionLink`** ganha o nome da foto no clique (item 9 dos efeitos).

### Peso

- Os artigos chegam ao cliente pelas props, como hoje, agora com o texto de busca: cerca de 6 KB a mais,
  comprimidos, para 68 artigos.
- Nenhum componente cliente novo importa valores de `@/lib/data`; o `test:client-bundle` segue na build.

## Medição

Três eventos novos, pelo `trackEvent` de `src/lib/analytics.js`:

1. **`reviews_route_click`**, nos links de artigo e de loja das duas páginas: `destination`, `placement` e
   `link_label`, como o `home_route_click`. Posições:
   - `reviews_new` (Novidades), `reviews_stores` (bolinhas), `reviews_grid` e `reviews_list` (acervo);
   - `store_grid`, `store_list`, `store_other_stores` e `store_all_reviews` (o "Ver todos" da subpágina).
2. **`search`** (o evento recomendado do GA4): `search_term`, `results_count` e `list_path`
   (`/reviews` ou `/reviews/loja/<loja>`). Dispara quando a pessoa para de digitar por 1,5 s, com pelo
   menos 2 letras, e não repete o mesmo termo seguido. As buscas sem resultado mostram o que falta
   escrever.
3. **`reviews_list_control`**: `control` (`category`, `sort` ou `view`), `value` e `list_path`, quando a pessoa
   troca a categoria, a ordem ou o modo.

O `coupon_page_click` do botão "Ver o código" continua.

## SEO

- **`/reviews` ganha o JSON-LD de lista** pelo `getCollectionPageJsonLd`: um `CollectionPage` com todos
  os artigos em português, na ordem "Mais novos", e o `BreadcrumbList` (Início › Guias & Análises).
- **Imagem de compartilhamento de `/reviews`:** a capa do artigo mais novo, a regra da página de data,
  com o `og:image`, o cartão do X e o `og:locale`.
- O canonical continua `/reviews`, com ou sem `?q=`, `?categoria=` ou `?ordem=`.
- O HTML do servidor traz o topo, as Novidades, as bolinhas e os 12 primeiros artigos. O resto continua no
  sitemap e nas subpáginas.
- Nas subpáginas, a trilha visível e o `BreadcrumbList` saem da mesma lista.

## Acessibilidade

- A busca fica num `role="search"`, com rótulo. O total é `aria-live="polite"`.
- As categorias e o modo são botões com `aria-pressed`; a ordem é um `<select>` com rótulo.
- Todo link e botão leva o anel de foco da casa (`FOCUS_RING`). O foco não move nada sozinho, salvo o
  "Carregar mais" (para o primeiro artigo novo) e o ✕ da busca (para o campo).
- A fila das Novidades usa o `ScrollRow`, que traz o cartão focado pelo teclado inteiro para a tela.
- Alvos de toque com pelo menos 44 px de altura.
- Os ímãs e o anel são decoração (`aria-hidden`).

## Testes

Todos na build (o `validate:content` não roda nela nem no Gate 1):

- **`scripts/test-reviews-hub.ts`** (novo, na cadeia do `npm run build` e como `npm run test:reviews-hub`):
  - a normalização e a busca (acento, maiúscula, todas as palavras, nome da loja);
  - as duas ordens, inclusive acentos e números no A–Z;
  - as Novidades pelo `isNew` e a seção vazia sem ele;
  - as bolinhas: só lojas com subpágina, na ordem da home, com o total;
  - as categorias presentes, a busca na subpágina só acima de 12 artigos e as constantes 12 e 24;
  - os parâmetros dos três eventos;
  - controles positivos: cada regra falha quando o dado vem errado.
- **`test:build-output`**, no HTML gerado:
  - `/reviews`: o `h1`, a busca com rótulo, as Novidades (uma por artigo com `isNew`), as bolinhas (uma por
    loja com subpágina, com o href certo), os 12 primeiros artigos na ordem "Mais novos", com o anel de
    foco, e nenhum `review-hero-` no HTML;
  - o JSON-LD e a imagem de `/reviews` pelo `assertListPageSeo` que já existe;
  - as 6 subpáginas: a trilha visível igual ao `BreadcrumbList`, a busca só acima de 12 artigos, só as
    categorias da loja e "Outras lojas" sem a loja da página;
  - a conferência dos cartões de hoje (`assertHubCards`) passa para o cartão novo.
- **Conferência no navegador:** `/reviews` e duas subpáginas (uma com busca e uma sem), a 375, 768 e
  1280 px; teclado; "reduzir movimento"; busca, categorias, ordem, modo e "Carregar mais"; voltar de um
  artigo; a foto que voa para o artigo saindo das Novidades e do acervo.
- **Revisões:** cada etapa passa pelo Claude e pelo Meta Muse, como nas outras frentes da D2.2.

## Ordem da implementação

No branch `claude/home-d2-2`. Cada commit toca no máximo 5 arquivos, com typecheck, lint e os testes da
etapa antes do commit:

1. **Dados:** `reviewsHub.ts`, a normalização, `test-reviews-hub.ts` e o script no `package.json`.
2. **Peças visuais:** `CARD_DECOR` no módulo próprio, `useBubbleTilt` e `StoreBubbleLink` (com a home
   usando o hook), `ReviewShelfCard` e o nome da foto no clique do `ViewTransitionLink`.
3. **O acervo:** `ReviewsBrowser`, com a URL, a memória, as transições e a medição, e os testes que dá para
   fazer sem a build.
4. **`/reviews`:** `page.tsx` com o topo, as Novidades, as bolinhas, o acervo, o JSON-LD e a imagem; sai o
   `ReviewsClientPage.js`; travas no `test:build-output`.
5. **Subpáginas:** o topo novo, a trilha, o acervo e as Outras lojas; sai o `ReviewHubCard`; travas no
   `test:build-output`.
6. **Documentação:** no `CLAUDE.md`, a tabela de páginas, as camadas de componentes e a lista de testes; na
   seção 10 do `docs/GUIA-EDITORIAL-GUIAS-ANALISES.md`, as Novidades de `/reviews` pelo `isNew`.

Depois: a conferência no navegador, o build completo e a revisão final do branch. O deploy vai com o
resto da D2.2, quando o Bruno decidir.

## Riscos

- **Transições de página e de lista juntas:** a ida para o artigo usa `startViewTransition` com o
  `router.push`, e a lista usa outra transição. Nomes repetidos cancelam a transição. Por isso os nomes só
  existem durante cada uma (efeitos 5 e 9), e a conferência no navegador cobre os dois caminhos.
- **Volta para a altura certa:** depende de a lista voltar com os mesmos cartões antes de o navegador
  restaurar a rolagem. Se o Next restaurar antes, a memória ainda devolve a lista certa, e a altura fica
  como risco anotado para o Bruno decidir.
- **A troca da grade para a lista depois de abrir** (preferência guardada no aparelho): é rápida, mas
  visível. A alternativa, guardar o modo na URL, deixaria links com `?ver=lista` circulando.
- **O 1010VIBES vence em 12/10 às 21h (BRT)**, e a build para a partir daí. A implementação vai passar
  dessa data: sem a oferta nova da YesStyle, a build completa deixa de rodar no branch.
