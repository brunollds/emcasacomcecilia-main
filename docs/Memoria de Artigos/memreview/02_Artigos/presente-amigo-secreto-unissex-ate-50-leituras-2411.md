# Leituras do NT2: amigo secreto unissex até R$ 30 e R$ 50 (24/11/2026)

Base de [[presente-amigo-secreto-unissex-ate-50]]. Leitura pública, sem login, sem finalizar compra, sem link de afiliado. Preço do dia, sem código. CEP de teste 01310-100 (sem dado pessoal).

## Como foi lido

| Loja | Caminho | Resultado |
|---|---|---|
| La Ganexa (lojalaganexa.com.br, Shopify) | `/products.json` (206 KB, 35 produtos); `/cart/add.js` e `/cart/shipping_rates.json` com CEP 01310-100 | Catálogo lido. Frete: lista vazia, **[PENDENTE: navegador]**. Carrinho criado só na API (um brigadeiro de colher), sem checkout. |
| BOLD (boldsnacks.com.br, Shopify) | `/products.json` (30 produtos) | Catálogo lido. Nenhum item dentro das faixas, exceto a creatina (ver abaixo). |
| Dr. Peanut (drpeanut.com.br, VTEX) | Busca pública `/api/catalog_system/pub/products/search/` | **HTTP 429**, página "Vercel Security Checkpoint", em todas as tentativas. Parado; **[PENDENTE: navegador]**. |
| Gocase (gocase.com.br) | `/products.json` e `/api/catalog_system/pub/products/search/` dão 404; `/sitemap.xml` dá 404; a home traz poucos preços no HTML; a página do produto (`/<slug>/p`) responde 302 | **[PENDENTE: navegador]**. Não lida. |

## La Ganexa: itens nas faixas (preço do dia, 24/11, sem código)

| Item (handle) | Preço do dia | Riscado (só registro, não usado) | Faixa |
|---|---|---|---|
| Xagadinho sabor Pizza 45 g (`xagadinho-sabor-pizza-45g`) | R$ 15,90 | n/d | até 30 |
| Xagadinho sabor Cebola e Salsa 45 g (`xagadinho-sabor-cebola-e-salsa-45g`) | R$ 15,90 | n/d | até 30 |
| Suspiro sabor Bala de Coco 30 g (`suspiro-bala-de-coco`) | R$ 15,99 | n/d | até 30 |
| Kit Degustação: 1 Xagadinho Pizza e 1 Xagadinho Cebola e Salsa (`kit-degustacao-1-xagadinho-pizza-e-1-xagadinho-cebola-e-salsa`) | R$ 24,90 | R$ 31,80 | até 30 |
| Brigadeiro de Colher 250 g (`brigadeiro-de-colher-250g`) | R$ 44,99 | R$ 54,99 | até 50 |
| Kit 5 Xagadinhos sabor Pizza 45 g (`kit-5-xagadinhos-sabor-pizza-45g`) | R$ 49,90 | R$ 79,90 | até 50 |
| Kit 5 Xagadinhos sabor Cebola e Salsa 45 g (`kit-5-xagadinhos-sabor-cebola-e-salsa`) | R$ 49,90 | n/d | até 50 |

Fora das faixas, para registro: Suspiros degustação de 3 sabores (R$ 35,99), Doce de Leite Zero 400 g (R$ 69,99), Kit 2 Brigadeiro de Colher (R$ 83,99), Kit 2 Doce de Leite Zero (R$ 127,99).

Riscado não entra no artigo. O teste de 13/11 (dossiê) aceitou o CECILIA em cookies, kit de degustação de pasta, kit de cookies e doce de leite zero, e o de 23/11 nos dois kits de 2. Nenhum deles cobre xagadinhos, suspiros, brigadeiro avulso ou o kit de 5.

## La Ganexa: código, frete e prazo

- **Código CECILIA, 10%** (dossiê de 13/11 e teste do Lote 7A de 23/11 no checkout da Yampi, `seguro.lojalaganexa.com.br`): aceito no Kit 2 Brigadeiro de Colher e no Kit 2 Doce de Leite. **Não testado nos itens das faixas** (xagadinhos, suspiros, brigadeiro avulso, kit de 5). A regra escrita da loja, "não cumulativo com outras promoções, cupons ou descontos", vale para os kits de 2 do doce de leite e do brigadeiro; os itens das faixas não estão nessa regra no que foi lido. **[PENDENTE: navegador]** para cada item usado.
- **Frete grátis**: acima de R$ 250 no Sul e no Sudeste; acima de R$ 350 nas demais regiões (política, dossiê de 13/11). O mínimo conta depois do cupom, pela palavra do Bruno (13/11). **Valor do frete abaixo do mínimo: não lido** (a API do carrinho não devolve taxa). **[PENDENTE: navegador]**.
- **Prazo**: envio em até 24 horas úteis depois do pagamento confirmado; entrega em média de 2 a 5 dias úteis depois da postagem (política de frete, dossiê de 13/11).
- **Brinde surpresa acima de R$ 180**: fora das faixas.

## BOLD: por que não entra

- 30 produtos. Menor preço: **creatina 300 g, R$ 40,00** (a única fora de R$ 50 que cabe na faixa de 50). Barras de 14 g e wafers de R$ 93 para cima; whey em sachê, display de 10, R$ 139.
- Creatina: suplemento, e a regra do artigo é "presente só para quem já usa". Não entra num amigo secreto unissex.
- Código CECILIA15 (20% no teste de 18/11, nome com 15): não muda a conclusão.

## Dr. Peanut: referência de 11/11, não é preço de hoje

Não usar como preço. Só para dizer o que procurar no navegador: na leitura de 11/11 (IL2), o alfajor doce de leite 35 g avulso saiu a R$ 12,99 na página (com o código, R$ 11,69); o Kit de 5 alfajores não está mais à venda. Dr. Peanut precisa de leitura nova pelo navegador antes de entrar no NT2.

## Gocase: referência

Nenhum preço lido. Loja de acessórios (copos, garrafas, necessaires); a faixa unissex de R$ 30 e R$ 50 pode caber lá, mas não há preço lido.

## Frete e a faixa baixa

Na faixa de R$ 30, o frete pode passar do valor do presente. A La Ganexa só dá frete grátis acima de R$ 250 (Sul e Sudeste) e de R$ 350 (demais regiões). Com um pedido de um xagadinho, o frete é o que a loja cobrar abaixo do mínimo, e o valor não foi lido. Não estimar: o briefing espera a leitura.

## Acréscimo de Claude: leitura pelo navegador do app (24/11/2026, sem link de afiliado)

### Dr. Peanut (páginas de categoria, preço do dia; o primeiro valor é o de tabela quando há dois)
- Faixa do frete grátis (faixa do topo do site): Sul e Sudeste acima de R$ 149,90; demais regiões acima de R$ 199,90. Um presente de até R$ 50 paga frete.
- Até R$ 30: Alfajor 35 g (Leite em Pó, Avelã) R$ 12,99; Doctor Wafer 25 g (Cookies & Cream, Doce de Leite) R$ 11,46; Kit 2 Doctor Wafer 25 g R$ 22,92; pasta de amendoim 250 g (Bueníssimo, Bombom Italiano e outros) tabela R$ 28,90, dia R$ 25,89.
- Até R$ 50: Combo Cozy (2 pastas de 250 g, Doce de Leite e Caramelo Salgado) tabela R$ 51,78, dia R$ 47,64: **passa de R$ 50 pela tabela**. Combo de 3 pastas de 250 g: tabela R$ 77,67.
- A IL2 já cita o alfajor avulso: no NT2 usar outro item (pasta de 250 g ou kit de wafers).

### Gocase (página "Acessórios até R$49,90", `/acessorios-hit`)
- Itens na página: Organizador Tote Bag, Necessaire Trip, Necessaire Clean, Necessaire Holográfica, Garrafa Flow 500 ml, Estojo Universitário, Marmita Up, Marmita Duo e acessórios de garrafa (bases de silicone, alças, tampas, cordão para case).
- Preços na página de R$ 19,90 a R$ 49,90, vários com riscado (ex.: R$ 39,90 riscado R$ 79,90). O nome de cada preço precisa ser casado na ficha no dia da redação.
- Frete grátis na home: acima de R$ 229,90 **para Minas Gerais**; outras regiões não aparecem na faixa.
- Capinha começa em R$ 39,90, mas depende do modelo do celular: ruim para amigo secreto.
- A Gocase personaliza muitos itens: prazo de produção e troca de personalizado entram no texto pelo FAQ da própria loja.
