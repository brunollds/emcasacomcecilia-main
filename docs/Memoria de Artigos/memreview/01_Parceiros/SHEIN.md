---
parceiro: "SHEIN"
slug_cupom: "shein"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-01-07"
---

# Dossiê Factual: SHEIN

## 1. Dados comerciais e fonte factual

| Dado | Fonte canônica | Regra |
|---|---|---|
| Código de indicação `4CW5Y` | `referral` do cupom `shein` em `src/lib/couponsData.ts` | é código de indicação da SHEIN Brasil, pesquisado no aplicativo da SHEIN; não tratar como percentual fixo de desconto nem extrapolar benefício |
| Link comercial em português | `offerUrl` do mesmo cupom | link brasileiro ligado ao código; é o CTA das versões em português |
| Link comercial fora do português | `offerUrl` de `COUPON_TRANSLATIONS.shein` em `src/lib/couponTranslations.ts` | link neutro, sem `br.`; é o CTA das 9 traduções |
| Campanhas | `campaigns` do mesmo cupom | têm prazo e mudam; ficam fora do texto dos artigos, que mandam para a página da loja |
| Textos por idioma | `SHEIN_TRANSLATIONS` em `src/lib/couponTranslations.ts` | só texto; códigos, datas, status e links das campanhas vêm do cupom em português |

O dossiê não repete percentuais nem datas: a fonte é o arquivo, com `lastVerified` na
oferta e `verifiedAt` no código de indicação e em cada campanha. Reconferir os links e
as campanhas antes de publicar um artigo. Não conferir clicando: é link comissionado e o
clique registra atribuição.

## 2. Perfil multilíngue

- **Nota do cluster:** [[03_Memoria/Clusters-Multilingues/SHEIN]]
- **Modo:** `paridade-completa`. Guias e hauls saem nos 10 idiomas (o português e 9
  traduções), como uma família com a mesma `translationKey`. Não há gate de conversão.
- **Contrato do JSON:** seção 3 do `00_Sistema/JOBS/Job-4-Conformacao-JSON.md`.
- **Mercado dos fatos comerciais:** SHEIN Brasil. O código de indicação, as campanhas,
  o preço em reais, os tamanhos e a disponibilidade são de lá; as traduções dizem isso
  e não convertem moeda nem tamanho.
- **Link do CTA em cada idioma:** português, o link brasileiro do código; os outros 9
  idiomas, o link neutro (tabela da seção 1).
- **Link da loja:** `/cupons/shein` em português e `/<locale>/coupons/shein` nos outros.
- **Páginas da loja nos 10 idiomas:** `docs/HANDOFF-SHEIN-I18N.md`.
- **Regra de conteúdo:** não assumir preço, frete, impostos, tamanho ou disponibilidade
  de outro país sem fonte própria, e nunca citar código de terceiros.

## 3. Black Friday e regras da loja (páginas oficiais, lidas em 11/10/2026)

As páginas de ajuda da SHEIN Brasil (`br.shein.com/<nome>-a-<id>.html`) abrem sem bloqueio, mas o
texto vem no JSON da página (`articleInfo.conText`), não no HTML. Nos artigos fora do PT, nenhum link
para `br.shein.com` (o `test:review-i18n` barra o host).

| Dado | Fonte | Regra |
|---|---|---|
| Calendário: 2023 de 11/11 a 25/11 (até 80%, 85% e 90%, 48 h de frete grátis); 2024 de 21/10 a 30/11 (11.11 até 85%, 90% e 95%; Black Friday até 90% de 13 a 25/11 e 95% de 26 a 30/11); 2025 no ar em 3/11, até 30/11 (até 90% em 800 mil itens até 9/11; 95% a partir de 24/11) | imprensa com porta-voz da SHEIN (Money Times e Meio & Mensagem 2023; Marcas pelo Mundo 2024; Mercado & Consumo 2025) e post da @sheinbrasil de 24/11/2025 | histórico com o ano e o "até"; campanha de 2026 ainda não anunciada em 11/10/2026 |
| Imposto desde 13/05/2026: II 0% até US$ 50, 60% com redutor de US$ 30 acima; ICMS 17% (maioria), 18% (AP), 19% (PA), 20% (AC, AL, BA, CE, PB, PI, RN, RR, SE); base = produto + frete com descontos; subsídio de ICMS só sobre o produto; Envio Nacional fora | `tax-policy-a-3476` (23/05/2026); Lei 15.502/2026 (10/09/2026) | reconferir antes de cada atualização |
| Envio: Global de 3 a 5 dias para processar; prazo e frete na página do pedido; nome igual ao CPF; Entrega no Prazo (200 pontos ou R$ 10) | `Shipping-Info-a-280` (23/05/2026) | o valor mínimo do frete grátis vem de script e não foi lido |
| Devolução: 20 dias; itens "não devolvíveis" só em 7 dias; 1ª devolução de cada pedido grátis, depois R$ 45 | `Return-Policy-a-281` (16/09/2026) | — |
| Cupom: um da plataforma por pedido, mais o da loja do fornecedor local (máx. 2); devolução parcial gasta o cupom | `Coupon-Policy-a-1302` | — |
| Pontos: 100 = US$ 1, até 30% do valor dos produtos, não valem em vendedores locais | `bonus-point-program-a-371` (21/09/2026) | — |
| Pagamento: Pix, cartão em até 6x, boleto (3 dias), PayPal, Pagaleve; reembolso Pix em 1–3 dias úteis; imposto de importação não volta depois do envio | `Payment-Method-a-278`, `refund-a-1610` | — |

Guia: [[02_Artigos/black-friday-shein]] (família `shein-black-friday`, a primeira da SHEIN).
