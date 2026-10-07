---
parceiro: "SHEIN"
cluster_id: "shein"
modo_i18n: "paridade-completa"
idioma_fonte: "pt"
idiomas_alvo: [pt, en, es, fr, de, it, ko, ja, zh-hant, zh-hans]
fonte_tecnica: "00_Sistema/JOBS/Job-4-Conformacao-JSON.md (seção 3)"
ultima_revisao: "2026-10-07"
---

# Cluster multilíngue — SHEIN

## Regra operacional

Todo artigo da SHEIN, guia ou haul, sai nos 10 idiomas ao mesmo tempo, como uma
família de JSONs com a mesma `translationKey`. O contrato dos JSONs está na seção 3
do Job 4, e a build reprova família com idioma faltando.

O modo `liberar-por-conversao` (português primeiro, traduções só depois de conversão
comprovada) saiu em 07/10/2026, por decisão do Bruno. Não há gate de conversão: o
artigo em português não espera medição para ganhar as 9 versões.

A SHEIN não tem entrada em `src/lib/i18n/clusters/`, e família nova de artigo não
entra lá. A página da loja já existe nos 10 idiomas desde 05/10/2026 (`/cupons/shein`
e `/<locale>/coupons/shein`), servida por rota dinâmica com os textos de
`src/lib/couponTranslations.ts`. O histórico técnico está em
`docs/HANDOFF-SHEIN-I18N.md`.

## O que sai nos 10 idiomas

| Tipo | Como sai | Atenção |
|---|---|---|
| Guia (código, campanhas, como usar) | localização editorial do PT | código e campanhas são da SHEIN Brasil |
| Tabela de medidas | idem | medidas e numeração são as da SHEIN Brasil; não converter para outra numeração |
| Haul de peças recebidas | família de 10, com as mesmas peças e fotos do PT | preço em reais, tamanho comprado e disponibilidade são da SHEIN Brasil |

## Matriz atual

| Chave | Fonte PT | Idiomas | Estado |
|---|---|---:|---|
| — | — | — | nenhum artigo da SHEIN publicado; a página da loja já sai nos 10 idiomas |

Quando a primeira família sair, registrar aqui a chave, o slug da fonte em português
e a data (Job 4, seção 3, item 9).

## Regras específicas

- `4CW5Y` é **código de indicação** da SHEIN Brasil, pesquisado no aplicativo da SHEIN.
  Aparece como `4CW5Y` nas 10 versões, sem prometer percentual nem benefício que o
  `couponsData.ts` não traga. O nome do código em cada idioma é o da página da loja
  (`referral.label` em `couponTranslations.ts`).
- Fora do português, o texto avisa que o código e as campanhas são da SHEIN Brasil e
  podem não valer em outro país, como já faz a página da loja.
- Nas 10 versões: `affiliate: "shein"` e `coupon: "4CW5Y"`. A build reprova valores
  diferentes entre as versões.
- Link do `cta`, sempre com `"sponsored": true`:
  - em português, o link brasileiro do código, o `offerUrl` do cupom `shein` em
    `src/lib/couponsData.ts`;
  - nos outros 9 idiomas, exatamente o link neutro
    `https://onelink.shein.com/55/6463grgxf6ru`, o `offerUrl` de
    `COUPON_TRANSLATIONS.shein` em `src/lib/couponTranslations.ts`. Nenhum link
    brasileiro fora do português.
  - Copiar os links dos arquivos, nunca editar e nunca abrir ou clicar: o clique
    registra atribuição.
- O link para a página da loja segue o idioma do artigo: `/cupons/shein` em português
  e `/<locale>/coupons/shein` nos outros idiomas.
- URL do artigo: `/reviews/<slug>` em português e `/<locale>/reviews/<slug>` nos
  outros idiomas. Sai sozinha do `locale` do JSON; não criar `page.tsx`, hreflang nem
  entrada em `clusters/`.
- Preço (em reais), tamanhos, estoque, disponibilidade e campanhas são fatos da SHEIN
  Brasil. As traduções dizem isso de forma explícita e não convertem moeda nem
  tamanho.
- As campanhas (como "produtos selecionados" e "50% para novos usuários") têm prazo e
  mudam. Decisão do Bruno em 07/10/2026: elas ficam fora do texto dos artigos, como os
  cupons promocionais da YesStyle. O artigo manda para a página da loja, que mostra as
  vigentes, em vez de copiar percentual ou condição. Valores e datas vêm de
  `couponsData.ts`; revalidar, não copiar para esta nota.
- Nunca citar código de terceiros nem de site de cupons.
- Não acrescentar peça, preço, medida ou experiência que o PT aprovado não tem.
- Links de produto por peça num haul: decisão do Bruno em 07/10/2026. Nas 9
  traduções, o haul leva o link de cada peça, o mesmo deep link convertido do haul em
  português, copiado do arquivo. Nunca editar o link e nunca abrir nem clicar: o
  clique registra atribuição. O `cta` continua no link neutro (regra acima).
  - Ressalva: o `test:review-i18n` barra, fora do português, links do host
    `br.shein.com` e os links de oferta e de campanha do cupom em PT. Se o deep link de
    uma peça for desse host, a versão traduzida falha no build. Nesse caso, levar ao
    Bruno antes de publicar, sem mexer no teste.

## Gates adicionais

```powershell
npm run validate:content
```

Os testes de idioma (`test:review-i18n`, `test:html-lang` e `test:build-output`) e o
`test:coupon-translations`, da página da loja, já rodam no `npm run build`. O
`validate:content` não roda lá, por isso entra aqui.

À mão, antes de dar a família por pronta:

- No `<head>`: nenhum teste confere o dos artigos. No build gerado, abrir uma versão
  da família e conferir o canonical, o hreflang dos 10 idiomas e o seletor de idioma.
- Nos JSONs, sem abrir os links: o `cta` de cada versão é o do idioma (regra acima), e
  toda versão fora do português tem `hideFromPortugueseListings: true` (o
  `validate:content` só cobra a flag nas famílias da YesStyle).
- Releitura das traduções, um idioma por vez, de preferência por outro agente, como
  no item 10 da seção 3 do Job 4. Na SHEIN, conferir também o aviso da SHEIN Brasil, o
  preço em reais dito como tal e a ausência de link brasileiro fora do português.
  Registrar na nota do artigo a data da releitura e o que mudou.
