// Prova que /api/release responde com a identidade compilada no standalone.
// O teste remove todos os release-meta.json antes de subir o servidor e injeta valores
// conflitantes no ambiente de runtime. Só o valor incorporado durante `next build` pode passar.

import { spawn } from 'node:child_process';
import {
  existsSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { createServer } from 'node:net';
import { once } from 'node:events';
import path from 'node:path';

import { readReleaseIdentity } from './release-identity.mjs';

function freePort() {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

function findReleaseMetaFiles(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git') continue;
    const full = path.join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) findReleaseMetaFiles(full, out);
    else if (name === 'release-meta.json') out.push(full);
  }
  return out;
}

const root = process.cwd();
const standalone = path.join(root, '.next', 'standalone');
const serverJs = path.join(standalone, 'server.js');
const rootMeta = path.join(root, 'release-meta.json');

if (!existsSync(serverJs)) {
  console.error('.next/standalone/server.js ausente — rode o build com release-meta primeiro.');
  process.exitCode = 1;
} else {
  let ok = false;
  let child;
  const originalFiles = new Map();

  try {
    const expected = readReleaseIdentity({ sourcePath: rootMeta, required: true });
    const buildId = readFileSync(path.join(root, '.next', 'BUILD_ID'), 'utf8').trim();
    if (buildId !== expected.target_sha) {
      throw new Error(`BUILD_ID divergente: esperado ${expected.target_sha}, recebido ${buildId}`);
    }
    const touchedPaths = [rootMeta, ...findReleaseMetaFiles(standalone)];
    for (const file of touchedPaths) {
      if (!originalFiles.has(file)) {
        originalFiles.set(file, readFileSync(file));
        rmSync(file, { force: true });
      }
    }

    if (findReleaseMetaFiles(standalone).length !== 0 || existsSync(rootMeta)) {
      throw new Error('release-meta.json ainda existe durante o teste de independência');
    }

    const port = String(await freePort());
    child = spawn(process.execPath, ['server.js'], {
      cwd: standalone,
      env: {
        ...process.env,
        PORT: port,
        HOSTNAME: '127.0.0.1',
        EMCASA_RELEASE_TARGET_SHA: 'b'.repeat(40),
        EMCASA_RELEASE_DEPLOY_UUID: '00000000-0000-4000-8000-000000000099',
      },
      stdio: 'ignore',
    });

    const exitPromise = once(child, 'exit');
    const waitExit = (ms) =>
      Promise.race([
        exitPromise.then(() => true),
        new Promise((resolve) => setTimeout(() => resolve(false), ms)),
      ]);

    try {
      for (let attempt = 0; attempt < 60; attempt += 1) {
        try {
          const response = await fetch(`http://127.0.0.1:${port}/api/release?cb=${attempt}`, {
            signal: AbortSignal.timeout(2000),
          });
          if (response.ok) {
            const cacheControl = response.headers.get('cache-control');
            const body = await response.json();
            ok =
              cacheControl === 'no-store'
              && body.target_sha === expected.target_sha
              && body.deploy_uuid === expected.deploy_uuid
              && Object.keys(body).sort().join(',') === 'deploy_uuid,target_sha';
            if (ok) {
              console.log(
                'OK: identidade de build → bundle → standalone sem sidecar nem env de runtime.'
              );
            } else {
              console.error('FALHA shape/headers/body:', { cacheControl, body });
            }
            break;
          }
        } catch {
          // Servidor ainda subindo.
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      if (!ok) console.error('standalone não confirmou a identidade compilada a tempo');
    } finally {
      child.kill('SIGTERM');
      let exited = await waitExit(5000);
      if (!exited) {
        child.kill('SIGKILL');
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
    if (child && !child.killed) child.kill('SIGKILL');
  } finally {
    for (const [file, contents] of originalFiles) {
      try {
        writeFileSync(file, contents);
      } catch (error) {
        console.error(`falha ao restaurar ${file}:`, error.message);
        ok = false;
      }
    }
  }

  process.exitCode = ok ? 0 : 1;
}
