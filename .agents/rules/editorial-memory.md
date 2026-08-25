# Regra Editorial: Memória & Esteira de Conteúdo

Antes de executar qualquer tarefa de redação, revisão, conformação ou validação de artigos:

1. **AI Priming Index:**
   Consulte `docs/Memoria de Artigos/memreview/00_Sistema/AI-PRIMING-INDEX.md` para carregar **somente as notas necessárias** para o Job correspondente.

2. **Fonte da Verdade:**
   - Artigos publicados residem em `content/reviews/<slug>.json` e são registrados no `content/reviews/_manifest.json`.
   - As pautas e rascunhos em progresso residem em `docs/Memoria de Artigos/memreview/02_Artigos/<slug>.md`.
   - Nunca editar `src/lib/data.ts` manualmente para artigos ou receitas.

3. **Governança de Classes & SEO:**
   - Todo artigo pertence a exatamente uma `category` canônica (`guias-praticos-utilidade`, `produtos-experiencias`, `cupons-como-usar`, `confianca-reputacao`).
   - Links internos para cupons devem ser sempre caminhos relativos (ex: `/cupons/<marca>`).
   - Títulos (`title` e `seoTitle`) devem ser objetivos e responder a dúvidas reais do usuário, sendo expressamente proibido o uso de clickbaits vagos como *"Tudo o que você precisa saber"*.
   - Toda afirmação na matriz de claims deve indicar a **fonte exata com localização/trecho**.
