---
titulo_provisorio: "Como usar o cupom BAWEMCASACOMCECILIA na BAW: 10% OFF no site e no app"
seo_title: "Cupom BAW: como usar o BAWEMCASACOMCECILIA, 10% OFF"
slug_sugerido: "cupom-baw-como-usar"
parceiro: "[[BAW-Clothing]]"
parceiro_slug: "baw"
category: "cupons-como-usar"
reviewKind: "guia"
type: "Guia & Cupons"
status: "pronto-para-deploy"
responsavel: "Job-1"
proxima_acao: "deploy (decisão do Bruno); refazer o teste do código em 27/11"
bloqueado_por: "-"
data_criacao: "2026-11-16"
pauta_id: "BW1"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
affiliate: "baw"
coupon: "BAWEMCASACOMCECILIA"
---

# Briefing: Como usar o cupom BAWEMCASACOMCECILIA na BAW (BW1)

Primeiro artigo do pacote inicial da BAW Clothing (handoff de 16/11/2026). Modelo: [[cupom-prohall-como-usar]].
Fatos, fontes e pendências em [[baw-fatos-1611]] (a seção 9 é a leitura do Job 1); dados comerciais no dossiê
[[BAW-Clothing]] e em `couponsData.ts` (loja `baw`). As regras do pacote, abaixo, valem para os seis.

Quem busca já escolheu a peça e quer saber onde digitar o código, quanto ele tira e se entra em cima da promoção. O
artigo mostra o campo, a conta do carrinho testado e o que conferir antes de pagar.

## Regras do pacote (BW1 a BW6)

- **Código:** `BAWEMCASACOMCECILIA`, 10% OFF em todo o site oficial (`bawclothing.com.br`) e no aplicativo, para
  cliente novo e antigo. **Não escrever "sem valor mínimo"** nem "uso ilimitado": mandar conferir a linha Cupom no
  resumo do pedido.
- **A conta é a do teste da página da loja** (16/11/2026, `testNote` de `couponsData.ts`): Camiseta Regular Locally
  Grown, R$ 89,00, mais Camiseta Regular Goth 3.0 em promoção, R$ 59,00; R$ 148,00 viram R$ 133,20, com R$ 14,80
  na linha Cupom. Publicar o artigo não cria teste novo.
- **Soma com promoção e com os 5% do Pix**, sem juntar os dois num percentual único e sem publicar valor final "com
  cupom e Pix" que não saiu de carrinho.
- **Frete:** o cupom não dá frete grátis. O que se compara é o total entregue: produtos mais o frete do CEP.
- **BAWPOINTS:** benefício separado do preço. Não afirmar que soma com o código.
- **Nenhum cupom da própria BAW** (pop-up, primeira compra do aplicativo, campanha de um dia) e nenhum código de
  terceiros. O aviso de frete grátis para quem finaliza no aplicativo também é benefício da loja: fora.
- **Mercado Livre:** o código só vale no site e no aplicativo. Na loja oficial do marketplace vale o preço do
  anúncio.
- **Sem experiência própria:** a Cecília não recebeu nem usa peça da BAW. Só fontes públicas; "testamos" vale para o
  código no carrinho, nunca para a roupa.
- **Modelagem:** nada de regra geral ("PP ao 3G", "a regular já é solta"). Cada peça pela ficha dela; ficha vazia se
  diz que está vazia ([[baw-fatos-1611]], 9.5).
- **Troca e devolução:** troca vira crédito; devolução devolve o dinheiro. Sempre atribuído à política oficial, com a
  data da leitura (9.3).
- **JSON:** `affiliate: "baw"`, `coupon: "BAWEMCASACOMCECILIA"`, sem link de afiliado: `cta` para o site oficial e
  link interno para `/cupons/baw`.

## Busca (autocompletar de 16/11/2026)

"cupom baw", "cupom baw clothing", "cupom baw app", "cupom baw 2026", "cupom baw influencer". Sem dado do Search
Console: `/cupons/baw` entrou no ar no dia da pesquisa.

## Canibalização

- `/cupons/baw`: qual código está ativo e as condições. O artigo não contradiz a página e manda para ela.
- [[cupom-baw-primeira-compra]] (BW4): "tem cupom de primeira compra?" e a segunda compra.
- [[black-friday-baw]] (BW6): o código na campanha e a escolha das peças. Aqui a Black Friday é uma frase com link.

## O que só este artigo dá (Google em português, 16/11/2026)

Topo de "cupom baw clothing": quatro anúncios de sites de cupom e de influenciadoras, todos com 10%; uma visão de IA
com lista de códigos; depois agregadores. Ninguém mostra o carrinho.

- **A conta conferida:** o único resultado com valor de carrinho, antes e depois, e com a linha Cupom no print.
- **O campo pelo nome:** "Cupom de desconto", no carrinho (`/checkout`), ao lado do resumo, confirmado pela seta; o
  aviso "Cupom aplicado" e o botão "Trocar".
- **O código em cima de peça em promoção:** no teste, os 10% entraram também na camiseta com preço de Black Friday.
- **O total entregue:** o cupom não mexe no frete; no teste, para um CEP da cidade de São Paulo, o frete foi de
  R$ 10,62.

## Esqueleto

1. **Resposta rápida** (40 a 60 palavras, sem "R$"). Rascunho, 53 palavras:
   > O cupom BAWEMCASACOMCECILIA dá 10% OFF em todo o site e no aplicativo da BAW Clothing, para quem compra pela
   > primeira vez e para quem já é cliente. Digite o código no campo Cupom de desconto, no carrinho, e confirme pela
   > seta. Ele soma com as promoções e com o desconto do Pix.
2. **Onde digitar o código.** Passo a passo de `codeInstructions`: escolher o tamanho, COMPRAR, abrir o carrinho,
   campo "Cupom de desconto", seta, aviso "Cupom aplicado". Print do carrinho (plano de imagens).
3. **Quanto o cupom tira: a conta do nosso teste.** As duas camisetas, R$ 148,00 para R$ 133,20, a linha Cupom de
   R$ 14,80. Dizer que uma das peças estava em promoção.
4. **Soma com promoção e com o Pix?** Sim para os dois. O Pix dá 5% (a página do produto mostra "5% OFF no PIX").
   Sem percentual somado.
5. **O cupom vale no aplicativo?** Sim (Bruno, 16/11): mesmo código, no campo de cupom antes de pagar.
6. **Frete e pagamento.** Frete pelo CEP, à parte do cupom; prazo conta do faturamento; Pix e cartão em até 10x sem
   juros com parcela mínima de R$ 50. A frase do total entregue.
7. **O cupom não entrou: o que conferir.** Código sem espaço, campo certo, site oficial (não o Mercado Livre), aviso
   "Cupom aplicado"; se não aparecer a linha Cupom, não pagar e avisar pelo `/contato`.
8. **Vale para quem já é cliente?** Uma frase, com link para a BW4 quando estiver no ar.
9. **FAQ (3 a 5), sem data:** "Onde coloco o cupom na BAW?", "O cupom BAW vale no app?", "O cupom soma com peça em
   promoção?", "O cupom dá frete grátis?", "O cupom vale no Mercado Livre?".

Sem quadro `decision` (é passo a passo) e sem card de estilo.

## Cuidados

- Uma data no corpo: a do teste. Nenhuma em título, legenda ou FAQ.
- Não citar valor mínimo, limite de usos nem validade com data: "enquanto a parceria estiver vigente".
- Troca entra só como uma frase com link para [[baw-clothing-e-confiavel]]; o assunto é da BW3.
- Tamanho: uma frase ("confira as medidas na descrição da peça; a troca por tamanho vira crédito"), sem tabela.

## Leituras (no navegador, sem login)

1. Um carrinho com uma peça e o código, na semana do texto, para confirmar que o campo e os avisos têm os mesmos
   nomes (o site é Wake: clicar no tamanho e depois em COMPRAR).
2. `/forma-de-pagamento` e `/entrega-e-frete`.
3. O nome do aplicativo nas lojas de aplicativo, se o texto citar o nome; senão, "aplicativo da BAW".

## Metadados sugeridos

- **title:** Como usar o cupom BAWEMCASACOMCECILIA na BAW: 10% OFF no site e no app (70 caracteres)
- **seoTitle:** Cupom BAW: como usar o BAWEMCASACOMCECILIA, 10% OFF (51 caracteres)
- **metaDescription (rascunho):** BAWEMCASACOMCECILIA dá 10% OFF na BAW Clothing, no site e no app. Veja onde digitar o código, a conta do nosso teste e o que conferir se ele não entrar. (152 caracteres; o código termina no caractere 19)
- **description (subtítulo, até 180):** Onde digitar o código no carrinho da BAW Clothing, quanto ele tirou no nosso teste e como fica com promoção, Pix e frete. (121 caracteres)
- **editorialNote:** Cupom testado no carrinho do site oficial. Não usamos as peças. Podemos receber comissão pelo cupom.
- **cta:** Ir para a BAW Clothing; o `offerUrl` da loja.
- **relatedArticles:** os outros artigos do pacote que já estiverem no ar (BW6, BW4 e BW3, nessa ordem).

## Plano de imagens (para o Job 6)

Capa no painel lateral: logo, uma camiseta do teste (foto oficial) e o código. Corpo: o print
`/images/reviews/baw/cupom-baw-carrinho-com-cupom.webp` (já no CDN), no capítulo da conta.

## Matriz de claims

| Afirmação | Fonte | Status |
|---|---|---|
| 10% OFF em todo o site e no aplicativo, cliente novo e antigo | Bruno, 16/11; `couponsData.ts` | verificado |
| R$ 148,00 para R$ 133,20, R$ 14,80 na linha Cupom | carrinho da sessão de cupons, 16/11 | verificado |
| O código entra sobre peça em promoção | mesmo carrinho (Goth 3.0, de R$ 89,00 por R$ 59,00) | verificado |
| Pix dá 5% e soma com o código | página do produto ("5% OFF no PIX"); Bruno, 16/11 | verificado; valor somado sem teste |
| O cupom não dá frete grátis; R$ 10,62 para um CEP de São Paulo | carrinho de 16/11 | verificado; frete é exemplo datado |
| Até 10x sem juros, parcela mínima de R$ 50 | `/forma-de-pagamento`, 16/11 | verificado; reler |
| Valor mínimo, limite de usos | nenhuma | não escrever |
| BAWPOINTS soma com o código | nenhuma | não escrever |
| O código não vale no Mercado Livre | handoff de 16/11 | palavra do handoff; dizer "vale no site e no aplicativo" |

## Redação, revisão e JSON (16/11/2026)

Job 2 e Job 4 pela sessão de artigos, a partir deste briefing e das leituras do dia ([[baw-fatos-1611]], seção 10). Job 3 por subagente Fable: achados aplicados. Texto passado também pelo crivo de copy (sem contraste "X, e não Y", sem dois-pontos de efeito). JSON em `content/reviews/cupom-baw-como-usar.json`.

## Capa e imagens (aprovadas pelo Bruno em 16/11/2026)

Folha de aprovação mostrada no chat; upload ao CDN autorizado e verificado no mesmo dia. Capa no painel lateral (guia de capas), `imageFit: contain`. Todas as fotos são oficiais da BAW Clothing (`bawclothing.fbitsstatic.net`, páginas de produto lidas em 16/11/2026), sem cenário gerado.

- Capa `/images/reviews/baw/cupom-baw-como-usar-capa.webp`: foto da Camiseta Regular Goth 3.0 preta (segunda foto da página do produto 151202), chamada "Cupom BAW: como usar?" e o código.
- Corpo, "Onde digitar": `cupom-baw-carrinho-com-cupom.webp` (print do teste, já no CDN).
- Corpo, "Quanto o cupom tira": `cupom-baw-como-usar-camiseta-goth.webp`, terceira foto da mesma página; a legenda diz que o carrinho do teste levou a mesma camiseta em outra cor.

## Revisão externa (Farol, 16/11/2026)

Parecer colado pelo Bruno e aplicado no mesmo dia: a conta de R$ 133,20 passou a dizer que é o valor dos produtos, antes do frete.
