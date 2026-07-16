# Guia de Deploy — emcasacomcecilia.com

**Método vigente (desde 16/07/2026): GitHub Actions** — o workflow `.github/workflows/deploy.yml`
builda no runner (Linux, node 20, mesmo SO/glibc do host), monta o standalone e entrega por
`scp`+`ssh` na porta 65002 (conexão direta ao host, **fora do Cloudflare**), com swap atômico,
purge de CDN, health-check rico e auto-rollback. Provado no apex em 16/07 (runs 29471822605/29519794282).

O fluxo antigo (build gerenciado da Hostinger via MCP) fica documentado no fim como **fallback**.

## ⚠️ Regras absolutas

1. **NUNCA subir um build feito no Windows.** A causa raiz do velho "scp corrompe o servidor" era o
   `sharp` (binário nativo) compilado pra plataforma errada. O CI builda em `ubuntu-22.04` (x64,
   glibc compatível com o host 2.34 — o workflow **verifica** isso por `objdump`). Build local
   Windows + scp manual continua PROIBIDO.
2. **Nunca deployar pelo painel da Hostinger** (Node.js app → "Reimplantar"): reconstrói em node 18
   e diverge do testado.
3. **Um deploy por vez.** O workflow tem `concurrency` lock; não dispare dois. Restart manual
   descontrolado ainda empilha `next-server` → 503 (ver Recuperação de 503). O workflow faz o
   restart LIMPO sozinho (mata os workers do emcasa antes do swap).
4. **Nenhum deploy em produção sem decisão explícita do Bruno** (domínio apex).

---

## Como deployar

### Caminho normal — central editorial

Publicar reviews pela central (`https://central.emcasacomcecilia.com/reviews`) → eles ficam
"publicado (aguardando deploy)" → botão **"Deployar agora"** dispara o workflow e acompanha o run
("ver run" abre o Actions). No sucesso os reviews viram `deployed`. (~10-15 min; o site pisca ~2 min
no restart.)

### Caminho manual — gh CLI

```bash
# conteúdo já commitado + pushado na main (o CI builda a MAIN, não a árvore local!)
gh workflow run "Deploy emcasa (manual)" --repo brunollds/emcasacomcecilia-main --ref main \
  -f confirm=DEPLOY -f auto_rollback=true
gh run watch --repo brunollds/emcasacomcecilia-main --exit-status <run-id>
```

### O que o workflow faz (na ordem)

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
8. **Health-check**: 200 + BUILD_ID novo servido (até 240s, cobre cold start ~185s) →
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

**Site 503 pós-deploy** → cold start (~185s) é esperado; o health-check espera 240s. Persistiu:
(a) `NODE_OPTIONS=--v8-pool-size=1` no painel? (b) Recuperação de 503.

**"Últimos vídeos" sem thumbnails** → `YOUTUBE_API_KEY` ausente/sem quota (o health-check só avisa,
não derruba o deploy).

**Site sem CSS/JS (BUILD_ID mismatch)** → redeploy limpo via CI. Nunca corrigir com scp parcial.

**Usuários vendo versão antiga** → o workflow purga o CDN; HTML tem `s-maxage=300` — até 5 min de
stale é normal. Persistiu: purge manual no hPanel (Performance → Clear Cache).

**Dispatch falha com 403** → o token usado (central: `EMCASA_GIT_TOKEN`) precisa de
**Actions: read and write** no repo, além de Contents.

---

## Fallback legado — deploy via MCP (build gerenciado da Hostinger)

Só se o CI estiver indisponível. `npm run deploy:prepare` (archive com prefixo `emcasacomcecilia/`
via git archive) → MCP `hosting_deployJsApplication` (poll `hosting_listJsDeployments` até
`completed`) → `npm run deploy:finish` (health-check 240s + vídeos). Detalhes/pegadinhas: histórico
do git deste guia (versão de 15/07). Pontos que continuam valendo: `state: completed` não é validação
suficiente; painel = node 18 (não usar); env vive no painel.
