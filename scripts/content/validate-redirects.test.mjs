import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateRedirects } from './validate-redirects.mjs';

const ok = (source, destination) => ({ source, destination, permanent: true });

test('array válido passa', () => {
  assert.doesNotThrow(() => validateRedirects([ok('/reviews/a', '/reviews/b')], new Set()));
});
test('raiz não-array lança', () => {
  assert.throws(() => validateRedirects({}, new Set()), /array/);
});
test('campo extra lança', () => {
  assert.throws(
    () => validateRedirects([{ ...ok('/reviews/a', '/reviews/b'), extra: 1 }], new Set()),
    /exatamente/
  );
});
test('source com formato inválido lança', () => {
  assert.throws(() => validateRedirects([ok('reviews/a', '/reviews/b')], new Set()), /source inválido/);
});
test('destination fora de /receitas|/reviews lança', () => {
  assert.throws(() => validateRedirects([ok('/reviews/a', '/blog/b')], new Set()), /destination inválido/);
});
test('permanent !== true lança', () => {
  assert.throws(
    () => validateRedirects([{ source: '/reviews/a', destination: '/reviews/b', permanent: false }], new Set()),
    /permanent deve ser true/
  );
});
test('source === destination lança', () => {
  assert.throws(() => validateRedirects([ok('/reviews/a', '/reviews/a')], new Set()), /source === destination/);
});
test('source duplicado lança', () => {
  assert.throws(
    () => validateRedirects([ok('/reviews/a', '/reviews/b'), ok('/reviews/a', '/reviews/c')], new Set()),
    /duplicado/
  );
});
test('ciclo A→B→A lança', () => {
  assert.throws(
    () => validateRedirects([ok('/reviews/a', '/reviews/b'), ok('/reviews/b', '/reviews/a')], new Set()),
    /ciclo/
  );
});
test('ciclo A→B→C→A lança', () => {
  assert.throws(
    () =>
      validateRedirects(
        [ok('/reviews/a', '/reviews/b'), ok('/reviews/b', '/reviews/c'), ok('/reviews/c', '/reviews/a')],
        new Set()
      ),
    /ciclo/
  );
});
test('cadeia A→B→C (sem ciclo) passa', () => {
  assert.doesNotThrow(() =>
    validateRedirects([ok('/reviews/a', '/reviews/b'), ok('/reviews/b', '/reviews/c')], new Set())
  );
});
test('source que coincide com conteúdo ativo lança', () => {
  assert.throws(
    () => validateRedirects([ok('/receitas/bolo', '/receitas/bolo-novo')], new Set(['/receitas/bolo'])),
    /conteúdo ativo/
  );
});
