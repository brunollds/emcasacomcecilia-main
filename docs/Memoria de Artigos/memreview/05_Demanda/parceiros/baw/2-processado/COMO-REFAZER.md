# Como refazer o processado da BAW

Comandos na raiz do repositório, com Node 18 ou mais novo, sem dependências. Cada gerador lê só o bruto guardado e para
com erro em célula vazia, id repetido ou evidência que não existe. Rodar duas vezes dá o mesmo arquivo.

Esta primeira versão foi escrita pela sessão da etapa 2 só com a parte do catálogo, como pede o brief dela. As outras
etapas e a coordenação acrescentam as suas linhas.

## Catálogo (etapa 2)

| Arquivo | Coletas de origem | Como gerar | Última geração |
|---|---|---|---|
| `catalogo.csv` e `ids-catalogo.csv` | `1-bruto/20261118-1251-wake-robots-sitemap`, `1-bruto/20261118-1255-wake-categorias`, `1-bruto/20261118-1307-wake-fichas` | `node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/baw/2-processado/gerar-catalogo.cjs"` | 2026-11-18, etapa 2 |

O `gerar-catalogo.cjs` lê o `sitemap.xml`, os JSON das listas e os `.txt` das fichas, que estão no repositório. O
`ids-catalogo.csv` só cresce: rodar de novo sobre o mesmo bruto não acrescenta linha e não muda nenhum id.

Os JSON e os `.txt` saem do HTML guardado na pasta de brutos pesados
(`C:\Users\Bruno\Downloads\Emcasacomcecilia\demanda-brutos-pesados\baw\<coleta-id>\`), só na máquina do Bruno:

```bash
node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/baw/2-processado/extrair-listas.cjs" 20261118-1255-wake-categorias
node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/baw/2-processado/extrair-fichas.cjs" 20261118-1307-wake-fichas
```

Para uma coleta nova (pasta nova, nunca a mesma):

```bash
node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/baw/2-processado/coletar.cjs" listas <coleta-id> <pedidos.tsv>
node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/baw/2-processado/amostra-fichas.cjs" <coleta-das-listas> <pedidos-fichas.tsv>
node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/baw/2-processado/coletar.cjs" fichas <coleta-id> <pedidos-fichas.tsv>
```

`<pedidos.tsv>` tem uma linha por página, `nome<TAB>caminho` (a lista desta rodada está no `pedidos.tsv` de cada
coleta). O coletor espera 4 segundos entre pedidos e para no primeiro status diferente de 200 ou página de desafio.
Depois de uma coleta nova, trocar o `COLETA` no começo do `gerar-catalogo.cjs`.

Ressalvas:

- O que vira categoria, linha ou fica de fora está escrito na tabela `LISTAS` do gerador: é decisão de quem coletou.
  Lista nova sem linha na tabela faz o script parar.
- A data `lido_em` é constante no script.
- O checkout no Windows pode trocar a quebra de linha: compare o resultado com `git diff`, não por hash.
