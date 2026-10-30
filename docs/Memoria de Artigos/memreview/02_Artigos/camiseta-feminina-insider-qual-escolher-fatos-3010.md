# Fatos: camiseta feminina Insider (lote-3010b)

Leitura de 30/10/2026, por volta de 20:20 (BRT). Sem login, sem carrinho, sem link de afiliado.

## Catálogo (Shopify `products.json`)

- `https://www.insiderstore.com.br/products.json?limit=250&page=2`: 250 produtos. Lido.
- `https://www.insiderstore.com.br/products.json?limit=250&page=3`: 134 produtos. Lido.
- `https://www.insiderstore.com.br/products.json?limit=250&page=1`: **não lido** (HTTP 429). Ver pendentes.
- `https://www.insiderstore.com.br/products.json?limit=250&page=4`: vazio.
- Bruto: `..\_brutos-camiseta-feminina\cat-p2.json` e `cat-p3.json`.

Preço = `price` da variante no catálogo, que é o preço no cartão. "De" = `compare_at_price`. Estoque = variantes com `available` sobre o total do produto.

## Cadastro principal por linha (feminina, camiseta)

| Handle | ID | Título | Tipo | Preço (de) | Estoque | Tamanhos com estoque | Composição na ficha | Tags relevantes |
|---|---|---|---|---|---|---|---|---|
| `tech-t-shirt-feminina` | 6546930303125 | Tech T-Shirt® Feminina | T-Shirts | R$ 129 (de R$ 169), todas as variantes | 37 de 57 | PP a XGG | **não declarada** na ficha ("tecido INTECH") | antidesbotamento, best seller |
| `tech-t-shirt-gola-v-feminina` | 7035674034325 | Tech T-Shirt® Gola V Feminina | T-Shirts | R$ 129 (de R$ 169) | 26 de 50 | PP a GG | 92% modal, 8% elastano (Índigo: 62% modal, 30% viscose, 8% elastano) | "gola levemente alongada", INTECH |
| `tech-t-shirt-long-sleeve-feminina` | 6993095819413 | Tech T-Shirt® Manga Longa Feminina | T-Shirts | R$ 199 (de R$ 239) | 25 de 37 | PP a XGG | 92% TENCEL™ Modal, 8% elastano | "tecido INTECH", inverno |
| `tech-t-shirt-high-neck-long-sleeve-feminino` | 7961000181909 | Tech T-Shirt® Gola Alta Manga Longa Feminina | t-shirt | R$ 199 (de R$ 239) | 25 de 27 | PP a XGG | 92% TENCEL™ Modal, 8% elastano | "blusa de manga longa e gola alta" |
| `daily-t-shirt-feminina` | 7034312622229 | Camiseta Básica Tech Daily Feminina | t-shirt | R$ 99 (de R$ 139) | 23 de 28 | PP a XGG | 94% viscose, 6% elastano (DAYON™) | "pode apresentar encolhimento de até 2cm no comprimento após a primeira lavagem" |
| `camiseta-tecnologica-nextech-t-shirt-feminina` | 8912497344661 | Camiseta Premium NEXTECH™ T-Shirt Feminina | T-Shirts | R$ 129 (de R$ 215) | 11 de 12 | P a GG | 92% Liocel, 8% elastano | tag `lançamento-fem` |
| `the-perfect-top-t-shirt-feminino` | 8959075057813 | The Perfect Top T-Shirt | t-shirt | R$ 129 a R$ 149 (de R$ 149) | 9 de 12 | P a GG | 87,5% poliamida biodegradável, 12,5% elastano | "formato baby tee", "sem bojo", "Low stock", tag `lançamento-fem` |
| `skin-cropped` | 7550147788949 | Blusa Skin Cropped | T-Shirts | R$ 99 (de R$ 119) | 17 de 21 | PP a XGG | 88% modal, 12% elastano | "cropped", SOFTOUCH, tag `lançamento-fem`; manga não declarada |
| `skin-cropped-long-sleeve` | 7942944882837 | Blusa Segunda Pele Manga Longa Skin Cropped | T-Shirts | R$ 145 a R$ 165 (de R$ 165) | 13 de 16 | P a GG | 88% modal, 12% elastano | "segunda pele de manga longa e gola média", "modelagem justa" |

Cores com estoque:
- Tech feminina: Preta, Off White, Carmenere, Indigo, Azul, Nori Green, Beetroot, Evergreen, Maple Brown.
- Gola V: Azul, Carmenere, Preta, Indigo, Off White, Beetroot, Evergreen, Maple Brown (Nori Green sem estoque).
- Manga longa: Carmenere, Gray Mint, Azul, Off White, Preta, Maple Brown, Evergreen.
- Gola alta ML: Dark Powder, Carmenere, Preta, Walnut Brown, Azul Marinho.
- Daily: Preta, Purple Cloud, Dry Leaf, Mineral Blue, Milk.
- NEXTECH: Nori Green, Preto, Off White.
- Perfect Top T-Shirt: Preto, Rust Brown, Woodsmoke.
- Skin Cropped: Preta, Woodsmoke, Rust Brown, Cinnamon Pink.
- Skin Cropped ML: Cinnamon Pink, Preta, Rust Brown, Woodsmoke.

Variação de preço por variante (Perfect Top T-Shirt): Preto P, M, G, GG e Rust Brown G a R$ 129; Rust Brown P, M, GG e Woodsmoke G, GG a R$ 149; Woodsmoke P a R$ 135. Sem estoque nas demais.
Skin Cropped ML: variantes entre R$ 145 e R$ 165; a faixa exata por cor não foi separada.

## Fora deste artigo (catálogo lido)

Linhas e motivo:
- Alças e tops, que vão para a pauta I5 ou pauta própria: `the-perfect-top` (Blusa de Alça, 18 de 23, R$ 135, de R$ 139, P a GG, Rust Brown/Branca/Azul/Preta); `the-perfect-top-assimetrico-feminino` (6 de 12, R$ 149); `the-perfect-top-halter-feminino` (6 de 12, R$ 135, de R$ 149); `the-perfect-top-cropped-feminino` (8 de 12, R$ 99, de R$ 119); `blusa-de-alca-futureform-feminino` (16 de 20, R$ 145 a R$ 195, de R$ 229, `lançamento-fem`).
- Regatas (pauta própria sugerida; sinal forte no autocomplete): `high-neck` "Regata Gola Alta Tech T-Shirt High Neck" (18 de 36, R$ 145 a R$ 169, de R$ 189); `structure-cropped` "Cropped Regata Structure" (32 de 42, R$ 99, de R$ 129); `structure-tank` "Blusa Muscle Tee Structure Tank" (26 de 36, R$ 139 a R$ 185, de R$ 185; tipo regata); `regatapremium-tecnologica-nextech-feminino` (3 de 12, R$ 99, de R$ 179); `regata-intech-feminino` (14 de 34, R$ 83,40, de R$ 139); `blusa-feminina-minimal-top-inlounge` "Regata Feminina Comfy InLounge" (8 de 30, R$ 81, de R$ 135); `regata-gola-quadrada-in-action-seamless-feminino` (15 de 16, R$ 189); `regata-nadador-in-action-seamless-feminino` (14 de 16, R$ 169).
- Camisa social FutureForm: `camisa-manga-curta-futureform-feminino` (7 de 16, R$ 315, de R$ 349); tipo "Camisa".
- Casaco: `techsture-vest` "Blusa Gola Alta Techsture Vest" (13 de 36, R$ 255, de R$ 299; tipo "Casacos"; a ficha não confirmada como camiseta).
- Colaborações e edições limitadas: APSEN (5 Tech Gola U, 1 a 2 variantes cada), `hightech-t-shirt-lifeproof-feminino` (2 de 15, R$ 279), `t-shirt-sportee-venturas-viagens-feminina` (2 de 5, R$ 349), `tech-t-shirt-long-sleeve-ventura-viagens-feminino` (8 de 10, R$ 245, de R$ 349).
- Esporte, body e kit: Top Fitness (`top-fitness-*`, `action-top-feminino`, `energy-top`, `modern-top`), Body (`body-feminino-segunda-pele-insculpt`, `perfect-body-*`), kits (`kit-*`, `conjunto-*`, `starter-pack-*`).
- Cadastros de sobra ou de teste, sem uso no texto: `tech-t-shirt-feminina-*` (sufixos `-d`, `-lp`, `-cg`, `-1`, `-2`, `-kit`, `-gg`, `-gg-1`; tags `excluir-collection-all` ou `test`), `tech-t-shirt-gola-v-feminina-*` (mesmo padrão), `tech-t-shirt-gola-alta-high-neck-feminina-cg`, `tech-t-shirt-gola-u-neon-feminino` (0 de 12), `tech-t-shirt-climb-to-the-future-feminina` (0 de 5), `tech-t-shirt-nomad-*` (test), `daily-t-shirt-coco-bambu-feminino` (test, 1 de 5), `perfect-body-decote-u-feminino` (0 de 18).
- Não achado no catálogo lido (pp 2 e 3): Tech T-Shirt Gola U feminina de linha principal. Está, se existir, na página 1 (pendente).

## Links de criador (existentes no repositório)

- `https://creators.insiderstore.com.br/hwvgusR`: "Comprar Tech T-Shirt® Gola V Feminina com o cupom", em `content/reviews/promocao-insider-selecao-com-cupom.json` (linha 361).
- `https://creators.insiderstore.com.br/bgkXdGE`: "Comprar Blusa Skin Cropped com o cupom", no mesmo arquivo (linha 383).
- `https://creators.insiderstore.com.br/3tQNigp`: "Comprar Blusa de Alça Feminina The Perfect Top com o cupom", no mesmo arquivo (linha 318). Pauta I5.
- `https://creators.insiderstore.com.br/axB7p3y`: Tech T-Shirt masculina (artigo `camiseta-insider-qual-escolher`).
- O link `52ZMYx2`, informado pelo Bruno como o da Tech feminina, **não aparece em nenhum arquivo do repositório** (busca em `content/reviews/*.json`). Não há como confirmar, sem navegador, qual produto ele abre.

Links de criador que faltam (a gerar no painel do Insider Creators Club):
1. Tech T-Shirt Manga Longa feminina: `https://www.insiderstore.com.br/products/tech-t-shirt-long-sleeve-feminina`
2. Tech T-Shirt Gola Alta Manga Longa feminina: `https://www.insiderstore.com.br/products/tech-t-shirt-high-neck-long-sleeve-feminino`
3. The Perfect Top T-Shirt: `https://www.insiderstore.com.br/products/the-perfect-top-t-shirt-feminino`
4. Camiseta Premium NEXTECH feminina: `https://www.insiderstore.com.br/products/camiseta-tecnologica-nextech-t-shirt-feminina`
5. Blusa Segunda Pele Manga Longa Skin Cropped: `https://www.insiderstore.com.br/products/skin-cropped-long-sleeve`
6. Daily feminina: sem link (cupom não entra; mesmo critério da Daily masculina).

## Cupom e política

- `couponsData.ts` (slug `insider`) e dossiê `01_Parceiros/Insider.md`, seção 1: EMCASACOMCECILIA dá 15% na loja online, sem valor mínimo, um cupom por pedido, não vale em lançamentos nem em loja física, soma com o Pix e vale com todas as formas de pagamento (Bruno, 09/10 e 12/10/2026).
- Daily: a página do produto (masculina, lida em 12/10/2026) diz "este item já está com desconto máximo aplicado. Não é cumulativo com cupons". A Daily feminina não mostra esse aviso no HTML estático de `https://www.insiderstore.com.br/products/daily-t-shirt-feminina` (lido em 30/10). Ver pendentes.
- Tag `lançamento-fem` em quatro linhas (Perfect Top T-Shirt, NEXTECH feminina, Skin Cropped, Skin Cropped ML): o dossiê diz que a tag não serve de critério (Tech e Core com a tag receberam o desconto em 05/10 e 12/10). Não testável sem carrinho.
- Garantia de desbotamento (ficha da Tech feminina, `body_html`): "Garantia de 2 anos contra desbotamento para peças adquiridas a partir de 06/09/24, desde que seguidas as instruções da etiqueta, considerando uma lavagem por semana." A página diz que é a "única com garantia contra desbotamento" (afirmação da marca).
- Troca (central de ajuda, lida 20/10 e 09/10; dossiê seção 3): troca gratuita; arrependimento 7 dias úteis; insatisfação 21 dias corridos (sem uso, com etiqueta, sem lavagem); defeito 180 dias com fotos; pedido pelo Portal de Trocas.
- Tamanho: a Insider descreve a Tech feminina como "caimento levemente ajustado, sem comprimir" (texto de `tabela-de-medidas-insider`, que já cobre Tech feminina, Gola V, Manga Longa, Daily feminina).

## Sobreposição com artigos no ar (PT, com `affiliate: insider`)

- `camiseta-insider-qual-escolher` (masculina, no ar 30/10): só masculina. Esta pauta não repete nenhuma linha dele.
- `tabela-de-medidas-insider`: tabela feminina (Tech, Gola V, Manga Longa, Daily feminina, busto e largura). Linkar, não repetir.
- `insider-mercado-livre-ou-site` (no ar 28/10): The Perfect Top T-Shirt e Daily feminina no site e no Mercado Livre (27/10): Perfect Top R$ 129 no site; Daily R$ 99 no site. Linkar, não comparar com o ML aqui.
- `promocao-insider-selecao-com-cupom` (15/10): já tem links de criador de Gola V (hwvgusR), Skin Cropped (bgkXdGE), Perfect Top de alça (3tQNigp), Cropped Regata Structure (dazRj26). Os preços dele são de 15/10 e não batem com os de 30/10: não copiar preço.
- `insider-vale-a-pena`, `kit-insider-quando-compensa`, `presente-de-natal-insider-kits-gift-card`, `black-friday-insider`, `cupom-emcasacomcecilia-insider-store-como-usar`: citam feminina em trechos curtos; nenhum tem tabela feminina.
- `I5` ("Insider feminino: Perfect Top, legging e vestido"), em `03_Memoria/Fila-de-Pautas.md`, linha 91: status "Estoque".

## Autocompletar

Ver `autocomplete.txt` nesta pasta. Resumo:
- "camiseta feminina insider": Google, 10 sugestões (gola v, mercado livre, branca, marrom, preço, daily básica, manga longa, promoção, é boa).
- "insider feminina": Google, 10 (camiseta, regata, tech, manga longa, saia, academia, promoção).
- "tech t shirt feminina": Google, 10 (insider, modal, heavy, gola v, manga longa, long sleeve). Bing: "tech t shirt feminina".
- "perfect top insider": Google, 10 (é bom, tamanho, pp, beetroot, woodsmoke, mercado livre, amazon).
- "regata feminina insider": Google, 10 (mercado livre, com bojo, branca, comfy, academia, poliamida).
- "insider baby look": Google, 2 ("insider baby look feminina"); Bing, nenhuma. Sinal fraco.
- "camiseta insider feminina vale a pena": nenhuma sugestão.

## Pendentes de navegador

- `https://www.insiderstore.com.br/products.json?limit=250&page=1`: HTTP 429. Parei o host, mas só depois de mandar duas requisições a mais (páginas 2 e 3, que responderam). Falta a página 1, onde pode estar a Tech Gola U feminina de linha principal e outros cadastros.
- Confirmar no navegador, sem carrinho: se a Daily feminina mostra o aviso "desconto máximo", em `https://www.insiderstore.com.br/products/daily-t-shirt-feminina`.
- Confirmar no navegador: se a Blusa Skin Cropped (`https://www.insiderstore.com.br/products/skin-cropped`) tem manga e qual; a ficha não diz.
- Confirmar no navegador: o produto aberto pelo link `https://creators.insiderstore.com.br/52ZMYx2`, para dizer se é a Tech feminina.
