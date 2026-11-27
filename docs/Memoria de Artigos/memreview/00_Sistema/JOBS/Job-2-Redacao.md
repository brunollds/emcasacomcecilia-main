# Job 2: Redação Editorial

**Mídia obrigatória:** seguir [Guia de mídia editorial](../../../../GUIA-MIDIA-EDITORIAL.md): comprimir, preservar originais e paths locais no JSON, gerar o inventário com `--merge --stdout` e inserir no manifesto só as entradas novas, verificar HTTPS antes de `--append` e registrar origem/licença na memória. Upload, entrega CDN e deploy são etapas distintas.

---

## 1. Missão
Transformar o Briefing aprovado em um rascunho completo de artigo, no tom "Vida real em casa", com clareza, empatia e utilidade máxima. O texto é para ler: a ficha segue exata, mas quem escreve fala como quem conhece o produto e explica para o leitor.

---

## 2. Princípios de Redação
1. **Resposta rápida no topo, curta:** um parágrafo de 2 ou 3 frases (40 a 60 palavras; até 65 em guias `"é boa / vale a pena"` com dossiê longo) com a decisão e uma última frase que aponta o que muda a escolha e onde está no texto. Sem bullets, tabela, imagem nem conta passo a passo; preço pode ir, com o símbolo da moeda (R$, US$, €), sem escrever por extenso. Nada pode existir só ali, e comparativos e guias levam o veredito num capítulo próprio antes do FAQ. Regra completa em `REGRAS-GLOBAIS.md`, seção 6.
2. **Estrutura por Seções Claras:** Subtítulos (H2/H3) descritivos e fáceis de escanear. Cada seção responde a uma pergunta (ver "Como escrever um capítulo").
3. **Tabelas e bullets:** a ficha vai no quadro, uma vez; o parágrafo diz o que a tabela não diz. Passo a passo em lista numerada quando o leitor segue a ordem. O número do quadro não volta na prosa nem no FAQ; o veredito pode retomar só o número que decide.
4. **FAQ Estruturada:** 3 a 5 perguntas literais, cada uma terminando em "?", com respostas em 1–2 frases. No rascunho, cada item é "Pergunta? resposta", sem negrito na pergunta. A resposta aponta o capítulo, sem repetir centavos nem datas. Usar os termos do autocompletar do Google que o site do parceiro confirma (`CONTRATOS-DE-CONTEUDO.md`).
5. **Links Contextuais:** Inserir naturalmente até 3 links relativos para a página da loja no idioma do artigo (`/cupons/<marca>` em português, `/<locale>/coupons/<marca>` nas traduções) e links comissionados da loja com `rel="sponsored"`.
6. **Nome do Código:** chamar o código pelo que ele é na loja. O `CECILIA010` da YesStyle é código de recompensa: nunca "cupom" nem "use com outros cupons", em nenhum idioma (a build reprova). O `4CW5Y` da SHEIN é código de indicação da SHEIN, plataforma global: nunca "SHEIN Brasil" (regra de 02/11). Não citar código de terceiros nem cupom promocional da YesStyle, que vence. Regras completas em `CONTRATOS-DE-CONTEUDO.md`.
7. **Imagens no corpo (mínimo obrigatório):** todo artigo leva **pelo menos uma imagem no corpo além da capa (hero)**. Isso é o piso, não a meta: quanto mais imagens, melhor, desde que nenhuma se repita e todas sejam do tema da seção. O rascunho traz um **Plano de imagens**: para cada imagem, a seção onde entra, o que mostra, a origem (foto da marca, embalagem, rótulo, print da loja, montagem ou quadro feito por nós) e uma sugestão de alt e de legenda. Cada produto com capítulo próprio tem a foto dele nesse capítulo; quando o produto tem link de afiliado, a foto leva o `href` desse link (Job 1, seção 1, "Foto de produto com link de afiliado"). Boas candidatas: fotos oficiais dos produtos, rótulo ou tabela nutricional, montagem comparativa, quadro de preços e print da loja recortado sem barras de campanha. A opção de capa que não for escolhida pode entrar no corpo, se couber no tema. Artigo só com a capa não sai do Job 2 (regra do Bruno, 18/10/2026). O plano diz o quê e onde; buscar as fotos, montar a capa no modelo do tipo de artigo e subir ao CDN é o Job 6, depois da revisão.
8. **Anexo por tipo:** antes de escrever, ler o anexo do tipo do artigo em `00_Sistema/JOBS/Anexos/`: é boa / é bom / vale a pena → `Anexo-E-Boa-Vale-a-Pena.md` (junto com o anexo do segmento); moda → `Anexo-Moda.md`; casa e malas → `Anexo-Casa-Malas.md`; beleza → `Anexo-Beleza.md`; suplementos e alimentos → `Anexo-Suplementos-Alimentos.md`; tecnologia → `Anexo-Tecnologia.md`; reputação (Reclame Aqui e Trustpilot) → `Anexo-Reputacao.md`, junto com o anexo do segmento da loja. O anexo detalha o tipo; este Job vale para todos.
9. **Datas, rótulos e ressalvas:** seguir `REGRAS-GLOBAIS.md`, seção 7. Ela vale para o corpo, a legenda, o FAQ e o veredito; não repetir essas regras no rascunho.
10. **O CTA é o nosso canal:** o desconto ou a vantagem de outro canal (loja física, cupom ou app da própria loja, marketplace sem afiliado) aparece uma vez, no comparativo e com as travas da fonte; nunca na resposta rápida, no subtítulo, num título de capítulo, num quadro ou numa imagem. O texto mostra, com fato, onde o site com o código ganha. E cobre o tema inteiro: tudo o que a fonte oficial traz do tema entra, ou fica de fora por um motivo dito no briefing (lição da L17, 21/11/2026; ver o Job 1).

---

## 3. Matriz de Claims
O redator deve preencher a matriz de claims no rodapé da nota para facilitar a auditoria do Job 3.

---

## 4. Fonte canônica e localização

Quando a pauta sai nos 11 idiomas (`modo_i18n: paridade-completa`), o texto PT é a
fonte canônica da família. Marcar no rascunho quais claims são universais e quais
dependem de país, preço, frete, moeda, disponibilidade ou campanha. As 10 versões
são escritas no Job 4, a partir do PT aprovado no Job 3: localização editorial, não
tradução literal, com os fatos de mercado ditos como do mercado de origem (ex.:
preço em reais na loja brasileira da SHEIN). As versões se ligam ao PT por `translationKey`,
não pelo título, slug ou marca.

---

## 5. Como escrever um capítulo
**Voz:** todo artigo segue `Anexos/Anexo-Voz-da-Cecilia.md`, as 18 regras tiradas da fala dela nos vídeos: o ritmo e o vocabulário, nunca a primeira pessoa de experiência sem uso real.

Um capítulo completo responde uma pergunta da busca, tem um dado próprio e termina numa orientação. Na ordem:
- **Situação primeiro:** uma ou duas frases de para quem e para quando serve, antes de qualquer ficha.
- **Julgamento:** o que a peça é, dito em frase nossa, e o que ela faz diferente da vizinha ou do concorrente.
- **Dado próprio:** a conta feita por nós, o detalhe que o quadro não cabe ou a armadilha. Conta nossa leva o rótulo da seção 7 de `REGRAS-GLOBAIS.md`.
- **Orientação:** quando escolher e quando não escolher.

**A primeira frase decide:** cada capítulo traz um critério de decisão novo, e a primeira frase entrega a conclusão desse critério. Ex.: "Para quem cozinha todo dia, o que decide é a boca maior; o resto é igual." Capítulo que reapresenta o assunto, ou que só chega à decisão no fim, não passa no Job 3 (C12).

**Título do capítulo:** pergunta só quando ela está, palavra por palavra, no banco de perguntas reais do parceiro (Job 1). Tabela comparativa e passo a passo levam título direto.

**Conclusão orientada à decisão:** guias de escolha e comparativos fecham com uma conclusão que ajude o leitor a escolher por perfil, uso ou prioridade. Dizer qual alternativa atende à situação e qual fato do artigo sustenta essa escolha. O motivo deve explicar a consequência para a decisão; não basta repetir a finalidade do produto, uma frase de marketing ou a existência de informações na ficha. Nos guias da série `"<Marca/Produto> é boa/bom / vale a pena"` de parceiro ativo (`Anexo-E-Boa-Vale-a-Pena.md`), recomendar a marca ou produto parceiro variando a abertura afirmativa (**`"Sim"`**, **`"Claro"`**, **`"Com certeza"`**, **`"Vale, sim"`**, **`"É boa/bom, sim"`**, **`"Compensa, sim"`**) + **para quem vale + motivo concreto do dossiê/ficha/custo com cupom** na `Resposta rápida`, no veredito e no FAQ é obrigação de curadoria — sem confundir com promessa clínica nem invenção de uso físico. Já em perguntas de fato (`"é pura?"`, `"tem formol?"`, `"funciona?"`, `"é saudável?"`), abrir estritamente pela evidência verificada (Anexo §1.4).

Não há abertura obrigatória nem lista de frases para alternar fora das perguntas `"é boa / é bom / vale a pena"` sob `Anexo-E-Boa-Vale-a-Pena.md`. A primeira pessoa é opcional: quando usada, expressa uma preferência editorial que a autora assinaria, sem fingir compra, uso, conforto ou resultado observado. "Se fosse para a minha casa" pode aparecer quando fizer sentido para o assunto, sem obrigação de preservá-la ou bani-la por loja.

Sem base para uma vencedora geral em comparativos puros (`"X, Y ou Z"`), concluir por situações ou explicar o critério que decide. Guias de utilidade, como tamanho ou aplicação, podem fechar com uma orientação; não precisam encenar a escolha de um produto.

Quando a conclusão usar uma experiência real, identificar o produto, o contexto e os limites do que foi observado. Não narrar como hipótese o uso já confirmado, nem atribuir ao relato uma motivação de compra que ele não registra. Ter um produto da marca em casa não equivale a ter usado todos os modelos comparados; a preferência por outro modelo pode continuar condicional. Produto recebido em parceria deve ter essa condição explícita, separada da comissão por código ou link. Não descrever recebimento como compra pessoal.

Em Suplementos-Alimentos e Beleza, manter as restrições de recomendação sem prova clínica, notas de clientes ou efeito sem fonte já definidas nos respectivos anexos. Não usar "eu levaria", "eu tomaria" ou "eu usaria", nem transformar promessa de rótulo em benefício comprovado. "Pelos números da tabela" é uma possibilidade de redação, não uma fórmula obrigatória.

**Cartão de destaque (`emphasis`):** opcional, no máximo um por artigo (de preferência no capítulo de conclusão). Destaca um julgamento ou conclusão editorial que a Cecília assinaria, porque o cartão leva a assinatura dela. Pode ter ou não primeira pessoa; não serve para abrigar dado de loja isolado, regra de cupom, aviso ou passo a passo de checkout (regras e procedimentos de checkout que mudam a compra entram no corpo, pois o rodapé padrão da loja usa `ArticleStoreBlock` com copy própria). Não preencher só para cumprir uma fórmula: a ausência de `emphasis` por si só não é defeito.

**Ficha, estrelas, prós e contras:** só aparecem em artigo `reviewKind: "produto"`, que exige uso real. Guia não preenche `verdict`, `pros`, `cons` nem `productSpec`: nas guias, a ficha vai na tabela e o "para quem / quando não" no texto.

**Quadro "Leve se / Passe se" (campo `decision` do artigo, desde 01/11/2026):** a decisão num relance, quando o guia ou comparativo ajuda a escolher e há perfis ou cenários distintos sustentados no texto. Em tutorial de passo a passo, artigo de primeira compra ou página de reputação, avaliar se o quadro acrescenta uma escolha real antes de incluí-lo (sem obrigação mecânica em todo artigo). Artigo de produto não leva (tem prós e contras; o `validate:content` barra).
- **Formato:** `"decision": { "takeIf": ["…"], "skipIf": ["…"] }`, no nível do artigo. De 1 a 3 frases em cada lista, sem markdown e sem "R$". Os rótulos vêm do site, não do JSON.
- **Lugar:** o site põe o quadro sozinho, logo antes do FAQ (sem FAQ, depois da última seção). Não entra no sumário, no áudio nem no JSON-LD.
- **De onde sai:** das frases de "para quem / quando não" dos capítulos, ditas como perfil ou situação do leitor ("Leve se você usa a mala em voo nacional com bagagem de mão"). Nada que o artigo não diga; sem primeira pessoa; em Beleza e Suplementos-Alimentos, sem efeito no corpo.
- **Não repete a conclusão:** o cartão de destaque traz a decisão; o quadro diz para quem ela serve e para quem não.
- **Família de 11 idiomas:** se o PT tem o quadro, todas as versões têm, com o mesmo número de frases e nenhuma igual à do PT (`test:review-i18n`). Quadro novo num artigo de família só entra junto com as 10 traduções.

**Fechamento do guia e do comparativo (regras do Job 3):**
- **`decision` em todo guia e comparativo:** `como-usar`, `primeira-compra` e `black-friday` também levam o quadro; só o artigo de produto fica sem. O texto das frases sai do "para quem / quando não" dos capítulos.
- **Um `emphasis` assinado no capítulo final de conclusão:** o julgamento que a Cecília assinaria, nunca regra de checkout.
- **FAQ do cupom:** uma pergunta literal "Qual é o cupom da <Loja>?", com a resposta em uma frase.
- **Checkout no corpo:** toda instrução crítica (onde colar o código, mínimo, o que não soma, só cliente novo) está no texto do artigo. O botão final da loja (`ArticleStoreBlock`) ignora `cta.text` e `cta.label` quando a loja está ativa, então nada pode depender deles.

**Para quem / quando não:** cada produto com capítulo próprio tem uma frase de para quem serve e uma de quando não escolher. Julgamento por perfil é o que a loja não faz: "a Heavy é para quem não quer a camiseta marcando o corpo; se usa por baixo do blazer no calor, fique na Tech".

**Em reforma, preservar o que já existe:** as "contas nossas" do artigo (o que leva "Conta nossa:" ou "pela regra da loja, fica…") ficam 100% como estão, com os mesmos números e pressupostos, salvo preço ou regra que mudou. Reformar não reescreve a conta.

**Sem capítulo de método e sem "Transparência":** nenhum capítulo "Como comparamos", "O que o guia permite escolher", "Como testamos" ou "Nota de transparência" (C7 e C3 do Job 3). A divulgação fica no `editorialNote`, e o método no vault. "Não testamos" e "sem avaliação nossa" aparecem só no `editorialNote`, nunca no corpo (C5).

**Armadilha (o bloco que só o site tem):** diga o que a página deixa de fora e em que o leitor cai: o preço riscado de um kit, a comparação com o avulso, o cupom que não soma com a promoção. Mostre a conta em uma frase.

**Frete grátis depois do cupom (23/11/2026):** quando o briefing confirma que o mínimo do frete grátis é calculado sobre o valor já com o cupom, o artigo diz em uma frase quanto o carrinho precisa ter antes do desconto para manter o frete ("com o frete grátis a partir de R$ 199, o carrinho precisa de R$ 221,12 em produtos para o frete continuar grátis depois dos 10%"). Entra no capítulo de como usar, de frete ou de primeira compra, e no FAQ quando houver pergunta de frete. A conta é nossa, feita pela regra da loja: o texto não diz que foi vista no carrinho se não foi. Sem a base confirmada no briefing, o artigo dá só o mínimo. Quando o mínimo ou o desconto mudam, a conta é refeita, nunca mantida.

**Visto no carrinho ou conta nossa:** todo número que sai de teste no carrinho é dito como visto; todo número que sai de aplicar a regra da loja a um preço é dito como conta ("pela regra da loja, fica…"). Os dois não se misturam na mesma frase, nem no mesmo cenário do simulador.

**Blocos do caderno (`metrics`, `filters`, `checklist`, `simulator`; desde o #1354, 22/11/2026):** como o `decision` e o `emphasis`, nenhum é obrigatório. Cada um entra só quando ajuda o leitor a ler ou a decidir, e nunca repete na mesma página um dado que outro bloco já mostra.
- **Faixa de indicadores (`metrics`):** de 2 a 6 números com rótulo, mais um resumo opcional. Uso principal: a reputação no Reclame Aqui e na Trustpilot (modelo: `damie-reclame-aqui-o-que-os-dados-mostram`), e medição técnica com fonte. Na reputação, a faixa substitui a tabela quando os indicadores principais cabem em 6 cartões, com a janela consultada no resumo; nunca a faixa e a tabela com os mesmos números (`Anexo-Reputacao.md`). Números do semestre e da aba Geral não se misturam na mesma faixa.
- **Pílulas de filtro na tabela (`comparisonTable.filters`):** de 2 a 6 perfis acima de uma tabela longa (de umas 8 linhas para cima: perfumes, sabores, tamanhos, planos), cada um mostrando as linhas que servem àquele leitor. Cada pílula é um perfil que o texto sustenta ("Para treino", "Sem lactose", "Bagagem de mão"), nunca "Melhor" ou "Recomendado" sem o julgamento no corpo. Tabela curta não leva filtro.
- **Lista "Antes de fechar o pedido" (`checklist`):** de 2 a 8 conferências antes de pagar, em como usar, primeira compra e frete, quando a loja tem trava real: valor mínimo, produtos excluídos, só para cliente novo, só no app ou só no site, campo do código, frete pela região. Cada item é uma ação que o leitor confere ("O carrinho passou de R$ 221,12?"). Não repete o passo a passo do artigo: o passo a passo ensina, a lista confere.
- **Simulador de cenários (`simulator`):** de 2 a 4 cenários com valores, quando a decisão depende de comparar formas de pagar, kits ou faixas de desconto ("Pix + cupom" e "Cartão + cupom"; "Kit" e "Avulso"). Cada cenário diz no `note` se foi visto no carrinho ou é conta pela regra da loja. Só números conferidos; a conta é refeita quando preço, desconto ou frete mudam. Não usar para simular desconto que a loja não aplica junto.
- **Família:** o `test:review-i18n` exige o mesmo bloco, com a mesma forma, nas 11 versões. Bloco novo num artigo de família só entra com as traduções.

Bastidor ("como lemos", "API", "página não abriu") fica no vault, não no corpo. Capítulo que só encaminha para outro artigo vira uma frase no capítulo vizinho ou um item do FAQ.

**Pares de referência (ruim → bom), um por lote da auditoria:**
- Moda. Ruim (`camiseta-feminina-insider-qual-escolher`, "Gola V"): "A Gola V tem gola levemente alongada e sai pelo mesmo preço, R$ 129 (de R$ 169). Segundo a loja, é de 92% modal e 8% elastano." Bom: "A Gola V é a mesma Tech com o decote em V: mesmo tecido, mesmo preço. Para o trabalho com gola fechada, fique na Tech redonda."
- Casa e malas. Ruim (`tamanho-mala-bagaggio-p-m-g`, "Como ler as faixas"): "Litros são a capacidade que a loja declara. Não convertemos isso em número de peças de roupa, porque depende de cada peça." Bom: "Regra prática, sem teste nosso, com uma troca por dia: a mala de 45 litros leva roupa de 5 a 7 dias."
- Beleza. Ruim (`iluminador-corporal-skelt-como-usar`, "Corpo e rosto"): "Ninguém do site usou o produto no rosto. Este texto repete o que a Skelt indica e não descreve resultado nenhum." Bom: "A Skelt indica o iluminador para corpo e rosto, num tom só. No rosto, comece com pouco, numa área pequena, e espere secar antes de julgar o brilho."
- Suplementos e alimentos. Ruim (`max-titanium-ou-integralmedica`, "Whey: preço por 100 g"): "O pote de 900 g da Integralmédica custava R$ 240,00 em 28/10, R$ 26,67 por 100 g de produto; a tabela dele não foi lida nesse dia, e por isso ele fica fora da conta." Bom (`pre-treino-max-titanium-horus-ou-egide`, "Quanto custa cada dose"): "O pote do Égide de 300 g custa R$ 21,00 a mais que o do Hórus de 300 g, mas rende 14 doses a mais. Quem compara só o preço do pote vê o contrário."
- Tecnologia. Ruim (`hostinger-ou-hostgator`, "E se for VPS?"): "A tabela de preço regular do VPS da HostGator não abriu em 30/10/2026, então não dá para comparar a renovação: pergunte antes de fechar 3 anos." Bom (`vps-ou-hospedagem-compartilhada-qual-escolher`, "Manutenção: o que fica com você"): "Se você nunca abriu um terminal, isso tem custo: ou de tempo de aprendizado, ou de alguém que faça por você. Para um site comum, esse custo costuma ser maior que a diferença de preço entre os planos."
