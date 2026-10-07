---
parceiro: ""
cluster_id: ""
modo_i18n: "paridade-completa" # paridade-completa | somente-pt
idioma_fonte: "pt"
idiomas_alvo: [pt, en, es, fr, de, it, ko, ja, zh-hant, zh-hans] # [pt] se somente-pt
fonte_tecnica: "00_Sistema/JOBS/Job-4-Conformacao-JSON.md (seção 3)"
ultima_revisao: "YYYY-MM-DD"
---

# Cluster multilíngue — {{parceiro}}

## Regra operacional

- **Por que este cluster é multilíngue:**
- **Modo:** `paridade-completa`: todo artigo sai nos 10 idiomas, como uma família de
  JSONs com a mesma `translationKey`, e a build reprova família incompleta. `somente-pt`
  não abre família. Não há modo de liberar traduções depois, por conversão ou por
  outro gate.
- **O que não pode ser localizado sem nova fonte:**

## Matriz de artigos

| Chave | Fonte PT | Idiomas | Estado |
|---|---|---:|---|
| `translation-key` | [[slug-fonte]] | 10/10 | publicado em DD/MM/AAAA |

Estado: `em-localizacao` enquanto faltam versões, releitura ou gates; `publicado em
DD/MM/AAAA` quando a família inteira está no ar. Na nota-fonte do artigo, o
`status_i18n` é `nao-aplicavel | em-localizacao | completo`.

## Regras de mercado e fatos comerciais

- **Fonte factual de código/link/campanhas:** `src/lib/couponsData.ts` (ou o arquivo
  próprio da loja); textos por idioma em `src/lib/couponTranslations.ts`, quando houver.
- **País, moeda, entrega, tamanhos ou impostos:** de que mercado são. A tradução diz
  isso e não converte moeda nem tamanho.
- **Nome do código em cada idioma:** `00_Sistema/CONTRATOS-DE-CONTEUDO.md`.
- **Disclosure e CTA:** o link do `cta` em cada idioma, com `"sponsored": true`.
- **Link para a página da loja:** `/cupons/<marca>` em português e
  `/<locale>/coupons/<marca>` nos outros idiomas.

## Verificação técnica

- **Contrato do JSON da família:** seção 3 do `00_Sistema/JOBS/Job-4-Conformacao-JSON.md`.
- **Plano/handoff técnico:**
- **Registro de cluster:** família de artigo não entra em `src/lib/i18n/clusters/`; só
  os artigos fixos que a página da loja mostra (caso da YesStyle). Anotar se o parceiro
  tem entrada.
- **Gates específicos:** `npm run validate:content`, que não roda no `npm run build`,
  e a releitura das traduções (item 10 da seção 3 do Job 4). Os testes de idioma já
  rodam no build.
- **Última verificação de hreflang/canonical/sitemap:** de uma versão da família no
  build gerado; nenhum teste confere o `<head>` dos artigos.
