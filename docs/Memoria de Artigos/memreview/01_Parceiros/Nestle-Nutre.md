---
parceiro: "Nestlé Nutre"
slug_cupom: "nestle-nutre"
codigo_cupom: "CECI"
status_parceria: "ativo"
revisao_geral_ate: "2026-09-01"
---

# Dossiê Factual: Nestlé Nutre

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom `CECI` oferece 10% de desconto na loja oficial Nestlé Nutre | condicao_comercial_volatil | `src/lib/couponsData.ts` + print do checkout | 2026-10-04 | 2026-11-01 | Era 5% até 03/10/2026; ainda não se sabe se os 10% são fixos ou temporários. Reversão: `docs/plans/2026-10-04-cupom-nutre-ceci-10.md` | Alta |
| Cupom `CECI` não vale para Alfamino e Alfaré | condicao_comercial_volatil | `src/lib/couponsData.ts` | 2026-10-04 | 2026-11-01 | Exclusão comercial da loja, sem motivo divulgado | Alta |
| O CECI soma com os preços da Black Friday e vale com todas as formas de pagamento | condicao_comercial_volatil | Bruno, 09/10/2026 ("não foi confirmado, mas testei e continua") | 2026-10-10 | 2026-11-10 | A página da loja diz "pode variar conforme campanha"; os artigos seguem o Bruno. Assinatura com o CECI: neutro nos artigos, sem afirmar que soma nem que não soma | Alta |
| Assinatura: 10% OFF na primeira compra e 15% a partir da 3ª recorrência, em assinaturas acima de R$ 200, sobre o preço de compra única; entregas a cada 30, 60 ou 90 dias; uma ativa por CPF; só cartão de crédito; frete grátis acima de R$ 200; pular até 2 entregas por ano; cancelar sem custo | condicao_comercial_volatil | Páginas de produto e `/assinaturas` | 2026-10-10 | 2026-11-10 | O preço de assinatura da página nem sempre bate com os 10% sobre a compra única (Senior ZL: R$ 190,61 → R$ 169,43): os artigos mostram o preço da página | Alta |
| Frete grátis acima de R$ 400 na compra única, na transportadora predefinida; 6x sem juros com parcela mínima de R$ 75; Pix por QR Code, sem desconto anunciado | condicao_comercial_volatil | Home e `/perguntas-frequentes` | 2026-10-10 | 2026-11-10 | — | Alta |
| Preços em 10/10/2026 (riscado / compra única / assinatura): Senior Café com Leite 740 g 188,19 / 169,37 / 150,55; Senior ZL Sem Sabor 740 g 211,79 / 190,61 / 169,43; Kit Senior Sem Sabor 2 × 740 g — / 263,49 / 237,14 (preço do kit inteiro, conferido num carrinho de visitante, esvaziado depois); Kit Senior ZL Sem Sabor 2 × 740 g — / 296,50 / 266,85; Combo Senior Sem Sabor 2 × 740 g 376,38 / 319,92 / 282,29; Senior Café com Leite 370 g — / 100,79 / 90,71; Just Protein 280 g 128,79 / 115,91 / 103,03; Combo Just Protein 2 latas 257,58 / 193,18 / 167,43; Creatina 300 g — / 59,90 / 53,91; FiberMais 260 g — / 144,89 / 130,40; Control Baunilha 740 g 214,89 / 171,91 / 150,42; Active Baunilha 400 g 63,49 / 50,79 / 44,44 | condicao_comercial_volatil | Páginas de produto, lidas no navegador (a loja bloqueia leitura direta) | 2026-10-10 | 2026-11-10 | O "/cada" aparece em todo produto, inclusive nos kits | Alta |
| Simulação no calculador da página de produto em 10/10/2026, três latas de 740 g do Senior ZL (R$ 571,83, frete grátis), CEP do centro: grátis em 3 dias úteis em SP; 5 em Brasília, Goiânia e Salvador; 6 em BH e Recife; 7 no RJ, em Curitiba e Fortaleza; 8 em Porto Alegre; 9 em Belém; 14 em Manaus. Pagas mais rápidas: R$ 16 a R$ 20 e 1 a 2 dias a menos no RJ, em Curitiba, Porto Alegre, Brasília e Goiânia; Sedex de 3 a 6 dias por R$ 98,60 a R$ 147,90 no Norte e no Nordeste | condicao_comercial_volatil | `/freterapido_quote/product/shipping/` (o calculador da página), sem login e sem pedido (OK do Bruno) | 2026-10-10 | 2026-11-10 | Base da data limite para o Natal. Termos: processamento em até 48 h e prazo contado da nota fiscal | Média |
| Dano, falta ou desistência avisados em até 7 dias da entrega pelo 0800-770-2461 ou por e-mail; trocas e devoluções pelo CDC, pedidas ao SAC; estorno no cartão de uma vez, na fatura seguinte ou na outra; prazo de entrega em dias úteis, até 30 dias úteis | fato_oficial | `/termos-de-uso` | 2026-10-10 | 2027-01-10 | — | Alta |
| Black Friday: nada do Nutren encontrado na loja em anos anteriores nem anúncio de 2026 até 10/10; em 11/2025 a Nestlé disse ao Gironews que fazia a maior Black Friday da sua história, nos canais digitais, sem detalhar o Nutren | dado_externo | gironews.com ("Visando crescimento de duplo dígito, Nestlé realiza maior Black Friday de sua história") | 2026-10-10 | 2026-11-10 | Cupons da própria loja (boas-vindas e o relâmpago do 10.10) ficam fora dos artigos | Média |

---

## 1.1 Alertas Regulatórios

> [!CAUTION]
> **Fórmulas infantis para bebês de 0 a 12 meses (ex.: NAN dessa faixa) nunca recebem o CECI.**
> O art. 5º do Decreto 9.579/2018 proíbe a promoção comercial de fórmulas infantis para lactentes
> e de seguimento para lactentes (art. 3º, IV), e o parágrafo único cita "descontos de preço" e
> "cupons de descontos", inclusive em meios eletrônicos. Lactente é a criança de até 11 meses e
> 29 dias (art. 4º). Conferido no texto do Planalto em 04/10/2026.
>
> - Não escrever, em página ou artigo, frase que sugira o CECI nessas fórmulas. Toda menção às
>   exceções do cupom inclui "fórmulas infantis de 0 a 12 meses".
> - Alfamino e Alfaré (necessidades dietoterápicas, art. 3º, V) ficam de fora por regra da loja,
>   não por essa proibição. NAN para 1 a 3 anos (art. 3º, III) também não está na proibição.
> - A mesma vedação alcança mamadeiras, bicos e chupetas (art. 3º, VII).

---

## 2. Linhas de Produtos & Fatos Oficiais (Estáveis)

| Linha de Produto | Foco / Aplicação | Fatos Principais | Fonte |
|---|---|---|---|
| **Nutren Just Protein** | Proteína isolada pura sem sabor (280g) | **Tabela por 15g:** 52 kcal, 13g Proteína, 0g Carboidratos, 0g Gorduras, 76mg Sódio. Ingredientes: proteína isolada do soro do leite e lecitina. Origem clínica (pós-operatório, bariátrica, oncologia, sarcopenia). | Embalagem física oficial 280g |
| **Nutren Senior** | Adultos 50+ / Sênior | Rico em cálcio, vitamina D, zinco e proteínas para manutenção de massa muscular | Rótulo oficial |
| **Nutren Protein** | Dia a dia / Ativos | Foco em proteína rápida para lanches e rotina ativa | Rótulo oficial |
| **Nutren Control** | Controle glicêmico | Fórmula desenvolvida para quem busca equilíbrio de glicose (baixo índice glicêmico) | Rótulo oficial |
| **Nutren Beauty** | Cuidados com pele | Colágeno hidrolisado e antioxidantes | Rótulo oficial |
| **FiberMais** | Fibras solúveis | 100% fibra solúvel que não altera sabor nem textura dos alimentos | Rótulo oficial |
| **Impact** | Nutrição clínica especializada | Dieta hiperproteica para preparo imunológico pré e pós-operatório | Rótulo oficial |

---

## 3. Dores Mapeadas
- [[nutren-just-protein-para-que-serve]] (O que é proteína sem sabor, origem clínica, como usar em comida de verdade e receitas) ✅
- [[nutren-senior-como-tomar-sem-empelotar]] (Como dissolver na água ou leite frio/quente, dosagem diária)
- [[diferenca-nutren-senior-protein-control]] (Tabela comparativa direta de calorias, proteínas e açúcares para escolha certa)
- [[fibermais-como-usar-em-receitas-e-bebidas]] (Dose recomendada, se pode levar ao fogo ou congelar)

---

## 4. Artigos Já Publicados / Em Produção no Cluster
- `nutren-just-protein-para-que-serve` (Em conformação JSON)
- `nestle-nutre-produtos-para-que-servem`
- `nestle-nutre-e-confiavel`
- `nutren-senior-zero-lactose-ficha-tecnica`
- `cupom-ceci-nestle-nutre-como-usar`
- `black-friday-nestle-nutre` (em revisão desde 10/10/2026)
