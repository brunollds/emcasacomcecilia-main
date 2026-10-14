---
parceiro: "Probiótica"
slug_cupom: "probiotica"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-01-13"
---

# Dossiê Factual: Probiótica

Parceria iniciada em 13/10/2026 com a página `/cupons/probiotica`, ainda sem artigo. A Probiótica
é do Grupo Supley, o mesmo da Dr. Peanut e da Max Titanium (ver [[Dr-Peanut]]).

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom `PRO10EMCASACOMCECILIA`: até 10% OFF | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `probiotica`) | 2026-10-13 | 2026-11-13 | O percentual varia por produto: nem todo item recebe 10% | Alta |
| Link de parceria com UTM | condicao_comercial_volatil | `offerUrl` em `src/lib/couponsData.ts` | 2026-10-13 | 2026-11-13 | `utm_source=creators`, `utm_medium=PRO10EMCASACOMCECILIA`, `utm_campaign=probi`; manter exatamente como veio | Alta |

Teste de checkout em 2026-10-13 (prints do Bruno, guardados para o futuro artigo de como usar):
carrinho de R$ 659,35 com kit de colágeno, creatina em promoção, camiseta e barra de proteína; com o
cupom, R$ 54,75 de desconto e total de R$ 604,60 (cerca de 8,3% no carrinho). O campo no carrinho
se chama "Cupom de Desconto".

Decisão do Bruno (13/10/2026): o título e o número da página dizem 10% OFF, pela concorrência na
busca, e o aviso "chega a 10% e pode ser menor em alguns produtos" fica separado, no destaque, nas
regras e na FAQ. O `test:coupon-offer-modes` falha se o aviso sumir do destaque. Soma com
promoções e formas de pagamento não foram confirmadas: seguem "conforme regras da loja".

---

## 2. Fatos Oficiais & Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Marca brasileira de suplementos ("Suplementos de Qualidade para Conquistas Reais") | fato_oficial | Título do site probiotica.com.br | 2026-10-13 | 2027-01-13 | Loja VTEX |
| Linha vista no carrinho: colágeno, creatina, barras de proteína, camisetas | fato_oficial | Carrinho do teste de 13/10 | 2026-10-13 | 2027-01-13 | "Produto fornecido e entregue por Probiótica" |
| Fundada em 1986, segundo material da marca; parte do Grupo Supley | fato_oficial | Página institucional citada em buscas; ABC da Comunicação | 2026-10-13 | 2027-01-13 | Reconfirmar no site antes de citar em artigo |

---

## 3. Alertas Editoriais

Nos artigos deste parceiro, usar `affiliate: "probiotica"` e link relativo para `/cupons/probiotica`,
conforme `docs/CONTRATO-ARTIGO-AFILIADO.md`. Nunca prometer 10% em todo produto.

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/probiotica.png` | Logotipo SVG do site oficial, sem o slogan, baixado em 2026-10-13 | Parceiros comerciais no `/sobre` | Identificação da marca parceira |
| `/images/about/partners/probiotica-icon.png` | Favicon SVG oficial ("pb"), baixado em 2026-10-13 | Bolinha da home, chip e imagem de compartilhamento | Identificação da marca parceira |
| `/images/logos/watermarks/probiotica.webp` | Silhueta do logotipo | Marca-d'água da página e dos cards | Identificação da marca parceira |

Os logos estão no CDN e no mapa de entrega. Para trocar um logo, criar arquivo com nome novo,
conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
