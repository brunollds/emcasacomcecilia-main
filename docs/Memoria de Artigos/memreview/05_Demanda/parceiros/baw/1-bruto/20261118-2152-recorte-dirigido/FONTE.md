# FONTE: 20261118-2152-recorte-dirigido

| Campo | Valor |
|---|---|
| Coleta | `20261118-2152-recorte-dirigido` |
| Início e fim | `2026-11-18T21:52:00-03:00` a `2026-11-18T21:58:00-03:00` |
| Sessão responsável | Demanda BAW, etapa 4 (Claude Opus 5.5, no navegador embutido do app, com as contas logadas pelo Bruno antes da coleta, em 18/11) |
| Fonte | Google Search Console, Google Analytics 4 e Bing Webmaster Tools |
| Endereço ou relatório | Search Console: Desempenho > Resultados da Pesquisa, `https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain:emcasacomcecilia.com&num_of_months=3` com `&query=*baw` e com `&page=*baw`. GA4: Relatórios > Engajamento > Páginas e telas (`#/p468316875/reports/explorer?params=_u.date00%3D20261116%26_u.date01%3D20261118&r=all-pages-and-screens`). Bing: Search Performance (abas Keywords e Pages) e AI Performance (abas Grounding Queries e Pages), `?siteUrl=https://emcasacomcecilia.com/` |
| Método | Search Console: Exportar > Baixar o arquivo CSV (um zip por filtro). GA4: Compartilhar este relatório > Baixar o arquivo > Baixar o CSV. Bing: Download all de cada aba. Tudo numa aba própria do navegador embutido; cada arquivo foi tirado de Downloads logo depois de chegar, antes do próximo |
| Propriedade ou loja | Search Console `sc-domain:emcasacomcecilia.com`; GA4 conta emcasacomcecilia (337406272), propriedade Emcasacomcecilia (468316875); Bing `https://emcasacomcecilia.com/` |
| País, idioma, moeda | Todos os países e idiomas; receita do GA4 em BRL (zero); `@nao-se-aplica` para moeda nas outras |
| Período dos dados | Search Console: 2026-08-17 a 2026-11-16 ("Últimos 3 meses" em 18/11, que termina no último dia com dado final). GA4: 2026-11-16 a 2026-11-18, com o 18/11 parcial. Bing: 2026-11-12 a 2026-11-16 (botão "7 D", que mostrou esses cinco dias) |
| Filtros | Search Console: tipo Web; um zip com Consulta contém "baw", outro com Página contém "baw" (o `filtros.csv` de cada zip registra). GA4: nenhum (Todos os usuários): a BAW é separada no processamento. Bing: nenhum |
| Paginação | `@nao-se-aplica`: os recortes do Search Console vieram inteiros (3 consultas, 2 páginas); o CSV do GA4 traz as 118 linhas do relatório; o Download all do Bing traz a lista inteira (91 palavras-chave, 42 páginas, 6 consultas de IA, 33 páginas citadas) |
| Cobertura | `completa` para as visões pedidas. Fora: o Clarity (sem login) e os dias 17 e 18/11 no Search Console e no Bing, ainda sem dado final |
| Modalidade | `export` em todos |
| Export | Os arquivos abaixo, como as plataformas entregaram; só o nome mudou |
| Cadastro lido | `@nao-se-aplica` |
| Bloqueio | Nenhum. Clarity não tentado: o Bruno disse que entrou no Analytics, no Search Console e no Bing Webmaster |

## Arquivos

Cada `.zip` é o arquivo como o Search Console entregou. A pasta de mesmo nome tem os CSVs extraídos dele, com o nome
sem acento e em minúsculas (`Páginas.csv` virou `paginas.csv`), como em `_site/20261117-1008-gsc-desempenho/`; o
tamanho de cada um confere com o da entrada no zip.

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `bing-ia-consultas-7d.csv` | 487 | `ee3ee768aa0755d49487187cdd3751acba583c8375e91793bb762751ea904046` | repositório |
| `bing-ia-paginas-7d.csv` | 2499 | `0083763cb66c48d90b1588cca42dd364a5c2fc626a980d780effa33d0ac7b71f` | repositório |
| `bing-paginas-7d.csv` | 4137 | `4e0df51db5dbe48fa005bdfd862eeb24b57b69a8f68d944bd55637a378256fd7` | repositório |
| `bing-palavras-chave-7d.csv` | 5578 | `98b17417f60beb01dc1fde3be8141e9638ace7497a6222cadcb7aa9e42d02c20` | repositório |
| `ga4-paginas-e-telas-16a18nov.csv` | 6820 | `1a4bd8490d2f82453c9693aeb5a24ac46607ae3bf6da7ff805a5dca441aefecd` | repositório |
| `gsc-consulta-baw-3m.zip` | 1622 | `6d65df2e0782c15ed54c7efc3241e096052ec2974d0bc2598bb2e08e68af3632` | repositório |
| `gsc-consulta-baw-3m/aspecto-da-pesquisa.csv` | 53 | `7dc4e4ca44e0888ddae5f00f3e255d5670c26d25541683a07428fe6b3e67216f` | repositório |
| `gsc-consulta-baw-3m/consultas.csv` | 112 | `a5117475215e855107abc74dd6e1a704e52d63ed11985b3afdf5a996868a9b62` | repositório |
| `gsc-consulta-baw-3m/dispositivos.csv` | 65 | `cd0bc6084f28145f2fee8f40c309ad71c0d3abeeb342c6152c63fbb2624f2ba8` | repositório |
| `gsc-consulta-baw-3m/filtros.csv` | 89 | `ad825996085fb869ce9ba726a50c5f7f7f4fae704b1b38c1bfb0a05b744b9351` | repositório |
| `gsc-consulta-baw-3m/grafico.csv` | 1607 | `fd94ba447bcc56a62f94693c3e4b1d36298b97ea446cee4af41129ccfa822ac8` | repositório |
| `gsc-consulta-baw-3m/paginas.csv` | 186 | `868c3e0315f8e140ce30283143bc91bc7dd313dbf16eeabe0e93d40c525511f9` | repositório |
| `gsc-consulta-baw-3m/paises.csv` | 58 | `ea17c063bab42fe0c990e59ff4086897a2a9e12fbd8f5056d004c925c81dbab6` | repositório |
| `gsc-pagina-baw-3m.zip` | 1619 | `86a2c231abdf0a61af951ccef52712e5af8094edef805742e65a5c2a3fa9a294` | repositório |
| `gsc-pagina-baw-3m/aspecto-da-pesquisa.csv` | 53 | `7dc4e4ca44e0888ddae5f00f3e255d5670c26d25541683a07428fe6b3e67216f` | repositório |
| `gsc-pagina-baw-3m/consultas.csv` | 112 | `a5117475215e855107abc74dd6e1a704e52d63ed11985b3afdf5a996868a9b62` | repositório |
| `gsc-pagina-baw-3m/dispositivos.csv` | 65 | `cd0bc6084f28145f2fee8f40c309ad71c0d3abeeb342c6152c63fbb2624f2ba8` | repositório |
| `gsc-pagina-baw-3m/filtros.csv` | 88 | `dac9e264b32f8ecabaf5f956f4819e0f543eac1987e074b335ed37d35bc1dbbc` | repositório |
| `gsc-pagina-baw-3m/grafico.csv` | 1607 | `f8e6ada5af21c2a16dcd8f086fff081065aebef5954289c5d2c2602d33b1fafe` | repositório |
| `gsc-pagina-baw-3m/paginas.csv` | 186 | `86372d3afc1a5418c865e039fd089892dace7d9ddcf1147c3746f1c849df861c` | repositório |
| `gsc-pagina-baw-3m/paises.csv` | 58 | `ea17c063bab42fe0c990e59ff4086897a2a9e12fbd8f5056d004c925c81dbab6` | repositório |

## Conferência pelo conteúdo

| Arquivo | Nome com que chegou a Downloads | O que o conteúdo diz | Confere? |
|---|---|---|---|
| `gsc-consulta-baw-3m.zip` | `emcasacomcecilia.com-Performance-on-Search-2026-11-18.zip` (antes, um `.tmp` do navegador) | `Filtros.csv`: Web; Últimos 3 meses; Consulta +baw. Gráfico de 2026-08-17 a 2026-11-16, impressões só no 16/11 (3) | Sim |
| `gsc-pagina-baw-3m.zip` | `emcasacomcecilia.com-Performance-on-Search-2026-11-18.zip` (baixado depois de o primeiro sair de Downloads) | `Filtros.csv`: Web; Últimos 3 meses; Página +baw. Gráfico de 2026-08-17 a 2026-11-16, impressões só no 16/11 (4) | Sim |
| `ga4-paginas-e-telas-16a18nov.csv` | `Páginas_e_telas_Caminho_da_página_e_classe_da_tela.csv` | Cabeçalho: propriedade Emcasacomcecilia, Todos os usuários, Data de início 20261116, Data de término 20261118; 118 caminhos, a mesma contagem da tela | Sim |
| `bing-palavras-chave-7d.csv` | `emcasacomcecilia.com_KeywordReport_11_19_2026.csv` | Colunas Keyword, Impressions, Clicks, CTR, Avg. Position; 91 linhas, as "1 — 25 of 91" da tela | Sim |
| `bing-paginas-7d.csv` | `emcasacomcecilia.com_PageTrafficReport_11_19_2026.csv` | Colunas Page, Impressions, Clicks, CTR, Avg. Position; 42 linhas; a primeira é `/reviews/black-friday-magalu` (61 impressões) | Sim |
| `bing-ia-consultas-7d.csv` | `emcasacomcecilia.com_AISearchQueriesReport_11_19_2026.csv` | 6 consultas, as "6 results found" da tela | Sim |
| `bing-ia-paginas-7d.csv` | `emcasacomcecilia.com_AIPageStatsReport_11_19_2026.csv` | 33 páginas, as "33 results found" da tela | Sim |

O Bing põe no nome a data de 19/11 (UTC); o período dos dados é o da tabela acima, lido na tela. O CSV do Bing não
traz o período dentro do arquivo: ele vem do botão "7 D" e do gráfico da tela (12/11 a 16/11), anotado aqui.

## Falhas e lacunas

- **Clarity.** Não coletado: o Bruno disse que entrou no Analytics, no Search Console e no Bing Webmaster. Destino: a
  rotina do site depois de 30/11 (a mesma lacuna da 4A, `relatos/etapa-4.md`).
- **Dados de 17 e 18/11.** O Search Console e o Bing ainda não tinham dado final desses dias em 18/11, às 21:58. A
  visão de 24 horas do Search Console não foi exportada. Destino: a rotina do site depois de 30/11, com o mês inteiro.
- **GA4 sem o dia de cada visita.** O relatório soma 16 a 18/11. Com 1 usuário por página da BAW, pode ser a equipe
  conferindo as páginas; o GA4 não separa.
- **Um arquivo vazio em Downloads.** Mover o export de páginas do Bing logo que ele ganhou nome deixou um arquivo de 0
  byte com o mesmo nome, recriado pelo navegador ao fechar o download; foi apagado. O arquivo guardado tem os 4.137
  bytes e as 42 linhas da tela.
- **Janela aberta por engano no GA4.** O primeiro clique no painel "Compartilhar este relatório" abriu "Programar
  e-mail"; foi fechada sem salvar nem preencher nada.

## Observações

- No Search Console, o total do recorte de página (4 impressões) é maior que a soma das consultas (3): o Search Console
  omite consultas raras.
- As consultas são dado privado da propriedade: ficam só neste repositório.
- Os CSVs do Bing têm BOM no começo, como os de `_site/20261117-1020-bing-desempenho/`.
