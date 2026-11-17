---
parceiro: "L'Amazonie"
slug_cupom: "lamazonie"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-02-16"
---

# Dossiê Factual: L'Amazonie

Parceria iniciada em 16/11/2026, com a página `/cupons/lamazonie`, na prateleira Beleza de `/cupons`. Ainda sem
artigo: o pacote inicial LZ1 a LZ6 tem briefing desde 16/11 (regras em [[cupom-lamazonie-como-usar]], fatos em
[[lamazonie-fatos-1611]]). **Sem experiência de uso dos cosméticos** (Bruno, 16/11); o teste nosso é o do cupom no
checkout. A parceria não tem link próprio nem UTM: o `offerUrl` é o site oficial.

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom `CECILIA`: 5% OFF no site oficial | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `lamazonie`); Bruno, 16/11/2026 | 2026-11-16 | 2026-12-16 | Sem leitura de valor mínimo nem de limite de usos: não afirmar "sem mínimo". O mesmo código `CECILIA` também é o da La Ganexa | Alta |
| O cupom soma com as promoções do site: entra sobre o preço promocional | condicao_comercial_volatil | Checkout da sessão de cupons, 16/11/2026 | 2026-11-16 | 2026-12-16 | Testado no Kit 2 Protetores Solares de Tratamento FPS 99, de R$ 278,00 por R$ 249,00 | Alta |
| O cupom vale na oferta de Black Friday "Sérum para Crescimento de Cílios e Sobrancelhas + Protetor Solar Incolor FPS 99 Grátis" (`/products/bf-serum-sobrancelhas-protetor-gratis`) | condicao_comercial_volatil | Checkout próprio, teste da sessão de pautas em 17/11/2026 (`05_Demanda/parceiros/lamazonie/1-bruto/20261117-1848-checkout-oferta-bf`) | 2026-11-17 | 2026-11-27 | R$ 159,00 → R$ 151,05 (- R$ 7,95), "Cupom adicionado.". Uma unidade; as outras sete ofertas `bf-` não foram testadas. A loja anunciava essa oferta no Google com "Até 26/11"; a página não mostra data | Alta |
| Pix: 3% de desconto no pagamento, que soma com o cupom | condicao_comercial_volatil | Página do sérum ("3% OFF", R$ 154,23 no Pix sobre R$ 159,00) e selo "3% de desconto" no pagamento do checkout (print do Bruno, 16/11/2026); regra geral do Bruno: o cupom soma com o Pix | 2026-11-16 | 2026-12-16 | O pagamento com cupom e Pix não foi aberto (pede dados pessoais): não somar os dois num percentual só | Média |
| Cashback: 15% de volta para a próxima compra, só em compras no site, com validade, cobrindo até 30% do pedido seguinte | condicao_comercial_volatil | Página do sérum de sobrancelhas, 16/11/2026; linha "15% de cashback para a próxima compra" no resumo do checkout | 2026-11-16 | 2026-12-16 | A soma com o cupom não está escrita: o checkout mantém a linha do cashback com o CECILIA aplicado, e o Bruno acha que não soma (16/11). A página cita o cashback só nas vantagens, sem dizer que soma | Média |
| Frete grátis acima de R$ 199 para quase todo o Brasil; no Acre, Piauí, Rondônia e Roraima, acima de R$ 500 | condicao_comercial_volatil | lamazonie.com.br/pages/perguntas-frequentes; faixa do topo do site ("Frete grátis acima de R$199!") | 2026-11-16 | 2026-12-16 | Sem leitura de o mínimo contar antes ou depois do cupom | Alta |
| Pagamento: cartão de crédito em até 6x sem juros e Pix; no checkout, Visa, Mastercard, Elo, American Express, Diners, Discover e Hipercard | condicao_comercial_volatil | lamazonie.com.br/pages/perguntas-frequentes; print do pagamento do checkout (Bruno, 16/11/2026) | 2026-11-16 | 2026-12-16 | — | Alta |
| Link da parceria: não há; `offerUrl` = `https://www.lamazonie.com.br/` | condicao_comercial_volatil | Bruno, 16/11/2026 (mandou só o site e o cupom) | 2026-11-16 | 2026-12-16 | A venda conta pelo cupom | Alta |

Teste da sessão de cupons, 2026-11-16 (Chrome, sem login, sem dados pessoais e sem finalizar): Sérum para crescimento
de Cílios e Sobrancelhas, 1 sérum, R$ 159,00 (preço cheio), e Kit 2 Protetores Solares de Tratamento FPS 99,
R$ 249,00 (de R$ 278,00). Produtos R$ 408,00 → total R$ 387,60 com o CECILIA (aviso "Desconto (- R$ 20,40)" e
linha Descontos, 5% dos dois itens). Teste do Bruno no mesmo dia: Kit Completo Sérum de Vitamina C20 + Protetor
Solar + Gel de Limpeza (R$ 397,00) e Sérum Clareador Vitamina C20 de 3 unidades (R$ 569,00): R$ 966,00 →
R$ 917,70 (- R$ 48,30), frete grátis.

O cupom só funciona no checkout próprio da loja (`seguro.lamazonie.com.br`), que abre pelo botão "Finalizar compra"
da gaveta do carrinho. O checkout padrão da Shopify (`/checkout`) e o carrinho da Shopify (`/cart`) recusaram o
CECILIA no mesmo dia ("Insira um código de desconto válido"): quem testar por eles acha que o cupom não existe.

Sem leitura: valor mínimo do cupom e soma com o cashback. O checkout abre um aviso de cupom próprio da loja
para a primeira compra ("Você ganhou um cupom para sua 1a compra!"): não entra nos nossos textos.

---

## 2. Fatos Oficiais & Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| L'Amazonie Skincare: marca brasileira de dermocosméticos, com ativos da Amazônia; veganos, cruelty free, sem parabenos e sem perfume | fato_oficial | lamazonie.com.br/pages/quem-somos; og:site_name e descrição da home | 2026-11-16 | 2027-02-16 | O site escreve o nome com o apóstrofo reto e com o tipográfico |
| Catálogo: sérum para crescimento de cílios e sobrancelhas (o "queridinho"), sérum clareador de vitamina C20, protetor solar de tratamento FPS 99, bastão multifuncional com cor FPS 95, gel de limpeza de vitamina C, cremes clareadores (íntimo, virilha e axilas), kits e e-books | fato_oficial | lamazonie.com.br/products.json, 16/11/2026 | 2026-11-16 | 2026-12-16 | Preços mudam com as campanhas |
| Empresa: ABRAHAO VAREJISTA LTDA, CNPJ 60.522.061/0001-40, Serra (ES) | fato_oficial | Rodapé do site | 2026-11-16 | 2027-02-16 | — |
| Plataforma: Shopify, com checkout próprio em `seguro.lamazonie.com.br` | fato_oficial | Código da home; endereço do checkout | 2026-11-16 | 2027-02-16 | — |
| Entrega: Correios (PAC e SEDEX) e Total Express, só no Brasil; despacho em até 3 dias úteis depois da compensação; prazo e valor pelo CEP | fato_oficial | lamazonie.com.br/policies/shipping-policy | 2026-11-16 | 2027-02-16 | — |
| Trocas e devoluções: pelo e-mail sac@lamazonie.com.br, em até 7 dias do recebimento, com a caixa lacrada e sem uso; a loja agenda a coleta; frete da devolução do cliente; estorno em até 20 dias úteis (boleto) ou em até duas faturas (cartão) | fato_oficial | lamazonie.com.br/pages/trocas-e-devolucoes; /policies/refund-policy | 2026-11-16 | 2027-02-16 | — |
| Garantia Mais Fios: no sérum de sobrancelhas, dinheiro de volta se não houver fios novos em 60 dias de uso, com foto do dia 1 e do dia 60; só compras no site, uma por CPF, 2 frascos seguidos; vale para compras a partir de 17/10/2026 | fato_oficial | lamazonie.com.br/pages/garantia | 2026-11-16 | 2026-12-16 | Sem leitura de a garantia valer em compra com cupom: o texto da garantia não fala de cupom |
| Garantia Mais Fios, releitura do Job 1: "2 frascos: o kit de 60 dias, ou o 2º frasco comprado no site antes de acabar o primeiro"; foto do dia 1 em até 3 dias do recebimento e do dia 60 entre o 60º e o 70º dia; análise em até 5 dias úteis e reembolso em até 10 dias úteis, do valor dos frascos usados, sem o frete; no kit de 90 dias, o 3º frasco lacrado pode ser devolvido; não vale em marketplace, salão ou revendedora, nem com henna, micropigmentação, lápis permanente ou depilação da região | fato_oficial | lamazonie.com.br/pages/garantia | 2026-11-16 | 2026-12-16 | Quem compra 1 frasco entra se comprar o 2º no site antes de o 1º acabar |
| Processo na Anvisa 25351.021744/2026-56: "SÉRUM CÍLIOS E SOBRANCELHAS L'AMAZONIE", notificado (isento de registro), empresa detentora CTEC INDÚSTRIA E COMÉRCIO DE COSMÉTICOS LTDA ME, CNPJ 03.830.222/0001-20, vencimento 03/02/2036. A base traz outras seis linhas com o nome da marca, uma delas um segundo sérum de sobrancelhas (25351.420409/2024-75, JUA) | fato_oficial | Dados abertos da Anvisa (`TA_CONSULTA_COSMETICOS.CSV`), base de 15/11/2026 | 2026-11-16 | 2026-12-16 | Não escrever "registrado" nem "grau 2"; a palavra "ATIVO" só com a consulta do portal; qual processo está no frasco, só o rótulo diz ([[lamazonie-fatos-1611]], 9.4) |
| Arrependimento: o Guia de Comércio Eletrônico do Procon-SP (p. 19) diz que o fornecedor não pode exigir embalagem inviolada nem cobrar frete de devolução; a política da loja pede caixa lacrada e frete do cliente | fonte_oficial_externa | procon.sp.gov.br (PDF); CDC, art. 49 | 2026-11-16 | 2027-02-16 | Mostrar as duas coisas, cada uma com a fonte, sem chamar a política de ilegal |
| Composição e volume do sérum: a página oficial não publica a lista INCI nem o volume; "4 mL" vem do título do anúncio da loja oficial no Mercado Livre | pendente | Página do sérum, 16/11/2026 | 2026-11-16 | 2026-12-16 | Pendente do rótulo |
| Loja Oficial no Mercado Livre: existe (`mercadolivre.com.br/loja/lamazonie`); preços não lidos (os anúncios pedem login) | fato_oficial | Página "LAmazonie \| Loja Oficial", 16/11/2026 | 2026-11-16 | 2026-12-16 | O código, a garantia e o cashback são só do site |
| Black Friday: página da campanha vazia; seis páginas de produto com oferta de Black Friday fora do menu (brinde no preço de tabela), uma delas "Black Friday Creators" | condicao_comercial_volatil | `products.json` e páginas `bf-`, 16/11/2026 | 2026-11-16 | 2026-11-27 | Sem data nem regulamento; sem teste do cupom nelas |
| Atendimento: WhatsApp (92) 98560-6293 e sac@lamazonie.com.br; consultora da garantia no (92) 98614-5476 | fato_oficial | lamazonie.com.br/pages/perguntas-frequentes; /pages/garantia | 2026-11-16 | 2027-02-16 | — |

---

## 3. Alertas Editoriais

- Nos artigos deste parceiro, usar `affiliate: "lamazonie"` e link relativo para `/cupons/lamazonie`, conforme
  `docs/CONTRATO-ARTIGO-AFILIADO.md`.
- O nome da marca é "L'Amazonie" (a loja usa "L'Amazonie Skincare"); o domínio é `lamazonie.com.br`.
- Nenhum cupom da própria loja (o aviso de primeira compra do checkout, as campanhas de Black Friday) nos textos.
- Cosmético com promessa de resultado (crescimento de fios, clareamento): citar a promessa como da marca, com
  atribuição, nunca como fato nosso.
- Não escrever "sem valor mínimo" nem um percentual único de cupom mais Pix; não dizer que o cupom soma com o cashback.
- Outras criadoras divulgam códigos com percentual maior na mesma loja (topo do Google, 16/11): nunca "o maior" ou
  "o melhor" cupom, e nenhum código alheio nos textos.
- A caixa lacrada e o frete da devolução por conta do cliente são condições da política da loja, não do art. 49 do CDC.
- Três empresas aparecem nas fontes (rodapé, Reclame Aqui e Anvisa): cada CNPJ com a sua fonte, sem explicar a relação.
- Não sugerir comprar 1 frasco "para testar" nem recomendar o kit maior só pelo preço por unidade.

---

## 4. Mídia da Marca

- Logo: `/images/about/partners/lamazonie.png` (página /sobre). Origem:
  `https://www.lamazonie.com.br/cdn/shop/files/logo-lamazonie-1024X1024-v-selo-2.jpg` (ícone do site), baixado em
  16/11/2026, reduzido para 256x256.
- Bolinha: `/images/logos/bolinhas/lamazonie.png`, com `background: '#0E423A'` (o verde do logo). Origem:
  `https://www.lamazonie.com.br/cdn/shop/files/logo-lamazonie-new-verde-live-amazon.png`, baixado em 16/11/2026;
  ajuste: só a palavra L'AMAZONIE, sem o "live amazon", em branco, 420 px de largura num quadro transparente de 512.
- Marca-d'água: `/images/logos/watermarks/lamazonie.webp`, do mesmo logo, na cor das marcas-d'água (#0F1D3A).
- Print do resumo com o cupom: `/images/reviews/lamazonie/cupom-lamazonie-checkout-com-cupom.webp` (do teste de
  16/11; demonstração visual, sem data).
