---
parceiro: "BioBio"
slug_cupom: "biobio"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2026-12-20"
---

# Dossiê Factual: BioBio

Loja de cupom, cadastrada em 20/11/2026 a pedido do Bruno ("Novo afiliado: EMCASABIOBIO", com o print do resumo da
compra). Página `/cupons/biobio`, só em PT. A parceria não tem link próprio: o botão abre `biobio.com.br`. Dermocosméticos
de origem natural e veganos (BioBio Cosméticos Naturais LTDA, CNPJ 50.300.951/0001-54, Curitiba/PR pelo DDD do SAC).

---

## 1. Dados Comerciais (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| EMCASABIOBIO dá 10% no pedido | condicao_comercial_volatil | Teste do Bruno (print de 20/11/2026) e teste pelo Chrome no mesmo dia; `src/lib/couponsData.ts` (slug: `biobio`) | 2026-11-20 | 2026-12-20 | Protetor Solar 100% Físico e Mineral (Sunnature FPS 30) de R$ 139,90 por R$ 104,93: −R$ 10,49, total R$ 94,44. O print do resumo é do Bruno | Alta |
| O cupom entra no checkout próprio (`seguro.biobio.com.br`), no Resumo da compra, antes da identificação: "Inserir cupom de desconto", campo "Cupom (opcional)", botão "Adicionar"; linha "Cupom de desconto" em Descontos | condicao_comercial_volatil | Teste pelo Chrome, 20/11/2026 | 2026-11-20 | 2026-12-20 | A extensão lê o texto do checkout, mas não tira print dele. Parar no pedido de nome, e-mail, CPF e WhatsApp | Alta |
| Soma com a promoção vigente do site (Black Month até 50% OFF em 20/11; Black Friday até 70% OFF em 27/11) | condicao_comercial_volatil | Testes pelo Chrome em 20/11/2026 e 27/11/2026 (`seguro.biobio.com.br`) | 2026-11-27 | 2026-12-20 | Em 27/11/2026 (campanha até 70% OFF encerrada às 23h59, `content/campanhas/biobio-black-month-2026.json`), o `Trio Essencial` baixou de R$ 269,70 para R$ 242,73 (−R$ 26,97 na linha `"Cupom de desconto"`) com `EMCASABIOBIO` + indicação de 10% de cashback. Em kits que misturam cores/itens com descontos distintos na vitrine (ex.: `Dupla Make Prática` com `BBS Amora` em 27/11: avulsos R$ 169,84 contra R$ 184,90 no kit antes do cupom), comparar a soma dos avulsos no carrinho antes de fechar o kit | Alta |
| Cashback de 10% em pedidos a partir de R$ 99,90 (frete conta), saldo válido por 45 dias, paga até 50% do valor dos produtos em pedidos a partir de R$ 100 (não abate frete); saldo e cupom entram na mesma compra | condicao_comercial_volatil | `/pages/termos-de-servico` (remete a `/pages/cashback`, lidos em 27/11/2026); resumo da compra com `EMCASABIOBIO` em 20/11 e 27/11 mostrou `"10% de cashback para a próxima compra"` | 2026-11-27 | 2026-12-20 | Os Termos atuais remetem diretamente à página Cashback (45 dias; sem divergência de 30 dias) | Alta |
| Frete grátis para Sul e Sudeste acima de R$ 279 (pendente se conta antes ou depois do código); parcelamento de até 8x sem juros fora de campanha e até 3x sem juros (até 10x no total) registrado em 27/11, além de frete fixo de R$ 9,99 para o Brasil acima de R$ 199 na campanha de 27/11 | condicao_comercial_volatil | Faixa da home, fichas de produto e gaveta/checkout em 20/11 e 27/11/2026 | 2026-11-27 | 2026-12-01 | A página `"Política de frete"` do rodapé abre a política de privacidade; no checkout sem CPF o frete depende de identificação, mantendo pendente a base do piso de R$ 279 antes/depois do cupom. Reconferir o parcelamento sem juros (3x × 8x) a partir de 28/11 | Média |
| O cupom vale no Pix e em todas as formas de pagamento | condicao_comercial_volatil | Regra do Bruno (20/11/2026): todo cupom funciona com Pix; percentual de desconto no Pix é critério da loja e muda sem aviso | 2026-11-20 | 2026-12-20 | Não é pendência nem pede teste. A página não cita percentual do Pix | Alta |

---

## 2. Fatos Oficiais (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Dermocosméticos multifuncionais de origem natural, 100% veganos: protetor solar mineral, base em bastão FPS 33, BBS FPS 63, pó facial FPS 42, skincare | fato_oficial | `biobio.com.br` e `/pages/conheca-a-biobio` | 2026-11-20 | 2027-02-20 | Base do `aboutBrand` |
| Troca e desistência em 7 dias corridos do recebimento, embalagem original, sem uso e com lacre; reembolso em até 10 dias úteis; SAC sac@biobio.com.br e WhatsApp, seg a sex, 9h às 17h | fato_oficial | Página "Trocas e Devoluções" | 2026-11-20 | 2027-02-20 | A FAQ cita |

---

## 3. Alertas Editoriais

- A loja exibe cupons próprios (pop-up de cadastro de primeira compra, códigos de vitrine/campanha e faixa do checkout) e códigos de outras criadoras: **nunca citar nenhum deles** em artigos, tabelas ou briefings.
- O cashback é da loja (regra atribuída a `/pages/cashback`, 45 dias) e soma com o cupom; não chamar de desconto do cupom.
- Sem link de afiliado: o botão abre o site oficial (`biobio.com.br`).
- O cupom vale para clientes novos e antigos (regra das parcerias).
- A partir de 28/11 (após o encerramento da Black Friday em 27/11 às 23h59) e em 01/12, reconferir o parcelamento sem juros nas fichas (`3x` × `8x`) e retestar o código pelo caminho do cliente, junto com Pink Cheeks, Gocase, Cola e Decora e Denavita.

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/biobio.png` | Logo do header do site (`/cdn/shop/files/logo_horizontal.png`, 719 × 214, baixado em 2026-11-20), em #F09604, centrado em 256 × 256 sobre branco | Página da loja, cards, imagem de compartilhamento e `/sobre` | Logo da marca, para divulgação do cupom |
| `/images/logos/bolinhas/biobio.png` | O mesmo letreiro em branco, 440 px de largura em 512 × 512 transparente, sobre o `background` #F09604, com `round: true` | Bolinha da vitrine e de /reviews | Idem |
| `/images/logos/watermarks/biobio.webp` | O mesmo letreiro em #F09604, 480 px de largura | Marca-d'água da página e dos cards | Idem |
| `/images/reviews/biobio/cupom-biobio-checkout-com-cupom.webp` | Print do Bruno do Resumo da compra com o cupom (20/11/2026) | `cartPrint` da página | Print próprio |

Para trocar um logo, criar arquivo com nome novo, conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
