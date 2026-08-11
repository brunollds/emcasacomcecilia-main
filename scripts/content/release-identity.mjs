// Lê a identidade efêmera que o workflow fornece antes do build.
// next.config.mjs incorpora os valores no bundle do servidor; runtime não lê este arquivo.

import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SHA_RE = /^[0-9a-f]{40}$/;
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

export function parseReleaseIdentity(raw) {
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

  if (typeof parsed.target_sha !== 'string' || !SHA_RE.test(parsed.target_sha)) {
    throw new Error('release-meta.json: target_sha deve ser 40 hex minúsculos');
  }
  if (typeof parsed.deploy_uuid !== 'string' || !UUID_RE.test(parsed.deploy_uuid)) {
    throw new Error('release-meta.json: deploy_uuid deve ser UUID canônico minúsculo');
  }

  return {
    target_sha: parsed.target_sha,
    deploy_uuid: parsed.deploy_uuid,
  };
}

export function readReleaseIdentity({ sourcePath, required = false } = {}) {
  const resolved = sourcePath ?? path.join(process.cwd(), 'release-meta.json');
  if (!existsSync(resolved)) {
    if (required) {
      throw new Error(`release-meta.json ausente em ${resolved} (RELEASE_META_REQUIRED)`);
    }
    return { target_sha: null, deploy_uuid: null };
  }
  return parseReleaseIdentity(readFileSync(resolved, 'utf8'));
}

function selfTest() {
  const dir = mkdtempSync(path.join(tmpdir(), 'release-identity-'));
  const source = path.join(dir, 'release-meta.json');
  const expected = {
    target_sha: 'a'.repeat(40),
    deploy_uuid: '00000000-0000-4000-8000-000000000001',
  };

  try {
    writeFileSync(source, `${JSON.stringify(expected)}\n`, 'utf8');
    const actual = readReleaseIdentity({ sourcePath: source, required: true });
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error('identidade normalizada diverge da entrada');
    }

    const absent = readReleaseIdentity({
      sourcePath: path.join(dir, 'absent.json'),
    });
    if (absent.target_sha !== null || absent.deploy_uuid !== null) {
      throw new Error('arquivo opcional ausente deve produzir identidade nula');
    }

    let requiredThrew = false;
    try {
      readReleaseIdentity({
        sourcePath: path.join(dir, 'absent.json'),
        required: true,
      });
    } catch {
      requiredThrew = true;
    }
    if (!requiredThrew) throw new Error('arquivo obrigatório ausente deveria falhar');

    let threw = false;
    try {
      parseReleaseIdentity(
        JSON.stringify({ target_sha: 'x', deploy_uuid: expected.deploy_uuid })
      );
    } catch {
      threw = true;
    }
    if (!threw) throw new Error('parser deveria rejeitar SHA inválido');

    console.log('OK: release identity validada como entrada de build.');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const isMain =
  process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isMain && process.argv.includes('--self-test')) {
  try {
    selfTest();
  } catch (error) {
    console.error(
      'FALHA self-test:',
      error instanceof Error ? error.message : error
    );
    process.exitCode = 1;
  }
}
