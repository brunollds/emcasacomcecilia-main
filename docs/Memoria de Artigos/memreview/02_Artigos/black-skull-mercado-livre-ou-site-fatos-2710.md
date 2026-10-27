# Fatos: Black Skull no Mercado Livre ou no site (27/10/2026)

Site: leitura por produto na API pública VTEX (`/api/catalog_system/pub/products/search/<slug>/p`), uma requisição por vez, pausa de 4 s, sem bloqueio. JSONs em `vtex/`. Políticas de entrega e de troca: HTML estático de `/institucional/politica-de-entrega` e `/institucional/trocas-e-devolucoes`, lidas em 27/10 (gzip descomprimido). Mercado Livre: leitura do Chrome pelo Claude principal, em `../fatos-chrome-ml-black-skull-2710.md`.

## 1. Tabela de preços (preço à vista, sem cupom, 27/10/2026)

CECILIA10 = 10% sobre o preço do site, em todos os itens (inclusive promoção). Diferença = site com cupom menos ML (positivo = ML mais barato).

| # | Produto (mesmo tamanho) | Site (VTEX) | Site c/ CECILIA10 | ML (cards, 27/10) | Diferença | Quem ganha |
|---|---|---|---|---|---|---|
| 1 | Whey 100% HD 900g (11 sabores, todos a 169,90 no site) | 169,90 | 152,91 | 129,90 a 149,90 (baunilha 129,90 e 149,90; vitamina de frutas, cappuccino, caramelo, cookies and cream 139,90) | +3,01 a +23,01 | ML |
| 2 | Whey 100% HD Refil 900g (sabores no site a 159,90) | 159,90 | 143,91 | 139,90 (sabor não conferido) | +4,01 | ML (folga menor) |
| 3 | Whey 100% HD 1,8 kg | 279,90 | 251,91 | 279,90 | -27,99 | Site |
| 4 | Whey 100% HD Gourmet Refil 900g | 119,90 | 107,91 | 119,90 | -11,99 | Site |
| 5 | Whey 100% HD Gourmet 450g | 84,90 | 76,41 | 84,90 | -8,49 | Site |
| 6 | Creatine Turbo 300g | 39,90 | 35,91 | 39,90 | -3,99 | Site |
| 7 | Creatine Turbo Refil 500g | 49,90 | 44,91 | 59,90 | -14,99 | Site |
| 8 | Creator Creatina Monohidratada 300g (tabela 49,90) | 29,90 | 26,91 | 49,90 | -22,99 | Site |
| 9 | Creatina Monohidratada 150g | 39,90 | 35,91 | 39,90 | -3,99 | Site |
| 10 | Pré-Treino B.O.P.E 300g | 64,90 | 58,41 | 64,90 | -6,49 | Site |
| 11 | Pré-Treino B.O.P.E 150g | 34,90 | 31,41 | 34,90 | -3,49 | Site |
| 12 | Pré-Treino Bone Crusher 300g | 69,90 | 62,91 | 69,90 | -6,99 | Site |
| 13 | Pré-Treino Bone Crusher 150g | 44,90 | 40,41 | 44,90 | -4,49 | Site |
| 14 | Thermo Flame 60 tabletes (o de 120 só existe no site, 49,90) | 34,90 | 31,41 | 34,90 | -3,49 | Site |
| 15 | Kit 2 Whey Turbo 907g (dois sabores por kit) | 132,81 (tabela 139,80) | 119,53 | 159,80 | -40,27 | Site |

Sem par confirmado:
- **Creatina Pura 300g (ML 79,92):** não existe no site com esse nome. O mais próximo é "Creatine - Creatina Monohidratada - 300g" (site 41,90, tabela 49,90; sabores Creatine, Laranja e Limão). O preço do ML não fecha com ele: pode ser outro produto. Não comparar sem confirmar o anúncio.

Sem cupom (site contra ML): iguais em 10 itens (linhas 3 a 6, 9 a 14, este último a 34,90); site mais barato em 3 (Creator 300g, Turbo Refil 500g e Kit 2 Whey Turbo); ML mais barato em 2 (wheys 900g e Refil 900g, linhas 1 e 2).

Estoque (VTEX, 27/10): quase tudo com estoque. Sem estoque na leitura: Whey Gourmet Refil 900g sabor baunilha. Creatine Turbo 300g limão tem 10 unidades.

## 2. Canais e formas de pagamento

- CECILIA10 (dossiê Black-Skull.md, couponsData.ts, FAQ do cupom): 10% OFF em todo o site, todas as formas de pagamento, soma com promoções, para conta nova e antiga. Teste de checkout de 24/10 (testNote em couponsData): kit de whey em promoção e whey a preço cheio, os 10% valeram nos dois.
- Pix: não há desconto de Pix além do cupom nas leituras. A política de pagamento (`/politica-de-pagamento`) não tem texto no HTML estático (montada no navegador): [PENDENTE: navegador]. Vault: "nenhuma página mostra desconto no Pix" (leitura de 23/10).
- Dossiê (consultado 14/10): Pix parcelado em 4x, cartão em até 8x sem juros (parcela mínima R$ 50), boleto.
- ML: cupom não vale (FAQ de couponsData, slug black-skull). Parcelamento e preço por forma de pagamento do anúncio não lidos.

## 3. Frete

- Site (`/institucional/politica-de-entrega`, lida em 27/10): frete grátis no Sul e Sudeste acima de R$ 199,90; Centro-Oeste acima de R$ 249,90; demais regiões acima de R$ 299,90. "A regra é aplicada de forma automática no checkout e considera o valor total final do carrinho (deduzido de descontos, se cabível)." Consequência: o cupom pode deixar o pedido abaixo do limite. Ex.: Whey 900g com cupom = R$ 152,91, abaixo de R$ 199,90 no Sul e Sudeste.
- Valor do frete abaixo do limite: não lido (precisa de CEP). [PENDENTE: navegador]
- ML (Chrome, 27/10): nos cards aparece "Frete grátis por ser sua primeira compra". Regra só para conta nova; não prometer.

## 4. Trocas e devoluções

- Site (`/institucional/trocas-e-devolucoes`, lida em 27/10):
  - Arrependimento: 7 dias corridos do recebimento, produto lacrado e sem uso, devolução de todos os itens da nota (sem devolução parcial), com reembolso do total.
  - Troca: até 30 dias corridos da entrega, pedida por e-mail (sac@blackskullusa.com). Prazo de 7 dias para enviar o produto. Troca por produto similar (conforme estoque) ou crédito no site. Custo do novo envio por conta do cliente. Defeito: postagem e coleta pagas pela loja.
  - Suplemento consumido parcialmente não entra na troca comum (texto da política).
- ML: troca e devolução seguem a política do anúncio e da plataforma. Não lida. [PENDENTE: navegador]

## 5. Mercado Livre (Chrome, 27/10; `../fatos-chrome-ml-black-skull-2710.md`)

- Loja oficial: https://www.mercadolivre.com.br/loja/black-skull ("Black Skull_", selo "Loja oficial", 23,6 mil seguidores). 70 resultados; lidos 47 (primeira página).
- Link de afiliado: https://meli.la/1R7Zwan (mercadoLivreUrl do FAQ de couponsData; não clicado).
- Preços dos cards: ver a tabela do item 1. Os "Antes:" (preço riscado) não foram capturados.

## 6. Canibalização (artigos publicados, PT)

- `cupom-black-skull-como-usar` (publicado 14/10/2026, id 423): já responde "O cupom vale no Mercado Livre, na Shopee ou na Amazon?" e tem o passo a passo. Sobreposição: a resposta sobre o ML. O B4 só linka e não repete o FAQ.
- `black-skull-e-confiavel` (14/10): tem as regras de troca, arrependimento e faixas de frete. O B4 linka e repete no máximo uma frase.
- `whey-black-skull-qual-escolher` (publicado): tem a frase "O código não vale no Mercado Livre: lá vale o preço do anúncio." Sobreposição pequena.
- `melhor-whey-qual-escolher-por-objetivo` (A2, briefing de 23/10, ainda não publicado): compara whey por preço por 100 g de proteína, incluindo a Black Skull. Se o B4 publicar preço de whey por canal, a A2 precisa usar a mesma data e o mesmo número.
- Sinais de busca (rodada, 27/10): Google "black skull onde comprar", "whey black skull onde comprar", "creatina black skull onde comprar", "cupom black skull mercado livre", "cupom black skull shopee", "cupom black skull amazon". Bing "black skull site oficial", "site da black skull", "onde comprar whey black skull", "black skull mercado livre".

## 7. Pendentes de navegador (URLs exatas)

1. https://www.mercadolivre.com.br/loja/black-skull: ler os 23 anúncios restantes (Creatina Pura 300g, sabor de cada whey 900g e do Refil 900g).
2. https://lista.mercadolivre.com.br/loja/black-skull/: mesma lista, com preço por página.
3. Anúncio do Whey 100% HD 900g a R$ 129,90 (baunilha) e a R$ 139,90 (vitamina de frutas): URL no ML, com vendedor e sabor.
4. Política de devolução e garantia do anúncio no ML (aba de devolução de um anúncio da loja oficial).
5. https://www.blackskullusa.com.br/politica-de-pagamento: desconto de Pix, se houver (o texto não está no HTML estático).
6. https://www.blackskullusa.com.br/whey-100-hd-black-skull-900g-wpc-wpi-e-wph/p: valor do frete com CEP de teste na página do produto, sem dado pessoal.
