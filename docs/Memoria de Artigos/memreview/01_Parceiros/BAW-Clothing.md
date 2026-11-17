---
parceiro: "BAW Clothing"
slug_cupom: "baw"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-02-16"
---

# Dossiê Factual: BAW Clothing

Parceria iniciada em 16/11/2026, com a página `/cupons/baw`, na prateleira Moda de `/cupons`. Ainda sem
artigo: o pacote inicial BW1 a BW6 tem briefing desde 16/11 (regras em [[cupom-baw-como-usar]], fatos em
[[baw-fatos-1611]]) e espera a redação. **Experiência própria: não há** (Bruno, 16/11): os textos usam só fontes
públicas. A parceria não tem link próprio nem UTM: o
`offerUrl` é o site oficial.

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom `BAWEMCASACOMCECILIA`: 10% OFF em todo o site e no aplicativo | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `baw`); Bruno, 16/11/2026 | 2026-11-16 | 2026-12-16 | Sem leitura de valor mínimo nem de limite de usos: não afirmar "sem mínimo" | Alta |
| O cupom soma com as promoções do site: entra sobre o preço promocional | condicao_comercial_volatil | Carrinho da sessão de cupons, 16/11/2026 | 2026-11-16 | 2026-12-16 | Testado numa camiseta com o selo de Black Friday | Alta |
| O cupom não dá frete grátis; frete e prazo saem no carrinho pelo CEP | condicao_comercial_volatil | Carrinho da sessão de cupons, 16/11/2026; bawclothing.com.br/entrega-e-frete | 2026-11-16 | 2026-12-16 | Com o CEP 01310-100 (São Paulo, SP): Loggi Envio Nacional, R$ 10,62, em até 4 dias úteis | Alta |
| Pagamento: Pix e cartão de crédito Visa, Mastercard, Elo, American Express e Hipercard, em até 10x sem juros com parcela mínima de R$ 50; compras no cartão passam por análise antifraude | condicao_comercial_volatil | bawclothing.com.br/forma-de-pagamento | 2026-11-16 | 2026-12-16 | — | Alta |
| Pix: 5% de desconto em todo o site, que soma com o cupom | condicao_comercial_volatil | Página da Camiseta Regular Goth 3.0 ("5% OFF no PIX", 16/11/2026); Bruno, 16/11/2026 (vale em todo o site e soma com o cupom) | 2026-11-16 | 2026-12-16 | Não somar os dois descontos num percentual só | Alta |
| O cupom vale no aplicativo da BAW | condicao_comercial_volatil | Bruno, 16/11/2026 | 2026-11-16 | 2026-12-16 | — | Alta |
| Na primeira compra, o BAWEMCASACOMCECILIA dá o mesmo desconto do FIRSTBAW (cupom de primeira compra da loja) | condicao_comercial_volatil | Teste do Bruno no app, 17/11/2026 (os dois mostraram o mesmo desconto e o mesmo total no mesmo carrinho; os números do print não fecham, 316,80 menos 28,80 não dá os 259,20 do total, e não se citam); teste da sessão de cupons no site, 17/11/2026 (Camiseta Regular Logo, R$ 69,00, e Camiseta Regular Pima, R$ 139,00: os dois deram R$ 20,80 de R$ 208,00, total R$ 187,20) | 2026-11-17 | 2026-12-17 | O FIRSTBAW aparece com 15% em sites de cupom; os testes deram o mesmo dos 10% do nosso. App e site têm um campo só de cupom | Alta |
| Indício de valor mínimo: num carrinho só com a Camiseta Regular Logo (R$ 69,00, em promoção), nem o BAWEMCASACOMCECILIA nem o FIRSTBAW entraram, sem mensagem de erro; com R$ 208,00, os dois entraram | condicao_comercial_volatil | Teste da sessão de cupons no site, 17/11/2026 | 2026-11-17 | 2026-12-17 | Sem o valor exato: não escrever "sem valor mínimo" nem um valor; na próxima rodada, achar o corte | Média |
| Link da parceria: não há; `offerUrl` = `https://www.bawclothing.com.br/` | condicao_comercial_volatil | Bruno, 16/11/2026 ("sem link utm") | 2026-11-16 | 2026-12-16 | A venda conta pelo cupom | Alta |

Teste da sessão de cupons, 2026-11-16 (Chrome, sem login e sem finalizar): Camiseta BR Regular Locally Grown
Preto Stoned M, R$ 89,00 (preço cheio), e Camiseta Regular Goth 3.0 Branco M, R$ 59,00 (de R$ 89,00, 34% OFF,
selo de Black Friday). Subtotal R$ 148,00 → total R$ 133,20 com o BAWEMCASACOMCECILIA (linha Cupom, menos
R$ 14,80, 10% das duas peças). O campo "Cupom de desconto" fica no carrinho (`/checkout`), ao lado do resumo, e
confirma pela seta; aceito, mostra "Cupom aplicado" e o botão "Trocar".

Sem leitura: valor mínimo do cupom, soma com o
cashback do programa BAWPOINTS (a página cita o programa nas vantagens, sem dizer que soma) (a página do produto mostrava "Ganhe até R$ 5,90 de cashback / +59 pontos") e
pesquisa de percentuais em outros sites (por isso a página não tem o FAQ "Existe cupom BAW de X%?"). O pop-up do
app anuncia um cupom próprio da loja e frete grátis no app a partir de R$ 399: não entram nos nossos textos. A home
mostrava em 16/11 uma campanha "PIX DAY" (até 80% OFF + 15% OFF extra no Pix, "só hoje"): campanha de um dia,
fora da página.

---

## 2. Fatos Oficiais & Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Marca de streetwear com o lema "We make noise, not fashion"; catálogo de camisetas, moletons, calças e acessórios | fato_oficial | Título, descrição e og:description da home de bawclothing.com.br | 2026-11-16 | 2027-02-16 | — |
| Empresa: WAB COMPANY, CNPJ 58.435.903/0001-85; SAC +55 (11) 94564-9626, de segunda a sexta, das 9h às 18h | fato_oficial | Rodapé do site | 2026-11-16 | 2027-02-16 | — |
| Plataforma da loja: Wake (checkout fbits) | fato_oficial | Endereços do site (`fbitsstatic.net`) | 2026-11-16 | 2027-02-16 | Página de produto em `/produto/<slug>`; carrinho em `/checkout` |
| Entrega: frete padrão por transportadoras, valor e prazo pelo CEP no checkout; o prazo conta do faturamento; pedidos de fim de semana entram no dia útil seguinte; em promoções, os prazos podem mudar; rastreio por e-mail | fato_oficial | bawclothing.com.br/entrega-e-frete | 2026-11-16 | 2027-02-16 | — |
| Trocas e devoluções: pedido pelo portal da loja, com logística reversa pelos Correios; troca só por crédito na loja, sem troca peça por peça; até 7 dias corridos (90 dias por defeito); peça sem uso, com etiqueta e na embalagem original, comprada no site; a primeira troca ou devolução tem frete grátis e as seguintes, frete do cliente; análise em até 10 dias úteis e reembolso na mesma forma de pagamento | fato_oficial | bawclothing.com.br/trocas-e-devolucoes | 2026-11-16 | 2027-02-16 | — |
| Trocas e devoluções, releitura do Job 1: "trocas exclusivamente através de crédito em conta", crédito "no valor pago pela peça" na conta do CPF da compra; reembolso "sempre na mesma forma de pagamento" (Pix: em geral até 10 dias úteis depois da confirmação; cartão: estorno na fatura); peça sem etiqueta volta por Sedex com frete do cliente; a página cita o Código de Defesa do Consumidor, sem o número do artigo | fato_oficial | bawclothing.com.br/trocas-e-devolucoes | 2026-11-16 | 2027-02-16 | Nos textos, separar troca (crédito) de devolução (reembolso) |
| Fichas de produto: medidas e composição ficam na aba "Descrição" de cada peça, com aviso de variação de até 3%; várias fichas sem descrição (camisetas da campanha, infantil, todos os tênis lidos); não há guia de tamanhos único | fato_oficial | Páginas de produto lidas pelo Job 1 ([[baw-fatos-1611]], 9.5) | 2026-11-16 | 2026-12-16 | Não generalizar modelagem nem grade |
| História da marca: fundada em 2014 em São Paulo pelos irmãos Bruno Karra e Lucas Karra; comprada pela Arezzo&Co em junho de 2021 por R$ 105 milhões; revendida pela Azzas 2154 aos fundadores em fevereiro de 2025 | fato_de_imprensa | NeoFeed, 25/02/2025 (título e linha fina lidos); FashionUnited, 26/02/2025 | 2026-11-16 | 2027-02-16 | Sempre com atribuição; valor da revenda não divulgado |
| Loja Oficial BAW no Mercado Livre: existe; o cupom não vale lá | fato_oficial | Handoff de 16/11/2026; resultado do Google (`lista.mercadolivre.com.br/baw-clothing`) | 2026-11-16 | 2026-12-16 | A redação abre a página antes de citar |
| Lojas físicas: pendente. A página `/nossas-lojas` abriu vazia duas vezes em 16/11 | pendente | bawclothing.com.br/nossas-lojas | 2026-11-16 | 2026-12-16 | Não listar endereço nem recomendar loja; o Bom Retiro é dado de imprensa e de rede social |
| Programa de fidelidade BAWPOINTS: pontos e cashback para quem se cadastra | fato_oficial | bawclothing.com.br/cashback | 2026-11-16 | 2027-02-16 | Soma com o cupom sem teste |

---

## 3. Alertas Editoriais

- Nos artigos deste parceiro, usar `affiliate: "baw"` e link relativo para `/cupons/baw`, conforme
  `docs/CONTRATO-ARTIGO-AFILIADO.md`.
- O nome da marca é "BAW Clothing" (o logo escreve "Baw®"); o domínio é `bawclothing.com.br`.
- Artigo de roupa leva o card de estilo (`styling`), pré-requisito da sessão de artigos.
- Nenhum cupom da própria loja (o do pop-up do app, campanhas de um dia) nos textos. Exceção (Bruno, 17/11/2026): o FIRSTBAW, de
  primeira compra, pode ser citado só para dizer que o BAWEMCASACOMCECILIA dá o mesmo desconto na primeira compra e vale
  também nas seguintes. Em 17/11, os dois deram o mesmo desconto no mesmo carrinho, no app (sem números: a conta do print não fecha) e no site (R$ 20,80 de
  R$ 208,00, total R$ 187,20); sites de cupom e
  respostas de IA anunciam o FIRSTBAW com 15%, o que o teste não confirmou. Nunca dizer que o nosso dá 15%; o aviso
  de frete grátis para quem finaliza no aplicativo também fica fora.
- Não escrever "sem valor mínimo" nem um percentual único de cupom mais Pix; preço "com cupom e Pix" só de carrinho
  testado.
- "A última Black Friday da BAW" é nome de campanha: entre aspas, sem interpretar.
- Dois CNPJs (rodapé e Reclame Aqui): citar os dois com a fonte, sem explicar a diferença.
- Insider, Toda Up e Cléa Store também estão na prateleira Moda: uma marca por artigo.

---

## 4. Mídia da Marca

- Logo: `/images/about/partners/baw.png` (página /sobre). Origem: `https://bawclothing.fbitsstatic.net/media/logo_200.png`
  (og:image do site), baixado em 16/11/2026, reduzido para 256x256.
- Bolinha: `/images/logos/bolinhas/baw.png`, com `background: '#000000'`. Origem:
  `https://bawclothing.fbitsstatic.net/sf/img/header/logoBawAlta.svg` (logo do topo do site), baixado em 16/11/2026;
  ajuste: o letreiro em branco, 420 px de largura num quadro transparente de 512.
- Marca-d'água: `/images/logos/watermarks/baw.webp`, do mesmo SVG, na cor das marcas-d'água (#0F1D3A).
- Print do resumo com o cupom: `/images/reviews/baw/cupom-baw-carrinho-com-cupom.webp` (do teste de 16/11;
  demonstração visual, sem data).
