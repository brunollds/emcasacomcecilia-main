---
parceiro: "Max Titanium"
slug_cupom: "max-titanium"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-01-14"
---

# Dossiê Factual: Max Titanium

Parceria iniciada em 14/10/2026 com a página `/cupons/max-titanium`, ainda sem artigo. Fica na
prateleira "Saúde e suplementos" de `/cupons`. A Max Titanium é do Grupo Supley, o mesmo da
Probiótica e da Dr. Peanut (ver [[Probiotica]] e [[Dr-Peanut]]).

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom `MAX10EMCASACOMCECILIA`: até 10% OFF | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `max-titanium`) | 2026-10-14 | 2026-11-14 | O percentual varia por produto: nem todo item recebe 10% (Bruno, 14/10) | Alta |
| Todas as formas de pagamento; conta nova e antiga; soma com as promoções do site | condicao_comercial_volatil | Bruno, 14/10/2026 | 2026-10-14 | 2026-11-14 | Nenhuma exclusão vista nas regras | Alta |
| Sem link de afiliado: `offerUrl` é o site oficial | condicao_comercial_volatil | `offerUrl` em `src/lib/couponsData.ts` | 2026-10-14 | 2026-11-14 | A atribuição é pelo cupom | Alta |

Teste de checkout em 2026-10-14 (prints do Bruno, guardados para o futuro artigo de como usar):
Top Whey 3W 900 g em promoção, de R$ 273,55 por R$ 189,00, e dois brindes no carrinho; com o cupom,
R$ 16,75 de desconto e total de R$ 172,25. Os brindes continuaram no carrinho. O campo se chama
"Cupom de Desconto".

Mesma decisão da Probiótica: o título e o número da página dizem 10% OFF, e o aviso "chega a 10% e
pode ser menor em alguns produtos" fica separado, no destaque, nas regras e na FAQ. O
`test:coupon-offer-modes` falha se o aviso sumir do destaque.

---

## 2. Fatos Oficiais & Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Marca brasileira de suplementos: whey protein, creatina, pré-treinos, aminoácidos e snacks proteicos | fato_oficial | Site oficial maxtitanium.com.br | 2026-10-14 | 2027-01-14 | |
| Parte do Grupo Supley, com Probiótica e Dr. Peanut | fato_oficial | ABC da Comunicação; dossiê da Dr. Peanut | 2026-10-13 | 2027-01-14 | Reconfirmar no site antes de citar em artigo |

---

## 3. Alertas Editoriais

Nos artigos deste parceiro, usar `affiliate: "max-titanium"` e link relativo para
`/cupons/max-titanium`, conforme `docs/CONTRATO-ARTIGO-AFILIADO.md`. Nunca prometer 10% em todo
produto. Os artigos de onboarding passam primeiro pela pauta (Job 1) e depois pela sessão de
artigos (Bruno, 14/10/2026).

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/max-titanium.png` | Logotipo SVG do site oficial (MAX TITANIUM), baixado em 2026-10-14 | Parceiros comerciais no `/sobre` | Identificação da marca parceira |
| `/images/about/partners/max-titanium-icon.png` | Favicon SVG oficial ("MAX" empilhado), com margem, sobre branco em 256 × 256 | Bolinha da home, chip e imagem de compartilhamento | Identificação da marca parceira |
| `/images/logos/watermarks/max-titanium.webp` | Silhueta do logotipo | Marca-d'água da página e dos cards | Identificação da marca parceira |

Os logos estão no CDN e no mapa de entrega. Para trocar um logo, criar arquivo com nome novo,
conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
