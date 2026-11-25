# Leitura da matriz: BAW Clothing (etapa 5, segundo piloto, fluxo v2)

Analista: sessão da etapa 5, aberta pela coordenação "Pesquisa de pautas" com o `briefs/etapa-5.md` e o adendo de
25/11/2026. Relato em `relatos/etapa-5.md`.

- **Estado:** as 35 linhas em `pronta` (revisão concluída, não aprovação), gravadas pela coordenação na integração de
  25/11/2026 a partir do `REVISAO.md`: 30 pela primeira passada (commit `5ad2ca03`) e 5 pela segunda (`caa17fffe`),
  em `estados-revisao.csv`. A decisão do Bruno fica em `4-saida/decisoes.json`.
- **Insumos:** fechados no commit `5544b2e1` (a `main` com o fechamento de insumos; os insumos são os mesmos de
  `7ae53114`). A cobertura lê os onze artigos no commit `4c639f06`; `content/` e `src/lib/couponsData.ts` não mudaram
  entre `4c639f06` e `5544b2e1` (`git diff --stat` vazio).
- **Como refazer:** `node montar-matriz.cjs` e depois `node validar-matriz.cjs`, nesta pasta ou de qualquer outra. O
  gerador reescreve a `matriz.csv` e o bloco de contagens abaixo; o validador para se um id não existe, se uma célula
  está vazia, se a prioridade foge de `@nao-se-aplica` em `manter`, `nao-criar` e `ideia-registrada`, se uma evidência
  principal não está nas referências da própria linha, se um `criar-artigo` não diz o que acrescenta, se aparece código
  de terceiro e se as contagens daqui não batem com a matriz.
- **Lido antes da matriz:** a orientação, a semente (`02_Artigos/baw-fatos-1611.md`), o dossiê
  (`01_Parceiros/BAW-Clothing.md`), os fatos dos calçados (`02_Artigos/baw-calcados-fatos-2011.md`), a Fila de Pautas
  (seções 1, 2 e 4 e a linha da BAW no estoque), os três relatos, o `resumo-sinais.md`, os quatro CSVs e o bruto do
  Google, do Trends e da vitrine, varrido por preço, data, prazo, volume e promoção.

## 1. Contagens

<!-- contagens:inicio -->
Gerado por `montar-matriz.cjs`: 35 oportunidades (`op-baw-0001` a `op-baw-0035`).

| Ação | Linhas | Ids |
|---|---|---|
| `criar-artigo` | 2 | 0009, 0025 |
| `melhorar-capitulo` | 5 | 0006, 0008, 0014, 0015, 0020 |
| `atualizar-fatos` | 1 | 0012 |
| `melhorar-pagina-cupom` | 1 | 0013 |
| `links-internos` | 3 | 0021, 0022, 0023 |
| `video` | 1 | 0035 |
| `manter` | 12 | 0001, 0002, 0003, 0004, 0005, 0010, 0011, 0016, 0017, 0018, 0019, 0024 |
| `nao-criar` | 6 | 0026, 0027, 0028, 0030, 0032, 0033 |
| `ideia-registrada` | 4 | 0007, 0029, 0031, 0034 |

| Prioridade | Linhas | Ids |
|---|---|---|
| `alta` | 2 | 0012, 0013 |
| `media` | 5 | 0006, 0009, 0014, 0021, 0022 |
| `baixa` | 6 | 0008, 0015, 0020, 0023, 0025, 0035 |
| `@nao-se-aplica` | 22 | 0001, 0002, 0003, 0004, 0005, 0007, 0010, 0011, 0016, 0017, 0018, 0019, 0024, 0026, 0027, 0028, 0029, 0030, 0031, 0032, 0033, 0034 |

| Confiança | Linhas |
|---|---|
| `alta` | 3 |
| `media` | 25 |
| `baixa` | 7 |
<!-- contagens:fim -->

## 2. As perguntas da orientação

| # | Estado depois da análise | Linhas |
|---|---|---|
| P1 | Tênis executado pela BW7, fora do programa (registro em `op-baw-0011`, cobertura `cob-baw-0071` a `0076`). Moletom: criar, com prioridade baixa e janela de inverno. Camiseta oversized, calça e kids: não criar | `op-baw-0011`, `0025` a `0028` |
| P2 | Executada pela BW10, fora do programa (registro em `op-baw-0019`, cobertura `cob-baw-0087` a `0094`). Sobra a Boxy e a New Over, e dois artigos que ainda não linkam a BW10 | `op-baw-0019`, `0020`, `0021` |
| P3 | Respondida pela releitura de 24/11. A BW6 e o FAQ da `/cupons/baw` têm atualização com prazo, que depende de um carrinho na semana de 27/11 | `op-baw-0012`, `0013` |
| P4 | Loja física: criar, com dependências de fonte. Collabs à venda: ideia registrada até o código ser testado numa peça delas. Collabs fora do site: não criar | `op-baw-0009`, `0029`, `0030` |
| P5 | O erro sobre o dono é de terceiros e a BW3 já o corrige. O ChatGPT acha o nosso código, mas recomenda trocá-lo na primeira compra; a BW4 já diz o que o teste mostrou. Nenhuma visão de IA do Google cita o nosso site | `op-baw-0001`, `0003`, `0005` |
| P6 | Sem leitura da loja oficial (bloqueio em 16 e 18/11). A frase genérica dos artigos está certa; melhora só com a leitura | `op-baw-0008` |
| P7 | Perguntas sem resposta nos onze: "o que aconteceu com a BAW" e "faliu", "o que significa BAW", desconto progressivo (a loja não publica escala na `/combos`, lida em 18/11; faltam o banner dela, as páginas de kit e o carrinho), modelos de tênis que a loja não vende hoje, loja física | `op-baw-0006`, `0007`, `0009`, `0014`, `0015` |

## 3. Fatos que decidem (dado, com o id)

- **Vitrine da Black Friday, 24/11** (`sin-baw-1078` a `1082`; captura e imagem original na coleta
  `20261124-1808-vitrine-blackfriday`): banner "PIX NIGHT / Até 80%OFF / PAGUE 3, LEVE 4 / NO SITE TODO +15%OFF NO PIX";
  o "+30% na segunda peça" de 18/11 sumiu; nenhuma data e nenhum regulamento na página. Da semente: em 16/11 a home
  mostrava um "PIX DAY" de um dia, com até 80% e 15% extra no Pix (dossiê, seção 1).
- **Preços** (`sin-baw-1084` a `1103`): das peças da semente, mudaram a Oversized BAW Subscript (R$ 79,00, era R$ 89,00
  em 16/11) e a BR Regular Locally Grown (R$ 79,00 nas três cores, com preço "de"); a Sandal Summer Party saiu das duas
  vitrines. Nenhum dos onze artigos cita a Summer Party.
- **Autocompletar e "As pessoas também perguntam"** (resumo dos sinais, seções 2 e 3): "O que aconteceu com a BAW?" em
  9 das 13 buscas lidas, nas três formas (o mesmo bloco se repetindo); "baw clothing faliu" e "baw desconto
  progressivo" completam; "baw outlet" e "baw bom retiro" dão 10 sugestões cada, com bairro e endereço; "baw clothing
  hello kitty" é a 10ª sugestão de "baw clothing"; "tenis baw" completa com modelos que a loja não lista hoje.
- **Trends** (coleta `20261118-2054-google-trends`): "moletom baw" tem valor quase só de 26/04 a 13/09/2026 (pico de 70
  em 31/05); as semanas mais altas de "baw clothing" em 12 meses são as de 16 e 23/11/2025 (100 e 97). Relacionadas em
  ascensão de "baw clothing": Dust, Centauro, Hering, Bolovo e Sufgang (`sin-baw-1042` a `1046`).
- **Visão de IA de "cupom baw"** (`sin-baw-0822`; bruto `serp-09-cupom-baw.txt`, linhas 21 e 25): descreve "descontos
  progressivos" com escalas de sites de cupom e "Frete Grátis: Disponível para pedidos acima de R$ 499"; a
  `/cupons/baw` diz R$ 399, pela faixa do site.
- **Página de combos, 18/11** (coleta `20261118-1314-navegador-paginas`, `pagina-combos.txt`, sem linha de sinal): a
  `/combos` é vitrine de peças avulsas ("68 PRODUTOS"), sem regra de combo, de "leve N" ou de preço por quantidade no
  texto; o banner de topo não foi baixado (`op-baw-0014`).
- **Nossos dados, 16 a 18/11** (`nos-baw-0431` a `0506`): 3 impressões por consulta e 4 por página, nenhum clique; 1
  visitante na `/cupons/baw` e 1 na BW4. Nada disso mede demanda. BW7 a BW11 são de depois do recorte.
- **Ligações internas no texto** (artigos no commit `4c639f06`): a BW1 e a BW4 não linkam a BW10; a BW5 e a BW6 não
  linkam a BW7; nenhum artigo linka a BW11; a BW8 só é linkada pela BW7.

## 4. Leitura do analista (interpretação, a conferir na revisão)

- **O que tem prazo é a Black Friday.** As duas linhas altas (`op-baw-0012` e `0013`) dependem do mesmo carrinho de
  teste, e o banner não traz regra (`sin-baw-1082`): se ele muda a resposta "o código soma?", só o carrinho diz. Sem
  ele, a `op-baw-0012` se limita ao preço relido da Oversized BAW Subscript (`sin-baw-1087`) e ao banner datado, como
  anúncio sem regra; a `op-baw-0013` fica sem ação. Os 15% do Pix já apareceram duas vezes, no "PIX DAY" de 16/11
  (dossiê, sem bruto) e na Pix Night de 24/11: a leitura, a conferir no carrinho, é que podem ser campanha curta, e não o
  Pix de sempre. O banner diz "NO SITE TODO" e não traz data, então o texto não afirma nem uma coisa nem outra antes do
  carrinho; até lá, vale o Pix de 5% da ficha de 16/11 (dossiê, seção 1), com a data.
- **O pacote de onze artigos cobre as decisões principais da marca.** A maior parte da matriz é `manter`, e o que
  sobra é capítulo, link ou ideia que espera um fato. Só duas pautas novas passam: loja física (média, com a fonte
  como dependência) e moletom (baixa agora, pela temporada).
- **Procura de produto da BAW é pequena e formulada por nome de peça.** O autocompletar de camiseta, calça e kids é
  estampa, cor e modelo; a busca genérica ("camiseta oversized masculina") é de outra escala e pede várias marcas.
  Artigo por categoria repetiria a lista da loja, salvo onde a ficha dá conteúdo próprio (moletom).
- **IA:** a correção sobre o dono já aconteceu na visão de IA do Google entre 16 e 18/11; o que o site pode fazer
  pelos assistentes é ter a pergunta literal no texto ("o que aconteceu com a BAW"), não um capítulo de correção.

## 5. Diferença em relação à semente

**O que o programa trouxe a mais que a semente e o dossiê:**

1. A mudança da vitrine de 24/11 (Pix Night, "pague 3, leve 4", fim da "segunda peça") e os preços por peça, com
   captura: base das duas linhas de prioridade alta.
2. O desconto progressivo e os combos como pergunta que os onze não tratam: a `/combos` não publica regra (18/11), as
   duas versões que circulam são de terceiros e se contradizem, e a visão de IA diverge no frete grátis (R$ 499 contra
   R$ 399).
3. A repetição de "O que aconteceu com a BAW?" em 9 de 13 buscas e o "faliu" no autocompletar (a semente viu a pergunta
   numa busca só).
4. A loja física com endereço formulado no autocompletar, outlets por bairro e a vitrine "Loja 3 Rios" no próprio site.
5. A sazonalidade do moletom no Trends, que transforma "moletom, sem GO" numa pauta com janela.
6. A Hello Kitty na raiz do autocompletar da marca e a lista de collabs à venda e fora do site.
7. Os modelos de tênis que a busca procura e a loja não lista, e o tênis Break vendido por terceiros no Mercado Livre.
8. Dust, Bolovo e Sufgang como relacionadas em ascensão, para a série "BAW ou <marca>".
9. A medição de IA (ChatGPT e Perplexity) com os três casos do `PROGRAMA.md` e a correção da visão de IA do Google.
10. A linha de base dos nossos dados (primeiro dia no índice) e o mapa de links internos entre os onze artigos.

**O que o programa não trouxe ou perdeu:**

- Reclame Aqui, imprensa e políticas não foram recoletados (escopo enxuto): entram pela semente, por seção. O corpo das
  reportagens do NeoFeed e da FashionUnited segue sem leitura, o que limita a resposta a "faliu" e às lojas fechadas: a
  frase "a marca ficaria só com a loja do Bom Retiro", que a semente atribui à FashionUnited (seção 4), é tratada como
  não lida, porque a própria semente registra só o título dessa reportagem (seção 11) (`op-baw-0009`).
- A loja oficial no Mercado Livre continua sem leitura, como na semente; o dossiê afirma que ela existe sem que nenhuma
  sessão a tenha aberto (seção 8).
- "baw é do leo picon" continua sem fonte, como na semente (9.8, item 5).
- O "PIX DAY" de 16/11 estava só no dossiê, sem bruto: entrou como evidência da semente na `op-baw-0012`.
- A semente leu "cupom baw clothing"; o programa leu "cupom baw". Os dois topos mostram anúncios de sites de cupom e
  nenhum carrinho; a diferença não muda decisão.

## 6. Pautas que já existiam fora do programa

| Pauta (Fila) | Linha | O que a evidência acrescenta |
|---|---|---|
| Série "BAW ou <marca>": Pace (BW8) e Carnan (BW11) no ar, BW12 Piet parada | `op-baw-0017`, `0018`, `0031` | Dust confirmada como relacionada que mais sobe; Bolovo e Sufgang novas; nenhuma comparação lida no Google |
| Ordem do Bruno de 20/11: Youcom e Dust depois | `op-baw-0031` | A Dust aparece; a Youcom não, no Trends de 18/11. O programa não muda a ordem |
| BAWPOINTS | `op-baw-0034` | Uma busca relacionada ("Cashback baw"); nenhum artigo cita; espera carrinho |
| Tênis tipo All Star | `op-baw-0033` | Não coletado pelo programa; a média 0 é da sessão dos calçados (20/11) |
| Estoque sem GO: moletom | `op-baw-0025` | Sazonalidade e cobertura de fichas: dá para fazer pela ficha, com janela até abril |
| Estoque sem GO: camiseta oversized | `op-baw-0026` | A decisão de tamanho já tem dono (BW10); a busca genérica pede várias marcas |
| Estoque sem GO: loja física e outlets | `op-baw-0009` | Endereço formulado no autocompletar e vitrine "Loja 3 Rios" no site; a fonte segue com o Bruno |
| Estoque sem GO: collabs | `op-baw-0029`, `0030` | Hello Kitty na raiz da marca; collabs sem página no site ficam fora |
| "O tênis BAW é bom?" | `op-baw-0011` | Executada pela BW7 (21/11); a linha da Fila ainda a lista no estoque (seção 8) |

## 7. Lacunas e perguntas novas, com destino

| Lacuna ou pergunta | Destino | Linha |
|---|---|---|
| Código com o "pague 3, leve 4", base dos 15% do Pix, fim da Pix Night e frete grátis na campanha | Carrinho na semana de 27/11 (Bruno ou sessão de cupons) | `op-baw-0012`, `0013` |
| Regra dos combos e soma com o código | Banner de topo da `/combos` (a página foi lida em 18/11, sem regra no texto), páginas de kit e carrinho (fora do programa) | `op-baw-0014` |
| Fonte da loja física: Instagram e perfil do Google bastam? O código vale na loja? | Bruno e a parceira | `op-baw-0009` |
| Lojas fechadas em 2025 (a frase do Bom Retiro da semente não tem leitura) | Corpo de uma reportagem de 2025 ou outra fonte | `op-baw-0009` |
| Loja oficial no Mercado Livre | Chrome do Bruno, logado | `op-baw-0008` |
| Código numa peça de collab | Carrinho (fora do programa) | `op-baw-0029` |
| BAWPOINTS com o código | Página `/cashback` e carrinho | `op-baw-0034` |
| Significado do nome BAW | Fonte da marca | `op-baw-0007` |
| Fichas da Boxy e da New Over | Coleta nova de fichas ou redação | `op-baw-0020` |
| Desempenho dos onze artigos e cruzamento consulta × página | Rotina do site depois de 30/11 | linhas `manter` |
| Bolovo e Sufgang: são marcas do mesmo público? | Job 1, se a série andar | `op-baw-0031` |

## 8. Divergências em arquivos de outros papéis (avisadas à coordenação, não corrigidas)

1. `01_Parceiros/BAW-Clothing.md`, seção 2: "Loja Oficial BAW no Mercado Livre: existe", pelo handoff de 16/11. Nenhuma
   sessão abriu a página (semente 11; etapa 3, seção 4, P6).
2. `01_Parceiros/BAW-Clothing.md`, abertura: segue "Ainda sem artigo"; são onze no ar (a etapa 4 já tinha avisado).
3. `03_Memoria/Fila-de-Pautas.md`, linha da BAW no estoque: ainda lista "o tênis BAW é bom?" como estoque sem GO, e a
   BW7 está no ar desde 21/11.
4. `briefs/etapa-5.md`, "Conteúdo já publicado": seis artigos; são onze (o adendo de 25/11 corrige).
5. Dois banners diferentes no mesmo dia, sem erro de ninguém: o arquivo de campanha do site
   (`content/campanhas/baw-black-friday-2026.json`) leu o banner da home ("Blackweek, até 80% OFF, pague 3, leve 4"), e a
   etapa 3 leu o da `/blackfriday` ("PIX NIGHT"). Quem atualizar a BW6 confere os dois.

## 9. O que ficou fora da matriz

- **Temas sem sinal coletado:** camisas, jaquetas, saias, bonés, bolsas e meias como assunto próprio. O autocompletar
  deles é de produto e cor; nenhuma pergunta de decisão.
- **Kits e combos como pauta própria:** entram só pela pergunta do desconto progressivo (`op-baw-0014`).
- **Consolidação de cupom (`/cupons/baw`, BW1 e BW4):** três impressões não permitem comparar desempenho; fica como
  dependência das linhas `manter`, não como linha `consolidar`.
- **Retirada:** nenhuma página tem idade nem dado para isso.
- **Vídeos de review de peça:** sem peça em mãos; só o vídeo do carrinho entrou (`op-baw-0035`).
