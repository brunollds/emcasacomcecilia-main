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

## 8. Complemento: leitura no Chrome em 05/11/2026 (sessão de artigos)

Corrige e completa as seções acima. Onde divergem, vale esta seção (em especial o rendimento do pack de sopa).

### 8.1. Correção: rendimento da sopa
- Sopa AVULSA (Sopa da Vovó, Low Carb, Detox, Canja da Mamãe), R$ 19,90, ou R$ 13,93 na Black: rende 1 litro, ou
  4 porções de 250 g depois do preparo (descrição do produto). A loja mostra R$ 3,48 por porção no Kit Seca Barriga
  (8 sopas, 32 porções).
- PACK de sopa (Pack Sopa da Vovó, Low Carb, Canja da Mamãe), R$ 59,90, ou R$ 41,93: 10 sachês individuais. O card
  da loja diz "Rende 10 porções", R$ 4,19 por porção. O fatos-0511 dizia "1 sachê = 4 porções" para o pack: ERRADO.
- Mac e risoto: uma refeição por embalagem (Mac Queijo rende 380 g; Risoto Funghi, 320 g), com 20 g de proteína.
- O Projeto 21 Dias tem 21 sachês.

### 8.2. Black da Holy: data de fim
- O contador da faixa do topo não tem data configurada: o atributo `data-end-date` está vazio e o contador mostra
  00 dias, 00 horas, 00 minutos. Não existe data de fim publicada. O texto diz "enquanto a campanha estiver no ar",
  sem data.

### 8.3. Kits da Black (seção "Escolha seu kit da Black" da home)
| Kit | O que vem (a loja diz) | De | Por | Por refeição (loja) | "Economize" (loja) |
|---|---|---|---|---|---|
| Descoberta ("para conhecer", 8 refeições) | 2 Mac Queijo, 2 Mac Alfredo, 2 Risoto Funghi, 2 Risoto Al Mare | R$ 159,20 | R$ 111,44 | R$ 13,93 | R$ 47,76 |
| Rotina Resolvida ("nossa sugestão", "mais vendido", 15 refeições) | 4 Mac Queijo, 3 Mac Alfredo, 3 Risoto Funghi, 3 Risoto Al Mare, 2 Risoto de Queijo | R$ 298,50 | R$ 208,95 | R$ 13,93 | R$ 89,55 |
| Despensa Cheia ("para abastecer", 38 refeições) | 1 Pack Canja da Mamãe, 1 Pack Sopa Low Carb, 6 Mac Queijo, 4 Mac Alfredo, 4 Risoto Funghi, 4 Risoto Al Mare | R$ 478,00 | R$ 334,60 | R$ 8,81 | R$ 143,40 |

- Os kits NÃO têm página de produto: o botão "+ Adicionar" da home põe cada item avulso na sacola (o código da
  página lista as variantes e as quantidades). Na tabela, o link de cada kit é o link da parceria (home), não uma
  página de produto.
- O "por refeição" do Despensa Cheia conta cada sachê do pack como uma refeição (2 packs × 10 + 18 = 38).
- O kit é a soma dos avulsos já com os 30%: R$ 111,44 = 8 × R$ 13,93; R$ 208,95 = 15 × R$ 13,93;
  R$ 334,60 = 2 × R$ 41,93 + 18 × R$ 13,93.
- **O teste do Bruno (R$ 334,60 → R$ 284,41, 20 itens: dois packs de sopa e 18 massas e risotos) tem exatamente a
  composição e o preço do Despensa Cheia.** Como o kit entra na sacola como os avulsos, o EMCASA foi testado num
  carrinho igual ao Despensa Cheia. Não dá para dizer que foi testado nos outros dois kits; dá para dizer que o
  kit entra na sacola como produtos avulsos e mandar conferir a linha "Descontos" no checkout.
- FAQ da home: "Os 30% já estão aplicados sobre o preço regular, tanto nos avulsos quanto nos kits. Nesta campanha,
  esse desconto substitui o progressivo." E "É minha primeira compra. Por qual kit eu começo?": a loja indica o
  Descoberta para conhecer os sabores.
- Outros kits no catálogo, também com 30%: Kit Mais Vendidos (8 un.) R$ 111,44, Kit Almoço Proteico (10) R$ 139,30,
  Kit Jantar Premium (9) R$ 125,37, Kit Almoço Completo (12) R$ 167,16, Kit Vegano (10) R$ 125,30, Kit Vegetariano
  (10) R$ 132,30, Projeto 21 Dias R$ 102,90, Projeto 42 Dias R$ 205,80. Super Aveia e feijão esgotados.
- Links de produto (para a 1ª célula das tabelas, com os UTMs da parceria):
  https://www.holyfoods.com.br/products/<handle>?utm_source=afiliados&utm_medium=emcasacomcecilia&utm_campaign=inbazz
  handles: sopa-da-vovo, sopa-low-carb, sopa-detox, canja-da-mamae, pack-sopa-da-vovo, pack-sopa-low-carb,
  pack-canja-da-mamae, risoto-funghi, risoto-al-mare, risoto-de-queijo, novo-mac-queijo, novo-mac-alfredo,
  mac-bolonha, mac-caipira, projeto-21-dias.

### 8.4. Frete (FAQ da home)
"A partir de R$ 199 para SP; R$ 249 para RJ, MG, DF e PR; R$ 289 para GO, SC, ES e RS. Confira a meta da sua região no
carrinho. O prazo de entrega e o frete para os demais estados são consultados no checkout." Faixa da home: "Sua Black
pode chegar com frete grátis".

### 8.5. Política de reembolso (`/policies/refund-policy`, versão 2.1, revisada em 01/10/2026; lida no Chrome)
- **Prazo:** a preparação para postagem leva até 3 dias úteis depois da aprovação do pagamento. O prazo de
  transporte é somado a isso. O custo e o prazo aparecem no checkout, pelo CEP. A entrega é feita por transportadora
  contratada.
- **Endereço:** erro no endereço deve ser avisado logo, pelo e-mail contato@holyfoods.com.br.
- **Recebimento:** conferir embalagem, produtos e quantidades. Se houver avaria, item diferente ou falta, registrar e
  avisar a loja; dá para recusar embalagem claramente violada.
- **Arrependimento:** 7 dias do recebimento (CDC), pelo e-mail com o número do pedido, com devolução sem custo e
  restituição inclusive do frete.
- **Garantia de satisfação:** 30 dias corridos depois de receber; vale mesmo com uma unidade aberta ou consumida, desde
  que as demais estejam fechadas. Sem custo, com reembolso integral dos produtos devolvidos, incluindo a unidade
  experimentada. Pedido pelo e-mail contato@holyfoods.com.br.
- **Reembolso:** pelo meio de pagamento da compra. No Pix, até 7 dias úteis depois de validada a devolução; no cartão,
  pode aparecer em até duas faturas.
- **Troca:** o novo item sai em até 30 dias corridos depois de conferida a devolução.
- **Ajuda:** número do pedido e relato para contato@holyfoods.com.br, com fotos em caso de avaria ou divergência.

### 8.6. Reclame Aqui (`/empresa/holysoup/`, lido no Chrome em 05/11, aba por aba)
| Período | Reputação | Nota | Reclamações | Respondidas | Resolvidas | Voltariam | Avaliadas | Nota do consumidor | Tempo de resposta |
|---|---|---|---|---|---|---|---|---|---|
| 6 meses | Boa | 7,5 | 251 | 100% | 91,1% | 51,9% | 136 | 5,93 | 1 dia e 15 horas |
| 12 meses | Boa | 7,5 | 524 | 100% | 87% | 56,7% | 308 | 5,98 | 2 dias e 17 horas |
| 2025 | Ótima | 8,1 | 292 | 100% | 88,1% | 67,9% | 218 | 7,11 | 1 dia e 9 horas |
| Geral | Boa | 7,9 | 1.007 | 100% | 87,8% | 63,3% | 666 | 6,6 | 2 dias e 5 horas |

- 2025 teve 292 reclamações no ano inteiro; os últimos 6 meses já têm 251. A nota caiu de Ótima (8,1) em 2025 para
  Boa (7,5), e o "voltariam" caiu de 67,9% para 51,9%. Ler os números, sem julgar.
- Títulos das reclamações mais recentes (lista de 05/11, sem nome de consumidor): "Mercadoria faltando"; "Não recebi
  meu pedido que a transportadora marcou como entregue"; "Ainda não recebi o produto"; "Quero cancelar meu pedido e
  ser reembolsado pois não recebi"; "Meu pedido não foi despachado e apagaram minhas mensagens"; "Meu pedido na Holy
  Foods está atrasado e o atendimento é péssimo"; "Demora absurda na entrega"; "Não recebi meu pedido e a empresa não
  me responde". Os temas são entrega (não recebido, atraso, não despachado), mercadoria faltando e cancelamento com
  reembolso. Não citar título por título como se fosse estatística: os percentuais por tema são só os do RA
  ("Produto não recebido", 29%).
