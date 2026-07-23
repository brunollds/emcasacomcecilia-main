import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { validateRedirectsFromDisk } from './validate-redirects.mjs';

function scaffold(redirects, receitas = [], reviews = []) {
  const root = mkdtempSync(path.join(tmpdir(), 'redir-'));
  const content = path.join(root, 'content');
  mkdirSync(path.join(content, 'receitas'), { recursive: true });
  mkdirSync(path.join(content, 'reviews'), { recursive: true });
  writeFileSync(path.join(content, 'receitas', '_manifest.json'), JSON.stringify(receitas));
  writeFileSync(path.join(content, 'reviews', '_manifest.json'), JSON.stringify(reviews));
  const rp = path.join(root, 'redirects.json');
  writeFileSync(rp, JSON.stringify(redirects));
  return { root, rp, content };
}

test('arquivo válido carrega e retorna o array', () => {
  const { root, rp, content } = scaffold([{ source: '/reviews/a', destination: '/reviews/b', permanent: true }]);
  try {
    const out = validateRedirectsFromDisk(rp, content);
    assert.equal(out.length, 1);
    assert.equal(out[0].source, '/reviews/a');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('arquivo inválido (source === destination) lança', () => {
  const { root, rp, content } = scaffold([{ source: '/reviews/a', destination: '/reviews/a', permanent: true }]);
  try {
    assert.throws(() => validateRedirectsFromDisk(rp, content), /source === destination/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('source que está no manifesto ativo lança', () => {
  const { root, rp, content } = scaffold(
    [{ source: '/receitas/bolo', destination: '/receitas/bolo-novo', permanent: true }],
    ['bolo']
  );
  try {
    assert.throws(() => validateRedirectsFromDisk(rp, content), /conteúdo ativo/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
