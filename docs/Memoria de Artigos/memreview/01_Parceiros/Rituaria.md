---
parceiro: "Rituária"
slug_cupom: "rituaria"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2026-12-17"
---

# Dossiê Factual: Rituária

Loja de código, sem link de afiliado, cadastrada em 17/11/2026 a pedido do Bruno ("Para divulgar · 10% para quem
comprar", EMCASA, "não tem utm pelo que vi"). Página `/cupons/rituaria`, só em português. Marca brasileira de
suplementos, superfoods e dermocosméticos; o site é Shopify, com o checkout próprio em `seguro.rituaria.com.br`.

---

## 1. Dados Comerciais (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom EMCASA, 10% OFF, cliente novo e antigo | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `rituaria`) | 2026-11-17 | 2026-12-17 | Sem link próprio: o botão leva a `https://www.rituaria.com.br/` | Alta |
| Teste 1: Capilar Nutri - 30 dias (R$ 49,90, preço cheio) + Fórmula Mov Nutri - 30 dias (R$ 149,00 por R$ 69,90): R$ 119,80 → − R$ 11,98 → R$ 107,82 | teste_carrinho | Checkout `seguro.rituaria.com.br`, sem login, sem finalizar | 2026-11-17 | 2026-12-01 | Print do resumo guardado para o `cartPrint` | Alta |
| Teste 2: Fórmula 4Mag (Magnésio) - 30 dias (R$ 99,90 por R$ 59,90) + Capilar Nutri + Fórmula Complexo B - 60 dias (R$ 44,90): R$ 154,70 → − R$ 15,47 → R$ 139,23 | teste_carrinho | Idem | 2026-11-17 | 2026-12-01 | O cupom entra sobre o preço promocional | Alta |
| Pix: "Você ganhou 5% de desconto pagando com Pix" | condicao_comercial_volatil | Checkout, etapa de identificação | 2026-11-17 | 2026-12-17 | A soma com o cupom no pagamento não foi vista (pede identificação); regra do Bruno: cupom vale em todo pagamento | Média |
| Cashback de 10% para a próxima compra, em forma de cupom; "Descontos e Cashback não são cumulativos. Você pode escolher apenas um benefício por compra." | condicao_comercial_volatil | `https://www.rituaria.com.br/policies/terms-of-service` e faixa da home | 2026-11-17 | 2026-12-17 | Com o EMCASA aplicado, o checkout seguiu mostrando o aviso de 10% de cashback | Média |
| Frete grátis: SP, ES, RJ e MG acima de R$ 199; PR, SC, RS, DF, GO, MS e MT acima de R$ 229; Nordeste acima de R$ 279; AC, AP, AM, PA, RO, RR e TO acima de R$ 349 | condicao_comercial_volatil | Central de ajuda, Política de Frete (`app.goconnect360.com.br/hc/rituaria/pt_BR/categories/poltica-de-frete`) | 2026-11-17 | 2026-12-17 | Correios (PAC e SEDEX); frete por peso e volume; não diz se o mínimo conta antes ou depois do cupom | Alta |
| Parcelamento: 3x sem juros no cartão | condicao_comercial_volatil | Faixa da home | 2026-11-17 | 2026-12-17 | | Média |
| Black November: "Leve 3, Pague 2 em todos os suplementos" | condicao_comercial_volatil | Banner da home | 2026-11-17 | 2026-12-01 | Não entrou sozinho num carrinho com três suplementos (4Mag, Capilar Nutri, Complexo B): regra não lida; fora da página | Baixa |

---

## 2. Fatos Oficiais (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Marca criada em 2021, idealizada pela Gabi; suplementos, superfoods e skincare, "de dentro para fora e de fora para dentro" | fato_oficial | `https://www.rituaria.com.br/pages/sobre-nos` | 2026-11-17 | 2027-02-17 | Operação da Beauty Hub Varejo Ltda (rodapé); os termos citam a Maga Comércio de Produtos Cosméticos Ltda |
| Trocas: desistência em 7 dias corridos do recebimento, devolução gratuita e reembolso integral com frete; defeito, avaria ou produto errado em até 30 dias; sem troca por insatisfação depois do uso | fato_oficial | Central de ajuda, Trocas e Cancelamentos | 2026-11-17 | 2027-02-17 | Pedido pelo portal de trocas da loja |

---

## 3. Alertas Editoriais

Nunca citar códigos de terceiros nem da loja: em 17/11 a IA do Google listava códigos de outros sites e cupons da
própria loja (inclusive de primeira compra), com percentuais de 10% a 20%. A página responde "Existe cupom Rituária de
20%?" sem nomear código. O cadastro do site oferece 10% de boas-vindas: não citar sem decisão do Bruno. Nos artigos,
usar `coupon: "rituaria"` e link relativo para `/cupons/rituaria`, com a âncora exata "cupom Rituária".

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/rituaria.png` | Logo oficial do site (`/cdn/shop/files/logo_rituaria_oficial.png`, PNG 1009 × 301), baixado em 2026-11-17 com o OK do Bruno, centrado em 256 × 256 sobre branco | Página da loja, cards, imagem de compartilhamento e `/sobre` | Logo da marca parceira, para divulgação da parceria |
| `/images/logos/bolinhas/rituaria.png` | O mesmo nome em branco, 512 × 512 transparente, sobre o `background` #8E7396 (o lilás do botão Atacado do site) | Bolinha da vitrine e de /reviews | Idem |
| `/images/logos/watermarks/rituaria.webp` | O mesmo logo em preto, 480 px de largura | Marca-d'água da página e dos cards | Idem |
| `/images/reviews/rituaria/cupom-rituaria-checkout-com-cupom.webp` | Print do resumo do checkout no teste 1 de 17/11, sem dado pessoal | `cartPrint` em "Como usar" | Próprio |

Os arquivos estão no CDN e no mapa de entrega. Para trocar um logo, criar arquivo com nome novo, conforme
`docs/GUIA-MIDIA-EDITORIAL.md`.
