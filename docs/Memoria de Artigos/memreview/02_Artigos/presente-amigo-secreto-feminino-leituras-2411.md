# Leituras do NT1: Barbour's e Skelt para o amigo secreto feminino (24/11/2026)

Base de [[presente-amigo-secreto-feminino]]. Leitura pública, sem login, sem finalizar compra, sem link de afiliado. CEP de teste 01310-100 (sem dado pessoal). Preço: o do dia, sem código. O código não foi testado no carrinho nesta leitura; a porcentagem vem do dossiê e do `couponsData.ts`.

## Como foi lido

- **Barbour's** (thebarboursbeauty.com.br, Shopify): catálogo por `/products.json?limit=250&page=1..2` (260 produtos, 162 com variante disponível). Frete: `/cart/add.js` e `/cart/shipping_rates.json` com CEP 01310-100 devolveram lista vazia, nos dois formatos de endereço testados. Carrinho de teste criado só na API (um roll-on), sem checkout. **Frete: [PENDENTE: navegador].**
- **Skelt** (skelt.com.br, VTEX): catálogo pela busca pública `/api/catalog_system/pub/products/search/` (105 produtos). Frete: simulação pública `/api/checkout/pub/orderForms/simulation`, sem código, CEP 01310-100.
- **Océane** e **Simple Organic**: não lidas. Motivo na seção "Lojas fora", no briefing.

## Barbour's: itens que cabem nas faixas (preço do dia, disponíveis em 24/11)

Riscado da loja não usado: o riscado da Barbour's é alto demais para ser preço de tabela (ex.: o kit My Sweet Delight de R$ 79,90 aparece riscado a R$ 199,90; o roll-on de R$ 14,90 aparece riscado a R$ 39,90). Ver a pergunta 1 do briefing.

| Item (handle) | Preço do dia | Riscado (só registro) | Faixa |
|---|---|---|---|
| Desodorante Antitranspirante Roll-On Tropic Sun (`desodorante-antitranspirante-roll-on-tropic-sun`) | R$ 14,90 | R$ 39,90 | até 50, reserva (desodorante, não é presente típico) |
| Perfume para cabelo My Sweet Delight / finalizador termoativo (`perfume-para-cabelo-delight-finalizador-termoativo-ref-olfat`) | R$ 34,90 | n/d | até 50 |
| Body Splash My Sweet Delight Desodorante Colônia 200ml (`body-splash-delight-deo-colonia-6947ecad195b8`) | R$ 39,90 | R$ 69,90 | até 50 |
| Essential Body Cream My Sweet Delight Hidratante Desodorante Corporal 230g | R$ 49,90 | n/d | até 50 |
| Kit Charm Rose Bloom e Body Splash My Sweet Delight (`kit-charm-rose-bloom-e-body-splash-my-sweet-delight`) | R$ 79,90 | R$ 109,90 | até 100 |
| Kit My Sweet Delight - Body Splash e Body Cream (`kit-my-sweet-delight-body-splash-e-body-cream`) | R$ 79,90 | R$ 199,90 | até 100 |
| Necessaire + Perfume + Body My Sweet Delight (`necessaire-perfume-body-my-sweet-delight`) | R$ 109,90 | n/d | até 150 |
| Kit - Golden Glow Iluminador Hidratante e Body Splash My Sweet Delight (`kit-golden-glow-iluminador-hidratante-body-splash-my`; título cortado na leitura, conferir o nome completo no navegador) | R$ 139,00 | R$ 199,90 | até 150 |
| Kit My Sweet Delight - Body Splash, Body Cream e Óleo de Banho (`cheirosas-e-hidratadas`) | R$ 149,90 | R$ 209,70 | até 150 |

Fora do briefing, por escolha: os kits "Feliz no Simples by Theodoro" (linha assinada por outra pessoa, fora do foco deste guia) e os kits de 3 e 4 body splashes (acima de R$ 99,90, com a escolha por fragrância no guia próprio).

Esgotados no dia (não entram): a maior parte das linhas Verão Glow, Charm Warm Vanilla, Milky Splash, Firm Glow, Bronze Up e Bosy Splash, além de Gotas Autobronzeadoras. Não escrever número de estoque.

## Skelt: itens que cabem nas faixas (preço do dia, simulação pública, CEP 01310-100)

Preço de tabela = `ListPrice` do catálogo (preço cheio da loja fora da campanha, igual ao de 21/10 no dossiê). Preço do dia = `sellingPrice` da simulação, sem código.

| Item (linkText) | Preço do dia | Tabela | Faixa |
|---|---|---|---|
| Creme para Mãos (Velvet Milano, Hidden Flowers ou Amalfi Sunset) (`creme-para-maos-velvet-milano`, `creme-para-maos-hidden-flowers`) | R$ 27,96 | R$ 32,90 | até 50 |
| Body Splash Pink Sands (`body-splash-pink-sands`) | R$ 59,94 | R$ 99,90 | até 100 |
| Body Cream Velvet Milano (`hidratante-corporal-velvet-milano`) | R$ 69,93 | R$ 99,90 | até 100 |
| Duo Hidden Flowers: Body Cream + Creme para Mãos (`duohiddenflowers-bodycream-cremeparamaos`) | R$ 104,30 | R$ 130,37 | até 150 |

Excluídos da lista de presente: autobronzeadores, luva aplicadora, removedor, gotas, protetor com bronzeador, iluminador com FPS, kits de autobronzeador (Kit Iniciante, Kit Expert). Os kits de autobronzeador têm efeito "bronzeado", que não entra num presente sem texto de efeito. Ficou fora também o combo Perfume para Cabelos + Body Splash + Body Cream (R$ 239,78), acima de R$ 150.

## Frete e prazo

- **Barbour's, política** (central de ajuda lida em 18/11 no dossiê, não relida hoje): frete grátis acima de R$ 119 em SP; R$ 149 em ES, RJ e MG; R$ 169 no Sul e no Centro-Oeste; R$ 199 no Nordeste; R$ 259 no Norte. Prazo médio de 7 a 10 dias úteis. O dossiê diz que não há regra sobre se o mínimo conta antes ou depois do cupom: **base não confirmada**. Valor do frete abaixo do mínimo: **[PENDENTE: navegador]**.
- **Skelt, política** (lida em 22/11 no dossiê): frete grátis sem mínimo no Sul, Sudeste e Centro-Oeste e em 12 cidades (entre elas São Paulo); R$ 199 no Norte e Nordeste; sobre o valor final.
- **Skelt, simulação de hoje, sem código, CEP 01310-100 (Av. Paulista, SP)**: o frete mais barato saiu a **R$ 10,59** (DHL Econômica, 4 dias úteis) para o creme de mãos (R$ 27,96) e para o body splash (R$ 59,94) e para o body cream (R$ 69,93). Para o duo de R$ 104,30, R$ 11,39. **Divergência**: a política lista São Paulo como cidade sem mínimo, e a simulação cobra frete no CEP da capital. Não afirmar frete grátis em SP até reler no navegador. **[PENDENTE: navegador]**.

## Código

- **Barbour's, CECILIALINHARES, 10%** (dossiê, teste de 18/11, no carrinho pelo checkout `seguro.`): kit de R$ 209,70 por R$ 109,90 saiu R$ 98,91 com Descontos de −R$ 10,99. Hoje: a conta de 10% sobre o preço do dia está em "com o código", não testada no carrinho nesta leitura.
- **Skelt, SKEMCASACOMCECILIA, 10%** (dossiê, teste de 21/10, cupom sobre preço já em promoção; um cupom por pedido). Mesma ressalva.

## Trocas

- **Barbour's**: desistência em até 7 dias corridos depois do recebimento, com reembolso no cartão ou depósito no Pix; trocas pelo portal `thebarboursbeauty.troque.app.br`. Troca de presente (quem ganhou troca sem nota?): **não consta no dossiê. [PENDENTE: navegador]**.
- **Skelt**: nenhuma regra de troca no dossiê. **[PENDENTE: navegador]**, a política de troca e de presente.

## Lojas fora desta leitura (NT1)

- **Océane**: fora. OC9 (kits de presente da Océane por faixa de preço, mesmo recorte de make e skincare) está aprovada e em redação. Repetir a loja aqui competiria com ela. Ligação: link para OC9 quando ela sair.
- **Simple Organic**: fora. Kit de skincare para presente (SO7, `kit-skincare-presente-simple-organic`, no ar desde 10/11) já é o guia de kit da loja. Ligação: link para SO7.
- **Gocase**: não lida. `products.json` e a busca VTEX dão 404, o sitemap dá 404, a home traz pouco preço no HTML e a página do produto responde 302. **[PENDENTE: navegador]**. Só entra se o navegador confirmar item nas faixas.
- **La Ganexa**: doces, sem item feminino específico. Fica para o NT2 (unissex).

## Itens lidos, com o aviso de que não são preço de hoje

- Nenhuma leitura de 11/11 foi usada como preço. O IL2 leu Insider, Max, Dr. Peanut e Let's Eat It; nenhuma delas entra no NT1.
