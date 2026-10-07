# Regra Editorial: Memória & Esteira de Conteúdo

Antes de executar qualquer tarefa de redação, revisão, conformação ou validação de artigos:

1. **AI Priming Index:**
   Consulte `docs/Memoria de Artigos/memreview/00_Sistema/AI-PRIMING-INDEX.md` para carregar **somente as notas necessárias** para o Job correspondente.

2. **Fonte da Verdade:**
   - Artigos publicados residem em `content/reviews/<slug>.json` e são registrados no `content/reviews/_manifest.json`.
   - Artigo da YesStyle ou da SHEIN sai nos 10 idiomas, como uma família de JSONs com a mesma `translationKey`. O contrato está na seção 3 do `docs/Memoria de Artigos/memreview/00_Sistema/JOBS/Job-4-Conformacao-JSON.md`, e a build reprova família com idioma faltando.
   - Depois de criar ou editar JSON, rodar `node scripts/content/build-index.mjs` e commitar `src/lib/generated/content-index.ts` junto.
   - As pautas e rascunhos em progresso residem em `docs/Memoria de Artigos/memreview/02_Artigos/<slug>.md`.
   - Nunca editar `src/lib/data.ts` manualmente para artigos ou receitas.

3. **Governança de Classes & SEO:**
   - Todo artigo pertence a exatamente uma `category` canônica (`guias-praticos-utilidade`, `produtos-experiencias`, `cupons-como-usar`, `confianca-reputacao`).
   - Links internos para a página da loja são caminhos relativos no idioma do artigo: `/cupons/<marca>` em português e `/<locale>/coupons/<marca>` nas traduções.
   - O código é chamado pelo que ele é na loja: o `CECILIA010` da YesStyle é código de recompensa, nunca cupom, em nenhum idioma; o `4CW5Y` da SHEIN é código de indicação da SHEIN Brasil. Regras em `docs/Memoria de Artigos/memreview/00_Sistema/CONTRATOS-DE-CONTEUDO.md`.
   - Títulos (`title` e `seoTitle`) devem ser objetivos e responder a dúvidas reais do usuário, sendo expressamente proibido o uso de clickbaits vagos como *"Tudo o que você precisa saber"*.
   - Toda afirmação na matriz de claims deve indicar a **fonte exata com localização/trecho**.
