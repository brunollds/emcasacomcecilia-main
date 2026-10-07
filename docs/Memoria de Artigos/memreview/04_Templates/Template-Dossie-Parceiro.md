---
parceiro: ""
slug_cupom: "" # Slug em src/lib/couponsData.ts
fonte_dados_comerciais: "src/lib/couponsData.ts" # ou o arquivo próprio da loja, como data/coupons/yesstyle.json
status_parceria: "ativo" # ativo | pausado
revisao_geral_ate: "" # YYYY-MM-DD: até quando o dossiê vale sem revisão geral
---

# Dossiê Factual: {{parceiro}}

---

## 1. Dados Comerciais & Códigos (Voláteis)

Chamar o código pelo nome que a loja dá a ele (cupom, código de recompensa, código de
indicação); as regras estão em `00_Sistema/CONTRATOS-DE-CONTEUDO.md`.

| Fato / Condição Comercial | Tipo | Fonte | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom `CODIGO` dá X% | condicao_comercial_volatil | Loja oficial | YYYY-MM-DD | YYYY-MM-DD | Válido em itens selecionados | Alta |

---

## 2. Fatos Oficiais & Dados de Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Capacidade do reservatório: 800ml | fato_oficial | Manual físico | YYYY-MM-DD | 2027-01-01 | Modelo Mini Me |

---

## 3. Reputação & Dados Públicos

| Dado / Indicador | Tipo | Fonte | Consultado Em | Rever Até | Conclusão |
|---|---|---|---|---|---|
| Nota Reclame Aqui: 8.2 / 10 | dado_externo | Reclame Aqui | YYYY-MM-DD | YYYY-MM-DD | Reputação Ótima |

---

## 4. Dores Mapeadas do Consumidor
- [[slug-da-dor-1]]
- [[slug-da-dor-2]]

---

## 5. Artigos do Cluster Já Publicados
- [[slug-artigo-1]]
- [[slug-artigo-2]]

---

## 6. Perfil Multilíngue (quando aplicável)

- **Nota operacional do cluster:** `[[03_Memoria/Clusters-Multilingues/<Parceiro>]]`
- **Modo:** `paridade-completa` (todo artigo sai nos 10 idiomas) | `somente-pt`
- **Mercado dos fatos comerciais:** *(ex.: preço em reais na loja brasileira; as traduções dizem de qual mercado é o fato, sem converter)*
- **Link do CTA em cada idioma:**
- **Contrato do JSON da família:** seção 3 do `00_Sistema/JOBS/Job-4-Conformacao-JSON.md`
- **Fonte técnica das páginas da loja nos idiomas:** `docs/<handoff-ou-plano>.md`
