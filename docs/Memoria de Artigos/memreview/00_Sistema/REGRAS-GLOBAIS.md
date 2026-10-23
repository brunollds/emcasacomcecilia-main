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
- **Obrigatório usar títulos específicos e orientados à dor:**
  - ✅ *"Nutren Just Protein: para que serve, como usar em receitas e tabela nutricional"*
  - ✅ *"Tabela de medidas Dolce Gusto: quantos ml saem em cada nível?"*
  - ✅ *"Como descalcificar a Dolce Gusto passo a passo e apagar a luz amarela"*
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
  - O texto do artigo não cita a Anvisa (registro, aprovação, proibição ou banimento) e não faz alegação de saúde. A Anvisa serve à pauta como checagem interna, não como argumento no texto; exceção só por decisão do Bruno no artigo.
  - Toda afirmação na matriz de claims deve apontar para uma **fonte exata** (com resolução, trecho do rótulo ou URL oficial).
  - Sempre orientar a consulta a um médico ou nutricionista em questões de saúde e posologia.

---

## 6. Resposta rápida e veredito (Bruno, 23/10/2026)
A primeira seção do artigo (`Resposta rápida` em português; `Quick answer`, `Respuesta rápida`, `Réponse rapide` etc. nas traduções) é um resumo de verdade, não um mini-artigo.

- **Um parágrafo só, de 2 ou 3 frases e 40 a 60 palavras,** respondendo direto à pergunta do título. No JSON: `paragraphs` com um item, sem `bullets`, `postParagraphs`, `comparisonTable`, `couponTiers`, `emphasis`, `image` ou `images`.
- **Só a decisão,** sem os detalhes que se repetem nos capítulos: nada de lista de produtos, preço com cupom, conta, tabela ou passo a passo.
- **A última frase aponta o que muda a decisão e onde está no texto.** Ex.: "o que pesa é o mínimo de 3 caixas; veja abaixo se compensa no seu consumo". Ela puxa a leitura sem esconder a resposta do Google.
- No máximo um link, de preferência nenhum. Sem negrito.
- Por tipo de artigo: no **comparativo** e no **guia de escolha**, o veredito em uma frase e o que pesa na escolha; no **é confiável / Reclame Aqui**, sim ou não, com o porquê em uma frase; no **cupom**, o código, o desconto, onde ele vale e a condição principal (aqui o código é a própria resposta); na **Black Friday**, se a loja tem campanha, quando, e o que o cupom faz nela.
- **Nada existe só na resposta rápida.** Todo fato, link, tabela, imagem, aviso ou data dela também está num capítulo. Veredito que só aparece na resposta rápida é sinal de artigo mal estruturado.
- **O veredito tem capítulo próprio.** Comparativos e guias de escolha trazem um capítulo de veredito ("Qual escolher", "Quem escolhe o quê", "Onde cada um ganha"), no mínimo como capítulo final, antes de "Perguntas frequentes" e da "Nota de transparência", com o veredito por perfil e os números que o sustentam. Nos artigos de confiança, o capítulo final responde "dá para confiar?" com os números.
- **O primeiro capítulo depois da resposta rápida abre o assunto:** se ele começa no meio (método, tabela solta), ganha uma ou duas frases de entrada.
- Vale para todos os idiomas: as traduções seguem o mesmo formato, a partir do PT.
