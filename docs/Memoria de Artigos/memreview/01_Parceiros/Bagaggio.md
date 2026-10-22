---
parceiro: "Bagaggio"
slug_cupom: "bagaggio"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-01-22"
---

# Dossiê Factual: Bagaggio

Parceria iniciada em 22/10/2026 com a página `/cupons/bagaggio`, ainda sem artigo. Fica na
prateleira de moda de `/cupons`.

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom `CECILIA10`: 10% OFF em todo o site | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `bagaggio`) | 2026-10-22 | 2026-11-22 | Vale a preço cheio e em produto já com desconto, inclusive no Outlet (teste de 22/10). No checkout, a promoção se chama "Cupom UGC". O mesmo código é o da Black Skull | Alta |
| Soma com os 5% de desconto do Pix e vale em todas as formas de pagamento | condicao_comercial_volatil | Teste de carrinho de 22/10/2026 (promoção "PIX 5 % EXTRA - PRA SEMPRE" da loja) | 2026-10-22 | 2026-11-22 | O Pix entrou depois do cupom, sobre o total já com desconto | Alta |
| A promoção de 50% na 2ª peça funciona por cupom próprio e não acumula com outros cupons | condicao_comercial_volatil | bagaggio.com.br/promocao-50-off-levando-2 | 2026-10-22 | 2026-11-22 | O desconto vai no item de menor valor. Nos artigos, não citar o código dessa promoção | Alta |
| Desconto de 5% na primeira compra | condicao_comercial_volatil | Faixa do topo do site oficial | 2026-10-22 | 2026-11-22 | Não conferido no carrinho; não citar o código | Média |
| Frete calculado pelo CEP; retirada em lojas próximas conforme a disponibilidade | condicao_comercial_volatil | Site oficial | 2026-10-22 | 2026-11-22 | O site não divulgava frete grátis; `/institucional/politica-de-frete` não existe | Média |
| Desistência em até 7 dias corridos depois do recebimento, só em compra pelo site | condicao_comercial_volatil | bagaggio.com.br/institucional/trocas-e-devolucoes | 2026-10-22 | 2026-11-22 | Com vale-troca ou devolução do valor pago | Alta |
| Link de afiliado: `https://www.bagaggio.com.br/?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz` | condicao_comercial_volatil | Bruno, 22/10/2026; `offerUrl` em `src/lib/couponsData.ts` | 2026-10-22 | 2026-11-22 | Vai exatamente como veio | Alta |
| Link de afiliado da marca no Mercado Livre: `https://meli.la/2KeydkG` | condicao_comercial_volatil | Bruno, 22/10/2026; `mercadoLivreUrl` no FAQ | 2026-10-22 | 2026-11-22 | Abre a vitrine da Cecília no Mercado Livre com produtos da Bagaggio. O cupom não vale no Mercado Livre; lá vale o preço do anúncio | Alta |

Teste de carrinho em 2026-10-22, pela API pública do checkout da VTEX (sem dados pessoais e sem
finalizar): Mala de Bordo PP Downtown Preta, do Outlet, de R$ 249,90 por R$ 179,90; com o cupom,
R$ 161,91 (−R$ 17,99); no Pix, R$ 153,81. Mala de Bordo KidGo Preta, a preço cheio, de R$ 1.499,90
para R$ 1.349,91. Mala de Bordo Detroit Preta, do Outlet, de R$ 249,90 para R$ 224,91.

---

## 2. Fatos Oficiais & Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Malas de bordo e de viagem, mochilas, mochilas escolares, bolsas, carteiras, térmicos, acessórios de viagem e personalizáveis | fato_oficial | Site oficial bagaggio.com.br | 2026-10-22 | 2027-01-22 | — |
| Marca no mercado desde 1942, com lojas físicas | fato_oficial | Texto da home do site oficial | 2026-10-22 | 2027-01-22 | O site diz "líderes nacionais" em malas: não repetir sem fonte independente |
| Loja na VTEX (vitrine deco.cx); cartões, boleto, boleto parcelado e Pix | fato_oficial | Checkout do site oficial | 2026-10-22 | 2027-01-22 | — |

---

## 3. Alertas Editoriais

- Nos artigos deste parceiro, usar `affiliate: "bagaggio"` e link relativo para `/cupons/bagaggio`,
  conforme `docs/CONTRATO-ARTIGO-AFILIADO.md`. Os artigos de onboarding passam primeiro pela pauta
  (Job 1) e depois pela sessão de artigos.
- Nunca citar o código da promoção da 2ª peça, o de primeira compra ou outro cupom da loja como
  alternativa ao nosso. A página só diz que a promoção da 2ª peça não soma com outro cupom.

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/bagaggio.png` | Logo oficial do cabeçalho do site (PNG de 4515 × 656), 300 × 44 | Parceiros comerciais no `/sobre` | Identificação da marca parceira |
| `/images/about/partners/bagaggio-icon.png` | O "B" do logo oficial, centralizado em 256 × 256 sobre branco | Bolinha da home, chip e imagem de compartilhamento | Identificação da marca parceira |
| `/images/logos/watermarks/bagaggio.webp` | Logo oficial, 480 × 70 | Marca-d'água da página e dos cards | Identificação da marca parceira |

Os logos estão no CDN e no mapa de entrega. Para trocar um logo, criar arquivo com nome novo,
conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
