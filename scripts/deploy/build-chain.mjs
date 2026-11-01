import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const SCRIPT_IN_BUILD = /(?:^|[\s&;|(])((?:\.\/)?scripts\/[\w./-]+\.(?:mjs|cjs|js|ts|mts))(?=$|[\s&;|)])/g;
const RELATIVE_IMPORT = /(?:\bfrom\s+|\bimport\s*\(?\s*)['"](\.{1,2}\/[^'"]+)['"]/g;
const EXTENSIONS = ['', '.ts', '.mts', '.mjs', '.js', '.cjs', '.json', '/index.ts', '/index.mjs', '/index.js'];

function resolveImport(fromFile, specifier) {
  const base = path.resolve(path.dirname(fromFile), specifier);
  for (const extension of EXTENSIONS) {
    const candidate = base + extension;
    if (existsSync(candidate) && !candidate.endsWith(path.sep)) return candidate;
  }
  return null;
}

// Todo script que o `npm run build` chama precisa estar no archive, e também os módulos de
// `scripts/` que ele importa por caminho relativo: o build gerenciado roda só do archive, então
// um `export-ignore` no .gitattributes passa no build local e quebra o da Hostinger (#450).
// Imports para fora de `scripts/` ficam de fora: `src/` vai inteiro, e o índice gerado sai do build.
export function findMissingBuildChainFiles(rootDir) {
  const scriptsDir = path.join(rootDir, 'scripts');
  const build = JSON.parse(readFileSync(path.join(rootDir, 'package.json'), 'utf8')).scripts?.build ?? '';
  const missing = new Set();
  const seen = new Set();
  const queue = [];

  for (const match of build.matchAll(SCRIPT_IN_BUILD)) {
    const file = path.join(rootDir, match[1]);
    if (existsSync(file)) queue.push(file);
    else missing.add(`${match[1]} (chamado pelo build)`);
  }

  while (queue.length > 0) {
    const file = queue.pop();
    if (seen.has(file)) continue;
    seen.add(file);
    if (file.endsWith('.json')) continue;
    for (const match of readFileSync(file, 'utf8').matchAll(RELATIVE_IMPORT)) {
      const target = path.resolve(path.dirname(file), match[1]);
      if (!target.startsWith(scriptsDir + path.sep)) continue;
      const resolved = resolveImport(file, match[1]);
      if (resolved) queue.push(resolved);
      else {
        const from = path.relative(rootDir, file).split(path.sep).join('/');
        missing.add(`${path.relative(rootDir, target).split(path.sep).join('/')} (importado por ${from})`);
      }
    }
  }

  return [...missing].sort();
}

export function assertBuildChainFiles(rootDir) {
  const missing = findMissingBuildChainFiles(rootDir);
  if (missing.length > 0) {
    throw new Error(
      `DEPLOY BLOQUEADO: o archive não tem arquivos que o npm run build usa; confira o export-ignore do .gitattributes:\n  ${missing.join('\n  ')}`,
    );
  }
}
