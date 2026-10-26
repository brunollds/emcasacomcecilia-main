# Revisão Job 3 (Fable, 26/10/2026): `le-creuset-qual-tamanho-escolher` (L1)

Somente leitura. Fontes conferidas: `L1.md`; `le-creuset-col.json` + `le-creuset-col-p2.json` (500 produtos, 26/10); `lc-buffet.html` (oficial); o briefing (Decisões do Bruno), `fatos-2610.md`, `revisao-fable-2610.md`; `black-friday-letseatit.json` e `le-creuset-vale-a-pena.json`; Job 3 e REGRAS-GLOBAIS seção 6. Sem requisição à internet.

## O que bateu (conferido no JSON cru)

- Capacidades da Redonda Signature: 16 cm 1,3 L; 18 cm 1,8 L; 20 cm 2,4 L; 22 cm 3,3 L; 24 cm 4,2 L; 26 cm 5,3 L; 28 cm 6,7 L; 30 cm 8,4 L; 34 cm 12 L. Loja sem 14 e 32 cm. Acréscimos 0,5 a 1,4 L até o 28 cm e 1,7 L do 28 ao 30 cm: certos.
- Cores disponíveis por tamanho (contagem de `available` nos handles da Redonda Signature, excluindo Tradition, BIS e Funda): 16: 3/4; 18: 0/6; 20: 5/8; 22: 4/8; 24: 3/6; 26: 4/7; 28: 2/6; 30: 1/3; 34: 1/1. Todas certas.
- 20 cm: disponíveis Azure, Cool Mint, Berry (R$ 2.329) e Laranja, Vermelha (R$ 1.979,65, de 2.329); esgotadas Cotton, Rhône, Chambray. 24 cm: disponíveis Cotton, Berry (R$ 2.949) e Vermelha (R$ 2.506,65); esgotadas Azure, Rhône, Laranja. Certo.
- Contas refeitas: 4,2 − 2,4 = 1,8 L (+75%); 2.949 − 2.329 = 620 (+26,6%); 2.329/2,4 = 970,4; 2.949/4,2 = 702,1 (−27,6%, "28%" ok); 1.979,65/2,4 = 824,9; 2.506,65/4,2 = 596,8 (−27,7%, "28%" ok); 2.506,65 − 1.979,65 = 527,00 (+26,6%); 2.506,65 − 2.329 = 177,65; 2.949 × 0,95 = 2.801,55; × 0,95 = 2.661,47. Todas certas. Ordem cupom → Pix igual ao guia de Black Friday.
- Buffet: 26 cm 2,2 L (Petal Branco e Sea Salt disponíveis a R$ 2.949; Vermelha e Laranja disponíveis a R$ 2.345,15, de 2.759); 30 cm 3,5 L (Azure R$ 2.999 e Laranja R$ 2.549,15 disponíveis); 32 cm 4 L Chambray esgotada. Oficial 22 a 32 cm. Texto da loja ("formato amplo e baixo", "tão desejável para servir quanto indispensável para cozinhar") e da marca ("leve-a do forno para a mesa como uma elegante peça de servir") conferidos.
- Redonda Funda 24 cm 5,2 L Azure esgotada; Oval 31 cm 6,3 L Laranja R$ 2.889,15; Oval 35 cm 8 L Vermelha R$ 3.433,15 disponível; Risotto 30 cm 6,2 L (texto da ficha); Arroz 18 cm 2 L e 20 cm 2,8 L; Marmita 22, 24, 26, 28, 32 cm. Certos.
- Sem porção disfarçada (nada de pessoas, família, casal); sem "erro de ficha" ou "divergência"; sem "testamos"; MAUAD uma vez, sem negrito; `/cupons/letseatit` uma vez; `black-friday-letseatit` e `le-creuset-vale-a-pena` existem em `content/reviews/`; `le-creuset-original-como-saber` sai junto. Sem concorrente, sem cupom de terceiros. Coerente com os dois publicados (BF: mesma tabela de 20/24/26 e o R$ 2.101,92 só na 20 cm; vale a pena: indução, 20 e 28 cm).
- Resposta rápida: 1 parágrafo, 2 frases, 51 palavras, sem link e sem negrito; tudo o que diz está nos capítulos. Veredito em capítulo próprio ("Qual escolher"), antes do FAQ.

## Achados

### ALTA

**A1. "A loja não informa os litros" da Marmita é falso para o 22 cm.**
- Trecho: `- **Marmita:** de 22 a 32 cm. A loja não informa os litros.`
- Fonte: `panela-marmita-signature-laranja-22cm-le-creuset` e `panela-le-creuset-marmita-signature-vermelha-22cm` trazem na ficha "Dimensões: 13,2x22x22cm Capacidade: 2.2L". Os de 24, 26, 28 e 32 cm não trazem.
- Correção: `- **Marmita:** de 22 a 32 cm. A loja só informa os litros do 22 cm: 2,2 L.`

### MÉDIA

**M1. A resposta rápida não dá o veredito; só manda decidir "pelo litro".** Regra (REGRAS-GLOBAIS seção 6): no guia de escolha, "o veredito em uma frase e o que pesa na escolha". Hoje ela compara e aponta, mas não diz qual levar; o veredito (até 2 L → 20 cm; acima → 24 cm) está só no capítulo final.
- Trecho: `Decida pelo litro: a 20 cm tem 2,4 L e a 24 cm tem 4,2 L, 75% a mais por cerca de 27% a mais no preço cheio. O que muda a escolha é a medida da panela que você já usa (veja abaixo); para servir à mesa, vale o buffet.`
- Correção (57 palavras, 2 frases): `Para receita de até 2 L, a 20 cm (2,4 L) basta; acima disso, a 24 cm (4,2 L), que custa 27% a mais no preço cheio e sai 28% mais barata por litro. O que muda a escolha é o volume da panela que você já usa, medido abaixo; para servir à mesa, vale o buffet.`

**M2. Buffet 26 cm: dois "preços cheios" e o leitor fica com o errado.** As Petal Branco e Sea Salt custam R$ 2.949; o "de R$ 2.759" é o cheio só da Vermelha e da Laranja. Escrito assim, o leitor lê Petal = R$ 2.759.
- Trecho: `- 26 cm, 2,2 L, nas cores Petal Branco e Sea Salt no preço cheio, e Vermelha e Laranja a R$ 2.345,15 (de R$ 2.759, com 15%).`
- Fonte: `cacarola-buffet-signature-petal-branco-26cm-2-2l-le-creuset` e `...petal-sea-salt...` a 2949.00, `available: true`; `cacarola-buffet-signature-26cm-2-2l-le-creuset` (Vermelha) e `...laranja-26cm...` a 2345.15, `compare_at_price` 2759.00.
- Correção: `- 26 cm, 2,2 L: Petal Branco e Sea Salt a R$ 2.949, e Vermelha e Laranja a R$ 2.345,15 (de R$ 2.759, com 15%).`

**M3. Uso do buffet além do que a marca e a loja dizem.** "Espalhar a receita em vez de empilhá-la" é leitura nossa do formato, não texto das fontes; a decisão 5 do Bruno limita o uso ao que a marca descreve.
- Trecho: `A buffet ganha em diâmetro e perde em volume: é uma panela para quem prefere espalhar a receita em vez de empilhá-la. Se o que você precisa é de litros, a redonda leva mais.`
- Fonte: ficha da loja (Vermelha 26 cm): "formato amplo e baixo ... transita com naturalidade entre o fogão, o forno e a mesa"; oficial: "do forno para a mesa como uma elegante peça de servir".
- Correção: `A buffet ganha em diâmetro e perde em volume. A loja a põe entre o fogão, o forno e a mesa; a marca, do forno à mesa. Se o que você precisa é de litros, a redonda leva mais.`

**M4. Frase que confunde no fim de "Como saber de quantos litros".** "Entre os dois" (quais?) e "o formato conta mais que o diâmetro" não ligam com o que vem antes (a conta de litros) nem com o que vem depois (buffet = servir). O leitor fica sem saber o que fazer se a medida cair entre 2,4 e 4,2 L.
- Trecho: `Se a sua medida cair entre os dois, o tamanho de baixo costuma ficar apertado nas receitas cheias, e o de cima sobra nas pequenas. É aí que o formato conta mais que o diâmetro. Quem quer levar a panela do forno direto para a mesa como peça de servir não precisa dessa conta: o caminho é a caçarola buffet, tratada na próxima seção.`
- Correção: `Se a sua medida cair entre 2,4 e 4,2 L, a 20 cm fica apertada nas receitas cheias e a 24 cm sobra nas pequenas: entre as duas, a 24 cm é a que não limita a receita. Quem quer levar a panela do forno direto para a mesa como peça de servir não precisa dessa conta: o caminho é a caçarola buffet, tratada na próxima seção.`

**M5. Regra do veredito deixa faixa aberta e desencontra o passo 3.** "Acima de 3,5 L: a 26 cm (5,3 L)" cobre, no texto, de 3,6 a 12 L; uma receita de 6 L não cabe na 26 cm. E o passo 3 fala em "cabe nos 2,4 L com folga" enquanto o veredito diz "até 2 L": a mesma regra com dois números.
- Trecho 1: `- **Receita acima de 3,5 L:** a 26 cm, com 5,3 L.`
- Correção 1: `- **Receita de 3,5 a 4,5 L:** a 26 cm, com 5,3 L. Acima disso, a tabela do início: 28 cm (6,7 L) ou 30 cm (8,4 L).`
- Trecho 2: `3. Compare o resultado com 2,4 L (20 cm) e com 4,2 L (24 cm). Se a sua conta cabe nos 2,4 L com folga, a 20 cm resolve. Se passa disso, a 24 cm é o tamanho que cobre.`
- Correção 2: `3. Compare o resultado com 2,4 L (20 cm) e com 4,2 L (24 cm). Até 2 L, a 20 cm resolve com folga. Acima disso, a 24 cm é o tamanho que cobre.`

**M6. "Litros pela ficha da loja" não vale para três formatos.** Oval 35 cm (8 L), Para Arroz (2 L e 2,8 L) têm os litros só no título; o Risotto tem no título e no texto corrido, não no bloco de ficha.
- Trecho: `Uma linha por formato, com tamanho e litros pela ficha da loja em 26/10/2026.`
- Fonte: `panela-le-creuset-oval-signature-vermelha-8l-35cm`, `...para-arroz-...-2l-18cm`, `...sem-tampa-interna-berry-2-8l-20cm`: `body_html` sem "Capacidade:"; Risotto: "Signature Azure Blue 6,2L 30cm" no texto.
- Correção: `Uma linha por formato, com tamanho e litros pelo título e pela ficha da loja em 26/10/2026.`

### BAIXA

**B1. Oval 31 cm incompleta.** Vermelha também a R$ 2.889,15 e Azure a R$ 3.399, as duas disponíveis.
- Trecho: `A Laranja saía a R$ 2.889,15 com o desconto de 15%.`
- Correção: `Laranja e Vermelha saíam a R$ 2.889,15 com o desconto de 15%; a Azure, a R$ 3.399.`

**B2. Repetição "porções" (linhas 9 e 48).**
- Trecho 1: `A tabela usa litros porque nem a marca nem a loja publicam porções por tamanho. O litro é o único número que as duas fontes dão.`
- Trecho 2: `Nem a marca nem a loja dizem quantas porções cabem em cada tamanho, então o número que decide é o litro.`
- Correção: manter o trecho 1; abrir a seção de método com `O número que decide é o litro, e o jeito mais seguro de chegar nele é medir o que você já usa.`

**B3. "Preço e estoque mudam, confira" quatro vezes** (linhas 23, 41, 67, 119).
- Correção: manter na tabela (linha 23) e na nota de transparência; cortar `Preço e estoque são de 26/10/2026 e mudam; confira no dia da compra.` (linha 41) e `Os preços e as cores mudam, então confira a página da loja no dia da compra.` (linha 67, deixar só `A marca informa a linha de 22 a 32 cm.`).

**B4. Os mesmos números cinco vezes** (2,4/4,2, 2.329/2.949, 970/702 nas linhas 28, 34, 91, 95 e no FAQ). O "Os números que sustentam" do veredito é regra; a linha 91 sobra.
- Trecho: `Pelo preço, a 24 cm sai mais barata por litro no preço cheio de 26/10: R$ 702 contra R$ 970 da 20 cm, conta nossa. Quem não precisa dos litros a mais não ganha nada com essa conta, e a 20 cm custa R$ 620 a menos.`
- Correção: `Pelo preço, a 24 cm sai mais barata por litro; quem não precisa dos litros a mais não ganha nada com essa conta, e a 20 cm custa R$ 620 a menos.`

**B5. "Não do tamanho da cozinha"** não vem de lugar nenhum do texto.
- Trecho: `A escolha mais segura parte do volume da receita que você mais faz, não do tamanho da cozinha.`
- Correção: `A escolha mais segura parte do volume da receita que você mais faz.`

**B6. `le-creuset-vale-a-pena` linkado três vezes** (Onde comprar, FAQ forno, FAQ indução). O briefing conta três links internos ao todo.
- Correção: manter o link em "Onde comprar" e no FAQ de indução; no FAQ do forno, `Os cuidados de forno da linha estão no artigo sobre indução e forno, acima.` sem link.

**B7. FAQ do forno pode citar a loja também**, que é mais direta que a marca.
- Trecho: `A marca a descreve para ir do forno para a mesa como peça de servir.`
- Correção: `A loja a põe entre o fogão, o forno e a mesa, e a marca a descreve para ir do forno para a mesa como peça de servir.`

**B8. "Rende menos" sugere rendimento de receita; é capacidade.**
- Trecho: `Ela serve a esse uso, mas rende menos que a redonda: 2,2 L no 26 cm e 3,5 L no 30 cm.`
- Correção: `Ela serve a esse uso, mas leva menos que a redonda: 2,2 L no 26 cm e 3,5 L no 30 cm.`

**B9. Imagem 3 pede uma foto que a loja não tem.** Não há foto de produto com a buffet ao lado da redonda; a legenda já diz "se houver".
- Trecho: `[IMAGEM: foto de produto da caçarola buffet de 26 cm (Petal Branco) ou de 30 cm, mostrando a altura baixa ao lado da redonda de 24 cm, se houver foto na loja | ...]`
- Correção: `[IMAGEM: montagem com a foto de produto da buffet de 26 cm (Petal Branco ou Vermelha) ao lado da redonda de 24 cm, na mesma escala, para mostrar a altura baixa | fotos de produto da Let's Eat It, composição nova | Caçarola buffet Le Creuset de 26 cm ao lado da Panela Redonda Signature de 24 cm | Buffet 26 cm (2,2 L): mais larga e mais baixa que a redonda de 24 cm (4,2 L)]`

## Plano de imagens (item 7)

Três marcações no corpo (quadro de litros, montagem 20 × 24, buffet): o mínimo está cumprido com folga e nenhuma repete a capa Cotton. Onde caberia outra:
- "Como saber de quantos litros você precisa": foto própria de panela com copo medidor (ou arte do passo a passo); é a seção mais longa sem imagem e a única com conteúdo nosso.
- "Outros formatos": foto de produto da Marmita (26 cm Vermelha/Laranja ou Rhône, disponíveis) ou da Oval 35 cm Vermelha, que o briefing (seção 5) já pedia para mostrar a diferença de altura da marmita.

## Resumo

Nenhum número errado nas contas e no 20 × 24; o único fato errado é a Marmita (A1). Os MÉDIA são de formato (veredito fora da resposta rápida), de preço ambíguo no buffet (M2), de uso do buffet além das fontes (M3), de duas frases que confundem (M4, M5) e de uma atribuição à ficha que não vale para três formatos (M6). Aprovar com A1 e M1 a M6 corrigidos.
