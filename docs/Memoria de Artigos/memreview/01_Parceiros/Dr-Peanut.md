---
parceiro: "Dr. Peanut"
slug_cupom: "dr-peanut"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-01-13"
---

# Dossiê Factual: Dr. Peanut

Parceria iniciada em 13/10/2026 com a página `/cupons/dr-peanut`, ainda sem artigo. Fica na
prateleira "Saúde e suplementos" de `/cupons`, junto com a Probiótica, do mesmo grupo (decisão do
Bruno, 13/10).

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom `DREMCASACOMCECILIA`: 10% OFF em todo o site | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `dr-peanut`) | 2026-10-13 | 2026-11-13 | Todas as formas de pagamento; soma com as promoções vigentes (Bruno, 13/10) | Alta |
| Sem link de afiliado: `offerUrl` é o site oficial | condicao_comercial_volatil | `offerUrl` em `src/lib/couponsData.ts` | 2026-10-13 | 2026-11-13 | A atribuição é pelo cupom | Alta |
| Frete grátis quando o total, já com o cupom, chega a R$ 149,90 | condicao_comercial_volatil | Aviso no carrinho | 2026-10-13 | 2026-11-13 | Abaixo disso, frete pela loja | Alta |

Teste de checkout em 2026-10-13 (prints do Bruno, guardados para o futuro artigo de como usar):
carrinho de R$ 440,16 com pasta de amendoim Bombom Italiano em promoção, display de alfajor e whey;
com o cupom, R$ 44,02 de desconto e total de R$ 396,14 (10% em todos os itens, inclusive no que já
estava com preço promocional).

---

## 2. Fatos Oficiais & Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Marca de pastas de amendoim de Curitiba (PR), do Grupo Supley | fato_oficial | Gulfood (expositor), ABC da Comunicação | 2026-10-13 | 2027-01-13 | O grupo também tem Probiótica e Max Titanium |
| Linha vista no carrinho: pastas de amendoim, alfajores, whey 100% Dr. Peanut (Max Titanium) | fato_oficial | Carrinho do teste de 13/10 | 2026-10-13 | 2027-01-13 | "Produto fornecido e entregue por Dr. Peanut" |

O site oficial bloqueia acesso automático (checagem da Vercel): os fatos do catálogo precisam de
consulta pelo navegador.

---

## 3. Alertas Editoriais

Nos artigos deste parceiro, usar `affiliate: "dr-peanut"` e link relativo para `/cupons/dr-peanut`,
conforme `docs/CONTRATO-ARTIGO-AFILIADO.md`.

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/dr-peanut.png` | Logotipo enviado pelo Bruno em 2026-10-13, achatado sobre branco | Parceiros comerciais no `/sobre` | Identificação da marca parceira |
| `/images/about/partners/dr-peanut-icon.png` | O mesmo logotipo, centralizado em 256 × 256 | Bolinha da home, chip e imagem de compartilhamento | Identificação da marca parceira |
| `/images/logos/watermarks/dr-peanut.webp` | Silhueta do logotipo | Marca-d'água da página e dos cards | Identificação da marca parceira |

Os logos estão no CDN e no mapa de entrega. Para trocar um logo, criar arquivo com nome novo,
conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
