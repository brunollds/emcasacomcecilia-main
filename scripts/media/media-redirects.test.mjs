import assert from 'node:assert/strict';
import test from 'node:test';
import { buildMediaDeliveryRules, buildMediaRedirects, escapeNextRedirectSource } from './media-redirects.mjs';

const digest = 'a'.repeat(64);
const remote = `https://cdn.emcasacomcecilia.com/v1/image/${digest}/hero.webp`;

test('builds image rewrites and video redirects as separate rules', () => {
  const map = {
    '/images/hero.webp': remote,
    '/videos/loop.mp4': `https://cdn.emcasacomcecilia.com/v1/video/${digest}/loop.mp4`,
  };
  const rules = buildMediaDeliveryRules(map);
  assert.deepEqual(rules.rewrites[0], {
    source: '/images/hero.webp',
    destination: remote,
  });
  assert.equal('headers' in rules, false, 'Next proxy does not preserve configured response markers');
  assert.deepEqual(rules.redirects[0], {
    source: '/videos/loop.mp4',
    destination: map['/videos/loop.mp4'],
    permanent: false,
  });
});

test('escapes Next path metacharacters instead of creating a pattern', () => {
  assert.equal(
    escapeNextRedirectSource('/images/a:b*(c)?[d]{e}.webp'),
    '/images/a\\:b\\*\\(c\\)\\?\\[d\\]\\{e\\}.webp'
  );
});

test('rejects out-of-scope sources and editorial conflicts', () => {
  assert.throws(
    () => buildMediaDeliveryRules({ '/fonts/site.woff2': remote }),
    /outside images\/videos scope/
  );
  assert.throws(
    () => buildMediaDeliveryRules({ '/images/hero.webp': remote }, [{ source: '/images/hero.webp' }]),
    /conflicts with editorial redirect/
  );
});

test('rejects invalid remote identities through the shared resolver', () => {
  assert.throws(
    () => buildMediaDeliveryRules({ '/images/hero.webp': 'https://example.com/hero.webp' }),
    TypeError
  );
});

test('legacy redirect helper returns videos only', () => {
  const redirects = buildMediaRedirects({
    '/images/hero.webp': remote,
    '/videos/loop.mp4': `https://cdn.emcasacomcecilia.com/v1/video/${digest}/loop.mp4`,
  });
  assert.deepEqual(redirects.map(({ source }) => source), ['/videos/loop.mp4']);
});
