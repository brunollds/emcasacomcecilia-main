# Contratos de Conteúdo & Afiliados

---

## 1. Os Três Campos Fundamentais (Três Trabalhos)

| Campo | Governa | Valores Permitidos | Regra de Uso |
|---|---|---|---|
| `category` | Classe editorial, navegação, filtros e 4 cards da home | `guias-praticos-utilidade`, `produtos-experiencias`, `cupons-como-usar`, `confianca-reputacao` | **Obrigatório e único.** Fonte da verdade para a rotação automática da home. |
| `reviewKind` | Capacidades estruturais do template | `produto`, `guia`, `editorial` | `produto` exige veredito completo (estrelas + recomendação + prós/contras). `guia` e `editorial` não exigem. |
| `type` | Rótulo público/granular no card | Texto livre (ex: "Guia Prático", "Móveis de Luxo") | Rótulo descritivo; não governa filtros. |

---

## 2. Contrato de Afiliados

- **`coupon`:** Código do cupom (ex: `"CECI"`, `"CECIEMCASA"`, `"CECILIA12"`).
- **`affiliate`:** **Slug exato do cupom** em `src/lib/couponsData.ts` (ex: `"dolce-gusto"`, `"i-wanna-sleep"`, `"nutren"`, `"damie"`).
- **`editorialNote`:** Disclosure claro de parceria comissionada.
- **Links Internos para Cupom:**
  - Devem ser **caminhos relativos** (ex: `"/cupons/dolce-gusto"`).
  - No máximo **3 links internos** por artigo.
  - Renderizados via `TrackedCouponPageLink` (sem `target="_blank"`).
- **Links Externos para a Loja:**
  - Devem conter `"sponsored": true` no array de links (renderizados como `rel="sponsored"`).
- **FAQs Literais:**
  - Perguntas formuladas como a pessoa/IA busca: *"Qual é o cupom da Dolce Gusto?"*, com resposta factual em uma frase.
- **`seoTitle` (SERP Title):**
  - Usado para recuar o título nos motores de busca e evitar canibalizar a página transacional `/cupons/<marca>` se estiverem disputando o mesmo termo.
