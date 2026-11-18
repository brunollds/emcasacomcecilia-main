# FONTE: 20261118-1251-wake-robots-sitemap

| Campo | Valor |
|---|---|
| Coleta | `20261118-1251-wake-robots-sitemap` |
| Início e fim | `2026-11-18T12:51:27-03:00` (`robots.txt`) a cerca de `12:51:35-03:00` (o `sitemap.xml`, 4 segundos depois; a hora deste pedido não foi registrada ao segundo) |
| Sessão responsável | Etapa 2, catálogo da BAW (Claude Opus 5.5), aberta pela coordenação "Pesquisa de pautas" |
| Fonte | Loja oficial da BAW Clothing (plataforma Wake) |
| Endereço ou relatório | `https://www.bawclothing.com.br/robots.txt` e `https://www.bawclothing.com.br/sitemap.xml` (o único sitemap que o `robots.txt` indica) |
| Método | `curl -s -A "Mozilla/5.0 (compatible; pesquisa-editorial)" <endereço> -o <arquivo>`, um pedido por arquivo, 4 segundos entre eles, sem login nem cookie |
| Propriedade ou loja | `www.bawclothing.com.br` |
| País, idioma, moeda | BR, pt-BR, @nao-se-aplica (o sitemap não tem preço) |
| Período dos dados | Estado do site no momento da coleta; todas as 1.088 entradas trazem `lastmod` 2026-11-18 |
| Filtros | Nenhum |
| Paginação | @nao-se-aplica: o `sitemap.xml` é um `urlset` único, sem índice nem filhos |
| Cobertura | `completa` para o que o sitemap publica: 1.088 endereços, 897 de produto (`/produto/<slug>-<número>`) e 191 de página (categorias, coleções, vitrines, páginas de influenciadoras e institucionais) |
| Modalidade | `arquivo-original` nos dois arquivos |
| Export | @nao-se-aplica |
| Cadastro lido | @nao-se-aplica |
| Bloqueio | nenhum (HTTP 200 nos dois pedidos; `text/plain` e `application/xml`) |

## Arquivos

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `robots.txt` | 197 | `2b1a25ff8f8766a884950d603d4b9c6e78a4b50e2894767a2322158fb5f0b24c` | repositório |
| `sitemap.xml` | 189554 | `2134229ba1f3af07ebd59a8b79e4128051a7abcd4fe6d5f856523921576236d7` | repositório |

## Conferência dos arquivos

A fazer pela coordenação no fechamento de insumos, num checkout limpo da `main`.

## Falhas e lacunas

Nenhuma.

## Observações

- O `robots.txt` fecha `/search`, `/sdch`, `/groups`, `/catalogs`, `/catalogues`, `/account*` e `/login*` para
  `User-agent: *`. Nenhuma coleta desta etapa pede esses caminhos. Não há feed nem API pública indicados.
- Os 897 endereços de produto viram 625 nomes quando se tira o número final: a loja publica uma página por cor (por
  exemplo, `moletom-baw-r-colors` tem 11 endereços). O catálogo junta as cores numa entidade (`2-processado/`).
- O sitemap traz `/blackfriday` (a do menu) e `/black-friday` com 20 subpáginas de faixa de preço e de categoria
  (`/black-friday/oversized59`, `/black-friday/moletons149`...). A trilha das fichas aponta para `/black-friday`.
- Endereços de página com nome de pessoa (`/ana-ju`, `/andrey`, `/shantal`...) são vitrines de influenciadoras; o menu
  mostra 13 delas. Não foram coletados: o que vendem está nas categorias, e os cupons delas não são nossos.
