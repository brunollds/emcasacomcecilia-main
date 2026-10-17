import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const PRINT_SCRIPT = fileURLToPath(new URL('./print-locale-search-stores.ts', import.meta.url));
const PROJECT_ROOT = fileURLToPath(new URL('../../', import.meta.url));

// As páginas de loja de cada idioma ({ en: [...], ... }). Os dados das lojas são TS e este script roda
// com o node puro (node scripts/content/build-index.mjs), então o tsx lê os dados num processo à parte.
export function loadLocaleSearchStores() {
  const output = execFileSync(process.execPath, [require.resolve('tsx/cli'), PRINT_SCRIPT], {
    cwd: PROJECT_ROOT,
    encoding: 'utf8',
  });
  return JSON.parse(output);
}
