# Regras Globais Editoriais — Em Casa com Cecília

> **Fonte Canônica:** Documentos versionados em `docs/` no repositório (`MANUTENCAO-MENSAL.md`, `GUIA-EDITORIAL-GUIAS-ANALISES.md`, `CONTRATO-ARTIGO-AFILIADO.md`, `GUIA-EDITORIAL-VIDEOS.md`).

---

## 1. Princípio da Honestidade & Não Simulação de Frescor
- **Proibido simular frescor:** Nunca alterar datas de publicação (`publishedAt`, `publishedAtISO`) ou datas de verificação de cupom (`lastVerified`) sem uma rechecagem factual completa ou republicação material do texto.
- **Evidência Própria vs Informação Pública:**
  - Se a peça afirma teste pessoal, produto recebido, fotos ou vídeos próprios da Cecília -> classificar como `produtos-experiencias`.
  - Se a peça usa dados técnicos públicos, manuais ou comparações sem teste próprio declarado -> classificar como `guias-praticos-utilidade`.
  - **Nunca** inventar que um produto foi "testado na nossa casa" se isso não estiver comprovado.

---

## 2. Diretriz de Títulos Honestos & Anti-Clickbait (H1 e SEO Title)
- **Proibido usar fórmulas vagas e genéricas:**
  - ❌ *"Nutren Just Protein: tudo o que você precisa saber"*
  - ❌ *"Dolce Gusto: o guia definitivo"*
  - ❌ *"Descubra o segredo do..."*
  - **Exceção autorizada (`Anexo-E-Boa-Vale-a-Pena.md`):** nos guias panorâmicos da Trilha A (`<marca>-e-boa` / `<marca>-vale-a-pena`) que realmente cobrem origem, linhas, produtos-chave, preços e cupom, é autorizado usar `"<Marca> é boa? Tudo que você precisa saber antes de comprar"` ou `"<Marca> é boa? História, principais linhas, o que comprar e cupom"`.
- **Proibido usar sufixos defensivos no H1:** nunca fechar H1 com *"pelo que a loja informa"*, *"o que dá para conferir antes de comprar"*, *"pelo rótulo, um a um"* ou *"o que a página mostra"*.
- **Obrigatório usar títulos específicos e orientados à dor:**
  - ✅ *"Nutren Just Protein: para que serve, como usar em receitas e tabela nutricional"*
  - ✅ *"Tabela de medidas Dolce Gusto: quantos ml saem em cada nível?"*
  - ✅ *"Como descalcificar a Dolce Gusto passo a passo e apagar a luz amarela"*
  - ✅ *"Océane é boa? Tudo que você precisa saber antes de comprar"*
- **Diferenciação entre `title` e `seoTitle`:**
  - `title`: H1 principal da página, humano, descritivo e claro.
  - `seoTitle`: Title tag da SERP (máx ~60 caracteres). Usado para recuar quando houver risco de canibalizar a página transacional `/cupons/<marca>`.

---

## 3. Governança de Mídia, Imagens & Vídeos (Visual SEO)
- **Imagens Autênticas e Informativas:**
  - Toda imagem deve ter propósito editorial (infográficos de benefícios, fotos da tabela, do modo de preparo ou da embalagem física).
  - `imageAlt` deve ser descritivo, rico e acessível (ex: *"Frente da lata de 280g do Nutren Just Protein: 100% whey protein isolado, sem sabor"*).
  - Sempre definir `imageFit` (`"contain"`, `"cover"`, `"wide"`, `"square"`) e `imageAspect` adequados ao layout.
- **Vídeos:**
  - Seguir o `GUIA-EDITORIAL-VIDEOS.md`: classificar como `primary` (gera `/videos/[slug]` e schema de vídeo rico), `secondary` ou `decorative` (loops leves sem som).

---

## 4. Território de Marca: "Vida real em casa"
- A promessa editorial é: *"Receitas que dão certo, produtos avaliados com honestidade e guias para escolhas do dia a dia."*
- Tom de voz: Acolhedor, didático, direto, sem jargões corporativos, focado em resolver a dor de quem está em casa.

---

## 5. Segurança Regulatória & Claims de Saúde
- **Suplementos e Alimentos (I Wanna Sleep / Nestlé Nutre):**
  - Jamais prometer cura, tratamento ou benefícios não aprovados pela ANVISA.
  - O texto do artigo não cita a Anvisa (registro, aprovação, proibição ou banimento) e não faz alegação de saúde. A Anvisa serve à pauta como checagem interna, não como argumento no texto; exceção só por decisão do Bruno no artigo. Quando uma exceção for aprovada num artigo (ex.: guia de confiança de cosméticos que ensina a consultar um processo público oficial), delimitar o produto e a fonte oficial, mantendo a distinção entre **notificação**, **registro** e **eficácia comprovada**. Quando o rótulo não traz número de processo no site (ex.: suplemento alimentar dispensado de registro), ater-se aos dados verificáveis do rótulo sem expandir capítulo regulatório.
  - **Duas exceções factuais, só quando o dossiê do parceiro (`01_Parceiros/`) as prevê ou o briefing as pede.** Continua proibido prometer cura ou efeito na saúde e usar "aprovado pela Anvisa" como argumento comercial.
    - **(a) Artigo `*-e-confiavel`:** pode citar fato regulatório público e neutro, com a fonte oficial: por exemplo, o enquadramento como suplemento alimentar dispensado de registro (RDC) ou o registro ou a notificação público no DOU. Diz o que o documento é, sem concluir que o produto funciona nem que é "aprovado".
    - **(b) Posologia:** quando o dossiê pedir, transcrever de forma objetiva a recomendação de uso declarada no rótulo oficial, atribuída a ele ("o rótulo informa:"), seguida da orientação de consultar médico ou nutricionista. Sem acrescentar dose, prazo nem benefício que o rótulo não traga.
  - Toda afirmação na matriz de claims deve apontar para uma **fonte exata** (com resolução, trecho do rótulo ou URL oficial). A matriz guarda a fonte completa. No corpo, a fonte aparece **uma vez por artigo**, no capítulo do dado que decide a compra, junto do rótulo de origem da seção 7 ("A loja informa:"); o FAQ e o veredito não a repetem. Alegação de saúde não entra no corpo, com fonte ou sem.
  - Sempre orientar a consulta a um médico ou nutricionista em questões de saúde e posologia.

---

## 6. Resposta rápida e veredito (Bruno, 23/10/2026)
A primeira seção do artigo (`Resposta rápida` em português; `Quick answer`, `Respuesta rápida`, `Réponse rapide` etc. nas traduções) é um resumo de verdade, não um mini-artigo.

- **Um parágrafo só, de 2 ou 3 frases e 40 a 60 palavras (até 65 em guias `"é boa / vale a pena"` com dossiê longo),** respondendo direto à pergunta do título. No JSON: `paragraphs` com um item, sem `bullets`, `postParagraphs`, `comparisonTable`, `couponTiers`, `emphasis`, `image` ou `images`.
- **Só a decisão,** sem os detalhes que se repetem nos capítulos: nada de lista de produtos, tabela ou passo a passo. **Nenhum R$ na resposta rápida:** nem preço puro, nem preço com cupom, nem conta. Valor e conta ficam no capítulo de preço. **Exceção, artigo de campanha** (`bodyDatesReason: "campanha"`, como os de Black Friday): o preço promocional é a notícia e pode abrir a resposta rápida, com R$ (ex.: "kit a R$ 49, 30% na mensalidade e R$ 200 de crédito pelo link"); preço de tabela e conta seguem no corpo (Bruno, 24/11/2026).
- **A última frase aponta o que muda a decisão e onde está no texto.** Ex.: "o que pesa é o mínimo de 3 caixas; veja abaixo se compensa no seu consumo". Ela puxa a leitura sem esconder a resposta do Google.
- No máximo um link, de preferência nenhum. Sem negrito.
- Por tipo de artigo: no **comparativo** e no **guia de escolha**, o veredito em uma frase e o que pesa na escolha (em comparações puras como `"X, Y ou Z: qual vale mais a pena?"`, responder qual opção vence por perfil, sem forçar `"Sim"`); no **`<Marca/Produto> é boa/bom / vale a pena`** de parceiro ativo (`Anexo-E-Boa-Vale-a-Pena.md`), a `Resposta rápida` abre de forma afirmativa variada (**`Sim`**, **`Claro`**, **`Com certeza`**, **`Vale, sim`**, **`É boa/bom, sim`**, **`Compensa, sim`**) seguida de para quem vale e de um motivo concreto verificado (catálogo, conta/cupom, perfil ou uso real, sem `R$` no PT — nunca afirmação oca); em **perguntas de fato** (`"é pura?"`, `"tem formol?"`, `"funciona?"`, `"é saudável?"`), responder estritamente conforme a evidência verificada; no **é confiável / Reclame Aqui**, sim ou não, com o porquê em uma frase; no **cupom**, o código, o desconto (em porcentagem, sem valor em R$), onde ele vale e a condição principal (aqui o código é a própria resposta); na **Black Friday**, se a loja tem campanha, quando, e o que o cupom faz nela.
- **Nada existe só na resposta rápida.** Todo fato, link, tabela, imagem, aviso ou data dela também está num capítulo. Veredito que só aparece na resposta rápida é sinal de artigo mal estruturado.
- **O veredito tem capítulo próprio.** Comparativos e guias de escolha trazem um capítulo de veredito ("Qual escolher", "Quem escolhe o quê", "Onde cada um ganha"), no mínimo como capítulo final, antes de "Perguntas frequentes", com o veredito por perfil e os números que o sustentam. Nos artigos de confiança, o capítulo final responde "dá para confiar?" com os números.
- **O primeiro capítulo depois da resposta rápida abre o assunto:** se ele começa no meio (método, tabela solta), ganha uma ou duas frases de entrada.
- Vale para todos os idiomas: as traduções seguem o mesmo formato, a partir do PT.

---

## 7. Artigo para ler, não prontuário (Bruno, 31/10/2026)
Vale para artigo novo e para revisão. Os exemplos são trechos da auditoria de 50 artigos (lotes A a E, 31/10/2026). Os exemplos "Antes" mostram o texto como estava; os "Depois", como a regra pede.

### Datas
- **Regra.** A data da leitura aparece uma vez no corpo, na legenda da tabela de preço (ex.: "Preço no cartão, 29/10"). O `editorialNote` não leva data (regra de 03/10/2026: no máximo 3 linhas no celular, a data do artigo é a referência). Além da legenda, no máximo mais uma data no corpo, só onde, sem ela, o número muda de sentido: nota do Reclame Aqui, fim de campanha, prazo de entrega. Nunca em legenda de foto, célula de tabela, título de capítulo ou FAQ.
- **Antes:** título "Preço por 100 g em 28/10/2026"; corpo "Preço de cartão lido na loja em 30/10/2026."
- **Depois:** título "Preço por 100 g e por dose"; corpo "Os preços da tabela são de cartão."

### Quatro rótulos para conhecimento geral
- **Regra.** Conhecimento geral entra com um dos quatro rótulos, cada um usado uma vez por artigo, onde se aplica:
  - "A loja informa:", para o que vem da loja;
  - "Conta nossa:", para as nossas contas, dizendo na mesma frase de onde vêm os números (ficha, rótulo ou carrinho). Separar o que foi **demonstrado no carrinho** (SKU efetivamente testado no checkout) do que é **simulação aritmética** sobre preço de vitrine de outro kit ou SKU não testado (ex.: `R$ 32,97`/frasco conferido num kit específico vs. a mesma divisão aplicada a outro trio de mesmo preço, que deve ser identificada como simulação);
  - "Regra prática, sem teste nosso:", para conhecimento geral, sempre com a premissa escrita;
  - "Recebi:" ou "Usei:", para experiência real (o produto recebido ou o uso, com quem e por quanto tempo).

  O rótulo marca a primeira vez que aquele tipo de informação aparece; depois, o texto segue sem repetir a etiqueta.

  O rótulo não autoriza falar de efeito no corpo. Em saúde e beleza, a regra prática para antes de qualquer benefício.
- **Antes:** "Litros são a capacidade que a loja declara. Não convertemos isso em número de peças de roupa, porque depende de cada peça."
- **Depois:** "Regra prática, sem teste nosso, com uma troca por dia: a mala de 45 litros leva roupa de 5 a 7 dias."
- **Antes (conta):** "O kit de 3 Tech aparece 'de R$ 507', mas 3 Tech avulsas custam R$ 387."
- **Depois (conta):** "Conta nossa, pelos preços da ficha: 3 Tech avulsas custam R$ 387, então o 'de R$ 507' do kit usa preço antigo."

### Ressalva que muda a compra
- **Regra.** Toda ressalva passa pela pergunta "muda a compra?". Se muda, entra uma vez, no capítulo da decisão, junto com o que fazer. Se não muda, vai para o `editorialNote` ou sai. "Ninguém do site usou" aparece só no `editorialNote`. "Segundo a loja" no máximo uma vez por capítulo.
- **Antes (não muda a compra):** "Não calculamos o valor final com o cupom nesta leitura: confira no resumo do pedido."
- **Depois:** sai do corpo.
- **Antes (ressalva com a ação):** "Ninguém do site usou o produto no rosto. Este texto repete o que a Skelt indica e não descreve resultado nenhum."
- **Depois:** "Maquiagem corporal nova no rosto pede cuidado: comece com pouco, numa área pequena, e espere secar antes de julgar o brilho."

### Número uma vez (e conta refeita quando o dado muda)
- **Regra.** O dado fica na tabela; o parágrafo diz o que a tabela não diz. O veredito pode retomar o número decisivo; o FAQ aponta o capítulo, sem repetir centavos. Em reforma ou atualização de preços na tabela, **refazer obrigatoriamente a conta e a conclusão na prosa com os valores da mesma consulta**: nunca apagar a leitura por unidade/kit deixando a tabela muda, nem manter no texto a economia calculada sobre preços de outra data (ex.: se 10 avulsos passaram a `R$ 69,70` e o kit a `R$ 64,82`, atualizar a conclusão para a economia atual de `R$ 4,88` antes do cupom e do Pix).
- **Antes:** "Em 28/10/2026, a reputação era Boa, com nota 7,5 nos seis meses até 30/09/2026, 95,3% das 32.431 reclamações respondidas e 77,8% dadas como resolvidas." (os mesmos números voltam em cinco capítulos)
- **Depois:** "Dá, com uma condição: guarde o comprovante e o rastreio. A SHEIN responde a quase todas as reclamações e resolve a maior parte. Os números estão no quadro do início."

### Nada de bastidor no corpo
- **Regra.** "Como lemos", "API", "nesta rodada", "a página não abriu" ficam no vault. O corpo leva só a consequência para o leitor.
- **Antes:** "A tabela de preço regular do VPS da HostGator não abriu em 30/10/2026, então não dá para comparar a renovação: pergunte antes de fechar 3 anos."
- **Depois:** "A HostGator não mostra na página quanto o VPS renova. Pergunte ao suporte antes de fechar 3 anos."

### Capítulo completo
- **Regra.** Capítulo responde uma pergunta, tem um dado próprio e uma orientação. Capítulo de método não existe: a frase útil dele vira a entrada do capítulo seguinte. Capítulo que só aponta outro artigo vira uma frase no capítulo vizinho ou um item do FAQ.
- **Antes:** capítulo "Como lemos os preços": "Os preços são os do cartão, lidos na API pública da loja em 30/10/2026. O preço de lista é o valor riscado na página do produto."
- **Depois:** o capítulo sai, e o capítulo seguinte ("Até R$ 100") abre com "Até cem reais a Bagaggio resolve o presente de amigo secreto: carteira, nécessaire e uma mochila de notebook que custa menos que muito jantar."

### Para quem e quando não
- **Regra.** Cada produto com capítulo próprio ganha uma frase de para quem serve e uma de quando não escolher.
- **Antes (trecho):** "A Gola V tem gola levemente alongada e sai pelo mesmo preço." Não diz quando escolher a Gola V em vez da Tech.
- **Depois:** "A Gola V é a mesma Tech com o decote em V. Vale para quem quer o pescoço mais alongado ou usar um colar fino; para o trabalho com gola fechada, fique na Tech redonda."

### Nota de transparência só no `editorialNote`
- **Regra.** O artigo não tem seção "Nota de transparência" no corpo. O `editorialNote` continua curto (até 3 linhas no celular, sem data): a divulgação da comissão e, se couber, "ninguém da equipe usou". A data da leitura fica na legenda da tabela de preço; o método fica no vault.
- **Antes:** seção "Nota de transparência" no fim do corpo, com "ninguém do site usou", o método de coleta e a data repetida em cada tabela.
- **Depois (`editorialNote`):** "Podemos receber comissão pelo cupom e pelos links. Ninguém da equipe usou as peças." A data fica na legenda da tabela: "Preço no cartão, 30/10".
