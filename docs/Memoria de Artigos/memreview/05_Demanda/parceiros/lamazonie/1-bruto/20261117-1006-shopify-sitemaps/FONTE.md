# FONTE: 20261117-1006-shopify-sitemaps

| Campo | Valor |
|---|---|
| Coleta | `20261117-1006-shopify-sitemaps` |
| Início e fim | `2026-11-17T10:06:22-03:00` a `2026-11-17T10:06:31-03:00` |
| Sessão responsável | Etapa 2 do piloto da L'Amazonie (Claude Fable 5.2) |
| Fonte | Loja oficial da L'Amazonie (Shopify) |
| Endereço ou relatório | Os seis sitemaps filhos listados em `20261117-0958-shopify-feed/sitemap.xml`: `/sitemap_agentic_discovery.xml`, `/sitemap_products_1.xml?from=7104425066665&to=10350021247145`, `/sitemap_pages_1.xml?from=83188252841&to=165382127785`, `/sitemap_collections_1.xml?from=270058094761&to=319597019305`, `/sitemap_blogs_1.xml`, `/sitemap_articles_1.xml` |
| Método | `curl -s -A "Mozilla/5.0 (compatible; pesquisa-editorial)" <endereço> -o <arquivo>`, um pedido por vez, 1 segundo de intervalo, sem login nem cookie |
| Propriedade ou loja | `www.lamazonie.com.br` |
| País, idioma, moeda | BR, pt-BR, `@nao-se-aplica` |
| Período dos dados | Estado dos sitemaps no momento da coleta |
| Filtros | Nenhum |
| Paginação | 6 sitemaps pedidos, 6 obtidos; cada tipo tem um arquivo só (`_1`) |
| Cobertura | `completa` |

Todas as respostas vieram com HTTP 200 e `Content-Type: application/xml; charset=utf-8`.

## Arquivos

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `sitemap_agentic_discovery.xml` | 217 | `4a87a7022f739559eb494de5ef3c57fdb4948a5ce98e2aac06f7e97dc34c4bfb` | repositório |
| `sitemap_articles_1.xml` | 2550 | `6f697edbf4cd43d1c897ce327ace4cbc7fdc084eead092fd8e1a7f5980e17ed2` | repositório |
| `sitemap_blogs_1.xml` | 334 | `ea9047ceb2ea2b2735aca64dde696f2cfacba0089d9b919da3176244431bfb09` | repositório |
| `sitemap_collections_1.xml` | 3356 | `2564130bbf1d8e600e719898cf92c65ae6073047bc67912219899b087c58da91` | repositório |
| `sitemap_pages_1.xml` | 4559 | `57a69addc28cc19bb267396c76b0dec1915b91f22f0e457d9552d9ad08ae8ff3` | repositório |
| `sitemap_products_1.xml` | 17217 | `0e5b068d184a2a7b1f061d92e03ac3bd77e9751220e665c7fe3cee42657d24a0` | repositório |

O nome do arquivo não leva os parâmetros `from` e `to` do endereço.

## Falhas e lacunas

- Os cabeçalhos das respostas não foram guardados (trazem cookies de sessão da Shopify). Status e `Content-Type` estão anotados acima.
- O sitemap de produtos lista 36 produtos; o feed (`20261117-0958-shopify-feed`) tem 42. Os 6 que faltam são as páginas de oferta de Black Friday, publicadas de 04/11 a 11/11/2026: `bf-serum-sobrancelhas-protetor-gratis`, `bf-vitamina-c-dupla-brinde`, `bf-creme-intimo-protetor`, `bf-vitamina-c-dupla`, `bf-vitamina-c-kit-2-sp` e `bf-creators-serum-sobrancelhas`. Nenhum produto do sitemap falta no feed.

## Observações

- `sitemap_products_1.xml` traz também a página inicial e, por produto, o endereço da imagem principal.
- `sitemap_pages_1.xml`: 26 páginas. `sitemap_collections_1.xml`: 17 coleções, as mesmas de `collections.json`. `sitemap_blogs_1.xml`: 1 blog (`/blogs/novidades`). `sitemap_articles_1.xml`: 4 artigos.
- `sitemap_agentic_discovery.xml` aponta só para `/agents.md`, guardado em `20261117-1007-shopify-paginas`.
