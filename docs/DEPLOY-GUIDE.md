# Guia de Deploy — emcasacomcecilia.com

## ⚠️ Regra absoluta: NUNCA fazer upload manual de arquivos `.next/`

O Hostinger gera um servidor standalone customizado incompatível com builds locais.
Qualquer scp de arquivos `.next/` individuais corrompe o servidor e causa crash loop com 100% CPU.

**Deploy correto = sempre usar o fluxo completo abaixo.**

---

## Fluxo de Deploy Completo (Fase 2a — Automatizado)

**Fluxo principal recomendado (sem hPanel):**

```bash
# 1. No diretório do projeto
npm run deploy:prepare

# 2. Na sessão Claude com ferramentas MCP da Hostinger:
#    hosting_deployJsApplication domain=emcasacomcecilia.com archivePath=.../emcasacomcecilia-deploy.tar.gz
#    (aguarde state=completed)

# 3. No diretório do projeto
npm run deploy:finish
```

Isso automatiza:
- Criação do archive correto
- Reinjeção do `.env` (de arquivo gerenciado fora do repo)
- Restart (via touch + MCP restart tool se necessário)
- Verificação

**Estado real em produção:** o fluxo ativo hoje é deploy por archive via MCP/API da Hostinger.
O arquivo `DEPLOY-HOSTINGER-NODEJS.md` descreve um fluxo antigo de Git Deploy + build manual via SSH e não deve ser usado como fonte principal para o domínio `emcasacomcecilia.com`.

### 1. Build local (verificação)
```bash
cd C:/Users/Bruno/Downloads/Emcasacomcecilia/emcasacomcecilia
npm run build
```
Confirmar que termina sem erros antes de prosseguir.

### 2. Criar o archive (da pasta PAI, não do projeto)
```bash
cd C:/Users/Bruno/Downloads/Emcasacomcecilia

tar \
  --exclude='emcasacomcecilia/.next' \
  --exclude='emcasacomcecilia/node_modules' \
  --exclude='emcasacomcecilia/.git' \
  --exclude='emcasacomcecilia/.claude' \
  --exclude='emcasacomcecilia/.env.local' \
  --exclude='emcasacomcecilia/.env' \
  --exclude='emcasacomcecilia/*.tar.gz' \
  -czf emcasacomcecilia-deploy.tar.gz emcasacomcecilia/
```

> **Por quê da pasta PAI?** O Hostinger espera `root_directory: "emcasacomcecilia"` dentro do archive.
> Criar com `tar . ` de dentro do projeto faz o `resolveSettings` falhar com HTTP 500.
>
> **`.env.production` é incluído intencionalmente.** Contém apenas `NEXT_PUBLIC_*` (variáveis públicas que o
> Next.js bake no bundle em build time). Sem ele, o GA4 não carrega em produção. Segredos (API keys) ficam
> fora do archive e são criados via SSH após o deploy.

### 3. Deploy via MCP (Claude Code)
```
hosting_deployJsApplication
  domain: emcasacomcecilia.com
  archivePath: C:/Users/Bruno/Downloads/Emcasacomcecilia/emcasacomcecilia-deploy.tar.gz
```

Aguardar `state: completed` (~1 minuto).

### 3.1. Normalizar processos Node no hPanel (OBRIGATÓRIO se houver 503)

Depois do deploy, a Hostinger pode deixar processos `next-server` antigos presos. Quando isso acontece, o build aparece
como `completed`, mas o domínio retorna `503` até os processos serem parados no painel.

Procedimento seguro:

1. Abrir hPanel -> Websites -> `emcasacomcecilia.com` -> Node.js.
2. Parar os processos/aplicação do domínio principal.
3. Aguardar alguns segundos.
4. Iniciar novamente a aplicação do domínio principal.
5. Não parar processos dos outros apps/subdomínios (`api.emcasacomcecilia.com`, `damie.emcasacomcecilia.com`).

Se SSH estiver funcional, a alternativa é matar apenas processos `next-server` cujo `cwd` seja
`~/domains/emcasacomcecilia.com/nodejs/`, preservando API e DAMIE.

### 4. Recriar o .env no servidor (automatizado pela Fase 2a)

O deploy **apaga o `.env`** a cada vez.

Com a automação (Fase 2a):
- `npm run deploy:finish` reinjeta o `.env` automaticamente a partir do arquivo gerenciado em `~/.config/emcasa/production.env` (fora do repositório — **nunca versionar segredos**).
- Chaves obrigatórias: `NODE_OPTIONS=--v8-pool-size=1` (obrigatória), `RESEND_API_KEY`, `YOUTUBE_API_KEY`, `YOUTUBE_CHANNEL_ID`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`.

Fallback manual (se a automação falhar): use SSH para recriar o `.env` (valores devem vir do arquivo gerenciado local, nunca colados em docs ou código).

### 5. Verificar
Abrir `emcasacomcecilia.com` em janela anônima e confirmar:
- Site carrega com CSS/JS
- Seção "Últimos vídeos em destaque" aparece na home
- Formulário de contato funciona

---

## Acesso SSH

| Campo | Valor |
|-------|-------|
| Host | 46.202.145.2 |
| Porta | 65002 |
| Usuário | u150185510 |
| App dir | `~/domains/emcasacomcecilia.com/nodejs/` |
| Reiniciar app | `touch ~/domains/emcasacomcecilia.com/nodejs/tmp/restart.txt` |
| Logs em tempo real | `tail -f ~/domains/emcasacomcecilia.com/nodejs/console.log` |
| Erros | `tail -f ~/domains/emcasacomcecilia.com/nodejs/stderr.log` |

---

## Variáveis de Ambiente

| Variável | Finalidade |
|----------|-----------|
| `NODE_OPTIONS` | Limita o pool V8 no runtime da Hostinger (`--v8-pool-size=1`) para evitar falha de criação de threads |
| `RESEND_API_KEY` | Envio de emails do formulário de contato |
| `YOUTUBE_API_KEY` | Buscar vídeos recentes do canal (seção home) |
| `YOUTUBE_CHANNEL_ID` | ID do canal YouTube (`UCy2fjgwhD9x20SBe1jtN5vQ`) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 (`G-LDLH63KJMP`) |

> **Nota:** `GA_POPULAR_RECIPES_ENABLED=true` deve ser adicionado **após 18/05/2026** (30 dias de dados no GA).

---

## Troubleshooting

**Site sem CSS/JS após deploy**
→ BUILD_ID mismatch. Fazer novo deploy completo. Nunca tentar corrigir com scp.

**"Últimos vídeos" não aparecem**
→ `.env` está faltando. Executar o passo 4 acima.

**Formulário de contato não envia email**
→ `.env` está faltando (RESEND_API_KEY). Executar o passo 4 acima.

**Site retorna 503 após deploy/restart**
→ Verificar se o `.env` contém `NODE_OPTIONS=--v8-pool-size=1`.
→ Parar e iniciar a aplicação do domínio principal no hPanel.
→ Se SSH estiver funcional, matar apenas os `next-server` cujo `cwd` seja `~/domains/emcasacomcecilia.com/nodejs/` e tocar `tmp/restart.txt`.
→ Não considerar `state: completed` do build como validação suficiente; sempre testar `curl -I https://emcasacomcecilia.com/`.

**App em loop / 100% CPU**
→ Provavelmente causado por upload manual de arquivos incompatíveis.
→ Fazer deploy completo limpo via MCP — ele substitui tudo.

**`resolveSettings` retorna HTTP 500**
→ O archive foi criado de dentro do projeto (sem prefixo `emcasacomcecilia/`).
→ Recriar o archive da pasta PAI conforme passo 2.
