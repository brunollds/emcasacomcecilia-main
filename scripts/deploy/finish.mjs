// Finaliza o deploy: reinjeta o .env, restart graceful, verifica. Fail-loud.
// Uso: npm run deploy:finish   (rodar DEPOIS do upload MCP chegar a state=completed)
import { execFileSync, execSync } from 'node:child_process';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { loadEmcasaEnv } from './emcasa-env.mjs';

const DOMAIN = 'emcasacomcecilia.com';
const SSH_ARGS = ['-p', '65002', 'u150185510@46.202.145.2'];
const APPDIR = '~/domains/emcasacomcecilia.com/nodejs';

async function main() {
  // 1. reinjetar .env (o deploy apaga) — valores do arquivo gerenciado, nunca do repo
  console.log('[1/3] reinjetando .env no servidor…');
  const env = await loadEmcasaEnv();
  const tmp = path.join(mkdtempSync(path.join(tmpdir(), 'emcasa-')), '.env');
  writeFileSync(tmp, env);
  execFileSync('scp', ['-P', '65002', tmp, `u150185510@46.202.145.2:${APPDIR}/.env`], { stdio: 'inherit' });
  console.log('  ✅ .env no servidor');

  // 2. restart graceful (substitui o hPanel manual)
  console.log('[2/3] restart graceful…');
  execFileSync('ssh', [...SSH_ARGS, `touch ${APPDIR}/tmp/restart.txt && echo RESTARTED`], { stdio: 'inherit' });

  // 3. verificação mecânica (state=completed NÃO basta)
  console.log('[3/3] verificando produção…');
  let ok = false;
  for (let i = 0; i < 12; i++) {
    execSync('sleep 5');
    const code = execSync(`curl -s -o /dev/null -w "%{http_code}" https://${DOMAIN}/`).toString().trim();
    if (code === '200') { ok = true; break; }
    console.log(`  ... http ${code}, retry`);
  }
  if (!ok) throw new Error('site NÃO respondeu 200 — fallback: hPanel restart (ver DEPLOY-GUIDE) ou MCP hosting_restartNode_jsApplicationV1');
  const body = execSync(`curl -s https://${DOMAIN}/`).toString();
  if (!body.includes('Últimos vídeos')) {
    throw new Error('200 mas sem marcador de conteúdo ("Últimos vídeos") — checar .env/YOUTUBE no servidor');
  }
  console.log('  ✅ 200 + conteúdo ok\n=== deploy concluído sem hPanel ===');
}

main().catch((e) => { console.error('\n❌', e.message); process.exit(1); });
