# Leituras do IL2: quatro lojas para o presente de amigo secreto masculino (11/11/2026)

Base de [[presente-amigo-secreto-masculino]]. CEP 01310-100, sem login e sem finalizar a compra. Na releitura de 01/12, refazer na mesma ordem e comparar.

## IL2: leituras de 11/11/2026 (noite), sem login, sem finalizar

## Insider (insiderstore.com.br), EMCASACOMCECILIA
- Catálogo por /products.json (curl, 200). Carrinho no navegador (cart/add.js) com o código aplicado no checkout:
  - Tech T-Shirt preta M: página R$ 135 (de R$ 169, "20% OFF"); com o código R$ 114,75 (−R$ 20,25). Checkout mostrou "Melhor desconto ativado".
  - Cueca Boxer Performance preta M simples: R$ 85 → R$ 72,25.
  - Cueca Slip preta M Comfort: R$ 75 → R$ 63,75.
  - Meia Cano Curto SneakIN preta 39-44: R$ 25 (de R$ 29) → R$ 21,25.
  - Meia Cano Médio Anti Odor NoHo Storm 39-43: R$ 59 (de R$ 69) → R$ 50,15.
- Frete: o checkout novo só mostra o frete depois de e-mail, nome, endereço e telefone; o /cart/shipping_rates.json dá 400 (loja headless). Decisão do Bruno (11/11): a tabela da Insider sai sem o valor do frete, com "frete grátis acima de R$ 399" e o frete calculado no checkout.
- Checkout oferece "Esse pedido é um presente?" e a Insider Gift Bag por R$ 9,00.

## Max Titanium (maxtitanium.com.br, VTEX/FastStore), MAX10EMCASACOMCECILIA
- Catálogo pela API de busca pública no navegador. A API de checkout dá 403 por fetch; carrinho pela interface (minicarrinho).
- Carrinho com o código (desconto por item):
  - Coqueteleira Tritan Max Titanium: R$ 109,00 → R$ 98,10 (10%). Pix: R$ 93,20.
  - Creatina 300 g MonoHidratada: lista R$ 75,10, página R$ 59,90 (20% OFF) → R$ 58,70 no carrinho com o código (o código só tirou 2% sobre a promoção).
  - Camiseta Masculina Heavy Club P preta: lista R$ 99,00, página R$ 89,10 → R$ 87,32.
  - Brinde automático no carrinho: "Meia Max Vegas Preta" R$ 29,90 → Grátis (apareceu ao adicionar a camiseta; regra não lida).
- Frete grátis por região (página do produto): SP capital acima de R$ 104; Sudeste R$ 134; Centro-Oeste R$ 204; Sul R$ 249; Nordeste R$ 299; Norte R$ 599. O carrinho conta depois do código: com a Tritan a R$ 98,10, "Falta R$ 5,90 para FRETE GRÁTIS".
- Frete lido na página da Tritan (CEP 01310-100, sem código): Expresso até 2 dias úteis grátis (acima do mínimo); Normal até 4 dias R$ 12,53; Padrão até 3 dias R$ 12,55; Standard até 4 dias R$ 12,73.
- Outros: Coqueteleira 700 ml rosa R$ 13,29 (de R$ 29,90; preta e incolor esgotadas); Galão 2,2 L preto R$ 44,51; Camiseta Oversized Redemption R$ 107,10.

## Dr. Peanut (drpeanut.com.br, VTEX headless; checkout em secure.drpeanut.com.br), DREMCASACOMCECILIA
- Vitrine no navegador (o curl dá 429). Carrinho pela API pública do checkout em secure.drpeanut.com.br, no navegador, um carrinho novo por item, com o código e o CEP 01310-100 (sem dado pessoal). Cupom aceito em todos, 10%.
- Barra do site: frete grátis acima de R$ 149,90 no Sul e no Sudeste; demais regiões acima de R$ 199,90.
| SKU | Item | Página | Com o código | Frete mais barato (prazo) | Total |
|---|---|---|---|---|---|
| 237 | Kit Sortido 6 Wafers (2 avelã, 2 cookies, 2 doce de leite) 25 g | R$ 65,34 | R$ 58,81 | Expresso R$ 11,10 (2 dias úteis) | R$ 69,91 |
| 265 | Combo Comprou, Ganhou Cookies: 1 pasta 600 g + 3 alfajores de brinde | R$ 59,89 (de R$ 98,86) | R$ 53,90 | Expresso R$ 11,02 (2 d.u.) | R$ 64,92 |
| 238 | Kit Sortido 12 Wafers | R$ 130,68 | R$ 117,61 | Expresso/Padrão R$ 12,08 (2 d.u.) | R$ 129,69 |
| 160 | Display Doctor Bar Avelã 62 g, 8 un. | R$ 122,03 | R$ 109,83 | Expresso R$ 11,95 (2 d.u.) | R$ 121,78 |
| 194 | Display 12 Alfajores Doce de Leite 35 g | R$ 155,88 | R$ 140,29 | Padrão R$ 12,24 (3 d.u.) | R$ 152,53 |
| 189 | Alfajor Doce de Leite 35 g (avulso) | R$ 12,99 | R$ 11,69 | Expresso R$ 10,31 | R$ 22,00 |
- Outras opções de frete por item: Normal e Standard 4 d.u., Padrão 3 d.u., todas entre R$ 11 e R$ 12,50.
- Kit de 5 alfajores não está mais à venda (não aparece em Snacks nem em Combos).

## Let's Eat It (letseatit.com.br, Shopify), MAUAD
- Catálogo por /products.json (curl, 200; 3.000 produtos). Frete pelo /cart/shipping_rates.json no navegador (carrinho de 1 item, CEP 01310-100, SP), sem dado pessoal. Código no campo do checkout.
- **MAUAD deu 5%, não 10%:** Kit Prana + Faca Beef Club (R$ 103,56) → −R$ 5,17; Caneca Le Creuset Bleu Riviera 100 ml (R$ 129, preço cheio) → −R$ 6,45. Bate com o `couponsData.ts` (discount '5% OFF'); o briefing do IL2 dizia 10%.
- O desconto entra sobre o subtotal, também em item em promoção.
- Frete para 01310-100 (1 item): Magalog 7 dias, de R$ 39,42 a R$ 42,70; Jamef 6 dias, R$ 223,79. Sem frete grátis.
| Item | Página | Com MAUAD (5%) | Frete Magalog (7 dias) | Total |
|---|---|---|---|---|
| Kit Churrasco Garfo e Faca Chaira Prana | R$ 33,66 (de R$ 56,10) | R$ 31,98 | R$ 42,70 | R$ 74,68 |
| Faca para Churrasco Beef Club inox Fracalanza | R$ 69,90 (de R$ 116,50) | R$ 66,41 | R$ 39,42 | R$ 105,83 |
| Tábua Madeira Média Toscana Bahali 33x18 | R$ 74,00 (de R$ 259) | R$ 70,30 | R$ 39,45 | R$ 109,75 |
| Caneca Mug 450 ml Giramondo Egan | R$ 129,90 (de R$ 216,50) | R$ 123,41 | R$ 41,75 | R$ 165,16 |
| Kit 2 Canecas Parede Dupla 300 ml Bugatti | R$ 134,90 | R$ 128,16 | R$ 41,78 | R$ 169,94 |
| Petisqueira Maia teca Laguiole La Maison | R$ 135,00 (de R$ 225) | R$ 128,25 | R$ 41,79 | R$ 170,04 |
| Caneca Cerâmica 100 ml Le Creuset Bleu Riviera | R$ 129,00 | R$ 122,55 | R$ 39,85 (checkout) | R$ 162,40 |
- Conferido no checkout: Prana + Faca juntos, subtotal R$ 103,56, MAUAD −R$ 5,17, frete R$ 42,70, total R$ 141,09.

## Políticas (lidas em 11/11)
- Max Titanium, Política de Frete Grátis: SP capital a partir de R$ 104; Sudeste R$ 134; Sul R$ 249; Centro-Oeste R$ 204; Nordeste R$ 299; Norte R$ 599. "Em casos de aplicação de cupom de desconto ou vale-presente, o frete poderá ser cobrado se o valor final ficar abaixo" do mínimo; frete grátis na forma de envio de menor valor; Sedex sempre pago.
- Max Titanium, Troca e Devolução: arrependimento em 7 dias corridos do recebimento, com embalagem original e lacre (e-mail sac@supley.com.br, com a nota); troca por outro produto "mediante análise e aprovação", lacrado e com a nota; defeito em 30 dias (alimentos) ou 90 dias (roupas, acessórios, coqueteleiras). Sem regra própria para presente.
- Dr. Peanut (dossiê, política de 14/10): 7 dias de arrependimento; troca por outro produto com frete do cliente; defeito em 30 dias (alimentos). Mesma empresa (Supley) da Max.
- Let's Eat It (dossiê): 30 dias da entrega, reembolso ou crédito; defeito até 90 dias. O FAQ do frete fala em 7 dias para troca.
- Insider (dossiê, central de ajuda): troca de presente pedida por quem ganhou, sem nota nem embalagem, vale-troca em até 21 dias corridos da entrega, com etiqueta e sem uso; underwear (cueca) só troca por defeito.

## Max Titanium: carrinho com frete por item (API pública do checkout em secure.maxtitanium.com.br, no navegador, CEP 01310-100, sem dado pessoal; prevalece sobre a leitura do minicarrinho)
| SKU | Item | Lista | Página | Com o código | Frete mais barato (prazo) | Total |
|---|---|---|---|---|---|---|
| 197 | Coqueteleira 700 ml Rosa | R$ 29,90 | R$ 24,17 | R$ 11,96 | Expresso R$ 11,00 (2 d.u.) | R$ 22,96 |
| 207 | Galão 2,2 L Preto | R$ 49,90 | R$ 44,51 | R$ 40,06 | Expresso R$ 11,33 (2 d.u.) | R$ 51,39 |
| 31 | Creatina 300 g MonoHidratada | R$ 75,10 | R$ 59,90 | R$ 58,70 | Expresso R$ 11,57 (2 d.u.) | R$ 70,27 |
| 2711 | Camiseta Masculina Heavy Club P preta | R$ 99,00 | R$ 89,10 | R$ 87,32 | Expresso R$ 12,18 (2 d.u.) | R$ 99,50 |
| 2318 | Coqueteleira Tritan Max Titanium | R$ 109,00 | R$ 109,00 | R$ 98,10 | Expresso R$ 12,34 (2 d.u.) | R$ 110,44 |
| 2542 | Camiseta Masculina Oversized Redemption P preta | R$ 119,00 | R$ 107,10 | R$ 104,96 | Expresso grátis (2 d.u.) | R$ 104,96 |
- O percentual do código muda por item: 10% na Tritan e no galão; uns 2% sobre a promoção na creatina, na Heavy Club e na Oversized; a coqueteleira rosa caiu de R$ 24,17 para R$ 11,96 no carrinho.

## Releitura da coqueteleira rosa (11/11, noite, checkout seguro da Max)
- Coqueteleira Rosa 700ML (SKU 197): lista R$ 29,90, página R$ 24,17. No carrinho, sem código, entra a promoção "Max Outlet: Roupas e Acessórios 45% OFF - Novembro/2026" e o item cai para R$ 13,29. Com o MAX10EMCASACOMCECILIA ("Inbazz - Novos Cupons 10% OFF - Demais Produtos"), R$ 11,96. O código soma com a promoção do outlet.
- Política de frete (/policies/shipping-policy.json, curl 200, 11/11 noite): "frete grátis para compras acima de R$ 399,00"; o valor e o prazo aparecem no checkout com o CEP. O dossiê diz que o limite conta depois do desconto.
