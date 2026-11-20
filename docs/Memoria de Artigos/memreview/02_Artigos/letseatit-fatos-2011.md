# Fatos: Let's Eat It (leitura de 20/11/2026)

Dados brutos para as pautas L4 (`aparelho-de-jantar-quantas-pecas-escolher`), L6 (`faqueiro-wolff-qual-escolher`), a mesa posta de Ano Novo (`mesa-posta-ano-novo-o-que-precisa-quanto-custa`) e a travessa Le Creuset (`le-creuset-travessa-qual-escolher`).

## 0. Como foi lido

- `letseatit.com.br/products.json` (Shopify), 5.796 produtos, sem login, sem navegador, sem link de afiliado. Arquivo bruto no scratchpad: `letseatit-all.json`; listas com preço e estoque: `letseatit-pautas-2011.md`.
- Preço de venda = `price` da variante; "de" = `compare_at_price`; disponível = `available` da variante. Composição, medidas e cuidados lidos do `body_html` por texto.
- Autocompletar (pt-BR, 20/11): dado no briefing do Bruno; não foi refeito nesta leitura.
- Não aberto: link de parceria (Inbazz). A redação usa o `offerUrl` de `src/lib/couponsData.ts`.

## 1. Aparelhos Porto Brasil (vendor "Porto Brasil", 11 no catálogo)

Todos os de 30 peças têm a mesma conta: 6 de cada tipo, com xícara e pires contados como peças separadas (6 × 5 = 30).

| Produto | Composição (body_html) | Preço | "De" | Estoque em 20/11 | Handle |
|---|---|---|---|---|---|
| Bio Oceano 30 | 6 rasos 27,5 cm; 6 sobremesa 21,5 cm; 6 fundos 22,5 cm; 6 xícaras de café 120 ml com 6 pires. Texto: "servindo ... até seis pessoas" | 798,00 | 1.330,00 | PRÉ-VENDA, envio a partir de ~15 dias | `aparelho-de-jantar-stoneware-organico-oceano-30-pecas-porto-brasil` |
| Petroleum/Night Sky 30 | 6 rasos 26,5; 6 sobremesa 19,5; 6 fundos 21 (600 ml); 6 xícaras de café 120 ml com pires | 798,00 | 1.330,00 | PRÉ-VENDA | `aparelho-de-jantar-stoneware-petroleum-night-sky-porto-brasil` |
| Bio Latte 30 | 6 rasos 27,5; 6 sobremesa 21,5; 6 fundos 22,5; 6 xícaras de café 120 ml com pires | 778,84 | 1.298,07 | PRÉ-VENDA | `aparelho-de-jantar-stoneware-bio-latte-porto-brasil` |
| Bio Latte 16 | 4 rasos 27,5; 4 sobremesa 21,5; 4 cumbucas 17,5; 4 canecas 273 ml (quatro pessoas) | 659,00 | 1.098,33 | ESGOTADO | `pre-venda-aparelho-de-jantar-stoneware-bio-latte-30-pecas-porto-brasil` (handle diz 30, título diz 16) |
| Bio Breeze 30 | 6 de cada, mesma estrutura | 778,84 | 1.298,07 | ESGOTADO | `aparelho-de-jantar-bio-breeze-porto-brasil` |
| Arauco/Greenery 30 | 6 de cada, mesma estrutura | 778,84 | 1.298,07 | ESGOTADO | `aparelho-de-jantar-organico-stoneware-arauco-porto-brasil` |
| Preto Matte 30 | 6 rasos 26,5; 6 sobremesa 19,5; 6 fundos 21 (600 ml); 6 xícaras de café com pires | 756,84 | 1.261,40 | ESGOTADO | `aparelho-de-jantar-organico-stoneware-preto-matte-porto-brasil` |
| Bio Raio 30 | 6 rasos 27,5; 6 sobremesa 21,5; 6 fundos 22,5 (830 ml); 6 xícaras de café 120 ml com pires | 869,90 | 1.449,83 | ESGOTADO | `pre-venda-exclusividade-lets-aparelho-de-jantar-stoneware-bio-raio-30-pecas-porto-brasil` |
| Lua Gold 30 | 6 rasos 26,5; 6 sobremesa 19,5; 6 fundos 21; 6 xícaras de café com pires | 2.049,90 | 3.416,50 | ESGOTADO | `aparelho-de-jantar-stoneware-organico-lua-gold-porto-brasil-24-pecas` |
| Shimeji Gold 30 | mesma estrutura do Lua Gold | 2.049,90 | 3.416,50 | ESGOTADO | `aparelho-de-jantar-stoneware-organico-shimeji-gold-porto-brasil-30-pecas` |
| Forest Gold 30 | mesma estrutura do Lua Gold | 2.049,90 | 3.416,50 | ESGOTADO | `aparelho-de-jantar-stoneware-organico-forest-gold-porto-brasil-30-pecas` |

- Porto Brasil de 20 peças: nenhum no catálogo. Porto Brasil de 42: nenhum.
- Porto Brasil disponíveis hoje: 3, todos de 30 e todos pré-venda (Oceano, Petroleum, Bio Latte 30).
- Texto da ficha Porto (todos os stoneware): "Material: Cerâmica Stoneware"; "Lava-louças: ... pode ser usado na máquina de lavar louças". Forno e micro-ondas da linha: ver `porto-brasil-e-boa` (já no ar).

## 2. Aparelhos de outras marcas com 42 peças (comparação)

| Produto | Composição (body_html) | Preço | "De" | Estoque | Observação |
|---|---|---|---|---|---|
| L'Hermitage Très Classique Porcelana Borda Prateada Azul 42 | 6 pratos rasos 29 cm; 6 fundos 21,6; 6 sobremesa 19; 6 xícaras de café 90 ml com pires; 6 de chá 220 ml com pires (= 42 com pires) | 1.288,00 | 2.146,67 | PRÉ-VENDA (disponível) | Ficha: "Material: Porcelana"; "Não usar no micro-ondas"; "Não usar na lava louças" |
| L'Hermitage Grecco 42 azul, filete dourado | 6 rasos 27,6; 6 fundos 22,9; 6 sobremesa 21; 6 café 80 ml com pires; 6 chá 180 ml com pires | 1.164,00 | 2.328,00 | DISPONÍVEL | Texto de cuidados cortado na leitura: conferir lava-louças na redação |
| L'Hermitage Grecco 42 verde, filete dourado | mesma composição | 1.349,00 | 2.248,33 | DISPONÍVEL | idem |
| L'Hermitage Très Classique 42 borda dourada verde | mesma linha | 1.299,00 | 2.165,00 | ESGOTADO | |
| L'Hermitage Royal Romantic 42 filado dourado | 6 rasos 27,6; 6 fundos 22,9; 6 sobremesa 21; 6 café com pires; 6 chá com pires | 1.998,00 | 3.330,00 | ESGOTADO | |
| L'Hermitage Royal 42 (New Bone China) | 6 rasos 27; 6 fundos 21,6; 6 sobremesa 19; 6 café 90 ml; 6 chá 220 ml | 2.569,00 | 4.281,67 | PRÉ-VENDA esgotada | |
| Wolff Maldivas 42 branco | 6 de cada prato e xícara (talheres não listados) | 1.649,50 | 2.749,17 | ESGOTADO | |
| Wolff Maldivas 42 fio dourado | idem | 1.499,90 | 2.499,83 | ESGOTADO | |
| Vancouver 16 Le Creuset | 16 peças (4 pessoas), vermelha | 2.970,00 | — | ESGOTADO | |

## 3. Faqueiros Wolff (vendor "Wolff")

Composição de cada linha lida do `body_html`. Preço por peça = preço ÷ número de peças do título (conta nossa, sem os cabos e estojo).

| Produto | Peças (composição) | Preço | Por peça | "De" | Estoque | Handle (sinal) |
|---|---|---|---|---|---|---|
| Firenze 24 | 6 colheres de mesa; 6 garfos de mesa; 6 facas de mesa; 6 colheres de chá | 239,00 | 9,96 | 398,33 | DISPONÍVEL | handle diz "viena" (divergência) |
| Firenze Dourado 24 | mesma estrutura | 369,90 | 15,41 | 616,50 | DISPONÍVEL | |
| Viena 54 | 8 facas de mesa; 8 garfos de mesa; 8 colheres de mesa; 8 colheres de sobremesa; 8 garfos de sobremesa; 8 colheres de chá/café; mais 6 de servir (concha, colher de servir, colher de salada, garfo de salada, colher...) | 519,00 | 9,61 | 865,00 | DISPONÍVEL | |
| Firenze 54 | 8 de cada, mesma estrutura do Viena 54 | 539,00 | 9,98 | 898,33 | DISPONÍVEL | |
| Firenze Dourado 54 | 8 de cada, mesma estrutura | 829,00 | 15,35 | 1.381,67 | DISPONÍVEL | |
| Viena 101 | 12 garfos, colheres e facas de mesa; 12 colheres e facas de sobremesa; 12 garfos de sobremesa; 12 colheres de chá; 12 colheres de café; mais garfo, colher de salada, concha de sopa, colher de arroz e colher de açúcar | 1.039,90 | 10,30 | 1.733,17 | DISPONÍVEL | |
| Viena Dourado 101 | mesma estrutura do Viena 101 | 1.499,00 | 14,84 | 2.498,33 | DISPONÍVEL | |
| Firenze Champanhe 101 | mesma estrutura | 1.599,00 | 15,83 | 2.665,00 | DISPONÍVEL | |
| Firenze Dourado 101 | mesma estrutura | 1.589,00 | 15,73 | 2.648,33 | DISPONÍVEL | |
| Avalon 101 | mesma estrutura | 1.598,00 | 15,82 | 2.663,33 | DISPONÍVEL | |
| Avalon Dourado 101 | mesma estrutura | 2.229,90 | 22,08 | 3.716,50 | DISPONÍVEL | |
| Berna 101 | 12 facas, garfos e colheres de mesa; 12 de sobremesa (facas, garfos, colheres); 12 colheres de chá; 12 colheres de café; garfo de salada etc. Texto: "pronto para servir até 12 pessoas" | 1.698,00 | 16,81 | 2.830,00 | DISPONÍVEL | |
| Avalon Dourado 130 | 12 de mesa, sobremesa, chá e café; 12 facas, garfos de peixe; espátula de peixe; concha de molho; faca e garfo de assado; salada, arroz, açúcar | 2.769,90 | 21,31 | 4.616,50 | DISPONÍVEL (único 130 disponível) | |
| Avalon 130 | mesma linha | 1.749,00 | — | 2.915,00 | ESGOTADO | |
| Berna 130 | "pronto para servir até 12 pessoas" | 2.149,00 | — | 3.581,67 | ESGOTADO | |
| Pisa 130 | — | 1.699,00 | — | 2.831,67 | ESGOTADO | |
| Firenze 101 (sem cor) | 12 de cada, mesma estrutura | 1.099,00 | — | 1.831,67 | ESGOTADO | |
| Pisa 101 | — | 1.299,00 | — | 2.165,00 | ESGOTADO | |
| Avalon 30 | 30 peças, composição no artigo de Natal (não relida aqui) | 383,90 | 12,80 | 639,83 | DISPONÍVEL | já no artigo Natal |
| Avalon Dourado 30 | não relida (ver Natal para o Avalon liso) | 549,00 | 18,30 | 915,00 | DISPONÍVEL | |
| Berna 30 | "pronto para servir até 6 pessoas" | 499,00 | 16,63 | 831,67 | DISPONÍVEL | |
| Berna Dourado 30 | "até 6 pessoas"; no artigo Natal: faca, garfo, garfo de sobremesa, colher de sopa, colher de chá | 539,90 | 18,00 | 899,83 | DISPONÍVEL | já no artigo Natal |
| Berna 48 | "até 6 pessoas" | 789,00 | — | 1.315,00 | ESGOTADO | |
| Viena 30 / Viena Dourado 30 / Pisa 30 / Pisa Dourado 30 | — | 223,90 / 389,00 / 354,90 / 459,90 | — | — | ESGOTADOS | |
| Bambu Natural 24 (cabo de resina) | 6 garfos de mesa; 6 facas de mesa; 6 colheres de sopa; 6 colheres de sobremesa | 199,90 e 249,90 | — | — | ESGOTADOS | Wolff, cabo de bambu |

- Texto de cuidados dos faqueiros lidos (Firenze Champanhe 101, Avalon Dourado 101 e 130): "Não é aconselhável seu uso em freezer, microondas, forno ou fogão. Pode ser lavado em máquina de lava-louças, desde que sejam seguidas as recomendações". Material: aço inox.
- Dourado: as linhas "Dourado" têm o nome no título; o texto não descreve a cor além disso.

Contagem de disponibilidade por número de peças (Wolff, título): 24 → 2 disponíveis; 30 → 4 disponíveis (Avalon 383,90; Avalon Dourado 549,00; Berna 499,00; Berna Dourado 539,90); 54 → 3; 101 → 7; 130 → 1 (Avalon Dourado 2.769,90).

## 4. Travessas e assadeiras Le Creuset (vendor "Le Creuset", 78 travessas)

Heritage cerâmica, sem tampa, disponíveis em 20/11 (preço de venda; "de" entre parênteses quando há):

| Formato | Cor e preço |
|---|---|
| Retangular 19 cm | Bleu Riviera 349,00; Vermelha 349,00 |
| Retangular 26 cm | Nectar 317,40 (de 529,00); Rose Quartz 370,30 (de 529,00); Shell Pink 370,30 (de 529,00); Branco 529,00; Flint 529,00; Meringue 529,00; Cotton 529,00 |
| Retangular 32 cm | Mist Grey 496,30 (de 709,00); Azul Caribe 496,30 (de 709,00); Nectar 496,30 (de 709,00); Branco 709,00; Shell Pink 709,00; Bleu Riviera 709,00 |
| Quadrada 23 cm | Meringue 258,30 (de 369,00); Bleu Riviera 399,00 |
| Canelada 28 cm | Bleu Riviera 370,30 (de 529,00) |
| Redonda Ruffle 36 cm | Shell Pink 517,30 (de 739,00); Branca 517,30 (de 739,00) |
| Clássica retangular 25 cm | Azure 363,30 (de 519,00) |
| Conjunto 2 retangulares Classic | Meringue 776,30 (de 1.109,00); Marine 776,30 |
| Signature com alças, vermelha 33 cm | 1.869,00 |
| Signature com alças, laranja 37 cm | 2.239,00 |

Com tampa: 15 itens, TODOS esgotados (nenhuma travessa com tampa disponível em 20/11): retangular com tampa 32 cm (Branco, Vermelha, Laranja; Bleu Riviera 33 cm; Clássica Vermelha 32 cm), tampa + prato Bleu Riviera 33 cm 3 L (961,00), oval para peixe com tampa Heritage 34 cm (Azure, Vermelha, Branca; 1.172,00 cada), oval com tampa Heritage 3,8 L (Vermelha, Artichaut, Azure; 1.057,00 cada), quadrada com tampa San Fran Foret 2,9 L (899,00), retangular com tampa San Fran Foret 31 cm (1.153,00), abóbora Halloween 23 cm (1.089,00).

Esgotadas sem tampa (amostra): redonda para torta Heritage 23 cm (Bleu Riviera, Thyme, Rhone; 429,00), retangular Heritage 19 cm Thyme/Rhone/Meringue/Laranja/Cotton/Shell Pink/Vermelha, retangular Heritage 32 cm Vermelha/Laranja/Artichaut/Meringue/Cotton, conjunto 3 Heritage Thyme/Foret/Bleu Riviera (1.297,00), Bistro Boat 400 ml (219,00 cada, cores várias).

Texto dos cuidados (ficha, a loja informa):
- Heritage retangular, quadrada e redonda (ex.: Mist Grey 32, Bleu Riviera 19, Meringue 23): "Seguro para freezer, forno, microondas, grelha, máquina de lavar louça". A frase de abertura: "vai lindamente do forno à mesa".
- Heritage com tampa e oval de peixe (esgotadas): "Seguro para forno, microondas, congelador e máquina de lavar louça".
- Oval Heritage 3,8 L com tampa (esgotada): "pode ser utilizada no forno (até 260°C), micro-ondas, geladeira e congelador".
- Signature Vermelha 33 cm: "forno seguro até 260°C" e "Seguro para lava-louças".
- Signature (alças): texto de uso "otimizado para assar no forno... alças largas".
- Bistro Boat 400 ml (esgotada): forno, micro-ondas, congelador; "Lava Louças, Lavagem a Mão".
- Heritage Thyme 19 (esgotada): ficha traz "Fonte de Calor: Forno, Microondas" e "Material: Cerâmica".
- Temperatura máxima do forno: não aparece nas fichas Heritage retangulares lidas. Conferir na redação antes de escrever número.
- Material: o título e o texto descrevem "Cerâmica"; "Heritage" aparece no nome da linha.
- Não há informação de capacidade em litros nas fichas Heritage retangulares lidas.

## 5. Mesa posta de Ano Novo e o que a loja tem em dourado, prata e branco

- Tag ou título de Ano Novo: nenhum produto com "ano novo", "réveillon" ou "reveillon" em título, handle ou tag. A busca por "ano novo" ou "2027" devolveu 65 itens; os 10 primeiros são da tag `verao-lets-2027` (melamina de verão). Não há etiqueta de Ano Novo.
- Tag `natal-lets-2026`: 194 produtos, 125 com estoque.
- Louça em dourado com estoque (aro ou filete):
  - Alleanza Donatella Filete Ouro, rasos 6 peças 29 cm: 554,90 (DISPONÍVEL); fundos 6 peças 25 cm: 532,90 (DISPONÍVEL); sobremesa 6 peças 21 cm: 519,90 (PRÉ-VENDA).
  - Alleanza Sweet Bird Filete Ouro, fundos 6 peças 25 cm: 532,90 (DISPONÍVEL); rasos 29 cm e sobremesa: PRÉ-VENDA.
  - Alleanza Adelaide Relevo Filete Ouro, sobremesa 6 peças 21 cm: 467,00 (DISPONÍVEL).
  - Alleanza Classic Christmas Filete Dourado, sobremesa 6 peças 21 cm (linha Natal): 519,90 (DISPONÍVEL).
- Louça branca ou clara com estoque:
  - Scalla Bolinha Off White, sobremesa 6 peças 20 cm: 209,90 (DISPONÍVEL). Rasos e fundos brancos do mesmo padrão não apareceram em estoque na busca.
  - Scalla Bege com filete amassado, rasos 6 peças 27 cm: 237,00; fundos 6 peças 22 cm: 213,00 (DISPONÍVEL). Bege, não branco.
- Aparelho completo em estoque (6 pessoas) com aro ou cor: Grecco 42 verde com filete dourado: 1.349,00 (DISPONÍVEL); Grecco 42 azul com filete dourado: 1.164,00 (DISPONÍVEL); L'Hermitage Très Classique 42 borda prateada azul: 1.288,00 (PRÉ-VENDA). Porto Brasil 30 disponíveis são azul, petróleo e latte, pré-venda.
- Faqueiros dourados ou inox com estoque: Wolff Firenze Dourado 24: 369,90; Wolff Avalon Dourado 30: 549,00; Wolff Berna Dourado 30: 539,90 (já no Natal); Wolff Firenze Dourado 54: 829,00; Wolff Viena Dourado 101: 1.499,00; Wolff Firenze Dourado 101: 1.589,00; Wolff Avalon Dourado 130: 2.769,90; Wolff talheres 6 peças aço dourado Bambu Natural: 419,00 (DISPONÍVEL).
- Taças e copos: Bohemia Angela cristal com borda dourada, jogo 6: 884,90 (DISPONÍVEL); Wolff Lines vidro com borda dourada, jogo 2: 46,90 (DISPONÍVEL; 3 jogos para 6); Bohemia Crex Optic cristal ecológico, jogo 6: 144,90 (DISPONÍVEL; título diz "vinho branco").
- Sousplat: Wolff Cristal Thin Edge fio ouro 33 cm: 77,90 (DISPONÍVEL; já no Natal, faixa 2); Scalla Christmas Balls verde e ouro 194,90 (Natal).
- Centro e velas: centro de mesa cerâmica branco pássaros 41 cm: 789,00 (DISPONÍVEL); centro prata Classic St. James 3.099,00 (DISPONÍVEL); velas douradas BTC Decor de 76,00 a 108,00 (DISPONÍVEL).
- Lacuna: não há aparelho de jantar branco de 6 pessoas em estoque. Wolff Maldivas 42 branco está esgotado; Alleanza Coup Vanilla 30 e Valência 30 estão esgotados.

## 6. Autocompletar (dado pelo Bruno em 20/11; não refeito)

- "aparelho de jantar porto brasil": 30 peças, 20 peças, 42 peças, roma 42 peças, azul, branco, bio latte, "cerâmica 30 peças orgânico petroleum azul". "aparelho de jantar 20 ou 30 peças" existe. "aparelho de jantar": 30, 20, 42, 16, 12, 24 e 40 peças.
- "faqueiro wolff": 30 peças, viena, 101 peças, berna, viena 54 peças, firenze, berna 30 peças, dourado. "faqueiro 101 peças wolff", "faqueiro avalon wolff 101 peças", "faqueiro 130 peças wolff". "faqueiro quantas peças": nada.
- "mesa posta ano novo": 2026, simples, 2027, dourado, prata, pinterest, azul. "mesa posta cores": neutras, combinação de cores, duas cores, "com pratos de cores diferentes". "paleta de cores mesa posta" existe.
- "travessa le creuset": com tampa, peixe, 26 cm, 32 cm, 19cm, azul, branca, azure, "pode ir no forno".

## 7. Divergências com o briefing do Bruno (20/11)

1. **L4, Porto Brasil de 20 e 42:** confirmado que não existem no catálogo de hoje. Os Porto de 30 são 11 itens, 3 disponíveis (pré-venda). O de 16 é o único que não é 30 (esgotado). Os 42 são de L'Hermitage e Wolff, não Porto Brasil.
2. **L6, "30 e 130 esgotados":** não confere. Há 4 faqueiros Wolff de 30 disponíveis e 1 de 130 disponível (Avalon Dourado, 2.769,90). Esgotados de 130: Avalon liso, Berna, Pisa. Os 24, 54 e 101 disponíveis conferem.
3. **L6, faqueiro de 30 já está no artigo de Natal:** `mesa-posta-natal-o-que-precisa-quanto-custa` traz o Avalon (383,90) e o Berna Dourado (539,90) com a composição de cada um. O L6 deve linkar, não repetir.
4. **L4, Porto 30 já está no artigo de Natal (faixa 3) e na Black Friday** (`black-friday-letseatit`, "a partir de R$ 756,84" em outubro). O L4 linka, não repete.
5. **Firenze 24 com handle "viena"**: o título é Firenze, o handle diz viena. Conferir o link na redação.
6. **Bio Latte 16 com handle "30 peças"**: idem.
7. **MAUAD soma com Pix:** o dossiê diz que a decisão de 08/10 é de soma com o desconto do Pix; o teste de 18/11 não testou essa soma (o próprio dossiê registra "a soma com o Pix não foram testadas"). O texto não deve afirmar a soma como testada.
8. **Dossiê sem seção "Perguntas reais":** o banco de perguntas exigido pelo Job 1 não existe em `01_Parceiros/Lets-Eat-It.md`. A fonte desta rodada é o autocompletar. Ver a seção de perguntas nos briefings.

## 8. Artigos já no ar (para não repetir)

- `porto-brasil-e-boa`: "é cerâmica, não porcelana"; o que a ficha libera no forno, micro-ondas, lava-louças e freezer; Oxford; garantia e Reclame Aqui.
- `mesa-posta-natal-o-que-precisa-quanto-custa`: três faixas para seis pessoas (básica, intermediária, completa). Faixa 1: Faqueiro Avalon, taças Bohemia Magnum, centro Duna, velas, anéis. Faixa 2: Faqueiro Berna Dourado, sousplat fio ouro, anéis Floratta, taças de champanhe e vinho. Faixa 3: aparelho Porto Brasil 30, Laguiole Verde, centro Crescens, Voluspa. Totais do artigo (sem frete, sem e com MAUAD): 1.019,90 / 968,91; 2.138,32 / 2.031,40; 5.250,69 / 4.988,16. Os preços são de antes de hoje; não relidos.
- `mesa-posta-dia-a-dia-o-que-comprar`: mesa do dia a dia para 2 pessoas, faixas econômica e intermediária; seção "Mesa de Natal".
- `faqueiro-laguiole-la-maison-qual-escolher`: 12, 18 e 30 peças de Laguiole; cores com estoque; "por pessoa, para 6". O molde da pauta de faqueiro.
- `le-creuset-qual-tamanho-escolher`: panelas redondas Signature 20 e 24 cm, caçarola buffet, marmita. Não trata de travessa.
- `le-creuset-vale-a-pena`: ferro fundido, indução, forno, lava-louças e micro-ondas das panelas. Não trata de travessa de cerâmica.
- `black-friday-letseatit`: Porto 30 a partir de R$ 756,84 (preço de outubro); Le Creuset Signature 25% OFF; faqueiros e taças na BF.
- `lets-eat-it-e-boa`: seção "Mesa posta, presentes e faqueiro" e "Le Creuset na Let's Eat It".

## 9. Pendências

- Nenhuma leitura de navegador. Tudo por `products.json`.
- Texto de cuidados da Grecco 42 (lava-louças) cortado na leitura: ler o `body_html` completo na redação.
- Temperatura de forno das travessas Heritage retangulares: não encontrada no texto lido.
- Composição do Avalon Dourado 30: não relida (o Avalon liso está no artigo de Natal).
- Releitura do estoque e dos preços no dia de publicar (todos os briefings).
