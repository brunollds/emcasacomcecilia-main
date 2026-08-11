import { createReadStream, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import * as tus from 'tus-js-client';

const DEFAULT_API_BASE = 'https://developers.hostinger.com';
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const SHA_RE = /^[0-9a-f]{40}$/;
const ARCHIVE_RE = /^[a-zA-Z0-9][a-zA-Z0-9._-]*\.(?:zip|tar\.gz|tgz)$/;
const MAX_PROVIDER_ARCHIVE_BYTES = 50_000_000;

export class DispatchUnknownError extends Error {
  constructor(archiveName, options) {
    super(`dispatch-unknown para ${archiveName}; não repetir o POST automaticamente`, options);
    this.name = 'DispatchUnknownError';
    this.archiveName = archiveName;
  }
}

export class ProviderHttpError extends Error {
  constructor(status, method, pathname, correlation) {
    super(
      `Hostinger HTTP ${status} em ${method} ${pathname}`
      + (correlation ? ` (correlation_id=${correlation})` : '')
    );
    this.name = 'ProviderHttpError';
    this.status = status;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function endpoint(baseUrl, pathname) {
  return new URL(pathname.replace(/^\//, ''), `${baseUrl.replace(/\/$/, '')}/`);
}

export function validateProbeInput({ token, username, domain, archivePath, targetSha, deployUuid }) {
  if (!token) throw new Error('HOSTINGER_API_TOKEN ausente');
  if (!/^[a-zA-Z0-9._-]+$/.test(username)) throw new Error('HOSTINGER_ACCOUNT inválido');
  if (!/^[a-z0-9.-]+$/.test(domain)) throw new Error('HOSTINGER_DOMAIN inválido');
  if (!SHA_RE.test(targetSha)) throw new Error('TARGET_SHA deve ser 40 hex minúsculos');
  if (!UUID_RE.test(deployUuid)) throw new Error('DEPLOY_UUID deve ser UUID canônico minúsculo');

  const archiveName = path.basename(archivePath);
  if (!ARCHIVE_RE.test(archiveName)) throw new Error('nome/formato do archive inválido');
  const size = statSync(archivePath).size;
  if (size >= MAX_PROVIDER_ARCHIVE_BYTES) {
    throw new Error(`archive excede limite do provider: ${size} >= ${MAX_PROVIDER_ARCHIVE_BYTES}`);
  }
  return { archiveName, size };
}

function authHeaders(token) {
  return {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'User-Agent': 'emcasa-hostinger-wire-probe/1',
  };
}

async function apiJson(url, { token, method = 'GET', body, fetchImpl = fetch, timeoutMs = 60_000 }) {
  let response;
  try {
    response = await fetchImpl(url, {
      method,
      headers: authHeaders(token),
      body: body === undefined ? undefined : JSON.stringify(body),
      redirect: 'error',
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (error) {
    throw new Error(`falha de transporte em ${method} ${new URL(url).pathname}`, { cause: error });
  }
  if (!response.ok) {
    const correlation = response.headers.get('x-correlation-id');
    throw new ProviderHttpError(response.status, method, new URL(url).pathname, correlation);
  }
  try {
    return await response.json();
  } catch (error) {
    throw new Error(`JSON inválido em ${method} ${new URL(url).pathname}`, { cause: error });
  }
}

export async function fetchUploadCredentials(config) {
  const data = await apiJson(endpoint(config.apiBase, '/api/hosting/v1/files/upload-urls'), {
    token: config.token,
    method: 'POST',
    body: { username: config.username, domain: config.domain },
    fetchImpl: config.fetchImpl,
  });
  const uploadUrl = data?.url ?? data?.uploadUrl;
  const authToken = data?.auth_key ?? data?.authToken;
  const authRestToken = data?.rest_auth_key ?? data?.authRestToken;
  if (![uploadUrl, authToken, authRestToken].every((value) => typeof value === 'string' && value)) {
    throw new Error('credenciais de upload Hostinger com shape inesperado');
  }
  return { uploadUrl, authToken, authRestToken };
}

export async function uploadArchive(config, credentials) {
  const archiveName = path.basename(config.archivePath);
  const uploadUrl = `${credentials.uploadUrl.replace(/\/$/, '')}/${archiveName}?override=true`;
  const size = statSync(config.archivePath).size;
  const headers = {
    'Tus-Resumable': '1.0.0',
    'X-Auth': credentials.authToken,
    'X-Auth-Rest': credentials.authRestToken,
    'upload-length': String(size),
    'upload-offset': '0',
  };

  let created;
  try {
    created = await (config.fetchImpl ?? fetch)(uploadUrl, {
      method: 'POST',
      headers,
      redirect: 'error',
      signal: AbortSignal.timeout(60_000),
    });
  } catch (error) {
    throw new Error('falha de transporte ao preparar upload TUS', { cause: error });
  }
  if (created.status !== 201) {
    throw new Error(`Hostinger HTTP ${created.status} ao preparar upload TUS`);
  }

  await new Promise((resolve, reject) => {
    const upload = new (config.UploadClass ?? tus.Upload)(createReadStream(config.archivePath), {
      uploadUrl,
      retryDelays: [1_000, 2_000, 4_000, 8_000, 16_000, 20_000],
      uploadDataDuringCreation: false,
      parallelUploads: 1,
      chunkSize: 10 * 1024 * 1024,
      headers,
      removeFingerprintOnSuccess: true,
      uploadSize: size,
      metadata: { filename: archiveName },
      onError: (error) => reject(new Error('upload TUS falhou', { cause: error })),
      onSuccess: resolve,
    });
    upload.start();
  });
}

export async function fetchBuildSettings(config, archiveName) {
  const url = endpoint(
    config.apiBase,
    `/api/hosting/v1/accounts/${encodeURIComponent(config.username)}/websites/${encodeURIComponent(config.domain)}`
      + `/nodejs/builds/settings/from-archive?archive_path=${encodeURIComponent(archiveName)}`
  );
  const settings = await apiJson(url, { token: config.token, fetchImpl: config.fetchImpl });
  if (!settings || typeof settings !== 'object' || Array.isArray(settings)) {
    throw new Error('build settings Hostinger com shape inesperado');
  }
  return settings;
}

export async function triggerBuild(config, archiveName, settings) {
  const url = endpoint(
    config.apiBase,
    `/api/hosting/v1/accounts/${encodeURIComponent(config.username)}/websites/${encodeURIComponent(config.domain)}/nodejs/builds`
  );
  const body = {
    ...settings,
    node_version: settings.node_version || 20,
    source_type: 'archive',
    source_options: { archive_path: archiveName },
  };
  let data;
  try {
    data = await apiJson(url, {
      token: config.token,
      method: 'POST',
      body,
      fetchImpl: config.fetchImpl,
    });
  } catch (error) {
    const deterministicStatuses = new Set([400, 401, 403, 404, 409, 413, 422, 429]);
    if (error instanceof ProviderHttpError && deterministicStatuses.has(error.status)) throw error;
    throw new DispatchUnknownError(archiveName, { cause: error });
  }
  if (!UUID_RE.test(data?.uuid ?? '') || typeof data?.state !== 'string') {
    throw new DispatchUnknownError(archiveName);
  }
  return { uuid: data.uuid, state: data.state };
}

async function listBuilds(config) {
  const url = endpoint(
    config.apiBase,
    `/api/hosting/v1/accounts/${encodeURIComponent(config.username)}/websites/${encodeURIComponent(config.domain)}`
      + '/nodejs/builds?page=1&per_page=50'
  );
  const data = await apiJson(url, { token: config.token, fetchImpl: config.fetchImpl });
  const builds = Array.isArray(data) ? data : data?.data;
  if (!Array.isArray(builds)) throw new Error('listagem de builds Hostinger com shape inesperado');
  return builds;
}

export async function waitForBuild(config, buildUuid) {
  const deadline = Date.now() + (config.buildTimeoutMs ?? 10 * 60_000);
  const states = [];
  while (Date.now() < deadline) {
    const build = (await listBuilds(config)).find((item) => item?.uuid === buildUuid);
    if (!build) {
      await (config.sleepImpl ?? sleep)(config.pollIntervalMs ?? 10_000);
      continue;
    }
    if (states.at(-1) !== build.state) states.push(build.state);
    if (build.state === 'completed') return { build, states };
    if (build.state === 'failed') throw new Error(`build ${buildUuid} terminou em failed`);
    if (!['pending', 'running'].includes(build.state)) {
      throw new Error(`estado de build desconhecido: ${build.state}`);
    }
    await (config.sleepImpl ?? sleep)(config.pollIntervalMs ?? 10_000);
  }
  throw new Error(`build ${buildUuid} não chegou a estado terminal no prazo`);
}

export function isExactAttestation(value, targetSha, deployUuid) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const keys = Object.keys(value).sort();
  return keys.length === 2
    && keys[0] === 'deploy_uuid'
    && keys[1] === 'target_sha'
    && value.target_sha === targetSha
    && value.deploy_uuid === deployUuid;
}

export async function waitForAttestation(config) {
  const deadline = Date.now() + (config.attestationTimeoutMs ?? 2 * 60_000);
  while (Date.now() < deadline) {
    try {
      const response = await (config.fetchImpl ?? fetch)(
        `https://${config.domain}/api/release?cb=${encodeURIComponent(config.deployUuid)}-${Date.now()}`,
        {
          headers: { 'Cache-Control': 'no-cache' },
          redirect: 'error',
          signal: AbortSignal.timeout(20_000),
        }
      );
      const cacheControl = response.headers.get('cache-control');
      const body = await response.json();
      if (response.status === 200 && cacheControl === 'no-store'
        && isExactAttestation(body, config.targetSha, config.deployUuid)) {
        return body;
      }
    } catch {
      // Convergência ainda não ocorreu; o prazo limitado continua sendo autoridade.
    }
    await (config.sleepImpl ?? sleep)(config.attestationPollMs ?? 3_000);
  }
  throw new Error('build completed sem attestation exata no prazo; estado ambíguo');
}

export async function waitForStaticBuild(config) {
  const deadline = Date.now() + (config.staticTimeoutMs ?? 2 * 60_000);
  const manifestUrl = `https://${config.domain}/_next/static/${config.targetSha}/_buildManifest.js`;
  while (Date.now() < deadline) {
    try {
      const response = await (config.fetchImpl ?? fetch)(
        `${manifestUrl}?cb=${encodeURIComponent(config.deployUuid)}-${Date.now()}`,
        {
          headers: { 'Cache-Control': 'no-cache' },
          redirect: 'error',
          signal: AbortSignal.timeout(20_000),
        }
      );
      const contentType = response.headers.get('content-type') ?? '';
      const body = await response.text();
      if (response.status === 200
        && contentType.includes('javascript')
        && body.includes('self.__BUILD_MANIFEST')) {
        return manifestUrl;
      }
    } catch {
      // O artefato estático ainda não convergiu; o prazo limitado continua sendo autoridade.
    }
    await (config.sleepImpl ?? sleep)(config.staticPollMs ?? 3_000);
  }
  throw new Error('build completed sem BUILD_ID estático exato no prazo; estado ambíguo');
}

export async function runManagedWireProbe(input) {
  const config = { apiBase: DEFAULT_API_BASE, ...input };
  const { archiveName, size } = validateProbeInput(config);
  const credentials = await fetchUploadCredentials(config);
  await uploadArchive(config, credentials);
  const settings = await fetchBuildSettings(config, archiveName);
  const dispatched = await triggerBuild(config, archiveName, settings);
  config.onDispatched?.({
    status: 'dispatched',
    archive_name: archiveName,
    build_uuid: dispatched.uuid,
    initial_state: dispatched.state,
  });
  const completed = await waitForBuild(config, dispatched.uuid);
  await waitForAttestation(config);
  await waitForStaticBuild(config);
  return {
    status: 'completed-and-verified',
    archive_name: archiveName,
    archive_bytes: size,
    build_uuid: dispatched.uuid,
    states: completed.states,
    target_sha: config.targetSha,
    deploy_uuid: config.deployUuid,
    static_build_id: config.targetSha,
  };
}

async function main() {
  if (!process.argv.includes('--execute')) {
    throw new Error('execução recusada: use --execute apenas no workflow supervisionado');
  }
  const result = await runManagedWireProbe({
    token: process.env.HOSTINGER_API_TOKEN,
    username: process.env.HOSTINGER_ACCOUNT,
    domain: process.env.HOSTINGER_DOMAIN,
    archivePath: path.resolve(process.env.ARCHIVE_PATH ?? ''),
    targetSha: process.env.TARGET_SHA,
    deployUuid: process.env.DEPLOY_UUID,
    onDispatched: (event) => console.log(JSON.stringify(event)),
  });
  console.log(JSON.stringify(result));
}

const isMain = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isMain) {
  main().catch((error) => {
    const kind = error instanceof DispatchUnknownError ? 'dispatch-unknown' : 'failed';
    console.error(`[hostinger-wire] ${kind}: ${error instanceof Error ? error.message : error}`);
    process.exitCode = error instanceof DispatchUnknownError ? 2 : 1;
  });
}
