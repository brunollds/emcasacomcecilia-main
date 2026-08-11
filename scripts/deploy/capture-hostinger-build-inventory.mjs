import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SAFE_BUILD_FIELDS = [
  'uuid',
  'state',
  'created_at',
  'updated_at',
  'started_at',
  'finished_at',
  'source_type',
  'archive_path',
];

const SAFE_OPTION_FIELDS = [
  'node_version',
  'app_type',
  'root_directory',
  'output_directory',
  'build_script',
  'entry_file',
  'package_manager',
  'source_type',
];

function normalizeBuildOptions(options) {
  if (!options || typeof options !== 'object' || Array.isArray(options)) return null;
  const safe = {};
  for (const field of SAFE_OPTION_FIELDS) {
    const value = options[field];
    if (['string', 'number', 'boolean'].includes(typeof value) || value === null) {
      safe[field] = value;
    }
  }
  const archivePath = options.source_options?.archive_path;
  if (typeof archivePath === 'string' || archivePath === null) {
    safe.source_options = { archive_path: archivePath };
  }
  return safe;
}

export function normalizeBuildInventory(payload) {
  const builds = Array.isArray(payload) ? payload : payload?.data;
  if (!Array.isArray(builds)) {
    throw new Error('listagem de builds Hostinger com shape inesperado');
  }

  return {
    total_returned: builds.length,
    pagination: payload && !Array.isArray(payload) && payload.meta
      ? {
          current_page: payload.meta.current_page ?? null,
          last_page: payload.meta.last_page ?? null,
          per_page: payload.meta.per_page ?? null,
          total: payload.meta.total ?? null,
        }
      : null,
    builds: builds.map((build) => {
      if (!build || typeof build !== 'object' || Array.isArray(build)) {
        throw new Error('item de build Hostinger com shape inesperado');
      }
      const safe = {};
      for (const field of SAFE_BUILD_FIELDS) {
        const value = build[field];
        if (['string', 'number', 'boolean'].includes(typeof value) || value === null) {
          safe[field] = value;
        }
      }
      return {
        ...safe,
        options: normalizeBuildOptions(build.options),
        available_fields: Object.keys(build).sort(),
      };
    }),
  };
}

async function main() {
  const token = process.env.HOSTINGER_API_TOKEN;
  const account = process.env.HOSTINGER_ACCOUNT;
  const domain = process.env.HOSTINGER_DOMAIN;
  if (!token || !account || !domain) {
    throw new Error('credenciais Hostinger ausentes para inventário read-only');
  }

  const endpoint = new URL(
    `/api/hosting/v1/accounts/${encodeURIComponent(account)}`
      + `/websites/${encodeURIComponent(domain)}/nodejs/builds`,
    'https://developers.hostinger.com'
  );
  endpoint.searchParams.set('per_page', '50');
  const builds = [];
  let page = 1;
  let expectedTotal = null;
  while (page <= 20) {
    endpoint.searchParams.set('page', String(page));
    const response = await fetch(endpoint, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'emcasa-hostinger-read-only-capture/1',
      },
      redirect: 'error',
      signal: AbortSignal.timeout(20_000),
    });
    if (!response.ok) {
      throw new Error(`Hostinger HTTP ${response.status} ao listar builds (página ${page})`);
    }
    const inventory = normalizeBuildInventory(await response.json());
    builds.push(...inventory.builds);
    expectedTotal = inventory.pagination?.total ?? expectedTotal;
    if (inventory.builds.length === 0
      || (expectedTotal !== null && builds.length >= expectedTotal)
      || inventory.builds.length < 50) {
      break;
    }
    page += 1;
  }
  if (expectedTotal !== null && builds.length < expectedTotal) {
    throw new Error(`inventário incompleto: ${builds.length}/${expectedTotal} builds`);
  }

  const inventory = {
    total_returned: builds.length,
    pagination: {
      pages_captured: page,
      per_page: 50,
      total: expectedTotal,
    },
    builds,
  };
  const outputPath = path.resolve(
    process.env.BUILD_INVENTORY_OUTPUT ?? 'artifacts/managed-builds.json'
  );
  mkdirSync(path.dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify({
    captured_at: new Date().toISOString(),
    endpoint: endpoint.pathname,
    ...inventory,
  }, null, 2)}\n`, 'utf8');
  console.log(`inventário read-only preservado: ${inventory.total_returned} build(s)`);
}

const isMain = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isMain) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
