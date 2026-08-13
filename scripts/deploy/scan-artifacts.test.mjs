import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

import {
  ArtifactSecretError,
  collectArtifactFiles,
  scanArtifactDirectory,
} from './scan-artifacts.mjs';

const SCANNER_PATH = fileURLToPath(new URL('./scan-artifacts.mjs', import.meta.url));

function withArtifacts(fn) {
  const root = mkdtempSync(path.join(tmpdir(), 'artifact-scan-'));
  mkdirSync(path.join(root, 'nested'));
  try {
    return fn(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

test('aceita fixture sanitizada com deploy_uuid público', () => {
  withArtifacts((root) => {
    writeFileSync(
      path.join(root, 'release-meta.json'),
      '{"target_sha":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","deploy_uuid":"00000000-0000-4000-8000-000000000001"}\n'
    );
    assert.deepEqual(scanArtifactDirectory(root, { env: {} }), {
      filesScanned: 1,
      secretInputs: 0,
    });
  });
});

test('aceita arquivo único sanitizado', () => {
  withArtifacts((root) => {
    const report = path.join(root, 'report.txt');
    writeFileSync(report, 'BUILD_ID=abc123\n');
    assert.deepEqual(scanArtifactDirectory(report, { env: {} }), {
      filesScanned: 1,
      secretInputs: 0,
    });
  });
});

for (const [label, content] of [
  ['private key', '-----BEGIN OPENSSH PRIVATE KEY-----\ncanary\n'],
  ['bearer', 'Authorization: Bearer canary-value'],
  ['upload header', 'X-Auth-Rest=canary-value'],
  ['signed URL', 'https://upload.invalid/file?signature=canary-value'],
]) {
  test(`bloqueia forma genérica: ${label}`, () => {
    withArtifacts((root) => {
      writeFileSync(path.join(root, 'nested', 'capture.txt'), content);
      assert.throws(() => scanArtifactDirectory(root, { env: {} }), ArtifactSecretError);
    });
  });
}

test('detecta valor real e transformações sem ecoar material sensível', () => {
  const canary = 'canary-secret-value-123';
  const forms = [
    canary,
    Buffer.from(canary).toString('base64'),
    encodeURIComponent(canary),
    Buffer.from(canary).toString('hex'),
    JSON.stringify(canary).slice(1, -1),
  ];
  for (const form of forms) {
    withArtifacts((root) => {
      writeFileSync(path.join(root, 'capture.txt'), `prefix ${form} suffix`);
      assert.throws(
        () => scanArtifactDirectory(root, { env: { SCAN_SECRET_TOKEN: canary } }),
        (error) => {
          assert.ok(error instanceof ArtifactSecretError);
          assert.match(error.message, /file=capture\.txt offset=\d+ rule=secret-token-/);
          for (const sensitive of forms) assert.equal(error.message.includes(sensitive), false);
          return true;
        }
      );
    });
  }
});

test('detecta chave multilinear mesmo com quebras removidas', () => {
  const canary = 'line-one\nline-two\nline-three';
  withArtifacts((root) => {
    writeFileSync(path.join(root, 'capture.txt'), canary.replace(/\n/g, ''));
    assert.throws(
      () => scanArtifactDirectory(root, { env: { SCAN_SECRET_SSH_KEY: canary } }),
      ArtifactSecretError
    );
  });
});

test('detecta token simples quebrado por whitespace inserido', () => {
  const canary = 'canary-secret-value-123';
  withArtifacts((root) => {
    writeFileSync(path.join(root, 'capture.txt'), 'prefix\ncanary-secret-\nvalue-123');
    assert.throws(
      () => scanArtifactDirectory(root, { env: { SCAN_SECRET_TOKEN: canary } }),
      (error) => error instanceof ArtifactSecretError
        && error.ruleId === 'secret-token-literal-compact'
        && error.offset === 7
        && !error.message.includes(canary)
    );
  });
});

test('CLI falha sem imprimir canário nem transformações', () => {
  const canary = 'canary-secret-value-123';
  const transformed = [
    canary,
    Buffer.from(canary).toString('base64'),
    encodeURIComponent(canary),
    Buffer.from(canary).toString('hex'),
  ];
  withArtifacts((root) => {
    writeFileSync(path.join(root, 'capture.txt'), transformed[1]);
    const result = spawnSync(process.execPath, [SCANNER_PATH, root], {
      encoding: 'utf8',
      env: { ...process.env, SCAN_SECRET_TOKEN: canary },
    });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /file=capture\.txt offset=\d+ rule=secret-token-base64/);
    for (const sensitive of transformed) {
      assert.equal(result.stdout.includes(sensitive), false);
      assert.equal(result.stderr.includes(sensitive), false);
    }
  });
});

test('rejeita symlink em vez de deixar arquivo fora da varredura', () => {
  const linkedEntry = {
    name: 'linked.txt',
    isDirectory: () => false,
    isFile: () => false,
    isSymbolicLink: () => true,
  };
  assert.throws(
    () => collectArtifactFiles('/safe/root', { readdirImpl: () => [linkedEntry] }),
    (error) => error instanceof ArtifactSecretError
      && error.ruleId === 'symlink-not-allowed'
      && error.relativePath === 'linked.txt'
  );
});
