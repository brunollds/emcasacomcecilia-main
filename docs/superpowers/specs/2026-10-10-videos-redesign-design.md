# /videos e as páginas de cada vídeo (D2.2)

**Data:** 2026-10-10
**Status:** desenho aprovado pelo Bruno em 10/10, parte por parte; esta spec espera a revisão dele.
**Base:** o branch `claude/home-d2-2`, que acumula as correções e os redesigns da D2.2 para um deploy só,
no HEAD `a768958` (o redesign de `/reviews` está pronto nele).
**Telas do brainstorm:** `.superpowers/brainstorm/4090-1791651123/content/` (pasta fora do git):
`videos-caminhos.html` (os três caminhos) e `videos-pagina-do-video.html` (a página de cada vídeo).

## Contexto e objetivo

`/videos` é uma grade de 14 vídeos no estilo de antes da D2: fundo creme, cartões brancos com foto
deitada e "Assistir ao vídeo". Cada vídeo tem uma página própria, `/videos/<slug>`. Ela traz o player,
o `VideoObject` e o link para o guia ou a receita de origem. Essas páginas existem para o Google
indexar os vídeos (`docs/GUIA-EDITORIAL-VIDEOS.md`, seção 6).

**Os vídeos de hoje:**
- 12 estão no YouTube. Destes, **10 são Shorts verticais**. Só 2 são deitados: a lava e seca Samsung
  (18 min) e o skincare (3 min 27 s).
- 2 são MP4 do site, quadrados: o cupom da I Wanna Sleep e o primeiro preparo da Genio S Touch.
- A página de exibição mostra todo vídeo do YouTube numa moldura 16:9, então os Shorts aparecem com
  faixas pretas dos lados.

**Por loja de origem** (o `affiliate` do artigo):
- DAMIE: 6;
- Dolce Gusto: 2;
- I Wanna Sleep: 2;
- YesStyle: 1;
- sem loja: 2 (a manteiga e a lava e seca);
- receita: 1 (a rabanada).

**A home é outra coisa.** O "Últimos vídeos" da home puxa os 6 uploads mais novos do canal pela API do
YouTube e leva direto ao YouTube, nunca a `/videos`.

**O objetivo, na escolha do Bruno,** é que a página faça dois trabalhos, em camadas:
1. **Levar ao guia e à loja:** os vídeos com página própria são a prova dos guias.
2. **Crescer o canal:** os últimos uploads e o botão de se inscrever.

## Decisões do Bruno (10/10)

1. **Propósito:** os dois, em camadas. Em cima ficam os vídeos com página própria, ligados aos guias;
   embaixo, os últimos do canal com "Inscrever-se".
2. **Escopo:** a página `/videos` e as 14 páginas de exibição.
3. **Layout A, "destaque e grade com lojas"** (`videos-caminhos.html`). As filas por tema (B) e o canal
   primeiro (C) ficaram de fora.
4. **Página `/videos` e página de cada vídeo** como nas seções 1 e 2 do brainstorm, inclusive a mudança
   na home (o "Últimos vídeos" leva à página do vídeo quando ela existe, e ganha "Ver todos os vídeos").

## Fora do escopo

- Vídeos novos, transcrições e campos editoriais novos além do formato (`aspect`).
- Trocar o player do YouTube por uma fachada (imagem e clique). A página de exibição continua com o
  `<iframe>` carregado, como hoje, que é o que o Google já indexa.
- Busca e ordem em `/videos`: são 14 vídeos.
- Páginas de vídeo em outros idiomas (não existem).
- Mudar a API do YouTube, o intervalo de renovação (1 h) ou o número de uploads (6).

## A página `/videos`

### Topo

- **A trilha** "Início › Vídeos", igual ao `BreadcrumbList`.
- **O `h1` "Vídeos"** com o marca-texto da D2.
- **Uma frase com o total:** "14 vídeos da casa da Cecília. Cada um leva ao guia ou à receita completa."
  O número sai do dado.

### Destaque

- **O vídeo mais novo,** pela data de publicação (`uploadDate`), em tamanho grande. Ele traz:
  - a miniatura, com o play;
  - o título;
  - "Do guia:" ou "Da receita:" com o título da origem.
- **Os links:**
  - a miniatura e o título levam à página do vídeo. O hub não tem player;
  - um link secundário, "Ler o guia" ou "Ver a receita", leva à origem.
- **O destaque segue o formato do vídeo:**
  - **vertical:** cartão 9:16, com o texto ao lado;
  - **deitado:** 16:9 em toda a largura, com o texto embaixo;
  - **quadrado:** 1:1, com o texto ao lado.

  Hoje o mais novo é o do skincare, que é deitado.

### Todos os vídeos

- **O título** é o `h2` "Todos os vídeos".
- **Os chips:**
  - "Todos" mais as lojas ativas com **2 ou mais vídeos**. Hoje: DAMIE, Dolce Gusto e I Wanna Sleep.
  - A loja sai do `affiliate` do artigo de origem. Não há lista nova para manter.
  - Os vídeos sem chip só aparecem em "Todos": a YesStyle, a lava e seca, a manteiga e a rabanada.
- **A grade:**
  - os 14 vídeos, do mais novo ao mais antigo, inclusive o do destaque;
  - 2 colunas no celular, 3 a partir de `sm`, 4 de `md` e 5 de `lg`;
  - sem "Carregar mais".
- **O cartão** é vertical (9:16) para todos os vídeos. A miniatura é recortada no meio (`object-cover`),
  como o "Últimos vídeos" da home já faz. Cada cartão traz:
  - o título, no máximo em 3 linhas;
  - a duração num selo ("0:54", "18:17");
  - o nome da loja (ou "Receita") embaixo.
- **O link e o título:** o cartão leva à página do vídeo. O título é o primeiro texto no DOM, num `h3`,
  como os cartões de `/reviews`.

### Últimos do canal

- **Os uploads:** os 6 mais novos do canal, os mesmos da home (`getYoutubeHighlights`), numa fila que
  rola (`ScrollRow`), com o cartão vertical da home.
- **O destino de cada cartão:**
  - um vídeo que já tem página no site leva a ela (`getVideoPageForYoutubeUrl`);
  - os outros abrem o YouTube numa aba nova.
- **"Inscrever-se no canal"** leva a `https://youtube.com/@emcasacomcecilia?sub_confirmation=1`, numa
  aba nova. Antes do botão vem uma linha curta sobre o canal.
- **Sem a chave da API** ou sem uploads, a seção some, como na home.

### Comportamento dos chips

- **A loja escolhida grava na URL** como `?loja=<slug>`, com `pushState`. "Todos" tira o parâmetro.
- **Voltar e Avançar** trocam o filtro, e a página nunca grava fora de `/videos`. É a mesma regra da
  estante de `/reviews` (`isOnList`).
- **Parâmetro ruim:** uma loja desconhecida, ou com menos de 2 vídeos, cai em "Todos".
- **O HTML do servidor** traz "Todos". O filtro lê a URL depois da hidratação, como em `/reviews`.
- **O canonical** continua `/videos`, com ou sem `?loja=`.

## A página de cada vídeo (`/videos/<slug>`)

A ordem obedece ao guia de vídeo: um player grande logo depois do `h1`, sem carrossel antes.

1. **A trilha** "Início › Vídeos › <título>", a mesma lista do `BreadcrumbList`. O último item é o
   `aria-current`.
2. **O `h1`** é o título do vídeo, igual ao `name` do `VideoObject` (regra do guia), com o marca-texto.
3. **O player,** no formato do vídeo:
   - **vertical (Shorts):** 9:16, com altura de até `min(80svh, 720px)`, centralizado;
   - **deitado:** 16:9, na largura do conteúdo;
   - **quadrado (MP4):** 1:1, com largura de até 3xl.

   O YouTube continua num `<iframe>` com os mesmos atributos de hoje. O MP4 continua com `<video
   controls preload="metadata">` e o poster.
4. **O painel,** ao lado do player no desktop (`lg`, quando o vídeo é vertical ou quadrado) e embaixo no
   celular e nos vídeos deitados:
   - **"Sobre este vídeo":** a data (DD/MM/AAAA), a duração ("54 s", "1 min 12 s", "18 min 17 s") e a
     descrição;
   - **o cartão da origem:**
     - a foto e o título da origem;
     - "Do guia" com "Ler o guia", ou "Da receita" com "Ver a receita";
     - quando o artigo tem loja ativa, o botão laranja "Ver o código da <loja>". O rótulo é o mesmo da
       subpágina da loja (`codeLinkLabel`), e o link leva à página de cupom (`coupon_page_click`);
   - **a faixa do canal:** "Cecília no YouTube" e "Inscrever-se".
5. **"Mais vídeos da <loja>"** ("Mais vídeos" quando o vídeo não tem loja, ou a loja não tem outro
   vídeo):
   - até 8 cartões numa fila `ScrollRow`;
   - primeiro os da mesma loja e depois os mais novos;
   - nunca o vídeo aberto.

**Continua igual:**
- `generateMetadata`: o título, a descrição, o canonical, o Open Graph `video.other` e o cartão do X;
- o `VideoObject`;
- o sitemap de vídeo;
- o `dynamicParams = false` e o `generateStaticParams`.

**Muda só a serialização:** o JSON-LD passa a usar o `serializeJsonLd`.

## O formato do vídeo (`aspect`)

- Cada definição em `src/lib/video-pages.js` ganha `aspect: 'vertical' | 'horizontal' | 'square'`. Hoje:
  - **vertical:** os 10 Shorts;
  - **horizontal:** `xpXX_N002jo` e `agfG-x5lq1s`;
  - **square:** os 2 MP4.
- O `validate:video` exige o campo com um desses valores.
- **O campo é editorial:** a build não consulta a rede. O `GUIA-EDITORIAL-VIDEOS.md` passa a dizer como
  conferir antes de publicar: `https://www.youtube.com/shorts/<id>` responde 200 para Short e redireciona
  (303) para `/watch` quando o vídeo é comum.

## Mudança na home

- **No "Últimos vídeos":**
  - o vídeo que tem página no site leva a ela, sem aba nova;
  - os outros continuam abrindo o YouTube numa aba nova.
- **"Ver todos os vídeos"** (link para `/videos`) entra ao lado do "Ver canal do YouTube".
- **O cartão vertical** sai do `CTA.tsx` para um componente comum, `VideoCard`, usado também por
  `/videos` e pela página de cada vídeo. O visual da home não muda.

## Efeitos e animações

Todos ficam dentro de `prefers-reduced-motion: no-preference` ou levam `motion-safe:`, como na
D2.1:
- **o marca-texto** do `h1` entra como em `/reviews` (`.marca-texto-entra`);
- **os cartões** da grade e das filas levam `revela` e `--i`, como as seções de baixo da home;
- **a troca de loja** nos chips usa a mesma troca animada da estante de `/reviews`. O `runShelfTransition`
  sai do `ReviewsBrowser` para `src/lib/viewTransition.ts`, com o `data-trocando` e as regras do
  `globals.css`, que já valem para qualquer contêiner com o atributo;
- **a miniatura do cartão voa para o player** ao abrir o vídeo:
  - o cartão leva `data-vt-name="video-player-<slug>"`, pelo `ViewTransitionLink`;
  - a moldura do player leva o mesmo nome;
  - o HTML do servidor de `/videos` não leva `view-transition-name`.

## Arquitetura

### Dados no servidor

`src/lib/videosHub.ts` (novo, só servidor). Ele monta, a partir de `videoPages`, das reviews e
receitas publicadas e das lojas ativas:
- **`VideoItem`:**
  - `slug`, `href`, `title`, `description` e `aspect`;
  - a miniatura já resolvida;
  - `uploadDate` e `durationLabel`, mais `durationBadge` para o selo;
  - `store` (slug e nome) ou `null`;
  - `source`: `href`, título, foto e tipo (`guia` ou `receita`);
  - `codeLink` (rótulo e `href`), quando a loja é ativa.
- **`getVideosHubContent()`:** o destaque, a lista do mais novo ao mais antigo, os chips, a contagem e a
  imagem de compartilhamento (a miniatura do destaque).
- **`getVideoPageContent(slug)`:** o item, o painel e "Mais vídeos".
- **`getChannelRow(highlights)`:** os cartões do canal, cada um com o `href` interno ou externo.

### Regras puras

`src/lib/videosShelf.ts` (novo, sem dados, seguro no cliente):
- os tipos;
- o filtro por loja e a leitura do `?loja=`;
- a formatação da duração;
- os parâmetros da medição.

Componente cliente só importa daqui, nunca de `videosHub`, `@/lib/data`, `homeStores` nem
`couponsData`.

### Componentes

Em `src/components/videos/`:
- **`VideoCard`:** o cartão vertical, usado na home, na grade, no canal e em "Mais vídeos";
- **`VideoFeatured`:** o destaque;
- **`VideosBrowser`** (cliente): os chips, a grade, a URL e a troca animada;
- **`VideoChannelRow`:** a fila do canal e o botão de se inscrever;
- **`VideoPlayer`:** o `<iframe>` ou o `<video>` no formato;
- **`VideoSourceCard`:** a origem e o botão da loja.

### Páginas

- **`src/app/(pt)/videos/page.tsx`** substitui `page.js`.
- **`src/app/(pt)/videos/[slug]/page.tsx`** substitui `[slug]/page.js`.

As duas páginas usam TypeScript, como `/reviews`.

## Medição

1. **`videos_route_click`:** `destination`, `placement` e `link_label`, como o `reviews_route_click`.
   Posições:
   - `videos_featured` (o vídeo e a origem, distinguidos pelo `destination`), `videos_grid`,
    `videos_channel` e `videos_subscribe`, na página `/videos`;
   - `video_source`, `video_more`, `video_channel` e `video_subscribe`, na página de cada vídeo.
2. **`videos_list_control`:** `control: 'store'`, `value` (o slug ou `todos`) e `list_path`, na troca de
   chip.
3. **`coupon_page_click`:** no botão "Ver o código da <loja>", o mesmo de hoje.

## SEO

- **O JSON-LD de lista de `/videos`,** pelo `getCollectionPageJsonLd`: um `CollectionPage` com as 14
  páginas de vídeo na ordem da grade, e o `BreadcrumbList` (Início › Vídeos).
- **Imagem de compartilhamento de `/videos`:** a miniatura do destaque, com o `og:image`, o cartão do X e o
  `og:locale`.
- **O HTML do servidor** traz o destaque, os 14 cartões e o canal.
- **Páginas de exibição:** o `VideoObject`, o canonical e o sitemap de vídeo não mudam. O player continua
  logo depois do `h1`, sem outro `<iframe>`, `<video>` ou fila antes dele.

## Acessibilidade

- **Os chips** são botões com `aria-pressed`. O total do filtro, ao lado dos chips ("6 vídeos"), é
  `aria-live="polite"`.
- **Anel de foco:** todo link e botão leva o anel da casa (`FOCUS_RING`).
- **Filas que rolam:** o canal e "Mais vídeos" usam o `ScrollRow`.
- **Nome acessível do cartão:** o título, depois a duração ("54 segundos") e a loja.
- **O `<iframe>`** tem o `title` do vídeo. O `<video>` tem controles.
- **Alvos de toque** com pelo menos 44 px nos controles: chips, botões e "Inscrever-se".

## Testes

Todos rodam na build:

- **`scripts/test-videos-hub.ts`** (novo, na cadeia do `npm run build` e como `npm run test:videos-hub`).
  Ele confere:
  - o destaque pelo `uploadDate` (com e sem hora);
  - a ordem da grade;
  - os chips: só lojas ativas com 2 ou mais vídeos;
  - o `?loja=` (válido, desconhecido e loja de 1 vídeo);
  - a duração em texto e no selo;
  - a origem (guia, receita e sem loja);
  - "Mais vídeos" (a mesma loja primeiro, sem o vídeo aberto, no máximo 8);
  - o canal (`href` interno quando há página, externo quando não há);
  - os parâmetros da medição;
  - o HTML dos componentes, com o título num `h3` antes da duração.

  Cada regra tem um controle positivo e um negativo.
- **`validate:video`:** o `aspect` obrigatório, com um dos três valores.
- **`test:build-output`, no HTML gerado:**
  - **`/videos`:**
    - o `h1`;
    - os 14 cartões na ordem, com o anel de foco;
    - os chips esperados;
    - o JSON-LD de lista e a imagem, pelo `assertListPageSeo`;
    - nenhum `view-transition-name`;
  - **as 14 páginas de exibição:**
    - a trilha igual ao `BreadcrumbList`;
    - o `h1` igual ao `name` do `VideoObject`;
    - o player logo depois do `h1`, sem `<iframe>`, `<video>` ou fila entre os dois;
    - a moldura no formato do `aspect`;
    - o link da origem;
    - o botão da loja só quando há loja ativa;
    - "Mais vídeos" sem o vídeo aberto;
    - o JSON-LD com `<` escapado;
  - **a home:** o "Ver todos os vídeos" e os cartões do canal com página interna, sem `target="_blank"`.
- **Conferência no navegador:**
  - `/videos` e três páginas de exibição (uma vertical, uma deitada e uma quadrada), a 375, 768 e
    1280 px;
  - teclado e "reduzir movimento";
  - os chips com Voltar e Avançar;
  - a miniatura voando para o player;
  - o player sem faixa preta nos Shorts.
- **Revisões:** cada etapa passa pelo Claude e pelo Meta Muse, como nas outras frentes da D2.2.

## Ordem da implementação

1. **Dados:** o `aspect` em `video-pages.js` e no `validate:video`, o `videosShelf.ts`, o `videosHub.ts` e
   o `test-videos-hub.ts`.
2. **O `VideoCard`** e a home: o cartão comum, o link interno do canal e "Ver todos os vídeos".
3. **A página `/videos`:** o destaque, o `VideosBrowser` com os chips, o canal, o SEO e a troca animada
   comum.
4. **A página de cada vídeo:** o player no formato, o painel, a origem com o botão da loja, "Mais vídeos"
   e o morph.
5. **Travas e documentação:** o `test:build-output`, o `CLAUDE.md` (a tabela Pages e as camadas) e o
   `GUIA-EDITORIAL-VIDEOS.md` (o `aspect` e como conferir).

Cada etapa tem commits de até 5 arquivos, sem push. O deploy é o da D2.2, por decisão do Bruno.

## Riscos

- **Miniatura do Short em baixa resolução.** O `hqdefault` do YouTube tem 480×360. O recorte 9:16 sobra
  com uns 200 px de largura, e num cartão grande de retina pode ficar macio. A home já vive com isso. Se
  incomodar, o caminho é um poster próprio no CDN, pelo fluxo de mídia.
- **Títulos longos do YouTube,** com emoji e "| CUPOM CECILIA12". O `h1` tem de ser igual ao `name` do
  `VideoObject`, então o título não é encurtado. O cartão corta em 3 linhas.
- **Sem a chave da API do YouTube,** o canal some em `/videos`, como na home. As páginas de exibição não
  dependem dela.
- **Reindexação.** As páginas de exibição mudam de layout, mas não de regra: o player continua logo
  depois do `h1`. Depois do deploy, vale acompanhar o relatório de vídeos do Search Console (seção 8 do
  guia).
- **Altura do player vertical** em telas baixas e deitadas, como um celular girado: o
  `min(80svh, 720px)` evita que o player passe da tela.
