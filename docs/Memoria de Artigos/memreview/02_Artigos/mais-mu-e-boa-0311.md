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
status: "pauta-aprovada"
responsavel: "-"
proxima_acao: "redacao"
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
