# Workflow: Conformação JSON Canônico (Job 4)

1. Leia `docs/Memoria de Artigos/memreview/00_Sistema/JOBS/Job-4-Conformacao-JSON.md` e a nota aprovada em `docs/Memoria de Artigos/memreview/02_Artigos/<slug>.md`.
2. Gere o arquivo JSON canônico em `content/reviews/<slug>.json` observando:
   - Campos obrigatórios: `id`, `slug`, `title`, `description`, `publishedAt`, `publishedAtISO`, `category`, `reviewKind`, `type`, `author`, `contentSections`.
   - **Atenção:** `readingTime` NÃO é campo do JSON (ele é calculado dinamicamente pelo template).
   - Configure imagens (`image`, `imageAlt`, `imageFit`, `imageAspect`, `gallery`) e vídeos (`video` ou `youtubeUrl`) conforme os assets disponíveis.
   - Configure `coupon`, `affiliate`, `editorialNote`, `cta` e `relatedArticles`.
3. Adicione o `<slug>` em `content/reviews/_manifest.json`.
4. Atualize a nota do vault para `status: pronto-para-gates`.
