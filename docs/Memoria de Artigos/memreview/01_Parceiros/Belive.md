---
parceiro: "Belive"
slug_cupom: "belive"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-01-16"
---

# Dossiê Factual: Belive

Parceria iniciada em 16/10/2026 com a página `/cupons/belive`, ainda sem artigo. Fica na
prateleira de alimentação de `/cupons`.

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom `MAUAD`: 10% OFF em todo o site | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `belive`) | 2026-10-16 | 2026-11-16 | Todas as formas de pagamento; conta nova e antiga; soma com as promoções (regra do Bruno, 16/10) | Alta |
| Soma com os 5% de desconto do Pix | condicao_comercial_volatil | Print do checkout de 16/10/2026 | 2026-10-16 | 2026-11-16 | O carrinho com o cupom mostrou o "Total no PIX (5% de desconto)" sobre o valor já com os 10% | Alta |
| Frete grátis por região: acima de R$ 170 em SP, MG, RJ, DF e GO; R$ 250 no Sul; R$ 300 nos demais estados | condicao_comercial_volatil | belivebefree.com.br/regras-de-frete (página modificada em 28/02/2025) | 2026-10-16 | 2026-11-16 | A faixa do topo do site só mostra o R$ 170 (com asterisco), e outra faixa dizia "hoje tem frete grátis acima de R$ 150". Citar sempre os três valores por região. Achado da sessão de pautas, conferido na página | Alta |
| Sem link de afiliado: `offerUrl` é o site oficial | condicao_comercial_volatil | `offerUrl` em `src/lib/couponsData.ts` | 2026-10-16 | 2026-11-16 | A atribuição é pelo cupom | Alta |
| Link de afiliado da marca no Mercado Livre: `https://meli.la/2xDjP2k` | condicao_comercial_volatil | Bruno, 16/10/2026; `mercadoLivreUrl` no FAQ | 2026-10-16 | 2026-11-16 | O cupom não vale no Mercado Livre; lá vale o preço do anúncio | Alta |

Teste de checkout em 2026-10-16 (prints do Bruno, guardados para o futuro artigo de como usar):
carrinho com quatro combos e kits marcados como oferta (Combo Doces COMPLETÃO 30 unid., Combo
Experimentação COMPLETÃO 40 unid. com GoodSoy, Kit 10 Brownies Proteicos e Combo Doces 16 unid.),
subtotal de R$ 576,82; com o MAUAD, R$ 57,68 de desconto e total de R$ 519,14, ou R$ 493,18 no Pix.
O campo se chama "Código do cupom", com o botão "Aplicar cupom".

---

## 2. Fatos Oficiais & Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Marca brasileira de alimentos sem glúten, sem leite e sem lactose: doces sem açúcar, snacks, brownies proteicos e pães | fato_oficial | Site oficial belivebefree.com.br | 2026-10-16 | 2027-01-16 | O site fala em "mais de 50 produtos" no título e em "mais de 40" no schema; não citar a contagem |
| Empresa: NHD Foods Indústria, Comércio, Importação e Exportação Ltda | fato_oficial | Rodapé do site oficial | 2026-10-16 | 2027-01-16 | Útil para o futuro "é confiável" |
| O rodapé tem a página "Onde Encontrar", com pontos de venda fora do site | fato_oficial | Rodapé do site oficial | 2026-10-16 | 2027-01-16 | Página não lida; conferir antes de citar. O cupom é do checkout do site oficial |

---

## 3. Alertas Editoriais

- O `MAUAD` é o mesmo código da Let's Eat It (ver [[Lets-Eat-It]]). Cada página procura o código
  pela loja, então não há conflito no site, mas um texto sobre o "cupom MAUAD" precisa dizer de
  qual loja fala.
- MAUAD é o sobrenome da Cecília: a página da Belive não tem a pergunta "Por que o cupom se chama
  MAUAD?" e não destaca o sobrenome.
- Nos artigos deste parceiro, usar `affiliate: "belive"` e link relativo para `/cupons/belive`,
  conforme `docs/CONTRATO-ARTIGO-AFILIADO.md`. Os artigos de onboarding passam primeiro pela pauta
  (Job 1) e depois pela sessão de artigos.

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/belive.png` | Selo oficial do cabeçalho do site (fundo preto, texto branco e pássaro amarelo), 280 × 135 sem ampliar, baixado em 2026-10-16 | Parceiros comerciais no `/sobre` | Identificação da marca parceira |
| `/images/about/partners/belive-icon.png` | Ícone oficial do site (o pássaro amarelo), sobre branco em 256 × 256 | Bolinha da home, chip e imagem de compartilhamento | Identificação da marca parceira |
| `/images/logos/watermarks/belive.webp` | Silhueta do texto e do pássaro do selo | Marca-d'água da página e dos cards | Identificação da marca parceira |

Os logos estão no CDN e no mapa de entrega. Para trocar um logo, criar arquivo com nome novo,
conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
