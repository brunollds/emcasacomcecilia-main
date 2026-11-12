---
titulo_provisorio: "Cupom HolyFoods primeira compra: EMCASA dá 15% OFF e vale nas compras seguintes"
seo_title: "Cupom HolyFoods primeira compra: 15% OFF com EMCASA"
slug_sugerido: "cupom-holyfoods-primeira-compra"
parceiro: "[[HolyFoods]]"
parceiro_slug: "holyfoods"
category: "cupons-como-usar"
reviewKind: "guia"
type: "Guia & Cupons"
status: "em-conformacao-json"
responsavel: "Job-2 (Claude Fable 5.2)"
proxima_acao: "Bruno aprovar a folha de imagens; upload ao CDN; PR"
bloqueado_por: "-"
data_criacao: "2026-11-12"
pauta_id: "PC-HOLYFOODS"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
affiliate: "holyfoods"
coupon: "EMCASA"
---

# Briefing: Cupom HolyFoods primeira compra (PC-HOLYFOODS)

Série [[cupom-primeira-compra-serie-1211]] (o molde e as regras valem). Pesquisa da loja em
[[primeira-compra-semente-holyfoods]] e no dossiê [[HolyFoods]]; as decisões do Bruno de 12/11 estão no topo de
[[primeira-compra-sementes-indice-1211]] e valem sobre a ficha. As seções 5 e 7 da ficha propõem comparação com um
benefício de boas-vindas da própria loja: foram escritas antes da decisão e não entram.

Quem busca vai fazer o primeiro pedido na HolyFoods e quer saber qual código usar e se ele vale depois. O artigo
responde com o nosso código, diz onde ele entra na compra (na tela Finalizar compra) e o que o pedido exige.

## Busca

- **Search Console:** a HolyFoods não tem consulta medida no export; a linha de base não existe ainda.
- **Autocompletar (12/11):** "holyfoods primeira compra" devolveu "cupom holyfoods primeira compra". "cupom holyfoods
  prim", "cupom holyfoods cliente antigo" e "holyfoods desconto primeira" não trouxeram sugestão.
- **Busca web (12/11):** "cupom holyfoods primeira compra" traz o site oficial, o club antigo, agregadores e o Reclame
  Aqui. Nenhum agregador entra como fato.

## Canibalização

O Bruno decidiu em 12/11 que a canibalização não veta a série. A função de cada página:

- `/cupons/holyfoods`: qual código está ativo e as condições. O FAQ dela já diz que o EMCASA vale na primeira compra
  e para quem já comprou; o artigo novo não contradiz.
- [[cupom-holyfoods-como-usar]]: onde digitar o código, por que o carrinho lateral não aceita o cupom e o que fazer
  quando ele não entra. O artigo novo só resume e linka.
- Vizinhos sem repetir: [[holyfoods-e-confiavel]] (empresa, garantia e reputação) e as campanhas de kits, que não
  entram.

## O que só este artigo dá (busca de 12/11/2026)

O topo mistura o site oficial com agregadores que prometem 10% ou 15% de primeira compra, com códigos de terceiros e
sem data de conferência. Nenhum desses números entra no texto. O que o artigo tem de próprio é o caminho exato do
código no checkout, o que ele soma e o que pedir antes de pagar.

Frase de ganho de informação:

> Este artigo diz a quem faz o primeiro pedido na HolyFoods que o EMCASA dá 15% em todo o site, inclusive sobre os
> produtos que já estão em promoção, que o frete grátis começa num mínimo que muda por estado e aparece no carrinho,
> que o código entra na tela Finalizar compra e não no carrinho lateral, e que ele vale de novo nas compras seguintes.

- **Promoção e kit:** o 15% entra sobre o preço já reduzido e vale nos produtos avulsos e nos kits (`combinable`,
  `eligibleCategories`).
- **O frete:** o mínimo muda por estado. O carrinho mostra quanto falta para a sua região. Não publicamos valores
  por estado: as cifras do dossiê vêm de uma campanha e a home lida em 12/11 não as traz.
- **Onde digitar:** a tela Finalizar compra, em "Inserir cupom de desconto". O carrinho lateral não tem o campo.

## Esqueleto

1. **Resposta rápida** (40 a 60 palavras, sem "R$"). Rascunho, 47 palavras:
   > Para a primeira compra na HolyFoods, use EMCASA: 15% OFF em todo o site, com qualquer forma de pagamento. O
   > desconto entra mesmo nos produtos já em promoção, e o código vale de novo para quem já comprou. Ele não vale no
   > Mercado Livre nem no cartão-presente.
2. **Cupom HolyFoods primeira compra: qual usar.** O H2 repete a busca, com a frase-resposta logo abaixo: o código,
   os 15% e "todo o site". Uma frase diz que código achado em site de cupom pode não funcionar, sem citar nenhum.
3. **O que o primeiro pedido exige.** Só o que a loja publica ou o checkout mostrou:
   - vale nos produtos avulsos e nos kits do site oficial (`eligibleCategories`);
   - soma com as promoções do site, inclusive nos produtos que já estão com desconto (`combinable`; FAQ);
   - vale com todas as formas de pagamento (`combinable`);
   - frete grátis a partir de um valor mínimo que muda conforme o estado; o carrinho mostra quanto falta (`shipping`);
   - não vale no Mercado Livre nem no campo de cartão-presente (FAQ);
   - não escrever "sem valor mínimo" do cupom: a ficha não confirmou que não existe.
4. **Quanto fica no primeiro pedido.** A conta do teste de 05/11, uma vez: carrinho de R$ 69,79 com produtos que já
   estavam com desconto da loja; o EMCASA tirou R$ 10,47 (15%) e o total caiu para R$ 59,32. Manda reler o preço no
   dia da publicação, porque o desconto da loja muda.
5. **E na segunda compra?** O EMCASA segue com os 15% para quem já comprou (FAQ publicado). É a frase que responde
   "cupom HolyFoods para quem já é cliente".
6. **Onde colar o código.** Na tela Finalizar compra, clique em "Inserir cupom de desconto", cole o EMCASA no campo
   "Código do cupom", clique em "Adicionar" e confira a linha "Cupom de desconto" antes de pagar. O botão desta
   página abre a loja, mas não aplica o código. Link para [[cupom-holyfoods-como-usar]].
7. **FAQ (3 a 5), sem data:**
   - "Tem cupom HolyFoods de primeira compra?" (o EMCASA, 15% em todo o site)
   - "Qual cupom HolyFoods vale para quem já é cliente?" (o mesmo código)
   - "O cupom HolyFoods soma com produto em promoção?" (sim; o 15% entra sobre o preço já reduzido)
   - "O cupom HolyFoods vale no Mercado Livre?" (não)
   - "Onde colar o cupom na HolyFoods?" (na tela Finalizar compra, em "Inserir cupom de desconto")

Sem quadro `decision` e sem tabela de escolha.

## Regras

- Regras da série. **Nunca "exclusivo de primeira compra", "o maior desconto" nem "o melhor cupom".**
- **Benefício da própria loja:** nada sobre cupom ou desconto de primeira compra da HolyFoods, nem existência nem
  ausência (Bruno, 12/11). A página de cupons da loja lida em 12/11 e a busca descrevem coisas diferentes: o texto
  não cita nenhuma das duas.
- **Campanha fora:** o 30% de campanha da loja (a Black, no FAQ da home e no dossiê) não entra. O teste de 05/11
  foi feito com produtos já em desconto da loja; o texto diz "produtos com desconto da loja", sem nomear a campanha.
- **Frete:** os valores por estado do dossiê (R$ 199, R$ 249, R$ 289 e o "nos demais estados" do checkout) são da
  campanha e não estão na home lida em 12/11. Não entram. O texto diz só "muda por estado".
- **Pix:** o dossiê e a ficha não acharam o percentual de Pix da loja, e o `couponsData` não fala de Pix. O texto
  diz só que o código vale com todas as formas de pagamento. Percentual de Pix: não escrever.
- **Progressivo da loja:** o desconto por quantidade não foi testado com o EMCASA. O texto não afirma soma com ele.
- **Compras seguintes:** a frase "vale também para quem já comprou" entra; o FAQ publicado é a fonte.
- **Catraca:** até 2 datas no corpo (a do teste, uma vez), nenhuma em título, legenda ou FAQ; a resposta rápida sem
  "R$".
- Links: `/cupons/holyfoods` com a âncora "cupom HolyFoods" e [[cupom-holyfoods-como-usar]].

## Leituras (no navegador, sem login e sem informar e-mail)

1. Carrinho e tela Finalizar compra, sem finalizar: confirmar onde o EMCASA entra e a linha "Cupom de desconto". O
   como usar já diz isso, mas a leitura de tela ainda não foi feita no navegador.
2. Página ou FAQ de frete grátis por estado (hoje a ler, porque a home de 12/11 não traz os valores): só se o texto
   quiser citar um valor. Por enquanto o texto não cita.
3. Pix: página do produto e checkout, sem compra (a ler: a FAQ da loja, em trecho recuperado por WebFetch, diz que o
   preço no Pix aparece na página do produto). Se o texto for citar o Pix, a leitura é antes.
4. Preço do carrinho do teste no dia (conta do capítulo 4).
5. Reclame Aqui: três páginas com queixas sobre cupom deram 403 para o WebFetch. Só ler pelo Chrome se o Bruno
   liberar; as queixas não entram no texto.
6. Search Console: pedir o CSV de "holyfoods" antes de publicar (linha de base da série).

## Metadados sugeridos

- **title:** Cupom HolyFoods primeira compra: EMCASA dá 15% OFF e vale nas compras seguintes (79 caracteres)
- **seoTitle:** Cupom HolyFoods primeira compra: 15% OFF com EMCASA (51 caracteres)
- **metaDescription (rascunho):** EMCASA dá 15% OFF em todo o site da HolyFoods na primeira compra. O mesmo código vale para quem já comprou. (107 caracteres; o código termina no caractere 6)
- **description (subtítulo, até 180):** O EMCASA dá 15% em todo o site da HolyFoods no primeiro pedido e nos seguintes, inclusive nos produtos que já estão em promoção. Veja onde colar o código e o que muda no total. (176 caracteres)
- **editorialNote:** Cupom testado no checkout. Podemos receber comissão pelo cupom.
- **cta:** Ir para a HolyFoods; o `offerUrl` da loja (sponsored).
- **relatedArticles:** cupom-holyfoods-como-usar, holyfoods-e-confiavel

## Plano de imagens (para o Job 6)

Capa: logo da HolyFoods, uma sopa ou um risoto da linha (foto oficial ou do acervo) e o código EMCASA. Corpo: foto da
tela Finalizar compra com o campo de cupom (ou da sopa do teste), com `href` para a loja (sponsored).

## Matriz de claims

| Afirmação | Fonte | Status |
|---|---|---|
| EMCASA dá 15% OFF em todo o site oficial | `couponsData.ts`, `holyfoods` (`discount`, `longDescription`) | verificado; `lastVerified` 05/11 |
| Vale na primeira compra e para quem já comprou | FAQ de `/cupons/holyfoods` | verificado |
| Soma com as promoções, inclusive produtos já com desconto | `couponsData.ts` (`combinable`, FAQ) | verificado; teste de 05/11 |
| Vale nos avulsos e nos kits | `couponsData.ts` (`eligibleCategories`) | verificado |
| Vale com todas as formas de pagamento | `couponsData.ts` (`combinable`) | verificado |
| Campo "Inserir cupom de desconto", na tela Finalizar compra; "Adicionar" | `couponsData.ts` (`codeInstructions`); `cupom-holyfoods-como-usar` | verificado |
| Não vale no Mercado Livre nem no cartão-presente | FAQ de `/cupons/holyfoods` | verificado |
| Frete grátis a partir de mínimo que muda por estado; o carrinho mostra | `couponsData.ts` (`shipping`) | verificado; sem valores no texto |
| Carrinho de R$ 69,79; desconto de R$ 10,47; total de R$ 59,32 | `testNote` de 05/11 | verificado; reler o preço no dia |
| O teste foi com produtos já em desconto da loja (campanha de 30%) | `cupom-holyfoods-como-usar`; dossiê `HolyFoods.md` | verificado; o texto não cita a campanha |
| Valores de frete por estado (R$ 199, R$ 249, R$ 289) | dossiê (FAQ "Seu frete na Black", 05/11) | não escrever: campanha, e a home de 12/11 não traz |
| Percentual de Pix da loja | nenhuma fonte lida | não escrever |
| Soma com o progressivo da loja | nenhuma (teste não feito) | não escrever |
| Benefício de primeira compra da própria loja | busca e página `/pages/cupons-de-desconto` (leitura de 12/11) | não escrever (Bruno, 12/11) |
| Sem valor mínimo do cupom | nenhuma | não escrever |
| 10% e mínimo de R$ 99 de primeira compra | trechos de busca e agregadores | não usar |

## Leituras da redação (12/11/2026, navegador do app, sem login)

- Produtos do teste, pelo JSON público da loja: Pack Sopa da Vovó a R$ 41,93 e Sopa Detox a R$ 13,93, que somam os R$ 69,79 do teste de 05/11. A página de cupom passou a ter um teste de 12/11 (dois Kits Veganos); o de 05/11 segue registrado nela, e é o que o artigo usa.
- O teste de 12/11 registra que o checkout abriu com um cupom de campanha da loja no campo. Não entrou no texto, pela regra de não citar cupom da loja.
- Pix e frete por estado: sem valor no texto.
- Search Console: CSV da linha de base com o Bruno.

## Rascunho (Job 2)

O texto está em `content/reviews/cupom-holyfoods-primeira-compra.json` (id 924), no esqueleto do briefing. Resposta rápida com 57 palavras. A data do teste (11/11/2026) fica na prosa do capítulo da conta, e a legenda da tabela diz o que os valores não incluem, como a revisão externa do lote 2 pediu. O capítulo 3 gira na tela e no campo certos (Finalizar compra, "Inserir cupom de desconto", não o cartão-presente).

## Revisão (Job 3, 12/11/2026)

1 a 10: passou. Sem benefício da própria loja, sem código de terceiros, sem "exclusivo", "maior" ou "melhor". Sem a campanha da loja; sem valores de frete; sem o progressivo; sem promessa de saúde.

- C1: 0 "R$" na resposta rápida. C2: 1 data no corpo (a do teste, na prosa). C3, C4, C5: 0.
- C6: os valores da tabela não voltam na prosa nem no FAQ. C7: sem capítulo de método. C8: a foto do produto está no capítulo da conta, com o link de afiliado no `href`.
- C9: cada rótulo no máximo uma vez. C12: a primeira frase de cada capítulo decide. C14: "E na segunda compra?" vem do molde da série.
- Leitura em voz alta: soa como pessoa ajudando.

## Capa e imagens (Job 6; aprovação do Bruno pendente)

- **Capa:** `/images/reviews/holyfoods/cupom-holyfoods-primeira-compra-capa.webp` (`imageFit: contain`), 1600 × 900, painel lateral com o logo da loja, a chamada e o EMCASA. Alt: Prato de sopa da HolyFoods visto de cima, em foto oficial, ao lado da chamada Cupom HolyFoods primeira compra e do código EMCASA.
- **Sopas já com desconto: os 15% por cima:** `/images/reviews/holyfoods/cupom-holyfoods-primeira-compra-pack-sopa-da-vovo.webp` (quadrada, `href` com o link de afiliado do produto). Alt: Embalagem amarela do Pack Sopa da Vovó da HolyFoods, com 10 porções, em foto oficial de frente. Legenda: Pack Sopa da Vovó incluído no teste do cupom no checkout. Foto: HolyFoods.
- **Origem:** duas fotos oficiais da loja, lidas em 12/11/2026: o prato de sopa visto de cima na capa e a embalagem do Pack Sopa da Vovó no corpo. Sem IA.

## Revisão externa (Farol, 12/11/2026)

Aplicado depois de conferir os fatos: instrução neutra de remover um código já aplicado antes de digitar o EMCASA, sem citar a campanha; conferência pelo aviso de EMCASA adicionado e pelo desconto, em vez do nome de uma linha; título do capítulo sem "por cima". Não aplicado: tirar o print do código de outro pedido (decisão do Bruno de 12/11: o print da página de cupom entra em todo artigo da série).
