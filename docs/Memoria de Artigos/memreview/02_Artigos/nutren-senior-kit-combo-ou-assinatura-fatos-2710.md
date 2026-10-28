# Fatos N1: Nutren Senior, kit, combo, lata avulsa ou assinatura (27/10/2026)

Fontes: `../rodada-nutre/fatos-chrome-senior-2710.md` (Chrome, 27/10/2026, Claude); dossiê `docs/Memoria de Artigos/memreview/01_Parceiros/Nestle-Nutre.md` (10/10/2026, frete e regras); `src/lib/couponsData.ts` (loja `nestle-nutre`); artigos no ar citados abaixo.

## Preços (Chrome, 27/10/2026)

| Produto | Riscado | Compra única (total) | Assinatura (total) | Por lata (compra única) | Por lata (assinatura) | Por 100 g (compra única) |
|---|---|---|---|---|---|---|
| Senior 740 g, Sem Sabor (ficha com 4 sabores) | R$ 188,19 | R$ 169,37 | R$ 150,55 | R$ 169,37 | R$ 150,55 | R$ 22,89 |
| Kit Senior 740 g, 2 un. | — | R$ 263,49 | R$ 237,14 | R$ 131,75 | R$ 118,57 | R$ 17,80 |
| Combo Senior Sem Sabor 740 g, 2 un. | R$ 376,38 | R$ 319,92 | R$ 282,29 | R$ 159,96 | R$ 141,15 | R$ 21,62 |
| Combo Mix de Frutas / Café com Leite 740 g, 2 un. | R$ 376,38 | R$ 319,92 | — | R$ 159,96 | — | R$ 21,62 |
| Zero Lactose 740 g (Sem Sabor, Baunilha) | R$ 211,79 | R$ 190,61 | — | R$ 190,61 | — | R$ 25,76 |
| Kit Zero Lactose Sem Sabor 740 g, 2 un. | — | R$ 296,50 | — | R$ 148,25 | — | R$ 20,03 |
| Combo Zero Lactose 740 g, 2 un. | R$ 423,58 | R$ 360,04 | — | R$ 180,02 | — | R$ 24,33 |
| Premium Baunilha (lata, gramatura não lida) | R$ 161,39 | R$ 145,25 | — | — | — | pendente |
| Combo Premium Baunilha, 2 un. | R$ 322,78 | R$ 274,36 | — | R$ 137,18 | — | pendente |
| Nutren A-Z Senior 60 cápsulas | — | R$ 79,89 | — | — | — | — |

Por 100 g: 740 g por lata (kit e combo, 1.480 g). Assinatura por 100 g: lata R$ 20,34; kit R$ 16,02; combo R$ 19,07.

Por lata na assinatura da Zero Lactose: a leitura não mostrou assinatura.

## Percentuais que a página mostra (contas nossas)

- Lata assinada "economize 20%": 150,55 contra o riscado 188,19 = 20%. Contra a compra única 169,37 = 11%.
- Combo assinado "economize 25%": 282,29 contra o riscado 376,38 = 25%. Contra a compra única 319,92 = 12%.
- Kit assinado "economize 10%": 237,14 contra 263,49 (compra única, sem riscado) = 10%.
- Conclusão: o selo da lata e do combo conta a partir do riscado; o do kit, a partir da compra única. O texto usa a conta contra a compra única.

## Comparações de conta

- Kit em compra única contra duas latas avulsas em compra única: 263,49 contra 338,74 (2 × 169,37) = 22% menos.
- Kit assinado contra duas latas avulsas assinadas: 237,14 contra 301,10 (2 × 150,55) = 21% menos.
- Kit em compra única contra lata avulsa assinada: 131,75 contra 150,55 por lata. Kit ganha.
- Combo contra kit do mesmo produto em compra única: 319,92 contra 263,49, diferença R$ 56,43.

## Assinatura (texto da página, Chrome 27/10)

- "Cancele quando quiser, sem custo. A assinatura renova automaticamente, mas você pode pular até 2 entregas por ano."

Regras do dossiê (10/10, não relidas em 27/10):
- Frete grátis na compra única acima de R$ 400; na assinatura, acima de R$ 200 (`/assinaturas`; home e `/perguntas-frequentes`).
- Assinatura só com cartão de crédito. Pix por QR Code, sem desconto anunciado.
- Desconto de assinatura descrito como 10% na primeira compra e 15% a partir da 3ª recorrência, "em assinaturas acima de R$ 200". Os preços da página não batem com essa regra (Senior ZL: R$ 190,61 em compra única e R$ 169,43 assinada, no dossiê).

Frete de 27/10: não lido (ver pendente 4 do pauta).

## Cupom CECI (couponsData, slug `nestle-nutre`)

- `discount: '10% OFF'`, `discountNumber: 10`, `code: 'CECI'`.
- `longDescription`: "O CECI dá 10% OFF na loja oficial Nestlé Nutre e soma com as promoções; não vale em Alfamino, Alfaré nem fórmulas infantis de 0 a 12 meses. Testado em 26/10/2026 num carrinho de R$ 283,78, com R$ 28,38 de desconto."
- O teste de 26/10 foi com produto Nutren Fortify (duas latas), não com Senior, kit, combo, Zero Lactose ou assinatura.
- Dossiê (10/10): soma com preços da BF e vale em todas as formas de pagamento, "não foi confirmado, mas testei e continua" (Bruno, 09/10). Assinatura com o CECI: neutro nos artigos; não afirmar nem negar.
- Artigo `cupom-ceci-nestle-nutre-como-usar` diz: "Não confirmamos se o CECI pode ser somado a esses descontos" (assinatura).
- Regulatório (dossiê, 1.1): fórmulas infantis de 0 a 12 meses nunca recebem CECI (Decreto 9.579/2018, art. 5º). Toda menção às exceções inclui essa faixa.

## Achados contra os artigos no ar

- Lata de 370 g: a categoria `/nutren-senior` (12 itens) e a busca "nutren senior" não trouxeram lata de 370 g. Citada em: `black-friday-nestle-nutre` ("latas de 740 g e 370 g"), `nutren-senior-zero-lactose-ficha-tecnica` ("latas de 740 g e 370 g"), `cupom-ceci-nestle-nutre-como-usar` ("lata 370g Premium 6.1"). O dossiê (10/10) listou "Senior Café com Leite 370 g" a R$ 100,79 / R$ 90,71, sem leitura de hoje. Pendente: confirmar.
- Black Friday (10/10) já tem a seção "Kits com duas latas de Nutren Senior saíam mais baratos por lata" e a seção "Assinatura ou compra única com o cupom CECI": canibalização direta (ver pauta).
- A `black-friday-nestle-nutre` diz "até 10/10/2026 não havia campanha" (preços riscados em vários produtos). A leitura de 27/10 mostra o banner "Aproveite as ofertas de Outubro Rosa com até 30% OFF".

## Pendentes de navegador (resumo; a lista completa está no briefing)

1. Ficha e gramatura do Premium Baunilha.
2. Lata de 370 g: existe ou não.
3. Diferença kit × combo (2 latas do mesmo produto).
4. Frete do kit, do combo e da lata, nas duas formas, com CEP de teste.
5. Regras de desconto e pagamento da assinatura em `/assinaturas`, `/termos-de-uso`, `/perguntas-frequentes`.
6. Estoque do kit por sabor.
7. Indicação de público e prazo depois de aberta na ficha da Senior 740 g.
8. Teste de carrinho do CECI com kit e assinatura (Bruno; Claude não finaliza pedido).
9. Banner Outubro Rosa: se os preços lidos estão dentro dela.

## Nota de conferência

- O "Kit Senior Sem Sabor" de 263,49 do dossiê (10/10) bate com a leitura de 27/10. Preço estável em 17 dias.
- Batem com o dossiê (10/10): lata Senior (compra única e assinatura), kit e combo Senior (compra única e assinatura), Zero Lactose lata e kit Zero Lactose. Não estão no dossiê: combo Zero Lactose, Premium Baunilha e combo Premium. A lata de 370 g do dossiê não apareceu hoje.

## Correção do Claude (Chrome, 27/10/2026): a lata de 370 g existe — vale sobre o que este briefing diz em contrário

A categoria `/nutren-senior` não lista a lata de 370 g, mas a busca `/catalogsearch/result/?q=370g` traz 5 latas, todas com "Adicionar ao carrinho":
- Nutren Senior 370 g Sem Sabor (`/nutren-senior-po-lata-370g-1`), Café com Leite (`/nutren-senior-cafe-leite-po-lata-370g`), Baunilha (`/nutren-senior-baunilha-po-lata-370g`) e Chocolate (`/nutren-senior-chocolate-po-lata-370g`): compra única R$ 100,79 (sem preço riscado), assinatura R$ 90,71.
- Nutren Senior **Premium Baunilha é a lata de 370 g** (`/nutren-senior-premium-baunilha-po-lata`): R$ 145,25 (riscado R$ 161,39), assinatura R$ 129,11.
- Os artigos no ar que citam 370 g estão certos; não há o que corrigir neles.

Preço por 100 g (compra única / assinatura), Nutren Senior padrão:

| Forma | Compra única | Por 100 g | Assinatura | Por 100 g |
|---|---|---|---|---|
| Lata 370 g | R$ 100,79 | R$ 27,24 | R$ 90,71 | R$ 24,52 |
| Lata 740 g | R$ 169,37 | R$ 22,89 | R$ 150,55 | R$ 20,34 |
| Combo 2 × 740 g | R$ 319,92 | R$ 21,62 | R$ 282,29 | R$ 19,07 |
| **Kit 2 × 740 g** | **R$ 263,49** | **R$ 17,80** | **R$ 237,14** | **R$ 16,02** |
| Premium Baunilha 370 g | R$ 145,25 | R$ 39,26 | R$ 129,11 | R$ 34,89 |

O título volta a incluir o tamanho ("qual tamanho e qual kit compensam"), como na pauta da rodada: a 370 g sai 53% mais cara por 100 g que o kit na compra única.
