---
parceiro: "Denavita"
slug_cupom: "denavita"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2026-12-19"
---

# Dossiê Factual: Denavita

Loja de código com link de afiliado, cadastrada em 19/11/2026 a pedido do Bruno ("Novo afiliado:
https://denavita.gogroup.com.br/emcasacomcecilia, EMCASA (10% OFF) https://www.denavita.com.br/"). Página `/cupons/denavita`,
só em português. Marca de vitaminas e suplementos (cápsulas, gomas, pós e kits) com vitrine Shopify em `www.denavita.com.br` e
checkout próprio em `seguro.denavita.com.br`, como a Barbour's, também da GoGroup.

---

## 1. Dados Comerciais (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom EMCASA: 10% OFF no pedido, cliente novo e antigo | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `denavita`) | 2026-11-19 | 2026-12-01 | `offerUrl` = link da GoGroup (nunca abrir) | Alta |
| Teste 1: Laranja Moro Morosil, Picolinato de Cromo e Café Verde de R$ 129,90 por R$ 76,90 → "Cupom de desconto" −R$ 7,69 → R$ 69,21 | teste_carrinho | Resumo do checkout, sem identificação | 2026-11-19 | 2026-12-01 | Confirma a soma com o preço promocional | Alta |
| Teste 2: Jejoom Shot Matinal R$ 94,90 + Trio Magnésio R$ 46,90 + Laranja Moro R$ 76,90 = R$ 218,70 → −R$ 21,87 → R$ 196,83 | teste_carrinho | Resumo do checkout, sem identificação | 2026-11-19 | 2026-12-01 | O carrinho anunciou o "Leve 3, Pague 2" com desconto "na próxima etapa": a soma com o cupom não foi vista | Alta |
| Teste 3 (Bruno): Kit Vida Fit e Turbo Metabolismo, R$ 199,90 cada (o Bruno disse que o carrinho "é leve 3, pague 2 também", mas o resumo só mostra o desconto do cupom); R$ 399,80 → "Desconto (- R$ 39,98)" → R$ 359,82, "em até 12x no cartão"; com o Pix, o desconto se manteve | teste_carrinho | Print do Bruno (no `cartPrint`) e mensagem dele ("E soma com PIX") | 2026-11-19 | 2026-12-01 | Confirma a soma com preço de kit e com o Pix; o Leve 3, Pague 2 não aparece no resumo | Alta |
| O cupom entra no resumo antes da identificação (campo "Tem um cupom?", botão "Adicionar") | observacao | Teste no Chrome | 2026-11-19 | 2026-12-01 | A extensão lê o texto do checkout, mas não tira print dele: o print é do Bruno | Alta |
| Kit Vida Fit de R$ 229,80 por R$ 199,90 (13% OFF) na vitrine; o Turbo Metabolismo a R$ 199,90, sem o "de" anotado | condicao_comercial_volatil | `/collections/todos-produtos` | 2026-11-19 | 2026-12-01 | Base de "kits que já estavam com desconto" na abertura | Média |
| Frete grátis a partir de R$ 199,90, com asterisco | condicao_comercial_volatil | Faixa do topo e vitrine | 2026-11-19 | 2026-12-19 | A página `/pages/regras-de-frete-gratis` caiu num erro em 19/11; a página diz "confira no checkout" | Média |
| Parcelamento: faixa e resumo do checkout "até 12x no cartão", produto "até 10x", vitrine 3x sem juros | condicao_comercial_volatil | Faixa, checkout, página de produto e vitrine | 2026-11-19 | 2026-12-19 | A página diz "até 12x", como o checkout, sem falar de juros | Média |
| "Leve 3, Pague 2" no carrinho e "Até 40% OFF em todo o site" na faixa | condicao_comercial_volatil | Gaveta do carrinho e faixa | 2026-11-19 | 2026-12-01 | Soma com o cupom não vista: no teste 3 o resumo só mostrou o cupom (10% exatos). Perguntar ao Bruno o que ele viu | Média |
| Cupom próprio de primeira compra (10%) e roleta de cupom no pop-up | condicao_comercial_volatil | Página de produto e pop-up | 2026-11-19 | 2026-12-19 | Não citar | Alta |
| Códigos anunciados por aí com 15% e 20% não passam de 10% | condicao_comercial_volatil | Prints do Bruno, 22/11/2026, carrinho de R$ 226,80 (Trio de Favoritos + Tons Equilíbrio) | 2026-11-22 | 2026-12-22 | VITA15 e VITA20: "Cupom inválido". PRIMEIRACOMPRA (cupom de primeira compra da loja) e TIFF (código do cupomtiff) tiraram R$ 22,68, 10%, como o EMCASA. A página só nomeia VITA15 e VITA20; os outros dois ficam fora (cupom da loja e concorrente). Sem linha de desconto progressivo nesse carrinho, embora a IA do Google cite 5% acima de R$ 149,90: não citar | Alta |
| Black Friday (sexta, 27/11/2026): `EMCASA` deu **15% OFF** confirmado pelo Bruno no checkout (`R$ 538,70 − R$ 80,81`, `#1526`, sem aviso prévio nem data de fim; reconferir em 28/11) e nos dois resumos lidos em `seguro.denavita.com.br` (`Trio de Favoritos` `R$ 138,90 → R$ 118,07`, −R$ 20,84; 3 avulsos `R$ 184,70 → R$ 157,00`, −R$ 27,71); faixa do topo anunciou frete grátis a partir de **R$ 139\*** | teste_carrinho | Checkout conferido pelo Bruno (`#1526`) e resumo de `seguro.denavita.com.br` sem identificação (detalhes em [[denavita-reforco-fatos-2711]] e `05_Demanda/parceiros/denavita/`) | 2026-11-27 | 2026-11-28 | No carrinho com 3 avulsos diferentes, o desconto de "Leve 3, Pague 2" anunciado na gaveta **não apareceu no resumo antes da identificação**; a regra de incidência do piso de frete grátis antes ou depois do código segue pendente. Artigos perenes seguem em 10% | Alta |

---

## 2. Fatos Oficiais (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Troca: desistência em até 7 dias corridos do recebimento, sem abrir a caixa; defeito ou produto diferente em até 30 dias; pelo portal de trocas, com o número do pedido | fato_oficial | Central de ajuda (`app.goconnect360.com.br/hc/denavita`), "Trocas e Cancelamentos" | 2026-11-19 | 2027-02-19 | A `/policies/refund-policy` do Shopify diz só "Devoluções aceitas por 30 dias" |
| Linhas: laranja moro, vinagre de maçã em gomas, quitosana e psyllium, coenzima Q10, trio magnésio, ômega 3, colágeno tipo II, bio magnésio, NAC com polivitamínico, trans-resveratrol, spirulina e chlorella, colágeno em pó, creatina, Jejoom e kits | fato_oficial | Menu do site | 2026-11-19 | 2027-02-19 | Base do `aboutBrand` |

---

## 3. Alertas Editoriais

- Suplementos: nada de promessa de efeito no corpo além do que o rótulo e a Anvisa permitem; "na dúvida, o médico ou o
  nutricionista".
- Testar pelo caminho do cliente: "Adicionar ao carrinho" no produto, gaveta, "Finalizar compra". O checkout pede nome,
  e-mail, CPF e celular logo no começo: parar ali. O cupom já aparece no resumo.
- Não citar o cupom de primeira compra da loja nem a roleta.
- FAQ de `/cupons/denavita` responde aos códigos de 15% e 20% da resposta da IA do Google (Bruno, 22/11/2026): nomeia só os inválidos (VITA15, VITA20), nunca PRIMEIRACOMPRA nem TIFF.
- Nos artigos, usar `affiliate: "denavita"`, `coupon: "EMCASA"` (o código) e link relativo para `/cupons/denavita`, com a
  âncora exata "cupom Denavita".

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/denavita.png` | Logo SVG colorido do header do site (`Logo-Colorida.svg`, baixado em 2026-11-19), em dois verdes, centrado em 256 × 256 sobre branco | Página da loja, cards, imagem de compartilhamento e `/sobre` | Logo da marca parceira, para divulgação da parceria |
| `/images/logos/bolinhas/denavita-folhas.png` | Só o símbolo das folhas do mesmo logo, em branco, 512 × 512 transparente, sobre o `background` #54B101 (o verde claro do logo): o logo inteiro, largo e com o slogan, ficava ilegível na bolinha | Bolinha da vitrine e de /reviews | Idem |
| `/images/logos/watermarks/denavita.webp` | O mesmo logo em preto, 480 px de largura | Marca-d'água da página e dos cards | Idem |
| `/images/reviews/denavita/cupom-denavita-checkout-com-cupom.webp` | Resumo do checkout do teste 3 de 19/11 (print do Bruno), sem dado pessoal | `cartPrint` em "Como usar" | Próprio |

Para trocar um logo, criar arquivo com nome novo, conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
