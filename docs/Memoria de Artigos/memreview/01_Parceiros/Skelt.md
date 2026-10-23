---
parceiro: "Skelt"
slug_cupom: "skelt"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-01-21"
---

# Dossiê Factual: Skelt

Parceria iniciada em 21/10/2026 com a página `/cupons/skelt`, ainda sem artigo. Fica na
prateleira de beleza de `/cupons`, junto da YesStyle.

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom `SKEMCASACOMCECILIA`: 10% OFF em todo o site | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `skelt`) | 2026-10-21 | 2026-11-21 | Vale também em produto já em promoção e em kits e combos (teste de 21/10). No checkout, a promoção se chama "10% de desconto INBAZZ" | Alta |
| Soma com os 5% de desconto do Pix e vale em todas as formas de pagamento | condicao_comercial_volatil | Teste de carrinho de 21/10/2026 (promoção "5% OFF no Pix" da loja) | 2026-10-21 | 2026-11-21 | O Pix entrou depois do cupom, sobre o total já com desconto | Alta |
| Um cupom por pedido | condicao_comercial_volatil | Teste de carrinho de 21/10/2026 | 2026-10-21 | 2026-11-21 | Aplicar o `PRIMEIRA10` da loja trocou o nosso cupom | Alta |
| O mínimo dos brindes conta o pedido depois dos descontos | condicao_comercial_volatil | skelt.com.br/politica-de-brindes | 2026-10-21 | 2026-11-21 | O cupom e o Pix podem tirar o brinde do carrinho. Em 21/10, o brinde era um Body Splash Mystic Bloom | Alta |
| Frete grátis: 12 cidades sem mínimo; R$ 199 no Sul, Sudeste e Centro-Oeste; R$ 299 no Norte e Nordeste | condicao_comercial_volatil | skelt.com.br/politica-de-frete | 2026-10-21 | 2026-11-21 | Sobre o valor final do pedido. Cidades sem mínimo: São Paulo, Belo Horizonte, Santo André, Goiânia, Niterói, Barueri, São Caetano do Sul, Taboão da Serra, São José dos Pinhais, Curitiba, Vitória e Balneário Camboriú | Alta |
| Link de afiliado: `https://www.skelt.com.br/?utm_source=creators&utm_medium=SKEMCASACOMCECILIA&utm_campaign=inbazz` | condicao_comercial_volatil | Bruno, 21/10/2026; `offerUrl` em `src/lib/couponsData.ts` | 2026-10-21 | 2026-11-21 | Vai exatamente como veio | Alta |
| Link de afiliado da marca no Mercado Livre: `https://meli.la/2unTb7k` | condicao_comercial_volatil | Bruno, 21/10/2026; `mercadoLivreUrl` no FAQ | 2026-10-21 | 2026-11-21 | O cupom não vale no Mercado Livre; lá vale o preço do anúncio | Alta |

Teste de carrinho em 2026-10-21, pela API pública do checkout da VTEX (sem dados pessoais e sem
finalizar): Body Splash Solar Muse (R$ 99,90) e Mousse Autobronzeador (R$ 119,90), R$ 219,80 de
tabela. Com a promoção da loja "OUT/26 FLASH SALE 10% OFF em todo site", R$ 197,82; com o cupom,
R$ 178,04 (−R$ 19,78); no Pix, R$ 169,13. Num segundo carrinho, Kit Iniciante e Linha Completa
Amalfi Sunset foram de R$ 443,50 para R$ 359,24.

---

## 2. Fatos Oficiais & Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Autobronzeador (mousse, água, gel, bifásico e versões Dark), body splash, body cream, creme para mãos, perfume para cabelos, maquiagem corporal e kits | fato_oficial | Site oficial skelt.com.br | 2026-10-21 | 2027-01-21 | — |
| Marca de Curitiba, criada em 2017 por Gabriel Beleze; linha vegana e cruelty-free | fato_oficial | skelt.com.br/sobre-a-skelt | 2026-10-21 | 2027-01-21 | O site diz "marca de autobronzeadores líder no Brasil": não repetir sem fonte independente |
| SKELT BEAUTY BRANDS S/A, CNPJ 38.290.785/0001-57, sede em Curitiba (PR) | fato_oficial | Rodapé do site oficial | 2026-10-21 | 2027-01-21 | Conferir na Receita antes de citar num artigo |
| Loja na VTEX; até 3x sem juros no cartão; Pix, Apple Pay e Pagaleve | fato_oficial | Checkout do site oficial | 2026-10-21 | 2027-01-21 | — |

---

## 3. Alertas Editoriais

- Nos artigos deste parceiro, usar `affiliate: "skelt"` e link relativo para `/cupons/skelt`,
  conforme `docs/CONTRATO-ARTIGO-AFILIADO.md`. Os artigos de onboarding passam primeiro pela pauta
  (Job 1) e depois pela sessão de artigos.
- **Links de produto (Bruno, 23/10/2026):** produto citado num artigo leva o link oficial da página com a mesma UTM do `offerUrl` (`?utm_source=creators&utm_medium=SKEMCASACOMCECILIA&utm_campaign=inbazz`) e `rel="sponsored"`. Ex.: `https://www.skelt.com.br/autobronzeador-em-mousse/p?utm_source=creators&utm_medium=SKEMCASACOMCECILIA&utm_campaign=inbazz`.
- **Fotos oficiais (Bruno, 23/10/2026):** as fotos de produto do catálogo (`skelt.vteximg.com.br`) podem ser baixadas para os artigos. Ficam fora as de "antes e depois" e as que trazem "aprovado por dermatologistas" ou "líder".
- **Catálogo por leitura direta:** a busca pública da VTEX (`/api/catalog_system/pub/products/search/<termo>`) traz preço, estoque, especificações (Intensidade, Duração, Nível, Área, Benefícios) e imagens; `O=OrderByTopSaleDESC` dá a ordem de mais vendidos. Em 23/10/2026, 8 dos 10 mais vendidos do site eram body splash.
- Nunca citar o `PRIMEIRA10` ou outro cupom da loja como alternativa ao nosso, salvo na pergunta
  que explica que eles não somam.

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/skelt.png` | Logo oficial do cabeçalho do site (SVG), 300 × 114 | Parceiros comerciais no `/sobre` | Identificação da marca parceira |
| `/images/about/partners/skelt-icon.png` | O "s" do logo oficial (SVG), centralizado em 256 × 256 sobre branco | Bolinha da home, chip e imagem de compartilhamento | Identificação da marca parceira |
| `/images/logos/watermarks/skelt.webp` | Logo oficial (SVG), 480 × 183 | Marca-d'água da página e dos cards | Identificação da marca parceira |

Os logos estão no CDN e no mapa de entrega. Para trocar um logo, criar arquivo com nome novo,
conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
