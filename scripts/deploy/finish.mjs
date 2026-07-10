// Finaliza o deploy: reinjeta o .env, restart, verifica, poda workers antigos. Fail-loud.
// Uso: npm run deploy:finish   (rodar DEPOIS do upload MCP chegar a state=completed)
// NOTA: neste host o restart é cold start (~90-120s), não rolling — o site fica indisponível
//       nesse intervalo. É esperado; o budget de verificação cobre isso.
import { execFileSync, execSync } from 'node:child_process';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { loadEmcasaEnv } from './emcasa-env.mjs';

const DOMAIN = 'emcasacomcecilia.com';
const SSH_ARGS = ['-p', '65002', 'u150185510@46.202.145.2'];
const APPDIR = '~/domains/emcasacomcecilia.com/nodejs';
const APPDIR_ABS = '/home/u150185510/domains/emcasacomcecilia.com/nodejs'; // p/ comparar com readlink /proc/pid/cwd

async function main() {
  // 1. reinjetar .env (o deploy apaga) — valores do arquivo gerenciado, nunca do repo
  console.log('[1/3] reinjetando .env no servidor…');
  const env = await loadEmcasaEnv();
  const tmp = path.join(mkdtempSync(path.join(tmpdir(), 'emcasa-')), '.env');
  writeFileSync(tmp, env);
  execFileSync('scp', ['-P', '65002', tmp, `u150185510@46.202.145.2:${APPDIR}/.env`], { stdio: 'inherit' });
  console.log('  ✅ .env no servidor');

  // 2. restart + captura dos workers atuais. O `touch` faz um restart COLD (site indisponível
  //    ~90-120s neste host; não é rolling — verificado na marra) e NÃO reapa os workers antigos:
  //    por isso deploys sucessivos empilham next-server até exaurir recursos → 503. Capturamos os
  //    PIDs atuais aqui e os podamos no passo [4], só DEPOIS de o novo já responder 200 — assim o
  //    pileup não acontece. Filtro por cwd == emcasa nunca casa com api./damie. (paths diferentes).
  console.log('[2/4] restart (captura workers atuais + touch)…');
  // `; true` no fim: o while termina não-zero quando a última iteração não casa (&& curto-circuita)
  const listOldCmd = `pgrep -u u150185510 -f next-server | while read pid; do [ "$(readlink /proc/$pid/cwd 2>/dev/null)" = "${APPDIR_ABS}" ] && echo $pid; done; true`;
  const oldPids = execFileSync('ssh', [...SSH_ARGS, listOldCmd]).toString().trim().split(/\s+/).filter(Boolean);
  console.log(`  workers antigos do emcasa: ${oldPids.join(' ') || '(nenhum)'}`);
  execFileSync('ssh', [...SSH_ARGS, `touch ${APPDIR}/tmp/restart.txt && echo "  RESTARTED"`], { stdio: 'inherit' });

  // 3. verificação mecânica (state=completed NÃO basta)
  console.log('[3/4] verificando produção…');
  // na janela de restart o app fica ~5s indisponível e o curl sai não-zero — tolerar e re-tentar,
  // nunca deixar o erro do curl derrubar a verificação (senão dá falso-negativo num deploy que deu certo)
  const httpCode = () => {
    try {
      return execSync(`curl -s -o /dev/null -w "%{http_code}" https://${DOMAIN}/`).toString().trim();
    } catch {
      return '000'; // conexão recusada/reset durante o restart
    }
  };
  let ok = false;
  let lastCode = '000';
  // neste host o restart é COLD START (~90-120s observados), não rolling — budget generoso
  for (let i = 0; i < 36; i++) { // ~180s
    execSync('sleep 5');
    lastCode = httpCode();
    if (lastCode === '200') { ok = true; break; }
    console.log(`  ... http ${lastCode}, ainda subindo (${(i + 1) * 5}s)`);
  }
  if (!ok) {
    // NÃO poda os antigos se o novo não subiu — deixa tudo de pé e falha alto
    const hint = lastCode === '503'
      ? '503 persistente — provável build quebrado ou NODE_OPTIONS ausente no .env; ver stderr.log/console.log no servidor'
      : `sem 200 em 180s (último: ${lastCode}) — testar "curl -I https://${DOMAIN}/" em ~30s ou ver console.log/stderr.log`;
    throw new Error(hint);
  }
  const body = execSync(`curl -s https://${DOMAIN}/`).toString();
  if (!body.includes('Últimos vídeos')) {
    throw new Error('200 mas sem marcador de conteúdo ("Últimos vídeos") — checar .env/YOUTUBE no servidor');
  }
  // marcador é só o cabeçalho (renderiza sem vídeos); confirmar que os vídeos REALMENTE populam
  const videosOk = /ytimg\.com\/vi\//.test(body);
  console.log(videosOk
    ? '  ✅ 200 + conteúdo ok (vídeos populando)'
    : '  ⚠️ 200 + página ok, mas SEM thumbnails de vídeo — conferir YOUTUBE_API_KEY/quota (deploy não falhou)');

  // 4. PODA os workers antigos (leftovers ociosos do rolling), agora que o novo já serve.
  //    Mata só os PIDs capturados no passo [2] que AINDA existam E cujo cwd siga == emcasa
  //    (nunca api./damie.; nunca o worker novo, cujo PID está fora dessa lista).
  console.log('[4/4] podando workers antigos ociosos…');
  if (oldPids.length) {
    const pruneCmd = oldPids
      .map((p) => `[ "$(readlink /proc/${p}/cwd 2>/dev/null)" = "${APPDIR_ABS}" ] && kill ${p} 2>/dev/null && echo "  podado ${p}" || true`)
      .join('; ');
    execFileSync('ssh', [...SSH_ARGS, pruneCmd], { stdio: 'inherit' });
  } else {
    console.log('  (nada a podar)');
  }
  console.log('=== deploy concluído sem hPanel ===');
}

main().catch((e) => { console.error('\n❌', e.message); process.exit(1); });
