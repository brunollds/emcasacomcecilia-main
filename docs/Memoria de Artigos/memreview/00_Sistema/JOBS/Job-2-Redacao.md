# Job 2: Redação Editorial

**Mídia obrigatória:** seguir [Guia de mídia editorial](../../../../GUIA-MIDIA-EDITORIAL.md): comprimir, preservar originais e paths locais no JSON, gerar o inventário com `--merge --stdout` e inserir no manifesto só as entradas novas, verificar HTTPS antes de `--append` e registrar origem/licença na memória. Upload, entrega CDN e deploy são etapas distintas.

---

## 1. Missão
Transformar o Briefing aprovado em um rascunho completo de artigo, no tom "Vida real em casa", com clareza, empatia e utilidade máxima. O texto é para ler: a ficha segue exata, mas quem escreve fala como quem conhece o produto e explica para o leitor.

---

## 2. Princípios de Redação
1. **Resposta rápida no topo, curta:** um parágrafo de 2 ou 3 frases (40 a 60 palavras) com a decisão e uma última frase que aponta o que muda a escolha e onde está no texto. Sem bullets, tabela, imagem, nenhum R$ e nenhuma conta. Nada pode existir só ali, e comparativos e guias levam o veredito num capítulo próprio antes do FAQ. Regra completa em `REGRAS-GLOBAIS.md`, seção 6.
2. **Estrutura por Seções Claras:** Subtítulos (H2/H3) descritivos e fáceis de escanear. Cada seção responde a uma pergunta (ver "Como escrever um capítulo").
3. **Tabelas e bullets:** a ficha vai no quadro, uma vez; o parágrafo diz o que a tabela não diz. Passo a passo em lista numerada quando o leitor segue a ordem. O número do quadro não volta na prosa nem no FAQ; o veredito pode retomar só o número que decide.
4. **FAQ Estruturada:** 3 a 5 perguntas literais, cada uma terminando em "?", com respostas em 1–2 frases. No rascunho, cada item é "Pergunta? resposta", sem negrito na pergunta. A resposta aponta o capítulo, sem repetir centavos nem datas. Usar os termos do autocompletar do Google que o site do parceiro confirma (`CONTRATOS-DE-CONTEUDO.md`).
5. **Links Contextuais:** Inserir naturalmente até 3 links relativos para a página da loja no idioma do artigo (`/cupons/<marca>` em português, `/<locale>/coupons/<marca>` nas traduções) e links comissionados da loja com `rel="sponsored"`.
6. **Nome do Código:** chamar o código pelo que ele é na loja. O `CECILIA010` da YesStyle é código de recompensa: nunca "cupom" nem "use com outros cupons", em nenhum idioma (a build reprova). O `4CW5Y` da SHEIN é código de indicação da SHEIN Brasil. Não citar código de terceiros nem cupom promocional da YesStyle, que vence. Regras completas em `CONTRATOS-DE-CONTEUDO.md`.
7. **Imagens no corpo (mínimo obrigatório):** todo artigo leva **pelo menos uma imagem no corpo além da capa (hero)**. Isso é o piso, não a meta: quanto mais imagens, melhor, desde que nenhuma se repita e todas sejam do tema da seção. O rascunho traz um **Plano de imagens**: para cada imagem, a seção onde entra, o que mostra, a origem (foto da marca, embalagem, rótulo, print da loja, montagem ou quadro feito por nós) e uma sugestão de alt e de legenda. Cada produto com capítulo próprio tem a foto dele nesse capítulo; quando o produto tem link de afiliado, a foto leva o `href` desse link (Job 1, seção 1, "Foto de produto com link de afiliado"). Boas candidatas: fotos oficiais dos produtos, rótulo ou tabela nutricional, montagem comparativa, quadro de preços e print da loja recortado sem barras de campanha. A opção de capa que não for escolhida pode entrar no corpo, se couber no tema. Artigo só com a capa não sai do Job 2 (regra do Bruno, 18/10/2026). O plano diz o quê e onde; buscar as fotos, montar a capa no modelo do tipo de artigo e subir ao CDN é o Job 6, depois da revisão.
8. **Anexo por tipo:** antes de escrever, ler o anexo do tipo do artigo em `00_Sistema/JOBS/Anexos/`: moda → `Anexo-Moda.md`; casa e malas → `Anexo-Casa-Malas.md`; beleza → `Anexo-Beleza.md`; suplementos e alimentos → `Anexo-Suplementos-Alimentos.md`; tecnologia → `Anexo-Tecnologia.md`. O anexo detalha o tipo; este Job vale para todos.
9. **Datas, rótulos e ressalvas:** seguir `REGRAS-GLOBAIS.md`, seção 7. Ela vale para o corpo, a legenda, o FAQ e o veredito; não repetir essas regras no rascunho.

---

## 3. Matriz de Claims
O redator deve preencher a matriz de claims no rodapé da nota para facilitar a auditoria do Job 3.

---

## 4. Fonte canônica e localização

Quando a pauta sai nos 10 idiomas (`modo_i18n: paridade-completa`), o texto PT é a
fonte canônica da família. Marcar no rascunho quais claims são universais e quais
dependem de país, preço, frete, moeda, disponibilidade ou campanha. As 9 versões
são escritas no Job 4, a partir do PT aprovado no Job 3: localização editorial, não
tradução literal, com os fatos de mercado ditos como do mercado de origem (ex.:
preço em reais na SHEIN Brasil). As versões se ligam ao PT por `translationKey`,
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

**Veredito pessoal:** guia de escolha e comparativo fecham o capítulo de veredito com uma frase de julgamento, uma vez por artigo. O porquê sai de um dado que já está no artigo (preço por peça ou por dose, medida, renovação), nunca de uso que não houve. A forma depende do tipo:
- **Moda, Casa-Malas e Tecnologia:** "Se fosse para a minha casa, eu levaria X, porque Y." Sem uso real, nada de "aqui em casa" nem "uso".
- **Suplementos-Alimentos e Beleza:** sem gesto de consumo. "Pelos números da tabela, para o perfil X a escolha é Y, porque Z." Nunca "eu levaria", "eu tomaria" ou "eu usaria": lido pela leitora, vira recomendação de uso e encosta na regra de saúde.

**Cartão de destaque (campo `emphasis` da seção):** a frase de veredito pessoal vai nele, no capítulo de veredito, uma vez por artigo. O cartão assina "Cecília Mauad", então só leva frase que ela assinaria: julgamento, nunca dado de loja ("a renovação custa de 4 a 6 vezes"), regra de cupom ou aviso ("Atenção:", "Importante:").

**Ficha, estrelas, prós e contras:** só aparecem em artigo `reviewKind: "produto"`, que exige uso real. Guia não preenche `verdict`, `pros`, `cons` nem `productSpec`: nas guias, a ficha vai na tabela e o "para quem / quando não" no texto.

**Para quem / quando não:** cada produto com capítulo próprio tem uma frase de para quem serve e uma de quando não escolher. Julgamento por perfil é o que a loja não faz: "a Heavy é para quem não quer a camiseta marcando o corpo; se usa por baixo do blazer no calor, fique na Tech".

**Armadilha (o bloco que só o site tem):** diga o que a página deixa de fora e em que o leitor cai: o preço riscado de um kit, a comparação com o avulso, o cupom que não soma com a promoção. Mostre a conta em uma frase.

Bastidor ("como lemos", "API", "página não abriu") fica no vault, não no corpo. Capítulo que só encaminha para outro artigo vira uma frase no capítulo vizinho ou um item do FAQ.

**Pares de referência (ruim → bom), um por lote da auditoria:**
- Moda. Ruim (`camiseta-feminina-insider-qual-escolher`, "Gola V"): "A Gola V tem gola levemente alongada e sai pelo mesmo preço, R$ 129 (de R$ 169). Segundo a loja, é de 92% modal e 8% elastano." Bom: "A Gola V é a mesma Tech com o decote em V: mesmo tecido, mesmo preço. Para o trabalho com gola fechada, fique na Tech redonda."
- Casa e malas. Ruim (`tamanho-mala-bagaggio-p-m-g`, "Como ler as faixas"): "Litros são a capacidade que a loja declara. Não convertemos isso em número de peças de roupa, porque depende de cada peça." Bom: "Regra prática, sem teste nosso, com uma troca por dia: a mala de 45 litros leva roupa de 5 a 7 dias."
- Beleza. Ruim (`iluminador-corporal-skelt-como-usar`, "Corpo e rosto"): "Ninguém do site usou o produto no rosto. Este texto repete o que a Skelt indica e não descreve resultado nenhum." Bom: "A Skelt indica o iluminador para corpo e rosto, num tom só. No rosto, comece com pouco, numa área pequena, e espere secar antes de julgar o brilho."
- Suplementos e alimentos. Ruim (`max-titanium-ou-integralmedica`, "Whey: preço por 100 g"): "O pote de 900 g da Integralmédica custava R$ 240,00 em 28/10, R$ 26,67 por 100 g de produto; a tabela dele não foi lida nesse dia, e por isso ele fica fora da conta." Bom (`pre-treino-max-titanium-horus-ou-egide`, "Quanto custa cada dose"): "O pote do Égide de 300 g custa R$ 21,00 a mais que o do Hórus de 300 g, mas rende 14 doses a mais. Quem compara só o preço do pote vê o contrário."
- Tecnologia. Ruim (`hostinger-ou-hostgator`, "E se for VPS?"): "A tabela de preço regular do VPS da HostGator não abriu em 30/10/2026, então não dá para comparar a renovação: pergunte antes de fechar 3 anos." Bom (`vps-ou-hospedagem-compartilhada-qual-escolher`, "Manutenção: o que fica com você"): "Se você nunca abriu um terminal, isso tem custo: ou de tempo de aprendizado, ou de alguém que faça por você. Para um site comum, esse custo costuma ser maior que a diferença de preço entre os planos."
