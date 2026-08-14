import assert from 'node:assert/strict';
import test from 'node:test';

import { assertDeployPreflight, assertProductionSha } from './preflight.mjs';

const SHA = 'a'.repeat(40);

test('aceita main limpa e sincronizada com origin/main', () => {
  assert.doesNotThrow(() => assertDeployPreflight({
    status: '',
    branch: 'main',
    headSha: SHA,
    originSha: SHA,
  }));
});

test('bloqueia mudanças locais e lista o que ficaria de fora', () => {
  assert.throws(
    () => assertDeployPreflight({
      status: ' M src/app/page.js\n?? novo.ts',
      branch: 'main',
      headSha: SHA,
      originSha: SHA,
    }),
    (error) => {
      assert.match(error.message, /DEPLOY BLOQUEADO/);
      assert.match(error.message, /src\/app\/page\.js/);
      assert.match(error.message, /novo\.ts/);
      return true;
    },
  );
});

test('bloqueia branch ou origin divergentes', () => {
  assert.throws(
    () => assertDeployPreflight({
      status: '',
      branch: 'feature',
      headSha: SHA,
      originSha: 'b'.repeat(40),
    }),
    /branch atual deve ser main[\s\S]*HEAD diverge de origin\/main/,
  );
});

test('exige SHA público completo', () => {
  assert.equal(assertProductionSha(SHA), SHA);
  assert.throws(() => assertProductionSha('abc'), /target_sha válido/);
});
