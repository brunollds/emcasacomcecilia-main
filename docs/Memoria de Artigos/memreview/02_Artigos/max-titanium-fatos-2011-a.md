# Fatos: hipercalórico e termogênicos da Max Titanium (20/11/2026)

Leitura: 20/11/2026, entre 17:21 e 17:23 (horário de Brasília), pela API pública VTEX da loja (`https://www.maxtitanium.com.br/api/catalog_system/pub/products/search/`), com `ft=` hipercalorico, termogenico, hot (2hot), cafeina, shot, fire, termo e termogenicos (categoria). Uma requisição por vez, pelo menos 2 a 4 s entre elas. Tabelas nutricionais baixadas das imagens `vteximg` da própria loja e lidas com o Read. Sem navegador, sem carrinho, sem login, sem CAPTCHA. Nenhum bloqueio (HTTP 200 em todas, exceto buscas com espaço, que devolvem 400 e foram refeitas com uma palavra só).

Imagens lidas: `C:\Users\Bruno\AppData\Local\Temp\claude\16086a64814165a5\6634a9e5-022d-45d2-a71f-4c96d8475267\scratchpad\max-2011\img\`. Brutos (JSON da busca): `...\scratchpad\max-2011\raw\`.

Campos "Estoque" da VTEX: `0` = esgotado; `99999` = sem controle de estoque (não é quantidade real, não citar número). Preço = `Price` do vendedor (preço de venda no cartão, sem frete). Pix: a meta de todas as páginas diz "5% Off no Pix"; a API não traz preço de Pix. Não confirmado (ver seção 7).

---

## 1. Hipercalóricos (MX1)

### 1.1 Produtos à venda

| Produto | URL (`/<linkText>/p`) | Sabor (SKU) | Preço | Preço de tabela | Disponível em 20/11 |
|---|---|---|---|---|---|
| Mass Titanium 17500 Refil 3 kg | `masstitanium3kg` (id 36) | Baunilha (1486) | R$ 118,89 | R$ 149,90 | sim |
| idem | idem | Chocolate (1487) | R$ 118,89 | R$ 149,90 | sim |
| idem | idem | Morango (1489) | R$ 118,89 | R$ 149,90 | sim |
| idem | idem | Leite Condensado (1488) | R$ 118,89 | R$ 149,90 | sim |
| idem | idem | Vitamina de Frutas (1490) | R$ 118,89 | R$ 149,90 | sim |
| Mass Titanium Refil 1,4 kg | `mass-titanium-17500-14kg` (id 37) | Baunilha (100), Chocolate (97), Morango (98), Leite Condensado (101), Vitamina de Frutas (99) | R$ 69,89 | R$ 99,90 | todos os sabores listados como disponíveis |
| Mass Titanium 17500 Zero Lactose 2,4 kg | `mass-titanium-17500-zero-lactose` (id 99) | Chocolate (209), Morango (210) | R$ 129,89 | R$ 159,90 | sim (2 sabores) |
| Super Gainers Refil 3 kg (fora da pauta, ver 1.5) | `supergainers3kg` (id 38) | Chocolate, Morango, Vitamina, Baunilha | R$ 139,89 | R$ 139,89 | sim |

Hipercalórico fora da lista: não há 4 kg nem balde no catálogo lido.

### 1.2 Rótulo (tabela nutricional, porção de 160 g, 5 dosadores)

Tabela lida por sabor (imagem da loja). Porções por embalagem declaradas: "cerca de 19" (3 kg), "cerca de 9" (1,4 kg), "15" (zero lactose).

| Produto / sabor | kcal | Carboidrato (g) | Açúcares totais (g) | Açúcares adicionados (g) | Proteína (g) | Gordura total (g) | Gordura saturada (g) | Fibra (g) | Sódio (mg) | Cálcio (mg) | Arquivo |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 3 kg baunilha | 619 | 135 | 31 | 11 | 17 | 1,2 | 0,7 | não declarada | 298 | 101 | `mass3kg-baunilha.jpg` |
| 3 kg chocolate | 612 | 133 | 25 | 11 | 17 | 1,2 | 0,7 | 0,9 | 287 | 98 | `mass3kg-chocolate.jpg` |
| 3 kg morango | 609 | 134 | 22 | 11 | 17 | 0,5 | 0,4 | não declarada | 292 | 101 | `mass3kg-morango.jpg` |
| 3 kg leite condensado | 615 | 134 | 30 | 11 | 17 | 1,2 | 0,7 | não declarada | 294 | 101 | `mass3kg-leitecondensado.jpg` |
| 3 kg vitamina de frutas | 615 | 134 | 30 | 11 | 17 | 1,2 | 0,7 | não declarada | 292 | 101 | `mass3kg-vitamina.jpg` |
| 1,4 kg baunilha | 619 | 135 | 31 | 11 | 17 | 1,2 | 0,7 | não declarada | 298 | 101 | `mass14kg-baunilha.jpg` |
| 1,4 kg chocolate | 612 | 133 | 25 | 11 | 17 | 1,2 | 0,7 | 0,9 | 287 | 98 | `mass14kg-chocolate.jpg` |
| zero lactose chocolate | 604 | 132 | 10 | 10 | 17 | 0,6 | 0,3 | 1,5 | 173 | não declarado (tabela com aminoácidos e vitaminas) | `zero-chocolate.jpg` |
| zero lactose morango | 604 | 134 | 10 | 10 | 17 | 0 | não declarada (tabela diz "não contém quantidades significativas") | não significativa | 178 | idem | `zero-morango.jpg` |

Observações do rótulo:
- O 1,4 kg e o 3 kg têm a mesma tabela por sabor (baunilha e chocolate conferidos nos dois tamanhos). Os sabores 1,4 kg morango, leite condensado e vitamina não foram lidos na imagem: [PENDENTE: leitura da tabela] (a ficha diz "Até 619 kcal por porção dependendo do sabor").
- Divergência de kcal entre sabores do mesmo produto: 609 a 619 kcal por 160 g no 3 kg.
- O zero lactose tem tabela ampla: aminoácidos (ex.: leucina 802 mg, cloreto de cromo na lista), vitaminas A, D, E, C e complexo B. Vitamina A 361 µg (45% VD), D 3 µg (20%), cromo 21 µg (60%), ferro 8,4 mg (60%), zinco 4,2 mg (38%) no chocolate.
- Gordura saturada e fibra: a tabela do 3 kg chocolate declara fibra 0,9 g; a do zero lactose chocolate declara 1,5 g.

### 1.3 Ficha (texto da loja, lido em 20/11)

Textos do site, não usar como fato de efeito. Só os campos de rótulo e de uso.

- **Sobre o produto (3 kg):** "hipercalórico ideal para auxiliar atletas e praticantes de atividade física no aporte energético de que necessitam" + "As proteínas auxiliam na formação dos músculos e ossos". Alegação: NÃO entra.
- **Destaques:** 3 kg "17g de proteínas por porção; 619 kcal por porção"; 1,4 kg "Até 619 kcal por porção dependendo do sabor"; zero lactose "Zero Lactose; 17g de proteína por porção; 1.849 mg de BCAA por porção; Com WPI".
- **Modo de preparo (3 kg e 1,4 kg):** "Bata no liquidificador 160g (5 dosadores) em 250mL (1 copo) de leite integral, desnatado ou água mineral. A quantidade da porção no dosador pode variar em função da densidade."
- **Modo de preparo (zero lactose):** "Misture 160g (5 dosadores) em 250mL de água gelada ou leite desnatado para dietas com restrição de lactose. Consumir uma porção ao dia, ou conforme orientação profissional."
- **Recomendação de uso (3 kg):** "É possível utilizar MASS TITANIUM 17500 antes e depois do treino ou conforme a orientação profissional." (1,4 kg: a mesma frase, mais "Indicado para maiores de 19 anos.")
- **Advertências:**
  - 3 kg: "ESTE PRODUTO NÃO DEVE SER CONSUMIDO POR GESTANTES, LACTANTES E CRIANÇAS." (além das comuns)
  - 1,4 kg: sem a frase de gestantes; sem "maiores de 19" na advertência.
  - zero lactose: "Este produto não é um medicamento. Não exceder a recomendação diária de consumo indicada na embalagem. Mantenha fora do alcance de crianças." Sem frase de gestantes.
- **Alergênicos:**
  - 3 kg: "CON´TEM LEITE E OVO. PODE CONTER SOJA. CONTÉM LACTOSE."
  - 1,4 kg: "CONTÉM DERIVADOS DE LEITE E OVO PODE CONTER SOJA LACTOSE: CONTÉM."
  - zero lactose: "Contem derivados de leite e soja. Pode conter derivados de ovo. LACTOSE: Não contém."
- **Ingredientes (3 kg, exemplo baunilha):** maltodextrina, proteína concentrada do soro do leite (WPC), clara de ovo desidratada (albumina), colágeno hidrolisado, aromatizante, sucralose. Chocolate: + cacau em pó; morango: corantes amaranto e azul brilhante FCF.
- **Ingredientes (zero lactose, chocolate):** maltodextrina, waxy maize, colágeno hidrolisado, proteína isolada da soja, cacau alcalino, proteína isolada do soro do leite (WPI), mix de vitaminas e minerais, aromatizantes, lecitina de arroz, sucralose. Não contém glúten.
- **Ficha 1,4 kg:** ingredientes iguais às do 3 kg em cada sabor.

Textos de categoria da loja (não usar como rótulo do artigo): o produto aparece em "/Por Objetivo/Ganho de peso/" e "/Por Objetivo/Massa Muscular/".

### 1.4 Contas (rótulo + preço de 20/11, sem cupom; o cupom entra só como teto de 10%)

Método: porções pelo peso da embalagem (3 kg = 18,75 porções de 160 g; 1,4 kg = 8,75; 2,4 kg = 15). A tabela diz "cerca de 19" e "cerca de 9" e o método do peso dá 18,75 e 8,75. Escolher um método e usar o mesmo no artigo e na conta do outro artigo (ver 1.6).

| Produto / sabor | R$ por 100 g | Proteína por 100 g do produto | R$ por 100 g de proteína | R$ por 1.000 kcal (do rótulo) | Carboidrato por grama de proteína | Teto com cupom 10%: R$ por 100 g de proteína |
|---|---|---|---|---|---|---|
| 3 kg baunilha | 3,96 | 10,6 g | 37,30 | 10,24 | 7,9 g | 33,57 |
| 3 kg chocolate | 3,96 | 10,6 g | 37,30 | 10,36 | 7,8 g | 33,57 |
| 3 kg morango | 3,96 | 10,6 g | 37,30 | 10,41 | 7,9 g | 33,57 |
| 3 kg leite condensado | 3,96 | 10,6 g | 37,30 | 10,31 | 7,9 g | 33,57 |
| 3 kg vitamina | 3,96 | 10,6 g | 37,30 | 10,31 | 7,9 g | 33,57 |
| 1,4 kg baunilha | 4,99 | 10,6 g | 46,98 | 12,90 | 7,9 g | 42,29 |
| 1,4 kg chocolate | 4,99 | 10,6 g | 46,98 | 13,05 | 7,8 g | 42,29 |
| zero lactose chocolate (2,4 kg) | 5,41 | 10,6 g | 50,94 | 14,34 | 7,8 g | 45,84 |
| zero lactose morango (2,4 kg) | 5,41 | 10,6 g | 50,94 | 14,34 | 7,9 g | 45,84 |

Preços com cupom de 10% (teto, não promessa): 3 kg R$ 107,00; 1,4 kg R$ 62,90; zero lactose R$ 116,90. Pelo dossiê, o teste de 14/10 (whey, outra linha) deu 8,9% e não 10%, então o teto é o máximo.

Frete: o dossiê tem a tabela por região (`src/lib/couponsData.ts` e `/politicas/politica-de-frete`, lida em 12/11). Não entra nesta conta.

### 1.5 Fora da pauta (decisão do Bruno)

- **Super Gainers Refil 3 kg** (id 38, R$ 139,89): hipercalórico da mesma categoria com 3 g de creatina por porção; a ficha diz "bons resultados na formação muscular" e "melhor rendimento". Não entrou nas contas.

### 1.6 Confronto com o artigo que já está no ar

`content/reviews/max-titanium-ou-growth.json` (publicado) já compara o hipercalórico Mass Titanium 3 kg com a Growth, com preço no Pix de 18/10: R$ 9,81 por 1.000 kcal (Max Mass Titanium 3 kg). Nesta leitura, o 3 kg de cartão dá R$ 10,24 (baunilha) e R$ 10,31 (vitamina), sem Pix. A diferença é de data, de forma de pagamento e de método (porções). MX1 não repete a tabela de comparação com a Growth; linka o artigo e fica com a Max sozinha.

### 1.7 Pix

A meta de todas as páginas da Max diz "5% Off no Pix". A API não tem preço de Pix. [PENDENTE: navegador, para confirmar o preço no Pix na página do produto sem login, sem carrinho, com liberação do Bruno.] Os números deste arquivo são de cartão.

---

## 2. Termogênicos (MX2)

### 2.1 Produtos à venda

| Produto | URL | Preço | Preço de tabela | Porção (rótulo) | Disponível em 20/11 |
|---|---|---|---|---|---|
| 2Hot 200 g (id 9) | `2hot-200g` | R$ 79,90 | R$ 99,90 | 6 g (1 dosador raso), cerca de 33 porções | Tangerina, Uva, Guaraná com Açaí, Abacaxi com Hortelã: sim. Limão: NÃO (esgotado). |
| Shot Dry 150 g (id 107) | `shot-dry-150g-` | R$ 89,89 | R$ 99,90 | 5 g (1 dosador), 30 porções | Maracujá: sim. Frutas Vermelhas: NÃO. |
| Shot Thermo Max 60 cápsulas (id 108) | `shot-thermo-max-60-caps` | R$ 79,89 | R$ 79,89 | 2 cápsulas (1,4 g), 30 porções | NÃO (esgotado). |
| Fire Black 60 cápsulas (id 11) | `fire-black-60-caps` | R$ 43,04 | R$ 43,04 | 2 cápsulas (0,7 g), 30 porções | sim |
| Fire White 60 cápsulas (id 12) | `fire-white-pote-com-60-capsulas` | R$ 34,62 | R$ 34,62 | 2 cápsulas (1 g), 30 porções | NÃO (esgotado). |

Pack 2x Fire Black (id 390) e Pack 3x Fire Black (id 396, R$ 129,12, igual a 3 × R$ 43,04): fora da pauta.

Kits (fora da pauta; nomes da loja com "queima calórica", "seca barriga" e "termo", que não entram no artigo): Kit Queima Calórica Extrema Shot Dry + 2Hot (id 308, R$ 179,78); Kit Shot Fire Definição (id 344, R$ 122,03, com Shot Dry Maracujá disponível); Kit Termo Pack 2Hot + Shot Thermo (id 392, esgotado); Kit Seca Barriga Shot Thermo + Shot Dry (id 393, esgotado); Kit Creatina + 2Hot (id 381), Kit Creatina + Shot Dry (id 382), Kit Max Shape + Shot Dry (id 136). Fora da pauta, a decisão de incluir é do Bruno.

Fora do termogênico, achado da busca "cafeína": **Hórus Elite 390 g** (id 461, R$ 136,74, sabores Pink Lemonade, Red Explosion, Orange Nitro): pré-treino com 400 mg de cafeína por dose (título e ficha). Não está no briefing do Hórus/Égide (que cobre Hórus 150 g e 300 g, Égide 150 g e 300 g, Night Train). Não entrou nesta pauta.

Busca "cafeína 210 mg" (pedida na lista): nenhum produto da Max com 210 mg apareceu nas buscas lidas (cafeína, hot, shot, fire, termo, termogenico). Não existe pré-treino com 210 mg no catálogo lido.

### 2.2 Rótulo (cafeína e demais campos)

| Produto | Porção | Cafeína por porção | Kcal por porção | Demais campos relevantes (rótulo) | Arquivo |
|---|---|---|---|---|---|
| 2Hot 200 g (tangerina) | 6 g (1 dosador raso) | **70 mg** (35 mg por 100 mL) | 8 kcal | taurina 800 mg, glucoronolactona 500 mg, inositol 40 mg, cromo 18 µg (51% VD), colina 275 mg, vitaminas B1 a B12 (30 a 65% VD) | `2hot-tangerina.png` |
| 2Hot 200 g (abacaxi com hortelã) | 6 g | não lido: ficha diz 70 mg por porção (igual nos sabores) | — | — | `2hot-abacaxi.png` (baixada, não lida) |
| Shot Dry 150 g (maracujá) | 5 g (1 dosador) | **75 mg** | 16 kcal | carboidrato 4 g; sem proteína, gordura, sódio, fibra | `shotdry-maracuja.png` |
| Shot Dry 150 g (frutas vermelhas) | 5 g | não lido (baixada) | — | — | `shotdry-frutasvermelhas.png` |
| Shot Thermo Max 60 cápsulas | 2 cápsulas (1,4 g) | **140 mg** | não declarado (zero) | taurina 710 mg, L-carnitina 190 mg, cromo 185 µg (**529% VD**), compostos fenólicos 140 mg | `shotthermo.png` |
| Fire Black 60 cápsulas | 2 cápsulas (0,7 g) | **400 mg** | zero | só cafeína | `fireblack.png` |
| Fire White 60 cápsulas | 2 cápsulas (1 g) | **200 mg** | 0 kcal | carboidrato 0,7 g | `firewhite.jpg` |

Observações do rótulo:
- Fire Black: 400 mg por porção de 2 cápsulas. A ficha da loja diz "400g de cafeína pura por porção" na descrição (erro de unidade) e "400mg de cafeína por porção (2 cápsulas)" nos destaques. O rótulo confirma 400 mg.
- Shot Thermo Max: o rótulo declara cromo a 529% do VD por porção. A ficha não comenta. Não usar como "benefício"; se entrar, é só o número, com aviso de dose.
- 2Hot: 6 g de porção, 33 porções. O rótulo traz "100 mL" e "6 g" na mesma tabela; o artigo usa 6 g.

### 2.3 Ficha (texto da loja, 20/11) — campos de uso e advertência

- **2Hot 200 g:** "Recomendação de uso: Ingerir uma porção pela manhã e outra antes do almoço ou conforme orientação profissional." Destaques: "70mg de cafeína por porção". Advertências: "CRIANÇAS, GESTANTES, NUTRIZES, IDOSOS E PORTADORES DE ENFERMIDADES: CONSULTAR O MÉDICO ANTES DE CONSUMIR O PRODUTO. NÃO É RECOMENDADO O CONSUMO COM BEBIDA ALCOÓLICA." Alergênicos: "PODE CONTER LEITE, OVO E SOJA." Preparo: "Misturar 6g (1 dosador raso) em 200mL de água gelada... Beber imediatamente." Texto de benefício ("Ação rápida", "Auxilia no aumento do estado de alerta", "metabolismo energético", "Emagrecimento" na categoria): NÃO entra.
- **Shot Dry 150 g:** "Tomar uma porção diariamente ou conforme orientação de nutricionista ou médico." "Menos de 20kcal por dose" (ficha; o rótulo diz 16 kcal). Advertências: "ESTE PRODUTO NÃO DEVE SER CONSUMIDO POR GESTANTES, LACTANTES E CRIANÇAS." Lactose: não contém. A ficha não declara o mg de cafeína; o rótulo sim (75 mg).
- **Shot Thermo Max 60 cápsulas:** "Tomar 2 cápsulas diariamente ou conforme orientação de nutricionista ou médico." Advertência: "ESTE PRODUTO NÃO DEVE SER CONSUMIDO POR GESTANTES, LACTANTES E CRIANÇAS." Ficha: "L-carnitina e taurina..." e "auxilia no aumento do estado de alerta" (alegação, não entra). Categoria "Emagrecimento" (não usar).
- **Fire Black 60 cápsulas:** "Ingerir de uma a duas cápsulas antes do treino. Não exceder a porção de 2 cápsulas ao dia. Evitar o consumo em até 6 horas antes de dormir. Indicado para atletas e praticantes de atividade física maiores de 19 anos." Advertências: sem consumo por gestantes, lactantes e crianças. Alergênicos: pode conter leite, ovo e soja; não contém lactose. Ficha: "aumento da capacidade de resistência e no desempenho" (alegação, não entra).
- **Fire White 60 cápsulas:** "Ingerir 2 (duas) cápsulas ao dia, uma hora antes do treino. Indicado para pessoas maiores de 19 anos." Ficha: "aumentar o seu nível de energia e melhorar a sua performance" (alegação, não entra). Advertência: sem consumo por gestantes, lactantes e crianças.

Cafeína por dia pela ficha (conta, com os textos de uso do rótulo):
- 2Hot: 2 porções = 140 mg.
- Shot Dry: 1 porção = 75 mg.
- Shot Thermo Max: 2 cápsulas = 140 mg.
- Fire Black: 1 a 2 cápsulas por uso = 200 a 400 mg; a ficha manda não exceder 2 cápsulas por dia = 400 mg no dia.
- Fire White: 2 cápsulas por dia = 200 mg.

Referência externa, a checar antes do texto: EFSA (2015, parecer sobre a segurança da cafeína): dose única até 200 mg sem preocupação para adulto saudável; consumo habitual até 400 mg por dia para adultos não gestantes; até 200 mg por dia na gestação. Fonte: `https://www.efsa.europa.eu/en/efsajournal/pub/4102`. [PENDENTE: leitura do texto final. O link do Wiley (`10.2903/j.efsa.2015.4102`) respondeu 403 ao WebFetch; os valores acima vêm de resumo de busca, não do texto.]

Consequência para MX2: o Fire Black, numa porção de 2 cápsulas, já dá 400 mg, o dobro do valor de dose única da EFSA. É dado de rótulo e precisa de aviso forte. Decisão do Bruno (ver briefing).

### 2.4 Contas (rótulo + preço de 20/11, sem cupom; teto de 10% como comparação)

| Produto | Preço da embalagem | Porções | R$ por porção | Cafeína por porção | mg por porção por R$ 1 | Teto com 10%: R$ por porção |
|---|---|---|---|---|---|---|
| 2Hot 200 g | R$ 79,90 | cerca de 33 | R$ 2,42 | 70 mg | 28,9 | R$ 2,18 |
| Shot Dry 150 g (maracujá) | R$ 89,89 | 30 | R$ 3,00 | 75 mg | 25,0 | R$ 2,70 |
| Shot Thermo Max 60 cáps (esgotado) | R$ 79,89 | 30 | R$ 2,66 | 140 mg | 52,6 | R$ 2,40 |
| Fire Black 60 cáps | R$ 43,04 | 30 | R$ 1,43 | 400 mg | 278,8 | R$ 1,29 |
| Fire White 60 cáps (esgotado) | R$ 34,62 | 30 | R$ 1,15 | 200 mg | 173,3 | R$ 1,04 |

A porção é a do rótulo (um dosador ou duas cápsulas). O número de porções é o da tabela ("cerca de 33" no 2Hot; 30 nos demais).

---

## 3. Dados brutos de busca (VTEX, 20/11/2026)

Total de produtos Max Titanium retornados: `hipercalorico` 4 produtos; `hot` 12 (incluindo Max); `cafeina` 7 (incluindo Max); `shot` 9 (Max); `fire` 6 (Max); `termo` 3 (Max); categoria `termogenicos` 2 (packs Fire Black).

Buscas que deram 400 (espaço na URL): `shot dry`, `fire black`, `fire white`, `shot thermo`, `cafeina 210`, `termogenico max titanium`. Refeitas com uma palavra (`shot`, `fire`, `termo`, `cafeina`).

Buscas não feitas: `2hot é bom`, `shot dry` como frase (a palavra "shot" já devolve o produto), autocompletar (a lista de buscas veio do Bruno, não foi relida por mim).

---

## 4. Divergências encontradas (para o briefing e o revisor)

1. **Fire Black, unidade:** ficha "400g de cafeína" (Sobre) e "400mg" (Destaques); rótulo 400 mg. Usar 400 mg.
2. **Mass 3 kg, gestantes:** a advertência "não deve ser consumido por gestantes, lactantes e crianças" aparece no 3 kg e não aparece no 1,4 kg nem no zero lactose.
3. **Mass 1,4 kg, idade:** "Indicado para maiores de 19 anos" aparece no 1,4 kg; não aparece no 3 kg nem no zero lactose.
4. **Mass, kcal:** "619 kcal" na ficha do 3 kg e "Até 619 kcal dependendo do sabor" no 1,4 kg; rótulo varia de 604 a 619 kcal.
5. **Mass zero lactose:** "Lactose: não contém" (alergênicos e ficha) e "Contem derivados de leite"; ingredientes têm proteína isolada do soro do leite (WPI). Não é whey concentrado e não é "zero" de proteína do leite.
6. **Fire White e Shot Thermo esgotados** na leitura; o artigo não compara preço de produto sem estoque como "o mais barato hoje" sem data.
7. **Fire Black pack vs unitário:** 3 × R$ 43,04 = R$ 129,12 (sem desconto de pacote).
8. **2Hot:** ficha pede "uma porção pela manhã e outra antes do almoço" (duas por dia, 140 mg); rótulo dá 70 mg por porção.

---

## 5. Pendentes

- [PENDENTE: navegador] Pix: confirmar o preço de Pix (meta "5% Off no Pix") nas páginas `https://www.maxtitanium.com.br/masstitanium3kg/p`, `https://www.maxtitanium.com.br/fire-black-60-caps/p`, `https://www.maxtitanium.com.br/2hot-200g/p`, sem login e sem carrinho.
- [PENDENTE: leitura] Tabelas do Mass 1,4 kg (morango, leite condensado, vitamina de frutas).
- [PENDENTE: leitura] Tabela do 2Hot abacaxi e do Shot Dry frutas vermelhas (a cafeína deve ser a mesma; a ficha diz 70 mg e não lemos a imagem).
- [PENDENTE: fonte] EFSA 2015 (texto final). Bloqueado 403 em `efsa.onlinelibrary.wiley.com`. Não usar o valor como fato até ler o texto por outra via.
- [PENDENTE: foto da embalagem] Zero lactose: a ficha diz "Lactose: não contém" e "contém derivados de leite". Conferir a lista de ingredientes da embalagem física antes do texto (decisão de texto, não de número).
- Estoque: a leitura é de 20/11, 17:21 a 17:23. Esgotados: 2Hot Limão, Shot Dry Frutas Vermelhas, Shot Thermo Max, Fire White. Reler no dia de publicar.
