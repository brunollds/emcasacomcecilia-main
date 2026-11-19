# FONTE: 20261118-2054-google-trends

| Campo | Valor |
|---|---|
| Coleta | `20261118-2054-google-trends` |
| Início e fim | `2026-11-18T20:54:20-03:00` a `2026-11-18T20:56:00-03:00` |
| Sessão responsável | Etapa 3 do piloto da BAW (Claude Opus 5.5), branch `docs/demanda-baw-etapa3` |
| Fonte | Google Trends, página "Explorar" clássica |
| Endereço ou relatório | A: `https://trends.google.com/trends/explore?geo=BR&q=baw%20clothing&hl=pt-BR`; B: `...&q=baw%20clothing,moletom%20baw,camiseta%20baw,tenis%20baw,cupom%20baw`; C: `...&q=baw%20clothing,camiseta%20oversized,moletom%20oversized,camiseta%20boxy,marca%20streetwear` |
| Método | Navegador embutido do app, sem login; `get_page_text` da tabela de apoio do gráfico e dos blocos de relacionadas. Em B e C o gráfico só carregou depois de rolar a página e de uma captura de tela. A sessão gravou os valores em CSV, uma coluna por termo |
| Propriedade ou loja | @nao-se-aplica |
| País, idioma, moeda | BR, pt-BR, @nao-se-aplica |
| Período dos dados | 53 semanas, de `2025-11-16` à semana de `2026-11-15` (a última pode estar incompleta em 18/11) |
| Filtros | Brasil; Últimos 12 meses; Todas as categorias; Pesquisa na Web |
| Paginação | Relacionadas: só as 5 primeiras de cada bloco, como a página mostrou |
| Cobertura | `parcial`: as três séries completas; relacionadas só as 5 primeiras; sub-regiões não lidas (o texto da página não trouxe a tabela) |
| Modalidade | `texto-extraido` (valores da página gravados pela sessão; não é o CSV oficial) |
| Export | O CSV oficial não foi baixado: o navegador embutido não grava arquivo |
| Cadastro lido | @nao-se-aplica |
| Bloqueio | nenhum |

## Arquivos

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `trends-a-baw-clothing-sozinha.csv` | 770 | `b89db6c3812ae9b8b97be87028042168f677240724283a9edeeed68cfcb3dedd` | repositório |
| `trends-a-relacionados.txt` | 847 | `3443a3a1b5b2edd6da53b23e3c726b66f7e9f1693d7b56f6e6b3c4461ff3f1a8` | repositório |
| `trends-b-marca-e-categorias.csv` | 1332 | `8c1a7d495fbd1a8599359d6a914628874d967a7bfa9f22e7918e2971146ff29b` | repositório |
| `trends-b-relacionados.txt` | 1206 | `94ccbb6b36e9153d2d8a949f0b99c68ece82cd2172b0c5f51b2cdaa7e592c312` | repositório |
| `trends-c-marca-e-temas-amplos.csv` | 1370 | `42d5ae44f6d6b1990d97db94579f360395b109cdd5ce54074113f05f6fac264c` | repositório |
| `trends-c-relacionados.txt` | 1349 | `825e81375c7cc133e705eb2c84f722171a9fa221d76c9e463086a94d9516b707` | repositório |

## Conferência dos arquivos

A fazer pela coordenação no fechamento de insumos, num checkout limpo da `main` depois do merge. Antes do commit, a
sessão conferiu que nenhum arquivo da pasta é barrado pelo `.gitignore` (`git check-ignore -v`, sem saída).

## Falhas e lacunas

- Sem o CSV oficial e sem as sub-regiões.
- Na comparação A, a página não mostrou a média (só aparece com mais de um termo); a série de "baw clothing" é igual nas
  comparações A e B, porque nas duas ela é o termo de maior índice.
- A página avisou que a página "Explorar" clássica vai expirar; a próxima rodada pode precisar da nova.

## Observações

- Os números de A, B e C não se comparam entre si: cada comparação tem a própria escala 0 a 100.
- A linha `media` dos CSVs de B e C é a coluna "Média" que a página mostrou, não conta da sessão.
- As relacionadas de "baw clothing" são as mesmas nas três comparações; o gerador usa só as de A.
- "Aumento repentino" é o rótulo da página para crescimento acima do que ela numera; vira `@indisponivel` na medida.
