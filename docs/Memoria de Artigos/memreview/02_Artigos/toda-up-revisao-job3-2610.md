# Revisão Job 3: os 4 rascunhos da Toda Up (26/10/2026)

Fontes conferidas: os 4 briefings (seção "Decisões do Bruno"), `toda-up-e-confiavel-fatos-2610.md` e `cupom-toda-up-como-usar-fatos-2610.md` (as "Leituras no Chrome" mandam), `01_Parceiros/Toda Up.md`, `REGRAS-REDACAO.md`, `REGRAS-GLOBAIS.md` (seção 6) e o Job 3.

Conferências mecânicas nos 4 arquivos: nenhum travessão, nenhum `**negrito**`, `/cupons/toda-up` uma vez em cada um, MAUAD uma vez só em T1 e T2 (na "Parceria e cupom"), nunca em título ou H2. Um único `https://` no texto (T1). Nenhuma menção a termos de uso, privacidade, cupom de primeira compra, parcelas, Mercado Livre, perfis de influenciadora, cópias de canal ou concorrente. "Até 20%" só em T4, atribuído à faixa. Nenhuma frase diz que alguém do site comprou ou usou peça.

Contas refeitas e confirmadas (não repito nos achados):
- Carrinho A: 170,91 − 17,09 = 153,82. Carrinho B: 360,81 − 43,28 = 317,53; 10% = 31,75; total 285,78 (números observados, como manda a decisão 4). Carrinho C: 3 × 170,91 = 512,73; 20% = 102,55; sobra 410,18; 10% = 41,02; total 369,16.
- T4: 43,28 + 31,75 = 75,03 (20,8% de 360,81, "perto de 21%" ok); C: 102,55 + 41,02 = 143,57 = 28,0% ok; 3 × 44,91 = 134,73; 170,91 + 134,73 = 305,64 ok.
- T3: 10% sobre 189,90 → 170,91; 149,90 → 134,91; 119,90 → 107,91 ok.
- T2: 1.398 − 357 = 1.041; 27/10/2023 a 31/03/2026 + 1 a 26/10/2026 ≈ 30 meses; 1.041/30 ≈ 35; 357/6 ≈ 60 ok.
- Todos os preços das tabelas de T3 e T4 batem com a "Leitura no Chrome" de `cupom-toda-up-como-usar-fatos-2610.md`. 27/11/2026 é sexta-feira. Resposta rápida: T1 60 palavras, T2 59, T3 53, T4 61.

Gravidade: **bloqueia** (não publica assim), **corrigir** (precisa mudar antes do JSON), **sugestão** (melhora, a critério).

---

## T1 `T1-confiavel.md`

1. "O endereço oficial é [todaup.com](https://todaup.com/)." → link externo de loja no texto (regra: nunca; o botão vem do JSON). → `O endereço oficial é todaup.com.` → **bloqueia**

2. "## E a reputação no Reclame Aqui?" → pergunta retórica fora da FAQ (o "Dá para confiar?" é o do REGRAS-GLOBAIS; este não). → `## A reputação no Reclame Aqui` → **corrigir**

3. "O cupom dá 10% OFF em todo o site e vale em produto já com desconto. No carrinho, em 26/10/2026, o Sutiã Comfort Up, de R$ 199,90 por R$ 170,91, ficou em R$ 153,82 com o cupom. Na campanha, a promoção progressiva da loja entra primeiro, e os 10% saem do que sobra. [...] Para aplicar, cole o código no campo de cupom do carrinho ou do checkout, antes de pagar, e confira o desconto no resumo do pedido." → canibalização: os números do teste, a ordem da progressiva e o passo a passo são do T3 (briefing T1, seção 2: "no fim, Parceria e cupom, com /cupons/toda-up"). "Campo de cupom do carrinho ou do checkout" não está em fonte nenhuma (o nome e a posição do campo ficaram pendentes e o Chrome não fechou). → Trocar os dois parágrafos por: `O cupom dá 10% OFF em todo o site e, no carrinho, em 26/10/2026, valeu em produto já com desconto. O passo a passo e a conta do teste estão em [como usar o cupom da Toda Up](/reviews/cupom-toda-up-como-usar).` → **corrigir**

4. "Qualquer outro endereço parecido, com o nome da marca e uma terminação diferente, não é a loja." → afirmação absoluta sem fonte (as fontes só registram todaup.com e fitaup.com). → `Endereço parecido, com outra terminação, não é nenhum dos dois domínios da marca: confira o CNPJ no rodapé antes de comprar.` → **corrigir**

5. "No cartão, a loja pede o estorno à administradora, que faz a devolução pela fatura." → "pela fatura" não está na política (fatos, seção 3: "cartão pelo estorno da administradora"). → `No cartão, a loja pede o estorno à administradora.` → **corrigir**

6. "Na consulta pública da Receita, feita em 26/10/2026" (e "Compare o número com a consulta pública do CNPJ na Receita", "lido na Receita" na legenda, "na Receita" na FAQ) → a leitura foi na BrasilAPI (fatos, "Leitura no Chrome"), que espelha a base da Receita; chamar de "Receita" não é falso, mas é mais do que a fonte diz. → `Na consulta pública do CNPJ, feita em 26/10/2026` (e na FAQ: `Confira o número na consulta pública do CNPJ.`) → **sugestão**

7. "tem dois prazos iguais e um terceiro para defeito, contados do recebimento do pedido" → a tabela tem 4 linhas (a quarta não é prazo) e a política só diz "após o recebimento" para os 30 dias; para os 90 dias ela não diz de quando conta (fatos, seção 3). → `tem dois prazos iguais, contados do recebimento, um terceiro para defeito e uma regra para produto errado:` → **sugestão**

8. "Se a peça é boa para você, é outra pergunta, e fica para os artigos de produto." → promete artigos que não existem (fatos, seção 11: só ideias, sem briefing). → `Se a peça é boa para você, é outra pergunta, que este texto não responde.` → **sugestão**

9. "O endereço fitaup.com ainda existe e aparece linkado na home da Toda Up." → fitaup.com não foi lido (fatos, tabela: "não lida"); o que se sabe é o registro (RDAP, vence em 21/05/2027) e o link na home. → `O domínio fitaup.com segue registrado e aparece linkado na home da Toda Up.` (mesma troca em "O domínio antigo, fitaup.com, é da mesma marca e aparece linkado na home", que está ok) → **sugestão**

10. "Para conferir, compare o CNPJ do rodapé com o que aparece na nota fiscal da sua compra." (cap. 1) e "Compare o número com a consulta pública do CNPJ" (cap. site oficial) + FAQ → a mesma instrução de conferir o CNPJ três vezes no corpo. → Tirar a frase do cap. 1 (a nota fiscal não está em fonte nenhuma) e deixar a conferência só no capítulo do site oficial. → **sugestão**

Confirmado (sem achado): bandeiras "American Express, Elo, Hipercard, Mastercard e Visa" batem com o dossiê, seção 2 (o literal do rodapé nos fatos, seção 6, é "Hyper, Hypercard", rótulo de ícone; "Hipercard" é o nome certo). CNAE, nome fantasia, 18/12/2020, Biguaçu, datas de domínio, política de troca (01/10/2026, 30 dias, 90 dias, portal, condições, frete da troca, 7 dias do código de postagem, loja parceira), frete (Sedex/Loggi/Jadlog, 1 + 2 dias úteis, carteiro, endereço, "fará de tudo"), FAQ ("cresceu e virou", "marca e visual", pedido no site antigo, cadastro), Sobre ("segredo dos decotes impossíveis"), RA (CNPJ na página, Empresa Verificada, RA1000, 8,5 até 30/09/2026): todos nas fontes citadas.

---

## T2 `T2-reclame-aqui.md`

1. "na página `empresa/toda-up` do Reclame Aqui" (Qual perfil olhar) e "o perfil é o `empresa/toda-up`" (Dá para confiar) → crase de código não é markdown permitido (só link e negrito); vai sair literal no artigo. → `na página empresa/toda-up do Reclame Aqui` e `o perfil é o empresa/toda-up` (como já está na FAQ) → **corrigir**

2. "O site da Toda Up não mostra nota nem reclamações." → a home mostra contagens de avaliações de produto (fatos, seção 2: 1.906, 467, 1.042, 1.316 "avaliações", bloco `jdgm`); o que não há é citação ao Reclame Aqui nem selo (fatos, seção 9 e FAQ). → `O site da Toda Up não cita o Reclame Aqui, nem nota de reputação nem selo.` → **corrigir**

3. "Não existe um perfil separado da Fita UP: a busca por "toda up" no Reclame Aqui, em 26/10/2026, devolveu só esse perfil, e ele já leva o CNPJ da Fita UP LTDA." → a fonte diz só que o perfil da Fita UP "não apareceu na busca 'toda up'" (fatos, Leitura no Chrome; decisão 4); "devolveu só esse perfil" não está lá. → `Na busca feita no Reclame Aqui em 26/10/2026, não apareceu perfil separado da Fita UP, e o perfil da Toda Up já leva o CNPJ da FITA UP LTDA.` → **corrigir**

4. "Esse selo diz que a empresa passou pela verificação do Reclame Aqui, que confere se ela existe e é a dona do perfil. Ele não mede a reputação." → explicação do selo que não está em fonte nenhuma (as fontes só registram que o selo existe). → `O perfil tem o selo Empresa Verificada, que identifica a empresa dona do perfil e não é nota de reputação.` → **corrigir**

5. Repetição dos números: a tabela traz os 10 indicadores; "Como a Toda Up responde às reclamações" repete 9 deles em prosa; "Dá para confiar na Toda Up?" repete todos em 6 bullets; a FAQ repete de novo. → Regra: um fato uma vez no corpo; o capítulo final pode trazer os números (REGRAS-GLOBAIS, seção 6), então é "Como a Toda Up responde" que deve virar só análise: `O tempo de resposta é o indicador que mais muda entre as abas: 21 horas nos 6 meses contra 6 dias e 3 horas na geral. Responder não é resolver: a aba recente também resolve mais (93,1% contra 92,1%) e tem mais gente que voltaria (76,1% contra 74,9%). Os percentuais são os que o Reclame Aqui exibe, sem recálculo.` E reduzir os bullets do capítulo final a três: reputação, respondidas/resolvidas, fora da leitura. → **corrigir**

6. "Segundo o FAQ da loja, a Fita UP virou Toda Up, com a mesma equipe, e a mudança foi só de marca e visual." (Qual perfil olhar) + "A página de perguntas frequentes da loja fala da troca de nome e dos pedidos antigos, não de reputação." (intro) + o capítulo inteiro "O que a loja diz sobre si" → o mesmo fato do FAQ três vezes no corpo; além disso, a história Fita UP → Toda Up é do T1 (decisão 4 do T1). → Tirar a frase de "Qual perfil olhar" (fica só: "O perfil é um só, no CNPJ da FITA UP LTDA; a troca de nome está em [Toda Up é confiável?](/reviews/toda-up-e-confiavel)") e cortar "O que a loja diz sobre si" para um parágrafo: `Nada no FAQ nem na home da loja, lidos em 26/10/2026, cita o Reclame Aqui, nota ou selo; o FAQ fala da troca de nome e dos pedidos antigos. Os números deste artigo vêm só do perfil público.` → **corrigir**

7. "O cupom dá 10% OFF em todo o site da Toda Up, inclusive nos produtos que já estão em promoção. No carrinho, em 26/10/2026, ele entrou sobre o preço promocional de um sutiã e somou com o desconto automático por valor que a loja tinha no ar. O limite de cupons por pedido, confira no carrinho." → canibalização com T3 (o teste e o limite são dele); a "Parceria e cupom" do T2 é só código, 10% e link (briefing, seção 2). → `O cupom dá 10% OFF em todo o site da Toda Up. Os detalhes estão na [página da Toda Up](/cupons/toda-up), e o passo a passo e o teste no carrinho, em [Cupom Toda Up: como usar](/reviews/cupom-toda-up-como-usar).` → **corrigir**

8. "com o CNPJ da Fita UP LTDA" (resposta rápida) e "o CNPJ da Fita UP LTDA" (Qual perfil olhar, 2º parágrafo) → grafia da razão social varia no mesmo texto ("FITA UP LTDA" no resto). → `FITA UP LTDA` nos dois. → **sugestão**

9. "Os números abaixo são de 26/10/2026 e mudam todos os dias." → "todos os dias" é afirmação sem fonte. → `Os números abaixo são de 26/10/2026 e mudam com o tempo.` → **sugestão**

10. "O domínio todaup.com foi registrado em 10/04/2025, segundo o RDAP da Verisign, então a janela geral alcança um tempo anterior ao site atual." → jargão (RDAP, Verisign) e fato do T1. → `O domínio todaup.com é de abril de 2025, pelo registro público do domínio, então a janela geral alcança um tempo anterior ao site atual.` → **sugestão**

11. "Quem quiser esse detalhe encontra no próprio perfil, abaixo dos indicadores." → posição na página do RA não lida. → `Quem quiser esse detalhe encontra no próprio perfil.` → **sugestão**

12. "A nota média do consumidor, 7,38 nos 6 meses, é outra conta: a média que as pessoas deram depois de avaliar a resposta da loja. As duas vêm do mesmo perfil e não se somam." → explicação da metodologia do RA sem fonte nos arquivos; é conhecimento geral correto, mas a última frase é enchimento. → `A nota 8,5 é a nota de reputação, a que define a faixa; a nota média do consumidor (7,38 nos 6 meses) é a média dada por quem avaliou a resposta da loja.` → **sugestão**

13. "O que pesa é o tempo de resposta, que muda entre as abas" (resposta rápida) → o tempo de resposta não muda a decisão de compra (os dois períodos resolvem mais de 92%); a frase final deve apontar o que muda a escolha. → `O que muda entre as abas é o volume e o tempo de resposta; veja a tabela e [Toda Up é confiável?](/reviews/toda-up-e-confiavel).` → **sugestão**

Confirmado: todos os números das duas abas, períodos, categoria, Empresa Verificada, "não há perfil da Fita UP" (fatos, Leitura no Chrome; decisões 3 e 4); "aba de 12 meses, histórico e principais problemas não lidos" (decisão 4); contato, despacho e 30 dias (fatos, seções 3 e 4). Resposta rápida com um link, permitido.

---

## T3 `T3-cupom.md`

1. "Pix, boleto e aplicativo não foram testados. O que vale é o que o seu checkout mostrar." (passo 4); "Não testamos Pix, boleto nem aplicativo" (O que não testamos); "- O cupom vale no Pix? Não testamos Pix, boleto nem o aplicativo. [...]" (FAQ) → a lista FORA DO TEXTO diz "Pix, boleto e app (não testados)": ficam fora, nem como "não testamos" (o T1 cumpre: "as outras formas de pagamento aparecem só no checkout"). → Apagar a frase do passo 4; em "O que não testamos": `Não finalizamos nenhuma compra, e não testamos o cupom com mais de uma unidade do mesmo produto nem em kits.`; apagar a pergunta "O cupom vale no Pix?" da FAQ. → **bloqueia**

2. "Montamos dois carrinhos no site, sem identificação e sem finalizar. Não houve compra, e o carrinho ficou vazio depois." → regra do teste: "diga 'no carrinho, em 26/10/2026' e nada além". → `No carrinho, em 26/10/2026, sem finalizar a compra, a tela mostrou estes números:` → **corrigir**

3. "| Carrinho | Subtotal | Progressiva da loja | Cupom MAUAD | Total |" → cabeçalho de tabela sai em negrito no template: MAUAD em destaque. → `| Carrinho | Subtotal | Progressiva da loja | Cupom da Toda Up (10%) | Total |` → **corrigir**

4. Seção "O cupom e a Black Antecipada": a tabela das três faixas com o cabeçalho "Progressiva observada em 26/10/2026" → (a) só a faixa de 12% foi observada (o texto admite na frase seguinte); (b) as faixas, as datas e os preços da campanha são do T4 (briefing T3, gate 4: "A campanha, o calendário e a tabela de preços são de black-friday-toda-up"). → Tirar a tabela e deixar: `Em 26/10/2026, a Toda Up estava com a Black Antecipada no ar, com desconto progressivo por valor do carrinho: 12% acima de R$ 299, com mais duas faixas acima. A progressiva entra primeiro, automática, e o cupom tira 10% do que sobra. As faixas, as datas e os preços da campanha ficam no [guia de Black Friday da Toda Up](/reviews/black-friday-toda-up). A loja libera frete grátis em campanhas, como a Black Antecipada de outubro de 2026.` → **corrigir**

5. Seção "Quanto fica com o cupom": tabela de 7 preços + conta nossa → é a tabela de preços do T4 (18 itens), repetida pela metade. A regra "tabela com o preço da loja; o cupom numa frase abaixo" vale onde houver tabela, mas a dona da tabela é o T4. → Reduzir a seção a: `Os preços do site em 26/10/2026 estão na tabela do [guia de Black Friday da Toda Up](/reviews/black-friday-toda-up). Nos 10% do cupom, é conta nossa: o Comfort Line e o Comfort Slim (R$ 189,90) ficam em R$ 170,91 e a Fita Up (R$ 119,90) em R$ 107,91, cada um comprado sozinho, abaixo de R$ 299. Só o Comfort Up (R$ 153,82) é resultado do teste.` (se o Bruno preferir manter a tabela aqui, cortar a do T4 ao que o T3 não tem; os dois juntos não) → **corrigir**

6. "Limite de cupons por pedido e exceções de produto a loja não publica: confira no carrinho, depois de aplicar o código." (O que é o cupom) + "O limite de cupons por pedido não está publicado: confira no carrinho." (O que não testamos) + FAQ "Dá para usar mais de um cupom?" → o mesmo fato três vezes. → Deixar só no "O que não testamos" e na FAQ; apagar a frase da seção 1. → **corrigir**

7. "## Vale a pena usar o cupom?" + "Se você já ia comprar na Toda Up, o cupom vale: 10% em todo o site, inclusive em produto em promoção, e no teste de 26/10/2026 somou com a progressiva da campanha. Quanto maior o carrinho na Black Antecipada, mais a progressiva faz, e o cupom ainda tira 10% do que sobra." → H2 em pergunta retórica e repetição (é a quarta vez de "10%, inclusive em promoção, somou com a progressiva"). → `## Quando o cupom vale a pena` + `Se você já ia comprar na Toda Up, o cupom vale em qualquer carrinho; acima de R$ 299, a progressiva da campanha faz mais, e o cupom ainda tira 10% do que sobra.` → **corrigir**

8. "cole o código no campo de desconto do checkout e aplique" (passo 3 e FAQ) → nome e posição do campo ficaram pendentes (briefing T3, seção 10, item 2) e a Leitura no Chrome não fechou. É o comportamento comum da Shopify, e o texto já diz "se ela não estiver lá". → `cole o código no campo de cupom ou desconto, no checkout, e aplique` → **sugestão**

9. "Ele abre o site oficial da Toda Up com o cupom já aplicado, e a linha de desconto aparece no carrinho sem precisar digitar." → o dossiê confirma "abre o site com o MAUAD já aplicado" (seção 1, confiança alta); "a linha aparece no carrinho sem digitar" vai um passo além do lido. → `Ele abre o site oficial da Toda Up com o cupom já aplicado; a linha de desconto deve aparecer no resumo do pedido sem digitar nada.` → **sugestão**

10. "e o cupom não muda o frete" (Frete, despacho e troca) → não está em fonte (o teste não chegou ao frete). → apagar o trecho: `O frete é calculado pelo CEP, no checkout, por Sedex, Loggi ou Jadlog.` → **sugestão**

11. "O passo a passo para aplicar e a conta do teste estão abaixo." (última frase da resposta rápida) → a regra pede a condição principal e o que muda a decisão, não um índice. → `A conta muda com o valor do carrinho: acima de R$ 299, a progressiva da campanha entra antes do cupom.` (tirar então "que entra primeiro" da 2ª frase, para caber em 60 palavras) → **sugestão**

Confirmado: todos os números do teste (dossiê, seção 1; decisão 4), nome "Black Antecipada" e ausência de datas (Leitura no Chrome), catálogo e Biguaçu (dossiê, seção 2), preços (Leitura no Chrome), kits esgotados (decisão 5), frete e troca (fatos, Políticas), "o mesmo código existe em outras lojas" sem nomeá-las (decisão 6). Nenhum `https://`.

---

## T4 `T4-black-friday.md`

1. Resposta rápida com 61 palavras (limite 60) → "sem data de início nem de fim publicada" → `sem datas publicadas` (fica em 57) → **corrigir**

2. "O cupom MAUAD, de 10%, somou com a progressiva no carrinho." (resposta rápida) → regra: sempre dito que é o cupom da Toda Up. → `O cupom da Toda Up, MAUAD, de 10%, somou com a progressiva no carrinho.` → **corrigir**

3. Seção "O que o Reclame Aqui mostra": "tinha selo RA1000 e nota 8,5 nos últimos 6 meses (01/04 a 30/09/2026), com 357 reclamações, 100% respondidas e 93,1% resolvidas. No período geral, de 27/10/2023 a 26/10/2026, a nota de resolução ficou em 92,1%." → canibalização com T2 (dono da reputação: uma frase e link) e "nota de resolução" não é o nome do indicador (é "resolvidas"). → `Em 26/10/2026, o perfil "Toda Up" no Reclame Aqui, com o mesmo CNPJ do rodapé do site, tinha selo RA1000 e nota 8,5 nos 6 meses de 01/04 a 30/09/2026. Os números completos, com o que muda entre os períodos, estão em [Toda Up no Reclame Aqui](/reviews/toda-up-reclame-aqui-nota-reputacao).` → **corrigir**

4. "O rodapé traz o CNPJ 40.159.443/0001-44, da FITA UP LTDA, em Biguaçu (SC); a Toda Up é a marca nova da mesma empresa, segundo o FAQ da loja." (Antes de pagar) → fato do T1 sem link; o T4 não linka o T1 em lugar nenhum. → `Compre só pelo site oficial, todaup.com, pelo link da parceria. O rodapé traz o CNPJ da FITA UP LTDA; a empresa, a troca de nome e as políticas estão em [Toda Up é confiável?](/reviews/toda-up-e-confiavel).` → **corrigir**

5. "Guarde o print do carrinho e o número do pedido: é o que o portal de trocas pede." → o portal pede CPF da titular e número do pedido (fatos, seção 3), não print. → `Guarde o print do carrinho e o número do pedido; o portal de trocas pede o número e o CPF da titular.` → **corrigir**

6. "Hoje, o desconto da campanha e o cupom já saem no carrinho" (Comprar agora ou esperar) → regra do briefing (seção 11): "hoje" sempre com a data do teste. → `Em 26/10/2026, o desconto da campanha e o cupom já saíam no carrinho, e a tabela desta data é a régua para comparar.` → **corrigir**

7. "A própria política diz que os 30 dias ampliam os 7 dias do Código de Defesa do Consumidor." → a política diz "amplia o prazo legal de 7 dias" (fatos, seção 3); o CDC é citado por ela só nos 90 dias de defeito. → `A própria política diz que os 30 dias ampliam os 7 dias da lei.` → **sugestão**

8. "vamos reler a faixa do topo e os preços nessas datas e registrar aqui o que mudou" → promessa pública de atualização (está no esqueleto, item 8, como tarefa interna); se ficar, vira compromisso datado. → `este guia será relido na semana de 23/11 e em 27/11, com a data de cada leitura.` → **sugestão**

9. Seção "O cupom soma com a campanha": os dois parágrafos explicam a mesma ordem (campanha primeiro, cupom do que sobra), e a ordem volta nos "Três carrinhos", no "Antes de pagar" e na FAQ. → Fundir em um parágrafo: `O cupom da Toda Up é o MAUAD, de 10% em todo o site. No carrinho, em 26/10/2026, sem finalizar a compra, ele entrou depois da progressiva: de R$ 360,81, os 12% da campanha tiraram R$ 43,28, e os 10% do cupom saíram dos R$ 317,53 restantes. A loja pode mudar a regra de soma durante a campanha; o passo a passo está em [Cupom Toda Up: como usar](/reviews/cupom-toda-up-como-usar).` → **sugestão**

Confirmado: "Black Antecipada", "até 20% OFF" e "frete grátis em todo o site" atribuídos à faixa, sem datas (Leitura no Chrome; decisão 3); faixas 12/15/20 (dossiê, seção 1); carrinho C como conta nossa, dito (decisão 4); 27/11/2026 (home-events, via briefing); os 18 preços e os kits (Leitura no Chrome); sem parcelas (a imagem pede recorte "sem o trecho das parcelas", correto); sem "Pix/boleto".

---

## Canibalização entre os quatro (resumo)

- Empresa, CNPJ, história Fita UP → Toda Up, políticas: dono T1. T2 repete a história três vezes (achado T2-6) e T4 cita o CNPJ sem link (T4-4).
- Reputação: dono T2. T1 cumpre (uma frase com link). T4 traz o perfil inteiro (T4-3).
- Teste de carrinho e passo a passo: dono T3. T1 e T2 trazem os números na "Parceria e cupom" (T1-3, T2-7). T4 pode manter os carrinhos A e B porque a conta de três carrinhos é dele (briefing T4, gate 4).
- Campanha, faixas e tabela de preços: dono T4. T3 repete a tabela de faixas e meia tabela de preços (T3-4, T3-5).

## Veredito por rascunho

- **T1:** corrigir e voltar. Um bloqueio simples (o link https) e quatro correções curtas; a base factual está certa e completa.
- **T2:** corrigir e voltar. Nenhum número errado, mas repete os indicadores quatro vezes e a história do FAQ três; corte de uns 25% do corpo.
- **T3:** bloqueado pelo Pix/boleto/app (três trechos) e pela canibalização com o T4; depois disso, aprovável.
- **T4:** corrigir e voltar. Contas todas certas; os ajustes são a resposta rápida (61 palavras), o bloco do Reclame Aqui e os links para o T1.

Contagem: bloqueia 2 (T1-1, T3-1); corrigir 23 (T1 4, T2 7, T3 6, T4 6); sugestão 18 (T1 5, T2 6, T3 4, T4 3).
