# HANDOFF — Vídeos no domínio principal

**Estado em 01/08/2026:** VideoObject editorial em 12 páginas e Entrega 3
implementada com 11 páginas de exibição em `/videos/[slug]`, hub `/videos` e
extensão de vídeo no sitemap principal. Antes do deploy, executar todos os gates
da seção final. Guia de autoria: `docs/GUIA-EDITORIAL-VIDEOS.md`.

## Arquitetura (o que um sucessor precisa saber)

- **Registro de metadados**: `src/lib/video-metadata.js`. YouTube indexado por
  ID de vídeo (`videoMetadata`), MP4 locais indexados por caminho público
  (`localVideoMetadata`, com `classification: primary|secondary|decorative` e
  `reviewSlug`). **Metadados de vídeo NUNCA vão nos JSONs de conteúdo** — é o
  que protege o `sourceHash` da central (máquina content-operations). Os campos
  `videoUploadDate`/`videoThumbnail` nos JSONs de receita existem só como
  overrides opcionais.
- **Helpers fail-closed**: `src/lib/video-schema.js` —
  `buildYoutubeVideoObject` (name/description/thumbnail/uploadDate ISO
  obrigatórios; sempre `/embed/ID` + watch URL; thumbnail exclusiva
  `i.ytimg.com/vi/ID/hqdefault.jpg`, nunca banner) e `buildLocalVideoObject`
  (contentUrl absoluto + poster exclusivo; nunca embedUrl). Faltou campo →
  `null` → página sem schema (melhor que marcação incompleta).
- **Integração**: `recipe-template-props.js` (Recipe.video) e
  `review-template-props.js` (Review/Article.video). Prioridade:
  `youtubeVideoJsonLd || localVideoJsonLd` — YouTube vence; só MP4 `primary`
  pode gerar schema; um único VideoObject por página. O preview da central
  importa esses módulos — **manter os exports compatíveis**
  (`getYoutubeEmbedUrl` é re-exportado de review-template-props de propósito).
- **Páginas de exibição**: `src/lib/video-pages.js` liga cada vídeo editorial
  único a um slug e ao artigo/receita de origem. As rotas
  `src/app/(pt)/videos/[slug]/page.js` colocam um único player, com controles,
  imediatamente depois do H1. `/videos` é o hub navegável.
- **Sitemap de vídeo**: o próprio `sitemap.xml` usa a extensão oficial
  `xmlns:video` por meio da propriedade `videos` do Next.js. Só as páginas
  `/videos/[slug]` recebem `<video:video>`; artigos, loops complementares e
  vídeos decorativos não entram como vídeos no sitemap. O `llms.txt` também
  deriva o hub e as páginas do mesmo registro `videoPages`.
- **Validador**: `scripts/validate-video-schema.ts`, roda dentro de
  `npm run build` (fail-closed). Cobre: URL sem ID válido, entrada faltante no
  registro, campos obrigatórios, ISO 8601, `/embed/`, assets locais existentes
  em `public/`, MP4 de review alheio, >1 primary por página, primary competindo
  com YouTube, registro órfão, página de exibição ausente/duplicada e divergência
  entre registro, VideoObject e sitemap.

## Regra operacional para vídeo novo

1. Central/editor pode publicar `youtubeUrl` normalmente.
2. O ID novo PRECISA ganhar entrada em `videoMetadata` (título real, descrição
   exclusiva, uploadDate da publicação no YouTube, duração) — senão o build
   falha. Fonte: API do YouTube (part=snippet,contentDetails) ou manual.
3. Todo vídeo YouTube do registro precisa de uma definição única em
   `video-pages.js`, com slug, artigo de origem e título do artigo.
4. MP4 editorial novo: entrada em `localVideoMetadata` com classificação
   explícita + poster exclusivo. Loop decorativo → `decorative` (sem schema).
5. MP4 `primary` também precisa de definição em `video-pages.js`. `secondary` e
   `decorative` nunca ganham página de exibição nem entrada no sitemap.
6. O build nunca chama API externa.

## Pendências (nenhuma é código em andamento)

| Item | Prazo | Ação |
|---|---|---|
| **Bolo de cenoura** | decisão do Bruno | `content/receitas/bolo-de-cenoura-com-cobertura-de-chocolate.json` tem `youtubeUrl` apontando pro CANAL. Remover o campo ou trocar pelo vídeo certo (registrar o ID novo), **fora de operação ativa da central**, e então tirar o slug de `KNOWN_INVALID_YOUTUBE_URLS` no validador. |
| **Product snippet inválido** | backlog (chip criado) | Preexistente: `itemReviewed: Product` sem offers/review/aggregateRating → inelegível a Snippets do produto em TODOS os reviews de produto. Correção = Product top-level com review aninhado; mexe no shape do jsonLd e no validador (atualizar juntos). |
| **Search Console** | 2-7-28 dias após deploy | Reenviar `sitemap.xml`, acompanhar “Vídeos encontrados” e solicitar validação de “O vídeo não está em uma página de exibição”. |

## Gates antes de qualquer mudança nesta área

```bash
npm run validate:video && npm run validate:content && npm run typecheck && npm run build
```

Deploy: `docs/DEPLOY-GUIDE.md` (CI GitHub Actions; nunca build Windows por scp,
nunca painel Hostinger). Após deploy: IndexNow com URLs completas.
