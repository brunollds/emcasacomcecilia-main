---
parceiro: "Let's Eat It"
slug_cupom: "letseatit"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-01-02"
---

# Dossiê Factual: Let's Eat It

Parceria iniciada em outubro de 2026, intermediada pela Inbazz (programa de embaixadores).
Por enquanto só existe a página `/cupons/letseatit`; não há artigo nem cluster.

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom de desconto Let's Eat It | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `letseatit`) | 2026-10-02 | 2026-11-01 | Site oficial; testado no checkout em 2026-10-02 | Alta |
| Link de parceria com UTMs da Inbazz | condicao_comercial_volatil | `offerUrl` em `src/lib/couponsData.ts` | 2026-10-02 | 2026-11-01 | `utm_source=embaixador`, `utm_medium=emcasacomcecilia`, `utm_campaign=inbazz`, `utm_content=organico`; a atribuição da comissão depende deles | Alta |

Mínimo de compra, limite de uso por CPF e acúmulo com promoções ainda não foram informados pela
parceria. A página de cupom trata esses pontos como "conforme regras da loja" até haver
confirmação.

---

## 2. Fatos Oficiais & Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Loja online de casa e presentes ("Tudo para Casa e Presentes") | fato_oficial | Título do site letseatit.com.br | 2026-10-02 | 2027-01-02 | Varejista multimarca, não fabricante |
| Categorias: mesa posta, cozinha, bar, café e chá, decoração, outdoor e eletrodomésticos | fato_oficial | Menu do site oficial | 2026-10-02 | 2027-01-02 | Há também seção de lançamentos e outlet |
| Marcas citadas pela loja: Le Creuset, KitchenAid, Porto Brasil, Bohemia Crystal | fato_oficial | Meta description do site oficial | 2026-10-02 | 2027-01-02 | Conferir disponibilidade antes de citar produto específico |

Os banners promocionais da home (cashback, descontos por marca) mudam com frequência e não
devem ser repetidos em conteúdo sem nova consulta.

---

## 3. Reputação & Dados Públicos

Ainda não levantados. Antes de um artigo de confiança ou reputação, consultar Reclame Aqui e as
políticas de troca e entrega no site oficial, registrando a data da consulta aqui.

---

## 4. Alertas Editoriais

> [!CAUTION]
> `MAUAD` é o sobrenome da Cecília. Não acrescentar o código aos termos de destaque de cupom
> (`HighlightCoupon`, `ReviewSectionContent`). Ver `docs/MANUTENCAO-MENSAL.md`, seção 4.

Ao criar o primeiro artigo, usar `affiliate: "letseatit"` (o slug do cupom) e link relativo para
`/cupons/letseatit`, conforme `docs/CONTRATO-ARTIGO-AFILIADO.md`.

---

## 5. Dores Mapeadas

Nenhuma mapeada ainda.

---

## 6. Artigos Já Publicados no Cluster

Nenhum.
