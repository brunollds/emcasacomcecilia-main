---
parceiro: "BOLD Snacks"
slug_cupom: "bold"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2026-12-18"
---

# Dossiê Factual: BOLD Snacks

Loja de código, cadastrada em 18/11/2026 a pedido do Bruno ("https://www.boldsnacks.com.br/discount/CECILIA15 - Cupom
CECILIA15 (20% OFF, sim o cupom chama 15, mas provavelmente nessa reta da black friday está 20% ...)"). Página
`/cupons/bold`, só em português. Marca de barras de proteína e snacks proteicos; o site roda no Shopify, com o checkout
padrão.

---

## 1. Dados Comerciais (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom CECILIA15: 20% OFF no teste, cliente novo e antigo | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `bold`) | 2026-11-18 | 2026-11-23 | O nome tem 15; o percentual pode mudar com as campanhas. `offerUrl` = o link `/discount/CECILIA15` do Bruno (nunca abrir) | Alta |
| Teste: BOLD Caixa Mista R$ 179,00 → R$ 143,20 (−R$ 35,80); BOLD Whey Chocolate ao Leite 450 g, de R$ 209,00 por R$ 189,00 → R$ 151,20 (−R$ 37,80); total R$ 294,42 com dois brindes a R$ 0,01 | teste_carrinho | Checkout pelo FINALIZAR da gaveta, sem login, sem finalizar | 2026-11-18 | 2026-11-23 | Print do resumo no `cartPrint` | Alta |
| Pré-Black Friday (18 a 22/11): cupons de 30% em anúncios e de 20% de influenciadores, um cupom por pedido; descontos sucessivos sobre o preço promocional; cashback não soma automaticamente com cupons | condicao_comercial_volatil | `/pages/politicas-promocoes`, itens 2 e 4 | 2026-11-18 | 2026-11-23 | Decisão do Bruno (18/11): a página não cita os cupons da loja nem diz que o CECILIA15 é o maior desconto | Alta |
| Brindes da campanha: acima de R$ 249 coqueteleira; acima de R$ 359 coqueteleira e térmica; acima de R$ 699 também a bolsa de academia; valor dos produtos já com os descontos, sem frete | condicao_comercial_volatil | `/pages/politicas-promocoes`, item 3 | 2026-11-18 | 2026-11-23 | Fora da página | Alta |
| Parcelamento em 3x na vitrine (R$ 179,00 = 3x de R$ 59,66) | condicao_comercial_volatil | Página de produto | 2026-11-18 | 2026-12-18 | Desconto no Pix não lido (o pagamento pede dados pessoais) | Média |
| Cashback de até 10% para a próxima compra ("Receba de volta R$ 17,90" na caixa de R$ 179) | condicao_comercial_volatil | `/pages/politica-de-cashback` e página de produto | 2026-11-18 | 2026-12-18 | Não soma automaticamente com cupons (regulamento, item 4.5) | Alta |
| Frete calculado pelo CEP, entrega em todo o Brasil | condicao_comercial_volatil | `/policies/shipping-policy` | 2026-11-18 | 2026-12-18 | Sem frete grátis anunciado | Alta |

---

## 2. Fatos Oficiais (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Marca criada em 2018 ("Desde 2018 construímos produtos...") | fato_oficial | `/pages/sobre-nos` | 2026-11-18 | 2027-02-18 | Empresa: BARRIND IND. E COMERCIO DE ALIMENTOS LTDA (política de reembolso) |
| Linha: barras BOLD (21 g e 14 g de proteína), Crunch, Tube, Wafer, whey em pote e em sachês, creatina | fato_oficial | Menu e vitrine | 2026-11-18 | 2027-02-18 | |
| Trocas: desistência em até 7 dias da entrega, embalagem original sem violação do lacre, com a nota fiscal e todos os produtos do pedido; troca e cancelamento pelo atendimento | fato_oficial | `/pages/politica-de-trocas-e-devolucoes` | 2026-11-18 | 2027-02-18 | |

---

## 3. Alertas Editoriais

- **O nome do código tem 15 e o desconto foi de 20%.** Sempre conferir o percentual no checkout antes de escrever; o
  regulamento da Pré-Black vale até 22/11.
- Não citar os cupons da própria loja (decisão do Bruno em 18/11), nem dizer que o CECILIA15 é o maior desconto.
- Testar pelo caminho do cliente: ADICIONAR no produto, gaveta, FINALIZAR. O site abre um popup de pré-venda.
- Suplemento e alimento sem promessa de efeito. Nos artigos, usar `coupon: "bold"` e link relativo para `/cupons/bold`,
  com a âncora exata "cupom BOLD".

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/bold.png` | Marca BOLD recortada da imagem de compartilhamento oficial do site (`bold_snacks_seo.png`, baixada em 2026-11-18), em #00A0B1, centrada em 256 × 256 sobre branco | Página da loja, cards, imagem de compartilhamento e `/sobre` | Logo da marca parceira, para divulgação da parceria |
| `/images/logos/bolinhas/bold.png` | A mesma marca em branco, 512 × 512 transparente, sobre o `background` #00A0B1 | Bolinha da vitrine e de /reviews | Idem |
| `/images/logos/watermarks/bold.webp` | A mesma marca em preto, 480 px de largura | Marca-d'água da página e dos cards | Idem |
| `/images/reviews/bold/cupom-bold-checkout-com-cupom.webp` | Coluna do resumo do checkout no teste de 18/11, sem dado pessoal | `cartPrint` em "Como usar" | Próprio |

Para trocar um logo, criar arquivo com nome novo, conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
