---
titulo_provisorio: "Mais Mu é boa? O whey, o Exquenta, as barras e o que vale comprar da marca"
seo_title: "Mais Mu é boa? Whey, pré-treino Exquenta e barras pelo rótulo"
slug_sugerido: "mais-mu-e-boa"
parceiro: "[[Mais-Mu]]"
affiliate: "mais-mu"
coupon: "MMEMCASACOMCECILIA"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia de Marca"
status: "publicado"
responsavel: "Claude (Jobs 3 a 6)"
proxima_acao: "reler preços e o catálogo na revisão mensal de dezembro de 2026"
bloqueado_por: "-"
data_criacao: "2026-11-03"
pauta: "Série \"<Marca> é boa? Vale a pena?\", lote 2 (Mais Mu, Dr. Peanut, Belive e Simple Organic), decisão do Bruno de 03/11/2026"
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
---

# Briefing: Mais Mu é boa?

## Buscas (autocompletar do Google, 03/11/2026)
O Bruno liberou o lote sem o Trends (03/11). Se o arquivo vier, a ordem dos capítulos segue o arquivo.
- "mais mu é boa": creatina (várias, por sabor), "protein mais mu é boa", "whey mais mu é boa", "proteína vegetal mais
  mu é boa".
- "mais mu é bom": whey (concentrado e isolado), **"exquenta mais mu é bom"**, "pré-treino mais mu é bom", "cappuccino
  mais mu é bom", "suplemento mais mu é bom".
- "whey mais mu vale a pena", "qual o melhor whey da mais mu", "whey mais mu melhor sabor", "exquenta mais mu melhor
  sabor", "produtos mais mu são bons".
- Também aparecem "produtos mais mu anvisa", "creatina mais mu é aprovada pela anvisa" e "creatina mais mu tem selo
  creapure".

## A creatina fica fora (decisão do Bruno de 23/10/2026)
A creatina é a busca mais forte do "é boa", mas o caso Bioghen fica fora dos textos e a pauta da creatina foi
descartada duas vezes (23/10 e 30/10). Neste artigo, **nenhum capítulo, tabela, FAQ ou quadro fala da creatina**, e o
texto não fala de Anvisa, recolhimento ou fábrica. A creatina pode aparecer só na lista do que a loja vende, sem
avaliação. Se o Bruno decidir outra coisa, o briefing muda antes da redação.

## Estrutura sugerida
1. Resposta rápida (2 a 3 frases, sem preço).
2. O que a Mais Mu vende: whey (concentrado em refil de 1,8 kg e 900 g, pote de 450 g e sachês; isolado; proteína
   vegetal), pré-treino Exquenta, creatinas, barras (Mukebar, Crush Bar), Chocowheyfer e snacks. Menu lido no Chrome em
   03/11.
3. **O whey da Mais Mu é bom?** O que a loja declara: 20 g de proteína por dose, e a dose em gramas só no sachê e no
   pote de 450 g. A loja **não publica a tabela nutricional** dos wheys (dossiê, 23/10): o texto diz isso com clareza,
   porque muda a decisão de quem quer comparar pelo rótulo. Concentrado, isolado e vegetal, um parágrafo cada; o sabor e
   a versão ficam no `whey-mais-mu-qual-escolher` (link). Reler no Chrome se a tabela foi publicada desde então.
4. **O Exquenta é bom?** O que o rótulo mostra em cada versão (com e sem cafeína, sachê), sem efeito no corpo; link
   `pre-treino-exquenta-mais-mu-e-bom`.
5. **Barras e Chocowheyfer.** Proteína, açúcar e preço por unidade; link `barra-de-proteina-mais-mu-qual-escolher`.
6. **Quanto custa com o cupom, e onde comprar:** o MMEMCASACOMCECILIA (10%), que soma com os 3% do Pix e vale em
   produto em oferta. A loja não acumula cupons (cashback e boas-vindas entram como cupom). O cashback é da loja, nunca
   vantagem do cupom. Mercado Livre: o link do dossiê, onde o cupom não vale.
7. **A Mais Mu é confiável?** Um parágrafo e os links para `mais-mu-e-confiavel` e
   `mais-mu-reclame-aqui-nota-reputacao`. A reputação recente vai direta: a nota de 6 meses caiu (dossiê), e o texto
   manda para o artigo do Reclame Aqui reler os números do dia.
8. Quadro "Leve se / Passe se". Um "Passe se" honesto: quem só compra whey depois de ler a tabela nutricional.
9. Perguntas frequentes: "O whey da Mais Mu é bom?", "Qual o melhor whey da Mais Mu?", "O Exquenta é bom?", "A Mais
   Mu publica a tabela nutricional?", "O cupom soma com o cashback?".

## Regras
- **Molde:** o `insider-vale-a-pena` reformado e o `probiotica-e-boa` (lote 1): artigo da marca, um capítulo por linha,
  quadro sem nota e sem preço.
- **Nenhum concorrente.** Os comparativos `mais-mu-ou-growth` e `mais-mu-ou-dux` ficam só nos `relatedArticles`.
- **Suplemento só pelo rótulo:** proteína por dose, tipo de proteína, alergênicos e preço por 100 g de proteína, só onde
  a dose em gramas é declarada (sachê e pote de 450 g). Nunca calcular proteína do refil. Nada de efeito no corpo.
- **Divergências do site** (as doses da creatina e do isolado refil, no dossiê): o texto segue o rótulo e não cita a
  divergência.
- **Preços:** relidos no dia, no Chrome (a loja tem Cloudflare; com o desafio, parar e avisar o Bruno). A data só na
  legenda da tabela. Preço de Black Friday fica no `black-friday-mais-mu`.
- **Catraca:** resposta rápida sem preço, no máximo 2 datas no corpo, nenhuma em título de seção, legenda de foto ou
  FAQ. `description` com até 180 caracteres.
- **Imagens:** capa pelo Job 6 (`covers:render` e a folha de aprovação do Bruno), só com produto da marca. Ao menos uma
  foto oficial no corpo, numa seção comum.
- `somente-pt`, `isNew: true`, link de cada produto na primeira célula das tabelas.
- **Gates:** `node scripts/content/build-index.mjs` com os gerados que mudarem commitados, `validate:content`,
  `test:article-d2`, `typecheck` e o Gate 1 verde. Squash sem deploy.

## Rascunho (Job 2, 03/11/2026)

Decisão do Bruno de 03/11 aplicada: a creatina aparece só como linha que a loja vende, sem detalhe nenhum. Preços das tabelas são os de lista ("de") do arquivo de fatos da noite de 03/11; os rótulos vêm dos três guias da marca já publicados.

### Metadados

- **title:** Mais Mu é boa? O whey, o Exquenta, as barras e o que vale comprar da marca
- **seoTitle:** Mais Mu é boa? Whey, Exquenta e barras pelo rótulo (50 caracteres)
- **description (179 caracteres):** Mais Mu é boa? Pelo rótulo: o Exquenta e as barras mostram tudo, e o whey declara a proteína por dose sem tabela nutricional. Preço, cupom MMEMCASACOMCECILIA e para quem compensa.
- **metaDescription:** Mais Mu é boa? Whey, pré-treino Exquenta e barras pelo rótulo, preço de lista, o cupom de 10% e para quem a marca compensa.
- **category:** guias-praticos-utilidade
- **reviewKind:** guia
- **type:** Guia de Marca
- **editorialNote:** Podemos receber comissão pelo cupom MMEMCASACOMCECILIA. Ninguém da equipe usou os produtos: os dados são do site da marca.
- **cta:** label "Ir para a Mais Mu com o cupom"; text "Entre no site oficial da Mais Mu, clique em Adicionar cupom de desconto no checkout e cole o MMEMCASACOMCECILIA: 10% em todo o site."; url `https://www.lojamaismu.com.br/`; sponsored true
- **coupon:** MMEMCASACOMCECILIA; **affiliate:** mais-mu; **isNew:** true; **imageFit:** contain
- **decision:**
  - takeIf: "Você escolhe whey pelo sabor e pelo formato, e a proteína por dose que a loja declara basta para você." / "Você compara pré-treino e barra pelo rótulo: o Exquenta, a Mukebar e o Chocowheyfer têm a tabela publicada."
  - skipIf: "Você só compra whey depois de ler a tabela nutricional: a loja não publica a dos wheys." / "Você precisa evitar lactose: o concentrado, o isolado e as barras declaram que contêm."
- **relatedArticles (slugs):** whey-mais-mu-qual-escolher, pre-treino-exquenta-mais-mu-e-bom, barra-de-proteina-mais-mu-qual-escolher, mais-mu-e-confiavel, cupom-mais-mu-como-usar, mais-mu-ou-growth (se o Job 4 ficar nos 3 de sempre, valem os três primeiros; `mais-mu-ou-dux` entra se houver mais vagas)

### Resposta rápida

Pelo rótulo, a Mais Mu é boa no que ela publica: o Exquenta e as barras trazem tabela nutricional completa, e o whey declara 20 g de proteína por dose. O que falta é a tabela nutricional dos wheys, que a loja não mostra. Se você compara whey pela tabela, isso muda a decisão; o capítulo do whey explica.

### O que a Mais Mu vende

Quase tudo o que a Mais Mu vende gira em torno do whey: o pó em pote, refil e sachê, e as barras e os wafers com a mesma proteína dentro. É uma marca brasileira de proteína com sabor de doce no nome, Paçoquita, Brownie, Cookies'n Cream, e este artigo olha cada linha pelo rótulo e pelo preço de lista, mandando sabor e versão para o guia que já tem a conta feita.

- **Whey:** concentrado em pote de 450 g, refil de 900 g e de 1,8 kg e caixa de 15 sachês; isolado e proteína vegetal na linha Performance. No próximo capítulo.
- **Pré-treino Exquenta:** potes de 300 g e 500 g, sachês e as duas versões sem cafeína, no capítulo do Exquenta.
- **Barras e wafers:** Mukebar, Crushbar, Chocowheyfer (comum, Max e Bites) e um snack salgado de parmesão, no capítulo das barras.
- **Creatina:** a loja também vende, e ela fica fora deste artigo.
- **Bebidas proteicas e combos:** ficam fora deste artigo.

### O whey da Mais Mu é bom?

Pelo que a loja publica, o whey cumpre o básico, proteína por dose declarada em todas as linhas, mas não dá para conferir carboidrato, gordura nem açúcar: a Mais Mu não publica a tabela nutricional dos wheys, nem na galeria nem na descrição. Quem compara whey pela tabela não tem o número aqui.

A loja informa: 20 g de proteína por dose no concentrado e 22 g no isolado e na proteína vegetal. A dose em gramas aparece só no sachê, no título de cada sabor, e no pote de 450 g, cuja tabela do sabor Baunilha mostra porção de 36 g e cerca de 13 porções. Nos refis, a página traz no máximo um "cerca de N doses", sem a dose em gramas.

| Produto | Linha | Proteína por dose (loja) | Preço de lista |
|---|---|---|---|
| [Whey Concentrado Chocolate, pote de 450 g](https://www.lojamaismu.com.br/produtos/whey-protein-concentrado-chocolate-pote-450g/) (sponsored) | Concentrado | 20 g | R$ 159,99 |
| [Whey Concentrado Paçoquita, 15 sachês](https://www.lojamaismu.com.br/produtos/whey-concentrado-pacoquita-sache-525g/) (sponsored) | Concentrado | 20 g | R$ 239,85 |
| [Whey Concentrado Chocolate, refil de 900 g](https://www.lojamaismu.com.br/produtos/whey-concentrado-chocolate-refil-900g/) (sponsored) | Concentrado | 20 g | R$ 279,99 |
| [Whey Concentrado Paçoquita, refil de 1,8 kg](https://www.lojamaismu.com.br/produtos/whey-protein-concentrado-mais-mu-pacoquita-refil-18kg-15ej0/) (sponsored) | Concentrado | 20 g | R$ 499,99 |
| [Whey Isolado Chocolate, pote de 450 g](https://www.lojamaismu.com.br/produtos/whey-protein-isolado-chocolate-mais-mu-performance-450g-1e1ej/) (sponsored) | Isolado | 22 g | R$ 299,99 |
| [Whey Isolado Baunilha, refil de 900 g](https://www.lojamaismu.com.br/produtos/whey-protein-isolado-baunilha-refil-900g/) (sponsored) | Isolado | 22 g | R$ 349,99 |
| [Proteína Vegetal Caramel Macchiato, pote de 450 g](https://www.lojamaismu.com.br/produtos/proteina-vegetal-caramel-macchiato-pote-450g/) (sponsored) | Vegetal | 22 g | R$ 179,99 |
| [Proteína Vegetal Caramel Macchiato, refil de 900 g](https://www.lojamaismu.com.br/produtos/proteina-vegetal-vegana-caramel-macchiato-refil-900g/) (sponsored) | Vegetal | 22 g | R$ 299,99 |

Legenda: Preço de lista no site, 03/11. A loja vende quase tudo com desconto de promoção, e o valor do dia aparece na página de cada produto.

Conta nossa, com a proteína por dose e a contagem de doses que a loja publica: o pote de 450 g sai de R$ 61,53 a R$ 66,66 por 100 g de proteína, com 13 ou 12 doses conforme o sabor, e a caixa de 15 sachês sai a R$ 79,95. Nos refis a conta não sai, porque a loja não declara a dose em gramas. A promoção do dia derruba os dois números na mesma proporção.

O concentrado é o whey da casa: proteína de soro concentrada, sabor, goma xantana e sucralose, com "contém lactose" no texto e leite e soja como alergênicos. Serve para quem quer o whey comum e escolhe pelo sabor, que é onde a marca aposta. Não escolha se você precisa evitar lactose.

O isolado é a linha Performance, com 22 g por dose e o maior preço por dose da marca. A página do Baunilha de 450 g diz "contém lactose", e a loja fala só em menos lactose que o concentrado, não em zero. Serve para quem quer mais proteína na dose; não escolha pelo preço nem como opção sem lactose.

A proteína vegetal é isolada de arroz e de ervilha, não é whey, também com 22 g por dose. Serve para quem não quer leite no pó; a lista completa de ingredientes e o aviso de alergênicos estão só no rótulo do pote, então confira a embalagem que chegar.

O sabor e o formato certo para cada rotina, com a conta por dose de todos os refis e sachês, estão em [whey Mais Mu: qual sabor e versão escolher](/reviews/whey-mais-mu-qual-escolher).

### O Exquenta é bom?

Pelo rótulo, o Exquenta é um pré-treino de cafeína e taurina com bastante açúcar na dose: 150 mg de cafeína, 500 mg de taurina (400 mg em dois sabores) e 16 g de açúcares adicionados em cada 20 g. A loja não publica teste de efeito, e este texto também não fala de efeito: o que dá para comparar é o rótulo e o preço por dose.

| Produto | Doses | Cafeína por dose | Taurina por dose | Preço de lista | Por dose |
|---|---|---|---|---|---|
| [Exquenta Manga 300 g](https://www.lojamaismu.com.br/produtos/exquenta-manga-300g/) (sponsored) | 15 de 20 g | 150 mg | 500 mg | R$ 129,00 | R$ 8,60 |
| [Exquenta Manga 500 g](https://www.lojamaismu.com.br/produtos/exquenta-manga-500g/) (sponsored) | 25 de 20 g | 150 mg | 500 mg | R$ 179,99 | R$ 7,20 |
| [Exquenta em sachê Azedinha Morango, 15 unidades](https://www.lojamaismu.com.br/produtos/pre-treino-em-sache-exquenta-mais-mu-azedinha-morango-15-unid-1thga/) (sponsored) | 15 de 20 g | 150 mg | 400 mg (arte da caixa) | R$ 149,85 | R$ 9,99 |
| [Exquenta Sem Cafeína Tropical 450 g](https://www.lojamaismu.com.br/produtos/pre-treino-sem-cafeina-exquenta-mais-mu-performance-tropical-450g-1qn11/) (sponsored) | 15 de 30 g | sem linha na tabela | sem linha na tabela | R$ 89,99 | R$ 6,00 |
| [Exquenta Nitrato Laranja e Acerola 450 g](https://www.lojamaismu.com.br/produtos/exquenta-pre-treino-mais-mu-nitrato-laranja-e-acerola-450g-1ngim/) (sponsored) | 15 de 30 g | sem linha na tabela | sem linha na tabela | R$ 189,00 | R$ 12,60 |

Legenda: Preço de lista, na mesma leitura da tabela do whey; a loja vende com desconto de promoção. Doses e porções pela tabela que a loja publica.

O pote de 500 g sai mais barato por dose que o de 300 g, com o mesmo rótulo, e o sachê cobra pela dose já medida. Para quem toma em casa, o de 500 g; o sachê é para quem leva a dose na bolsa e aceita pagar por isso.

Os dois de 450 g são os sem cafeína: a tabela deles não traz linha de cafeína nem de taurina, e o Nitrato não publica quantos miligramas de nitrato há na dose. Servem para quem quer a linha sem cafeína; o Nitrato é o mais caro por dose de todo o quadro, e você paga sem saber a quantidade do que dá nome a ele.

A taurina cai de 500 mg para 400 mg nos sabores Azedinha Morango e Lilith Maçã Verde, e a loja não explica a diferença. Sabor por sabor, com os seis potes de 500 g e os preços com cupom, o guia do Exquenta fica nos artigos relacionados.

### Barras e Chocowheyfer

Nas barras, a Mais Mu publica o que falta no whey: tabela nutricional por unidade, com proteína, calorias e açúcar. O que decide entre elas é o tamanho da unidade.

| Produto | Unidade | Proteína por unidade (loja) | Preço de lista da caixa | Por unidade |
|---|---|---|---|---|
| [Mukebar Paçoquita, caixa com 12](https://www.lojamaismu.com.br/produtos/mukebar-barra-de-proteina-pacoquita-720g/) (sponsored) | 60 g | 15 g (texto; tabela lida no sabor Avelã) | R$ 179,88 | R$ 14,99 |
| [Mukebar Chocolate Crocante, caixa com 12](https://www.lojamaismu.com.br/produtos/mukebar-barra-de-proteina-chocolate-crocante-720g/) (sponsored) | 60 g | 15 g (texto; tabela lida no sabor Avelã) | R$ 179,88 | R$ 14,99 |
| [Crushbar Morango, caixa com 12](https://www.lojamaismu.com.br/produtos/crushbar-mu-morango-20-caixa-12-unidades-420g/) (sponsored) | 35 g | 10 g (tabela) | R$ 131,88 | R$ 10,99 |
| [Chocowheyfer Chocolate, caixa com 12](https://www.lojamaismu.com.br/produtos/chocowheyfer-chocolate-300g/) (sponsored) | 25 g | 6 g (tabela) | R$ 83,88 | R$ 6,99 |
| [Chocowheyfer Max Chocolate, caixa com 20](https://www.lojamaismu.com.br/produtos/chocowheyfer-max-mais-mu-chocolate-caixa-20-unidades-1mr93/) (sponsored) | 50 g | 12 g (tabela) | R$ 258,00 | R$ 12,90 |
| [Chocowheyfer Bites Chocolate com Avelã, 12 pacotinhos](https://www.lojamaismu.com.br/produtos/chocowheyfer-bites-chocolate-com-avela-420g/) (sponsored) | 35 g (embalagem) | embalagem, texto e tabela não batem | R$ 113,88 | R$ 9,49 |
| [Snack Proteico Parmesão Zero Lactose, caixa com 8](https://www.lojamaismu.com.br/produtos/snack-proteico-parmesao-zero-lactose-mais-mu-caixa-com-8-unid-13d9u/) (sponsored) | — | confira na embalagem | R$ 119,92 | R$ 14,99 |

Legenda: Preço de lista, na mesma leitura da tabela do whey; a loja vende com desconto de promoção. Proteína pela tabela ou pelo texto da página, como indicado.

A Mukebar é a unidade grande e a que mais custa; o Chocowheyfer é o lanche pequeno pelo menor preço, e a Crushbar e o Max ficam no meio. Nos sabores com tabela, o açúcar adicionado é 0 g e o açúcar total vai de 0,3 g a 3,7 g por unidade; a Mukebar é a que tem mais.

Mukebar e Chocowheyfer dizem CONTÉM GLÚTEN e CONTÉM LACTOSE na página. Os Bites trazem três números de proteína diferentes entre embalagem, texto e tabela, por isso ficam sem conta. O snack de parmesão é o único salgado da lista, com "zero lactose" no nome, e a proteína dele você confere na embalagem.

Serve para quem quer o lanche de proteína pronto, na mochila ou na gaveta. Se o que decide é a caloria ou o açúcar, fique no Chocowheyfer; se é a proteína por unidade, na Mukebar. O guia das barras, com cada sabor, fica nos artigos relacionados.

### Quanto custa com o cupom, e onde comprar

O MMEMCASACOMCECILIA tira 10% de tudo no site da Mais Mu, soma com os 3% do Pix e entra também no produto que já está em promoção, pelo teste no carrinho. Vale em todas as formas de pagamento, para conta nova e para quem já comprou.

A loja não acumula cupons: o crédito do cashback e o desconto de boas-vindas entram no mesmo campo, então em cada pedido vale um só. O cashback de 5% nas compras acima de R$ 250 é programa da loja, para qualquer cliente, e não tem nada a ver com o cupom.

O código vai no checkout, em "Adicionar cupom de desconto", depois de "Iniciar compra" no carrinho. É longo: copie e cole, e confira a linha "Desconto do cupom" no resumo antes de pagar. As regras completas estão na página do [cupom Mais Mu](/cupons/mais-mu).

O frete sai grátis acima de R$ 299 no Sul, Sudeste e Centro-Oeste e acima de R$ 399 no Norte e Nordeste; abaixo disso, o checkout calcula. O cupom baixa o total, e um pedido perto do mínimo pode perder o frete grátis: olhe o frete depois de colar o código. No [Mercado Livre](https://meli.la/24RjvdP) (sponsored) a Mais Mu tem loja, e lá vale o preço do anúncio, sem o cupom.

### A Mais Mu é confiável?

Dá para confiar na empresa, com atenção à entrega. A Mais Mu é uma sociedade anônima com CNPJ ativo desde 2014 e sede em São Paulo, o site oficial é lojamaismu.com.br, e as regras de troca estão publicadas: produto fechado, pedido por e-mail e recolhimento pago pela loja.

No Reclame Aqui, a reputação dos últimos 6 meses caiu para Regular, com nota 6,4, enquanto a janela de 12 meses segue Boa, com 7,2. A queixa principal é a entrega: produto não recebido e atraso. Esses números mudam todo dia, e os do dia estão em [Mais Mu no Reclame Aqui](/reviews/mais-mu-reclame-aqui-nota-reputacao). Na prática, guarde o número do pedido e acompanhe o rastreio desde a postagem.

### Para quem vale e para quem não vale

A Mais Mu é a marca de quem escolhe o whey pelo sabor e quer o pré-treino e o lanche da mesma casa, com o rótulo publicado onde ele existe.

> **Destaque:** A Mais Mu é a marca de quem escolhe o whey pelo sabor; quem escolhe pela tabela nutricional fica sem o número para comparar.

- Para whey com sabor de doce e um formato para cada rotina: o concentrado, escolhido pelo sabor, porque a tabela não dá para comparar.
- Para pré-treino comparado pelo rótulo: o Exquenta de 500 g, o mais barato por dose, ou um dos dois sem cafeína.
- Para lanche de proteína: a Mukebar na unidade grande, o Chocowheyfer na pequena e barata.
- Não vale para quem só compra whey depois de ler a tabela nutricional: ela não está publicada.
- Não vale para quem precisa evitar lactose: concentrado, isolado e barras declaram que contêm.

Dose, horário e objetivo de treino são conversa com nutricionista ou médico; este artigo lê rótulo e preço.

### Perguntas frequentes

- O whey da Mais Mu é bom? Pelo que a loja publica, ele declara a proteína por dose em todas as linhas, mas a tabela nutricional não está publicada; o capítulo do whey mostra o que dá e o que não dá para comparar.
- Qual o melhor whey da Mais Mu? Pela conta por proteína, o refil de 900 g nos sabores com contagem de doses; o pote de 450 g serve para conhecer o sabor, e o sachê, para levar.
- O Exquenta é bom? Pelo rótulo, é um pré-treino de cafeína e taurina com açúcar na dose; a loja não publica teste de efeito, e a conta por dose está no capítulo do Exquenta.
- A Mais Mu publica a tabela nutricional? Nas barras, nos wafers e no Exquenta, sim; nos wheys, não: a página declara só a proteína por dose.
- O cupom soma com o cashback? Não. A loja não acumula cupons, e o crédito do cashback entra como cupom; em cada pedido vale um dos dois.
- A Mais Mu é confiável? A empresa tem CNPJ ativo e regras de troca publicadas; a reputação recente no Reclame Aqui é Regular, com a entrega como queixa principal, no capítulo de confiança.

### Plano de imagens

O arquivo de fatos traz as páginas dos produtos, não a URL direta de cada foto: o Job 6 pega a foto oficial na galeria da página indicada. Nenhuma imagem em seção de passo (o artigo não tem).

- **Capa (Job 6, `covers:render`):** foto de cima, o pote Whey Concentrado Chocolate 450 g (página `https://www.lojamaismu.com.br/produtos/whey-protein-concentrado-chocolate-pote-450g/`), com o logo da marca e o código. Alternativa: o pote Exquenta Manga 500 g.
- **Imagem 1, capítulo "O whey da Mais Mu é bom?":** pote Whey Concentrado Chocolate 450 g, foto oficial da página acima. Alt: "Pote de 450 g do Whey Concentrado Chocolate da Mais Mu, de frente". Legenda: "Pote de 450 g do concentrado, o formato com dose em gramas publicada. Imagem: Mais Mu." `href`: `https://www.lojamaismu.com.br/produtos/whey-protein-concentrado-chocolate-pote-450g/`.
- **Imagem 2, capítulo "O Exquenta é bom?":** pote Exquenta Manga 500 g, foto oficial de `https://www.lojamaismu.com.br/produtos/exquenta-manga-500g/`. Alt: "Pote de 500 g do pré-treino Exquenta Manga da Mais Mu". Legenda: "Exquenta Manga de 500 g, o pote mais barato por dose da tabela. Imagem: Mais Mu." `href`: a mesma página.
- **Imagem 3, capítulo "Barras e Chocowheyfer":** caixa Mukebar Paçoquita com 12, foto oficial de `https://www.lojamaismu.com.br/produtos/mukebar-barra-de-proteina-pacoquita-720g/`. Alt: "Caixa com 12 barras Mukebar Paçoquita da Mais Mu". Legenda: "Mukebar Paçoquita, a unidade de 60 g com mais proteína da linha. Imagem: Mais Mu." `href`: a mesma página.
- Já no CDN, se o Job 6 preferir reaproveitar: `/images/reviews/mais-mu/whey-mais-mu-qual-escolher-caixa-sache-chocolate-com-coco.webp` (caixa de sachês, foto oficial) e `/images/reviews/mais-mu/whey-mais-mu-qual-escolher-tabela-baunilha-450g.webp`, a única tabela de whey publicada.

### Matriz de claims

| Afirmação | Tipo | Fonte exata | Status |
|---|---|---|---|
| A loja não publica a tabela nutricional dos wheys; declara só a proteína por dose | fato_oficial | Dossiê `01_Parceiros/Mais-Mu.md`, seção 3, "Tabela nutricional (23/10/2026)"; `whey-mais-mu-qual-escolher`, "Como lemos a loja" | verificado no dossiê; reler no Chrome se publicou desde então |
| 20 g de proteína por dose no concentrado; 22 g no isolado e no vegetal | fato_oficial | `whey-mais-mu-qual-escolher`, "Como lemos a loja" | verificado |
| Tabela do Baunilha 450 g: porção de 36 g, cerca de 13 porções; sachê com peso no título (35 a 39 g) | fato_oficial | `whey-mais-mu-qual-escolher`, "Concentrado: pote de 450 g" e "Sachê" | verificado |
| Pote 450 g: 12 ou 13 doses conforme o sabor (Chocolate 12) | fato_oficial | `whey-mais-mu-qual-escolher`, tabela do pote de 450 g | verificado |
| R$ 61,53 a R$ 66,66 por 100 g de proteína no pote de 450 g; R$ 79,95 na caixa de 15 sachês | conta_nossa | 159,99 ÷ (13 × 20 g) × 100 e ÷ (12 × 20 g) × 100; 239,85 ÷ (15 × 20 g) × 100 | conferido; coincide com o guia do whey no preço de lista |
| Preços de lista do whey, do Exquenta e das barras | condicao_comercial_volatil | `fatos/mais-mu-0311-noite.md`, coluna "de" | verificado 03/11 |
| Concentrado: proteína de soro concentrada, goma xantana, sucralose; "contém lactose"; alergênicos leite e soja | fato_oficial | `whey-mais-mu-qual-escolher`, "Ingredientes e lactose" | verificado |
| Isolado Baunilha 450 g "contém lactose"; FAQ da loja: menos lactose que o concentrado | fato_oficial | `whey-mais-mu-qual-escolher`, "Ingredientes e lactose" | verificado |
| Isolado tem o maior preço por dose da marca | fato_oficial (derivado) | `whey-mais-mu-qual-escolher`, "Isolado e vegetal" (R$ 18,75 por dose) | verificado em 25/10; vale no preço de lista de 03/11 (299,99 ÷ 16) |
| Vegetal: isolada de arroz e ervilha; lista completa só no rótulo | fato_oficial | `whey-mais-mu-qual-escolher`, "Vegetal" e "Ingredientes e lactose" | verificado |
| Exquenta: 150 mg cafeína, 500 mg taurina (400 mg em Azedinha Morango e Lilith Maçã Verde), porção 20 g; 16 g açúcares adicionados | fato_oficial | `pre-treino-exquenta-mais-mu-e-bom`, tabela e "Ingredientes, alergênicos" | verificado |
| Sem Cafeína e Nitrato 450 g: porção 30 g, 15 doses, sem linha de cafeína e taurina; Nitrato sem mg de nitrato | fato_oficial | `pre-treino-exquenta-mais-mu-e-bom`, "Sem cafeína: os dois 450 g" | verificado |
| Sachê Azedinha: 400 mg de taurina pela arte da caixa | fato_oficial | `pre-treino-exquenta-mais-mu-e-bom`, "Os potes e os sachês" | verificado |
| Preço por dose do Exquenta (8,60; 7,20; 9,99; 6,00; 12,60) | conta_nossa | preço de lista ÷ doses da tabela | conferido |
| Loja não publica teste de efeito do Exquenta | fato_oficial | `pre-treino-exquenta-mais-mu-e-bom`, resposta rápida | verificado |
| Mukebar 15 g em 60 g (tabela Avelã; texto nos outros); Crushbar 10 g em 35 g; Chocowheyfer 6 g em 25 g; Max 12 g em 50 g | fato_oficial | `barra-de-proteina-mais-mu-qual-escolher`, tabela "Os produtos numa tabela" | verificado |
| Açúcar adicionado 0 g; açúcar total de 0,3 g a 3,7 g nos produtos desta tabela (o Veggie Wafer, 0,1 g, não está nela) | fato_oficial | `barra-de-proteina-mais-mu-qual-escolher`, "Calorias, proteína e açúcar" | verificado |
| Mukebar e Chocowheyfer: CONTÉM GLÚTEN e CONTÉM LACTOSE | fato_oficial | `barra-de-proteina-mais-mu-qual-escolher`, "Alérgenos" | verificado |
| Bites: três números de proteína (embalagem, texto, tabela) | fato_oficial | `barra-de-proteina-mais-mu-qual-escolher`, bullets | verificado |
| Preço por unidade das barras (14,99; 10,99; 6,99; 12,90; 9,49; 14,99) | conta_nossa | preço de lista ÷ unidades da caixa | conferido |
| Cupom 10% em todo o site, soma com Pix 3%, vale em oferta, todas as formas de pagamento, conta nova e antiga | condicao_comercial_volatil | Dossiê, seção 1; teste de 20/10 | verificado (rever até 20/11) |
| Loja não acumula cupons; cashback e boas-vindas entram como cupom | condicao_comercial_volatil | Dossiê, seção 1 (FAQ da loja) | verificado |
| Cashback 5% acima de R$ 250, programa da loja | condicao_comercial_volatil | Dossiê, seção 1 | verificado |
| Checkout: "Iniciar compra" e "Adicionar cupom de desconto"; linha "Desconto do cupom" | fato_oficial | Dossiê, teste de 20/10 | verificado |
| Frete grátis acima de R$ 299 (S, SE, CO) e R$ 399 (N, NE) | condicao_comercial_volatil | `fatos/mais-mu-0311-noite.md`, topo do site | verificado 03/11 |
| Pedido perto do mínimo pode perder o frete grátis com o cupom | regra_pratica | `cupom-mais-mu-como-usar`, "Frete grátis com o cupom" | dito como possibilidade, sem teste |
| Mercado Livre: `https://meli.la/24RjvdP`; cupom não vale lá | condicao_comercial_volatil | Dossiê, seção 1 | verificado |
| S.A., CNPJ ativo desde 2014, sede em São Paulo; troca: produto fechado, e-mail, recolhimento pago pela loja | fato_oficial | `mais-mu-e-confiavel`, "Quem opera" e "Trocas e devolução"; dossiê (CNPJ 21.526.148/0001-34) | verificado |
| Reclame Aqui: 6 meses Regular 6,4; 12 meses Boa 7,2; queixas: produto não recebido e atraso | fato_oficial | Dossiê, "Reputação" (20/10/2026); `mais-mu-reclame-aqui-nota-reputacao` | verificado em 20/10; o texto manda reler no artigo do RA |
| Creatina: a loja vende | fato_oficial | Dossiê, seção 2; `fatos/mais-mu-0311-noite.md` | verificado; sem detalhe por decisão do Bruno (03/11) |
| Marca brasileira; sabores Paçoquita, Brownie, Cookies'n Cream; wafer com whey como primeiro ingrediente | fato_oficial | Dossiê, seção 2; `whey-mais-mu-qual-escolher`, "Sabores"; `barra-de-proteina-mais-mu-qual-escolher`, "Alérgenos" | verificado |

## Revisão (Job 3, 03/11/2026, Claude)
Rascunho do Fable 5.1 conferido contra o arquivo de fatos do dia, o dossiê, o briefing e a voz. Contagens no JSON: resposta rápida com 53 palavras e sem R$; 1 data no corpo (legenda da tabela de preço); 3 links internos; rótulos uma vez cada; `description` com 179 caracteres. Mudanças:
- Tabela do whey: o rascunho dizia que a loja não publica tabela nutricional de whey nenhum; a loja publica a de poucos sabores (o Baunilha de 450 g). Texto, quadro de decisão e FAQ dizem "na maioria dos sabores".
- Chocowheyfer Bites fora da tabela das barras (embalagem, texto e tabela com três números de proteína diferentes); notas de fonte tiradas das células.
- FAQ "qual o melhor whey" sem conta de refil (proibida no briefing): responde pela proteína por dose declarada e linka o guia do whey; o item "é confiável" saiu (repetia o capítulo).
- Creatina citada só como linha da loja, sem detalhe (decisão do Bruno de 03/11).

## Capa e imagens (Job 6, 03/11/2026)
Capa no modelo do tipo, gerada com `covers:render` (spec no scratchpad da sessão), e fotos do corpo do site oficial da marca, lidas em 03/11. Caminhos, alts e legendas estão no JSON. **Folha aprovada pelo Bruno em 03/11/2026**; as imagens novas subiram ao CDN e estão `verified` no manifesto e no mapa de entrega. Nenhuma foto do corpo repete a da capa, e nenhuma fica em seção de passo.
- Capa: `/images/reviews/mais-mu/mais-mu-e-boa-capa.webp`. Whey Concentrado Chocolate, Exquenta Manga e Proteína Vegetal Caramel Macchiato e a faixa "Mais Mu é boa?".
- Corpo: Exquenta Sem Cafeína Tropical (nova); os potes de whey e as caixas das barras já estavam no CDN.

## Conformação e gates (Jobs 4 e 5, 03/11/2026)
JSON `content/reviews/mais-mu-e-boa.json`, id 784, só PT, no manifesto e no índice gerado. `validate:content`, `test:article-d2`, `typecheck`, `test-delivery-integration`, `phase5-export --check` e `candidate-proof` verdes; o `npm run build` completo roda no Gate 1. PR com squash sem deploy.

Pendente: Fora do escopo, só apontado: o `whey-mais-mu-qual-escolher` no ar calcula a proteína do refil, que o briefing proíbe.

## Publicação (03/11/2026)
- No ar em 03/11/2026: PR #544, release `3851aa15` (build 01a1a3e5), id 784, só PT. Smoke com as imagens no CDN e os links da loja como sponsored; sitemap, llms.txt e IndexNow; captura 41745392090 verde.

## Capítulo da creatina (03/11/2026)
Decisão do Bruno de 03/11/2026: a creatina ganha um capítulo com o que a loja vende, sem o caso Bioghen ("não cabe nesse artigo discutir isso"). O capítulo "A creatina da Mais Mu" fica entre as barras e o preço. Ele traz os 4 produtos: pote de 200 g sem sabor, pote de 210 g de limonada e refil de 500 g sem sabor e de melancia. Para cada um, as doses, os ingredientes, o preço de lista e o preço por dose, lidos na loja em 03/11. O texto não avalia efeito e manda dose e uso ao nutricionista. A foto é a `mais-mu-ou-dux-creatina.webp`, que já está no CDN. A lista de "O que a Mais Mu vende" aponta para o capítulo.
