# Fatos: Nestlé Nutre, mais vendidos (19/11/2026)

Fonte: duas capturas de tela da vitrine de mais vendidos da loja, enviadas pelo Bruno em 19/11/2026; autocompletar do Google e Google Trends (Brasil, 12 meses) do mesmo dia. Nenhuma ficha de produto foi lida.

## 1. Os dez produtos

| Produto | Preço na captura | Assinando | Artigo nosso |
|---|---|---|---|
| Combo Nutren Fortify, 3 unidades | R$ 276,69 (de R$ 425,67, 35%) | R$ 255,40 | Não; só citado em dois textos |
| Combo Novasource Proline Cappuccino, 10 unidades | R$ 175,20 (de R$ 219,90, 20%) | R$ 153,30 | Não |
| Combo Novasource Proline Morango, 10 unidades | R$ 175,92 (de R$ 219,90) | R$ 153,93 | Não |
| Combo Novasource Proline Baunilha, 10 unidades | R$ 175,92 (de R$ 219,90) | R$ 153,93 | Não |
| Nutren Active Baunilha 700 g | R$ 89,90 | R$ 80,91 | Não; só citado |
| Nutren Protein Baunilha 800 g | R$ 168,39 | R$ 151,55 | Sim: `nutren-protein-ou-whey` |
| Nanlac Supreme Pro 1 a 3 anos 800 g | R$ 89,91 (de R$ 112,39, 20%) | R$ 78,67 | Sim: quatro artigos |
| Nestonutri 1 a 3 anos | R$ 63,69 | R$ 57,32 | Não; só citado na Black Friday |
| Kit Degustação Nutren Control 200 ml | R$ 42,50 (de R$ 56,67, 25%) | R$ 36,84 | Não; só citado |
| Kit Degustação Nutren Senior 200 ml | R$ 42,50 (de R$ 56,67, 25%) | R$ 36,84 | Senior tem cinco artigos; o kit, não |

## 2. Busca

**Trends, Brasil, 12 meses (média):** "nestonutri" 51; "nutren control" 40; "nutren active" 21; "novasource proline" 16; "nutren fortify" 5.

**Autocompletar:**
- **Nestonutri:** "1 a 3 anos", "1 a 3 anos é bom", "3 a 5 anos", "nestonutri e nestogeno é a mesma coisa", "ou ninho fases" (três variações), "ou nestogeno", "ou aptanutri", "ou nanlac", "ou leite integral".
- **Nutren Control:** "diet", "para que serve", "tabela nutricional", "sem sabor", "diet como usar", "ou glucerna" (três variações), "ou senior", "ou diasip", "ou whey protein".
- **Nutren Active:** "engorda", "para que serve", "como tomar", "tabela nutricional", "ou senior" (duas), "ou ensure", "ou sustagen adulto", "ou whey protein", "ou protein".
- **Novasource Proline:** "para que serve", "cicatrização", "engorda", "tabela nutricional", "pó", "1 litro", "ou cubitan", "ou impact".
- **Nutren Fortify:** "para que serve", "sem sabor", "zero lactose", "engorda", "tabela nutricional", "ou nutren senior" (duas), "ou nutridrink protein", "para pacientes oncológicos", "para diabéticos".

## 3. Pautas propostas (sem GO)

| Código | Pauta | Sinal | Cuidado |
|---|---|---|---|
| NM1 | Nutren Active: para que serve, como tomar e a diferença para o Senior e o Protein | Trends 21; "ou senior", "ou protein", "ou whey" | Só pelo rótulo. "Engorda" responde com as calorias por porção, sem promessa |
| NM2 | Nestonutri ou Ninho Fases (1 a 3 anos) | Trends 51, o maior; três variações de "ou ninho fases" | Faixa de 1 a 3 anos: só pelo rótulo, `notice` do Ministério da Saúde e "na dúvida, o pediatra". Nunca 0 a 12 meses. Conferir se o `nanlac-supreme-ou-ninho-fases` e o guia da linha Ninho já cobrem |
| NM3 | Nestonutri e Nestogeno é a mesma coisa? | Uma variação exata no autocompletar | Nestogeno tem versões de 0 a 12 meses, em que o código não vale e não pode ser sugerido. Risco alto; talvez só uma pergunta dentro da NM2 |
| NM4 | Nutren Control: para que serve e a tabela nutricional | Trends 40; "diet", "para que serve", "como usar" | Produto para controle de glicemia: saúde. Só o rótulo, sem "para diabéticos" como promessa, com "fale com o médico ou nutricionista" |
| NM5 | Nutren Control ou Glucerna | Três variações no autocompletar | Mesmo cuidado; só tabela contra tabela |
| NM6 | Nutren Fortify ou Nutren Senior | "ou senior" com duas variações; Trends 5 | Só rótulo. "Oncológicos" e "diabéticos" ficam fora do texto |
| NM7 | Novasource Proline: para que serve | Trends 16; "cicatrização", "ou cubitan" | Fórmula de uso clínico (cicatrização). É o mais vendido em três sabores, mas é o de maior risco: só entra como ficha do rótulo, sem indicação |
| NM8 | Kit degustação Nutren (Senior e Control): vale para experimentar o sabor? | Sem sinal de busca medido | Poderia ser seção do `nutren-senior-kit-combo-ou-assinatura` |

**NM9 e NM10 (19/11):** "Novasource Proline ou Cubitan" e "Novasource Proline ou Impact" viram artigos próprios, por decisão do Bruno. Sem leitura ainda.

**Ordem sugerida:** NM1 (menor risco e sem artigo), NM2 (maior busca), NM6. As de Control e Proline pedem a leitura do rótulo e uma decisão do Bruno sobre entrar em produto de uso clínico.

## 4. Leituras de 19/11 (Fortify e Novasource Proline)

GO do Bruno para os dois; briefings em [[nutren-fortify-para-que-serve]] e [[novasource-proline-para-que-serve]].

- **A loja não é VTEX:** a busca é `/catalogsearch/result/?q=`. A linha de comando recebe 403; ler pelo navegador.
- **Fortify:** só a lata Sem Sabor de 360 g (6 porções de 60 g; 18 g de proteína e 263 kcal por porção) e o combo de 3. R$ 120,61 a lata e R$ 276,69 o combo, na Black Month.
- **Novasource Proline:** caixinha de 200 ml em três sabores (20 g de proteína, 3 g de arginina e 2 g de prolina), combo de 10, pó de 330 g (11 porções, outra tabela) e litro sem sabor.
- **`CECI` no carrinho:** 10% sobre o preço em promoção na lata do Fortify (R$ 120,61 para R$ 108,55) e no combo de baunilha do Proline (R$ 175,92 para R$ 158,33). O carrinho foi esvaziado depois.
- **A faixa do topo anuncia um cupom de primeira compra da loja:** não é nosso e não entra em texto.
- **Brinde de campanha:** um Mucilon de 160 g entrou grátis no carrinho.

## 5. Leituras de 19/11 (Active, Nestonutri e Ninho Fases 1+)

GO do Bruno para a NM1 e a NM2; briefings em [[nutren-active-para-que-serve]] e [[nestonutri-ou-ninho-fases]].

- **Nutren Active:** 400 g em três sabores (R$ 63,49) e 700 g só em baunilha (R$ 89,90); porção de 31,5 g com 114 kcal e 7,5 g de proteína, 176 kcal e 14 g com 180 ml de leite desnatado. A página do 700 g repete o rendimento da lata de 400 g.
- **Nestonutri 1+ 800 g:** R$ 63,69; 69 kcal e 1,7 g de proteína por 100 ml; GOS como prebiótico.
- **Ninho Fases 1+ 800 g:** R$ 49,46 (de R$ 58,19); 65 kcal e 1,8 g de proteína por 100 ml; FOS e inulina, com o dobro de fibra.
- **`CECI`:** não testado nesses três.

**Não lido:** rótulo do Control e do kit degustação; a linha Nestogeno; preços fora das capturas; se o CECI vale em cada um (Alfamino, Alfaré e fórmulas de 0 a 12 meses ficam fora).
