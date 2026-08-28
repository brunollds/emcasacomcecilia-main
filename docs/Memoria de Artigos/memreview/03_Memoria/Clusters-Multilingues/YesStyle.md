---
parceiro: "YesStyle"
cluster_id: "yesstyle"
modo_i18n: "paridade-completa"
idioma_fonte: "pt"
idiomas_alvo: [pt, en, es, fr, de, ko, ja, zh-hant, zh-hans]
fonte_tecnica: "docs/PLANO-YESSTYLE-I18N-ABC.md"
---

# Cluster multilíngue — YesStyle

## Regra operacional

As quatro famílias atuais já têm paridade completa. Para uma família futura, a
decisão editorial de paridade continua possível, mas o contrato técnico aceita
grupos parciais: a equivalência é definida por `translationKey`, não por uma
chave fixa do cluster YesStyle. A fonte de URLs e hreflang é
`docs/HANDOFF-I18N-SUBPAGINAS-FASE-4.md`; o registro YesStyle permanece dono dos
hubs e links comerciais.

## Matriz atual

| Chave | Fonte PT | Idiomas | Estado |
|---|---|---:|---|
| `yesstyle-reward-code` | `codigo-cecilia010-yesstyle-como-usar` | 9/9 | publicado |
| `yesstyle-coupon-guide` | `como-encontrar-cupons-yesstyle-validos` | 9/9 | publicado |
| `yesstyle-trust` | `yesstyle-e-confiavel` | 9/9 | publicado |
| `yesstyle-kbeauty` | [[02_Artigos/k-beauty-o-que-e-onde-comprar]] | 9/9 | publicado |

## Regras específicas

- `CECILIA010` é Reward/Influencer Code, não cupom promocional comum.
- Percentuais, validade, elegibilidade e link comercial vêm de
  `data/coupons/yesstyle.json`; revalidar, não copiar valores para esta nota.
- O link comercial atual é o `affiliateUrl` da fonte factual.
- Conteúdo internacional fica fora das listagens em português, mas deve estar no
  sitemap e nas relações hreflang do respectivo tipo.
- Um artigo internacional novo usa `locale` + `translationKey`, gera a URL
  `/<locale>/reviews/<slug>` e não exige pasta `page.tsx`, rota manual ou edição
  do cluster YesStyle apenas para ser descoberto.
- Não localizar frete, impostos ou disponibilidade de país sem fonte específica.

## Gates adicionais

```powershell
npm run test:html-lang
npx tsx scripts/test-yesstyle-mutation.ts
```

Além dos gates gerais, conferir canonical, hreflang, seletor de idioma e sitemap
no build gerado.
