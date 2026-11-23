# Ajustes em artigos no ar: suplementos, grupo 2 (23/11/2026)

Especificação dos quatro ajustes para a seção 4 da Fila. Nada foi editado no worktree. Fontes: `content/reviews/<slug>.json` (lido em 23/11), `01_Parceiros/Probiotica.md`, `01_Parceiros/Mais-Mu.md`, `02_Artigos/probiotica-e-confiavel.md`, `02_Artigos/max-titanium-e-confiavel.md` (fatos da Supley e da Probiótica, 14/10), [[leituras-grupo2-2311]]. Quando um fato novo não está em nenhuma dessas fontes, aparece como `[PENDENTE: navegador]`.

Regra comum aos quatro: sem efeito no corpo; o que a loja diz sai atribuído ("a loja informa"); a dose e a orientação de médico ou nutricionista aparecem uma vez; a data da leitura só numa legenda.

---

## B1 `max-titanium-ou-probiotica` (comparativo, 16/10)

**O que está hoje.** A resposta rápida (seção 0) diz que as duas são "do mesmo grupo", mas não responde "são a mesma coisa?" nem "é da Max Titanium?" na primeira frase. A seção 1, "mesma empresa, linhas diferentes", explica o grupo Supley e o campo "Fabricado em" do verso das embalagens. A FAQ, item 1, responde "são a mesma coisa?" com "São marcas do mesmo grupo, o Supley, e o rótulo das duas aponta a mesma fábrica". A metaDescription (154 caracteres) abre com os dois códigos e termina em "Mesma fábrica, linhas diferentes".

**O que muda.**
1. Resposta rápida: a primeira frase responde a pergunta. Proposta (3 frases, cerca de 55 palavras):
   > Não são a mesma marca: a Probiótica não é linha da Max Titanium, e as duas são do grupo Supley, com linhas, porções e preços próprios. A Max leva o concentrado e o 3W pelo menor custo por 100 g de proteína; a Probiótica tem mais sabores e zero lactose. Os códigos MAX10EMCASACOMCECILIA e PRO10EMCASACOMCECILIA dão até 10% OFF em cada loja.
2. FAQ, item 1: troca "São marcas do mesmo grupo" por "Não. São marcas do grupo Supley" e mantém o resto. Acrescenta um link para `/reviews/probiotica-e-confiavel` ("de quem é a Probiótica, CNPJ e razão social").
3. **Não criar** a FAQ "A Probiótica é da Max Titanium?". Ela já existe, com a mesma pergunta, em `probiotica-e-confiavel` (FAQ, item 3). Duplicar a pergunta é o que a gate 4 proíbe.
4. metaDescription (nova, 135 caracteres; o código termina no caractere 24, e o % está na primeira frase):
   > MAX10EMCASACOMCECILIA e PRO10EMCASACOMCECILIA: até 10% OFF. Não são a mesma marca: são do grupo Supley, com linhas e preços diferentes.
   Motivo: a busca "são a mesma coisa" está em posição 1 a 4 com zero cliques; a resposta na própria descrição é o que a busca pede. **Decisão do Bruno** (Pergunta 1): responder primeiro ou manter o código primeiro (é a regra de snippet de cupom; esta proposta cumpre as duas, mas a ordem muda).
5. seoTitle: **não mudar**. "Max Titanium ou Probiótica: qual whey e creatina escolher" é o título do comparativo; trocá-lo por uma pergunta dividiria a intenção com `probiotica-e-confiavel`.

**Fonte de cada fato novo.**
- "A Probiótica não é linha da Max Titanium; as duas são do grupo Supley": `probiotica-e-confiavel.md`, fato de 14/10 ("A Probiótica é uma das marcas do grupo Supley, ao lado de Max Titanium, Dr. Peanut e Znack That", `supley.com.br`), e a FAQ "A Probiótica é da Max Titanium? Não" do artigo irmão.
- "Mesmo fabricante no rótulo": `max-titanium-e-confiavel.md` e `max-titanium-ou-probiotica.md` (verso das embalagens, 16/10): "Fabricado em: Supley Laboratório de Alimentos e Suplementos Nutricionais Ltda, Matão/SP". Não relido hoje; o `[PENDENTE: navegador]` é só para confirmar o verso no site, se o Bruno quiser a foto de novo.
- Dono, fundador e sócios: **não estão nos fatos**. Não entram; `[PENDENTE: fonte]` se alguém perguntar.

**O que não pode mudar.** Toda a tabela de linhas (seção 2), a creatina (seção 3), o whey concentrado e o isolado (seções 4 e 5), o 3W, os blends, a entrada e o zero lactose; o "Preço depois do cupom" (seção 9); o bloco "Cupom, Pix e frete" (seção 10); o DECISION; os links para os cupons; a foto e a legenda do verso; os relacionados.

**Conflito a checar (fora do B1, mas toca "mesma empresa").** `max-titanium-e-confiavel.json` diz que o CNPJ do rodapé da Max "é o mesmo CNPJ do rodapé da Probiótica". O fato de 14/10 do rodapé da Probiótica é `Supley Lab. de Alimentos e Suplementos Nutricionais Ltda, CNPJ 07.578.713/0004-29` (filial de Jundiaí). O B1 não cita CNPJ e não depende disso, mas a frase precisa ser conferida.

---

## B2 `creatina-probiotica-qual-compensa` (guia de compra, 28/10)

**O que está hoje.** O artigo cobre preço por 100 g e por dose de cinco versões (seção 1, tabela), o pote de 300 g (seção 2), o de 100 g (3), a Creapure de 150 g com o selo "18SP11" e o verso "Fabricado pela Supley em Matão (SP)" (4), a monodose (5), a Pure Creatina Monster de 3 g (6), "Pura no nome, monohidratada no rótulo" (7, com a frase "quem precisa desse dado pede o laudo do lote à loja, pelo SAC do rótulo"), o cupom (8), a escolha (9) e o FAQ (10): "Creatina Probiótica é boa?", "é pura?", "é Creapure?", "qual tamanho custa menos?", "tem sabor?". Não tem nada sobre embalagem, "original ou falsa", laudo de terceiro nem Anvisa. A foto do pote de 300 g é descrita no alt como "Pote azul".

**O que muda.** Acrescentar, no FAQ (seção 10), depois de "Creatina Probiótica é pura?", três perguntas que a autocompletação pede e que têm resposta nos fatos. Uma pergunta sem fato fica de fora até a leitura.

1. "Como saber se a creatina da Probiótica é original?" Resposta (com o que a loja e o site dizem):
   - Compre no site oficial, `probiotica.com.br`, ou nas lojas que o localizador da marca indica ("Encontre a loja mais próxima", no "Quem Somos").
   - O site mostra o selo "Garantia de originalidade". É selo da marca, não certificação de terceiro; o texto diz "o site mostra".
   - Na embalagem: o selo Creapure e o código 18SP11 só nas versões Creapure (150 g e a Pure Creatina Monster); o verso traz "Fabricado pela Supley em Matão (SP)". Pote de 300 g e de 100 g e monodose não trazem o selo.
   - Em marketplace, confira o vendedor antes de pagar (orientação do artigo de confiança; não é fato da loja).
   - Fonte: `probiotica-e-confiavel.md`, fatos de 14/10 (selo na home, localizador, rodapé); o selo Creapure e o código já estão na seção 4 deste artigo.
2. "A embalagem da creatina Probiótica mudou?" (de "mudou a embalagem", "embalagem azul", "embalagem antiga", "nova embalagem", "pote azul"). **Não entra** até o navegador confirmar se a loja fala de mudança de embalagem. `[PENDENTE: navegador: página do pote de 300 g, FAQ e comunicado da loja]`. Sem resposta, a pergunta não vira FAQ. A foto "Pote azul" do alt é só a imagem oficial de hoje, não é prova de mudança.
3. "A creatina da Probiótica tem laudo?" (de "laudo", "passou no laudo", "passou no teste"). Resposta: nenhum laudo de terceiro entra como prova de pureza. O que a loja publica é a tabela do rótulo, 5.000 mg por porção de 5 g; quem quer o dado de pureza do lote pede à loja pelo SAC (`sac@supley.com.br`, rodapé, fato de 14/10). `[PENDENTE: navegador: confirmar que o site e o rótulo não citam laudo nem certificação de terceiro]`.
   - **Anvisa e Abenutri (de "foi aprovada pela Anvisa/Abenutri"):** não entram no texto (regra do onboarding e do anexo: "não citar Anvisa nem laudos"). Ficam como pendência para o Bruno (Pergunta 2).

Pela pergunta "original ou falsa" (do autocompletar): a resposta é de onde comprar e o que conferir na embalagem, nunca "é original" nem "não é falsa".

**Fonte de cada fato novo.** Os de 14/10 em `probiotica-e-confiavel.md` (fatos da seção 6 e a FAQ de "onde comprar original"); o selo 18SP11 e o verso "Fabricado pela Supley em Matão (SP)" já estão na seção 4 do próprio artigo.

**Termos de devolução (não usar como prova de original).** "Embalagem original e lacre intacto" é condição do direito de arrependimento (7 dias, `termos-e-condicoes`, fato de 14/10). Pode entrar na seção de trocas, mas não como prova de autenticidade.

**metaDescription e seoTitle.** **Não mudar.** A intenção do artigo é preço por grama e por dose; "original" não é a dor do título.

**O que não pode mudar.** A tabela de preços (seção 1) e as legendas de data; os parágrafos de cada versão (2 a 6); a frase de Pura no nome (7); o cupom (8); a escolha (9); o FAQ já publicado (os seis itens atuais); o CTA e o DECISION.

---

## B3 `pre-treino-exquenta-mais-mu-e-bom` (guia de escolha, 25/10)

**O que está hoje.** A resposta rápida (seção 0) fala só de preço por dose ("O pote de 500 g sai mais barato…") e não responde "é bom". A tabela da seção 1 traz doses, porção de 20 g, cafeína (150 mg), taurina (500 mg ou 400 mg) e preço. A seção 5 tem ingredientes, alergênicos e o que o rótulo não traz, com o bullet "Palatinose: nenhuma tabela tem linha dela" e a tabela de 64 kcal, 16 g de carboidrato e 16 g de açúcar adicionado por dose de 20 g. O FAQ tem quatro itens: cupom, "O Exquenta é bom?" (responde com o rótulo: 150 mg de cafeína, 400 mg ou 500 mg de taurina e 16 g de açúcar por dose), "Tem Exquenta sem cafeína?" e "Quanta cafeína tem por dose?". **Não tem** modo de uso, tempo antes do treino, tempo de efeito nem "quebra jejum".

**O que muda.**
1. Resposta rápida: a primeira frase passa a responder "é bom", com a mesma frase do FAQ, sem juízo de qualidade: "Pelo rótulo, o Exquenta é um pré-treino com 150 mg de cafeína por dose de 20 g; o que separa os potes é o preço por dose e a versão sem cafeína." Depois, a frase do preço, que já existe.
2. FAQ novo, "Como tomar o Exquenta?": **pendente**. A leitura de hoje ([[leituras-grupo2-2311]]) cita só a ficha ("pré-treino" com "cafeína, palatinose e taurina"); o modo de uso não está lá. `[PENDENTE: navegador: modo de uso do pote de 300 g e 500 g e do sachê, na página ou na embalagem]`. Quando vier, a resposta é "A loja informa: [modo de uso]. A dose da tabela é de 20 g." e a orientação de médico ou nutricionista, uma vez.
3. FAQ novo, "Quanto tempo antes do treino?": **pendente**, pelo mesmo motivo. Só entra com o modo de uso escrito; sem isso, não é pergunta de FAQ.
4. "Quanto tempo para fazer efeito?": **não criar**. É pergunta de efeito, e a regra de suplemento proíbe promessa de efeito e de tempo de efeito. Resposta escrita para isso seria "não se sabe" ou "o rótulo não diz", que a regra do anexo também proíbe (devolver a pergunta). Decisão do Bruno (Pergunta 3): sem FAQ para essa pergunta ou com uma frase de não-resposta.
5. FAQ novo, "Quebra jejum?": resposta só pela tabela. "A tabela da dose de 20 g traz 64 kcal e 16 g de carboidrato, e os 16 g são de açúcar adicionado. Quem faz a conta de calorias e de carboidratos do dia tem os números desta tabela; a conta do plano alimentar é com o nutricionista." Sem palavra de efeito: não escrever que a palatinose "libera energia devagar" ou "não quebra o jejum" (isso é efeito). A palatinose só aparece como ingrediente: a ficha lista "palatinose" e nenhuma tabela tem linha dela (já está na seção 5).
   - Para o sem cafeína de 450 g a conta sai à parte (102 kcal e 6 g de açúcar adicionado por dose de 30 g, pela tabela). Se entrar no FAQ, dizer as duas linhas.

**Fonte de cada fato novo.** Ficha e tabela já publicadas (seção 5 e seção 1 do próprio artigo); "palatinose" na ficha de hoje ([[leituras-grupo2-2311]]); modo de uso e tempo: `[PENDENTE: navegador]`.

**metaDescription e seoTitle.** **Não mudar.** O snippet já traz o código e o preço por dose; a busca "é bom" tende a responder pela resposta rápida, que é a mudança 1.

**O que não pode mudar.** A tabela dos potes e sachês (seção 1), a tabela de taurina (2), o quadro de custo por dose (3), a seção de sem cafeína (4), o FAQ de cupom e de cafeína, a seção "Qual Exquenta eu compraria" (6) e o DECISION.

**Conflito a resolver antes da redação.** A legenda da tabela da seção 1 diz "Preços do site no cartão em 23/11/2026, na Blue Friday", mas [[leituras-grupo2-2311]] não traz nenhum preço de Exquenta. A data só vale se o Bruno confirmar que houve leitura de hoje (Pergunta 4); se não, a legenda vira "lidos em 25/10" e a releitura fica pendente.

---

## B4 `barra-de-proteina-mais-mu-qual-escolher` (guia de escolha, 25/10)

**O que está hoje.** A tabela de unidades (seção 1) traz, por linha, peso, proteína, preço da unidade e R$ por grama de proteína; as bordas de cada linha dizem se o número é de tabela ou de texto. A seção 2 traz a tabela de calorias, proteína e açúcares por sabor (Mukebar Avelã, Crush Bar, Chocowheyfer Max, Chocowheyfer Sem Cobertura, Chocowheyfer 300 g e Veggie Wafer). A seção 3 traz os alérgenos de três produtos. O FAQ tem cinco itens: cupom, "Chocowheyfer tem açúcar?", "Mukebar tem glúten?", "Qual barra tem mais proteína?" e "Tem barra vegana?".

**O que muda.**
1. Tabela nutricional por linha: **já está** (seção 2). Nenhuma linha nova. Mantém a ressalva de que a Mukebar de 720 g só tem tabela no sabor Avelã.
2. FAQ novo, "Chocowheyfer ou Mukebar: qual a diferença?". Resposta: "O Chocowheyfer de 25 g, no sem cobertura e no de 300 g, tem 6 g de proteína; a Mukebar de 60 g, no sabor Avelã, tem 15 g (tabela). Por grama de proteína, a Mukebar sai mais barata (R$ 0,50, contra R$ 0,75 a R$ 0,87 no Chocowheyfer, no cartão de 23/11). São formatos diferentes: um wafer de 25 g e uma barra de 60 g. O Chocowheyfer Max, de 50 g, tem 12 g." A loja também diz isso, na FAQ: "O Chocowheyfer tem 6g de proteína… A Mukebar tem 15g de proteína". Atribuir: "A loja diz, na FAQ, 6 g e 15 g".
   - **Não entram** os trechos "matar a vontade de doce de forma leve" e "segura mais a fome": são efeito de saciedade e de controle de vontade, não rótulo.
3. FAQ "Tem barra vegana?": a resposta atual vem da leitura de 25/10. **Pendente**: `[PENDENTE: navegador: busca "vegana" no site e a página da Mukebar Vegana, citada na descrição mas não à venda em 25/10]`. Até lá, manter a resposta, com a data dela numa legenda, e sem dizer "não existe" como fato de hoje.
4. Mantém a resposta do Veggie Wafer ("vegetal", mas "pode conter leite" e "CONTÉM GLÚTEN") e a frase "A listagem da loja não traz barra vegana".

**Fonte de cada fato novo.** Tabelas da própria seção 2; FAQ da loja (6 g e 15 g) e a frase de 15 g na Mukebar, [[leituras-grupo2-2311]]; "vegana": `[PENDENTE: navegador]`.

**metaDescription e seoTitle.** **Não mudar.**

**O que não pode mudar.** As tabelas das seções 1 e 2; a seção 3 de alérgenos; o FAQ de açúcar, glúten e proteína; "Qual barra eu compraria" (seção 4) e o DECISION.

**Conflito a resolver antes da redação.** A legenda diz "Preço da unidade no cartão, na Blue Friday em 23/11/2026", e [[leituras-grupo2-2311]] não traz nenhuma barra. Mesma pergunta do B3 (Pergunta 4).

---

## Perguntas para o Bruno (decisão sua)

1. **B1, snippet:** a metaDescription responde primeiro ou mantém o código primeiro? A proposta cumpre as duas regras, mas muda a ordem. Antes, confirme no GSC qual URL aparece em posição 1 a 4 para "max titanium e probiotica são a mesma coisa" e "é da max titanium": se for `probiotica-e-confiavel`, o ajuste deste comparativo é menor.
2. **B2, Anvisa e Abenutri:** a busca "foi aprovada pela Anvisa / Abenutri" fica sem resposta no artigo (regra do onboarding), ou o Bruno quer uma linha dizendo que a Anvisa não é citada pela loja nem pelo artigo?
3. **B3, efeito:** "quanto tempo para fazer efeito" fica fora do artigo, sem FAQ? (Recomendação: fora.)
4. **Data de preço do B3 e do B4:** a legenda "23/11" da tabela de Exquenta e de barras foi lida hoje, ou é de 25/10? Se for de 25/10, a legenda muda e a releitura fica para o dia da redação.

## Conflitos com artigo no ar

- **B1 × `probiotica-e-confiavel`:** a pergunta "A Probiótica é da Max Titanium?" está nos dois artigos. A proposta do B1 é responder na resposta rápida e não repetir a FAQ.
- **B1 × `max-titanium-e-confiavel`:** a frase "É o mesmo CNPJ do rodapé da Probiótica" precisa ser conferida com o fato de 14/10 (rodapé da Probiótica, CNPJ 0004-29, filial de Jundiaí).
- **MU1 (creatina nova) × `mais-mu-e-boa` (seção 5), `mais-mu-ou-dux` (seções 4 e 5), `mais-mu-ou-growth` (seções 3 e 5):** a tabela de creatinas e a discussão de Creapure já estão nesses três; a proposta do MU1 encolhe a seção 5 do guia da marca e linka os comparativos.
- **Preço da Mais Mu:** `mais-mu-e-boa` usa R$ 89,99 e R$ 119,90 como preço de lista, que hoje aparecem riscados na loja ([[leituras-grupo2-2311]]).
- **Pote de 200 g da Mais Mu:** a ficha diz "Pote 200g" no título e "210 g e 60 doses" no texto; o rótulo, lido em 20/10 (dossiê), diz 66 porções de 3 g. Os artigos usam 66, com o `[PENDENTE: navegador]` da tabela do rótulo.
- **Dossiê Mais Mu, seção 3:** "rever com o Bruno antes de qualquer pauta de produto da Mais Mu". Esse conflito fica com a Pergunta 1 do MU1.
- **B2, "pote azul":** o alt da foto do pote de 300 g diz "azul". Não é prova de mudança de embalagem; o dado depende do navegador.
