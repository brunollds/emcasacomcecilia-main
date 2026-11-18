# Como refazer o processado da L'Amazonie

Todos os comandos rodam na raiz do repositório, com Node, sem dependências. Cada script lê só o bruto guardado e para
com erro se achar célula vazia, id repetido ou evidência que não existe. Rodar duas vezes dá o mesmo arquivo.

| Arquivo | Coletas de origem | Como gerar | Última geração |
|---|---|---|---|
| `catalogo.csv` | `1-bruto/20261117-0958-shopify-feed`, `...-1006-shopify-sitemaps`, `...-1006-shopify-colecoes`, `...-1007-shopify-paginas`, `...-1010-shopify-fichas`, `...-1012-navegador-fichas` | `node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/lamazonie/2-processado/gerar-catalogo.cjs"` | 2026-11-17, etapa 2 |
| `sinais.csv` | `1-bruto/20261117-1035-google-autocompletar`, `...-1039-google-autocompletar-concorrentes`, `...-1043-google-serp`, `...-1046-google-trends`, `...-1050-youtube-busca`, `...-1053-mercadolivre-loja`, as fichas da etapa 2, o `catalogo.csv` e `02_Artigos/lamazonie-fatos-1611.md` | `node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/lamazonie/2-processado/gerar-sinais.cjs"` | 2026-11-17, etapa 3 |
| `nossos-dados.csv`, `comercial.csv`, `cobertura.csv` | As quatro coletas de `_site/` de 17/11, `src/lib/couponsData.ts` e `content/reviews/` | `node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/lamazonie/2-processado/etapa4-montar.mjs"` | 2026-11-17, etapa 4 |

O texto das páginas da loja (`.txt` das coletas de páginas e de fichas) sai do HTML guardado na pasta de brutos
pesados, com `extrair-texto.cjs <arquivo.html> <arquivo.txt> [main|body]`.

Matriz e saída, fora desta pasta:

| Arquivo | Origem | Como gerar |
|---|---|---|
| `3-matriz/matriz.csv` | Os cinco CSVs desta pasta | `node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/lamazonie/3-matriz/montar-matriz.cjs"`, e depois `validar-matriz.cjs` na mesma pasta |
| `4-saida/recomendacoes.md` | `3-matriz/matriz.csv` e `4-saida/decisoes.json` | `node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/lamazonie/4-saida/gerar-recomendacoes.cjs"` |

O checkout no Windows troca a quebra de linha dos processados: compare o resultado com `git diff`, não por hash.

Ressalvas:

- Os ids seguem a ordem dos scripts. Uma coleta nova pode mudar a numeração de `catalogo.csv` e de `sinais.csv`
  (lição registrada no `LICOES.md`).
- No `etapa4-montar.mjs`, as perguntas da cobertura e a avaliação total ou parcial estão escritas no script: são
  leitura de quem analisou. A data `lido_em` é constante; quem refizer em outro dia confere os endereços de novo.
- Os dados de todas as lojas têm o próprio guia: `_site/2-processado/COMO-REFAZER.md`.
