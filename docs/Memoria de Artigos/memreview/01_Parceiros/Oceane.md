---
parceiro: "Océane"
slug_cupom: "oceane"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2026-12-23"
---

# Dossiê Factual: Océane

Loja de cupom, cadastrada em 23/11/2026 a pedido do Bruno ("Novo afiliado Oceane", com o print da sacola do app). Página
`/cupons/oceane`, só em PT. O link da parceria é o site oficial com o parâmetro da campanha:
`https://www.oceane.com.br/?utmi_pc=emcasa`, guardado como veio. Marca de beleza de Vila Velha/ES (CNPJ 04.484.321/0007-55,
pelo rodapé do site), em VTEX, com aplicativo e lojas físicas.

---

## 1. Dados Comerciais (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| EMCASA dá 10% no pedido, no app e no site | condicao_comercial_volatil | Teste do Bruno no app (print de 23/11/2026) e teste pelo Chrome no site no mesmo dia; `src/lib/couponsData.ts` (slug: `oceane`) | 2026-11-23 | 2026-12-23 | App: sacola de R$ 201,70 (Face Palette Océane Edition, Mini Retouch My Glam Océane Edition, Repair Eye Cream) −R$ 20,17 = R$ 181,53. Site: Repair Eye Cream R$ 65,90 −R$ 6,59 = R$ 59,31 | Alta |
| Soma com os preços especiais do app | condicao_comercial_volatil | Print do Bruno: a Face Palette (de R$ 189,90) e o Mini Retouch (de R$ 59,90) estavam com preço especial do app (R$ 89,90 e R$ 45,90, pela conta do subtotal) e ganharam os 10% | 2026-11-23 | 2026-12-23 | O app mostra, em cada item, o preço já com o cupom | Alta |
| O cupom entra na sacola do checkout (`/checkout/#/cart`): campo "Cupom de desconto", botão "Adicionar", linha "Descontos", antes da identificação | condicao_comercial_volatil | Teste pelo Chrome, 23/11/2026 | 2026-11-23 | 2026-12-23 | Caminho: "Adicionar à sacola", gaveta da sacola, botão no fim da gaveta. Parar em "Continuar pagamento" | Alta |
| Mesmo desconto dos cupons de primeira compra da loja | condicao_comercial_volatil | Bruno, 23/11/2026 | 2026-11-23 | 2026-12-23 | Os cupons próprios da loja (primeira compra no app e no site, faixa do topo do site) **não são citados** | Alta |
| O cupom vale no Pix e em todas as formas de pagamento | condicao_comercial_volatil | Regra do Bruno (20/11/2026): todo cupom funciona com Pix; percentual do Pix é critério da loja | 2026-11-23 | 2026-12-23 | Não é pendência nem pede teste | Alta |
| Até 6x sem juros no cartão, parcela mínima de R$ 30; frete grátis acima de um valor mínimo, mostrado na sacola depois do CEP | condicao_comercial_volatil | Páginas "Formas de pagamento" e "Política de entrega" | 2026-11-23 | 2026-12-23 | A política de entrega não diz o valor mínimo | Média |

---

## 2. Fatos Oficiais (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Marca de beleza com quinze anos; maquiagem (linha Océane Edition), skincare com produtos feitos na Coreia do Sul, cabelos, bem-estar e acessórios; primeiro produto foram os lenços removedores de esmalte | fato_oficial | `/quem-somos` | 2026-11-23 | 2027-02-23 | Base do `aboutBrand` |
| Devolução em até 7 dias corridos do recebimento; defeito em até 30 dias; sem uso, embalagem original, com a DANFE e os lacres; pedido pelo e-mail info@oceane.com.br; troca vira vale-compras | fato_oficial | Página "Trocas e devoluções" | 2026-11-23 | 2027-02-23 | A FAQ cita |

---

## 3. Alertas Editoriais

- Os cupons próprios da loja (primeira compra no site e no app, cupom da faixa do topo): **não citar**.
- O link da parceria (`?utmi_pc=emcasa`) não se abre nos testes: testar pelo site sem o parâmetro.
- O código EMCASA também é o de outras parceiras (Denavita, HolyFoods, Petz, Rituária): todo texto sobre ele diz qual loja.
- O cupom vale para clientes novos e antigos (regra das parcerias).
- Retestar em 01/12 pelo caminho do cliente.

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/oceane.png` | Logo do checkout do site (SVG do `oceane.vtexassets.com`, baixado em 2026-11-23), grafite #383935 com o ponto rosé #BF9DA0, centrado em 256 × 256 sobre branco | Página da loja, cards, imagem de compartilhamento e `/sobre` | Logo da marca, para divulgação do cupom |
| `/images/logos/bolinhas/oceane.png` | O mesmo letreiro em branco (o ponto segue rosé), 430 px de largura em 512 × 512 transparente, sobre o `background` #383935, com `round: true` | Bolinha da vitrine e de /reviews | Idem |
| `/images/logos/watermarks/oceane.webp` | O mesmo letreiro nas cores originais, 480 px de largura | Marca-d'água da página e dos cards | Idem |
| `/images/reviews/oceane/cupom-oceane-sacola-app-com-cupom.webp` | Print do Bruno da Sacola do app com o cupom (23/11/2026), sem a barra de status | `cartPrint` da página | Print próprio |

Para trocar um logo, criar arquivo com nome novo, conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
