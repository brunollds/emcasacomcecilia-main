import assert from 'node:assert/strict';
import test from 'node:test';

import { assertDeployPreflight, assertProductionSha, assertProductionTar } from './preflight.mjs';

const SHA = 'a'.repeat(40);
// Saídas reais de `tar --version`: tar.exe do Windows (PowerShell) e GNU tar do Git Bash.
const BSDTAR_VERSION =
  'bsdtar 3.8.8 - libarchive 3.8.8 zlib/1.2.13.1-motley liblzma/5.8.3 bz2lib/1.0.8 libzstd/1.5.7 cng/2.0 libb2/bundled \r\n';
const GNU_TAR_VERSION =
  'tar (GNU tar) 1.35\nCopyright (C) 2023 Free Software Foundation, Inc.\n' +
  'License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>.\n' +
  'This is free software: you are free to change and redistribute it.\n' +
  'There is NO WARRANTY, to the extent permitted by law.\n\nWritten by John Gilmore and Jay Fenlason.\n';

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

test('aceita o bsdtar do PowerShell e devolve a linha da versão', () => {
  assert.equal(
    assertProductionTar(BSDTAR_VERSION),
    'bsdtar 3.8.8 - libarchive 3.8.8 zlib/1.2.13.1-motley liblzma/5.8.3 bz2lib/1.0.8 libzstd/1.5.7 cng/2.0 libb2/bundled',
  );
});

test('bloqueia tar que não seja o bsdtar e mostra qual encontrou', () => {
  assert.throws(
    () => assertProductionTar(GNU_TAR_VERSION),
    (error) => {
      assert.match(error.message, /DEPLOY BLOQUEADO/);
      assert.match(error.message, /tar \(GNU tar\) 1\.35/);
      assert.match(error.message, /PowerShell/);
      return true;
    },
  );
  assert.throws(() => assertProductionTar(''), /DEPLOY BLOQUEADO/);
});
