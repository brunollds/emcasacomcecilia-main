// Prepara o deploy do emcasa: build local de verificação + archive da revisão commitada.
// Uso: npm run deploy:prepare   [-- --skip-build]
// Imprime o caminho absoluto do archive no fim (pra sessão Claude fazer o upload via MCP).
import { execSync, execFileSync } from 'node:child_process';
import path from 'node:path';

const args = new Set(process.argv.slice(2));

// 1. build local de verificação (pega erro antes de subir; o build de produção é no servidor)
if (!args.has('--skip-build')) {
  console.log('[1/2] build local (verificação)…');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('  ✅ build ok');
}

// 2. archive da revisão commitada (HEAD), com prefixo emcasacomcecilia/
console.log('[2/2] criando archive da revisão commitada…');
const parent = path.resolve('..');
const archive = path.join(parent, 'emcasacomcecilia-deploy.tar.gz');
const dirty = execSync('git status --short', { encoding: 'utf8' }).trim();
if (dirty) {
  console.log('  ⚠️ working tree suja detectada: o archive vai levar apenas o HEAD commitado.');
}

execFileSync('git', [
  'archive',
  '--format=tar.gz',
  `--output=${archive}`,
  '--prefix=emcasacomcecilia/',
  'HEAD',
], { stdio: 'inherit' });

console.log(`\n✅ archive pronto: ${archive}`);
console.log('\nPRÓXIMO PASSO (sessão Claude com MCP Hostinger):');
console.log(`  hosting_deployJsApplication  domain=emcasacomcecilia.com  archivePath=${archive}`);
console.log('  poll hosting_listJsDeployments até state=completed');
console.log('  então: npm run deploy:finish');
