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
  - Toda afirmação na matriz de claims deve apontar para uma **fonte exata** (com resolução, trecho do rótulo ou URL oficial).
  - Sempre orientar a consulta a um médico ou nutricionista em questões de saúde e posologia.
