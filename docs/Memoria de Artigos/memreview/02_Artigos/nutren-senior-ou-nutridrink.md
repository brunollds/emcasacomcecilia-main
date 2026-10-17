---
titulo_provisorio: "Nutren Senior ou Nutridrink: qual comprar pelo rótulo e pelo preço por porção"
slug_sugerido: "nutren-senior-ou-nutridrink"
parceiro: "[[Nestle-Nutre]]"
status: "pauta-aprovada"
responsavel: "Claude"
proxima_acao: "Job 2 (redação), com as Decisões do Bruno de 17/10/2026 no fim deste briefing"
bloqueado_por: null
data_criacao: "2026-10-17"
publicado_em: null
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
---

# Briefing: Nutren Senior ou Nutridrink

## Abertura: buscas e leituras (17/10/2026)

**Autocompletar (suggestqueries, pt-BR, 17/10/2026):**

- "nutren senior ou nutridrink": "qual o melhor", "nutridrink protein" (sugestoes 2 e 3 com "qual o melhor nutren senior ou nutridrink protein").
- "nutridrink ou nutren senior": "qual o melhor" (512), "nutridrink protein ou nutren senior" e "... qual o melhor".
- "nutridrink ou ensure": "nutridrink protein ou ensure qual o melhor", "qual melhor nutridrink ou ensure", "nutridrink protein senior ou ensure".
- "nutridrink protein ou nutren senior": "... qual o melhor".
- Termos do Nutridrink (para ver o produto que o publico conhece): "nutridrink" puxa protein, senior, compact protein, danone, "sem sabor"; "nutridrink protein" puxa senior, "sem sabor 700g", "senior 750g", "para que serve", "engorda"; "nutridrink protein po" puxa "s/sabor 700g", "s/sabor 350g", "baunilha 350g", posologia, "pode tomar com leite", diabeticos; "nutridrink preco" e "nutridrink tabela nutricional" puxam "senior", "protein", "compact", "danone", "200ml" e "liquido".
- Leitura: `nutren-senior-ensure-ou-sustagen-senior` (JSON inteiro, forma-modelo), `nutren-senior-baunilha-sabores-tabela-nutricional` (briefing-base: a Baunilha 740 g nao tem tabela confirmada) e `nutren-protein-ou-whey` (vault, linha 306: "Nutridrink ... nao foram lidos aqui").
- Busca de canibalizacao em `WT/content/reviews/`: nenhum artigo publicado cita Nutridrink, Danone ou Nutricia (grep sem resultado em `content/`, `src/`, `data/`, `docs/`). No vault, Nutridrink aparece so em dois briefings como "fora do comparativo". O par esta livre.

**Fontes lidas e o que deram:**

- Loja Nestle Nutre (nestlenutre.com.br): bloqueada (403). Nao contornada. Preco e link da Nutre ficam `[PRECO NUTRE: pendente]`.
- Danone (danone.com.br redireciona para danone.com/br/pt/marcas/nutridrink): a pagina marca/nutridrink retornou 404 na leitura. Sem tabela.
- Mundo Danone, `mundodanone.com.br/nutridrink-protein-senior-750g/p` (lida em 17/10/2026): produto "Nutridrink Protein Senior Cafe com Leite 750 g". A pagina diz "25 g de proteina na porcao diaria recomendada", mas nao traz porcao em g/medidas, tabela, lactose, calcio, vitamina D nem ingredientes. Alergenico: "nao contem gluten". Preco de tabela R$ 151,99; preco atual R$ 121,59; compra programada (10% OFF) R$ 109,43; frete "a partir de R$ 15,90". Data do preco: nao aparece na pagina; datar como 17/10/2026 (dia da leitura).
- Drogasil, Drogaraia, Drogal, Panvel, Pague Menos, Extrafarma (varejo, lidas por busca): divergem. Protein Sem Sabor 700 g: 18 g de proteina por porcao (Drogal, Panvel, Pague Menos) contra 15 g (Drogasil, Drogaraia). Porcao sugerida: 47 g (6 colheres) na Drogasil. Vitamina D: "100% do VD" em um anuncio. Lactose: a versao Sem Sabor aparece como "zero lactose" na Drogaraia e na Panvel; "contem derivados de leite e soja" em um site. Protein Baunilha 350 g: tabela de 70 g de porcao com 150 kcal e 7,5 g de proteina (Drogasil, Drogaraia), contra 60 g com 18 g de proteina (Drogal). Nao usar nenhum desses numeros como tabela oficial.
- FatSecret (banco de dados, 1 porcao = 60 g): 248 kcal, 18 g proteina, 29 g carboidrato, 6,5 g gordura. Sem calcio, vitamina D, lactose. Sabor nao informado. Dado de terceiro, so como contexto.
- Conclusao: nao ha rotulo confirmado do Nutridrink em po. O comparativo nao pode fechar a tabela por porcao antes do print.

## Qual versao de cada lado

**Nutren Senior (pó, lata 740 g):** a Baunilha 740 g nao tem tabela confirmada (briefing-base, pendencia 1). Pela regra do Bruno ("a versao de que houver ficha"), usar o Sem Sabor Zero Lactose 740 g, que ja tem ficha no JSON publicado: porcao 27,5 g (3 colheres de sopa rasas), 113 kcal, 10 g de proteina, 375 mg de calcio (38% VD), 12 µg de vitamina D (80% VD), 0 g de lactose. Ficha de origem: `nutren-senior-ensure-ou-sustagen-senior.json`, secao "Os tres rotulos lado a lado". O rendimento e cerca de 27 porcoes por lata de 740 g. Acucares, fibras e gorduras do Zero Lactose nao estao no JSON: pendencia.

**Nutridrink (pó):** a versao comparavel e a linha Protein Senior em pó de 750 g (linha Senior, mesmo publico de 60+). Sabor da unica pagina lida: Cafe com Leite. Versoes de Sem Sabor 700 g e Baunilha 350 g aparecem no varejo, mas a linha Senior 750 g e a que casa com a lata de 740 g. Registrar a Protein Sem Sabor 700 g como alternativa, sem tabela.

**Nutridrink líquido 200 ml:** so contexto. A pagina Extrafarma (Baunilha 200 ml) informa cerca de 300 kcal por embalagem e 18 g de proteina, por varejo. Nao entra na comparacao: formato diferente (pó com liquido nao e comparacao justa).

## Pesquisa do concorrente: o que falta para a matriz

| Item | Nutren Senior Zero Lactose 740 g (porcao 27,5 g) | Nutridrink Protein Senior 750 g (porcao: pendente) |
|---|---|---|
| Porcao | 27,5 g (3 colheres rasas) | [PENDENTE: rotulo; varejo diz 60 g ou 47 g, sem confirmacao] |
| Kcal | 113 | [PENDENTE] (FatSecret 248 kcal/60 g, nao usar) |
| Proteina | 10 g | [PENDENTE] (varejo: 18 g ou 15 g, conflito) |
| Acucares | [PENDENTE] | [PENDENTE] |
| Fibras | [PENDENTE] | [PENDENTE] |
| Lactose | 0 g | [PENDENTE] (Protein Sem Sabor: "zero lactose" no varejo; Cafe com Leite: sem dado) |
| Calcio | 375 mg (38% VD) | [PENDENTE] |
| Vitamina D | 12 µg (80% VD) | [PENDENTE] ("100% do VD" em anuncio, sem µg) |
| Preco | [PRECO NUTRE: pendente] | R$ 121,59 (preco atual, 17/10/2026, Mundo Danone, sem link de afiliado); R$ 151,99 de tabela |
| Porcoes na embalagem | ~27 porcoes (740 g / 27,5 g) | [PENDENTE] |
| Preco por porcao | [PENDENTE] | [PENDENTE] (sem porcao confirmada, nao calcular) |

**Por 100 g (conta nossa, ditas como nossas):**
- Nutren Senior Zero Lactose: 113 kcal / 27,5 g = ~411 kcal/100 g; proteina 10 g / 27,5 g = ~36 g/100 g; calcio 375 mg / 27,5 g = ~1.364 mg/100 g; vitamina D 12 µg / 27,5 g = ~44 µg/100 g. Contas sobre o rotulo do Nutren.
- Nutridrink: nao calcular antes do rotulo.

**Regulatorio (vale para o texto inteiro):**
- O Nutridrink Protein se apresenta na pagina Danone como "pode ser utilizado em nutricao oral ou enteral". Pela regra do Bruno, nutricao enteral segue a RDC 976/2025: sem doenca, sem alegacao de saude, sem faixa etaria no texto. "Massa muscular", "idoso que precisa de forca" e "imunidade" ficam fora.
- Suplemento: so o que o rotulo declara. Nada de "ganha massa" ou "recupera".

## Cupom e preco

- CECI: 10% OFF na loja oficial Nestle Nutre, todas as formas de pagamento, exceto Alfamino, Alfare e formulas infantis de 0 a 12 meses. Frase exata: "CECI: 10% OFF na loja oficial da Nestle Nutre, em todas as formas de pagamento." Confirmar que o Nutren Senior nao cai nas excecoes (nao cai; e formula de adulto).
- Nutridrink/Danone: nao e parceira. Nao ha codigo (grep em `src/lib/couponsData.ts`: sem Danone nem Nutridrink). Dizer: "nao temos codigo para a Danone".
- Preco da Nutre: pendente. Print ou leitura pelo navegador do Bruno.

## Portoes (resumo)

1. Evidencia: parcial. Rotulo do Nutridrink nao confirmado; Nutren Zero Lactose confirmado pela pagina oficial (ja publicado). Falha no lado Nutridrink.
2. Seguranca: ok, desde que o texto fique nos fatos do rotulo.
3. Experiencia propria: nenhuma; nada de "gostoso", "provei", "testei".
4. Anti-canibalizacao: passa. Nenhum artigo publicado responde ao par. O comparativo linka para `nutren-senior-ensure-ou-sustagen-senior` (que ja tem a ficha das 3 versoes) e nao repete a tabela do Senior.
5. Classe: guias-praticos-utilidade, reviewKind "guia".
6. Fontes: Danone oficial inacessivel (404 em /marcas/nutridrink); Nestle Nutre bloqueada (403); varejo contraditorio.
7. i18n: somente-pt.

**Veredito:** NAO PASSA hoje no portao 1 (dado do Nutridrink). Pode passar com o rotulo do Nutridrink 750 g e a tabela da Baunilha 740 g (ou a confirmacao de que a Baunilha nao existe e o Zero Lactose vale como referencia).

## Links e CTA (se o texto sair)

- Interno: `/reviews/nutren-senior-ensure-ou-sustagen-senior` (ficha das 3 versoes), `/reviews/nutren-senior-zero-lactose-ficha-tecnica`, `/reviews/nutren-protein-ou-whey` (o whey e outro par), `/cupons/nestle-nutre`.
- CTA: loja oficial da Nestle Nutre, cupom CECI 10% OFF (sponsored). Nada de link para a Danone.
- Preco Nutre: `[PRECO NUTRE: pendente]`. Preco Nutridrink: R$ 121,59 em 17/10/2026, Mundo Danone (sem link de afiliado, sem carrinho).

## Pontuacao

Nao calculada: o portao 1 nao passa. Recalcular quando o rotulo entrar.

## i18n

Somente PT. Nao escrever em outros idiomas (Nutridrink tem versoes locais, nao verificadas).

## Esqueleto (se o rotulo chegar)

1. Resposta rapida: "Nutren Senior ou Nutridrink: depende da porcao, da proteina por dose e da lactose, nao de um melhor."
2. Quem compara o que: porcao, kcal, proteina, calcio, vitamina D, lactose (tabela com 2 colunas, por porcao e por 100 g).
3. Onde o rotulo nao permite a comparacao (ex.: porcao do Nutridrink se nao confirmada).
4. Para quem cada um faz sentido (perfil: quem precisa de lactose zero; quem quer maior proteina por dose; quem tem prescricao do medico).
5. Preco por porcao (com data e pergunta ao Bruno se entra).
6. Cupom CECI: so no Nutren; nenhum codigo para Danone.
7. Perguntas frequentes (autocompletar: "qual o melhor", "nutridrink protein ou nutren senior").
8. Link para o artigo-base e para `nutren-senior-ensure-ou-sustagen-senior`.

## Perguntas para o Bruno

1. Pode mandar print do rotulo do Nutridrink Protein Senior 750 g (porcao, kcal, proteina, lactose, calcio, vitamina D)? E da Protein Sem Sabor 700 g, se quiser a versao de compra mais comum?
2. Pode mandar print do rotulo da Nutren Senior Baunilha 740 g (o briefing-base ja pediu) e do preco na loja oficial Nutre? Sem isso o comparativo usa o Zero Lactose como referencia.
3. Preco do Nutridrink (R$ 121,59 do Mundo Danone, 17/10) pode entrar no texto com data, ou so no dossie?
4. Confirmar: o comparativo fica com a versao do Nutridrink em pó 750 g (linha Senior) ou prefere a Protein 700 g?
5. Nutridrink nao e parceira: aceita o texto sem codigo nem link de compra?

## Decisões do Bruno (17/10/2026)

As perguntas acima foram respondidas em 17/10/2026; o que vale é esta seção.

- Pauta aprovada no lote de comparativos 1 a 1 da Nestlé Nutre (fila 2).
- Preço do concorrente **entra no texto**, datado ("em 17/10/2026"), com a loja de onde saiu e sem link de afiliado. Preço da Nestlé Nutre também datado.
- O comparativo fala só das diferenças e linka uma vez para o artigo-base no ar: [Nutren Senior, Ensure ou Sustagen Senior](/reviews/nutren-senior-ensure-ou-sustagen-senior).
- CECI: 10% OFF na loja oficial, todas as formas de pagamento, exceto Alfamino, Alfaré e fórmulas infantis de 0 a 12 meses. Não vale no concorrente.
- Fonte dos dados da Nestlé Nutre abaixo: páginas de produto lidas no Chrome em 17/10/2026, sem login nem carrinho.
- Base no ar: os três artigos do Senior (`nutren-senior-ensure-ou-sustagen-senior` recebe o link principal; `nutren-senior-como-tomar-sem-empelotar` e `nutren-senior-zero-lactose-ficha-tecnica` se fizer sentido).
- Nutridrink: a versão em pó para adultos mais velhos à venda hoje (Nutridrink Protein Senior 750 g, a confirmar no rótulo da Danone); a líquida de 200 ml só como contexto.
- Nutren Senior Baunilha na Nestlé Nutre (17/10/2026): 740 g de R$ 188,19 por R$ 169,37 (≈ 23 porções de 31,5 g; ≈ R$ 7,21 por porção, conta nossa); 370 g R$ 100,79; Zero Lactose 740 g de R$ 211,79 por R$ 190,61. Sabores do 740 g: Baunilha, Café com leite, Chocolate, Mix de Frutas. Composto lácteo, "reduzido em açúcares". Porção 31,5 g (3 colheres de sopa cheias): 131 kcal; proteínas 11 g; carboidratos 14 g; açúcares totais 5,7 g (adicionados 0,4); gorduras 3,2 g; fibras 1,3 g; cálcio 375 mg; vit D 25 µg (167% VD); B12 2,4 µg; zinco 11 mg. A coluna "100 ml" da página não fecha com a porção: usar só a porção. O preparo da página diz leite desnatado num passo e água no outro: não descrever preparo (está no artigo "como tomar").
- Sem "massa muscular", "imunidade" ou "ossos" além do formato das alegações do rótulo.
