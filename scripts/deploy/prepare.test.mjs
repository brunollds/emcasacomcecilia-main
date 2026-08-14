import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { createAttestedArchive } from './prepare.mjs';

const DEPLOY_UUID = '00000000-0000-4000-8000-000000000001';

function fixture() {
  const root = mkdtempSync(path.join(os.tmpdir(), 'prepare-archive-test-'));
  const repoDir = path.join(root, 'repo');
  mkdirSync(repoDir);
  execFileSync('git', ['init', '--quiet'], { cwd: repoDir });
  writeFileSync(path.join(repoDir, 'package.json'), '{"scripts":{"build":"true"}}\n');
  writeFileSync(path.join(repoDir, 'source.txt'), 'conteúdo versionado\n');
  execFileSync('git', ['add', '.'], { cwd: repoDir });
  execFileSync(
    'git',
    ['-c', 'user.name=Test', '-c', 'user.email=test@example.invalid', 'commit', '--quiet', '-m', 'fixture'],
    { cwd: repoDir },
  );
  const targetSha = execFileSync('git', ['rev-parse', 'HEAD'], {
    cwd: repoDir,
    encoding: 'utf8',
  }).trim();
  return { root, repoDir, targetSha };
}

test('cria o archive atestado, mede os mesmos bytes e retorna SHA-256 verificável', () => {
  const { root, repoDir, targetSha } = fixture();
  const archivePath = path.join(root, 'candidate.tar.gz');
  const result = createAttestedArchive({ targetSha, deployUuid: DEPLOY_UUID, archivePath, repoDir });

  assert.equal(result.archive, archivePath);
  assert.equal(result.size.bytes, statSync(archivePath).size);
  assert.equal(
    result.sha256,
    createHash('sha256').update(readFileSync(archivePath)).digest('hex'),
  );

  const extracted = path.join(root, 'extracted');
  mkdirSync(extracted);
  execFileSync('tar', ['-xzf', archivePath, '-C', extracted]);
  const meta = readFileSync(
    path.join(extracted, 'emcasacomcecilia', 'release-meta.json'),
    'utf8',
  );
  assert.equal(
    meta,
    `${JSON.stringify({ target_sha: targetSha, deploy_uuid: DEPLOY_UUID })}\n`,
  );
});

test('rejeita identidade inválida antes de criar o archive', () => {
  const { root, repoDir, targetSha } = fixture();
  const archivePath = path.join(root, 'invalid.tar.gz');

  assert.throws(
    () => createAttestedArchive({ targetSha: 'x', deployUuid: DEPLOY_UUID, archivePath, repoDir }),
    /target_sha deve ser 40 hex minúsculos/,
  );
  assert.throws(
    () => createAttestedArchive({ targetSha, deployUuid: 'x', archivePath, repoDir }),
    /deploy_uuid deve ser UUID canônico minúsculo/,
  );
  assert.equal(existsSync(archivePath), false);
});

test('archive acima da guarda falha e é removido', () => {
  const { root, repoDir, targetSha } = fixture();
  const archivePath = path.join(root, 'oversized.tar.gz');

  assert.throws(
    () => createAttestedArchive({
      targetSha,
      deployUuid: DEPLOY_UUID,
      archivePath,
      repoDir,
      maxBytes: 1,
    }),
    /archive excede a guarda interna/,
  );
  assert.equal(existsSync(archivePath), false);
});

test('falha de cleanup não mascara a causa original da montagem', () => {
  const { root, repoDir, targetSha } = fixture();
  const archivePath = path.join(root, 'archive-as-directory');
  mkdirSync(archivePath);

  assert.throws(
    () => createAttestedArchive({ targetSha, deployUuid: DEPLOY_UUID, archivePath, repoDir }),
    (error) => {
      assert.notEqual(error.code, 'ERR_FS_EISDIR');
      assert.match(error.message, /tar/);
      return true;
    },
  );
  assert.equal(existsSync(archivePath), true);
});
