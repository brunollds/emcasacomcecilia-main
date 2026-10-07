---
parceiro: "YesStyle"
cluster_id: "yesstyle"
modo_i18n: "paridade-completa"
idioma_fonte: "pt"
idiomas_alvo: [pt, en, es, fr, de, it, ko, ja, zh-hant, zh-hans]
fonte_tecnica: "00_Sistema/JOBS/Job-4-Conformacao-JSON.md (seção 3)"
ultima_revisao: "2026-10-07"
---

# Cluster multilíngue — YesStyle

## Regra operacional

Todo artigo da YesStyle sai nos 10 idiomas, como uma família de JSONs com a mesma
`translationKey`. O contrato dos JSONs está na seção 3 do Job 4, e a build reprova
família com idioma faltando.

`src/lib/i18n/clusters/yesstyle.ts` não é o registro dos artigos: ele guarda os
quatro artigos fixos que a página da loja mostra (código de recompensa, guia de
cupons, confiança e K-beauty). Família nova não entra nele; a
`yesstyle-skincare-30` não está lá.

## Matriz atual

| Chave | Fonte PT | Idiomas | Estado |
|---|---|---:|---|
| `yesstyle-reward-code` | `codigo-cecilia010-yesstyle-como-usar` | 10/10 | publicado |
| `yesstyle-coupon-guide` | `como-encontrar-cupons-yesstyle-validos` | 10/10 | publicado |
| `yesstyle-trust` | `yesstyle-e-confiavel` | 10/10 | publicado |
| `yesstyle-kbeauty` | [[02_Artigos/k-beauty-o-que-e-onde-comprar]] | 10/10 | publicado |
| `yesstyle-skincare-30` | `skincare-coreano-30-anos-rotina-iniciante-yesstyle` | 10/10 | publicado em 28/09/2026 |

## Regras específicas

- `CECILIA010` é **código de recompensa** (Reward Code), não cupom: vai no campo
  próprio do checkout e soma com os cupons da YesStyle. Nenhum texto, em nenhum
  idioma, pode chamá-lo de cupom nem falar em usá-lo "com outros cupons"; o
  `npm run test:build-output` reprova a página. O nome em cada idioma e as
  palavras proibidas estão em `00_Sistema/CONTRATOS-DE-CONTEUDO.md`.
- Nas 10 versões: `affiliate: "yesstyle"` e `coupon: "CECILIA010"`. O link do `cta`
  é o `affiliateUrl` de `data/coupons/yesstyle.json`, o mesmo em todos os idiomas.
- O link para a página da loja segue o idioma do artigo: `/cupons/yesstyle` em
  português e `/<locale>/coupons/yesstyle` nos outros idiomas.
- Os cupons promocionais da YesStyle (como o MIDS26) vencem e não entram no texto.
  Para eles, o artigo manda para a página da loja, que mostra os vigentes.
- Percentuais, validade e elegibilidade vêm de `data/coupons/yesstyle.json`;
  revalidar, não copiar valores para esta nota.
- Não localizar frete, impostos ou disponibilidade de país sem fonte específica.

## Gates adicionais

```powershell
npm run validate:content
npx tsx scripts/test-yesstyle-mutation.ts
```

Os testes de idioma (`test:review-i18n`, `test:html-lang` e `test:build-output`)
já rodam no `npm run build`. O `validate:content` não roda lá, por isso entra aqui.
Nenhum teste confere o `<head>` dos artigos: no build gerado, abrir uma versão da
família e conferir o canonical, o hreflang dos 10 idiomas e o seletor de idioma.
