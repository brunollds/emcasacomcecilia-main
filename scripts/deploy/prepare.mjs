// Prepara o deploy gerenciado: preflight + build local + source archive atestado.
// Uso: npm run deploy:prepare   [-- --skip-build]
// Imprime o caminho absoluto do archive no fim (pra sessão Claude fazer o upload via MCP).
import { execSync, execFileSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { checkArchiveSize } from './check-archive-size.mjs';
import { assertDeployPreflight, assertProductionSha } from './preflight.mjs';

const args = new Set(process.argv.slice(2));

function git(args, options = {}) {
  return execFileSync('git', args, { encoding: 'utf8', ...options }).trim();
}

async function productionSha() {
  const response = await fetch(`https://emcasacomcecilia.com/api/release?cb=${Date.now()}`, {
    headers: { 'Cache-Control': 'no-cache' },
    redirect: 'error',
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error(`atestação pública respondeu HTTP ${response.status}`);
  return assertProductionSha((await response.json()).target_sha);
}

function currentState() {
  const staged = git(['diff', '--cached', '--name-status']);
  const unstaged = git(['diff', '--name-status']);
  const untracked = git(['ls-files', '--others', '--exclude-standard'])
    .split('\n')
    .filter(Boolean)
    .map((file) => `A\t${file}`)
    .join('\n');
  return {
    status: [staged, unstaged, untracked].filter(Boolean).join('\n'),
    branch: git(['branch', '--show-current']),
    headSha: git(['rev-parse', 'HEAD']),
    originSha: git(['rev-parse', 'origin/main']),
  };
}

export function createAttestedArchive({ targetSha, deployUuid, archivePath }) {
  const temp = mkdtempSync(path.join(os.tmpdir(), 'emcasa-deploy-'));
  const sourceTar = path.join(temp, 'source.tar');
  const staging = path.join(temp, 'staging');
  const archive = archivePath ?? path.resolve(
    '..',
    `emcasacomcecilia-${targetSha.slice(0, 7)}-${deployUuid}.tar.gz`,
  );
  mkdirSync(staging);

  try {
    execFileSync('git', [
      'archive',
      '--format=tar',
      `--output=${sourceTar}`,
      '--prefix=emcasacomcecilia/',
      targetSha,
    ], { stdio: 'inherit' });
    execFileSync('tar', ['-xf', sourceTar, '-C', staging], { stdio: 'inherit' });
    writeFileSync(
      path.join(staging, 'emcasacomcecilia', 'release-meta.json'),
      `${JSON.stringify({ target_sha: targetSha, deploy_uuid: deployUuid })}\n`,
    );
    execFileSync('tar', ['-czf', archive, '-C', staging, 'emcasacomcecilia'], { stdio: 'inherit' });
    const size = checkArchiveSize({ archivePath: archive });
    return { archive, size };
  } catch (error) {
    rmSync(archive, { force: true });
    throw error;
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
}

async function main() {
  console.log('[1/4] conferindo main, origin/main e worktree…');
  execFileSync('git', ['fetch', '--quiet', 'origin'], { stdio: 'inherit' });
  const before = currentState();
  assertDeployPreflight(before);

  const deployedSha = await productionSha();
  const committedDelta = git(['diff', '--name-status', `${deployedSha}..${before.headSha}`]);
  console.log(`  produção: ${deployedSha}`);
  console.log(`  candidato: ${before.headSha}`);
  console.log('  mudanças commitadas entre produção e candidato:');
  console.log(committedDelta || '  (nenhuma; redeploy do mesmo SHA)');

  if (!args.has('--skip-build')) {
    console.log('[2/4] build local (verificação)…');
    execSync('npm run build', { stdio: 'inherit' });
    console.log('  ✅ build ok');
  } else {
    console.log('[2/4] build local ignorado por --skip-build');
  }

  console.log('[3/4] reconferindo worktree após o build…');
  const after = currentState();
  assertDeployPreflight(after);
  if (after.headSha !== before.headSha) throw new Error('HEAD mudou durante a preparação');

  console.log('[4/4] criando archive atestado e aplicando guarda de 45 MB…');
  const deployUuid = randomUUID();
  const { archive, size } = createAttestedArchive({ targetSha: after.headSha, deployUuid });

  console.log(`\n✅ archive pronto: ${archive}`);
  console.log(`TARGET_SHA=${after.headSha}`);
  console.log(`DEPLOY_UUID=${deployUuid}`);
  console.log(`ARCHIVE_BYTES=${size.bytes}`);
  console.log('\nPRÓXIMO PASSO (sessão Codex com MCP Hostinger):');
  console.log(`  hosting_deployJsApplication domain=emcasacomcecilia.com archivePath=${archive}`);
  console.log('  poll até state=completed e registre o build UUID');
  console.log(
    `  npm run deploy:finish -- --target-sha ${after.headSha} --deploy-uuid ${deployUuid} --build-uuid <BUILD_UUID>`,
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
