# Cupom CECI da Nestlé Nutre: 5% → 10% e aviso das fórmulas infantis

**Data:** 04/10/2026
**Escopo:** só a loja Nestlé Nutre (slug `nutren`). A Dolce Gusto usa o mesmo código `CECI` com
outra regra (5% a partir de R$ 100) e não foi alterada.

## O que mudou

1. **Percentual:** em 04/10/2026 o checkout da Nestlé Nutre aplicou 10% com o CECI (print do
   Bruno: R$ 112,18 de desconto sobre R$ 1.121,84, rótulo "Desconto Afiliados"). Ainda não se sabe
   se é temporário ou fixo. A página `/cupons/nutren` e os 8 artigos do cluster passaram a 10%.
2. **Fórmulas infantis (permanente):** a loja vende fórmulas NAN para bebês de 0 a 12 meses. O
   art. 5º do Decreto 9.579/2018 proíbe a promoção comercial dessas fórmulas, e o parágrafo único
   cita "descontos de preço" e "cupons de descontos", inclusive em meios eletrônicos. Todo texto que
   lista as exceções do CECI agora inclui "fórmulas infantis de 0 a 12 meses". Detalhes e incisos
   no dossiê `docs/Memoria de Artigos/memreview/01_Parceiros/Nestle-Nutre.md`, seção 1.1.

## Se os 10% forem temporários: o que reverter e o que manter

**Não reverter o aviso das fórmulas infantis.** Ele é obrigação legal, independe do percentual.
Por isso não use `git revert` do commit inteiro: ele desfaria também o aviso.

Reverter só o percentual com as substituições da tabela abaixo. Cada linha é uma troca de texto
exato; confira o número de ocorrências antes de trocar (`⏎` indica quebra de linha). O mapa foi
testado em 04/10/2026 numa cópia: depois de aplicado, não sobra "CECI 10%" da Nestlé Nutre, o aviso
das fórmulas fica intacto e o artigo da creatina volta byte a byte ao texto anterior.

Depois de reverter:

- `lastVerified` do `nutren` em `src/lib/couponsData.ts` recebe a data real da nova verificação;
- o `updatedAt` do artigo do cupom só muda se houver revisão editorial de fato;
- a legenda e o `imageAlt` do passo 4 (print de quando era 5%) voltam ao texto original, já incluso
  na tabela;
- atualizar o dossiê da Nestlé Nutre, a linha `nutren` em `docs/MANUTENCAO-MENSAL.md` e em
  `docs/CUPONS-DATAS-RASTREAMENTO.md`.

## Se os 10% forem fixos

- Trocar o print `public/images/reviews/nutren/passo-4-cupom-aplicado.webp` por um novo com 10%
  (nome de arquivo novo, pelo fluxo do `docs/GUIA-MIDIA-EDITORIAL.md`) e remover da legenda e do
  `imageAlt` a ressalva "quando o desconto era de 5%". O print antigo fica até essa confirmação.
- O comparativo da creatina continua datado: a tabela mostra a consulta de 27/08/2026 com o CECI
  de 5% e o texto traz a conta com 10% sobre o mesmo preço. Um comparativo novo pede nova consulta
  de preços das quatro marcas.

## Fora do escopo, de propósito

- **Dolce Gusto:** o "CECI 5%" está correto para aquela loja e aparece no bloco `dolce-gusto` de
  `src/lib/couponsData.ts` e em 15 artigos de `content/reviews/`: `adaptador-neo-start-o-que-e`,
  `clube-dolce-gusto-como-funciona`, `cupom-ceci-nescafe-dolce-gusto-como-usar`,
  `dolce-gusto-capsulas-compativeis-guia`, `dolce-gusto-descalcificacao-passo-a-passo`,
  `dolce-gusto-e-confiavel`, `dolce-gusto-genio-s-basic-vs-plus-vs-touch`,
  `dolce-gusto-maquinas-qual-escolher`, `dolce-gusto-mini-me-2-0-vale-a-pena`,
  `dolce-gusto-vs-nespresso-qual-escolher`, `dolce-gusto-vs-nespresso-vs-3-coracoes`,
  `melhores-capsulas-dolce-gusto-2026`, `promocao-dolce-gusto-caixas-mini-me-gratis`,
  `starbucks-dolce-gusto-capsulas-guia` e `tabela-medidas-dolce-gusto-ml-por-nivel`.
- **Notas de pauta em `docs/Memoria de Artigos/memreview/02_Artigos/`:** registram o texto aprovado
  de cada artigo na época, inclusive "5%". São histórico; a referência atual é o dossiê.
- **Planos e handoffs antigos** (`docs/HANDOFF-*`, `docs/PLANO-SEO-*`, `docs/superpowers/`):
  registros datados, não alterados.
- **Mudanças que não são de percentual** (não constam da tabela, não precisam voltar): pergunta
  nova no FAQ da página e do artigo sobre NAN, `monthlyHighlight.note` com o aviso, exceções
  ampliadas em todos os textos, seção "Produtos excluídos" do artigo e "as exceções" no lugar de "a
  única exceção".

## Mapa de reversão (10% → 5%)

#### `src/lib/couponsData.ts`

| Texto atual (10%) | Reverter para (5%) | Ocorrências |
|---|---|---|
| `code: 'CECI', ⏎ discount: '10% OFF', ⏎ discountNumber: 10,` | `code: 'CECI', ⏎ discount: '5% OFF', ⏎ discountNumber: 5,` | 1 |
| `Cupom Nestlé Nutre Outubro 2026: CECI — 10% OFF na Loja Oficial` | `Cupom Nestlé Nutre Outubro 2026: CECI — 5% OFF na Loja Oficial` | 1 |
| `use CECI no checkout da loja oficial e ganhe 10% OFF. Não vale para Alfamino` | `use CECI no checkout da loja oficial e ganhe 5% OFF. Não vale para Alfamino` | 1 |
| `Cupom Nestlé Nutre CECI: como usar o desconto de 10%` | `Cupom Nestlé Nutre CECI: como usar o desconto de 5%` | 1 |

#### `content/reviews/cupom-ceci-nestle-nutre-como-usar.json`

| Texto atual (10%) | Reverter para (5%) | Ocorrências |
|---|---|---|
| `Cupom Nestlé Nutre CECI: como usar o desconto de 10%` | `Cupom Nestlé Nutre CECI: como usar o desconto de 5%` | 1 |
| `conferir os 10% de desconto no carrinho` | `conferir os 5% de desconto no carrinho` | 1 |
| `confira 10% OFF no checkout da loja oficial` | `confira 5% OFF no checkout da loja oficial` | 1 |
| `"10% de desconto sobre o valor dos produtos no site oficial da Nestlé Nutre"` | `"5% de desconto sobre o valor dos produtos no site oficial da Nestlé Nutre"` | 1 |
| `o desconto de 10% apareceu no valor total antes de pagar` | `o desconto de 5% apareceu no valor total antes de pagar` | 2 |
| `O cupom Nestlé Nutre CECI oferece 10% de desconto` | `O cupom Nestlé Nutre CECI oferece 5% de desconto` | 1 |
| `o desconto é de R$ 10;` | `o desconto é de R$ 5;` | 1 |
| `o desconto de 10% deve aparecer automaticamente` | `o desconto de 5% deve aparecer automaticamente` | 1 |
| `aplicado com sucesso no resumo do pedido, em print feito quando o desconto era de 5%.` | `aplicado com sucesso e o desconto de 5% no resumo do pedido.` | 1 |
| ` O print é de quando o cupom dava 5%; hoje o desconto é de 10%.` | _(remover o trecho)_ | 1 |
| `não conte com os 10% de desconto nesses itens` | `não conte com os 5% de desconto nesses itens` | 1 |
| `o cupom ajuda a economizar 10% nessa decisão` | `o cupom ajuda a economizar 5% nessa decisão` | 1 |
| `Confirme se o desconto de 10% aparece no resumo do carrinho` | `Confirme se o desconto de 5% aparece no resumo do carrinho` | 1 |
| `O desconto de 10% incide` | `O desconto de 5% incide` | 1 |
| `ele aplica 10% sobre o valor dos produtos` | `ele aplica 5% sobre o valor dos produtos` | 1 |
| `com a Nestlé Nutre: 10% OFF em produtos da loja oficial` | `com a Nestlé Nutre: 5% OFF em produtos da loja oficial` | 1 |
| `O cupom CECI dá 10% OFF em Nutren Senior` | `O cupom CECI dá 5% OFF em Nutren Senior` | 1 |

#### `content/reviews/fibermais-como-usar-em-receitas-e-bebidas.json`

| Texto atual (10%) | Reverter para (5%) | Ocorrências |
|---|---|---|
| `cupom CECI de 10% na Nestlé Nutre` | `cupom CECI de 5% na Nestlé Nutre` | 2 |
| `Cupom CECI de 10% na Nestlé Nutre para produtos elegíveis` | `Cupom CECI de 5% na Nestlé Nutre para produtos elegíveis` | 1 |
| `o código CECI oferece 10% de desconto` | `o código CECI oferece 5% de desconto` | 1 |
| `regras de 10% OFF` | `regras de 5% OFF` | 1 |
| `condições do cupom CECI de 10%` | `condições do cupom CECI de 5%` | 1 |
| `O código é CECI, com 10% de desconto` | `O código é CECI, com 5% de desconto` | 1 |
| `use CECI para 10% de desconto` | `use CECI para 5% de desconto` | 1 |
| `Cupom Nestlé Nutre CECI: Como Usar o Desconto de 10%` | `Cupom Nestlé Nutre CECI: Como Usar o Desconto de 5%` | 1 |

#### `content/reviews/nestle-nutre-e-confiavel.json`

| Texto atual (10%) | Reverter para (5%) | Ocorrências |
|---|---|---|
| `o cupom CECI pode conceder 10% de desconto no carrinho` | `o cupom CECI pode conceder 5% de desconto no carrinho` | 1 |
| `O cupom CECI aplica 10% OFF em produtos elegíveis` | `O cupom CECI aplica 5% OFF em produtos elegíveis` | 1 |
| `Cupom Nestlé Nutre CECI: como usar o desconto de 10%` | `Cupom Nestlé Nutre CECI: como usar o desconto de 5%` | 1 |

#### `content/reviews/nestle-nutre-produtos-para-que-servem.json`

| Texto atual (10%) | Reverter para (5%) | Ocorrências |
|---|---|---|
| `testar o cupom CECI para obter 10% de desconto` | `testar o cupom CECI para obter 5% de desconto` | 1 |
| `pode aplicar 10% OFF no checkout` | `pode aplicar 5% OFF no checkout` | 1 |
| `Ele pode conceder 10% de desconto na maioria dos produtos` | `Ele pode conceder 5% de desconto na maioria dos produtos` | 1 |
| `para tentar obter 10% de desconto` | `para tentar obter 5% de desconto` | 3 |
| `o cupom CECI pode conceder 10% de desconto sem necessidade de cadastro` | `o cupom CECI pode conceder 5% de desconto sem necessidade de cadastro` | 1 |
| `Cupom Nestlé Nutre CECI: como usar o desconto de 10%` | `Cupom Nestlé Nutre CECI: como usar o desconto de 5%` | 1 |

#### `content/reviews/nutren-creatina-e-boa-comparativo-growth-ftw-cimed.json`

| Texto atual (10%) | Reverter para (5%) | Ocorrências |
|---|---|---|
| `"R$ 56,91 com o CECI de 5% vigente em 27/08/2026, sobre R$ 59,90"` | `"R$ 56,91 com o cupom CECI aplicado sobre R$ 59,90"` | 1 |
| `"R$ 18,97 com o CECI de 5% vigente em 27/08/2026"` | `"R$ 18,97 com o cupom CECI"` | 1 |
| `Com o cupom CECI de 5% vigente em 27/08/2026, Nutren e FTW empatavam em R$ 18,97 por 100 g nas condições à vista observadas; com o CECI atual de 10%, a Nutren ficaria em R$ 17,97 se o preço de R$ 59,90 se mantiver;` | `Com o cupom CECI aplicado, Nutren e FTW empatam em R$ 18,97 por 100 g nas condições à vista observadas;` | 1 |
| `Na data da consulta, o CECI dava 5%: sobre R$ 59,90, o valor ficava em R$ 56,91, equivalente a R$ 18,97 por 100 g. Com o desconto atual de 10%, o mesmo preço cai para R$ 53,91, ou R$ 17,97 por 100 g.` | `Aplicando 5% sobre R$ 59,90, o valor fica em R$ 56,91, equivalente a R$ 18,97 por 100 g.` | 1 |
| `Nutren com o CECI de 5% da época e FTW à vista empataram em R$ 18,97 por 100 g. Com o CECI atual de 10% sobre o mesmo preço, a Nutren ficaria em R$ 17,97 por 100 g.` | `Nutren com CECI e FTW à vista empataram em R$ 18,97 por 100 g.` | 1 |
| `Cupom Nestlé Nutre CECI: como usar o desconto de 10%` | `Cupom Nestlé Nutre CECI: como usar o desconto de 5%` | 1 |

#### `content/reviews/nutren-just-protein-para-que-serve.json`

| Texto atual (10%) | Reverter para (5%) | Ocorrências |
|---|---|---|
| `para verificar a aplicação de 10% de desconto` | `para verificar a aplicação de 5% de desconto` | 2 |
| `Cupom Nestlé Nutre CECI: como usar o desconto de 10%` | `Cupom Nestlé Nutre CECI: como usar o desconto de 5%` | 1 |

#### `content/reviews/nutren-senior-como-tomar-sem-empelotar.json`

| Texto atual (10%) | Reverter para (5%) | Ocorrências |
|---|---|---|
| `Cupom CECI de 10% OFF em produtos Nestlé Nutre` | `Cupom CECI de 5% OFF em produtos Nestlé Nutre` | 1 |
| `O código CECI dá 10% OFF em produtos Nestlé Nutre` | `O código CECI dá 5% OFF em produtos Nestlé Nutre` | 1 |
| `regras de 10% OFF` | `regras de 5% OFF` | 1 |
| `use o cupom CECI (10% OFF)` | `use o cupom CECI (5% OFF)` | 1 |
| `Cupom Nestlé Nutre CECI: Como Usar o Desconto de 10%` | `Cupom Nestlé Nutre CECI: Como Usar o Desconto de 5%` | 1 |

#### `content/reviews/nutren-senior-zero-lactose-ficha-tecnica.json`

| Texto atual (10%) | Reverter para (5%) | Ocorrências |
|---|---|---|
| `é CECI e pode aplicar 10% nos itens elegíveis` | `é CECI e pode aplicar 5% nos itens elegíveis` | 1 |
| `o CECI, quando aceito, tira 10% dos produtos elegíveis` | `o CECI, quando aceito, tira 5% dos produtos elegíveis` | 1 |
| `o CECI chegou a aplicar o desconto, então de 5%, por cima de um combo` | `o CECI chegou a aplicar os 5% por cima de um combo` | 1 |
| `é CECI e pode aplicar 10% em produtos elegíveis no checkout` | `é CECI e pode aplicar 5% em produtos elegíveis no checkout` | 1 |
| `Cupom Nestlé Nutre CECI: como usar o desconto de 10%` | `Cupom Nestlé Nutre CECI: como usar o desconto de 5%` | 1 |
