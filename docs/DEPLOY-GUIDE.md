# Guia de Deploy — emcasacomcecilia.com

Deploy do site Next.js (SSR) na hospedagem Hostinger. O build roda **no servidor** a partir
de um archive da fonte; nunca se envia `.next/` pronto.

## ⚠️ Regras absolutas

1. **NUNCA** fazer upload manual de `.next/`. O standalone da Hostinger é customizado e
   incompatível com build local — qualquer scp de `.next/` corrompe o servidor (crash loop, 100% CPU).
2. **Um `deploy:finish` por deploy.** Cada restart (`touch tmp/restart.txt` ou MCP restart)
   sobe um `next-server` novo **sem matar os antigos**. Rodar `finish` repetido empilha processos
   até exaurir recursos → **503**. Se precisar recuperar, veja "Recuperação de 503" abaixo.
3. **Nenhum deploy em produção sem decisão explícita do Bruno** (domínio apex = maior risco).
4. Segredos ficam **fora do repositório** (arquivo gerenciado, ver abaixo). Nunca colar valores
   em docs, código ou chat.

---

## Fluxo completo

### 0. Editar o conteúdo do artigo (`src/lib/data.ts`)

Todo o conteúdo (receitas, reviews, FAQs) vive em `src/lib/data.ts` — é a fonte da verdade.
Ao editar:

```bash
cd C:/Users/Bruno/Downloads/Emcasacomcecilia/emcasacomcecilia
npm run build            # gate: precisa terminar sem erro (233+ páginas)
npm run validate:content # gate: 0 inconsistências (warnings não-críticos são ok)
```

Só commitar/deployar depois que **os dois gates passam**. Commit em branch (nunca `git add -A` —
stagear só os arquivos nomeados; deixar `.bak`/`.work` e docs não-rastreados de fora).

### 1. `deploy:prepare` (local, sem impacto em produção)

```bash
npm run deploy:prepare          # build de verificação + cria o archive
# npm run deploy:prepare -- --skip-build   (se o build acabou de passar)
```

Faz o build local (pega erro antes de subir) e gera `../emcasacomcecilia-deploy.tar.gz` — archive
da **pasta PAI** com prefixo `emcasacomcecilia/` (senão o `resolveSettings` da Hostinger dá HTTP 500).
Já exclui `.next`, `node_modules`, `.git`, `.claude`, `.qwen`, `.env`/`.env.local`, e lixo de edição
(`.bak/.work/.orig/.rej`). Usa `--force-local` no tar (senão o `C:` do path do Windows quebra o GNU tar).

`.env.production` **entra de propósito** — só tem `NEXT_PUBLIC_*` (GA4, baked em build time). Os
segredos ficam de fora e são injetados no passo 3.

### 2. Deploy via MCP (sessão Claude com ferramentas Hostinger)

```
hosting_deployJsApplication
  domain: emcasacomcecilia.com
  archivePath: C:/Users/Bruno/Downloads/Emcasacomcecilia/emcasacomcecilia-deploy.tar.gz
```

Depois faz poll com `hosting_listJsDeployments` até `state: completed` (~1 min). Confirmar no
retorno que `root_directory: emcasacomcecilia` e `app_type: next`.

> **`state: completed` NÃO é validação suficiente.** O deploy apaga a `.env`; o passo 3 restaura e testa.

### 3. `deploy:finish` (uma vez só — ver Regra 2)

```bash
npm run deploy:finish
```

Faz, em ordem: reinjeta a `.env` (do arquivo gerenciado, via scp) → captura os workers atuais →
restart (`touch tmp/restart.txt`) → verifica em loop `HTTP 200` **e** que os vídeos populam
(thumbnails `ytimg`) → **poda os workers antigos** capturados (só depois do 200). Fail-loud se não voltar.

> ⚠️ **O restart é COLD START (~90-120s de indisponibilidade), não rolling** — verificado na marra
> neste host. O site fica em `000`/`503` durante esse intervalo; é **esperado**, não pânico. O
> `finish` espera até 180s. A poda pós-200 evita que restarts sucessivos empilhem `next-server`
> (a causa raiz do 503 — ver "Recuperação de 503"). Se algum dia o pileup ainda ocorrer, a
> recuperação manual abaixo continua válida.

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

## Arquivo de env gerenciado (segredos fora do repo)

O `deploy:finish` lê de `~/.config/emcasa/production.env` (ou `EMCASA_ENV_FILE`). **Nunca versionar.**

Chaves obrigatórias (o loader valida): `NODE_OPTIONS=--v8-pool-size=1` (obrigatória — sem ela, falha
de criação de thread → 503), `RESEND_API_KEY`, `YOUTUBE_API_KEY`, `YOUTUBE_CHANNEL_ID`,
`NEXT_PUBLIC_GA_MEASUREMENT_ID`.

> **Fonte dos valores reais/correntes:** `emcasacomcecilia/.env.local` (cópia local do dev).
> NÃO estão no `.env.example` (placeholders) nem em nenhum doc versionado. Se o arquivo gerenciado
> sumir, remontar dele — e validar a chave YouTube na API antes de deployar (o marcador "Últimos vídeos"
> renderiza mesmo com chave morta; só a ausência de thumbnails `ytimg` denuncia).

---

## Recuperação de 503 (processos `next-server` empilhados)

Sintoma: `curl` retorna a página 503 do LiteSpeed. Causa quase sempre: restarts repetidos deixaram
vários `next-server` presos no dir do emcasa, exaurindo recursos.

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
> `damie.emcasacomcecilia.com`. **Nunca** matar processos desses dois. Pool saudável pós-respawn ≈
> 3 workers; ~8 = pilha (problema).

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

## Variáveis de ambiente

| Variável | Finalidade |
|----------|-----------|
| `NODE_OPTIONS` | Limita o pool V8 (`--v8-pool-size=1`) — sem isso, falha de thread → 503 |
| `RESEND_API_KEY` | Envio de email do formulário de contato |
| `YOUTUBE_API_KEY` | Buscar vídeos recentes do canal (seção da home) |
| `YOUTUBE_CHANNEL_ID` | ID do canal (público) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 (público; vai no `.env.production`) |

---

## Troubleshooting

**Site retorna 503** → ver "Recuperação de 503" acima. Verificar também se a `.env` tem
`NODE_OPTIONS=--v8-pool-size=1`.

**"Últimos vídeos" sem thumbnails** → `.env` faltando ou `YOUTUBE_API_KEY` inválida/sem quota.
Rodar `deploy:finish` (reinjeta a `.env`) e conferir a chave na API do YouTube.

**Formulário de contato não envia** → `.env` faltando (`RESEND_API_KEY`). Rodar `deploy:finish`.

**`resolveSettings` HTTP 500** → archive criado de dentro do projeto (sem prefixo `emcasacomcecilia/`).
Recriar com `deploy:prepare` (que já faz da pasta PAI).

**Site sem CSS/JS** → BUILD_ID mismatch. Deploy limpo via MCP; nunca corrigir com scp.

**IndexNow enviou `.../C:/Program Files/Git/...`** → passou path com `/` no Git-Bash. Usar URLs
completas (`https://...`).
