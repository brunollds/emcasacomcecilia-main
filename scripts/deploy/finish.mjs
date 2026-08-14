// Verifica o release gerenciado depois que o build Hostinger chega a completed.
// Uso: npm run deploy:finish -- --target-sha <SHA> --deploy-uuid <UUID> --build-uuid <UUID>
import { execFileSync } from 'node:child_process';
import { setDefaultResultOrder } from 'node:dns';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

setDefaultResultOrder('ipv4first');

const DOMAIN = 'emcasacomcecilia.com';
const ACCOUNT = 'u150185510';
const ROOT = `/home/${ACCOUNT}/domains/${DOMAIN}`;
const SSH_ARGS = ['-p', '65002', `${ACCOUNT}@46.202.145.2`];
const SHA_RE = /^[0-9a-f]{40}$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const SMOKE_ROUTES = ['/', '/cupons', '/receitas', '/reviews', '/sobre', '/contato', '/sitemap.xml', '/llms.txt'];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function argValue(name, argv = process.argv.slice(2)) {
  const index = argv.indexOf(name);
  return index === -1 ? undefined : argv[index + 1];
}

export function validateFinishInput({ targetSha, deployUuid, buildUuid }) {
  if (!SHA_RE.test(targetSha ?? '')) throw new Error('--target-sha deve ser SHA completo');
  if (!UUID_RE.test(deployUuid ?? '')) throw new Error('--deploy-uuid deve ser UUID canônico');
  if (!UUID_RE.test(buildUuid ?? '')) throw new Error('--build-uuid deve ser UUID canônico');
  return { targetSha, deployUuid, buildUuid };
}

function exactAttestation(value, targetSha, deployUuid) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const keys = Object.keys(value).sort();
  return keys.join(',') === 'deploy_uuid,target_sha'
    && value.target_sha === targetSha
    && value.deploy_uuid === deployUuid;
}

async function waitForAttestation({ targetSha, deployUuid }) {
  const deadline = Date.now() + 240_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`https://${DOMAIN}/api/release?cb=${deployUuid}-${Date.now()}`, {
        headers: { 'Cache-Control': 'no-cache' },
        redirect: 'error',
        signal: AbortSignal.timeout(20_000),
      });
      const body = await response.json();
      if (response.status === 200
        && (response.headers.get('cache-control') ?? '').includes('no-store')
        && exactAttestation(body, targetSha, deployUuid)) {
        return;
      }
    } catch {
      // O build ainda pode estar convergindo; o prazo continua sendo a autoridade.
    }
    await sleep(5_000);
  }
  throw new Error('produção não apresentou a atestação exata em 240s');
}

async function waitForStaticBuild(targetSha) {
  const deadline = Date.now() + 240_000;
  while (Date.now() < deadline) {
    try {
      const url = `https://${DOMAIN}/_next/static/${targetSha}/_buildManifest.js?cb=${Date.now()}`;
      const response = await fetch(url, {
        headers: { 'Cache-Control': 'no-cache' },
        redirect: 'error',
        signal: AbortSignal.timeout(20_000),
      });
      const body = await response.text();
      if (response.status === 200 && body.includes('self.__BUILD_MANIFEST')) return;
    } catch {
      // O CDN pode convergir depois da atestação dinâmica.
    }
    await sleep(5_000);
  }
  throw new Error('manifesto estático do SHA candidato não convergiu em 240s');
}

async function verifySmokeRoutes() {
  for (const route of SMOKE_ROUTES) {
    const separator = route.includes('?') ? '&' : '?';
    const response = await fetch(`https://${DOMAIN}${route}${separator}cb=${Date.now()}`, {
      headers: { 'Cache-Control': 'no-cache' },
      redirect: 'error',
      signal: AbortSignal.timeout(20_000),
    });
    if (response.status !== 200) throw new Error(`${route} respondeu HTTP ${response.status}`);
  }
}

export function parseWorkerRows(output, { targetSha, buildUuid }) {
  const rows = output.trim().split('\n').filter(Boolean).map((line) => {
    const [pid, cwd, buildId] = line.split('\t');
    return { pid, cwd, buildId };
  });
  if (rows.length === 0) throw new Error('nenhum worker next-server encontrado');

  const expectedCwd = `${ROOT}/hbuilds/versions/${buildUuid}/nodejs`;
  for (const row of rows) {
    if (!/^\d+$/.test(row.pid ?? '')) throw new Error(`linha de worker inválida: ${JSON.stringify(row)}`);
    if (row.cwd !== expectedCwd) throw new Error(`worker ${row.pid} serve cwd inesperado: ${row.cwd}`);
    if (row.buildId !== targetSha) throw new Error(`worker ${row.pid} serve BUILD_ID inesperado: ${row.buildId}`);
  }
  return rows;
}

function inspectManagedWorkers({ targetSha, buildUuid }) {
  const remoteCommand = `ROOT='${ROOT}' ACCOUNT='${ACCOUNT}' BUILD_UUID='${buildUuid}' bash -s`;
  const script = String.raw`set -euo pipefail
for pid in $(pgrep -u "$ACCOUNT" -f next-server 2>/dev/null || true); do
  cwd=$(readlink "/proc/$pid/cwd" 2>/dev/null || true)
  case "$cwd" in
    "$ROOT"/*)
      build_id=absent
      [ ! -f "$cwd/.next/BUILD_ID" ] || build_id=$(tr -d '\n' < "$cwd/.next/BUILD_ID")
      printf '%s\t%s\t%s\n' "$pid" "$cwd" "$build_id"
      ;;
  esac
done
`;
  let output;
  try {
    output = execFileSync('ssh', [...SSH_ARGS, remoteCommand], {
      input: script,
      encoding: 'utf8',
      timeout: 30_000,
    });
  } catch (error) {
    throw new Error(`falha ao inventariar workers gerenciados: ${error.message}`);
  }
  return parseWorkerRows(output, { targetSha, buildUuid });
}

async function main() {
  const input = validateFinishInput({
    targetSha: argValue('--target-sha'),
    deployUuid: argValue('--deploy-uuid'),
    buildUuid: argValue('--build-uuid'),
  });

  console.log('[1/4] aguardando atestação exata…');
  await waitForAttestation(input);
  console.log('[2/4] verificando manifesto estático do SHA…');
  await waitForStaticBuild(input.targetSha);
  console.log('[3/4] verificando rotas essenciais…');
  await verifySmokeRoutes();
  console.log('[4/4] inventariando workers no hbuild gerenciado…');
  const workers = inspectManagedWorkers(input);

  console.log(`\n✅ release gerenciado verificado: ${input.targetSha}`);
  console.log(`BUILD_UUID=${input.buildUuid}`);
  console.log(`WORKERS=${workers.length}`);
  console.log('\nEvidência auditável ainda obrigatória:');
  console.log(
    '  gh workflow run hostinger-wire-probe.yml --repo brunollds/emcasacomcecilia-main --ref main -f confirm=CAPTURE_ONLY',
  );
}

const isMain = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isMain) {
  main().catch((error) => {
    console.error(`\n❌ ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  });
}
