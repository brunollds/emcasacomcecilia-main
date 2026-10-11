---
parceiro: "Magalu"
slug_cupom: "magalu"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-01-10"
---

# Dossiê Factual: Magalu

Parceria pelo programa Influenciador Magalu (antigo Magazine Você), da Magazine Luiza S/A. A loja
da Cecília é `magazinevoce.com.br/magazineemcasacomcecilia/`: quem vende, cobra, entrega e faz o
pós-venda é o Magalu, com a conta Magalu de sempre. Existem a página `/cupons/magalu` e o guia
`cupom-magalu-em-casa-com-cecilia` (17/07/2026, revisado em 01/10/2026). Dossiê aberto em
10/10/2026, com a pauta da Black Friday.

---

## 1. Dados Comerciais & Códigos (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Dez códigos da Cecília, de `10EMCASACOMCECILIA` (R$ 10 OFF a partir de R$ 499,90) a `100EMCASACOMCECILIA` (R$ 100 OFF a partir de R$ 4.999,90), de R$ 10 em R$ 10 a cada R$ 500 | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug `magalu`, `tiers`), `lastVerified` 2026-10-01 | 2026-10-10 | 2026-11-10 | Só pelo navegador, na loja Magazine Você da Cecília (não no app); só itens vendidos e entregues pelo Magalu; desconto só nos produtos, não no frete | Alta |
| Os códigos valem sobre o preço de Black Friday e não somam com outro cupom | condicao_comercial_volatil | Bruno, 10/10/2026 | 2026-10-10 | 2026-11-10 | Diverge do texto publicado: o guia do cupom e a `/cupons/magalu` dizem que, "em regra", o código não acumula com outras promoções | Alta |
| Desconto da Cecília sai da comissão dela | condicao_comercial_volatil | `couponsData.ts` (FAQ da comissão) | 2026-10-10 | 2027-01-10 | Já publicado na `/cupons/magalu` | Alta |
| Desconto no Pix por produto, não fixo: de 0% a 12% nas listas de 10/10 (5% a 7% na maioria dos eletrodomésticos vendidos pelo Magalu) | condicao_comercial_volatil | Listas de eletrodomésticos e eletroportáteis da loja da Cecília (dados da página), 10/10/2026 | 2026-10-10 | 2026-11-10 | O preço de cartão em até 10x sem juros é outro valor; o "de" riscado costuma ser bem maior que os dois | Alta |
| Cupons do próprio Magalu na página do produto, inclusive em itens vendidos pelo Magalu: R$ 50, R$ 175 e R$ 225 OFF em eletrodomésticos em 10/10 ("copie o cupom e cole na revisão") | condicao_comercial_volatil | Página da Geladeira Electrolux DC35A 260 L (R$ 225 OFF; a faixa da Cecília dava R$ 40) e lista de eletrodomésticos, 10/10/2026 | 2026-10-10 | 2026-11-10 | Vale um cupom por pedido. Bruno, 10/10: a vantagem do código da Cecília é valer quando não há cupom ou quando o da loja não vale no que a pessoa quer. Nunca citar os códigos do Magalu nem de vendedores | Alta |
| O código da Cecília vale com todas as formas de pagamento, inclusive no Pix | condicao_comercial_volatil | Bruno, 10/10/2026 | 2026-10-10 | 2026-11-10 | Se o mínimo da faixa conta pelo preço no cartão ou no Pix não foi confirmado | Alta |
| Preços em 10/10/2026, sem CEP (cartão sem juros / Pix): geladeira Electrolux DC35A 260 L 2.298,40 / 2.160,50; Consul CRM44MBBNA 377 L 2.727,54 / 2.591,16; Electrolux IF44 400 L 2.902,15 / 2.699,00; Brastemp BRM62AK 512 L 3.788,42 / 3.599,00; lavadora Electrolux LEC15 15 kg 2.104,21 / 1.999,00; Brastemp BWJ14ABANA 14 kg 1.980,47 / 1.881,45; micro-ondas Electrolux MEO44 34 L 649,00 / 616,55; fogão Esmaltec Ideal Pop 4120 598,12 / 556,25; Consul CFO4NARUNA 1.325,00 / 1.258,75; air fryer Mondial AFN-40-BI 249,00 / 249,00; Mondial AFON-12L-BI 546,32 / 519,00; panela de pressão elétrica digital Mondial 5 L 398,95 / 379,00; aspirador Electrolux STK14 198,95 / 189,00 | condicao_comercial_volatil | Dados das listas da loja da Cecília ("Vendido por: Magalu", mais vendidos), 10/10/2026 | 2026-10-10 | 2026-11-10 | O preço muda com o CEP (a loja oferece "ofertas para minha região") | Alta |
| Black Friday 2026 em 27/11, "Black das Blacks", com esquenta já em andamento, "semana especial" e Cyber Monday | condicao_comercial_volatil | `magazineluiza.com.br/lp/black-friday` (texto e FAQ), 10/10/2026 | 2026-10-10 | 2026-11-10 | — | Alta |
| Ofertas antecipadas de Black Friday no app ("ofertas que não voltam mais baratas no dia", uma por dia); 11.11 com preços de Black Friday no app; Liquidação do Dia do Pagamento de 05 a 06/11 no app e nas lojas, até 60% e frete grátis; "Faz um 21": até 21x sem juros durante o mês; notificações do app ("Black Push") | condicao_comercial_volatil | `magazineluiza.com.br/lp/black-friday`, 10/10/2026 | 2026-10-10 | 2026-11-10 | O que é "no app" não aceita os códigos da Cecília | Alta |
| Frete grátis a partir de R$ 99 (R$ 799 em móveis, R$ 49 em mercado), no SuperApp; fora a região Norte e o marketplace | condicao_comercial_volatil | `especiais.magazineluiza.com.br/app-webviews/regra-frete-gratis/` (sem data, lido pela pesquisa de 10/10) | 2026-10-10 | 2026-11-10 | Não confirmado se vale na loja Magazine Você pelo navegador. A FAQ da Black Friday diz que o frete depende do peso, do tamanho e da distância do centro de distribuição | Média |
| Retirada na loja: o Bruno diz que costuma ser grátis; o regulamento diz só itens vendidos pelo Magalu, 15 dias corridos para retirar depois do e-mail, documento com foto, terceiro indicado no checkout, disponibilidade por produto e cidade | condicao_comercial_volatil | Bruno, 10/10/2026; regulamento em `assets.mlcdn.com.br` (sem data); FAQ da Black Friday ("compra pelo app ou site e retira na loja") | 2026-10-10 | 2026-11-10 | Custo não aparece no regulamento: conferir no CEP | Média |

---

## 2. Fatos Oficiais & Dados de Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Loja Magazine Você: domínio da Magalu desde 2011; Magazine Luiza S/A, CNPJ 47.960.950/0001-21; o rodapé da loja traz o CD de Louveira/SP (CNPJ 47.960.950/0449-27) | fato_oficial | `couponsData.ts` e rodapé da loja, 10/10/2026 | 2026-10-10 | 2027-01-10 | — |
| Cada item mostra o vendedor: `magazineluiza` (1P) ou lojista do marketplace (3P). O selo "Full" é só entrega do Magalu: o item pode ser de outro vendedor | fato_oficial | Dados das listas da loja, 10/10/2026 | 2026-10-10 | 2027-01-10 | Nos 60 primeiros de eletroportáteis, 11 eram do Magalu; nos 60 primeiros de móveis, nenhum. O filtro "Vendido por: Magalu" de móveis tinha 1.305 itens |
| Preços da internet podem ser diferentes nas lojas físicas; até 5 peças de cada produto por cliente; vale o preço da sacola | fato_oficial | Rodapé da `lp/black-friday` e da loja, 10/10/2026 | 2026-10-10 | 2027-01-10 | — |
| Devolução em até 7 dias corridos do recebimento (CDC, art. 49); produtos de lojistas parceiros não são trocados, só cancelados; troca ou cancelamento em "Meus pedidos" > "Quero trocar ou cancelar": troca, voucher MagaluPay em até 24 h ou estorno na forma de pagamento | fato_oficial | Central de atendimento, "Como funciona a Política de troca e devolução?" e "Como solicitar troca ou cancelamento?" | 2026-10-10 | 2027-01-10 | Lidas no navegador (o curl é bloqueado) |
| Troca na loja física só de produtos vendidos e entregues pelo Magalu e pequenos, com nota fiscal e documento com foto; preços do site não valem nas lojas | fato_oficial | Central, "Posso trocar um pedido de site na loja física?" | 2026-10-10 | 2027-01-10 | — |
| Entrega convencional, Retira loja e entrega agendada aparecem pelo CEP na página do produto; nem todo produto tem retirada; o frete depende do total, da distância e do transporte; o prazo conta da confirmação do pagamento; a pessoa que retira não muda depois da compra | fato_oficial | Central, "Quais são as opções de entrega disponíveis?", "Qual é a política de frete?", "Qual o prazo de entrega do meu pedido?", "Posso alterar a pessoa que vai retirar meu produto na loja?" | 2026-10-10 | 2027-01-10 | Frete grátis de banner: confirmar com o CEP na página do produto ou na sacola (texto do Magalu enviado pelo Bruno em 10/10) |
| Arrependimento em 7 dias na compra pela internet (CDC, art. 49) | fato_oficial | Procon-SP citado pelo JB (05/10/2026) | 2026-10-10 | 2027-01-10 | — |

---

## 3. Reputação & Dados Públicos

| Dado / Indicador | Tipo | Fonte | Consultado Em | Rever Até | Conclusão |
|---|---|---|---|---|---|
| Black Friday 2023 em 24/11, com promoções o mês todo ("Black das Blacks") | dado_externo | Money Times (08/11/2023), Suno (14/11/2023) | 2026-10-10 | 2027-01-10 | Pode citar com a fonte |
| 2024: "Black Push" no app antes da Black Friday; "a melhor Black Friday da história do Magalu", segundo Fabrício Garcia | dado_externo | Canaltech (26/11/2024), Times Brasil (02/12/2024) | 2026-10-10 | 2027-01-10 | Pode citar com a fonte |
| 2025: "Black das Blacks" de 26/10 a 30/11; R$ 150 milhões em descontos e frete em novembro, segundo Ricardo Garrido | dado_externo | Canaltech (22/10/2025, publieditorial), Viva/Broadcast (28/10/2025) | 2026-10-10 | 2027-01-10 | As datas vêm de publieditorial do próprio Magalu |
| Reclame Aqui | dado_externo | Página bloqueada para leitura; números de terceiros em conflito | 2026-10-10 | — | Sem nota no artigo até ler o Reclame Aqui direto |

---

## 4. Alertas Editoriais

- Nunca citar os códigos do Magalu ou de vendedores que aparecem nas páginas (o rótulo de cupom traz o
  código): o artigo diz só que o produto pode mostrar um cupom do Magalu e que vale um por pedido.
- O código da Cecília é por faixa de valor e em reais. Em produto que mostra cupom do Magalu maior que a
  faixa, o texto manda comparar, sem esconder que o do Magalu pode valer mais.
- Não afirmar que a compra com o cupom do Magalu gera comissão para a Cecília: não há fonte.
- Marketplace e "Full" de outro vendedor ficam fora do código. Em móveis, a maior parte da vitrine é
  marketplace.
- Não chamar o Magazine Você de "site do Magalu": é a loja da Cecília dentro do programa oficial.

---

## 5. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/magalu.webp` | Logo do Magalu | Parceiros, `/cupons/magalu` | Identificação da marca parceira, no contexto da parceria |
| Avatar da Lu (capa do guia da Black Friday) | O Bruno liberou em 10/10/2026. Na `lp/black-friday`, a Lu aparece só em 75 a 90 px (`lu-logo-avatar.png`, `lu-explains-new.png`). O download dos banners e do avatar respondeu 403 (proteção contra robôs), e isso não se contorna | Capa de `black-friday-magalu`, com imagem salva pelo Bruno | Personagem oficial do Magalu, no contexto da parceria |

---

## 6. Dores Mapeadas

- "Black Friday Magalu: quando começa e vai até quando?" (autocomplete de 10/10/2026)
- "Cupom Magalu Black Friday" e "cupom Magalu app Black Friday" (autocomplete de 10/10/2026)
- "Black Friday Magalu geladeira" e "black friday magalu air fryer" (autocomplete de 10/10/2026)
- "Magalu retira na loja" e "compra e retira na loja" (autocomplete de 10/10/2026)

---

## 7. Artigos do Cluster

- `cupom-magalu-em-casa-com-cecilia` (publicado em 17/07/2026, revisado em 01/10/2026)
- [[black-friday-magalu]] (em revisão desde 10/10/2026)
