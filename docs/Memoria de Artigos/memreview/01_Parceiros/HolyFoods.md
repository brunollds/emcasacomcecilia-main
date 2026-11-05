---
parceiro: "HolyFoods"
slug_cupom: "holyfoods"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-02-05"
---

# Dossiê Factual: HolyFoods

Parceria iniciada em 05/11/2026 com a página `/cupons/holyfoods`, ainda sem artigo. Fica na
prateleira de alimentação de `/cupons`.

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom `EMCASA`: 15% OFF em todo o site | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `holyfoods`) | 2026-11-05 | 2026-12-05 | Entrou sobre produtos que já estavam com 30% OFF (teste de 05/11) | Alta |
| Campanha de Black Friday da loja: 30% OFF em todo o site, já aplicado nos preços, no lugar do desconto progressivo | condicao_comercial_volatil | FAQ da home de holyfoods.com.br | 2026-11-05 | 2026-12-05 | Fora da campanha a loja tem desconto progressivo por quantidade ("15% OFF desbloqueado"); se o EMCASA soma com o progressivo não foi testado | Média |
| Frete grátis a partir de R$ 199 em SP; R$ 249 em RJ, MG, DF e PR; R$ 289 em GO, SC, ES e RS; nos demais estados, consulta no checkout | condicao_comercial_volatil | FAQ da home ("Seu frete na Black") | 2026-11-05 | 2026-12-05 | O mínimo considera os preços depois dos descontos dos produtos. A página de cupom fala só em "mínimo por estado", sem os valores, porque a tabela é da campanha | Média |
| Garantia: 30 dias depois de receber para pedir a devolução; pode provar uma unidade e devolver as outras fechadas; devolução sem custo, com reembolso dos produtos devolvidos | condicao_comercial_volatil | FAQ da home de holyfoods.com.br | 2026-11-05 | 2026-12-05 | A página de política (`/policies/refund-policy`) fica atrás de verificação da Cloudflare | Média |
| Link de afiliado da marca no Mercado Livre: `https://meli.la/2mjWEVp` | condicao_comercial_volatil | Bruno, 05/11/2026; `mercadoLivreUrl` no FAQ | 2026-11-05 | 2026-12-05 | O cupom não vale no Mercado Livre; lá vale o preço do anúncio | Alta |
| Link de afiliado: `https://www.holyfoods.com.br/?utm_source=afiliados&utm_medium=emcasacomcecilia&utm_campaign=inbazz` | condicao_comercial_volatil | Bruno, 05/11/2026; `offerUrl` em `src/lib/couponsData.ts` | 2026-11-05 | 2026-12-05 | Vai exatamente como veio. Não aplica o cupom: o leitor copia o EMCASA | Alta |

Teste de 2026-11-05 (Claude, no Chrome, sem dados pessoais e sem finalizar): Pack Sopa da Vovó
(R$ 41,93) e duas Sopas Detox (R$ 13,93 cada), todos já com 30% OFF. Carrinho de R$ 69,79; na tela
"Finalizar compra" (`seguro.holyfoods.com.br`), "Inserir cupom de desconto" → "Código do cupom" →
"Adicionar": "Cupom de desconto −R$ 10,47", total R$ 59,32 (15% exatos).

Teste do Bruno no mesmo dia, no checkout: 20 itens (risotos, macarrões e dois packs de sopa) somando
R$ 334,60, com frete grátis; com o EMCASA, "Descontos −R$ 50,19" (15%), total R$ 284,41.

O cupom não entra pela API do carrinho da Shopify (`/cart/update.js` devolve `applicable: false`)
nem no checkout da Shopify (o campo de lá só aceita cartão-presente): a loja usa um checkout próprio.
Teste mensal: pela tela "Finalizar compra".

---

## 2. Fatos Oficiais & Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Refeições prontas para preparar em casa: sopas, macarrões, risotos, aveias, mel, packs e kits | fato_oficial | Site oficial holyfoods.com.br | 2026-11-05 | 2027-02-05 | — |
| Holy Group Ltda, CNPJ 50.874.415/0001-62 | fato_oficial | Rodapé do site oficial | 2026-11-05 | 2027-02-05 | — |
| Loja na Shopify, com checkout próprio em `seguro.holyfoods.com.br`; o nome no site é "HolyFoods" | fato_oficial | Site oficial | 2026-11-05 | 2027-02-05 | O logo escreve "holyfoods" em minúsculas |

---

## 3. Alertas Editoriais

- Nos artigos deste parceiro, usar `affiliate: "holyfoods"` e link relativo para `/cupons/holyfoods`,
  conforme `docs/CONTRATO-ARTIGO-AFILIADO.md`. Os artigos de onboarding passam primeiro pela pauta
  (Job 1) e depois pela sessão de artigos.
- Os depoimentos do site falam em emagrecimento. Os nossos textos não prometem perda de peso nem
  efeito de saúde: descrevem o produto, o rótulo e o preço.
- Link da marca no Mercado Livre: `https://meli.la/2mjWEVp`, como veio, só no FAQ "vale no Mercado Livre?".
- Reclame Aqui ainda não levantado (fica para o briefing de onboarding).

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/holyfoods.png` | Logo oficial verde-escuro (PNG do cabeçalho do site), 340 × 98, fundo transparente | Parceiros comerciais no `/sobre` | Identificação da marca parceira |
| `/images/about/partners/holyfoods-icon.png` | Logo oficial centralizado em 256 × 256 sobre branco | Bolinha da home, chip e imagem de compartilhamento | Identificação da marca parceira |
| `/images/logos/watermarks/holyfoods.webp` | Logo oficial, 480 × 139, fundo transparente | Marca-d'água da página e dos cards | Identificação da marca parceira |

Os logos estão no CDN e no mapa de entrega. Para trocar um logo, criar arquivo com nome novo,
conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
