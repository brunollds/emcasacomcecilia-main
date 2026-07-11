// Verifica a saúde da produção após o deploy MCP. Fail-loud. NÃO muta nada no servidor.
// Uso: npm run deploy:finish   (rodar DEPOIS do upload MCP chegar a state=completed)
//
// As variáveis de ambiente (NODE_OPTIONS, RESEND_API_KEY, YOUTUBE_*, GA) vivem no PAINEL da Hostinger
// (Site → Variáveis de ambiente), PERSISTEM entre deploys e são injetadas no processo node no boot.
// Por isso este passo não reinjeta .env nem reinicia — só verifica. O único restart é o do próprio
// deploy MCP (cold start ~90-120s neste host). Validado 10/07: app 200 + vídeos SEM .env no servidor.
import { execFileSync } from 'node:child_process';

const DOMAIN = 'emcasacomcecilia.com';
const SSH_ARGS = ['-p', '65002', 'u150185510@46.202.145.2'];
const APPDIR_ABS = '/home/u150185510/domains/emcasacomcecilia.com/nodejs';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function httpCode() {
  try {
    const response = await fetch(`https://${DOMAIN}/`, {
      redirect: 'manual',
    });
    return String(response.status);
  } catch {
    return '000'; // conexão recusada/reset durante o cold start
  }
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ao buscar ${url}`);
  }

  return response.text();
}

async function main() {
  console.log('[1/2] aguardando produção responder (cold start do deploy pode levar ~90-120s)…');
  let ok = false;
  let lastCode = '000';
  for (let i = 0; i < 48; i++) { // ~240s — cold start real ~185s em 2 deploys seguidos
    await sleep(5000);
    lastCode = await httpCode();
    if (lastCode === '200') { ok = true; break; }
    console.log(`  ... http ${lastCode}, subindo (${(i + 1) * 5}s)`);
  }
  if (!ok) {
    const hint = lastCode === '503'
      ? '503 persistente — checar Variáveis de ambiente no painel (NODE_OPTIONS=--v8-pool-size=1?) ou pilha de next-server (ver DEPLOY-GUIDE › Recuperação de 503)'
      : `sem 200 em 240s (último: ${lastCode}) — cold start longo ou app não subiu; ver console.log/stderr.log no servidor`;
    throw new Error(hint);
  }

  console.log('[2/2] verificando conteúdo + saúde dos processos…');
  const body = await fetchText(`https://${DOMAIN}/`);
  if (!body.includes('Últimos vídeos')) {
    throw new Error('200 mas sem a seção "Últimos vídeos" — checar o app');
  }
  // marcador é só o cabeçalho; os thumbnails ytimg confirmam que o YOUTUBE_API_KEY do painel funciona
  const videosOk = /ytimg\.com\/vi\//.test(body);
  console.log(videosOk
    ? '  ✅ 200 + vídeos populando (env do painel aplicado)'
    : '  ⚠️ 200 mas SEM thumbnails de vídeo — conferir YOUTUBE_API_KEY no painel/quota (não bloqueia)');

  // aviso de pilha (não poda automático — a poda é a recuperação manual documentada; ver DEPLOY-GUIDE)
  try {
    const listCmd = `pgrep -u u150185510 -f next-server | while read pid; do [ "$(readlink /proc/$pid/cwd 2>/dev/null)" = "${APPDIR_ABS}" ] && echo $pid; done; true`;
    const n = execFileSync('ssh', [...SSH_ARGS, listCmd]).toString().trim().split(/\s+/).filter(Boolean).length;
    console.log(n > 3
      ? `  ⚠️ ${n} workers next-server do emcasa (pool normal ≈1-3) — possível pilha; ver DEPLOY-GUIDE › Recuperação de 503`
      : `  workers emcasa: ${n} (ok)`);
  } catch {
    console.log('  (não consegui contar workers via ssh — ignorável)');
  }
  console.log('=== produção verificada ===');
}

main().catch((e) => { console.error('\n❌', e.message); process.exit(1); });
