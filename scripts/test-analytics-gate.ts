import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import {
  getAnalyticsConfig,
  shouldEnableAnalytics,
  shouldEnableClarity,
} from '../src/lib/analytics';

const nonProductionHosts = [
  'localhost',
  '127.0.0.1',
  '192.168.1.42',
  '::1',
  '[::1]',
  'staging.emcasacomcecilia.com',
  'damie.emcasacomcecilia.com',
];
const productionHosts = ['emcasacomcecilia.com', 'www.emcasacomcecilia.com'];

for (const host of nonProductionHosts) {
  assert.equal(shouldEnableAnalytics(host), false, host);
  assert.equal(shouldEnableClarity(host), false, host);
}
for (const host of productionHosts) {
  assert.equal(shouldEnableAnalytics(host), true, host);
  assert.equal(shouldEnableClarity(host), true, host);
}
assert.equal(shouldEnableAnalytics('localhost', true), true);

assert.deepEqual(getAnalyticsConfig(), { send_page_view: false });
assert.deepEqual(getAnalyticsConfig(true), {
  send_page_view: false,
  debug_mode: true,
});

// O loader do Clarity só pode existir atrás do gate; antes ficava solto no layout e rodava em qualquer host.
const clarityLoaders = readdirSync('src', { recursive: true, encoding: 'utf8' })
  .filter((file) => /\.(?:js|jsx|ts|tsx|mjs)$/.test(file))
  .filter((file) => /clarity\.ms|r8u956l333/.test(readFileSync(path.join('src', file), 'utf8')))
  .map((file) => file.split(path.sep).join('/'));
assert.deepEqual(clarityLoaders, ['components/Clarity.js']);

// id "clarity" faz o <script> virar window.clarity (named access) e a tag lança "a[c] is not a function".
assert.doesNotMatch(readFileSync(path.join('src', 'components', 'Clarity.js'), 'utf8'), /\bid="clarity"/);

console.log('✅ analytics: allowlist de produção (GA4 e Clarity) e debug explícito preservados.');
