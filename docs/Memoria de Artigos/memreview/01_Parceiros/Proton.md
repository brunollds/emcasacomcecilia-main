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
(`productLinks`): um link de afiliado para cada produto, na seção "Links da Proton por produto". O pacote inicial de
artigos (PN1 a PN4) tem briefing desde 17/11: fatos, preços em reais e regras em [[proton-fatos-1711]].

---

## 1. Dados Comerciais (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Links de afiliado, sem cupom e sem desconto próprio | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `proton`, `offerMode: 'affiliate-link'`) | 2026-11-17 | 2026-12-17 | Bruno, 17/11: "não tem cupom pelo que vi, somente os links com tracking" | Alta |
| Proton VPN `https://go.getproton.me/SH39K` (botão principal), Proton Mail `…/SH39L`, Proton Pass `…/SH39M`, Proton Drive `…/SH39N`, Lumo `…/SH39O` | condicao_comercial_volatil | `offerUrl` e `productLinks` em `src/lib/couponsData.ts` | 2026-11-17 | 2026-12-17 | Como vieram do Bruno. O do VPN leva a todos os planos VPN Plus e Proton Unlimited; o programa paga assinatura nova (inclusive de grátis para pago) e renovação. Nunca abrir nem clicar: o clique grava atribuição | Alta |
| Garantia de reembolso de 30 dias em todas as assinaturas | condicao_comercial_volatil | `https://protonvpn.com/pricing` (seção de planos e FAQ) | 2026-11-17 | 2026-12-17 | Lido sem login. Pagamento em dinheiro e por transferência bancária não tem reembolso (`https://proton.me/support/payment-options`) | Alta |
| Preços em reais nas páginas `/pt-br`, com seletor BRL, CHF, EUR e USD. VPN Plus: R$ 34,99 por mês; 1 ano na Black Friday por R$ 125,88 (R$ 10,49/mês, "-70%" sobre o mensal), renova por R$ 293,88 a cada 12 meses; 2 anos por R$ 294,96. Unlimited: R$ 45,49 por mês; 1 ano por R$ 273,48, renova por R$ 419,88; 2 anos por R$ 671,76. Mail Plus e Drive Plus: R$ 105,48 no 1º ano, renovam por R$ 167,88. Pass Plus: R$ 83,88, renova por R$ 125,88 | condicao_comercial_volatil | `protonvpn.com/pt-br/pricing`, `protonvpn.com/pt-br/black-friday`, `proton.me/pt-br/black-friday` | 2026-11-17 | 2026-12-01 | Job 1, 17/11. Corrige a linha de pagamento da seção 2: o preço aparece em real. Campanha sem data de fim publicada; vale para contas novas; desconto calculado sobre o preço mensal | Alta |
| Reembolso, pelos termos de 05/11/2026: 30 dias da compra inicial; cancelamento e pedido dentro do prazo, pelo formulário de suporte; uma vez por usuário; só para assinatura feita direto com a Proton; processado em até 30 dias | condicao_comercial_volatil | `proton.me/pt-br/legal/terms` | 2026-11-17 | 2027-02-17 | Renovação automática pelo preço vigente na data | Alta |
| Promoção de Black Friday em 17/11: Mail Plus e Unlimited com 50% no primeiro ano | condicao_comercial_volatil | `https://proton.me/pt-br/pricing` | 2026-11-17 | 2026-12-01 | Fora da página: a promoção usa código da própria Proton. Se o Bruno quiser, pode virar campanha em `content/campanhas/` sem o código | Média |

---

## 2. Fatos Oficiais (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Empresa suíça de serviços com privacidade e criptografia: VPN, Mail, Pass, Drive e o assistente de IA Lumo; plano grátis e o pacote Proton Unlimited | fato_oficial | `https://proton.me` | 2026-11-17 | 2027-02-17 | |
| Proton VPN grátis: 1 aparelho por vez, servidores em 10 países; VPN Plus: até 10 aparelhos, mais de 140 países | fato_oficial | `https://protonvpn.com/pricing` | 2026-11-17 | 2027-02-17 | |
| Conta grátis: e-mail e 5 GB no Proton Drive | fato_oficial | `https://proton.me/pt-br/pricing` (tabela comparativa) | 2026-11-17 | 2027-02-17 | |
| Pagamento: cartão de crédito e de débito, PayPal, Apple Pay, Google Pay, Bitcoin, dinheiro e transferência bancária; preços em dólar, euro ou franco suíço | fato_oficial | `https://proton.me/support/payment-options` e `https://protonvpn.com/pricing` | 2026-11-17 | 2027-02-17 | Sem Pix. **Em 17/11 o preço apareceu em real nas páginas `/pt-br`** (linha nova na seção 1); o FAQ da página de preços lista Visa, Mastercard, American Express, PayPal e créditos Proton |

---

## 3. Alertas Editoriais

Nunca chamar o link de cupom nem prometer desconto ou percentual. Alegações de privacidade ("sem registros",
"auditado", "código aberto") sempre com atribuição; nunca "anônimo", "100% seguro" nem promessa de streaming. Preço
promocional sempre com o valor cobrado de uma vez e o da renovação ao lado. Reclame Aqui: perfil não verificado, 14
reclamações em 12 meses, nenhuma respondida (17/11). Código promocional da própria Proton não entra
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
