import assert from 'node:assert/strict';
import {
  getAnalyticsConfig,
  shouldEnableAnalytics,
} from '../src/lib/analytics';

assert.equal(shouldEnableAnalytics('localhost'), false);
assert.equal(shouldEnableAnalytics('127.0.0.1'), false);
assert.equal(shouldEnableAnalytics('192.168.1.42'), false);
assert.equal(shouldEnableAnalytics('::1'), false);
assert.equal(shouldEnableAnalytics('[::1]'), false);
assert.equal(shouldEnableAnalytics('staging.emcasacomcecilia.com'), false);
assert.equal(shouldEnableAnalytics('damie.emcasacomcecilia.com'), false);
assert.equal(shouldEnableAnalytics('localhost', true), true);
assert.equal(shouldEnableAnalytics('emcasacomcecilia.com'), true);
assert.equal(shouldEnableAnalytics('www.emcasacomcecilia.com'), true);

assert.deepEqual(getAnalyticsConfig(), { send_page_view: false });
assert.deepEqual(getAnalyticsConfig(true), {
  send_page_view: false,
  debug_mode: true,
});

console.log('✅ analytics: allowlist de produção e debug explícito preservados.');
