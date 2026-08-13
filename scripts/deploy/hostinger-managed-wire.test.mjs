import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, rmSync, truncateSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { normalizeBuildInventory } from './capture-hostinger-build-inventory.mjs';
import {
  assertProviderIdle,
  DispatchUnknownError,
  isExactAttestation,
  ProviderBusyError,
  ProviderHttpError,
  runManagedWireProbe,
  triggerBuild,
  validateProbeInput,
  waitForStaticBuild,
} from './hostinger-managed-wire.mjs';

const TARGET_SHA = 'a'.repeat(40);
const DEPLOY_UUID = '00000000-0000-4000-8000-000000000001';
const BUILD_UUID = '019fd93f-c255-73a8-b44f-3a836b2af17d';

const WORKFLOW_PATH = new URL('../../.github/workflows/hostinger-wire-probe.yml', import.meta.url);
const EXECUTABLE_LEGACY_WORKFLOW_PATH = new URL('../../.github/workflows/deploy.yml', import.meta.url);
const ARCHIVED_LEGACY_WORKFLOW_PATH = new URL('../../docs/deploy-ssh-inactive.yml', import.meta.url);

async function withFakeProvider(fn, options = {}) {
  let offset = 0;
  let uploadLength = 0;
  let uploadBytes = 0;
  let listCalls = 0;
  let preflightCalls = 0;
  let buildBody;
  const apiAuthorizations = [];
  const server = createServer(async (request, response) => {
    const url = new URL(request.url, 'http://127.0.0.1');
    if (url.pathname.startsWith('/api/hosting/')) {
      apiAuthorizations.push(request.headers.authorization);
    }
    if (request.method === 'POST' && url.pathname === '/api/hosting/v1/files/upload-urls') {
      response.setHeader('content-type', 'application/json');
      response.end(JSON.stringify({
        url: `http://127.0.0.1:${server.address().port}/upload`,
        auth_key: 'upload-auth',
        rest_auth_key: 'upload-rest-auth',
      }));
      return;
    }
    if (url.pathname === '/upload/probe.tar.gz') {
      assert.equal(request.headers['x-auth'], 'upload-auth');
      assert.equal(request.headers['x-auth-rest'], 'upload-rest-auth');
      if (request.method === 'POST') {
        uploadLength = Number(request.headers['upload-length']);
        response.statusCode = 201;
        response.end();
        return;
      }
      if (request.method === 'HEAD') {
        response.setHeader('Tus-Resumable', '1.0.0');
        response.setHeader('Upload-Offset', String(offset));
        response.setHeader('Upload-Length', String(uploadLength));
        response.statusCode = 200;
        response.end();
        return;
      }
      if (request.method === 'PATCH') {
        assert.equal(Number(request.headers['upload-offset']), offset);
        for await (const chunk of request) uploadBytes += chunk.length;
        offset = uploadBytes;
        response.setHeader('Tus-Resumable', '1.0.0');
        response.setHeader('Upload-Offset', String(offset));
        response.statusCode = 204;
        response.end();
        return;
      }
    }
    if (request.method === 'GET' && url.pathname.endsWith('/nodejs/builds/settings/from-archive')) {
      assert.equal(url.searchParams.get('archive_path'), 'probe.tar.gz');
      response.setHeader('content-type', 'application/json');
      response.end(JSON.stringify({ app_type: 'next', build_script: 'build', root_directory: 'app' }));
      return;
    }
    if (request.method === 'POST' && url.pathname.endsWith('/nodejs/builds')) {
      let raw = '';
      for await (const chunk of request) raw += chunk;
      buildBody = JSON.parse(raw);
      response.setHeader('content-type', 'application/json');
      response.end(JSON.stringify({ uuid: BUILD_UUID, state: 'pending' }));
      return;
    }
    if (request.method === 'GET' && url.pathname.endsWith('/nodejs/builds')) {
      response.setHeader('content-type', 'application/json');
      if (!buildBody) {
        preflightCalls++;
        response.end(JSON.stringify({
          data: options.activePreflightCall === preflightCalls
            ? [{ uuid: BUILD_UUID, state: 'running' }]
            : [],
        }));
        return;
      }
      listCalls++;
      response.end(JSON.stringify({
        data: [{ uuid: BUILD_UUID, state: listCalls === 1 ? 'running' : 'completed' }],
      }));
      return;
    }
    if (request.method === 'GET' && url.pathname === '/api/release') {
      response.setHeader('content-type', 'application/json');
      response.setHeader('cache-control', 'no-store');
      response.end(JSON.stringify({ target_sha: TARGET_SHA, deploy_uuid: DEPLOY_UUID }));
      return;
    }
    if (request.method === 'GET'
      && url.pathname === `/_next/static/${TARGET_SHA}/_buildManifest.js`) {
      response.setHeader('content-type', 'application/javascript');
      response.end('self.__BUILD_MANIFEST={}');
      return;
    }
    response.statusCode = 404;
    response.end();
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  try {
    await fn({
      origin: `http://127.0.0.1:${server.address().port}`,
      getUploadBytes: () => uploadBytes,
      getBuildBody: () => buildBody,
      getPreflightCalls: () => preflightCalls,
      getApiAuthorizations: () => apiAuthorizations,
    });
  } finally {
    server.closeAllConnections();
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}

test('reproduz upload TUS → build → attestation dinâmica + BUILD_ID estático', async () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'hostinger-wire-'));
  const archivePath = path.join(dir, 'probe.tar.gz');
  const archive = Buffer.from('archive-fixture');
  writeFileSync(archivePath, archive);
  try {
    await withFakeProvider(async ({
      origin,
      getUploadBytes,
      getBuildBody,
      getPreflightCalls,
      getApiAuthorizations,
    }) => {
      const dispatchedEvents = [];
      const result = await runManagedWireProbe({
        apiBase: origin,
        token: 'ci-token-must-not-be-logged',
        username: 'account',
        domain: '127.0.0.1',
        archivePath,
        targetSha: TARGET_SHA,
        deployUuid: DEPLOY_UUID,
        pollIntervalMs: 0,
        attestationPollMs: 0,
        sleepImpl: async () => {},
        fetchImpl: (url, options) => {
          const parsed = new URL(url);
          if (parsed.hostname === '127.0.0.1'
            && (parsed.pathname === '/api/release'
              || parsed.pathname === `/_next/static/${TARGET_SHA}/_buildManifest.js`)) {
            return fetch(`${origin}${parsed.pathname}${parsed.search}`, options);
          }
          return fetch(url, options);
        },
        onDispatched: (event) => dispatchedEvents.push(event),
      });
      assert.equal(getUploadBytes(), archive.length);
      assert.equal(getPreflightCalls(), 2);
      assert.deepEqual(getBuildBody().source_options, { archive_path: 'probe.tar.gz' });
      assert.equal(getBuildBody().source_type, 'archive');
      assert.equal(result.status, 'completed-and-verified');
      assert.equal(result.static_build_id, TARGET_SHA);
      assert.deepEqual(result.states, ['running', 'completed']);
      assert.deepEqual(dispatchedEvents, [{
        status: 'dispatched',
        archive_name: 'probe.tar.gz',
        build_uuid: BUILD_UUID,
        initial_state: 'pending',
      }]);
      assert.ok(getApiAuthorizations().length >= 4);
      assert.ok(getApiAuthorizations().every((value) => value === 'Bearer ci-token-must-not-be-logged'));
    });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('build ativo bloqueia antes de obter credencial ou enviar archive', async () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'hostinger-wire-busy-first-'));
  const archivePath = path.join(dir, 'probe.tar.gz');
  writeFileSync(archivePath, 'archive-fixture');
  try {
    await withFakeProvider(async ({ origin, getUploadBytes, getBuildBody }) => {
      await assert.rejects(
        runManagedWireProbe({
          apiBase: origin,
          token: 'token',
          username: 'account',
          domain: '127.0.0.1',
          archivePath,
          targetSha: TARGET_SHA,
          deployUuid: DEPLOY_UUID,
          fetchImpl: fetch,
        }),
        ProviderBusyError
      );
      assert.equal(getUploadBytes(), 0);
      assert.equal(getBuildBody(), undefined);
    }, { activePreflightCall: 1 });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('build iniciado durante upload bloqueia antes do POST de dispatch', async () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'hostinger-wire-busy-second-'));
  const archivePath = path.join(dir, 'probe.tar.gz');
  const archive = Buffer.from('archive-fixture');
  writeFileSync(archivePath, archive);
  try {
    await withFakeProvider(async ({ origin, getUploadBytes, getBuildBody }) => {
      await assert.rejects(
        runManagedWireProbe({
          apiBase: origin,
          token: 'token',
          username: 'account',
          domain: '127.0.0.1',
          archivePath,
          targetSha: TARGET_SHA,
          deployUuid: DEPLOY_UUID,
          fetchImpl: fetch,
        }),
        ProviderBusyError
      );
      assert.equal(getUploadBytes(), archive.length);
      assert.equal(getBuildBody(), undefined);
    }, { activePreflightCall: 2 });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('fence percorre paginação e encontra build ativo depois da primeira página', async () => {
  let calls = 0;
  const completed = Array.from({ length: 50 }, (_, index) => ({
    uuid: `00000000-0000-4000-8000-${String(index).padStart(12, '0')}`,
    state: 'completed',
  }));
  await assert.rejects(
    assertProviderIdle({
      apiBase: 'https://provider.invalid',
      token: 'token',
      username: 'account',
      domain: 'example.com',
      fetchImpl: async (url) => {
        calls++;
        const page = new URL(url).searchParams.get('page');
        return new Response(JSON.stringify({
          data: page === '1' ? completed : [{ uuid: BUILD_UUID, state: 'pending' }],
          meta: { total: 51 },
        }), { status: 200, headers: { 'content-type': 'application/json' } });
      },
    }),
    ProviderBusyError
  );
  assert.equal(calls, 2);
});

test('workflow é somente leitura e não cria deployment em production', () => {
  const workflow = readFileSync(WORKFLOW_PATH, 'utf8');
  assert.match(workflow, /if: inputs\.confirm == 'CAPTURE_ONLY'/);
  assert.match(workflow, /name: production-observe/);
  assert.doesNotMatch(workflow, /PROBE_PRODUCTION/);
  assert.doesNotMatch(workflow, /name: production\s*$/m);
  assert.doesNotMatch(workflow, /probe:hostinger-wire|Execute exact managed wire/);
  assert.match(workflow, /steps\.artifact_scan\.outcome == 'success'/);
});

test('workflow SSH legado fica arquivado fora do diretório executável', () => {
  assert.equal(existsSync(EXECUTABLE_LEGACY_WORKFLOW_PATH), false);
  assert.equal(existsSync(ARCHIVED_LEGACY_WORKFLOW_PATH), true);
  assert.match(readFileSync(ARCHIVED_LEGACY_WORKFLOW_PATH, 'utf8'), /name: Deploy emcasa \(manual\)/);
});

test('inventário de builds preserva histórico útil sem valores desconhecidos', () => {
  const inventory = normalizeBuildInventory({
    data: [{
      uuid: BUILD_UUID,
      state: 'completed',
      created_at: '2026-08-10T18:30:00Z',
      options: {
        node_version: 20,
        source_type: 'archive',
        source_options: {
          archive_path: 'old-release.tar.gz',
          SECRET: 'não pode sair no artefato',
        },
      },
      environment_variables: { SECRET: 'não pode sair no artefato' },
    }],
    meta: { current_page: 1, last_page: 1, per_page: 50, total: 1 },
  });

  assert.equal(inventory.total_returned, 1);
  assert.equal(inventory.builds[0].uuid, BUILD_UUID);
  assert.equal(inventory.builds[0].state, 'completed');
  assert.deepEqual(inventory.builds[0].options, {
    node_version: 20,
    source_type: 'archive',
    source_options: { archive_path: 'old-release.tar.gz' },
  });
  assert.deepEqual(inventory.pagination, {
    current_page: 1,
    last_page: 1,
    per_page: 50,
    total: 1,
  });
  assert.ok(inventory.builds[0].available_fields.includes('environment_variables'));
  assert.equal(JSON.stringify(inventory).includes('não pode sair no artefato'), false);
});

test('falso 200 sem build manifest mantém o estado ambíguo', async () => {
  await assert.rejects(
    waitForStaticBuild({
      domain: 'example.com',
      targetSha: TARGET_SHA,
      deployUuid: DEPLOY_UUID,
      staticTimeoutMs: 1,
      staticPollMs: 0,
      sleepImpl: async () => {},
      fetchImpl: async () => new Response('<html>fallback</html>', {
        status: 200,
        headers: { 'content-type': 'text/html' },
      }),
    }),
    /sem BUILD_ID estático exato/
  );
});

test('POST ambíguo vira dispatch-unknown e não é repetido', async () => {
  let calls = 0;
  const fetchImpl = async () => {
    calls++;
    throw new TypeError('socket encerrado depois do aceite');
  };
  await assert.rejects(
    triggerBuild({
      apiBase: 'https://provider.invalid',
      token: 'secret-never-in-error',
      username: 'account',
      domain: 'example.com',
      fetchImpl,
    }, 'probe.tar.gz', { build_script: 'build' }),
    (error) => error instanceof DispatchUnknownError
      && error.message === 'dispatch-unknown para probe.tar.gz; não repetir o POST automaticamente'
      && !error.message.includes('secret-never-in-error')
  );
  assert.equal(calls, 1);
});

test('rejeição determinística do POST não vira dispatch-unknown', async () => {
  let calls = 0;
  const fetchImpl = async () => {
    calls++;
    return new Response(JSON.stringify({ error: 'denied' }), {
      status: 403,
      headers: { 'content-type': 'application/json' },
    });
  };
  await assert.rejects(
    triggerBuild({
      apiBase: 'https://provider.invalid',
      token: 'secret-never-in-error',
      username: 'account',
      domain: 'example.com',
      fetchImpl,
    }, 'probe.tar.gz', { build_script: 'build' }),
    (error) => error instanceof ProviderHttpError
      && error.status === 403
      && !error.message.includes('secret-never-in-error')
  );
  assert.equal(calls, 1);
});

test('attestation exige shape e identidade exatos', () => {
  assert.equal(isExactAttestation({ target_sha: TARGET_SHA, deploy_uuid: DEPLOY_UUID }, TARGET_SHA, DEPLOY_UUID), true);
  assert.equal(isExactAttestation({ target_sha: TARGET_SHA, deploy_uuid: DEPLOY_UUID, extra: true }, TARGET_SHA, DEPLOY_UUID), false);
  assert.equal(isExactAttestation({ target_sha: 'b'.repeat(40), deploy_uuid: DEPLOY_UUID }, TARGET_SHA, DEPLOY_UUID), false);
  assert.equal(isExactAttestation(null, TARGET_SHA, DEPLOY_UUID), false);
});

test('validação recusa archive no teto do provider antes da rede', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'hostinger-wire-limit-'));
  const archivePath = path.join(dir, 'probe.tar.gz');
  try {
    writeFileSync(archivePath, '');
    truncateSync(archivePath, 50_000_000);
    assert.throws(() => validateProbeInput({
      token: 'token',
      username: 'account',
      domain: 'example.com',
      archivePath,
      targetSha: TARGET_SHA,
      deployUuid: DEPLOY_UUID,
    }), /archive excede limite do provider/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
