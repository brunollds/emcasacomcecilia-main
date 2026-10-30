---
titulo_provisorio: "Brinde Skelt em 30/10: Trends Set e Body Cream Unexpected Day com o cupom"
seo_title: "Brinde Skelt 30/10: Trends Set e Body Cream com o cupom"
slug_sugerido: "brinde-skelt-30-outubro-cupom"
parceiro: "[[Skelt]]"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Promoção"
status: "publicado"
responsavel: "-"
proxima_acao: "em 31/10/2026: título e resposta rápida com promoção encerrada; tirar a campanha do storeBanners.ts"
bloqueado_por: "-"
data_criacao: "2026-10-29"
modo_i18n: "somente-pt"
idioma_fonte: "pt"
affiliate: "skelt"
coupon: "SKEMCASACOMCECILIA"
---

# Briefing de Pauta: brinde da Skelt em 30/10 com o cupom

Pedido do Bruno em 29/10/2026, a partir do e-mail "Skelt Cosmetics Creators" recebido no mesmo dia (texto colado na sessão de pautas). Urgente: a promoção vale só em 30/10/2026, por 24 horas. O artigo precisa estar no ar antes ou no começo da manhã de 30/10, com deploy autorizado pelo Bruno.

## 1. O que a Skelt informou (e-mail aos creators, 29/10/2026)

| Fato | Texto do e-mail |
|---|---|
| Prazo | "Somente 24h · 30/10" |
| Brinde 1 (edição limitada) | Trends Set: 3 fragrâncias de 15 ml (Mystic Bloom, Urban Beat e Unexpected Day), em compras acima de R$ 219 |
| Brinde 2 | Body Cream Unexpected Day, em compras acima de R$ 249 |
| Acumula | "Acumulativo": acima de R$ 249, quem comprar leva os dois brindes |
| Condição | "Os brindes valem somente com o seu cupom de creator" (o nosso é o SKEMCASACOMCECILIA) |

O e-mail **não diz** se os R$ 219 e os R$ 249 contam antes ou depois do desconto do cupom e do Pix, nem se o frete entra. O texto não afirma nenhum dos dois.

Já confirmado pelo site (dossiê e `couponsData.ts`): o SKEMCASACOMCECILIA dá 10% em todo o site, soma com as promoções e com os 5% do Pix (teste de 21/10/2026). O Body Cream Unexpected Day custa R$ 99,90 avulso, 200 g (API de 29/10, `hidratante-corporal-skelt-qual-fragrancia-fatos-2910.md`).

## 2. Função da pauta

Leitor que já pensa em comprar na Skelt e quer saber o que precisa fazer para levar os brindes. A resposta é curta: o prazo, as duas faixas, que só vale com o cupom e como montar o pedido para não ficar abaixo da faixa.

## 3. Esqueleto (H2)

1. **Resposta rápida:** em 30/10, quem usa o SKEMCASACOMCECILIA ganha o Trends Set acima de R$ 219 e também o Body Cream Unexpected Day acima de R$ 249, só nesse dia.
2. **O que vem em cada brinde:** Trends Set (3 × 15 ml: Mystic Bloom, Urban Beat, Unexpected Day; "edição limitada", segundo a Skelt) e o Body Cream Unexpected Day (200 g, R$ 99,90 avulso no site em 29/10, conta como referência do valor do brinde). Link para [[hidratante-corporal-skelt-qual-fragrancia]] e [[body-splash-skelt-qual-escolher]] para quem quer conhecer as fragrâncias.
3. **Como garantir os brindes:** a Skelt não disse se a faixa é antes ou depois do desconto. Para não depender disso, monte o pedido com folga. Contas nossas, marcadas: para passar de R$ 219 já com os 10% do cupom, o carrinho precisa de R$ 243,34 ou mais (com o Pix também: R$ 256,15). Para R$ 249: R$ 276,67 (com o Pix: R$ 291,23). Exemplo: 3 Body Cream avulsos somam R$ 299,70 e passam das duas faixas antes e depois do cupom e do Pix (R$ 256,24). Conferir o resumo do pedido antes de pagar.
4. **O que montar com R$ 250 a R$ 300** (opcional, curto): 2 ou 3 sugestões de pedido com produtos da loja, com o link de cada um; preços relidos no dia.
5. **Perguntas frequentes:** "O brinde vale sem o cupom?" (não, segundo a Skelt); "Os dois brindes acumulam?" (sim, acima de R$ 249); "Até quando?" (só 30/10/2026); "O cupom soma com o Pix?" (sim, teste de 21/10).

## 4. Riscos

- **Prazo:** depois de 30/10, o artigo vira "promoção encerrada" (a sessão de artigos edita em 31/10: resposta rápida e título com "encerrada", sem apagar). Sem data nos textos de cupom fora deste artigo (regra do mês vigente).
- **Brinde em falta:** "edição limitada" é palavra da Skelt; o texto não promete estoque.
- **Faixa antes ou depois do desconto:** não afirmar. O conselho de folga resolve para o leitor.
- Sem alegação de pele. Ninguém do site usou os brindes.

## 5. Banner (desenho para a sessão de artigos; PR em `src/` vai à revisão da sessão "Redesenho do site")

O banner de campanha atual (`src/lib/storeBanners.ts`) não cita o código da loja e leva à loja com `rel` sponsored. Esta promoção só vale com o cupom, e o banner sem o código engana o leitor. Decisão do Bruno: **banner só se levar ao artigo**. Desenho:
- campanha `skelt-brinde-30-10`, `affiliate: "skelt"`, `startsAt: "2026-10-30T00:00:00-03:00"`, `endsAt: "2026-10-30T23:59:59-03:00"`;
- o link é o do artigo (`/reviews/brinde-skelt-30-outubro-cupom`), interno, sem `rel` sponsored; o texto do banner continua sem o código (o artigo explica o cupom);
- não aparece no próprio artigo da promoção;
- os testes (`test:store-banners` e `test:build-output`) hoje exigem link de loja e sponsored: o PR precisa aceitar o link interno só para esse caso, sem afrouxar a regra das outras campanhas.

## Decisões do Bruno (29/10/2026)

1. Fazer o artigo da promoção de 30/10.
2. Faixa de R$ 219 e R$ 249: o Bruno imagina que seja antes do cupom, mas o e-mail não diz. O texto não afirma; usa o conselho de folga com as contas da seção 3.
3. Banner: a regra feita na SHEIN (banner sem código, link para a loja) não serve aqui, porque a promoção só vale com o cupom. O banner só entra se levar ao artigo (seção 5).
4. Links de produto com a UTM da parceria: `https://www.skelt.com.br/<produto>/p?utm_source=creators&utm_medium=SKEMCASACOMCECILIA&utm_campaign=inbazz`.

## Publicação (30/10/2026)
- No ar em 30/10/2026 01:25 UTC (29/10, 22h25 em Brasília): PR #362, release `27149b3e`, id 716 (PT).
- O texto não diz se a faixa conta antes ou depois do cupom; usa o conselho de folga e as contas da seção 3, marcadas como conta nossa. Preços relidos em 29/10: Body Cream Unexpected Day R$ 99,90; a loja vende o Kit Miniaturas Trends Set por R$ 99,90. Aviso do Kit Radiante (R$ 252,20 no cartão, R$ 226,98 com o cupom, abaixo de R$ 249). Três pedidos de R$ 294,86 a R$ 298,01. Imagens: capa e 6 fotos das fichas.
- Banner `skelt-brinde-30-10` (`src/lib/storeBanners.ts`): 30/10 00:00 a 23:59, link interno para o artigo, sem sponsored, sem o código e fora do próprio artigo. Como o deploy saiu antes da meia-noite, o banner vai no payload e o navegador o mostra a partir das 00:00 (`CampaignWindow`). Revisado pela sessão "Redesenho do site".
- Pendente em 31/10/2026: "promoção encerrada" no título e na resposta rápida (sem apagar) e tirar a campanha do `storeBanners.ts`. Follow-up: o clique no banner mede `outbound_link_click`; separar num evento interno.
