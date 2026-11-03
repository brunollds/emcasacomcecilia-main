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
