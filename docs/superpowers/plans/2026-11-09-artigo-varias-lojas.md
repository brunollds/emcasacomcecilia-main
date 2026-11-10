# Artigo com várias lojas: plano

Pedido do Bruno (09/11): artigos que citam várias parceiras (a AG1 "Alternativas ao whey da Growth", os "X ou Y"
entre parceiras) aparecem na estante de todas e mostram o código de todas, sem loja principal. Desenho fechado
com a proposta do Fable 5.2 e duas revisões do ChatGPT. Implementa a sessão "Redesenho do site"; a sessão de
artigos prepara a AG1 e as migrações.

## Regras

- `affiliate` aceita string (como hoje) ou lista: `"affiliate": ["black-skull", "max-titanium", "probiotica", "mais-mu"]`.
  A ordem é só a de apresentação, nunca preferência.
- Lista quer dizer **modo várias lojas**, sempre: mesmo que reste uma loja ativa, o artigo não volta ao visual de uma
  loja nem elege principal. String segue idêntica ao de hoje.
- Todo consumidor lê as lojas por `getReviewStoreSlugs(review)` (`src/lib/reviewStores.ts`, sem imports). Ninguém
  compara `review.affiliate` direto; o tipo vira `string | readonly string[]`. O typecheck não pega tudo
  (`review.affiliate === slug` compila com a união), então cada fase termina com a busca de `affiliate` em `src/` e
  `scripts/`, e cada acesso direto que sobra fica registrado aqui como exceção legítima.
- Com lista: sem `coupon` nem `cta`. Código e link de cada loja vêm de `couponsData.ts`.
- Limite inicial: 2 a 4 lojas. Lista de 1 item é erro (use string).
- Só lojas de código comum (`discount-code`, sem faixas). YesStyle, SHEIN, loja só de link e loja com faixas ficam
  fora da lista: o validador barra.
- Só PT: artigo com lista precisa ter o idioma resolvido em português e não pode ter `translationKey` (o validador
  barra os dois). Os textos novos de interface entram nos 10 idiomas mesmo assim.
- Nenhum conteúdo usa lista antes das fases 3 e 4 (computador e celular) estarem no ar. A fase 2 prepara a validação;
  a AG1 e as migrações esperam a fase 5.
- Slug inexistente é erro. Loja pausada perde as ações comerciais (botões, linha de código), mas a associação continua
  no JSON; o artigo sai da estante dela enquanto estiver pausada.

## Listagens

- Home (abas e ordem das bolinhas), `/reviews`, `/reviews/loja/<slug>` e o mínimo de 3, `/reviews/outros` (só sem
  nenhuma loja ativa), relacionados ("mesma loja" = alguma em comum), Black Friday.
- Rótulo do cartão: na aba ou subpágina de uma loja, aquela loja. Em lugar neutro, 2 lojas mostram "A e B"; 3 ou 4,
  "N lojas parceiras" (no idioma). Conta só as ativas.
- Busca: o índice leva o nome de todas as lojas.
- Banners de campanha: nenhum em artigo com lista.
- Página de vídeo cujo artigo tem lista: no lugar do botão da loja, "Ver lojas e códigos no artigo", para o artigo.

## Artigo (modo várias lojas)

- Uma linha compacta por loja ativa (`ArticleStoreCodes`): marca, desconto resumido, código com `CopyCodeButton`,
  "Ir para a loja" (sponsored) e link para as regras em `/cupons/<loja>`.
- Topo: as linhas, com `id="cupom-artigo"` (o dock segue o mesmo id). Sidebar: as mesmas linhas. Fim: as linhas
  com `id="loja"`, no lugar do bloco da loja.
- Celular: o dock vira "Ver códigos (N)" e abre a gaveta, com as linhas antes do sumário. O dock que acompanha a
  seção fica para depois.
- Código no texto (`HighlightCoupon`): copia o de qualquer loja da lista, com a marca dela. Se duas lojas do artigo
  têm o mesmo código (o CECILIA10 é de Black Skull, Bagaggio e Kopenhagen), a cópia no texto fica desligada para esse
  código; os botões das linhas, com o nome da loja, funcionam. Não é erro.
- Foto com link e card de estilo com `url`: em artigo com lista, levam `store` explícito (validado contra as lojas do
  artigo), para o clique sair com a marca certa. Sem inferir pelo domínio.
- Medição: placements de sempre; `brand` e `coupon_code` da linha clicada.
- Aviso (não erro) do `validate:content`: código destacado no corpo que não é de nenhuma loja do artigo (pega o
  código antigo que ficou no texto depois de a loja trocar).

## Fases (cada commit com até 5 arquivos; aprovação do Bruno entre as fases)

1. **Campo e listagens, sem mudança visível.** O validador ainda recusa lista.
   - 1a: `reviewStores.ts` (novo), `homeStores.ts`, `reviewsHub.ts`, `relatedReviews.ts`, `localeHome.ts`.
   - 1b: `homeEvents.ts`, `videosHub.ts`, `articleStore.ts` (contagem), `scripts/related-order.ts`, `review-prose-checks.ts`.
   - 1c: `scripts/test-review-stores.ts` (novo, no build), com os casos de lista de todas as listagens, mais o
     rótulo do cartão e a busca, que entraram já na fase 1.
   - Conferência: typecheck, eslint, build, todos os testes e o HTML do build igual ao da base fixa `c0a392f8`
     (a `main` do início do trabalho, não a que avançar), página por página, com as diferenças excluídas (variáveis
     de build ou de data) registradas no relatório.
2. **Tipo e validação.** `types.ts`, `data.ts`, `validate-content-model.ts`, `test-review-i18n.ts`,
   `test-store-banners.ts` e `test-home-stores.ts` (as conferências contra os dados reais). O validador passa a aceitar
   lista, só com as regras acima. A lupa (`siteSearch.mjs`) não lê `affiliate` hoje nem com uma loja: fica igual.
3. **Artigo no computador.** `getArticleStoreBlocks`, `ArticleStoreCodes`, template, `ArticleEnd`, `ReviewSidebar`,
   `HighlightCoupon`, `store` da foto e do card de estilo, textos nos 10 idiomas.
4. **Celular.** Dock "Ver códigos (N)", gaveta, `test-build-output` (linhas por loja, sponsored, nenhum banner,
   nada no JSON-LD).
5. **Conteúdo (sessão de artigos).** AG1, `black-skull-ou-max-titanium` e melhor-whey, numa etapa própria, com a
   ordem das bolinhas revista. As datas de publicação não mudam.

Fica para depois: dock que acompanha a seção, banners em artigo com lista, YesStyle e SHEIN na lista, famílias
traduzidas com lista.

Antes do push: capturas de computador e celular e revisão externa.

## Auditoria do fim da fase 1

Busca de `affiliate` em `src/` e `scripts/` (todas as extensões), fora `couponsData.ts`, `couponTranslations.ts`, os
gerados e os nomes que só contêm a palavra (`affiliate-link`, `affiliateUrl`, `affiliateAccountId`, `affiliateCta`).

- Já pelas funções de `reviewStores.ts`: `homeStores`, `reviewsHub`, `relatedReviews`, `localeHome`, `homeEvents`,
  `videosHub`, `articleStore`, `related-order`, `review-prose-checks`.
- Legítimos, outro conceito: o `affiliate` dos banners (`storeBanners.ts`, `test-store-banners.ts` linhas 20–159) e o
  da página de loja (`StorePageBanners`, `CouponStorePage`, `YesStyleCouponPage`) são o slug de uma loja, não o campo
  do artigo.
- Legítimos, artigo de uma loja: os casos de mentira de `test-home-events`, `test-home-stores` (linhas 49–61),
  `test-reviews-hub`, `test-videos-hub`, `test-article-d2` (linhas 33–37, 91–93, 138, 149, 377, 418) e do snippet em
  `validate-content-model.ts` (935–956); `articleStore.ts:131` vem depois da guarda de lista.
- Fase 2 (tipo e conferências contra os dados reais): `types.ts:441`, `data.ts:176`, `validate-content-model.ts:496`,
  `test-review-i18n.ts:29, 221, 486`, `test-store-banners.ts:170`, `test-home-stores.ts:224–310`,
  `test-article-d2.ts:72–77, 108–109, 213, 230, 403`.
- Fases 3 e 4 (artigo): `ReviewNotebookTemplate`, `ReviewSidebar`, `ReviewMobileBottomBar`, `ReviewContentSections`,
  `ReviewSectionContent`, `ArticleStyling` e `test-build-output.ts:1716, 1729, 1894, 1910, 1980`.

## Auditoria do fim da fase 2

- O tipo é `ReviewAffiliate` (`types.ts`, `data.ts`). Quem só sabe mostrar uma loja lê `getSingleStoreSlug`, que dá
  `undefined` para a lista: `articleStore.ts`, o template (o `storeSlug` passado ao recorte, às seções e ao dock),
  `test-article-d2`, `test-build-output` (foto, banner e bloco da loja),
  `test-review-i18n` (Hostinger) e `test-store-banners` (destino do banner). Nenhum consumidor usa o primeiro item.
- `ReviewSidebar` é componente de cliente: a guarda é inline (`typeof review.affiliate === 'string'`), sem importar
  `reviewStores.ts` nem prop nova, para o payload do artigo não mudar. Só o JavaScript dela muda de nome.
- `hasCommercialRelationship` (template e `test-build-output`) conta qualquer loja da lista: o link do artigo de várias
  lojas segue com sponsored.
- `test-review-i18n` compara a lista pelo conteúdo, na ordem (não por referência); `test-home-stores` conta o artigo em
  todas as lojas.
- Regras da lista em `scripts/multi-store-checks.ts`, testadas em `test-review-stores`. O `MULTI_STORE_CONTENT_ALLOWED`
  fica `false` até a fase 4: com a lista num artigo publicado (testado no `black-skull-ou-max-titanium` e desfeito), o
  `validate:content` para o build.
- Os componentes do artigo ainda recebem só uma loja (`string`): ficam para as fases 3 e 4, como previsto.

## Fase 3 (computador)

- `getArticleStoreBlocks` (`articleStore.ts`): um bloco por loja ativa da lista, cada um pelo `getArticleStoreBlock` da
  loja com o código de sempre e sem `cta`. `ArticleStoreCodes` desenha as linhas no topo (com `#cupom-artigo`), na
  lateral e no fim (com `#loja`, dentro do `ArticleEnd`). O artigo de uma loja recebe as mesmas props de antes (a lista
  só vai quando existe).
- Código no texto: `ArticleCodeCopyProvider` aceita a lista; o código que duas lojas do artigo dividem só fica destacado.
- `store` em `ContentSectionLink`, `ContentSectionImage`, `StylingItem` e `StylingPair`, lido pelo `MultiStores` que o
  template monta; o `validate:content` exige o campo em todo link de loja do artigo com lista e o barra fora dele.
- Aviso do `validate:content`: palavra com cara de código no texto que não é o código atual de nenhuma loja do artigo.
- Os botões das caixas de código foram para `couponActionStyles.ts` (sem `next/font`), para o teste renderizar as linhas.
- Conferido no navegador com o `black-skull-ou-max-titanium` virado em lista só localmente (trava ligada e o JSON
  devolvidos): 6 linhas (2 lojas em 3 lugares), nenhum recorte de uma loja, nenhum banner, os dois códigos copiando no
  texto e nada passando da tela em 1280 e 390.
- Fica para a fase 4: o dock e a gaveta do celular, que ainda tratam o artigo com lista como sem loja.
- Revisão da fase 3: a loja pausada (fora do `MultiStores`, que existe em todo artigo com lista e só leva as ativas) perde
  o link comercial: o botão do link de seção sai (`withoutPausedStoreLinks`), a foto volta a ser só o "Ampliar"
  (`withoutPausedHref`) e a peça do card de estilo fica sem link. Com todas pausadas, o `MultiStores` é vazio e nada leva
  link. Os dois artigos de uma loja seguem sem `MultiStores`.

## Fase 4 (celular)

- O dock troca o botão de copiar pelo "Ver códigos (N)" (`viewCodes`, `sidebarCopy.ts`, 10 idiomas; N = lojas ativas),
  que abre a gaveta com o foco e a rolagem nas linhas (`ArticleStoreCodes` variante `drawer`, `review_mobile_drawer`,
  depois do sumário). O dock espera as linhas do topo (`#cupom-artigo`) saírem da tela e some no `#loja` do fim, como no
  artigo de uma loja. `storeBlocks` e `storeLabel` só vão ao dock no artigo com lista.
- Na lateral, a linha fica sem o link das regras: com 4 lojas e códigos longos as linhas passam de 900 px, e a lateral
  rola por dentro (`max-h` do `<aside>`). As regras seguem no topo, no fim e na gaveta.
- `test:build-output`: no artigo com lista, o "Ver códigos (N)" no idioma, nenhum botão de copiar no dock, as linhas da
  gaveta nas lojas ativas e na ordem, um `#cupom-artigo`, o código copiável de cada loja (o dividido sem botão) e o fim
  com o título, as linhas, os códigos e os links; nos outros artigos, nada disso.
- Conferido com o `black-skull-ou-max-titanium` virado em lista de 4 lojas (Black Skull, Max Titanium, Probiótica e Mais
  Mu; três códigos de 18 a 21 letras), só localmente: build com todos os gates (menos o `test:review-stores`, que
  confere a trava desligada), 16 linhas (4 lojas em 4 lugares), dock "Ver códigos (4)", gaveta aberta nas linhas, nada
  passando da tela em 1280 e 390, nenhum banner.
- Base fixa: o build do branch contra o c0a392f8 do mesmo dia dá os 10.025 arquivos iguais, ignorando o BUILD_ID, os
  nomes e ids dos chunks e o nome do CSS (o CSS ganhou as classes novas do dock e da gaveta).
- A trava (`MULTI_STORE_CONTENT_ALLOWED`) segue desligada até a revisão desta fase.
- Revisão da fase 4: o `test:build-output` confere a faixa do código com prazo também nas linhas das várias lojas
  (`multiLimitedCodeProblems`: o invólucro vazio com `data-nosnippet` só na linha da loja com prazo, nos 4 lugares, no
  ponto do recorte; o payload com os prazos e o código fora do HTML, do `<head>` e do JSON-LD, pela mesma
  `limitedCodeLeakProblems` do artigo de uma loja), com um caso de prazo ativo e agendado. Conferido de ponta a ponta
  com a lista Black Skull, Max Titanium, Probiótica e I Wanna Sleep (o prazo de 26–27/11 agendado): 4 invólucros, todos
  na linha da I Wanna Sleep, e a lateral com 782 px.
