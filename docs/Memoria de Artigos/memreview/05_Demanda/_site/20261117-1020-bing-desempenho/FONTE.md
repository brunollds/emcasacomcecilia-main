# FONTE: 20261117-1020-bing-desempenho

| Campo | Valor |
|---|---|
| Coleta | `20261117-1020-bing-desempenho` |
| Início e fim | `2026-11-17T10:20:00-03:00` a `2026-11-17T10:22:00-03:00` |
| Sessão responsável | Demanda L'Amazonie, etapa 4 (Claude Fable 5.2, no navegador embutido do app, com as contas já logadas pelo Bruno) |
| Fonte | Bing Webmaster Tools |
| Endereço ou relatório | Search Performance (`https://www.bing.com/webmasters/searchperf?siteUrl=https://emcasacomcecilia.com/`), abas Keywords e Pages; AI Performance (`https://www.bing.com/webmasters/aiperformance?siteUrl=https://emcasacomcecilia.com/`), abas Grounding Queries e Pages |
| Método | Botão Download all de cada aba, no navegador embutido |
| Propriedade ou loja | Site `https://emcasacomcecilia.com/` |
| País, idioma, moeda | Todos os países e idiomas; `@nao-se-aplica` para moeda |
| Período dos dados | 2026-08-17 a 2026-11-15 (botão "3 M" na data da coleta) |
| Filtros | Nenhum |
| Paginação | `@nao-se-aplica`: o Download all traz a lista inteira (861 palavras-chave, 222 páginas, 134 consultas de IA, 120 páginas citadas), a mesma contagem do rodapé de cada tabela |
| Cobertura | `completa` para as quatro listas. Os totais e o gráfico diário não têm arquivo: ficaram anotados abaixo |

## Arquivos

Nome original de cada export, na ordem: `emcasacomcecilia.com_AIPageStatsReport_11_17_2026.csv`,
`..._AISearchQueriesReport_...`, `..._PageTrafficReport_...` e `..._KeywordReport_...`. Os arquivos têm BOM no começo.

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `bing-ia-consultas-3m.csv` | 14137 | `a4e6cd7fa8a198d4c6957160c2aa9af57f6b1c2a0abb432a7abfc87140932bd3` | repositório |
| `bing-ia-paginas-3m.csv` | 9325 | `f99f99322847e19f0b72da9bb852016606e876231e4098275e35698065012d80` | repositório |
| `bing-paginas-3m.csv` | 20914 | `ac5dabcaa9280972ded9769e279bb5d2e9b7ec6b58fc7388793f24d1fc5fe94a` | repositório |
| `bing-palavras-chave-3m.csv` | 51773 | `329e8a283486b7ae1ec17b0662e4e2e541f170e8978c69259d0cff3d82006ca4` | repositório |

## Falhas e lacunas

- Nenhuma palavra-chave, página, consulta de IA ou página citada com "amazonie": a parceria começou em 16/11/2026,
  depois do fim do período.
- A aba Topic Portfolio do AI Performance (em beta) e as abas Device e Country não foram exportadas.
- O botão Download do alto da página (gráfico diário) não foi usado.

## Observações

- Totais lidos na tela, sem arquivo: Search Performance com 136 cliques, 8 mil impressões e CTR de 1,71% no período;
  AI Performance com 9,3 mil citações e média de 14 páginas citadas por dia. A soma das 120 páginas citadas do export
  dá 7.884.
- O Bing avisa, no AI Performance, que os dados são uma amostra e que os rótulos de intenção e tema são gerados por IA.
  As fontes das citações são "Microsoft Copilots and Partners".
- Palavras-chave, páginas, dispositivo e país valem só para a busca web, não para o chat (aviso da própria tela).
- O volume do Bing é pequeno perto do Google: serve para ver formulações de busca e citações de IA, não volume.

## Conferência dos arquivos (17/11/2026, 10:36, depois do aviso do Bruno)

O export do Bing não leva período nem site dentro do arquivo: a identificação é pelo cabeçalho das colunas, pela
contagem de linhas (igual ao rodapé da tabela na tela) e pela primeira linha (igual à primeira da tela).

| Arquivo guardado | Nome com que chegou a Downloads | Colunas | Linhas de dados | Primeira linha | Confere? |
|---|---|---|---|---|---|
| `bing-palavras-chave-3m.csv` | `emcasacomcecilia.com_KeywordReport_11_17_2026.csv` | Keyword, Impressions, Clicks, CTR, Avg. Position | 861 (tela: 861) | "receita de salsichas em massa folhada", 339 impressões | Sim |
| `bing-paginas-3m.csv` | `emcasacomcecilia.com_PageTrafficReport_11_17_2026.csv` | Page, Impressions, Clicks, CTR, Avg. Position | 222 (tela: 222) | `/reviews/clube-dolce-gusto-como-funciona`, 1.893 impressões (tela: 1,9 mil) | Sim |
| `bing-ia-consultas-3m.csv` | `emcasacomcecilia.com_AISearchQueriesReport_11_17_2026.csv` | Grounding Query, Intent, Topic, Citations, Citation Share | 134 (tela: 134) | "is yesstyle legit", 301 citações | Sim |
| `bing-ia-paginas-3m.csv` | `emcasacomcecilia.com_AIPageStatsReport_11_17_2026.csv` | Page, Citations | 120 (tela: 120) | `/reviews/clube-dolce-gusto-como-funciona`, 1.556 citações (tela: 1,6 mil) | Sim |

- Nenhum arquivo do Bing foi sobrescrito: cada relatório tem nome próprio. Foram copiados do arquivo temporário do
  navegador e depois comparados byte a byte com as cópias de nome definitivo: iguais.
- O período (17/08 a 15/11/2026) vem da tela, com o botão "3 M" marcado nas duas páginas; o arquivo não o registra.
- Tamanhos e SHA-256 recalculados: os mesmos da tabela de arquivos.
