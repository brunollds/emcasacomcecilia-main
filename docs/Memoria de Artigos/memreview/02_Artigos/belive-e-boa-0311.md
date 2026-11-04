---
titulo_provisorio: "Belive é boa? Os doces sem açúcar, os salgadinhos, os pães e o que vale comprar da marca"
seo_title: "Belive é boa? Brownie, salgadinho, pão e panetone sem glúten pelo rótulo"
slug_sugerido: "belive-e-boa"
parceiro: "[[Belive]]"
affiliate: "belive"
coupon: "MAUAD"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia de Marca"
status: "publicado"
responsavel: "Claude (Jobs 3 a 6)"
proxima_acao: "linkar a B7 (panetone) quando ela sair; reler preços em dezembro de 2026"
bloqueado_por: "-"
data_criacao: "2026-11-03"
pauta: "Série \"<Marca> é boa? Vale a pena?\", lote 2 (Mais Mu, Dr. Peanut, Belive e Simple Organic), decisão do Bruno de 03/11/2026"
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
---

# Briefing: Belive é boa?

## Buscas (autocompletar do Google, 03/11/2026)
O Bruno liberou o lote sem o Trends (03/11). Se o arquivo vier, a ordem dos capítulos segue o arquivo.
- "belive é bom": **brownie**, **panetone**, **chocotone**, **salgadinho**, bolinho, "pão sem glúten belive é bom",
  "produtos belive é bom", "marca belive é boa".
- "produtos belive são saudáveis", "produtos belive são bons", "sem glúten", "sem leite", "onde comprar".
- "belive brownie": proteico, tabela nutricional, ingredientes, zero açúcar, "engorda", calorias.
- Ruído que não entra: "believe" (palavra em inglês), Belive Medical (outra empresa) e "body splash belive".

## Catálogo (Store API da loja, por curl, 03/11/2026; 100 itens)
- **Doces sem açúcar:** brownies (comuns e proteicos: caramelo salgado, chocolate com avelã, cappuccino, doce de
  leite), pão de mel proteico, bolinhos (inclusive os infantis), cookies e bolos.
- **Panetone e chocotone sem glúten:** o Panetone Sem Glúten Zero Açúcar Zero Lactose e kits de 3 (chocotones,
  panetones e misto). **É novidade:** a pauta B7 foi descartada em 27/10 porque a loja não vendia panetone. Agora vende.
- **Salgados:** snack proteico (queijo, cebola e salsa, barbecue, presunto), salgadinhos GoodSoy (3,97 cada), chips de
  batata-doce e de mandioca. Parte está na categoria "Aptos para veganos".
- **Pães:** de forma (tradicional, multigrãos, batata-doce), de batata, de cebola, de cenoura, brioche de coco,
  bisnaguinha.
- **Combos e kits** (21 itens), inclusive o Kit Lanche Escolar.

## Estrutura sugerida
1. Resposta rápida (2 a 3 frases, sem preço e sem dizer que é saudável).
2. O que a Belive vende e o que a linha tem em comum: sem glúten, sem leite e sem lactose (declarado pela marca e
   conferido no rótulo de cada item citado).
3. **Os doces sem açúcar são bons?** Brownie, pão de mel, bolinho e cookie, pelo rótulo: o adoçante da lista de
   ingredientes (maltitol e glicosídeos de esteviol, como no `brownie-sem-acucar-belive`), proteína nos proteicos, kcal
   e preço por unidade. Os links: `brownie-sem-acucar-belive`, `pao-de-mel-sem-acucar-belive`, `cookies-sem-acucar-belive`
   e `bolinho-kids-belive-lancheira`.
4. **Panetone e chocotone sem glúten.** O rótulo do panetone zero açúcar (ingredientes, adoçante, alérgicos, peso) e os
   kits. É um capítulo de época: reler antes de publicar e, se sair do catálogo, cortar.
5. **Salgadinhos e snacks.** Snack proteico, GoodSoy e chips, pelo rótulo (proteína, sódio, kcal por pacote); link
   `snack-proteico-ou-snack-de-arroz-belive`.
6. **Pães sem glúten.** Ingredientes, peso e preço; um parágrafo e uma tabela curta.
7. **Quanto custa com o cupom, e onde comprar:** o código da Belive (10%), que soma com as promoções e com os 5% do
   Pix (print de 16/10). O frete grátis muda por região (os três valores do dossiê). Mercado Livre: link do dossiê, onde
   o código não vale.
8. **A Belive é confiável?** Um parágrafo e os links para `belive-e-confiavel` e `belive-reclame-aqui-nota-reputacao`.
9. Quadro "Leve se / Passe se".
10. Perguntas frequentes: "O brownie da Belive é bom?", "Os produtos da Belive são saudáveis?" (resposta pelo rótulo,
    com o nutricionista), "A Belive tem panetone sem açúcar?", "Os produtos da Belive são sem glúten?", "Onde comprar
    Belive?".

## Regras
- **Molde:** o `insider-vale-a-pena` reformado e o `probiotica-e-boa` (lote 1): artigo da marca, um capítulo por linha,
  quadro sem nota e sem preço.
- **Saúde:** nada de "é saudável", "engorda", "emagrece" ou "pode para diabético" como conclusão. O texto mostra o que o
  rótulo traz e manda para nutricionista ou médico, como no `doces-sem-acucar-para-diabeticos`. Sem glúten não quer
  dizer "para celíacos" sem o aviso de contaminação cruzada do rótulo: citar o que o rótulo declara.
- **Nenhum concorrente.** O `bolinho-sem-acucar-belive-ou-suavipan` fica só nos `relatedArticles`.
- **O código:** é o MAUAD, o mesmo da Let's Eat It. O texto diz que é o código da Belive e **não destaca** o nome (é o
  sobrenome da Cecília): sem "por que se chama MAUAD".
- **Preços:** a Store API dá o preço regular e o de oferta. Use o regular na tabela e diga quando há oferta, com a data
  só na legenda. Preço de Black Friday (Black November) fica no `black-friday-belive`.
- **Catraca:** resposta rápida sem preço, no máximo 2 datas no corpo, nenhuma em título de seção, legenda de foto ou
  FAQ. `description` com até 180 caracteres.
- **Imagens:** capa pelo Job 6 (`covers:render` e a folha de aprovação do Bruno), só com produto da marca. Ao menos uma
  foto oficial no corpo, numa seção comum.
- `somente-pt`, `isNew: true`, link de cada produto na primeira célula das tabelas.
- **Gates:** `node scripts/content/build-index.mjs` com os gerados que mudarem commitados, `validate:content`,
  `test:article-d2`, `typecheck` e o Gate 1 verde. Squash sem deploy.

## Rascunho (Job 2, 03/11/2026)

### Metadados

- **title:** Belive é boa? Os doces sem açúcar, os salgadinhos, os pães e o que vale comprar da marca
- **seoTitle:** Belive é boa? Brownie, salgadinho, pão sem glúten pelo rótulo
- **description (173 caracteres):** A Belive é boa? Sim, para quem precisa tirar glúten, leite e lactose da mesa: veja o que o rótulo dos doces, snacks e pães mostra, quanto custam com o código e onde comprar.
- **metaDescription:** Belive é boa? Brownie, bolinho, salgadinho, pão e panetone sem glúten pelo rótulo, preço de lista, o código de 10% e o frete por região: para quem a marca compensa.
- **category:** guias-praticos-utilidade
- **reviewKind:** guia
- **type:** Guia de Marca
- **editorialNote:** Podemos receber comissão pela Belive. Ninguém da equipe provou os produtos: os dados são do rótulo e do site da marca.
- **cta:**
  - label: Ir para a Belive com o código
  - text: Entre no site oficial da Belive pelo link da parceria e digite o código da Belive no campo "Código do cupom" do carrinho: 10% em todo o site, em todas as formas de pagamento. Confira a linha de desconto antes de pagar.
  - url: https://belivebefree.com.br/ (sponsored)
- **decision:**
  - takeIf:
    - Você precisa de pão, doce e salgadinho sem glúten, sem leite e sem lactose e quer resolver tudo numa loja só.
    - Você escolhe o doce pelo rótulo: açúcares, carboidratos e proteína estão na página de cada brownie, bolinho e cookie.
  - skipIf:
    - Você quer o panetone com a tabela nutricional na página: ela não está lá, só a descrição.
    - Você compra pouco e mora fora de SP, MG, RJ, DF, GO e do Sul: o frete grátis pede o carrinho mais alto da loja.
- **relatedArticles (slugs):** snack-proteico-ou-snack-de-arroz-belive, pao-de-mel-sem-acucar-belive, cookies-sem-acucar-belive, bolinho-kids-belive-lancheira, belive-reclame-aqui-nota-reputacao, bolinho-sem-acucar-belive-ou-suavipan, cupom-belive-como-usar, black-friday-belive
- **Links internos no corpo (3):** `/cupons/belive` (âncora "cupom Belive"), `/reviews/brownie-sem-acucar-belive`, `/reviews/belive-e-confiavel`.

### Resposta rápida

Sim, para quem precisa tirar glúten, leite e lactose: a Belive declara os três em toda a linha e publica a tabela nutricional de doces e snacks. Os doces são sem açúcar pelo rótulo, não pobres em carboidrato. O que muda a escolha é o preço por unidade e o frete por região; veja os capítulos de preço e compra.

### O que a Belive vende

A Belive vende a padaria e a lanchonete de quem não come glúten, leite ou lactose, tudo numa loja só. A marca é brasileira, da NHD Foods, com fábrica em Uberaba (MG), e a loja oficial é a belivebefree.com.br, com um "e" só. Tudo o que está no site é declarado sem glúten, sem leite e sem lactose; a marca diz que a fábrica é livre de glúten e leite, com "zero risco de contaminação cruzada". É declaração da loja, e a lista de alérgenos de cada página marca ovo, soja e castanhas em vários itens, então vale ler produto a produto.

As linhas, com o capítulo de cada uma abaixo:

- **Doces sem açúcar:** brownies comuns e proteicos, pão de mel, bolinhos (inclusive os infantis), cookies e dois bolos inteiros.
- **Panetone e chocotone:** dois panetones zero açúcar e os kits de 3, de época.
- **Salgadinhos e snacks:** o snack proteico, o snack de arroz, o salgadinho de milho de 25 g, os GoodSoy e os chips de batata-doce e de mandioca.
- **Pães:** pão de forma tradicional, multigrãos e de batata-doce, pãezinhos de batata, cebola, cenoura e brioche de coco, e bisnaguinha.
- **Combos e kits:** caixas de 10, combos de 4 pacotes de pão, kits de lanche escolar e os "Completão" de 25 a 40 unidades.

Os GoodSoy são de outra marca do mesmo grupo, criada antes da Belive e feita na mesma fábrica; a loja os vende junto com os dela.

### Brownie, pão de mel, bolinho e cookie: o que o rótulo mostra

Pelo rótulo, os doces da Belive são sem açúcar, não "light": 0 g de açúcares adicionados em todos, e de 13 g a 23 g de carboidratos por unidade. O adoçante é a dupla maltitol e glicosídeos de esteviol em toda a linha; a descrição da loja fala em stévia, e o maltitol vem antes dela na lista de ingredientes. Os proteicos trocam parte da farinha por proteína isolada de soja, arroz e ervilha: o brownie proteico tem 5 g ou 6 g de proteína por unidade de 40 g, contra 1,6 g a 2 g do comum, com as calorias quase iguais, de 121 kcal a 144 kcal nos oito sabores. O pão de mel repete a lógica, 6 g no proteico contra 2 g no comum. Os oito brownies, sabor a sabor, estão no guia do [brownie sem açúcar da Belive](/reviews/brownie-sem-acucar-belive).

| Produto | Unidade | Preço de lista | Kit de 10 |
|---|---|---|---|
| [Brownie de Chocolate Sem Açúcar](https://belivebefree.com.br/produto/brownie-de-chocolate-sem-acucar-sem-gluten-sem-leite-belive/) (sponsored) | 40 g | R$ 6,97 | R$ 69,70 |
| [Brownie Proteico Double Chocolate Sem Açúcar](https://belivebefree.com.br/produto/brownie-proteico-double-chocolate-sem-acucar-sem-gluten-sem-leite-belive/) (sponsored) | 40 g | R$ 7,97 | R$ 79,70 |
| [Pão de Mel Sem Açúcar](https://belivebefree.com.br/produto/pao-de-mel-sem-gluten-sem-acucar-sem-leite-belive/) (sponsored) | 45 g | R$ 7,97 | R$ 79,70 |
| [Pão de Mel Proteico Sem Açúcar](https://belivebefree.com.br/produto/pao-de-mel-proteico-sem-gluten-sem-acucar-sem-leite-belive/) (sponsored) | 45 g | R$ 8,49 | R$ 84,90 |
| [Bolinho de Chocolate Sem Açúcar](https://belivebefree.com.br/produto/bolinho-de-chocolate-fit-sem-acucar-sem-gluten-sem-leite-belive/) (sponsored) | 40 g | R$ 5,39 | R$ 53,90 |
| [Bolinho de Cenoura com Cobertura, linha Special](https://belivebefree.com.br/produto/bolinho-de-cenoura-com-cobertura-de-chocolate-sem-gluten-sem-acucar-sem-leite-belive/) (sponsored) | 45 g | R$ 6,97 | R$ 69,70 |
| [Bolinho para Criança, brigadeiro ou morango](https://belivebefree.com.br/produto/bolinho-para-crianca-sabor-brigadeiro-com-cobertura-sem-gluten-sem-acucar-sem-leite-belive-45g/) (sponsored) | 45 g | R$ 6,97 | R$ 69,70 |
| [Cookie de Chocolate Sem Açúcar](https://belivebefree.com.br/produto/cookie-de-chocolate-fit-sem-gluten-sem-acucar-sem-leite-belive/) (sponsored) | pacote com 4 | R$ 8,97 | R$ 89,70 |
| [Bolo de Cenoura com Cobertura, inteiro](https://belivebefree.com.br/produto/bolo-de-cenoura-com-cobertura-de-chocolate-sem-gluten-sem-acucar-sem-leite-belive/) (sponsored) | 1 bolo | R$ 34,90 | — |

Legenda: preço de lista do site em 03/11, sem o código. A loja vendia a maior parte da linha com desconto de promoção no dia, e o preço riscado da página é o desta tabela.

Conta nossa, pelos preços de lista da tabela: o kit de 10 custa o mesmo que 10 unidades avulsas. O kit só sai mais barato por unidade quando está em promoção, e no dia estava, em toda a linha; confira o preço riscado antes de levar a caixa pensando que ela já é o desconto.

Olha o nome parecido: o Brownie Proteico Double Chocolate "Sem Glúten Sem Lactose" não é sem açúcar, e a lista de ingredientes dele começa por açúcar. O sem açúcar é o "Sem Açúcar Sem Glúten Sem Leite". O bolinho para criança, de 45 g, tem mais calorias e mais gordura saturada que o bolinho adulto de 40 g, e o Kit Lanche Escolar de 25 bolinhos não traz nenhum kids: são os adultos de 40 g.

Os doces servem a quem quer um doce pronto, embalado por unidade, sem glúten e sem leite. Não escolha pelo "sem açúcar" se o que você controla é carboidrato: o rótulo não separa o maltitol da linha de carboidratos, e a conta para o seu caso é com o nutricionista.

### Panetone e chocotone sem glúten

O panetone da Belive existe, é de época e vem em dois sabores: o de chocolate, com recheio de brownie, gotas de chocolate 42% cacau e cobertura de chocolate, e o de frutas cristalizadas, com uvas-passas e amêndoas laminadas. Os dois são declarados sem glúten, zero açúcar (adoçados com stévia) e sem leite e lactose, e a página do de frutas repete o "zero risco de contaminação cruzada" da fábrica. Os kits de 3 trazem só chocotones, só panetones de frutas ou um de frutas com dois chocotones.

| Produto | Preço de lista |
|---|---|
| [Panetone Zero Açúcar de Chocolate](https://belivebefree.com.br/produto/panetone-sem-gluten-zero-acucar-zero-lactose-chocolate-belive/) (sponsored) | R$ 64,90 |
| [Panetone Zero Açúcar de Frutas Cristalizadas](https://belivebefree.com.br/produto/panetone-zero-acucar-sem-gluten-zero-lactose-frutas-cristalizadas-belive/) (sponsored) | R$ 64,90 |
| [Kit 3 Chocotones](https://belivebefree.com.br/produto/oferta-especial-kit-3-chocotones-sem-gluten-sem-acucar-sem-leite-belive/) (sponsored) | R$ 194,70 |
| [Kit 1 Panetone de Frutas + 2 Chocotones](https://belivebefree.com.br/produto/kit-panetone-chocotones-sem-gluten-zero-acucar-belive/) (sponsored) | R$ 194,70 |
| [Kit 3 Panetones de Frutas](https://belivebefree.com.br/produto/oferta-especial-kit-3-panetones-sem-gluten-zero-acucar-frutas-belive/) (sponsored) | R$ 194,70 |

O que a página não traz: a tabela nutricional e a lista completa de ingredientes dos panetones. Quem compra pelo rótulo lê na embalagem que chegar. O panetone vale para quem quer a mesa de Natal sem glúten e sem leite com um produto pronto; quem conta carboidrato ou precisa da lista de alérgenos antes de pagar fica sem a informação na página.

### Salgadinhos e snacks

O salgadinho da Belive se escolhe pela proteína e pelo tamanho do pacote, não pelas calorias: as cinco linhas ficam entre 100 kcal e 139 kcal por pacote nas que declaram o número. O snack proteico de 35 g traz 10 g de proteína, e ela é isolada de soja, não whey: quem espera gosto de whey vai estranhar, e quem quer o lanche sólido com proteína achou o formato. O snack de arroz, do mesmo tamanho, tem 3 g de proteína e, em média, menos sódio; o sódio é o que mais separa as duas linhas depois da proteína, de 180 mg a 310 mg no proteico contra 87 mg a 209 mg no de arroz.

As outras três linhas são de lanche pequeno. O salgadinho de milho de 25 g é o da lancheira: a página o declara assado, 100% vegetal e com 9 vitaminas e minerais. O GoodSoy, também de 25 g, é a bolinha de soja da marca irmã, que a página declara com 100 kcal por pacote. Os chips de batata-doce e de mandioca, de 50 g, são fatias crocantes com temperos da BR Spices (sal rosa, chimichurri, lemon pepper, barbecue, sweet chilli), feitos em Minas Gerais.

| Produto | Pacote | Preço de lista | Combo |
|---|---|---|---|
| [Snack Proteico, 4 sabores](https://belivebefree.com.br/produto/snack-proteico-sabor-queijo-salgadinho-sem-gluten-sem-leite-zero-lactose-belive-35g/) (sponsored) | 35 g | R$ 7,97 | 16 por R$ 127,52 |
| [Snack de Arroz, 4 sabores](https://belivebefree.com.br/produto/salgadinho-de-queijo-sem-gluten-sem-leite-snack-de-arroz-belive/) (sponsored) | 35 g | R$ 5,19 | 20 por R$ 103,80 |
| [Salgadinho de milho com vitaminas, 4 sabores](https://belivebefree.com.br/produto/salgadinho-de-queijo-sem-gluten-sem-leite-com-vitaminas-belive-25g/) (sponsored) | 25 g | R$ 3,97 | 30 por R$ 144,86 |
| [GoodSoy, 7 sabores](https://belivebefree.com.br/produto/goodsoy-snacks-salgadinho-de-queijo-sem-gluten-sem-leite-sem-lactose/) (sponsored) | 25 g | R$ 3,97 | 20 por R$ 79,40 |
| [Chips de batata-doce e de mandioca, 5 sabores](https://belivebefree.com.br/produto/chips-de-batata-doce-sem-gluten-belive-temperados-com-sal-rosa-do-himalaia/) (sponsored) | 50 g | R$ 7,97 | 18 por R$ 143,46 |

Por grama de proteína o proteico sai bem mais barato que o de arroz, mesmo custando mais o pacote. A tabela de alérgenos da loja marca derivados de soja nos oito snacks de 35 g e não marca leite em nenhum. Para a lancheira, o pacote de 25 g é a porção pequena; para a bolsa de academia, o proteico; para o petisco de receber gente, o chips. Não escolha o snack proteico esperando menos calorias: ele tem quase as mesmas do de arroz.

### Pães sem glúten

O pão da Belive é pão pronto, de pacote, com validade longa, e é isso que decide. A loja informa: 120 dias de validade no pão de forma de 400 g, e os pãezinhos em pacotes de cerca de 200 g, com 7 a 9 unidades pequenas. O pão de forma vem em três massas: tradicional, multigrãos (com castanha-do-pará, chia, linhaça e quinoa) e batata-doce. Os pãezinhos são de batata, cebola, cenoura e o brioche de coco, que é pão doce. A bisnaguinha vem tradicional ou multigrãos. A página dos pães diz "sem proteína do leite" e repete o "zero risco de contaminação cruzada" da fábrica.

| Produto | Pacote | Preço de lista | Combo de 4 pacotes |
|---|---|---|---|
| [Pão de forma tradicional](https://belivebefree.com.br/produto/pao-sem-gluten-sem-lactose-sem-leite-tradicional-belive/) (sponsored) | 400 g | R$ 22,90 | R$ 91,60 |
| [Pão de forma multigrãos](https://belivebefree.com.br/produto/pao-sem-gluten-sem-lactose-sem-leite-multigraos-belive/) (sponsored) | 400 g | R$ 22,90 | R$ 91,60 |
| [Pão de forma de batata-doce](https://belivebefree.com.br/produto/pao-de-batata-doce-pao-de-forma-sem-gluten-sem-lactose-sem-leite-belive-400g/) (sponsored) | 400 g | R$ 22,90 | R$ 91,60 |
| [Pão de batata, pãozinho](https://belivebefree.com.br/produto/pao-de-batata-sem-gluten-sem-leite-sem-lactose-paozinho-belive/) (sponsored) | 198 g, cerca de 9 | R$ 20,90 | R$ 83,60 |
| [Pão de cebola, pãozinho](https://belivebefree.com.br/produto/pao-de-cebola-sem-gluten-sem-lactose-sem-leite-belive/) (sponsored) | pacote | R$ 20,90 | R$ 83,60 |
| [Pão de cenoura, pãozinho](https://belivebefree.com.br/produto/pao-de-cenoura-sem-gluten-sem-leite-zero-lactose-belive-200g/) (sponsored) | 200 g | R$ 20,90 | R$ 83,60 |
| [Brioche de coco, pão doce](https://belivebefree.com.br/produto/pao-brioche-de-coco-pao-doce-sem-gluten-sem-leite-zero-lactose-belive-200g/) (sponsored) | 200 g, cerca de 8 | R$ 20,90 | R$ 83,60 |
| [Bisnaguinha tradicional](https://belivebefree.com.br/produto/bisnaguinha-sem-gluten-sem-lactose-sem-leite-com-vitaminas-tradicional-belive/) (sponsored) | 200 g, cerca de 7 | R$ 20,90 | R$ 83,60 |

O combo de 4 custa, em lista, o mesmo que 4 pacotes avulsos; o desconto do combo é o da promoção do dia, e o Kit Pães Completão, com 11 pacotes variados, sai por R$ 207,50 de lista. A página dos pães não publica a tabela nutricional nem a lista de ingredientes além do que o nome diz; o multigrãos leva castanha-do-pará, que é alérgeno, e quem evita castanhas fica no tradicional ou no de batata-doce. O pão de forma serve a quem quer pão de todo dia com validade longa para não faltar; o pãozinho e a bisnaguinha, à lancheira e ao café. Quem compra um pacote só paga frete sobre ele: o pão é o item que mais pede o combo ou o carrinho cheio, como mostra o próximo capítulo.

### Quanto custa com o código, e onde comprar

Com o código da Belive, todo o site sai 10% mais barato, em todas as formas de pagamento, na primeira compra e nas seguintes, e o desconto soma com as promoções da loja e com os 5% do Pix. No teste do cupom, um carrinho com quatro combos em oferta, de R$ 576,82, caiu para R$ 519,14 com o código e para R$ 493,18 no Pix. O código vai no campo "Código do cupom" do carrinho, com o botão "Aplicar cupom"; a página do [cupom Belive](/cupons/belive) tem o passo a passo e as regras.

O que muda a conta é o frete, e ele muda por região: frete grátis acima de R$ 170 em SP, MG, RJ, DF e GO, acima de R$ 250 no Sul e acima de R$ 300 nos demais estados. Abaixo disso, o frete é calculado no checkout, e o valor do frete grátis conta o carrinho antes do código. A faixa do site mostra só o valor de São Paulo: quem mora fora dos cinco estados precisa do carrinho maior para zerar o frete, e é aí que os combos de 4 pães e as caixas de 10 fazem sentido.

A Belive também vende no [Mercado Livre](https://meli.la/2xDjP2k) (sponsored), onde o código não vale e o preço é o do anúncio. Vale olhar lá quando o pedido é pequeno e o frete do site pesa; para o carrinho cheio, o site oficial com o código e o Pix leva.

### Dá para confiar na Belive

Dá. A loja é da NHD Foods Indústria, Comércio, Importação e Exportação Ltda., empresa registrada e ativa nos dados públicos, com CNPJ, razão social, trocas e frete publicados no site, e as duas unidades em Uberaba (MG). No Reclame Aqui, a reputação era Ótima, com nota 8,1 nos últimos 6 meses, e a loja responde a todas as reclamações, resolvendo entre 75% e 80% delas. CNPJ, como reconhecer o site oficial, trocas e frete estão em [Belive é confiável?](/reviews/belive-e-confiavel), e a leitura das reclamações, no guia da marca no Reclame Aqui, listado no fim.

### Para quem vale e para quem não vale

> **Destaque:** Para quem precisa tirar glúten e leite da mesa, a Belive resolve a padaria inteira numa loja só; o preço por unidade é o preço dessa conveniência.

- Para o doce pronto sem açúcar e sem glúten, o brownie e o bolinho, pelo rótulo publicado; o proteico só para quem quer os 5 g a 6 g de proteína, porque as calorias são as mesmas.
- Para o lanche com proteína sem whey, o snack proteico; para o lanche pequeno da lancheira, o salgadinho de milho de 25 g ou o GoodSoy.
- Para o pão de todo dia com validade longa, o pão de forma de 400 g; para a lancheira, a bisnaguinha e o pãozinho de batata.
- Para o panetone sem glúten e sem açúcar de Natal, os dois sabores existem, mas a página não publica a tabela nutricional.
- Não vale escolher pelo "sem açúcar" quem controla carboidrato: o rótulo mostra de 13 g a 23 g por unidade nos doces, e a conta é com o nutricionista.
- Não vale o pedido pequeno fora de SP, MG, RJ, DF, GO e do Sul: o frete grátis pede o carrinho mais alto, e o Mercado Livre pode sair melhor nesse caso.

### Perguntas frequentes

- O brownie da Belive é bom? Pelo rótulo, é um brownie de 40 g sem açúcar adicionado, adoçado com maltitol e esteviol, e os quatro proteicos trazem de 5 g a 6 g de proteína; os oito sabores estão no capítulo dos doces e no guia do brownie.
- Os produtos da Belive são saudáveis? O rótulo não responde isso: ele mostra calorias, carboidratos, açúcares e proteína de cada item, e a conta para o seu caso é com o nutricionista ou o médico.
- A Belive tem panetone sem açúcar? Tem, de chocolate e de frutas cristalizadas, declarados sem glúten e sem lactose, mais os kits de 3; a página não traz a tabela nutricional, como mostra o capítulo do panetone.
- Os produtos da Belive são sem glúten? A loja declara toda a linha sem glúten, sem leite e sem lactose, e a marca diz que a fábrica não tem contaminação cruzada; a tabela de alérgenos de cada página marca ovo, soja e castanhas em vários itens.
- Onde comprar Belive? No site oficial, com o código da Belive de 10%, ou no Mercado Livre, onde o código não vale; o frete grátis muda por região, como mostra o capítulo de compra.

### Plano de imagens

Capa (Job 6, `covers:render`): foto de cima do Brownie de Chocolate Sem Açúcar, recortada da foto oficial `https://belivebefree.com.br/wp-content/uploads/2020/04/brownie-de-chocolate-sem-acucar-sem-gluten-sem-leite-belive-1.webp`, com o logo da Belive e a faixa "Belive é boa?". Sem o código na capa.

| # | Seção | URL de origem | O que mostra | Alt sugerido | Legenda sugerida | href |
|---|---|---|---|---|---|---|
| 1 | Brownie, pão de mel, bolinho e cookie | https://belivebefree.com.br/wp-content/uploads/2026/08/kit-misto-brownies-sem-gluten-sem-leite-zero-lactose-belive.webp | A caixa do Kit Misto de 10 brownies, com os brownies embalados por unidade | Caixa do Kit Misto 10 Brownies da Belive, sem glúten e sem leite, com os brownies em embalagem individual | O kit de 10 brownies: em lista, custa o mesmo que 10 unidades; o desconto é o da promoção. Imagem: Belive | https://belivebefree.com.br/produto/kit-misto-10-brownies-sem-gluten-sem-leite-zero-lactose-belive/ |
| 2 | Panetone e chocotone sem glúten | https://belivebefree.com.br/wp-content/uploads/2021/10/chocotone-sem-gluten-sem-acucar-sem-leite-belive-1.webp | O panetone de chocolate da Belive na caixa, com recheio de brownie e gotas de chocolate | Panetone Sem Glúten Zero Açúcar Zero Lactose de Chocolate da Belive, com recheio de brownie e cobertura de chocolate | O panetone de chocolate: recheio de brownie, gotas 42% cacau e cobertura, adoçado com stévia. Imagem: Belive | https://belivebefree.com.br/produto/panetone-sem-gluten-zero-acucar-zero-lactose-chocolate-belive/ |
| 3 | Salgadinhos e snacks | https://belivebefree.com.br/wp-content/uploads/2026/05/snack-proteico-sabor-queijo-protein-belive.webp | O pacote de 35 g do Snack Proteico sabor queijo | Pacote de 35 g do Snack Proteico sabor queijo da Belive, salgadinho sem glúten, sem leite e zero lactose com 10 g de proteína | O snack proteico de 35 g: 10 g de proteína isolada de soja, não whey. Imagem: Belive | https://belivebefree.com.br/produto/snack-proteico-sabor-queijo-salgadinho-sem-gluten-sem-leite-zero-lactose-belive-35g/ |
| 4 | Pães sem glúten | https://belivebefree.com.br/wp-content/uploads/2021/03/pao-sem-gluten-sem-lactose-sem-leite-belive-1-1.webp | O pacote de 400 g do pão de forma tradicional | Pacote de 400 g do Pão Sem Glúten Sem Lactose Sem Leite Tradicional da Belive | O pão de forma de 400 g: a loja informa 120 dias de validade. Imagem: Belive | https://belivebefree.com.br/produto/pao-sem-gluten-sem-lactose-sem-leite-tradicional-belive/ |

Nenhuma imagem em seção de passo (não há seção de passo). Todas as fotos são oficiais da marca, do campo `img` do `belive-resumo.json`.

### Matriz de claims

| Afirmação | Tipo | Fonte exata | Status |
|---|---|---|---|
| A Belive é marca brasileira de alimentos sem glúten, sem leite e sem lactose (doces sem açúcar, snacks, brownies proteicos e pães) | fato_oficial | Dossiê `01_Parceiros/Belive.md`, seção 2 (site oficial) | ok |
| A loja é da NHD Foods Indústria, Comércio, Importação e Exportação Ltda., CNPJ ativo, duas unidades em Uberaba (MG) | fato_oficial | `content/reviews/belive-e-confiavel.json`, capítulo "De quem é a Belive?" (rodapé do site e cadastro público) | ok |
| Site oficial belivebefree.com.br, "Belive" com um "e" só | fato_oficial | `couponsData.ts`, FAQ do slug `belive`; fatos `belive-0311-noite.md` | ok |
| "Zero risco de contaminação cruzada" e "fábrica 100% livre de glúten e leite/lactose" | declaração da marca (atribuída) | `belive1.json`/`belive2.json`: páginas do pão tradicional, panetone de frutas e GoodSoy queijo | ok, sempre com "a marca diz" |
| Tabela de alérgenos marca ovo, soja e castanhas em vários itens; soja nos oito snacks de 35 g; leite em nenhum snack | rótulo lido | `brownie-sem-acucar-belive.json` (ovo e soja nos oito; nozes, avelã, castanha-de-caju), `cookies-sem-acucar-belive.json` (ovo, castanhas, pode conter soja), `snack-proteico-ou-snack-de-arroz-belive.json` (soja nos oito, leite não marcado) | ok |
| GoodSoy é marca irmã do mesmo grupo, criada antes da Belive, mesma fábrica | declaração da marca | `belive1.json`, página GoodSoy Snacks Salgadinho de Queijo ("irmã mais velha", "criada em 2003", "mesma fábrica") | ok; o ano não entra no texto |
| Doces: 0 g de açúcares adicionados; 13 g a 23 g de carboidratos por unidade; maltitol e glicosídeos de esteviol; o maltitol vem antes da stévia na lista | rótulo lido | `brownie-sem-acucar-belive.json` (13 g a 22 g, oito sabores), `pao-de-mel-sem-acucar-belive.json` (16 g e 23 g) | ok |
| Brownie proteico 5 g ou 6 g de proteína vs 1,6 g a 2 g no comum; 121 kcal a 144 kcal nos oito; proteína isolada de soja, arroz e ervilha | rótulo lido | `brownie-sem-acucar-belive.json`, tabela nutricional | ok |
| Pão de mel: 6 g de proteína no proteico, 2 g no comum; 45 g | rótulo lido | `pao-de-mel-sem-acucar-belive.json` | ok |
| Brownie Proteico Double Chocolate "Sem Glúten Sem Lactose" não é sem açúcar; lista começa por açúcar | rótulo lido | `brownie-sem-acucar-belive.json`, capítulo do nome parecido | ok |
| Bolinho kids 45 g tem mais calorias e gordura saturada que o adulto de 40 g; Kit Lanche Escolar de 25 não traz kids | rótulo lido | `bolinho-kids-belive-lancheira.json` | ok |
| Cookie: pacote com 4 unidades | declaração da loja | `belive1.json`, página do Cookie de Chocolate ("4 unidades por pacote"); `cookies-sem-acucar-belive.json` | ok |
| Preços de lista dos doces, panetones, snacks e pães (tabelas) | preço volátil | `fatos/belive-resumo.json`, campo `regular`, 03/11 | ok; data só na legenda da 1ª tabela |
| Kit de 10 em lista = 10 × a unidade; combo de 4 pães em lista = 4 × o pacote; promoção no dia em toda a linha | conta nossa | `belive-resumo.json`: 6,97×10 = 69,70; 7,97×10 = 79,70; 8,49×10 = 84,90; 5,39×10 = 53,90; 8,97×10 = 89,70; 22,90×4 = 91,60; 20,90×4 = 83,60; campo `sale` < `regular` em todos os kits | ok |
| Kit Pães Completão, 11 pacotes, R$ 207,50 | preço volátil | `belive-resumo.json` | ok |
| Panetone: dois sabores, recheio de brownie, gotas 42% cacau, cobertura, frutas cristalizadas, uvas-passas, amêndoas laminadas, stévia; kits de 3; página sem tabela nutricional e sem lista de ingredientes | declaração da loja | `fatos/belive-0311-noite.md` e `belive2.json`, páginas dos panetones | ok; capítulo curto por decisão do Bruno (B7 à parte) |
| Snack proteico 35 g: 10 g de proteína isolada de soja, não whey, 135 kcal, sódio 180 mg a 310 mg; snack de arroz 35 g: 3 g, 137 kcal a 139 kcal, sódio 87 mg a 209 mg; proteico mais barato por grama de proteína | rótulo lido | `snack-proteico-ou-snack-de-arroz-belive.json` | ok |
| Salgadinho de milho 25 g: assado, 100% vegetal, 9 vitaminas e minerais | declaração da loja ("segundo a loja") | `belive2.json`, página Salgadinho de Queijo Com Vitaminas 25g | ok |
| GoodSoy 25 g: 100 kcal por pacote, bolinha de soja | declaração da loja | `belive2.json`, página GoodSoy queijo | ok |
| Chips 50 g: batata-doce e mandioca, fatias crocantes, temperos BR Spices, 5 sabores, feitos em Minas Gerais | declaração da loja | `belive2.json`, páginas dos chips | ok; a página não diz se são fritos ou assados, e o texto não diz |
| Pão de forma 400 g com 120 dias de validade; pão de batata 198 g com cerca de 9 unidades; brioche 200 g com cerca de 8; bisnaguinha 200 g com cerca de 7; multigrãos com castanha-do-pará, chia, linhaça e quinoa; "sem proteína do leite" | declaração da loja ("A loja informa:") | `belive2.json`, páginas dos pães | ok |
| Páginas dos pães sem tabela nutricional e sem lista de ingredientes | leitura das páginas | `belive1.json`/`belive2.json`: nenhuma descrição traz `<table>` nem "Ingredientes:" | ok (bastidor fica na matriz) |
| Código da Belive: 10% em todo o site, todas as formas de pagamento, conta nova e antiga, soma com promoções e com os 5% do Pix | condição comercial | Dossiê seção 1; `couponsData.ts` (`combinable`, `testNote`); `cupom-belive-como-usar.json` | ok |
| Teste do cupom: carrinho de R$ 576,82 → R$ 519,14 com o código → R$ 493,18 no Pix; campo "Código do cupom", botão "Aplicar cupom" | teste registrado | Dossiê seção 1 (prints do Bruno, 16/10) | ok; sem data no corpo |
| Frete grátis: acima de R$ 170 em SP, MG, RJ, DF e GO; R$ 250 no Sul; R$ 300 nos demais; conta o carrinho antes do código; a faixa do site só mostra o R$ 170 | condição comercial | Dossiê seção 1 (regras-de-frete); `cupom-belive-como-usar.json` (frete conta antes do cupom) | ok |
| Mercado Livre `https://meli.la/2xDjP2k`, onde o código não vale | condição comercial | Dossiê seção 1 | ok |
| Reclame Aqui: Ótima, nota 8,1 nos últimos 6 meses; responde a todas; resolve 75% a 80% | reputação (volátil) | `belive-reclame-aqui-nota-reputacao.json`, resposta rápida | ok; sem data no corpo, "últimos 6 meses" é o período do próprio perfil |
| Nutricionista decide a conta de carboidrato e "saudável" | orientação profissional | REGRAS-GLOBAIS §5; Anexo Suplementos-Alimentos | ok, uma vez no corpo + FAQ |

## Revisão (Job 3, 03/11/2026, Claude)
Rascunho do Fable 5.1 conferido contra o arquivo de fatos do dia, o dossiê, o briefing e a voz. Contagens no JSON: resposta rápida com 60 palavras e sem R$; 1 data no corpo (legenda da tabela de preço); 3 links internos; rótulos uma vez cada; `description` com 173 caracteres. Mudanças:
- Snack proteico: saiu o palpite sobre o gosto ("quem espera gosto de whey vai estranhar"); fica o rótulo, proteína isolada de soja.
- "Olha o nome parecido" virou "Atenção ao nome parecido".
- Capítulo de época curto: o panetone volta como artigo próprio (B7, decisão do Bruno de 03/11).

## Capa e imagens (Job 6, 03/11/2026)
Capa no modelo do tipo, gerada com `covers:render` (spec no scratchpad da sessão), e fotos do corpo do site oficial da marca, lidas em 03/11. Caminhos, alts e legendas estão no JSON. **Folha aprovada pelo Bruno em 03/11/2026**; as imagens novas subiram ao CDN e estão `verified` no manifesto e no mapa de entrega. Nenhuma foto do corpo repete a da capa, e nenhuma fica em seção de passo.
- Capa: `/images/reviews/belive/belive-e-boa-capa.webp`. Brownie com nozes, panetone de chocolate e pão de mel proteico e a faixa "Belive é boa?".
- Corpo (3 novas): Kit Misto 10 Brownies, Snack Proteico queijo 35 g e Pão Sem Glúten Tradicional 400 g.

## Conformação e gates (Jobs 4 e 5, 03/11/2026)
JSON `content/reviews/belive-e-boa.json`, id 786, só PT, no manifesto e no índice gerado. `validate:content`, `test:article-d2`, `typecheck`, `test-delivery-integration`, `phase5-export --check` e `candidate-proof` verdes; o `npm run build` completo roda no Gate 1. PR com squash sem deploy.

Pendente: B7 (panetone da Belive) volta à fila e pede briefing (Job 1).

## Publicação (03/11/2026)
- No ar em 03/11/2026: PR #544, release `3851aa15` (build 01a1a3e5), id 786, só PT. Smoke com as imagens no CDN e os links da loja como sponsored; sitemap, llms.txt e IndexNow; captura 41745392090 verde.
