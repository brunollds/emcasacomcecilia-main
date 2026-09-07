# Guia de midia editorial

## Arquitetura atual

Biblioteca: https://cdn.emcasacomcecilia.com, addon Web/Cloud independente.
Root: /home/u150185510/domains/cdn.emcasacomcecilia.com/public_html.
Nao usar public_html/cdn-media do site principal nem alterar media.emcasacomcecilia.com,
que pertence ao coletor na VPS.

Fase 5 publicada em 07/09/2026 no commit
`132571e449883e31600d2dfa88f90bdfd7c29d65`: 333 objetos enviados/verificados,
304 referencias ativas e excluidas apenas do archive por lista exata. Originais
preservados no Git e no disco. Pacote atestado: 4.778.762 bytes. Backup nativo
pos-upload e restore continuam sem comprovacao; nao declarar essa pendencia fechada.

Upload por FTPS explicito, TLS validado e PROT P, com conta restrita ao addon.
O script configura o hostname TLS comprovado do servico. Nao usar FTP simples,
desativar validacao de certificado ou expor FTP_CDNUPLOAD (em .env.local).
Cache publico: no-store, no-transform, inclusive erros de Range. Custo aceito;
nao reintroduzir immutable sem testar 200, 206 e 416 no servidor real.

## Contrato editorial

1. Comprimir antes de inventariar, preservando proporcao, alpha e legibilidade.
   Extensao deve corresponder ao MIME real; renomear JPEG nao o converte em WebP.
2. Guardar a midia otimizada em public/images ou public/videos. Para revisar
   uma midia ja ativada, usar novo nome versionado.
3. Manter caminhos locais nos JSONs, como /images/reviews/marca/hero-v2.webp.
   Nao reescrever artigos com URLs CDN nem alterar chaves de localVideoMetadata
   ou videoPages. O resolvedor aplica o mapa exato somente na entrega.
4. Preencher alt, legenda e contexto; registrar origem, licenca e autoria na
   memoria editorial. Esses campos nao sao gerados automaticamente pelo manifesto.
5. Upload, verificacao HTTPS, ativacao da referencia e deploy sao etapas distintas.
   Nenhuma altera draft, isNew, datas ou a lista de publicados.

URL sem entrada no mapa continua local. Isso NAO e fallback automatico por falha
do CDN: o navegador nao tenta o original local quando uma URL remota falha.
Reverter referencias exige novo release. Uma imagem compartilhada e resolvida
por arquivo, nao apenas na pagina que motivou o upload.

## Rotina de nova imagem ou video

Um operador por vez no worktree compartilhado. Nao alterar manifesto/mapa em
paralelo. Substituir o caminho de exemplo abaixo pelo arquivo real.

### 1. Inventario incremental

```powershell
node scripts/media/inventory.mjs --merge --stdout
node scripts/media/inventory.mjs --merge --out data/media-manifest.json
```

Preservar provas apenas para identidades intactas. Novos/alterados exigem nova
verificacao. Sem --merge, o inventario reinicia estados; nao usar essa forma na
rotina editorial. Nunca editar verification_status manualmente.

### 2. Preflight e upload

```powershell
python scripts/media/upload-ftps.py --asset public/images/reviews/marca/hero-v2.webp
python scripts/media/upload-ftps.py --asset public/images/reviews/marca/hero-v2.webp --execute --report data/media-upload-hero-v2.json
```

O primeiro comando nao envia. O segundo escreve somente no addon. Repetir
--asset para um lote pequeno. Chaves usam SHA-256; bytes divergentes nao podem
sobrescrever a mesma chave. Em falha, inspecionar recibo e lock: nao repetir
cegamente nem remover lock automaticamente.

### 3. Verificacao publica independente

```powershell
node scripts/media/verify-remote.mjs --asset public/images/reviews/marca/hero-v2.webp --write
```

Exigir GET sem query, MIME, tamanho e SHA-256. Videos tambem exigem Range 206
consistente e Range invalido 416 sem cache imutavel. Recibo FTPS nao substitui
essa verificacao HTTPS.

### 4. Acrescentar ao mapa

```powershell
node scripts/media/prepare-delivery.mjs --append --asset public/images/reviews/marca/hero-v2.webp
node scripts/media/prepare-delivery.mjs --append --asset public/images/reviews/marca/hero-v2.webp --write
```

Primeiro dry-run, depois escrita em src/lib/generated/media-delivery-map.json.
Append exige mapa anterior valido, preserva entradas e rejeita remapeamento
conflitante. Nao usar substituicao de mapa para adicionar uma midia.
Candidatos nao selecionados nao devem bloquear um artigo independente.
Nao adivinhar URLs por prefixo nem ativar pastas inteiras automaticamente.

### 5. Gates e release

```powershell
npx tsx scripts/media/test-delivery-integration.ts
npm run typecheck
npm run validate:content
npm run validate:video
npm run lint
npm run build
node scripts/media/test-review-delivery-html.mjs
```

Conferir artigo, hero, inline, ampliacao, cards e mobile. Listagens cliente
precisam de verificacao apos hidratacao. Validadores continuam usando arquivos
locais na verificacao pre-release. No build do pacote, o validador de video
aceita ausencia local somente com prova verificada coerente com manifesto/mapa.

Antes de commitar: reconciliar arvore compartilhada e fazer staging por caminhos
explicitos, nunca git add . ou git add -A. Incluir somente o escopo revisado,
manifesto/mapa e evidencias pertinentes, sem credenciais.
Publicar apenas com autorizacao do Bruno, seguindo DEPLOY-GUIDE.md.

Depois do deploy real, conferir identidade do release, conteudo e midias publicas,
sitemap e llms. IndexNow so depois: enviar URLs editoriais afetadas, nao tratar
o upload de arquivos como publicacao de artigo.

## Videos e audio

Loops preservam poster, lazy loading, muted, loop, playsInline, pausa fora da
viewport e movimento reduzido. Nao substituir por autoplay fixo no HTML.

Audio editorial curto esta planejado, mas nao faz parte da entrega atual
(imagem/video). Estender contrato, verificador, componente e testes antes do
primeiro audio; nao prometer suporte pronto nem improvisar uma URL.

## Backup e exclusao

Manter originais inclusive para artigos novos ate confirmar backup recuperavel.
CDN nao equivale a backup historico independente. Copia na mesma maquina nao
comprova recuperacao remota.

As 304 exclusoes exatas foram publicadas sob decisao de Bruno de nao esperar o
backup nativo; Claude nao dispensou esse gate. Recuperacao dos originais pelo
Git e build/URLs sem os arquivos no pacote foram testados. Isso nao autoriza
git rm nem exclusoes por diretorio.

O gate `node scripts/media/phase5-export.mjs --check` esta congelado em 304
entradas. Uma nova referencia via --append NAO atualiza export-ignore e faz esse
gate exigir revisao do contrato (contagens e bytes), da lista exata e novo ensaio
de pacote. Nao reduzir validacoes para passar nem prometer exclusao automatica.
Reverter somente export-ignore tambem nao desativa o mapa de entrega CDN.

Deploy gerenciado e archive atestado permanecem inalterados: aviso em
47.000.000 bytes, bloqueio em 49.000.000 bytes. Medir o archive final, nao deduzir
economia pelo tamanho total da biblioteca.

Monitoramento ativo e teste de alerta continuam pendentes. Bruno e
brunollds@icloud.com sao responsavel/contato definidos, nao prova de alerta ativo.
