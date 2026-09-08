# Runbook de recuperacao CDN

## Escopo e limites

Este runbook trata a biblioteca CDN como entrega, nao como backup independente.
O original canonico deve estar no Git e no disco local; staging externo e copia
operacional adicional. Backup nativo do provedor e restore continuam sem prova.
Nao declarar recuperacao concluida apenas por existir manifesto, SHA, recibo FTPS
ou historico de build.

Nenhum passo abaixo faz commit, upload, build, purge ou deploy automaticamente.
Executar sempre a partir de uma clone limpa, fixada no SHA solicitado, e registrar
os comandos, hashes, respostas HTTP e decisoes de aprovacao.

## Original ausente no CDN

1. Obter uma clone Git limpa fixada no commit que contem o original canonico e
   conferir `git status --short` vazio. Nao recuperar de `public/` de uma arvore
   nao auditada nem de um archive sem a prova do SHA.
2. Conferir no manifesto o `source_path`, `sha256`, `bytes`, MIME, `remote_key` e
   `remote_url`. Conferir o blob Git do SHA fixado e o hash/bytes extraidos.
3. Fazer dry-run do uploader para o caminho canonico. Reupload somente com a
   identidade imutavel esperada:

   ```powershell
   python scripts/media/upload-ftps.py --manifest data/media-manifest.json --asset public/images/EXEMPLO.webp
   python scripts/media/upload-ftps.py --manifest data/media-manifest.json --asset public/images/EXEMPLO.webp --execute --report recovery-upload.json
   ```

   Sem `--staging-root`, o uploader usa a copia Git-backed em `public/`. O
   uploader rejeita colisao divergente e nunca sobrescreve cegamente um objeto
   corrompido. Um objeto remoto divergente exige intervencao aprovada para
   quarentena/purge; nao apagar, substituir ou repetir o upload as cegas.
4. Repetir a verificacao HTTPS independente para o asset, incluindo GET completo,
   MIME, tamanho e SHA; para video/audio, conferir os Ranges 206 e o Range invalido
   416 sem cache imutavel. So depois de `verification_status=verified` a entrada
   pode continuar para append/export.
5. Confirmar o mapa, a allowlist e o archive candidato antes de qualquer release.

## CDN corrompido ou objeto divergente

Nao usar o upload idempotente como ferramenta de reparo destrutivo. A mesma chave
com bytes diferentes deve permanecer bloqueada. Preservar o recibo, a resposta
MLST/hash e o hash Git; abrir intervencao aprovada para colocar o objeto divergente
em quarentena ou removê-lo no provedor e somente entao reupar o blob correto.

Purge, quarentena, troca de chave ou remapeamento exigem aprovacao explicita. Depois
da intervencao, repetir GET, SHA, MIME e Ranges e registrar a causa, o operador e a
janela de mudanca. Nao mudar `source_path`, nome ou chave para esconder uma
divergencia ja existente; revisoes editoriais usam novo nome versionado.

## CDN indisponivel

O site nao faz fallback automatico de uma URL CDN falha para o original local.
Primeiro classificar a indisponibilidade por origem, DNS, TLS, HTTP, cache, Range ou
provedor e coletar evidencias sem alterar mapa nem allowlist.

Se a decisao for voltar a servir localmente, coordenar explicitamente:

- o mapa de entrega e as entradas afetadas;
- as regras `export-ignore` correspondentes;
- os rewrites/redirects gerados e consumidores de URL CDN;
- URLs legadas do optimizer e referencias antigas que ainda apontam para o CDN;
- o teste de integracao, HTML renderizado, sitemap e llms.

Essa transicao exige uma allowlist temporaria e revisada em
`scripts/media/local-fallback-media.json`, no formato `source_path -> SHA-256`.
Cada entrada precisa continuar no manifesto com o mesmo hash, sair do mapa de
entrega e voltar ao archive com os bytes Git-backed exatos. O gate do archive
rejeita qualquer caminho/hash diferente. Nao adicionar diretorios, wildcards ou
arquivos sem identidade ao arquivo de fallback e remove-lo depois da normalizacao.

Remover uma entrada do mapa ou da allowlist e uma mudanca de release, nao um
hotfix local. O archive deve ser medido novamente: o alerta e **47.000.000 bytes**
e o bloqueio e **49.000.000 bytes**. O fallback completo da biblioteca pode exceder
o limite; nesse caso, nao publicar um pacote truncado ou presumir que o provider
aceitara 50 MB.

## Primeiro release e recuperacao Git

Os 304 originais legados foram testados por restore local a partir do Git e o
primeiro-release fixture confirma que um novo asset pode ter original Git-backed,
ser excluido do archive por allowlist exata e continuar validavel no release
seguinte. Isso prova Git/archive e nao prova backup nativo, restore no Hostinger
ou recuperacao independente do CDN.

Antes de preparar novo deploy:

```powershell
git status --short
git rev-parse --verify HEAD^{commit}
node scripts/media/phase5-export.mjs --check
node scripts/media/candidate-proof.mjs
npm run deploy:prepare
```

O ultimo comando exige que o blob do target SHA para cada asset mapeado corresponda
ao manifesto e bloqueia blob ausente/divergente. Fazer staging Git por caminhos
explicitos do original, manifesto/mapa, `.gitattributes` e metadados; nunca usar
`git add .` ou `git add -A`. Nao executar commit ou deploy como parte da recuperacao.
