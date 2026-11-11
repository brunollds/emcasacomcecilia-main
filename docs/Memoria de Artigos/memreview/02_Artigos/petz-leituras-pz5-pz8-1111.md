# Leituras: Petz, Cobasi e Petlove para o PZ5 ao PZ8 (11/11/2026)

Registro das leituras de 11/11, durante a Black Friday, que sustentam [[assinatura-petz-ou-cupom]], [[petz-ou-cobasi]],
[[petz-ou-petlove]] e [[petz-entrega-expressa-ou-retirar-na-loja]]. Os fatos gerais da Petz seguem em [[petz-fatos-1111]].
CEP 01310-100, sem login e sem finalizar compra. Petz e Petlove no navegador do app (403 no curl); Cobasi pela API pública
do próprio site. Horários de Brasília. Na revisão de 01/12, refazer as leituras na mesma ordem e comparar com estas.

## 1. Cesta final (PZ6 e PZ7)

Os placares da Petlove abaixo são da leitura bruta. No artigo, depois da revisão externa, a Golden gatos (10,1 kg na Petz, 10 kg na Petlove) e a Whiskas (indisponível na Petlove) saíram da conta: sem clube, a Petz fica abaixo em 5 de 7 itens, a Petlove em 1 e 1 empata; com o preço do Clube, a Petlove fica abaixo em 3 de 5, a Petz em 1 e 1 empata. O placar da Cobasi (5, 3 e 1) não mudou.

### Cesta final (PZ6 e PZ7), 11/11/2026, durante a Black Friday, CEP 01310-100

Leituras: Petz no navegador (JSON-LD da página do produto) entre 17h50 e 18h02; Cobasi pela API do próprio site entre
17h50 e 17h51 (o preço não mudou com o CEP); Petlove no navegador entre 18h05 e 18h15 (o NexGard por HTTP às 17h54).
Horário de Brasília. Fontes nos arquivos petz-leituras.md, concorrentes.md e petlove-navegador.md.

Regra da coluna "Petz com o EMCASA ou a oferta": a sacola fica com o desconto maior em cada item (testado no PZ1 e na
sacola B de hoje: o cupom não entra no item em oferta). Sem oferta: preço da página − 10%. Com oferta maior que 10%:
preço da oferta.

| # | Produto (mesma marca, linha e peso) | Petz, página | Petz com o EMCASA ou a oferta | Cobasi, página | Petlove, página | Petlove com Clube Petlove |
|---|---|---|---|---|---|---|
| 1 | Ração Golden Fórmula Cães Adultos Frango e Arroz 15 kg | R$ 179,99 | R$ 161,99 (EMCASA) | R$ 179,99 | R$ 179,90 | R$ 152,92 |
| 2 | Ração Premier Fórmula Cães Adultos Raças Médias Frango 15 kg | R$ 259,99 | R$ 233,99 (EMCASA) | R$ 259,99 | R$ 259,90 | R$ 220,92 |
| 3 | Ração Royal Canin Medium Adult 12 kg | oferta R$ 251,19 (de R$ 313,99) | R$ 251,19 (oferta) | R$ 238,90 (de R$ 313,99) | R$ 313,91 | R$ 251,19 |
| 4 | Ração Golden Gatos Adultos Castrados Frango 10,1 kg (na Petlove, "10 kg") | R$ 179,99 | R$ 161,99 (EMCASA) | R$ 179,99 | R$ 179,90 | R$ 152,92 |
| 5 | Ração Whiskas Gatos Adultos Castrados Carne 10,1 kg (nas duas, "Leve 10,1 kg e Pague 9 kg") | R$ 178,99 | R$ 161,09 (EMCASA) | R$ 178,99 | indisponível no CEP | — |
| 6 | Areia Pipicat Classic 4 kg | oferta R$ 14,99 (de R$ 19,99) | R$ 14,99 (oferta) | R$ 14,99 (de R$ 19,99) | R$ 21,99 | R$ 18,70 |
| 7 | Bravecto 500 mg, cães de 10 a 20 kg, 1 comprimido | oferta R$ 168,59 (de R$ 280,99) | R$ 168,59 (oferta) | R$ 168,50 (de R$ 280,99) | R$ 182,33 (de R$ 280,50) | R$ 154,28 |
| 8 | Simparic Trio 24 mg, cães de 10,1 a 20 kg, 1 comprimido | oferta R$ 104,29 (de R$ 148,99) | R$ 104,29 (oferta) | R$ 96,50 (de R$ 148,99) | R$ 104,01 | não lido |
| 9 | NexGard 68 mg, cães de 10,1 a 25 kg, 1 tablete | oferta R$ 86,44 (de R$ 132,99) | R$ 86,44 (oferta) | R$ 87,50 (de R$ 134,99) | R$ 86,44 (de R$ 132,99) | não lido |

Contagem Petz (com o EMCASA ou a oferta) × Cobasi (página): Petz mais barata em 1, 2, 4, 5 e 9 (5 itens); Cobasi mais
barata em 3, 7 (R$ 0,09) e 8 (3 itens); empate em 6.
Rações sem oferta (1, 2, 4, 5): a diferença é o EMCASA (10%), porque as duas cobram o mesmo preço de página.

Contagem Petz × Petlove sem clube: Petz mais barata em 1, 2, 3, 4, 6 e 7 (6); Petlove em 8 (R$ 0,28); empate em 9;
item 5 indisponível na Petlove.
Com o Clube Petlove (pago): Petlove mais barata em 1, 2, 4 e 7; empate em 3; Petz mais barata em 6; 8 e 9 sem preço de
clube lido.
Clube Petlove: o JSON-LD da página de produto informa "Taxa mensal de R$ 9,99" no plano anual (12 meses) e "Taxa mensal
de R$ 17,99" no mensal; a página do clube não mostra o valor no HTML. Conta de "quando se paga": no item 1, a diferença
entre R$ 161,99 (Petz com EMCASA) e R$ 152,92 (Petlove com clube) é R$ 9,07, menos que uma mensalidade do plano anual.

Itens que saíram da cesta: Pedigree (tamanho/oferta "Leve 15 kg Pague 13,5 kg" sem par certo na Petz), Royal Canin
Sterilised adulto (sem par na Petz), Premier gatos castrados (linhas diferentes nas lojas), Simparic 40 mg (sem preço
na Petz), Viva Verde (linhas diferentes).

Frete (CEP 01310-100):
- Petz: frete grátis da entrega padrão acima de R$ 199 no Sul e no Sudeste (política); na sacola B (acima de R$ 199) a
  Padrão saiu grátis, com taxa de serviço de R$ 5,90; Expressa R$ 7,90 "em até 4 horas"; Retire grátis, 5% acima de
  R$ 199, sem taxa de serviço.
- Cobasi: Sul, Sudeste e Centro-Oeste acima de R$ 149 (política), mas a Econômica em SP e RJ só acima de R$ 199; a
  simulação com uma Golden 15 kg (R$ 179,99) deu Econômica R$ 11,90, Cobasi Já R$ 9,90 e retirada grátis em 45 min.
- Petlove: frete grátis sem mínimo ou a partir de R$ 99 só para membro do Clube (página do clube); fora do clube, a
  política não traz o valor mínimo.

## 2. Petz: assinatura, sacolas, entregas e cesta

### Petz, leituras de 11/11/2026 (noite), navegador do app, sem login

## Assinatura Petz (petz.com.br/institucional/assinatura-petz), lida às 17h55
- "10% de desconto em qualquer produto do site e em todas as compras geradas pelas assinaturas e até em pedidos avulsos"; "em todas as suas compras avulsas feitas no site ou no App". A página NÃO fala em loja física.
- Assina "na tela de fechamento da compra", com a opção de repetir o pedido.
- Sem taxa, carência ou multa de cancelamento.
- "não é possível aplicar outros cupons nas compras com opção de assinatura". Combos não entram.
- Avulsas: desconto vale para "todos os pedidos de clientes que tenham uma assinatura ativa"; cancelada, perde.
- Pagamento: "a única forma de pagamento disponível é cartão de crédito". Cartão recusado após tentativas cancela a assinatura.
- Frete grátis da assinatura (texto da página): S, SE e CO acima de R$ 199; N e NE acima de R$ 299; medicamentos acima de R$ 199 em todo o Brasil. (A política de frete diz CO acima de R$ 299: divergência conhecida, ver petz-fatos-1111 seção 4.)
- Preço: o vigente no site na geração do pedido, "sempre com 10% de desconto".
- Validação de R$ 5 no cartão, cancelada em segundos.
- Pausar, trocar itens, mudar data/frequência/endereço e cancelar em Minha Conta > Minhas Assinaturas (ou no app).
- "A Petz se reserva no direito de alterar a política de assinaturas sem prévio aviso."

## Sacola sem login, CEP 01310-100 (Av. Paulista), 11/11 entre 17h50 e 18h (horário de Brasília, relógio do navegador)
Banner do topo da sacola: "Assine e ganhe 10% OFF agora e em todas as compras no app, site e lojas físicas." (a página da assinatura fala só em site e app: divergência; o texto não promete loja física, ou cita a sacola como fonte e a divergência)

Formas de entrega mostradas para o CEP (as mesmas nas duas sacolas): Padrão "Até amanhã"; Expressa "Em até 4 horas" R$ 10,27; Agendada "Receba quando desejar" R$ 10,27; Retire na Loja "Em algumas lojas a partir de 45 min", "Maior economia", loja Petz Alameda Santos (Alameda Santos, 637), "Aguarde o e-mail de liberação para ir até a loja". => não há "2 horas": título do PZ8 sem "2 horas".

### Sacola A: 1 × Ração Golden Fórmula Cães Adultos Frango e Arroz 15 kg (R$ 179,99, sem oferta)
- Com o EMCASA (compra única): "10% OFF", R$ 161,99; Total de descontos − R$ 18,00; total R$ 161,99; 2x de R$ 81,00 sem juros.
- Padrão R$ 5,90 ("Até amanhã"); Expressa R$ 10,27; Agendada R$ 10,27; Retire "Grátis" (sem os 5%, porque a sacola fica abaixo de R$ 199).
- "Faltam R$ 37,01 para frete grátis": 199 − 161,99 = 37,01 → o mínimo do frete grátis conta depois do desconto.
- "Assinar produto" ligado (sem login): frequências 30, 45, 60, 90 dias ou Personalizar. Com o EMCASA ainda no campo (com o ✓), o desconto continua − R$ 18,00, e o detalhe mostra "Assinatura Petz − R$ 18,00". O selo do item vira o ícone de assinatura "10% OFF". => com a assinatura ligada, o cupom não soma e não muda nada; o desconto passa a ser o da assinatura.

### Sacola B: Golden Fórmula Adultos 15 kg (R$ 179,99) + Ração Whiskas Gatos Castrados Carne 2,7 kg (R$ 49,99, sem oferta) + Areia Pipicat Classic 4 kg (oferta "25% OFF": de R$ 19,99 por R$ 14,99; preço "para assinantes" também R$ 14,99)
Valor dos produtos R$ 249,97 (com o Pipicat pelo preço "de"). Opções acima de R$ 199: Padrão "Até amanhã" Grátis; Expressa "Em até 4 horas" R$ 7,90; Agendada R$ 7,90; Retire Grátis +5% OFF.
- B1, compra única com o EMCASA, entrega Padrão: Cupom EMCASA − R$ 23,00 (18,00 da Golden + 5,00 da Whiskas); "Produtos promocionais" − R$ 5,00 (o Pipicat fica no preço da oferta; o cupom não entra nele). Taxa de serviço R$ 5,90; frete Grátis. Total R$ 227,87.
- B1 sem a taxa (a primeira leitura, antes de escolher a entrega): total dos produtos R$ 221,97.
- B1 com Expressa: Taxa de serviço R$ 5,90 + frete R$ 7,90; Cupom EMCASA − R$ 23,00 (o cupom vale na Expressa: TESTADO); "Em até 4 horas"; total R$ 235,77.
- B2, "Assinar produto" ligado na Golden (30 dias), EMCASA ainda no campo: aviso muda para "Você ganhou 10% OFF neste pedido e em todas as compras no app, site e lojas físicas."; o 10% da assinatura vale nos três itens (a Whiskas, sem assinatura, também). Detalhe: Assinatura Petz − R$ 25,00; Adicionais − R$ 3,00 (o resto da oferta do Pipicat). Total dos produtos R$ 221,97, igual ao B1. O cupom não aparece no detalhe.
- B3, EMCASA + Retire na Loja: as lojas mais próximas (Alameda Santos, Augusta) mostravam "A partir de 24/11/2026" para esta sacola; a aba "Lojas + rápidas" mostrou Vila Mariana, Aclimação etc. "A partir de 45 minutos". Com a Petz Vila Mariana: Cupom EMCASA − R$ 23,00; Retirada em loja − R$ 11,10; Produtos promocionais − R$ 5,00; total R$ 210,87 (= 221,97 × 0,95). Sem taxa de serviço no resumo da retirada. "Aguarde o e-mail de liberação para ir até a loja." Nota do modal: "Prazo para retirada a partir da confirmação de pagamento."
- B4, assinatura + Retire (Vila Mariana): Assinatura Petz − R$ 25,00; Retirada em loja − R$ 11,10; Adicionais − R$ 3,00; total R$ 210,87, igual ao B3. => a assinatura também soma com os 5% da retirada (TESTADO, sem login).
=> CONCLUSÃO PZ5: nas quatro combinações, assinatura e EMCASA dão o mesmo total; item em oferta fica no preço da oferta nas duas; os dois somam com a retirada. A diferença fica fora do preço (pagamento só cartão, frequência, 10% nas avulsas enquanto ativa).
=> PZ8: a retirada também tira a taxa de serviço de R$ 5,90 que aparece na Padrão e na Expressa; o prazo da retirada depende do estoque da loja (a mais perto pode dar dias).
- Entrega Agendada (CEP 01310-100, 11/11 ~18h): o modal "Agende o dia e horário da sua entrega" oferece de amanhã (qui 12) em diante, com sexta, sábado e DOMINGO (15), segunda a quarta e "Mais opções"; faixas 09:00–12:00 ("Mais rápido"), 12:00–15:00, 15:00–18:00 e 18:00–21:00. R$ 7,90 na sacola acima de R$ 199 (R$ 10,27 na sacola A). Não agendado.
- Taxa de serviço: R$ 5,90 no resumo com Padrão e com Expressa (sacola B); explicação do "?" da sacola: "A taxa de serviço cobre algumas despesas operacionais e de sistema. Isso nos ajuda a manter a qualidade e a rapidez para que você tenha a melhor experiência de compra." Com Retire na Loja, o resumo não mostrou a taxa.
- Sacola Golden 15 kg + Pipicat 4 kg (valor dos produtos R$ 199,98; R$ 176,98 depois do cupom e da oferta): a lista de entrega mostra Padrão "Grátis", mas o resumo diz "Faltam R$ 22,02 para frete grátis" (199 − 176,98). Sinais misturados: NÃO afirmar como a sacola calcula o mínimo; usar só a regra do regulamento ("Caso a aplicação de cupom ... reduza o valor do pedido abaixo do mínimo ..., o frete grátis não será aplicado").
- Na sacola A (só a Golden, R$ 179,99 de lista), a Padrão aparecia R$ 5,90 na lista; não ficou claro se era frete ou taxa: não citar o valor.

## Preços da cesta na Petz (JSON-LD da página do produto, lido pelo navegador do app, 17h51–18h02, sem login)
Formato: variante | por (preço da página) | de (riscado, quando há) | preço "para assinantes".
- Ração Golden Fórmula Cães Adultos Frango e Arroz - 15 Kilos | 179.99 | - | 161.99 (71440)
- Ração Premier Fórmula Cães Adultos Raças Médias Frango e Mandioca (15 kg, página) | 259.99 | - | 233.99 (71365)
- Ração Seca Royal Canin Medium Adult Porte Médio - 12 Kilos | 251.19 | 313.99 | 251.19 (99329)
- Ração Golden Gatos Adultos Castrados Frango (10,1 kg) | 179.99 | - | 161.99 (71385)
- Ração Whiskas Gatos Adultos Castrados Carne - Leve 10,1 kg e Pague 9 kg | 178.99 | - | 161.09 (72762)
- Areia Higiênica Pipicat Classic - 4 Kilos | 14.99 | 19.99 | 14.99 (79747)
- Bravecto 500 mg Cães de 10 a 20 kg (1 comprimido) | 168.59 | 280.99 | 168.59 (88119)
- Simparic Trio 24 mg (10,1 a 20 kg, 1 comprimido) | 104.29 | 148.99 | 104.29 (209923)
- NexGard Cães de 10,1 a 25 kg - 1 Unidade | 86.44 | 132.99 | 86.44
Simparic 40 mg (100180): página sem preço no JSON-LD. Royal Canin Sterilised adulto: sem par na busca da Petz.

## 3. Petlove no navegador

### Petlove e Reclame Aqui, navegador do app, 11/11/2026 (entre 18h05 e 18h20, horário de Brasília), sem login

Home da Petlove em 11/11: faixa "11.11 Seleção com até 90% OFF" e "ou 30% OFF em todo o site ... Só hoje!" (campanha do dia, "na 1ª compra como membro clube petlove" para os 90%). Não citar como regra; os preços abaixo são os da página na leitura.

CEP 01310-100 informado no modal "Informe sua localização" (a Golden 15 kg ficou no mesmo preço antes e depois do CEP).

## Preços na busca da Petlove (preço da página | "com Clube Petlove")
| Item | Página | Com Clube Petlove |
|---|---|---|
| Ração Seca PremieR Pet Golden Formula Cães Adultos Frango e Arroz - 15Kg | R$ 179,90 | R$ 152,92 (-15%) |
| Ração Premier Pet Formula Frango Cães Adultos Raças Médias - 15Kg | R$ 259,90 | R$ 220,92 (-15%) |
| Ração Seca Royal Canin Medium Adult para Cães Adultos de Porte Médio - 12 KG | R$ 313,91 | R$ 251,19 (-20%) |
| Ração Seca PremieR Pet Golden Gatos Adultos Castrados Frango - 10Kg (a Petlove escreve 10 kg; Petz e Cobasi, 10,1 kg) | R$ 179,90 | R$ 152,92 (-15%) |
| Ração Whiskas Carne para Gatos Adultos Castrados - 10,1Kg | "Produto indisponível" com o CEP | — |
| Areia Sanitária Classic Pipicat - 4Kg | R$ 21,99 | R$ 18,70 (-15%) |
| Antipulgas e Carrapatos Bravecto 500 mg para Cães de 10 a 20Kg - 1 Comprimido | de R$ 280,50, por R$ 182,33 | R$ 154,28 |
| Antipulgas Simparic Trio 24 mg para Cães de 10,1 a 20 Kg, 1 Comprimido (JSON-LD da página, sku 31027559023) | R$ 104,01 (priceValidUntil 12/11 06h) | — (não lido) |
| NexGard 68 mg 10,1 a 25 kg, 1 tablete (leitura do agente por HTTP, 17:54) | de R$ 132,99, por R$ 86,44 | — |

## Reclame Aqui, perfil "Petlove - Petsupermarket" (reclameaqui.com.br/empresa/petlove-petsupermarket/)
- Pela API de busca do próprio site: CNPJ 10.864.846/0001-23, site cadastrado https://www.petlove.com.br/, categoria Pet E-commerce, "Verificada". Outros perfis: "Plano de Saúde Petlove" (8,6, outro CNPJ, saude.petlove.com.br) e "Petlove - Lojas Físicas" (8,3, mesmo CNPJ). O de plano fica fora (serviço).
- 6 meses (01/05/2026 a 31/10/2026): RA1000, nota 8,4; recebidas 8.205; respondidas 99,7%; aguardando 25; resolvidas 91,2%; voltariam 76%; avaliadas 4.707; nota do consumidor 7,18; tempo médio de resposta 3 dias e 17 horas.
- Histórico: maio e junho Ótima; julho a outubro RA1000.

## 4. Cobasi e Petlove pelas páginas oficiais

### Concorrentes: Cobasi e Petlove (coleta de 11/11/2026)

Horários em BRT (relógio da máquina). CEP alvo: 01310-100. Só HTTP (curl e, na Cobasi, leitura da mesma API por Python). Nenhum link de afiliado foi acessado. Nenhum navegador foi usado.

## Bloqueios e limites

- **Petlove: bloqueada.** Às 17:54:25 a página do NexGard respondeu 200 (curl). Depois, um cliente Python recebeu 403 em uma página de produto (cerca de 17:55). Às 17:55:02 a busca "premier formula cães adultos raças médias frango 15kg" voltou 403 com o desafio do Cloudflare ("Just a moment..."). Parei de consultar a Petlove nesse ponto e não tentei contorná-la. Não há mais preços da Petlove além do NexGard.
- **Cobasi: sem bloqueio.** Todas as chamadas responderam 200 ou 206 (206 é o normal da API de busca da VTEX).
- **Reclame Aqui da Petlove: não encontrada.** Tentei os slugs `/empresa/petlove/`, `/empresa/petlove-loja-online/` e `/empresa/petlove-2/` (todos 404). A busca `/busca/?q=petlove` respondeu 200 com "Internal server error". Não está bloqueada, mas não consegui achar o perfil. Precisa ser lida no navegador.
- Sobre a regionalização da Petlove: não testei se o preço muda com o CEP, porque a página pede CEP e as requisições foram interrompidas.

## Parte 1: preços

### Cobasi: regionalização por CEP

- `GET https://www.cobasi.com.br/api/checkout/pub/regions?country=BRA&postalCode=01310100` (17:50:08, 200): regionId `v2.3326B7813804BCE0115E0725CEA6366A`, com 256 vendedores/lojas.
- Busca com e sem `&regionId=` (16 termos, 17:50:45 a 17:51:17): **resultado idêntico em todos os 16 termos** (nomes, SKUs, preços e disponibilidade). A regionalização não mudou nada que eu consegui medir.
- Simulação de frete para o CEP 01310100 (`POST https://www.cobasi.com.br/api/checkout/pub/orderForms/simulation`, só simulação, nada comprado):
  - Golden Formula 15 kg, 1 unidade, 17:52:57: preço R$ 179,99. Econômica R$ 11,90 (1 dia útil), Cobasi Já R$ 9,90 (19h), Retirar R$ 0 (45 min).
  - Golden Formula 15 kg, 2 unidades (R$ 359,98), 17:53:07: Econômica R$ 0 (frete grátis), Cobasi Já R$ 9,90, Retirar R$ 0.
  - Leitura: o preço não mudou. O frete grátis na Econômica entrou acima de R$ 199, o que bate com a regra de SP/RJ da página de entrega (ver Parte 2).
- Campo "de/por" da API: `ListPrice` (de) e `Price` (por). Em vários itens são iguais (sem desconto aparente).
- A API mostra estoque como `AvailableQuantity`. O valor 100 aparece muito, e 99999 também; pode ser teto de exibição, não estoque real.

### Cobasi: cesta (leitura entre 17:50 e 17:52, sem CEP e com regionId, iguais)

| Item (cesta) | Nome exato no site | Peso | SKU | De | Por | Estoque (API) | URL | Hora |
|---|---|---|---|---|---|---|---|---|
| Cão adulto seco, Golden | Ração Golden Formula Cães Adultos Frango, Arroz e Vegetais | 15 kg | 794252 | 179,99 | 179,99 | 100 | https://www.cobasi.com.br/racao-golden-formula-para-caes-adultos-frango-e-arroz-3608262/p | 17:50:24 |
| Cão adulto seco, Premier | Ração Premier Formula Cães Adultos Raças Médias Frango e Mandioca | 15 kg | 794589 | 259,99 | 259,99 | 100 | https://www.cobasi.com.br/racao-premier-formula-caes-adultos-racas-medias-sabor-frango-3794589/p | 17:50:45 |
| Cão adulto seco, Royal Canin | Ração Royal Canin Medium Adult para Cães Adultos Porte Médio | 12 kg (15 kg não encontrado) | 1163833 | 313,99 | 238,90 | 100 | https://www.cobasi.com.br/racao-royal-canin-medium-adult-3793655/p | 17:50:47 |
| Cão adulto seco, Pedigree | Ração Pedigree Cães Adultos Raças Médias e Grandes Carne e Vegetais (SKU com nome "Leve 15 kg Pague 13,5 kg") | 15 kg | 1000144 | 179,99 | 179,99 | 10 | https://www.cobasi.com.br/racao-pedigree-carne-e-vegetais-3798037/p | 17:50:49 |
| Gato castrado seco, Golden | Ração Golden Gatos Adultos Castrados Frango | 10,1 kg | 621935 | 179,99 | 179,99 | 100 | https://www.cobasi.com.br/racao-golden-gatos-castrados-frango-3580635/p | 17:50:54 |
| Gato castrado seco, Premier | Ração Premier Formula Gatos Castrados Frango | 7,5 kg (10,1 kg não encontrado) | (página 3155555) | 209,99 | 209,99 | 10 | https://www.cobasi.com.br/racao-premier-formula-gatos-castrados-frango-31155555/p | 17:50:56 |
| Gato castrado seco, Royal Canin | Ração Royal Canin Gatos Adultos Castrados (Sterilised) | 10,1 kg | 959081 | 492,99 | 398,90 | 10 | https://www.cobasi.com.br/racao-royal-canin-gatos-castrados-sterilised-3647942/p | 17:50:59 |
| Gato castrado seco, Whiskas | Ração Whiskas Gatos Adultos Castrados Carne (SKU com nome "Leve 10,1 kg Pague 9 kg") | 10,1 kg | 1000241 | 178,99 | 178,99 | 10 | https://www.cobasi.com.br/racao-whiskas-gatos-castrados-carne-3727547/p | 17:51:01 |
| Areia, Pipicat | Areia Pipicat Classic para Gatos | 4 kg | 203580 | 19,99 | 14,99 | 99999 | https://www.cobasi.com.br/areia-para-gato-pipicat-classic-kelco-3203580/p | 17:51:03 |
| Areia, outra marca | Areia Higiênica Biodegradável Milho e Mandioca Grãos Finos Viva Verde (Chalesco não apareceu na busca) | 4 kg | 915777 | 69,99 | 59,49 | 99999 | https://www.cobasi.com.br/areia-higienica-biodegradavel-limpeza-plena-viva-verde-3915777/p | 17:51:05 |
| Antipulgas, NexGard | NexGard Antipulgas e Carrapatos para Cães de 10,1 a 25kg (1 tablete) | 10,1 a 25 kg | 772321 | 134,99 | 87,50 | 100 | https://www.cobasi.com.br/antipulgas-e-carrapatos-nexgard-para-caes-de-10-1-a-25-kg-3772321/p | 17:51:09 |
| Antipulgas, Bravecto | Antipulgas e Carrapatos Bravecto 10 kg a 20 kg Cães 500mg (1 comprimido) | 10 a 20 kg | 765880 | 280,99 | 168,50 | 99999 | https://www.cobasi.com.br/bravecto-10-a-20--kg-antipulgas-oral-caes-comprimido-mastigavel-500mg-3765880/p | 17:51:11 |
| Antipulgas, Simparic | Antipulgas Simparic 40mg para Cães 10 a 20kg (1 comprimido) | 10 a 20 kg | 823562 | 134,99 | 80,90 | 100 | https://www.cobasi.com.br/antipulgas-simparic-10-1-a-20--kg-zoetis-3823562/p | 17:51:13 |
| Antipulgas, Simparic Trio | Antipulgas Simparic Trio 24mg para Cães 10,1 a 20kg (1 comprimido) | 10,1 a 20 kg | 1186647 | 148,99 | 96,50 | 10 | https://www.cobasi.com.br/antipulgas-simparic-trio-24mg-para-caes-10-1-a-20kg-31186647/p | 17:51:17 |

Observações da cesta:
- Os pesos não batem em todas as linhas (Royal Canin 12 kg, Premier gatos 7,5 kg). Não há total de cesta comparável ainda.
- Nos antipulgas, os preços "por" já estão bem abaixo do "de" (Simparic 40 mg: de 134,99 por 80,90). A página de produto do NexGard mostra "Preço por Tablete R$ 87,50" e "R$ 134,99" riscado. Não sei se esses descontos são só da Black Friday.
- A página do NexGard (https://www.cobasi.com.br/antipulgas-e-carrapatos-nexgard-para-caes-de-10-1-a-25-kg-3772321/p, 17:52:05) mostra o selo "10% OFF em todas as compras" da Compra Programada e o botão "Adicionar e programar* Apenas nos pedidos da Compra Programada". O valor do programado não aparece na HTML estática.
- Premier Raças Grandes e Gigantes Frango e Mandioca 15 kg (https://www.cobasi.com.br/racao-premier-formula-caes-adultos-racas-grandes-sabor-frango-3299537/p) também está a R$ 259,99 (17:50:45).

### Petlove: o que foi lido

- **NexGard 10,1 a 25 kg, 1 tablete (único item lido)**
  - Nome: "Antipulgas e Carrapatos NexGard 68 mg para Cães de 10,1 a 25 Kg" (SKU 3105747).
  - URL: https://www.petlove.com.br/anti-pulgas-e-carrapatos-merial-nexgard-68-mg---caes-de-101-a-25-kg-3105747/p?sku=3105747
  - Leitura: 17:54:25 (curl, 200).
  - Na página: "R$ 132,99", "-35%", "R$ 86,44", "Adicionar ao carrinho por R$ 86,44", "Comprar com recorrência por R$ 86,44", e a frase "Ganhe 10%OFF em todos produtos vendidos pela Petlove".
  - JSON-LD (ProductGroup, mesma leitura): 1 comprimido = 86,44; priceValidUntil 2026-11-12T09:00:00Z (06h BRT de 12/11); InStock. Outras apresentações: 3 tabletes = 342,00; 2 caixas (6 comprimidos) = 615,59.
  - Leitura: a compra recorrente aparece pelo mesmo preço da compra avulsa (R$ 86,44). Os 10% da recorrência não aparecem no preço exibido; podem entrar só no carrinho, o que não verifiquei.
- Os outros itens da cesta, na Petlove, não foram lidos. As buscas (curl, 17:54:59 a 17:55:34) trouxeram resultados sem preço no HTML: os preços são carregados por JavaScript. Os links de produto foram achados em algumas buscas (por exemplo, Pedigree Adulto Carne e Vegetais, sku 2513332; Pipicat Classic, sku 3107702; Simparic Trio 24 mg, sku 31027561512; Bravecto 10 a 20 kg 500 mg, sku 3104948; Royal Canin Sterilised 10,1 kg kit, sku 31027560664; Royal Canin Sterilised, sku 2548708), mas não consegui ler a página de produto nem o peso de cada um. A busca de Royal Canin Medium Adult 15 kg só trouxe kits com 12 kg.
- Na busca de Golden 15 kg a página voltou sem nenhum link de produto no HTML. Não tenho como afirmar se o produto existe.

## Parte 2: regras (só páginas oficiais)

### Cobasi

Frete (https://www.cobasi.com.br/institucional/politica-de-entrega, lido 17:52:13):
- "Regiões Sul e Sudeste e Centro-Oeste têm frete grátis nas compras acima de R$149."
- "Regiões Norte e Nordeste têm frete grátis nas compras acima de R$299."
- "Medicamentos têm frete grátis nas compras acima de R$99."
- "Para as categorias de caixas de transporte, areia, sílica e granulados higiênicos, o frete é grátis somente para a Região Sudeste, nas compras acima de R$149."
- "A condição de frete grátis é válida somente para produtos vendidos e entregues pela Cobasi."
- Econômica em SP e RJ: "Frete Grátis Econômica* ... acima de R$ 199 valido para o Rio de Janeiro e São Paulo." (mesma página). A simulação de 17:52–17:53 confirma: R$ 179,99 paga R$ 11,90; R$ 359,98 sai grátis.
- Cobasi Já: "Entrega Cobasi Já: SP de R$ 13,90 para R$ 9,90". Pedidos "aprovados das 9h às 20h", "podem ser concluídas até as 22h" (mesma página). A simulação mostrou R$ 9,90 (19h) no CEP 01310100.

Retirada na loja (https://www.cobasi.com.br/modalidade-de-entrega/retirar-na-loja, lido 17:52:15; e a mesma política de entrega):
- Tempo: "Retire seu pedido em até 45 minutos, após a confirmação do pagamento." Válido para pedido "no cartão de crédito com a aprovação de pagamento ou pix entre às 9h30 e 20h30min".
- Custo: "Não existe taxa de cobrança" (página de retirada). Política de entrega: "sem taxa de serviço".
- Desconto de retirada: **há três versões que não batem**. Anoto as três:
  1. Regulamento da Black Friday 2026 (https://www.cobasi.com.br/regulamentos, lido 17:52:18), item 4.2.2.5: "De 30/10/2026 a 30/11/2026, o consumidor que escolher a opção 'Retire na loja' no carrinho receberá 5% (cinco por cento) de desconto em pedidos com valor de produtos superior a R$ 199,00 ..., apurado após a aplicação de outros descontos e sem o frete. ... O benefício vale também para pedidos da 'Compra Programada' e é válido apenas para as regiões Sul, Sudeste e Centro-Oeste."
  2. Página de retirada (mesma URL acima): "você ganha 5% off nas compras acima de R$249 Para as regiões Sul e Centro-Oeste. Para a região Sudeste, o desconto é válido para compras acima de R$199."
  3. Política de entrega, caixa "Assinatura Cobasi": "Retire na loja e ganhe mais 5% OFF (válido em pedidos acima de R$149)". E, na mesma página, "Retire na loja e ganhe 5% OFF ... Para a região Sul, Sudeste e Centro-Oeste, o desconto é válido para compras acima de R$199."
- Horário de retirada, outra divergência: regulamento 4.2.2.4 diz "As retiradas ficam disponíveis das 9h às 22h, conforme horário de funcionamento da loja", e a página de retirada diz "entre às 9h30 e 20h30min".

Compra Programada (https://www.cobasi.com.br/compra-programada, lido 17:52:11):
- Preço: "Ganhe 10% OFF em todas as compras feitas no site, APP e lojas físicas." Nas lojas físicas: "basta apresentar ao atendente do caixa a tela de Compra Programada ativa no APP Cobasi" (termos, mesma página).
- Mensalidade e taxas: "Não é necessário pagar nenhum valor para ter a Compra Programada. Você não precisa pagar taxa de adesão, mensalidade ou cancelamento."
- Pagamento: "Pix, Nupay ou cartão de crédito". Pix e Nupay: link pelo WhatsApp a cada pedido. Cartão: cadastrado e cobrado nos pedidos seguintes. Se o pagamento não concluir por dois ciclos seguidos, a Compra Programada é cancelada.
- Frete: "As regras de cobrança de frete para pedidos da Compra Programada são as mesmas aplicadas aos demais pedidos realizados no site ou APP." Retirada: "não têm custo de frete e o pedido fica pronto em até 45 minutos".
- Acúmulo, termos da mesma página, item 5: "O desconto de 10% não é acumulativo com outras promoções, cupons, nem com ofertas ativadas na aba 'Descontos', no APP. O desconto concedido sempre será o de maior valor."
- Regulamento 8.3: "O desconto da 'Compra Programada' não é cumulativo com os descontos da Black Friday nem com outras promoções. O sistema aplicará automaticamente apenas o desconto de maior valor."
- Regulamento 8.7: quem tem CP e escolhe retirar na loja tem os 5% do item 4.2.2.5, "nas mesmas condições".

Cupom e Black Friday:
- Regulamento 5.2.2: "Os descontos oferecidos durante a campanha de Black Friday não são cumulativos com quaisquer outras promoções, ofertas ou benefícios vigentes, ressalvadas as hipóteses expressamente previstas neste Regulamento. Caso mais de um desconto seja aplicável ao mesmo produto ou pedido, prevalecerá automaticamente o de maior valor para o consumidor."
- Regulamento 5.2.1: "os cupons de desconto não são acumuláveis com as promoções vigentes" (exceto o que o regulamento prevê).
- Página de cupom (https://www.cobasi.com.br/institucional/cupom-de-desconto, lido 17:52:22): "É possível aplicar apenas um cupom por pedido e não acumula com o desconto de Cliente Compra Programada."
- Amigo Cobasi Plus (assinatura, regulamento 6.1): "serviço de assinatura que oferece benefícios exclusivos, como crédito mensal de pontos ..., desconto em Banho & Tosa, frete reduzido no site da Cobasi e pontos em dobro". Preço não encontrado.

### Petlove

Repet / compra recorrente (https://www.petlove.com.br/compra-recorrente, lido 17:53:24):
- "A compra recorrente Petlove é um serviço de entrega programada totalmente gratuito em que você ganha 10% de desconto, não acumulável com outras promoções."
- "Não. A compra recorrente é um serviço sem taxa alguma: não existe taxa de adesão, mensalidade ou taxa de cancelamento."
- Pagamento: "Atualmente, a única forma de pagamento disponível para a compra recorrente é o cartão de crédito." Chamada "Pague com cartão de crédito em até 3 vezes". Em erro de cartão, a Petlove pode aceitar boleto ou Pix pelo suporte.
- Quantidade: "Atualmente, você pode ter apenas uma compra recorrente, porém ... uma compra recorrente de quantos produtos desejar".
- Desconto, **três textos diferentes na mesma página e na home**:
  - "Descontos: 20% na primeira compra recorrente e 10% nas próximas compras" (bloco "Programar um Repet").
  - "Com o Repet você ganha 15% OFF no primeiro pedido usando o cupom GANHE15 e 10% de desconto nas próximas compras" (bloco do topo da landing).
  - Home (https://www.petlove.com.br/, lido ~17:50): "Comodidade e 10% OFF nos produtos*Quero Repet" e, em outro bloco, "Assine e tenha até 20% OFF sempre" (não consegui confirmar a qual programa esse 20% se refere).
- Frete do Repet: a página não traz regra de frete.

Clube Petlove, clube de descontos (https://www.petlove.com.br/clube-de-descontos, lido 17:53:28):
- "Descontos de até 25% em compras online (no site e aplicativo)"; "Descontos de 15% em produtos, banho e tosa nas lojas físicas".
- Frete: "Frete grátis em entregas padrão, conforme área de entrega;" e "Frete grátis para suas compras com entrega padrão para a área selecionada, podendo ser sem valor mínimo ou a partir de R$ 99."
- Limite: "Economize até R$ 300 por mês em produtos e frete, pelo site e app com o Clube Petlove."
- Cashback: "Cashback de 2% em cada compra na renovação da sua assinatura" (cashback válido por 60 dias).
- Preço (JSON-LD `MemberProgram` na página do NexGard, https://www.petlove.com.br/anti-pulgas-e-carrapatos-merial-nexgard-68-mg---caes-de-101-a-25-kg-3105747/p?sku=3105747, lido 17:54:25): tier "Anual": "Taxa mensal de R$ 9,99 para se qualificar" (12 meses); tier "Mensal": "Taxa mensal de R$ 17,99 para se qualificar" (1 mês); "A partir de 15% OFF em todas as compras".
- A página do clube mostra "12x de R$ XX,XX por ano • Total: R$ XXX,XX": o preço real não está na HTML.
- Cancelamento: "O cancelamento com reembolso total é permitido dentro do período de 7 dias após a data da compra, não havendo utilização dos benefícios." Renovação automática: "acontecerá automaticamente 1 dia após a data final do pacote". Cancelar pelo site, em "Gerenciar renovação" (o app não tem essa opção).
- Clube Petlove Serviços (https://servicos.petlove.com.br/clube-petlove-servicos, lido 17:53:30): é outro produto, anual, para serviços (banho, hospedagem, pet sitter, creche, fisioterapia, acupuntura, teleorientação). Texto: "Por apenas R$ .../mês". O valor está como placeholder.

Entrega Petlove Já (https://www.petlove.com.br/petlove-ja, lido 17:53:26; política em https://atendimento.petlove.com.br/hc/pt-br/articles/360034115513-Pol%C3%ADtica-de-Entrega-Troca-e-Devolu%C3%A7%C3%A3o-de-Produtos, lido 17:53:30):
- "Essa entrega está disponível nas cidades de São Paulo (SP), Santos (SP), Santo André (SP), Rio de Janeiro (RJ), Porto Alegre (RS) e Curitiba (PR)."
- "Realizando o pedido através de cartão de crédito ou PIX, e sendo aprovado dentro do horário de funcionamento da filial escolhida, você recebe o pedido no mesmo dia."
- Página Petlove Já: "Seu pedido a caminho ou pronto para retirada após poucos minutos da confirmação de pagamento."
- Custo: não encontrado.
- "Receba amanhã" (mesma política): "a entrega será efetuada em até um dia útil, até as 22h, desde que a compra seja realizada de segunda a sexta, com cartão de crédito, e desde que o pagamento seja aprovado até às 13h. Não entregamos em feriados."

Frete padrão (política de entrega da Petlove): não encontrei limite de valor para frete grátis fora do clube. O único limite citado é "sem valor mínimo ou a partir de R$ 99" para membros do Clube.

Lojas físicas (https://www.petlove.com.br/lojas-fisicas, lido 17:53:27):
- "Agora a Petlove também tem lojas físicas." "Clique e retire: Compre online e retire na loja mais perto de você, sem fila nem espera."
- A página lista 10 unidades (contagem de "Loja:" no HTML).
- Tempo e custo de retirada: não encontrados.

## Parte 3: Reclame Aqui

### Cobasi - Loja Online (https://www.reclameaqui.com.br/empresa/cobasi-loja-online/, lido ~17:50)
- Reputação: RA1000, "Empresa Verificada".
- "Sua nota média nos últimos 6 meses 8.3/10." Período: "Dados de 01/05/2026 até 31/10/2026".
- Reclamações recebidas: 2.161. Respondidas: 92,4%. Resolvidas: 91,2%. "Voltariam a fazer negócio": 75,2%. Avaliadas: 1.305. Nota média do consumidor: 7,22. Aguardando resposta: 139.

### Petlove
- Não encontrei o perfil. Os três slugs chutados deram 404 e a busca interna deu erro 500. Não está bloqueada, só não achei o endereço. Você consegue ler no navegador: buscar "Petlove" no reclameaqui.com.br.

## Divergências que valem atenção

1. Cobasi, desconto de retirada: três valores diferentes para o mesmo benefício (R$ 149, R$ 199 e R$ 249). O regulamento da Black Friday (R$ 199, Sul/Sudeste/Centro-Oeste) é o texto mais específico do período.
2. Cobasi, horário de retirada: 9h às 22h no regulamento, 9h30 às 20h30 na página de retirada.
3. Petlove, desconto do Repet: 10%, 20% na primeira compra, 15% com cupom GANHE15 e "até 20%" na home. Não dá para dizer qual vale sem testar no carrinho.
4. Petlove, NexGard: o preço da recorrência mostrado na página é o mesmo da compra avulsa (R$ 86,44).
5. Cobasi e Petlove: as duas dizem que o desconto de programação (10%) não soma com promoção ou cupom. A Cobasi, na Black Friday, permite somar o desconto de retirada de 5% com a Compra Programada.
