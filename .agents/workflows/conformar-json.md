# Workflow: Conformação JSON Canônico (Job 4)

1. Leia `docs/Memoria de Artigos/memreview/00_Sistema/JOBS/Job-4-Conformacao-JSON.md` e a nota aprovada em `docs/Memoria de Artigos/memreview/02_Artigos/<slug>.md`.
2. Gere o arquivo JSON canônico em `content/reviews/<slug>.json` observando:
   - Campos obrigatórios: `id`, `slug`, `title`, `description`, `publishedAt`, `publishedAtISO`, `category`, `reviewKind`, `type`, `author`, `contentSections`.
   - **Atenção:** `readingTime` NÃO é campo do JSON (ele é calculado dinamicamente pelo template).
   - Configure imagens (`image`, `imageAlt`, `imageFit`, `imageAspect`, `gallery`) e vídeos (`video` ou `youtubeUrl`) conforme os assets disponíveis.
   - Configure `coupon`, `affiliate`, `editorialNote`, `cta` e `relatedArticles`.
   - FAQ: a seção com o título do idioma e um item "pergunta? resposta" por pergunta (item 5 da seção 2 do Job 4).
3. Se a pauta sai nos 10 idiomas, gere a família completa seguindo a seção 3 do Job 4: um JSON por idioma, com `locale`, a mesma `translationKey`, o mesmo `affiliate` e o mesmo `coupon`, `hideFromPortugueseListings: true` fora do português e o link da loja no idioma de cada versão.
4. Acrescente os slugs no fim de `content/reviews/_manifest.json` (a família junta, na ordem dos idiomas).
5. Rode `node scripts/content/build-index.mjs`; o `src/lib/generated/content-index.ts` vai no commit junto com os JSONs.
6. Numa família, releia as 9 traduções ao lado do PT aprovado, um idioma por vez e de preferência com outro agente, pelo checklist do item 10 da seção 3 do Job 4; corrija e registre a releitura na nota.
7. Atualize a nota do vault para `status: pronto-para-gates`.
