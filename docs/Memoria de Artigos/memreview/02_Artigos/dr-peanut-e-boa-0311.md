---
titulo_provisorio: "Dr. Peanut é boa? A pasta de amendoim, os snacks, o whey e o que vale comprar da marca"
seo_title: "Dr. Peanut é boa? Pasta de amendoim, snacks e whey pelo rótulo"
slug_sugerido: "dr-peanut-e-boa"
parceiro: "[[Dr-Peanut]]"
affiliate: "dr-peanut"
coupon: "DREMCASACOMCECILIA"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia de Marca"
status: "publicado"
responsavel: "Claude (Jobs 3 a 6)"
proxima_acao: "reler preços na revisão mensal de dezembro de 2026"
bloqueado_por: "-"
data_criacao: "2026-11-03"
pauta: "Série \"<Marca> é boa? Vale a pena?\", lote 2 (Mais Mu, Dr. Peanut, Belive e Simple Organic), decisão do Bruno de 03/11/2026"
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
---

# Briefing: Dr. Peanut é boa?

## Buscas (autocompletar do Google, 03/11/2026)
O Bruno liberou o lote sem o Trends (03/11). Se o arquivo vier, a ordem dos capítulos segue o arquivo.
- "dr peanut é boa": **"pasta de amendoim dr peanut é boa"**, "é boa para dieta", "barra de proteína dr peanut é
  boa", e por sabor (pistache, avelã, brownie, Buenissimo, Chocotine, Banoffee).
- "dr peanut é bom": "é bom para dieta", "é bom para emagrecer", **"whey dr peanut é bom"** (e por sabor: avelã,
  Buenissimo, paçoca, Bombom Italiano).
- "dr peanut melhor sabor", "melhor pasta de amendoim", "qual o melhor", "600g", "250g", "zero lactose".

Leitura: a busca é sobre a pasta e o sabor. O whey vem em segundo e as barras em terceiro. "Para dieta" e "para
emagrecer" pedem uma resposta de saúde que o site não dá (ver as regras).

## Estrutura sugerida
1. Resposta rápida (2 a 3 frases, sem preço e sem dizer que é saudável).
2. O que a Dr. Peanut vende: pastas de amendoim (250 g e 600 g), snacks (alfajores, Doctor Bar, Doctor Wafer), whey
   (o "100% Whey Dr. Peanut - Max Titanium"), combos e assinatura (menu lido no Chrome em 03/11). Um parágrafo sobre o
   grupo (Supley, o mesmo da Probiótica e da Max Titanium), como no dossiê.
3. **A pasta de amendoim é boa?** O que o rótulo traz: ingredientes, proteína, açúcares e gordura por porção, e o preço
   por 100 g nos dois tamanhos. Não repetir a tabela dos 12 sabores: um resumo e o link para `dr-peanut-melhor-sabor`.
   Tamanho e combos: link para `dr-peanut-qual-tamanho-compensa`.
4. **"É boa para dieta?"** Uma seção curta que responde sem dizer sim ou não: mostra os números do rótulo que pesam
   nessa conta (kcal, açúcares adicionados, gordura saturada por porção), manda para nutricionista e linka o
   `dr-peanut-e-saudavel` (id 521), sem repetir o que ele já diz.
5. **O whey da Dr. Peanut é bom?** Proteína por dose da tabela nutricional (imagem no `drpeanut.vteximg.com.br`), tipo
   de proteína, sabores e preço por 100 g de proteína. Diz que é feito com a Max Titanium (nome do produto), com o link
   e o código da Dr. Peanut.
6. **Doctor Bar, alfajor e Doctor Wafer.** Proteína, açúcar e preço por unidade; link `snacks-dr-peanut-qual-escolher`.
   Nos alfajores, a loja não publica ingredientes nem alérgicos: o texto diz isso e não afirma nada da composição.
7. **Quanto custa com o cupom, e onde comprar:** DREMCASACOMCECILIA (10%), que soma com as promoções e entra na
   assinatura, somado ao desconto progressivo (teste do Bruno de 24/10). O frete grátis conta o total com o cupom.
8. **A Dr. Peanut é confiável?** Um parágrafo e os links para `dr-peanut-e-confiavel` e
   `dr-peanut-reclame-aqui-nota-reputacao`.
9. Quadro "Leve se / Passe se".
10. Perguntas frequentes: "A pasta de amendoim Dr. Peanut é boa?", "Qual o melhor sabor?", "O whey da Dr. Peanut é
    bom?", "Dr. Peanut é boa para dieta?" (mesma resposta da seção 4, curta), "Tem pasta zero lactose?" (pelo rótulo).

## Regras
- **Molde:** o `insider-vale-a-pena` reformado e o `probiotica-e-boa` (lote 1): artigo da marca, um capítulo por linha,
  quadro sem nota e sem preço.
- **Saúde (decisão do Bruno de 20/10/2026):** nenhum texto diz que um produto é ou não é saudável, que engorda,
  emagrece ou faz mal. Só o que o rótulo traz e "procure um nutricionista". Sem Anvisa e sem repetir o marketing da
  marca. Vale para o título, o quadro, o FAQ e a resposta rápida.
- **Nenhum concorrente.** O `dr-peanut-ou-la-ganexa` fica só nos `relatedArticles`.
- **Não repetir:** sabores ficam no 446, tamanhos no 604, snacks no 603, saúde no 521. Aqui vai o resumo da marca e os
  links.
- **Leitura do site:** a loja devolve 429 a leitura direta e não tem a API de catálogo da VTEX aberta. Leia no Chrome,
  uma página por vez. Preços relidos no dia, com a data só na legenda da tabela. Preço de Black Friday fica no
  `black-friday-dr-peanut`.
- **Catraca:** resposta rápida sem preço, no máximo 2 datas no corpo, nenhuma em título de seção, legenda de foto ou
  FAQ. `description` com até 180 caracteres.
- **Imagens:** capa pelo Job 6 (`covers:render` e a folha de aprovação do Bruno), só com produto da marca. Ao menos uma
  foto oficial no corpo, numa seção comum.
- `somente-pt`, `isNew: true`, link de cada produto na primeira célula das tabelas.
- **Gates:** `node scripts/content/build-index.mjs` com os gerados que mudarem commitados, `validate:content`,
  `test:article-d2`, `typecheck` e o Gate 1 verde. Squash sem deploy.

## Rascunho (Job 2, 03/11/2026)

### Metadados

- **title:** Dr. Peanut é boa? A pasta de amendoim, o whey, os snacks e o que vale comprar da marca
- **seoTitle:** Dr. Peanut é boa? Pasta, whey e snacks pelo rótulo (50 caracteres)
- **description** (167 caracteres): Dr. Peanut é boa? Pelo rótulo: o que a pasta de amendoim, o whey e os snacks trazem, o preço por 100 g, o cupom DREMCASACOMCECILIA de 10% e para quem a marca compensa.
- **metaDescription:** Dr. Peanut é boa? A pasta de amendoim, o whey e os snacks pelo rótulo, o preço por 100 g, o cupom DREMCASACOMCECILIA de 10% e para quem a marca compensa.
- **category:** guias-praticos-utilidade
- **reviewKind:** guia
- **type:** Guia de Marca
- **editorialNote:** Podemos receber comissão pelo cupom DREMCASACOMCECILIA. Ninguém da equipe usou os produtos: os dados são do rótulo e do site da marca.
- **cta:**
  - label: Ir para a Dr. Peanut
  - text: Entre no site da Dr. Peanut e digite o cupom DREMCASACOMCECILIA no carrinho: são 10% em todo o site, somados às promoções. Confira a linha do desconto antes de pagar.
  - url: https://www.drpeanut.com.br/ (sponsored)
- **decision:**
  - takeIf:
    - Você escolhe pasta de amendoim pelo rótulo: sem adição de açúcares, com a proteína e os polióis declarados por 100 g.
    - Você já compra a pasta e quer o whey na mesma loja, com um cupom que vale em todo o site e soma com as promoções.
    - Você compra pasta de 250 g todo mês: a assinatura com o cupom é o menor preço por 100 g dos potes pequenos.
  - skipIf:
    - Você precisa evitar lactose: as pastas, o whey, a Doctor Bar e o wafer declaram que contêm, e a loja não tem versão sem lactose.
    - Você precisa evitar glúten e quer o whey ou os snacks: só a pasta diz que não contém.
    - Você quer saber se cabe na sua dieta: o rótulo dá os números, e a resposta é do nutricionista.
- **relatedArticles:** dr-peanut-qual-tamanho-compensa, snacks-dr-peanut-qual-escolher, dr-peanut-e-confiavel, dr-peanut-reclame-aqui-nota-reputacao, cupom-dr-peanut-como-usar, dr-peanut-ou-la-ganexa (os 3 primeiros no JSON se o modelo ficar em 3; o comparativo só aqui, nunca no corpo)
- **Outros campos:** affiliate `dr-peanut`, coupon `DREMCASACOMCECILIA`, `isNew: true`, `modo_i18n: somente-pt`, `imageFit: contain`, `imageAspect: landscape`.

### Resposta rápida

Pelo rótulo, é: a pasta leva amendoim e proteína do soro do leite, sem adição de açúcares, e o whey entrega 20 g de proteína por dose. O que muda a escolha é a lactose em toda a linha e o glúten do whey e dos snacks; os capítulos abaixo mostram cada rótulo e qual formato compensa.

### O que a Dr. Peanut vende

A Dr. Peanut é a marca da pasta de amendoim: é por ela que a loja existe, e o whey e os snacks vêm em volta. O site se divide em três prateleiras:

- **Pastas de amendoim:** 12 sabores, em potes de 250 g e de 600 g, mais combos de 2 a 5 potes e a assinatura, que só tem potes de 250 g. O capítulo seguinte lê o rótulo.
- **Snacks:** a Doctor Bar, barra de proteína vendida só em display de 8, o alfajor e a Doctor Wafer, comparados mais abaixo.
- **Whey:** o "100% Whey Dr. Peanut - Max Titanium", pote de 900 g em 5 sabores.

Por trás da marca está a Body Food, fábrica de Curitiba que tem a Supley como sócia, o mesmo grupo da Probiótica e da Max Titanium. É daí que vem o nome duplo do whey: a página o apresenta como uma criação da Max Titanium em parceria com a Dr. Peanut, vendida na loja da Dr. Peanut.

*(imagem 1: pote de 600 g do Bueníssimo; ver o Plano de imagens)*

### A pasta de amendoim Dr. Peanut é boa?

Pelo rótulo, é uma pasta de amendoim com proteína do soro do leite e sem adição de açúcares, e o que decide entre os 12 sabores é a linha dos polióis, não o preço, que é o mesmo em todos. A lista de ingredientes se repete: amendoim, proteína concentrada do soro do leite, os polióis maltitol e xilitol e os edulcorantes sucralose e acessulfame de potássio; o Brownie e o Banoffee levam também glicosídeos de esteviol. Todos dizem que contêm lactose e que não contêm glúten. Os alérgicos trazem amendoim e derivados de leite em todos os sabores, e avelã, castanha-de-caju, pistache, ovo ou soja conforme o sabor.

Na colher de 15 g, a tabela traz de 2,5 a 3 g de proteína, de 0,7 a 1,5 g de açúcares totais, 0 g de açúcares adicionados e de 1,1 a 2 g de gordura saturada. Por 100 g, a proteína vai de 17 g a 20 g e os polióis, de 6,4 g a 20 g, e é essa linha que separa os sabores: o Brownie é o único com menos de 5 g de açúcares e menos de 7 g de polióis por 100 g, e o Cookies & Cream tem o menor açúcar e o maior poliol dos 12. A tabela sabor a sabor, com os alérgicos de cada um, está em [qual o melhor sabor da Dr. Peanut](/reviews/dr-peanut-melhor-sabor).

| Formato | Peso | Preço de lista | Por 100 g |
|---|---|---|---|
| [Pote de 250 g, Avelã](https://www.drpeanut.com.br/pasta-de-amendoim-sabor-avela/p) (sponsored) | 250 g | R$ 28,90 | R$ 11,56 |
| [Pote de 600 g, Bombom Italiano](https://www.drpeanut.com.br/pasta-de-amendoim-sabor-bombom-italiano/p) (sponsored) | 600 g | R$ 64,90 | R$ 10,82 |

*Legenda: Preço de lista no site, 03/11, igual em todos os sabores do mesmo tamanho.*

Conta nossa: pelo preço de lista e pelo peso do pote, o de 600 g sai cerca de 6% mais barato por 100 g que o de 250 g, e os combos de 2 a 5 potes e a assinatura baixam mais. A loja vende os dois potes com desconto em promoção, e o cupom entra em cima do preço do dia.

Serve para quem quer pasta de amendoim com proteína do soro e sem açúcar adicionado, e escolhe o sabor pelo poliol. Não escolha se você precisa evitar lactose ou quer pasta só de amendoim: a loja não vende versão sem lactose nem pasta de um ingrediente só.

### Dr. Peanut é boa para dieta?

Isso o rótulo não responde, e este texto também não: quem encaixa a pasta, o whey ou a barra no seu plano é o nutricionista. O que o rótulo dá são os números que entram nessa conversa. A colher de 15 g de pasta tem de 83 a 90 kcal; a porção de 40 g de whey, de 159 a 166 kcal; a Doctor Bar de 62 g, 261 kcal e 6,2 g de gordura saturada. Leve esses números, e a porção que você come de verdade, para a consulta.

O rótulo completo de cada produto, com adoçantes, polióis, lactose e glúten, está em [Dr. Peanut é saudável?](/reviews/dr-peanut-e-saudavel).

### O whey Dr. Peanut é bom?

Pelo rótulo, é um whey concentrado (WPC) com 20 g de proteína por dose, e o que decide é o aviso de glúten e lactose, não o sabor: os 5 custam o mesmo e têm a mesma proteína. A loja informa: a porção é de 40 g, dois dosadores, com 20 g de proteína e 4.405 mg de BCAA. A lista de ingredientes traz a proteína concentrada do soro, amendoim torrado e granulado, cacau, lecitina de soja e sucralose; a página diz "CONTÉM GLÚTEN", o produto contém lactose, e os alérgicos são amendoim, leite e soja, com "pode conter" trigo, centeio, cevada, aveia, castanhas e ovo.

O [pote de 900 g](https://www.drpeanut.com.br/whey-dr-peanut/p) (sponsored) custa R$ 224,39, e são 22 doses e meia: 450 g de proteína no pote, R$ 49,86 por 100 g de proteína e R$ 9,97 por dose. Os 5 sabores (Avelã, Bombom Italiano, Bueníssimo, Doce de Leite e Paçoca) mudam só em duas linhas, os açúcares totais, de 8,5 g a 11 g por dose, e o sódio da Paçoca, o dobro dos outros. A Paçoca é o único sabor que não existe na pasta.

Serve para quem quer um whey concentrado com gosto de pasta de amendoim e compra na mesma loja da pasta. Não escolha se você precisa evitar glúten ou lactose, nem se quer um isolado: a Dr. Peanut só tem esse whey.

*(imagem 2: pote do whey Avelã; ver o Plano de imagens)*

### Doctor Bar, alfajor e Doctor Wafer

Entre os três, só a Doctor Bar é snack de proteína; o alfajor e o wafer são o doce da linha. A barra traz 21 g por unidade, contra menos de 6 g dos outros dois.

| Snack | Porção | Proteína | Preço de lista da unidade |
|---|---|---|---|
| Doctor Bar Avelã | 62 g | 21 g | R$ 15,25 (display de 8 por R$ 122,03) |
| Alfajor Doce de Leite | 35 g | 4,7 g (de 4 a 4,7 g nos 5 sabores) | R$ 12,99 |
| Doctor Wafer Avelã | 25 g | 5 g (de 5 a 6 g nos 3 sabores) | R$ 11,46 |

*Legenda: Preço de lista no site, na mesma leitura da tabela das pastas. A Doctor Bar só se vende em display de 8.*

Por grama de proteína, a barra sai a R$ 0,73 e o alfajor passa de R$ 2,76: quem compra snack pela proteína fica na barra, quem quer um doce de 35 g fica no alfajor, e o wafer é o menor preço por unidade. A Doctor Bar Avelã e a Doctor Wafer Avelã dizem "CONTÉM GLÚTEN" e "CONTÉM LACTOSE"; o wafer é de farinha de trigo, e a barra leva maltitol, glicosídeos de esteviol e sucralose. O alfajor é o caso à parte: a loja publica só a tabela nutricional, em imagem, e não publica a lista de ingredientes nem o aviso de alérgicos, então este texto não diz o que ele leva. Quem tem restrição confere a embalagem antes de comer.

*(imagem 3: Doctor Bar Avelã; ver o Plano de imagens)*

### Quanto custa com o cupom e onde comprar

O DREMCASACOMCECILIA tira 10% de todo o site da Dr. Peanut, em todas as formas de pagamento, e soma com as promoções: no teste do checkout, o desconto entrou até no item que já estava com preço promocional. Entra também na assinatura, que só tem pastas de 250 g, com entrega mensal, bimestral ou trimestral e desconto progressivo de 4% com uma pasta a 15% com quatro ou mais; o cupom soma com esse desconto, com os 10% sobre o subtotal. Para quem compra pasta de 250 g todo mês, é o menor preço por 100 g dos potes pequenos.

O frete grátis conta o total já com o cupom: a partir de R$ 149,90 em São Paulo capital, no Sudeste e no Sul, e de R$ 199,90 no Centro-Oeste, no Nordeste e no Norte. Um pote de 600 g sozinho não chega; o pote de whey chega em qualquer região. A compra é no site oficial, drpeanut.com.br, e o código para copiar fica na página do [cupom Dr. Peanut](/cupons/dr-peanut).

### Confiança: quem fabrica e como a loja responde

Dá para confiar: a Dr. Peanut é uma fábrica de Curitiba com CNPJ ativo, a Body Food, que tem a Supley como sócia e mostra o CNPJ e o endereço no rodapé do site. No Reclame Aqui, a reputação é Boa nos últimos 6 meses e Ótima nos últimos 12, com quase todas as reclamações respondidas e a maior parte resolvida. As queixas se concentram na entrega: guarde o rastreio e chame o atendimento assim que o prazo vencer.

Na troca, o arrependimento em 7 dias sai sem custo para você, e a troca por outro produto tem o frete por sua conta. Escolha o sabor antes de fechar o carrinho.

### Para quem vale e para quem não vale

> **Destaque:** Se é para conhecer a marca por um produto só, que seja a pasta: é onde o rótulo mostra tudo, do ingrediente ao poliol, e o whey e os snacks vêm depois.

- Vale para quem escolhe pasta de amendoim pelo rótulo: sem açúcar adicionado, com a proteína e os polióis declarados, e aceita lactose na lista.
- Vale para quem já compra a pasta e quer o whey na mesma loja, com um cupom que vale em todo o site e soma com as promoções.
- Não vale para quem precisa evitar lactose: as pastas, o whey, a Doctor Bar e o wafer declaram que contêm, e a loja não tem versão sem lactose.
- Não vale para quem precisa evitar glúten e quer o whey ou os snacks: só a pasta diz que não contém.
- Não vale para quem quer uma resposta sobre dieta: o rótulo dá os números, e a resposta é do nutricionista.

### Perguntas frequentes

- A pasta de amendoim Dr. Peanut é boa? Pelo rótulo, é uma pasta de amendoim com proteína do soro do leite, sem adição de açúcares e com polióis, que contém lactose e não contém glúten; o capítulo da pasta mostra as faixas por colher e por 100 g.
- Qual o melhor sabor da Dr. Peanut? Pelo rótulo, depende do que você procura: Avelã e Leite em Pó têm mais proteína por 100 g, e o Brownie tem menos açúcar com menos poliol; o preço é o mesmo em todos os sabores do mesmo tamanho.
- O whey da Dr. Peanut é bom? Pelo rótulo, é um whey concentrado com 20 g de proteína por dose de 40 g, nos 5 sabores, e contém glúten e lactose; a conta por 100 g de proteína está no capítulo do whey.
- Dr. Peanut é boa para dieta? O rótulo não responde isso: ele mostra as calorias, os açúcares e a gordura de cada porção, e quem encaixa o produto no seu plano é o nutricionista.
- Tem pasta Dr. Peanut zero lactose? Não: os 12 sabores dizem "contém lactose", e a loja não vende versão sem lactose.

### Plano de imagens

Capa (Job 6, `covers:render`): a foto de cima é o pote de 600 g do Bueníssimo (`https://drpeanut.vteximg.com.br/arquivos/ids/157216-3840-0/buenissimo_600g.png`), com o logo da marca e a faixa "Dr. Peanut é boa?"; sem concorrente e sem foto de corpo.

| # | Seção | URL de origem | O que mostra | alt sugerido | Legenda sugerida | href |
|---|---|---|---|---|---|---|
| 1 | O que a Dr. Peanut vende | https://drpeanut.vteximg.com.br/arquivos/ids/157216-3840-0/buenissimo_600g.png | Pote de 600 g da pasta Bueníssimo, de frente | Pote de 600 g de pasta de amendoim Dr. Peanut sabor Bueníssimo, frente da embalagem | Pasta de amendoim Bueníssimo, pote de 600 g. Imagem: Dr. Peanut. | https://www.drpeanut.com.br/pasta-de-amendoim-buenissimo-com-whey-proteine/p |
| 2 | O whey Dr. Peanut é bom? | https://drpeanut.vteximg.com.br/arquivos/ids/155870-3840-0/whey_avela.jpg | Pote de 900 g do 100% Whey Dr. Peanut - Max Titanium, sabor Avelã | Pote de 900 g do 100% Whey Dr. Peanut - Max Titanium, sabor Avelã, frente da embalagem | 100% Whey Dr. Peanut - Max Titanium, sabor Avelã, 900 g. Imagem: Dr. Peanut. | https://www.drpeanut.com.br/whey-dr-peanut/p |
| 3 | Doctor Bar, alfajor e Doctor Wafer | https://drpeanut.vteximg.com.br/arquivos/ids/156789-3840-0/DOCTOR-FOTO-SITE-DOCTOR-BAR-AVELA.jpg | Doctor Bar Avelã, foto oficial da loja | Barra de proteína Doctor Bar da Dr. Peanut, sabor Avelã, embalagem de 62 g | Doctor Bar Avelã, vendida em display de 8. Imagem: Dr. Peanut. | a definir: o slug do display da Doctor Bar não está no arquivo de fatos |

Reserva, se a seção dos snacks comportar duas fotos: `https://drpeanut.vteximg.com.br/arquivos/ids/157018-3840-0/DOCTOR-WAFER-AVELA-1.jpg` (Doctor Wafer Avelã; alt "Doctor Wafer da Dr. Peanut, sabor Avelã, unidade de 25 g"; legenda "Doctor Wafer Avelã, 25 g. Imagem: Dr. Peanut."; href a definir pelo mesmo motivo). Nenhuma imagem em seção de passo; o artigo não tem seção de passo.

### Matriz de claims

| Afirmação | Tipo | Fonte exata | Status |
|---|---|---|---|
| Pastas em 12 sabores, potes de 250 g e 600 g; combos de 2 a 5 potes; assinatura só com 250 g | fato de catálogo | fatos/dr-peanut-0311-noite.md; dossiê, seção 3 (24/10) | conferido 03/11 |
| Preço de lista: R$ 28,90 (250 g) e R$ 64,90 (600 g), igual em todos os sabores; a loja vende com desconto em promoção | preço | fatos/dr-peanut-0311-noite.md ("de R$ 28,90, por R$ 25,89"; "de R$ 64,90, por R$ 59,89") | conferido 03/11 |
| Por 100 g: R$ 11,56 e R$ 10,82; 600 g cerca de 6% mais barato por 100 g | conta nossa | 28,90 ÷ 2,5; 64,90 ÷ 6; 1 − 10,82/11,56 = 6,4% | conta refeita |
| Ingredientes das pastas (amendoim, WPC, maltitol, xilitol, sucralose, acessulfame K; esteviol no Brownie e no Banoffee); contém lactose; não contém glúten; alérgicos por sabor | rótulo | dr-peanut-melhor-sabor.json, seções "Dr. Peanut é zero açúcar?" e "Tem Dr. Peanut zero lactose?"; dr-peanut-e-saudavel.json, "Adoçantes e polióis" | fonte publicada no site |
| Por 15 g: 2,5 a 3 g de proteína, 0,7 a 1,5 g de açúcares totais, 0 g adicionados, 1,1 a 2 g de gordura saturada, 83 a 90 kcal | rótulo | dr-peanut-melhor-sabor.json, "Quadro nutricional dos sabores" | fonte publicada no site |
| Por 100 g: proteína de 17 g a 20 g; polióis de 6,4 g a 20 g; Brownie único com <5 g de açúcares e <7 g de polióis; Cookies & Cream menor açúcar e maior poliol | rótulo | dr-peanut-melhor-sabor.json, mesma seção e "Dr. Peanut é zero açúcar?" | fonte publicada no site |
| A loja não vende pasta sem lactose nem pasta só de amendoim | fato de catálogo | dr-peanut-melhor-sabor.json ("não vendia versão sem lactose"); dr-peanut-e-saudavel.json ("A loja não vendia pasta só de amendoim") | leitura de 16 e 20/10; não relida em 03/11 |
| Whey: WPC, 20 g de proteína em 40 g (2 dosadores), 4.405 mg de BCAA; ingredientes; "CONTÉM GLÚTEN"; contém lactose; alérgicos e "pode conter" | rótulo | fatos/dr-peanut-0311-noite.md (página do Avelã) | conferido 03/11 |
| Whey 900 g a R$ 224,39, 5 sabores, sem desconto | preço | fatos/dr-peanut-0311-noite.md | conferido 03/11 |
| 22,5 doses, 450 g de proteína, R$ 49,86 por 100 g de proteína, R$ 9,97 por dose | conta nossa | 900 ÷ 40; 22,5 × 20; 224,39 ÷ 4,5; 224,39 ÷ 22,5 | conta refeita |
| Whey: açúcares totais de 8,5 a 11 g por dose; sódio da Paçoca o dobro dos outros; kcal de 159 a 166; Paçoca só no whey | rótulo | dr-peanut-melhor-sabor.json, "Whey Dr. Peanut: qual sabor escolher" | leitura de 16/10 |
| A página apresenta o whey como criação da Max Titanium em parceria com a Dr. Peanut | fato oficial | fatos/dr-peanut-0311-noite.md ("Uma criação exclusiva em parceria com a Dr. Peanut"); dr-peanut-e-confiavel.json | conferido 03/11 |
| Doctor Bar Avelã: 62 g, 21 g de proteína, 261 kcal, 6,2 g de gordura saturada, maltitol, esteviol e sucralose, glúten e lactose; só em display de 8 a R$ 122,03 (R$ 15,25 a unidade) | rótulo e preço | fatos/dr-peanut-0311-noite.md (preço); snacks-dr-peanut-qual-escolher.json e dr-peanut-e-saudavel.json (rótulo) | preço conferido 03/11 |
| Alfajor: 35 g, 4 a 4,7 g de proteína nos 5 sabores, R$ 12,99; a loja não publica ingredientes nem alérgicos | rótulo e preço | fatos/dr-peanut-0311-noite.md; snacks-dr-peanut-qual-escolher.json; dossiê, seção 3 (20/10) | preço conferido 03/11 |
| Doctor Wafer: 25 g, 5 a 6 g de proteína nos 3 sabores, R$ 11,46; farinha de trigo; glúten e lactose | rótulo e preço | fatos/dr-peanut-0311-noite.md; snacks-dr-peanut-qual-escolher.json; dr-peanut-e-saudavel.json | preço conferido 03/11 |
| R$ 0,73 por g de proteína na barra; mais de R$ 2,76 no alfajor | conta nossa | 15,25 ÷ 21; 12,99 ÷ 4,7 | conta refeita (igual à do 603) |
| Cupom DREMCASACOMCECILIA: 10% em todo o site, todas as formas de pagamento, soma com promoções (inclusive item já promocional) | condição comercial | dossiê, seção 1 (teste de 13/10) | vale até 13/11 |
| Cupom entra na assinatura e soma com o progressivo (4% a 15%), 10% sobre o subtotal; entrega mensal, bimestral ou trimestral | condição comercial | dossiê, seção 3 (teste de 24/10); dr-peanut-qual-tamanho-compensa.json | teste do Bruno |
| Assinatura com cupom é o menor preço por 100 g entre os potes de 250 g | conta nossa | dr-peanut-qual-tamanho-compensa.json, tabela da assinatura (R$ 7,77 a R$ 8,90 contra R$ 8,58 a R$ 9,32 dos kits de 250 g) | preços de 24/10, com promoção |
| Frete grátis com o total já com cupom: R$ 149,90 (SP capital, Sudeste, Sul) e R$ 199,90 (demais); pote de 600 g sozinho não chega; whey chega em qualquer região | condição comercial e conta | dossiê, seção 2; 64,90 < 149,90; 224,39 × 0,9 = 201,95 > 199,90 | vale até 14/11 |
| Body Food, fábrica de Curitiba, CNPJ ativo, Supley sócia; CNPJ e endereço no rodapé; grupo da Probiótica e da Max Titanium | fato oficial | dossiê, seção 2; dr-peanut-e-confiavel.json | BrasilAPI 14/10 |
| Reclame Aqui: Boa em 6 meses, Ótima em 12; quase todas respondidas, maior parte resolvida; queixas na entrega | reputação | dr-peanut-reclame-aqui-nota-reputacao.json (resposta rápida e capítulos) | leitura de 14/10; muda com o tempo |
| Arrependimento em 7 dias sem custo; troca por outro produto com frete do cliente | política | dossiê, seção 2 (Política de Trocas) | texto colado pelo Bruno |
| "Pelo rótulo, é" / "é bom" | julgamento editorial | só pelo rótulo; nenhuma frase de efeito no corpo | sem claim de saúde |

## Revisão (Job 3, 03/11/2026, Claude)
Rascunho do Fable 5.1 conferido contra o arquivo de fatos do dia, o dossiê, o briefing e a voz. Contagens no JSON: resposta rápida com 57 palavras e sem R$; 1 data no corpo (legenda da tabela de preço); 3 links internos; rótulos uma vez cada; `description` com 167 caracteres. Mudanças:
- Link de produto na primeira célula da tabela dos snacks (Doctor Bar, alfajor e Doctor Wafer).
- A âncora do link para o `dr-peanut-e-saudavel` saiu de "saudável" para "guia do rótulo da Dr. Peanut"; "este texto também não" saiu.

## Capa e imagens (Job 6, 03/11/2026)
Capa no modelo do tipo, gerada com `covers:render` (spec no scratchpad da sessão), e fotos do corpo do site oficial da marca, lidas em 03/11. Caminhos, alts e legendas estão no JSON. **Folha aprovada pelo Bruno em 03/11/2026**; as imagens novas subiram ao CDN e estão `verified` no manifesto e no mapa de entrega. Nenhuma foto do corpo repete a da capa, e nenhuma fica em seção de passo.
- Capa: `/images/reviews/dr-peanut/dr-peanut-e-boa-capa.webp`. Pasta Bueníssimo 600 g, 100% Whey Avelã e Doctor Wafer Avelã e a faixa "Dr. Peanut é boa?".
- Corpo (3 novas): pasta Pistache 600 g, 100% Whey Paçoca e Doctor Bar Avelã.

## Conformação e gates (Jobs 4 e 5, 03/11/2026)
JSON `content/reviews/dr-peanut-e-boa.json`, id 785, só PT, no manifesto e no índice gerado. `validate:content`, `test:article-d2`, `typecheck`, `test-delivery-integration`, `phase5-export --check` e `candidate-proof` verdes; o `npm run build` completo roda no Gate 1. PR com squash sem deploy.

Pendente: A tabela usa preço de lista; os guias 446 e 604 no ar usam preço de promoção (apontado ao Bruno).

## Publicação (03/11/2026)
- No ar em 03/11/2026: PR #544, release `3851aa15` (build 01a1a3e5), id 785, só PT. Smoke com as imagens no CDN e os links da loja como sponsored; sitemap, llms.txt e IndexNow; captura 41745392090 verde.
