# Release 1: revisao da compatibilidade com next/image

## Causa confirmada no Next 16.1.4 instalado

node_modules/next/dist/server/image-optimizer.js, fetchInternalImage:
cria mocks de request/response e chama handleRequest; le o corpo retornado,
sem seguir redirects. Nao e um fetch HTTP de rede convencional. Quando o
path local devolvia 307, imageOptimizer nao encontrava bytes de imagem.

## Correcao

O mapa permanece com 304 entradas, sem alteracao de URLs ou hashes:

- 294 imagens: rewrite externo exato em beforeFiles para a URL CDN; a URL
  antiga devolve bytes, sem redirect. O otimizador interno recebe imagem.
- 10 videos: redirect temporario 307, inclusive videos sob /images.
- Classificacao pelo destino v1/image ou v1/video, nao pelo diretorio fonte.
- Nao ha catch-all nem proxy para destinos fornecidos pelo visitante.
- Escopo, escape literal e validacao do mapa continuam no helper.
- Header diagnostico proposto foi REMOVIDO: proxy Next nao o preservou no
  teste real. Nao usar esse marcador como prova de passagem pelo Next.

Isso adiciona trafego de proxy na origem para imagens pedidas pela URL antiga.
Imagens renderizadas diretamente com URL CDN nao precisam desse proxy legado.
Nao e fallback automatico de indisponibilidade: se CDN falhar, o rewrite falha;
originais locais continuam preservados mas nao substituem automaticamente a rede.

## Escopo candidato para revisao

Mesmo conjunto minimo de sete arquivos, mais este documento:

1. next.config.mjs
2. scripts/media/media-redirects.mjs
3. scripts/media/media-redirects.test.mjs
4. src/lib/media-delivery.mjs
5. scripts/media/media-delivery.test.mjs
6. src/lib/generated/media-delivery-map.json
7. scripts/media/test-legacy-media-http.mjs
8. docs/plans/2026-09-07-cdn-image-optimizer-fix.md

Diff next.config: importa mapa/helper; compoe redirects editoriais com apenas
videos; adiciona rewrites.beforeFiles para imagens. Sem headers novos.
.gitattributes permanece sem diff. Nao inclui renderizadores, artigos, vault,
package.json, uploads, manifesto, nem validacao de ausencia local da Fase 5.

## Evidencias e limites

- Testes unitarios de regras e resolvedor: 10/10; ESLint focado aprovado.
- Build final apos remover header: 323/323, TypeScript e matriz HTML aprovados.
- Suite HTTP testa todos os 304 caminhos: imagens 200 sem Location e com
  politica no-store, videos 307 para destino exato.
- Duas imagens amostradas: GET com hash igual ao original e /_next/image
  usando URL local devolvendo 200 image/* decodificavel pelo Sharp.
- Range de video preserva redirect; arquivo local nao mapeado retorna bytes
  iguais; URL inexistente continua 404.

Ensaios usam worktree integrado atual, nao snapshot isolado dos oito arquivos.
Antes de commit/deploy autorizado, repetir reconciliacao e validar candidato
isolado. Prova no stack Hostinger ainda pendente: 200 sozinho pode ser arquivo
local servido antes do Next. Exigir evidencia de encaminhamento, e se necessario
probe exato sem arquivo local, antes de aprovar exclusoes. Backup posterior ao
upload e restore isolado continuam obrigatorios para Fase 5.

Nenhum commit, deploy, alteracao remota ou exclusao nesta correcao.
