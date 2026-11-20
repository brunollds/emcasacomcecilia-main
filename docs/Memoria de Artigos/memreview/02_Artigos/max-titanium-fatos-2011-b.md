# Fatos brutos: Max Titanium, kits, BCAA e Multimax (20/11/2026)

Leitura de 20/11/2026, feita por leitura direta, sem navegador: API pública VTEX da loja (`/api/catalog_system/pub/products/search` com `fq=B:2000000`, que trouxe 234 produtos, e `/products/search/<linkText>/p` para a ficha de cada um), HTML das páginas de produto e da política de frete. Sem login, carrinho, compra ou CAPTCHA. Nenhuma resposta 403, 429 ou Cloudflare.

Arquivos brutos (scratchpad, não versionados): `C:\Users\Bruno\AppData\Local\Temp\claude\16086a64814165a5\6634a9e5-022d-45d2-a71f-4c96d8475267\scratchpad\max-2011-b\`, com `catalogo-max.json`, `fichas-max.json`, `resumo-kits.txt`, `resumo-avulsos.txt`, `descricoes-bcaa-multimax.txt`, `imagens\` (tabelas) e `html\`.

Convenções: "cartão" = `Price` da VTEX, sem Pix e sem cupom. `disp 99999` é o estoque sem limite que a VTEX devolve, não uma contagem. "Esgotado" = `AvailableQuantity` 0 na API e "Produto esgotado!" na página.

---

## 1. Cupom e frete

- Cupom `MAX10EMCASACOMCECILIA`, "até 10% OFF", com o percentual variando por produto. Cadastro: `src/lib/couponsData.ts`, slug `max-titanium`, `lastVerified` e `testedAt` 2026-11-11. Sem link de afiliado: `offerUrl` é `https://www.maxtitanium.com.br/`, e a atribuição é pelo cupom.
- Teste de 11/11 (`testNote` do cadastro): Top Whey 3W + Sabor 900 g em promoção, de R$ 273,55 por R$ 189,00, com R$ 16,75 de desconto no total de R$ 172,25. Num IsoWhey 900 g a preço cheio (R$ 326,18), o desconto foi de R$ 6,52, cerca de 2%. Os brindes continuaram no carrinho.
- Teste de kit com o cupom: nenhum, em nenhuma data do vault.
- Pix: a página de cada produto mostra preço à vista no Pix (ver seção 5). A regra de soma com Pix está no cadastro ("chega a 5%"); não foi conferida no carrinho nesta rodada.
- Frete, política lida no HTML de `https://www.maxtitanium.com.br/politicas/politica-de-frete` em 20/11/2026. Frete grátis para compras a partir de: São Paulo (capital) R$ 104,00; Sudeste R$ 134,00; Centro-Oeste R$ 204,00; Sul R$ 249,00; Nordeste R$ 299,00; Norte R$ 599,00. Regra: o valor é o somatório dos itens, aplicado na forma de envio de menor valor. Com cupom ou vale-presente, o frete pode ser cobrado se o valor final ficar abaixo do mínimo da região. Sedex é pago pelo cliente em qualquer região.
- Parcelamento na página do produto: 6x sem juros (texto de rodapé da loja).

## 2. Avulsos (cartão, 20/11/2026, sem cupom)

| Produto | ID | Preço | Lista | Estoque |
|---|---|---|---|---|
| 100% Whey Pote 900 g | 49 | R$ 210,39 | R$ 210,39 | sim (várias cores) |
| 100% Whey Refil 900 g | 50 | R$ 196,39 | R$ 196,39 | sim |
| Whey Pro 1 kg (concentrado) | 52 | R$ 109,90 | R$ 126,20 | sim |
| Whey Blend 900 g Nova Fórmula | 105 | R$ 79,00 | R$ 121,99 | sim |
| Whey Blend 1,8 kg Nova Fórmula | 106 | R$ 149,00 | R$ 231,44 | sim |
| Femini Whey 900 g | 39 | R$ 130,00 | R$ 147,25 | sim |
| Top Whey 3W + Sabor 900 g | 43 | R$ 189,00 | R$ 273,55 | sim (6 de 6) |
| Top Whey 3W + Performance 900 g | 46 | R$ 273,55 | R$ 273,55 | sim (3 de 5) |
| Top Whey 3W + Performance 1,8 kg | 47 | R$ 519,86 | R$ 519,86 | sim |
| IsoWhey 900 g | 41 | R$ 326,18 | R$ 326,18 | sim |
| Super Whey 900 g | 70 | R$ 94,62 | R$ 94,62 | sim |
| 100% Whey Dr. Peanut 900 g | 218 | R$ 224,39 | R$ 224,39 | sim |
| Creatina 100 g | 24 | R$ 33,89 | R$ 39,90 | **esgotado** |
| Creatina 150 g | 25 | R$ 38,89 | R$ 47,52 | sim |
| Creatina 300 g | 26 | R$ 59,90 | R$ 75,10 | sim |
| Creatina 500 g | 372 | R$ 69,90 | R$ 115,60 | sim |
| Creatina 1 kg | 521 | R$ 109,90 | R$ 119,90 | sim |
| Creatina Creapure 250 g | 245 | R$ 139,89 | R$ 147,20 | sim |
| Hórus 150 g | 103 | R$ 46,89 | R$ 79,90 | sim (5 de 7) |
| Hórus 300 g | 35 | R$ 88,89 | R$ 115,70 | sim (6 de 7) |
| Égide 150 g | 145 | R$ 53,90 | R$ 89,90 | sim (3 de 4) |
| Égide 300 g | 138 | R$ 89,90 | R$ 136,70 | sim (5 de 6) |
| Night Train 300 g | 217 | R$ 109,89 | R$ 109,89 | sim (1 de 2) |
| BCAA 2400, 60 cápsulas | 15 | R$ 49,36 | R$ 49,36 | sim |
| BCAA 2400, 100 cápsulas | 16 | R$ 59,89 | R$ 74,90 | sim |
| BCAA 2400, 200 cápsulas | 17 | R$ 99,88 | R$ 99,88 | sim, 10 unidades |
| BCAA 4:1:1 Drink 280 g | 3 | R$ 99,88 | R$ 99,88 | sim (limão e uva; laranja esgotado) |
| Multimax Complex 90 cápsulas | 67 | R$ 57,19 | R$ 57,19 | **esgotado** |

Observação: a creatina de 500 g estava em R$ 87,53 no dossiê de creatina (28/10, `creatina-max-titanium-qual-pote.md`). Hoje está em R$ 69,90. O artigo publicado ainda cita o preço antigo.

## 3. Kits (cartão, 20/11/2026; menor preço entre as variantes disponíveis)

Conta: "avulsos" é a soma dos avulsos do mesmo item e tamanho, ao preço da seção 2. "Diferença" = avulsos menos kit (positivo = kit mais barato).

| ID | Kit | Preço do kit | Avulsos somados | Diferença | Variantes disponíveis |
|---|---|---|---|---|---|
| 373 | Kit Creatina 300 g + 100% Whey Pote 900 g | R$ 270,29 | 59,90 + 210,39 = R$ 270,29 | R$ 0,00 | 7 de 7 |
| 214 | Kit Creatina 300 g + 100% Whey Refil 900 g | R$ 256,29 | 59,90 + 196,39 = R$ 256,29 | R$ 0,00 | 4 de 4 |
| 376 | Kit Whey Protein 1 kg + Creatina 300 g | R$ 169,80 | 109,90 + 59,90 = R$ 169,80 | R$ 0,00 | 4 de 4 |
| 512 | Kit Whey Pro 1 kg + Creatina 500 g | R$ 159,80 | 109,90 + 69,90 = R$ 179,80 | **R$ 20,00 (11%)** | 4 de 4 |
| 504 | Kit Whey Blend 900 g + Creatina 300 g | R$ 128,90 | 79,00 + 59,90 = R$ 138,90 | **R$ 10,00 (7%)** | 3 de 3 |
| 519 | Kit Whey Blend 1,8 kg + Creatina 300 g | R$ 198,90 | 149,00 + 59,90 = R$ 208,90 | **R$ 10,00 (5%)** | 3 de 3 |
| 377 | Kit Femini Whey 900 g + Creatina 300 g | R$ 179,90 | 130,00 + 59,90 = R$ 189,90 | **R$ 10,00 (5%)** | 3 de 3 |
| 516 | Kit Top Whey 3W + Sabor 900 g + Creatina 300 g | R$ 238,90 | 189,00 + 59,90 = R$ 248,90 | **R$ 10,00 (4%)** | 6 de 6 |
| 446 | Kit Creatina 500 g + 100% Whey Double Tasty | R$ 266,90 (chocolate, baunilha, morango); R$ 280,29 (cookies, leite) | 210,39 + 69,90 = R$ 280,29 | R$ 13,39 (5%) só nos sabores de R$ 266,90 | 5 de 5 |
| 375 | Kit Creatina 300 g + Top Whey 3W Performance 900 g | R$ 333,45 | 273,55 + 59,90 = R$ 333,45 | R$ 0,00 | 3 de 5 |
| 293 | Kit Creatina 300 g + Top Whey 3W Performance 1,8 kg | R$ 579,76 | 519,86 + 59,90 = R$ 579,76 | R$ 0,00 | 3 de 3 |
| 374 | Kit Creatina 300 g + IsoWhey 900 g | R$ 386,09 | 326,18 + 59,90 = R$ 386,08 | R$ 0,00 (centavo) | 2 de 2 |
| 510 | Kit 2x Creatina 300 g + Whey Pro 1 kg | R$ 229,70 | 109,90 + 2 × 59,90 = R$ 229,70 | R$ 0,00 | 4 de 4 |
| 93 | Kit Top Whey 3W Performance 900 g + Creatina 100 g | R$ 307,44 | 273,55 + 33,89 = R$ 307,44 | R$ 0,00 | **0 de 4 (esgotado)** |
| 405 | Kit Creatina 100 g + Whey Dr. Peanut 900 g | R$ 258,28 | 224,39 + 33,89 = R$ 258,28 | R$ 0,00 | **0 de 5 (esgotado)** |
| 413 | Kit 100% Whey Refil 900 g + Creatina 100 g | R$ 230,28 | 196,39 + 33,89 = R$ 230,28 | R$ 0,00 | **0 de 4 (esgotado)** |
| 378 | Kit Creatina 300 g + Pré-treino Hórus 300 g | R$ 148,78 | 59,90 + 88,89 = R$ 148,79 | R$ 0,01 | 6 de 7 |
| 379 | Kit Creatina 300 g + Pré-treino Égide 300 g | R$ 149,80 | 59,90 + 89,90 = R$ 149,80 | R$ 0,00 | 5 de 6 |
| 518 | Kit Creatina 500 g + Pré-treino Hórus 150 g "de brinde" | R$ 69,90 (lista R$ 134,42) | 69,90 + 46,89 = R$ 116,79 | R$ 46,89 (40%), se o brinde não cobrar | 5 de 7 |
| 333 | Kit Whey Pro 1 kg + Creatina 100 g + Pré-treino Hórus 150 g | R$ 197,69 | 109,90 + 33,89 + 46,89 = R$ 190,68 | **-R$ 7,01 (kit mais caro)** | **0 de 16 (esgotado)** |
| 148 | Kit Intensidade: 100% Whey 900 g + Hórus 300 g | R$ 299,28 (lista R$ 326,09) | 210,39 + 88,89 = R$ 299,28 | R$ 0,00 | 19 de 24 |
| 149 | Kit Força e Disposição: 100% Whey 900 g + Égide 150 g | R$ 264,29 (lista R$ 300,29) | 210,39 + 53,90 = R$ 264,29 | R$ 0,00 | 10 de 10 |

Fora da conta de whey e creatina:
- Kit 7Belo Hórus 300 g + Creatina 300 g (ID 459): R$ 159,69, igual à soma (R$ 93,52 + R$ 66,17). Sabor 7Belo, produto à parte da linha.
- Kits com camiseta Elite Team Show (creatina 300 g + camiseta de time, ID 423 a 440): R$ 149,79 cada, com 3 a 5 variantes disponíveis. A camiseta avulsa não foi conferida nesta rodada.
- Kits de linha de atleta (Brandão, Dino, G3XFC, Super Fã, Mais Garra, Se Quiser Sim): IDs 258, 259, 260, 261, 351, 353, 352, 354, 349, 409, 410, 411, 412, 415, 414. Não foram somados nesta rodada.
- Kit 2x Whey 900 g (ID 524): R$ 420,78 (2 × R$ 210,39), sem creatina.
- Kit 2x Pré-treino Égide 300 g (ID 525): R$ 159,80 nos sabores em estoque, lista R$ 273,40.
- Kit Max Shape, Kit Power Protein + Hórus, Kit Queima, Kit Seca Barriga, Kit Termo Pack, Kit Shot Fire, Kit Pro Imunidade, Kit Imunidade e Saúde: fora do escopo (barras, termogênicos, glutamina, ômega, multivitamínico).

Composição: a `kitItems` da VTEX confirma a composição de cada kit de whey e creatina. Nenhum kit tem BCAA (verificado nas 234 fichas).

## 4. Termos da pauta sem produto

- "kit bitelo": nenhum produto com esse nome. A única ocorrência de "bitelo" é a camiseta Camiseta Bitelo 2026 - Preta (ID 447), que não é kit.
- "kit completo": nenhum produto com esse nome. Há "Kit Pro", "Kit Intensidade" e "Kit Brandão Bodybuilder" como nomes de montagem.
- "whey + BCAA + creatina": nenhum kit com BCAA. A montagem seria carrinho de avulsos.
- "max titanium kit emagrecimento": existem kits de termogênicos (Kit Queima Calórica, Kit Seca Barriga, Kit Termo Pack). Ficam fora do texto. Ver a regra da pauta sobre promessa de efeito.
- "kit whey creatina", "max titanium kits", "kit max titanium creatina e horus": existem (seção 3).
- Coleção `/Produtos/Kits/` e `/Produtos/Kits/Kit por objetivo/` existem como categorias.

## 5. BCAA e Multimax (rótulo, porção e preço)

Leitura das tabelas nutricionais (imagens da última posição da galeria, baixadas para `imagens\`):

**BCAA 2400, 100 cápsulas** (ID 16; tabela `bcaa-2400-100-tabela.jpg`, idêntica à de 60 e 200 em porção):
- Porções por embalagem: 25. Porção: 2,4 g (4 cápsulas).
- Proteína 0 g. L-leucina 980 mg, L-isoleucina 710 mg, L-valina 710 mg por porção.
- Sem quantidades significativas de valor energético, carboidratos, açúcares, gorduras, fibras e sódio.
- Preço de cartão R$ 59,89 (lista R$ 74,90). Pix mostrado na página: R$ 58,09 ("20% OFF"). Estoque sem limite.
- Por porção: R$ 2,40 no cartão; R$ 2,32 no Pix mostrado; R$ 2,16 no teto de 10% (não testado).

**BCAA 2400, 60 cápsulas** (ID 15; `bcaa-2400-60-tabela.jpg`): 15 porções de 2,4 g (4 cápsulas). Mesmos valores por porção. Preço R$ 49,36, por porção R$ 3,29. Categoria de catálogo: "/Black Friday/".

**BCAA 2400, 200 cápsulas** (ID 17; `bcaa-2400-200-tabela.jpg`): 50 porções de 2,4 g. Mesmos valores por porção. Preço R$ 99,88, por porção R$ 2,00. Estoque: 10 unidades.

Os três BCAA 2400 têm a mesma razão de aminoácidos no rótulo: 980 : 710 : 710 (leucina : isoleucina : valina), que não é 2:1:1. Não escrever "2:1:1" sem tabela.

**BCAA 4:1:1 Drink, 280 g** (ID 3; `bcaa-411-limao-tabela.jpg`, limão):
- Porções por embalagem: 40. Porção: 7 g (1 dosador).
- Valor energético 15 kcal, carboidratos 3,7 g (açúcares totais 0,2 g; adicionados 0,2 g), proteína 0 g, sódio 9 mg.
- L-leucina 2.000 mg, L-isoleucina 500 mg, L-valina 500 mg por porção. Razão 4:1:1.
- Vitamina B6 1,3 mg, 100% do VD.
- Preço de cartão R$ 99,88. Pix mostrado na página: R$ 96,88. Por porção: R$ 2,50 no cartão; R$ 2,42 no Pix mostrado; R$ 2,25 no teto de 10% (não testado).
- Sabores: a API traz limão (100 disponíveis), uva (100) e laranja (esgotado). A página diz "limão, laranja, maracujá e uva". Maracujá não aparece como variante na API: divergência a conferir.
- Modo de preparo (página): "Misturar 7g (1 dosador*) em 200mL (1 copo) de água gelada."

**Multimax Complex, 90 cápsulas** (ID 67; `multimax-tabela.jpg`):
- Porções por embalagem: 30. Porção: 2,6 g (3 cápsulas). Valor energético 0 kcal. Não contém quantidades significativas de carboidratos, açúcares, proteínas, gorduras, fibras e sódio.
- Minerais por porção (%VD): cálcio 300 mg (30%); cobre 911 µg (101%); cromo 35 µg (100%); ferro 14 mg (100%); fósforo 232 mg (33%); iodo 132 µg (88%); magnésio 101 mg (24%); manganês 1,7 mg (57%); molibdênio 46 µg (102%); selênio 34 µg (57%); zinco 7,1 mg (65%).
- Vitaminas por porção (%VD): A 608 µg (76%); D 5,1 µg (34%); E 10 mg (67%); K 66 µg (55%); C 46 mg (46%); B1 1,2 mg (100%); B2 1,3 mg (108%); B3 16 mg (107%); B5 5,1 mg (102%); B6 1,3 mg (100%); biotina 30 µg (100%); ácido fólico 243 µg (61%); B12 2,4 µg (100%).
- Texto da página: "Recomendação de uso: Ingerir 3 cápsulas ao dia. Indicado para maiores de 19 anos. Produto dispensado de registro na ANVISA conforme RDC nº 27/2010." Advertências: "ESTE PRODUTO NÃO É UM MEDICAMENTO. NÃO EXCEDER A RECOMENDAÇÃO DIÁRIA DE CONSUMO INDICADA NA EMBALAGEM. MANTENHA FORA DO ALCANCE DAS CRIANÇAS." Alergênicos: "PODE CONTER LEITE, OVO E SOJA."
- Preço de cartão R$ 57,19; Pix mostrado na página R$ 55,47, com "Receba 4% de cashback". Página e API: **Produto esgotado!**
- Por porção (30 porções, uma por dia): R$ 1,91 no cartão; R$ 1,85 no Pix mostrado. Batem com o que o artigo `max-titanium-ou-dux` diz (R$ 1,85 por dia no Pix e R$ 1,66 com o cupom no teto). Mas o artigo não diz que o produto está esgotado.
- Pela ficha e pela tabela, o Multimax tem 3 cápsulas por porção; o artigo `max-titanium-ou-dux` diz "a Max pede três por dia" e está de acordo.

## 6. Textos da loja (leitura, não fato do artigo)

- BCAA 2400, página (`bcaa-2400-pote-com-100-capsulas/p`): "Auxilia na recuperação e proteção muscular" (destaque). "Recomendação de uso: A quantidade ideal de BCAA... varia... Em geral, recomenda-se consumir entre 5 a 10 gramas por dia, divididas em dois momentos principais". Descrição: selo "PURE AMINO ACID by Ajinomoto Co.®" (também na ficha da API). "O BCAA também pode ser combinado com... whey protein ou creatina, para potencializar os resultados". Estes textos não entram no artigo sem decisão do Bruno (ver Anexo: efeito no corpo não entra; dose vem do rótulo).
- Os 5 a 10 g por dia não aparecem na tabela (a tabela traz porção de 2,4 g, sem dose diária).
- 4:1:1 Drink, página: "Auxilia na recuperação e proteção muscular", "100% da IDR de vitamina B6 por dose". Mesma regra.
- Kit Creatina 300 g + Whey Pro 1 kg (ID 376, página): "Indicado para praticantes de musculação... Ganho de massa muscular; Mais força e desempenho; Melhor recuperação pós-treino". Kit Whey Pro + Creatina + Hórus (ID 333): "Energia e foco nos treinos". Não entram no artigo de kits.
- Kit 518, página: selo "47% OFF MAX NOVEMBER" (data de fim não lida). Preço Pix R$ 67,80; cartão R$ 69,90 ("de" R$ 134,42). Nome e ficha: "Pré-treino Hórus 150g de Brinde". O brinde está no nome do kit; se o carrinho cobra o Hórus, a conta muda (ver pendências).
- BCAA 100 cápsulas, selo "20% OFF" na página.

## 7. Mídia e tabelas

| Arquivo (scratchpad) | Origem | Uso |
|---|---|---|
| `imagens\bcaa-2400-100-tabela.jpg` | `https://lojamaxtitanium.vteximg.com.br/arquivos/ids/169152/bcaa-2400-100-Cap-Tabela-Nutricional.jpg` | tabela do BCAA 2400, 100 cápsulas |
| `imagens\bcaa-2400-60-tabela.jpg` | `.../169151/bcaa-2400-60-Cap-Tabela-Nutricional.jpg` | tabela, 60 cápsulas |
| `imagens\bcaa-2400-200-tabela.jpg` | `.../169153/bcaa-2400-200-Cap-Tabela-Nutricional.jpg` | tabela, 200 cápsulas |
| `imagens\bcaa-411-limao-tabela.jpg` | `.../169154/4-1-1-BCAA-DRINK-280G-Limao-Tabela-Nutricional.jpg` | tabela, 4:1:1 limão (uva e laranja: tabelas `169155` e `169156`, não baixadas) |
| `imagens\multimax-tabela.jpg` | `.../167235/Multimax-Complex-Tabela-Nutricional.jpg` | tabela, Multimax |

Fotos de embalagem: não baixadas nesta rodada. Necessárias para confirmar o selo Ajinomoto e a frente do pote.

## 8. Pendências de navegador (não lidas por API ou HTML)

- Carrinho com o cupom num kit de whey + creatina, sem finalizar: candidatos `https://www.maxtitanium.com.br/kit-whey-pro-creatina-500g/p` (ID 512) e `https://www.maxtitanium.com.br/kit-creatina-500g-horus-150g-brinde/p` (ID 518). Precisa de OK do Bruno.
- Carrinho do kit 518, para ver se o Hórus 150 g entra com preço zero: `https://www.maxtitanium.com.br/kit-creatina-500g-horus-150g-brinde/p`.
- Data de fim da campanha "MAX NOVEMBER" (selo do kit 518): `https://www.maxtitanium.com.br/kit-creatina-500g-horus-150g-brinde/p`.
- Pix de 5% e cashback de 4% no carrinho: `https://www.maxtitanium.com.br/bcaa-2400-pote-com-100-capsulas/p`.
- Maracujá no 4:1:1: se existe como variante comprável: `https://www.maxtitanium.com.br/411-bcaa-drink-280g-max-titanium/p`.
- Foto da embalagem do BCAA 2400 (selo Ajinomoto e modo de uso no pote, se houver): `https://www.maxtitanium.com.br/bcaa-2400-pote-com-100-capsulas/p`.
- Proteína por dose do whey dos kits: não lida. Não entra no texto sem a tabela (regra da Max, alerta de 23/10).

## 9. Coisas a mudar fora desta pauta (aviso para a sessão de artigos)

- `creatina-max-titanium-qual-pote` (publicado): o 500 g cita R$ 87,53 (28/10); hoje é R$ 69,90. O 100 g cita R$ 33,89 e hoje está esgotado.
- `max-titanium-ou-dux` (publicado): o Multimax está esgotado desde 20/11. O artigo ainda diz que o produto sai a R$ 1,85 por dia no Pix.
- `max-titanium-e-boa` (publicado): diz que o BCAA "ainda não tem guia aqui". A pauta MX4 cobre isso.
- `black-friday-max-titanium` (publicado): trata Hórus e Égide, e deixou os kits de fora ("alguns kits, ficaram de fora").
