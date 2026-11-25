# Como refazer o processado da BAW

Comandos na raiz do repositório, com Node 18 ou mais novo, sem dependências. Cada gerador lê só o bruto guardado e para
com erro em célula vazia, id repetido ou evidência que não existe. Rodar duas vezes dá o mesmo arquivo.

A primeira versão foi escrita pela sessão da etapa 2, com a parte do catálogo. A coordenação acrescentou a etapa 3 e a
etapa 4 no fechamento de insumos de 24/11/2026, depois de rodar os geradores num checkout limpo da `main` (`d9748c8c`).

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

## Interesse externo (etapa 3)

| Arquivo | Coletas de origem | Como gerar | Última geração |
|---|---|---|---|
| `sinais.csv` e `resumo-sinais.md` | as cinco coletas `1-bruto/20261118-2045-*` a `20261118-2054-*` e a releitura `20261124-1808-vitrine-blackfriday` | `node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/baw/2-processado/gerar-sinais.cjs"` | 2026-11-24, etapa 3 (#1421); conferido igual em 25/11 |

O gerador para em célula vazia, id repetido, entidade fora do catálogo ou evidência que não confere no bruto. Coleta nova
do autocompletar (pasta nova, nunca a mesma), com 3 a 5 segundos entre pedidos e parada no primeiro HTTP diferente de 200:

```bash
node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/baw/2-processado/coletar-autocompletar.cjs" <sementes.tsv> <pasta-da-coleta>
```

## Matriz e saída (etapa 5 e integração)

```bash
node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/baw/3-matriz/montar-matriz.cjs"
node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/baw/3-matriz/validar-matriz.cjs"
node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/baw/4-saida/gerar-recomendacoes.cjs"
```

O `montar-matriz.cjs` é do analista e lê o `3-matriz/estados-revisao.csv`, que é da coordenação: um estado por id, com
o parecer e o commit revisado. Sem o arquivo, as linhas saem `em-revisao`. Ele também reescreve o bloco de contagens do
`LEITURA.md`. O `gerar-recomendacoes.cjs` para se alguma linha não estiver `pronta` ou se o `decisoes.json` citar um id
que não existe. Os três dão a mesma saída quando rodam de novo. Última geração em 25/11/2026, na integração.

## Dados do parceiro e cobertura (etapa 4)

| Arquivo | Origem | Como gerar | Última geração |
|---|---|---|---|
| `nossos-dados.csv` e `comercial.csv` (4A) | `_site/` (snapshot de 17/11), coleta de IA e as duas coletas do recorte dirigido | `node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/baw/2-processado/etapa4-montar.mjs"` | 2026-11-18, etapa 4 (#1138, #1190, #1192, #1193); conferido igual em 24/11 |
| `cobertura.csv` (4B) | `content/reviews/`, `couponsData.ts` e fichas de `02_Artigos/`, lidos no commit `4c639f06` | o mesmo comando | 2026-11-25, etapa 4 (#1437); conferido igual em 25/11 |

A parte 4B lê os artigos com `git show 4c639f06:<caminho>`, e não do disco: o commit `4c639f06` precisa estar no
histórico local (`git fetch origin main`). Para ler o site de outro dia, troque o commit no gerador e registre o novo no
relato. Até 24/11 o gerador lia do disco e parou depois da reforma de 22/11 (#1339).
