# Série "Cupom <loja> primeira compra" (briefing-molde, 12/11/2026)

Decisão do Bruno em 12/11/2026: toda parceira ganha um artigo "Cupom <loja> primeira compra", além da página
`/cupons/<loja>` e do "como usar o cupom". Não é piloto: sai para todas as lojas, sem esperar o resultado da Insider.
Ele escolheu de propósito a visão oposta à da canibalização: não há prova de que as três páginas concorram entre si,
e hoje nenhuma loja tem as três. Se uma página cair, reverte-se. Esta decisão substitui a de 05/11 ("sem série nem
artigo agora"), que estava na seção 4 da Fila.

**De onde veio:** teste do Bruno no Perplexity, deslogado. Em "tem cupom Insider?", a resposta citou primeiro uma
página de terceiro cuja URL, título, H1 e primeiro H2 são "cupom Insider primeira compra", com a frase-resposta logo
abaixo do H2. Nenhum artigo nosso mira essa busca, em nenhuma loja (conferido em `content/reviews` em 12/11).

Este arquivo é o briefing de todos os artigos da série. Cada artigo usa o molde abaixo e a linha da loja na tabela.
Loja com mecânica própria tem a adaptação no fim.

## A função de cada página

| Página | Pergunta que ela responde |
|---|---|
| `/cupons/<loja>` | Qual código está ativo e quais são as condições? |
| Como usar o cupom | Onde aplicar e como resolver problema no carrinho? |
| Cupom primeira compra | Qual benefício escolher no primeiro pedido, que requisitos existem e o que acontece nas compras seguintes? |

O artigo novo só se sustenta com conteúdo próprio: a comparação com o benefício de boas-vindas da loja, os
requisitos do primeiro pedido e o que muda depois. Passo a passo de checkout e erro de cupom ficam no "como usar",
com link.

## O que só este artigo dá (busca de 12/11/2026, "cupom insider primeira compra")

O topo é de agregadores (Cupom Online, com a URL `cupom-insider-primeira-compra`; Cuponation; Adoro Cupom; Descontos
Top; Discoup) e de matérias de cupom do TecMundo. Eles listam códigos de terceiros com data antiga, alguns anunciando
percentual maior que o nosso para a primeira compra, sem dizer se ainda funcionam.

- **Um código testado, com a regra:** o nosso código, o percentual e onde ele não entra, com a data do teste na
  página da loja.
- **A comparação com o boas-vindas da própria loja:** o que a loja dá a quem se cadastra, o que pede em troca
  (e-mail, newsletter, app) e se soma com o nosso código. Nenhum agregador compara.
- **As compras seguintes:** o boas-vindas vale uma vez; o nosso código vale de novo, onde isso é fato. É a frase que
  responde "cupom <loja> para quem já é cliente".
- **O risco do código de terceiro:** em uma frase, sem citar código nenhum. Na Insider, a marca já cancelou pedidos
  feitos com cupom vazado em site de cupom ([[Insider]], seção 3).

## Molde

- **slug:** `cupom-<loja>-primeira-compra` (o slug da loja como em `/cupons/<loja>`).
- **title:** Cupom <Loja> primeira compra: <CÓDIGO> dá X% OFF e vale nas compras seguintes
- **seoTitle:** Cupom <Loja> primeira compra: X% OFF com <CÓDIGO> (conferir os 60 caracteres; com código longo, sem "OFF")
- **metaDescription:** não abre com "Cupom <loja>" (a catraca barra). Molde: "Para a primeira compra na <Loja>,
  use <CÓDIGO>: X% OFF nos produtos elegíveis. O mesmo percentual vale para quem já comprou." Código e % na primeira
  frase, o código terminando até o caractere 100, até 155 caracteres, sem R$ (salvo a Dolce Gusto).
- **category / reviewKind / type:** `guias-praticos-utilidade`, `guia`, "Guia de Cupom" (o mesmo do "como usar").
- **affiliate / coupon:** a loja e o código. Só PT nesta etapa.

### Resposta rápida (40 a 60 palavras, sem "R$")

> Para a primeira compra na Insider, use EMCASACOMCECILIA: 15% OFF nos produtos elegíveis. O mesmo percentual vale
> para quem já comprou.

- Nunca chamar o nosso código de cupom exclusivo de primeira compra.
- Loja com boas-vindas próprio: comparar os dois e dizer que não somam.
- Loja sem benefício para cliente novo: dizer isso diretamente.
- Nunca "o maior desconto" nem "o melhor cupom": os agregadores anunciam percentuais que não testamos.

### Esqueleto

1. **Resposta rápida.**
2. **Cupom <Loja> primeira compra: qual usar.** O primeiro H2 repete a busca, com a frase-resposta logo abaixo
   (é o formato que o Perplexity citou). Código, percentual, onde vale.
3. **O boas-vindas da loja e o nosso código, lado a lado.** Tabela de duas colunas: desconto, o que pede (cadastro,
   newsletter, app), quantas vezes vale, se soma. Loja sem boas-vindas: o capítulo vira "A <Loja> tem cupom de
   primeira compra?", com a resposta direta e o que foi lido.
4. **Requisitos do primeiro pedido.** Valor mínimo, produtos fora, um cupom por pedido, conta nova ou não, frete
   grátis a partir de quanto. Só o que a loja publica ou o carrinho mostrou.
5. **E na segunda compra?** O que acontece com o boas-vindas (acaba) e com o nosso código (segue, onde é fato).
6. **Soma com promoção e com Pix?** Uma ou duas frases, pela regra da loja.
7. **Onde colar o código.** Três linhas e o link para o "como usar".
8. **FAQ (3 a 5):** "Tem cupom <Loja> de primeira compra?", "O cupom de primeira compra soma com o <CÓDIGO>?",
   "Qual cupom <Loja> vale para quem já é cliente?", "Preciso me cadastrar para usar o cupom?", "O cupom vale no
   app?" (só onde há fato).

Sem quadro `decision` quando os dois benefícios empatam e não há escolha a fazer; com o quadro quando há (boas-vindas
maior ou menor, ou com exigência).

### Regras

- **Fatos de `src/lib/couponsData.ts`** (FAQ da página da loja, na main depois do #898) e do dossiê da loja. O
  artigo não contradiz a página.
- **Boas-vindas da loja: reler no site no dia** (pop-up, faixa do topo, rodapé, central de ajuda), pelo navegador,
  sem login e sem cadastrar e-mail. Se a oferta só aparece depois do cadastro, o texto diz o que a loja anuncia, sem
  testar.
- **Nunca citar código de terceiros** (agregador, influenciador, imprensa). Código da própria loja pode, quando ela
  o publica no site (o PRIMEIRA5 da Skelt). Na Insider, o percentual do boas-vindas só é citado em `/cupons/insider`
  ([[feedback-cupom-boas-vindas-insider]]): no artigo, a comparação com número depende da resposta do Bruno
  (pergunta 1).
- **Cliente antigo:** a frase "vale para quem já comprou" só entra com fato (FAQ publicado ou palavra do Bruno).
- **Pix:** o cupom soma com o desconto do Pix por padrão, salvo quando a loja avisa o contrário (Bruno, 12/11).
- **Link para `/cupons/<loja>`** com a âncora "cupom <loja>", e para o "como usar" da loja.
- **Catraca:** até 2 datas no corpo, nenhuma em título, legenda ou FAQ; subtítulo de até 180 caracteres.
- **Texto próprio em cada loja.** O molde dá a ordem; os parágrafos não são copiados de uma loja para a outra, e a
  comparação com o boas-vindas é lida loja a loja.
- **Capa (Job 6):** logo da loja, um produto e o código.

## As lojas

Código e desconto de `couponsData.ts` em 12/11. "Boas-vindas" é o que a página da loja já compara; "a ler" quer
dizer que ninguém leu ainda se a loja tem benefício de cliente novo.

### Onda 1: boas-vindas já comparado na página

| Loja | Código | Desconto | Boas-vindas da loja | Como usar (link) | Atenção |
|---|---|---|---|---|---|
| Insider | EMCASACOMCECILIA | 15% | Cadastro do e-mail no site; mesmo percentual; um cupom por pedido | `cupom-emcasacomcecilia-insider-store-como-usar` | Lançamento pode ficar fora. O número do boas-vindas depende da pergunta 1. A marca cancela pedido com cupom vazado |
| Bagaggio | CECILIA10 | 10% | 5% na primeira compra; não acumula | `cupom-bagaggio-como-usar` | O nosso rende mais: o quadro `decision` cabe |
| Mais Mu | MMEMCASACOMCECILIA | 10% | 10% pela newsletter; não acumula | `cupom-mais-mu-como-usar` | Cashback não soma ([[project-parceiro-mais-mu]]) |

### Onda 2: vale para cliente novo e antigo; boas-vindas a ler

| Loja | Código | Desconto | Como usar (link) | Atenção |
|---|---|---|---|---|
| DAMIE | CECILIA12 | 12% | `cupom-cecilia12-como-usar` | Sem limite de usos por CPF; não soma com cupom nem giftback |
| Dolce Gusto | CECI | 10% | `cupom-ceci-nescafe-dolce-gusto-como-usar` | Mínimo de R$ 100. Não citar os 3 usos por campanha no artigo ([[feedback-ceci-usos-por-campanha]]) |
| Nestlé Nutre | CECI | 10% | `cupom-ceci-nestle-nutre-como-usar` | Fora Alfamino, Alfaré e fórmulas de 0 a 12 meses |
| Let's Eat It | MAUAD | 5% | `cupom-mauad-lets-eat-it-como-usar` | Soma com o Pix |
| Probiótica | PRO10EMCASACOMCECILIA | até 10% | `cupom-probiotica-como-usar` | O percentual varia por produto |
| Max Titanium | MAX10EMCASACOMCECILIA | até 10% | `cupom-max-titanium-como-usar` | O percentual varia por produto |
| Dr. Peanut | DREMCASACOMCECILIA | 10% | `cupom-dr-peanut-como-usar` | Frete grátis por região desde 12/11: R$ 149,90 (SP, Sudeste e Sul) e R$ 199,90 (Centro-Oeste, Nordeste e Norte) |
| Black Skull | CECILIA10 | 10% | `cupom-black-skull-como-usar` | |
| Cléa Store | CSEMCASACOMCECILIA | 10% | `cupom-clea-store-como-usar` | Um voucher por pedido |
| Belive | MAUAD | 10% | `cupom-belive-como-usar` | Frete por região, sem o cupom |
| HolyFoods | EMCASA | 15% | `cupom-holyfoods-como-usar` | Soma com promoção |
| Petz | EMCASA | 10% | `cupom-petz-como-usar` | Não soma com promoção nem com o Clubz; site e app. Ler pelo Chrome |
| Hostinger | SONAR20 | 20% | `cupom-hostinger-indicacao` | Só em compra nova; renovação não. Nunca "sempre conta nova". Só PT agora |

### Onda 3: esperam a palavra do Bruno sobre cliente antigo

| Loja | Código | Desconto | Como usar (link) | O que falta |
|---|---|---|---|---|
| Skelt | SKEMCASACOMCECILIA | 10% | `cupom-skelt-como-usar` | Boas-vindas da loja: PRIMEIRA5, 5% (lido em 12/11; antes era PRIMEIRA10, e o FAQ da página ainda cita o antigo). Um cupom por pedido. Falta saber se o nosso vale para quem já comprou |
| I Wanna Sleep | CECIEMCASA | 10% | `cupom-ceciemcasa-i-wanna-sleep-como-usar` | Cliente antigo. O CECIEMCASA15 com prazo não entra no texto |
| Toda Up | MAUAD | 15% | `cupom-toda-up-como-usar` | Cliente antigo. Black VIP fora |
| Simple Organic | S-EMCASACOMCECILIA | 5% | `cupom-simple-organic-como-usar` | Cliente antigo |

O artigo dessas quatro pode sair antes da resposta, sem o capítulo 5 e sem a frase sobre as compras seguintes.

### Mecânica própria: pauta adaptada

| Loja | Por que não cabe no molde | Como fica |
|---|---|---|
| YesStyle | O CECILIA010 é código de recompensa, não cupom: até 5% na primeira compra e 2% nas seguintes, no campo Reward Code, e soma com os cupons da loja | Título com "código", nunca "cupom CECILIA010". O capítulo 5 é o centro: o que cai na segunda compra. Família de 10 idiomas fica para depois do PT |
| SHEIN | O 4CW5Y é código de indicação, pesquisado no app; o percentual é da SHEIN | Sem percentual no snippet e sem "SHEIN Brasil". Comparar com o cupom de novo usuário da SHEIN só pelo que o app publica |
| Lejour | É cadastro pelo link, sem código | Não entra na série: não há cupom para comparar |
| Magalu | Códigos por faixa de valor, só no navegador, sem exigência de primeira compra | Artigo curto de resposta direta ("não há exigência de primeira compra"), se o Bruno quiser; o `cupom-magalu-em-casa-com-cecilia` já diz |

## Medição

- **Search Console:** as consultas e as URLs de cada loja, com posição, exposição do código e se a página certa
  responde a cada pergunta. Uma URL trocar de lugar com outra não é, sozinha, prejuízo.
- **IA:** "Tem cupom <loja>?", "Cupom <loja> primeira compra" e "Cupom <loja> para quem já é cliente", de 3 a 5
  vezes cada, em conversas novas, anotando o código recomendado e as fontes.
- **Linha de base:** antes de publicar a onda 1, guardar o CSV do Search Console das três lojas.

## Perguntas para o Bruno

1. **Insider:** o artigo pode citar o percentual do boas-vindas da loja, como o FAQ de `/cupons/insider`? Sem isso,
   a comparação sai como "o mesmo percentual", sem número. Sugestão: liberar no artigo de primeira compra, que existe
   para essa comparação.
2. **Onda 3:** o código vale para quem já comprou na Skelt, na I Wanna Sleep, na Toda Up e na Simple Organic?
3. **Magalu:** entra com artigo curto ou fica fora, com o FAQ da página?
4. **Ritmo:** sugestão de sair a onda 1 primeiro (três artigos, com a comparação pronta) e a onda 2 em lotes de
   quatro ou cinco, para o Job 3 e a capa de cada um não virarem fila.
