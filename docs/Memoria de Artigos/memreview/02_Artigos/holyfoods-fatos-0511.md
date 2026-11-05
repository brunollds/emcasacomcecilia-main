# Fatos: HolyFoods (leitura de 05/11/2026)

Job 1 do onboarding da HolyFoods. Vale para as pautas `holyfoods-e-confiavel`, `holyfoods-reclame-aqui-nota-reputacao`,
`cupom-holyfoods-como-usar` e `black-friday-holyfoods`. O dossiê é o `01_Parceiros/HolyFoods.md` (PR #590, com a página
`/cupons/holyfoods`).

Como foi lido:
- Home e catálogo (`/products.json`) por `curl`, sem bloqueio.
- CNPJ pela open.cnpja.com (a BrasilAPI não respondeu) e domínio pelo RDAP do Registro.br.
- Reclame Aqui no Chrome do Bruno, só leitura (o `curl` levou 403 da Cloudflare).
- A política de trocas (`/policies/refund-policy`) fica atrás da verificação da Cloudflare (dossiê): ler no Chrome.
- Sem carrinho, login ou formulário. Os testes do cupom são os do dossiê.

## 1. Empresa

| Fato | Fonte | Confiança |
|---|---|---|
| HOLY GROUP LTDA, nome fantasia Holy Group, CNPJ 50.874.415/0001-62, aberta em 30/05/2023, ativa, capital de R$ 50 mil | open.cnpja.com | Alta |
| Atividade principal: comércio varejista de produtos alimentícios | open.cnpja.com | Alta |
| Endereço do rodapé: Rua Gumercindo Luiz Pinto Monteiro, 35, Centro, Extrema (MG) | Rodapé do site | Alta |
| Domínio `holyfoods.com.br` registrado em 14/05/2024 | RDAP do Registro.br | Alta |
| O perfil no Reclame Aqui tem o endereço `/empresa/holysoup/`, com o nome "HolyFoods" e o mesmo CNPJ; a página diz "está no Reclame Aqui há 5 anos" e a busca, "4 anos no RA" | Reclame Aqui, 05/11 | Alta. O nome antigo da marca, HolySoup, aparece também na descrição de kits ("Por que escolher HolySoup?"). A história da troca de nome só com fonte da marca |
| A marca diz: "+8 milhões de unidades vendidas", "+500 mil clientes", "+4 mil pontos de venda" e nota 4,8 em 25.828 avaliações no site | Home | Frase da marca, dita como tal |
| Tem página "Onde encontrar" (lojas físicas que vendem HolyFoods), revenda e WhatsApp (seg a sex, 9h às 18h) | Menu da home | Alta. A lista de lojas não foi lida |
| Telefone no Reclame Aqui: (11) 4003-8025 | Reclame Aqui | Alta |

## 2. Produtos e preços (05/11, já com os 30% da Black)

- Sopas Detox, Low Carb, da Vovó e Canja da Mamãe: R$ 19,90, ou R$ 13,93. Cada sachê rende 1 litro, quatro porções de 250 g. O pack com 10 sachês custa R$ 59,90, ou R$ 41,93.
- Risotos (Funghi, Al Mare e de Queijo) e Macs (Queijo, Alfredo, Bolonha e Caipira): R$ 19,90, ou R$ 13,93. Uma refeição por embalagem, com 20 g de proteína. Sem glúten; alguns têm leite e lactose.
- Projeto 21 Dias: 21 sachês, 7 de cada sopa (Vovó, Low Carb e Canja), por R$ 147,00, ou R$ 102,90, que dá R$ 4,90 por porção pela conta da loja.
- Kits da Black:
  - Descoberta: 8 refeições, R$ 159,20 por R$ 111,44.
  - Rotina Resolvida: 15 refeições, R$ 298,50 por R$ 208,95.
  - Despensa Cheia: 2 packs de sopa e 18 massas e risotos, 38 refeições, R$ 478,00 por R$ 334,60.
- Outros: Super Aveia (esgotada em 05/11), feijão (esgotado), Mel Holy 330 g e os kits Vegano, Vegetariano, Almoço e "Seca Barriga 30 dias".
- Guardam-se fechados na despensa, sem congelador. O preparo leva de 15 a 20 minutos no fogão; o blog tem "Como fazer risoto HolyFoods: preparo no fogão em 18 a 20 minutos".

## 3. Compra, frete e garantia

- Frete grátis "na Black":
  - R$ 199 em SP;
  - R$ 249 em RJ, MG, DF e PR;
  - R$ 289 em GO, SC, ES e RS;
  - nos demais estados, o frete e o prazo aparecem no checkout.
  - O mínimo considera o preço depois do desconto dos produtos (dossiê).
- Garantia: 30 dias depois de receber. Pode provar uma unidade e devolver as outras fechadas, sem custo, com reembolso dos produtos devolvidos, inclusive a unidade provada.
- Fora da Black, a loja tem desconto progressivo por quantidade ("15% OFF desbloqueado", com um copo medidor de brinde numa das faixas). Na Black, os 30% substituem o progressivo.
- O checkout é próprio (`seguro.holyfoods.com.br`), e o cupom entra só na tela "Finalizar compra", em "Inserir cupom de desconto".

## 4. Black da Holy

- A faixa do topo diz "BLACK DA HOLY / 30% OFF NO SITE TODO", com um contador de dias, horas e minutos. A data de fim não está no HTML: ler o contador no Chrome no dia.
- FAQ da home: "Os 30% já estão aplicados sobre o preço regular, tanto nos avulsos quanto nos kits. Nesta campanha, esse desconto substitui o progressivo". E "Sem cupom", dito dos 30%.
- O EMCASA (15%) entrou por cima dos 30% em dois testes de 05/11 (dossiê): o do Claude, R$ 69,79 → R$ 59,32, e o do Bruno, R$ 334,60 → R$ 284,41. Os dois pedidos eram de avulsos e packs; kit não foi testado.

## 5. Reclame Aqui (Chrome, 05/11; período de 01/05 a 31/10/2026)

| Indicador | Valor |
|---|---|
| Reputação | Boa (todos os meses de maio a outubro) |
| Nota | 7,5 |
| Reclamações | 251 |
| Respondidas | 100% |
| Resolvidas | 91,1% |
| Voltariam a fazer negócio | 51,9% |
| Avaliadas | 136 |
| Nota média do consumidor | 5,93 |
| Tempo médio de resposta | 1 dia e 15 horas |
| Ranking | 9º em Alimentos Diet e Light |

- Principais problemas (até 3 anos): "Produto não recebido", 29%; "Não categorizado", 8,64%; "Produtos Personalizados", 9,53%.
- A reclamação mais recente (há 1 dia) é de pedido marcado como entregue pela transportadora e não recebido.
- Faltam as abas de 12 meses, 2025 e Geral, e uma leitura das reclamações por tema: a sessão de artigos lê no Chrome.

## 6. Autocompletar do Google (05/11)

- **Marca:** "holyfoods é saudável", "é confiável", "é bom", "vale a pena", "holy foods reclame aqui", "sopa holyfoods reclame aqui", "holyfoods br reclame aqui".
- **Cupom:** "holy foods cupom", "cupom de desconto holyfoods", "cupom primeira compra holyfoods".
- **Produtos (estoque, HF2 a HF7):** "holyfoods 21 dias", "projeto 21 dias", "kit 21 dias", "holyfoods sopa" (low carb, da vovó, detox, masala, dos sonhos), "risoto" (funghi, al mare, queijo, microondas, como fazer), "mac" (queijo, alfredo, bolonha, caipira, calorias), "tabela nutricional", "holyfoods ou mexidona".
- **Black Friday:** "holyfoods black friday" não traz sugestão.

## 7. Alertas

- O site fala em emagrecimento: a linha "Emagrecimento", o "Kit Seca Barriga 30 dias", o "Projeto 21 Dias" com "muitas calorias a menos" e posts sobre Ozempic e GLP-1. Os nossos textos não prometem perda de peso nem efeito de saúde, e não citam medicamento.
- "Detox" é nome de produto; o texto não diz que a sopa elimina toxinas.
- Cupom de primeira compra e de outras criadoras aparecem no autocompletar e não são nossos: não citar.
