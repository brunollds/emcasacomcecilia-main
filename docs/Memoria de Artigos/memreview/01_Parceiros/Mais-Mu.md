---
parceiro: "Mais Mu"
slug_cupom: "mais-mu"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-01-20"
---

# Dossiê Factual: Mais Mu

Parceria iniciada em 20/10/2026 com a página `/cupons/mais-mu`, ainda sem artigo. Fica na
prateleira de saúde de `/cupons`, junto das outras marcas de suplemento (Probiótica, Max Titanium,
Dr. Peanut e Black Skull).

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom `MMEMCASACOMCECILIA`: 10% OFF em todo o site | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `mais-mu`) | 2026-10-20 | 2026-11-20 | Vale também em produto já em oferta (teste de 20/10); conta nova e antiga | Alta |
| A loja não acumula cupons | condicao_comercial_volatil | FAQ da loja (lojamaismu.com.br/faq) | 2026-10-20 | 2026-11-20 | O crédito do cashback e o desconto de boas-vindas (R$ 15 acima de R$ 250, 7 dias) também entram como cupom, então não somam com o nosso | Alta |
| Cashback de 5% nas compras acima de R$ 250 | condicao_comercial_volatil | lojamaismu.com.br/apps/pulse-b-mu/cashback | 2026-10-20 | 2026-11-20 | Programa da própria loja, para qualquer cliente. Crédito de 90 dias, usado como cupom em pedido a partir de R$ 200. No checkout com o cupom, o mínimo de R$ 250 era contado sobre o total já com desconto ("faltam R$ 34,10" num total de R$ 215,90) | Alta |
| Frete grátis acima de R$ 299 no Sul, Sudeste e Centro-Oeste e acima de R$ 399 no Norte e Nordeste | condicao_comercial_volatil | Faixa do topo do site oficial | 2026-10-20 | 2026-11-20 | Abaixo disso, frete calculado no checkout | Alta |
| Soma com os 3% de desconto do Pix e vale em todas as formas de pagamento | condicao_comercial_volatil | Bruno, 20/10/2026; FAQ da loja (3% no Pix) | 2026-10-20 | 2026-11-20 | Confirmado pelo Bruno depois do teste (o meio de pagamento só aparece depois dos dados pessoais) | Alta |
| Sem link de afiliado: `offerUrl` é o site oficial | condicao_comercial_volatil | `offerUrl` em `src/lib/couponsData.ts` | 2026-10-20 | 2026-11-20 | A atribuição é pelo cupom | Alta |
| Link de afiliado da marca no Mercado Livre: `https://meli.la/24RjvdP` | condicao_comercial_volatil | Bruno, 20/10/2026; `mercadoLivreUrl` no FAQ | 2026-10-20 | 2026-11-20 | O cupom não vale no Mercado Livre; lá vale o preço do anúncio | Alta |

Teste de checkout em 2026-10-20 (sem finalizar e sem dados pessoais): Whey Protein Concentrado
Paçoquita 450 g (R$ 159,99) e Creatina 100% Pura Sem Sabor refil 500 g em oferta (R$ 79,90, de
R$ 119,00); subtotal de R$ 239,89; com o cupom, "Desconto do cupom − R$ 23,99" e total de R$ 215,90.
O cupom fica no checkout (depois de "Iniciar compra" no carrinho), em "Adicionar cupom de desconto".

---

## 2. Fatos Oficiais & Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Marca brasileira de proteína: whey concentrado, proteína vegetal, creatina, pré-treino Exquenta, barras (Crushbar, Mukebar), Chocowheyfer, bebidas proteicas e snacks salgados | fato_oficial | Site oficial lojamaismu.com.br | 2026-10-20 | 2027-01-20 | A loja vende combos de influenciadores e combos exclusivos |
| Nasceu há 10 anos com o whey "na garrafinha" | fato_oficial | Blog da loja ("A História do Whey na Garrafinha") | 2026-10-20 | 2027-01-20 | Conferir o ano de fundação antes de citar |
| Loja na Nuvemshop; entrega em todo o Brasil; 3x sem juros no cartão | fato_oficial | Site oficial | 2026-10-20 | 2027-01-20 | O domínio é lojamaismu.com.br (um "m"); maismu.com.br redireciona para ele |

---

## 3. Alertas Editoriais

- O nome é Mais Mu; o logo escreve "+Mu". O cupom é longo: em layout estreito, conferir a quebra.
- O cashback é da loja, não da parceria: nunca apresentá-lo como vantagem do cupom.
- Nos artigos deste parceiro, usar `affiliate: "mais-mu"` e link relativo para `/cupons/mais-mu`,
  conforme `docs/CONTRATO-ARTIGO-AFILIADO.md`. Os artigos de onboarding passam primeiro pela pauta
  (Job 1) e depois pela sessão de artigos.

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/mais-mu.png` | Logo oficial do cabeçalho do site (vaquinha de óculos e "+Mu"), 253 × 88 sem ampliar, baixado em 2026-10-20 | Parceiros comerciais no `/sobre` | Identificação da marca parceira |
| `/images/about/partners/mais-mu-icon.png` | Avatar oficial da página da marca no Facebook ("+Mu" branco sobre azul), 187 px ampliado para 256 × 256 | Bolinha da home, chip e imagem de compartilhamento | Identificação da marca parceira |
| `/images/logos/watermarks/mais-mu.webp` | Silhueta do contorno, dos óculos e do "+Mu" do logo | Marca-d'água da página e dos cards | Identificação da marca parceira |

Os logos estão no CDN e no mapa de entrega. Para trocar um logo, criar arquivo com nome novo,
conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
