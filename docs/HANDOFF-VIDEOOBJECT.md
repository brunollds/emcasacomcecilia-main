# HANDOFF — VideoObject no domínio principal (+ cupom BTS26)

**Estado em 28/07/2026: PROJETO CONCLUÍDO E NO AR.** Commits `6f68175` (vídeo) e
`6cacefd` (BTS26) deployados via CI (run 30396095773, rerun verde após timeout
SSH do runner — fail2ban provável; produção nunca ficou inconsistente).
Verificado em produção: 12 páginas com VideoObject, Rich Results Test 4/4
pilotos com "Vídeos: 1 item válido" (rabanada, poltrona-damie-e-boa,
i-wanna-sleep-cobertor-igloo-ficha-tecnica, minha-experiencia-manteiga-batida-aerada),
IndexNow 24 URLs. Nenhuma implementação em andamento — só as pendências abaixo.

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
- **Validador**: `scripts/validate-video-schema.ts`, roda dentro de
  `npm run build` (fail-closed). Cobre: URL sem ID válido, entrada faltante no
  registro, campos obrigatórios, ISO 8601, `/embed/`, assets locais existentes
  em `public/`, MP4 de review alheio, >1 primary por página, primary competindo
  com YouTube, registro órfão.

## Regra operacional para vídeo novo

1. Central/editor pode publicar `youtubeUrl` normalmente.
2. O ID novo PRECISA ganhar entrada em `videoMetadata` (título real, descrição
   exclusiva, uploadDate da publicação no YouTube, duração) — senão o build
   falha. Fonte: API do YouTube (part=snippet,contentDetails) ou manual.
3. MP4 editorial novo: entrada em `localVideoMetadata` com classificação
   explícita + poster exclusivo. Loop decorativo → `decorative` (sem schema).
4. O build nunca chama API externa.

## Pendências (nenhuma é código em andamento)

| Item | Prazo | Ação |
|---|---|---|
| **Cupom BTS26 expira** | 30/07 23:59 GMT (20:59 BRT) | Em 31/07 o build TRAVA (fail-loud por design). Remover/substituir/desativar em `src/lib/yesstyleCoupons.ts` + build + deploy. A página estática em produção NÃO expira sozinha. |
| **Bolo de cenoura** | decisão do Bruno | `content/receitas/bolo-de-cenoura-com-cobertura-de-chocolate.json` tem `youtubeUrl` apontando pro CANAL. Remover o campo ou trocar pelo vídeo certo (registrar o ID novo), **fora de operação ativa da central**, e então tirar o slug de `KNOWN_INVALID_YOUTUBE_URLS` no validador. |
| **Product snippet inválido** | backlog (chip criado) | Preexistente: `itemReviewed: Product` sem offers/review/aggregateRating → inelegível a Snippets do produto em TODOS os reviews de produto. Correção = Product top-level com review aninhado; mexe no shape do jsonLd e no validador (atualizar juntos). |
| **Search Console** | 2-7-28 dias | Acompanhar relatório de vídeos + receitas dos pilotos. |
| **Futuro opcional** | — | Páginas `/videos/[slug]` + video sitemap (só se vídeo virar frente SEO relevante). DAMIE tem sistema próprio já no ar; o `videoSchema` de lá segue permissivo de propósito — não "corrigir" sem plano. |

## Gates antes de qualquer mudança nesta área

```bash
npm run validate:video && npm run validate:content && npm run typecheck && npm run build
```

Deploy: `docs/DEPLOY-GUIDE.md` (CI GitHub Actions; nunca build Windows por scp,
nunca painel Hostinger). Após deploy: IndexNow com URLs completas.
