---
parceiro: "Starlink"
slug_cupom: "starlink"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2026-12-19"
---

# Dossiê Factual: Starlink

Loja de link de indicação, cadastrada em 19/11/2026 a pedido do Bruno ("adicionar a starlink como link de indicação
(oferece R$200,00 para novos usuarios)"). Página `/cupons/starlink`, só em português. Internet via satélite da SpaceX,
com pedido em `starlink.com/br`. Não é afiliação com comissão: é o programa de indicação de cliente da Starlink, na conta
do Bruno. Quem assina pelo link e quem indicou recebem o mesmo valor.

---

## 1. Dados Comerciais (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| R$ 200 para quem assina pela primeira vez pelo link de indicação | condicao_comercial_volatil | Bruno (mensagem de 19/11/2026); `src/lib/couponsData.ts` (slug: `starlink`) | 2026-11-19 | 2026-12-19 | `offerUrl` = link de indicação da conta do Bruno (nunca abrir nem editar). A central de ajuda diz só que o valor depende do país e aparece na conta (US$ 100 nos EUA) | Média |
| Os dois lados recebem o mesmo valor depois de 2 meses de assinatura; por padrão, crédito de serviço descontado da fatura seguinte; onde houver, dá para trocar por dinheiro (Stripe) na aba Indicações | condicao_comercial_volatil | Central de ajuda, "A Starlink tem um programa de indicação?" (`starlink.com/br/support/article/eee7e99e-a736-f16e-9506-c446dd70fb16`) | 2026-11-19 | 2026-12-19 | Se o Brasil paga em dinheiro ou só em crédito não foi conferido | Alta |
| A indicação vale fora do Brasil, na maioria dos países onde a Starlink está disponível; o valor depende do país do cadastro e pode ser outro fora do Brasil | condicao_comercial_volatil | Central de ajuda ("Os valores podem variar para indicações fora do seu país"); prints do Bruno de 19/11/2026: o assistente do app da Starlink e o post da @Starlink de 02/10/2025 ("refer anyone in all 150 countries") | 2026-11-19 | 2026-12-19 | O post de 2025 falava em um mês grátis; a regra de hoje é o valor por país. Os Termos do programa nos EUA ainda pedem endereço no mesmo país: a central de ajuda, mais nova, vale | Alta |
| Elegível: cliente novo (atuais e antigos, não), pedido em starlink.com pelo link, primeiro mês pago e kit ativado; planos Residencial Lite, Residencial, 100 Mbps, 200 Mbps e Máx; Viagem 100 GB, 300 GB e Ilimitado. Revendedor, marketplace e transferência de conta não entram; indicação sem o link não se inclui depois | condicao_comercial_volatil | Mesma página | 2026-11-19 | 2026-12-19 | | Alta |
| Promoção da página: kit por R$ 49 e 30% de desconto no Residencial Max por 12 meses em áreas selecionadas, cadastro até 30/11; Residencial a partir de R$ 132,30/mês, Máx a partir de R$ 174,30/mês, Viagem a partir de R$ 339/mês | condicao_comercial_volatil | `starlink.com/br/residential` (redireciona para `/br`) | 2026-11-19 | 2026-11-30 | **Fora da página da loja de propósito**: vence em 30/11 e depende do endereço. A soma da indicação com a promoção não foi vista (a indicação não é desconto no pedido) | Média |

---

## 2. Fatos Oficiais (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| 30 dias de teste com reembolso integral | fato_oficial | `starlink.com/br` ("Devolução em até 30 dias") | 2026-11-19 | 2027-02-19 | A FAQ cita com data |
| Kit "Plug and Play", dados ilimitados; Starlink é uma divisão da SpaceX | fato_oficial | `starlink.com/br` | 2026-11-19 | 2027-02-19 | Base do `aboutBrand` |

---

## 3. Alertas Editoriais

- Nunca abrir o link de indicação (`?referral=RC-DF-…`): a indicação é da conta do Bruno.
- Nenhum texto chama a indicação de cupom nem de desconto no pedido: os R$ 200 entram depois de 2 meses.
- Transparência: a página diz que quem indicou recebe o mesmo valor.
- Sem preço de plano nem promoção da Starlink na página da loja (mudam e dependem do endereço).
- Nos artigos, usar `affiliate: "starlink"` e link relativo para `/cupons/starlink`.

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/starlink.png` | Letreiro branco do header do site (`/assets/images/logo/logo_white.png`, baixado em 2026-11-19), recolorido de preto e centrado em 256 × 256 sobre branco | Página da loja, cards, imagem de compartilhamento e `/sobre` | Logo da marca, para divulgação da indicação |
| `/images/logos/bolinhas/starlink.png` | O mesmo letreiro em branco, 440 px de largura em 512 × 512 transparente, sobre o `background` #000000, com `round: true` (o letreiro largo, sem símbolo à parte, ocupa o disco quase inteiro) | Bolinha da vitrine e de /reviews | Idem |
| `/images/logos/watermarks/starlink.webp` | O mesmo letreiro em preto, 480 px de largura | Marca-d'água da página e dos cards | Idem |

Para trocar um logo, criar arquivo com nome novo, conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
