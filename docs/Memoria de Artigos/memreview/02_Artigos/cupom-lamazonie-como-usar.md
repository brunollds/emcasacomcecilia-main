---
titulo_provisorio: "Cupom L'Amazonie: como aplicar o CECILIA pelo botão Finalizar compra"
seo_title: "Cupom L'Amazonie: como usar o CECILIA, 5% OFF"
slug_sugerido: "cupom-lamazonie-como-usar"
parceiro: "[[LAmazonie]]"
parceiro_slug: "lamazonie"
category: "cupons-como-usar"
reviewKind: "guia"
type: "Guia & Cupons"
status: "pronto-para-deploy"
responsavel: "Job-1"
proxima_acao: "deploy (decisão do Bruno); refazer o teste do código na semana de 27/11"
bloqueado_por: "-"
data_criacao: "2026-11-16"
pauta_id: "LZ1"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
affiliate: "lamazonie"
coupon: "CECILIA"
---

# Briefing: como usar o cupom CECILIA na L'Amazonie (LZ1)

Primeiro artigo do pacote inicial da L'Amazonie (LZ1 a LZ6). Modelos: [[cupom-la-ganexa-como-usar]] (o mesmo código,
em outra loja) e [[cupom-baw-como-usar]]. Fatos em [[lamazonie-fatos-1611]] (a seção 9 é a leitura do Job 1) e no
dossiê [[LAmazonie]]. **As regras abaixo valem para os seis briefings.**

## Regras do pacote (LZ1 a LZ6)

- **Código:** `CECILIA`, 5% OFF no site oficial (`lamazonie.com.br`), para cliente novo e antigo. É o mesmo código da
  La Ganexa: no texto, sempre "o cupom CECILIA na L'Amazonie". **Não escrever "sem valor mínimo"** nem "uso
  ilimitado".
- **Onde o código entra:** só no checkout próprio da loja (`seguro.lamazonie.com.br`), que abre pelo botão **"Finalizar
  compra"** da gaveta do carrinho; campo "Tem um cupom?" e "Adicionar". O `/checkout` e o `/cart` da Shopify recusaram
  o código em 16/11 ("Insira um código de desconto válido").
- **A conta é a do teste da página da loja** (16/11/2026, `testNote` de `couponsData.ts`): Sérum para crescimento de
  Cílios e Sobrancelhas, R$ 159,00, mais Kit 2 Protetores Solares de Tratamento FPS 99 em promoção, R$ 249,00;
  R$ 408,00 viram R$ 387,60, com R$ 20,40 de desconto. Publicar o artigo não cria teste novo.
- **Soma com promoções e kits e com os 3% do Pix.** Os 5% e os 3% aparecem separados: nunca num percentual único e
  nunca um valor "com cupom e Pix" que não saiu de carrinho.
- **Cashback (15% para a próxima compra):** crédito para um pedido futuro, separado do preço pago hoje. Não afirmar
  que acumula com o `CECILIA`.
- **Frete:** grátis acima de R$ 199 para quase todo o Brasil e acima de R$ 500 no Acre, no Piauí, em Rondônia e em
  Roraima. O que se compara é o **total entregue** (produtos mais o frete do CEP), antes e depois do código. Sem
  leitura de o piso contar antes ou depois do cupom.
- **Nenhum cupom da própria loja** (o de primeira compra que o checkout anuncia inclusive) e **nenhum código de
  terceiros.** O topo do Google lista códigos de outras criadoras com percentual maior que o nosso
  ([[lamazonie-fatos-1611]], 9.8): por isso, nunca "o maior desconto" nem "o melhor cupom".
- **Sem experiência de uso dos cosméticos** (Bruno, 16/11). "Testamos" vale para o cupom no checkout, nunca para o
  produto.
- **Promessa de resultado é da marca:** "novos fios", "preenchimento de falhas", "clareamento", "sem contraindicação",
  "seguro para gestantes". Sempre com atribuição, nunca como fato nosso, e sem repetir "Nº 1". Gestação, amamentação e
  uso perto dos olhos: o que a marca escreve, mais a orientação de falar com o médico antes.
- **Avaliações da vitrine:** "avaliações publicadas no site da marca", nunca prova de eficácia.
- **Anvisa:** o processo 25351.021744/2026-56 é o do sérum de sobrancelhas e consta como **notificado** (9.4). Não
  escrever "registrado", "grau 2" nem ligar a Anvisa a resultado.
- **Dois CNPJs** (rodapé e Reclame Aqui), cada um com a fonte, sem explicar a diferença.
- **Arrependimento:** a caixa lacrada e o frete por conta do cliente são condições da política da loja, não do art.
  49 do CDC (9.2).
- **Garantia Mais Fios:** as condições inteiras, como estão no regulamento (9.3).
- **Mercado Livre:** o código só vale no site oficial; a garantia também.
- **JSON:** `affiliate: "lamazonie"`, `coupon: "CECILIA"`, sem link de afiliado: `cta` para o site oficial e link
  interno para `/cupons/lamazonie`.

## Busca (autocompletar de 16/11/2026)

"l'amazonie cupom" (na raiz da marca), "cupom l'amazonie", "cupom desconto l'amazonie".

## Canibalização

- `/cupons/lamazonie` é a dona de "cupom l'amazonie". O artigo é o "como usar": âncora descritiva, nunca "cupom
  L'Amazonie" exato apontando para o artigo.
- [[cupom-lamazonie-primeira-compra]] (LZ4): primeira e segunda compra. Aqui, uma frase com link.
- [[black-friday-lamazonie]] (LZ6): o código na campanha.

## O que só este artigo dá (Google em português, 16/11/2026)

O topo de "cupom l'amazonie" são listas de códigos: a visão de IA, sites de cupom e posts de criadoras. Nenhum diz
onde o código entra nem mostra um carrinho.

- **O código só é aceito num dos dois checkouts da loja.** Quem cola o código no carrinho da Shopify vê "Insira um
  código de desconto válido" e conclui que o cupom não existe. É o centro do artigo.
- **A conta de um carrinho testado,** com um item em promoção.
- **O total entregue:** o piso do frete grátis muda o que vale mais a pena levar.

## Esqueleto

1. **Resposta rápida** (40 a 60 palavras, sem "R$"). Rascunho, 60 palavras:
   > O cupom CECILIA dá 5% OFF no site da L'Amazonie, para cliente novo e antigo. Ele só é aceito no checkout que
   > abre pelo botão Finalizar compra: digite o código no campo Tem um cupom? e clique em Adicionar. Soma com os kits
   > em promoção e com o desconto do Pix. No nosso teste, entrou também num kit em promoção.
2. **Onde digitar o cupom.** Passo a passo com o print: produtos no carrinho, gaveta, "Finalizar compra", o endereço
   `seguro.lamazonie.com.br`, campo "Tem um cupom?", "Adicionar", o aviso "Desconto" em verde e a linha Descontos.
3. **Por que o cupom "não funciona" em alguns caminhos.** O capítulo que só este artigo tem: o `/checkout` e o `/cart`
   padrão recusaram o código no dia do teste. O que fazer: voltar ao carrinho e sair pelo "Finalizar compra". Sem
   explicar o motivo técnico (não lido) e sem dizer que a loja "tem um erro".
4. **Quanto ele tira: a conta do teste.** R$ 408,00 para R$ 387,60, com o kit de protetores em promoção.
5. **Soma com promoção, kit e Pix.** Sim para os três; os 3% do Pix à parte, sem percentual único.
6. **Frete: olhe o total entregue.** Os dois pisos do frete grátis e o exemplo de 1 sérum de sobrancelhas, que fica
   abaixo do piso. Mandar conferir o total com o CEP antes e depois do código.
7. **Cashback não é desconto de hoje.** Uma ou duas frases: crédito para a próxima compra, com validade, segundo a
   loja; sem afirmar que acumula com o código.
8. **Se o código não entrar.** Conferir o caminho (item 3), a grafia, e que o campo é o do resumo. Link para
   `/cupons/lamazonie`, que traz a data do último teste.
9. **FAQ (3 a 5), sem data:** "Onde coloco o cupom na L'Amazonie?", "Por que aparece 'Insira um código de desconto
   válido'?", "O cupom vale nos kits em promoção?", "O cupom vale no Mercado Livre?", "O cupom CECILIA vale para quem
   já é cliente?".

Sem quadro `decision` e sem card de estilo.

## Regras deste artigo

- Uma data no corpo (a do teste); nenhuma em título, legenda ou FAQ.
- Nada de eficácia de produto: este é o artigo do cupom. Garantia Mais Fios em uma frase, com link para a LZ3.
- Não dizer que o cupom "sempre" entra em kit: "no nosso teste, entrou".

## Leituras (no navegador, sem login e sem dados pessoais)

1. Um carrinho pelo "Finalizar compra" com o código, na semana do texto; e o mesmo carrinho pelo `/checkout`, para
   confirmar que a recusa continua.
2. A faixa do frete e `/pages/perguntas-frequentes`.

## Metadados sugeridos

- **title:** Cupom L'Amazonie: como aplicar o CECILIA pelo botão Finalizar compra (68 caracteres)
- **seoTitle:** Cupom L'Amazonie: como usar o CECILIA, 5% OFF (45 caracteres)
- **metaDescription (rascunho):** CECILIA dá 5% OFF na L'Amazonie, mas só entra no checkout do botão Finalizar compra. Veja o passo a passo, a conta do teste e o que soma. (137 caracteres; o código termina no caractere 7)
- **description (subtítulo, até 180):** Onde digitar o cupom CECILIA na L'Amazonie, o caminho em que ele é recusado, a conta do nosso teste e como ficam o Pix, os kits e o frete. (138 caracteres)
- **editorialNote:** Cupom testado no checkout do site oficial. Não usamos os produtos. Podemos receber comissão pelo cupom.
- **cta:** Ir para a L'Amazonie; o `offerUrl` da loja.
- **relatedArticles:** LZ4, LZ3 e LZ6, os que estiverem no ar.

## Plano de imagens (para o Job 6)

Capa no painel lateral: logo, o código e a chamada "como usar". Corpo: o print
`/images/reviews/lamazonie/cupom-lamazonie-checkout-com-cupom.webp` (já no CDN); se a releitura render, um print do
botão "Finalizar compra" na gaveta.

## Matriz de claims

| Afirmação | Fonte | Status |
|---|---|---|
| 5% OFF no site oficial, cliente novo e antigo | Bruno, 16/11; `couponsData.ts` | verificado |
| Só entra no checkout de `seguro.lamazonie.com.br`; `/checkout` e `/cart` recusam | testes de 16/11 (dossiê) | verificado; refazer na semana do texto |
| R$ 408,00 para R$ 387,60 | checkout de 16/11 | verificado |
| Soma com promoção e kit | mesmo checkout | verificado |
| Soma com os 3% do Pix | Bruno, 16/11; página do produto | verificado; valor somado sem teste |
| Frete grátis acima de R$ 199 (R$ 500 em AC, PI, RO e RR) | perguntas frequentes; faixa do site | verificado; piso antes ou depois do cupom sem leitura |
| Cashback acumula com o código | nenhuma | não escrever |
| Valor mínimo, limite de usos | nenhuma | não escrever |
| Motivo da recusa no `/checkout` | nenhuma | não escrever |

## Redação, revisão e JSON (16/11/2026)

Job 2 e Job 4 pela sessão de artigos, a partir deste briefing e do carrinho refeito no dia ([[lamazonie-fatos-1611]], seção 10). Job 3 por subagente Fable: 14 achados aplicados. JSON em `content/reviews/cupom-lamazonie-como-usar.json`.

O que mudou em relação ao esqueleto: o capítulo da recusa fala só do endereço `lamazonie.com.br/checkout`, que foi o que se verificou; a página `/cart` de hoje não tem campo de cupom e o botão dela leva ao checkout próprio.

## Capa e imagens (aprovadas pelo Bruno em 16/11/2026)

Capa no painel lateral, `imageFit: contain`: primeira foto oficial do sérum (frasco e caixa, `PG_SS_01` da página do produto), chamada "Como usar o cupom" e o código. Upload ao CDN autorizado no mesmo dia. Corpo: o print `cupom-lamazonie-checkout-com-cupom.webp`, que já estava no CDN.

## Revisão externa (Farol, 16/11/2026)

Parecer colado pelo Bruno depois do merge do #1069 (`docs/auditoria-copy-artigos/lamazonie-lz1-lz2-lz3-pr1069-20261116-farol/`). P02 a P06 aplicadas: o caminho do Finalizar compra passa a ser descrito como resultado do teste (sem "só entra"), e "carrinho inteiro" virou "os produtos do carrinho". O título (P01) foi trocado com o OK do Bruno para "Cupom L'Amazonie: como aplicar o CECILIA pelo botão Finalizar compra"; seoTitle e slug iguais.
