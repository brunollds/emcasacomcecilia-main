---
parceiro: "Adaptogen"
slug_cupom: "adaptogen"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2026-12-18"
---

# Dossiê Factual: Adaptogen

Loja de código com link de afiliado, cadastrada em 18/11/2026 a pedido do Bruno ("Novo afiliado
(https://adaptogen.com.br/?parceiro=CECILIA) Cupom: CECILIA 10% OFF"). Página `/cupons/adaptogen`, só em português.
Marca de suplementos esportivos (Adaptogen Science); o site roda na Wake (a mesma plataforma da BAW), com o checkout em
`/checkout`.

---

## 1. Dados Comerciais (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom CECILIA, 10% OFF, cliente novo e antigo | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `adaptogen`) | 2026-11-18 | 2026-12-18 | Link de afiliado `https://www.adaptogen.com.br/?parceiro=CECILIA` (nunca abrir); o link não aplica o cupom | Alta |
| Teste 1: Creatina Flavor 300 g (Limonada), de R$ 115,00 por R$ 97,75: linha Cupom − R$ 9,78, total R$ 87,97 | teste_carrinho | Checkout `/checkout`, sem login, sem finalizar | 2026-11-18 | 2026-12-01 | Sem cupom, o carrinho mostrava R$ 97,65 e uma linha Desconto de R$ 0,10, que sumiu com o código | Alta |
| Teste 2: a creatina + HIT Protein Bag 900 g (Baunilha), de R$ 173,15 por R$ 147,18: R$ 244,93 → − R$ 24,49 → R$ 220,44 | teste_carrinho | Idem | 2026-11-18 | 2026-12-01 | Os dois com preço da Black Friday; print do resumo no `cartPrint` | Alta |
| 5% de desconto no Pix e no boleto | condicao_comercial_volatil | Página de produto e faixa da home | 2026-11-18 | 2026-12-18 | A soma com o cupom no pagamento não foi vista (pede login); regra do Bruno: cupom vale em todo pagamento | Média |
| Cartão em até 6x sem juros, parcela mínima de R$ 50; Pix parcelado em até 4x sem juros, parcela mínima de R$ 50 | condicao_comercial_volatil | `/institucional/formas-pagamento` | 2026-11-18 | 2026-12-18 | | Alta |
| Frete grátis: Sudeste acima de R$ 199; Sul e Centro-Oeste acima de R$ 249; Nordeste acima de R$ 399; Norte acima de R$ 599 | condicao_comercial_volatil | `/institucional/politica-de-entrega` | 2026-11-18 | 2026-12-18 | Não diz se o mínimo conta antes ou depois do cupom | Alta |
| Adapto Cash: 3% do valor da compra volta como crédito para as próximas compras | condicao_comercial_volatil | `/institucional/adapto-cash-o-programa-de-cashback-da-adaptogen/` | 2026-11-18 | 2026-12-18 | A página não fala de cupom: soma com o CECILIA não lida, fora da página | Baixa |
| Black Friday: "Black Friday começou, até 50% OFF" | condicao_comercial_volatil | Banner da home | 2026-11-18 | 2026-12-01 | O cupom entrou por cima dos preços da campanha | Alta |

---

## 2. Fatos Oficiais (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Criada em 2014 nos EUA (Hollywood, Flórida) por Fernando Rosenberg e Mário Crespo; a primeira proteína foi a Tasty Whey | fato_oficial | `/institucional/quem-somos` | 2026-11-18 | 2027-02-18 | No Brasil, Adapto Company do Brasil Suplementos Alimentares Ltda, CNPJ 36.062.277/0004-39 (rodapé) |
| Linha: whey (Tasty Whey, HIT Protein, Gold Whey, Tasty Iso), creatina, pré-treinos (Panic, Muscle Bunny, N.O Xplosion), vitaminas, snacks e roupas | fato_oficial | Menu e home | 2026-11-18 | 2027-02-18 | |
| Trocas: desistência em 7 dias corridos do recebimento, produto lacrado e sem uso, com nota fiscal; defeito em até 30 dias; frete da troca sem erro da loja por conta do cliente | fato_oficial | `/institucional/trocas-e-devolucoes` | 2026-11-18 | 2027-02-18 | Caixa avariada ou violada: recusar a entrega e avisar o SAC |

---

## 3. Alertas Editoriais

- **Link de produto:** o painel de afiliado gerou links com `&?parceiro=CECILIA` no fim (em 18/11). Com o `?` a mais, o
  parâmetro passa a se chamar "?parceiro". Nos artigos, usar `&parceiro=CECILIA` (ou `?parceiro=CECILIA` quando a URL
  não tem outro parâmetro). Nunca abrir o link de afiliado para conferir.
- Nunca citar códigos de terceiros nem da loja; a página responde "Existe cupom Adaptogen de 20%?" sem nomear código.
- Suplemento sem promessa de efeito. Nos artigos, usar `affiliate: "adaptogen"`, `coupon: "CECILIA"` (o código, como nos JSONs da marca) e link relativo para `/cupons/adaptogen`,
  com a âncora exata "cupom Adaptogen".
- Creatinas (leitura de 26/11/2026, [[adaptogen-fatos-2611]]): a "Super" virou **Creatina Pro 300 g**, com
  carboidrato e 50 doses; a **Platinum Series** é a "Creatine 100% Pure" do rótulo, em 100 g, 300 g, 500 g e 1 kg. O
  rótulo não cita Creapure; a arte "aprovado em todos os laudos de pureza" não tem laudo publicado; a frase "aprovada
  pela ANVISA" e a de Alzheimer e Parkinson da página da Pro nunca entram no texto.
- HIT Protein: a página não publica lista de ingredientes nem a proporção whey × colágeno. Comparação com os wheys
  sempre por dose, nunca por 100 g de proteína.
- Frete (26/11/2026): o topo do site passou a dizer "Frete Grátis para todo Brasil - consulte condições"; a tabela por
  região de 18/11 (seção 1) não foi relida. Reler as condições antes de citar frete grátis.

---

## Perguntas reais

Consultas literais, com a fonte. Autocompletar é presença, sem volume.

| Pergunta ou consulta | Fonte |
|---|---|
| creatina adaptogen é boa | Search Console (Bruno, 26/11/2026: 13 impressões, posição 10,8); autocompletar, 26/11/2026 |
| hit protein adaptogen é bom | Search Console (Bruno, 26/11/2026: 13 impressões, posição 6,8; IA na 5,0); autocompletar, 26/11/2026 |
| creatina adaptogen é pura | Autocompletar, 26/11/2026 |
| creatina adaptogen tem selo creapure | Autocompletar, 26/11/2026 |
| creatina adaptogen é aprovada pela anvisa | Autocompletar, 26/11/2026 |
| creatina adaptogen é monohidratada | Autocompletar, 26/11/2026 |
| creatina adaptogen 300g / 500g / 1kg | Autocompletar, 26/11/2026 |
| creatina super adaptogen é boa | Autocompletar, 26/11/2026 |
| creatina platinum adaptogen é boa | Autocompletar, 26/11/2026 |
| hit protein adaptogen tabela nutricional | Autocompletar, 26/11/2026 |
| hit protein adaptogen ingredientes | Autocompletar, 26/11/2026 |
| hit protein adaptogen é whey | Autocompletar, 26/11/2026 |
| hit protein adaptogen é concentrado | Autocompletar, 26/11/2026 |
| hit protein adaptogen engorda | Autocompletar, 26/11/2026 |
| hit protein adaptogen é bom para emagrecer | Autocompletar, 26/11/2026 |
| hit protein adaptogen qual a diferença | Autocompletar, 26/11/2026 |
| hit protein adaptogen original | Autocompletar, 26/11/2026 |

As consultas de 18/11 (laudo, Anvisa, marketplace, Tasty Whey) estão em [[adaptogen-fatos-1811]], seções 7 e 8.

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/adaptogen.png` | Logo oficial do site (`adaptogen.fbitsstatic.net/sf/img/logo.svg`), baixado em 2026-11-18, centrado em 256 × 256 sobre branco | Página da loja, cards, imagem de compartilhamento e `/sobre` | Logo da marca parceira, para divulgação da parceria |
| `/images/logos/bolinhas/adaptogen.png` | O mesmo logo com o preto trocado por branco (o amarelo #FFE412 fica), 512 × 512 transparente, sobre o `background` #000000 | Bolinha da vitrine e de /reviews | Idem |
| `/images/logos/watermarks/adaptogen.webp` | O mesmo logo todo em preto, 480 px de largura | Marca-d'água da página e dos cards | Idem |
| `/images/reviews/adaptogen/cupom-adaptogen-checkout-com-cupom.webp` | Coluna do resumo do checkout no teste 2 de 18/11, sem dado pessoal | `cartPrint` em "Como usar" | Próprio |

Para trocar um logo, criar arquivo com nome novo, conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
