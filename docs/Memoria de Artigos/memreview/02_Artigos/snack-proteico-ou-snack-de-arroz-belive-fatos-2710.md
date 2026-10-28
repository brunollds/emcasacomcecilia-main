# Fatos B2: snack proteico x snack de arroz Belive (27/10/2026)

Lido em 27/10/2026 (fichas, tabelas e Store API). Pasta de imagens: `img/` (WebP originais e PNG convertidos). Páginas HTML: `raw/pg-<id>.html`.

## Preço (Store API, 27/10, sem cupom)

| id | Produto | Preço regular | Promo | Estoque | Ficha |
|---|---|---|---|---|---|
| 130206 | Snack Proteico Queijo 35 g | R$ 7,97 | - | sim | belivebefree.com.br/produto/snack-proteico-sabor-queijo-salgadinho-sem-gluten-sem-leite-zero-lactose-belive-35g/ |
| 130201 | Snack Proteico Presunto 35 g | R$ 7,97 | - | sim | .../snack-proteico-sabor-presunto-... |
| 130211 | Snack Proteico Cebola e Salsa 35 g | R$ 7,97 | - | sim | .../snack-proteico-sabor-cebola-e-salsa-... |
| 130220 | Snack Proteico Barbecue 35 g | R$ 7,97 | - | sim | .../snack-proteico-sabor-barbecue-... |
| 130564 | Combo 16 un. proteicos (4 sabores) | R$ 127,52 | R$ 119,90 | sim | .../combo-snacks-proteicos-...-16-unid/ |
| 6346 | Snack de Arroz Queijo 35 g | R$ 5,19 | - | sim | .../salgadinho-de-queijo-sem-gluten-sem-leite-snack-de-arroz-belive/ |
| 6342 | Snack de Arroz Pizza 35 g | R$ 5,19 | - | sim | .../salgadinho-de-pizza-... |
| 6344 | Snack de Arroz Cebola e Salsa 35 g | R$ 5,19 | - | sim | .../salgadinho-de-cebola-e-salsa-... |
| 6345 | Snack de Arroz Churrasco 35 g | R$ 5,19 | - | sim | .../salgadinho-de-churrasco-... |
| 6389 | Combo 20 un. de arroz (4 sabores) | R$ 103,80 | R$ 95,90 | sim | .../combo-salgadinhos-sem-gluten-sem-leite-snacks-de-arroz-belive/ |

Cálculos (do briefing, a conferir):
- Unitário proteico: R$ 7,97 / 35 g = R$ 0,228 por g. Arroz: R$ 5,19 / 35 g = R$ 0,148 por g.
- Combo proteico: R$ 119,90 / 16 = R$ 7,49 por un. (R$ 0,214 por g; 6% abaixo do unitário). Combo arroz: R$ 95,90 / 20 = R$ 4,80 por un. (R$ 0,137 por g; 7,6% abaixo).
- Cupom MAUAD 10% sobre o unitário (dossiê: soma com promoção e Pix): proteico R$ 7,17; arroz R$ 4,67. Com Pix 5% em cima (dossiê, print de 16/10): proteico R$ 6,81; arroz R$ 4,44. Confirmar no checkout antes de publicar.

## Rótulo: informação nutricional (tabela em imagem, porção 35 g = 1 pacote)

Fontes das imagens:
- Proteicos (2026/05): `wp-content/uploads/2026/05/tabela-nutricional-snack-protein-sabor-<sabor>-sem-gluten-belive.webp`, lidos em `img/tabela-nutricional-snack-protein-sabor-<sabor>-sem-gluten-belive.png` (queijo, presunto, cebola-e-salsa, barbecue). Tabela do combo 130564 aponta para as mesmas quatro.
- Arroz (2020/04): `wp-content/uploads/2020/04/tabela-nutricional-salgadinho-de-<sabor>-saudaveis-sem-gluten-belive.webp` (queijo, pizza, cebola, churrasco). Lidos em `img/...png`. Arquivos de 2020: confirmar se é a embalagem atual.
- Alergênicos (todos, 2026/07): `wp-content/uploads/2026/07/Tabela-de-Alergenicos-JUL2026-1-scaled.jpg` (`img/Tabela-de-Alergenicos-JUL2026-1-scaled.jpg`).

| Produto (35 g) | kcal | Carboidratos | Açúcares totais | Ac. adicionados | Proteínas | Gorduras totais | Gord. sat. | Fibras | Sódio (mg) | %VD sódio |
|---|---|---|---|---|---|---|---|---|---|---|
| Proteico Queijo | 135 | 18 g | 0,1 g | 0,1 g | 10 g | 2,6 g | 1 g | 0,2 g | 303 | 15 |
| Proteico Presunto | 135 | 18 g | 0,1 g | 0 g | 10 g | 2,6 g | 1 g | 0,2 g | 310 | 16 |
| Proteico Cebola e Salsa | 135 | 18 g | 0,1 g | 0 g | 10 g | 2,6 g | 1 g | 0,3 g | 180 | 9 |
| Proteico Barbecue | 134 | 18 g | 0,8 g | 0,6 g | 10 g | 2,5 g | 1 g | 0,3 g | 268 | 13 |
| Arroz Queijo | 138 | 26 g | 0 g | 0 g | 3 g | 2,6 g | 1 g | 0,5 g | 209 | 10 |
| Arroz Pizza | 137 | 26 g | 0 g | 0 g | 2,9 g | 2,6 g | 1 g | 0,5 g | 177 | 9 |
| Arroz Cebola e Salsa | 139 | 26 g | 0 g | 0 g | 3 g | 2,6 g | 1 g | 0,6 g | 87 | 4 |
| Arroz Churrasco | 137 | 26 g | 0 g | 0 g | 2,9 g | 2,5 g | 1 g | 0,6 g | 209 | 10 |

Por 100 g (queijo, mesma ordem): proteico 387 kcal, 51 g carbo, 29 g proteína, 865 mg sódio; arroz queijo 397 kcal, 74 g carbo, 8,6 g proteína, 598 mg sódio.

Achados que mudam a leitura:
- Proteína: 10 g por pacote nos proteicos (2,9 a 3 g nos de arroz). Proteína por R$: R$ 0,80 por g nos proteicos; R$ 1,73 a R$ 1,79 por g nos de arroz (cerca de 2,2 vezes).
- Kcal por pacote quase iguais (134 a 139). O que muda é a proteína, não a energia.
- Açúcar: os de arroz dizem 0 g totais. O proteico Barbecue tem 0,6 g de açúcar adicionado por pacote. Os outros proteicos têm 0,1 g de açúcares totais. Nenhum deles é tema de "sem açúcar" nesta pauta.
- Sódio é o ponto contra os proteicos: 180 a 310 mg por pacote (9 a 16 %VD), e o de arroz cebola e salsa tem 87 mg. Por 100 g o proteico tem de 514 a 886 mg, o de arroz de 247 a 599 mg.
- Fibra: 0,2 a 0,3 g nos proteicos; 0,5 a 0,6 g no arroz.

## Ingredientes (lista em texto na aba `tab-ingredientes_tab`, não em imagem)

- Proteico queijo: mix sem glúten (farinha de milho não transgênico, proteína isolada de soja e farinha de arroz), óleo vegetal (palma e soja), extrato de levedura e aromatizante. Alérgicos: contém derivados de soja. Não contém glúten.
- Proteico presunto: mesma base; "aromatizante" sem especificação. Óleo vegetal (palma e soja).
- Proteico cebola e salsa: base igual, mais sal light, cebola tostada em pó, salsa triturada.
- Proteico barbecue: base igual com "aroma natural sabor barbecue" no lugar de aromatizante.
- Arroz queijo: mix sem glúten (farinha de arroz, lentilha e quinoa), óleo vegetal (palma e soja), sal light, extrato de levedura, aromatizante e corante natural urucum. Não contém glúten. Contém derivados de soja.
- Arroz pizza e churrasco: mesma base (sem sal light no churrasco); arroz cebola e salsa: base + cebola tostada e salsa.

Proteína do proteico: isolada de soja, não whey (a loja diz "não é feito com whey").

## Alergênicos (tabela da loja, 2026/07)

- Proteicos (Presunto, Queijo, Cebola & Salsa, Barbecue): soja/derivados = contém. Glúten, leite/lactose, ovo, amendoim, castanha-de-caju e outras castanhas em branco (não marcados).
- Arroz (Churrasco, Queijo, Pizza, Cebola & Salsa): soja/derivados = contém. Demais colunas em branco.
- Nenhuma linha de snack aparece com "pode conter" (ponto azul).

## Textos da loja (fichas, sem uso no artigo como fato sem verificar)

- Proteicos: "Sem glúten, sem leite e zero lactose", "Salgadinho assado", "Sem corantes ou aromas artificiais", "100% vegetal (salgadinho vegano)" (só no queijo e no cebola e salsa; presunto e barbecue não trazem essa frase na ficha), "Só 134/135 calorias por pacote". Também: "Encaixa na dieta, sem culpa!", "Para ficar melhor", "snack protein dos corredores", "lanche saudável", "deixar seu pré ou pós-treino". Não usar: são alegação de saúde ou desempenho.
- Arroz: "Sem glúten e sem leite/lactose (zero risco de contaminação cruzada)", "Assado e 100% vegetal", "salgadinho saudável"/"salgadinho fit" (não usar).
- Combo de arroz 6389: "várias opções 100% vegetais (salgadinhos veganos – exceto sabor churrasco)". Conflito: o churrasco aparece como não vegano na ficha do combo, mas a lista de ingredientes do churrasco (6345) não tem ingrediente de origem animal declarado; só "aromatizante" e "corante natural urucum". Confirmar na embalagem.

## Linhas da loja fora do escopo (uma frase no briefing, só se o autocompletar pedir "belive salgadinho" em geral; ele pede)

- Com Vitaminas 25 g (Presunto, Queijo, Requeijão, Queijo Nacho, kits de 25 e 30 un.): R$ 3,97 por un.; kit lanche escolar 30 un. R$ 109,90 promo (47127).
- GoodSoy 25 g (8 sabores; combo 20 un. R$ 74,90 promo, 17504): R$ 3,97 por un.
- Chips de batata-doce 50 g (R$ 7,97) e de mandioca 50 g (R$ 7,97): fora do tema.

## Autocompletar (rodada, `autocomplete-2710.txt`)

- Google "belive salgadinho": "belive salgadinho proteico", "belive salgadinho queijo", "belive salgadinho presunto", "belive salgadinho cebola e salsa", "belive salgadinho tabela nutricional", "belive salgadinho churrasco", "belive salgadinho requeijao", "belive salgadinho pizza", "belive salgadinho cebola".
- Google "belive snacks": "snacks belive churrasco", "snacks belive cebola e salsa", "snacks belive queijo".
- Google "belive proteico": "belive snack proteico", "belive salgadinho proteico", "belive proteico".
- Google "belive é bom": "salgadinho belive é bom".
- Google "belive chips": "chips belive presunto", "chips belive tabela nutricional", "chips belive churrasco" (fora do tema).
- Bing "belive salgadinho": "believe salgadinhos" (ruído). Bing "belive proteico": "belive brownie proteico" (ruído).
- Google "snack proteico qual o melhor": "qual o melhor snack proteico" (Bing: sem par de marca).

## Concorrentes

Nenhum. Sem comparação com marca de snack proteico nesta pauta.
