// Prova o contrato /api/release no PACOTE STANDALONE (runtime de produção).
//
// Caminho discriminante (não injeta meta só no standalone):
//   1. grava release-meta.json na RAIZ do source (como o archive Hostinger fará)
//   2. instala no standalone via install-release-meta.mjs --required
//   3. sobe server.js com cwd = standalone
//   4. exige 200 + Cache-Control: no-store + body exato
//
// Requer `npm run build` antes (gera .next/standalone/server.js).
// Porta dinâmica; aguarda o encerramento do filho.

import { spawn } from 'node:child_process';
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { once } from 'node:events';
import path from 'node:path';

import {
  findStandaloneServerDirs,
  installReleaseMeta,
} from './install-release-meta.mjs';

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

const root = process.cwd();
const standalone = path.join(root, '.next', 'standalone');
const serverJs = path.join(standalone, 'server.js');
const rootMeta = path.join(root, 'release-meta.json');

if (!existsSync(serverJs)) {
  console.error('.next/standalone/server.js ausente — rode `npm run build` antes.');
  process.exitCode = 1;
} else {
  const EXPECT = {
    target_sha: 'a'.repeat(40),
    deploy_uuid: '00000000-0000-4000-8000-000000000000',
  };
  const PORT = String(await freePort());
  const touchedPaths = [
    rootMeta,
    ...findStandaloneServerDirs(standalone).map((dir) =>
      path.join(dir, 'release-meta.json')
    ),
  ];
  const originalFiles = new Map(
    touchedPaths.map((file) => [
      file,
      existsSync(file) ? readFileSync(file) : null,
    ])
  );
  writeFileSync(rootMeta, `${JSON.stringify(EXPECT)}\n`, 'utf8');

  let ok = false;
  let srv;
  const cleanup = () => {
    for (const [file, original] of originalFiles) {
      try {
        if (original === null) rmSync(file, { force: true });
        else writeFileSync(file, original);
      } catch (e) {
        console.error(`falha ao restaurar ${file}:`, e.message);
        ok = false;
      }
    }
  };

  try {
    const install = installReleaseMeta({
      sourcePath: rootMeta,
      standaloneRoot: standalone,
      required: true,
      root,
    });
    if (!install.installed.some((p) => path.normalize(p) === path.normalize(path.join(standalone, 'release-meta.json')))) {
      throw new Error(
        'install-release-meta não gravou release-meta.json ao lado do server.js raiz'
      );
    }

    srv = spawn(process.execPath, ['server.js'], {
      cwd: standalone,
      env: { ...process.env, PORT, HOSTNAME: '127.0.0.1' },
      stdio: 'ignore',
    });
    const exitPromise = once(srv, 'exit');
    const waitExit = (ms) =>
      Promise.race([
        exitPromise.then(() => true),
        new Promise((r) => setTimeout(() => r(false), ms)),
      ]);

    try {
      for (let i = 0; i < 60; i++) {
        try {
          const res = await fetch(`http://127.0.0.1:${PORT}/api/release?cb=${i}`, {
            signal: AbortSignal.timeout(2000),
          });
          if (res.ok) {
            const cc = res.headers.get('cache-control');
            const body = await res.json();
            ok =
              cc === 'no-store'
              && body.target_sha === EXPECT.target_sha
              && body.deploy_uuid === EXPECT.deploy_uuid
              && Object.keys(body).sort().join(',') === 'deploy_uuid,target_sha';
            if (ok) {
              console.log(
                'OK: release-meta na raiz → install → standalone → /api/release (no-store + meta exatos)'
              );
            } else {
              console.error('FALHA shape/headers/body:', { cc, body });
            }
            break;
          }
        } catch {
          // servidor ainda subindo
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
    }
  } catch (error) {
    console.error(
      'FALHA verify-release:',
      error instanceof Error ? error.message : error
    );
    ok = false;
    if (srv && !srv.killed) {
      try {
        srv.kill('SIGKILL');
      } catch {
        /* ignore */
      }
    }
  } finally {
    cleanup();
  }

  process.exitCode = ok ? 0 : 1;
}
