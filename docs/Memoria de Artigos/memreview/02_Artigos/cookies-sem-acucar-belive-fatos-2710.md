# Fatos: cookies Belive (B1), lidos em 27-28/10/2026

Fontes: Store API `belivebefree.com.br/wp-json/wc/store/v1/products/<id>` (raw/store-*.json), página `?p=<id>` (raw/page-*.html, com as abas de texto de ingredientes e as imagens das tabelas), tabelas em imagem baixadas para img/ e lidas no PNG. Sem bloqueio (HTTP 200 em todas as requisições, 4,5 s entre elas).

## Preço (Store API, 27-28/10/2026, sem cupom)

Os 4 "Sem Açúcar" e os 3 "Sem Lactose" têm `price` = `regular_price`; `on_sale` = false. O campo `sale_price` (764) aparece nos cookies de R$ 8,97 e de R$ 8,49, mas `on_sale` é false e o catálogo não tem promo: não usar.

| ID | Produto | Pacote | Preço | Preço por 100 g | Kit 10 (reg / promo) | Por pacote no kit promo |
|---|---|---|---|---|---|---|
| 12173 | Cookie de Chocolate Sem Glúten Sem Açúcar Sem Leite | 79 g (declarado) | R$ 8,97 | R$ 11,35 | R$ 89,70 / R$ 83,42 (id 12182) | R$ 8,34 (R$ 10,56/100 g) |
| 12176 | Cookie Baunilha e Chocolate Sem Glúten Sem Açúcar | 79 g | R$ 8,97 | R$ 11,35 | R$ 89,70 / R$ 83,42 (id 12185) | R$ 8,34 (R$ 10,56/100 g) |
| 90611 | Cookie de Chocolate & Avelã Sem Glúten Sem Açúcar | 79 g | R$ 8,97 | R$ 11,35 | R$ 89,70 / R$ 83,42 (id 90621) | R$ 8,34 (R$ 10,56/100 g) |
| 126579 | Cookie Sem Glúten Sem Açúcar Castanhas e Chocolate | 67 g | R$ 8,97 | R$ 13,39 | R$ 89,70 / R$ 83,42 (id 130099) | R$ 8,34 (R$ 12,45/100 g) |
| 8833 | Cookie de Chocolate Sem Glúten Sem Lactose (sem "açúcar" no nome) | 95 g | R$ 8,49 | R$ 8,94 | R$ 84,90 / R$ 78,96 (id 8849) | R$ 7,90 (R$ 8,32/100 g) |
| 8829 | Cookie Sem Glúten Sem Lactose Baunilha e Chocolate | 95 g | R$ 8,49 | R$ 8,94 | R$ 84,90 / R$ 78,96 (id 8852) | R$ 7,90 (R$ 8,32/100 g) |
| 8837 | Cookie Sem Glúten Sem Lactose Castanhas | 95 g | R$ 8,49 | R$ 8,94 | R$ 84,90 / R$ 78,96 (id 8846) | R$ 7,90 (R$ 8,32/100 g) |

Pontos de atenção:
- Kit de 10: o preço é 10 x R$ 8,97, mas a página do kit não diz quantos pacotes vêm. Hipótese: 10 pacotes de 4 cookies. Confirmar antes de publicar "por cookie".
- Peso x unidades não fecha. A ficha diz "vem 4 unidades por pacote" e "Peso 79 g", mas a tabela diz "Porção 30 g (1 4/5 unidades)" para os cookies de 79 g: 30 g dariam 1,8 unidade de 16,7 g, e 4 unidades de 16,7 g dariam 67 g. O Castanhas (67 g) bate com a tabela; os de 79 g não. Os Sem Lactose (95 g, "4 cookies") também divergem da tabela ("1 1/2 unidades" por 30 g). Por isso o artigo compara por 100 g, não por cookie.
- Cupom MAUAD 10% (dossiê): soma com promoção e com os 5% do Pix. Ao preço "de pacote" deste arquivo, sem cupom.

## Tabela nutricional (imagem; porção 30 g; ler com a porção, não com 100 g)

| Dado (por 30 g) | 12173 Chocolate | 12176 Baunilha e Chocolate | 90611 Chocolate e Avelã | 126579 Castanhas e Chocolate |
|---|---|---|---|---|
| Porções por embalagem | cerca de 2 | cerca de 2 | cerca de 2 | cerca de 2 |
| Valor energético (kcal) | 108 | 112 | 113 | 122 |
| kcal por 100 g | 360 | 373 | 377 | 399 |
| Carboidratos (g) | 16 | 16 | 17 | 16 |
| Açúcares totais (g) | 0 | 0 | 0 | 0 |
| Açúcares adicionados (g) | 0 | 0 | 0 | 0 |
| Proteínas (g) | 1,4 | 1,4 | 1,4 | 1,9 |
| Gorduras totais (g) | 5,8 | 5,9 | 6,0 | 6,7 |
| Gorduras saturadas (g) | 3,8 | 3,7 | 3,8 | 3,3 |
| Fibras (g) | 1,1 | 1,0 | 1,3 | 1,6 |
| Sódio (mg) | 49 | 69 | 52 | 49 |
| Pacote: kcal (por 100 g x peso) | 284 | 295 | 298 | 267 |
| Pacote: proteína (g) | 3,6 | 3,6 | 3,6 | 4,2 |

Nomes na tabela: "COOKIE DE CHOCOLATE ZERO", "COOKIE BAUNILHA & CHOCOLATE ZERO", "COOKIE CHOCOLATE & AVELÃ ZERO", "COOKIE CASTANHAS & CHOCOLATE ZERO".

Os dados de 90611 batem com o artigo já no ar `doces-sem-acucar-para-diabeticos` (113 kcal, 17 g de carboidratos, 0 g de açúcares por 30 g; imagem `/images/reviews/belive/belive-tabela-nutricional-cookie-chocolate-avela.webp`). Reusar essa imagem se o Bruno quiser o rótulo no artigo novo.

Polióis e adoçante: a tabela não declara polióis. Pela lista de ingredientes, os 4 têm maltitol e glicosídeos de esteviol (edulcorantes). O maltitol é poliol: entra nos carboidratos, mas não nos açúcares. O artigo deve dizer isso sem chamar o produto de baixo carboidrato. 12173 e 12176 têm fibra solúvel (polidextrose), que já entra na fibra da tabela.

Diferença de texto de rótulo: a lista do 12173 diz "gotas sabor chocolate amargo (sem açúcar)" e a do 12176 diz o mesmo; a do 90611 diz "gotas sabor chocolate (zero açúcar)"; a do 126579 diz só "gotas sabor chocolate amargo", sem a ressalva. A tabela do 126579 mostra 0 g de açúcar, então o dado da tabela sustenta o "sem açúcar"; mas a frase de ingredientes não. Conferir a embalagem física antes de citar as gotas.

## Versões "Sem Lactose" (8829, 8833, 8837): têm açúcar

Ingredientes (texto da aba): 8833 "açúcar mascavo" e "açúcar cristal"; 8829 "açúcar cristal", "açúcar mascavo"; 8837 "açúcar cristal" e "açúcar mascavo". A tabela, por 30 g:

| Dado (por 30 g) | 8833 Chocolate | 8829 Baunilha e Chocolate | 8837 Castanhas |
|---|---|---|---|
| kcal | 131 | 136 | 130 |
| Carboidratos (g) | 17 | 17 | 16 |
| Açúcares totais (g) | 8,5 | 7,2 | 6,5 |
| Açúcares adicionados (g) (%VD) | 8,5 (17%) | 7,2 (14%) | 6,5 (13%) |
| Proteínas (g) | 1,4 | 1,4 | 1,8 |
| Fibras (g) | 0,7 | 0,6 | 0,9 |
| Sódio (mg) | 56 | 81 | 84 |

Por 100 g: 437, 453 e 433 kcal; açúcar adicionado 28, 24 e 22 g. Os três são "COOKIE ... " sem "ZERO" na tabela.

Decisão para o briefing: a versão sem lactose TEM açúcar adicionado, 6,5 a 8,5 g por 30 g. Entram numa frase de atenção ("a versão sem lactose tem açúcar: 6,5 a 8,5 g de açúcar adicionado por 30 g"), não numa linha da tabela de comparação. Razão: o consumidor que busca "belive cookies sem açúcar" pode cair no cookie de R$ 8,49 de nome "Sem Lactose", e o dado é exatamente o que separa as duas linhas. Fora da tabela porque a pergunta do artigo é sobre os quatro sem açúcar.

## Alergênicos

Tabela de alergênicos do site (JUL/2026, arquivo compartilhado por toda a linha, img/alergenicos-jul2026.jpg). Glúten e leite/lactose: nenhuma marcação em nenhum cookie. Linhas dos cookies:

| Produto | Ovo | Soja | Castanha-de-caju | Outras castanhas | Ingredientes (lista) |
|---|---|---|---|---|---|
| 12173 (Cookie Double Chocolate Zero) | contém | pode conter | não | contém | "CONTÉM AMÊNDOAS E OVO" |
| 12176 (Cookie Baunilha & Chocolate Zero) | contém | pode conter | não | contém | "CONTÉM AMÊNDOAS E OVO" |
| 90611 (Cookie Avelã & Chocolate Zero) | contém | pode conter | contém | contém | "CONTÉM AVELÃ, CASTANHA-DE-CAJU, OVO" |
| 126579 (Cookie Castanhas & Chocolate Zero) | contém | pode conter | contém | contém | "CONTÉM AMÊNDOAS, CASTANHA-DE-CAJU, CASTANHA-DO-PARÁ E OVO" |

A coluna "outras castanhas" cobre amêndoa, avelã e castanha-do-pará; a lista de ingredientes é que diz qual. Amendoim: nenhuma marcação (coluna AMENDOIM sem marca nos cookies). Os Sem Lactose têm a mesma marcação de ovo, soja e castanhas (8837 com castanha-de-caju), e não são o foco.

## Lista de sinais (rodada, autocompletar)

G: "belive cookies", "belive cookies sem acucar", "cookie belive sem açúcar", "belive cookies ingredientes", "belive cookies tabela nutricional", "belive cookies calorias", "belive cookies zero", "belive cookies baunilha e chocolate", "belive cookies double chocolate", "cookies belive sem gluten". B: "cookie sem açúcar".

## Canibalização

- Nenhum artigo publicado tem cookie Belive como tema. Os 8 artigos Belive (affiliate belive) não citam cookie, exceto `doces-sem-acucar-para-diabeticos`, que usa o cookie de chocolate e avelã em tabela e em um parágrafo de "umectante". Esse artigo trata de diabetes: o B1 não pode repetir o enquadramento. Linkar para ele.
