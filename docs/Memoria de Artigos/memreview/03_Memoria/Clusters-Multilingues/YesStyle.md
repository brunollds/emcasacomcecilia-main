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

YesStyle opera em paridade completa: cada tipo registrado no cluster deve existir
nos nove idiomas antes de ser marcado como completo. A fonte técnica de rotas,
hreflang, hubs e dados comerciais é `docs/PLANO-YESSTYLE-I18N-ABC.md` e o registro
em `src/lib/i18n/clusters/yesstyle.ts`.

## Matriz atual

| Chave | Fonte PT | Idiomas | Estado |
|---|---|---:|---|
| `reward` | `codigo-cecilia010-yesstyle-como-usar` | 9/9 | publicado |
| `guide` | `como-encontrar-cupons-yesstyle-validos` | 9/9 | publicado |
| `trust` | `yesstyle-e-confiavel` | 9/9 | publicado |
| `kbeauty` | [[02_Artigos/k-beauty-o-que-e-onde-comprar]] | 9/9 | commitado local; aguardando deploy |

## Regras específicas

- `CECILIA010` é Reward/Influencer Code, não cupom promocional comum.
- Percentuais, validade, elegibilidade e link comercial vêm de
  `data/coupons/yesstyle.json`; revalidar, não copiar valores para esta nota.
- O link comercial atual é o `affiliateUrl` da fonte factual.
- Conteúdo internacional fica fora das listagens em português, mas deve estar no
  sitemap e nas relações hreflang do respectivo tipo.
- Não localizar frete, impostos ou disponibilidade de país sem fonte específica.

## Gates adicionais

```powershell
npm run test:html-lang
npx tsx scripts/test-yesstyle-mutation.ts
```

Além dos gates gerais, conferir canonical, hreflang, seletor de idioma e sitemap
no build gerado.
