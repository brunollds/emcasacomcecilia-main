---
parceiro: "[[Oceane]]"
data_leitura: "2026-11-23"
responsavel: "Job-1"
---

# Océane: fatos para as pautas (23/11/2026)

Base comum dos briefings OC1 a OC10. O dossiê da loja é [[Oceane]] (`01_Parceiros/Oceane.md`, no PR da página `/cupons/oceane`,
branch `feat/parceiro-oceane`). Aqui fica só o que as pautas usam além dele.

## A parceria

- Cupom **EMCASA**, 10% OFF no pedido. Testado pelo Bruno no app (23/11: sacola de R$ 201,70, desconto de R$ 20,17,
  total R$ 181,53, com dois itens em preço especial do app) e no site pela sessão da loja (Repair Eye Cream R$ 65,90,
  desconto de R$ 6,59, total R$ 59,31). O cupom entra na sacola (`/checkout/#/cart`), campo "Cupom de desconto", botão
  "Adicionar", antes da identificação.
- Soma com o preço especial do app (print do Bruno). Soma com as outras promoções do site **não testado**.
- Link da parceria: `https://www.oceane.com.br/?utmi_pc=emcasa`. **Nunca abrir.** Leitura sempre pelo site sem o parâmetro.
- O EMCASA também é o código de Denavita, HolyFoods, Petz e Rituária: todo texto diz "EMCASA na Océane".
- Página da loja: `/cupons/oceane`, só em PT. Todas as pautas são `somente-pt`.
- Cupons próprios da loja (primeira compra no app e no site, faixa do topo, cupons de live) **não são citados**, nem pelo
  nome, nem pelo valor.

## Frete (teste pela simulação do carrinho, 23/11)

A simulação da sacola (API pública de checkout da loja, sem cupom) cobrou frete em todos os valores testados, de R$ 65,90 a
R$ 263,60: em São Paulo (CEP 01310-100), R$ 14,91 no econômico com um item e R$ 10,14 com paleta e kit de pincéis; em
Manaus (CEP 69005-070), R$ 19,51 a R$ 28,70. A política de entrega fala de frete grátis acima de um mínimo, sem dizer o
valor. A loja usa frete grátis em campanhas (havia coleções "Produtos com frete grátis" e "Black Month: Frete Grátis").
**Base do frete não confirmada** (Job 1, "Frete grátis e o cupom"): nenhum artigo faz a conta do frete depois do cupom.
O texto diz que o frete grátis da Océane depende de campanha e aparece na sacola depois do CEP.

## Demanda (autocompletar do Google, 23/11; o arquivo bruto está em `oceane-autocomplete-2311.txt`)

- **Cupom:** "cupom oceane primeira compra", "cupom oceane app", "cupom oceane primeira compra app", "cupom oceane 3 por
  99", "cupom oceane shopee", "cupom oceane 6 por 180", "cupom oceane influencer". "oceane primeira compra" com "app",
  "desconto", "frete gratis", "tem cupom". "oceane tem app", "desconto app oceane".
- **Marca:** "oceane é uma marca brasileira", "é uma marca boa", "é nacional", "é de quem", "é bom", "é uma boa marca de
  maquiagem", "é coreana", "é vegana", "é cruelty free", "oceane é confiável", "produtos oceane são bons", "oceane
  maquiagem origem", "oceane marca coreana", "oceane tecnologia coreana".
- **Reputação:** "oceane reclame aqui", "oceane beauty reclame aqui", "base oceane reclame aqui", "geladeira océane reclame
  aqui", "mini geladeira oceane reclame aqui".
- **Base:** "oceane base" com stick, líquida, bastão, fluida, cushion, "base e corretivo", cores, 230l, skin tint; "base
  oceane é boa para pele oleosa", "base fluida oceane é boa".
- **Corretivo:** cores, light, medium light, fair, stick, medium, bastão, líquido, tons.
- **Blush:** stick, duo, rose gold, líquido, bastão, rosa, pink, glossy, pink paint.
- **Skincare:** "oceane skincare é bom", "coreano", "pele oleosa", kit, vitamina c, resenha; sérum vitamina c, cica,
  antiacne, retinol, niacinamida, ginseng, ácido hialurônico; protetor solar (facial, com cor).
- **Kits:** "oceane kit" mini, skincare, maquiagem, pincéis, viagem, presente.
- **Comparações:** "oceane ou payot", "ou principia", "ou creamy", "ou simple organic", "ou bruna tavares", "ou vizzela",
  "ou sallve", "ou catharine hill", "oceane mari maria", "base oceane ou mari maria", "corretivo oceane ou mari maria".
- **Onde comprar:** "oceane loja física" (SP, RJ, BH), "oceane loja oficial shopee", "produtos oceane onde comprar".
- Outros com sugestão: esponja (flat blend), paleta (multifuncional, contorno, 24 tons), pó Retouch My Glam, lenço removedor
  de esmalte, máscara de cílios, lip balm e lip tint, bruma, geladeira de skincare.

Isso mostra presença de busca, não volume.

## A marca (quem-somos e rodapé, lidos pela sessão da loja em 23/11)

- Marca de beleza brasileira, de Vila Velha (ES), CNPJ 04.484.321/0007-55, com quinze anos. O primeiro produto foram os
  lenços removedores de esmalte (ainda vendidos: Clean My Nails To Go).
- Maquiagem (linhas Océane Edition, Océane 4YOU, Océane Purple, Océane Limited, Océane Capri e parcerias com Nádia
  Tambasco, Mariana Saad e Larissa Manoela), skincare (a página "quem somos" diz que há produtos feitos na Coreia do Sul),
  cabelos, bem-estar e acessórios. Vende no site, no app, em lojas físicas e em varejistas (Beleza na Web, Drogarias
  Pacheco, Panvel, Magalu) e tem loja oficial na Shopee.
- **Selos no catálogo (campo "Selos" de cada produto):** 1.190 dos 1.347 produtos lidos levam "Cruelty Free" e 988 levam
  "Vegano". Vegano e cruelty free são por produto, não da marca inteira.
- **Coreia:** 23 dos 118 itens de skincare citam a Coreia do Sul no texto da ficha, e nem sempre como origem (às vezes é o
  ativo "usado na Coreia"). O artigo só diz "feito na Coreia" do produto cuja ficha diz isso.

## Catálogo (API pública de busca da loja, 23/11; `catalog.json` e `raw.json`)

1.348 produtos, 1.070 com estoque. 508 são kits de maquiagem e 167 kits de skincare.

- **Corretivo:** bastão Concealer Stick Océane Edition 3,5 g em 18 tons (1.1 a 5.3, claro a escuro), R$ 49,90 no dia;
  líquido Concealer Océane Edition 15 g (Fair, Light, Medium Light, Medium, Medium Tan, Tan, Deep; três esgotados),
  R$ 67,90 (o Tan a R$ 39,90).
- **Base:** líquida Skin Foundation 35 ml semi-matte (110f a 550d, 11 tons; R$ 49,90 a R$ 59,90); bastão Foundation Stick
  8 g semi-matte (Ivory, Sand, Beige, Honey, Desert, Almond, Cognac, Espresso; R$ 49,90 a R$ 69,90); Cushion Foundation 12 g
  semi-matte (05 a 80, 9 tons; R$ 59,90); Skin Tint FPS 30 30 ml (110f a 550d; R$ 49,90 a R$ 94,90, três esgotados).
- **Blush:** bastão (Blush Stick Edition 12 g e mini 6 g; Glow Blush Stick 7 g cintilante; Blush Stick 4you), líquido
  (Liquid Blush 20 ml), Duo Blush cremoso e em pó 10,2 g, Glossy Blush, Cream Blush, Fluffy Blush 4you, Blush Me
  (Purple). 47 itens, 45 com estoque, de R$ 39,90 a R$ 84,90 no dia.
- **Pó:** Retouch My Glam translúcido (8 g e mini 1,8 g), Cover Me Up solto (13 g e mini 3 g), Compact Powder 8,5 g em 8 tons.
- **Esponjas:** 17 com estoque (Flat Blend, Sister Blend, My Blend, Flat Drop, Powder Puff, Special Diamond Blend),
  R$ 19,90 a R$ 34,90. A Flat Blend Rosa Claro é o item mais vendido do site na ordenação da loja.
- **Skincare:** 118 itens fora dos kits; séruns de vitamina C com ácido ferúlico, cica, retinol com niacinamida, ácido
  hialurônico, ginseng, microespículas, probióticos, ácido poliglutâmico, antiacne, gestantes; protetor solar facial FPS 70
  (Daily Sunscreen 40 g, R$ 57,90); mini geladeira de skincare 4 L (R$ 559,90 a R$ 589,90).
- **Kits de presente (Minis Edition):** pares e trios de minis de R$ 69,90 a R$ 99,90, sacola de presente a R$ 8 e R$ 10.

Preço do dia apenas; o preço riscado nunca entra (Job 1, "Preço"). Releitura no dia da redação.

## Reclame Aqui (lido no navegador do app em 23/11/2026)

Perfil "Océane Beauty & Smart - Loja Online", CNPJ 04.484.321/0007-55, no Reclame Aqui há 8 anos, categoria Maquiagens,
22º lugar no ranking de melhores empresas da categoria.

| Indicador (6 meses, 01/05 a 31/10/2026) | Valor |
|---|---|
| Reputação | Ótima |
| Nota | 8,3/10 |
| Reclamações recebidas | 455 |
| Respondidas | 92,1% |
| Aguardando resposta | 25 |
| Resolvidas | 88,6% |
| Voltariam a fazer negócio | 75,6% |
| Avaliadas | 260 |
| Nota média do consumidor | 7,64 |
| Tempo médio de resposta | 2 dias e 3 horas |

- Histórico da reputação no semestre: Regular (mai), Boa (jun a ago), Ótima (set e out).
- Principais problemas (aba Geral, até 3 anos): categoria Maquiagem 38,47%; problema "Produto não recebido" 27,3%;
  produto "Kit de maquiagem" 18,46%.
- Entre as últimas reclamações abertas: duas mini geladeiras que pararam, reação nos olhos com paleta, produto avariado e
  um pedido feito na loja da Shopee. Nenhuma entra pelo caso; só os motivos da aba.
- 12 meses, 2025, 2024 e o gráfico de problemas: `[PENDENTE: navegador]` na redação, se o artigo usar.

## Acréscimos de Claude (23/11, depois dos briefings)

- **EMCASA em kit:** a simulação da sacola (API pública de checkout, sem compra) deu 10% nos Kits Presente Minis Edition
  (Trio de Batons R$ 99,90 → desconto R$ 9,99; Blush + Iluminador R$ 69,90 → R$ 6,99).
- **"Mais vendidos":** a ordenação usada no catálogo é a `OrderByTopSaleDESC`, a mesma do filtro "Mais vendidos" do site.
  O texto pode dizer "na ordem de mais vendidos do site", atribuída à loja.
- **Coreia:** a recontagem de um subagente deu 21 itens fora dos kits, não 23; nenhum número entra no texto, só a ficha
  de cada produto.
- **Mari Maria** (para o OC10): ver a seção de leitura no briefing `oceane-ou-mari-maria`.

## Black Month (lido em 23/11/2026, para a OC11)

- Página `/black-friday`: faixa "A BLACK MONTH COMEÇOU! São mais de 250 produtos com até 70% OFF", com "descontos extras"
  no app; o título da página diz "até 80% OFF". Etiqueta "MÊS DA BLACK" nos produtos. Sem data de fim. Lojas físicas
  participam com outros preços. Pagamento: cartão, Pix, PicPay, boleto e Ame Digital.
- Coleção 1733 na API de busca: 407 produtos, 399 com estoque, de R$ 8,90 a R$ 559,90; maior desconto de lista para o
  preço do dia, 71%; nenhum a 80%.
- **EMCASA sobre preço de Black Month (simulação da sacola, sem compra):** Foundation Stick Almond R$ 49,90, desconto
  de R$ 4,99; sacola de R$ 62,80, desconto de R$ 6,28; sacola de R$ 192,50, desconto de R$ 19,25. 10% em todos os itens.
- Não testado: EMCASA com "leve X por R$ Y" e com brinde. Frete cobrado nas três sacolas em São Paulo.
- Detalhes e tabelas em [[black-friday-oceane]].
