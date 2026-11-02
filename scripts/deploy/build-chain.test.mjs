import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { assertBuildChainFiles, findMissingBuildChainFiles } from './build-chain.mjs';

function project(t, build, files) {
  const root = mkdtempSync(path.join(os.tmpdir(), 'build-chain-test-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  writeFileSync(path.join(root, 'package.json'), JSON.stringify({ scripts: { build } }));
  for (const [name, content] of Object.entries(files)) {
    mkdirSync(path.dirname(path.join(root, name)), { recursive: true });
    writeFileSync(path.join(root, name), content);
  }
  return root;
}

test('aceita o build com todos os scripts e imports relativos presentes', (t) => {
  const root = project(t, 'node scripts/a.mjs && tsx scripts/b.ts && next build', {
    'scripts/a.mjs': "import './lib/c.mjs';\n",
    'scripts/lib/c.mjs': 'export const c = 1;\n',
    'scripts/b.ts': "import data from './data.json';\nimport { x } from '../src/lib/x';\n",
    'scripts/data.json': '{}\n',
  });
  assert.deepEqual(findMissingBuildChainFiles(root), []);
  assert.doesNotThrow(() => assertBuildChainFiles(root));
});

test('acusa script do build e import relativo que faltam no archive', (t) => {
  const root = project(t, 'node scripts/a.mjs && tsx scripts/sumiu.ts', {
    'scripts/a.mjs': "import { run } from './mutation';\n",
  });
  assert.deepEqual(findMissingBuildChainFiles(root), [
    'scripts/mutation (importado por scripts/a.mjs)',
    'scripts/sumiu.ts (chamado pelo build)',
  ]);
  assert.throws(() => assertBuildChainFiles(root), /DEPLOY BLOQUEADO[\s\S]*scripts\/sumiu\.ts/);
});

test('ignora imports para fora de scripts/, como o índice gerado em src/', (t) => {
  const root = project(t, 'tsx scripts/a.ts', {
    'scripts/a.ts': "import { reviews } from '../src/lib/generated/content-index';\n",
  });
  assert.deepEqual(findMissingBuildChainFiles(root), []);
});

test('ignora o import escrito como texto, como o do arquivo gerado pelo build-index', (t) => {
  const root = project(t, 'node scripts/content/a.mjs', {
    'scripts/content/a.mjs': [
      "import { b } from '../b.mjs';",
      `writeFileSync('x.ts', "import type { T } from '../storeBanners';\\n");`,
      'const y = `import { z } from "./z";`;',
      '',
    ].join('\n'),
    'scripts/b.mjs': 'export const b = 1;\n',
  });
  assert.deepEqual(findMissingBuildChainFiles(root), []);
});

test('o import de várias linhas e o dinâmico seguem contando', (t) => {
  const root = project(t, 'node scripts/a.mjs', {
    'scripts/a.mjs': "import {\n  a,\n  b,\n} from './sumiu-estatico.mjs';\nconst m = await import('./sumiu-dinamico.mjs');\n",
  });
  assert.deepEqual(findMissingBuildChainFiles(root), [
    'scripts/sumiu-dinamico.mjs (importado por scripts/a.mjs)',
    'scripts/sumiu-estatico.mjs (importado por scripts/a.mjs)',
  ]);
});
