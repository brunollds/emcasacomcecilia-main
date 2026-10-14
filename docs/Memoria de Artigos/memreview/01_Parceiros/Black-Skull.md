---
parceiro: "Black Skull"
slug_cupom: "black-skull"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-01-13"
---

# Dossiê Factual: Black Skull

Parceria iniciada em 13/10/2026 com a página `/cupons/black-skull`, ainda sem artigo.

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom `CECILIA10`: 10% OFF em todo o site | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `black-skull`) | 2026-10-13 | 2026-11-13 | Todas as formas de pagamento; soma com as promoções vigentes (Bruno, 13/10) | Alta |
| Sem link de afiliado: `offerUrl` é o site oficial | condicao_comercial_volatil | `offerUrl` em `src/lib/couponsData.ts` | 2026-10-13 | 2026-11-13 | `blackskull.com.br` redireciona para `blackskullusa.com.br` | Alta |

Teste de checkout em 2026-10-13 (prints do Bruno, guardados para o futuro artigo de como usar):
carrinho de R$ 364,33 com regata, kit de whey, creatina e pré-treino e glutamina; com o cupom,
R$ 36,44 de desconto e total de R$ 327,89 (10% em todos os itens, inclusive nos que já estavam com
preço promocional).

O código `CECILIA10` também foi o da Kopenhagen (pausada) e o primeiro da DAMIE (histórico). Nos
artigos, o código vale para a loja do `affiliate` do artigo.

---

## 2. Fatos Oficiais & Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Marca de suplementos para treino ("Heavy Sports Nutrition"), loja VTEX em blackskullusa.com.br | fato_oficial | Site oficial | 2026-10-13 | 2027-01-13 | Vendedor no carrinho: "BLACKSKULL USA" |
| Linha vista no carrinho: whey, creatina, pré-treino, glutamina, regatas | fato_oficial | Carrinho do teste de 13/10 | 2026-10-13 | 2027-01-13 | |

A origem da marca é confusa nas fontes públicas (varejistas ligam a Probiótica ou à Grow Dietary
Supplements Labs USA). Não afirmar dono nem fundação sem fonte oficial.

---

## 3. Alertas Editoriais

> [!WARNING]
> Em fevereiro de 2025, a Anvisa proibiu 19 produtos manipulados vendidos com o nome Black Skull,
> feitos por uma farmácia de manipulação (OficialMed, Apucarana/PR). A marca disse que a linha
> tradicional de suplementos não foi atingida. A página de cupom não cita o caso (decisão do
> Bruno, 13/10/2026). Um artigo de "é confiável" ou de reputação precisa tratar o tema com as
> fontes oficiais da Anvisa.

Nos artigos deste parceiro, usar `affiliate: "black-skull"` e link relativo para
`/cupons/black-skull`, conforme `docs/CONTRATO-ARTIGO-AFILIADO.md`.

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/black-skull.png` | Logotipo SVG branco do cabeçalho do site oficial, recolorido para escuro, baixado em 2026-10-13 | Parceiros comerciais no `/sobre` | Identificação da marca parceira |
| `/images/about/partners/black-skull-icon.png` | Ícone SVG da caveira no círculo laranja, do site oficial, achatado sobre branco | Bolinha da home, chip e imagem de compartilhamento | Identificação da marca parceira |
| `/images/logos/watermarks/black-skull.webp` | Silhueta do logotipo | Marca-d'água da página e dos cards | Identificação da marca parceira |

Os logos estão no CDN e no mapa de entrega. Para trocar um logo, criar arquivo com nome novo,
conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
