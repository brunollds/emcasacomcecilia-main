// Instala release-meta.json no cwd de runtime do standalone.
//
// Por quê: /api/release lê process.cwd()/release-meta.json. O `next build`
// (output: 'standalone') NÃO copia um JSON solto da raiz do source para
// `.next/standalone/`. Sem este passo, o gate de attestation da esteira
// Hostinger falha mesmo com build completed e conteúdo novo no ar.
//
// Uso:
//   node scripts/content/install-release-meta.mjs           # pós-build; skip se ausente
//   node scripts/content/install-release-meta.mjs --required # falha se meta/standalone faltarem
//   RELEASE_META_PATH=/tmp/meta.json node ...
//   node scripts/content/install-release-meta.mjs --self-test
//
// Shape: {"target_sha":"<40-hex>","deploy_uuid":"<uuid>"} + LF final.

import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = process.cwd();
const SOURCE = process.env.RELEASE_META_PATH
  ? path.resolve(process.env.RELEASE_META_PATH)
  : path.join(ROOT, 'release-meta.json');
const STANDALONE = path.join(ROOT, '.next', 'standalone');
const REQUIRED =
  process.env.RELEASE_META_REQUIRED === '1'
  || process.argv.includes('--required');

const SHA_RE = /^[0-9a-f]{40}$/;
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

export function normalizeReleaseMeta(raw) {
  const text = String(raw).replace(/^\uFEFF/, '');
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    throw new Error(
      `release-meta.json JSON inválido: ${
        error instanceof Error ? error.message : error
      }`
    );
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('release-meta.json: raiz deve ser objeto');
  }
  const keys = Object.keys(parsed).sort();
  if (keys.length !== 2 || keys[0] !== 'deploy_uuid' || keys[1] !== 'target_sha') {
    throw new Error(
      `release-meta.json: chaves devem ser exatamente target_sha e deploy_uuid (recebeu: ${keys.join(',')})`
    );
  }
  const target_sha = parsed.target_sha;
  const deploy_uuid = parsed.deploy_uuid;
  if (typeof target_sha !== 'string' || !SHA_RE.test(target_sha)) {
    throw new Error('release-meta.json: target_sha deve ser 40 hex minúsculos');
  }
  if (typeof deploy_uuid !== 'string' || !UUID_RE.test(deploy_uuid)) {
    throw new Error('release-meta.json: deploy_uuid deve ser UUID canônico minúsculo');
  }
  return `${JSON.stringify({ target_sha, deploy_uuid })}\n`;
}

export function findStandaloneServerDirs(dir, out = []) {
  if (!existsSync(dir)) return out;
  const serverJs = path.join(dir, 'server.js');
  if (existsSync(serverJs) && statSync(serverJs).isFile()) {
    out.push(dir);
  }
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git') continue;
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) findStandaloneServerDirs(full, out);
  }
  return out;
}

export function installReleaseMeta({
  sourcePath = SOURCE,
  standaloneRoot = STANDALONE,
  required = REQUIRED,
  log = console,
  root = ROOT,
} = {}) {
  if (!existsSync(sourcePath)) {
    if (required) {
      throw new Error(
        `release-meta.json ausente em ${sourcePath} (RELEASE_META_REQUIRED)`
      );
    }
    log.log(`[install-release-meta] skip: ${sourcePath} ausente (dev/local ok)`);
    return { installed: [], skipped: 'source-missing' };
  }

  const normalized = normalizeReleaseMeta(readFileSync(sourcePath, 'utf8'));

  if (!existsSync(standaloneRoot)) {
    if (required) {
      throw new Error(
        `.next/standalone ausente — rode next build antes (required)`
      );
    }
    log.log('[install-release-meta] skip: .next/standalone ausente');
    return { installed: [], skipped: 'standalone-missing' };
  }

  const targets = findStandaloneServerDirs(standaloneRoot);
  if (targets.length === 0) {
    throw new Error(
      `nenhum server.js sob ${standaloneRoot} — layout standalone inesperado`
    );
  }

  const installed = [];
  for (const dir of targets) {
    const dest = path.join(dir, 'release-meta.json');
    writeFileSync(dest, normalized, 'utf8');
    if (readFileSync(dest, 'utf8') !== normalized) {
      throw new Error(`falha ao gravar ${dest}`);
    }
    installed.push(dest);
    log.log(
      `[install-release-meta] wrote ${path.relative(root, dest) || dest}`
    );
  }
  return { installed, skipped: null };
}

function selfTest() {
  const dir = mkdtempSync(path.join(tmpdir(), 'release-meta-'));
  const standalone = path.join(dir, '.next', 'standalone');
  mkdirSync(path.join(standalone, 'nested'), { recursive: true });
  writeFileSync(path.join(standalone, 'server.js'), '// root\n');
  writeFileSync(path.join(standalone, 'nested', 'server.js'), '// nested\n');

  const good = {
    target_sha: 'a'.repeat(40),
    deploy_uuid: '00000000-0000-4000-8000-000000000001',
  };
  const source = path.join(dir, 'release-meta.json');
  writeFileSync(source, JSON.stringify(good));

  try {
    const result = installReleaseMeta({
      sourcePath: source,
      standaloneRoot: standalone,
      required: true,
      root: dir,
      log: { log() {} },
    });
    if (result.installed.length !== 2) {
      throw new Error(`esperava 2 destinos, got ${result.installed.length}`);
    }
    for (const dest of result.installed) {
      const body = JSON.parse(readFileSync(dest, 'utf8'));
      if (
        body.target_sha !== good.target_sha
        || body.deploy_uuid !== good.deploy_uuid
      ) {
        throw new Error(`conteúdo divergente em ${dest}`);
      }
      if (!readFileSync(dest, 'utf8').endsWith('\n')) {
        throw new Error(`LF final ausente em ${dest}`);
      }
    }

    let threw = false;
    try {
      normalizeReleaseMeta(
        JSON.stringify({ target_sha: 'x', deploy_uuid: good.deploy_uuid })
      );
    } catch {
      threw = true;
    }
    if (!threw) throw new Error('normalize deveria rejeitar sha inválido');

    console.log('OK: install-release-meta self-test');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const isMain =
  process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isMain) {
  if (process.argv.includes('--self-test')) {
    try {
      selfTest();
    } catch (error) {
      console.error(
        'FALHA self-test:',
        error instanceof Error ? error.message : error
      );
      process.exitCode = 1;
    }
  } else {
    try {
      installReleaseMeta();
    } catch (error) {
      console.error(
        '[install-release-meta]',
        error instanceof Error ? error.message : error
      );
      process.exitCode = 1;
    }
  }
}
