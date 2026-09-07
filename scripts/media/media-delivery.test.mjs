import test from 'node:test';
import assert from 'node:assert/strict';
import { createMediaResolver } from '../../src/lib/media-delivery.mjs';

const digest = 'a'.repeat(64);
const remote = `https://cdn.emcasacomcecilia.com/v1/image/${digest}/hero.webp`;

test('maps canonical local keys and leaves unmapped strings unchanged', () => {
  const resolve = createMediaResolver({ '/images/hero.webp': remote });
  assert.equal(resolve('/images/hero.webp'), remote);
  assert.equal(resolve('/images/other.webp'), '/images/other.webp');
  assert.equal(resolve(remote), remote);
});

test('accepts same-site absolute legacy URLs without changing canonical local keys', () => {
  const resolve = createMediaResolver([{ local_url: '/images/hero.webp', remote_url: remote }]);
  assert.equal(resolve('https://emcasacomcecilia.com/images/hero.webp'), remote);
  assert.equal(resolve('https://other.example/images/hero.webp'), 'https://other.example/images/hero.webp');
  assert.equal(resolve('/images/hero.webp'), remote);
});

test('resolves once and never recursively follows a remote result', () => {
  const resolve = createMediaResolver({ '/images/hero.webp': remote });
  assert.equal(resolve('/images/hero.webp'), remote);
  assert.equal(resolve(resolve('/images/hero.webp')), remote);
});

test('rejects non-canonical local and remote mappings at construction', () => {
  const badRemotes = [
    `http://cdn.emcasacomcecilia.com/v1/image/${digest}/hero.webp`,
    `${remote}?token=secret`,
    `https://user:pass@cdn.emcasacomcecilia.com/v1/image/${digest}/hero.webp`,
    `https://cdn.emcasacomcecilia.com/v1/image/${digest}/dir%2Fhero.webp`,
    `https://cdn.emcasacomcecilia.com/v1/image/${digest}/../hero.webp`,
    `https://cdn.emcasacomcecilia.com/v1/image/not-a-sha/hero.webp`,
  ];
  for (const badRemote of badRemotes) {
    assert.throws(() => createMediaResolver({ '/images/hero.webp': badRemote }), TypeError);
  }
  for (const badLocal of ['/images/../hero.webp', '/images//hero.webp', '/images/hero%2F.webp', 'images/hero.webp']) {
    assert.throws(() => createMediaResolver({ [badLocal]: remote }), TypeError);
  }
});

test('rejects malformed entries and non-string resolution input', () => {
  assert.throws(() => createMediaResolver([{ local_url: '/images/hero.webp' }]), TypeError);
  assert.throws(() => createMediaResolver([
    { local_url: '/images/hero.webp', remote_url: remote },
    { local_url: '/images/hero.webp', remote_url: remote },
  ]), TypeError);
  const resolve = createMediaResolver({});
  assert.throws(() => resolve(null), TypeError);
});
