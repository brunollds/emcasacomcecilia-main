---
titulo_provisorio: "Cupom Let's Eat It primeira compra: MAUAD dá 5% OFF e vale nas compras seguintes"
seo_title: "Cupom Let's Eat It primeira compra: 5% OFF com MAUAD"
slug_sugerido: "cupom-letseatit-primeira-compra"
parceiro: "[[Lets-Eat-It]]"
parceiro_slug: "letseatit"
category: "cupons-como-usar"
reviewKind: "guia"
type: "Guia & Cupons"
status: "em-conformacao-json"
responsavel: "Job-2 (Claude Fable 5.2)"
proxima_acao: "Bruno aprovar a folha de imagens; upload ao CDN; PR"
bloqueado_por: "-"
data_criacao: "2026-11-12"
pauta_id: "PC-LETSEATIT"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
affiliate: "letseatit"
coupon: "MAUAD"
---

# Briefing: Cupom Let's Eat It primeira compra (PC-LETSEATIT)

Série [[cupom-primeira-compra-serie-1211]] (o molde e as regras valem). Pesquisa da loja em
[[primeira-compra-semente-letseatit]] e no dossiê [[Lets-Eat-It]]; as decisões do Bruno de 12/11 estão no topo de
[[primeira-compra-sementes-indice-1211]] e valem sobre a ficha. O slug segue `letseatit`, como em `/cupons/letseatit`.
As seções 5 e 7 da ficha propõem comparação com o cashback da loja e com o boas-vindas: foram escritas antes da
decisão e não entram.

Quem busca vai fazer o primeiro pedido na Let's Eat It e quer saber qual código usar e se ele vale com Pix. O artigo
responde com o MAUAD, diz o que soma com ele e que vale de novo depois.

## Busca

- **Search Console:** a Let's Eat It não tem consulta medida no export; a linha de base não existe ainda.
- **Autocompletar (12/11):** "cupom lets eat it primeira compra" (também a partir de "cupom lets eat it prim");
  "lets eat it cupom primeira compra"; "lets eat it primeira compra"; "desconto primeira compra lets eat it" (a partir
  de "lets eat it desconto primeira"). "cupom lets eat it cliente antigo" não trouxe sugestão.
- **Busca web (12/11):** "cupom Let's Eat It primeira compra" traz agregadores que anunciam 10% e até 12% de primeira
  compra, com números que não batem entre a busca e a página aberta. Nenhum entra como fato.

## Canibalização

O Bruno decidiu em 12/11 que a canibalização não veta a série. A função de cada página:

- `/cupons/letseatit`: qual código está ativo e as condições. O FAQ dela já diz que o MAUAD vale na primeira compra e
  para quem já comprou; o artigo novo não contradiz.
- [[cupom-mauad-lets-eat-it-como-usar]]: onde digitar o código, o teste de 02/10 com panela em pré-venda, o Pix e o
  frete por CEP. O artigo novo resume e linka. O cashback que esse texto cita não entra aqui.
- Vizinhos sem repetir: [[lets-eat-it-e-confiavel]] (CNPJ e políticas) e [[lets-eat-it-reclame-aqui-nota-reputacao]]
  (nota). A Casa Let's, loja física com desconto presencial, fica fora.

## O que só este artigo dá (busca de 12/11/2026)

O topo de "cupom Let's Eat It primeira compra" mistura agregadores com percentuais que não batem e uma página que
não traz condição nenhuma. O artigo tem de próprio o que soma com o MAUAD, na ordem que o checkout mostra: 5% sobre o
subtotal, o desconto do Pix em produtos que o marcam, pré-venda e item já em promoção, e o frete à parte.

Frase de ganho de informação:

> Este artigo diz a quem faz o primeiro pedido na Let's Eat It que o MAUAD dá 5% sobre o subtotal dos produtos no site
> oficial, que soma com o desconto do Pix nos produtos que o têm, que entra também em pré-venda e em item já em
> promoção, que o frete é calculado à parte pelo CEP, e que o código vale de novo nas compras seguintes.

- **Pix:** soma com o MAUAD nos produtos que têm o desconto do Pix; não é em todos os produtos.
- **Pré-venda e promoção:** o 5% entra sobre o preço da oferta ou da pré-venda (testes de 02/10 e 11/11).
- **Vale também para quem já comprou,** segundo o FAQ publicado.

## Esqueleto

1. **Resposta rápida** (40 a 60 palavras, sem "R$"). Rascunho, 48 palavras:
   > Para a primeira compra na Let's Eat It, use MAUAD: 5% de desconto no site oficial, com todas as formas de
   > pagamento. O código soma com o desconto do Pix em produtos que o marcam, e vale de novo para quem já comprou. Não
   > vale no Mercado Livre.
2. **Cupom Let's Eat It primeira compra: qual usar.** O H2 repete a busca, com a frase-resposta logo abaixo: o código,
   os 5% e "site oficial". Uma frase diz que código achado em site de cupom pode não funcionar, sem citar nenhum.
3. **O que o primeiro pedido exige.** Só o que a loja publica ou o checkout mostrou:
   - 5% sobre o subtotal dos produtos, no site oficial (`couponsData.ts`; testes de 02/10 e 11/11);
   - vale com todas as formas de pagamento e soma com o desconto de 5% do Pix em produtos que o marcam
     (`combinable`; FAQ);
   - entra em produto com preço promocional e em pré-venda (`combinable`);
   - frete calculado à parte, pelo CEP e pelo peso, conforme a política da loja (`shipping`);
   - a soma com outro cupom segue as regras da loja, e o checkout mostra o valor final (`combinable`; FAQ);
   - não vale no Mercado Livre; a loja não tem aplicativo (FAQ);
   - não escrever "sem valor mínimo" nem limite por CPF: a loja não publica.
4. **Quanto fica no primeiro pedido.** A conta do teste de 11/11, uma vez: pote de cerâmica Le Creuset em promoção, de
   R$ 519,00 por R$ 363,30; com o MAUAD, total de R$ 345,14, com desconto de R$ 18,16 (5% do preço promocional). Manda
   reler o preço no dia da publicação.
5. **E na segunda compra?** O MAUAD segue valendo, com os mesmos 5%, para quem já comprou (FAQ publicado). Limite de uso
   por conta ou CPF segue a regra da loja; o checkout mostra. É a frase que responde "cupom Let's Eat It para quem já é
   cliente".
6. **Onde colar o código.** No campo de cupom do site, antes de pagar, digite MAUAD e confira a linha de desconto no
   resumo do pedido. O frete aparece na etapa seguinte, calculado pelo CEP. Link para
   [[cupom-mauad-lets-eat-it-como-usar]].
7. **FAQ (3 a 5), sem data:**
   - "Tem cupom Let's Eat It de primeira compra?" (o MAUAD, 5% no site oficial)
   - "Qual cupom Let's Eat It vale para quem já é cliente?" (o mesmo código)
   - "O MAUAD soma com o Pix?" (sim, nos produtos que têm o desconto do Pix)
   - "O cupom Let's Eat It vale no Mercado Livre?" (não)
   - "A Let's Eat It tem aplicativo?" (não; o site funciona no navegador do celular)

Sem quadro `decision` e sem tabela de escolha.

## Regras

- Regras da série. **Nunca "exclusivo de primeira compra", "o maior desconto" nem "o melhor cupom".**
- **Benefício da própria loja:** nada sobre cupom, cadastro ou boas-vindas de primeira compra da Let's Eat It, nem
  existência nem ausência (Bruno, 12/11). O como usar diz que a loja não divulga outro cupom de boas-vindas; esse
  trecho não entra no artigo novo.
- **Cashback:** fora do texto. O `couponsData.ts` não cita cashback. O cashback aparece na home (15%, lido em 12/11)
  e no como usar e no dossiê (30%): divergência para a sessão de artigos. Este briefing não cita cashback nem percentual.
- **Pix:** o desconto do Pix é de "muitos produtos", não de todos. O texto diz "nos produtos que o marcam". Percentual
  só o de 5%, do `couponsData.ts`.
- **Campanha fora:** Black Friday, Natal e coleções em promoção não entram; o artigo é perene. Sem contagem de estoque.
- **Casa Let's:** o desconto presencial (15%, exceto Le Creuset e Trussardi) é de loja física e fica fora.
- **Sobrenome:** MAUAD é o sobrenome da Cecília (FAQ publicado). O texto não destaca o sobrenome e não faz pergunta
  sobre ele.
- **Compras seguintes:** a frase "vale também para quem já comprou" entra; o FAQ publicado é a fonte.
- **Catraca:** até 2 datas no corpo (a do teste, uma vez), nenhuma em título, legenda ou FAQ; a resposta rápida sem
  "R$".
- Links: `/cupons/letseatit` com a âncora "cupom Let's Eat It" e [[cupom-mauad-lets-eat-it-como-usar]].

## Leituras (no navegador, sem login e sem informar e-mail)

1. Produto com o selo de desconto do Pix e produto sem o selo, na página de produto (sem compra): só para escrever
   "nos produtos que o marcam" com base na tela. Hoje a frase vem do como usar e do FAQ.
2. Política de frete (`letseatit.com.br/pages/politica-de-frete`): confirmar "calculado por CEP e peso". A leitura de
   12/11 foi por WebFetch (a ler no navegador).
3. Preço do pote Le Creuset no dia (conta do capítulo 4).
4. Rodapé e faixa do topo: confirmar o "5% de desconto nas compras por pix" já lido em 12/11 no navegador. Não citar o
   cashback.
5. Search Console: pedir o CSV de "lets eat it" antes de publicar (linha de base da série).

## Metadados sugeridos

- **title:** Cupom Let's Eat It primeira compra: MAUAD dá 5% OFF e vale nas compras seguintes (80 caracteres)
- **seoTitle:** Cupom Let's Eat It primeira compra: 5% OFF com MAUAD (52 caracteres)
- **metaDescription (rascunho):** MAUAD dá 5% OFF no site oficial da Let's Eat It na primeira compra. O mesmo código vale para quem já comprou. (109 caracteres; o código termina no caractere 5)
- **description (subtítulo, até 180):** O MAUAD dá 5% no site da Let's Eat It no primeiro pedido e nos seguintes. Veja como o desconto soma com o Pix nos produtos que o têm e como o frete entra depois. (161 caracteres)
- **editorialNote:** Cupom testado no checkout oficial. Podemos receber comissão pelo cupom.
- **cta:** Ir para a Let's Eat It; o `offerUrl` da loja (sponsored).
- **relatedArticles:** cupom-mauad-lets-eat-it-como-usar, lets-eat-it-e-confiavel

## Plano de imagens (para o Job 6)

Capa: logo da Let's Eat It, uma peça da coleção (foto oficial ou do acervo) e o código MAUAD. Corpo: foto do resumo do
pedido do teste de 02/10 (panela Le Creuset em pré-venda e xícaras em promoção) ou da página de produto com o selo do
Pix, com `href` para a loja (sponsored).

## Matriz de claims

| Afirmação | Fonte | Status |
|---|---|---|
| MAUAD dá 5% sobre o subtotal dos produtos no site oficial | `couponsData.ts`, `letseatit` (`discount`, `longDescription`) | verificado; `lastVerified` 11/11 |
| Vale na primeira compra e para quem já comprou | FAQ de `/cupons/letseatit` | verificado |
| Vale com todas as formas de pagamento; soma com o desconto do Pix | `couponsData.ts` (`combinable`, FAQ); decisão do Bruno (08/10) | verificado |
| Desconto do Pix em muitos produtos, não em todos | `cupom-mauad-lets-eat-it-como-usar`; dossiê `Lets-Eat-It.md` | verificado; texto diz "os que o marcam" |
| Entra em pré-venda e em produto com preço promocional | `couponsData.ts` (`combinable`, FAQ); teste de 02/10 | verificado |
| Pote Le Creuset de R$ 519,00 por R$ 363,30; total R$ 345,14; desconto R$ 18,16 | `testNote` de 11/11 | verificado; reler o preço no dia |
| Frete calculado à parte, pelo CEP e pelo peso | `couponsData.ts` (`shipping`); política de frete (WebFetch de 12/11) | verificado pela loja em leitura por WebFetch; a ler no navegador |
| A soma com outro cupom segue as regras da loja | `couponsData.ts` (`combinable`) | verificado |
| Não vale no Mercado Livre; não tem aplicativo | FAQ de `/cupons/letseatit` | verificado |
| Cashback de 15% ou 30% | home (12/11, a ler) e como usar/dossiê (30%) | não escrever: fora do primeiro pedido; divergência para artigos |
| Desconto presencial da Casa Let's | dossiê (loja física) | fora do texto |
| Limite por CPF, teto e soma com outro cupom além do que a loja diz | nenhuma fonte publicada | não escrever |
| Benefício de primeira compra da própria loja | home lida em 12/11 (sem menção); WebFetch | não escrever (Bruno, 12/11) |
| 10% ou 12% de primeira compra | agregadores (busca e WebFetch) | não usar |

## Leituras da redação (12/11/2026, navegador do app, sem login)

- JSON público do produto: Pote Cerâmica com Tampa de Madeira Scandinavia Black Onyx 1,1L Le Creuset a R$ 363,30 (de R$ 519,00), os valores do teste de 11/11.
- Cashback fora do texto; Pix só como "nos produtos em que a loja marca", sem percentual.
- Frete: "calculado pelo CEP na etapa seguinte", sem valores.
- Search Console: CSV da linha de base com o Bruno.

## Rascunho (Job 2)

O texto está em `content/reviews/cupom-letseatit-primeira-compra.json` (id 926), no esqueleto do briefing. Resposta rápida com 55 palavras. A data do teste (11/11/2026) fica na prosa do capítulo da conta, e a legenda da tabela diz o que os valores não incluem, como a revisão externa do lote 2 pediu. O capítulo 3 gira no campo do checkout ("Código de desconto", no resumo do pedido, não no carrinho).

## Revisão (Job 3, 12/11/2026)

1 a 10: passou. Sem benefício da própria loja, sem código de terceiros, sem "exclusivo", "maior" ou "melhor". Sem cashback; sem app; o código não vale no Mercado Livre. MAUAD fora da arte e do alt da capa ("5% OFF" no lugar).

- C1: 0 "R$" na resposta rápida. C2: 1 data no corpo (a do teste, na prosa). C3, C4, C5: 0.
- C6: os valores da tabela não voltam na prosa nem no FAQ. C7: sem capítulo de método. C8: a foto do produto está no capítulo da conta, com o link de afiliado no `href`.
- C9: cada rótulo no máximo uma vez. C12: a primeira frase de cada capítulo decide. C14: "E na segunda compra?" vem do molde da série.
- Leitura em voz alta: soa como pessoa ajudando.

## Capa e imagens (Job 6; aprovação do Bruno pendente)

- **Capa:** `/images/reviews/letseatit/cupom-letseatit-primeira-compra-capa.webp` (`imageFit: contain`), 1600 × 900, painel lateral com o logo da loja, a chamada e “5% OFF” (sem o MAUAD na arte). Alt: Potes de cerâmica pretos com tampa de madeira da Le Creuset sobre uma bancada, em foto oficial, ao lado da chamada Cupom Let's Eat It primeira compra.
- **Pote em promoção: quanto fica com o MAUAD:** `/images/reviews/letseatit/cupom-letseatit-primeira-compra-pote-le-creuset.webp` (quadrada, `href` com o link de afiliado do produto). Alt: Pote de cerâmica preto com tampa de madeira da Le Creuset, de 1,1 litro, em foto oficial de frente. Legenda: Pote de cerâmica Le Creuset com tampa de madeira, de 1,1 L, incluído no teste do cupom. Foto: Let's Eat It.
- **Origem:** duas fotos oficiais da loja, lidas em 12/11/2026: os potes sobre a bancada na capa e o pote de frente no corpo. Sem IA.

## Revisão externa (Farol, 12/11/2026)

Aplicado: o frete descrito pela ordem das telas, sem sugerir base de mínimo.
