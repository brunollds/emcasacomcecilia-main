---
parceiro: "YesStyle"
cluster_id: "yesstyle"
modo_i18n: "paridade-completa"
idioma_fonte: "pt"
idiomas_alvo: [pt, en, es, fr, de, it, ko, ja, zh-hant, zh-hans, ar]
fonte_tecnica: "00_Sistema/JOBS/Job-4-Conformacao-JSON.md (seção 3)"
ultima_revisao: "2026-11-25"
---

# Cluster multilíngue — YesStyle

## Regra operacional

Todo artigo da YesStyle sai nos 11 idiomas (os 10 de sempre mais o árabe, `ar`), como uma família de JSONs com a mesma
`translationKey`. O contrato dos JSONs está na seção 3 do Job 4, e a build reprova
família com idioma faltando.

`src/lib/i18n/clusters/yesstyle.ts` não é o registro dos artigos: ele guarda os
quatro artigos fixos que a página da loja mostra (código de recompensa, guia de
cupons, confiança e K-beauty). Família nova não entra nele; a
`yesstyle-skincare-30` não está lá.

## Matriz atual

| Chave | Fonte PT | Idiomas | Estado |
|---|---|---:|---|
| `yesstyle-reward-code` | `codigo-cecilia010-yesstyle-como-usar` | 11/11 | publicado |
| `yesstyle-coupon-guide` | `como-encontrar-cupons-yesstyle-validos` | 11/11 | publicado |
| `yesstyle-trust` | `yesstyle-e-confiavel` | 11/11 | publicado |
| `yesstyle-kbeauty` | [[02_Artigos/k-beauty-o-que-e-onde-comprar]] | 11/11 | publicado |
| `yesstyle-skincare-30` | `skincare-coreano-30-anos-rotina-iniciante-yesstyle` | 11/11 | publicado em 28/09/2026 |
| `yesstyle-black-friday` | [[02_Artigos/black-friday-yesstyle]] | 11/11 | publicado em 11/10/2026 |
| `yesstyle-shipping-by-country` | [[02_Artigos/yesstyle-entrega-por-pais]] | 11/11 | publicado em 13/10/2026 (fase 5, PR #77); núcleo + bloco de mercado, cada versão com os países do idioma |
| `yesstyle-vs-alternatives` | [[02_Artigos/yesstyle-ou-stylevana]] | 11/11 | publicado em 13/10/2026 (fase 5, PR #77); núcleo + bloco de mercado, só as lojas que atendem cada país (regra D) |
| `yesstyle-app` | [[02_Artigos/yesstyle-app-como-comprar-codigo-de-recompensa]] | 11/11 | publicado em 28/10/2026 |
| `yesstyle-reputation` | [[02_Artigos/yesstyle-trustpilot-nota-reclamacoes]] | 11/11 | publicado em 29/10/2026 |
| `yesstyle-vs-olive-young` | [[02_Artigos/yesstyle-ou-olive-young]] | 11/11 | publicado em 21/10/2026 |
| `yesstyle-vs-stylekorean` | [[02_Artigos/yesstyle-ou-stylekorean]] | 11/11 | publicado em 09/11/2026 |
| `stylekorean-trust` | [[02_Artigos/stylekorean-e-confiavel]] | 11/11 | publicado em 09/11/2026 |
| `yesstyle-primeira-compra` | [[02_Artigos/codigo-yesstyle-primeira-compra-cecilia010]] | 11/11 | publicado em 13/11/2026 |
| `yesstyle-worth-it` | [[02_Artigos/yesstyle-vale-a-pena]] | 11/11 | 11/11 com capas no CDN (Lote 2, aguardando rebase do PR #1451) |

### Slugs da família `yesstyle-worth-it` (Lote 2, IDs `1448–1458`, no `_manifest.json` local, 11/11 verificadas no CDN)

- `pt` (`1448`): `yesstyle-vale-a-pena`
- `en` (`1449`): `is-yesstyle-worth-it`
- `es` (`1450`): `yesstyle-vale-la-pena`
- `fr` (`1451`): `yesstyle-vaut-il-le-coup`
- `de` (`1452`): `lohnt-sich-yesstyle`
- `it` (`1453`): `yesstyle-conviene`
- `ko` (`1454`): `yesstyle-worth-it-ko`
- `ja` (`1455`): `yesstyle-worth-it-ja`
- `zh-hant` (`1456`): `yesstyle-worth-it-zh-hant`
- `zh-hans` (`1457`): `yesstyle-worth-it-zh-hans`
- `ar` (`1458`): `yesstyle-worth-it-ar`

## Regras específicas

- `CECILIA010` é **código de recompensa** (Reward Code), não cupom: vai no campo
  próprio do checkout e soma com os cupons da YesStyle. Nenhum texto, em nenhum
  idioma, pode chamá-lo de cupom nem falar em usá-lo "com outros cupons"; o
  `npm run test:build-output` reprova a página. O nome em cada idioma e as
  palavras proibidas estão em `00_Sistema/CONTRATOS-DE-CONTEUDO.md`.
- O `type` da família `yesstyle-reward-code` é "Guia & Cupons" e o equivalente de
  cada idioma (tabela no Job 4, seção 3, item 4), como no guia de cupons. O
  rótulo fala dos cupons da YesStyle que o artigo ensina a somar, não do
  CECILIA010; decisão do Bruno em 07/10/2026, quando as versões en, es, de, ko,
  ja e chinês deixaram de sair em português ou inglês.
- Nas 11 versões: `affiliate: "yesstyle"` e `coupon: "CECILIA010"`. O link do `cta`
  é o `affiliateUrl` de `data/coupons/yesstyle.json`, o mesmo em todos os idiomas.
- O link para a página da loja segue o idioma do artigo: `/cupons/yesstyle` em
  português e `/<locale>/coupons/yesstyle` nos outros idiomas.
- Os cupons promocionais da YesStyle (como o MIDS26) vencem e não entram no texto.
  Para eles, o artigo manda para a página da loja, que mostra os vigentes.
- Percentuais, validade e elegibilidade vêm de `data/coupons/yesstyle.json`;
  revalidar, não copiar valores para esta nota.
- Não localizar frete, impostos ou disponibilidade de país sem fonte específica.
- Frete, prazo e imposto por país moram na família `yesstyle-shipping-by-country`: os outros
  artigos da YesStyle linkam para ela em vez de repetir números que mudam (a tabela mudou em
  06/10/2026 e foi atualizada em 17/11/2026 com volta do envio ao Brasil). Exceção documentada:
  o guia `yesstyle-worth-it` traz uma simulação localizada de duas sacolas na seção 5 conferida
  em 25/11/2026 e aponta para `yesstyle-shipping-by-country` para a tabela completa.

## Gates adicionais

```powershell
npm run validate:content
npx tsx scripts/test-yesstyle-mutation.ts
```

Os testes de idioma (`test:review-i18n`, `test:html-lang` e `test:build-output`)
já rodam no `npm run build`. O `validate:content` não roda lá, por isso entra aqui.
O `test:build-output` confere o `<head>` de todo artigo de família (canonical e
hreflang dos 11 idiomas, x-default no inglês). À mão, no build gerado, falta só o
seletor de idioma de uma versão da família.

## Otimização pelo Search Console (11/10/2026)

Export do GSC de 11/10 (3 meses): o EN de `yesstyle-trust` teve 14.427 impressões
na posição 8,4 com CTR de 0,07%, e o EN de `yesstyle-coupon-guide`, 5.373 na
posição 9. As datas dos artigos não mudaram.

- `yesstyle-trust`, nas 10 versões: seção nova sobre originalidade e origem (Hong
  Kong, 2006, YesAsia Holdings 2209.HK; as "400+ marcas autorizadas" ficam como
  afirmação da YesStyle, sem auditoria independente; as conferências do comprador
  são sugestão nossa). No FAQ, a pergunta "De onde é a YesStyle?" e a de
  autenticidade reescrita ("originais ou falsificados?"). O CECILIA010 deixou de ser
  "permanente": não tem data de validade e segue ativo enquanto a parceria durar.
  EN e ES ganharam `seoTitle` e `metaDescription` que respondem à pergunta; o ES,
  título e títulos de seção sem Title Case. FR e DE também saíram do Title Case, e o
  DE trocou "Rabattcode" por "Reward Code".
- `yesstyle-coupon-guide`, nas 10 versões: o BTSVIP15, cupom vencido, saiu da
  legenda e do bullet, e o FAQ ganhou "O que é o código de influenciador da
  YesStyle?". EN com `seoTitle` e `metaDescription` novos.
- Releitura das 18 versões traduzidas contra o PT em 11/10, por um agente que não
  traduziu: sentido igual, nenhum "cupom" para o CECILIA010, escrita certa em
  zh-hant e zh-hans. Corrigidos depois dela: a frase da validade do código em ko,
  ja e chinês, e uma redação em FR.
- Nas versões zh-hant e zh-hans das duas famílias, 獎勵代碼 / 奖励代码 virou 獎勵碼 /
  奖励码, o nome do contrato e o que as outras famílias da YesStyle já usavam.
