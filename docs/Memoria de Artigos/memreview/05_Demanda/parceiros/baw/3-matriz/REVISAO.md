# Revisão independente da matriz: BAW Clothing (segundo piloto, fluxo v2)

Sessão de revisão (Claude Opus 5.5), aberta pela coordenação "Pesquisa de pautas" com o `briefs/revisao.md` e o adendo
de 25/11/2026, que vale por cima do brief onde os dois divergem. Não participei das etapas 2 a 5. Não editei nenhum
arquivo além deste e não fiz coleta nova nem abri página pública.

- **Commit revisado:** `5ad2ca030d348b73bc978599d7367b356da5e477`, topo do PR #1441 (branch `docs/demanda-baw-etapa5`),
  ainda fora da `main` no início da revisão; peguei por `git fetch origin pull/1441/head`.
- **Objeto:** `3-matriz/matriz.csv` (35 linhas), `LEITURA.md`, `montar-matriz.cjs`, `validar-matriz.cjs` e
  `relatos/etapa-5.md`, sobre os insumos fechados em `5544b2e1` (cobertura lida em `4c639f06`; `content/` e
  `src/lib/couponsData.ts` iguais entre `4c639f06` e a `main` de hoje).
- **Início:** `2026-11-25T01:05-03:00`. **Fim:** `2026-11-25T01:15-03:00`. **Tempo:** cerca de 10 minutos, pelo relógio
  da máquina.

Ids abreviados como na leitura: `op-0012` é `op-baw-0012`, `sin-1079` é `sin-baw-1079`.

## 1. Gerador e validador (adendo, item 1)

No commit revisado, num worktree limpo:

```text
$ node montar-matriz.cjs
matriz.csv: 35 linhas            (e as tabelas de contagem do LEITURA.md)
$ node validar-matriz.cjs
matriz.csv: 35 oportunidades, 20 colunas, 1464 referências conferidas
por ação: criar-artigo 2, melhorar-capitulo 5, atualizar-fatos 1, melhorar-pagina-cupom 1, links-internos 3, video 1, manter 12, nao-criar 6, ideia-registrada 4
por prioridade: alta 2, media 5, baixa 6, @nao-se-aplica 22
por confiança: alta 3, media 25, baixa 7
sem erros
$ git status --short     (vazio: matriz.csv e LEITURA.md saíram iguais)
SHA-256 da matriz.csv gerada = do arquivo no commit: 9fd3f408…f071fa
```

## 2. Alcance da amostra

**Obrigatórias (adendo, item 2), bruto aberto em todas as evidências principais:** as 7 de prioridade alta ou média
(`op-0006`, `0009`, `0012`, `0013`, `0014`, `0021`, `0022`), as 2 `criar-artigo` (`op-0009`, já contada, e `0025`) e as
2 executadas (`op-0011`, `0019`). São 10 linhas.

**Amostra das outras 25:** abri o bruto ou o registro das evidências principais de 14 (`op-0001`, `0003`, `0005`,
`0007`, `0008`, `0010`, `0015`, `0020`, `0026`, `0028`, `0029`, `0031`, `0034`, `0035`) e conferi só o registro no CSV
(id, medida, evidência) de outras 11 (`op-0002`, `0004`, `0016`, `0017`, `0018`, `0023`, `0024`, `0027`, `0030`, `0032`,
`0033`). Nenhuma linha ficou sem conferência de rastro.

| Origem | O que abri |
|---|---|
| `1-bruto/20261124-1808-vitrine-blackfriday` | `vitrine-blackfriday.txt` (cabeçalho e busca de palavras), `captura-blackfriday-banner.png` (vi a imagem: "PIX NIGHT / Até 80%OFF / PAGUE 3, LEVE 4 / NO SITE TODO +15%OFF NO PIX"), `sin-1076` a `1103` no CSV |
| `1-bruto/20261118-2045-google-serp` | serp-03, 05, 07, 08, 09, 10, 12 e 13 por trecho; contagem de "O que aconteceu com a…" nos 13 arquivos (9 de 13, confere), de "Onde fica a BAW?" (3), "Baw outlet" (4) e "Baw loja física" (3) |
| `1-bruto/20261118-2045-google-autocompletar` | `q-102` (baw outlet, 10 sugestões), `q-105` (baw bom retiro, 10), `q-106` |
| `1-bruto/20261118-2054-google-trends` | `trends-a-baw-clothing-sozinha.csv` (linhas 2, 3 e 53: 100, 97 e 83, conferem), `trends-b` inteiro (moletom baw: 27 de 53 semanas com valor, pico 70 em 31/05, média 14, 13 na semana de 15/11; confere), linha `media` de `trends-c`, `trends-a-relacionados.txt` pelos `sin-1042` a `1046` |
| `1-bruto/20261118-1314-navegador-paginas` | `FONTE.md` (observações) e `pagina-combos.txt` |
| `2-processado/` | registros de `sinais.csv`, `cobertura.csv` e `nossos-dados.csv` de todas as evidências principais citadas acima; `resumo-sinais.md`, seção 7 |
| Repositório em `4c639f06` | `black-friday-baw.json` (preços, Pix, "última"), `baw-clothing-e-confiavel.json` (loja física, Pipeline), o bloco `baw` de `couponsData.ts` (FAQ de Black Friday, `stacking`, frete), datas de publicação da BW7, BW10 e BW11, e os links internos dos onze JSONs (no texto e em `relatedArticles`) |
| Vault | semente `02_Artigos/baw-fatos-1611.md` (seções 4 e 11), dossiê `01_Parceiros/BAW-Clothing.md` (seção 1), ficha `02_Artigos/black-friday-baw.md`, `03_Memoria/Fila-de-Pautas.md` (BW7 a BW12, L17 e a linha da BAW no estoque), relatos das etapas 2 (seção 4), 3 (seção 9) e 5, `DIARIO.md` (fechamento de insumos) |

**O que resistiu à conferência:** os ids existem e levam a registros que dizem o que as linhas dizem; os preços de
24/11 batem com o relato da etapa 3 (a BW6 ainda traz a Oversized BAW Subscript a R$ 89,00; a vitrine diz R$ 79,00); os
links internos dos onze artigos são os que a leitura descreve (BW1 e BW4 sem a BW10; BW5 e BW6 sem a BW7; ninguém linka
a BW11 no texto; a BW8 só pela BW7 no texto); as medidas não são lidas como volume (posição, ordem de bloco e índice
do Trends vêm sempre com a ressalva, e a repetição do "O que aconteceu com a BAW?" é tratada como o mesmo bloco, não
como procura somada); nenhum código de terceiro como coisa a usar; o FIRSTBAW só aparece na forma permitida
(`op-0003`); nenhum número de estoque ou de combinações; nenhuma experiência própria; "a última Black Friday" só como
nome de campanha, entre aspas.

## 3. Veredito por oportunidade

`pronta`: eu seguiria a linha como está, sem correção pendente. `devolvida`: a ação pode valer, mas a linha precisa da
correção indicada antes de ir ao Bruno. Inferência minha vem marcada como **(inferência)**.

| Id | Ação / prioridade | Veredito | Motivo ou o que corrigir |
|---|---|---|---|
| `op-0001` | manter | pronta | `sin-0822` (visão de IA sem o nosso código), `nos-0020` e `nos-0434` conferem |
| `op-0002` | manter | pronta | Rastro conferido no CSV |
| `op-0003` | manter | pronta | `nos-0027` traz literalmente a recomendação do ChatGPT de trocar pelo cupom de primeira compra "com 15%"; o FIRSTBAW fica na forma permitida |
| `op-0004` | manter | pronta | Rastro conferido no CSV (BW2 em 7º entre os orgânicos lidos) |
| `op-0005` | manter | pronta | `sin-0808`, `sin-0800` e `nos-0043` conferem; a visão de IA de 18/11 (serp-07) já dá a recompra pelos irmãos |
| `op-0006` | melhorar-capitulo / média | **devolvida** | Ver 4.1 |
| `op-0007` | ideia-registrada | pronta | `sin-0712` e `sin-0014` conferem; não usa o título do vídeo como fonte |
| `op-0008` | melhorar-capitulo / baixa | pronta | `sin-0907` (Break, R$ 599,99, vendedor não identificado) confere |
| `op-0009` | criar-artigo / média | **devolvida** | Ver 4.2 |
| `op-0010` | manter | pronta | `nos-0452` (posição média 4) confere |
| `op-0011` | manter (executada, BW7) | pronta | Registro da execução correto; `sin-0700` e `sin-0228` conferem; preços dos tênis de 24/11 iguais aos de 16/11 |
| `op-0012` | atualizar-fatos / alta | **devolvida** | Ver 4.3 |
| `op-0013` | melhorar-pagina-cupom / alta | **devolvida** | Ver 4.4 |
| `op-0014` | melhorar-capitulo / média | **devolvida** | Ver 4.5 |
| `op-0015` | melhorar-capitulo / baixa | pronta | serp-03 mostra Casual First, Casual Five e Break Mad; os seis tênis do catálogo (`cat-0670` a `0675`) não incluem nenhum deles |
| `op-0016` | manter | pronta | Rastro conferido no CSV; `sin-1096` (Linus a R$ 169,00, igual) e `sin-1103` (Summer Party fora) conferem |
| `op-0017` | manter | pronta | Rastro conferido no CSV |
| `op-0018` | manter | pronta | Rastro conferido no CSV |
| `op-0019` | manter (executada, BW10) | pronta | Registro correto. Observação sem correção exigida: "no ar desde 23/11" é a data de publicação do JSON; o deploy não foi conferido, e o 200 no site foi conferido em 25/11 (`DIARIO.md`) |
| `op-0020` | melhorar-capitulo / baixa | pronta | `sin-0210` e `sin-1036` (média 12, igual à de "baw clothing" na comparação C) conferem |
| `op-0021` | links-internos / média | pronta | BW1 e BW4 não linkam a BW10 nem no texto nem em `relatedArticles` em `4c639f06`; esforço pequeno e resposta própria justificam a média |
| `op-0022` | links-internos / média | pronta | BW5 e BW6 não linkam a BW7; "O tênis BAW é bom?" está no bloco de serp-08 e serp-13 |
| `op-0023` | links-internos / baixa | pronta | Rastro conferido no CSV; links conferidos nos JSONs |
| `op-0024` | manter | pronta | Rastro conferido no CSV |
| `op-0025` | criar-artigo / baixa | pronta | Ver 4.6 |
| `op-0026` | nao-criar | pronta | `sin-0878` (BAW em 8º em "camiseta oversized masculina") e `sin-1030` (61 contra 12, mesma comparação) conferem |
| `op-0027` | nao-criar | pronta | Rastro conferido no CSV |
| `op-0028` | nao-criar | pronta | `sin-0317` confere; contagem de fichas, não de estoque |
| `op-0029` | ideia-registrada | pronta | As duas camisetas Hello Kitty estão entre as 9 peças novas do `resumo-sinais.md`, seção 7; coincide com a Fila e diz o que acrescenta |
| `op-0030` | nao-criar | pronta | Rastro conferido no CSV |
| `op-0031` | ideia-registrada | pronta | `sin-1042` a `1046` conferem; não muda a ordem do Bruno de 20/11 nem a condição da BW12; Bolovo e Sufgang já vêm marcadas como leitura a conferir |
| `op-0032` | nao-criar | pronta | Rastro conferido no CSV |
| `op-0033` | nao-criar | pronta | Rastro conferido no CSV; a evidência de All Star é declarada como de fora do programa |
| `op-0034` | ideia-registrada | pronta | `sin-0847` (uma vez, bloco que se repete) confere; coincide com a Fila |
| `op-0035` | video / baixa | pronta | `sin-0958` (380) e `sin-0952` (333) conferem; sem peça em mãos |

**Resultado:** 30 `pronta` e 5 `devolvida` (`op-0006`, `op-0009`, `op-0012`, `op-0013`, `op-0014`).

## 4. Achados das linhas devolvidas e das obrigatórias

### 4.1 `op-0006` (o que aconteceu com a BAW): uma fonte que a BW3 não cita

A contagem confere: a pergunta está no bloco de 9 das 13 buscas (serp-01, 03, 04, 05, 07, 08, 10, 12 e 13), e "baw
clothing faliu" completa (`sin-0079`). A leitura do bloco repetido está certa.

**Corrigir:** a lacuna manda responder "com as fontes que a BW3 já cita (…, planos de exterior pela Pipeline em
2026)". A BW3 em `4c639f06` cita a Pipeline só para a recompra e para o CEO ("os irmãos recompraram o controle e que
Bruno Karra é o CEO"). "Exterior" está só no título da reportagem ("Baw Clothing quer exterior e sócios
influenciadores", semente, seção 11), da qual foram lidos dois parágrafos. Tirar "planos de exterior" da lista do que
a BW3 já cita, ou dizer que viria do título, com atribuição.

### 4.2 `op-0009` (loja física): uma atribuição que a própria semente desmente, e "nenhuma página responde"

A procura formulada confere: "baw outlet" e "baw bom retiro" com 10 sugestões cada (com endereço e telefone), "Onde
fica a BAW?" em 3 buscas, "Baw outlet" e "Baw loja física" como relacionadas de 4 e 3. A `/loja3rios` existe no site
sem endereço (`navegador-paginas/FONTE.md`). A pauta coincide com o estoque sem GO da Fila, e a linha diz o que a
evidência acrescenta. O precedente da L17 confere (Fila, seção 1: "Artigo próprio (Bruno, 21/11)").

**Corrigir:**

1. A lacuna diz que o texto acrescenta "o que a imprensa de 2025 diz que fechou (a marca ficaria só com a loja do Bom
   Retiro, segundo a FashionUnited)". A semente atribui isso à FashionUnited na seção 4, mas a seção 11 da mesma semente
   registra que da FashionUnited só se leu o título ("o corpo pede cadastro"). O fato não tem leitura confirmada. A
   linha deve dizer isso e pôr nas dependências ler o corpo da reportagem (ou outra fonte), ou tirar o fato do que o
   texto acrescenta.
2. A justificativa diz "Nenhuma página nossa responde". A BW3 tem o item "A BAW Clothing tem loja física?" e responde
   que a página "Nossas Lojas" não listava endereços (`cob-0044`, parcial, que a própria lacuna cita). Trocar por
   "nenhuma diz onde fica".

A prioridade média e a confiança baixa ficam: o tema é formulado, não há volume, e a fonte depende do Bruno e da
parceira.

### 4.3 `op-0012` (BW6, Black Friday): a alta se sustenta sem o carrinho, mas a linha afirma o que só o carrinho diria

**A evidência sustenta a alta sem o carrinho (adendo, item 5)?** Sim, pelo prazo e por uma atualização que já existe
**(inferência sobre o peso dos dois motivos)**: a Black Friday é sexta, 27/11; as duas semanas mais altas de "baw
clothing" em 12 meses são as de 16 e 23/11/2025 (100 e 97, conferido no bruto); a BW6 é o 6º orgânico lido de "baw
black friday" (`sin-0854`); e o texto da BW6 traz a Oversized BAW Subscript a R$ 89,00, que a vitrine de 24/11 mostra a
R$ 79,00 (`sin-1087`). Sem o carrinho, a atualização é pequena (preços relidos e o banner datado), mas a janela do
artigo é esta semana.

**Fala da oferta só como provisória?** Quase. A lacuna e as dependências tratam a Pix Night e o "pague 3, leve 4" como
banner sem regra, e as notas dizem "Regras provisórias até o carrinho". Duas frases saem disso.

**Corrigir:**

1. Justificativa: "A regra nova da vitrine muda a resposta central ('o código soma?') e a conta do Pix". O banner não
   tem regra, data nem regulamento (`sin-1082`); o que ele muda só se sabe no carrinho. Escrever "pode mudar".
2. Notas: "Os 15% no Pix voltaram na Pix Night de 24/11: é campanha curta que se repete, não regra do site, e o texto
   trata assim (o Pix de sempre segue com 5%)". É leitura do analista, apoiada no "PIX DAY" de 16/11 (dossiê, sem
   bruto) e no nome "Pix Night"; o banner diz "NO SITE TODO" e não traz data. Marcar como leitura e condicionar a
   instrução ao texto ao carrinho. Para os 5%, citar a fonte e a data (dossiê, seção 1: ficha de 16/11, revisar em
   16/12); na `/blackfriday` de 24/11 a palavra "pix" não aparece no texto da página, só na imagem.

### 4.4 `op-0013` (FAQ de Black Friday da `/cupons/baw`): a alta depende inteira do carrinho

O que a página diz hoje confere com `couponsData.ts` em `4c639f06`: "até 80% OFF", o teste de novembro com camiseta
em promoção, a tabela "O que acumula" com o Pix de 5% e o frete a partir de R$ 399.

**A evidência sustenta a alta sem o carrinho?** Não. Sem o carrinho, não há o que mudar na página: o que ela afirma
segue apoiado no teste de 17/11 e no dossiê (revisar em 16/12), e a própria lacuna diz "O que a página acrescenta,
depois do carrinho". A alta vale só se o carrinho sair até 27/11 **(inferência)**.

**Corrigir:** a justificativa fala em "mesma regra nova"; é banner sem regra publicada. E deixar escrito que a
prioridade alta é condicionada ao carrinho na semana de 27/11 e que, sem ele, a linha não tem ação. A lacuna já trata a
oferta como provisória.

### 4.5 `op-0014` (desconto progressivo e combos): a leitura de 18/11 da `/combos` ficou fora

A procura e a contradição de terceiros conferem: "baw desconto progressivo" completa (`sin-0104`); a visão de IA de
"cupom baw" dá 3/4/5 peças com 10/15/20% (serp-09, linha 21) e um trecho de site de cupons dá 2/3/4 peças com
15/20/25% (linha 50).

**Corrigir:**

1. A linha diz que "a etapa 2 coletou só as listas de produtos" e põe nas dependências "Ler a regra nas páginas de
   combo e de kit". A `/combos` foi lida em 18/11 no navegador (`1-bruto/20261118-1314-navegador-paginas`,
   `pagina-combos.txt` e `FONTE.md`): "Nenhuma regra de combo, de 'leve N' ou de preço por quantidade no texto da
   página"; "é uma vitrine de peças avulsas". É um dado que o programa tinha e a matriz perdeu. Citar essa leitura e
   reduzir a dependência às páginas que não foram lidas (as de kit) e ao carrinho.
2. "Os combos são oferta permanente do site, não só da campanha" não tem fonte: as vitrines foram lidas em 18/11, já
   na Black Friday, e o banner da `/combos` é de agosto (`lp_crazy_ultimas_v2.jpg`, não baixado). Marcar como
   inferência ou tirar.
3. **(inferência)** Com a leitura de 18/11, já existe uma resposta curta possível sem carrinho: "a loja não publica
   escala de desconto progressivo na página de combos (18/11); as escalas que circulam são de sites de cupom e se
   contradizem". O analista decide se isso muda a prioridade ou a confiança.

### 4.6 `op-0025` (moletom): pronta

A pauta coincide com o estoque sem GO da Fila ("moletom e camiseta oversized (melhor com peça em mãos)"), e a linha diz
o que a evidência acrescenta: a temporada no Trends (conferida no bruto) e 11 de 12 fichas de moletom com medida
(relato da etapa 2, seção 4, tabela). A linha responde ao "melhor com peça em mãos" fazendo pelas fichas, sem peça e
sem impressão de uso, como a BW7, e deixa o GO com o Bruno. O card de estilo está nas dependências.

### 4.7 `op-0011` e `op-0019` (executadas): prontas

As duas registram a execução fora do programa com a cobertura certa (`cob-0071` a `0076` e `cob-0087` a `0094`), sem
pedir ação nova. O que sobra de cada uma foi para linhas próprias (`op-0015`, `0022`; `op-0020`, `0021`).

## 5. Pautas que já existem (adendo, item 4)

| Linha | Pauta na Fila | Repete? | Diz o que a evidência acrescenta? |
|---|---|---|---|
| `op-0009` criar-artigo | Estoque sem GO: "loja física e outlets (só com fonte oficial…)" | Coincide, sem briefing nem decisão | Sim (formulações com endereço, `/loja3rios`) |
| `op-0025` criar-artigo | Estoque sem GO: "moletom e camiseta oversized" | Coincide, sem briefing nem decisão | Sim (temporada, fichas com medida) |
| `op-0007` ideia | Nenhuma | Não | — |
| `op-0029` ideia | Estoque sem GO: "collabs" | Coincide | Sim (Hello Kitty na raiz, peças novas de 24/11) |
| `op-0031` ideia | Série "BAW ou <marca>" (ordem do Bruno de 20/11) e BW12 Piet parada na seção 2, com briefing e GO de 23/11 como reserva | Coincide e não mexe na ordem nem na condição da BW12 | Sim (Dust +300%, Bolovo e Sufgang) |
| `op-0034` ideia | "BAWPOINTS ('ganhe 20% de cashback', a conferir…)" | Coincide | Em parte: a busca relacionada; não trata da divergência de 20% contra 10% que a Fila registra (sem correção exigida: a dependência é o carrinho) |

Nenhuma linha recomenda de novo uma pauta que já tem briefing ou decisão do Bruno.

## 6. O que a semente e os insumos tinham e a matriz perdeu

1. A leitura da `/combos` em 18/11, sem regra de combo (`op-0014`, item 4.5).
2. A ressalva da própria semente sobre a FashionUnited (só o título lido), que a `op-0009` não carrega (item 4.2).
3. Não é perda, para registro: o dossiê marca as condições do código (10%, soma com promoção, Pix de 5%, app) para
   revisar em 16/12/2026. A matriz cita a revisão de 17/12 do teste de primeira compra (`op-0003`), mas não as de 16/12.
   É rotina do dono do dossiê, não oportunidade.

## 7. Para a coordenação (arquivos de outros papéis, não corrigidos)

1. `02_Artigos/baw-fatos-1611.md`: a seção 4 atribui à FashionUnited "a marca ficaria só com a loja do Bom Retiro", e
   a seção 11 diz que da FashionUnited só se leu o título. Uma das duas está errada.
2. Confirmo as divergências da seção 8 do `LEITURA.md` que conferi: a Fila ainda lista "o tênis BAW é bom?" no estoque
   (a BW7 está publicada desde 21/11), e o dossiê afirma a loja oficial no Mercado Livre sem leitura.

## 8. Segunda passada

Fica para depois da correção do analista, só sobre a diferença, pelo commit novo que a coordenação mandar em mensagem
numerada.
