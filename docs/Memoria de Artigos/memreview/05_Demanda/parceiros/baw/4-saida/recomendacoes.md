# Recomendações: BAW Clothing

Gerado por `gerar-recomendacoes.cjs` a partir de `3-matriz/matriz.csv` e de `decisoes.json`. Não editar à mão: mudar
a matriz ou as decisões e gerar de novo. Segundo piloto do Programa de Demanda (fluxo v2), com insumos fechados em
`5544b2e1` e revisão concluída em 25/11/2026.

**Estado: 35 oportunidades revisadas: 13 com ação recomendada, 4 ideias registradas, 6 de não
criar e 12 de manter. Todas passaram pela revisão independente (`3-matriz/REVISAO.md`, duas passadas). 8 têm
decisão registrada em `decisoes.json` (duas delas tomadas fora do programa, antes da análise); as outras esperam o Bruno.**

Revisão, decisão e execução são coisas diferentes: a matriz guarda o estado da revisão; a decisão do Bruno e o que já
foi executado estão em `decisoes.json` e aparecem em cada item. Fato e leitura estão separados em
`3-matriz/LEITURA.md`. O programa não mexe na Fila de Pautas: o que o Bruno aprovar segue para o destino indicado.

## Ordem sugerida

1. `op-baw-0012` e `op-baw-0013`: um carrinho de teste na semana de 27/11 responde às duas (o código com o "pague 3,
   leve 4", a base dos 15% do Pix e o frete grátis); depois, a BW6 e a `/cupons/baw`.
2. `op-baw-0021` e `op-baw-0022`: links internos para a tabela de medidas e para o guia de tênis. Esforço pequeno e
   confiança alta; a da BW6 entra na mesma edição da primeira.
3. `op-baw-0006` e `op-baw-0014`: capítulos da BW3 (a revenda e o "faliu") e da BW1 (combos), sem prazo.
4. `op-baw-0009`: a loja física espera a sua decisão sobre a fonte e a confirmação com a parceira.

O resto não tem prazo. As páginas da BAW têm poucos dias de dado: o export útil do Search Console é o de depois de
30/11, que também decide o que fazer com as linhas de manter.

## Resumo

| Oportunidade | Ação | Prioridade | Confiança | Pergunta ou decisão atendida |
|---|---|---|---|---|
| `op-baw-0012` | atualizar-fatos | alta | media | Saber o que vale na Black Friday da BAW, quais são as regras da campanha e se o código soma |
| `op-baw-0013` | melhorar-pagina-cupom | alta | media | Saber se o código vale na Black Friday e o que soma com ele na campanha |
| `op-baw-0006` | melhorar-capitulo | media | media | Entender o que aconteceu com a BAW (venda à Arezzo, volta aos fundadores) e se a marca faliu |
| `op-baw-0009` | criar-artigo | media | baixa | Saber se a BAW tem loja física, onde fica, se é outlet e se o código vale lá |
| `op-baw-0014` | melhorar-capitulo | media | baixa | Saber se a BAW tem desconto progressivo ou combo e se o código soma com ele |
| `op-baw-0021` | links-internos | media | alta | Chegar à tabela de medidas a partir dos artigos de cupom e de primeira compra |
| `op-baw-0022` | links-internos | media | alta | Chegar ao guia de tênis a partir do "é boa" e da Black Friday |
| `op-baw-0008` | melhorar-capitulo | baixa | baixa | Saber onde comprar peça original da BAW e se o código vale fora do site |
| `op-baw-0015` | melhorar-capitulo | baixa | media | Achar o tênis BAW pelo nome do modelo (Casual, Break, Seven, Second, Four, Three) e saber se a loja ainda vende |
| `op-baw-0020` | melhorar-capitulo | baixa | media | Saber como vestem as camisetas Boxy e New Over da BAW em relação à regular e à oversized |
| `op-baw-0023` | links-internos | baixa | media | Chegar às comparações com outras marcas a partir do "é boa" e da tabela de medidas |
| `op-baw-0025` | criar-artigo | baixa | media | Decidir se vale comprar um moletom da BAW: modelos, tecido, medida e preço |
| `op-baw-0035` | video | baixa | baixa | Ver em vídeo como o código entra no carrinho |

## Recomendações com ação

### op-baw-0012 · atualizar-fatos · prioridade alta

- **Pergunta ou decisão atendida:** Saber o que vale na Black Friday da BAW, quais são as regras da campanha e se o código soma
- **Evidência:** sinais: 57 (ids na matriz); nossos dados: 5 (ids na matriz); comercial: 4 (ids na matriz)
- **Evidências principais:** `sin-baw-1079`, `sin-baw-1087`, `cob-baw-0025`
- **Conteúdo existente:** cobertura: 12 (ids na matriz)
- **O que falta hoje e o que a ação acrescenta:** A BW6 (16/11, reforma de 22/11) diz que a campanha tem até 80% OFF, mostra a coluna "só com o Pix" com 5% e lê preços de 16/11 (cob-baw-0020 e 0022 a 0029, parciais). Na releitura de 24/11 o banner da /blackfriday virou "PIX NIGHT / Até 80%OFF / PAGUE 3, LEVE 4 / NO SITE TODO +15%OFF NO PIX" (captura e imagem original guardadas), o "+30% na segunda peça" de 18/11 sumiu, e a página segue sem data e sem regulamento. Das peças do artigo, a Oversized BAW Subscript está a R$ 79,00 (era R$ 89,00) e a BR Regular Locally Grown ganhou preço "de"; as outras seguem com o preço de 16/11. Falta saber no carrinho: se o código soma com o "pague 3, leve 4", sobre que preço entram os 15% do Pix e até quando vale a Pix Night.
- **Prioridade, e por quê:** alta. Prazo: a Black Friday é 27/11, e a ficha da BW6 já prevê refazer o teste do código nessa semana. O artigo está na 6ª posição dos orgânicos de "baw black friday" (18/11). No Trends de 12 meses, as duas semanas mais altas de "baw clothing" são as de 16/11/2025 (100) e 23/11/2025 (97, a da Black Friday de 2025), e a de 08/11/2026 já marcou 83 (bruto: 20261118-2054-google-trends/trends-a-baw-clothing-sozinha.csv, linhas 2, 3 e 53). Mesmo sem o carrinho há o que atualizar nesta janela: o texto traz a Oversized BAW Subscript a R$ 89,00, e a vitrine de 24/11 a mostra a R$ 79,00 (sin-baw-1087), e o banner entra datado, como anúncio sem regra. O banner não tem regra, data nem regulamento (sin-baw-1082): se ele muda a resposta central ("o código soma?") e a conta do Pix, só o carrinho diz.
- **Confiança:** media
- **Dependências e como obter:** Carrinho de teste sem compra na semana de 27/11 (Bruno ou sessão de cupons): código com o "pague 3, leve 4", base dos 15% do Pix e fim da Pix Night. Redação da BW6 pela sessão de artigos, com os preços relidos no dia. Se a Pix Night já tiver acabado na releitura, o texto não a cita.
- **Pendências e notas:** P3 respondida pela releitura de 24/11 (relato da etapa 3, seção 9; coleta 20261124-1808-vitrine-blackfriday). Regras provisórias até o carrinho. Evidência da semente que os CSVs não têm: em 16/11 a home mostrava um "PIX DAY" de um dia, com até 80% OFF e 15% extra no Pix, "só hoje" (dossiê, seção 1). Leitura do analista, a conferir no carrinho: os 15% no Pix voltaram na Pix Night de 24/11 e podem ser campanha curta que se repete, e não regra do site; o banner diz "NO SITE TODO" e não traz data, e no texto da /blackfriday de 24/11 a palavra "pix" não aparece (só na imagem). Como os 15% entram, o texto só diz depois do carrinho; até lá, a coluna do Pix fica com os 5% que a ficha mostrava em 16/11 (dossiê, seção 1, revisar até 16/12), com a data. Correção de 25/11, item 4.3 da revisão. "A última Black Friday da BAW" segue como nome de campanha, entre aspas, sem interpretação. O banner de campanha do site (content/campanhas/baw-black-friday-2026.json, verificado em 24/11) já diz "até 80% OFF e pague 3, leve 4" e não cita a Pix Night: a sessão dona dele decide se acrescenta. "Qual é o melhor dia para comprar na Black Friday?" (sin-baw-0860) não tem resposta sem data da loja: sem capítulo.
- **Ressalva da coordenação:** A oferta de 24/11 (Pix Night, "pague 3, leve 4", +15% no Pix) não tem data nem regulamento publicados: tudo o que a linha diz dela é leitura até o carrinho. O banner do site (`content/campanhas/baw-black-friday-2026.json`) já diz "até 80% OFF e pague 3, leve 4".
- **Destino, se aprovada:** Primeiro o carrinho de teste da semana de 27/11 (Bruno ou sessão de cupons, sem compra); depois a sessão de artigos, na BW6
- **Revisado por:** sessão de revisão independente, 25/11/2026
- **Decisão do Bruno:** aprovada: carrinho de teste sem compra na semana de 27/11, que responde a esta linha e à op-baw-0013, em 2026-11-25
- **Execução:** concluída: carrinho de 25/11 feito pela coordenação (sem compra, sem login) e BW6 `black-friday-baw` atualizada pela sessão de artigos com o "pague 3, leve 4" e o teste do código (PR #1469); no ar em 25/11, conferido às 18:15 (carrinho de 25/11, coleta 1-bruto/20261125-1617-navegador-carrinho (FONTE.md); GO do Bruno na sessão de coordenação, 25/11 ("Sim, aprovar", "Esta sessão faz" e "Sim, mandar"); PR #1469)

### op-baw-0013 · melhorar-pagina-cupom · prioridade alta

- **Pergunta ou decisão atendida:** Saber se o código vale na Black Friday e o que soma com ele na campanha
- **Evidência:** sinais: 8 (ids na matriz); nossos dados: 1 (ids na matriz); comercial: 4 (ids na matriz)
- **Evidências principais:** `sin-baw-1080`, `sin-baw-1079`, `cob-baw-0008`
- **Conteúdo existente:** cobertura: 3 (ids na matriz)
- **O que falta hoje e o que a ação acrescenta:** O FAQ de Black Friday da /cupons/baw cita a campanha de até 80% OFF e o teste de novembro com camiseta em promoção (cob-baw-0008, parcial; cob-baw-0066). A tabela "O que acumula" diz que o código soma com o Pix, que no site é de 5%; a vitrine de 24/11 anuncia "+15%OFF NO PIX" no site todo e "PAGUE 3, LEVE 4", sem regra escrita. O que a página acrescenta, depois do carrinho: se o código soma com o "pague 3, leve 4" e com o Pix da campanha, com a data do teste.
- **Prioridade, e por quê:** alta. Mesmo prazo da op-baw-0012 (27/11), com o mesmo banner sem regra publicada (sin-baw-1082). A prioridade alta é condicionada ao carrinho na semana de 27/11: sem ele, a linha não tem ação, porque o que a página afirma segue apoiado no teste de 17/11 e no dossiê (revisar até 16/12). "cupom baw black friday" completa, e "Qual é o cupom da Baw?" está em "As pessoas também perguntam" de "baw black friday". A página de cupom é dona da busca de cupom; o artigo é da campanha.
- **Confiança:** media
- **Dependências e como obter:** O mesmo carrinho da op-baw-0012, que confere também o valor do frete grátis na campanha (a visão de IA de "cupom baw" diz R$ 499; a página diz R$ 399). Sessão de cupons (/cupons/baw e couponsData.ts são dela).
- **Pendências e notas:** Destino diferente da op-baw-0012 (sessão de cupons, não de artigos), por isso linha própria. Correção de 25/11, item 4.4 da revisão.
- **Ressalva da coordenação:** Sem o carrinho não há o que mudar na página: a prioridade alta é pelo prazo, e a ação depende do teste.
- **Destino, se aprovada:** O mesmo carrinho da `op-baw-0012`; depois a sessão de cupons
- **Revisado por:** sessão de revisão independente, 25/11/2026
- **Decisão do Bruno:** aprovada: carrinho de teste sem compra na semana de 27/11, que responde a esta linha e à op-baw-0012, em 2026-11-25
- **Execução:** concluída: carrinho de 25/11 feito pela coordenação e /cupons/baw atualizada pela sessão de cupons com o teste de 25/11 e a soma com o "pague 3, leve 4", frete grátis mantido como aviso do site (PR #1467, revisado pela "Redesenho do site"); no ar em 25/11, conferido às 18:15 (carrinho de 25/11, coleta 1-bruto/20261125-1617-navegador-carrinho (FONTE.md); GO do Bruno na sessão de coordenação, 25/11 ("Sim, aprovar", "Esta sessão faz" e "Sim, mandar"); PR #1467)

### op-baw-0006 · melhorar-capitulo · prioridade media

- **Pergunta ou decisão atendida:** Entender o que aconteceu com a BAW (venda à Arezzo, volta aos fundadores) e se a marca faliu
- **Evidência:** sinais: 19 (ids na matriz); nossos dados: 2 (ids na matriz); comercial: @indisponivel
- **Evidências principais:** `sin-baw-0732`, `sin-baw-0079`, `cob-baw-0036`
- **Conteúdo existente:** cobertura: 1 (ids na matriz)
- **O que falta hoje e o que a ação acrescenta:** A BW3 responde "de quem é" com a compra de 2021 e a revenda de 2025, mas não traz a pergunta como as pessoas fazem ("O que aconteceu com a BAW?") nem "a BAW faliu?". A pergunta aparece em "As pessoas também perguntam" em 9 das 13 buscas lidas, nas três formas (o mesmo bloco se repetindo, não procura somada), e "baw clothing faliu" completa. O que acrescentar: um item de FAQ ou um subtítulo com a pergunta literal, respondido com as fontes que a BW3 já cita (compra pela Arezzo&Co em 2021, revenda aos fundadores em 2025 e, pela Pipeline em 2026, a recompra do controle pelos irmãos e Bruno Karra como CEO) e, para "faliu", o que as reportagens lidas dizem, sem afirmar o que elas não dizem.
- **Prioridade, e por quê:** media. É a pergunta relacionada que mais se repete entre as buscas da marca, inclusive em buscas de produto ("moletom baw", "tênis baw é bom") e de campanha ("baw black friday"). Mudança pequena num artigo que já tem as fontes. Sem dado próprio que meça o efeito.
- **Confiança:** media
- **Dependências e como obter:** Sessão de artigos (mudança em artigo no ar). Para "faliu", reler o trecho aberto das reportagens que a BW3 cita; se nenhuma fala do assunto, a resposta diz só o que elas dizem da revenda.
- **Pendências e notas:** O texto da resposta do "As pessoas também perguntam" não foi aberto na coleta: não sabemos o que o Google responde. A releitura da página do Google é do redator, no dia. Planos de exterior: estão só no título da reportagem da Pipeline ("A vida após Azzas: Baw Clothing quer exterior e sócios influenciadores", 14/07/2026), da qual se leram a linha fina e os dois primeiros parágrafos (semente, seções 10 e 11); a BW3 não os cita, e se entrarem é com atribuição ao título. Correção de 25/11, item 4.1 da revisão.
- **Destino, se aprovada:** Sessão de artigos, com esta ficha como escopo
- **Revisado por:** sessão de revisão independente, 25/11/2026
- **Decisão do Bruno:** aprovada no pacote de links e capítulos: "O que aconteceu com a BAW?" e "A BAW faliu?" na BW3 `baw-clothing-e-confiavel`, só com o que as reportagens citadas dizem, em 2026-11-25
- **Execução:** na main, sem deploy: capítulo "O que aconteceu com a BAW?" e FAQ "A BAW faliu?" na BW3, com "É da Reserva ou da Arezzo?" mantido (op-baw-0005) depois do pedido da coordenação (PR #1482 e correção #1483, 0c97a0e); conferido na main em 25/11 às 21:58 (GO do Bruno na sessão de coordenação, 25/11 ("Sim, aprovar pacote": 0021, 0022, 0023 e 0006); PR #1481, #1482 e #1483)

### op-baw-0009 · criar-artigo · prioridade media

- **Pergunta ou decisão atendida:** Saber se a BAW tem loja física, onde fica, se é outlet e se o código vale lá
- **Evidência:** sinais: 81 (ids na matriz); nossos dados: @nao-investigado; comercial: @indisponivel
- **Evidências principais:** `sin-baw-0743`, `sin-baw-0539`, `sin-baw-0751`
- **Conteúdo existente:** cobertura: 1 (ids na matriz)
- **O que falta hoje e o que a ação acrescenta:** Os resultados de "baw loja física" (18/11) são a página "Nossas Lojas" do site, vazia; o perfil de empresa e a bio do Instagram oficial com a Rua Três Rios, 72, só em trecho; e reportagens de 2021 e 2022 sobre as lojas do Bom Retiro e do Barra Shopping. O nosso texto acrescenta o que existe hoje, com fonte datada, as lojas que a imprensa diz terem fechado, se uma reportagem de 2025 for lida, e se o código vale na loja, que nenhum resultado diz. A frase "a marca ficaria só com a loja do Bom Retiro", que a semente atribui à FashionUnited (seção 4), não tem leitura: a própria semente registra que dessa reportagem só se leu o título (seção 11). A BW3 tem o item "A BAW Clothing tem loja física?" e responde que a página "Nossas Lojas" não listava endereços (cob-baw-0044, parcial).
- **Prioridade, e por quê:** media. É o tema de loja que mais formula no autocompletar: "baw outlet" (10 sugestões, com bairros e endereço), "baw bom retiro" (10, com "endereço" e "telefone"), "baw retiro store rua três rios 72", "baw loja fisica rj" e "sp". "Onde fica a BAW?" está em "As pessoas também perguntam" de três buscas, e "Baw outlet" e "Baw loja física" voltam como buscas relacionadas de quatro e três. Nenhuma página nossa diz onde a loja fica. Não há medida de volume, e o tema não decide compra no site: prioridade média, não alta.
- **Confiança:** baixa
- **Dependências e como obter:** Decisão do Bruno sobre a fonte (pergunta 1 da etapa 3: o Instagram oficial e o perfil do Google bastam, ou espera a página "Nossas Lojas"?). Confirmação com a parceira: endereço, horário, se a Retiro Store é outlet e se o BAWEMCASACOMCECILIA vale na loja. Outlets do autocompletar (Catarina, Pinheiros, Teodoro Sampaio, Rua dos Italianos) só com fonte oficial; sem ela, ficam fora. Lojas fechadas: ler o corpo de uma reportagem de 2025 (a FashionUnited pede cadastro; do NeoFeed se leram título e linha fina) ou outra fonte; sem leitura, o texto não cita loja fechada.
- **Pendências e notas:** Coincide com o estoque sem GO da Fila (linha da BAW: "loja física e outlets (só com fonte oficial; a página de lojas está vazia)"). O que a evidência acrescenta: a vitrine "Loja 3 Rios" no próprio site (/loja3rios, com "Baw Retiro Store" no banner, sem endereço; coleta 20261118-1314-navegador-paginas) e o volume de formulações com endereço. Precedente de formato: L17 (Let's Eat It), artigo próprio de loja física aprovado pelo Bruno em 21/11. A vitrine Outlet do site (cat-baw-0033) não é loja física. Correção de 25/11, item 4.2 da revisão.
- **Ressalva da coordenação:** O "só o Bom Retiro" da semente não tem o trecho lido (a FashionUnited só teve o título lido; semente corrigida em 25/11, #1444).
- **Destino, se aprovada:** Bruno: a fonte da loja física e a confirmação com a parceira; depois, linha na Fila de Pautas
- **Revisado por:** sessão de revisão independente, 25/11/2026
- **Decisão do Bruno:** em espera

### op-baw-0014 · melhorar-capitulo · prioridade media

- **Pergunta ou decisão atendida:** Saber se a BAW tem desconto progressivo ou combo e se o código soma com ele
- **Evidência:** sinais: 14 (ids na matriz); nossos dados: @nao-investigado; comercial: 4 (ids na matriz)
- **Evidências principais:** `sin-baw-0104`, `sin-baw-0822`, `cat-baw-0035`
- **Conteúdo existente:** cobertura: 3 (ids na matriz)
- **O que falta hoje e o que a ação acrescenta:** "baw desconto progressivo" completa. A visão de IA de "cupom baw" e o trecho de um site de cupons no Google descrevem desconto progressivo por quantidade de peças com duas escalas diferentes, nenhuma da loja. O site tem vitrines de combo e de kit (combo moletom, combo oversized, combo regular, kit moletons, kit camiseta regular) e, na Black Friday, o "pague 3, leve 4". A /combos foi lida em 18/11 no navegador (coleta 20261118-1314-navegador-paginas, pagina-combos.txt): nenhuma regra de combo, de "leve N" ou de preço por quantidade no texto; é vitrine de peças avulsas ("68 PRODUTOS"), com um banner de topo (lp_crazy_ultimas_v2.jpg) que não foi baixado. Nenhum dos onze artigos nem a /cupons/baw trata do assunto. O que acrescentar, já sem carrinho: a loja não publica escala de desconto progressivo na página de combos (18/11), e as escalas que circulam são de sites de cupom e se contradizem. Depois do carrinho: se o código soma com um combo.
- **Prioridade, e por quê:** media. A busca existe e a resposta que aparece hoje é de terceiros e se contradiz. Com a leitura de 18/11 já há uma resposta curta, sem carrinho, o que mantém a média. A confiança segue baixa: o banner de topo da /combos não foi lido, e a regra pode estar na imagem.
- **Confiança:** baixa
- **Dependências e como obter:** Ler o banner de topo da /combos e as páginas de kit (kit moletons, kit camiseta regular), que não foram lidas como texto, e um carrinho de combo com o código, fora do programa. Destino: um capítulo ou FAQ na BW1 e, se a regra valer sempre, uma linha na tabela "O que acumula" da /cupons/baw (sessão de cupons).
- **Pendências e notas:** As escalas de terceiros não entram em texto. A loja diz "a loja não vende kit como produto" só no sentido do catálogo (relato da etapa 2, seção 3): as páginas de combo listam peças avulsas. Retirada na correção de 25/11 (item 4.5 da revisão) a frase "os combos são oferta permanente do site", que não tinha fonte: as vitrines foram lidas só em 18/11, e uma leitura não mostra se a oferta é permanente.
- **Destino, se aprovada:** Sessão de artigos, com esta ficha como escopo
- **Revisado por:** sessão de revisão independente, 25/11/2026
- **Decisão do Bruno:** em espera

### op-baw-0021 · links-internos · prioridade media

- **Pergunta ou decisão atendida:** Chegar à tabela de medidas a partir dos artigos de cupom e de primeira compra
- **Evidência:** sinais: 3 (ids na matriz); nossos dados: @nao-investigado; comercial: @indisponivel
- **Evidências principais:** `cob-baw-0019`, `cob-baw-0049`, `cob-baw-0087`
- **Conteúdo existente:** cobertura: 3 (ids na matriz)
- **O que falta hoje e o que a ação acrescenta:** O capítulo de tamanho da BW1 remete à BW6, e o da BW4 remete às medidas da BW5; nenhum dos dois linka a BW10, o guia de tamanhos publicado em 23/11 (cobertura lida em 4c639f06; o conteúdo não mudou até 5544b2e1). Com a troca só por crédito, acertar o tamanho pesa no primeiro pedido.
- **Prioridade, e por quê:** media. Esforço pequeno, e a BW10 é a resposta própria à pergunta que os dois capítulos fazem. O bloco de relacionados mostra seis artigos da mesma loja, mas não garante a BW10 nem substitui o link no capítulo.
- **Confiança:** alta
- **Dependências e como obter:** Sessão de artigos (mudança em artigo no ar).
- **Pendências e notas:** A BW6 também fala de medidas peça a peça; um link para a BW10 cabe na mesma edição da op-baw-0012.
- **Destino, se aprovada:** Sessão de artigos
- **Revisado por:** sessão de revisão independente, 25/11/2026
- **Decisão do Bruno:** aprovada no pacote de links e capítulos: link para a BW10 `tabela-medidas-baw` nos capítulos de tamanho da BW1 `cupom-baw-como-usar` e da BW4 `cupom-baw-primeira-compra`, e na BW6 `black-friday-baw`, em 2026-11-25
- **Execução:** na main, sem deploy: link para a BW10 na BW1, na BW4 e na BW6 (PR #1482, 102bf05; Job 1 no #1481); conferido na main em 25/11 às 21:58 (GO do Bruno na sessão de coordenação, 25/11 ("Sim, aprovar pacote": 0021, 0022, 0023 e 0006); PR #1481, #1482 e #1483)

### op-baw-0022 · links-internos · prioridade media

- **Pergunta ou decisão atendida:** Chegar ao guia de tênis a partir do "é boa" e da Black Friday
- **Evidência:** sinais: 3 (ids na matriz); nossos dados: @nao-investigado; comercial: @indisponivel
- **Evidências principais:** `cob-baw-0054`, `cob-baw-0029`, `cob-baw-0071`
- **Conteúdo existente:** cobertura: 3 (ids na matriz)
- **O que falta hoje e o que a ação acrescenta:** O capítulo do tênis da BW5 e o do Thunder na BW6 respondem pela página da loja e não linkam a BW7, publicada em 21/11.
- **Prioridade, e por quê:** media. "O tênis BAW é bom?" está em "As pessoas também perguntam" de "baw clothing é boa" e "baw clothing é confiável", as buscas da BW5 e da BW3. Esforço pequeno.
- **Confiança:** alta
- **Dependências e como obter:** Sessão de artigos. Na BW6, entra na mesma edição da op-baw-0012.
- **Pendências e notas:** O capítulo da BW5 pode encolher para a resposta curta e o link, como foi feito com o regular ou oversized (Fila, seção 4).
- **Destino, se aprovada:** Sessão de artigos
- **Revisado por:** sessão de revisão independente, 25/11/2026
- **Decisão do Bruno:** aprovada no pacote de links e capítulos: link para a BW7 `tenis-baw-e-bom` no capítulo do tênis da BW5 `baw-clothing-e-boa` e no do Thunder da BW6 `black-friday-baw` (a edição da BW6 de 25/11, #1469, não trouxe o link), em 2026-11-25
- **Execução:** na main, sem deploy: link para a BW7 no capítulo e no FAQ do tênis da BW5 e no Thunder da BW6 (PR #1482); conferido na main em 25/11 às 21:58 (GO do Bruno na sessão de coordenação, 25/11 ("Sim, aprovar pacote": 0021, 0022, 0023 e 0006); PR #1481, #1482 e #1483)

### op-baw-0008 · melhorar-capitulo · prioridade baixa

- **Pergunta ou decisão atendida:** Saber onde comprar peça original da BAW e se o código vale fora do site
- **Evidência:** sinais: 46 (ids na matriz); nossos dados: @nao-investigado; comercial: @indisponivel
- **Evidências principais:** `sin-baw-1075`, `sin-baw-0907`, `sin-baw-0052`
- **Conteúdo existente:** cobertura: 2 (ids na matriz)
- **O que falta hoje e o que a ação acrescenta:** A BW3 diz que a BAW vende no site, no aplicativo e em marketplace, e a BW6 e a BW1 dizem que no marketplace vale o preço do anúncio (cob-baw-0043 e 0032, parciais): a loja oficial no Mercado Livre nunca foi aberta (pediu verificação de conta em 16/11 e em 18/11). No Google, "baw mercado livre" mostra listas de busca e anúncios de vendedores não identificados, entre eles um tênis que a loja não vende no site hoje (Break, R$ 599,99) e uma camisa de brechó. "baw original" completa com moletom, camiseta, boné, blusa e casaco. O que acrescentar: uma frase na BW3 sobre onde a peça é da própria marca e onde o código vale, e, com a loja oficial lida, o que muda nela.
- **Prioridade, e por quê:** baixa. Sinal de formulação, não de volume: "baw original" e "baw mercado livre" completam em várias formas, e "baw clothing loja oficial" volta vazia. Sem a leitura da loja oficial, a frase nova fica genérica.
- **Confiança:** baixa
- **Dependências e como obter:** Leitura da loja oficial no Mercado Livre pelo Chrome do Bruno, logado (lacuna P6 do fechamento de insumos). Sem ela, o texto continua genérico como está.
- **Pendências e notas:** Divergência para a coordenação: o dossiê (01_Parceiros/BAW-Clothing.md, seção 2) diz "Loja Oficial BAW no Mercado Livre: existe", pelo handoff de 16/11, e nenhuma sessão abriu a página. Nada sobre original ou falsificação vai ao texto sem fonte.
- **Destino, se aprovada:** Sessão de artigos, com esta ficha como escopo
- **Revisado por:** sessão de revisão independente, 25/11/2026
- **Decisão do Bruno:** em espera

### op-baw-0015 · melhorar-capitulo · prioridade baixa

- **Pergunta ou decisão atendida:** Achar o tênis BAW pelo nome do modelo (Casual, Break, Seven, Second, Four, Three) e saber se a loja ainda vende
- **Evidência:** sinais: 23 (ids na matriz); nossos dados: @nao-investigado; comercial: @indisponivel
- **Evidências principais:** `sin-baw-0219`, `sin-baw-0907`, `cob-baw-0071`
- **Conteúdo existente:** cobertura: 1 (ids na matriz)
- **O que falta hoje e o que a ação acrescenta:** O autocompletar de "tenis baw" traz modelos (casual, second, seven, four, three) e a primeira página de "tênis baw é bom" mostra páginas do Casual First, do Casual Five e do Break Mad; a lista de tênis do site em 18/11 tinha seis modelos, nenhum desses, e a BW7 trata dos seis. O que acrescentar: uma frase ou item de FAQ na BW7 dizendo que esses nomes não estavam na lista de tênis da loja na data da leitura, sem afirmar que saíram de linha (a loja não diz), e que preço de marketplace desses modelos é de vendedor, não da loja.
- **Prioridade, e por quê:** baixa. Termos pequenos ("tenis baw" média 4 no Trends, intermitente), mas são as formulações que aparecem para o tênis. Mudança curta num artigo que já existe.
- **Confiança:** media
- **Dependências e como obter:** Releitura da lista de tênis do site no dia da edição (um modelo pode voltar). Sessão de artigos.
- **Pendências e notas:** Os vídeos de tênis da BAW são de uma loja revendedora (3 anos) e do canal oficial (2022). Collabs de tênis vistas só em título de vídeo (Reebok, Olympikus, Droper) ficam na op-baw-0030.
- **Destino, se aprovada:** Sessão de artigos, com esta ficha como escopo
- **Revisado por:** sessão de revisão independente, 25/11/2026
- **Decisão do Bruno:** em espera

### op-baw-0020 · melhorar-capitulo · prioridade baixa

- **Pergunta ou decisão atendida:** Saber como vestem as camisetas Boxy e New Over da BAW em relação à regular e à oversized
- **Evidência:** sinais: 26 (ids na matriz); nossos dados: @nao-investigado; comercial: @indisponivel
- **Evidências principais:** `sin-baw-0210`, `sin-baw-1036`, `cob-baw-0088`
- **Conteúdo existente:** cobertura: 2 (ids na matriz)
- **O que falta hoje e o que a ação acrescenta:** A BW10 e a BW5 comparam só regular e oversized; Boxy, New Over, Slim e Baby Tee seguem sem tabela (cob-baw-0052 e 0088). A loja tem listas próprias de Boxy (9 produtos) e New Over (5), e as fichas delas não foram lidas (composição @nao-investigado no catálogo). O que acrescentar: as medidas das fichas da Boxy e da New Over ao lado das da regular e da oversized, na BW10.
- **Prioridade, e por quê:** baixa. "baw boxy" e "baw new over" completam (com "moletom boxy baw"). No Trends, "camiseta boxy" (genérica, sem a marca) teve média 12, a mesma de "baw clothing" na comparação C: o formato tem procura própria, mas o termo da BAW é pequeno. Depende de leitura nova de fichas.
- **Confiança:** media
- **Dependências e como obter:** Ler as fichas da Boxy e da New Over (coleta nova de fichas, etapa 2, ou a redação no dia), com o mesmo cuidado da BW10: copiar a medida como a loja publica.
- **Pendências e notas:** Slim e Baby Tee têm 1 e 12 produtos; ficam para quando houver busca (nenhuma semente pedida).
- **Destino, se aprovada:** Sessão de artigos, com esta ficha como escopo
- **Revisado por:** sessão de revisão independente, 25/11/2026
- **Decisão do Bruno:** em espera

### op-baw-0023 · links-internos · prioridade baixa

- **Pergunta ou decisão atendida:** Chegar às comparações com outras marcas a partir do "é boa" e da tabela de medidas
- **Evidência:** sinais: 5 (ids na matriz); nossos dados: @nao-investigado; comercial: @indisponivel
- **Evidências principais:** `cob-baw-0070`, `cob-baw-0095`
- **Conteúdo existente:** cobertura: 4 (ids na matriz)
- **O que falta hoje e o que a ação acrescenta:** Nenhum artigo linka a BW11 no texto, e a BW8 só é linkada pela BW7. O capítulo "Para quem a BAW faz sentido" da BW5 e a BW10 (que a BW11 linka, mas não o contrário) são os lugares naturais.
- **Prioridade, e por quê:** baixa. As comparações respondem a uma decisão que o "é boa" deixa aberta (BAW ou outra marca), mas não há busca "baw ou <marca>" no autocompletar. Esforço pequeno, ganho incerto.
- **Confiança:** media
- **Dependências e como obter:** Sessão de artigos.
- **Pendências e notas:** Quando a BW12 (Piet) for ao ar, entra no mesmo lugar.
- **Destino, se aprovada:** Sessão de artigos
- **Revisado por:** sessão de revisão independente, 25/11/2026
- **Decisão do Bruno:** aprovada no pacote de links e capítulos: link para a BW11 `baw-ou-carnan` (e a BW8 `baw-ou-pace`) no capítulo "Para quem a BAW faz sentido" da BW5 e na BW10, em 2026-11-25
- **Execução:** na main, sem deploy: links para a BW11 e a BW8 no "Para quem" da BW5 e na BW10 (PR #1482); conferido na main em 25/11 às 21:58 (GO do Bruno na sessão de coordenação, 25/11 ("Sim, aprovar pacote": 0021, 0022, 0023 e 0006); PR #1481, #1482 e #1483)

### op-baw-0025 · criar-artigo · prioridade baixa

- **Pergunta ou decisão atendida:** Decidir se vale comprar um moletom da BAW: modelos, tecido, medida e preço
- **Evidência:** sinais: 70 (ids na matriz); nossos dados: @nao-investigado; comercial: @indisponivel
- **Evidências principais:** `sin-baw-0012`, `sin-baw-1015`, `sin-baw-0667`
- **Conteúdo existente:** cobertura: 4 (ids na matriz)
- **O que falta hoje e o que a ação acrescenta:** Os resultados de "moletom baw" (18/11) são listas de produtos da loja, da Netshoes e do Mercado Livre, e a visão de IA lista os tipos (com capuz, gola careca, cropped, zíper) sem composição nem medida. O nosso texto acrescenta, por tipo de moletom, a composição e a medida no M que cada ficha publica (11 das 12 fichas de moletom lidas têm medida) e o preço de tabela, sem peça em mãos e sem impressão de uso, como a BW7 fez com o tênis. Hoje o moletom está espalhado: dois modelos na BW6, as medidas na BW10, o tecido na BW5 e um modelo na BW11.
- **Prioridade, e por quê:** baixa. "baw clothing moletom" é a 2ª sugestão de "baw clothing", e "moletom baw é bom" completa ("vale a pena" volta vazia). No Trends, "moletom baw" tem a mesma média de "camiseta baw" (14) na comparação B, com valor em 27 de 53 semanas: quase todas entre 26/04 e 13/09/2026, com o pico em 31/05 (70), e zero na maior parte de dezembro a abril (bruto: 20261118-2054-google-trends/trends-b-marca-e-categorias.csv, coluna "moletom baw"); na semana de 15/11 estava em 13. É procura de outono e inverno: baixa agora, com janela antes do fim de abril de 2027.
- **Confiança:** media
- **Dependências e como obter:** GO do Bruno. Fichas de moletom relidas no mês da redação (a etapa 2 leu 12 de 53). Card de estilo (artigo de roupa). Redação até abril de 2027 para pegar a temporada.
- **Pendências e notas:** Coincide com o estoque sem GO da Fila (linha da BAW: "moletom e camiseta oversized (melhor com peça em mãos)"). O que a evidência acrescenta: a sazonalidade medida no Trends e a cobertura de fichas por categoria, que mostram que dá para fazer pelas fichas, como na BW7. "Qual é a melhor marca de moletom?" pede várias marcas: op-baw-0032.
- **Destino, se aprovada:** Linha na Fila de Pautas; o Job 1 faz o briefing
- **Revisado por:** sessão de revisão independente, 25/11/2026
- **Decisão do Bruno:** em espera

### op-baw-0035 · video · prioridade baixa

- **Pergunta ou decisão atendida:** Ver em vídeo como o código entra no carrinho
- **Evidência:** sinais: 7 (ids na matriz); nossos dados: @nao-investigado; comercial: 4 (ids na matriz)
- **Evidências principais:** `sin-baw-0958`, `sin-baw-0952`
- **Conteúdo existente:** cobertura: 2 (ids na matriz)
- **O que falta hoje e o que a ação acrescenta:** Os vídeos de cupom da BAW no YouTube (18/11) são Shorts de terceiros com outros códigos e um "Como usar cupom de desconto Baw Clothing" (380 visualizações). Nenhum mostra o nosso código. O vídeo acrescenta o carrinho com o BAWEMCASACOMCECILIA aplicado, que já temos em print, sem peça em mãos nem impressão de uso.
- **Prioridade, e por quê:** baixa. Os números de visualização são pequenos e dependem do canal. Vídeo é decisão do Bruno e da Cecília (PROGRAMA.md, seção 5).
- **Confiança:** baixa
- **Dependências e como obter:** Bruno e Cecília. Gravação da tela de um carrinho sem compra.
- **Pendências e notas:** Os títulos com código de terceiro foram omitidos no bruto pela etapa 3.
- **Destino, se aprovada:** Bruno e Cecília
- **Revisado por:** sessão de revisão independente, 25/11/2026
- **Decisão do Bruno:** em espera

## Ideias registradas, não recomendadas agora

Não são pauta de prioridade baixa: só voltam a ser avaliadas se a dependência se resolver e o Bruno decidir.

| Oportunidade | Ideia | O que falta para reavaliar |
|---|---|---|
| `op-baw-0007` | Saber o que significa o nome BAW | Fonte da própria marca (página "sobre" do site, entrevista dos fundadores ou resposta da parceira). Com ela, vira um item de FAQ na BW3 ou na BW5. |
| `op-baw-0029` | Ver e comprar as peças de uma collab da BAW (Hello Kitty primeiro) | Teste do código numa peça da collab (carrinho, fora do programa) e GO do Bruno. Com os dois, o candidato é a Hello Kitty, com preço e ficha lidos no dia e sem número de estoque. |
| `op-baw-0031` | Comparar a BAW com outra marca de streetwear (próximas da série: Piet, Youcom, Dust) | A BW11 medida no Search Console por 30 dias (Fila, BW12). Antes de cada briefing, o Job 1 lê os resultados da comparação. |
| `op-baw-0034` | Saber se o código soma com o cashback do BAWPOINTS | Ler a página /cashback e um carrinho com o código que mostre os pontos (fora do programa, sessão de cupons com o Bruno). |

## Não criar

Temas com algum sinal em que a matriz recomenda não abrir página agora.

| Oportunidade | Tema | Por que não criar | O que faria rever |
|---|---|---|---|
| `op-baw-0026` | Decidir sobre a camiseta oversized da BAW, ou achar uma oversized boa sem marca definida | Há procura, mas o que o leitor da BAW decide já está coberto, e a procura genérica pede comparação de várias marcas (dossiê, alertas: uma marca por artigo). | @nao-se-aplica |
| `op-baw-0027` | Escolher uma calça da BAW | Sem pergunta de decisão e com ficha incompleta, um artigo próprio repetiria a lista da loja. | @nao-se-aplica |
| `op-baw-0028` | Escolher roupa infantil da BAW | Procura formulada, mas a fonte que daria o conteúdo (a ficha) está vazia. | @nao-se-aplica |
| `op-baw-0030` | Achar uma collab que a BAW não vende hoje no site (Habbo, Looney Tunes, Ipiranga, Reebok, Caterpillar, Olympikus) | Busca de produto fora da oferta da parceira. | @nao-se-aplica |
| `op-baw-0032` | Escolher entre marcas de streetwear brasileiras, ou a melhor marca de moletom | "marca streetwear" tem média 1 no Trends da comparação C; o autocompletar de "marcas de streetwear" é amplo (brasileiras, baratas, de luxo, gringas). O vídeo mais visto da coleta é uma lista de cinco marcas (98 mil visualizações), formato que não é o nosso. | @nao-se-aplica |
| `op-baw-0033` | Achar um tênis da BAW parecido com All Star | Sem procura medida e com o formato "parecido com" já coberto pela Vans. | @nao-se-aplica |

## Manter como está

Conteúdo que já responde ao que existe de busca. As duas linhas executadas fora do programa (o tênis e a tabela de
medidas) estão aqui.

| Oportunidade | O que é | Por que manter | O que faria rever | Decisão |
|---|---|---|---|---|
| `op-baw-0001` | Saber qual é o cupom da BAW, quanto ele tira, onde digitar e se vale no app, na primeira compra e para quem já é cliente | A página tem nove dias. No recorte de 18/11 ela não aparece em nenhum dos dois filtros do Search Console (consulta e página com "baw"); "cupom baw" teve 1 impressão em 16/11, na posição 5, e sem o cruzamento consulta × página não se sabe em qual página. No GA4 e no Clarity, 1 visitante em 16 a 18/11, que não é demanda. A visão de IA do Google para "cupom baw" lista códigos de terceiros e não traz o nosso; o ChatGPT mostra o nosso primeiro e cita a página; o Perplexity indica um código de terceiro. Nada pede mudança de estrutura. | Export do Search Console depois de 30/11/2026 (rotina do site), com o cruzamento consulta × página das consultas com "baw". | — |
| `op-baw-0002` | Aplicar o código sem errar o campo e entender por que ele não entrou | No filtro de páginas com "baw" (16/11) teve 2 impressões, posição 6,5; as consultas do outro filtro foram "cupom baw", "cupons baw" e "marca baw é boa", e sem o cruzamento não se sabe qual levou a qual página. Junto com a /cupons/baw e o guia de primeira compra, responde à mesma busca de cupom: três impressões não provam canibalização, e a conversa sobre consolidar só abre com o cruzamento consulta × página. | Export do Search Console depois de 30/11/2026 (rotina do site), com o cruzamento consulta × página das consultas com "baw". O teste do código na semana de 27/11, que a ficha do artigo já prevê, entra na op-baw-0012. | — |
| `op-baw-0003` | Saber qual código usar no primeiro pedido e se ele vale nos seguintes | A busca completa em três formas no autocompletar e aparece em "As pessoas também perguntam" de "cupom baw". O ChatGPT, na mesma pergunta, recomendou trocar o nosso código pelo cupom de primeira compra da loja "com 15%" (nos-baw-0027), o que os testes de 17/11 não confirmam; na pergunta sobre o nosso código, citou este artigo como fonte (nos-baw-0029). O artigo já diz o que o teste mostrou: não há o que acrescentar sem um teste novo. | Reteste do mesmo carrinho antes de 17/12/2026, quando vence a revisão do fato no dossiê (seção 1). Export do Search Console depois de 30/11/2026 (rotina do site), com o cruzamento consulta × página das consultas com "baw". | — |
| `op-baw-0004` | Ver a nota da BAW no Reclame Aqui e do que os clientes reclamam | "baw clothing reclame aqui" está na raiz do autocompletar da marca e volta como busca relacionada de "baw clothing é confiável", "baw clothing é boa" e "cupom baw". O artigo está na 7ª posição dos orgânicos de "baw clothing é confiável" (18/11). O Perplexity disse "Regular", o ChatGPT acertou a nota: o texto já tem a leitura certa e datada. | Export do Search Console depois de 30/11/2026 (rotina do site), com o cruzamento consulta × página das consultas com "baw". | — |
| `op-baw-0005` | Decidir se dá para confiar na loja: dono, CNPJ, entrega, troca, pagamento e contato | É o grupo de busca mais formulado da marca: "é confiável", "dono", "é da arezzo", "saiu da arezzo", "é da reserva" e "cnpj" completam. O artigo está na 8ª posição de "baw clothing é confiável" (18/11) e foi uma das duas fontes nossas citadas pelo Perplexity. A visão de IA do Google, que em 16/11 dava a Arezzo como dona (semente, 9.7), em 18/11 já respondia certo; o Perplexity ainda dá a Arezzo. A correção que a P5 pedia já está no artigo. | Export do Search Console depois de 30/11/2026 (rotina do site), com o cruzamento consulta × página das consultas com "baw". | — |
| `op-baw-0010` | Decidir se a BAW é boa: o que vende, tecido, tamanho, preço, troca e para quem faz sentido | Foi a página com melhor posição no primeiro dia (posição 4 para o filtro de página com "baw", e "marca baw é boa" na posição 7). "A marca BAW é boa?" aparece em "As pessoas também perguntam" de quatro buscas. "baw clothing vale a pena" e "qualidade" voltam vazias, como em 16/11. A visão de IA já responde a pergunta geral, e o artigo traz o que ela não traz: fichas, troca por crédito e quadro "Leve se / Passe se". | Export do Search Console depois de 30/11/2026 (rotina do site), com o cruzamento consulta × página das consultas com "baw". | — |
| `op-baw-0011` | Decidir se o tênis da BAW é bom: modelos, preço, numeração e o que a ficha diz | Registro da execução. "tenis baw é bom" completa, "O tênis BAW é bom?" está em "As pessoas também perguntam" de duas buscas, e a visão de IA responde com faixa de preço e modelos sem citar ficha. Trends: "tenis baw" média 4 na comparação com a marca (termo pequeno e intermitente). O recorte de dados é de 18/11, antes do artigo: sem dado próprio. | Export do Search Console depois de 30/11/2026 (rotina do site), com o cruzamento consulta × página das consultas com "baw". | concluída: BW7 `tenis-baw-e-bom` no ar desde 21/11 (release c0747380) |
| `op-baw-0016` | Decidir sobre a Sandália Linus + BAW e os slides: material, numeração, limpeza e preço | Única collab do catálogo com conteúdo nosso. "baw linus" completa em três formas; a busca "sandália linus" é sobretudo da marca Linus (fatos de 20/11). Preço na vitrine de 24/11 igual ao de 16/11. O artigo é de 21/11, depois do recorte de dados. | Export do Search Console depois de 30/11/2026 (rotina do site), com o cruzamento consulta × página das consultas com "baw". | — |
| `op-baw-0017` | Comparar a BAW com a Pace: preço, peças e tênis | Artigo de 21/11, pedido pelo Bruno em 20/11 a partir do Trends de "baw clothing" (fatos de 20/11). Nas coletas do programa, "baw ou" só completa com "outlet" e a Pace não está entre as cinco relacionadas em ascensão de 18/11. Sem dado próprio. | Export do Search Console depois de 30/11/2026 (rotina do site), com o cruzamento consulta × página das consultas com "baw". | — |
| `op-baw-0018` | Comparar a BAW com a Carnan: preço de tabela, medidas, o que vendem, troca e envio | Artigo de 23/11, da série pedida pelo Bruno. Sem dado próprio: o recorte é de 18/11. | A BW11 medida no Search Console por 30 dias, que a Fila põe como condição da BW12 (seção 2). | — |
| `op-baw-0019` | Escolher o tamanho certo na BAW pela medida de cada peça | Registro da execução. "baw guia de tamanho", "tabela de medidas baw" (com oversized, moletom, calça e camiseta) e "baw tamanhos" completam; em 18/11, antes da BW10, a visão de IA montava faixas de regular e oversized a partir das fichas da loja. "baw veste grande" e "pequeno" voltam vazias. Sem dado próprio: o recorte é de 18/11. | Export do Search Console depois de 30/11/2026 (rotina do site), com o cruzamento consulta × página das consultas com "baw". | concluída: BW10 `tabela-medidas-baw`, publicada em 23/11; o site respondeu 200 em 25/11 (a data do deploy não foi conferida) |
| `op-baw-0024` | Ver todos os artigos do site sobre a BAW | Página de navegação, sem busca própria. Zero sessão no Clarity em 16 a 18/11. | @nao-se-aplica | — |
