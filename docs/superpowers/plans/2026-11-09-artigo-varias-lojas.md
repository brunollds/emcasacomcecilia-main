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
