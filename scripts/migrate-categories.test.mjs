import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { after, test } from 'node:test';
import { fileURLToPath } from 'node:url';

const SCRIPT = fileURLToPath(new URL('./migrate-categories.mjs', import.meta.url));
const root = mkdtempSync(path.join(os.tmpdir(), 'migrate-categories-'));
after(() => rmSync(root, { recursive: true, force: true }));

function fixture() {
  const dir = mkdtempSync(path.join(root, 'caso-'));
  const input = path.join(dir, 'entrada.json');
  writeFileSync(input, JSON.stringify([{ id: 1, title: 'Bolo de cenoura', categories: ['Sobremesas'] }]));
  return {
    dir,
    input,
    output: path.join(dir, 'saida.json'),
    report: path.join(dir, 'saida.report.json'),
  };
}

function run(args) {
  return spawnSync(process.execPath, [SCRIPT, ...args], { encoding: 'utf8' });
}

test('recusa opção desconhecida antes de escrever qualquer arquivo', () => {
  for (const option of ['--dryrun', '--dry-run=true', '-n']) {
    const { input, output, report } = fixture();
    const result = run([input, output, option]);
    assert.equal(result.status, 1, `${option}\n${result.stdout}`);
    assert.ok(result.stderr.includes(`Opção desconhecida: ${option}\n`), result.stderr);
    assert.equal(existsSync(output), false, `${option} escreveu a saída`);
    assert.equal(existsSync(report), false, `${option} escreveu o relatório`);
  }
});

test('recusa saída que não termina em .json sem tocar no arquivo', () => {
  const { dir, input } = fixture();
  const output = path.join(dir, 'saida.txt');
  writeFileSync(output, 'conteúdo anterior');
  for (const args of [[input, output], [input, output, '--dry-run']]) {
    const result = run(args);
    assert.equal(result.status, 1, `${args.join(' ')}\n${result.stdout}`);
    assert.ok(result.stderr.includes(`A saída precisa terminar em .json: ${output}\n`), result.stderr);
    assert.equal(readFileSync(output, 'utf8'), 'conteúdo anterior', args.join(' '));
  }
});

test('--dry-run escreve só o relatório', () => {
  const { input, output, report } = fixture();
  const result = run([input, output, '--dry-run']);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(existsSync(output), false);
  assert.equal(existsSync(report), true);
});

test('sem opção, escreve a saída migrada e o relatório', () => {
  const { input, output, report } = fixture();
  const result = run([input, output]);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(existsSync(output), true);
  assert.equal(existsSync(report), true);
});
