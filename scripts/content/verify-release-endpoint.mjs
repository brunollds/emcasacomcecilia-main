// Prova que /api/release funciona no PACOTE STANDALONE (o que roda em produção via pkg/server.js),
// não só em `next dev`. Requer `npm run build` antes (gera .next/standalone/server.js).
// Porta dinâmica; aguarda o encerramento do filho (evita porta ocupada no Windows); usa process.exitCode.
import { spawn } from 'node:child_process';
import { writeFileSync, rmSync, existsSync } from 'node:fs';
import { createServer } from 'node:net';
import { once } from 'node:events';
import path from 'node:path';

function freePort() {
  return new Promise((resolve, reject) => {
    const s = createServer();
    s.once('error', reject);
    s.listen(0, '127.0.0.1', () => {
      const { port } = s.address();
      s.close(() => resolve(port));
    });
  });
}

const standalone = path.join(process.cwd(), '.next', 'standalone');
const serverJs = path.join(standalone, 'server.js');
if (!existsSync(serverJs)) {
  console.error('.next/standalone/server.js ausente — rode `npm run build` antes.');
  process.exitCode = 1;
} else {
  const metaPath = path.join(standalone, 'release-meta.json');
  const PORT = String(await freePort());
  const EXPECT = { target_sha: 'a'.repeat(40), deploy_uuid: '00000000-0000-4000-8000-000000000000' };
  writeFileSync(metaPath, JSON.stringify(EXPECT) + '\n');

  const srv = spawn(process.execPath, ['server.js'], {
    cwd: standalone,
    env: { ...process.env, PORT, HOSTNAME: '127.0.0.1' },
    stdio: 'ignore',
  });
  // exitPromise criado ANTES de qualquer kill, para nao perder o evento 'exit'.
  const exitPromise = once(srv, 'exit');
  const waitExit = (ms) =>
    Promise.race([exitPromise.then(() => true), new Promise((r) => setTimeout(() => r(false), ms))]);

  let ok = false;
  try {
    for (let i = 0; i < 60; i++) {
      try {
        // Timeout por tentativa: nao pendurar se a conexao abrir mas a resposta nao terminar.
        const res = await fetch(`http://127.0.0.1:${PORT}/api/release?cb=${i}`, {
          signal: AbortSignal.timeout(2000),
        });
        if (res.ok) {
          const cc = res.headers.get('cache-control');
          const body = await res.json();
          ok = cc === 'no-store' && body.target_sha === EXPECT.target_sha && body.deploy_uuid === EXPECT.deploy_uuid;
          if (ok) console.log('OK: /api/release no standalone (no-store + meta corretos)');
          else console.error('FALHA:', { cc, body });
          break;
        }
      } catch {
        // servidor ainda subindo / tentativa expirou
      }
      await new Promise((r) => setTimeout(r, 500));
    }
    if (!ok) console.error('servidor standalone não confirmou /api/release a tempo');
  } finally {
    srv.kill('SIGTERM');
    let exited = await waitExit(5000);
    if (!exited) {
      srv.kill('SIGKILL');
      exited = await waitExit(5000);
    }
    if (!exited) {
      console.error('processo standalone não encerrou após SIGKILL');
      ok = false;
    }
    try {
      rmSync(metaPath, { force: true });
    } catch (e) {
      console.error('falha ao remover release-meta.json temporário:', e.message);
      ok = false;
    }
  }
  process.exitCode = ok ? 0 : 1;
}
