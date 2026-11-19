---
parceiro: "Pink Cheeks"
slug_cupom: "pinkcheeks"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2026-12-19"
---

# Dossiê Factual: Pink Cheeks

Loja de código, cadastrada em 19/11/2026 a pedido do Bruno ("Novo parceiro: PNK-EMCASACOMCECILIA (10% OFF) não tem UTM
https://pinkcheeks.com.br/"). Página `/cupons/pinkcheeks`, só em português. Marca de protetor solar e maquiagem com FPS
para quem pratica esporte; o site roda no Shopify, com o checkout padrão. A parceria não tem link próprio: o `offerUrl` é
o site oficial.

---

## 1. Dados Comerciais (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom PNK-EMCASACOMCECILIA: 10% OFF no pedido, cliente novo e antigo | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `pinkcheeks`) | 2026-11-19 | 2026-12-01 | O código tem hífen depois de PNK | Alta |
| Teste: Protetor Solar Pó Translúcido Sport Powder FPS30 R$ 99,90 (preço cheio) + Blush All In One FPS30 Terracota, de R$ 89,90 por R$ 69,90; subtotal R$ 169,80, "Desconto no pedido" −R$ 16,98, total R$ 152,82 | teste_carrinho | Checkout pelo "Finalizar pedido" da gaveta, sem login, sem finalizar | 2026-11-19 | 2026-12-01 | Print do resumo no `cartPrint` | Alta |
| Pix: com o Pix escolhido no checkout, o código seguiu aplicado e o total não mudou; sem desconto próprio no Pix | teste_carrinho | Checkout (Pix pelo Mercado Pago) | 2026-11-19 | 2026-12-01 | | Alta |
| Black Friday da loja: "até 50% off" na home e em kits | condicao_comercial_volatil | Home | 2026-11-19 | 2026-12-01 | Fora da página; o cupom entrou sobre o blush em promoção | Alta |
| Frete grátis na Entrega Normal a partir de R$ 199 numa única compra; Expressa com valor e prazo no checkout | condicao_comercial_volatil | `/pages/regras-de-frete` e `/policies/shipping-policy` | 2026-11-19 | 2026-12-19 | A gaveta mostrou "Compre + 1 para ganhar FRETE GRÁTIS" com 2 itens de R$ 169,80: regra da campanha não lida | Média |
| Parcelamento em até 5x sem juros; cartão, débito e Pix pelo Mercado Pago e PayPal | condicao_comercial_volatil | `/pages/formas-de-pagamento` | 2026-11-19 | 2026-12-19 | | Alta |

---

## 2. Fatos Oficiais (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| "Nascida no esporte há mais de uma década, a PINK CHEEKS foi criada por atletas para pessoas reais" | fato_oficial | Meta description da home | 2026-11-19 | 2027-02-19 | |
| Linhas: proteção solar, maquiagens com FPS (blush, pó, batom, corretivo, sombra), antiatrito, cabelos, kits e acessórios | fato_oficial | Menu do site | 2026-11-19 | 2027-02-19 | |
| Trocas: desistência em até 7 dias do recebimento; defeito em até 30 dias; pedido pelo portal `pinkcheeks.troque.app.br` com e-mail ou CPF e o número do pedido | fato_oficial | `/pages/trocas-e-devolucoes` | 2026-11-19 | 2027-02-19 | |

---

## 3. Alertas Editoriais

- Testar pelo caminho do cliente: "Adicionar ao carrinho" no produto, gaveta, "Finalizar pedido"; no checkout, campo
  "Código de desconto ou cartão-presente", botão "Aplicar"; o desconto sai numa linha só, "Desconto no pedido".
- A gaveta do carrinho também tem um campo "Cupom"; a página ensina pelo checkout.
- Protetor solar e maquiagem com FPS: sem promessa de efeito além do rótulo. Nos artigos, usar `affiliate: "pinkcheeks"`, `coupon: "PNK-EMCASACOMCECILIA"` (o código) e link
  relativo para `/cupons/pinkcheeks`, com a âncora exata "cupom Pink Cheeks".

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/pinkcheeks.png` | Logo laranja do header do site (`pinkcheeks_orange_….png`, baixado em 2026-11-19), em #FF7800, centrado em 256 × 256 sobre branco | Página da loja, cards, imagem de compartilhamento e `/sobre` | Logo da marca parceira, para divulgação da parceria |
| `/images/logos/bolinhas/pinkcheeks.png` | O mesmo logo em branco, 512 × 512 transparente, sobre o `background` #FF7800 | Bolinha da vitrine e de /reviews | Idem |
| `/images/logos/watermarks/pinkcheeks.webp` | O mesmo logo em preto, 480 px de largura | Marca-d'água da página e dos cards | Idem |
| `/images/reviews/pinkcheeks/cupom-pinkcheeks-checkout-com-cupom.webp` | Coluna do resumo do checkout no teste de 19/11, sem dado pessoal | `cartPrint` em "Como usar" | Próprio |

Para trocar um logo, criar arquivo com nome novo, conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
