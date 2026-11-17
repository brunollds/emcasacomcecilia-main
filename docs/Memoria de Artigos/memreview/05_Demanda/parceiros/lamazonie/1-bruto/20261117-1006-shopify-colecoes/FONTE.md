# FONTE: 20261117-1006-shopify-colecoes

| Campo | Valor |
|---|---|
| Coleta | `20261117-1006-shopify-colecoes` |
| Início e fim | `2026-11-17T10:06:46-03:00` a `2026-11-17T10:07:14-03:00` |
| Sessão responsável | Etapa 2 do piloto da L'Amazonie (Claude Fable 5.2) |
| Fonte | Loja oficial da L'Amazonie (Shopify) |
| Endereço ou relatório | `https://www.lamazonie.com.br/collections/<handle>/products.json?limit=250`, para as 17 coleções de `20261117-0958-shopify-feed/collections.json` |
| Método | `curl -s -A "Mozilla/5.0 (compatible; pesquisa-editorial)" <endereço> -o colecao-<handle>.json`, um pedido por vez, 1 segundo de intervalo, sem login nem cookie |
| Propriedade ou loja | `www.lamazonie.com.br` |
| País, idioma, moeda | BR, pt-BR, BRL |
| Período dos dados | Estado das coleções no momento da coleta |
| Filtros | Nenhum |
| Paginação | Uma página por coleção (`limit=250`); a maior resposta tem 12 produtos, então não houve segunda página a pedir |
| Cobertura | `completa` para o que a loja devolve neste endereço; `parcial` em relação à contagem de `collections.json` (ver falhas) |

Todas as 17 respostas vieram com HTTP 200 e `Content-Type: application/json; charset=utf-8`.

## Arquivos

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `colecao-anti-idade.json` | 110610 | `28387c85b124cb8b025449401f63a3d84ecaef044968393080e978fe2db22608` | repositório |
| `colecao-best-sellers.json` | 7843 | `96e497d4ac8db7c75d69396737a865e3c4b834967c584b80c0c44741b2d5d223` | repositório |
| `colecao-clareamento-da-pele.json` | 110610 | `d7ede95a6a6f62946b00a1d97d29e60da3e197dafae3fce09e773d9121f016c1` | repositório |
| `colecao-clareamento-das-axilas.json` | 20653 | `b8a8b6cc575e9cd1ceb4ba874e40a970fccd9f646e4875833c45538a9e077b17` | repositório |
| `colecao-colecao-a.json` | 15 | `86d8b086af0fc30d06856e218fcfdb6b803f91b45f50b1b753d8deac627fc054` | repositório |
| `colecao-crescimento-de-cilios-e-sobrancelhas.json` | 21376 | `04e3fc3534180b2a391186e30c7249b833f392e06a8c40509935076321d4a1dd` | repositório |
| `colecao-frontpage.json` | 41117 | `5a56e33dec19577f84dbb6046c1e855f04b14fe230cbc527a35c6cde2674c586` | repositório |
| `colecao-limpeza-facial.json` | 43122 | `fd5f645d90bef97cbda226a0ba5f3f7a54a3fb0f8fcf30fe5ea5287d214b2b33` | repositório |
| `colecao-oferta-black-friday.json` | 15 | `86d8b086af0fc30d06856e218fcfdb6b803f91b45f50b1b753d8deac627fc054` | repositório |
| `colecao-os-queridinhos-da-rebeca-souza.json` | 15 | `86d8b086af0fc30d06856e218fcfdb6b803f91b45f50b1b753d8deac627fc054` | repositório |
| `colecao-produtos-kits.json` | 131088 | `d58aa54c5ae72f2a6533927eb0c9862590c9466691ab9c267ae48415a6b008bd` | repositório |
| `colecao-produtos-todos.json` | 51987 | `8c4c2c4763d03baa6e2bc9884e09f260d758d987b338994ba99dbb5ac66779f3` | repositório |
| `colecao-protecao-solar.json` | 64482 | `b98ae63de5bb936a16624799426132e82b11267f778c40e031e49336df087a90` | repositório |
| `colecao-protetor-solar-de-tratamento.json` | 15 | `86d8b086af0fc30d06856e218fcfdb6b803f91b45f50b1b753d8deac627fc054` | repositório |
| `colecao-serum-amazon-miracle.json` | 15 | `86d8b086af0fc30d06856e218fcfdb6b803f91b45f50b1b753d8deac627fc054` | repositório |
| `colecao-sticks.json` | 60001 | `d8d1509a68cd7b936fa370dbf883119eeb209247badb14ac9f32259a75b48938` | repositório |
| `colecao-todos.json` | 51987 | `b710a7083e8406e52d65463611fe9f0ca1bf15db1d46f29d7b6496a6adbf1c35` | repositório |

## Falhas e lacunas

- Os cabeçalhos das respostas não foram guardados (trazem cookies de sessão da Shopify).
- Em 13 das 17 coleções, a lista veio menor que o `products_count` de `collections.json`. A loja não informa o motivo, e esta coleta não conseguiu explicar a diferença:

| Coleção | `products_count` | Produtos na lista |
|---|---|---|
| `anti-idade` | 15 | 11 |
| `best-sellers` | 1 | 1 |
| `clareamento-da-pele` | 16 | 11 |
| `clareamento-das-axilas` | 9 | 7 |
| `colecao-a` | 2 | 0 |
| `crescimento-de-cilios-e-sobrancelhas` | 10 | 7 |
| `limpeza-facial` | 4 | 4 |
| `oferta-black-friday` | 10 | 0 |
| `os-queridinhos-da-rebeca-souza` | 1 | 0 |
| `produtos-kits` | 21 | 12 |
| `produtos-todos` | 16 | 6 |
| `protetor-solar-de-tratamento` | 0 | 0 |
| `protecao-solar` | 8 | 5 |
| `frontpage` | 31 | 6 |
| `sticks` | 5 | 4 |
| `serum-amazon-miracle` | 0 | 0 |
| `todos` | 10 | 6 |

- 10 produtos do feed não aparecem em nenhuma lista: as 6 páginas de oferta `bf-`, `serum-para-crescimento-de-cilios-e-sobrancelhasseb`, `creme-clareador-intimo-1`, `creme-clareador-para-axilas` e `creme-clareador-para-virilha`.
- A coleção `oferta-black-friday` (título "Ofertas") conta 10 produtos e devolveu lista vazia: não dá para dizer, por esta fonte, quais produtos estão nela.

## Observações

- Todo produto que aparece nas listas está no feed (`products-p1.json`), com o mesmo `id`.
- As listas incluem os e-books: eles estão em `anti-idade`, `clareamento-da-pele`, `clareamento-das-axilas` e `crescimento-de-cilios-e-sobrancelhas`.
