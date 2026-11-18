---
parceiro: "Barbour's Beauty"
slug_cupom: "barbours"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2026-12-18"
---

# Dossiê Factual: Barbour's Beauty

Loja de código com link de afiliado, cadastrada em 18/11/2026 a pedido do Bruno ("Novo afiliado:
https://barbours.gogroup.com.br/emcasacomcecilia & https://www.thebarboursbeauty.com.br/ cupom CECILIALINHARES 10% OFF").
Página `/cupons/barbours`, só em português. Marca de fragrâncias para o corpo (body splash, perfume para cabelo,
hidratantes, óleo de banho, linha masculina Homme). A vitrine roda no Shopify, mas o carrinho leva a um checkout próprio,
em `seguro.thebarboursbeauty.com.br`, onde o cupom entra.

---

## 1. Dados Comerciais (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom CECILIALINHARES, 10% OFF, cliente novo e antigo | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `barbours`) | 2026-11-18 | 2026-12-18 | Link de afiliado `https://barbours.gogroup.com.br/emcasacomcecilia` (GoGroup; nunca abrir) | Alta |
| Teste 1 (print do Bruno e depois no nosso Chrome): Kit Clássicos Masculinos, de R$ 209,70 por R$ 109,90: Descontos − R$ 10,99, total R$ 98,91 | teste_carrinho | Checkout `seguro.thebarboursbeauty.com.br`, pelo Finalizar a compra do carrinho, sem login, sem finalizar | 2026-11-18 | 2026-12-01 | Kit em promoção | Alta |
| Teste 2: o kit + Necessaire + Perfume + Body My Sweet Delight (R$ 109,90, sem promoção): R$ 219,80 → − R$ 21,98 → R$ 197,82 | teste_carrinho | Idem | 2026-11-18 | 2026-12-01 | Print do resumo no `cartPrint` | Alta |
| O `/checkout` do www (checkout padrão do Shopify) recusa o código: "Insira um código de desconto válido" | teste_carrinho | Teste de 18/11, três carrinhos | 2026-11-18 | 2026-12-01 | Não é o caminho do cliente: o botão do carrinho leva ao `seguro.` | Alta |
| Pagamento: Pix e cartões (Visa, Mastercard, Elo, Amex, Hipercard, Diners, Discover, Aura); até 4x sem juros | condicao_comercial_volatil | Rodapé do checkout e faixa da home | 2026-11-18 | 2026-12-18 | O produto de R$ 109,90 mostrava 3x; desconto no Pix não lido (o pagamento pede nome, e-mail e CPF) | Média |
| Frete grátis: SP acima de R$ 119; ES, RJ e MG acima de R$ 149; Sul e Centro-Oeste acima de R$ 169; Nordeste acima de R$ 199; Norte acima de R$ 259 | condicao_comercial_volatil | Central de ajuda, Política de Frete (`app.goconnect360.com.br/hc/barbours-beauty`) | 2026-11-18 | 2026-12-18 | Não diz se o mínimo conta antes ou depois do cupom; prazo médio de 7 a 10 dias úteis (`/policies/shipping-policy`) | Alta |

---

## 2. Fatos Oficiais (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Empresa: BEAUTY HUB VAREJO LTDA, CNPJ 60.453.162/0001-07, Serra (ES) | fato_oficial | Rodapé do checkout | 2026-11-18 | 2027-02-18 | Privacidade e programa de embaixadoras em domínios da GoGroup |
| Linha: body splash (inclusive a coleção Feliz no Simples by Theodoro), perfume para cabelo, geleia e body cream, óleo de banho, iluminador Golden Glow, roll-on e a linha masculina Homme | fato_oficial | Menu e vitrine | 2026-11-18 | 2027-02-18 | |
| Cancelamento e troca: desistência em até 7 dias do recebimento; pedido enviado não se cancela, mas pode ser recusado na entrega, com reembolso quando volta à loja; trocas pelo portal `thebarboursbeauty.troque.app.br` | fato_oficial | `/policies/refund-policy` e rodapé | 2026-11-18 | 2027-02-18 | Reembolso no cartão em uma a duas faturas; no Pix, por depósito em conta |

---

## 3. Alertas Editoriais

- **Teste pelo caminho do cliente:** COMPRAR no produto, carrinho, Finalizar a compra. O `/checkout` direto e o carrinho
  montado pela API caem no checkout do Shopify e dão uma recusa falsa. Os popups de roleta e de presentes podem engolir o
  primeiro clique no COMPRAR, e o bloco "Leve mais e pague menos" tem chaves que acrescentam kits.
- O checkout mostra um cupom de primeira compra da própria loja e a roleta oferece cupons: nunca citar.
- A home avisa que a loja não é endossada nem afiliada às marcas mencionadas, e avaliações dizem que as fragrâncias
  "lembram perfumes famosos": não comparar com perfumes de outras marcas nos artigos sem decisão do Bruno.
- Nos artigos, usar `coupon: "barbours"` e link relativo para `/cupons/barbours`, com a âncora exata "cupom Barbour's".

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/barbours.png` | Logo oficial do site (`Barbours_Marca_RubyRed`, PNG do CDN da loja), baixado em 2026-11-18, centrado em 256 × 256 sobre branco | Página da loja, cards, imagem de compartilhamento e `/sobre` | Logo da marca parceira, para divulgação da parceria |
| `/images/logos/bolinhas/barbours.png` | O mesmo logo em branco, 512 × 512 transparente, sobre o `background` #CD2D2F | Bolinha da vitrine e de /reviews | Idem |
| `/images/logos/watermarks/barbours.webp` | O mesmo logo todo em preto, 480 px de largura | Marca-d'água da página e dos cards | Idem |
| `/images/reviews/barbours/cupom-barbours-checkout-com-cupom.webp` | Resumo da compra do checkout no teste 2 de 18/11, sem dado pessoal | `cartPrint` em "Como usar" | Próprio |

Para trocar um logo, criar arquivo com nome novo, conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
