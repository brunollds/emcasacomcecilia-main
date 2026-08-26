# Job 4: Conformação Técnica para JSON Canônico

---

## 1. Missão
Converter o texto revisado em Markdown para o arquivo JSON estruturado em `content/reviews/<slug>.json` e registrá-lo no `content/reviews/_manifest.json`.

---

## 2. Regras Estritas do JSON
1. **Campos Obrigatórios:** `id`, `slug`, `title`, `description`, `publishedAt`, `publishedAtISO`, `category`, `reviewKind`, `type`, `author`, `contentSections`.
   *(Nota: `readingTime` NÃO é campo do JSON; o tempo de leitura é calculado automaticamente em tempo de execução pelo template).*
2. **Afiliados (quando aplicável):**
   - `coupon`: Código do cupom (ex: `"CECI"`).
   - `affiliate`: Slug do cupom correspondente em `src/lib/couponsData.ts`.
   - `editorialNote`: Texto de divulgação.
3. **Mídia, Imagens & Vídeos (Sub-etapa de Assets):**
   - `image`: Caminho da imagem principal (Hero).
   - `imageAlt`: Texto alternativo descritivo e acessível (sem clickbait).
   - `imageFit` (`"contain"` | `"cover"` | `"wide"` | `"square"`) e `imageAspect`.
   - Imagens inline nas `contentSections` quando houver fotos explicativas ou tabelas.
   - `gallery`: Array de fotos com legenda (`caption`) rica quando houver múltiplos ângulos/detalhes.
   - `video` (MP4/loop) ou `youtubeUrl` (registrado em `video-metadata.js` se for primário).
4. **Links nas Seções:**
   - Links para `/cupons/<marca>` devem ser relativos.
   - Links externos de loja devem ter `"sponsored": true`.
5. **Manifesto:** Inserir o `<slug>` na posição correta de `content/reviews/_manifest.json`.

---

## 3. Clusters multilíngues (quando aplicável)

1. Ler a nota do cluster e o plano/handoff técnico referenciado nela; o vault não
   substitui o registro de rotas nem os validadores do repositório.
2. Em `paridade-completa`, só marcar a nota-fonte como pronta quando todos os
   idiomas da matriz tiverem JSON, `locale`, categoria, manifesto, rota e registro
   de cluster correspondentes.
3. Em `liberar-por-conversao`, publicar a fonte PT na estrutura do cluster e
   manter os demais idiomas como `aguardando-gate`; não preencher traduções de
   fachada para completar uma matriz.
4. Atualizar a matriz da nota do cluster com slugs, estado e data da última
   verificação técnica.
