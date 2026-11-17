# Relato da etapa 4: dados próprios, comercial e cobertura (L'Amazonie)

Sessão: "Demanda L'Amazonie, etapa 4" (Claude Fable 5.2). Este arquivo é o relato para a coordenação; o `DIARIO.md`,
o `COMO-REFAZER.md` e o `LICOES.md` não foram tocados.

## 1. Tempo

| | |
|---|---|
| Início | 2026-11-17T10:06:00-03:00 |
| Fim da primeira entrega (PR aberto) | 2026-11-17T10:35:00-03:00 |
| Fim, com a conferência dos downloads e o processado de todas as lojas | 2026-11-17T10:42:00-03:00 |
| Tempo gasto | 36 minutos |

Divisão aproximada: 2 minutos de leitura, 19 de coleta nas quatro plataformas (10:08 a 10:27), 10 de processamento,
documentação e conferência. Depois da mudança de escopo (seções 9 a 11): mais 7 minutos.

## 2. Plataformas

| Plataforma | Logada no navegador embutido? | O que foi coletado | Coleta |
|---|---|---|---|
| Search Console | Sim, desde o começo | Export de 3 meses do site inteiro (consultas, páginas, países, dispositivos, gráfico) e cinco recortes: consulta contém "amazonie" e páginas `/cupons/lamazonie`, `/cupons/simple-organic`, `/cupons/skelt` e `/cupons/yesstyle` | `_site/20261117-1008-gsc-desempenho` |
| GA4 | Sim, desde o começo | Páginas e telas, aquisição de tráfego e eventos, de 16/08 a 15/11; páginas de 16 e 17/11 | `_site/20261117-1016-ga4-relatorios` |
| Bing Webmaster | Não no começo; o Bruno entrou durante a sessão | Palavras-chave e páginas (3 meses) e o AI Performance: consultas e páginas citadas | `_site/20261117-1020-bing-desempenho` |
| Clarity | Não no começo; o Bruno entrou durante a sessão | Texto do painel (números agregados) do site e das quatro páginas de cupom, em 30 e em 90 dias | `_site/20261117-1023-clarity-painel` |

A IA não fez login em nenhuma. Todos os exports chegaram ao disco pelo botão de exportar, menos o Clarity, que não tem
export do painel: o texto da tela foi gravado em `.txt`, como o `FONTE.md` dele explica.

### O que os dados dizem da L'Amazonie

Nada, como esperado. O período de 3 meses das plataformas termina em 15/11/2026 e a página `/cupons/lamazonie` e os
seis artigos entraram no ar em 16/11/2026.

- Search Console: zero cliques e zero impressões em consultas com "amazonie" e na página de cupom (zero observado, dia a dia).
- Bing: nenhuma linha com "amazonie" nas quatro listas (`@indisponivel`).
- GA4: nenhum caminho com "lamazonie", nem no arquivo de 16 e 17/11 (`@indisponivel`).
- Clarity: zero sessões na página de cupom em 30 e em 90 dias (zero observado).

### Referência de vertical, em 3 meses

| Página | Search Console (cliques, impressões, posição) | GA4 (visualizações) | Clarity (sessões em 90 dias) | No ar desde |
|---|---|---|---|---|
| `/cupons/skelt` | 2, 820, 9,3 | 12 | 6 | 21/10/2026 |
| `/cupons/simple-organic` | 0, 225, 12,3 | 8 | 2 | 03/11/2026 |
| `/cupons/yesstyle` (só PT) | 7, 648, 6,4 | 128 | 12 | 02/06/2026 |

São outras lojas, com idade e mercado diferentes (a YesStyle é internacional e estava sem entrega ao Brasil na última
conferência do dossiê): servem de referência de formato e de perguntas, não de previsão. A consulta que mais mostra
`/cupons/skelt` é "cupom skelt" (278 impressões, posição 9,7). O cruzamento consulta e página dessas três está no
`nossos-dados.csv`.

## 3. Qualidade dos dados de GA4 e Clarity em 17/11/2026

**GA4: há sinal de eventos em dobro.** De 16/08 a 15/11, o `first_visit` tem 5.083 eventos para 2.543 usuários (2,00
por usuário, e deveria ser 1) e o `session_start` tem 6.248 eventos para 3.173 sessões (1,97). A lembrança de 05/11
agora tem evidência: `_site/20261117-1016-ga4-relatorios/ga4-eventos.csv` e a tabela do `FONTE.md`. O que a coleta
não diz: quando começou, se já parou e se o `page_view` e os eventos de cupom também dobram. Para saber, falta um
export por dia (lista da seção 6). Até lá, contagem de eventos e de visualizações do GA4 não vale como número
absoluto; a comparação entre páginas e entre canais continua útil. O GA4 só mede quem aceitou os cookies.

**Clarity: dados desde 04/10/2026, com volume de 09/10 em diante.** Noventa e 45 dias dão o mesmo total (2.122
sessões); entre 04/10 e 08/10 há 11 sessões de gente. Bate com a lembrança de 08/10 como início das gravações reais.
O volume por página de cupom é muito pequeno (2 a 12 sessões): observação, não taxa. Também só mede quem aceitou os
cookies. Nenhuma gravação foi aberta nem copiada.

**Bing:** volume pequeno (136 cliques em 3 meses), mas o AI Performance mostra 9,3 mil citações em respostas de IA no
período, quase todas de Dolce Gusto e YesStyle. Das páginas das lojas de referência, só
`/reviews/autobronzeador-skelt-qual-escolher` aparece citada (2 vezes). O Bing avisa que é amostra.

## 4. Cobertura (parte A)

`cobertura.csv` tem 70 linhas: 28 da L'Amazonie e 42 de referência de vertical.

- **L'Amazonie:** 8 perguntas atendidas pela página `/cupons/lamazonie` e 20 pelos seis artigos (LZ1 a LZ6). Estado
  conferido, não presumido: os seis JSONs têm `draft: false` e o site respondeu 200 nos sete endereços em
  17/11/2026 às 10:28. Estão todos `no-ar`.
- **Divergência encontrada:** o `ROTEIRO-PILOTO.md` fala em "seis briefings", o dossiê `01_Parceiros/LAmazonie.md`
  abre dizendo "Ainda sem artigo" e as seis fichas de `02_Artigos/` têm `status: "pronto-para-deploy"`. Os três estão
  desatualizados: os artigos foram publicados em 16/11. Cada linha da cobertura anota isso em `notas`. Não corrigi
  esses arquivos, que são de outras sessões.
- **Cobertura parcial e o que falta**, por linha, em `notas`. Resumo: soma do cupom com o cashback e valor mínimo
  (sem leitura), composição e volume do sérum (falta o rótulo), uso dos produtos (sem experiência nossa), preços do
  Mercado Livre (não lidos), datas e regulamento da Black Friday (não publicados) e teste do cupom nas páginas de
  oferta da Black Friday.
- `02_Artigos/lamazonie-fatos-1611.md` é a pesquisa semente, não é conteúdo: ficou fora do CSV.
- **Referência de vertical:** página de cupom e artigos em PT de Simple Organic (1 + 9), Skelt (1 + 16) e YesStyle
  (1 + 14), com mercado, entrega ao Brasil e idade da página em `notas`. A coluna `cobertura` dessas linhas é
  `@nao-investigado`: não avaliei se cada artigo responde por inteiro à pergunta dele. O estado `no-ar` dos artigos
  dessas três lojas vem do JSON, sem conferência de resposta 200 artigo a artigo (as quatro páginas de cupom foram
  conferidas).
- `entidades` fica `@nao-investigado` nas linhas da L'Amazonie, até o `catalogo.csv` da etapa 2 ficar pronto, e
  `@nao-se-aplica` nas linhas das outras lojas.
- Tipos de artigo que as três lojas têm e a L'Amazonie ainda não: guia de escolha por produto, guia de produto,
  comparativo com concorrente, guia de presente e promoção datada (Skelt e Simple Organic); entrega, aplicativo e
  comparativos de loja (YesStyle). Isto é fato de cobertura; se vira pauta é assunto da etapa 5.

## 5. Como refazer cada CSV

Os três saem de um script só, que lê o repositório e as coletas de `_site/`:

```bash
node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/lamazonie/2-processado/etapa4-montar.mjs"
```

Rodar na raiz do repositório. O script para com erro se achar célula vazia, id repetido, coluna a mais ou a menos,
trecho de evidência que não existe no arquivo ou artigo da L'Amazonie em rascunho. Rodar duas vezes dá o mesmo
resultado.

- **`cobertura.csv`:** as perguntas da L'Amazonie e a avaliação total ou parcial estão escritas no script (listas
  `pagCupom` e `ARTIGOS_LZ`): são leitura de quem analisou. O título da seção usado como evidência é lido do JSON do
  artigo. As linhas de referência saem de todo artigo em PT com `affiliate` igual a `simple-organic`, `skelt` ou
  `yesstyle`. A data `lido_em` e a hora da conferência do 200 são constantes do script: quem refizer em outro dia
  confere os endereços de novo e troca as duas.
- **`nossos-dados.csv`:** sai das quatro coletas. Regras: consulta e página da L'Amazonie sempre entram; das lojas
  de referência entram as páginas de cupom, os artigos em PT que aparecem nos exports e, no cruzamento do Search
  Console, as consultas com 10 impressões ou mais. O resto fica só no bruto.
- **`comercial.csv`:** quatro linhas `@indisponivel` (vendas, receita, comissão e resgates), escritas no script.

O `COMO-REFAZER.md` não foi editado: fica para a coordenação copiar o comando acima.

## 6. O que ficou de fora e o que o Bruno precisa exportar

Nada trava o piloto. Em ordem de utilidade:

1. **Painel comercial da L'Amazonie.** Relatório de pedidos ou resgates com o código `CECILIA`, de 16/11/2026 em
   diante, com data, valor e produto, se o parceiro mandar. Sem ele o `comercial.csv` fica `@indisponivel`.
2. **GA4 por dia, para datar a duplicação.** Relatórios > Engajamento > Eventos, propriedade Emcasacomcecilia, de
   16/08 a 17/11/2026, com a dimensão Data adicionada (ou uma análise detalhada com Data e Nome do evento e as
   métricas Contagem de eventos e Total de usuários), filtrando `first_visit`, `session_start` e `page_view`. A
   sessão consegue fazer isso sozinha com o GA4 logado; não fiz por tempo.
3. **Search Console de novo no fim de novembro.** Os mesmos seis exports depois de 30/11/2026, para pegar as
   primeiras semanas da L'Amazonie. Também faz sozinha com a conta logada.
4. Não coletados, por escolha: recorte do Search Console por artigo das lojas de referência (os números deles vêm
   das 1.000 páginas do export geral), visão de 24 horas do Search Console, abas Device, Country e Topic Portfolio do
   Bing, mapas de calor e gravações do Clarity, e as consultas manuais de IA do roteiro (3 a 5 perguntas em uma ou
   duas plataformas), que são coleta de `1-bruto/` e não estavam no pedido desta etapa.

## 7. Incidentes da coleta

- Abri as plataformas na aba ativa do painel. Quando o Bruno abriu uma aba para entrar no Bing, uma navegação minha
  caiu nela e a levou ao Search Console. Passei a usar uma aba própria, criada em segundo plano, com o `tabId` em toda
  chamada.
- O Search Console grava todo export com o mesmo nome, e quatro recortes baixados em sequência se sobrescreveram.
  Refiz um a um, movendo o arquivo depois de cada download.
- Ao guardar o export de aquisição do GA4, movi por engano um arquivo de mesmo nome que já estava em Downloads desde
  07/11/2026 (período de 10/10 a 06/11). Percebi pela data no cabeçalho, guardei o arquivo certo e devolvi o antigo a
  Downloads, com o nome original.
- Cada download abre uma confirmação de salvar para o Bruno. Enquanto ela espera, o arquivo fica completo em
  Downloads com nome `.tmp`; copiei dali. Depois que ele confirmou, comparei byte a byte as cópias de Downloads com
  as guardadas, eram iguais, e apaguei as de Downloads.

## 8. Sugestões de formato

1. **Estado para "ausente de um relatório completo".** Hoje a regra é `0` para zero observado e `@indisponivel` para
   relatório sem a linha. No Bing e no GA4 o export é a lista inteira, e a ausência quer dizer "nenhum registro", o
   que é mais forte que indisponível e mais fraco que um zero escrito pela fonte. Sugestão: um código `@ausente`, ou
   aceitar `0` com a ressalva em `qualidade`. Usei `@indisponivel`, como pedido.
2. **`cobertura.csv` precisa de uma coluna `parceiro`.** As linhas de referência de vertical são de outras lojas e
   hoje só o texto de `notas` diz isso. Com a coluna, a matriz filtra sem ler texto. Enquanto não houver, todas
   começam com "Referência de vertical (<loja>)".
3. **`nossos-dados.csv`: separar "relatório" de "filtro".** O filtro do export está dentro de `relatorio`, entre
   parênteses. Uma coluna `filtros`, como a do `sinais.csv`, deixaria o cruzamento mais limpo.
4. **Chave de recorte.** Para "consulta contém amazonie" usei a dimensão `consulta` e a chave `consulta contém
   "amazonie"`. Valeria fixar no `FORMATOS.md` como escrever uma chave que é um filtro, não um valor.
5. **Coleta em texto de tela.** O Clarity não exporta o painel. O `modelos/FONTE.md` poderia citar "texto da tela
   gravado em `.txt`" entre os métodos, com a regra de pôr o endereço e a hora no começo do arquivo.
6. **`estado` da cobertura com a prova.** "No ar" foi conferido por resposta 200. Uma coluna `estado_conferido_em`
   (ou a regra de escrever a prova em `notas`) evitaria presumir o estado pela ficha do vault, que estava atrasada.
7. **Exports brutos em zip.** Guardei o zip original e os CSVs extraídos (com nome sem acento, porque o Windows
   corrompeu os nomes acentuados ao extrair). Vale decidir no `PROGRAMA.md` se o bruto é o zip, o extraído ou os dois.

## 9. Conferência dos downloads (pedido do Bruno, via coordenação)

O Bruno avisou que a janela de salvar abriu sem ele esperar, que alguns arquivos se sobrescreveram e que ele
renomeou um sem querer. Conferi os 26 exports guardados em `_site/` pelo conteúdo, não pelo nome: filtro, propriedade,
período, número de linhas e uma linha conhecida. A tabela de cada coleta está no `FONTE.md` dela, na seção
"Conferência dos arquivos".

**Resultado: os 26 conferem com o que o `FONTE.md` diz. Nada precisou de coleta nova.**

| O que estava errado | Onde | O que foi feito |
|---|---|---|
| Quatro recortes do Search Console se sobrescreveram em Downloads (todo export sai com o mesmo nome) | "amazonie", `/cupons/lamazonie`, `/cupons/simple-organic`, `/cupons/skelt` | Exportados de novo, um a um, ainda durante a coleta, antes de qualquer processamento. Cada zip guardado tem o `Filtros.csv` certo dentro |
| Arquivo com nome trocado | O recorte de `/cupons/lamazonie` chegou como `lamazonie.zip` | Identificado pelo `Filtros.csv` (Página: +/cupons/lamazonie); registrado no `FONTE.md` |
| Arquivo com nome trocado | O painel do Clarity de 90 dias, site inteiro, chegou como `clarity.txt` | Identificado pela primeira linha (endereço com `Last 90 days`, sem filtro) e pelas 2.122 sessões; registrado no `FONTE.md` |
| Arquivo errado guardado por engano | O primeiro "aquisição" do GA4 era um export antigo de 07/11 (10/10 a 06/11) que já estava em Downloads | Trocado pelo certo (16/08 a 15/11) antes de gerar qualquer CSV; o antigo voltou para Downloads |

Depois da conferência recalculei tamanho e SHA-256 dos 66 arquivos listados nos quatro `FONTE.md`: todos iguais aos
da tabela. Os CSVs extraídos do Search Console foram comparados byte a byte com o conteúdo dos zips.

## 10. Todas as lojas (mudança de escopo do Bruno)

O processado do piloto continua como combinado. Para as outras lojas há um arquivo só, fora da pasta do parceiro:

- `_site/2-processado/nossos-dados-lojas.csv`: 8.295 linhas, 28 das 31 lojas com alguma linha.
- `_site/2-processado/resumo-lojas.md`: **uma tabela por loja**, com cliques, impressões e posição no Google,
  impressões no Bing, citações de IA e visualizações do GA4 de cada página de cupom e de cada artigo, mais as
  consultas com a marca. É gerado pelo script e só traz fato.
- `_site/2-processado/COMO-REFAZER.md`: a regra de atribuição e o comando.

Uma escolha minha que foge do pedido: o arquivo traz as 31 lojas, inclusive as quatro do piloto, porque nele a regra
é completa (todos os idiomas, sem corte) e o `nossos-dados.csv` do piloto é um recorte. Se a coordenação preferir só
as 27, é um filtro pelo `registro_id`.

### Fato: uma linha por loja, 16/08 a 15/11/2026

Search Console (só o que entrou nas 1.000 páginas e nas 1.000 consultas do export), Bing e GA4.

| Loja | Páginas no export do Google | Cliques Google | Impressões Google | Consultas com a marca | Impressões dessas consultas | Citações de IA (Bing) | Visualizações GA4 |
|---|---|---|---|---|---|---|---|
| SHEIN | 102 | 815 | 105.784 | 234 | 35.843 | 336 | 833 |
| YesStyle | 133 | 410 | 78.880 | 221 | 34.296 | 881 | 838 |
| Dolce Gusto | 28 | 616 | 47.780 | 120 | 5.740 | 5.543 | 1.410 |
| Nestlé Nutre | 25 | 192 | 24.649 | 56 | 3.111 | 352 | 290 |
| Hostinger | 144 | 34 | 14.194 | 20 | 10.335 | 18 | 156 |
| Insider | 30 | 95 | 10.153 | 35 | 2.050 | 85 | 416 |
| Max Titanium | 19 | 28 | 7.762 | 19 | 881 | 22 | 148 |
| Magalu | 5 | 20 | 7.006 | 8 | 2.233 | 245 | 70 |
| Black Skull | 21 | 22 | 5.180 | 14 | 491 | 26 | 168 |
| I Wanna Sleep | 17 | 55 | 5.024 | 6 | 337 | 34 | 190 |
| DAMIE | 26 | 73 | 4.211 | 11 | 1.532 | 13 | 404 |
| Skelt | 17 | 14 | 2.950 | 7 | 926 | 2 | 98 |
| Let's Eat It | 20 | 19 | 2.871 | 7 | 301 | 16 | 208 |
| Toda Up | 23 | 14 | 2.631 | 10 | 821 | 0 | 68 |
| Probiótica | 16 | 7 | 2.530 | 8 | 812 | 0 | 88 |
| Cléa Store | 16 | 12 | 2.203 | 9 | 449 | 2 | 156 |
| Bagaggio | 17 | 8 | 2.014 | 4 | 265 | 8 | 84 |
| Dr. Peanut | 15 | 19 | 1.445 | 6 | 185 | 0 | 54 |
| Mais Mu | 14 | 3 | 1.245 | 3 | 162 | 0 | 62 |
| Simple Organic | 10 | 7 | 1.237 | 2 | 146 | 0 | 34 |
| Belive | 15 | 3 | 841 | 1 | 58 | 0 | 32 |
| Lejour | 7 | 3 | 724 | 3 | 76 | 39 | 4 |
| HolyFoods | 7 | 2 | 697 | 7 | 318 | 0 | 8 |
| Petz | 9 | 2 | 577 | 3 | 67 | 0 | 46 |
| Prohall | 7 | 0 | 212 | 1 | 23 | 0 | 16 |
| La Ganexa | 7 | 7 | 154 | 0 | 0 | 0 | 30 |
| Temu | 0 | 0 | 0 | 12 | 446 | 0 | 0 |
| AliExpress | 0 | 0 | 0 | 1 | 21 | 0 | 0 |
| Kopenhagen, BAW e L'Amazonie | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

As tabelas por página de cada loja estão em `_site/2-processado/resumo-lojas.md`.

### Leitura (minha, para a etapa 5 conferir)

- As somas por loja juntam páginas de idade muito diferente. Loja que entrou em novembro (Petz, Prohall, La Ganexa,
  HolyFoods, Simple Organic) tem poucas semanas dentro dos 3 meses: número baixo aqui é idade, não desempenho.
- Zero nesta tabela não é zero de verdade para BAW, Kopenhagen, Temu e AliExpress: quer dizer que nenhuma página da
  loja entrou nas 1.000 do export. Para saber, é preciso o recorte por página no Search Console.
- SHEIN, YesStyle e Hostinger têm a maior parte das impressões em páginas de outros idiomas; Dolce Gusto e Nestlé
  Nutre, em português.
- A relação entre impressões e cliques muda muito de loja para loja (Dolce Gusto com 1,3% de cliques, Hostinger com
  0,2%). A causa não está nestes dados.
- GA4 e Search Console não medem a mesma coisa nem a mesma gente (o GA4 depende do aceite dos cookies e tem evento em
  dobro): não dividir um pelo outro.

## 11. Achados fora do piloto

Coisas que apareceram nos exports e merecem atenção de quem cuida das outras lojas. Não foram processadas além do
arquivo geral. Cada uma com o arquivo e a linha do bruto.

| Achado (fato) | Onde |
|---|---|
| `/en/coupons/hostinger` teve 9.358 impressões, 1 clique e posição 8,2 no Google. É a página de loja com mais impressões do site | `_site/20261117-1008-gsc-desempenho/gsc-site-3m/paginas.csv#linha=207` |
| A consulta "is yesstyle legit" teve 10.098 impressões, 10 cliques e posição 8,5; a página `/en/reviews/is-yesstyle-legit-and-safe-review` teve 19.643 impressões e 14 cliques | `.../gsc-site-3m/consultas.csv#linha=10` e `paginas.csv#linha=32` |
| O canal "AI Assistant" do GA4 trouxe 295 sessões com 239 eventos principais (28,8% das sessões com evento principal), contra 7,4% na busca orgânica e 4,9% no acesso direto | `_site/20261117-1016-ga4-relatorios/ga4-aquisicao-de-trafego.csv#linha=11`, `12` e `13` |
| No relatório de IA do Bing, `/reviews/clube-dolce-gusto-como-funciona` foi citada 1.556 vezes e as páginas da Dolce Gusto somam 5.543 das 7.884 citações do export | `_site/20261117-1020-bing-desempenho/bing-ia-paginas-3m.csv#linha=2` |
| `/cupons/shein` teve 98 visualizações e 44 eventos principais no GA4; `/cupons/damie`, 76 e 5 | `.../ga4-paginas-e-telas.csv#linha=17` e `24` |
| "black friday magalu 2026" teve 1.197 impressões, 2 cliques e posição 7,8, com só 5 páginas da Magalu no export | `.../gsc-site-3m/consultas.csv#linha=59` |
| "cupom damie" teve 534 impressões, 7 cliques e posição 4,5; `/cupons/damie` teve 218 impressões e posição 8,8 | `.../gsc-site-3m/consultas.csv#linha=20` e `paginas.csv#linha=237` |
| Consultas com "temu" (12, somando 446 impressões, como "meglio temu o shein") aparecem sem nenhuma página da Temu no export | `.../gsc-site-3m/consultas.csv#linha=362` |
| `first_visit` com o dobro de eventos por usuário, no site inteiro | `.../ga4-eventos.csv#linha=13` |

Leitura minha, a conferir: as consultas com "temu" devem estar sendo atendidas pelos comparativos da SHEIN, e a
diferença entre "cupom damie" e a página `/cupons/damie` sugere que outra página do site aparece para essa consulta.
Os dois pontos pedem o recorte consulta e página no Search Console antes de virar recomendação. O canal de IA tem
poucos números e eventos em dobro: a proporção chama atenção, mas não está medida com segurança.
