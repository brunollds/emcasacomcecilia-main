# FONTE: 20261117-0958-shopify-feed

| Campo | Valor |
|---|---|
| Coleta | `20261117-0958-shopify-feed` |
| Início e fim | `2026-11-17T09:58:47-03:00` a `2026-11-17T09:59:03-03:00` |
| Sessão responsável | Pesquisa de pautas, como coordenação (Claude Fable 5.2) |
| Fonte | Loja oficial da L'Amazonie (Shopify) |
| Endereço ou relatório | `https://www.lamazonie.com.br/robots.txt`, `/products.json?limit=250&page=1` a `3`, `/collections.json?limit=250`, `/sitemap.xml` |
| Método | `curl -s -A "Mozilla/5.0 (compatible; pesquisa-editorial)" <endereço> -o <arquivo>`, um pedido por arquivo, sem login nem cookie |
| Propriedade ou loja | `www.lamazonie.com.br` |
| País, idioma, moeda | BR, pt-BR, BRL (a resposta marcou `localization=BR`) |
| Período dos dados | Estado do catálogo publicado no momento da coleta |
| Filtros | Nenhum |
| Paginação | Produtos: 3 páginas pedidas; a 1 trouxe 42 produtos, a 2 e a 3 vieram vazias (`{"products":[]}`) |
| Cobertura | `parcial` para a etapa 2: feed de produtos e lista de coleções completos; faltam os sitemaps filhos, os produtos de cada coleção e as páginas institucionais |

Todas as respostas vieram com HTTP 200. `Content-Type`: `application/json; charset=utf-8` nos JSON, `application/xml; charset=utf-8` no sitemap e `text/plain; charset=utf-8` no `robots.txt`.

## Arquivos

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `robots.txt` | 3718 | `cab444dbd71626a000b84567bddf4dd707140084156caf912fad0f5b2704cf5e` | repositório |
| `products-p1.json` | 261136 | `87b1cd906e8d1ef67b4ea54ca7d98d87de010d2271017e94a54108eaf3918ce7` | repositório |
| `products-p2.json` | 15 | `86d8b086af0fc30d06856e218fcfdb6b803f91b45f50b1b753d8deac627fc054` | repositório |
| `products-p3.json` | 15 | `86d8b086af0fc30d06856e218fcfdb6b803f91b45f50b1b753d8deac627fc054` | repositório |
| `collections.json` | 3764 | `121cc245a60ce0bae451fb0f2369b94e59ec0deca98c6c33a011dc5423817c4f` | repositório |
| `sitemap.xml` | 992 | `1a47595d53ae246af53cc3f8de515792e12a741564914f8f63b0fad7bef54aa0` | repositório |

## Falhas e lacunas

- Os cabeçalhos das respostas não foram guardados: traziam cookies de sessão da Shopify (`Set-Cookie`), que a política deixa fora. O `Content-Type` e o status estão anotados acima.
- O `sitemap.xml` é só o índice. Os filhos (`sitemap_products_1.xml`, `sitemap_pages_1.xml`, `sitemap_collections_1.xml`, `sitemap_blogs_1.xml`, `sitemap_articles_1.xml`, `sitemap_agentic_discovery.xml`) não foram baixados.
- `collections.json` traz a contagem de produtos por coleção, não quais produtos. Falta `/collections/<handle>/products.json`.
- A contagem do feed (42) ainda não foi comparada com o sitemap de produtos nem com o menu do site.

## Observações

- O `robots.txt` não fecha `/products.json`, `/collections.json` nem `/sitemap.xml` para `User-agent: *`.
- Feed de 42 produtos e 81 variantes, um só `vendor` e `product_type` vazio ou "Skincare". Campos por produto: `id, title, handle, body_html, published_at, created_at, updated_at, vendor, product_type, tags, variants, images, options`.
- 17 coleções, duas com contagem zero (`protetor-solar-de-tratamento` e `serum-amazon-miracle`). A coleção `oferta-black-friday` tem o título "Ofertas" e 10 produtos.
- O feed traz preço e disponibilidade das variantes. Ficam no bruto como vieram; o `catalogo.csv` usa só o preço de referência.
