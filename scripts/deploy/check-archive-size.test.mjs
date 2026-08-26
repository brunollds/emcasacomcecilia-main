import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { checkArchiveSize } from './check-archive-size.mjs';

function fixture() {
  const rootDir = mkdtempSync(path.join(os.tmpdir(), 'archive-size-'));
  execFileSync('git', ['init', '--quiet'], { cwd: rootDir });
  mkdirSync(path.join(rootDir, 'public', 'images'), { recursive: true });
  writeFileSync(path.join(rootDir, 'public', 'images', 'maior.mp4'), Buffer.alloc(40));
  writeFileSync(path.join(rootDir, 'menor.txt'), Buffer.alloc(4));
  execFileSync('git', ['add', '.'], { cwd: rootDir });
  const archivePath = path.join(rootDir, 'source.tar.gz');
  writeFileSync(archivePath, Buffer.alloc(20));
  return { rootDir, archivePath };
}

test('aceita archive abaixo da guarda e informa a margem', () => {
  const { rootDir, archivePath } = fixture();
  assert.deepEqual(checkArchiveSize({ archivePath, maxBytes: 30, rootDir }), {
    bytes: 20,
    maxBytes: 30,
    warningBytes: 30,
    warning: false,
    remainingBytes: 10,
  });
});

test('avisa quando o archive entra na margem preventiva', () => {
  const { rootDir, archivePath } = fixture();
  assert.equal(
    checkArchiveSize({ archivePath, maxBytes: 30, warningBytes: 15, rootDir }).warning,
    true,
  );
});

test('falha no limite e aponta o maior arquivo versionado', () => {
  const { rootDir, archivePath } = fixture();
  assert.throws(
    () => checkArchiveSize({ archivePath, maxBytes: 20, rootDir }),
    (error) => {
      assert.match(error.message, /20 >= 20 bytes/);
      assert.match(error.message, /public\/images\/maior\.mp4: 40 bytes/);
      return true;
    },
  );
});

test('rejeita limite inválido', () => {
  const { rootDir, archivePath } = fixture();
  assert.throws(
    () => checkArchiveSize({ archivePath, maxBytes: Number.NaN, rootDir }),
    /limite inválido/,
  );
});

test('rejeita limite de aviso acima da guarda', () => {
  const { rootDir, archivePath } = fixture();
  assert.throws(
    () => checkArchiveSize({ archivePath, maxBytes: 30, warningBytes: 31, rootDir }),
    /limite de aviso inválido/,
  );
});
