# Artigos no visual da D2, com o fim novo e mais uso dos cupons

Data: 15/10/2026. Aprovado pelo Bruno em três partes, nesta conversa. Branch `claude/artigo-d2`.

## Objetivo

- O artigo (`/reviews/<slug>` e `/<locale>/reviews/<slug>`) passa a ter a cara do resto do site (D2): marinho,
  título condensado com o marca-texto, cartões com borda de 2px, fundo branco e movimento só com o movimento
  liberado.
- O fim de todo artigo leva a um próximo passo da mesma loja, não a artigos aleatórios.
- O artigo empurra o uso do cupom: copiar o código e ir para a loja (`coupon_copy` e `coupon_store_click`).

Como medir depois do deploy: `coupon_copy` e `coupon_store_click` por artigo e por ponto de origem no GA4,
antes e depois (com o aviso de cookies no ar desde 15/10, comparar só períodos com o aviso).

## Restrições

- 4 tipos de artigo (`reviewKind`: guia, editorial, produto/product, sem tipo) e 10 idiomas.
- Texto dos artigos não muda (JSONs de `content/reviews`).
- Continuam valendo os testes da build: a lateral e a barra fixa no idioma de cada artigo, o FAQ (acordeão =
  FAQPage), a nota editorial, a trilha igual ao BreadcrumbList, os rótulos do CECILIA010 (código de recompensa,
  nunca cupom) e do 4CW5Y (código de indicação da SHEIN Brasil), nenhum texto em português fora do PT.
- Arquivo `'use client'` não importa valores de `@/lib/data`.
- Todo movimento dentro de `prefers-reduced-motion: no-preference`; o marca-texto fica sempre pintado.
- Commits de até 5 arquivos; um PR e um deploy no fim; implementação por subagentes com revisão do Claude.

## Decisões do Bruno

1. Texto corrido (introdução e parágrafos) continua em serifa (Lora); títulos, blocos e interface vão para a D2.
2. Recorte com o código no topo de todo artigo de loja; o topo perde peso para compensar.
3. Ordem do fim: veredito → bloco da loja → caixa da Cecília → relacionados → compartilhar. Sem convite ao grupo
   do WhatsApp.
4. Caminho de construção A: reformar o template atual por partes.
5. Fora desta etapa, na fila: caixa de autor do Bruno Luiz.

## Desenho

### Topo

- Trilha: "Guias & Análises" no lugar de "Reviews", com o nome que o menu de cada idioma já usa; a trilha visível
  e o BreadcrumbList continuam saindo da mesma lista (`breadcrumbs`).
- Uma linha de rótulo: tipo do artigo e categoria.
- Título condensado, marinho, com o marca-texto (entra com movimento). Introdução em serifa.
- Uma linha de dados: autora, data, tempo de leitura, "Ouvir" e a nota (quando houver). Os três selos de hoje
  (nota, "vale a pena", cupom) saem.
- Nota de transparência em uma linha, com o texto completo ao tocar (sem JavaScript: `<details>`).
- Recorte do topo, abaixo da introdução e acima da foto, em todo artigo com loja (`affiliate` ou `coupon`): código,
  copiar (efeito da tesoura e do verde de `/cupons`), desconto em uma linha e "Ir para a <loja>". O tipo do código
  vem de `getStoreCodeKind` e dos rótulos de `couponCopyLocale.ts`/`sidebarCopy.ts`: código, código de
  recompensa (YesStyle), código de indicação (SHEIN), loja sem código (Lejour: "Ver a loja").
- A citação de abertura (antes da ficha) sai do topo; a do corpo fica.

### Corpo

- Subtítulos das seções condensados, marinho, com o marca-texto ao rolar.
- Blocos (ficha do produto, linha do tempo dos guias, citações, tabelas, FAQ, notas editoriais, destaques): borda
  marinho de 2px, fundo branco, destaques em amarelo. O fundo de caderno com linhas sai; o fundo é branco.
- O código citado no texto continua copiável (`HighlightCoupon`; ver "Ajustes durante a implementação").
- Não mudam: sumário, leitura em voz alta, nota editorial, FAQ, galeria de imagens ampliáveis, vídeos.

### Fim

1. Galeria antes do veredito. Com um item só, sem carrossel e sem setas; se o item for o vídeo do topo, a galeria
   não aparece.
2. Veredito (só análise de produto): nota e frase; prós e contras como duas listas independentes, sem linhas
   vazias; no celular, uma embaixo da outra.
3. Bloco da loja ("Sua compra na <loja>"): recorte grande com o código e o copiar; três regras dos dados da loja
   (`eligibleCategories`, `combinable`, data do teste/conferência, os mesmos textos e a mesma data das páginas de
   loja), encurtadas quando longas; "Ir para a <loja>", "Ver todas as regras" (`/cupons/<loja>` ou
   `/<locale>/coupons/<loja>`) e "Todos os N artigos da <loja>" (só em português e só quando a subpágina
   `/reviews/loja/<slug>` existe). Loja sem código usa os rótulos e instruções que já existem para ela. Artigo
   sem loja não mostra o bloco. Substitui o bloco verde "Interessou?".
4. Caixa da Cecília: foto, duas linhas e o link. Textos nos 10 idiomas a partir do que as homes de cada idioma já
   dizem; fora do PT o link vai para a home do idioma (`getShellHomeHref`), no PT para `/sobre`.
5. Relacionados: 6 artigos do mesmo idioma, sem o atual, ordenados por mesma loja → mesma categoria → mesmo tipo
   → mais novo; cartões da estante de `/reviews` (foto em cima, texto embaixo, regra de `cardImage.ts`), em
   cascata com o ímã. "Ver todos" vai para a subpágina da loja quando existe; senão, para a lista de guias do
   idioma.
6. Compartilhar.

### Lateral (computador) e celular

- Lateral no lugar de hoje, no visual da D2: sumário, recorte compacto (código, copiar, ir para a loja),
  veredito, "Leia também". Textos de `sidebarCopy.ts`.
- Barra fixa do celular: aparece depois que o recorte do topo sai da tela (como o `CouponDock` das páginas de
  loja) e some enquanto o bloco da loja do fim está visível. A gaveta do sumário continua.

### Conversão

- Depois de copiar, todo recorte mostra "Copiado. Agora é só colar no checkout da <loja>" (texto nos 10 idiomas,
  e o rótulo certo para recompensa e indicação) e destaca o "Ir para a <loja>".
- Medição: `coupon_copy` e `coupon_store_click` ganham o campo `placement` (`article_top`, `article_inline`,
  `article_sidebar`, `article_dock`, `article_end`). Os nomes dos eventos não mudam.

### Efeitos (só com o movimento liberado)

Marca-texto no título e nos subtítulos; tesoura que corre e verde ao copiar nos recortes; recorte do topo que
assenta ao carregar; relacionados em cascata com o ímã. Reaproveitar as classes do `globals.css` (`.recorte`,
`.recorte-tesoura`, `.recorte-entra`, `.marca-texto`, `.revela`) e o `CouponShelfItem`/`cardDecor` onde couber.

## Arquitetura

`ReviewNotebookTemplate.tsx` (~800 linhas) vira um montador de peças pequenas em `src/components/review/`:
topo (`ArticleHeader`), recorte (`ArticleCouponCutout`, usado no topo, na lateral e no fim), corpo (o que já existe
em `ReviewContentSections`), fim (`ArticleVerdict`, `ArticleStoreBlock`, `ArticleAuthorBox`, `ArticleRelated`). Os
dados saem de `review-template-props.js` (novo: as regras da loja, o caminho da subpágina, os 6 relacionados) e
chegam por props; nenhum componente de cliente importa `@/lib/data`. A escolha dos relacionados é uma função
pura testável em `src/lib/`. Textos novos vão para `articleCopy.ts` nos 10 idiomas, nunca soltos no JSX.

## Etapas

1. Dividir o template em peças, sem mudança visível (o HTML do build igual ao de antes nos pontos que os testes
   conferem).
2. Topo, trilha e recorte do topo.
3. Corpo e blocos no visual da D2 (sem fundo de caderno).
4. Fim: galeria, veredito, bloco da loja, caixa da Cecília, relacionados.
5. Lateral, barra fixa, mensagem depois de copiar, efeitos e medição.
6. CLAUDE.md, build completo, prints em 375 e 1280 px dos 4 tipos em PT e de um artigo em outro idioma.

## Testes

- `test:build-output` passa a conferir, em todo artigo: o recorte do topo e o bloco da loja quando há loja, com o
  rótulo certo do tipo de código; nenhum dos dois sem loja; 6 relacionados (ou todos os possíveis), os da mesma
  loja primeiro e todos no idioma do artigo; nenhuma galeria de um item que repete o vídeo do topo; a trilha com o
  nome da lista de guias do idioma; nenhum texto em português fora do PT nos blocos novos.
- Teste unitário da escolha dos relacionados e do encurtamento das regras.
- `placement` presente em todo `coupon_copy`/`coupon_store_click` dos componentes do artigo.

## Fora do escopo

Texto dos artigos; caixa de autor do Bruno Luiz (fila); cabeçalho do site (etapa 5 da fila, inclusive o "Receitas"
marcado como página atual); grupo do WhatsApp; páginas de loja e `/reviews`.

## Ajustes durante a implementação

- Os `placement` seguem o padrão `review_*` já usado no GA4 (`review_top`, `review_inline`, `review_sidebar`,
  `review_mobile_dock`, `review_mobile_drawer`, `review_end`), não `article_*`: o histórico continua comparável.
  `review_final_cta` e `review_verdict` saíram.
- O código citado no texto copia por `HighlightCoupon`; o `InlineCouponCopy` foi removido (com `PullQuote` e
  `ReviewProductSpecGrid`, que ficaram sem uso). Bruno (15/10): o código no corpo copia ao toque, só o da loja do
  artigo.
- "Ir para a loja" fica genérico, sem o nome da loja (como nas páginas de loja), para não criar texto novo com
  "da/do" nos 10 idiomas.
- As regras do bloco da YesStyle saem dos textos do código de recompensa da página da YesStyle (combinável,
  campo Reward Code, data conferida); as regras de cupom da loja não entram, porque descrevem outro tipo de
  código.
- Artigo com `cta` de afiliado e sem loja cadastrada ganha um bloco "Ver na <loja>" no lugar do bloco da loja,
  com o link de afiliado do próprio artigo (`cta.url`, `rel` sponsored), sem código nem regras (Bruno, 15/10).
- O sumário da lateral tem altura máxima e rola por dentro, para o recorte do código continuar à vista.
