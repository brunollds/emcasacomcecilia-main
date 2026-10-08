---
parceiro: "NESCAFÉ Dolce Gusto"
slug_cupom: "dolce-gusto"
codigo_cupom: "CECI"
status_parceria: "ativo"
revisao_geral_ate: "2026-11-01"
---

# Dossiê Factual: NESCAFÉ Dolce Gusto

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom `CECI`: 5% OFF em compras a partir de R$ 100 na loja oficial | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `dolce-gusto`) | 2026-10-08 | 2026-11-01 | Até 3 usos por CPF; a soma com promoções "pode variar conforme campanha ativa"; teste no checkout em 2026-10-01. A revisão mensal renova o teste antes da virada do mês | Alta |
| As promoções do site mudam quase todo dia e podem ser encerradas sem aviso; pôr o item no carrinho não garante o desconto se a promoção acabar | condicao_comercial_volatil | nescafe-dolcegusto.com.br/sobre/regulamentos, "Regras gerais de Promoção" | 2026-10-08 | 2026-11-08 | Promoções não somam com resgate de pontos do Club; combos com máquina e combos de bebidas não somam com outras ofertas | Alta |
| Combo com máquina: acima de X caixas de cápsulas ORIGINAL, leva uma Mini Me | condicao_comercial_volatil | Mesma página, promoções ativas e encerradas | 2026-10-08 | 2026-11-08 | O X muda a cada poucos dias: 45, 50, 60 e 65 caixas entre 28/09 e 08/10/2026. Não vale para NEO nem DGusta; uma máquina por pedido | Alta |
| Faixas de preço das promoções de outubro: caixas regulares a partir de R$ 17,90, DGusta a partir de R$ 1,79 por cápsula, cafés NEO a partir de R$ 21,90, frete grátis acima de R$ 50 ou R$ 100 conforme a promoção | condicao_comercial_volatil | Mesma página | 2026-10-08 | 2026-11-08 | Referência para comparar com a Black Friday; reconsultar no fim de outubro | Alta |
| Parcelamento em até 10x sem juros (parcela mínima de R$ 5) | condicao_comercial_volatil | Mesma página | 2026-10-08 | 2026-11-08 | — | Alta |
| Máquinas de Outlet: retornadas, inspecionadas e higienizadas, com a mesma garantia; trocas são feitas por outra máquina de Outlet | fato_oficial | Mesma página, "Máquinas de Outlet" | 2026-10-08 | 2027-01-08 | — | Alta |
| Cupons próprios da loja para a primeira compra (10% em bebidas, não valem para máquinas) | condicao_comercial_volatil | Mesma página | 2026-10-08 | 2026-11-08 | **Não citar os códigos da loja nos artigos** sem decisão do Bruno; responder "primeira compra" com o CECI | Alta |
| Reclamação de vício aparente e de pedido não recebido: até 90 dias | fato_oficial | Mesma página, "Regras gerais" | 2026-10-08 | 2027-01-08 | O prazo de entrega conta a partir de quando o pedido chega à transportadora | Alta |

### Preços das máquinas no site oficial (consultado em 08/10/2026)

| Máquina | Preço cheio | Preço do dia |
|---|---|---|
| Mini Me 2.0 (110 V e 220 V, conforme a cor) | R$ 599,90 | R$ 429,90 a R$ 449,90 |
| Genio S Basic | R$ 679,90 | R$ 479,90 |
| Genio S Plus | R$ 779,90 | R$ 589,90 |
| Genio S Touch | R$ 979,90 | R$ 689,90 |
| Outlet: Genio S Basic / Plus / Touch / Lumio | — | R$ 399,90 / R$ 449,90 / R$ 549,90 / R$ 399,90 |

Os preços do dia já ficavam no nível ou abaixo dos da Black Friday de 2024 (tabela abaixo),
salvo a Mini Me. Reconsultar no fim de outubro para o artigo `black-friday-dolce-gusto`.

### Black Friday nos anos anteriores

| Ano | O que a Nestlé anunciou | Fonte | Pode publicar? |
|---|---|---|---|
| 2023 | Novembro inteiro no site oficial, uma oferta diferente por dia; caixas a partir de R$ 12,90; DGusta a partir de R$ 1,29 por cápsula; 30 cápsulas grátis na compra de Mini Me, Genio S Basic, Genio S Plus e Infiníssima Touch; Starbucks a partir de R$ 17,90; NEO com 30 cápsulas grátis até 17/11 e até 20% OFF em cafés | Release da Nestlé Brasil, "Black Friday: NESCAFÉ Dolce Gusto traz descontos especiais durante todo o mês de novembro" (1º/11/2023) | Sim, atribuído à Nestlé |
| 2024 | De 1º a 30/11, "descontos que vão até 50%", ofertas diárias; bebidas a partir de R$ 13,90; DGusta a partir de R$ 1,39; Mini Me a partir de R$ 399,90, Genio S Basic R$ 499,90, Genio S Plus R$ 599,90, Genio Touch R$ 699,90; NEO a partir de R$ 19,90 e máquinas NEO entre R$ 399 e R$ 449 | Release da Nestlé Brasil, "NESCAFÉ Dolce Gusto amplia a Black Friday com ofertas especiais durante todo o mês de novembro" (31/10/2024) | Sim, atribuído à Nestlé |
| 2025 | Só cobertura de imprensa: Genio S Basic de brinde na compra de 65 caixas selecionadas (Tecmundo, 07/11/2025). Sem release oficial encontrado; a página de regulamentos só guarda promoções desde agosto de 2026 | Tecmundo | Não, até achar fonte oficial |

---

## 2. Fatos Técnicos & Dados de Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Medidas ml por nível (Nível 1 = 35ml até Nível 7 = 230ml + XL 300ml) | fato_oficial | Manual físico das máquinas | 2026-07-30 | 2027-01-01 | Comprovado e publicado em `tabela-medidas-dolce-gusto-ml-por-nivel` |
| Pressão padrão: 15 bar | fato_oficial | Manuais Mini Me / Genio S Touch | 2026-07-30 | 2027-01-01 | Linha padrão Nestlé Dolce Gusto |
| Cápsulas NEO vs Original: incompatíveis | fato_oficial | Nestlé Brasil | 2026-07-30 | 2027-01-01 | Máquinas NEO usam tecnologia de reconhecimento ótico diferente |
| Cápsulas vendidas só em caixas de 10, 12 ou 16 unidades, ou em DGusta de 50 ou 100 | fato_oficial | nescafe-dolcegusto.com.br/sobre/regulamentos | 2026-10-08 | 2027-01-08 | Não há venda avulsa |

---

## 3. Reputação & Dados Públicos

| Dado / Indicador | Tipo | Fonte | Consultado Em | Rever Até | Conclusão |
|---|---|---|---|---|---|
| Reputação no Reclame Aqui | dado_externo | Reclame Aqui | 2026-08-01 | 2026-11-01 | Alta confiabilidade da marca Nestlé |

---

## 4. Dores Mapeadas
- [[dolce-gusto-descalcificacao-passo-a-passo]] (Luz amarela/laranja piscando, perda do manual)
- [[dolce-gusto-capsulas-compativeis-guia]] (Diferença entre Original, NEO e compatíveis de mercado)
- [[dolce-gusto-luzes-piscando-significados]] (Guia de diagnóstico visual dos LEDs)
- Saber se o preço da Black Friday é mesmo menor que o de outubro (autocomplete de 08/10/2026: "black friday dolce gusto" com cápsulas, NEO, Mini Me, Genio, cafeteira e "cupom dolce gusto black friday")

---

## 5. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `IMG_6839.HEIC` (Downloads do Bruno, a converter) | Selfie da Cecília entre os pés de café floridos, com chapéu e camisa da NESCAFÉ Dolce Gusto, numa visita com a marca | Capa prevista de `black-friday-dolce-gusto` | Própria |

---

## 6. Artigos Já Publicados no Cluster
- `cupom-ceci-nescafe-dolce-gusto-como-usar`
- `promocao-dolce-gusto-caixas-mini-me-gratis`
- `clube-dolce-gusto-como-funciona`
- `dolce-gusto-e-confiavel`
- `dolce-gusto-genio-s-touch-vale-a-pena`
- `tabela-medidas-dolce-gusto-ml-por-nivel`
- `assinatura-dolce-gusto-como-funciona`
- `adaptador-neo-start-o-que-e`
- `dolce-gusto-mini-me-2-0-vale-a-pena`
- `dolce-gusto-genio-s-basic-vs-plus-vs-touch`
- `dolce-gusto-vs-nespresso-vs-3-coracoes`
- `dolce-gusto-vs-nespresso-qual-escolher`
- `dolce-gusto-descalcificacao-passo-a-passo`
- `dolce-gusto-capsulas-compativeis-guia`
- `assinatura-dolce-gusto-vale-a-pena`

Em rascunho (`draft: true`): `dolce-gusto-maquinas-qual-escolher`, `melhores-capsulas-dolce-gusto-2026`,
`starbucks-dolce-gusto-capsulas-guia`.
