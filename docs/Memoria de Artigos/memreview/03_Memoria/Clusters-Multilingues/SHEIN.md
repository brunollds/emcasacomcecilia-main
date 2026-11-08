---
parceiro: "SHEIN"
cluster_id: "shein"
modo_i18n: "paridade-completa"
idioma_fonte: "pt"
idiomas_alvo: [pt, en, es, fr, de, it, ko, ja, zh-hant, zh-hans]
fonte_tecnica: "00_Sistema/JOBS/Job-4-Conformacao-JSON.md (seção 3)"
ultima_revisao: "2026-11-04"
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
| Guia (código, campanhas, como usar, compra, tamanho) | localização editorial do PT | código e campanhas valem em todo idioma, sem aviso de país; preço em reais, frete, imposto e Envio Nacional só no PT |
| Tabela de medidas | idem | as medidas da página de cada peça, em cm, sem converter; a letra brasileira (P, M, G) e a tabela do vendedor do Envio Nacional só no PT |
| Haul de peças recebidas | família de 10, com as mesmas peças e fotos do PT | preço em reais, frete e imposto só no PT; as traduções não convertem moeda nem tamanho |
| Editorial e comparativo (confiança, X ou Y) | núcleo igual + bloco do mercado do idioma (decisão A do Bruno, 12/10/2026) | os fatos de mercado vêm só do site da SHEIN daquele mercado; nada do Brasil; o que não foi lido, o texto diz que não leu |

## Matriz atual

| Chave | Fonte PT | Idiomas | Estado |
|---|---|---:|---|
| `shein-black-friday` | [[02_Artigos/black-friday-shein]] | 10/10 | publicado em 11/10/2026; a primeira família da SHEIN |
| `shein-referral-code` | [[02_Artigos/codigo-de-indicacao-shein]] | 10/10 | publicado em 13/10/2026 (#73); as traduções não trazem o programa antigo nem o R$ 10 |
| `shein-trust` | [[02_Artigos/shein-e-confiavel]] | 10/10 | publicado em 13/10/2026 (#73); núcleo + bloco de mercado, capa com o site de cada mercado |
| `shein-vs-shopee-temu` | [[02_Artigos/shein-ou-shopee-temu]] | 10/10 | publicado em 13/10/2026 (#73); núcleo + bloco de mercado, com o concorrente de cada idioma |
| `shein-11-11` | [[02_Artigos/shein-11-11-selecao-da-cecilia]] | 10/10 | publicado em 28/10/2026 (#339 e #340, ids 640–649) |
| `shein-reputation` | [[02_Artigos/shein-reclame-aqui-nota-reputacao]] | 10/10 | publicado em 29/10/2026 (#348, ids 696–705) |
| `shein-vestido-festa` | [[02_Artigos/vestido-de-festa-shein]] | 10/10 | publicado em 30/10/2026 (#379, ids 761–770); a nota do artigo ainda está como `pauta-aprovada` |
| `shein-vale-a-pena` | [[02_Artigos/shein-vale-a-pena]] | 10/10 | Job 4 em 04/11/2026 (ids 794–803); 8 capítulos fora do PT, sem os 3 do Brasil |
| `shein-tamanho` | [[02_Artigos/tamanho-shein-brasil]] | 10/10 | Job 4 em 04/11/2026 (ids 804–813); 9 capítulos fora do PT, sem o do Envio Nacional; o slug `tamanho-shein-brasil` é só do PT |

Cada família nova entra aqui com a chave, o slug da fonte em português e a data (Job 4,
seção 3, item 9).

## Regras específicas

- `4CW5Y` é **código de indicação** da SHEIN, não é cupom de checkout e não soma. **Dá
  desconto, sim** (atualizado em 07/11/2026, #716 a #720; antes: "não dá desconto"): pelo
  link do botão, ou copiando o código e pesquisando no app ou no site, abre uma página da
  SHEIN com seleção de produtos, promoções e descontos. Quanto e em quais peças, quem
  decide é a SHEIN.
  Aparece como `4CW5Y` nas 10 versões, sem percentual nem valor, sem prometer desconto em
  toda compra e sem "só no app". O nome do código em cada idioma é o da página da loja
  (`referral.label` em `couponTranslations.ts`).
- A SHEIN é plataforma global: nenhum texto diz "SHEIN Brasil", e fora do português o
  código e as campanhas não levam aviso de país, porque o link e o código levam o
  visitante à loja da região dele (regra do Bruno de 02/11). O aviso de país das
  traduções saiu nessa data.
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
- Preço em reais, frete, imposto, Envio Nacional e a letra brasileira dos tamanhos são
  fatos do Brasil e ficam só no português (`[só PT]` no rascunho). As traduções não
  convertem moeda nem tamanho e não acrescentam fato de outro país sem fonte própria.
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
  - Desde 02/11 o `br.shein.com` vale em todo idioma: a SHEIN está em
    `INTERNATIONAL_STORES` (`src/lib/storeBanners.ts`), e o `test:review-i18n` não barra
    mais esse host fora do português.
- Foto com link de produto (`href` da imagem) só em capítulo que existe nas 10 versões: o
  `test:review-i18n` exige o mesmo `href`, foto a foto, em toda a família, e capítulo
  `[só PT]` com foto linkada quebra a conferência (lição do `shein-vale-a-pena`, 04/11). O
  link da peça vai no texto ou na tabela.

## Gates adicionais

```powershell
npm run validate:content
```

Os testes de idioma (`test:review-i18n`, `test:html-lang` e `test:build-output`) e o
`test:coupon-translations`, da página da loja, já rodam no `npm run build`. O
`validate:content` não roda lá, por isso entra aqui.

À mão, antes de dar a família por pronta:

- Seletor de idioma: no build gerado, abrir uma versão da família e conferir. O
  canonical e o hreflang dos 10 idiomas o `test:build-output` já confere em todo
  artigo de família.
- Nos JSONs, sem abrir os links: o `cta` de cada versão é o do idioma (regra acima), e
  toda versão fora do português tem `hideFromPortugueseListings: true` (o
  `validate:content` só cobra a flag nas famílias da YesStyle).
- Releitura das traduções, um idioma por vez, de preferência por outro agente, como
  no item 10 da seção 3 do Job 4. Na SHEIN, conferir também que nenhum texto fala em "SHEIN
  Brasil" nem em país, que nenhum fato do Brasil (preço em reais, frete, imposto, Envio
  Nacional, letra brasileira dos tamanhos) passou para a tradução, que o 4CW5Y tem o nome
  do `referralCodeLabel` do idioma e que o `cta` fora do português é o link neutro.
  Registrar na nota do artigo a data da releitura e o que mudou.
