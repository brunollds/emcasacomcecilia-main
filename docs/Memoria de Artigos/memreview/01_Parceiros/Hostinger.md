---
parceiro: "Hostinger"
slug_cupom: "hostinger"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-01-19"
---

# Dossiê Factual: Hostinger

Indicação iniciada em 19/10/2026 com a página `/cupons/hostinger`. Em 19/10/2026 entraram os quatro artigos de onboarding, cada um nos 10 idiomas: [[hostinger-e-confiavel]], [[hostinger-reclame-aqui-nota-reputacao]], [[cupom-hostinger-indicacao]] e [[black-friday-hostinger]]. Não é parceria de
marca: o site está hospedado na Hostinger. Até 29/10/2026 era o programa de indicação, com o código
`SONARDEOFERTAS` dentro do link. Em 29/10/2026 o Bruno entrou no programa de agências e a Hostinger
passou a loja de código: **cupom `SONAR20`** (20%), digitado no carrinho ou pelo link
`?REFERRALCODE=SONAR20`. Fica fora do `/sobre` (decisão do Bruno, 19/10/2026).

---

## 1. Dados Comerciais (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom `SONAR20`: 20% no primeiro período, digitado no carrinho ("Tem um cupom de desconto?" no /br; "Have a coupon code?" no global) ou pelo link | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `hostinger`, `offerMode: 'discount-code'`, desde o #352) e `couponTranslations.ts` nos 9 idiomas | 2026-10-29 | 2026-11-29 | Programa de agências (Bruno, 29/10/2026) | Alta |
| Regra da parceria: o SONAR20 vale em todos os planos, mensais e anuais, para cliente novo ou antigo | condicao_comercial_volatil | Bruno, 29/10/2026 | 2026-10-29 | 2026-11-29 | Regra, não teste: escrever "pela regra da parceria" | Alta |
| Teste no /br (29/10/2026): plano Startup de 48 meses R$ 1.919,52 → R$ 1.535,62; de 1 mês R$ 139,99 → R$ 111,99 | condicao_comercial_volatil | Chrome, sessão de cupons | 2026-10-29 | 2026-11-29 | Os 20% saíram do preço da Black Friday; o código valeu sozinho, sem o link. Só no PT | Alta |
| Teste no global (29/10/2026): Startup de 48 meses US$ 383,52 → US$ 306,82 | condicao_comercial_volatil | Prints do Bruno | 2026-10-29 | 2026-11-29 | O único teste citado fora do PT | Alta |
| Testes de 30/10/2026: e-mail profissional Premium Business (48 meses, R$ 383,52 → R$ 306,82) e Reach 500 (24 meses, R$ 215,76 → R$ 172,61) | condicao_comercial_volatil | Prints do Bruno | 2026-10-30 | 2026-11-30 | Ver [[hostinger-reach-ou-mailchimp-brevo]] | Alta |
| Sem teste: renovação, VPS, agentes de IA, domínio e soma com outros cupons | condicao_comercial_volatil | — | 2026-10-29 | 2026-11-29 | "Não testamos a renovação; confira o preço no carrinho". Nunca dizer que soma nem "um cupom por pedido" | Alta |
| Link PT `https://www.hostinger.com/br?REFERRALCODE=SONAR20`; global `https://www.hostinger.com/?REFERRALCODE=SONAR20` | condicao_comercial_volatil | `offerUrl` em `couponsData.ts` e `couponTranslations.ts` | 2026-10-29 | 2026-11-29 | Link profundo mantém o caminho e troca só o código; no PT, sempre com `/br` | Alta |
| Compras pelo código ou pelo link podem gerar comissão para o Bruno | condicao_comercial_volatil | Bruno, 29/10/2026 | 2026-10-29 | 2026-11-29 | Nota: "Compras com o código SONAR20 ou pelo link podem gerar comissão para o Bruno, sem custo extra para você." Saiu o "crédito na Hostinger" | Alta |
| Até 29/10/2026: indicação por link `?REFERRALCODE=SONARDEOFERTAS`, sem cupom, 12 meses ou mais, cliente novo, não somava, crédito para quem indica | historico | página de indicação da Hostinger | 2026-10-19 | — | Código antigo: o `test:review-i18n` barra `SONARDEOFERTAS` em qualquer artigo | Alta |

---

## 2. Fatos Oficiais (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Empresa de hospedagem de sites: hospedagem, criador de sites, VPS, domínios e e-mail | fato_oficial | hostinger.com/br | 2026-10-19 | 2027-01-19 | |
| O Em Casa com Cecília roda na Hostinger, como Node.js Web App | fato_oficial | `docs/DEPLOY-GUIDE.md` | 2026-10-19 | 2027-01-19 | É a experiência própria que a página pode citar |

---

## 3. Alertas Editoriais

**Desde 29/10/2026 (SONAR20).** O SONAR20 é cupom: o texto manda colar o código no campo do carrinho ou
entrar pelo link. Nunca citar o `SONARDEOFERTAS` nem dizer "não há código", "nada para digitar" ou
"só no link": o `test:review-i18n` barra essas frases nos artigos da Hostinger, nos 10 idiomas (pedido
do Redesenho, #353). Nunca dizer que soma com outros cupons nem "um cupom por pedido" (não testado).
Nunca citar código de terceiros. Renovação sem teste: "não testamos a renovação; confira o preço no
carrinho". Fora do PT, só o teste do site global, com o nome do campo em inglês. Artigo só por decisão
do Bruno: as buscas por cupom de hospedagem são muito disputadas.

**Até 29/10/2026 (histórico).** Era indicação por link: nunca mandar digitar o `SONARDEOFERTAS`, nem
chamar de cupom; 20% só no primeiro período e sem somar com outros cupons.

**Termos da indicação (revisão de 02/09/2026, lidos em 21/10/2026).**
- O link "não deve ser publicado ou distribuído em sites comerciais, em blogs ou em canais/vídeos do YouTube", só nas redes sociais pessoais.
- Decisão do Bruno (21/10/2026): seguir com a indicação enquanto pede a entrada no programa de afiliados da Hostinger. Se for aceito, o link de todos os artigos e da página da loja muda num PR próprio.
- **29/10/2026:** aceito no programa de agências. A página da loja passou ao SONAR20 no #352 e os 110 artigos (11 famílias × 10 idiomas) no #353, num deploy só (release `7eb13d89`). Os termos da indicação acima deixam de reger o texto.
- Os mesmos termos dão como elegíveis: hospedagem, VPS, e-mail, Reach, Criador com IA, "aplicativos de automação com IA" e "Agentes da Hostinger", sempre em assinaturas de 12 meses ou mais. O texto nunca promete o desconto em plano mensal.

**Agentes de IA (21/10/2026).** São quatro briefings em 10 idiomas: [[openclaw-hostinger-gerenciado-ou-vps]], [[melhor-vps-para-openclaw]], [[openclaw-ou-hermes-agent]] e [[paperclip-ai-hostinger]].
- Ninguém do site usa OpenClaw, Hermes ou Paperclip.
- O OpenClaw e o Hermes gerenciados trazem créditos de IA. O Paperclip gerenciado não traz: o cliente usa as próprias chaves.

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/hostinger-icon.png` | Símbolo "H" do SVG do logotipo do site oficial, em branco sobre o roxo da marca (`#673DE6`), baixado em 2026-10-19 | Página da loja, cards e imagem de compartilhamento | Identificação da marca |
| `/images/logos/watermarks/hostinger.webp` | Silhueta do logotipo completo do mesmo SVG | Marca-d'água da página e dos cards | Identificação da marca |

Os logos estão no CDN e no mapa de entrega. Para trocar um logo, criar arquivo com nome novo,
conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
