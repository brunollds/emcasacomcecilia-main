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
   - **Caminhos sempre locais:** `image`, `imageAlt`, `images[].src` e `gallery[].image` usam `/images/reviews/<marca>/<arquivo>.webp`. Nunca escrever URL `cdn.emcasacomcecilia.com` no JSON nem alterar chaves de `localVideoMetadata`/`video-pages`: o mapa de entrega troca pela URL do CDN só na renderização.
   - **Toda imagem NOVA precisa entrar na biblioteca de mídia** (seguir `docs/GUIA-MIDIA-EDITORIAL.md`): arquivo comprimido em `public/images/...`, inventário `--merge`, upload FTPS + verificação HTTPS, `prepare-delivery --append` e `phase5-export --write/--check`. Imagem em `public/` fora do manifesto/mapa reprova o `candidate-proof`/`deploy:prepare` (bytes novos não mapeados). Upload é escrita em produção e depende de GO do Bruno.
   - **Proporção antes do `imageFit`:** conferir largura×altura reais. `"contain"` sem `imageAspectRatio` cai numa caixa 16:9 e gera barras brancas em foto quadrada/quase quadrada. Foto quadrada: `"square"`; outras: declarar `imageAspectRatio` (ex.: `1.3333` para 4:3, `1.7758` para 16:9). Hero: `imageAspect` coerente com a foto (`landscape`/`portrait`/`square`).
   - **Carrossel:** várias fotos na mesma seção via `images[]` (cada item com `src`, `alt`, `caption`, `objectFit`, `aspectRatio`). Não repetir no `gallery` as fotos já usadas no corpo.
   - **Origem e licença:** registrar na nota do vault a origem de cada foto (própria, foto de manual, marca) e a autoria; crédito também na `caption` quando a imagem não for da autora.
4. **Links nas Seções:**
   - Links para `/cupons/<marca>` devem ser relativos.
   - Links externos de loja devem ter `"sponsored": true`.
5. **Manifesto:** Inserir o `<slug>` na posição correta de `content/reviews/_manifest.json`.

---

## 3. Clusters multilíngues (quando aplicável)

1. Ler a nota do cluster e `docs/HANDOFF-I18N-SUBPAGINAS-FASE-4.md`; o vault não
   substitui o contrato de `locale`, `translationKey`, pathname ou os validadores.
2. Para uma família traduzida, incluir `translationKey` em cada JSON e `locale`
   explícito em toda versão não-PT (preferir também `locale: "pt"` na fonte nova).
   A URL é derivada automaticamente: `/reviews/<slug>` para PT e
   `/<locale>/reviews/<slug>` para os demais idiomas.
3. Não criar `page.tsx` por artigo, hreflang manual, seletor manual ou entrada no
   cluster YesStyle para descobrir uma tradução; manifesto + corpus alimentam o
   runtime. Redirects só são necessários ao migrar URL já publicada.
4. Em `paridade-completa`, só marcar a nota-fonte como pronta quando todos os
   idiomas da matriz tiverem JSON, `locale`, `translationKey`, categoria e
   manifesto correspondentes. O runtime aceita grupos parciais quando o modo for
   `liberar-por-conversao`.
5. Em `liberar-por-conversao`, publicar a fonte PT na estrutura do cluster e
   manter os demais idiomas como `aguardando-gate`; não preencher traduções de
   fachada para completar uma matriz.
6. Atualizar a matriz da nota do cluster com slugs, estado e data da última
   verificação técnica.
