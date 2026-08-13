# Guia de Deploy — emcasacomcecilia.com

> **Estado operacional desde 13/08/2026:** não existe workflow de deploy executável neste
> repositório. `hostinger-wire-probe.yml` aceita somente `CAPTURE_ONLY`, usa o environment
> `production-observe` e não contém build, archive ou dispatch. O antigo fluxo SSH foi movido para
> `docs/deploy-ssh-inactive.yml`, fora de `.github/workflows/`, porque operava no diretório inativo
> `domains/.../nodejs`. Deploy temporário é somente pelo mecanismo gerenciado da Hostinger, com
> decisão e execução supervisionadas pelo Bruno, até a aprovação do G1.
>
> **Postura de recuperação confirmada em 11/08/2026:** o wire gerenciado não oferece rollback
> documentado nem retém outro `hbuild` executável no host. O histórico da API preserva registros
> de build, não uma operação de reativação. Existe um pacote standalone legado íntegro de
> `4a6eae0` em `releases/`, mas restaurá-lo seria uma contingência SSH manual ainda não ensaiada,
> não rollback do fluxo gerenciado. Não reintroduzir dispatch no probe supondo volta automática.

**Fluxo SSH legado (desde 16/07/2026; não executável)** — o arquivo `docs/deploy-ssh-inactive.yml`
builda no runner (Linux, node 20, mesmo SO/glibc do host), monta o standalone e entrega por
`scp`+`ssh` na porta 65002 (conexão direta ao host, **fora do Cloudflare**), com swap atômico,
purge de CDN, health-check rico e auto-rollback. Provado no apex em 16/07 (runs 29471822605/29519794282).

O fluxo antigo (build gerenciado da Hostinger via MCP) fica documentado no fim como **fallback**.

## ⚠️ Regras absolutas

1. **NUNCA subir um build feito no Windows.** A causa raiz do velho "scp corrompe o servidor" era o
   `sharp` (binário nativo) compilado pra plataforma errada. O CI builda em `ubuntu-22.04` (x64,
   glibc compatível com o host 2.34 — o workflow **verifica** isso por `objdump`). Build local
   Windows + scp manual continua PROIBIDO.
2. **Usar somente o build gerenciado comprovado da Hostinger**, com source archive, identidade e attestation.
   Não usar SSH/swap no diretório inativo nem presumir que um simples restart publica conteúdo novo.
3. **Um deploy por vez.** Os workflows compartilham o lock `emcasa-production`, com
   `cancel-in-progress: false`; não dispare dois. Restart manual descontrolado ainda empilha
   `next-server` → 503 (ver Recuperação de 503).
4. **Nenhum deploy em produção sem decisão explícita do Bruno** (domínio apex).

---

## Como deployar

### Deploy temporário — mecanismo gerenciado supervisionado

Não há comando de GitHub Actions autorizado para deploy. O operador usa o mecanismo gerenciado da
Hostinger de forma supervisionada e registra SHA, `deploy_uuid`, build UUID, estado terminal e
attestation pública. O G1 futuro só poderá declarar sucesso quando exigir simultaneamente:

1. build Hostinger em estado `completed`;
2. `/api/release` com SHA e UUID exatos;
3. `/_next/static/<sha>/_buildManifest.js` acessível.

O Gate 1 mede cedo uma reconstrução da árvore commitada, usando a mesma forma de archive do
`deploy:prepare`, e falha a partir de **45.000.000 bytes**. Isso é alerta preventivo, não prova do
artefato enviado. O G1 definitivo deve executar `check:archive-size` sobre o **archive final exato**,
depois de inserir sua identidade e imediatamente antes do upload. Em resposta ambígua ao POST, deve
paginar o inventário do provider e reconciliar por `archive_name` exato antes de qualquer repetição;
zero ou múltiplas correspondências permanecem fail-loud.

Estado terminal do provider não basta. Declarar o release saudável exige também série pública estável,
smoke de conteúdo e inventário de todos os workers via `CAPTURE_ONLY`. O marco da medição é a
convergência desses sinais, não o dispatch.

### Inspeção somente leitura

O environment `production-observe` exige aprovação de `brunollds`, não permite bypass administrativo e
aceita somente a branch `main`. Ele precisa continuar protegido antes de qualquer execução.
Como `prevent_self_review=false`, o único operador pode aprovar o próprio dispatch. Esse controle é um gate
de ação deliberada e auditável, não segregação de funções nem aprovação independente por segunda pessoa.

```bash
gh workflow run hostinger-wire-probe.yml \
  --repo brunollds/emcasacomcecilia-main --ref main \
  -f confirm=CAPTURE_ONLY
```

### Central editorial — deploy temporariamente suspenso

Publicar reviews pela central (`https://central.emcasacomcecilia.com/reviews`) → eles ficam
"publicado (aguardando deploy)". Não usar o botão **"Deployar agora"** enquanto ele apontar para
o workflow SSH suspenso. O deploy temporário exige operação supervisionada diretamente pelo mecanismo
gerenciado da Hostinger; este guia não fornece comando automatizado enquanto o G1 estiver bloqueado.

### Fluxo SSH legado — suspenso

Não existe comando executável. O YAML histórico está em `docs/deploy-ssh-inactive.yml` somente para auditoria.

### O que o workflow SSH legado fazia (na ordem)

1. `npm ci` + `npm run build` (gera o índice de conteúdo + `next build` com `output: 'standalone'`)
2. Monta o pacote (standalone + `.next/static` + `public/` + `.env.production`) e **valida**:
   server.js, BUILD_ID, sharp-linux-x64/libvips presentes, glibc ≤ 2.34 (objdump)
3. scp do tar pra `~/domains/emcasacomcecilia.com/releases/<sha>.tar.gz` → extrai em staging → valida
4. Backup: `stat` do dir atual + cópia do `.htaccess` em `~/domains/.../backups/`
5. **Mata os `next-server` do emcasa** (cwd estritamente igual ao app dir — nunca toca `api.`/`damie.`),
   fail-closed (aborta se sobrar worker)
6. **Swap atômico**: `mv nodejs → nodejs.prev-<sha>` + `mv staging → nodejs` + `touch tmp/restart.txt`
   (recovery embutido: se o swap/restart falhar, restaura o anterior sozinho)
7. **Purge do CDN** (`DELETE /cache/clear` na API da Hostinger)
8. **Health-check**: 200 + attestation dinâmica do SHA novo (até 420s, sem depender de HTML retido na CDN) →
   `_buildManifest.js` 200 → `/_next/image` 200 (prova o sharp) → rotas `/receitas /reviews /sobre
   /contato /sitemap.xml /llms.txt` 200 → vídeos (warning se não populados) → após 5 min, workers ≤ 6
9. Falhou depois do swap? **auto-rollback** restaura `nodejs.prev-<sha>` e espera o 200 voltar
10. Sucesso: poda backups antigos (retém os 3 últimos `nodejs.prev-*`/`nodejs.bad-*`/archives)

### Depois do deploy: IndexNow (manual)

```bash
# URLs COMPLETAS (path com "/" é mutilado pelo MSYS no Git-Bash)
npm run indexnow:submit -- \
  https://emcasacomcecilia.com/ \
  https://emcasacomcecilia.com/sitemap.xml \
  https://emcasacomcecilia.com/llms.txt \
  https://emcasacomcecilia.com/<paginas-que-mudaram>
```

---

## Secrets do repo GitHub (Settings → Secrets → Actions)

| Secret | O quê |
|---|---|
| `HOSTINGER_SSH_KEY` | chave privada dedicada de CI (a `damie-ci-deploy`; pubkey autorizada no host via hPanel) |
| `HOSTINGER_KNOWN_HOSTS` | host key pinada de `[46.202.145.2]:65002` (`ssh-keyscan`) |
| `HOSTINGER_API_TOKEN` | token da API da Hostinger (purge de cache) |

**Como setar sem corromper** (lições de 16/07): pubkey no host **via hPanel → Acesso SSH → importar**
(o pipe `Get-Content \| ssh "cat>>"` do PowerShell injeta CRLF e corrompe); secrets **via
`gh secret set NOME --repo ... < arquivo`** no Git Bash (clipboard do Windows corrompe a private key
→ `error in libcrypto` no runner).

## Variáveis de ambiente do APP — vivem no PAINEL (não em arquivo)

Inalterado desde 10/07: os segredos do runtime moram no hPanel (`Site → Variáveis de ambiente`),
injetados no boot — **sobrevivem ao deploy** (o swap do `nodejs/` não os toca).

| Variável | Finalidade |
|----------|-----------|
| `NODE_OPTIONS` = `--v8-pool-size=1` | **Obrigatória** — sem ela, falha de thread → 503 |
| `RESEND_API_KEY` | formulário de contato |
| `YOUTUBE_API_KEY` / `YOUTUBE_CHANNEL_ID` | vídeos da home |
| `PREVIEW_TOKEN` | rota /api/preview (central) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-LDLH63KJMP` | GA4 (também baked em build via `.env.production`) |

> Backup dos valores: `~/.config/emcasa/production.env` na máquina do Bruno (fora do repo).

## Editar conteúdo

Fonte da verdade: `content/{receitas,reviews}/<slug>.json` + `_manifest.json` (posição = ordem nas
listagens). O índice `src/lib/generated/content-index.ts` é regenerado em todo build. Gates antes de
commitar conteúdo manual:

```bash
npm run build            # sem erro (248+ páginas)
npm run validate:content # 0 inconsistências (warnings não-críticos ok)
```

Nunca `git add -A`. **O CI deploya a `main`** — conteúdo tem que estar commitado E pushado.

---

## Rollback

> Esta seção descreve **somente o fluxo SSH legado**, hoje suspenso. Ela não se aplica ao wire
> gerenciado de `hostinger-wire-probe.yml`. Nesse wire, uma falha após o dispatch não aciona
> rollback automático e a API documentada não expõe promoção ou reativação de build anterior.

O workflow já faz auto-rollback quando o health-check reprova. Rollback MANUAL (ex.: problema
percebido depois do run verde) — < 2 min:

```bash
ssh -i ~/.ssh/id_ed25519 -p 65002 u150185510@46.202.145.2 '
ROOT=/home/u150185510/domains/emcasacomcecilia.com
ls -d $ROOT/nodejs.prev-*            # escolher o <sha> anterior
# matar os workers do emcasa (igualdade estrita de cwd) e trocar:
for pid in $(pgrep -u u150185510 -f next-server); do
  [ "$(readlink /proc/$pid/cwd 2>/dev/null)" = "$ROOT/nodejs" ] && kill $pid; done
sleep 3
mv $ROOT/nodejs $ROOT/nodejs.bad-manual && mv $ROOT/nodejs.prev-<sha> $ROOT/nodejs
mkdir -p $ROOT/nodejs/tmp && touch $ROOT/nodejs/tmp/restart.txt'
```

## Recuperação de 503 (processos `next-server` empilhados)

Sintoma: página 503 do LiteSpeed. Causa: restarts repetidos empilharam `next-server`. (O deploy CI
mata os antigos antes do swap, então isso ficou raro.) Correção cirúrgica — **exige aprovação do
Bruno** (kill em host de produção compartilhado):

```bash
ssh -i ~/.ssh/id_ed25519 -p 65002 u150185510@46.202.145.2 '
TARGET="/home/u150185510/domains/emcasacomcecilia.com/nodejs"
for pid in $(pgrep -u u150185510 -f "next-server"); do
  cwd=$(readlink /proc/$pid/cwd 2>/dev/null)
  [ "$cwd" = "$TARGET" ] && kill "$pid"
done
sleep 3
for pid in $(pgrep -u u150185510 -f "next-server"); do
  cwd=$(readlink /proc/$pid/cwd 2>/dev/null)
  [ "$cwd" = "$TARGET" ] && kill -9 "$pid"
done
touch "$TARGET/tmp/restart.txt"'
```

> **Igualdade estrita de `cwd`** — nunca casa com `api.emcasacomcecilia.com` nem
> `damie.emcasacomcecilia.com`. Pool saudável ≈ 1-4 workers.

## Acesso SSH

| Campo | Valor |
|-------|-------|
| Host / porta / usuário | `46.202.145.2` / `65002` / `u150185510` |
| Chave (Bruno) | `~/.ssh/id_ed25519` · CI usa `damie-ci-deploy` |
| App dir | `~/domains/emcasacomcecilia.com/nodejs/` |
| Releases/backups | `~/domains/emcasacomcecilia.com/{releases,backups,nodejs.prev-*}` |
| Logs | `tail -f ~/domains/emcasacomcecilia.com/nodejs/console.log` (e `stderr.log`) |

---

## Troubleshooting

**Run vermelho no passo "Assemble/validate"** → nada tocou produção (fail-closed no runner). Ler o
log do step; ex. histórico: asserção de runner-path era falso-positivo (removida — o standalone
embute o cwd de build em `outputFileTracingRoot`, inócuo em runtime).

**Run vermelho DEPOIS do swap** → o auto-rollback restaurou o release anterior (conferir site 200).
Ver o step que falhou; o site fica no build anterior até novo deploy.

**Site 503 pós-deploy** → cold start (~185s) é esperado; o health-check espera até 420s. Persistiu:
(a) `NODE_OPTIONS=--v8-pool-size=1` no painel? (b) Recuperação de 503.

**"Últimos vídeos" sem thumbnails** → `YOUTUBE_API_KEY` ausente/sem quota (o health-check só avisa,
não derruba o deploy).

**Site sem CSS/JS (BUILD_ID mismatch)** → redeploy limpo via CI. Nunca corrigir com scp parcial.

**Usuários vendo versão antiga** → o workflow purga o CDN; HTML tem `s-maxage=300` — até 5 min de
stale é normal. A attestation do deploy não depende desse cache. Persistiu: purge manual no hPanel
(Performance → Clear Cache).

**Dispatch falha com 403** → o token usado (central: `EMCASA_GIT_TOKEN`) precisa de
**Actions: read and write** no repo, além de Contents.

---

## Fallback legado — deploy via MCP (build gerenciado da Hostinger)

Só se o CI estiver indisponível. `npm run deploy:prepare` (archive com prefixo `emcasacomcecilia/`
via git archive) → MCP `hosting_deployJsApplication` (poll `hosting_listJsDeployments` até
`completed`) → `npm run deploy:finish` (health-check 240s + vídeos). Detalhes/pegadinhas: histórico
do git deste guia (versão de 15/07). Pontos que continuam valendo: `state: completed` não é validação
suficiente; painel = node 18 (não usar); env vive no painel.

### Retenção e recuperação do wire gerenciado

A captura somente leitura do run `31517447965` inventariou os dois lados sem alterar produção:

- a API devolveu os **70/70 registros históricos de build**, em duas páginas;
- o host manteve **um único `hbuild` executável**, o atualmente servido;
- a API pública documenta listar/criar builds, ler logs e reiniciar o servidor, mas não documenta
  endpoint para promover, reativar ou restaurar um build histórico;
- `~/domains/emcasacomcecilia.com/releases/` ainda contém cinco pacotes standalone do fluxo SSH,
  inclusive `4a6eae05bf016ade01743c365d4fa10ba18d1652.tar.gz`.

O pacote de `4a6eae0` passou em `gzip -t`, contém `server.js`, `.next/BUILD_ID` e
`release-meta.json`, e tem SHA-256
`d0e8131d49c00e4a3e4580b19e6f8f0ce44c36f2812f42619d6a368d242df1c1`.
Isso prova integridade e presença dos arquivos essenciais; **não prova restaurabilidade**. O pacote
é um standalone grande do fluxo SSH, não um source archive compatível com o build gerenciado, e o
procedimento de restaurá-lo sobre o runtime atual nunca foi testado.

Classificação operacional:

1. **Rollback gerenciado:** indisponível pela interface documentada.
2. **Recuperação por novo dispatch:** disponível, mas segue somente para frente.
3. **Contingência SSH com `4a6eae0`:** material existe e está íntegro; execução e verificação ainda
   precisam de runbook próprio e autorização explícita de produção.

Até esse runbook ser provado fora de uma emergência, tratar qualquer deploy gerenciado como uma mudança
sem rollback operacional garantido. Histórico de build não deve ser chamado de backup, e pacote
íntegro não deve ser chamado de rollback pronto.

### Primeiro release atestado pelo wire

O run `31520415657` falhou antes do dispatch porque o source archive tinha `50.220.575` bytes.
O commit `c41e914` adicionou `export-ignore` para documentação, workflows e o
`content-index.ts` regenerável; nenhum arquivo de runtime ou mídia foi removido. O archive efetivo
do run seguinte ficou em `49.784.149` bytes.

O run `31521080009` concluiu em 11/08/2026:

- SHA: `c41e914c78a01e4671adb3fe19c9effc7265a50e`;
- deploy UUID: `4a8b7437-3a7d-4354-a6ee-7e715d87e105`;
- build UUID Hostinger: `019ff203-a971-703e-8b82-e431332a4975`;
- estados observados: `pending → running → completed`;
- primeiro SHA/UUID novo observado publicamente: `15:11:04 BRT`;
- workflow verde: `15:11:13 BRT`.

O `CAPTURE_ONLY` pós-deploy `31521484469` registrou dois workers, ambos no mesmo hbuild e com
`BUILD_ID=c41e914...`; o manifesto público do mesmo ID respondeu 200. Uma série adicional teve
10/10 respostas exatas entre `15:13:36` e `15:14:06 BRT`. O release foi declarado saudável e o
marco zero do funil foi fixado conservadoramente em **11/08/2026 15:14:06 BRT**.
