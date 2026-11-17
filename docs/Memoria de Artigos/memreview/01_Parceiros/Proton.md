---
parceiro: "Proton"
slug_cupom: "proton"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2026-12-17"
---

# Dossiê Factual: Proton

Loja de link, sem código nosso, cadastrada em 17/11/2026 a pedido do Bruno, com a página `/cupons/proton` e as
traduções nos outros nove idiomas (`/<idioma>/coupons/proton`). É a primeira loja com links por produto
(`productLinks`): um link de afiliado para cada produto, na seção "Links da Proton por produto".

---

## 1. Dados Comerciais (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Links de afiliado, sem cupom e sem desconto próprio | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `proton`, `offerMode: 'affiliate-link'`) | 2026-11-17 | 2026-12-17 | Bruno, 17/11: "não tem cupom pelo que vi, somente os links com tracking" | Alta |
| Proton VPN `https://go.getproton.me/SH39K` (botão principal), Proton Mail `…/SH39L`, Proton Pass `…/SH39M`, Proton Drive `…/SH39N`, Lumo `…/SH39O` | condicao_comercial_volatil | `offerUrl` e `productLinks` em `src/lib/couponsData.ts` | 2026-11-17 | 2026-12-17 | Como vieram do Bruno. O do VPN leva a todos os planos VPN Plus e Proton Unlimited; o programa paga assinatura nova (inclusive de grátis para pago) e renovação. Nunca abrir nem clicar: o clique grava atribuição | Alta |
| Garantia de reembolso de 30 dias em todas as assinaturas | condicao_comercial_volatil | `https://protonvpn.com/pricing` (seção de planos e FAQ) | 2026-11-17 | 2026-12-17 | Lido sem login. Pagamento em dinheiro e por transferência bancária não tem reembolso (`https://proton.me/support/payment-options`) | Alta |
| Promoção de Black Friday em 17/11: Mail Plus e Unlimited com 50% no primeiro ano | condicao_comercial_volatil | `https://proton.me/pt-br/pricing` | 2026-11-17 | 2026-12-01 | Fora da página: a promoção usa código da própria Proton. Se o Bruno quiser, pode virar campanha em `content/campanhas/` sem o código | Média |

---

## 2. Fatos Oficiais (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Empresa suíça de serviços com privacidade e criptografia: VPN, Mail, Pass, Drive e o assistente de IA Lumo; plano grátis e o pacote Proton Unlimited | fato_oficial | `https://proton.me` | 2026-11-17 | 2027-02-17 | |
| Proton VPN grátis: 1 aparelho por vez, servidores em 10 países; VPN Plus: até 10 aparelhos, mais de 140 países | fato_oficial | `https://protonvpn.com/pricing` | 2026-11-17 | 2027-02-17 | |
| Conta grátis: e-mail e 5 GB no Proton Drive | fato_oficial | `https://proton.me/pt-br/pricing` (tabela comparativa) | 2026-11-17 | 2027-02-17 | |
| Pagamento: cartão de crédito e de débito, PayPal, Apple Pay, Google Pay, Bitcoin, dinheiro e transferência bancária; preços em dólar, euro ou franco suíço | fato_oficial | `https://proton.me/support/payment-options` e `https://protonvpn.com/pricing` | 2026-11-17 | 2027-02-17 | Sem Pix e sem real |

---

## 3. Alertas Editoriais

Nunca chamar o link de cupom nem prometer desconto ou percentual. Código promocional da própria Proton não entra
em página nem em artigo sem exceção dada pelo Bruno. Preço só com a moeda e a data da leitura: a Proton cobra em
dólar, euro ou franco suíço. Nos artigos, usar `affiliate: "proton"` e link relativo para `/cupons/proton`,
conforme `docs/CONTRATO-ARTIGO-AFILIADO.md`. Está em `INTERNATIONAL_STORES` desde 17/11/2026: o Bruno confirmou que o programa conta assinaturas de qualquer país, e as campanhas dos 10 idiomas podem levar os links da Proton.

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/proton.png` | Selo oficial `proton-badge-b2c.svg` (o "P" sobre o quadrado branco), do CDN do site (`pmecdn.protonweb.com/…/static/logos/proton/proton-badge-b2c.svg`), baixado em 2026-11-17 e exportado em 256 × 256 | Página da loja, cards e imagem de compartilhamento | Kit de mídia da Proton: uso livre com referência a proton.me (`https://proton.me/media/kit`) |
| `/images/logos/bolinhas/proton.png` | O "P" do mesmo selo, sem o quadrado branco, em 512 × 512 transparente, com 82% da altura | Bolinha da vitrine e de /reviews | Idem |
| `/images/logos/watermarks/proton.webp` | Silhueta preta do logo com o nome (`proton-text-b2c-light.svg`, mesmo CDN), 480 px de largura | Marca-d'água da página e dos cards | Idem |

Os logos estão no CDN e no mapa de entrega. Para trocar um logo, criar arquivo com nome novo, conforme
`docs/GUIA-MIDIA-EDITORIAL.md`.
