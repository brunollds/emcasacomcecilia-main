# Fatos: bolinho kids Belive para a lancheira (coleta de 27/10/2026)

Fontes: Store API `https://belivebefree.com.br/wp-json/wc/store/v1/products/<id>` (raw em `raw/api-<id>.json`); fichas `https://belivebefree.com.br/?p=<id>` (raw em `raw/page-<id>.html`); tabelas nutricionais em imagem (lidas em `img/*.png`). Pausa de 4 s entre requisições; nenhum 403, 429 ou Cloudflare.

## 1. Produtos e preços

Preço "cartão" = preço exibido na ficha; Pix = 5% sobre o cartão (conferido: 6,97 x 0,95 = 6,62).

| id | Produto (nome na ficha) | Peso | Cartão (ficha) | Pix (ficha) | API `regular` / `sale` | Categorias (API) |
|---|---|---|---|---|---|---|
| 130225 | Bolinho para Criança sabor Brigadeiro com Cobertura, 45 g | 45 g | R$ 6,97 | R$ 6,62 | 6,97 / **5,92** | Bolos e Bolinhos, Doces Sem Açúcar, NOVIDADES, Pra Lancheira |
| 130229 | Bolinho para Criança sabor Morango com Cobertura, 45 g | 45 g | R$ 6,97 | R$ 6,62 | 6,97 / **5,92** | idem |
| 130239 | Kit 10 Bolinhos para Criança Brigadeiro, 45 g | 450 g | R$ 64,82 (de R$ 69,70, -7%) | R$ 61,58 | 69,70 / 64,82 | + LEVE 10 PAGUE 9, Lançamentos |
| 130235 | Kit 10 Bolinhos para Criança Morango, 45 g | 450 g | R$ 64,82 (de R$ 69,70) | R$ 61,58 | 69,70 / 64,82 | idem |
| 48775 | Kit Lanche Escolar Bolinho Sem Açúcar Sem Glúten Sem Leite, 25 unid. | 1000 g | R$ 124,90 (de R$ 134,75) | R$ 118,66 | 134,75 / 124,90 | + COMBOS, OFERTAS, Lancheira - Home |
| 6372 | Bolinho de Chocolate Sem Açúcar Sem Glúten Sem Leite (fit, adulto) | ficha 47 g; rótulo 40 g | R$ 5,39 | R$ 5,12 | 5,39 / **4,58** | + MAIS VENDIDOS, Oferta Relâmpago |
| 96186 | Bolinho de Chocolate com Cobertura Special (adulto) | 45 g | R$ 6,97 | R$ 6,62 | 6,97 / **5,92** | + MAIS VENDIDOS, Oferta Relâmpago |
| 147643 | Brinde Especial: Lancheirinha Infantil | 20 g | ficha: R$ 0,01 (API `price` 1) | n/d | 1 / 1 | sem descrição |

Conflito de preço (API x ficha): a Store API traz `sale_price` abaixo do preço mostrado na ficha em 130225, 130229, 6372 e 96186. A ficha, que é o que o leitor vê, mostra o cartão cheio (6,97 / 5,39) e o Pix. Na ficha 6372 e 96186 há a categoria "Oferta Relâmpago" na API, mas o selo visível é "APROVEITE AGORA 15% OFF" com contagem zerada ("00 dias 00 horas"). Não dá para afirmar que o preço de 5,92 ou 4,58 esteja ativo. Mesmo conflito estava em 17/10 no bolinho adulto (4,58 na ficha e 5,39 na API), e já foi tratado no artigo `bolinho-sem-acucar-belive-ou-suavipan` como oferta relâmpago com data.

Banners sitewide sem produto identificado, não usar: "LANCHE ESCOLAR A PARTIR DE 3,39 NO PIX", "LANCHEIRA A PARTIR DE 3,39", "BLACK NOVEMBER - PANETONES COM 5% ... +5% DE DESCONTO EXTRA NO PIX".

## 2. Preço por unidade e por grama (conta nossa, sobre o preço da ficha)

| Item | Peso | Cartão: por unidade | Cartão: por 100 g | Pix: por unidade | Pix: por 100 g |
|---|---|---|---|---|---|
| Kids brigadeiro ou morango, unidade | 45 g | R$ 6,97 | R$ 15,49 | R$ 6,62 | R$ 14,71 |
| Kids, kit 10 | 450 g | R$ 6,48 | R$ 14,40 | R$ 6,16 | R$ 13,68 |
| Adulto fit chocolate, unidade (rótulo 40 g) | 40 g | R$ 5,39 | R$ 13,48 | R$ 5,12 | R$ 12,80 |
| Adulto fit chocolate, se 47 g (ficha) | 47 g | R$ 5,39 | R$ 11,47 | R$ 5,12 | R$ 10,89 |
| Adulto Special chocolate, unidade | 45 g | R$ 6,97 | R$ 15,49 | R$ 6,62 | R$ 14,71 |
| Kit 25 "lanche escolar" (só adulto 40 g) | 1000 g | R$ 4,99 por unidade | R$ 12,49 | R$ 4,75 por unidade | R$ 11,87 |

Leituras: kids unidade custa 29% a mais que o adulto fit de chocolate (6,97 contra 5,39). Por grama, +15% contra o adulto de 40 g (+35% se o peso de 47 g da ficha estiver certo). Kids unidade e Special de 45 g têm o mesmo preço. O kit de 25 sai 24% mais barato por grama que a unidade kids.

## 3. Rótulos (tabela nutricional em imagem, porção transcrita literal)

### 3a. Bolinho Kids Brigadeiro (130225). Imagem `https://belivebefree.com.br/wp-content/uploads/2026/05/tabela-nutricional-bolinho-para-criancas-sabor-brigadeiro-sem-acucar-sem-gluten-sem-leite-belive.webp`, lida em `img/nut-130225-brigadeiro.png`
Porção: 45 g (1 unidade)

| Nutriente | 100 g | 45 g | %VD |
|---|---|---|---|
| Valor energético (kcal) | 350 | 157 | 8 |
| Carboidratos (g) | 45 | 20 | 7 |
| Açúcares totais (g) | 1,2 | 0,5 | - |
| Açúcares adicionados (g) | 0 | 0 | 0 |
| Proteínas (g) | 5,3 | 2,4 | 5 |
| Gorduras totais (g) | 21 | 9,7 | 15 |
| Gordura saturada (g) | 12 | 5,6 | 28 |
| Gordura trans (g) | 0 | 0 | 0 |
| Fibras alimentares (g) | 8,2 | 3,7 | 15 |
| Sódio (mg) | 144 | 65 | 3 |

Rodapé do rótulo: só a linha "*Percentual de valores diários fornecidos pela porção". Nenhum aviso sobre edulcorante, polióis ou público-alvo na imagem.

### 3b. Bolinho Kids, rótulo chamado "BOLINHO KIDS BAUNILHA COM MORANGO" (imagem da ficha 130229). Imagem `https://belivebefree.com.br/wp-content/uploads/2026/05/tabela-nutricional-bolinho-para-criancas-sabor-morango-sem-acucar-sem-gluten-sem-leite-belive.webp`, lida em `img/nut-130229-morango.png`
Porção: 45 g (1 unidade). **Nome do rótulo diverge do produto.** A ficha 130229 se chama "Morango com Cobertura"; o rótulo diz "Baunilha com Morango"; a tabela de alergênicos chama o item de "Bolinho KIDS Baunilha c/ Morango". Não usar esta coluna como "morango" antes de confirmar.

| Nutriente | 100 g | 45 g | %VD |
|---|---|---|---|
| Valor energético (kcal) | 359 | 161 | 8 |
| Carboidratos (g) | 48 | 22 | 7 |
| Açúcares totais (g) | 0 | 0 | - |
| Açúcares adicionados (g) | 0 | 0 | 0 |
| Proteínas (g) | 4,3 | 1,9 | 4 |
| Gorduras totais (g) | 21 | 9,4 | 14 |
| Gordura saturada (g) | 13 | 5,6 | 28 |
| Gordura trans (g) | 0 | 0 | 0 |
| Fibras alimentares (g) | 6,6 | 2,9 | 12 |
| Sódio (mg) | 126 | 56 | 3 |

### 3c. Bolinho de Chocolate fit, adulto (6372). Imagem `https://belivebefree.com.br/wp-content/uploads/2020/04/tabela-nutricional-bolinho-de-chocolate-sem-gluten-sem-acucar-belive.webp`, lida em `img/nut-6372-chocolate-fit.png`
Porção: 40 g (1 unidade). A ficha diz "Peso 47 g"; o rótulo diz 40 g. Conferir qual é a unidade vendida.

| Nutriente | 100 g | 40 g | %VD |
|---|---|---|---|
| Valor energético (kcal) | 307 | 123 | 6 |
| Carboidratos (g) | 40 | 16 | 5 |
| Açúcares totais (g) | 0 | 0 | - |
| Açúcares adicionados (g) | 0 | 0 | 0 |
| Proteínas (g) | 5,5 | 2,2 | 4 |
| Gorduras totais (g) | 18 | 7,1 | 11 |
| Gordura saturada (g) | 7,5 | 3 | 15 |
| Gordura trans (g) | 0 | 0 | 0 |
| Fibras alimentares (g) | 4,9 | 2 | 8 |
| Sódio (mg) | 175 | 70 | 4 |

### 3d. Bolinho Special de Chocolate, adulto (96186). Imagem `https://belivebefree.com.br/wp-content/uploads/2025/06/tabela-nutricional-bolinho-de-chocolate-com-cobertura-sem-gluten-sem-acucar-sem-leite-belive-1.webp`, lida em `img/nut-96186-special-chocolate.png`
Porção: 45 g (1 unidade). 100 g: 353 kcal; 45 g: 159 kcal, carboidratos 20 g, açúcares totais 0, adicionados 0, proteínas 2,4 g, gorduras 9,4 g (saturadas 5,3 g, 27% VD), fibras 3,6 g (14% VD), sódio 67 mg (3%).

### 3e. Kit 25 unidades (48775): sem tabela na ficha. A descrição lista os sabores: 10 Chocolate, 5 Laranja com Gotas de Chocolate, 5 Baunilha com Gotas de Chocolate, 3 Coco com Gotas de Chocolate, 2 Banana com Canela e Chia, todos "40g" e "Sem Glúten Sem Açúcar Sem Leite Belive". O "Peso 1000 g" confirma 25 x 40 g. Não há tabela de Laranja, Baunilha, Coco nem Banana; a única tabela de 40 g é a do chocolate (3c). A frase "Só 120 calorias por pacotinho (em média)" não está na tabela de nenhum item; a tabela do chocolate dá 123 kcal por 40 g, e não existe dado para os outros sabores. Não usar.

## 4. Ingredientes e alergênicos (texto da aba, transcrição)

Kids Brigadeiro (130225): "Cobertura sabor chocolate, mix sem glúten (farinha de arroz, amido modificado, farinha integral de soja não transgênica, farinha de quinoa, fécula de mandioca), óleo vegetal (soja e palma), fibra solúvel polidextrose, ovo em pó, granulado sabor chocolate, cacau em pó, edulcorantes maltitol e glicosídeos de esteviol, umectantes sorbitol e glicerol, emulsificantes mono e diglicerídeos de ácidos graxos e goma xantana, fermento químico pirofosfato ácido de sódio e bicarbonato de sódio, aromatizantes, conservantes propionato de cálcio e sorbato de potássio, acidulante ácido cítrico. ALÉRGICOS: CONTÉM OVO E DERIVADOS DE SOJA. NÃO CONTÉM GLÚTEN."

Kids Morango (130229): mesma base, com "granulado sabor morango, leite de coco, morango em pó" no lugar do cacau; mesma linha de alergênicos (ovo e soja; sem glúten).

Adulto fit chocolate (6372): "... cacau em pó, edulcorantes maltitol e glicosídeos de esteviol, umectantes sorbitol e glicerol ... NÃO CONTÉM GLÚTEN. ALÉRGICOS: CONTÉM DERIVADOS DE SOJA E OVO." Sem "leite" na lista e sem menção a leite no alergênico.

Tabela de alergênicos geral (`https://belivebefree.com.br/wp-content/uploads/2026/07/Tabela-de-Alergenicos-JUL2026-1-scaled.jpg`, lida em `img/alerg-generica-jul2026.jpg`; é a mesma imagem em todas as fichas): linha "Bolinho KIDS Brigadeiro": Ovo ✓, Soja/derivados ✓; Glúten, Leite/Lactose, Amendoim, Castanha-de-caju e Outras castanhas em branco. Linha "Bolinho KIDS Baunilha c/ Morango": Ovo ✓, Soja ✓, demais em branco. Linha "Bolinho SPECIAL Chocolate c/ Cobertura" e "Bolinho Double Chocolate Zero": ovo e soja. Nenhuma linha dos kids marcada com leite.

Edulcorantes: "maltitol e glicosídeos de esteviol" (edulcorantes) e "sorbitol e glicerol" (umectantes), nos três bolinhos lidos (kids brigadeiro, kids morango, adulto). A ficha diz "adoçado naturalmente com stévia"; a lista traz também maltitol e sorbitol.

## 5. Textos da ficha (o que a loja diz; citar só com atribuição, nunca como fato nosso)

- Kids (130225): "Sem açúcar, adoçado naturalmente com stévia"; "Sem corantes ou aromas artificiais"; "Fonte de fibras"; "zero lactose e sem proteína do leite (zero risco de contaminação cruzada)".
- Kids: a descrição usa "100% seguros", "bons ingredientes", "porção ideal para as crianças", "lancheira saudável", "Segundo a ABESO e a SBEM..." e "1 fruta + 1 bolinho Belive + 1 proteína + 1 suco". Nada disso entra no artigo.
- Kids: a ficha não traz idade, porção recomendada em gramas nem aviso de consumo excessivo. Nenhum "pode dar à vontade" foi encontrado.
- Ficha 6372: "Lancheira saudável e gostosa!" e "Com frutinhas e confeitos ele fica ainda mais divertido para o lanche escolar". Não usar.

## 6. Avisos sobre polióis e laxante

Busca em todas as fichas lidas (130225, 130229, 130239, 130235, 48775, 6372, 96186) e nas três tabelas lidas: nenhum texto com "laxativo", "efeito", "consumo excessivo" ou aviso de edulcorante. O rótulo (imagem) não traz aviso. Não existe frase literal para transcrever. A embalagem física não foi vista (sem acesso). Não escrever aviso próprio sobre efeito laxativo sem o Bruno decidir.

## 7. Brinde Lancheirinha Infantil (147643)

Ficha: título "Brinde Especial: Lancheirinha Infantil", API `price` 1 (R$ 0,01), sem descrição, sem categoria, imagem `https://belivebefree.com.br/wp-content/uploads/2026/10/lancheira-infantil-termica-webp.webp`. Nenhuma regra de brinde (valor mínimo, produto que dá direito, prazo) aparece na ficha nem no HTML lido. Não citar. Se a regra estiver no carrinho ou no regulamento do site, precisa ser lida pelo navegador.

## 8. Fotos (Job 6, a escolher)

Produto kids brigadeiro (130225): `https://belivebefree.com.br/wp-content/uploads/2026/05/bolinho-para-crianca-brigadeiro-sem-gluten-sem-acucar-sem-leite-belive-1.webp` até `-4.webp`. Caixa 10 brigadeiro: `.../2026/05/caixa-10-bolinhos-para-crianca-brigadeiro-sem-gluten-sem-acucar-sem-leite-belive-1.webp`. Morango: `.../2026/05/bolinho-para-crianca-morango-sem-gluten-sem-acucar-sem-leite-belive-1.webp` até `-5.webp` (ver conflito de nome, 3b). Rótulos: tabela brigadeiro (3a) e tabela de alergênicos geral (lida).

## 9. Cupom e condições (dossiê `01_Parceiros/Belive.md`, conferido em 16/10; sem nova verificação)

MAUAD 10% em todas as formas de pagamento, soma com promoções e com o Pix 5% (regra do Bruno, 16/10). Cupom não vale no Mercado Livre. Sem cupom de primeira compra. Frete: o dossiê dá R$ 170 (SP, MG, RJ, DF, GO), R$ 250 (Sul), R$ 300 (demais); a ficha mostra "FRETE GRÁTIS A PARTIR DE R$170" e, em 130229, "HOJE TEM FRETE GRÁTIS ACIMA DE R$150". Citar só o dossiê, com os três valores.

## 10. Datas

Ficha e API coletadas em 27/10/2026. Preço "27/10/2026". Revisar até 16/11/2026 (janela do dossiê).
