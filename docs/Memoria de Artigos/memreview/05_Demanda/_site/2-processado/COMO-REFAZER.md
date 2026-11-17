# Como refazer o processado de `_site/`

Dados do site inteiro atribuídos às lojas de `src/lib/couponsData.ts`. Criado na etapa 4 do piloto da L'Amazonie
(17/11/2026), a pedido da coordenação, para os próximos parceiros não precisarem de nova coleta.

## Comando

Na raiz do repositório:

```bash
node "docs/Memoria de Artigos/memreview/05_Demanda/_site/2-processado/montar-lojas.mjs"
```

Lê só o bruto de `_site/` (as coletas de 17/11/2026 do Search Console, do Bing e do GA4), o `couponsData.ts` e os
JSONs de `content/reviews/`. Escreve dois arquivos nesta pasta e para com erro se houver célula vazia, id repetido ou
evidência que não aponta para a linha certa do bruto. Rodar duas vezes dá o mesmo resultado.

| Arquivo | O que é |
|---|---|
| `nossos-dados-lojas.csv` | Formato longo, com o cabeçalho de `nossos-dados.csv` (`FORMATOS.md`, seção 4). `registro_id` = `nos-<slug>-NNNN`, com numeração própria por loja |
| `resumo-lojas.md` | Uma linha por loja e uma tabela por loja (páginas de cupom, artigos e consultas com a marca). Só soma e leitura direta do CSV, sem interpretação |
| `montar-lojas.mjs` | O script |

## Regra de atribuição

Uma linha do bruto vai para uma loja quando:

1. **Página de cupom:** o endereço é `/cupons/<slug>` ou `/<idioma>/coupons/<slug>`, com `<slug>` de `couponsData.ts`.
   A coluna `idioma` leva o idioma do endereço.
2. **Artigo:** o endereço é `/reviews/<slug>` ou `/<idioma>/reviews/<slug>` e o JSON desse artigo, nesse idioma, tem
   o slug da loja em `affiliate`. Artigo de várias lojas (`affiliate` em lista) gera uma linha por loja, com isso
   dito em `qualidade`: a mesma medida aparece em cada loja e não se soma entre lojas. Loja da lista que não está em
   `couponsData.ts` (hoje a Shopee) não recebe linha.
3. **Consulta:** o texto, em minúsculas e sem acento, contém o nome da marca como palavra inteira. Vale a marca de
   `couponsData.ts`, o slug com espaços e as formas extras da lista `TERMOS_EXTRAS` do script (por exemplo "nutren"
   para a Nestlé Nutre, "amazonie" para a L'Amazonie, "iws" para a I Wanna Sleep). Consulta com duas marcas gera uma
   linha por loja, com isso dito em `qualidade`.

O que não se atribui a nenhuma loja fica só no bruto: home, `/reviews`, `/cupons`, `/reviews/loja/<slug>`, receitas,
vídeos, artigos sem `affiliate` e consultas sem marca. Na coleta de 17/11/2026 ficaram de fora 264 das 1.000 páginas e
186 das 1.000 consultas do Search Console.

## O que entra de cada coleta

| Coleta | Arquivo do bruto | Métricas |
|---|---|---|
| `20261117-1008-gsc-desempenho` | `gsc-site-3m/paginas.csv` e `consultas.csv` | cliques, impressões e posição média |
| `20261117-1020-bing-desempenho` | `bing-paginas-3m.csv` e `bing-palavras-chave-3m.csv` | impressões, cliques e posição média |
| `20261117-1020-bing-desempenho` | `bing-ia-paginas-3m.csv` e `bing-ia-consultas-3m.csv` | citações |
| `20261117-1016-ga4-relatorios` | `ga4-paginas-e-telas.csv` | visualizações, usuários ativos e eventos principais |

## Limites

- **Todas as 31 lojas entram, inclusive as quatro do piloto.** A coordenação pediu este arquivo para "as demais
  lojas"; incluí também L'Amazonie, Simple Organic, Skelt e YesStyle porque aqui a regra é completa (todos os
  idiomas, sem corte de impressões) e o `nossos-dados.csv` do piloto é um recorte menor. Os dois saem do mesmo bruto.
  Para tirar as quatro, basta filtrar pelo `registro_id`.
- O export do Search Console tem só as 1.000 páginas e as 1.000 consultas com mais resultado: loja sem linha (BAW,
  Kopenhagen, L'Amazonie e as páginas de Temu e AliExpress) pode ter impressões abaixo do corte. Não é zero.
- As consultas do Search Console vêm sem filtro de página: não dizem qual página apareceu. O cruzamento consulta e
  página só existe para as quatro páginas de cupom do piloto (`parceiros/lamazonie/2-processado/nossos-dados.csv`).
- O Clarity não entra: só tem coleta para quatro páginas de cupom.
- Consulta atribuída pelo nome da marca pode citar a marca num sentido que não é o da loja. Na conferência de
  17/11/2026 não apareceu falso positivo nas amostras lidas (Insider, Temu, Cléa, Belive, Petz, Magalu).
- Coleta nova: trocar as três constantes de pasta no começo do script, ou passar a ler todas as coletas e guardar a
  mais recente por chave. Enquanto houver uma coleta só de cada fonte, as constantes bastam.
