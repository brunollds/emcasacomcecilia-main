# FONTE: 20261118-2050-google-trends-csv

| Campo | Valor |
|---|---|
| Coleta | `20261118-2050-google-trends-csv` |
| Início e fim | `2026-11-18T20:46:00-03:00` a `2026-11-18T20:49:00-03:00` (horas aproximadas) |
| Sessão responsável | Etapa 3 do piloto da L'Amazonie (Claude Sonnet 5.5), retomada de 18/11 |
| Fonte | Google Trends, exportação oficial em CSV ("Interesse ao longo do tempo") |
| Endereço ou relatório | As mesmas quatro páginas da coleta `20261117-1046-google-trends` (endereços no `FONTE.md` dela) |
| Método | Navegador embutido, sem login: o botão de exportar do gráfico (`.widget-actions-item.export`) foi acionado em cada página, e o navegador gravou o arquivo na pasta Downloads, de onde foi movido para cá sem alteração |
| Propriedade ou loja | @nao-se-aplica |
| País, idioma, moeda | BR, pt-BR, @nao-se-aplica |
| Período dos dados | Semanas de 2025-11-16 a 2026-11-15 (53 semanas) |
| Filtros | Brasil, últimos 12 meses, todas as categorias, Pesquisa na Web |
| Paginação | 4 exportações de 4 páginas |
| Cobertura | `completa` para o gráfico de interesse ao longo do tempo; as tabelas de sub-regiões e de consultas relacionadas não foram exportadas |

## Arquivos

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `trends-a-marca-e-temas-rosto.csv` | 1396 | `b6ab26c5d9635ae317db3af4e9fbed6631dd907c882f534b14a866eb234c2729` | repositório |
| `trends-b-marca-e-temas-bastao-clareador.csv` | 1471 | `d96bc9e9c620c91ff6336809e636c4e18a358ed2adbdd61826dc02595807d2e1` | repositório |
| `trends-c-marca-e-serum-sem-acento.csv` | 1380 | `dd852718059c4577b8474d38e526db4a8825ef5c9ce1ada522e4834164df4fbf` | repositório |
| `trends-d-marca-sozinha.csv` | 754 | `f140702fbb570440dd606ff72a6e47d79243d7e7b78594389146b855d3f78c30` | repositório |

Hash: `sha256sum <arquivo>` no Bash.

## Falhas e lacunas

- Os arquivos chegaram com o nome `multiTimeline.csv` ou como `.tmp` sem renomear; foram renomeados para o nome da tabela correspondente da coleta de 17/11.
- Sub-regiões e consultas relacionadas dos temas amplos seguem sem leitura.

## Observações

- **Os valores NÃO batem com os da coleta de 17/11.** O Trends trabalha com amostra, e cada carga da página devolve uma amostra diferente. Nas três comparações de cinco termos, quase todas as 53 semanas diferem; na marca sozinha, 5 semanas. Exemplo: a semana de 22/02/2026 da marca sozinha vale 100 neste CSV e 0 na página de 17/11, e a de 21/06/2026, que valia 100, vale 0. O pico único da marca muda de lugar de uma amostra para outra: a série é ruído de amostragem de uma busca muito pequena.
- O `sinais.csv` continua apontando para os valores da página de 17/11 (cada linha diz de onde veio). Estes CSVs são a evidência oficial de uma segunda amostra, não a substituem.
- Leitura segura: a média de cada termo se repete entre as duas amostras com diferença de até 2 pontos nos termos grandes (vitamina c 20: 53,7 contra 53; clareador de virilha: 63,2 contra 65; serum cilios: 53,4 contra 55) e fica perto de zero nos pequenos. Nos termos pequenos a diferença relativa é grande (sérum para cílios: 2,6 contra 6; a marca sozinha: 3,4 contra 0). O valor de uma semana isolada não se repete.
