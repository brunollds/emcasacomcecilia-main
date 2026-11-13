---
parceiro: "La Ganexa"
slug_cupom: "la-ganexa"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-02-13"
---

# Dossiê Factual: La Ganexa

Parceria iniciada em 13/11/2026, com a página `/cupons/la-ganexa`, na prateleira Alimentação de `/cupons`.
Ainda sem artigo: as pautas de onboarding ficam com a sessão de artigos. A parceria não tem link próprio nem
UTM: o `offerUrl` é o site oficial.

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom `CECILIA`: 10% OFF | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `la-ganexa`); Bruno, 13/11/2026 | 2026-11-13 | 2026-12-13 | Sem leitura de valor mínimo nem de limite de usos: não afirmar "sem mínimo" | Alta |
| O cupom soma com as promoções do site: entra sobre o preço promocional | condicao_comercial_volatil | Carrinho do Bruno, 13/11/2026 (os quatro itens com preço riscado no catálogo) | 2026-11-13 | 2026-12-13 | Exceção na linha abaixo | Alta |
| Kit 2 Doce de Leite e Kit 2 Brigadeiros de Colher: "não cumulativo com outras promoções, cupons ou descontos"; o de Doce de Leite também não conta para o frete grátis | condicao_comercial_volatil | lojalaganexa.com.br/pages/regras-das-promocoes | 2026-11-13 | 2026-12-13 | Regra escrita da loja. No teste de 13/11, o checkout aceitou o CECILIA no Kit 2 Doce de Leite (R$ 127,99 → R$ 115,19); o de Brigadeiros segue sem teste. Nos textos: dizer a regra e o resultado do teste, e mandar conferir a linha Descontos | Média |
| Frete grátis acima de R$ 250 no Sul e no Sudeste e de R$ 350 nas demais regiões | condicao_comercial_volatil | lojalaganexa.com.br/pages/politica-de-frete e /pages/regras-das-promocoes | 2026-11-13 | 2026-12-13 | A política fala em "valor de produto mínimo" e não diz se o cupom entra; o mínimo conta depois do cupom pela palavra do Bruno (13/11/2026), e os artigos LG1, LG4 e LG7 afirmam assim | Alta |
| Pagamento: Pix ou cartão, até 3x sem juros; de 4x a 12x com juros da operadora | condicao_comercial_volatil | lojalaganexa.com.br/pages/perguntas-frequentes | 2026-11-13 | 2026-12-13 | — | Alta |
| Brinde surpresa em compras acima de R$ 180, contados depois de todos os descontos e cupons | condicao_comercial_volatil | lojalaganexa.com.br/pages/regras-das-promocoes | 2026-11-13 | 2026-12-13 | Promoção por tempo limitado; fora da página | Média |
| Link da parceria: não há; `offerUrl` = `https://lojalaganexa.com.br/` | condicao_comercial_volatil | Bruno, 13/11/2026 ("não vi link utm") | 2026-11-13 | 2026-12-13 | A venda conta pelo cupom | Alta |

Teste do Bruno, 2026-11-13 (checkout, sem finalizar): Cookies Cacau com Gotas de Chocolate (R$ 18,14, de
R$ 32,90), Kit Degustação Pasta de Amendoim com 6 sabores (R$ 139,99, de R$ 149,99), Kit Degustação Cookies
de Cacau e de Baunilha (R$ 36,28, de R$ 65,80) e Doce de Leite Zero 400g (R$ 69,99, de R$ 84,99). Total
R$ 264,40 → R$ 237,96 com o CECILIA (menos R$ 26,44, 10%). O campo fica no Resumo da compra: "Inserir cupom de
desconto" → "Cupom (opcional)" → "Adicionar"; o desconto aparece na linha "Descontos". Os preços "de" vêm do
catálogo da loja (`/products.json`), lido no mesmo dia.

Teste da sessão de cupons, 2026-11-13 (Chrome, sem login e sem finalizar): Kit 2 Doce de Leite Zero 400g, R$ 127,99. Pelo botão
"Finalizar a compra" (checkout da Yampi, `seguro.lojalaganexa.com.br`), o CECILIA foi aceito ("Cupom adicionado.") e o total
ficou em R$ 115,19. Pelo link de carrinho da Shopify com `?discount=CECILIA`, o desconto foi de R$ 12,79.

O Bruno informou em 13/11 que a loja não dá desconto extra no Pix; a linha do Pix da página segue a genérica
("quando a loja oferece"), por decisão dele. Sem leitura: cashback de 5% anunciado na faixa do site ("Compre e receba 5% de cashback"),
código no app (a loja tem app para Android e iOS), valor mínimo do cupom e pesquisa de percentuais em outros
sites (por isso a página não tem o FAQ "Existe cupom La Ganexa de X%?"). A página `/pages/cupons` da loja
lista cupons próprios dela, que não entram nos nossos textos.

---

## 2. Fatos Oficiais & Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Marca brasileira de pastas de amendoim e doces zero açúcar e zero glúten; a história começa em 2011, com a pasta de amendoim caseira da fundadora, Juliana | fato_oficial | lojalaganexa.com.br/pages/sobre-nossa-historia | 2026-11-13 | 2027-02-13 | — |
| Fábrica em Peruíbe (SP), na Rua Dr. Primo Fazzini, 980, que também vende ao público de segunda a sexta, das 8h às 18h | fato_oficial | Página "Sobre Nossa História" e rodapé | 2026-11-13 | 2027-02-13 | — |
| Catálogo: pasta de amendoim, doce de leite, cookies, panqueca, suspiro, alfajor e kits | fato_oficial | Menu do site | 2026-11-13 | 2027-02-13 | — |
| CNPJ 31.315.158/0001-84 | fato_oficial | Rodapé do site | 2026-11-13 | 2027-02-13 | — |
| "Mais de 7000 pontos de venda" e fábrica de "mais de 1000 metros quadrados" | fato_oficial | Página "Sobre Nossa História" | 2026-11-13 | 2027-02-13 | Afirmações da marca: só com atribuição |
| Envio em até 24 horas úteis depois do pagamento confirmado; entrega em média de 2 a 5 dias úteis depois da postagem | fato_oficial | lojalaganexa.com.br/pages/politica-de-frete | 2026-11-13 | 2027-02-13 | — |
| A loja diz que os produtos são feitos sem glúten e que diabéticos podem consumir, recomendando consultar o médico ou o nutricionista | fato_oficial | lojalaganexa.com.br/pages/perguntas-frequentes | 2026-11-13 | 2027-02-13 | Só com atribuição à loja |

---

## 3. Alertas Editoriais

- Nos artigos deste parceiro, usar `affiliate: "la-ganexa"` e link relativo para `/cupons/la-ganexa`,
  conforme `docs/CONTRATO-ARTIGO-AFILIADO.md`.
- O nome da marca é "La Ganexa" (duas palavras); o domínio é `lojalaganexa.com.br`.
- Alegações de saúde (zero açúcar, sem glúten, diabéticos, emagrecimento) só pelo rótulo e pela página do
  produto, com atribuição à loja e sem promessa de resultado.
- Nenhum cupom da própria loja (página `/pages/cupons`, grupo VIP da Black Friday) nos textos.
- Dr. Peanut também é parceira e vende pasta de amendoim: uma marca por artigo.

---

## 4. Mídia da Marca

- Logo: `/images/about/partners/laganexa.png` (página /sobre) e `/images/about/partners/laganexa-icon.png`.
- Bolinha: `/images/logos/bolinhas/laganexa-letreiro.png`, com `background: '#2B1408'`. Origem:
  `https://lojalaganexa.com.br/cdn/shop/files/logo-laganexa.png?v=1722368781`, baixado em 13/11/2026; ajuste: só o
  letreiro creme do logo, sem o selo marrom e sem o contorno laranja, na largura toda do arquivo. A primeira
  bolinha (`laganexa.png`, o logo inteiro) ficava pequena e ilegível na vitrine e saiu de uso no mesmo dia.
- Marca-d'água: `/images/logos/watermarks/laganexa.webp`.
- Print do resumo com o cupom: `/images/reviews/laganexa/cupom-laganexa-checkout-com-cupom.webp` (do teste do
  Bruno; demonstração visual, sem data).
