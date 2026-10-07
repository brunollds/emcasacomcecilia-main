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
