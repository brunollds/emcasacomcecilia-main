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
  writeFileSync(path.join(content, 'reviews', '_manifest.json'), JSON.stringify([]));
  reviews.forEach((review, index) => {
    writeFileSync(path.join(content, 'reviews', `${review.slug || index}.json`), JSON.stringify(review));
  });
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

test('review internacional ativo usa o pathname prefixado', () => {
  const { root, rp, content } = scaffold(
    [{ source: '/reviews/a', destination: '/en/reviews/a', permanent: true }],
    [],
    [{ slug: 'a', locale: 'en' }]
  );
  try {
    assert.doesNotThrow(() => validateRedirectsFromDisk(rp, content));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('review com locale inválido falha antes de validar redirects', () => {
  const { root, rp, content } = scaffold(
    [{ source: '/reviews/bad', destination: '/en/reviews/bad', permanent: true }],
    [],
    [{ slug: 'bad', locale: 'xx' }]
  );
  try {
    assert.throws(() => validateRedirectsFromDisk(rp, content), /locale inválido para review: "xx"/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
