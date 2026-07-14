# Guia de Deploy — emcasacomcecilia.com

Deploy do site Next.js (SSR) na hospedagem Hostinger. O build roda **no servidor** a partir
de um archive da fonte; nunca se envia `.next/` pronto.

## ⚠️ Regras absolutas

1. **NUNCA** fazer upload manual de `.next/`. O standalone da Hostinger é customizado e
   incompatível com build local — qualquer scp de `.next/` corrompe o servidor (crash loop, 100% CPU).
2. **Deploy só via MCP, nunca pelo painel.** O painel Node.js está preso em **node 18.x** (label), e
   um "Reimplantar" pelo painel reconstrói nessa versão. Os deploys via MCP rodam **node 20** (validado).
   Deployar pelo painel = build divergente do que foi testado.
3. **Um deploy = um restart.** Cada restart (`touch tmp/restart.txt`, MCP restart, ou o próprio deploy)
   sobe um `next-server` novo **sem matar os antigos**. Restarts repetidos empilham processos até
   exaurir recursos → **503**. Ver "Recuperação de 503".
4. **Nenhum deploy em produção sem decisão explícita do Bruno** (domínio apex = maior risco).

---

## Variáveis de ambiente — vivem no PAINEL (não em arquivo)

Desde 10/07/2026 os segredos e o `NODE_OPTIONS` moram no **painel da Hostinger**
(`hPanel → Site emcasacomcecilia.com → Variáveis de ambiente`), **não** em um `.env` no servidor.
Vantagens: **persistem entre deploys** (o deploy não as apaga) e são injetadas no processo node **no
boot** — então o app já nasce saudável sem precisar de scp de `.env` nem restart manual.

Validado em prod: com **nenhum `.env`** no servidor, o processo node tem `NODE_OPTIONS` e
`YOUTUBE_API_KEY`, site 200 + vídeos populando.

| Variável | Finalidade |
|----------|-----------|
| `NODE_OPTIONS` = `--v8-pool-size=1` | **Obrigatória** — sem ela, falha de criação de thread → 503 |
| `RESEND_API_KEY` | Envio de email do formulário de contato |
| `YOUTUBE_API_KEY` | Buscar vídeos recentes do canal (seção da home) |
| `YOUTUBE_CHANNEL_ID` = `UCy2fjgwhD9x20SBe1jtN5vQ` | ID do canal (público) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-LDLH63KJMP` | GA4 (público; também vai no `.env.production`, baked em build) |

> **Referência/backup dos valores:** `~/.config/emcasa/production.env` na máquina do Bruno (fora do
> repo, nunca versionar). É a fonte de verdade do que **deve** estar no painel. Se precisar repovoar o
> painel, é de lá que se copia. Os valores originais vieram de `emcasacomcecilia/.env.local`.

---

## Fluxo completo

### 0. Editar o conteúdo em `content/`

A fonte da verdade editorial agora fica em arquivos individuais:

- `content/receitas/<slug>.json`
- `content/reviews/<slug>.json`
- `content/receitas/_manifest.json`
- `content/reviews/_manifest.json`

O `data.ts` continua existindo como camada de tipos/helpers e passa a ler o índice gerado em
`src/lib/generated/content-index.ts`. Esse índice é regenerado automaticamente a partir de `content/`
em todo `npm run build`.

Para artigo novo manual:

1. criar o `JSON` em `content/receitas/` ou `content/reviews/`
2. adicionar o `slug` no `_manifest.json` correspondente

> A posição no `_manifest.json` define a ordem nas listagens.

```bash
cd C:/Users/Bruno/Downloads/Emcasacomcecilia/emcasacomcecilia
npm run build            # gate: precisa terminar sem erro (233+ páginas)
npm run validate:content # gate: 0 inconsistências (warnings não-críticos são ok)
```

Só commitar/deployar depois que **os dois gates passam**. Commit em branch (nunca `git add -A` —
stagear só os arquivos nomeados; deixar `.bak`/`.work`, drafts não publicados e docs não-rastreados de fora).

### 1. `deploy:prepare` (local, sem impacto em produção)

```bash
npm run deploy:prepare          # build de verificação + cria o archive
# npm run deploy:prepare -- --skip-build   (se o build acabou de passar)
```

Faz o build local (pega erro antes de subir) e gera `../emcasacomcecilia-deploy.tar.gz` via
**`git archive HEAD`** com prefixo `emcasacomcecilia/` (sem o prefixo, o `resolveSettings` da
Hostinger dá HTTP 500). Consequências do `git archive` (deliberadas):

- **O archive leva EXATAMENTE o HEAD commitado** — mudança não commitada NÃO deploya (o script avisa
  se a árvore estiver suja). Commite antes de deployar.
- Untracked e gitignored (`.env*` local, `.next`, `node_modules`, artefatos de diff, `.bak`) ficam
  fora automaticamente — sem lista de excludes nem dependência do tar da plataforma (o tar.exe/bsdtar
  do Windows era inconsistente).

`.env.production` **entra** porque é rastreado de propósito — só tem `NEXT_PUBLIC_*` (GA4, baked em build time).

### 2. Deploy via MCP (sessão Claude com ferramentas Hostinger)

```
hosting_deployJsApplication
  domain: emcasacomcecilia.com
  archivePath: C:/Users/Bruno/Downloads/Emcasacomcecilia/emcasacomcecilia-deploy.tar.gz
```

Depois faz poll com `hosting_listJsDeployments` até `state: completed` (~1 min). Confirmar no
retorno que `root_directory: emcasacomcecilia` e `app_type: next`.

> **`state: completed` NÃO é validação suficiente** — o build terminou, mas o app faz cold start
> (~185s) e pode empilhar processo. Sempre rodar o passo 3.

### 3. `deploy:finish` — health-check (não muta nada)

```bash
npm run deploy:finish
```

Com o env no painel, este passo **não reinjeta `.env` nem reinicia** — só **verifica**: espera
`HTTP 200` (até 240s, cobrindo o cold start real de ~185s) → confirma que os vídeos populam (thumbnails `ytimg`,
prova de que o `YOUTUBE_API_KEY` do painel funciona) → avisa se há pilha de workers. Fail-loud se
não voltar.

> ⚠️ **O restart do deploy é COLD START (~185s de indisponibilidade), não rolling.** O site fica
> em `000`/`503` nesse intervalo — é **esperado**, não pânico. Se passar de 240s ou ficar em 503,
> ver Troubleshooting / Recuperação de 503.

### 4. IndexNow (avisar buscadores)

```bash
# No Windows/Git-Bash, passar URLs COMPLETAS (path com "/" é mutilado pelo MSYS → vira C:/Program Files/Git/...)
npm run indexnow:submit -- \
  https://emcasacomcecilia.com/ \
  https://emcasacomcecilia.com/sitemap.xml \
  https://emcasacomcecilia.com/llms.txt \
  https://emcasacomcecilia.com/<paginas-que-mudaram>
```

Pré-requisito: o key file `https://emcasacomcecilia.com/126de38625a040d1a5e45c6a08aabe46.txt` deve
retornar 200.

---

## Recuperação de 503 (processos `next-server` empilhados)

Sintoma: `curl` retorna a página 503 do LiteSpeed. Causa: restarts repetidos deixaram vários
`next-server` presos no dir do emcasa, exaurindo recursos. (Com o env no painel isso ficou raro —
só há 1 restart por deploy — mas ainda é possível.)

O MCP `hosting_restartNode_jsApplicationV1` **sozinho não resolve** (adiciona mais um processo à pilha).
A correção confiável (equivale ao stop/start do hPanel, mas cirúrgica) — **exige aprovação do Bruno**,
pois é kill de processos em host de produção compartilhado:

```bash
ssh -i ~/.ssh/id_ed25519 -p 65002 u150185510@46.202.145.2 '
TARGET="/home/u150185510/domains/emcasacomcecilia.com/nodejs"
for pid in $(pgrep -u u150185510 -f "next-server"); do
  cwd=$(readlink /proc/$pid/cwd 2>/dev/null)
  [ "$cwd" = "$TARGET" ] && kill "$pid"        # SIGTERM só nos do emcasa
done
sleep 3
for pid in $(pgrep -u u150185510 -f "next-server"); do
  cwd=$(readlink /proc/$pid/cwd 2>/dev/null)
  [ "$cwd" = "$TARGET" ] && kill -9 "$pid"      # SIGKILL nos teimosos
done
touch "$TARGET/tmp/restart.txt"                 # respawn único e limpo
'
```

> **Igualdade estrita de `cwd`** — não casa com `api.emcasacomcecilia.com` nem
> `damie.emcasacomcecilia.com`. **Nunca** matar processos desses dois. Pool saudável ≈ 1-3 workers;
> muito mais que isso = pilha. (Pelo hPanel: parar/iniciar só a app do domínio principal.)

---

## Acesso SSH

| Campo | Valor |
|-------|-------|
| Host | 46.202.145.2 |
| Porta | 65002 |
| Usuário | u150185510 |
| Chave | `~/.ssh/id_ed25519` |
| App dir | `~/domains/emcasacomcecilia.com/nodejs/` |
| Reiniciar app | `touch ~/domains/emcasacomcecilia.com/nodejs/tmp/restart.txt` |
| Logs | `tail -f ~/domains/emcasacomcecilia.com/nodejs/console.log` (e `stderr.log`) |

---

## Troubleshooting

**Site retorna 503** → se logo após um deploy, pode ser cold start (aguardar até ~2 min). Se persistir:
(a) checar `NODE_OPTIONS=--v8-pool-size=1` nas Variáveis de ambiente do painel; (b) ver "Recuperação
de 503" (pilha de processos).

**"Últimos vídeos" sem thumbnails** → `YOUTUBE_API_KEY` ausente no painel, inválida ou sem quota.
Conferir a var no painel e testar a chave na API do YouTube.

**Formulário de contato não envia** → `RESEND_API_KEY` ausente no painel.

**`resolveSettings` HTTP 500** → archive criado de dentro do projeto (sem prefixo `emcasacomcecilia/`).
Recriar com `deploy:prepare` (que já faz da pasta PAI).

**Site sem CSS/JS** → BUILD_ID mismatch. Deploy limpo via MCP; nunca corrigir com scp.

**Build saiu em node 18 / comportamento estranho** → deploy foi disparado pelo painel. Sempre via MCP
(node 20). Ver Regra 2.

**`deploy:finish` fica em `http 000` mesmo com o site no ar** → o domínio anuncia AAAA (IPv6); em
máquina sem rota IPv6 até a Hostinger o `fetch` nativo do Node tentava IPv6 e dava 000 (o `curl` usa
IPv4 e funciona). Corrigido no `finish.mjs` com `dns.setDefaultResultOrder('ipv4first')`. Se voltar a
aparecer em outro script que faz `fetch` (ex.: futuro), aplicar a mesma linha. A mensagem de falha
agora mostra o `motivo:` (ENETUNREACH = rede/IPv6; ECONNREFUSED/RESET = cold start, é só esperar).

**IndexNow enviou `.../C:/Program Files/Git/...`** → passou path com `/` no Git-Bash. Usar URLs
completas (`https://...`).
