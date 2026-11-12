---
parceiro: "Petz"
slug_cupom: "petz"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-02-11"
---

# Dossiê Factual: Petz

Parceria iniciada em 11/11/2026 pelo programa Parceiro Petz, com a página `/cupons/petz`. Os quatro
artigos de onboarding foram ao ar no mesmo dia (release `4d50b265`): [[cupom-petz-como-usar]],
[[petz-e-confiavel]], [[petz-reclame-aqui-nota-reputacao]] e [[black-friday-petz]]. Os quatro
seguintes, também em 11/11 (PR #870, release `b851a12c`): [[assinatura-petz-ou-cupom]], [[petz-ou-cobasi]],
[[petz-ou-petlove]] e [[petz-entrega-expressa-ou-retirar-na-loja]], com as leituras em [[petz-leituras-pz5-pz8-1111]]. A página fica na prateleira Diversos de `/cupons`. O foco é sempre o cupom: o link da loja da
Cecília serve para a compra contar para a parceria.

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom `EMCASA`: 10% OFF nas compras no site e no app | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `petz`); parceiropetz.com.br ("cupom de 10% OFF válido em todas as compras no app e site") | 2026-11-11 | 2026-12-11 | Não soma com promoção: em cada item, a sacola fica com o desconto maior (teste de 11/11) | Alta |
| O EMCASA soma com os 5% do Retire na Loja (compras acima de R$ 199 no Centro-Oeste, Sul e Sudeste): 2 rações de R$ 189,99, R$ 379,98 → R$ 324,88 (10% do cupom e 5% da retirada sobre o resto) | condicao_comercial_volatil | Teste de 11/11 na sacola (navegador do app, sem login); fatos em `02_Artigos/petz-fatos-1111.md` | 2026-11-11 | 2026-12-11 | A página `/cupons/petz` ainda não cita: é com a sessão de cupons | Alta |
| Promoções, parcerias e descontos do site não são cumulativos, salvo desconto de retirada em loja e frete grátis | condicao_comercial_volatil | petz.com.br/institucional/como-comprar | 2026-11-11 | 2026-12-11 | A frase está na resposta sobre a assinatura; o teste confirmou o comportamento com o EMCASA | Alta |
| O desconto da Assinatura Petz não soma com outros cupons | condicao_comercial_volatil | petz.com.br/institucional/assinatura-petz | 2026-11-11 | 2026-12-11 | O EMCASA entra nas compras avulsas | Alta |
| O EMCASA não vale no plano de saúde pet da Petz | condicao_comercial_volatil | Teste do Bruno, 11/11/2026 | 2026-11-11 | 2026-12-11 | Banho e tosa, Seres e vacina seguem sem teste; serviço fica fora dos textos (decisão de 11/11) | Alta |
| Link da loja da Cecília: `https://petz.com.br/parceiro/emcasa` | condicao_comercial_volatil | Bruno, 11/11/2026; `offerUrl` em `src/lib/couponsData.ts` | 2026-11-11 | 2026-12-11 | Vai exatamente como veio. A sacola mostra "Você está comprando na loja emcasa do Parceiro Petz", mas o link não aplica o cupom. Os preços da loja que parecem ter 10% a menos são o preço "para assinantes" | Alta |
| Código de convite `EMCASA` | condicao_comercial_volatil | Bruno, 11/11/2026; parceiropetz.com.br | 2026-11-11 | 2026-12-11 | Serve para outra pessoa virar Parceiro Petz: a parceria ganha 3% sobre as vendas desse parceiro. Não é desconto para quem compra; fora da página até o Bruno decidir | Alta |

Teste de 2026-11-11 (Claude, no Chrome, sem login e sem finalizar): ração Golden Fórmula Mini Bits
(R$ 22,99, preço cheio), sachê Royal Canin Instinctive 85 g (promoção R$ 9,90, de R$ 10,99) e ração
Royal Canin Maxi Adult 12 kg (promoção R$ 279,99, de R$ 349,99). Com o EMCASA no campo "Digite seu
cupom" da sacola: Golden R$ 20,69 (10%), sachê R$ 9,89 (10% sobre o preço cheio, no lugar da
promoção) e Maxi R$ 279,99 (fica a promoção de 20%). Total R$ 383,97 → R$ 310,57.

O site e a CDN da Petz bloqueiam acesso automático (403 no curl e no WebFetch). Leitura e teste
mensal: pelo Chrome.

Pagamento e frete publicados pela loja, lidos no site dela em 2026-11-12 pela sessão de cupons (estão em `/cupons` desde o #924; reler na rodada mensal):

- Parcelamento: até 3x sem juros, com parcela mínima de R$ 80 (`/institucional/pagamentos-e-reembolsos`).

---

## 2. Fatos Oficiais & Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Rede brasileira de pet shops, com lojas físicas, site e app: ração, petiscos, higiene, farmácia, acessórios, casa e jardim | fato_oficial | Site oficial petz.com.br | 2026-11-11 | 2027-02-11 | — |
| Pet Center Comércio e Participações S/A, CNPJ da sede 18.328.118/0001-09; o rodapé do site (computador) mostra a filial 18.328.118/0013-42 | fato_oficial | Rodapé do site e da sacola; regulamento da Black Friday, item 1.1; BrasilAPI | 2026-11-11 | 2027-02-11 | No celular, o rodapé não traz CNPJ |
| Programa Parceiro Petz: cupom de 10% para divulgar, comissão de 7% nas vendas com o cupom ou pela loja do parceiro e 3% nas vendas dos parceiros convidados | fato_oficial | parceiropetz.com.br | 2026-11-11 | 2027-02-11 | Comissão é bastidor: não vai ao texto dos artigos |

---

## 3. Alertas Editoriais

- Nos artigos deste parceiro, usar `affiliate: "petz"` e link relativo para `/cupons/petz`,
  conforme `docs/CONTRATO-ARTIGO-AFILIADO.md`. Os artigos de onboarding passam primeiro pela pauta
  (Job 1) e depois pela sessão de artigos.
- O cupom não soma com promoção: nenhum texto promete "10% a mais" em produto já em oferta.
- O site não diz que o cupom vale nas lojas físicas: os textos falam só em site e app.
- Farmácia veterinária (antipulgas, remédios): sem promessa de efeito; descrever o produto, o rótulo
  e o preço, e "na dúvida, o veterinário".
- Reclame Aqui levantado em 11/11: `02_Artigos/petz-fatos-1111.md`, seções 2 e 11 (abas de 6 e 12 meses, 2025 e 2024).
- A ação AUAU3 é da companhia combinada (Grupo Petz Cobasi), não da Pet Center: nenhum texto diz que "a Petz tem
  ações AUAU3".

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/petz.png` | Logo do cabeçalho do site (`logo-petz-blackfriday.svg`, preto) com o azul da marca (#175EA8, o do favicon), 340 × 75, fundo transparente | Parceiros comerciais no `/sobre` | Identificação da marca parceira |
| `/images/about/partners/petz-icon.png` | Favicon oficial (o "P" azul) centralizado em 256 × 256 sobre branco | Bolinha da home, chip e imagem de compartilhamento | Identificação da marca parceira |
| `/images/logos/watermarks/petz.webp` | O mesmo logo azul, 480 × 106, fundo transparente | Marca-d'água da página e dos cards | Identificação da marca parceira |
| `/images/logos/bolinhas/petz.png` | Favicon SVG oficial, o "P" azul (`https://static-file.petz.com.br/platforms/img/ds/petz/favicon.svg`), baixado em 2026-11-11 pelo Chrome. Sem troca de cor, em 512 × 512 transparente (86% da largura) | Bolinha da home e de /reviews | Identificação da marca parceira |

Os logos estão no CDN e no mapa de entrega. Para trocar um logo, criar arquivo com nome novo,
seguindo o `docs/GUIA-MIDIA-EDITORIAL.md`.
