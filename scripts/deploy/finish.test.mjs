import assert from 'node:assert/strict';
import test from 'node:test';

import { parseWorkerRows, validateFinishInput } from './finish.mjs';

const TARGET_SHA = 'a'.repeat(40);
const DEPLOY_UUID = '00000000-0000-4000-8000-000000000001';
const BUILD_UUID = '00000000-0000-4000-8000-000000000002';
const CWD = `/home/u150185510/domains/emcasacomcecilia.com/hbuilds/versions/${BUILD_UUID}/nodejs`;

test('exige as três identidades completas', () => {
  assert.deepEqual(validateFinishInput({
    targetSha: TARGET_SHA,
    deployUuid: DEPLOY_UUID,
    buildUuid: BUILD_UUID,
  }), {
    targetSha: TARGET_SHA,
    deployUuid: DEPLOY_UUID,
    buildUuid: BUILD_UUID,
  });
  assert.throws(
    () => validateFinishInput({ targetSha: 'abc', deployUuid: DEPLOY_UUID, buildUuid: BUILD_UUID }),
    /target-sha/,
  );
});

test('aceita somente workers do hbuild e BUILD_ID esperados', () => {
  const rows = parseWorkerRows(
    `101\t${CWD}\t${TARGET_SHA}\n102\t${CWD}\t${TARGET_SHA}\n`,
    { targetSha: TARGET_SHA, buildUuid: BUILD_UUID },
  );
  assert.equal(rows.length, 2);
});

test('bloqueia worker antigo ou fora do build candidato', () => {
  assert.throws(
    () => parseWorkerRows(`101\t${CWD}\t${'b'.repeat(40)}\n`, {
      targetSha: TARGET_SHA,
      buildUuid: BUILD_UUID,
    }),
    /BUILD_ID inesperado/,
  );
});
